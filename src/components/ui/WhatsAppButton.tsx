import { site } from "@/content/site";

const { number, message } = site.contact.whatsappFloat;
const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

/**
 * Bouton WhatsApp flottant, présent sur toutes les pages (monté dans le layout).
 * Placé à gauche : le lanceur du chatbot Orkiva occupe le coin inférieur droit.
 */
export function WhatsAppButton() {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire à Netlink Solutions sur WhatsApp (nouvel onglet)"
      className="fade-in group fixed bottom-4 left-4 z-30 flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-[15px] text-white shadow-[0_8px_24px_-6px_rgba(2,33,82,0.45)] transition-[transform,box-shadow] duration-200 ease-out active:scale-[0.96] md:bottom-6 md:left-6 md:px-5 [@media(hover:hover)]:hover:shadow-[0_12px_28px_-6px_rgba(2,33,82,0.55)] [@media(hover:hover)]:hover:-translate-y-0.5"
      style={{
        "--delay": "900ms",
        marginBottom: "env(safe-area-inset-bottom)",
        marginLeft: "env(safe-area-inset-left)",
      } as React.CSSProperties}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88ZM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.43-8.46Z" />
      </svg>
    </a>
  );
}
