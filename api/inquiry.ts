type ApiRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
};

const MAX_BODY_BYTES = 4 * 1024 * 1024;
const MAX_FILE_BYTES = 2.5 * 1024 * 1024;
const allowedOrigins = new Set([
  "https://www.dsmar.com",
  "https://dsmar.com",
  "http://localhost:4173",
  "http://localhost:5173",
  "http://127.0.0.1:4173",
  "http://127.0.0.1:5173",
]);
const allowedMimeTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/acad",
  "application/dwg",
  "application/dxf",
  "application/x-autocad",
  "application/x-dwg",
  "image/vnd.dwg",
  "image/vnd.dxf",
]);
const allowedExtensions = new Set(["pdf", "jpg", "jpeg", "png", "webp", "dwg", "dxf"]);
const requestLog = new Map<string, number[]>();

type Product = {
  id: string;
  name: string;
  code: string;
  category: string;
  thumbnail: string;
  url: string;
};

type InquiryBody = {
  name?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  country?: unknown;
  requirement?: unknown;
  projectType?: unknown;
  application?: unknown;
  material?: unknown;
  dimensions?: unknown;
  quantity?: unknown;
  timeline?: unknown;
  destinationPort?: unknown;
  sampleRequirement?: unknown;
  website?: unknown;
  products?: unknown;
  attribution?: unknown;
  attachment?: {
    name?: unknown;
    type?: unknown;
    data?: unknown;
  } | null;
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

function safeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/^\.+/, "").slice(0, 100) || "attachment";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clientIp(request: ApiRequest) {
  const forwarded = request.headers["x-forwarded-for"];
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0])?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 5) return true;
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

function normalizeProducts(value: unknown): Product[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 20).map((item) => {
    const product = (item ?? {}) as Record<string, unknown>;
    return {
      id: text(product.id, 80),
      name: text(product.name, 120),
      code: text(product.code, 80),
      category: text(product.category, 100),
      thumbnail: text(product.thumbnail, 300),
      url: text(product.url, 500),
    };
  }).filter((product) => product.name);
}

function validFileSignature(buffer: Buffer, extension: string) {
  if (extension === "pdf") return buffer.subarray(0, 5).toString() === "%PDF-";
  if (extension === "jpg" || extension === "jpeg") return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (extension === "png") return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (extension === "webp") return buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP";
  if (extension === "dwg") return /^AC10\d{2}/.test(buffer.subarray(0, 6).toString());
  if (extension === "dxf") {
    const header = buffer.subarray(0, 256).toString("utf8").toUpperCase();
    return header.includes("SECTION") || header.includes("AUTOCAD");
  }
  return false;
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });

  const originHeader = request.headers.origin;
  const origin = Array.isArray(originHeader) ? originHeader[0] : originHeader;
  if (origin && !allowedOrigins.has(origin)) return response.status(403).json({ error: "Request origin is not allowed." });
  const contentLength = Number(request.headers["content-length"] ?? 0);
  if (contentLength > MAX_BODY_BYTES) return response.status(413).json({ error: "Request is too large." });
  if (isRateLimited(clientIp(request))) return response.status(429).json({ error: "Too many requests. Please try again later." });

  const body = (request.body ?? {}) as InquiryBody;
  if (text(body.website, 200)) return response.status(200).json({ accepted: true });

  const name = text(body.name, 100);
  const email = text(body.email, 160);
  const whatsapp = text(body.whatsapp, 60);
  const country = text(body.country, 100);
  const requirement = text(body.requirement, 3000);
  if (!name || !country || !requirement || (!email && !whatsapp)) {
    return response.status(400).json({ error: "Name, country, requirement, and email or WhatsApp are required." });
  }
  if (email && !isEmail(email)) return response.status(400).json({ error: "Please provide a valid email address." });

  const optional = {
    "Project type": text(body.projectType, 100),
    Application: text(body.application, 200),
    "Stone / material": text(body.material, 200),
    Dimensions: text(body.dimensions, 200),
    Quantity: text(body.quantity, 200),
    "Required timeline": text(body.timeline, 160),
    "Destination port": text(body.destinationPort, 160),
    "Sample requirement": text(body.sampleRequirement, 300),
  };
  const products = normalizeProducts(body.products);
  const attribution = typeof body.attribution === "object" && body.attribution
    ? Object.fromEntries(Object.entries(body.attribution as Record<string, unknown>).slice(0, 12).map(([key, value]) => [key.slice(0, 50), text(value, 300)]))
    : {};

  let attachment: { filename: string; content: string } | undefined;
  if (body.attachment) {
    const originalName = text(body.attachment.name, 160);
    const mimeType = text(body.attachment.type, 100).toLowerCase();
    const encoded = text(body.attachment.data, MAX_BODY_BYTES);
    const extension = originalName.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedExtensions.has(extension) || (mimeType && !allowedMimeTypes.has(mimeType))) {
      return response.status(400).json({ error: "Unsupported attachment format." });
    }
    const content = encoded.includes(",") ? encoded.split(",").pop() ?? "" : encoded;
    const buffer = Buffer.from(content, "base64");
    if (!buffer.length || buffer.length > MAX_FILE_BYTES) return response.status(400).json({ error: "Attachment exceeds the 2.5 MB limit." });
    if (!validFileSignature(buffer, extension)) return response.status(400).json({ error: "Attachment content does not match its file format." });
    attachment = { filename: safeFileName(originalName), content };
  }

  const productRows = products.map((product) =>
    `<li><strong>${escapeHtml(product.name)}</strong> (${escapeHtml(product.code || product.id)}) — ${escapeHtml(product.category)}<br><a href="${escapeHtml(product.url)}">${escapeHtml(product.url)}</a></li>`
  ).join("");
  const optionalRows = Object.entries(optional).filter(([, value]) => value).map(([label, value]) =>
    `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`
  ).join("");
  const attributionRows = Object.entries(attribution).filter(([, value]) => value).map(([label, value]) =>
    `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`
  ).join("");
  const html = `<!doctype html><html><head><meta charset="UTF-8"></head><body>
    <h1>DSMAR Website Inquiry</h1>
    <table cellpadding="8" cellspacing="0" border="1">
      <tr><th align="left">Name</th><td>${escapeHtml(name)}</td></tr>
      <tr><th align="left">Email</th><td>${escapeHtml(email || "Not provided")}</td></tr>
      <tr><th align="left">WhatsApp</th><td>${escapeHtml(whatsapp || "Not provided")}</td></tr>
      <tr><th align="left">Country / Region</th><td>${escapeHtml(country)}</td></tr>
      <tr><th align="left">Brief requirement</th><td>${escapeHtml(requirement).replace(/\n/g, "<br>")}</td></tr>
      ${optionalRows}
    </table>
    ${products.length ? `<h2>Products</h2><ul>${productRows}</ul>` : ""}
    ${attributionRows ? `<h2>Attribution</h2><table cellpadding="8" cellspacing="0" border="1">${attributionRows}</table>` : ""}
  </body></html>`;

  const plainOptional = Object.entries(optional).filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join("\n");
  const plainProducts = products.map((product) => `- ${product.name} (${product.code || product.id}) | ${product.category} | ${product.url}`).join("\n");
  const plainAttribution = Object.entries(attribution).filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join("\n");
  const plain = [
    "DSMAR Website Inquiry",
    `Name: ${name}`,
    `Email: ${email || "Not provided"}`,
    `WhatsApp: ${whatsapp || "Not provided"}`,
    `Country / Region: ${country}`,
    `Brief requirement: ${requirement}`,
    plainOptional,
    plainProducts ? `Products:\n${plainProducts}` : "",
    plainAttribution ? `Attribution:\n${plainAttribution}` : "",
  ].filter(Boolean).join("\n\n");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL || "dongshengmarble@gmail.com";
  if (!apiKey || !from) return response.status(503).json({ error: "Inquiry email service is not configured." });

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email || process.env.INQUIRY_REPLY_TO_EMAIL || to,
        subject: `DSMAR Inquiry from ${name}`,
        html,
        text: plain,
        attachments: attachment ? [attachment] : undefined,
      }),
    });
    const result = await resendResponse.json() as { id?: string; message?: string };
    if (!resendResponse.ok || !result.id) return response.status(502).json({ error: "The email provider did not accept the inquiry." });
    return response.status(200).json({ accepted: true, id: result.id });
  } catch {
    return response.status(502).json({ error: "Unable to reach the email provider." });
  }
}
