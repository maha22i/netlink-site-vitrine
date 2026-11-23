"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import type { ObjectVariant } from "./types";

/** Le moteur 3D n’est chargé que côté navigateur, après le contenu de la page. */
const ObjectCanvas = dynamic(() => import("./ObjectCanvas"), { ssr: false });

export function Object3D({
  variant,
  tilt,
  paused,
  className,
}: {
  variant: ObjectVariant;
  tilt?: [number, number, number];
  paused?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <ObjectCanvas variant={variant} tilt={tilt} paused={paused} />
    </div>
  );
}
