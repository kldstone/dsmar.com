import type { Lang } from "@/lib/i18n";

export const homeFaq = [
  {
    question: {
      zh: "怎样为目录中的石材产品询价？",
      en: "How can I request a quote for a catalog product?",
    },
    answer: {
      zh: "打开产品详情页并提交询盘。可填写产品名称或页面链接、应用位置、尺寸、数量、交付目的地、需求时间和样品需求；这些项目均为选填。东升会根据材料和技术信息确认供货情况与正式报价。",
      en: "Open a product page and send an inquiry with its name or link. You may include the application, dimensions, quantity, delivery destination, timeline, and sample needs; these details are optional. Dongsheng confirms availability and a formal quotation after reviewing the material and technical requirements.",
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
  },
] as const;

export function getHomeFaq(lang: Lang, catalog: { productCount: number; collectionCount: number }) {
  return [
    ...homeFaq.map(({ question, answer }) => ({ question: question[lang], answer: answer[lang] })),
    {
      question: lang === "zh" ? "东升官网产品目录目前列出多少个产品？" : "How many products are listed in Dongsheng's online catalog?",
      answer: lang === "zh"
        ? `官网目录目前列出 ${catalog.productCount} 个产品条目，分为 ${catalog.collectionCount} 个系列。数量按网站产品目录数据中的已发布条目计算，用于说明网站当前展示范围；这不代表相同数量的现货、独立石种数量或某款产品的实时供应情况。具体批次、尺寸、表面处理和库存请在询盘时逐项确认。`
        : `The current catalog lists ${catalog.productCount} product entries across ${catalog.collectionCount} collections. This count comes from the catalog data used to render the website's collection and product pages; it describes published listings, not stock levels or confirmed availability. Product photos also do not establish dimensions, finish, or lot. Send an inquiry to verify the current details of a specific item.`,
    },
  ];
}
