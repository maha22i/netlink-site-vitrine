"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

type Segment = { text: string; accent?: boolean };

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent?: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "accent" : undefined}>
      {children}
    </motion.span>
  );
}

/**
 * Texte-manifeste : les mots s’éclairent au rythme du défilement.
 * C’est le lecteur qui pilote l’animation, jamais l’inverse.
 */
export function Manifesto({ segments }: { segments: Segment[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const words = segments.flatMap((s) => s.text.split(" ").filter(Boolean).map((w) => ({ w, accent: s.accent })));
  const total = words.length;

  return (
    <p ref={ref} className="title-lg flex flex-wrap gap-x-[0.26em]">
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / total, Math.min(1, (i + 1.5) / total)]} accent={word.accent}>
          {word.w}
        </Word>
      ))}
    </p>
  );
}
