import { Link } from "react-router-dom";
import { trackConversion } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="relative bg-[#f8f8f8] text-[#111111]/65 border-t border-black/8">
      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="py-16 border-b border-black/6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <img src={lang === "zh" ? "/logo-cn.png" : "/logo-en.png"} alt={lang === "zh" ? "东升石业" : "DONGSHENG STONE"} width="509" height="447" className="h-[72px] w-auto mb-5" loading="lazy" decoding="async" />
              <p className="text-[#111111]/45 text-[13px] leading-relaxed max-w-[240px]">{t("footer_tagline")}</p>
            </div>
            <div>
              <h4 className="text-[#111111]/90 text-[12px] font-bold tracking-[0.10em] uppercase mb-5">{t("footer_explore")}</h4>
              <div className="flex flex-col gap-3">
                <Link to="/collections/marble" className="text-[#111111]/45 text-[13px] hover:text-[#dc2626] transition-colors">{t("nav_stone_market")}</Link>
                <Link to="/catalog" className="text-[#111111]/45 text-[13px] hover:text-[#dc2626] transition-colors">{t("nav_mine_direct")}</Link>
                <Link to="/about" className="text-[#111111]/45 text-[13px] hover:text-[#dc2626] transition-colors">{t("nav_about")}</Link>
                <Link to="/contact" className="text-[#111111]/45 text-[13px] hover:text-[#dc2626] transition-colors">{t("nav_contact")}</Link>
              </div>
            </div>
            <div>
              <h4 className="text-[#111111]/90 text-[12px] font-bold tracking-[0.10em] uppercase mb-5">{t("footer_products")}</h4>
              <div className="flex flex-col gap-3">
                <Link to="/collections/marble" className="text-[#111111]/45 text-[13px] hover:text-[#dc2626] transition-colors">{t("footer_natural_stone")}</Link>
                <Link to="/catalog" className="text-[#111111]/45 text-[13px] hover:text-[#dc2626] transition-colors">{t("footer_catalog")}</Link>
              </div>
            </div>
            <div>
              <h4 className="text-[#111111]/90 text-[12px] font-bold tracking-[0.10em] uppercase mb-5">{t("footer_contact_title")}</h4>
              <div className="flex flex-col gap-3 text-[13px] text-[#111111]/45">
                <p className="flex items-center gap-2 text-[#dc2626] font-medium">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href="tel:+8613959948672" onClick={() => trackConversion("phone_click", {source:"footer"})}>+86 139 5994 8672</a>
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href="mailto:262034042@qq.com" onClick={() => trackConversion("email_click", {source:"footer"})} className="hover:text-[#dc2626] transition-colors">262034042@qq.com</a>
                </p>
                <p>{t("footer_address")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 flex items-center justify-center text-[11px] text-[#111111]/30 tracking-[0.04em]">
          <span>&copy; {new Date().getFullYear()} {t("footer_copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
