import { Link } from "react-router-dom";
import { projectCases } from "@/data/projectCases";
import { useLang } from "@/lib/i18n";

export default function ProjectCases() {
  const { lang } = useLang();
  const isChinese = lang === "zh";

  return (
    <main className="bg-white">
      <header className="bg-[#111] px-6 py-16 text-center text-white md:py-24">
        <p className="text-[11px] font-bold tracking-[0.2em] text-white/60">DONGSHENG MARBLE</p>
        <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-black">
          {isChinese ? "工程案例" : "Project Cases"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
          {isChinese ? "浏览东升大理石官网展示的石材案例图集。" : "Browse stone case galleries published on the Dongsheng Marble website."}
        </p>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 py-12 md:py-16" aria-label={isChinese ? "工程案例列表" : "Project case list"}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectCases.map((projectCase, index) => {
            const title = isChinese ? projectCase.name : projectCase.en;
            return (
              <Link
                key={projectCase.slug}
                to={`/cases/${projectCase.slug}`}
                className="group block min-h-[44px] overflow-hidden bg-[#f4f4f4]"
              >
                <img
                  src={projectCase.cover}
                  alt={title}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="flex items-center justify-between gap-3 px-4 py-4">
                  <h2 className="text-sm font-bold text-[#111]">{title}</h2>
                  <span aria-hidden="true" className="text-[#e60012]">↗</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
