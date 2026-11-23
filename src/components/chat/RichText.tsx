import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Rendu minimal et sûr du texte de l’assistante : paragraphes, listes, **gras** et liens.
 * Tout passe par des éléments React (aucun HTML brut), et seuls http(s), mailto, tel
 * et les chemins du site sont acceptés comme liens.
 */

const INLINE = /(\*\*[^*\n]+\*\*|\[[^\]\n]+\]\([^)\s]+\)|https?:\/\/[^\s<>()]+)/g;
const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/(?!\/))/i;
const linkClass = "text-brand underline decoration-brand/40 underline-offset-[3px] transition-colors hover:decoration-brand";

function anchor(href: string, label: ReactNode, key: string) {
  if (!SAFE_HREF.test(href)) return label;
  if (href.startsWith("/")) {
    return (
      <Link key={key} href={href} className={linkClass}>
        {label}
      </Link>
    );
  }
  const external = /^https?:/i.test(href);
  return (
    <a key={key} href={href} className={linkClass} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {label}
    </a>
  );
}

function inline(text: string, prefix: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    const key = `${prefix}-${i}`;
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={key} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const md = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (md) return anchor(md[2], md[1], key);
    if (/^https?:\/\//i.test(part)) {
      // La ponctuation finale d’une phrase ne fait pas partie de l’adresse.
      const trailing = /[.,;:!?]+$/.exec(part)?.[0] ?? "";
      const url = trailing ? part.slice(0, -trailing.length) : part;
      return (
        <span key={key}>
          {anchor(url, url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, ""), `${key}-a`)}
          {trailing}
        </span>
      );
    }
    return part;
  });
}

const BULLET = /^\s*[-*•]\s+/;
const NUMBER = /^\s*\d+[.)]\s+/;

export function RichText({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);

  return (
    <div className="space-y-2.5">
      {blocks.map((block, b) => {
        const lines = block.split("\n").filter((l) => l.trim());
        if (!lines.length) return null;

        if (lines.every((l) => BULLET.test(l))) {
          return (
            <ul key={b} className="list-disc space-y-1 pl-5 marker:text-brand">
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(BULLET, ""), `${b}-${i}`)}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => NUMBER.test(l))) {
          return (
            <ol key={b} className="list-decimal space-y-1 pl-5 marker:text-brand">
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(NUMBER, ""), `${b}-${i}`)}</li>
              ))}
            </ol>
          );
        }
        // Un titre Markdown devient simplement une ligne en gras.
        const heading = lines.length === 1 && /^#{1,4}\s+/.test(lines[0]);
        return (
          <p key={b} className={heading ? "font-semibold" : undefined}>
            {lines.map((l, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {inline(heading ? l.replace(/^#{1,4}\s+/, "") : l, `${b}-${i}`)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
