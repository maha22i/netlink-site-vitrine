/**
 * Consentement aux cookies de mesure d’audience.
 * Le choix est conservé dans le navigateur (localStorage) et diffusé aux
 * composants via un évènement, pour que bandeau et pied de page restent synchronisés.
 */

export type Consent = "granted" | "denied";

export const CONSENT_KEY = "nl-consent";
const CHANGE_EVENT = "nl-consent-change";

export function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Enregistre le choix et le transmet à Google Tag Manager (Consent Mode v2). */
export function saveConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* stockage indisponible : le choix vaut pour cette page seulement */
  }
  window.dataLayer?.push([
    "consent",
    "update",
    { analytics_storage: value, ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" },
  ]);
  notify();
}

/** Efface le choix pour réafficher le bandeau. */
export function resetConsent() {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  notify();
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
