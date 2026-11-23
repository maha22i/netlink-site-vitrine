import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * Couverture d'un projet : la capture du site, posée dans une fenêtre de
 * navigateur discrète, sur la couleur du projet. Sans capture, le nom du
 * projet prend la place de l'image.
 */
export function ProjectCover({
  project,
  className,
  size = "card",
  priority = false,
}: {
  project: Project;
  className?: string;
  size?: "card" | "hero";
  priority?: boolean;
}) {
  const { bg, image } = project.cover;
  const hero = size === "hero";

  return (
    <div className={cn("relative isolate overflow-hidden", className)} style={{ backgroundColor: bg }}>
      <div
        className={cn(
          "absolute inset-x-[7%] top-[9%] -bottom-px flex flex-col overflow-hidden rounded-t-[8px] bg-white shadow-[0_24px_60px_-18px_rgba(2,18,48,0.55)] transition-transform duration-700 ease-out group-hover:-translate-y-2",
          hero && "inset-x-[9%] top-[8%]",
        )}
      >
        {/* Barre de navigateur */}
        <div className="flex h-7 shrink-0 items-center gap-3 border-b border-black/[0.06] bg-[#f3f5f8] px-3 md:h-8">
          <span aria-hidden className="flex gap-1.5">
            <i className="size-2 rounded-full bg-black/12" />
            <i className="size-2 rounded-full bg-black/12" />
            <i className="size-2 rounded-full bg-black/12" />
          </span>
          <span className="meta mx-auto truncate rounded-[5px] bg-white px-3 py-0.5 text-[10px] text-black/45 md:text-[11px]">
            {project.domain}
          </span>
          <span className="w-[30px]" />
        </div>

        <div className="relative flex-1">
          {image ? (
            <Image
              src={image}
              alt={`Capture d’écran du site ${project.name}`}
              fill
              priority={priority}
              sizes={hero ? "(min-width: 1024px) 80vw, 100vw" : "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"}
              className="object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-paper-2">
              <p className="title-md text-ink/70">{project.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
