"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Object3D } from "@/components/three/Object3D";
import type { ObjectVariant } from "@/components/three/types";
import { cn } from "@/lib/cn";

export type ExpertiseRow = {
  slug: string;
  index: string;
  short: string;
  line: string;
  object: ObjectVariant;
  deliverables?: string[];
};

/**
 * Index des expertises. Au survol (souris uniquement), l’objet 3D de
 * l’expertise suit le curseur avec un ressort : il accompagne la lecture
 * sans jamais masquer le texte qu’on vise.
 */
export function ExpertiseList({
  items,
  tone = "dark",
  detailed = false,
}: {
  items: ExpertiseRow[];
  tone?: "dark" | "light";
  detailed?: boolean;
}) {
  const container = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  // L'aperçu 3D n'est chargé qu'au premier survol : rien de lourd au chargement.
  const [armed, setArmed] = useState(false);
  const [variant, setVariant] = useState<ObjectVariant>(items[0].object);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !container.current) return;
    const rect = container.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const dark = tone === "dark";

  return (
    <ul
      ref={container}
      onPointerMove={onMove}
      onPointerLeave={() => setActive(null)}
      className={cn("relative border-t", dark ? "border-paper/12" : "hairline")}
    >
      <motion.li
        aria-hidden
        style={{ x: sx, y: sy }}
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-10 hidden size-[300px] transition-opacity duration-300 ease-out lg:block",
          active === null ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="size-full -translate-x-[12%] -translate-y-[88%]">
          {armed && <Object3D variant={variant} paused={active === null} className="size-full" tilt={[0.25, -0.3, 0]} />}
        </div>
      </motion.li>

      {items.map((item, i) => (
        <li
          key={item.slug}
          className={cn("border-b", dark ? "border-paper/12" : "hairline")}
          onPointerEnter={(e) => {
            if (e.pointerType !== "mouse") return;
            setActive(i);
            setArmed(true);
            setVariant(item.object);
          }}
        >
          <Link
            href={`/expertises/${item.slug}`}
            className={cn(
              "group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-3 py-7 transition-opacity duration-300 md:grid-cols-12 md:gap-x-6 md:py-10",
              active !== null && active !== i && "lg:opacity-40",
            )}
          >
            <span className={cn("meta", dark ? "text-paper/40" : "text-mute")}>{item.index}</span>
            <span className="title-lg transition-transform duration-500 ease-out group-hover:translate-x-3 md:col-span-6">
              {item.short}
            </span>
            <span
              aria-hidden
              className="text-2xl transition-transform duration-500 ease-out group-hover:translate-x-1 md:order-last md:col-span-1 md:justify-self-end"
            >
              →
            </span>
            <span
              className={cn(
                "col-span-2 col-start-2 max-w-[42ch] text-[15px] leading-relaxed md:col-span-4 md:col-start-auto",
                dark ? "text-paper/55" : "text-ink/60",
              )}
            >
              {item.line}
              {detailed && item.deliverables && (
                <span className={cn("meta mt-4 block", dark ? "text-paper/40" : "text-mute")}>
                  {item.deliverables.slice(0, 4).join(" · ")}
                </span>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
