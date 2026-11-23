"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { easing } from "maath";
import type { Group } from "three";
import { objects } from "./objects";
import { useReducedMotion } from "@/lib/useMediaQuery";
import type { ObjectVariant } from "./types";

type Props = {
  variant: ObjectVariant;
  /** Inclinaison de départ, pour varier la pose d’une page à l’autre. */
  tilt?: [number, number, number];
  /** Suspend le rendu (ex. aperçu masqué) sans détruire le contexte WebGL. */
  paused?: boolean;
};

/** Position du pointeur sur toute la fenêtre, normalisée entre -1 et 1. */
const pointer = { x: 0, y: 0 };
let listening = false;
function listenPointer() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true },
  );
}

/**
 * Anime l’objet : rotation lente continue, réaction au pointeur amortie
 * (ressort, pas de suivi instantané) et légère rotation liée au scroll.
 */
function Rig({ children, still, tilt }: { children: React.ReactNode; still: boolean; tilt: [number, number, number] }) {
  const group = useRef<Group>(null);
  const spin = useRef(0);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 30);
    if (!still) spin.current += dt * 0.12;
    const scroll = typeof window !== "undefined" ? window.scrollY * 0.0012 : 0;
    easing.dampE(
      g.rotation,
      [tilt[0] + pointer.y * 0.28, tilt[1] + spin.current + scroll + pointer.x * 0.45, tilt[2]],
      0.35,
      dt,
    );
    easing.damp3(g.position, [pointer.x * 0.12, -pointer.y * 0.08, 0], 0.5, dt);
  });

  return <group ref={group}>{children}</group>;
}

/** Studio lumineux construit dans la scène : aucune image HDR à télécharger. */
function Studio({ accent }: { accent: boolean }) {
  return (
    <Environment resolution={128} frames={1}>
      <color attach="background" args={["#041332"]} />
      {/* Bandes lumineuses en diagonale : des reflets dynamiques, jamais symétriques. */}
      <group rotation={[0.35, 0.5, 0.85]}>
        <Lightformer form="rect" intensity={2.6} position={[0, 5, -4]} rotation-x={Math.PI / 2} scale={[14, 2.6, 1]} />
        <Lightformer form="rect" intensity={3} position={[-6, 1, 1]} rotation-y={Math.PI / 2} scale={[18, 0.6, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#7cc8ff" position={[6, -1.5, -1]} rotation-y={-Math.PI / 2} scale={[18, 1.6, 1]} />
      </group>
      {/* Le reflet bleu ciel signe la marque ; retiré sur les sphères où il se répète. */}
      {accent && <Lightformer form="ring" intensity={2.6} color="#08a6fb" position={[4, -2.5, 4.5]} scale={1.8} />}
    </Environment>
  );
}

export default function ObjectCanvas({ variant, tilt = [0.18, -0.4, 0], paused = false }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);
  const still = useReducedMotion();
  const Shape = objects[variant];

  useEffect(() => {
    listenPointer();
    const el = wrapper.current;
    if (!el) return;
    let idle = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        // Le moteur 3D n'est créé qu'une fois visible, quand le navigateur est au repos :
        // la page s'affiche et devient interactive d'abord.
        if (entry.isIntersecting && !idle) {
          const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
          idle = ric(() => setArmed(true)) as number;
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      {armed && (
      <Canvas
        frameloop={visible && !paused ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.4], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => requestAnimationFrame(() => setReady(true))}
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 1400ms var(--ease-out)",
        }}
        aria-hidden
      >
        <Suspense fallback={null}>
          <Rig still={still} tilt={tilt}>
            <Shape />
          </Rig>
          <Studio accent={variant !== "cloud" && variant !== "ai"} />
        </Suspense>
      </Canvas>
      )}
    </div>
  );
}
