"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import type { Group } from "three";
import type { ObjectVariant } from "./types";

/* Matière commune : chrome froid légèrement irisé, aux reflets bleutés. */
const chrome = {
  color: "#d3dcea",
  metalness: 1,
  roughness: 0.14,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  iridescence: 0.55,
  iridescenceIOR: 1.35,
  envMapIntensity: 1.25,
};

function Chrome() {
  return <meshPhysicalMaterial {...chrome} />;
}

/** Deux anneaux entrelacés : le « link » de Netlink. */
function Link() {
  return (
    <group scale={0.8}>
      <mesh position={[-0.6, 0, 0]}>
        <torusGeometry args={[1, 0.3, 48, 160]} />
        <Chrome />
      </mesh>
      <mesh position={[0.6, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.3, 48, 160]} />
        <Chrome />
      </mesh>
    </group>
  );
}

/** IA : une matière liquide qui pense en continu. */
function Ai() {
  return (
    <mesh scale={1.2}>
      <sphereGeometry args={[1, 112, 112]} />
      <MeshDistortMaterial {...chrome} distort={0.48} speed={1.25} />
    </mesh>
  );
}

/** Développement : des couches d’interface empilées. */
function Code() {
  const refs = useRef<(Group | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((g, i) => {
      if (g) g.position.z = i * 0.55 - 0.55 + Math.sin(t * 0.8 + i * 1.3) * 0.08;
    });
  });
  return (
    <group rotation={[-0.35, 0.55, 0.08]}>
      {[0, 1, 2].map((i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[i * 0.32 - 0.32, i * -0.24 + 0.24, 0]}
        >
          <RoundedBox args={[2.3, 1.55, 0.07]} radius={0.035} smoothness={4}>
            <Chrome />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

/** Réseau : un nœud continu, sans début ni fin. */
function Network() {
  return (
    <mesh scale={0.95}>
      <torusKnotGeometry args={[1, 0.24, 260, 40, 2, 3]} />
      <Chrome />
    </mesh>
  );
}

/** Cloud : des volumes qui se rassemblent. */
const puffs: [number, number, number, number][] = [
  [0, 0.05, 0, 0.95],
  [-1.02, -0.22, 0.1, 0.68],
  [1.05, -0.18, -0.08, 0.72],
  [0.42, 0.62, 0.28, 0.58],
  [-0.52, 0.52, -0.32, 0.55],
  [0.1, -0.55, 0.45, 0.5],
];

function Cloud() {
  const refs = useRef<(Group | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((g, i) => {
      if (g) g.position.y = puffs[i][1] + Math.sin(t * 0.9 + i) * 0.045;
    });
  });
  return (
    <group scale={0.92}>
      {puffs.map(([x, y, z, r], i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[x, y, z]}
        >
          <mesh>
            <sphereGeometry args={[r, 64, 64]} />
            <Chrome />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Matériel : des lames de serveur, un témoin lumineux chacune. */
function Hardware() {
  return (
    <group rotation={[0.42, -0.72, 0]} position={[0, 0.05, 0]} scale={0.82}>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[0, i * 0.44 - 0.66, 0]}>
          <RoundedBox args={[2.5, 0.32, 1.7]} radius={0.05} smoothness={6}>
            <Chrome />
          </RoundedBox>
          <mesh position={[0.95, 0, 0.852]}>
            <boxGeometry args={[0.16, 0.05, 0.01]} />
            <meshBasicMaterial color={i === 1 ? "#08a6fb" : "#f5f7fa"} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export const objects: Record<ObjectVariant, () => React.JSX.Element> = {
  link: Link,
  ai: Ai,
  code: Code,
  network: Network,
  cloud: Cloud,
  hardware: Hardware,
};
