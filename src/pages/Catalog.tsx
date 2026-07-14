import { Link } from "react-router-dom";
import categories from "@/data/catalog";
import { optimizedImage } from "@/lib/images";
import { useLang } from "@/lib/i18n";

export default function Catalog() {
  const { t, lang } = useLang();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] bg-[#e5e5e5] overflow-hidden">
        <img
          src={optimizedImage("/brand-gallery/hero-catalog.jpg")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/80 text-[11px] font-bold tracking-[0.20em] uppercase">PRODUCTS</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.03em] mt-3 mb-4">
              {t("catalog_title")}
            </h1>
            <p className="text-white/80 text-[15px] max-w-[560px] mx-auto leading-relaxed">
              {t("catalog_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const categoryName = t(`catalog_category_${cat.key}_name`);
            const categoryDescription = t(`catalog_category_${cat.key}_desc`);
            return (
              <Link
                key={cat.key}
                to={`/catalog/${cat.key}`}
                className="group relative block overflow-hidden bg-[#f5f5f5] aspect-[4/3]"
              >
                {cat.heroImg && (
                  <img
                    src={optimizedImage(cat.heroImg)}
                    alt={categoryName}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <h2 className="text-white text-[22px] font-bold tracking-[0.06em] mb-2">
                    {categoryName}
                  </h2>
                  <p className="text-white/60 text-[12px] font-medium tracking-[0.12em] mb-4">
                    {lang === "zh" ? cat.subtitle : t("catalog_card_label")}
                  </p>
                  <p className="text-white/70 text-[14px] max-w-[320px] leading-relaxed">
                    {categoryDescription.length > 80
                      ? categoryDescription.slice(0, 80) + "..."
                      : categoryDescription}
                  </p>
                  {cat.products.length > 0 && (
                    <span className="mt-5 inline-block text-[11px] font-bold tracking-[0.12em] text-white border border-white/30 px-5 py-2 group-hover:bg-white group-hover:text-[#111] transition-colors">
                      {t("catalog_product_count", { count: String(cat.products.length) })}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
