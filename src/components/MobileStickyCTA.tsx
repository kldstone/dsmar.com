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
      <a
        href="https://wa.me/8613959948672"
        target="_blank"
        rel="noreferrer"
        onClick={() => trackConversion("whatsapp_click", { source: "mobile_sticky" })}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] text-white text-[12px] font-bold tracking-[0.04em]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.89c0 2.1.55 4.15 1.6 5.95L.12 24l6.33-1.66a11.85 11.85 0 0 0 5.65 1.44h.01c6.55 0 11.88-5.33 11.88-11.89 0-3.17-1.24-6.14-3.47-8.41ZM12.1 21.78a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.76.99 1-3.67-.23-.38a9.89 9.89 0 1 1 8.4 4.66Zm5.42-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47a8.94 8.94 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
        {t("mobile_cta_whatsapp")}
      </a>
      <Link
        to="/contact"
        onClick={() => trackConversion("quote_cta", { source: "mobile_sticky" })}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#dc2626] text-white text-[12px] font-bold tracking-[0.04em]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        {t("mobile_cta_inquiry")}
      </Link>
    </div>
  );
}
