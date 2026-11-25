import categories from "@/data/catalog";
import { blogPosts } from "@/content/blog-cn";
import { faqData } from "@/data/faq";
import { getHomeFaq } from "@/data/homeFaq";
import { getProjectCase, projectCases } from "@/data/projectCases";
import { getTranslation } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

export const siteUrl = "https://www.dsmar.com";
const brand = "DONGSHENG MARBLE";

export type PageSeo = {
  title: string;
  description: string;
  canonical: string;
  robots: "index, follow" | "noindex, follow";
  image: string;
  structuredData: Record<string, unknown>[];
};

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();
const pageUrl = (path: string) => absoluteUrl(path.endsWith("/") ? path : `${path}/`);
export const localizedBrand = (lang: Lang) => lang === "zh" ? "东升大理石 DONGSHENG MARBLE" : brand;

function breadcrumbLabel(segment: string, lang: Lang, precedingSegments: string[] = []) {
  const labels: Record<string, Record<Lang, string>> = {
    about: { zh: "关于东升", en: "About Dongsheng" },
    contact: { zh: "联系我们", en: "Contact" },
    faq: { zh: "常见问题", en: "FAQ" },
    catalog: { zh: "石材目录", en: "Stone Catalog" },
    blog: { zh: "资讯", en: "Articles" },
    cases: { zh: "石材图集", en: "Stone Gallery" },
  };
  if (precedingSegments[0] === "catalog") {
    if (precedingSegments.length === 1) {
      const category = categories.find((item) => item.key === segment);
      if (category) return getTranslation(lang, `catalog_category_${category.key}_name`);
    }
    if (precedingSegments.length === 2) {
      const category = categories.find((item) => item.key === precedingSegments[1]);
      const product = category?.products.find((item) => item.id === segment);
      if (product) return getTranslation(lang, `catalog_product_${product.id}_name`);
    }
  }
  if (precedingSegments[0] === "blog") {
    const post = blogPosts.find((item) => item.slug === segment);
    if (post) return post.title[lang];
  }
  if (precedingSegments[0] === "cases") {
    const projectCase = getProjectCase(segment);
    if (projectCase) return lang === "zh" ? projectCase.name : projectCase.en;
  }
  return labels[segment]?.[lang] ?? segment;
}

function makeStructuredData(pathname: string, lang: Lang, image: string) {
  const canonical = pageUrl(pathname);
  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: brand,
      alternateName: "东升大理石",
      logo: absoluteUrl("/logo-en.png"),
      description: lang === "zh"
        ? "主营大理石荒料采购、批发及大板生产加工。"
        : "Marble block sourcing and wholesale, plus marble slab production and processing.",
      url: `${siteUrl}/`,
      telephone: "+86 139 5994 8672",
      email: "dongshengmarble@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kuifeng Industrial Zone, Shuitou Town",
        addressLocality: "Nan'an",
        addressRegion: "Fujian",
        addressCountry: "CN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+86 139 5994 8672",
        email: "dongshengmarble@gmail.com",
        availableLanguage: ["Chinese", "English"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: brand,
      url: `${siteUrl}/`,
      inLanguage: lang === "zh" ? "zh-CN" : "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ];

  const segments = pathname.split("/").filter(Boolean);
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "zh" ? "首页" : "Home", item: `${siteUrl}/` },
      ...segments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: breadcrumbLabel(segment, lang, segments.slice(0, index)),
        item: pageUrl(`/${segments.slice(0, index + 1).join("/")}`),
      })),
    ],
  });

  const categoryMatch = pathname.match(/^\/catalog\/([^/]+)$/);
  if (categoryMatch) {
    const category = categories.find((item) => item.key === categoryMatch[1]);
    if (category) {
      const categoryName = getTranslation(lang, `catalog_category_${category.key}_name`);
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: categoryName,
        description: getTranslation(lang, `catalog_category_${category.key}_desc`),
        url: canonical,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: category.products.length,
          itemListElement: category.products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name: getTranslation(lang, `catalog_product_${product.id}_name`),
              image: absoluteUrl(product.cover),
              url: pageUrl(`/catalog/${category.key}/${product.id}`),
            },
          })),
        },
      });
    }
  }

  if (pathname === "/cases") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: lang === "zh" ? "东升大理石工程案例" : "Dongsheng Marble Project Cases",
      description: lang === "zh" ? "东升大理石官网展示的石材案例图集。" : "Stone case galleries published on the Dongsheng Marble website.",
      url: canonical,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: projectCases.length,
        itemListElement: projectCases.map((projectCase, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "ImageObject",
            name: lang === "zh" ? projectCase.name : projectCase.en,
            contentUrl: absoluteUrl(projectCase.cover),
            url: pageUrl(`/cases/${projectCase.slug}`),
          },
        })),
      },
    });
  }

  const productMatch = pathname.match(/^\/catalog\/([^/]+)\/([^/]+)$/);
  if (productMatch) {
    const category = categories.find((item) => item.key === productMatch[1]);
    const product = category?.products.find((item) => item.id === productMatch[2]);
    if (category && product) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        name: getTranslation(lang, `catalog_product_${product.id}_name`),
        description: getTranslation(lang, `catalog_product_${product.id}_tagline`),
        category: getTranslation(lang, `catalog_category_${category.key}_name`),
        image: absoluteUrl(product.cover),
        url: canonical,
        brand: { "@type": "Brand", name: brand },
      });
    }
  }

  const postMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (postMatch) {
    const post = blogPosts.find((item) => item.slug === postMatch[1]);
    if (post) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title[lang],
        description: post.summary[lang],
        image: absoluteUrl(post.image),
        datePublished: post.date,
        inLanguage: lang === "zh" ? "zh-CN" : "en",
        mainEntityOfPage: canonical,
        publisher: { "@id": `${siteUrl}/#organization` },
      });
    }
  }

  if (pathname === "/faq") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.flatMap((group) => group.items.map((item) => ({
        "@type": "Question",
        name: getTranslation(lang, item.questionKey),
        acceptedAnswer: { "@type": "Answer", text: getTranslation(lang, item.answerKey) },
      }))),
    });
  }

  if (pathname === "/") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: lang === "zh" ? "东升石材产品系列" : "Dongsheng Stone Collections",
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: getTranslation(lang, `catalog_category_${category.key}_name`),
        url: pageUrl(`/catalog/${category.key}`),
      })),
    });
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: getHomeFaq(lang, {
        productCount: categories.reduce((sum, category) => sum + category.products.length, 0),
        collectionCount: categories.length,
      }).map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  if (image) schemas[1] = { ...schemas[1], image: absoluteUrl(image) };
  return schemas;
}

export function resolvePageSeo(inputPath: string, lang: Lang = "en"): PageSeo {
  const pathname = inputPath.split("?")[0].replace(/\/$/, "") || "/";
  const canonical = pageUrl(pathname);
  const categoryMatch = pathname.match(/^\/catalog\/([^/]+)$/);
  const productMatch = pathname.match(/^\/catalog\/([^/]+)\/([^/]+)$/);
  const isCatalogPage = pathname === "/catalog"
    || Boolean(categoryMatch && categories.some((item) => item.key === categoryMatch[1]))
    || Boolean(productMatch && categories.some((category) => category.key === productMatch[1]
      && category.products.some((product) => product.id === productMatch[2])));
  const postMatch = pathname.match(/^\/blog\/([^/]+)$/);
  const caseMatch = pathname.match(/^\/cases\/([^/]+)$/);
  const isKnownPath = ["/", "/about", "/contact", "/faq", "/blog", "/catalog", "/cases"].includes(pathname)
    || isCatalogPage
    || Boolean(postMatch && blogPosts.some((post) => post.slug === postMatch[1]))
    || Boolean(caseMatch && getProjectCase(caseMatch[1]));
  const nonIndexable = pathname === "/search" || pathname.startsWith("/collections") || !isKnownPath;
  let title: string;
  let description: string;
  let image = "/optimized/brand-gallery/2025_12_05_14_26_IMG_0505.webp";

  if (pathname === "/") {
    title = lang === "zh" ? "天然石材产品目录 | 东升大理石" : "Natural Stone Product Catalog | Dongsheng Marble";
    description = lang === "zh" ? "浏览东升大理石产品分类、天然石材图集与企业信息，查看产品图片并提交项目询盘。" : "Browse Dongsheng Marble product categories, natural stone galleries, company information, and project inquiry options.";
  } else if (pathname === "/about") {
    title = lang === "zh" ? "关于东升大理石 | 企业介绍" : "About Dongsheng Marble | Company Profile";
    description = lang === "zh" ? "查看东升大理石官网发布的企业介绍、业务信息与发展历程。" : "Read the company profile, business information, and history published by Dongsheng Marble.";
  } else if (pathname === "/contact") {
    title = lang === "zh" ? "联系东升大理石 | 产品与项目询盘" : "Contact Dongsheng Marble | Product and Project Inquiries";
    description = lang === "zh" ? "通过东升大理石官网提交产品、材料或项目相关询盘。" : "Send Dongsheng Marble an inquiry about products, materials, or a project.";
  } else if (pathname === "/faq") {
    title = lang === "zh" ? "常见问题 | 东升大理石" : "Frequently Asked Questions | Dongsheng Marble";
    description = lang === "zh" ? "查看东升大理石官网列出的天然石材、产品与服务相关问题和解答。" : "Read answers to natural stone, product, and service questions published by Dongsheng Marble.";
  } else if (pathname === "/blog") {
    title = lang === "zh" ? "石材资讯与文章 | 东升大理石" : "Stone Articles and News | Dongsheng Marble";
    description = lang === "zh" ? "浏览东升大理石发布的石材知识、行业资讯与公司文章。" : "Browse stone knowledge, industry updates, and company articles published by Dongsheng Marble.";
  } else if (pathname === "/catalog") {
    title = lang === "zh" ? "按色系浏览天然石材 | 东升大理石" : "Natural Stone Collections by Color | Dongsheng Marble";
    description = lang === "zh" ? "按色系浏览东升大理石目录中的产品分类与产品图片。" : "Browse Dongsheng Marble product categories and images by color collection.";
  } else if (pathname === "/cases") {
    title = lang === "zh" ? "工程案例图集 | 东升大理石" : "Stone Project Case Gallery | Dongsheng Marble";
    description = lang === "zh" ? "浏览东升大理石官网展示的石材案例图片与图集。" : "Browse stone case images and galleries published on the Dongsheng Marble website.";
  } else if (pathname.startsWith("/catalog/")) {
    const productMatch = pathname.match(/^\/catalog\/([^/]+)\/([^/]+)$/);
    const category = categories.find((item) => item.key === (productMatch?.[1] ?? pathname.split("/")[2]));
    const product = category?.products.find((item) => item.id === productMatch?.[2]);
    if (product && category) {
      const name = getTranslation(lang, `catalog_product_${product.id}_name`);
      const tagline = getTranslation(lang, `catalog_product_${product.id}_tagline`);
      const categoryName = getTranslation(lang, `catalog_category_${category.key}_name`);
      title = `${name} ${lang === "zh" ? "天然石材" : "Stone"} | ${brand}`;
      description = `${name} — ${tagline} ${lang === "zh" ? `东升大理石 ${categoryName}产品。` : `A ${categoryName.toLowerCase()} catalog product from Dongsheng Marble.`}`;
      image = product.cover;
    } else if (category) {
      const name = getTranslation(lang, `catalog_category_${category.key}_name`);
      title = `${name} ${lang === "zh" ? "石材系列" : "Stone Collection"} | ${brand}`;
      description = `${getTranslation(lang, `catalog_category_${category.key}_desc`)} ${lang === "zh" ? "浏览东升大理石产品图片与详情。" : "Browse product images and details from Dongsheng Marble."}`;
      image = category.heroImg;
    } else {
      title = `${brand} | ${lang === "zh" ? "产品目录" : "Product Catalog"}`;
      description = lang === "zh" ? "浏览东升大理石产品目录。" : "Browse the Dongsheng Marble product catalog.";
    }
  } else if (pathname.startsWith("/blog/")) {
    const post = blogPosts.find((item) => item.slug === pathname.slice("/blog/".length));
    if (post) {
      title = `${post.title[lang]} | ${brand}`;
      description = post.summary[lang];
      image = post.image;
    } else {
      title = `${brand} | ${lang === "zh" ? "资讯" : "Articles"}`;
      description = lang === "zh" ? "浏览东升大理石资讯。" : "Browse Dongsheng Marble articles.";
    }
  } else if (pathname.startsWith("/cases/")) {
    const projectCase = getProjectCase(pathname.slice("/cases/".length));
    const caseTitle = projectCase ? (lang === "zh" ? projectCase.name : projectCase.en) : (lang === "zh" ? "石材图集" : "Stone Gallery");
    title = `${caseTitle} | ${brand}`;
    description = lang === "zh" ? `东升大理石官网展示的${caseTitle}石材图片。` : `Stone images for ${caseTitle} displayed on the Dongsheng Marble website.`;
    if (projectCase) image = projectCase.cover;
  } else if (pathname === "/search") {
    title = lang === "zh" ? "产品搜索 | 东升大理石" : "Product Search | Dongsheng Marble";
    description = lang === "zh" ? "搜索东升大理石产品目录。" : "Search the Dongsheng Marble product catalog.";
  } else if (pathname === "/collections/marble") {
    title = lang === "zh" ? "东升石材案例图集 | 东升大理石" : "Dongsheng Stone Project Gallery | DONGSHENG MARBLE";
    description = lang === "zh" ? "浏览东升官网展示的石材案例图片。" : "Browse stone case images displayed on the Dongsheng website.";
  } else if (pathname.startsWith("/collections")) {
    title = lang === "zh" ? "石材图片展示 | 东升大理石" : "Stone Image Gallery | DONGSHENG MARBLE";
    description = lang === "zh" ? "查看网站中的石材图片展示。" : "Browse stone images displayed on the website.";
  } else {
    title = lang === "zh" ? "页面未找到 | 东升大理石" : "Page Not Found | Dongsheng Marble";
    description = lang === "zh" ? "此页面不存在，请浏览东升大理石网站内容。" : "This page was not found. Browse the Dongsheng Marble website instead.";
  }

  return {
    title,
    description,
    canonical,
    robots: nonIndexable ? "noindex, follow" : "index, follow",
    image,
    structuredData: makeStructuredData(pathname, lang, image),
  };
}
