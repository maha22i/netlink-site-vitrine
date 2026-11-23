import { emailTemplates, sendTemplate } from "@/lib/email";
import { clean, isBot, isEmail } from "@/lib/mail";

const MAX_CV = 5 * 1024 * 1024;

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  if (isBot(form.get("started_at"))) {
    console.warn("[candidature] envoi ignoré : formulaire soumis trop vite");
    return Response.json({ ok: true });
  }

  const name = clean(form.get("name"), 120);
  const email = form.get("email");
  const role = clean(form.get("role"), 120);
  const link = clean(form.get("link"), 300);
  const message = clean(form.get("message"));
  const cv = form.get("cv");

  if (!name || !isEmail(email)) {
    return Response.json({ error: "Champs manquants" }, { status: 422 });
  }

  let file: { name: string; type: string; bytes: Uint8Array } | undefined;
  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_CV || cv.type !== "application/pdf") {
      return Response.json({ error: "CV invalide (PDF, 5 Mo max.)" }, { status: 422 });
    }
    file = {
      name: cv.name.replace(/[^\w.\-]+/g, "_"),
      type: cv.type,
      bytes: new Uint8Array(await cv.arrayBuffer()),
    };
  }

  try {
    await sendTemplate(
      emailTemplates.career,
      {
        title: `${role || "Candidature"} — ${name}`,
        name,
        email,
        role,
        link: link || "—",
        message: message || "—",
        cv_name: file ? file.name : "Non fourni",
        from_name: name,
        reply_to: email,
      },
      file,
    );
    console.info(`[candidature] envoyée — ${name} <${email}>`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Envoi impossible" }, { status: 502 });
  }
}
