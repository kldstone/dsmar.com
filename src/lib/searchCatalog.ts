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

let cache: SearchProduct[] | null = null;

const collectionCategoryEn: Record<string, string> = {
  "白色系": "White Series",
  "米色系": "Beige Series",
  "灰色系": "Grey Series",
  "黑色系": "Dark Series",
  "棕色系": "Brown Series",
  "红色系": "Red Series",
  "绿色系": "Green Series",
  "蓝色系": "Blue Series",
  "金色系": "Gold Series",
  "水刀拼花": "Waterjet Mosaic",
};

export async function loadSearchProducts(): Promise<SearchProduct[]> {
  if (cache) return cache;
  const [{ default: categories }, { products }] = await Promise.all([
    import("@/data/catalog"),
    import("@/pages/Collections"),
  ]);

  const catalogProducts = categories.flatMap((category) =>
    category.products.map((product) => ({
      id: `catalog-${product.id}`,
      nameZh: product.name,
      nameEn: product.name,
      categoryZh: category.name,
      categoryEn: category.subtitle,
      typeZh: "矿山直供",
      typeEn: "Mine Direct",
      styles: product.styles ?? [],
      thumbnail: product.cover,
      url: `/catalog/${category.key}/${product.id}`,
      code: product.id,
    })),
  );

  const collectionProducts = products.map((product, index) => {
    const match = product.img.match(/gani_(\d+)/);
    const productId = match ? String(Number.parseInt(match[1], 10) - 1) : String(index);
    const isMosaic = product.color === "水刀拼花";
    return {
      id: `collection-${productId}`,
      nameZh: product.name,
      nameEn: product.en || product.name,
      categoryZh: product.color,
      categoryEn: collectionCategoryEn[product.color] || product.color,
      typeZh: isMosaic ? "水刀拼花" : "天然大理石",
      typeEn: isMosaic ? "Waterjet Mosaic" : "Natural Marble",
      styles: [],
      thumbnail: product.img,
      url: product.href || `/collections/product/${productId}`,
      code: `DS-${productId}`,
    };
  });

  const seen = new Set<string>();
  cache = [...catalogProducts, ...collectionProducts].filter((product) => {
    const key = `${product.url}|${product.nameZh}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return cache;
}
