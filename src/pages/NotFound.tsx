import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { lang } = useLang();

  useEffect(() => {
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previous = robots?.content;
    const previousTitle = document.title;
    if (robots) robots.content = "noindex, follow";
    document.title = lang === "zh" ? "页面不存在 | DONGSHENG MARBLE" : "Page Not Found | DONGSHENG MARBLE";
    return () => {
      if (robots && previous) robots.content = previous;
      document.title = previousTitle;
    };
  }, [lang]);

  return (
    <section className="min-h-[60vh] bg-white px-6 py-24 flex items-center justify-center text-center">
      <div>
        <p className="text-[#e60012] text-[14px] font-black">404</p>
        <h1 className="mt-3 text-[#111] text-[clamp(1.8rem,4vw,2.6rem)] font-black">{lang === "zh" ? "页面不存在" : "Page not found"}</h1>
        <p className="mt-4 text-[#444] text-[15px]">{lang === "zh" ? "该地址可能已更改，您可以返回首页或浏览产品目录。" : "This address may have changed. Return home or browse the product catalogue."}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="min-h-[48px] inline-flex items-center px-7 bg-[#222] text-white font-bold">{lang === "zh" ? "返回首页" : "Return home"}</Link>
          <Link to="/catalog" className="min-h-[48px] inline-flex items-center px-7 border-2 border-[#e60012] text-[#e60012] font-bold">{lang === "zh" ? "浏览产品" : "Browse products"}</Link>
        </div>
      </div>
    </section>
  );
}
