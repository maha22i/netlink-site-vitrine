"use client";

import { useMemo, useState } from "react";
import { categories, projects, type ProjectCategory } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

export function WorkIndex() {
  const [filter, setFilter] = useState<ProjectCategory | "Tous">("Tous");

  const list = useMemo(
    () => (filter === "Tous" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <div role="tablist" aria-label="Filtrer les réalisations" className="flex flex-wrap gap-x-7 gap-y-3 border-b hairline pb-5">
        {categories.map((c) => {
          const count = c.value === "Tous" ? projects.length : projects.filter((p) => p.category === c.value).length;
          const active = filter === c.value;
          return (
            <button
              key={c.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c.value)}
              className={cn(
                "group relative flex items-start gap-1 py-1 text-[17px] tracking-[-0.02em] transition-[color,transform] duration-150 ease-out active:scale-[0.97]",
                active ? "text-ink" : "text-ink/40 hover:text-ink/75",
              )}
            >
              {c.label}
              <sup className="meta pt-0.5 text-[10px]">{count}</sup>
              <span
                aria-hidden
                className={cn(
                  "absolute right-0 -bottom-[21px] left-0 h-px origin-left bg-ink transition-transform duration-300 ease-out",
                  active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* La clé change avec le filtre : chaque carte rejoue son apparition. */}
      <div key={filter} className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 md:mt-16 xl:grid-cols-3">
        {list.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 3} />
        ))}
      </div>
    </>
  );
}
