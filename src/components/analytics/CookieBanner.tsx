"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { readConsent, saveConsent, subscribeConsent } from "@/lib/consent";

/** `undefined` côté serveur : le bandeau n’est rendu qu’une fois le choix lu dans le navigateur. */
function useConsent() {
  return useSyncExternalStore(
    subscribeConsent,
    () => readConsent() ?? "unset",
    () => undefined,
  );
}

/** Bandeau de consentement : carte arrondie en bas à gauche, icône, deux boutons et un lien de refus. */
export function CookieBanner() {
  const consent = useConsent();
  if (consent !== "unset") return null;

  return (
    <div
      role="dialog"
      aria-label="Préférences de cookies"
      className="fade-in fixed bottom-3 left-3 z-50 w-[calc(100vw-1.5rem)] max-w-[448px] rounded-3xl bg-white p-5 text-ink shadow-[0_16px_48px_-12px_rgba(2,33,82,0.45)] md:bottom-4 md:left-4"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex gap-4">
        <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#e8f1fc]">
          <span className="size-[18px] rounded-full border-2 border-[#1a5fb4]" />
        </span>
        <div className="min-w-0">
          <p className="text-[16px] leading-tight font-semibold">Cookies</p>
          <p className="mt-1.5 text-[15px] leading-snug text-ink/70">
            Ce site utilise Google Analytics pour mesurer son audience.{" "}
            <strong className="font-semibold text-ink">Aucun traceur publicitaire, et rien n’est collecté sans votre accord.</strong>
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => saveConsent("granted")}
          className="h-11 rounded-full bg-[#1a5fb4] px-6 text-[15px] font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#164f98] active:scale-[0.97]"
        >
          J’accepte
        </button>
        <Link
          href="/mentions-legales#cookies"
          className="grid h-11 place-items-center rounded-full border border-ink/15 px-6 text-[15px] font-medium transition-[background-color,transform] duration-200 hover:bg-ink/[0.04] active:scale-[0.97]"
        >
          En savoir plus
        </Link>
      </div>

      <div className="mt-3 text-right">
        <button
          type="button"
          onClick={() => saveConsent("denied")}
          className="text-[13px] text-ink/55 underline underline-offset-2 transition-colors duration-200 hover:text-ink"
        >
          Refuser le non essentiel
        </button>
      </div>
    </div>
  );
}
