import { Link } from "react-router-dom";
import { optimizedImage } from "@/lib/images";
import { useLang } from "@/lib/i18n";

export default function About() {
  const { t } = useLang();

  return (
    <div>
      {/* Hero — 画册封面 */}
      <section className="relative h-[55vh] min-h-[400px] bg-[#0f0f0f] overflow-hidden">
        <img src={optimizedImage("/catalog-products/dongsheng-about/page-00.jpg")} alt={t("about_hero_alt")} className="w-full h-full object-cover opacity-70" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/50 text-[11px] font-bold tracking-[0.20em] uppercase">ABOUT</span>
            <h1 className="text-white text-[clamp(2rem,5vw,4rem)] font-black tracking-[0.02em] mt-3 mb-3">{t("about_title")}</h1>
            <p className="text-white/55 text-[15px] max-w-[560px] mx-auto leading-relaxed">{t("about_hero_desc")}</p>
          </div>
        </div>
      </section>

      {/* 公司介绍 */}
      <section className="max-w-[900px] mx-auto px-6 py-20">
        <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block text-center mb-5">OUR STORY</span>
        <h2 className="text-[#111111] text-[1.4rem] font-black tracking-[0.03em] text-center mb-10">{t("about_story_title")}</h2>
        <div className="space-y-6 text-[16px] leading-[1.9] text-[#737373]">
          <p>{t("about_story_p1")}</p>
          <p>{t("about_story_p2")}</p>
          <p>{t("about_story_p3")}</p>
        </div>
        <div className="mt-10 overflow-hidden"><img src={optimizedImage("/catalog-products/dongsheng-about/page-02.jpg")} alt="" className="w-full h-auto object-cover" loading="lazy" decoding="async" /></div>
      </section>

      {/* 经营理念 */}
      <section className="bg-[#111111] py-16 px-6 text-white text-center">
        <div className="max-w-[700px] mx-auto">
          <span className="text-white/40 text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">{t("about_philosophy_label")}</span>
          <blockquote className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-black tracking-[0.03em] leading-[1.4]">{t("about_philosophy_slogan")}</blockquote>
          <p className="text-white/55 text-[14px] mt-6 leading-relaxed">{t("about_philosophy_desc")}</p>
        </div>
      </section>

      {/* 发展历程 */}
      <section className="max-w-[1000px] mx-auto px-6 py-20">
        <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block text-center mb-2">MILESTONES</span>
        <h2 className="text-[#111111] text-[1.5rem] font-black tracking-[0.03em] text-center mb-12">{t("about_milestones_title")}</h2>
        <div className="overflow-hidden mb-10"><img src={optimizedImage("/catalog-products/dongsheng-about/page-04.jpg")} alt={t("about_milestones_title")} className="w-full h-auto object-cover" loading="lazy" decoding="async" /></div>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-black/10" />
          {[
            { year: "1992", title: t("about_milestone_1992_title"), desc: t("about_milestone_1992_desc") }, { year: "2000", title: t("about_milestone_2000_title"), desc: t("about_milestone_2000_desc") },
            { year: "2001", title: t("about_milestone_2001_title"), desc: t("about_milestone_2001_desc") }, { year: "2005", title: t("about_milestone_2005_title"), desc: t("about_milestone_2005_desc") },
            { year: "2008", title: t("about_milestone_2008_title"), desc: t("about_milestone_2008_desc") }, { year: "2010", title: t("about_milestone_2010_title"), desc: t("about_milestone_2010_desc") },
            { year: "2013", title: t("about_milestone_2013_title"), desc: t("about_milestone_2013_desc") }, { year: "2014", title: t("about_milestone_2014_title"), desc: t("about_milestone_2014_desc") },
            { year: "2018", title: t("about_milestone_2018_title"), desc: t("about_milestone_2018_desc") }, { year: "2024", title: t("about_milestone_2024_title"), desc: t("about_milestone_2024_desc") },
            { year: "2025", title: t("about_milestone_2025_title"), desc: t("about_milestone_2025_desc") },
          ].map((item, i) => (
            <div key={i} className={`relative flex items-start gap-6 mb-10 md:mb-14 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#dc2626] rounded-full -translate-x-1/2 mt-1.5 z-10" />
              <div className={`ml-10 md:ml-0 md:w-[calc(50%-30px)] ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:text-left md:pl-10"}`}>
                <span className="text-[#dc2626] text-[1.1rem] font-black tracking-[0.02em]">{item.year}</span>
                <h3 className="text-[#111111] text-[1rem] font-bold tracking-[0.03em] mt-1">{item.title}</h3>
                <p className="text-[#737373] text-[13px] mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 核心优势 */}
      <section className="bg-[#f8f8f8] py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">ADVANTAGES</span>
            <h2 className="text-[#111111] text-[1.5rem] font-black tracking-[0.03em] mt-2">{t("about_advantages_title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: t("about_advantage_1_title"), desc: t("about_advantage_1_desc") },
              { num: "02", title: t("about_advantage_2_title"), desc: t("about_advantage_2_desc") },
              { num: "03", title: t("about_advantage_3_title"), desc: t("about_advantage_3_desc") },
              { num: "04", title: t("about_advantage_4_title"), desc: t("about_advantage_4_desc") },
              { num: "05", title: t("about_advantage_5_title"), desc: t("about_advantage_5_desc") },
              { num: "06", title: t("about_advantage_6_title"), desc: t("about_advantage_6_desc") },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-black/5 p-8 hover:border-[#dc2626]/30 transition-colors">
                <span className="text-[#dc2626] text-[2rem] font-black">{item.num}</span>
                <h3 className="text-[#111111] text-[16px] font-bold mt-4 mb-3">{item.title}</h3>
                <p className="text-[#737373] text-[13px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 荣誉 */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">HONORS</span>
            <h2 className="text-[#111111] text-[1.4rem] font-black tracking-[0.03em] mb-6">{t("about_honors_title")}</h2>
            <ul className="space-y-3">
              {[t("about_honor_1"), t("about_honor_2"), t("about_honor_3"), t("about_honor_4"), t("about_honor_5")].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#737373] text-[14px]"><span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full mt-2 shrink-0" />{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">TAX CONTRIBUTION</span>
            <h2 className="text-[#111111] text-[1.4rem] font-black tracking-[0.03em] mb-6">{t("about_operations_title")}</h2>
            <div className="bg-[#f8f8f8] p-6 border border-black/5">
              <div className="flex items-baseline gap-2 mb-6"><span className="text-[#dc2626] text-[2.5rem] font-black">{t("about_tax_total")}</span><span className="text-[#737373] text-[13px]">{t("about_tax_label")}</span></div>
              <div className="space-y-2">
                {[{year:"2020",amount:t("about_tax_2020")},{year:"2021",amount:t("about_tax_2021")},{year:"2022",amount:t("about_tax_2022")},{year:"2023",amount:t("about_tax_2023")},{year:"2024",amount:t("about_tax_2024")},{year:"2025",amount:t("about_tax_2025")}].map((item,i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-black/5 last:border-0"><span className="text-[#111111] text-[14px] font-semibold">{item.year}</span><span className="text-[#737373] text-[14px]">{item.amount}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 工程项目 */}
      <section className="bg-[#f8f8f8] py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14"><span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">PROJECTS</span><h2 className="text-[#111111] text-[1.5rem] font-black tracking-[0.03em] mt-2">{t("about_projects_title")}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[{page:"page-37.jpg",name:t("about_project_1")},{page:"page-38.jpg",name:t("about_project_2")},{page:"page-39.jpg",name:t("about_project_3")},{page:"page-40.jpg",name:t("about_project_4")},{page:"page-41.jpg",name:t("about_project_5")},{page:"page-42.jpg",name:t("about_project_6")}].map((p,i) => (
              <div key={i} className="bg-white border border-black/5 overflow-hidden">
                <img src={optimizedImage(`/catalog-products/dongsheng-about/${p.page}`)} alt={p.name} className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
                <div className="p-4"><span className="text-[#111111] text-[13px] font-semibold">{p.name}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#dc2626] py-16 px-6 text-center">
        <h2 className="text-white text-[1.5rem] font-black tracking-[0.02em] mb-3">{t("about_cta_title")}</h2>
        <p className="text-white/70 text-[14px] mb-8 max-w-[460px] mx-auto leading-relaxed">{t("about_cta_desc")}</p>
        <Link to="/contact" className="inline-block px-10 py-3.5 bg-white text-[#dc2626] text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-white/90 transition-colors">{t("about_cta_contact")}</Link>
      </section>
    </div>
  );
}
