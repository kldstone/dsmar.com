import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const dist = path.join(root, "dist");
const siteUrl = "https://www.dsmar.com";
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const escapeJsonForHtml = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

function metadataMarkup(seo, pathname, { includeCanonical = true, includeStructuredData = true } = {}) {
  const image = new URL(seo.image, siteUrl).toString();
  const pageType = pathname.startsWith("/blog/") ? "article" : "website";
  const meta = [
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    ...(includeCanonical ? [`<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`] : []),
    `<meta property="og:type" content="${pageType}" />`,
    `<meta property="og:site_name" content="DONGSHENG MARBLE" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    ...(includeCanonical ? [`<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`] : []),
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    ...(includeStructuredData
      ? seo.structuredData.map((schema, index) => `<script type="application/ld+json" data-page-schema="${index}">${escapeJsonForHtml(schema)}</script>`)
      : []),
  ];
  return meta.join("\n    ");
}

function renderDocument(template, pathname, seo, appHtml, options) {
  const escapedTitle = escapeHtml(seo.title);
  return template
    .replace(/<html\b([^>]*)>/i, (_match, attributes) => `<html${attributes.replace(/\s+lang="[^"]*"/i, "")} lang="en">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapedTitle}</title>`)
    .replace(/\s*<meta\s+(?:name="(?:description|keywords|robots)"|property="(?:og:[^"]+|twitter:[^"]+)")[^>]*\/?\s*>/gi, "")
    .replace(/\s*<link\s+(?:rel="(?:canonical|alternate)"|href="[^"]*"\s+rel="(?:canonical|alternate)")[^>]*\/?\s*>/gi, "")
    .replace(/\s*<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace("</head>", `    ${metadataMarkup(seo, pathname, options)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

const vite = await createServer({
  configFile: path.join(root, "vite.config.ts"),
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const { render, resolvePageSeo } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const { prerenderRoutes } = await vite.ssrLoadModule("/src/lib/prerenderRoutes.ts");
  const [{ default: categories }, { blogPosts }, { getHomeFaq }, { getTranslation }] = await Promise.all([
    vite.ssrLoadModule("/src/data/catalog.ts"),
    vite.ssrLoadModule("/src/content/blog-cn.ts"),
    vite.ssrLoadModule("/src/data/homeFaq.ts"),
    vite.ssrLoadModule("/src/lib/i18n.tsx"),
  ]);
  const template = await readFile(path.join(dist, "index.html"), "utf8");
  const sitemapRoutes = [];

  for (const route of prerenderRoutes) {
    const seo = resolvePageSeo(route.path, "en");
    const appHtml = await render(route.path);
    const html = renderDocument(template, route.path, seo, appHtml);

    const outputPath = route.path === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, route.path.slice(1), "index.html");
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);

    if (route.indexable) {
      sitemapRoutes.push(`  <url><loc>${escapeHtml(seo.canonical)}</loc></url>`);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.join("\n")}\n</urlset>\n`;
  await writeFile(path.join(dist, "sitemap.xml"), sitemap);
  const notFoundPath = "/__not_found__";
  const notFoundSeo = resolvePageSeo(notFoundPath, "en");
  const notFoundHtml = renderDocument(
    template,
    notFoundPath,
    notFoundSeo,
    await render(notFoundPath),
    { includeCanonical: false, includeStructuredData: false },
  );
  await writeFile(path.join(dist, "404.html"), notFoundHtml);
  await writeFile(path.join(dist, "prerender-manifest.json"), `${JSON.stringify({ routes: prerenderRoutes }, null, 2)}\n`);

  const canonical = (pathname) => new URL(pathname.endsWith("/") ? pathname : `${pathname}/`, siteUrl).toString();
  const productCount = categories.reduce((total, category) => total + category.products.length, 0);
  const faq = getHomeFaq("en", { productCount, collectionCount: categories.length });
  const faqPayload = faq.map(({ question, answer }) => ({ question, answer, source_url: canonical("/") }));
  const summary = {
    name: "Dongsheng Marble",
    alternateName: ["DONGSHENG MARBLE", "东升大理石"],
    legalName: "福建省东升石业股份有限公司",
    foundingDate: "2000",
    url: canonical("/"),
    description: "Dongsheng publishes a natural marble catalog, stone collections, company information, project galleries, articles, and inquiry options. Its company profile records the stone business beginning in 1992 and the establishment of Fujian Dongsheng Stone Industry Co., Ltd. in 2000.",
    product_record_count: productCount,
    collection_count: categories.length,
    source_urls: [canonical("/about"), canonical("/catalog"), canonical("/")],
    verification_note: "Catalog names and images support browsing. Confirm the specific material, lot, dimensions, finish, price, and availability with Dongsheng before specifying a product.",
  };
  const service = {
    name: "Dongsheng Marble website catalog and inquiry",
    provider: { "@type": "Organization", name: "DONGSHENG MARBLE", url: canonical("/") },
    capabilities: [
      "Browse published stone categories and product records.",
      "Submit a product, material, or project inquiry through the website.",
    ],
    source_urls: [canonical("/catalog"), canonical("/contact")],
    note: "These capabilities describe published website functions; they do not confirm stock or supply for a specific item.",
  };
  const toPlainText = (html) => html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|h[1-6]|li|blockquote|section|article)>/gi, "\n\n")
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, "$2 ($1)")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const fullText = [
    "# Dongsheng Marble — published site information",
    "",
    `Official website: ${canonical("/")}`,
    `Company profile: ${canonical("/about")}`,
    `Catalog: ${canonical("/catalog")}`,
    `Contact: ${canonical("/contact")}`,
    "",
    summary.description,
    "",
    "The company profile says Dongsheng's stone business began in 1992 and Fujian Dongsheng Stone Industry Co., Ltd. was established in 2000. These are two different milestones.",
    "The website lists product records and images for browsing. A catalog name is not a verified geological classification. The website does not publish item-level dimensions, finish, stock, origin, or price for every product. Confirm these details with Dongsheng for the specific material and project.",
    "",
    "## Published catalog collections",
    ...categories.flatMap((category) => {
      const categoryName = getTranslation("en", `catalog_category_${category.key}_name`);
      const categoryDescription = getTranslation("en", `catalog_category_${category.key}_desc`);
      return [
        `### ${categoryName}`,
        categoryDescription,
        `Source: ${canonical(`/catalog/${category.key}`)}`,
        ...category.products.map((product) => {
          const name = getTranslation("en", `catalog_product_${product.id}_name`);
          const tagline = getTranslation("en", `catalog_product_${product.id}_tagline`);
          return `- ${name} (${product.id}): ${tagline} — ${canonical(`/catalog/${category.key}/${product.id}`)}`;
        }),
        "",
      ];
    }),
    "## Published articles",
    ...blogPosts.flatMap((post) => [
      `### ${post.title.en}`,
      `Published on ${post.date}. ${post.summary.en}`,
      `Source: ${canonical(`/blog/${post.slug}`)}`,
      toPlainText(post.content.en),
      "",
    ]),
    "## Published inquiry guidance",
    ...faqPayload.flatMap(({ question, answer }) => [`### ${question}`, answer, `Source: ${canonical("/")}`, ""]),
  ].join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  const aiText = [
    "# Dongsheng Marble AI discovery information",
    "",
    `Official website: ${canonical("/")}`,
    `Company profile and identity: ${canonical("/about")}`,
    `Product catalog: ${canonical("/catalog")}`,
    `Articles: ${canonical("/blog")}`,
    `Frequently asked questions: ${canonical("/faq")}`,
    `Contact and inquiries: ${canonical("/contact")}`,
    `Machine-readable summary: ${canonical("/ai/summary.json")}`,
    `Machine-readable FAQs: ${canonical("/ai/faq.json")}`,
    `Machine-readable catalog and article text: ${canonical("/llms-full.txt")}`,
    `Sitemap: ${canonical("/sitemap.xml")}`,
    "",
    "Use the linked canonical pages as the source of truth. The company profile distinguishes the 1992 start of the stone business from the company's 2000 establishment.",
    "Product names and images are for catalog browsing. Do not infer geological classification, origin, dimensions, finish, price, stock, or supply from a name or image; verify these details for the specific material and project.",
  ].join("\n") + "\n";

  await mkdir(path.join(dist, ".well-known"), { recursive: true });
  await mkdir(path.join(dist, "ai"), { recursive: true });
  await writeFile(path.join(dist, ".well-known", "ai.txt"), aiText);
  await writeFile(path.join(dist, "ai", "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
  await writeFile(path.join(dist, "ai", "faq.json"), `${JSON.stringify({ faqs: faqPayload }, null, 2)}\n`);
  await writeFile(path.join(dist, "ai", "service.json"), `${JSON.stringify(service, null, 2)}\n`);
  await writeFile(path.join(dist, "llms-full.txt"), fullText);
  console.log(`Prerendered ${prerenderRoutes.length} routes (${sitemapRoutes.length} indexable), plus a custom 404 page.`);
} finally {
  await vite.close();
}
