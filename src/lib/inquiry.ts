import { useSyncExternalStore } from "react";

export type InquiryProduct = {
  id: string;
  name: string;
  code: string;
  category: string;
  thumbnail: string;
  url: string;
};

const STORAGE_KEY = "dsmar_inquiry_products_v1";
const CHANGE_EVENT = "dsmar-inquiry-change";
const EMPTY_PRODUCTS: InquiryProduct[] = [];
let cachedRaw: string | null = null;
let cachedProducts: InquiryProduct[] = EMPTY_PRODUCTS;
let currentProduct: InquiryProduct | null = null;

function readProducts(): InquiryProduct[] {
  if (typeof window === "undefined") return EMPTY_PRODUCTS;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedProducts;

  cachedRaw = raw;
  if (!raw) {
    cachedProducts = EMPTY_PRODUCTS;
    return cachedProducts;
  }

  try {
    const parsed = JSON.parse(raw) as InquiryProduct[];
    cachedProducts = Array.isArray(parsed) ? parsed.slice(0, 20) : EMPTY_PRODUCTS;
  } catch {
    cachedProducts = EMPTY_PRODUCTS;
  }
  return cachedProducts;
}

function writeProducts(products: InquiryProduct[]) {
  const next = products.slice(0, 20);
  const raw = JSON.stringify(next);
  cachedRaw = raw;
  cachedProducts = next;
  window.localStorage.setItem(STORAGE_KEY, raw);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useInquiryProducts() {
  return useSyncExternalStore(subscribe, readProducts, () => EMPTY_PRODUCTS);
}

export function useCurrentInquiryProduct() {
  return useSyncExternalStore(subscribe, () => currentProduct, () => null);
}

export function setCurrentInquiryProduct(product: InquiryProduct | null) {
  currentProduct = product;
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function addInquiryProduct(product: InquiryProduct) {
  const products = readProducts();
  if (products.some((item) => item.id === product.id && item.url === product.url)) return;
  writeProducts([...products, product]);
}

export function removeInquiryProduct(id: string, url: string) {
  writeProducts(readProducts().filter((item) => item.id !== id || item.url !== url));
}

export function clearInquiryProducts() {
  writeProducts([]);
}
