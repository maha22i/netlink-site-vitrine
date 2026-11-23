import "server-only";

const serviceId = process.env.EMAILJS_SERVICE_ID;
const publicKey = process.env.EMAILJS_PUBLIC_KEY;
const privateKey = process.env.EMAILJS_PRIVATE_KEY;
const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const API = "https://api.emailjs.com/api/v1.0/email";
const ATTEMPTS = 3;

export const emailTemplates = {
  contact: process.env.EMAILJS_TEMPLATE_CONTACT ?? "",
  career: process.env.EMAILJS_TEMPLATE_CAREER ?? "",
};

type Attachment = { name: string; type: string; bytes: Uint8Array };

function assertConfig(templateId: string) {
  if (!serviceId || !publicKey || !privateKey || !templateId) {
    throw new Error("EmailJS non configuré");
  }
  return { serviceId, publicKey, privateKey, templateId };
}

/** Les coupures du serveur SMTP (412 « Timeout ») et les erreurs 5xx sont passagères. */
const isTransient = (status: number, text: string) => status >= 500 || (status === 412 && /timeout|timed out|ETIMEDOUT|ECONNRESET/i.test(text));

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function post(path: string, init: () => RequestInit) {
  let last = "";
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    const res = await fetch(`${API}/${path}`, { method: "POST", ...init() });
    if (res.ok) return;
    const text = await res.text();
    last = `EmailJS ${res.status}: ${text}`;
    if (!isTransient(res.status, text) || attempt === ATTEMPTS) break;
    console.error(`[email] ${last} — nouvelle tentative (${attempt + 1}/${ATTEMPTS})`);
    await wait(1000 * attempt);
  }
  throw new Error(last);
}

/** Envoi serveur. La clé privée reste dans l’API, elle n’est pas exposée au navigateur. */
export async function sendTemplate(templateId: string, params: Record<string, string>, file?: Attachment) {
  const config = assertConfig(templateId);

  if (!file) {
    const payload = JSON.stringify({
      lib_version: "4.4.1",
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.publicKey,
      accessToken: config.privateKey,
      template_params: params,
    });
    await post("send", () => ({
      headers: { "Content-Type": "application/json", Origin: origin },
      body: payload,
    }));
    return;
  }

  await post("send-form", () => {
    const body = new FormData();
    body.append("service_id", config.serviceId);
    body.append("template_id", config.templateId);
    body.append("user_id", config.publicKey);
    body.append("accessToken", config.privateKey);
    for (const [key, value] of Object.entries(params)) body.append(key, value);
    body.append("cv", new Blob([Buffer.from(file.bytes)], { type: file.type }), file.name);
    return { headers: { Origin: origin }, body };
  });
}
