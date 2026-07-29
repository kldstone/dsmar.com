import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectCase } from "@/data/projectCases";
import { useLang } from "@/lib/i18n";

export default function ProjectCaseDetail() {
  const { lang } = useLang();
  const { slug } = useParams();
  const projectCase = getProjectCase(slug);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const imageButtons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (selectedIndex === null || !projectCase) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((index) => index === null ? 0 : (index + 1) % projectCase.images.length);
      if (event.key === "ArrowLeft") setSelectedIndex((index) => index === null ? 0 : (index - 1 + projectCase.images.length) % projectCase.images.length);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, projectCase]);

  function closeGallery() {
    const previousIndex = selectedIndex;
    setSelectedIndex(null);
    requestAnimationFrame(() => {
      if (previousIndex !== null) imageButtons.current[previousIndex]?.focus();
    });
  }

  if (!projectCase) {
    return (
      <section className="max-w-[800px] mx-auto px-6 py-24 text-center">
        <h1 className="text-[1.6rem] font-black text-[var(--ink)]">{lang === "zh" ? "案例不存在" : "Case not found"}</h1>
        <Link to="/collections/marble" className="inline-flex min-h-[48px] items-center mt-6 text-[#7f1717] text-[13px] font-bold">{lang === "zh" ? "返回工程案例" : "Back to project cases"}</Link>
      </section>
    );
  }

  const title = lang === "zh" ? projectCase.name : projectCase.en.toUpperCase();
  return (
    <div className="bg-white">
      <section className="relative h-[52vh] min-h-[360px] overflow-hidden bg-[#111]">
        <img src={projectCase.cover} alt={title} className="h-full w-full object-cover opacity-65" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <p className="text-white/85 text-[12px] font-bold tracking-[0.12em] uppercase">{lang === "zh" ? "工程案例" : "Project case"}</p>
            <h1 className="mt-3 text-white text-[clamp(2rem,5vw,3.5rem)] font-black">{title}</h1>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-10">
          <div>
            <p className="text-[12px] font-bold text-[#7f1717] uppercase">{lang === "zh" ? "案例图集" : "Case gallery"}</p>
            <h2 className="mt-2 text-[1.5rem] md:text-[2rem] font-black text-[var(--ink)]">{lang === "zh" ? "全部项目照片" : "All project photos"}</h2>
          </div>
          <p className="text-[13px] text-[#555]">{lang === "zh" ? `共 ${projectCase.images.length} 张` : `${projectCase.images.length} photos`}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {projectCase.images.map((image, index) => (
            <button
              ref={(element) => { imageButtons.current[index] = element; }}
              key={image}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group block overflow-hidden bg-[#f3f3f3] w-full text-left min-h-[44px]"
              aria-label={`${title} ${index + 1} ${lang === "zh" ? "查看大图" : "view full size"}`}
            >
              <img src={image} alt={`${title} ${index + 1}`} loading={index < 3 ? "eager" : "lazy"} decoding="async" className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </button>
          ))}
        </div>

        <div className="pt-12 text-center">
          <Link to="/collections/marble" className="inline-flex min-h-[44px] items-center text-[#7f1717] text-[13px] font-bold">← {lang === "zh" ? "返回工程案例" : "Back to project cases"}</Link>
        </div>
      </section>

      {selectedIndex !== null && (
        <div role="dialog" aria-modal="true" aria-label={`${title} ${lang === "zh" ? "图片预览" : "image preview"}`} className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-3 md:p-8">
          <button ref={closeRef} type="button" onClick={closeGallery} aria-label={lang === "zh" ? "关闭图片" : "Close image"} className="absolute top-3 right-3 min-w-[48px] min-h-[48px] bg-white text-[#111] text-[28px] z-10">×</button>
          <button type="button" onClick={() => setSelectedIndex((selectedIndex - 1 + projectCase.images.length) % projectCase.images.length)} aria-label={lang === "zh" ? "上一张" : "Previous image"} className="absolute left-2 md:left-5 min-w-[48px] min-h-[48px] bg-white/90 text-[#111] text-[24px]">‹</button>
          <img src={projectCase.images[selectedIndex]} alt={`${title} ${selectedIndex + 1}`} className="max-h-[90dvh] max-w-[90vw] object-contain" />
          <button type="button" onClick={() => setSelectedIndex((selectedIndex + 1) % projectCase.images.length)} aria-label={lang === "zh" ? "下一张" : "Next image"} className="absolute right-2 md:right-5 min-w-[48px] min-h-[48px] bg-white/90 text-[#111] text-[24px]">›</button>
          <p className="absolute bottom-3 text-white text-[13px]">{selectedIndex + 1} / {projectCase.images.length}</p>
        </div>
      )}
    </div>
  );
}
