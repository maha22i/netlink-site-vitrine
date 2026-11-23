import Link from "next/link";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ProjectCover } from "./ProjectCover";

/** Libellé du lien externe selon le type de projet. */
export function visitLabel(project: Project) {
  return project.restricted ? "Accéder à la plateforme" : "Voir le site";
}

export function ProjectCard({
  project,
  aspect = "aspect-[16/11]",
  className,
  style,
  priority = false,
}: {
  project: Project;
  aspect?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}) {
  return (
    // data-in est ajouté par RevealObserver, parfois avant l'hydratation.
    <article data-reveal suppressHydrationWarning className={cn("group", className)} style={style}>
      <Link href={`/realisations/${project.slug}`} data-cursor="Voir l’étude de cas" className="block">
        <ProjectCover project={project} priority={priority} className={cn("w-full rounded-[6px]", aspect)} />
      </Link>
      <div className="mt-4 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-[19px] font-medium tracking-[-0.025em]">
            <Link href={`/realisations/${project.slug}`} className="link-line">
              {project.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-[14px] text-mute">
            {project.kind} · {project.year}
          </p>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/visit mt-1 inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-brand transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          <span className="link-line">{visitLabel(project)}</span>
          <span aria-hidden className="transition-transform duration-300 ease-out group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>
    </article>
  );
}
