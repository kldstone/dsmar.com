import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl, localizedBrand, resolvePageSeo } from "@/lib/pageSeo";
import { useLang } from "@/lib/i18n";

export default function SEO() {
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const seo = resolvePageSeo(pathname, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = seo.title;

    const setMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
      if (!element) {
        element = document.createElement(selector.startsWith("link") ? "link" : "meta");
        document.head.appendChild(element);
      }
      for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
    };

    setMeta('meta[name="description"]', { name: "description", content: seo.description });
    setMeta('meta[name="robots"]', { name: "robots", content: seo.robots });
    setMeta('link[rel="canonical"]', { rel: "canonical", href: seo.canonical });
    if (seo.alternates) {
      setMeta('link[rel="alternate"][hreflang="en"]', { rel: "alternate", hreflang: "en", href: seo.alternates.en });
      setMeta('link[rel="alternate"][hreflang="zh-CN"]', { rel: "alternate", hreflang: "zh-CN", href: seo.alternates.zh });
      setMeta('link[rel="alternate"][hreflang="x-default"]', { rel: "alternate", hreflang: "x-default", href: seo.alternates.xDefault });
    } else {
      document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove());
    }
    setMeta('meta[property="og:type"]', { property: "og:type", content: pathname.startsWith("/blog/") ? "article" : "website" });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: localizedBrand(lang) });
    setMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    setMeta('meta[property="og:url"]', { property: "og:url", content: seo.canonical });
    setMeta('meta[property="og:image"]', { property: "og:image", content: absoluteUrl(seo.image) });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: absoluteUrl(seo.image) });

    document.head.querySelectorAll('script[type="application/ld+json"][data-page-schema]').forEach((element) => element.remove());
    seo.structuredData.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.pageSchema = String(index);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [lang, pathname]);

  return null;
}
