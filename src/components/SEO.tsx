import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/lib/i18n";

type Lang = "zh" | "en";
type PageMeta = { title: string; description: string; keywords: string };
type LocalizedMeta = Record<Lang, PageMeta>;

const siteUrl = "https://www.dsmar.com";
const defaultImage = `${siteUrl}/optimized/brand-gallery/2025_12_05_14_26_IMG_0505.webp`;

const pageMeta: Record<string, LocalizedMeta> = {
  "/": {
    zh: { title: "东升大理石 DONGSHENG MARBLE｜天然大理石与水刀拼花定制工厂", description: "东升大理石位于福建南安水头，提供天然大理石大板、水刀拼花、石材台面、异形加工、工程定制、质检包装与出口交付服务。", keywords: "东升大理石,天然大理石,水刀拼花,石材定制,石材工厂,南安石材,水头石材" },
    en: { title: "DONGSHENG MARBLE | Natural Marble & Waterjet Mosaic Factory", description: "Dongsheng Marble supplies natural marble slabs, waterjet mosaics, stone countertops, custom fabrication, quality inspection, packing, and export delivery from Shuitou, China.", keywords: "Dongsheng Marble,natural marble,waterjet mosaic,stone fabrication,marble factory,China stone supplier" },
  },
  "/collections": {
    zh: { title: "天然大理石系列｜大理石大板与工程选材", description: "按色系浏览天然大理石系列，适用于酒店大堂、别墅会所、商业空间、背景墙、地面和台面定制。", keywords: "天然大理石,大理石大板,大理石供应商,白色大理石,灰色大理石" },
    en: { title: "Natural Marble Collection | Slabs for Architecture & Interiors", description: "Explore natural marble by colour for hotel lobbies, villas, commercial interiors, feature walls, flooring, and custom countertops.", keywords: "natural marble,marble slabs,marble supplier,white marble,grey marble" },
  },
  "/collections/marble": {
    zh: { title: "天然大理石系列｜大理石大板与工程选材", description: "按色系浏览天然大理石系列，适用于酒店大堂、别墅会所、商业空间、背景墙、地面和台面定制。", keywords: "天然大理石,大理石大板,大理石供应商,白色大理石,灰色大理石" },
    en: { title: "Natural Marble Collection | Slabs for Architecture & Interiors", description: "Explore natural marble by colour for hotel lobbies, villas, commercial interiors, feature walls, flooring, and custom countertops.", keywords: "natural marble,marble slabs,marble supplier,white marble,grey marble" },
  },
  "/about": {
    zh: { title: "关于东升｜福建南安水头石材源头工厂", description: "东升大理石扎根中国石都南安水头，服务设计师、建筑商、工程客户和全球高端石材项目。", keywords: "关于东升,南安石材工厂,水头石材,福建石材企业" },
    en: { title: "About Dongsheng | Stone Factory in Shuitou, China", description: "Based in Shuitou, China's stone hub, Dongsheng serves designers, builders, project clients, and premium stone projects worldwide.", keywords: "about Dongsheng,Shuitou stone factory,China marble company,stone supplier" },
  },
  "/contact": {
    zh: { title: "联系我们｜获取石材报价与项目方案", description: "联系东升大理石，获取天然大理石、水刀拼花、台面定制、工程石材和出口包装报价方案。", keywords: "石材报价,联系石材工厂,大理石询盘,水刀拼花报价" },
    en: { title: "Contact Dongsheng | Stone Quotations & Project Solutions", description: "Contact Dongsheng for quotations on natural marble, waterjet mosaics, custom countertops, project stone, and export packing.", keywords: "marble quotation,contact stone factory,marble inquiry,waterjet mosaic quotation" },
  },
  "/faq": {
    zh: { title: "常见问题｜东升大理石", description: "了解东升大理石的产品、加工、报价、包装与出口服务常见问题。", keywords: "石材常见问题,大理石报价,石材出口,石材加工" },
    en: { title: "FAQ | Dongsheng Marble", description: "Find answers about Dongsheng products, fabrication, quotations, packing, and export services.", keywords: "marble FAQ,stone quotation,stone export,stone fabrication" },
  },
  "/blog": {
    zh: { title: "资讯｜东升大理石", description: "东升大理石最新动态、行业知识与奢石资讯。", keywords: "东升资讯,石材行业资讯,大理石知识,奢石" },
    en: { title: "News | Dongsheng Marble", description: "The latest Dongsheng news, stone knowledge, and luxury stone insights.", keywords: "Dongsheng news,stone industry news,marble knowledge,luxury stone" },
  },
};

function resolveMeta(pathname: string, lang: Lang): PageMeta {
  if (pathname.startsWith("/collections/product/")) {
    return lang === "zh"
      ? { title: "石材产品详情｜天然石材与定制加工", description: "查看东升大理石产品细节，支持样品咨询、规格确认、深化加工、包装出口与项目报价。", keywords: "石材产品详情,大理石样品,石材报价,工程石材" }
      : { title: "Stone Product Details | Natural Stone & Custom Fabrication", description: "Explore Dongsheng stone details, with support for samples, specifications, fabrication, export packing, and project quotations.", keywords: "stone product details,marble samples,stone quotation,custom stone fabrication" };
  }
  if (pathname.startsWith("/catalog")) {
    return lang === "zh"
      ? { title: "矿山直供｜品种展示", description: "东升大理石全系列品种展示，涵盖白、灰、米黄、深色、彩色和图案六大系列。", keywords: "大理石品种,大理石色系,东升大理石,矿山直供" }
      : { title: "Mine Direct | Stone Collections", description: "Explore the full Dongsheng stone range, including white, grey, beige, dark, colour, and pattern collections.", keywords: "marble collections,marble colours,Dongsheng Marble,mine direct" };
  }
  if (pathname.startsWith("/blog/")) return pageMeta["/blog"][lang];
  return (pageMeta[pathname] || pageMeta["/"])[lang];
}

function upsertMeta(selector: string, attr: "content" | "href", value: string, create: () => HTMLMetaElement | HTMLLinkElement) {
  let element = document.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!element) { element = create(); document.head.appendChild(element); }
  element.setAttribute(attr, value);
}

function setJsonLd(id: string, data: unknown) {
  let element = document.getElementById(id) as HTMLScriptElement | null;
  if (!element) { element = document.createElement("script"); element.type = "application/ld+json"; element.id = id; document.head.appendChild(element); }
  element.textContent = JSON.stringify(data);
}

function breadcrumbName(segment: string, lang: Lang) {
  const names: Record<string, Record<Lang, string>> = {
    about: { zh: "关于东升", en: "About" }, contact: { zh: "联系我们", en: "Contact" }, faq: { zh: "常见问题", en: "FAQ" },
    collections: { zh: "品种", en: "Collections" }, marble: { zh: "天然大理石", en: "Natural Marble" }, product: { zh: "产品", en: "Product" },
    catalog: { zh: "画册", en: "Catalog" }, blog: { zh: "资讯", en: "News" },
  };
  return names[segment]?.[lang] || segment;
}

export default function SEO() {
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const meta = resolveMeta(pathname, lang);
    const canonicalPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    const canonical = `${siteUrl}${canonicalPath}`;
    const siteName = lang === "zh" ? "东升大理石 DONGSHENG MARBLE" : "DONGSHENG MARBLE";

    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = meta.title;
    upsertMeta('meta[name="description"]', "content", meta.description, () => { const element = document.createElement("meta"); element.setAttribute("name", "description"); return element; });
    upsertMeta('meta[name="keywords"]', "content", meta.keywords, () => { const element = document.createElement("meta"); element.setAttribute("name", "keywords"); return element; });
    upsertMeta('link[rel="canonical"]', "href", canonical, () => { const element = document.createElement("link"); element.setAttribute("rel", "canonical"); return element; });

    const ogTags: Record<string, string> = { "og:type": "website", "og:site_name": siteName, "og:title": meta.title, "og:description": meta.description, "og:url": canonical, "og:image": defaultImage, "twitter:card": "summary_large_image", "twitter:title": meta.title, "twitter:description": meta.description, "twitter:image": defaultImage };
    Object.entries(ogTags).forEach(([property, content]) => {
      const isTwitter = property.startsWith("twitter:");
      upsertMeta(`meta[${isTwitter ? "name" : "property"}="${property}"]`, "content", content, () => { const element = document.createElement("meta"); element.setAttribute(isTwitter ? "name" : "property", property); return element; });
    });

    const address = lang === "zh"
      ? { streetAddress: "水头镇奎峰工业区", addressLocality: "南安市", addressRegion: "福建省" }
      : { streetAddress: "Kuifeng Industrial Zone, Shuitou Town", addressLocality: "Nan'an", addressRegion: "Fujian" };
    setJsonLd("schema-organization", { "@context": "https://schema.org", "@type": "Organization", name: siteName, url: siteUrl, email: "262034042@qq.com", telephone: "+86 139 5994 8672", address: { "@type": "PostalAddress", ...address, addressCountry: "CN" } });
    setJsonLd("schema-website", { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl, inLanguage: lang === "zh" ? "zh-CN" : "en" });

    const segments = canonicalPath.split("/").filter(Boolean);
    const homeName = lang === "zh" ? "首页" : "Home";
    setJsonLd("schema-breadcrumb", { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: homeName, item: `${siteUrl}/` }, ...segments.map((segment, index) => ({ "@type": "ListItem", position: index + 2, name: breadcrumbName(segment, lang), item: `${siteUrl}/${segments.slice(0, index + 1).join("/")}` }))] });
  }, [lang, pathname]);

  return null;
}
