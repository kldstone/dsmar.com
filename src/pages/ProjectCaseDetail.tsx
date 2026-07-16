import { Link, useParams } from "react-router-dom";
import { getProjectCase } from "@/data/projectCases";
import { useLang } from "@/lib/i18n";

export default function ProjectCaseDetail() {
  const { lang } = useLang();
  const { slug } = useParams();
  const projectCase = getProjectCase(slug);

  if (!projectCase) {
    return (
      <main className="max-w-[800px] mx-auto px-6 py-24 text-center">
        <h1 className="text-[1.6rem] font-black text-[var(--ink)]">
          {lang === "zh" ? "案例不存在" : "CASE NOT FOUND"}
        </h1>
        <Link to="/collections/marble" className="inline-block mt-6 text-[#dc2626] text-[13px] font-bold tracking-[0.06em]">
          {lang === "zh" ? "返回工程案例" : "BACK TO PROJECT CASES"}
        </Link>
      </main>
    );
  }

  const title = lang === "zh" ? projectCase.name : projectCase.en;

  return (
    <main className="bg-white">
      <section className="relative h-[52vh] min-h-[360px] overflow-hidden bg-[#111]">
        <img src={projectCase.cover} alt={title} className="h-full w-full object-cover opacity-65" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <p className="text-white/70 text-[11px] font-bold tracking-[0.2em] uppercase">{lang === "zh" ? "工程案例" : "PROJECT CASE"}</p>
            <h1 className="mt-3 text-white text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[0.04em]">{title}</h1>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-10">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#dc2626] uppercase">{lang === "zh" ? "案例图集" : "CASE GALLERY"}</p>
            <h2 className="mt-2 text-[1.5rem] md:text-[2rem] font-black tracking-[0.03em] text-[var(--ink)]">{lang === "zh" ? "全部项目照片" : "ALL PROJECT PHOTOS"}</h2>
          </div>
          <p className="text-[13px] text-[var(--muted)]">{lang === "zh" ? `共 ${projectCase.images.length} 张` : `${projectCase.images.length} PHOTOS`}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {projectCase.images.map((image, index) => (
            <a key={image} href={image} target="_blank" rel="noreferrer" className="group block overflow-hidden bg-[#f3f3f3]">
              <img src={image} alt={`${title} ${index + 1}`} loading={index < 3 ? "eager" : "lazy"} decoding="async" className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </a>
          ))}
        </div>

        <div className="pt-12 text-center">
          <Link to="/collections/marble" className="text-[#dc2626] text-[13px] font-bold tracking-[0.06em] hover:opacity-70 transition-opacity">
            ← {lang === "zh" ? "返回工程案例" : "BACK TO PROJECT CASES"}
          </Link>
        </div>
      </section>
    </main>
  );
}
