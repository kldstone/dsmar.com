import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { optimizedImage } from "@/lib/images";
import { loadSearchProducts, type SearchProduct } from "@/lib/searchCatalog";
import { useLang } from "@/lib/i18n";

type Props = {
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const normalize = (value: string) => value.trim().toLocaleLowerCase().replace(/\s+/g, "");

export default function ProductSearch({ onClose, triggerRef }: Props) {
  const { lang } = useLang();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let active = true;
    loadSearchProducts().then((items) => {
      if (active) {
        setProducts(items);
        setStatus("ready");
      }
    }).catch(() => {
      if (active) setStatus("error");
    });
    inputRef.current?.focus();
    return () => { active = false; };
  }, []);

  const results = useMemo(() => {
    const term = normalize(query);
    if (term.length < 2) return [];
    return products.filter((product) =>
      normalize(`${product.nameZh}${product.nameEn}${product.code}${product.categoryZh}${product.categoryEn}`).includes(term),
    ).slice(0, 6);
  }, [products, query]);

  function closeAndRestoreFocus() {
    onClose();
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function openProduct(product: SearchProduct) {
    onClose();
    navigate(product.url);
  }

  function searchAll() {
    const term = query.trim();
    if (!term) return;
    onClose();
    navigate(`/search?q=${encodeURIComponent(term)}`);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeAndRestoreFocus();
    } else if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) openProduct(results[activeIndex]);
      else searchAll();
    }
  }

  const prompt = lang === "zh" ? "搜索产品名称、编号或分类" : "Search product name, code or category";
  return (
    <div className="absolute left-0 right-0 top-full z-[70] bg-white border-y border-black/10 shadow-xl" role="search">
      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-4">
        <label htmlFor="site-product-search" className="sr-only">{prompt}</label>
        <div className="flex items-center gap-2 border-b-2 border-[#222]">
          <svg aria-hidden="true" className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
          <input
            ref={inputRef}
            id="site-product-search"
            type="search"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
            autoComplete="off"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(-1);
            }}
            onKeyDown={onKeyDown}
            placeholder={prompt}
            className="min-h-[52px] flex-1 min-w-0 bg-transparent text-[16px] text-[#111] placeholder:text-[#666]"
          />
          <button type="button" onClick={closeAndRestoreFocus} aria-label={lang === "zh" ? "关闭搜索" : "Close search"} className="min-w-[44px] min-h-[44px] text-[24px]">×</button>
        </div>

        <div id={listId} role="listbox" className="mt-3 max-h-[min(60dvh,460px)] overflow-y-auto overscroll-contain">
          {status === "loading" && <p role="status" className="p-4 text-[14px] text-[#555]">{lang === "zh" ? "正在载入产品目录……" : "Loading product catalogue…"}</p>}
          {status === "error" && <p role="alert" className="p-4 text-[14px] text-[#e60012]">{lang === "zh" ? "搜索暂时无法载入，网站其他页面仍可正常使用。" : "Search could not load. The rest of the website remains available."}</p>}
          {status === "ready" && query.trim().length === 1 && <p className="p-4 text-[13px] text-[#555]">{lang === "zh" ? "请至少输入两个字符。" : "Enter at least two characters."}</p>}
          {status === "ready" && query.trim().length >= 2 && results.length === 0 && <p className="p-4 text-[14px] text-[#555]">{lang === "zh" ? "没有找到匹配产品。" : "No matching products found."}</p>}
          {results.map((product, index) => (
            <button
              key={product.id}
              id={`${listId}-${index}`}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => openProduct(product)}
              className={`w-full min-h-[68px] grid grid-cols-[52px_1fr] gap-3 items-center p-2 text-left ${index === activeIndex ? "bg-red-50 outline outline-2 outline-[#e60012] outline-offset-[-2px]" : "hover:bg-[#f5f5f5]"}`}
            >
              <img src={optimizedImage(product.thumbnail)} alt="" loading="lazy" decoding="async" className="w-[52px] h-[52px] object-cover bg-[#eee]" />
              <span className="min-w-0"><strong className="block text-[14px] text-[#111] truncate">{lang === "zh" ? product.nameZh : product.nameEn}</strong><small className="block text-[12px] text-[#555] truncate">{lang === "zh" ? product.categoryZh : product.categoryEn} · {product.code}</small></span>
            </button>
          ))}
        </div>
        {query.trim().length >= 2 && <button type="button" onClick={searchAll} className="mt-3 min-h-[44px] w-full text-[13px] font-bold text-[#e60012] border border-[#e60012]">{lang === "zh" ? "查看全部搜索结果" : "View all search results"}</button>}
      </div>
    </div>
  );
}
