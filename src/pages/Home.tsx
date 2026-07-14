import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { optimizedImage } from "@/lib/images";
import { useLang } from "@/lib/i18n";
import LazyCatalogSection from "./CatalogSection";

const slides = [
  { img: "/hero-slides/desktop-hero-1.jpg", mobileImg: "/optimized/hero-slides/mobile-hero-1.webp", titEn: "DONGSHENG MARBLE", titleKey: "home_slide_heritage_title", descriptionKey: "home_slide_heritage_desc", href: "/about" },
  { img: "/hero-slides/微信图片_20260713143648_181_45.jpg", mobileImg: "/optimized/hero-slides/mobile-hero-2.webp", titEn: "STONE SUPERMARKET", titleKey: "home_stone_market_title", descriptionKey: "home_stone_market_desc", href: "/collections/marble" },
  { img: "/hero-slides/微信图片_20260713143654_187_45.jpg", mobileImg: "/optimized/hero-slides/mobile-hero-3.webp", titEn: "GLOBAL SOURCING", titleKey: "home_slide_sourcing_title", descriptionKey: "home_slide_sourcing_desc", href: "/catalog" },
  { img: "/hero-slides/微信图片_20260713143655_188_45.jpg", mobileImg: "/optimized/hero-slides/mobile-hero-4.webp", titEn: "COMPLETE CHAIN", titleKey: "home_slide_chain_title", descriptionKey: "home_slide_chain_desc", href: "/catalog" },
  { img: "/hero-slides/微信图片_20260713143653_186_45.jpg", mobileImg: "/optimized/hero-slides/mobile-hero-5.webp", titEn: "TOP 100 TAXPAYER", titleKey: "home_slide_taxpayer_title", descriptionKey: "home_slide_taxpayer_desc", href: "/about" },
];

export default function Home() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFilmPlaying, setIsFilmPlaying] = useState(false);
  const currentSlide = slides[active];

  const next = useCallback(() => setActive((s) => (s + 1) % slides.length), []);
  const prev = useCallback(() => setActive((s) => (s - 1 + slides.length) % slides.length), []);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [isPaused, next, prefersReducedMotion]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    slides.forEach((slide) => {
      const image = new Image();
      image.src = isMobile ? slide.mobileImg : optimizedImage(slide.img);
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div>
      {/* Hero Carousel */}
      <div className="relative w-full h-screen overflow-hidden bg-black" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div key={active} className="absolute inset-0">
          <Link to={currentSlide.href} className="block w-full h-full relative">
            <picture className="block w-full h-full">
              <source media="(max-width: 767px)" srcSet={currentSlide.mobileImg} />
              <img src={optimizedImage(currentSlide.img)} alt="" loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover" style={{ animation: "heroScale 6s ease-out both" }} />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </Link>
        </div>
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
            <div key={active} className="max-w-[640px]" style={{ animation: "slideFadeIn 1.2s ease-out" }}>
              <p className="text-white/60 text-[clamp(0.7rem,1.2vw,0.9rem)] font-light tracking-[0.25em] uppercase mb-4 md:mb-6">{currentSlide.titEn}</p>
              <h1 className="text-white text-[clamp(2rem,5vw,4rem)] font-light tracking-[0.08em] leading-[1.2] mb-4 md:mb-6 uppercase">{t(currentSlide.titleKey)}</h1>
              <p className="text-white/80 text-[clamp(0.85rem,1.4vw,1.1rem)] font-light tracking-[0.06em] leading-relaxed">{t(currentSlide.descriptionKey)}</p>
              <div className="flex flex-wrap gap-3 mt-8 md:mt-10">
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#dc2626] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#dc2626]/80 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {t("nav_quote")}
                </Link>
                <Link to="/collections/marble" className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white/30 text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-white/10 transition-colors">{t("home_view_products")}</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pb-8 md:pb-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)} aria-label={t("home_carousel_slide_label", { number: String(i + 1) })}
                    className="group relative h-[3px] transition-all duration-500"
                    style={{ width: i === active ? "48px" : "24px", backgroundColor: i === active ? "#dc2626" : "rgba(255,255,255,0.3)" }} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prev} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all duration-300 group">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/60 group-hover:text-white"><path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button onClick={next} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all duration-300 group">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/60 group-hover:text-white"><path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes slideFadeIn { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
          @keyframes heroScale { from { transform:scale(1.04) } to { transform:scale(1) } }
        `}</style>
      </div>

      {/* Trust Bar */}
      <section className="bg-white border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "30+", label: t("home_stat_experience") },
              { num: "900+", label: t("home_stat_employees") },
              { num: t("home_stat_tax_value"), label: t("home_stat_tax") },
              { num: "30+", label: t("home_stat_countries") },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[#dc2626] text-[clamp(1.8rem,3vw,2.5rem)] font-black tracking-[0.02em] leading-none mb-2">{s.num}</div>
                <div className="text-[#111111]/50 text-[13px] tracking-[0.06em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stone Market */}
      <section className="max-w-[1400px] mx-auto px-6 pt-20 pb-10">
        <div className="text-center mb-12">
          <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">STONE MARKET</span>
          <h2 className="text-[#111111] text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-3">{t("home_stone_market_title")}</h2>
          <p className="text-[#111111]/45 text-[14px] max-w-[520px] mx-auto leading-relaxed">{t("home_stone_market_desc")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
          {[
            { name: "蓝水晶", en: "Calcite Blue", id: "12", img: "/gani-products/gani_013_蓝水晶.webp" },
            { name: "云朵拉灰", en: "New Castle Grey", id: "75", img: "/gani-products/gani_076_云朵拉灰.webp" },
            { name: "劳伦斯金", en: "Laurent Black", id: "90", img: "/gani-products/gani_091_劳伦斯金.webp" },
            { name: "阿玛尼棕", en: "Amani Brown", id: "101", img: "/gani-products/gani_102_阿玛尼棕.webp" },
            { name: "经典宝石蓝", en: "Brazil Blue Sodalite", id: "4", img: "/gani-products/gani_005_经典宝石蓝.webp" },
            { name: "亚马逊绿", en: "Amazon Green", id: "95", img: "/gani-products/gani_096_亚马逊绿.webp" },
            { name: "桃李春风", en: "Cristallo Pink", id: "0", img: "/gani-products/gani_001_桃李春风.webp" },
            { name: "卡拉拉金", en: "Oro Carrara", id: "40", img: "/gani-products/gani_041_卡拉拉金.webp" },
          ].map((p, i) => (
            <Link key={i} to={`/collections/product/${p.id}`} className="group relative block overflow-hidden bg-[#f5f5f5] aspect-[3/4]">
              <img src={optimizedImage(p.img)} alt={lang === "zh" ? p.name : p.en} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute left-0 right-0 bottom-0 px-4 py-3">
                <p className="text-white text-[13px] font-semibold">{lang === "zh" ? p.name : p.en}</p>
                {lang === "zh" && <p className="text-white/65 text-[10px] font-medium mt-0.5">{p.en}</p>}
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link to="/collections/marble" className="inline-flex items-center gap-2 text-[#111111] text-[12px] font-bold tracking-[0.10em] uppercase border-b-2 border-[#dc2626] pb-1 hover:text-[#dc2626] transition-colors">
            {t("home_view_all_products")}<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L12 8L6 14" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

      <LazyCatalogSection />

      {/* Brand Film */}
      <section className="bg-[#111111] py-20 px-6">
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
          <div>
            <span className="text-[#dc2626] text-[11px] font-bold tracking-[0.20em] uppercase">Brand Film</span>
            <h2 className="text-white text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-[0.03em] mt-4 mb-5">{t("home_brand_film_title")}</h2>
            <p className="text-white/60 text-[15px] leading-relaxed max-w-[440px]">{t("home_brand_film_desc")}</p>
          </div>
          <div className="relative aspect-video overflow-hidden bg-black">
            {isFilmPlaying ? (
              <video className="w-full h-full" controls autoPlay preload="metadata">
                <source src="/videos/dongsheng-brand-film.mp4" type="video/mp4" />
                {t("home_brand_film_unsupported")}
              </video>
            ) : (
              <button
                type="button"
                onClick={() => setIsFilmPlaying(true)}
                className="group relative w-full h-full text-left"
                aria-label={t("home_brand_film_play")}
              >
                <img src={optimizedImage("/brand-gallery/brand-film-cover.jpg")} alt={t("home_brand_film_cover_alt")} className="w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-16 h-16 rounded-full border border-white/70 bg-black/25 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" /></svg>
                  </span>
                </span>
                <span className="absolute left-6 bottom-5 text-white text-[11px] font-bold tracking-[0.16em] uppercase">{t("home_brand_film_play")}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Quality & Strength */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">{t("home_strength_label")}</span>
              <h2 className="text-[#111111] text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-6">{t("home_strength_title")}</h2>
              <div className="space-y-5">
                {[
                  { title: t("home_strength_sourcing_title"), desc: t("home_strength_sourcing_desc") },
                  { title: t("home_strength_chain_title"), desc: t("home_strength_chain_desc") },
                  { title: t("home_strength_trust_title"), desc: t("home_strength_trust_desc") },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#dc2626]/10 rounded-full flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <h3 className="text-[#111111] text-[14px] font-bold tracking-[0.04em] mb-1">{item.title}</h3>
                      <p className="text-[#111111]/45 text-[13px] leading-[1.7]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-[#111111] text-[12px] font-bold tracking-[0.10em] uppercase border-b-2 border-[#dc2626] pb-1 hover:text-[#dc2626] transition-colors">
                {t("home_learn_more")}<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L12 8L6 14" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div className="overflow-hidden img-hover">
              <img src={optimizedImage("/brand-gallery/home-stone-city.jpg")} alt={t("home_strength_image_alt")} className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#dc2626] py-16 px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <h2 className="text-white text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-3">{t("home_cta_title")}</h2>
          <p className="text-white/70 text-[15px] mb-8 max-w-[460px] mx-auto leading-relaxed">{t("home_cta_desc")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-3.5 bg-white text-[#dc2626] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white/90 transition-colors">
              {t("home_cta_inquiry")}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </Link>
            <a href="tel:+8613959948672" className="inline-flex items-center gap-2 px-10 py-3.5 bg-transparent border-2 border-white/30 text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white/10 transition-colors">
              {t("home_cta_call")}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
