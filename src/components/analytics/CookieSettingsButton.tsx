"use client";

import { resetConsent } from "@/lib/consent";

/** Permet de modifier ou retirer son consentement à tout moment (obligation RGPD). */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={resetConsent} className={className}>
      Gérer les cookies
    </button>
  );
}
