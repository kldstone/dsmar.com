import { Link, useNavigate } from "react-router-dom";
import { trackConversion } from "@/lib/analytics";
import { addInquiryProduct, useCurrentInquiryProduct } from "@/lib/inquiry";
import { useLang } from "@/lib/i18n";

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

  return (
    <div className="mobile-sticky-actions fixed bottom-0 left-0 right-0 z-[90] md:hidden bg-white border-t border-black/10 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex items-center gap-2">
      {currentProduct ? (
        <>
          <button type="button" onClick={() => addCurrent(false)} className="flex-1 min-h-[48px] px-2 border-2 border-[#9f1d1d] text-[#7f1717] text-[12px] font-bold">
            {lang === "zh" ? "加入询价" : "Add to inquiry"}
          </button>
          <button type="button" onClick={() => addCurrent(true)} className="flex-1 min-h-[48px] px-2 bg-[#9f1d1d] text-white text-[12px] font-bold">
            {lang === "zh" ? "获取报价" : "Request a Quote"}
          </button>
        </>
      ) : (
        <>
          <a href="tel:+8613959948672" onClick={() => trackConversion("phone_click", { source: "mobile_sticky" })} className="flex-1 min-h-[48px] flex items-center justify-center bg-[#222] text-white text-[12px] font-bold">
            {lang === "zh" ? "联系我们" : "Contact Us"}
          </a>
          <Link to="/contact" onClick={() => trackConversion("quote_cta", { source: "mobile_sticky" })} className="flex-1 min-h-[48px] flex items-center justify-center bg-[#9f1d1d] text-white text-[12px] font-bold">
            {lang === "zh" ? "获取报价" : "Request a Quote"}
          </Link>
        </>
      )}
    </div>
  );
}
