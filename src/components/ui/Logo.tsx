import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Logo Netlink Solutions redessiné en SVG (net à toutes les tailles).
 * Le « N » : pilier marine, diagonale bleue, pilier bleu ciel, séparés par
 * un filet obtenu par masque (fonctionne sur n'importe quel fond).
 */
export function LogoMark({ className, tone = "color" }: { className?: string; tone?: "color" | "light" }) {
  const id = useId().replace(/:/g, "");
  const navy = tone === "light" ? "#ffffff" : "var(--color-navy)";

  return (
    <svg viewBox="0 0 112 100" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a9cf7" />
          <stop offset="1" stopColor="#0088ee" />
        </linearGradient>
        <mask id={`m${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="112" height="100">
          <rect width="112" height="100" fill="#fff" />
          <line x1="21" y1="17" x2="97" y2="85" stroke="#000" strokeWidth="35" strokeLinecap="round" />
        </mask>
      </defs>
      <g mask={`url(#m${id})`}>
        <rect x="0" y="27" width="25" height="73" rx="12.5" fill={navy} />
        <rect x="87" y="0" width="25" height="80" rx="12.5" fill="var(--color-sky)" />
      </g>
      <line x1="21" y1="17" x2="97" y2="85" stroke={`url(#g${id})`} strokeWidth="27" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, tone = "color" }: { className?: string; tone?: "color" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} className="h-[30px] w-auto shrink-0" />
      <span className="flex flex-col text-[15px] leading-[0.95] font-bold tracking-[-0.035em]">
        <span className={tone === "light" ? "text-white" : "text-navy"}>Netlink</span>
        <span className="text-brand">Solutions</span>
      </span>
    </span>
  );
}
