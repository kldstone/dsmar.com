import { useState, useEffect } from "react";
import { optimizedImage } from "@/lib/images";
import { trackConversion } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const utm: Record<string, string> = {};
  for (const key of utmKeys) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

export default function Contact() {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState<"idle" | "sending" | "success" | "error">("idle");
  const utmParams = getUtmParams();

  // Detect return from FormSubmit captcha
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("submitted") === "true") {
      window.history.replaceState({}, "", window.location.pathname);
      setSubmitted("success");
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitted === "sending") return;

    const form = e.currentTarget;

    // Append UTM hidden fields
    const utm = getUtmParams();
    for (const [key, val] of Object.entries(utm)) {
      let input = form.querySelector(`input[name="${key}"]`) as HTMLInputElement | null;
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        form.appendChild(input);
      }
      input.value = val;
    }

    // Append landing_page
    let lp = form.querySelector('input[name="landing_page"]') as HTMLInputElement | null;
    if (!lp) {
      lp = document.createElement("input");
      lp.type = "hidden";
      lp.name = "landing_page";
      form.appendChild(lp);
    }
    lp.value = window.location.origin + window.location.pathname;

    // Append referrer
    let ref = form.querySelector('input[name="referrer"]') as HTMLInputElement | null;
    if (!ref) {
      ref = document.createElement("input");
      ref.type = "hidden";
      ref.name = "referrer";
      form.appendChild(ref);
    }
    ref.value = document.referrer || "";

    // Point _next back with submitted flag
    const next = form.querySelector('input[name="_next"]') as HTMLInputElement | null;
    if (next) {
      next.value = window.location.origin + window.location.pathname + "?submitted=true";
    }

    setSubmitted("sending");
    trackConversion("form_submit", { source: "contact_page", ...utm, landing_page: lp.value, referrer: ref.value });

    // Native form submit — FormSubmit handles captcha in a separate page
    try {
      form.submit();
    } catch {
      setSubmitted("error");
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[340px] bg-[#0f0f0f] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/hero-contact.jpg")} alt={t("contact_hero_alt")} className="w-full h-full object-cover opacity-80" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.20em] uppercase">Contact</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-3">
              {t("contact_title")}
            </h1>
            <p className="text-white/55 text-[15px] max-w-[460px] mx-auto leading-relaxed">
              {t("contact_hero_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: Info */}
          <div>
            <h2 className="text-[#111111] text-[1.6rem] font-black tracking-[0.02em] mb-8">{t("contact_info_title")}</h2>

            <div className="space-y-8">
              {/* Address */}
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">{t("contact_address_label")}</span>
                <p className="text-[#111111] text-[15px] font-semibold leading-relaxed">
                  {t("contact_address")}
                </p>
              </div>

              {/* Phone */}
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">{t("contact_phone_label")}</span>
                <a href="tel:+8613959948672" onClick={() => trackConversion("phone_click", { source: "contact_page" })} className="text-[#111111] text-[18px] font-black tracking-[0.02em] hover:opacity-60 transition-colors">
                  +86 139 5994 8672
                </a>
              </div>

              {/* Email */}
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">{t("contact_email_label")}</span>
                <a href="mailto:dongshengmarble@gmail.com" className="text-[#111111] text-[15px] font-semibold hover:opacity-60 transition-colors">
                  dongshengmarble@gmail.com
                </a>
              </div>

              {/* WeChat */}
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">{t("contact_social_label")}</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#dc2626] rounded-full flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#111111] text-[14px] font-semibold">{t("contact_social_title")}</p>
                    <p className="text-[#111111] text-[12px]">{t("contact_social_desc")}</p>
                    <p className="text-[#111111] text-[13px] font-medium mt-0.5">{t("contact_social_account")}</p>
                  </div>
                </div>
              </div>

              {/* Factory image */}
              <div className="overflow-hidden img-hover">
                <img src={optimizedImage("/brand-gallery/contact-exhibition-team-2025-07-22.jpg")} alt={t("contact_factory_alt")} className="w-full aspect-[16/9] object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <h2 className="text-[#111111] text-[1.6rem] font-black tracking-[0.02em] mb-8">{t("contact_form_title")}</h2>

            {submitted === "success" ? (
              <div className="bg-white border border-black/10 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-[#dc2626]/5 rounded-full flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="text-[#111111] text-[1.2rem] font-black tracking-[0.03em] mb-2">{t("contact_success_title")}</h3>
                <p className="text-[#111111] text-[14px] leading-relaxed max-w-[320px] mx-auto">
                  {t("contact_success_desc")}
                </p>
                <button
                  onClick={() => { setSubmitted("idle"); }}
                  className="mt-8 text-[#111111] text-[13px] font-bold tracking-[0.06em] hover:opacity-60 transition-colors"
                >
                  {t("contact_send_another")}
                </button>
              </div>
            ) : (
              <form action="https://formsubmit.co/dongshengmarble@gmail.com" method="POST" onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_subject" value={t("contact_form_subject")} />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />
                <input type="hidden" name="_template" value="table" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">{t("contact_name_label")}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-white border border-[#dc2626]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                      placeholder={t("contact_name_placeholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">{t("contact_email_label")} *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-white border border-[#dc2626]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">{t("contact_company_label")}</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full bg-white border border-[#dc2626]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                    placeholder={t("contact_company_placeholder")}
                  />
                </div>

                <div>
                  <label className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">{t("contact_message_label")}</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full bg-white border border-[#dc2626]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors resize-none"
                    placeholder={t("contact_message_placeholder")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted === "sending"}
                  className={`w-full py-3.5 text-[12px] font-bold tracking-[0.10em] uppercase transition-colors ${
                    submitted === "sending"
                      ? "bg-[#111111]/30 text-white/60 cursor-not-allowed"
                      : submitted === "error"
                        ? "bg-[#dc2626] text-white hover:bg-[#dc2626]/80"
                        : "bg-[#dc2626] text-white hover:bg-[#dc2626]/80"
                  }`}
                >
                  {submitted === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t("contact_sending")}
                    </span>
                  ) : (
                    t("contact_submit")
                  )}
                </button>
                {submitted === "error" && (
                  <p className="text-[#dc2626] text-[13px] text-center">{t("contact_error_desc")}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
