import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import categories from "@/data/catalog";
import { useLang } from "@/lib/i18n";
import { optimizedImage } from "@/lib/images";

const categoryNameKeys: Record<string, string> = {
  "white-series": "nav_white_series",
  "beige-series": "nav_beige_series",
  "grey-series": "nav_grey_series",
  "dark-series": "nav_dark_series",
  "color-series": "nav_color_series",
  "pattern-series": "nav_pattern_series",
};

export default function LazyCatalogSection() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || isVisible) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }}, { rootMargin: "0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="bg-white py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#dc2626] text-[11px] font-bold tracking-[0.20em] uppercase">SERIES</span>
          <h2 className="text-[#111] text-[clamp(1.5rem,3vw,2.4rem)] font-black tracking-[0.02em] mt-3">{t("home_catalog_title")}</h2>
          <p className="text-[#111]/50 text-[15px] mt-3 max-w-[560px] mx-auto">{t("home_catalog_desc")}</p>
        </div>

        {!isVisible ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="aspect-[4/3] bg-[#f0f0f0] animate-pulse rounded-sm" />)}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link key={cat.key} to={`/catalog/${cat.key}`} className="group relative block overflow-hidden bg-[#f5f5f5] aspect-[4/3]">
                  {cat.heroImg && !cat.heroImg.includes('placeholder') && (
                    <img src={optimizedImage(cat.heroImg)} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/30 group-hover:from-black/60 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <span className="text-white/40 text-[11px] font-bold tracking-[0.20em] mb-2">{lang === "zh" ? cat.subtitle : t("home_catalog_card_label")}</span>
                    <h3 className="text-white text-[24px] font-bold tracking-[0.06em] mb-2">{t(categoryNameKeys[cat.key] ?? cat.name)}</h3>
                    <span className="mt-5 inline-block text-[11px] font-bold tracking-[0.12em] text-white border border-white/30 px-5 py-2 group-hover:bg-white group-hover:text-[#111] transition-colors">{t("home_catalog_count", { count: String(cat.products.length) })}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/catalog" className="inline-flex items-center justify-center min-h-[48px] px-8 border border-[#111]/20 text-[#111] text-[12px] font-bold tracking-[0.06em] hover:bg-[#111] hover:text-white transition-colors">{t("home_catalog_view_all")}</Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
