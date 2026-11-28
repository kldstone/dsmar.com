import categories from "@/data/catalog";
import { getTranslation } from "@/lib/i18n";

const normalizeSearchValue = (value: string) => value.trim().toLocaleLowerCase().replace(/\s+/g, "");

export type SearchProduct = {
  id: string;
  nameZh: string;
  nameEn: string;
  categoryZh: string;
  categoryEn: string;
  typeZh: string;
  typeEn: string;
  styles: string[];
  thumbnail: string;
  url: string;
  code: string;
};

export function matchesSearchQuery(product: SearchProduct, query: string): boolean {
  const term = normalizeSearchValue(query);
  if (!term) return true;

  return [product.nameZh, product.nameEn, product.code, product.categoryZh, product.categoryEn]
    .some((field) => normalizeSearchValue(field).includes(term));
}

let cache: SearchProduct[] | null = null;

export async function loadSearchProducts(): Promise<SearchProduct[]> {
  if (cache) return cache;

  cache = categories.flatMap((category) =>
    category.products.map((product) => {
      const translatedName = getTranslation("en", `catalog_product_${product.id}_name`);
      return {
        id: `catalog-${product.id}`,
        nameZh: product.name,
        nameEn: translatedName === `catalog_product_${product.id}_name` ? product.name : translatedName,
        categoryZh: category.name,
        categoryEn: category.subtitle,
        typeZh: "天然石材",
        typeEn: "Natural Stone",
        styles: product.styles ?? [],
        thumbnail: product.cover,
        url: `/catalog/${category.key}/${product.id}`,
        code: product.id,
      };
    }),
  );

  return cache;
}
