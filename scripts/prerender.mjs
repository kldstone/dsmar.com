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
  console.log(`Prerendered ${prerenderRoutes.length} routes (${sitemapRoutes.length} indexable), plus a custom 404 page.`);
} finally {
  await vite.close();
}
