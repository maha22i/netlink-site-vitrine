import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: string;
  /** "out" pour un lien externe (flèche diagonale). */
  direction?: "next" | "out";
  /** Filet permanent sous le libellé, pour les liens d’action principaux. */
  underline?: boolean;
  className?: string;
};

/**
 * Lien d’action typographique : pas de fond coloré, pas d’icône.
 * Au survol, le libellé « roule » vers le haut et la flèche avance.
 */
export function ArrowLink({ href, children, direction = "next", underline = false, className }: Props) {
  const external = direction === "out" || href.startsWith("http");
  const arrow = direction === "out" ? "↗" : "→";

  const content = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-(--ease-out) group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-(--ease-out) group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span
        aria-hidden
        className={cn(
          "inline-block transition-transform duration-500 ease-(--ease-out)",
          direction === "out"
            ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            : "group-hover:translate-x-1.5",
        )}
      >
        {arrow}
      </span>
    </>
  );

  const classes = cn(
    "group inline-flex items-center gap-3 font-medium tracking-[-0.01em] transition-transform duration-150 ease-(--ease-out) active:scale-[0.97]",
    underline && "border-b border-current pb-1.5",
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
