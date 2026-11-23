import { cn } from "@/lib/cn";
import { Backdrop } from "./Backdrop";
import { LineReveal } from "./LineReveal";

type Props = {
  /** Repère de page, en haut à gauche (ex. « Réalisations »). */
  eyebrow: string;
  /** Information complémentaire en haut à droite (ex. un compteur). */
  meta?: React.ReactNode;
  lines: React.ReactNode[];
  intro?: React.ReactNode;
  /** Visuel à droite du titre (objet 3D) sur grand écran. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * En-tête commun à toutes les pages : même fond doux, même grille, même entrée.
 * Compact : le titre et l'introduction partagent la même ligne sur grand écran.
 */
export function PageHeader({ eyebrow, meta, lines, intro, aside, children }: Props) {
  return (
    <header className="relative isolate">
      <Backdrop variant="header" />
      <div className="shell relative pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="fade-in flex items-baseline justify-between gap-6 border-b border-navy/10 pb-4 text-mute">
          <p className="label flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            {eyebrow}
          </p>
          {meta && <div className="meta">{meta}</div>}
        </div>

        <div className={cn("grid items-end gap-8 pt-8 md:pt-12 lg:grid-cols-12", !!aside && "lg:items-center")}>
          <div className="lg:col-span-7">
            <LineReveal lines={lines} className="page-title" />
            {aside && intro && (
              <div className="fade-in lead mt-8 max-w-[46ch] text-ink/75" style={{ "--delay": "380ms" } as React.CSSProperties}>
                {intro}
              </div>
            )}
          </div>

          {aside ? (
            <div
              className="fade-in relative mx-auto aspect-square w-full max-w-[440px] lg:col-span-5 lg:max-w-none"
              style={{ "--delay": "260ms" } as React.CSSProperties}
            >
              {aside}
            </div>
          ) : (
            intro && (
              <div
                className="fade-in lead max-w-[46ch] text-ink/75 lg:col-span-5 lg:col-start-8 lg:pb-3"
                style={{ "--delay": "380ms" } as React.CSSProperties}
              >
                {intro}
              </div>
            )
          )}
        </div>

        {children}
      </div>
    </header>
  );
}
