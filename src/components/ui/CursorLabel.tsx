"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePathname } from "next/navigation";

/**
 * Étiquette qui accompagne le curseur au-dessus des éléments `data-cursor`.
 * Souris uniquement ; masquée sur écrans tactiles.
 */
export function CursorLabel() {
  const pathname = usePathname();
  const [label, setLabel] = useState<string | null>(null);
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setLabel(null);
  }
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[55] hidden md:block"
    >
      <div
        className="ml-4 mt-4 rounded-full bg-ink px-3.5 py-2 text-[13px] font-medium whitespace-nowrap text-paper transition-[opacity,transform] duration-200 ease-out"
        style={{ opacity: label ? 1 : 0, transform: label ? "scale(1)" : "scale(0.9)", transformOrigin: "top left" }}
      >
        {label ?? "Voir le projet"}
      </div>
    </motion.div>
  );
}
