import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/lib/i18n";

type Lang = "zh" | "en";
type PageMeta = { title: string; description: string; keywords: string };
type LocalizedMeta = Record<Lang, PageMeta>;

const siteUrl = "https://www.dsmar.com";
const defaultImage = `${siteUrl}/optimized/brand-gallery/2025_12_05_14_26_IMG_0505.webp`;

const projectCaseMeta: Record<string, { zh: PageMeta; en: PageMeta; ogImage?: string }> = {
  "ziqi-donglai": {
    zh: { title: "紫气东来｜奢石工程案例 — DONGSHENG MARBLE", description: "紫气东来奢石应用于高端住宅和商业空间的工程案例图集，紫色调天然大理石，纹理独特，适合背景墙和视觉焦点区域。", keywords: "紫气东来,奢石,大理石工程案例,紫色大理石" },
    en: { title: "Ziqi Donglai | Luxury Stone Project — DONGSHENG MARBLE", description: "Project gallery featuring Ziqi Donglai luxury stone in premium residential and commercial interiors. Purple-toned natural marble with distinctive veining.", keywords: "Ziqi Donglai,luxury stone,marble project case,purple marble" },
  },
  "monet-garden": {
    zh: { title: "莫奈花园｜图案大理石工程案例 — DONGSHENG MARBLE", description: "莫奈花园图案大理石应用于高档空间的工程案例图集，艺术感纹理适合背景墙和玄关。", keywords: "莫奈花园,图案大理石,大理石案例,背景墙石材" },
    en: { title: "Monet Garden | Pattern Marble Project — DONGSHENG MARBLE", description: "Project gallery featuring Monet Garden pattern marble in upscale interiors. Artistic natural veining ideal for feature walls.", keywords: "Monet Garden,pattern marble,marble project,feature wall stone" },
  },
  "lange-brown": {
    zh: { title: "朗格棕｜棕色大理石工程案例 — DONGSHENG MARBLE", description: "朗格棕暖棕色大理石在住宅与商业空间中的工程案例图集，温馨典雅。", keywords: "朗格棕,棕色大理石,暖色大理石,工程案例" },
    en: { title: "Lange Brown | Brown Marble Project — DONGSHENG MARBLE", description: "Project gallery of Lange Brown warm brown marble in residential and commercial spaces.", keywords: "Lange Brown,brown marble,warm marble,project gallery" },
  },
  "hanbaiyu": {
    zh: { title: "汉白玉｜白色大理石工程案例 — DONGSHENG MARBLE", description: "汉白玉纯白大理石在高端住宅与工程中的实景案例图集，经典不衰。", keywords: "汉白玉,白色大理石,大理石工程,经典大理石" },
    en: { title: "Chinese White Marble | Classic White Stone Project — DONGSHENG MARBLE", description: "Project gallery showcasing Chinese White Marble in premium residential and commercial applications.", keywords: "Chinese White Marble,white marble,classic stone,marble project" },
  },
  "mijita": {
    zh: { title: "米基塔｜米黄大理石工程案例 — DONGSHENG MARBLE", description: "米基塔米黄色大理石在空间设计中的应用案例图集，温馨典雅。", keywords: "米基塔,米黄大理石,暖色石材,工程案例" },
    en: { title: "Mijita | Beige Marble Project — DONGSHENG MARBLE", description: "Project gallery featuring Mijita beige marble in interior design applications.", keywords: "Mijita,beige marble,warm stone,project case" },
  },
  "dina-white": {
    zh: { title: "迪娜白｜白色大理石工程案例 — DONGSHENG MARBLE", description: "迪娜白纯净白色大理石在空间中的实景案例，百搭各种风格。", keywords: "迪娜白,白色大理石,纯净石材,工程案例" },
    en: { title: "Dina White | White Marble Project — DONGSHENG MARBLE", description: "Project gallery of Dina White marble, a pure white stone suited to diverse interior styles.", keywords: "Dina White,white marble,pure stone,project gallery" },
  },
  "starry-grey": {
    zh: { title: "星际灰｜灰色大理石工程案例 — DONGSHENG MARBLE", description: "星际灰现代灰色大理石在住宅与商业空间中的应用案例图集。", keywords: "星际灰,灰色大理石,现代石材,工程案例" },
    en: { title: "Starry Grey | Grey Marble Project — DONGSHENG MARBLE", description: "Project gallery of Starry Grey modern grey marble in residential and commercial interiors.", keywords: "Starry Grey,grey marble,modern stone,project case" },
  },
  "brasilia-black": {
    zh: { title: "巴西利亚黑｜黑色大理石工程案例 — DONGSHENG MARBLE", description: "巴西利亚黑深色大理石在高端空间中的工程案例图集，沉稳大气。", keywords: "巴西利亚黑,黑色大理石,深色石材,工程案例" },
    en: { title: "Brasilia Black | Black Marble Project — DONGSHENG MARBLE", description: "Project gallery of Brasilia Black dark marble in premium interior spaces.", keywords: "Brasilia Black,black marble,dark stone,project gallery" },
  },
  "tiffany": {
    zh: { title: "蒂芙尼｜图案大理石工程案例 — DONGSHENG MARBLE", description: "蒂芙尼独特图案大理石在空间设计中的应用案例图集。", keywords: "蒂芙尼,图案大理石,独特纹理,工程案例" },
    en: { title: "Tiffany | Pattern Marble Project — DONGSHENG MARBLE", description: "Project gallery featuring Tiffany pattern marble with distinctive natural veining.", keywords: "Tiffany,pattern marble,unique veining,project case" },
  },
  "shanna": {
    zh: { title: "莎安娜｜米黄大理石工程案例 — DONGSHENG MARBLE", description: "莎安娜米黄大理石在工程中的实景案例图集。", keywords: "莎安娜,米黄大理石,实景案例" },
    en: { title: "Shanna | Beige Marble Project — DONGSHENG MARBLE", description: "Project gallery of Shanna beige marble in architectural applications.", keywords: "Shanna,beige marble,architectural stone" },
  },
  "bulgari-pink": {
    zh: { title: "宝格丽粉｜粉色大理石工程案例 — DONGSHENG MARBLE", description: "宝格丽粉粉色大理石在空间中的应用案例图集，优雅个性。", keywords: "宝格丽粉,粉色大理石,个性石材,工程案例" },
    en: { title: "Bulgari Pink | Pink Marble Project — DONGSHENG MARBLE", description: "Project gallery of Bulgari Pink marble, elegant and distinctive in interior spaces.", keywords: "Bulgari Pink,pink marble,elegant stone,project gallery" },
  },
  "snow-mountain-jade": {
    zh: { title: "雪山翡翠｜奢石工程案例 — DONGSHENG MARBLE", description: "雪山翡翠白色底翡翠绿纹路奢石在高端空间中的实景案例。", keywords: "雪山翡翠,奢石,白色大理石,翡翠绿,工程案例" },
    en: { title: "Snow Mountain Jade | Luxury Stone Project — DONGSHENG MARBLE", description: "Project gallery of Snow Mountain Jade luxury stone with emerald-green veining on white marble.", keywords: "Snow Mountain Jade,luxury stone,emerald veining,white marble" },
  },
  "patek-green": {
    zh: { title: "百达翡绿｜绿色大理石工程案例 — DONGSHENG MARBLE", description: "百达翡绿绿色大理石在空间中的应用案例图集。", keywords: "百达翡绿,绿色大理石,个性石材,工程案例" },
    en: { title: "Patek Green | Green Marble Project — DONGSHENG MARBLE", description: "Project gallery of Patek Green marble in contemporary interior spaces.", keywords: "Patek Green,green marble,contemporary stone,project" },
  },
  "red-cave-stone": {
    zh: { title: "红洞石｜红色洞石工程案例 — DONGSHENG MARBLE", description: "红洞石经典红色洞石在工程中的应用案例图集。", keywords: "红洞石,洞石,红色石材,工程案例" },
    en: { title: "Red Cave Stone | Red Travertine Project — DONGSHENG MARBLE", description: "Project gallery of Red Cave Stone travertine in architectural applications.", keywords: "Red Cave Stone,red travertine,architectural stone,project" },
  },
  "yugoslavian-white": {
    zh: { title: "南斯拉夫白｜白色大理石工程案例 — DONGSHENG MARBLE", description: "南斯拉夫白经典白色大理石在工程中的实景案例图集。", keywords: "南斯拉夫白,白色大理石,经典石材,工程案例" },
    en: { title: "Yugoslavian White | White Marble Project — DONGSHENG MARBLE", description: "Project gallery of Yugoslavian White classic marble in architectural projects.", keywords: "Yugoslavian White,white marble,classic stone,project" },
  },
};

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
    zh: { title: "工程案例｜天然石材空间应用", description: "浏览东升石业精选工程案例，查看天然大理石与奢石在住宅、酒店及商业空间中的应用图集。", keywords: "石材工程案例,大理石案例,天然石材应用,奢石空间,东升石业" },
    en: { title: "Project Cases | Natural Stone Applications", description: "Explore selected Dongsheng project galleries featuring natural marble and luxury stone in residential, hospitality, and commercial spaces.", keywords: "stone project cases,marble projects,natural stone applications,luxury stone interiors,Dongsheng Stone" },
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
  if (pathname === "/search") {
    return lang === "zh"
      ? { title: "产品搜索｜东升大理石", description: "按名称、编号、类别和石材类型搜索东升大理石产品目录。", keywords: "大理石产品搜索,石材编号,石材目录" }
      : { title: "Product Search | DONGSHENG MARBLE", description: "Search Dongsheng Marble products by name, code, category, and stone type.", keywords: "marble product search,stone codes,stone catalogue" };
  }
  const caseMatch = pathname.match(/^\/cases\/([^/]+)/);
  if (caseMatch) {
    const caseMeta = projectCaseMeta[caseMatch[1]];
    if (caseMeta) return caseMeta[lang];
    return lang === "zh"
      ? { title: "工程案例｜DONGSHENG MARBLE", description: "东升大理石精选工程案例图集", keywords: "工程案例,大理石案例" }
      : { title: "Project Case | DONGSHENG MARBLE", description: "Dongsheng Marble project case gallery", keywords: "project case,marble case" };
  }
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

    // Resolve OG image: use case cover if available
    const caseMatch = pathname.match(/^\/cases\/([^/]+)/);
    const ogImage = caseMatch
      ? `${siteUrl}/optimized/project-cases/${caseMatch[1]}.webp`
      : defaultImage;

    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = meta.title;
    upsertMeta('meta[name="description"]', "content", meta.description, () => { const element = document.createElement("meta"); element.setAttribute("name", "description"); return element; });
    upsertMeta('meta[name="keywords"]', "content", meta.keywords, () => { const element = document.createElement("meta"); element.setAttribute("name", "keywords"); return element; });
    upsertMeta('link[rel="canonical"]', "href", canonical, () => { const element = document.createElement("link"); element.setAttribute("rel", "canonical"); return element; });

    // Hreflang — always point to www
    const hreflangs = [
      { rel: "alternate", hreflang: "zh-CN", href: `${siteUrl}/` },
      { rel: "alternate", hreflang: "x-default", href: `${siteUrl}/` },
    ];
    hreflangs.forEach(({ rel, hreflang, href }) => {
      const sel = `link[rel="${rel}"][hreflang="${hreflang}"]`;
      upsertMeta(sel, "href", href, () => {
        const el = document.createElement("link");
        el.setAttribute("rel", rel);
        el.setAttribute("hreflang", hreflang);
        return el;
      });
    });

    const ogTags: Record<string, string> = { "og:type": "website", "og:site_name": siteName, "og:title": meta.title, "og:description": meta.description, "og:url": canonical, "og:image": ogImage, "twitter:card": "summary_large_image", "twitter:title": meta.title, "twitter:description": meta.description, "twitter:image": ogImage };
    Object.entries(ogTags).forEach(([property, content]) => {
      const isTwitter = property.startsWith("twitter:");
      upsertMeta(`meta[${isTwitter ? "name" : "property"}="${property}"]`, "content", content, () => { const element = document.createElement("meta"); element.setAttribute(isTwitter ? "name" : "property", property); return element; });
    });

    const address = lang === "zh"
      ? { streetAddress: "水头镇奎峰工业区", addressLocality: "南安市", addressRegion: "福建省" }
      : { streetAddress: "Kuifeng Industrial Zone, Shuitou Town", addressLocality: "Nan'an", addressRegion: "Fujian" };
    setJsonLd("schema-organization", { "@context": "https://schema.org", "@type": "Organization", name: siteName, url: siteUrl, email: "dongshengmarble@gmail.com", telephone: "+86 139 5994 8672", address: { "@type": "PostalAddress", ...address, addressCountry: "CN" } });
    setJsonLd("schema-website", { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl, inLanguage: lang === "zh" ? "zh-CN" : "en" });

    const segments = canonicalPath.split("/").filter(Boolean);
    const homeName = lang === "zh" ? "首页" : "Home";
    setJsonLd("schema-breadcrumb", { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: homeName, item: `${siteUrl}/` }, ...segments.map((segment, index) => ({ "@type": "ListItem", position: index + 2, name: breadcrumbName(segment, lang), item: `${siteUrl}/${segments.slice(0, index + 1).join("/")}` }))] });
  }, [lang, pathname]);

  return null;
}
