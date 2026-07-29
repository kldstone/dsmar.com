import { useState } from "react";
import { optimizedImage, responsiveImage } from "@/lib/images";
import { trackConversion } from "@/lib/analytics";
import { clearInquiryProducts, removeInquiryProduct, useInquiryProducts } from "@/lib/inquiry";
import { useLang } from "@/lib/i18n";

type FormValues = {
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  requirement: string;
  projectType: string;
  application: string;
  material: string;
  dimensions: string;
  quantity: string;
  timeline: string;
  destinationPort: string;
  sampleRequirement: string;
  website: string;
};

type Attachment = { name: string; type: string; data: string };
type SubmitState = "idle" | "sending" | "success" | "server-error" | "network-error";
type FileState = "idle" | "reading" | "ready" | "format-error" | "size-error" | "read-error";

const initialValues: FormValues = {
  name: "",
  email: "",
  whatsapp: "",
  country: "",
  requirement: "",
  projectType: "",
  application: "",
  material: "",
  dimensions: "",
  quantity: "",
  timeline: "",
  destinationPort: "",
  sampleRequirement: "",
  website: "",
};
const allowedExtensions = new Set(["pdf", "jpg", "jpeg", "png", "webp", "dwg", "dxf"]);
const maxFileBytes = 2.5 * 1024 * 1024;

function getAttribution() {
  const query = new URLSearchParams(window.location.search);
  return {
    utm_source: query.get("utm_source") || "",
    utm_medium: query.get("utm_medium") || "",
    utm_campaign: query.get("utm_campaign") || "",
    utm_term: query.get("utm_term") || "",
    utm_content: query.get("utm_content") || "",
    gclid: query.get("gclid") || "",
    landing_page: window.location.href,
    referrer: document.referrer || "",
  };
}

export default function Contact() {
  const { t, lang } = useLang();
  const products = useInquiryProducts();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [fileState, setFileState] = useState<FileState>("idle");
  const [submitted, setSubmitted] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const copy = lang === "zh" ? {
    required: "必填",
    optional: "选填",
    name: "姓名",
    contact: "邮箱或 WhatsApp",
    email: "邮箱",
    whatsapp: "WhatsApp",
    country: "国家 / 地区",
    requirement: "简要需求",
    requirementPlaceholder: "例如：酒店大堂墙面石材，需要选材和报价建议。",
    contactHint: "邮箱和 WhatsApp 填写任意一项即可。",
    incomplete: "资料不完整也可以提交，我们会协助你逐步确认。",
    reference: "参考图片或文件",
    fileHint: "PDF、JPG、JPEG、PNG、WEBP、DWG 或 DXF，最大 2.5 MB。",
    choosing: "文件读取中……",
    formatError: "文件格式不支持，请选择允许的格式。",
    sizeError: "文件超过 2.5 MB，请压缩后重试。",
    readError: "文件读取失败，请重新选择。",
    removeFile: "移除文件",
    materialHelp: "还不确定材料或尺寸？发送一张参考图片，我们会协助你选择。",
    details: "添加项目详情",
    detailsHint: "以下信息均为选填",
    projectType: "项目类型",
    application: "应用位置",
    material: "石材 / 材料",
    dimensions: "尺寸",
    quantity: "数量",
    timeline: "需求时间",
    port: "目的港",
    sample: "样品需求",
    askingAbout: "您正在询问",
    removeProduct: "移除产品",
    noProduct: "也可以直接提交一般项目需求。",
    submit: "获取报价",
    sending: "提交中……",
    success: "询价已发送",
    successDesc: "邮件服务已接受您的询价。我们会在一个工作日内进行首次业务回复，并在材料和技术确认后提供正式报价。",
    another: "再提交一条询价",
    serverError: "服务器未能发送询价，请稍后重试。您填写的内容已保留。",
    networkError: "网络连接失败，请检查网络后重试。您填写的内容已保留。",
    reply: "首次业务回复将在24小时内完成；正式报价将在材料和技术确认后提供。",
    processTitle: "询价流程",
    process: ["提交需求", "材料和技术确认", "样品或图纸确认", "报价", "生产与检验", "包装与运输"],
  } : {
    required: "Required",
    optional: "Optional",
    name: "Name",
    contact: "Email or WhatsApp",
    email: "Email",
    whatsapp: "WhatsApp",
    country: "Country / Region",
    requirement: "Brief requirement",
    requirementPlaceholder: "Example: stone for a hotel lobby wall; please advise on material selection and quotation.",
    contactHint: "Provide either an email address or WhatsApp number.",
    incomplete: "It is fine to submit with incomplete details. We can help you confirm them step by step.",
    reference: "Reference image or file",
    fileHint: "PDF, JPG, JPEG, PNG, WEBP, DWG or DXF, up to 2.5 MB.",
    choosing: "Reading file…",
    formatError: "Unsupported file format. Please select an allowed file type.",
    sizeError: "The file exceeds 2.5 MB. Please compress it and try again.",
    readError: "The file could not be read. Please select it again.",
    removeFile: "Remove file",
    materialHelp: "Not sure about the material or dimensions yet? Send us a reference image and we’ll help you choose.",
    details: "Add project details",
    detailsHint: "All fields below are optional",
    projectType: "Project type",
    application: "Application",
    material: "Stone / material",
    dimensions: "Dimensions",
    quantity: "Quantity",
    timeline: "Required timeline",
    port: "Destination port",
    sample: "Sample requirement",
    askingAbout: "You’re asking about",
    removeProduct: "Remove product",
    noProduct: "You can also submit a general project requirement.",
    submit: "Request a Quote",
    sending: "Submitting…",
    success: "Inquiry sent",
    successDesc: "The email provider accepted your inquiry. Expect an initial business reply within 24 hours; a formal quotation follows material and technical confirmation.",
    another: "Send another inquiry",
    serverError: "The server could not send your inquiry. Please try again. Your information has been kept.",
    networkError: "The network request failed. Check your connection and try again. Your information has been kept.",
    reply: "Business reply within 24 hours. Formal quotation after material and technical confirmation.",
    processTitle: "Inquiry process",
    process: ["Submit your requirements", "Material and technical confirmation", "Sample or drawing approval", "Quotation", "Production and inspection", "Packing and shipment"],
  };

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleFile(file: File | undefined) {
    setAttachment(null);
    if (!file) {
      setFileState("idle");
      return;
    }
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedExtensions.has(extension)) {
      setFileState("format-error");
      return;
    }
    if (file.size > maxFileBytes) {
      setFileState("size-error");
      return;
    }
    setFileState("reading");
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setFileState("read-error");
        return;
      }
      setAttachment({ name: file.name, type: file.type, data: reader.result });
      setFileState("ready");
    };
    reader.onerror = () => setFileState("read-error");
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted === "sending" || fileState === "reading") return;
    if (!values.email.trim() && !values.whatsapp.trim()) {
      setSubmitted("server-error");
      setErrorMessage(copy.contactHint);
      return;
    }

    setSubmitted("sending");
    setErrorMessage("");
    trackConversion("form_submit", { source: "contact_page", product_count: products.length });
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, products, attachment, attribution: getAttribution() }),
      });
      const result = await response.json() as { accepted?: boolean; id?: string; error?: string };
      if (!response.ok || !result.accepted || !result.id) {
        setSubmitted("server-error");
        setErrorMessage(result.error || copy.serverError);
        return;
      }
      setSubmitted("success");
      clearInquiryProducts();
    } catch {
      setSubmitted("network-error");
      setErrorMessage(copy.networkError);
    }
  }

  const fieldClass = "w-full min-h-[48px] bg-white border border-black/20 px-4 py-3 text-[15px] text-[#111] placeholder:text-[#666] focus:border-[#9f1d1d] transition-colors";
  const labelClass = "block text-[#222] text-[13px] font-bold tracking-[0.02em] mb-2";

  return (
    <div>
      <section className="relative h-[45vh] min-h-[340px] bg-[#0f0f0f] overflow-hidden">
        <img {...responsiveImage("/brand-gallery/hero-contact.jpg")} alt={t("contact_hero_alt")} className="w-full h-full object-cover opacity-80" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/85 text-[12px] font-bold tracking-[0.12em] uppercase">Contact</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-3">{t("contact_title")}</h1>
            <p className="text-white/85 text-[15px] max-w-[520px] mx-auto leading-relaxed">{t("contact_hero_desc")}</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-20">
          <div>
            <h2 className="text-[#111] text-[1.6rem] font-black tracking-[0.02em] mb-8">{t("contact_info_title")}</h2>
            <div className="space-y-8">
              <div><span className={labelClass}>{t("contact_address_label")}</span><p className="text-[#222] text-[15px] font-semibold leading-relaxed">{t("contact_address")}</p></div>
              <div><span className={labelClass}>{t("contact_phone_label")}</span><a href="tel:+8613959948672" onClick={() => trackConversion("phone_click", { source: "contact_page" })} className="inline-flex min-h-[44px] items-center text-[#111] text-[18px] font-black hover:text-[#9f1d1d]">+86 139 5994 8672</a></div>
              <div><span className={labelClass}>{t("contact_email_label")}</span><a href="mailto:dongshengmarble@gmail.com" className="inline-flex min-h-[44px] items-center text-[#222] text-[15px] font-semibold hover:text-[#9f1d1d]">dongshengmarble@gmail.com</a></div>
              <div>
                <span className={labelClass}>{t("contact_social_label")}</span>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#9f1d1d] rounded-full flex items-center justify-center" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z"/></svg>
                  </div>
                  <div><p className="text-[#222] text-[14px] font-semibold">{t("contact_social_title")}</p><p className="text-[#555] text-[13px]">{t("contact_social_desc")}</p><p className="text-[#333] text-[13px] font-medium">{t("contact_social_account")}</p></div>
                </div>
              </div>
              <div className="overflow-hidden"><img src={optimizedImage("/brand-gallery/contact-exhibition-team-2025-07-22.jpg")} alt={t("contact_factory_alt")} className="w-full aspect-[16/9] object-cover" loading="lazy" decoding="async" /></div>
            </div>
          </div>

          <div>
            <h2 className="text-[#111] text-[1.6rem] font-black tracking-[0.02em] mb-2">{t("contact_form_title")}</h2>
            <p className="text-[#444] text-[14px] mb-7">{copy.incomplete}</p>

            {submitted === "success" ? (
              <div className="bg-white border border-black/10 p-8 md:p-12 text-center" role="status" aria-live="polite">
                <h3 className="text-[#111] text-[1.3rem] font-black mb-3">{copy.success}</h3>
                <p className="text-[#333] text-[15px] leading-relaxed max-w-[520px] mx-auto">{copy.successDesc}</p>
                <button onClick={() => { setValues(initialValues); setAttachment(null); setFileState("idle"); setSubmitted("idle"); }} className="mt-8 min-h-[44px] px-6 text-[#111] text-[14px] font-bold underline underline-offset-4">{copy.another}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="absolute left-[-10000px]" aria-hidden="true">
                  <label>Website<input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={(event) => updateValue("website", event.target.value)} /></label>
                </div>

                {products.length > 0 && (
                  <section aria-labelledby="inquiry-products-title" className="border border-black/10 bg-[#f8f8f8] p-4">
                    <h3 id="inquiry-products-title" className="text-[#111] text-[14px] font-black mb-3">{copy.askingAbout}</h3>
                    <div className="space-y-3">
                      {products.map((product) => (
                        <div key={`${product.id}-${product.url}`} className="grid grid-cols-[64px_1fr_auto] gap-3 items-center bg-white p-2 border border-black/5">
                          <img src={optimizedImage(product.thumbnail)} alt="" className="w-16 h-16 object-cover" loading="lazy" decoding="async" />
                          <div className="min-w-0"><p className="font-bold text-[14px] text-[#111] truncate">{product.name}</p><p className="text-[12px] text-[#555]">{product.code} · {product.category}</p></div>
                          <button type="button" onClick={() => removeInquiryProduct(product.id, product.url)} aria-label={`${copy.removeProduct}: ${product.name}`} className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[20px] text-[#333] hover:text-[#9f1d1d]">×</button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <div>
                  <label htmlFor="inquiry-name" className={labelClass}>{copy.name} <span className="text-[#9f1d1d]">({copy.required})</span></label>
                  <input id="inquiry-name" required maxLength={100} autoComplete="name" className={fieldClass} value={values.name} onChange={(event) => updateValue("name", event.target.value)} />
                </div>

                <fieldset>
                  <legend className={labelClass}>{copy.contact} <span className="text-[#9f1d1d]">({copy.required})</span></legend>
                  <p id="contact-choice-hint" className="text-[#555] text-[13px] mb-3">{copy.contactHint}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label htmlFor="inquiry-email" className={labelClass}>{copy.email} ({copy.optional})</label><input id="inquiry-email" type="email" maxLength={160} autoComplete="email" aria-describedby="contact-choice-hint" className={fieldClass} value={values.email} onChange={(event) => updateValue("email", event.target.value)} /></div>
                    <div><label htmlFor="inquiry-whatsapp" className={labelClass}>{copy.whatsapp} ({copy.optional})</label><input id="inquiry-whatsapp" type="tel" maxLength={60} autoComplete="tel" aria-describedby="contact-choice-hint" className={fieldClass} value={values.whatsapp} onChange={(event) => updateValue("whatsapp", event.target.value)} /></div>
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="inquiry-country" className={labelClass}>{copy.country} <span className="text-[#9f1d1d]">({copy.required})</span></label>
                  <input id="inquiry-country" required maxLength={100} autoComplete="country-name" className={fieldClass} value={values.country} onChange={(event) => updateValue("country", event.target.value)} />
                </div>

                <div>
                  <label htmlFor="inquiry-requirement" className={labelClass}>{copy.requirement} <span className="text-[#9f1d1d]">({copy.required})</span></label>
                  <textarea id="inquiry-requirement" required maxLength={3000} rows={4} className={`${fieldClass} resize-y`} placeholder={copy.requirementPlaceholder} value={values.requirement} onChange={(event) => updateValue("requirement", event.target.value)} />
                  <p className="mt-2 text-[#444] text-[13px] leading-relaxed">{copy.materialHelp}</p>
                </div>

                <div>
                  <label htmlFor="inquiry-file" className={labelClass}>{copy.reference} ({copy.optional})</label>
                  <input id="inquiry-file" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.dwg,.dxf" onChange={(event) => handleFile(event.target.files?.[0])} className="block w-full text-[14px] file:min-h-[44px] file:mr-4 file:border-0 file:bg-[#222] file:text-white file:px-5 file:font-bold" />
                  <p className="mt-2 text-[#555] text-[12px]">{copy.fileHint}</p>
                  <div aria-live="polite" className="mt-2 text-[13px]">
                    {fileState === "reading" && <p>{copy.choosing}</p>}
                    {fileState === "ready" && attachment && <p className="flex items-center justify-between gap-3"><span className="truncate">{attachment.name}</span><button type="button" onClick={() => { setAttachment(null); setFileState("idle"); }} className="min-h-[44px] px-3 font-bold text-[#9f1d1d]">{copy.removeFile}</button></p>}
                    {fileState === "format-error" && <p role="alert" className="text-[#9f1d1d]">{copy.formatError}</p>}
                    {fileState === "size-error" && <p role="alert" className="text-[#9f1d1d]">{copy.sizeError}</p>}
                    {fileState === "read-error" && <p role="alert" className="text-[#9f1d1d]">{copy.readError}</p>}
                  </div>
                </div>

                <details className="border border-black/15 bg-[#fafafa] group">
                  <summary className="min-h-[52px] px-4 flex cursor-pointer items-center justify-between text-[14px] font-black text-[#111] focus-visible:outline-offset-[-3px]">
                    <span>{copy.details}<small className="block text-[12px] font-normal text-[#555]">{copy.detailsHint}</small></span>
                    <span className="text-[22px] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <div className="border-t border-black/10 p-4 grid sm:grid-cols-2 gap-4">
                    {([
                      ["projectType", copy.projectType], ["application", copy.application], ["material", copy.material], ["dimensions", copy.dimensions],
                      ["quantity", copy.quantity], ["timeline", copy.timeline], ["destinationPort", copy.port], ["sampleRequirement", copy.sample],
                    ] as [keyof FormValues, string][]).map(([field, label]) => (
                      <div key={field}><label htmlFor={`inquiry-${field}`} className={labelClass}>{label} ({copy.optional})</label><input id={`inquiry-${field}`} maxLength={field === "sampleRequirement" ? 300 : 200} className={fieldClass} value={values[field]} onChange={(event) => updateValue(field, event.target.value)} /></div>
                    ))}
                  </div>
                </details>

                {(submitted === "server-error" || submitted === "network-error") && <p role="alert" aria-live="assertive" className="border-l-4 border-[#9f1d1d] bg-red-50 p-4 text-[#7f1d1d] text-[14px]">{errorMessage || (submitted === "network-error" ? copy.networkError : copy.serverError)}</p>}

                <button type="submit" disabled={submitted === "sending" || fileState === "reading"} className="w-full min-h-[52px] px-6 bg-[#9f1d1d] text-white text-[14px] font-black hover:bg-[#7f1717] active:bg-[#681212] disabled:bg-[#777] disabled:cursor-not-allowed">
                  {submitted === "sending" ? copy.sending : copy.submit}
                </button>
                <p className="text-center text-[#333] text-[13px] font-semibold">{copy.reply}</p>
              </form>
            )}

            <section className="mt-12 border-t border-black/10 pt-8" aria-labelledby="inquiry-process-title">
              <h3 id="inquiry-process-title" className="text-[#111] text-[1.1rem] font-black mb-5">{copy.processTitle}</h3>
              <ol className="grid sm:grid-cols-2 gap-3">
                {copy.process.map((step, index) => <li key={step} className="flex gap-3 text-[14px] text-[#333]"><span className="font-black text-[#9f1d1d]">{index + 1}.</span><span>{step}</span></li>)}
              </ol>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
