import "server-only";
import { site } from "@/content/site";

/**
 * Client minimal de l’API serveur d’Orkiva.
 * Le jeton (ORKIVA_API_TOKEN) n’est jamais transmis au navigateur : le visiteur parle à /api/chat.
 * ORKIVA_API_URL permet de pointer vers un faux serveur en développement.
 */
const API = process.env.ORKIVA_API_URL ?? "https://api.getorkiva.com";

export class OrkivaError extends Error {
  constructor(
    public status: number,
    public code?: string,
  ) {
    super(`Orkiva ${status}${code ? ` ${code}` : ""}`);
  }
}

export const orkivaConfigured = () => Boolean(process.env.ORKIVA_API_TOKEN);

const headers = (extra?: Record<string, string>) => ({
  Authorization: `Bearer ${process.env.ORKIVA_API_TOKEN}`,
  "Content-Type": "application/json",
  ...extra,
});

async function fail(res: Response): Promise<never> {
  const body = (await res.json().catch(() => null)) as { code?: string } | null;
  throw new OrkivaError(res.status, body?.code);
}

export async function createConversation(signal?: AbortSignal) {
  const res = await fetch(`${API}/v1/agents/${encodeURIComponent(site.chatbot.agentId)}/conversations`, {
    method: "POST",
    headers: headers(),
    body: "{}",
    signal,
    cache: "no-store",
  });
  if (!res.ok) await fail(res);
  const data = (await res.json()) as { conversationId?: string };
  if (!data.conversationId) throw new OrkivaError(502, "NO_CONVERSATION");
  return data.conversationId;
}

/** Envoie un message ; la réponse est un flux SSE (delta, done, error). */
export async function sendMessage(conversationId: string, content: string, signal?: AbortSignal) {
  const res = await fetch(`${API}/v1/conversations/${encodeURIComponent(conversationId)}/messages`, {
    method: "POST",
    headers: headers({ Accept: "text/event-stream" }),
    body: JSON.stringify({ clientMessageId: crypto.randomUUID(), content }),
    signal,
    cache: "no-store",
  });
  if (!res.ok) await fail(res);
  return res;
}
