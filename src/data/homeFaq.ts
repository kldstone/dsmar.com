import type { Lang } from "@/lib/i18n";

export const homeContentModified = "2026-11-25";

export const homeFaq = [
  {
    question: {
      zh: "怎样为目录中的石材产品询价？",
      en: "How can I request a quote for a catalog product?",
    },
    answer: {
      zh: "打开产品详情页并提交询盘。项目资料不完整也可以先联系；东升会根据具体材料和技术要求确认供货情况与正式报价。",
      en: "Open a product page and send an inquiry. You can get in touch before every project detail is settled; Dongsheng confirms availability and a formal quotation against the specific material and technical requirements.",
    },
  },
  {
    question: {
      zh: "产品图片能确认尺寸、表面处理和现货情况吗？",
      en: "Do product images confirm dimensions, finish, and stock?",
    },
    answer: {
      zh: "图片用于浏览和初步选材，不能单独确认具体批次、尺寸、表面处理或当前库存。请在询盘中说明所需信息，由东升结合具体材料逐项确认。",
      en: "Images support browsing and preliminary selection. They do not by themselves confirm a specific lot, dimensions, finish, or current stock. Include the details you need in your inquiry so Dongsheng can confirm them for the specific material.",
    },
  },
  {
    question: {
      zh: "还不确定材料或尺寸，可以先询盘吗？",
      en: "Can I inquire if I am not sure about the material or dimensions?",
    },
    answer: {
      zh: "可以。联系页面允许项目详情留空；如果尚未确定材料或尺寸，可以提交参考图片，东升会协助你进一步选材。",
      en: "Yes. Project details on the contact form are optional. If you have not settled on a material or dimensions, the form invites you to send a reference image for help with selection.",
    },
  },
  {
    question: {
      zh: "产品名称能准确说明石材的地质分类吗？",
      en: "Do product names always identify a stone's geological classification?",
    },
    answer: {
      zh: "不一定。石材的商业名称可能与地质学分类不同。官网名称和图片用于初步浏览；正式选材前，请向东升核实具体材料分类及项目所需信息。",
      en: "Not always. Commercial stone names may differ from scientific geological classifications. Use catalog names and photos for initial browsing, then ask Dongsheng to confirm the material classification and project details before specifying a product.",
    },
    citationUrls: ["https://www.naturalstoneinstitute.org/stoneprofessionals/varieties/definition/"],
  },
  {
    question: {
      zh: "怎样确认天然石材的清洁养护方式？",
      en: "How can I confirm care instructions for natural stone?",
    },
    answer: {
      zh: "天然石材的养护方式取决于其地质分类和组成。Natural Stone Institute 指出，柠檬汁、醋等酸性产品可能使含碳酸盐的石材失去光泽或被蚀刻。请结合具体材料和使用场景向供应商或养护专业人员确认。",
      en: "Care depends on a stone's geological classification and composition. The Natural Stone Institute notes that acidic products such as lemon or vinegar may dull or etch calcareous stones. Confirm care for the exact material and application with your supplier or a stone-care professional.",
    },
    citationUrls: ["https://www.naturalstoneinstitute.org/consumers/care/"],
  },
] as const;

export function getHomeFaq(lang: Lang, catalog: { productCount: number; collectionCount: number }) {
  return [
    ...homeFaq.map(({ question, answer, ...item }) => ({
      question: question[lang],
      answer: answer[lang],
      citationUrls: "citationUrls" in item ? item.citationUrls : [],
    })),
    {
      question: lang === "zh" ? "东升官网产品目录目前列出多少个产品？" : "How many products are listed in Dongsheng's online catalog?",
      citationUrls: [],
      answer: lang === "zh"
        ? `官网目录目前列出 ${catalog.productCount} 条已发布产品记录，分为 ${catalog.collectionCount} 个系列。统计时每条产品记录计为一项，系列数量按目录中的分类记录计算。这些数字只表示官网展示的目录条目，不等于独立石种数、现货数量或已确认供货。选型时请按具体产品核实批次、尺寸、表面处理及供应情况。`
        : `We list ${catalog.productCount} published product records across ${catalog.collectionCount} collections. We count each product record once; the collection total comes from the category records in this catalog. These figures describe website listings only. They do not indicate geological variety, stock, or confirmed supply. Verify the lot, dimensions, finish, and availability of a selected item before specifying it.`,
    },
  ];
}
