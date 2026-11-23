import { cn } from "@/lib/cn";

/**
 * Fond doux aux couleurs du logo : un voile bleu très léger, deux halos
 * (bleu ciel et marine) et une trame fine qui s'efface vers les bords.
 * Uniquement des dégradés CSS : aucun flou coûteux, aucune image.
 */
export function Backdrop({ variant = "header", className }: { variant?: "hero" | "header"; className?: string }) {
  const hero = variant === "hero";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#e7f1fc_0%,#eef4fb_45%,var(--color-paper)_100%)]" />
      <div
        className={cn(
          "absolute rounded-full",
          hero ? "-top-[25%] -right-[15%] size-[85vw] max-w-[1400px] max-h-[1400px]" : "-top-[60%] -right-[10%] size-[60vw] max-w-[1000px] max-h-[1000px]",
        )}
        style={{ background: "radial-gradient(closest-side, rgba(8,166,251,0.20), rgba(8,166,251,0.06) 55%, transparent)" }}
      />
      <div
        className={cn(
          "absolute rounded-full",
          hero ? "-bottom-[35%] -left-[15%] size-[70vw] max-w-[1200px] max-h-[1200px]" : "-bottom-[80%] -left-[10%] size-[50vw] max-w-[900px] max-h-[900px]",
        )}
        style={{ background: "radial-gradient(closest-side, rgba(2,33,82,0.09), transparent)" }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(2,33,82,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(2,33,82,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black, transparent 75%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
