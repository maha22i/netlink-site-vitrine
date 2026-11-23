import { emailTemplates, sendTemplate } from "@/lib/email";
import { clean, isBot, isEmail } from "@/lib/mail";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  if (isBot(body.started_at)) {
    console.warn("[contact] envoi ignoré : formulaire soumis trop vite");
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = body.email;
  const need = clean(body.need, 80);
  const message = clean(body.message);

  if (!name || !isEmail(email) || !message) {
    return Response.json({ error: "Champs manquants" }, { status: 422 });
  }

  try {
    await sendTemplate(emailTemplates.contact, {
      title: `${need || "Demande"} — ${name}`,
      name,
      email,
      need,
      message,
      from_name: name,
      reply_to: email,
    });
    console.info(`[contact] message envoyé — ${name} <${email}>`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Envoi impossible" }, { status: 502 });
  }
}
