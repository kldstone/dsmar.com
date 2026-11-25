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
] as const;

export function getHomeFaq(lang: Lang) {
  return homeFaq.map(({ question, answer }) => ({ question: question[lang], answer: answer[lang] }));
}
