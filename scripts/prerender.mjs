import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const dist = path.join(root, "dist");
const siteUrl = "https://www.dsmar.com";
const resourceUrl = (pathname) => new URL(pathname, siteUrl).toString();
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
const escapeJsonForHtml = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

function metadataMarkup(seo, pathname, { includeCanonical = true, includeStructuredData = true } = {}) {
  const image = new URL(seo.image, siteUrl).toString();
  const contentPath = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  const pageType = contentPath.startsWith("/blog/") ? "article" : "website";
  const meta = [
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    ...(includeCanonical ? [`<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`] : []),
    ...(includeCanonical && seo.alternates ? [
      `<link rel="alternate" hreflang="en" href="${escapeHtml(seo.alternates.en)}" />`,
      `<link rel="alternate" hreflang="zh-CN" href="${escapeHtml(seo.alternates.zh)}" />`,
      `<link rel="alternate" hreflang="x-default" href="${escapeHtml(seo.alternates.xDefault)}" />`,
    ] : []),
    `<meta property="og:type" content="${pageType}" />`,
    `<meta property="og:site_name" content="${pathname.startsWith("/zh") ? "东升大理石 DONGSHENG MARBLE" : "DONGSHENG MARBLE"}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    ...(includeCanonical ? [`<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`] : []),
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `<link rel="alternate" type="application/rss+xml" title="Dongsheng Marble Articles" href="${resourceUrl("/rss.xml")}" />`,
    ...(includeStructuredData
      ? seo.structuredData.map((schema, index) => `<script type="application/ld+json" data-page-schema="${index}">${escapeJsonForHtml(schema)}</script>`)
      : []),
  ];
  return meta.join("\n    ");
}

function renderDocument(template, pathname, seo, appHtml, options) {
  const escapedTitle = escapeHtml(seo.title);
  const htmlLang = pathname === "/zh" || pathname.startsWith("/zh/") ? "zh-CN" : "en";
  return template
    .replace(/<html\b([^>]*)>/i, (_match, attributes) => `<html${attributes.replace(/\s+lang="[^"]*"/i, "")} lang="${htmlLang}">`)
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
    const seo = resolvePageSeo(route.path, route.lang);
    const appHtml = await render(route.path, route.lang);
    const html = renderDocument(template, route.path, seo, appHtml);

    const outputPath = route.path === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, route.path.slice(1), "index.html");
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);

    if (route.indexable) {
      const englishPath = route.lang === "zh" ? route.path.replace(/^\/zh(?=\/|$)/, "") || "/" : route.path;
      const chinesePath = route.lang === "zh" ? route.path : `/zh${route.path === "/" ? "" : route.path}`;
      const englishUrl = resourceUrl(englishPath.endsWith("/") ? englishPath : `${englishPath}/`);
      const chineseUrl = resourceUrl(chinesePath.endsWith("/") ? chinesePath : `${chinesePath}/`);
      sitemapRoutes.push([
        "  <url>",
        `    <loc>${escapeXml(seo.canonical)}</loc>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(englishUrl)}" />`,
        `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${escapeXml(chineseUrl)}" />`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(englishUrl)}" />`,
        "  </url>",
      ].join("\n"));
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapRoutes.join("\n")}\n</urlset>\n`;
  await writeFile(path.join(dist, "sitemap.xml"), sitemap);
  const canonical = (pathname) => new URL(pathname.endsWith("/") ? pathname : `${pathname}/`, siteUrl).toString();
  const feedItems = [...blogPosts]
    .sort((first, second) => second.date.localeCompare(first.date))
    .map((post) => {
      const link = canonical(`/blog/${post.slug}`);
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();
      return [
        "  <item>",
        `    <title>${escapeXml(post.title.en)}</title>`,
        `    <link>${escapeXml(link)}</link>`,
        `    <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `    <pubDate>${escapeXml(pubDate)}</pubDate>`,
        `    <description>${escapeXml(post.summary.en)}</description>`,
        "  </item>",
      ].join("\n");
    });
  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0"><channel>',
    "  <title>Dongsheng Marble Articles</title>",
    `  <link>${escapeXml(canonical("/blog"))}</link>`,
    "  <description>Articles published on the official Dongsheng Marble website.</description>",
    "  <language>en</language>",
    ...feedItems,
    "</channel></rss>",
    "",
  ].join("\n");
  await writeFile(path.join(dist, "rss.xml"), rss);
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

  const productCount = categories.reduce((total, category) => total + category.products.length, 0);
  const catalogCounts = { productCount, collectionCount: categories.length };
  const faqPayloadFor = (lang) => getHomeFaq(lang, catalogCounts).map(({ question, answer, citationUrls }) => ({
    question,
    answer,
    source_url: canonical(lang === "zh" ? "/zh" : "/"),
    citation_urls: citationUrls,
  }));
  const faqPayload = faqPayloadFor("en");
  const faqPayloadZh = faqPayloadFor("zh");
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
  const buildFullText = (lang, localizedFaqPayload) => {
    const chinese = lang === "zh";
    const localPath = (pathname) => `${chinese ? "/zh" : ""}${pathname === "/" ? "" : pathname}` || "/";
    const localUrl = (pathname) => canonical(localPath(pathname));
    const localizedFaqSource = localUrl("/");
    return [
      chinese ? "# 东升大理石 — 官网公开信息" : "# Dongsheng Marble — published site information",
      "",
      `${chinese ? "官方网站" : "Official website"}: ${localUrl("/")}`,
      `${chinese ? "企业简介" : "Company profile"}: ${localUrl("/about")}`,
      `${chinese ? "产品目录" : "Catalog"}: ${localUrl("/catalog")}`,
      `${chinese ? "联系与询盘" : "Contact"}: ${localUrl("/contact")}`,
      "",
      chinese
        ? "官网企业资料记载，东升石材事业始于1992年，福建省东升石业股份有限公司成立于2000年；这是两个不同的时间节点。"
        : summary.description,
      "",
      chinese
        ? "官网目录展示产品记录和图片，供浏览选材。产品名称不能单独确认地质分类；官网并未为每条产品记录都公布具体尺寸、表面处理、库存、产地或价格。请就具体材料和项目向东升核实这些信息。"
        : "The company profile says Dongsheng's stone business began in 1992 and Fujian Dongsheng Stone Industry Co., Ltd. was established in 2000. These are two different milestones.",
      ...(chinese ? [] : ["The website lists product records and images for browsing. A catalog name is not a verified geological classification. The website does not publish item-level dimensions, finish, stock, origin, or price for every product. Confirm these details with Dongsheng for the specific material and project."]),
      "",
      chinese ? "## 已发布的产品系列" : "## Published catalog collections",
      ...categories.flatMap((category) => {
        const categoryName = getTranslation(lang, `catalog_category_${category.key}_name`);
        const categoryDescription = getTranslation(lang, `catalog_category_${category.key}_desc`);
        return [
          `### ${categoryName}`,
          categoryDescription,
          `${chinese ? "来源" : "Source"}: ${localUrl(`/catalog/${category.key}`)}`,
          ...category.products.map((product) => {
            const name = getTranslation(lang, `catalog_product_${product.id}_name`);
            const tagline = getTranslation(lang, `catalog_product_${product.id}_tagline`);
            return `- ${name} (${product.id}): ${tagline} — ${localUrl(`/catalog/${category.key}/${product.id}`)}`;
          }),
          "",
        ];
      }),
      chinese ? "## 已发布文章" : "## Published articles",
      ...blogPosts.flatMap((post) => [
        `### ${post.title[lang]}`,
        `${chinese ? "发布日期" : "Published on"} ${post.date}. ${post.summary[lang]}`,
        `${chinese ? "来源" : "Source"}: ${localUrl(`/blog/${post.slug}`)}`,
        toPlainText(post.content[lang]),
        "",
      ]),
      chinese ? "## 已发布的询盘说明" : "## Published inquiry guidance",
      ...localizedFaqPayload.flatMap(({ question, answer, citation_urls }) => [
        `### ${question}`,
        answer,
        `${chinese ? "来源" : "Source"}: ${localizedFaqSource}`,
        ...(citation_urls.length > 0 ? [`${chinese ? "外部参考" : "External references"}: ${citation_urls.join(", ")}`] : []),
        "",
      ]),
    ].join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  };
  const fullText = buildFullText("en", faqPayload);
  const fullTextZh = buildFullText("zh", faqPayloadZh);
  const aiText = [
    "# Dongsheng Marble AI discovery information",
    "",
    `Official website: ${canonical("/")}`,
    `Company profile and identity: ${canonical("/about")}`,
    `Product catalog: ${canonical("/catalog")}`,
    `Articles: ${canonical("/blog")}`,
    `Frequently asked questions: ${canonical("/faq")}`,
    `Contact and inquiries: ${canonical("/contact")}`,
    `Machine-readable summary: ${resourceUrl("/ai/summary.json")}`,
    `Machine-readable FAQs: ${resourceUrl("/ai/faq.json")}`,
    `Machine-readable catalog and article text: ${resourceUrl("/llms-full.txt")}`,
    `中文页面: ${resourceUrl("/zh/")}`,
    `中文机器可读 FAQ: ${resourceUrl("/ai/faq.zh-CN.json")}`,
    `中文目录与文章全文: ${resourceUrl("/zh/llms-full.txt")}`,
    `Sitemap: ${resourceUrl("/sitemap.xml")}`,
    "",
    "Use the linked canonical pages as the source of truth. The company profile distinguishes the 1992 start of the stone business from the company's 2000 establishment.",
    "Product names and images are for catalog browsing. Do not infer geological classification, origin, dimensions, finish, price, stock, or supply from a name or image; verify these details for the specific material and project.",
    "中文内容以对应的中文规范页面为准。产品名称和图片用于目录浏览，不能单独确认地质分类、产地、尺寸、表面处理、价格、库存或供货情况；请按具体材料和项目核实。",
  ].join("\n") + "\n";

  await mkdir(path.join(dist, ".well-known"), { recursive: true });
  await mkdir(path.join(dist, "ai"), { recursive: true });
  await writeFile(path.join(dist, ".well-known", "ai.txt"), aiText);
  await writeFile(path.join(dist, "ai", "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
  await writeFile(path.join(dist, "ai", "faq.json"), `${JSON.stringify({ inLanguage: "en", faqs: faqPayload }, null, 2)}\n`);
  await writeFile(path.join(dist, "ai", "faq.zh-CN.json"), `${JSON.stringify({ inLanguage: "zh-CN", faqs: faqPayloadZh }, null, 2)}\n`);
  await writeFile(path.join(dist, "ai", "service.json"), `${JSON.stringify(service, null, 2)}\n`);
  await writeFile(path.join(dist, "llms-full.txt"), fullText);
  await writeFile(path.join(dist, "zh", "llms-full.txt"), fullTextZh);
  console.log(`Prerendered ${prerenderRoutes.length} routes (${sitemapRoutes.length} indexable), plus a custom 404 page.`);
} finally {
  await vite.close();
}
