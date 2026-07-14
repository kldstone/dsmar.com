import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import categories from "@/data/catalog";
import { optimizedImage } from "@/lib/images";
import { useLang } from "@/lib/i18n";

export default function CatalogDetail() {
  const { t } = useLang();
  const { category, id } = useParams<{ category: string; id: string }>();
  const cat = categories.find((c) => c.key === category);
  const product = cat?.products.find((p) => p.id === id);
  const [showAll, setShowAll] = useState(false);

  if (!cat || !product) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[#111]/40 text-[20px] font-bold">{t("catalog_product_not_found")}</h1>
          <Link to={cat ? `/catalog/${cat.key}` : "/catalog"} className="mt-4 inline-block text-[#dc2626] text-[14px]">{t("catalog_back")}</Link>
        </div>
      </div>
    );
  }

  const allImages = product.images && product.images.length > 0 ? product.images : [product.cover];
  const coverImg = product.cover || allImages[0];
  const catalogImages = allImages.length > 1 ? allImages.slice(1) : allImages;
  const categoryName = t(`catalog_category_${cat.key}_name`);
  const productName = t(`catalog_product_${product.id}_name`);

  return (
    <div className="bg-white">
      {/* 面包屑 */}
      <div className="max-w-[1280px] mx-auto px-6 pt-6 pb-2">
        <div className="flex items-center gap-2 text-[12px] tracking-[0.04em] text-[#111]/40">
          <Link to="/catalog" className="hover:text-[#dc2626] transition-colors">{t("catalog_breadcrumb")}</Link>
          <span>/</span>
          <Link to={`/catalog/${cat.key}`} className="hover:text-[#dc2626] transition-colors">{categoryName}</Link>
          <span>/</span>
          <span className="text-[#111]/70">{productName}</span>
        </div>
      </div>

      {/* 主区域 */}
      <section className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="overflow-hidden bg-[#f5f5f5]">
            <img src={optimizedImage(coverImg)} alt={productName} className="w-full h-auto object-cover" loading="eager" decoding="async" />
          </div>
          <div className="md:sticky md:top-[100px] self-start">
            <span className="text-[#dc2626] text-[11px] font-bold tracking-[0.20em] uppercase">{categoryName}</span>
            <h1 className="text-[#111] text-[clamp(1.8rem,3vw,2.6rem)] font-black tracking-[0.02em] mt-3 mb-4 uppercase">{productName}</h1>
            <p className="text-[#111]/60 text-[15px] leading-relaxed mb-6">{t(`catalog_product_${product.id}_tagline`)}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="text-[11px] font-semibold tracking-[0.06em] bg-[#f0f0f0] text-[#111]/70 px-4 py-2">{categoryName}</span>
              {product.styles?.map((s) => (
                <span key={s} className="text-[11px] font-semibold tracking-[0.06em] bg-[#f0f0f0] text-[#111]/70 px-4 py-2">{s}</span>
              ))}
            </div>

            <div className="border-t border-black/5 pt-6 mb-8">
              <h3 className="text-[#111] text-[13px] font-bold tracking-[0.06em] mb-3">{t("catalog_applications_title")}</h3>
              <div className="flex flex-wrap gap-2">
                {[t("catalog_application_hotel"), t("catalog_application_villa"), t("catalog_application_wall"), t("catalog_application_floor"), t("catalog_application_commercial"), t("catalog_application_bathroom")].map((s) => (
                  <span key={s} className="text-[12px] text-[#111]/50 border border-black/10 px-3 py-1">{s}</span>
                ))}
              </div>
            </div>

            <div className="border-t border-black/5 pt-8">
              <Link to="/contact" className="inline-flex items-center justify-center min-h-[48px] px-8 bg-[#dc2626] text-white text-[13px] font-bold tracking-[0.06em] hover:bg-[#dc2626]/80 transition-colors">{t("catalog_inquire_product")}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 画册 */}
      {catalogImages.length > 0 && (
        <section className="border-t border-black/5">
          <div className="max-w-[1280px] mx-auto px-6 py-16">
            <div className="text-center mb-10">
              <span className="text-[#111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-3">CATALOG</span>
              <h2 className="text-[#111] text-[clamp(1.3rem,2vw,1.6rem)] font-black tracking-[0.02em] uppercase">{t("catalog_book_title", { product: productName })}</h2>
              <p className="text-[#111]/45 text-[13px] mt-2">{t("catalog_book_pages", { count: String(catalogImages.length) })}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {(showAll ? catalogImages : catalogImages.slice(0, 5)).map((img, i) => (
                <a key={i} href={optimizedImage(img)} target="_blank" rel="noopener noreferrer" className="block overflow-hidden bg-[#f5f5f5] aspect-[3/4] group">
                  <img src={optimizedImage(img)} alt={t("catalog_page_alt", { product: productName, page: String(i + 1) })} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                </a>
              ))}
            </div>

            {catalogImages.length > 5 && (
              <div className="text-center mt-8">
                <button onClick={() => setShowAll(!showAll)} className="inline-flex items-center gap-2 text-[#111] text-[12px] font-bold tracking-[0.10em] uppercase border-b-2 border-[#dc2626] pb-1 hover:text-[#dc2626] transition-colors">
                  {showAll ? t("catalog_collapse") : t("catalog_view_all_pages", { count: String(catalogImages.length) })}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${showAll ? "rotate-180" : ""}`}><polyline points="4 6 8 10 12 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 底部CTA */}
      <section className="bg-[#f8f8f8] py-16 px-6 text-center border-t border-black/5">
        <h2 className="text-[#111] text-[1.3rem] font-black tracking-[0.02em] mb-3 uppercase">{t("catalog_interest_title", { product: productName })}</h2>
        <p className="text-[#111]/45 text-[14px] mb-8 max-w-[460px] mx-auto leading-relaxed">{t("catalog_interest_desc")}</p>
        <Link to="/contact" className="inline-flex items-center justify-center min-h-[48px] px-10 bg-[#dc2626] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#dc2626]/80 transition-colors">{t("catalog_contact_now")}</Link>
      </section>
    </div>
  );
}
