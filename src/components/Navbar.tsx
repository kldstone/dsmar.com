import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { trackConversion } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

let catalogPrefetched = false;
function prefetchCatalog() {
  if (catalogPrefetched) return;
  catalogPrefetched = true;
  import("@/pages/Catalog");
  import("@/pages/CatalogCategory");
  import("@/pages/CatalogDetail");
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t, lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

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

  return (
    <>
      <div className="w-full bg-white border-b border-black/5 text-[#111111]/50 text-[12px] tracking-[0.04em]">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between min-h-[34px]">
          <span className="truncate">{t("topbar_company")}</span>
          <span className="flex items-center gap-4 ml-4 shrink-0">
            <span className="hidden sm:flex items-center gap-4">
              <a href="tel:+8613959948672" className="hover:text-[#dc2626] transition-colors">+86 139 5994 8672</a>
              <span className="text-black/20">|</span>
              <span className="flex items-center gap-1.5 text-[#111111]/50">{t("topbar_social")}</span>
              <span className="text-black/20">|</span>
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold tracking-[0.06em]">
              <button onClick={() => setLang("zh")} className={`transition-colors ${lang === "zh" ? "text-[#dc2626]" : "text-[#111111]/40 hover:text-[#111111]"}`}>中文</button>
              <span className="text-black/20">/</span>
              <button onClick={() => setLang("en")} className={`transition-colors ${lang === "en" ? "text-[#dc2626]" : "text-[#111111]/40 hover:text-[#111111]"}`}>EN</button>
            </div>
          </span>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-400 border-b ${scrolled ? "bg-white/97 border-black/8 backdrop-blur-[20px] shadow-sm" : "bg-white/95 border-black/5 backdrop-blur-[20px]"}`}>
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between min-h-[78px] gap-6">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src="/optimized/logo.webp" alt="东升大理石" width="189" height="126" className="h-[126px] w-auto object-contain md:h-[126px] max-md:h-[70px]" />
            <span className="hidden lg:block text-[#111111]/60 text-[12px] tracking-[0.06em] font-medium">{t("topbar_location")}</span>
          </Link>

          <div className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group/dropdown" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setActiveDropdown(null); }}>
                <Link to={link.href} className={`inline-flex items-center justify-center min-h-[44px] px-[12px] text-[12.5px] font-semibold tracking-[0.05em] transition-colors whitespace-nowrap ${isActive(link.href) ? "text-[#dc2626] font-bold" : "text-[#111111]/60 hover:text-[#111111]"}`}
                  onFocus={() => { link.children && setActiveDropdown(link.href); if (link.href === "/catalog") prefetchCatalog(); }}
                  onMouseEnter={() => { link.children && setActiveDropdown(link.href); if (link.href === "/catalog") prefetchCatalog(); }}
                  onMouseLeave={() => link.children && setActiveDropdown(null)}>
                  {link.label}
                  {link.children && <svg className="ml-1 w-3 h-3 transition-transform group-hover/dropdown:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>}
                </Link>
                {link.children && activeDropdown === link.href && (
                  <div className="absolute top-full left-0 min-w-[190px] bg-white shadow-lg border border-black/5 py-2 animate-fadeInDown"
                    onMouseEnter={() => setActiveDropdown(link.href)} onMouseLeave={() => setActiveDropdown(null)}>
                    {link.children.map((child) => (
                      <Link key={child.href} to={child.href} className={`block px-5 py-3 text-[12px] font-medium tracking-[0.04em] transition-colors ${location.pathname === child.href ? "text-[#dc2626] font-bold" : "text-[#111111]/60 hover:text-[#111111] hover:bg-[#dc2626]/5"}`}>{child.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex lg:hidden items-center gap-0">
            {navLinks.slice(0, 5).map((link) => (
              <Link key={link.href} to={link.href} className={`inline-flex items-center justify-center min-h-[44px] px-[9px] text-[11px] font-semibold tracking-[0.03em] transition-colors whitespace-nowrap ${isActive(link.href) ? "text-[#dc2626] font-bold" : "text-[#111111]/60 hover:text-[#111111]"}`}>{link.label}</Link>
            ))}
            <span className="text-black/20 text-[11px] px-1">···</span>
          </div>

          <Link to="/contact" onClick={() => trackConversion("quote_cta", { source: "navbar" })}
            className="hidden md:inline-flex items-center justify-center min-h-[40px] px-5 bg-[#dc2626] text-white text-[12px] font-bold tracking-[0.06em] hover:bg-[#dc2626]/80 transition-colors whitespace-nowrap shrink-0">{t("nav_quote")}</Link>

          <button aria-label="Toggle navigation menu" aria-expanded={menuOpen}
            className="md:hidden border border-black/15 bg-transparent text-[#111111]/80 px-3 py-2 text-[12px] font-bold tracking-[0.08em]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? t("nav_mobile_close") : t("nav_mobile_menu")}
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-[max-height,border-color] duration-300 ${menuOpen ? "max-h-[700px] border-t border-black/5" : "max-h-0"}`}>
          <div className="bg-white px-6 py-3 border-b border-black/5">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link to={link.href} className={`block py-3.5 text-[13px] font-semibold tracking-[0.06em] border-b border-black/5 transition-colors ${isActive(link.href) ? "text-[#dc2626] font-bold" : "text-[#111111]/60 hover:text-[#111111]"}`}>{link.label}</Link>
                {link.children && menuOpen && (
                  <div className="pl-5 pb-2">
                    {link.children.map((child) => (
                      <Link key={child.href} to={child.href} className="block py-2.5 text-[12px] tracking-[0.04em] text-[#111111]/40 hover:text-[#dc2626] transition-colors border-b border-black/3">{child.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/contact" onClick={() => trackConversion("quote_cta", { source: "navbar_mobile" })}
              className="mt-3 block text-center bg-[#dc2626] text-white py-3 text-[12px] font-bold tracking-[0.06em]">{t("nav_quote")}</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
