export type CatalogProduct = {
  id: string;
  name: string;
  cover: string;
  tagline: string;
  images?: string[];
  styles?: string[];
};

export type CatalogCategory = {
  key: string;
  name: string;
  subtitle: string;
  description: string;
  heroImg: string;
  products: CatalogProduct[];
};

const img = (dir: string, pages: number) =>
  Array.from({ length: pages }, (_, i) => `/catalog-products/${dir}/page-${String(i).padStart(2, '0')}.jpg`);

const categories: CatalogCategory[] = [
  {
    key: "white-series", name: "白色系", subtitle: "WHITE SERIES",
    description: "纯白、米白、雪花白等浅色系大理石，提亮空间、百搭各种风格。",
    heroImg: "/brand-gallery/cover-white.jpg",
    products: [
      { id: "ds-baina", name: "贝纳白", cover: "/catalog-products/baina/page-00.jpg", tagline: "经典白色大理石，纹理细腻", images: img("baina", 15) },
      { id: "ds-dina", name: "迪娜白", cover: "/catalog-products/dina/page-00.jpg", tagline: "纯净白色调，空间百搭", images: img("dina", 15) },
      { id: "ds-nansilafu", name: "南斯拉夫白", cover: "/catalog-products/nansilafu-white/page-00.jpg", tagline: "白色大理石经典品种", images: img("nansilafu-white", 15) },
      { id: "ds-fenlan", name: "芬兰白", cover: "/catalog-products/fenlan/page-00.jpg", tagline: "北欧风格白色大理石", images: img("fenlan", 14) },
      { id: "ds-xueshan", name: "雪山翡翠", cover: "/catalog-products/xueshan/page-00.jpg", tagline: "白色底翡翠绿纹路，清雅高贵", images: img("xueshan", 16) },
      { id: "ds-liujin", name: "鎏金白", cover: "/catalog-products/liujinbai/page-00.jpg", tagline: "白色底金色纹理，低调奢华", images: img("liujinbai", 18) },
    ],
  },
  {
    key: "beige-series", name: "米黄系", subtitle: "BEIGE SERIES",
    description: "米黄、暖色系大理石，温馨典雅，经典不过时。",
    heroImg: "/brand-gallery/cover-beige.jpg",
    products: [
      { id: "ds-bailixiang", name: "百里香", cover: "/catalog-products/bailixiang/page-00.jpg", tagline: "米黄底细腻纹理", images: img("bailixiang", 16) },
      { id: "ds-chuangshimihuang", name: "创世米黄", cover: "/catalog-products/chuangshimihuang/page-00.jpg", tagline: "经典米黄色大理石", images: img("chuangshimihuang", 18) },
      { id: "ds-langgezong", name: "朗格棕", cover: "/catalog-products/langgezong/page-00.jpg", tagline: "暖棕色系大理石", images: img("langgezong", 24) },
    ],
  },
  {
    key: "grey-series", name: "灰色系", subtitle: "GREY SERIES",
    description: "高级灰、烟灰、深灰等灰色系大理石，现代简约风格的首选。",
    heroImg: "/brand-gallery/cover-grey.jpg",
    products: [
      { id: "ds-xingjihui", name: "星际灰", cover: "/catalog-products/xingjihui/page-00.jpg", tagline: "现代灰色大理石", images: img("xingjihui", 20) },
      { id: "ds-gaodihui", name: "高迪灰", cover: "/catalog-products/gaodihui/page-00.jpg", tagline: "灰色系经典品种", images: img("gaodihui", 14) },
    ],
  },
  {
    key: "dark-series", name: "深色系", subtitle: "DARK SERIES",
    description: "深色、黑色调大理石，沉稳大气，适合高端空间重点区域。",
    heroImg: "/brand-gallery/cover-dark.jpg",
    products: [
      { id: "ds-milanliujinhei", name: "米兰鎏金黑", cover: "/catalog-products/milanliujinhei/page-00.jpg", tagline: "黑色底鎏金纹理", images: img("milanliujinhei", 20) },
      { id: "ds-hongdongshi", name: "红洞石", cover: "/catalog-products/hongdongshi/page-00.jpg", tagline: "红色调经典洞石", images: img("hongdongshi", 19) },
    ],
  },
  {
    key: "color-series", name: "彩色系", subtitle: "COLOR SERIES",
    description: "蓝色、绿色、红色、粉色等彩色大理石，为空间注入个性与活力。",
    heroImg: "/brand-gallery/cover-color.jpg",
    products: [
      { id: "ds-louhongshan", name: "楼兰红砂", cover: "/catalog-products/louhongshan/page-00.jpg", tagline: "红色调砂岩质感", images: img("louhongshan", 19) },
      { id: "ds-aimashicheng", name: "爱马仕橙", cover: "/catalog-products/aimashicheng/page-00.jpg", tagline: "橙色系特色大理石", images: img("aimashicheng", 15) },
      { id: "ds-fendilv", name: "芬迪绿", cover: "/catalog-products/fendilv/page-00.jpg", tagline: "绿色系个性大理石", images: img("fendilv", 14) },
      { id: "ds-baogelifen", name: "宝格丽粉", cover: "/catalog-products/baogelifen/page-00.jpg", tagline: "粉色系大理石", images: img("baogelifen", 15) },
      { id: "ds-yamaxunlan", name: "亚马逊蓝", cover: "/catalog-products/yamaxunlan/page-00.jpg", tagline: "蓝色系奢石", images: img("yamaxunlan", 26) },
    ],
  },
  {
    key: "pattern-series", name: "图案系列", subtitle: "PATTERN SERIES",
    description: "具有独特天然纹理和图案的大理石，适合背景墙、玄关等视觉焦点区域。",
    heroImg: "/brand-gallery/cover-pattern.jpg",
    products: [
      { id: "ds-monaihuayuan", name: "莫奈花园", cover: "/catalog-products/monaihuayuan/page-00.jpg", tagline: "艺术感图案大理石", images: img("monaihuayuan", 22) },
      { id: "ds-difuni", name: "蒂芙尼", cover: "/catalog-products/difuni/page-00.jpg", tagline: "独特纹理图案", images: img("difuni", 20) },
      { id: "ds-ziqidonglai", name: "紫气东来", cover: "/catalog-products/ziqidonglai/page-00.jpg", tagline: "紫色调奢石纹理", images: img("ziqidonglai", 21) },
      { id: "ds-hainabaichuan", name: "海纳百川", cover: "/catalog-products/hainabaichuan/page-00.jpg", tagline: "大气纹理图案", images: img("hainabaichuan", 22) },
    ],
  },
];

export default categories;
