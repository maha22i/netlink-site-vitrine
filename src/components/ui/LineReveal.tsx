import { cn } from "@/lib/cn";

/**
 * Titre révélé ligne par ligne au chargement de la page.
 * Le titre est le « lead » de l’entrée : il bouge le plus, en premier.
 * Les délais rétrécissent d’une ligne à l’autre pour lire comme une vague.
 */
export function LineReveal({
  lines,
  as: Tag = "h1",
  className,
  delay = 80,
}: {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
}) {
  // Délais décroissants : 120 ms, 95 ms, 70 ms… (jamais moins de 55 ms).
  const delays = lines.map((_, i) =>
    Array.from({ length: i }, (_, j) => Math.max(55, 120 - j * 25)).reduce((a, b) => a + b, delay),
  );
  return (
    <Tag className={className}>
      {lines.map((line, i) => {
        const d = delays[i];
        return (
          <span key={i} className="line-mask">
            <span style={{ "--delay": `${d}ms` } as React.CSSProperties}>{line}</span>
          </span>
        );
      })}
    </Tag>
  );
}

/** Accent éditorial en serif italique, à glisser dans un titre. */
export function Accent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <em className={cn("accent pr-[0.04em]", className)}>{children}</em>;
}
