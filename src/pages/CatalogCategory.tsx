import { useParams, Link, useNavigate } from "react-router-dom";
import categories from "@/data/catalog";
import { optimizedImage, responsiveImage } from "@/lib/images";
import { addInquiryProduct } from "@/lib/inquiry";
import { trackConversion } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

export default function CatalogCategory() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const cat = categories.find((c) => c.key === category);

  if (!cat) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[#111]/40 text-[20px] font-bold">{t("catalog_category_not_found")}</h1>
          <Link to="/catalog" className="mt-4 inline-block text-[#e60012] text-[14px]">
            {t("catalog_back_to_categories")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] bg-[#e5e5e5] overflow-hidden">
        {cat.heroImg && (
          <img
            {...responsiveImage(cat.heroImg)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/60 text-[11px] font-bold tracking-[0.20em] uppercase">
              {lang === "zh" ? cat.subtitle : t("catalog_card_label")}
            </span>
            <h1 className="text-white text-[clamp(1.8rem,3.5vw,2.8rem)] font-black tracking-[0.03em] mt-3 mb-4">
              {t(`catalog_category_${cat.key}_name`)}
            </h1>
            <p className="text-white/75 text-[15px] max-w-[600px] mx-auto leading-relaxed">
              {t(`catalog_category_${cat.key}_desc`)}
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        {cat.products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#111]/40 text-[18px] font-medium mb-3">
              {t("catalog_pending_title")}
            </p>
            <p className="text-[#111]/30 text-[14px] mb-8">
              {t("catalog_pending_desc")}
            </p>
            <Link
              to="/catalog"
              className="inline-block border border-[#111]/20 text-[#111] text-[12px] font-bold tracking-[0.06em] px-8 py-3 hover:bg-[#111] hover:text-white transition-colors"
            >
              {t("catalog_back_to_categories")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cat.products.map((p) => {
              const productName = t(`catalog_product_${p.id}_name`);
              const productUrl = `/catalog/${cat.key}/${p.id}`;
              return (
                <article key={p.id} className="bg-[#f5f5f5]">
                  <Link to={productUrl} className="group relative block overflow-hidden aspect-[3/4]">
                    <img src={optimizedImage(p.cover)} alt={productName} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute left-0 right-0 bottom-0 px-4 py-3">
                      <h2 className="text-white text-[14px] font-semibold leading-tight">{productName}</h2>
                      {p.styles && p.styles.length > 0 && <p className="text-white/80 text-[12px] font-medium mt-1">{p.styles.join(" / ")}</p>}
                    </div>
                  </Link>
                  <button type="button" onClick={() => {
                    addInquiryProduct({ id: p.id, name: productName, code: p.id, category: t(`catalog_category_${cat.key}_name`), thumbnail: p.cover, url: `${window.location.origin}${productUrl}` });
                    trackConversion("product_inquiry_add", { product_id: p.id, source: "catalog_card" });
                    navigate("/contact");
                  }} className="w-full min-h-[48px] px-3 bg-white border border-t-0 border-black/10 text-[#e60012] text-[12px] font-bold hover:bg-red-50">
                    {lang === "zh" ? `询价：${productName}` : `Request a Quote for ${productName}`}
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
