import "server-only";

type Attachment = { filename: string; content: string };

type Mail = {
  subject: string;
  replyTo: string;
  /** Lignes « Libellé : valeur » du message. */
  fields: [string, string][];
  attachments?: Attachment[];
};

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Envoi via l’API HTTP de Resend (aucune dépendance).
 * Variables : RESEND_API_KEY, MAIL_FROM, MAIL_TO — voir .env.example.
 * Sans clé, le message est simplement journalisé (pratique en développement).
 */
export async function sendMail({ subject, replyTo, fields, attachments }: Mail) {
  const key = process.env.RESEND_API_KEY;
  const html = `<table style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5">${fields
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5d6a84;vertical-align:top">${escape(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(v)}</td></tr>`,
    )
    .join("")}</table>`;

  if (!key) {
    console.info(`[mail] RESEND_API_KEY absente — message non envoyé : ${subject}`, Object.fromEntries(fields));
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM ?? "Netlink Solutions <site@netlinksolutions.pro>",
      to: (process.env.MAIL_TO ?? "contact@netlinksolutions.pro").split(","),
      reply_to: replyTo,
      subject,
      html,
      attachments,
    }),
  });

  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export const isEmail = (v: unknown): v is string =>
  typeof v === "string" && v.length < 200 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const clean = (v: unknown, max = 4000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Formulaire envoyé moins de 2 secondes après son affichage, ou sans horodatage : robot. */
export const isBot = (startedAt: unknown) => {
  const started = Number(startedAt);
  return !Number.isFinite(started) || started <= 0 || Date.now() - started < 2000;
};
