import { useState } from "react";
import { getStoredConsent, setAnalyticsConsent } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

export default function CookieConsent() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(() => getStoredConsent() === null);

  if (!visible) return null;

  function choose(accepted: boolean) {
    setAnalyticsConsent(accepted);
    setVisible(false);
  }

  return (
    <section aria-label={lang === "zh" ? "Cookie 设置" : "Cookie preferences"} className="cookie-consent fixed left-3 right-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] md:bottom-4 z-[100] bg-white border border-black/15 shadow-xl">
      <div className="max-w-[1280px] mx-auto p-3 md:px-5 md:py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
        <p className="flex-1 text-[13px] md:text-[14px] leading-relaxed text-[#333]">
          {lang === "zh"
            ? "我们仅在您同意后启用分析和广告 Cookie；必要 Cookie 用于网站基本功能。"
            : "We enable analytics and advertising cookies only with your consent. Essential cookies support basic website functions."}
        </p>
        <div className="grid grid-cols-2 gap-2 shrink-0">
          <button type="button" onClick={() => choose(false)} className="min-h-[44px] px-4 border-2 border-[#222] bg-white text-[#222] text-[13px] font-bold focus-visible:outline-offset-2">
            {lang === "zh" ? "仅必要" : "Essential only"}
          </button>
          <button type="button" onClick={() => choose(true)} className="min-h-[44px] px-4 border-2 border-[#9f1d1d] bg-[#9f1d1d] text-white text-[13px] font-bold focus-visible:outline-offset-2">
            {lang === "zh" ? "接受" : "Accept"}
          </button>
        </div>
      </div>
    </section>
  );
}
