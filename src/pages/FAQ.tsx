import { useEffect } from "react";
import { Link } from "react-router-dom";
import { optimizedImage } from "@/lib/images";
import { useLang } from "@/lib/i18n";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const faqData = [
  {
    categoryKey: "faq_category_natural",
    items: [
      { questionKey: "faq_natural_1_q", answerKey: "faq_natural_1_a" },
      { questionKey: "faq_natural_2_q", answerKey: "faq_natural_2_a" },
      { questionKey: "faq_natural_3_q", answerKey: "faq_natural_3_a" },
      { questionKey: "faq_natural_4_q", answerKey: "faq_natural_4_a" },
    ],
  },
  {
    categoryKey: "faq_category_luxury",
    items: [
      { questionKey: "faq_luxury_1_q", answerKey: "faq_luxury_1_a" },
      { questionKey: "faq_luxury_2_q", answerKey: "faq_luxury_2_a" },
      { questionKey: "faq_luxury_3_q", answerKey: "faq_luxury_3_a" },
    ],
  },
  {
    categoryKey: "faq_category_pricing",
    items: [
      { questionKey: "faq_pricing_1_q", answerKey: "faq_pricing_1_a" },
      { questionKey: "faq_pricing_2_q", answerKey: "faq_pricing_2_a" },
      { questionKey: "faq_pricing_3_q", answerKey: "faq_pricing_3_a" },
    ],
  },
  {
    categoryKey: "faq_category_quality",
    items: [
      { questionKey: "faq_quality_1_q", answerKey: "faq_quality_1_a" },
      { questionKey: "faq_quality_2_q", answerKey: "faq_quality_2_a" },
    ],
  },
  {
    categoryKey: "faq_category_maintenance",
    items: [
      { questionKey: "faq_maintenance_1_q", answerKey: "faq_maintenance_1_a" },
      { questionKey: "faq_maintenance_2_q", answerKey: "faq_maintenance_2_a" },
    ],
  },
  {
    categoryKey: "faq_category_dongsheng",
    items: [
      { questionKey: "faq_dongsheng_1_q", answerKey: "faq_dongsheng_1_a" },
      { questionKey: "faq_dongsheng_2_q", answerKey: "faq_dongsheng_2_a" },
      { questionKey: "faq_dongsheng_3_q", answerKey: "faq_dongsheng_3_a" },
    ],
  },
  {
    categoryKey: "faq_category_comparison",
    items: [
      { questionKey: "faq_comparison_1_q", answerKey: "faq_comparison_1_a" },
      { questionKey: "faq_comparison_2_q", answerKey: "faq_comparison_2_a" },
    ],
  },
  {
    categoryKey: "faq_category_application",
    items: [
      { questionKey: "faq_application_1_q", answerKey: "faq_application_1_a" },
      { questionKey: "faq_application_2_q", answerKey: "faq_application_2_a" },
    ],
  },
  {
    categoryKey: "faq_category_export",
    items: [
      { questionKey: "faq_export_1_q", answerKey: "faq_export_1_a" },
      { questionKey: "faq_export_2_q", answerKey: "faq_export_2_a" },
    ],
  },
];
export default function FAQ() {
  const { t, lang } = useLang();

  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.flatMap(g =>
        g.items.map(item => ({
          "@type": "Question",
          name: t(item.questionKey),
          acceptedAnswer: { "@type": "Answer", text: t(item.answerKey) },
        }))
      ),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "schema-faqpage";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => { const s = document.getElementById("schema-faqpage"); s?.remove(); };
  }, [lang]);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[340px] bg-[#0f0f0f] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/hero-faq.jpg")} alt="" className="w-full h-full object-cover opacity-60" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/50 text-[11px] font-bold tracking-[0.20em] uppercase">FAQ</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-3">
              {t("faq_title")}
            </h1>
            <p className="text-white/55 text-[15px] max-w-[520px] mx-auto leading-relaxed">
              {t("faq_hero_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-[860px] mx-auto px-6 py-20">
        <div className="space-y-16">
          {faqData.map((group) => (
            <div key={group.categoryKey}>
              <h2 className="text-[#111111] text-[1.3rem] font-black tracking-[0.03em] mb-6 pb-3 border-b border-black/5">
                {t(group.categoryKey)}
              </h2>
              <Accordion type="single" collapsible className="space-y-1">
                {group.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${group.categoryKey}-${i}`}
                    className="border border-black/5 bg-white hover:border-black/10 transition-colors px-6"
                  >
                    <AccordionTrigger className="text-[#111111] text-[14px] font-semibold tracking-[0.03em] py-4 hover:no-underline text-left">
                      {t(item.questionKey)}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#111111]/60 text-[14px] leading-[1.8] pb-5">
                      {t(item.answerKey)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8f8f8] py-16 px-6 text-center border-t border-black/8">
        <h2 className="text-[#111111] text-[1.4rem] font-black tracking-[0.02em] mb-3">
          {t("faq_cta_title")}
        </h2>
        <p className="text-[#111111]/45 text-[14px] mb-8 max-w-[460px] mx-auto leading-relaxed">
          {t("faq_cta_desc")}
        </p>
        <Link
          to="/contact"
          className="inline-block px-10 py-3.5 bg-[#dc2626] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#dc2626]/80 transition-colors"
        >
          {t("faq_cta_contact")}
        </Link>
      </section>
    </div>
  );
}
