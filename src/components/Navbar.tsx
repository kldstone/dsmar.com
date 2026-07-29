import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { trackConversion } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

const ProductSearch = lazy(() => import("./ProductSearch"));

let catalogPrefetched = false;
function prefetchCatalog() {
  if (catalogPrefetched) return;
  catalogPrefetched = true;
  void Promise.all([
    import("@/pages/Catalog"),
    import("@/pages/CatalogCategory"),
    import("@/pages/CatalogDetail"),
  ]);
}

export default function Navbar() {
  const location = useLocation();
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const lockedScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    lockedScrollY.current = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${lockedScrollY.current}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      window.scrollTo(0, lockedScrollY.current);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      } else if (searchOpen) {
        setSearchOpen(false);
        requestAnimationFrame(() => searchButtonRef.current?.focus());
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, searchOpen]);

  const isActive = (href: string) => href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);
  const navLinks = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_stone_market"), href: "/collections/marble" },
    {
      label: t("nav_mine_direct"),
      href: "/catalog",
      children: [
        { label: t("nav_white_series"), href: "/catalog/white-series" },
        { label: t("nav_beige_series"), href: "/catalog/beige-series" },
        { label: t("nav_grey_series"), href: "/catalog/grey-series" },
        { label: t("nav_dark_series"), href: "/catalog/dark-series" },
        { label: t("nav_color_series"), href: "/catalog/color-series" },
        { label: t("nav_pattern_series"), href: "/catalog/pattern-series" },
      ],
    },
    { label: t("nav_faq"), href: "/faq" },
    { label: t("nav_blog"), href: "/blog" },
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  function toggleSearch() {
    setMenuOpen(false);
    setSearchOpen((open) => !open);
  }

  function toggleMenu() {
    setSearchOpen(false);
    setMenuOpen((open) => !open);
  }

  return (
    <>
      <div className="w-full bg-white border-b border-black/5 text-[#444] text-[12px]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex items-center justify-between min-h-[36px]">
          <span className="truncate">{t("topbar_company")}</span>
          <span className="flex items-center ml-4 shrink-0">
            <span className="hidden sm:flex items-center gap-4 mr-3">
              <a href="tel:+8613959948672" className="inline-flex min-h-[44px] items-center hover:text-[#9f1d1d]">+86 139 5994 8672</a>
              <span aria-hidden="true" className="text-black/20">|</span>
              <span>{t("topbar_social")}</span>
              <span aria-hidden="true" className="text-black/20">|</span>
            </span>
            <span className="flex items-center text-[12px] font-semibold">
              <button onClick={() => setLang("zh")} aria-label={lang === "zh" ? "当前语言：中文" : "切换到中文"} className={`min-w-[44px] min-h-[44px] ${lang === "zh" ? "text-[#9f1d1d]" : "text-[#444]"}`}>简</button>
              <span aria-hidden="true" className="text-black/20">/</span>
              <button onClick={() => setLang("en")} aria-label={lang === "en" ? "Current language: English" : "Switch to English"} className={`min-w-[44px] min-h-[44px] ${lang === "en" ? "text-[#9f1d1d]" : "text-[#444]"}`}>EN</button>
            </span>
          </span>
        </div>
      </div>

      <nav aria-label={lang === "zh" ? "主导航" : "Primary navigation"} className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow] ${scrolled ? "bg-white/98 shadow-sm" : "bg-white/95"} backdrop-blur-[20px]`}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex items-center justify-between min-h-[78px] gap-3">
          <Link to="/" className="flex items-center gap-3 shrink-0 min-h-[44px]">
            <img src={lang === "zh" ? "/logo-cn.png" : "/logo-en.png"} alt={lang === "zh" ? "东升石业" : "DONGSHENG STONE"} width="509" height="447" className={`h-[66px] md:h-[72px] w-auto object-contain ${lang === "en" ? "scale-[1.12] origin-left" : ""}`} />
            <span className="hidden xl:block text-[#555] text-[12px] font-medium">{t("topbar_location")}</span>
          </Link>

          <div className="hidden lg:flex items-center">
            {navLinks.map((link) => (
              <div key={link.href} className="relative" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setActiveDropdown(null); }} onMouseLeave={() => setActiveDropdown(null)}>
                <Link
                  to={link.href}
                  className={`inline-flex items-center justify-center min-h-[44px] px-[11px] text-[13px] font-semibold whitespace-nowrap ${isActive(link.href) ? "text-[#9f1d1d]" : "text-[#444] hover:text-[#111]"}`}
                  aria-haspopup={link.children ? "menu" : undefined}
                  aria-expanded={link.children ? activeDropdown === link.href : undefined}
                  onFocus={() => { if (link.children) setActiveDropdown(link.href); if (link.href === "/catalog") prefetchCatalog(); }}
                  onMouseEnter={() => { if (link.children) setActiveDropdown(link.href); if (link.href === "/catalog") prefetchCatalog(); }}
                >
                  {link.label}
                  {link.children && <svg aria-hidden="true" className="ml-1 w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>}
                </Link>
                {link.children && activeDropdown === link.href && (
                  <div role="menu" className="absolute top-full left-0 min-w-[210px] bg-white shadow-lg border border-black/10 py-2">
                    {link.children.map((child) => <Link role="menuitem" key={child.href} to={child.href} className="flex min-h-[44px] items-center px-5 text-[13px] text-[#444] hover:text-[#111] hover:bg-red-50">{child.label}</Link>)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              ref={searchButtonRef}
              type="button"
              aria-label={searchOpen ? (lang === "zh" ? "关闭搜索" : "Close search") : (lang === "zh" ? "搜索产品" : "Search products")}
              aria-expanded={searchOpen}
              aria-controls="global-product-search"
              onClick={toggleSearch}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#222]"
            >
              <svg aria-hidden="true" className="w-[21px] h-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
            </button>

            <Link to="/contact" onClick={() => trackConversion("quote_cta", { source: "navbar" })} className="hidden md:inline-flex min-h-[44px] items-center justify-center px-5 bg-[#9f1d1d] text-white text-[13px] font-bold hover:bg-[#7f1717]">{lang === "zh" ? "获取报价" : "Request a Quote"}</Link>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={toggleMenu}
              className="lg:hidden relative min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#222]"
            >
              <span aria-hidden="true" className={`absolute w-6 h-0.5 bg-current transition-transform motion-reduce:transition-none ${menuOpen ? "rotate-45" : "-translate-y-1"}`} />
              <span aria-hidden="true" className={`absolute w-6 h-0.5 bg-current transition-transform motion-reduce:transition-none ${menuOpen ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div id="global-product-search">
            <Suspense fallback={<div className="absolute top-full left-0 right-0 bg-white p-6 text-center text-[14px]" role="status">{lang === "zh" ? "载入搜索……" : "Loading search…"}</div>}>
              <ProductSearch onClose={() => setSearchOpen(false)} triggerRef={searchButtonRef} />
            </Suspense>
          </div>
        )}

        <div id="mobile-navigation" hidden={!menuOpen} className="lg:hidden border-t border-black/10 bg-white max-h-[calc(100dvh-114px)] overflow-y-auto overscroll-contain touch-pan-y">
          <div className="px-5 py-3">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link to={link.href} className={`flex min-h-[48px] items-center text-[14px] font-semibold border-b border-black/5 ${isActive(link.href) ? "text-[#9f1d1d]" : "text-[#333]"}`}>{link.label}</Link>
                {link.children && (
                  <div className="pl-5 pb-2">
                    {link.children.map((child) => <Link key={child.href} to={child.href} className="flex min-h-[44px] items-center text-[13px] text-[#444] border-b border-black/5">{child.label}</Link>)}
                  </div>
                )}
              </div>
            ))}
            <Link to="/contact" onClick={() => trackConversion("quote_cta", { source: "navbar_mobile" })} className="mt-4 flex min-h-[48px] items-center justify-center bg-[#9f1d1d] text-white text-[14px] font-bold">{lang === "zh" ? "获取报价" : "Request a Quote"}</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
