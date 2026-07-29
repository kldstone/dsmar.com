import { Link, useNavigate } from "react-router-dom";
import { trackConversion } from "@/lib/analytics";
import { addInquiryProduct, useCurrentInquiryProduct } from "@/lib/inquiry";
import { useLang } from "@/lib/i18n";

const WHATSAPP_NUMBER = "8613959948672";

export default function MobileStickyCTA() {
  const { lang } = useLang();
  const currentProduct = useCurrentInquiryProduct();
  const navigate = useNavigate();

  function addCurrent(goToContact: boolean) {
    if (!currentProduct) return;
    addInquiryProduct(currentProduct);
    trackConversion("product_inquiry_add", { product_id: currentProduct.id, source: "mobile_sticky" });
    if (goToContact) navigate("/contact");
  }

  const whatsappMessage = currentProduct
    ? lang === "zh"
      ? `您好，我想咨询 ${currentProduct.name}（${currentProduct.code || currentProduct.id}）：${currentProduct.url}`
      : `Hello, I would like to ask about ${currentProduct.name} (${currentProduct.code || currentProduct.id}): ${currentProduct.url}`
    : lang === "zh"
      ? "您好，我想咨询东升大理石的产品和项目报价。"
      : "Hello, I would like to ask about Dongsheng Marble products and a project quotation.";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="mobile-sticky-actions fixed bottom-0 left-0 right-0 z-[90] md:hidden bg-white border-t border-black/10 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex items-center gap-2">
      {currentProduct ? (
        <>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("whatsapp_click", { product_id: currentProduct.id, source: "mobile_sticky" })} className="flex-1 min-h-[48px] px-1 flex items-center justify-center bg-[#e60012] text-white text-center text-[11px] font-bold leading-tight">
            {lang === "zh" ? "WhatsApp咨询" : "WHATSAPP"}
          </a>
          <button type="button" onClick={() => addCurrent(false)} className="flex-1 min-h-[48px] px-1 border-2 border-[#e60012] text-[#e60012] text-[11px] font-bold leading-tight">
            {lang === "zh" ? "加入询价" : "Add to inquiry"}
          </button>
          <button type="button" onClick={() => addCurrent(true)} className="flex-1 min-h-[48px] px-1 bg-[#e60012] text-white text-[11px] font-bold leading-tight">
            {lang === "zh" ? "获取报价" : "REQUEST QUOTE"}
          </button>
        </>
      ) : (
        <>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("whatsapp_click", { source: "mobile_sticky" })} className="flex-1 min-h-[48px] flex items-center justify-center bg-[#e60012] text-white text-[12px] font-bold">
            {lang === "zh" ? "WhatsApp咨询" : "WHATSAPP"}
          </a>
          <Link to="/contact" onClick={() => trackConversion("quote_cta", { source: "mobile_sticky" })} className="flex-1 min-h-[48px] flex items-center justify-center bg-[#e60012] text-white text-[12px] font-bold">
            {lang === "zh" ? "获取报价" : "REQUEST QUOTE"}
          </Link>
        </>
      )}
    </div>
  );
}
