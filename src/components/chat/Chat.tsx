"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { RichText } from "./RichText";

type Message = { id: string; role: "user" | "assistant" | "error"; text: string };

const MAX_LENGTH = 800;
const { chatbot } = site;
const whatsapp = `https://wa.me/${site.contact.whatsappFloat.number}?text=${encodeURIComponent(site.contact.whatsappFloat.message)}`;

class ChatError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
  }
}

type Handlers = {
  onConversation: (id: string) => void;
  onDelta: (text: string) => void;
  onDone: (content: string) => void;
};

/** Envoie un message à /api/chat et lit la réponse au fil de l’eau (SSE). */
async function ask(message: string, conversationId: string | null, signal: AbortSignal, on: Handlers) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify({ message, conversationId: conversationId ?? undefined }),
    signal,
  });

  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || !type.includes("text/event-stream") || !res.body) {
    const data = (await res.json().catch(() => null)) as { error?: string; code?: string } | null;
    throw new ChatError(data?.error ?? "Léa n’est pas disponible pour le moment.", res.status, data?.code);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finished = false;

  const handle = (block: string) => {
    let event = "message";
    const data: string[] = [];
    for (const line of block.split(/\r?\n/)) {
      if (line.startsWith("event:")) event = line.slice(6).trim();
      else if (line.startsWith("data:")) data.push(line.slice(5).trimStart());
    }
    if (!data.length) return;
    const payload = JSON.parse(data.join("\n")) as { conversationId?: string; text?: string; content?: string; message?: string };
    if (event === "meta" && payload.conversationId) on.onConversation(payload.conversationId);
    else if (event === "delta" && payload.text) on.onDelta(payload.text);
    else if (event === "done") {
      finished = true;
      on.onDone(payload.content ?? "");
    } else if (event === "error") {
      finished = true;
      throw new ChatError(payload.message ?? "Léa n’a pas pu répondre.", 502);
    }
  };

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const blocks = buffer.split(/\r?\n\r?\n/);
    buffer = blocks.pop() ?? "";
    for (const block of blocks) handle(block);
  }
  if (buffer.trim()) handle(buffer);
  if (!finished) on.onDone("");
}

const newId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()));

export function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const conversation = useRef<string | null>(null);
  const controller = useRef<AbortController | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Reste calé sur le dernier message, sauf si la personne a remonté pour relire.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 140;
    if (nearBottom || messages[messages.length - 1]?.role === "user") {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, waiting, open]);

  useEffect(() => () => controller.current?.abort(), []);

  function openChat() {
    setOpen(true);
    // Pas de focus automatique sur écran tactile : le clavier masquerait la conversation.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      requestAnimationFrame(() => field.current?.focus({ preventScroll: true }));
    }
  }

  function closeChat() {
    setOpen(false);
    // Le lanceur est masqué tant que le panneau est ouvert : on attend qu’il soit de nouveau affichable.
    requestAnimationFrame(() => launcher.current?.focus({ preventScroll: true }));
  }

  async function send(raw: string, retry = false) {
    const text = raw.trim().slice(0, MAX_LENGTH);
    if (!text || busy) return;

    if (!retry) {
      setMessages((m) => [...m, { id: newId(), role: "user", text }]);
      setDraft("");
      if (field.current) field.current.style.height = "";
    }
    setBusy(true);
    setWaiting(true);

    const replyId = newId();
    let reply = "";
    const ctrl = new AbortController();
    controller.current = ctrl;

    const write = (content: string) =>
      setMessages((m) =>
        m.some((x) => x.id === replyId)
          ? m.map((x) => (x.id === replyId ? { ...x, text: content } : x))
          : [...m, { id: replyId, role: "assistant", text: content }],
      );

    try {
      await ask(text, conversation.current, ctrl.signal, {
        onConversation: (id) => (conversation.current = id),
        onDelta: (chunk) => {
          reply += chunk;
          setWaiting(false);
          write(reply);
        },
        onDone: (content) => {
          const final = content || reply;
          if (final) write(final);
          else write("Je n’ai pas de réponse à vous donner sur ce point. Écrivez-nous, nous vous répondrons rapidement.");
        },
      });
    } catch (error) {
      if (ctrl.signal.aborted) return;
      // Conversation expirée côté Orkiva : on en ouvre une nouvelle et on renvoie le message une seule fois.
      if (error instanceof ChatError && error.code === "CONVERSATION_EXPIRED" && !retry) {
        conversation.current = null;
        setBusy(false);
        return send(text, true);
      }
      const message = error instanceof ChatError ? error.message : "La connexion a été interrompue.";
      setMessages((m) => [...m, { id: newId(), role: "error", text: message }]);
    } finally {
      if (controller.current === ctrl) {
        setBusy(false);
        setWaiting(false);
      }
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void send(draft);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void send(draft);
    }
  }

  const started = messages.length > 0;
  const canSend = draft.trim().length > 0 && !busy;

  return (
    <>
      <button
        ref={launcher}
        type="button"
        onClick={openChat}
        data-hidden={open}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Discuter avec ${chatbot.name}, ${chatbot.role}`}
        className="chat-launcher fade-in group fixed bottom-4 right-4 z-30 flex h-14 items-center gap-3 rounded-full bg-navy py-2 pl-5 pr-2 text-paper shadow-[0_8px_24px_-6px_rgba(2,33,82,0.5)] active:scale-[0.97] md:bottom-6 md:right-6 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-[0_12px_28px_-6px_rgba(2,33,82,0.6)]"
        style={
          {
            "--delay": "1100ms",
            marginBottom: "env(safe-area-inset-bottom)",
            marginRight: "env(safe-area-inset-right)",
          } as React.CSSProperties
        }
      >
        <span className="text-[15px] font-medium tracking-[-0.01em]">Parler à {chatbot.name}</span>
        <span className="relative grid size-10 place-items-center rounded-full bg-brand font-serif text-[22px] italic leading-none">
          <span aria-hidden="true" className="translate-y-[-1px]">
            {chatbot.name[0]}
          </span>
          <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-navy bg-[#3ddc84]" aria-hidden="true" />
        </span>
      </button>

      <section
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-label={`Conversation avec ${chatbot.name}`}
        data-open={open}
        // `inert` retire le panneau fermé du clavier et des lecteurs d’écran.
        inert={!open}
        onKeyDown={(e) => {
          if (e.key === "Escape") closeChat();
        }}
        className="chat-panel fixed inset-x-2 bottom-2 z-[60] flex h-[min(640px,calc(100dvh-1rem))] flex-col overflow-hidden rounded-[28px] border border-navy/[0.08] bg-paper shadow-[0_32px_80px_-24px_rgba(2,33,82,0.55),0_2px_6px_rgba(2,33,82,0.08)] md:inset-x-auto md:bottom-6 md:right-6 md:h-[min(680px,calc(100dvh-3rem))] md:w-[400px]"
      >
        <header className="relative flex items-center gap-3.5 bg-night px-5 py-4 text-paper">
          <div className="relative grid size-11 shrink-0 place-items-center rounded-full bg-brand font-serif text-[26px] italic leading-none">
            <span aria-hidden="true" className="translate-y-[-1px]">
              {chatbot.name[0]}
            </span>
            <span className="absolute -bottom-px -right-px size-3.5 rounded-full border-[2.5px] border-night bg-[#3ddc84]" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-[24px] italic leading-none tracking-[-0.01em]">{chatbot.name}</p>
            <p className="mt-1.5 truncate text-[13px] leading-none text-paper/65">
              {chatbot.role} <span aria-hidden="true">·</span> en ligne
            </p>
          </div>
          <button
            type="button"
            onClick={closeChat}
            aria-label="Fermer la conversation"
            className="-mr-1.5 grid size-10 place-items-center rounded-full text-[26px] leading-none text-paper/70 transition-[background-color,color,transform] duration-150 ease-out active:scale-90 [@media(hover:hover)]:hover:bg-white/10 [@media(hover:hover)]:hover:text-paper"
          >
            <span aria-hidden="true" className="translate-y-[-1px]">
              ×
            </span>
          </button>
        </header>

        <div
          ref={scroller}
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5 [scrollbar-width:thin]"
        >
          <Bubble role="assistant">
            <p>{chatbot.welcome}</p>
          </Bubble>

          {!started && (
            <div className="flex flex-wrap gap-2 pt-1">
              {chatbot.suggestions.map((suggestion, i) => (
                <button
                  key={suggestion}
                  type="button"
                  disabled={busy}
                  onClick={() => void send(suggestion)}
                  className="chat-in rounded-full border border-navy/15 bg-white px-3.5 py-2 text-left text-[14px] leading-tight text-navy transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:border-brand [@media(hover:hover)]:hover:bg-brand [@media(hover:hover)]:hover:text-white"
                  style={{ "--delay": `${120 + i * 60}ms` } as React.CSSProperties}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {messages.map((message) => (
            <Bubble key={message.id} role={message.role}>
              {message.role === "assistant" ? <RichText text={message.text} /> : <p className="whitespace-pre-wrap break-words">{message.text}</p>}
              {message.role === "error" && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#25d366] px-3.5 py-2 text-[13.5px] font-medium text-white transition-transform active:scale-[0.97]"
                  >
                    Écrire sur WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    onClick={closeChat}
                    className="rounded-full border border-navy/15 bg-white px-3.5 py-2 text-[13.5px] font-medium text-navy transition-transform active:scale-[0.97]"
                  >
                    Formulaire de contact
                  </Link>
                </div>
              )}
            </Bubble>
          ))}

          {waiting && (
            <div className="chat-in flex" role="status" aria-label={`${chatbot.name} est en train d’écrire`}>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-navy/[0.07] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(2,33,82,0.05)]">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="chat-dot size-1.5 rounded-full bg-navy" style={{ animationDelay: `${i * 160}ms` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        <form onSubmit={submit} className="border-t border-navy/[0.07] bg-white/70 px-3 pb-3 pt-3 backdrop-blur">
          <div className="flex items-end gap-2 rounded-[22px] border border-navy/12 bg-white py-1.5 pl-4 pr-1.5 transition-[border-color,box-shadow] duration-150 focus-within:border-brand focus-within:shadow-[0_0_0_4px_rgba(0,144,244,0.14)]">
            <textarea
              ref={field}
              value={draft}
              rows={1}
              maxLength={MAX_LENGTH}
              placeholder="Posez votre question…"
              aria-label="Votre message"
              enterKeyHint="send"
              onKeyDown={onKeyDown}
              onChange={(e) => {
                setDraft(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              // 16 px sur mobile : en dessous, iOS zoome la page au focus.
              className="max-h-[120px] min-h-[34px] flex-1 resize-none self-center bg-transparent py-1.5 text-[16px] leading-[1.35] text-ink outline-none placeholder:text-mute/70 md:text-[15px]"
            />
            <button
              type="submit"
              disabled={!canSend}
              aria-label="Envoyer le message"
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-full bg-brand text-[20px] leading-none text-white transition-[opacity,transform,background-color] duration-150 ease-out active:scale-90",
                canSend ? "opacity-100 [@media(hover:hover)]:hover:bg-navy" : "opacity-30",
              )}
            >
              <span aria-hidden="true" className="translate-y-[-1px]">
                →
              </span>
            </button>
          </div>
          <p className="mt-2.5 px-2 text-center text-[12px] leading-snug text-mute">
            {chatbot.name} est une IA et peut se tromper. Pour un devis, <Link href="/contact" onClick={closeChat} className="underline underline-offset-2 transition-colors hover:text-navy">écrivez-nous</Link>.
          </p>
        </form>
      </section>
    </>
  );
}

function Bubble({ role, children }: { role: Message["role"]; children: React.ReactNode }) {
  const mine = role === "user";
  return (
    <div className={cn("chat-in flex", mine && "justify-end")}>
      <div
        className={cn(
          "max-w-[88%] break-words px-4 py-3 text-[15px] leading-[1.5]",
          mine
            ? "rounded-2xl rounded-br-md bg-navy text-paper"
            : "rounded-2xl rounded-bl-md border bg-white text-ink shadow-[0_1px_2px_rgba(2,33,82,0.05)]",
          role === "error" ? "border-brand/35" : !mine && "border-navy/[0.07]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
