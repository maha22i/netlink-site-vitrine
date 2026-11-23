import { site } from "@/content/site";
import { clean } from "@/lib/mail";
import { OrkivaError, createConversation, orkivaConfigured, sendMessage } from "@/lib/orkiva";
import { rateLimit } from "@/lib/rate-limit";

const MAX_MESSAGE = 800;
const MAX_BODY = 8 * 1024;
const CONVERSATION_ID = /^[A-Za-z0-9_-]{8,64}$/;

const UNAVAILABLE = "Léa n’est pas disponible pour le moment.";
const FAILED = "Léa n’a pas pu répondre. Réessayez dans un instant.";

const encoder = new TextEncoder();
const sse = (event: string, data: unknown) => encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

const json = (body: Record<string, unknown>, status: number) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** Seul notre propre site peut appeler cette route depuis un navigateur. */
function originAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const base = new URL(site.url);
  const allowed = new Set([base.origin, `${base.protocol}//www.${base.host.replace(/^www\./, "")}`]);
  if (allowed.has(origin)) return true;
  return process.env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

const clientIp = (request: Request) =>
  request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";

/** Relaie le flux d’Orkiva en n’exposant que les événements utiles (delta, done, error). */
async function relay(upstream: ReadableStream<Uint8Array>, controller: ReadableStreamDefaultController<Uint8Array>) {
  const reader = upstream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const handle = (block: string) => {
    let event = "message";
    const data: string[] = [];
    for (const line of block.split(/\r?\n/)) {
      if (line.startsWith("event:")) event = line.slice(6).trim();
      else if (line.startsWith("data:")) data.push(line.slice(5).trimStart());
    }
    let payload: { text?: string; message?: string; handoff?: boolean; reply?: { content?: string } } | null = null;
    try {
      payload = data.length ? JSON.parse(data.join("\n")) : null;
    } catch {
      return false;
    }
    if (event === "delta" && typeof payload?.text === "string") controller.enqueue(sse("delta", { text: payload.text }));
    else if (event === "done") {
      controller.enqueue(sse("done", { content: payload?.reply?.content ?? "" }));
      return true;
    } else if (event === "error") {
      controller.enqueue(sse("error", { message: payload?.message || FAILED, handoff: Boolean(payload?.handoff) }));
      return true;
    }
    return false;
  };

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const blocks = buffer.split(/\r?\n\r?\n/);
    buffer = blocks.pop() ?? "";
    for (const block of blocks) if (handle(block)) return reader.cancel();
  }
  if (buffer.trim()) handle(buffer);
}

export async function POST(request: Request) {
  if (!originAllowed(request)) return json({ error: "Origine non autorisée" }, 403);
  if (!orkivaConfigured()) return json({ error: UNAVAILABLE, handoff: true }, 503);
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) return json({ error: "Message trop long" }, 413);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Requête invalide" }, 400);
  }

  const message = clean(body.message, MAX_MESSAGE + 1);
  if (!message) return json({ error: "Message vide" }, 422);
  if (message.length > MAX_MESSAGE) return json({ error: `Message trop long (${MAX_MESSAGE} caractères maximum).` }, 422);

  const given = typeof body.conversationId === "string" ? body.conversationId : "";
  if (given && !CONVERSATION_ID.test(given)) return json({ error: "Requête invalide" }, 400);

  // Chaque message consomme des crédits : plafond par visiteur (en plus de la limite Nginx).
  const ip = clientIp(request);
  if (!rateLimit(`chat-burst:${ip}`, 6, 60_000) || !rateLimit(`chat-hour:${ip}`, 40, 3_600_000)) {
    return json({ error: "Vous écrivez beaucoup de messages : patientez un instant, puis réessayez.", handoff: true }, 429);
  }

  let conversationId = given;
  let upstream: Response;
  try {
    if (!conversationId) conversationId = await createConversation(request.signal);
    upstream = await sendMessage(conversationId, message, request.signal);
  } catch (error) {
    if (request.signal.aborted) return new Response(null, { status: 499 });
    const status = error instanceof OrkivaError ? error.status : 0;
    // Conversation expirée ou inconnue : le navigateur en ouvre une nouvelle.
    if (given && (status === 401 || status === 404 || status === 410)) {
      return json({ error: "Conversation expirée", code: "CONVERSATION_EXPIRED" }, 410);
    }
    if (status === 429) return json({ error: "Beaucoup de demandes en ce moment : réessayez dans un instant.", handoff: true }, 429);
    console.error(`[chat] ${error instanceof Error ? error.message : error}`);
    return json({ error: UNAVAILABLE, handoff: true }, 503);
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(sse("meta", { conversationId }));
      try {
        const type = upstream.headers.get("content-type") ?? "";
        if (type.includes("application/json") || !upstream.body) {
          const data = (await upstream.json().catch(() => null)) as { reply?: { content?: string } } | null;
          controller.enqueue(sse("done", { content: data?.reply?.content ?? "" }));
        } else {
          await relay(upstream.body, controller);
        }
      } catch (error) {
        if (!request.signal.aborted) {
          console.error(`[chat] flux interrompu : ${error instanceof Error ? error.message : error}`);
          try {
            controller.enqueue(sse("error", { message: FAILED }));
          } catch {}
        }
      } finally {
        try {
          controller.close();
        } catch {}
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      // Demande à Nginx de ne pas mettre la réponse en mémoire tampon : les mots arrivent au fil de l'eau.
      "X-Accel-Buffering": "no",
    },
  });
}
