import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const dist = path.resolve("dist");
const manifest = JSON.parse(await readFile(path.join(dist, "prerender-manifest.json"), "utf8"));
const routeByPath = new Map(manifest.routes.map((route) => [route.path, route]));
const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapUrlSet = new Set(sitemapUrls);

function htmlPath(route) {
  return route.path === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, route.path.replace(/^\//, ""), "index.html");
}

function attribute(tag, name) {
  return tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1] ?? "";
}

test("prerenders every declared route with unique SEO metadata and real page content", async () => {
  assert.ok(manifest.routes.length > 30, "expected core, case, article, category, and product routes");
  assert.equal(routeByPath.size, manifest.routes.length, "manifest routes must be unique");

  const titles = new Set();
  for (const route of manifest.routes) {
    const html = await readFile(htmlPath(route), "utf8");
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "";
    const descriptionTag = html.match(/<meta\s+name="description"[^>]*>/i)?.[0] ?? "";
    const canonicalTag = html.match(/<link\s+rel="canonical"[^>]*>/i)?.[0] ?? "";
    const h1Count = [...html.matchAll(/<h1(?:\s|>)/gi)].length;
    const rootStart = html.indexOf('<div id="root">');
    const bodyEnd = html.indexOf("</body>");
    const rootEnd = html.lastIndexOf("</div>", bodyEnd);
    const rootContent = rootStart >= 0 && rootEnd > rootStart
      ? html.slice(rootStart + '<div id="root">'.length, rootEnd)
      : "";

    assert.ok(title, `${route.path} must have a title`);
    assert.ok(!titles.has(title), `${route.path} title must be unique`);
    titles.add(title);
    assert.ok(attribute(descriptionTag, "content"), `${route.path} must have a description`);
    assert.equal(attribute(canonicalTag, "href"), `https://www.dsmar.com${route.path === "/" ? "/" : `${route.path}/`}`, `${route.path} canonical`);
    assert.equal(h1Count, 1, `${route.path} must have exactly one H1`);
    assert.ok(rootContent.replace(/<[^>]+>/g, " ").trim().length > 60, `${route.path} must contain server-rendered page copy`);
  }
});

test("every prerendered route has one main landmark and a keyboard skip link", async () => {
  for (const route of manifest.routes) {
    const html = await readFile(htmlPath(route), "utf8");
    const mainCount = [...html.matchAll(/<main(?:\s|>)/gi)].length;

    assert.equal(mainCount, 1, `${route.path} must expose exactly one main landmark`);
    assert.match(html, /<a\b[^>]*href="#main-content"[^>]*>\s*(?:Skip to main content|跳转到主要内容)/i, `${route.path} must offer a skip link`);
    assert.match(html, /<main\b[^>]*id="main-content"[^>]*>/i, `${route.path} main landmark must be the skip link target`);
  }
});

test("sitemap contains exactly the indexable prerendered routes and no unverified collections", () => {
  const expectedUrls = manifest.routes
    .filter((route) => route.indexable)
    .map((route) => `https://www.dsmar.com${route.path === "/" ? "/" : `${route.path}/`}`)
    .sort();

  assert.deepEqual([...sitemapUrls].sort(), expectedUrls);
  assert.ok(expectedUrls.some((url) => url.includes("/catalog/") && !url.match(/\/catalog\/[^/]+$/)));
  assert.ok(expectedUrls.some((url) => url.includes("/blog/") && url !== "https://www.dsmar.com/blog"));
  assert.ok(!sitemap.includes("/collections"), "GANI-sourced collection routes must stay out of Dongsheng sitemap");
  assert.ok(!sitemap.includes("/search"), "search must stay out of sitemap");
});

test("unknown routes use a noindex custom 404 page without a SPA catch-all rewrite", async () => {
  const html = await readFile(path.join(dist, "404.html"), "utf8");
  const config = JSON.parse(await readFile(path.resolve("vercel.json"), "utf8"));

  assert.match(html, /<title>Page Not Found \| Dongsheng Marble<\/title>/);
  assert.match(html, /<meta name="robots" content="noindex, follow"\s*\/>/);
  assert.match(html, /<h1[^>]*>Page not found<\/h1>/);
  assert.doesNotMatch(html, /<link rel="canonical"/i, "a 404 response must not canonicalize to a nonexistent URL");
  assert.equal(config.rewrites, undefined, "static prerendered routes should be served directly so Vercel can return real 404 responses");
});

test("LLM index is served as plain text and links only to published canonical pages", async () => {
  const llms = await readFile(path.join(dist, "llms.txt"), "utf8");
  const links = [...llms.matchAll(/\[[^\]]+\]\((https:\/\/www\.dsmar\.com\/[^)]+)\)/g)].map((match) => match[1]);

  assert.match(llms, /^# Dongsheng Marble/m);
  assert.doesNotMatch(llms, /<\/?(?:html|body|div)\b/i, "llms.txt must not fall through to the SPA HTML shell");
  assert.ok(links.length > 5, "LLM index must link to useful site pages");
  for (const link of links) {
    if (link === "https://www.dsmar.com/sitemap.xml") continue;
    assert.ok(sitemapUrlSet.has(link), `${link} must exist in the canonical sitemap`);
  }
  assert.match(llms, /Verify those details on the specific product page/i, "product-specific details must be verified against source pages");
  assert.match(llms, /availability, dimensions, origin, finish, pricing/i, "the index must identify details that require item-level verification");
});

test("homepage and inquiry pages do not promise an unverified response deadline", async () => {
  for (const pathname of ["/", "/contact"]) {
    const html = await readFile(htmlPath(routeByPath.get(pathname)), "utf8");
    assert.doesNotMatch(html, /24\s*hours?|24小时|one business day|一个工作日/i, `${pathname} must not promise an unverified reply time`);
  }
});

test("homepage prerender includes real catalog links and matching inquiry guidance", async () => {
  const html = await readFile(htmlPath(routeByPath.get("/")), "utf8");
  const homeSchema = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>(.*?)<\/script>/gs)]
    .map((match) => JSON.parse(match[1]))
    .find((schema) => schema["@type"] === "FAQPage");

  assert.ok(homeSchema, "homepage must include its visible FAQPage guidance");
  assert.equal(homeSchema.mainEntity.length, 4);
  for (const collection of ["white-series", "beige-series", "grey-series", "dark-series", "color-series", "pattern-series"]) {
    assert.match(html, new RegExp(`href="/catalog/${collection}"`), `${collection} must be linked in initial HTML`);
  }
  assert.match(html, /How can I request a quote for a catalog product\?/);
  assert.match(html, /Do product images confirm dimensions, finish, and stock\?/);
  assert.match(html, /Can I inquire if I am not sure about the material or dimensions\?/);
  assert.match(html, /How many products are listed in Dongsheng(?:&#39;|')s online catalog\?/);
  assert.match(html, /<h3[^>]*>How can I request a quote for a catalog product\?<\/h3>/);
  assert.match(html, /They do not by themselves confirm a specific lot, dimensions, finish, or current stock\./);
  assert.match(html, /company profile says its stone business began in 1992/);
  assert.match(html, /The current catalog lists 40 product entries across 6 collections/);
  assert.match(html, /This count comes from the catalog data used to render the website/);
  assert.match(html, /Source: Dongsheng company profile/);

  const catalogSchema = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>(.*?)<\/script>/gs)]
    .map((match) => JSON.parse(match[1]))
    .find((schema) => schema["@type"] === "ItemList");
  assert.equal(catalogSchema?.itemListElement.length, 6, "homepage ItemList must match its visible catalog collection links");
});

test("homepage hero image links have descriptive accessible names", async () => {
  const html = await readFile(htmlPath(routeByPath.get("/")), "utf8");
  const heroImageTags = [...html.matchAll(/<a\b(?=[^>]*\bhref="\/(?:about|cases|catalog)")[^>]*>\s*<picture[\s\S]*?<img\b[^>]*>/g)]
    .slice(0, 5)
    .map((match) => match[0].match(/<img\b[^>]*>/)?.[0] ?? "");

  assert.equal(heroImageTags.length, 5, "all five homepage hero links must be present in initial HTML");
  for (const [index, imgTag] of heroImageTags.entries()) {
    assert.ok(attribute(imgTag, "alt").trim().length > 10, `hero image ${index + 1} must describe its linked destination`);
  }
});

test("product and article pages include the matching structured data type", async () => {
  const productRoutes = manifest.routes.filter((route) => /^\/catalog\/[^/]+\/[^/]+$/.test(route.path));
  const articleRoutes = manifest.routes.filter((route) => /^\/blog\/[^/]+$/.test(route.path));
  assert.ok(productRoutes.length > 10, "expected real catalog product routes");
  assert.ok(articleRoutes.length > 1, "expected real article routes");

  for (const route of [...productRoutes, ...articleRoutes]) {
    const html = await readFile(htmlPath(route), "utf8");
    const schemaType = route.path.startsWith("/catalog/") ? "Product" : "Article";
    assert.match(html, new RegExp(`"@type":"${schemaType}"`), `${route.path} must include ${schemaType} JSON-LD`);
    if (schemaType === "Product") {
      const productId = route.path.split("/").at(-1);
      assert.match(html, /Product information/, `${route.path} must expose product inquiry context in the initial HTML`);
      assert.match(html, /Catalog ID<\/dt>\s*<dd[^>]*>/, `${route.path} must label its catalog identifier`);
      assert.ok(html.includes(`>${productId}</dd>`), `${route.path} must render its real catalog identifier`);
      for (const unverifiedApplication of ["Hotel Lobbies", "Villa Living Rooms", "Feature Walls", "Flooring", "Commercial Spaces", "Bathrooms"]) {
        assert.ok(!html.includes(unverifiedApplication), `${route.path} must not claim generic applications without product-specific evidence`);
      }
    }
  }
});

test("each catalog collection states its live product count and inquiry boundary", async () => {
  const categoryRoutes = manifest.routes.filter((route) => /^\/catalog\/[^/]+$/.test(route.path));

  for (const route of categoryRoutes) {
    const collection = route.path.split("/").at(-1);
    const productCount = manifest.routes.filter((candidate) => candidate.path.startsWith(`${route.path}/`)).length;
    const html = await readFile(htmlPath(route), "utf8");

    assert.match(html, new RegExp(`currently lists ${productCount} catalog products`, "i"), `${route.path} must use the real catalog count`);
    assert.match(html, /does not publish dimensions, finish, stock, or price/i, `${route.path} must state which details need confirmation`);
    assert.ok(html.includes(`href="${route.path}/`), `${route.path} must link to its product details`);
    assert.ok(collection, "catalog collection routes must have a slug");
  }
});

test("FAQ copy and FAQPage data avoid unverified business commitments", async () => {
  const route = routeByPath.get("/faq");
  assert.ok(route, "FAQ route must be prerendered");
  const html = await readFile(htmlPath(route), "utf8");
  const schemas = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>(.*?)<\/script>/gs)]
    .map((match) => JSON.parse(match[1]));
  const faqSchema = schemas.find((schema) => schema["@type"] === "FAQPage");

  assert.ok(faqSchema, "FAQ page must include FAQPage structured data");
  assert.ok(faqSchema.mainEntity.length > 10, "FAQPage must retain useful customer questions");
  for (const unverifiedClaim of [
    /RMB\s*300/i,
    /RMB\s*180,?000/i,
    /±\s*1\s*mm/i,
    /one to two business days/i,
    /30 countries/i,
    /four steel straps/i,
    /exclusive luxury stones/i,
    /六面渗透型防护处理/,
    /独家奢石/,
    /无最低起订量/,
    /全球30多个国家/,
    /售价可达18万元/,
  ]) {
    assert.doesNotMatch(html, unverifiedClaim, `FAQ must not assert ${unverifiedClaim}`);
  }
});

test("organization structured data uses the published company identity and contact details", async () => {
  const html = await readFile(htmlPath({ path: "/" }), "utf8");
  const organizationScript = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>(.*?)<\/script>/gs)]
    .map((match) => JSON.parse(match[1]))
    .find((schema) => schema["@type"] === "Organization");

  assert.ok(organizationScript, "homepage must include Organization JSON-LD");
  assert.equal(organizationScript.name, "DONGSHENG MARBLE");
  assert.equal(organizationScript.alternateName, "东升大理石");
  assert.equal("legalName" in organizationScript, false, "unconfirmed legal entity spelling must not be asserted");
  assert.equal("foundingDate" in organizationScript, false, "the site shows both 1992 and 2000 milestones; do not infer a founding date");
  assert.equal(organizationScript.telephone, "+86 139 5994 8672");
  assert.equal(organizationScript.email, "dongshengmarble@gmail.com");
  assert.equal(organizationScript.address.addressLocality, "Nan'an");
  assert.equal(organizationScript.contactPoint.email, "dongshengmarble@gmail.com");
  assert.equal(organizationScript.logo, "https://www.dsmar.com/logo-en.png");
});

test("breadcrumbs use visible category, product, and article names instead of URL slugs", async () => {
  const cases = [
    ["/catalog/white-series/ds-baina", ["Stone Catalog", "WHITE SERIES", "Bena White"]],
    ["/blog/natural-marble-care-guide", ["Articles", "Daily Natural Marble Care Guide"]],
    ["/cases/ziqi-donglai", ["Stone Gallery", "Ziqi Donglai"]],
  ];

  for (const [pathname, expectedLabels] of cases) {
    const route = routeByPath.get(pathname);
    assert.ok(route, `${pathname} must be prerendered`);
    const html = await readFile(htmlPath(route), "utf8");
    const breadcrumb = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>(.*?)<\/script>/gs)]
      .map((match) => JSON.parse(match[1]))
      .find((schema) => schema["@type"] === "BreadcrumbList");

    assert.ok(breadcrumb, `${pathname} must include breadcrumb structured data`);
    assert.deepEqual(breadcrumb.itemListElement.slice(1).map((item) => item.name), expectedLabels);
  }
});

test("marble care article links to authoritative guidance without unsupported company claims or fixed schedules", async () => {
  const route = routeByPath.get("/blog/natural-marble-care-guide");
  assert.ok(route, "marble care article must be prerendered");
  const html = await readFile(htmlPath(route), "utf8");

  assert.match(html, /naturalstoneinstitute\.org\/consumers\/care\//i);
  assert.match(html, /naturalstoneinstitute\.org\/consumers\/sealing-stone\//i);
  assert.match(html, /does not make stone stain-proof/i);
  assert.doesNotMatch(html, /Dongsheng slabs are professionally protected before delivery/i);
  assert.doesNotMatch(html, /every 6 to 12 months|every 3 to 6 months/i);
});

test("project case index is discoverable and uses only real case data", async () => {
  const route = routeByPath.get("/cases");
  assert.ok(route, "case index must be prerendered");
  assert.equal(route.indexable, true, "case index must be included in sitemap");

  const html = await readFile(htmlPath(route), "utf8");
  assert.match(html, /<title>Stone Project Case Gallery \| Dongsheng Marble<\/title>/);
  assert.match(html, /"@type":"CollectionPage"/);
  assert.match(html, /"@type":"ItemList"/);
  const caseRoutes = manifest.routes.filter((item) => /^\/cases\/[^/]+$/.test(item.path));
  assert.ok(caseRoutes.length > 10, "case detail routes must be generated from the existing case data");
  for (const caseRoute of caseRoutes) {
    const slug = caseRoute.path.slice("/cases/".length);
    assert.ok(html.includes(caseRoute.path), `case index must link to ${slug}`);
    assert.ok(html.includes(`/optimized/project-cases/${slug}.webp`), `case index must use the existing cover for ${slug}`);
  }
});

test("legacy collection URLs permanently redirect to current catalog and case pages", async () => {
  const config = JSON.parse(await readFile(path.resolve("vercel.json"), "utf8"));
  const redirects = new Map(config.redirects.map(({ source, destination, permanent }) => [source, { destination, permanent }]));
  const apexRedirect = config.redirects.find(({ source, destination, has }) =>
    source === "/(.*)"
      && destination === "https://www.dsmar.com/$1"
      && has?.some(({ type, value }) => type === "host" && value === "dsmar.com"));

  assert.ok(apexRedirect?.permanent, "apex domain must permanently redirect to the canonical www host");

  for (const [source, destination] of [
    ["/collections", "/catalog"],
    ["/collections/product/:id", "/catalog"],
    ["/collections/marble", "/cases"],
  ]) {
    assert.deepEqual(redirects.get(source), { destination, permanent: true }, `${source} must redirect permanently`);
    assert.ok(!routeByPath.has(source), `${source} must not ship the legacy third-party gallery`);
    assert.ok(!sitemap.includes(source), `${source} must not be in the sitemap`);
  }
});
