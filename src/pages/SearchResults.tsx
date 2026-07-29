import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { optimizedImage } from "@/lib/images";
import { loadSearchProducts, type SearchProduct } from "@/lib/searchCatalog";
import { useLang } from "@/lib/i18n";

const normalize = (value: string) => value.trim().toLocaleLowerCase().replace(/\s+/g, "");

export default function SearchResults() {
  const { lang } = useLang();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [loadError, setLoadError] = useState(false);
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "";
  const style = searchParams.get("style") || "";

  useEffect(() => {
    loadSearchProducts().then(setProducts).catch(() => setLoadError(true));
  }, []);

  const options = useMemo(() => ({
    categories: [...new Set(products.map((product) => lang === "zh" ? product.categoryZh : product.categoryEn))].sort(),
    types: [...new Set(products.map((product) => lang === "zh" ? product.typeZh : product.typeEn))].sort(),
    styles: [...new Set(products.flatMap((product) => product.styles))].sort(),
  }), [products, lang]);

  const filtered = useMemo(() => {
    const term = normalize(query);
    return products.filter((product) => {
      const productCategory = lang === "zh" ? product.categoryZh : product.categoryEn;
      const productType = lang === "zh" ? product.typeZh : product.typeEn;
      const matchesTerm = !term || normalize(`${product.nameZh}${product.nameEn}${product.code}${productCategory}`).includes(term);
      return matchesTerm && (!category || productCategory === category) && (!type || productType === type) && (!style || product.styles.includes(style));
    });
  }, [products, query, category, type, style, lang]);

  function update(name: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(name, value);
    else next.delete(name);
    setSearchParams(next);
  }

  const selectClass = "min-h-[44px] bg-white border border-black/20 px-3 text-[14px] text-[#222]";
  return (
    <div className="bg-white min-h-[70vh]">
      <section className="max-w-[1280px] mx-auto px-6 py-12 md:py-16">
        <h1 className="text-[#111] text-[clamp(1.8rem,4vw,2.8rem)] font-black">{lang === "zh" ? "产品搜索" : "Product Search"}</h1>
        <form role="search" onSubmit={(event) => event.preventDefault()} className="mt-7">
          <label htmlFor="results-search" className="sr-only">{lang === "zh" ? "搜索产品" : "Search products"}</label>
          <input id="results-search" type="search" value={query} onChange={(event) => update("q", event.target.value)} placeholder={lang === "zh" ? "输入产品名称、编号或分类" : "Search name, code or category"} className="w-full min-h-[52px] border-2 border-[#222] px-4 text-[16px]" />
          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            <select aria-label={lang === "zh" ? "产品类别" : "Product category"} className={selectClass} value={category} onChange={(event) => update("category", event.target.value)}><option value="">{lang === "zh" ? "全部类别" : "All categories"}</option>{options.categories.map((option) => <option key={option}>{option}</option>)}</select>
            <select aria-label={lang === "zh" ? "石材类型" : "Stone type"} className={selectClass} value={type} onChange={(event) => update("type", event.target.value)}><option value="">{lang === "zh" ? "全部类型" : "All types"}</option>{options.types.map((option) => <option key={option}>{option}</option>)}</select>
            <select aria-label={lang === "zh" ? "风格" : "Style"} className={selectClass} value={style} disabled={!options.styles.length} onChange={(event) => update("style", event.target.value)}><option value="">{lang === "zh" ? "全部风格" : "All styles"}</option>{options.styles.map((option) => <option key={option}>{option}</option>)}</select>
          </div>
          <button type="button" onClick={() => setSearchParams({})} className="mt-4 min-h-[44px] text-[13px] font-bold underline underline-offset-4">{lang === "zh" ? "清除筛选并返回全部产品" : "Clear filters and return to all products"}</button>
        </form>

        <p aria-live="polite" className="mt-8 text-[14px] text-[#444]">{lang === "zh" ? `找到 ${filtered.length} 个产品` : `${filtered.length} products found`}</p>
        {loadError && <p role="alert" className="mt-6 p-4 bg-red-50 text-[#e60012]">{lang === "zh" ? "产品搜索载入失败，请稍后重试。" : "Product search failed to load. Please try again later."}</p>}
        {!loadError && filtered.length === 0 && <div className="py-20 text-center"><p className="text-[#444]">{lang === "zh" ? "没有匹配结果。" : "No matching products."}</p><button type="button" onClick={() => setSearchParams({})} className="mt-5 min-h-[44px] px-6 border border-[#222] font-bold">{lang === "zh" ? "返回全部产品" : "Return to all products"}</button></div>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {filtered.map((product) => (
            <Link key={product.id} to={product.url} className="group bg-[#f5f5f5]">
              <img src={optimizedImage(product.thumbnail)} alt={lang === "zh" ? product.nameZh : product.nameEn} loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover" />
              <span className="block p-3"><strong className="block text-[14px] text-[#111]">{lang === "zh" ? product.nameZh : product.nameEn}</strong><small className="text-[12px] text-[#555]">{lang === "zh" ? product.categoryZh : product.categoryEn} · {product.code}</small></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
