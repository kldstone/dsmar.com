export type ProjectCase = {
  slug: string;
  name: string;
  en: string;
  cover: string;
  images: string[];
};

const imagePaths = (slug: string, count: number) =>
  Array.from(
    { length: count },
    (_, index) => `/optimized/project-cases/${slug}/${String(index + 1).padStart(2, "0")}.webp`,
  );

export const projectCases: ProjectCase[] = [
  { slug: "ziqi-donglai", name: "紫气东来", en: "Ziqi Donglai", cover: "/optimized/project-cases/ziqi-donglai.webp", images: imagePaths("ziqi-donglai", 8) },
  { slug: "monet-garden", name: "莫奈花园", en: "Monet Garden", cover: "/optimized/project-cases/monet-garden.webp", images: imagePaths("monet-garden", 8) },
  { slug: "lange-brown", name: "朗格棕", en: "Lange Brown", cover: "/optimized/project-cases/lange-brown.webp", images: imagePaths("lange-brown", 8) },
  { slug: "hanbaiyu", name: "汉白玉", en: "Chinese White Marble", cover: "/optimized/project-cases/hanbaiyu.webp", images: imagePaths("hanbaiyu", 8) },
  { slug: "mijita", name: "米基塔", en: "Mijita", cover: "/optimized/project-cases/mijita.webp", images: imagePaths("mijita", 8) },
  { slug: "dina-white", name: "迪娜白", en: "Dina White", cover: "/optimized/project-cases/dina-white.webp", images: imagePaths("dina-white", 9) },
  { slug: "starry-grey", name: "星际灰", en: "Starry Grey", cover: "/optimized/project-cases/starry-grey.webp", images: imagePaths("starry-grey", 10) },
  { slug: "brasilia-black", name: "巴西利亚黑", en: "Brasilia Black", cover: "/optimized/project-cases/brasilia-black.webp", images: imagePaths("brasilia-black", 5) },
  { slug: "tiffany", name: "蒂芙尼", en: "Tiffany", cover: "/optimized/project-cases/tiffany.webp", images: imagePaths("tiffany", 8) },
  { slug: "shanna", name: "莎安娜", en: "Shanna", cover: "/optimized/project-cases/shanna.webp", images: imagePaths("shanna", 8) },
  { slug: "bulgari-pink", name: "宝格丽粉", en: "Bulgari Pink", cover: "/optimized/project-cases/bulgari-pink.webp", images: imagePaths("bulgari-pink", 6) },
  { slug: "snow-mountain-jade", name: "雪山翡翠", en: "Snow Mountain Jade", cover: "/optimized/project-cases/snow-mountain-jade.webp", images: imagePaths("snow-mountain-jade", 6) },
  { slug: "patek-green", name: "百达翡绿", en: "Patek Green", cover: "/optimized/project-cases/patek-green.webp", images: imagePaths("patek-green", 6) },
  { slug: "red-cave-stone", name: "红洞石", en: "Red Cave Stone", cover: "/optimized/project-cases/red-cave-stone.webp", images: imagePaths("red-cave-stone", 12) },
  { slug: "yugoslavian-white", name: "南斯拉夫白", en: "Yugoslavian White", cover: "/optimized/project-cases/yugoslavian-white.webp", images: imagePaths("yugoslavian-white", 9) },
];

export const getProjectCase = (slug: string | undefined) =>
  projectCases.find((projectCase) => projectCase.slug === slug);
