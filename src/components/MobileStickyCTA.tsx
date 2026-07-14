import { Link } from "react-router-dom";
import { trackConversion } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

export default function MobileStickyCTA() {
  const { t } = useLang();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden bg-white border-t border-black/10 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-2.5 flex items-center gap-2">
      <a
        href="tel:+8613959948672"
        onClick={() => trackConversion("phone_click", { source: "mobile_sticky" })}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#111111] text-white text-[12px] font-bold tracking-[0.06em]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        {t("mobile_cta_call")}
      </a>
      <Link
        to="/contact"
        onClick={() => trackConversion("quote_cta", { source: "mobile_sticky" })}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#dc2626] text-white text-[12px] font-bold tracking-[0.06em]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        {t("mobile_cta_inquiry")}
      </Link>
    </div>
  );
}
