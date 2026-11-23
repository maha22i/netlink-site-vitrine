import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Netlink Solutions — Du code au câble";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage (réseaux sociaux, messageries), générée au build. */
export default async function OpengraphImage() {
  const serif = await readFile(
    join(process.cwd(), "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff"),
  );
  const serifRegular = await readFile(
    join(process.cwd(), "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#04122e",
          color: "#ffffff",
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, letterSpacing: -0.5 }}>Netlink Solutions</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 168, lineHeight: 0.9, letterSpacing: -4 }}>
          <span>Du code</span>
          <span style={{ fontStyle: "italic", color: "#08a6fb" }}>au câble.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "rgba(255,255,255,0.55)" }}>
          <span>IA · Développement · Réseau · Cloud · Matériel</span>
          <span style={{ color: "#08a6fb" }}>Paris — Djibouti</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serifRegular, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serif, style: "italic", weight: 400 },
      ],
    },
  );
}
