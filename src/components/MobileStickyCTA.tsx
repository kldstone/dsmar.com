import { Link, useNavigate } from "react-router-dom";
import { trackConversion } from "@/lib/analytics";
import { addInquiryProduct, useCurrentInquiryProduct } from "@/lib/inquiry";
import { useLang } from "@/lib/i18n";

const WHATSAPP_NUMBER = "8613959948672";

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.52 14.76L2 22l5.38-1.41A9.98 9.98 0 1 0 12.04 2Zm0 17.98a8.04 8.04 0 0 1-4.1-1.12l-.3-.18-3.2.84.86-3.11-.2-.32a8.1 8.1 0 1 1 6.94 3.89Zm4.45-6.06c-.24-.12-1.44-.71-1.66-.79-.23-.08-.39-.12-.55.12-.16.25-.63.79-.77.95-.14.17-.28.19-.53.07-.24-.12-1.02-.38-1.95-1.2a7.35 7.35 0 0 1-1.35-1.68c-.14-.24-.02-.37.1-.49.11-.11.25-.28.37-.42.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.75-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.19.87 2.35.99 2.51.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

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
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("whatsapp_click", { product_id: currentProduct.id, source: "mobile_sticky" })} className="flex-1 min-h-[48px] px-1 flex items-center justify-center gap-1.5 bg-white border-2 border-[#e60012] text-[#e60012] text-center text-[11px] font-bold leading-tight">
            <WhatsAppIcon />
            {lang === "zh" ? "WhatsApp咨询" : "WHATSAPP"}
          </a>
          <button type="button" onClick={() => addCurrent(false)} className="flex-1 min-h-[48px] px-1 border-2 border-[#e60012] text-[#e60012] text-[11px] font-bold leading-tight">
            {lang === "zh" ? "加入询价" : "Add to inquiry"}
          </button>
          <button type="button" onClick={() => addCurrent(true)} className="flex-1 min-h-[48px] px-1 flex items-center justify-center gap-1.5 bg-[#e60012] text-white text-[11px] font-bold leading-tight">
            <EnvelopeIcon />
            {lang === "zh" ? "获取报价" : "REQUEST QUOTE"}
          </button>
        </>
      ) : (
        <>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("whatsapp_click", { source: "mobile_sticky" })} className="flex-1 min-h-[48px] flex items-center justify-center gap-2 bg-white border-2 border-[#e60012] text-[#e60012] text-[12px] font-bold">
            <WhatsAppIcon />
            {lang === "zh" ? "WhatsApp咨询" : "WHATSAPP"}
          </a>
          <Link to="/contact" onClick={() => trackConversion("quote_cta", { source: "mobile_sticky" })} className="flex-1 min-h-[48px] flex items-center justify-center gap-2 bg-[#e60012] text-white text-[12px] font-bold">
            <EnvelopeIcon />
            {lang === "zh" ? "获取报价" : "REQUEST QUOTE"}
          </Link>
        </>
      )}
    </div>
  );
}
