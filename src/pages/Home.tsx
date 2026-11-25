import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { optimizedImage, responsiveImage } from "@/lib/images";
import { useLang } from "@/lib/i18n";
import { projectCases } from "@/data/projectCases";
import { getHomeFaq } from "@/data/homeFaq";
import categories from "@/data/catalog";
import LazyCatalogSection from "./CatalogSection";

const slides = [
  { img: "/hero-slides/desktop-hero-1.jpg", mobileImg: "/optimized/hero-slides/mobile-hero-1.webp", altZh: "东升石材城建筑与周边街景航拍", altEn: "Aerial view of the Dongsheng Stone City building and surrounding streets", titEn: "DONGSHENG MARBLE", titleKey: "home_slide_heritage_title", descriptionKey: "home_slide_heritage_desc", href: "/about" },
  { img: "/optimized/project-cases/ziqi-donglai.webp", mobileImg: "/optimized/project-cases/ziqi-donglai.webp", altZh: "东来紫气项目室内空间中的纹理石材背景墙", altEn: "Veined stone feature wall in the Ziqi Donglai project interior", titEn: "PROJECT CASES", titleKey: "home_project_cases_title", descriptionKey: "home_project_cases_desc", href: "/cases" },
  { img: "/hero-slides/hero-desktop-2.jpg", mobileImg: "/optimized/hero-slides/mobile-hero-3.webp", altZh: "东升展厅内陈列的天然石材大板", altEn: "Natural stone slabs displayed in the Dongsheng showroom", titEn: "GLOBAL SOURCING", titleKey: "home_slide_sourcing_title", descriptionKey: "home_slide_sourcing_desc", href: "/catalog" },
  { img: "/hero-slides/hero-desktop-3.jpg", mobileImg: "/optimized/hero-slides/mobile-hero-4.webp", altZh: "室内仓储空间中成排存放的石材大板", altEn: "Rows of stone slabs stored inside a warehouse", titEn: "COMPLETE CHAIN", titleKey: "home_slide_chain_title", descriptionKey: "home_slide_chain_desc", href: "/catalog" },
  { img: "/hero-slides/hero-desktop-4.jpg", mobileImg: "/optimized/hero-slides/mobile-hero-5.webp", altZh: "东升仓库内包装待运的石材大板", altEn: "Packaged stone slabs ready for transport in a Dongsheng warehouse", titEn: "TOP 100 TAXPAYER", titleKey: "home_slide_taxpayer_title", descriptionKey: "home_slide_taxpayer_desc", href: "/about" },
];

export default function Home() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFilmPlaying, setIsFilmPlaying] = useState(false);
  const currentSlide = slides[active];
  const catalogSummary = {
    productCount: categories.reduce((sum, category) => sum + category.products.length, 0),
    collectionCount: categories.length,
  };

  const next = useCallback(() => setActive((s) => (s + 1) % slides.length), []);
  const prev = useCallback(() => setActive((s) => (s - 1 + slides.length) % slides.length), []);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [isPaused, next, prefersReducedMotion]);

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
        {slides.map((slide, index) => (
          <div
            key={slide.img}
            aria-hidden={index !== active}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === active ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none"
            }`}
          >
            <Link to={slide.href} tabIndex={index === active ? 0 : -1} className="block w-full h-full relative">
              <picture className="block w-full h-full">
                <source media="(max-width: 767px)" srcSet={slide.mobileImg} />
                <img
                  {...responsiveImage(slide.img)}
                  alt={lang === "zh" ? slide.altZh : slide.altEn}
                  loading="eager"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            </Link>
          </div>
        ))}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
            <div key={active} className="max-w-[640px]" style={{ animation: "slideFadeIn 1.2s ease-out" }}>
              <p className="text-white/60 text-[clamp(0.7rem,1.2vw,0.9rem)] font-light tracking-[0.25em] uppercase mb-4 md:mb-6">{currentSlide.titEn}</p>
              <h1 className="text-white text-[clamp(2rem,5vw,4rem)] font-light tracking-[0.08em] leading-[1.2] mb-4 md:mb-6 uppercase">{t(currentSlide.titleKey)}</h1>
              <p className="text-white/80 text-[clamp(0.85rem,1.4vw,1.1rem)] font-light tracking-[0.06em] leading-relaxed">{t(currentSlide.descriptionKey)}</p>
              <div className="flex flex-wrap gap-3 mt-8 md:mt-10">
                <Link to="/contact" className="inline-flex min-h-[48px] items-center gap-2 px-6 bg-[#e60012] text-white text-[13px] font-bold hover:bg-[#e60012]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {t("nav_quote")}
                </Link>
                <Link to="/catalog" className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white/30 text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-white/10 transition-colors">{t("home_view_products")}</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pb-8 md:pb-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-0">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)} aria-label={t("home_carousel_slide_label", { number: String(i + 1) })} aria-current={i === active}
                    className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center">
                    <span aria-hidden="true" className="block h-[3px] transition-all duration-500" style={{ width: i === active ? "40px" : "24px", backgroundColor: i === active ? "#e60012" : "rgba(255,255,255,0.65)" }} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prev} aria-label={t("home_carousel_prev")} className="min-w-[48px] min-h-[48px] flex items-center justify-center border border-white/60 hover:border-white hover:bg-white/10 transition-all duration-300 group">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/60 group-hover:text-white" aria-hidden="true"><path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button onClick={next} aria-label={t("home_carousel_next")} className="min-w-[48px] min-h-[48px] flex items-center justify-center border border-white/60 hover:border-white hover:bg-white/10 transition-all duration-300 group">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/60 group-hover:text-white" aria-hidden="true"><path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes slideFadeIn { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
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
                <div className="text-[#e60012] text-[clamp(1.8rem,3vw,2.5rem)] font-black tracking-[0.02em] leading-none mb-2">{s.num}</div>
                <div className="text-[#111111]/50 text-[13px] tracking-[0.06em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Cases */}
      <section className="max-w-[1400px] mx-auto px-6 pt-20 pb-10">
        <div className="text-center mb-12">
          <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">PROJECT CASES</span>
          <h2 className="text-[#111111] text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-3">{t("home_project_cases_title")}</h2>
          <p className="text-[#111111]/45 text-[14px] max-w-[520px] mx-auto leading-relaxed">{t("home_project_cases_desc")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
          {projectCases.slice(0, 8).map((projectCase) => (
            <Link key={projectCase.slug} to={`/cases/${projectCase.slug}`} className="group relative block overflow-hidden bg-[#f5f5f5] aspect-[3/4]">
              <img src={projectCase.cover} alt={lang === "zh" ? projectCase.name : projectCase.en} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute left-0 right-0 bottom-0 px-4 py-3">
                <p className="text-white text-[13px] font-semibold">{lang === "zh" ? projectCase.name : projectCase.en.toUpperCase()}</p>
                {lang === "zh" && <p className="text-white/65 text-[10px] font-medium mt-0.5">{projectCase.en}</p>}
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link to="/cases" className="inline-flex items-center gap-2 text-[#111111] text-[12px] font-bold tracking-[0.10em] uppercase border-b-2 border-[#e60012] pb-1 hover:text-[#e60012] transition-colors">
            {t("home_view_all_cases")}<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L12 8L6 14" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

      <LazyCatalogSection />

      {/* Brand Film */}
      <section className="bg-[#111111] py-20 px-6">
        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
          <div>
            <span className="text-[#e60012] text-[11px] font-bold tracking-[0.20em] uppercase">Brand Film</span>
            <h2 className="text-white text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-[0.03em] mt-4 mb-5">{t("home_brand_film_title")}</h2>
            <p className="text-white/60 text-[15px] leading-relaxed max-w-[440px]">{t("home_brand_film_desc")}</p>
          </div>
          <div className="relative aspect-video overflow-hidden bg-black">
            {isFilmPlaying ? (
              <video className="w-full h-full" controls autoPlay preload="none">
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
                    <div className="w-10 h-10 bg-[#e60012]/10 rounded-full flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e60012" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <h3 className="text-[#111111] text-[14px] font-bold tracking-[0.04em] mb-1">{item.title}</h3>
                      <p className="text-[#111111]/45 text-[13px] leading-[1.7]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-[#111111] text-[12px] font-bold tracking-[0.10em] uppercase border-b-2 border-[#e60012] pb-1 hover:text-[#e60012] transition-colors">
                {t("home_learn_more")}<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L12 8L6 14" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div className="overflow-hidden img-hover">
              <img src={optimizedImage("/brand-gallery/home-stone-city.jpg")} alt={t("home_strength_image_alt")} className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Product and inquiry guidance */}
      <section className="bg-[#f7f7f5] py-16 px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="max-w-[680px] mb-8">
            <span className="text-[#e60012] text-[11px] font-bold tracking-[0.20em] uppercase">{lang === "zh" ? "产品与询盘" : "PRODUCTS & INQUIRIES"}</span>
            <h2 className="text-[#111] text-[clamp(1.5rem,3vw,2rem)] font-black tracking-[0.02em] mt-3 mb-3">{lang === "zh" ? "选材和询价前，先了解这些信息" : "What to know before selecting and quoting stone"}</h2>
            <p className="text-[#111]/60 text-[15px] leading-relaxed">{lang === "zh" ? "官网目录展示产品名称和图片；具体材料与项目要求需要在询盘中进一步确认。" : "The website catalog presents product names and images; material and project requirements are confirmed through inquiry."}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 border-y border-black/10 py-6 mb-8">
            <div>
              <h3 className="text-[#111] text-[13px] font-bold mb-2">{lang === "zh" ? "企业资料" : "Company profile"}</h3>
              <p className="text-[#111]/65 text-[13px] leading-[1.75]">{lang === "zh" ? "福建省东升石业股份有限公司总部位于福建南安水头。官网企业介绍记载，东升石材事业始于1992年，公司于2000年成立；两项年份分别指业务起点与公司成立。" : "Fujian Dongsheng Stone Industry Co., Ltd. is headquartered in Shuitou, Nan'an, Fujian. Its published company profile records 1992 as the beginning of Dongsheng's stone business and 2000 as the year the company was established; the dates refer to separate milestones."}</p>
              <Link to="/about" className="inline-block mt-2 text-[#111] text-[12px] font-semibold border-b border-[#e60012] pb-0.5 hover:text-[#e60012]">{lang === "zh" ? "查看企业介绍" : "Read the company profile"}</Link>
            </div>
            <div>
              <h3 className="text-[#111] text-[13px] font-bold mb-2">{lang === "zh" ? "公开业务介绍" : "Published business scope"}</h3>
              <p className="text-[#111]/65 text-[13px] leading-[1.75]">{lang === "zh" ? "官网列出的业务包括大理石荒料采购与批发、大板生产加工及销售。" : "The company profile lists marble block sourcing and wholesale, slab production and processing, and sales."}</p>
              <Link to="/about" className="inline-block mt-2 text-[#111] text-[12px] font-semibold border-b border-[#e60012] pb-0.5 hover:text-[#e60012]">{lang === "zh" ? "来源：东升企业介绍" : "Source: Dongsheng company profile"}</Link>
            </div>
            <div>
              <h3 className="text-[#111] text-[13px] font-bold mb-2">{lang === "zh" ? "官网产品目录" : "Website product catalog"}</h3>
              <p className="text-[#111]/65 text-[13px] leading-[1.75]">{lang === "zh" ? `当前目录列有${categories.reduce((sum, category) => sum + category.products.length, 0)}个产品条目，分为${categories.length}个系列；具体规格和供应情况需逐项确认。` : `The current catalog lists ${categories.reduce((sum, category) => sum + category.products.length, 0)} product entries across ${categories.length} collections; specifications and availability require item-by-item confirmation.`}</p>
              <Link to="/catalog" className="inline-block mt-2 text-[#111] text-[12px] font-semibold border-b border-[#e60012] pb-0.5 hover:text-[#e60012]">{lang === "zh" ? "查看产品目录" : "View the catalog"}</Link>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {getHomeFaq(lang, catalogSummary).map((item) => (
              <details key={item.question} className="group bg-white border border-black/8 p-5 md:p-6">
                <summary className="relative cursor-pointer list-none pr-8 text-[#111] leading-relaxed marker:hidden [&::-webkit-details-marker]:hidden">
                  <h3 className="m-0 pr-5 text-[15px] font-bold">{item.question}</h3>
                  <span aria-hidden="true" className="absolute right-0 top-0 text-[#e60012] text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[#111]/65 text-[14px] leading-[1.8]">{item.answer}</p>
              </details>
            ))}
          </div>
          <aside className="mt-8 border-t border-black/10 pt-6" aria-labelledby="stone-reference-heading">
            <h3 id="stone-reference-heading" className="text-[#111] text-[13px] font-bold mb-2">
              {lang === "zh" ? "石材选用与养护参考" : "Stone selection and care references"}
            </h3>
            <p className="max-w-[760px] text-[#111]/65 text-[13px] leading-[1.8]">
              {lang === "zh" ? (
                <>
                  Natural Stone Institute 的
                  <cite><a className="underline underline-offset-2" href="https://www.naturalstoneinstitute.org/consumers/care/" target="_blank" rel="noopener noreferrer">石材养护指南</a></cite>
                  指出，养护方式应结合石材分类与组成；柠檬汁、醋等酸性产品可能使含碳酸盐的石材失去光泽或被蚀刻。其
                  <cite><a className="underline underline-offset-2" href="https://www.naturalstoneinstitute.org/designprofessionals/varieties/definition/" target="_blank" rel="noopener noreferrer">石材分类说明</a></cite>
                  也介绍了科学分类与商业名称之间的差异。以上为一般行业参考，具体产品和使用场景仍应向供应商确认。
                </>
              ) : (
                <>
                  The Natural Stone Institute's <cite><a className="underline underline-offset-2" href="https://www.naturalstoneinstitute.org/consumers/care/" target="_blank" rel="noopener noreferrer">care guide</a></cite>
                  says care depends on a stone's classification and composition. Acidic products such as lemon or vinegar may dull or etch calcareous stones. Its
                  <cite><a className="underline underline-offset-2" href="https://www.naturalstoneinstitute.org/designprofessionals/varieties/definition/" target="_blank" rel="noopener noreferrer">stone classification guide</a></cite>
                  also explains that scientific and commercial definitions may differ. These are general references; confirm the exact product and use with your supplier.
                </>
              )}
            </p>
          </aside>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-semibold">
            <Link to="/catalog" className="text-[#111] border-b border-[#e60012] pb-1 hover:text-[#e60012]">{lang === "zh" ? "浏览产品目录" : "Browse the product catalog"}</Link>
            <Link to="/contact" className="text-[#111] border-b border-[#e60012] pb-1 hover:text-[#e60012]">{lang === "zh" ? "提交项目询盘" : "Send a project inquiry"}</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#e60012] py-16 px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <h2 className="text-white text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-3">{t("home_cta_title")}</h2>
          <p className="text-white/70 text-[15px] mb-8 max-w-[460px] mx-auto leading-relaxed">{t("home_cta_desc")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-3.5 bg-white text-[#e60012] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white/90 transition-colors">
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
