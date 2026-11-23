import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

type Part = { text: string; accent?: boolean };

type OgOptions = {
  /** Titre principal ; les fragments `accent` sont composés en italique. */
  title: Part[];
  topLeft?: string;
  topRight?: string;
  bottomLeft: string;
  bottomRight: string;
  background?: string;
  color?: string;
  accent?: string;
};

const fontDir = join(process.cwd(), "node_modules/@fontsource/instrument-serif/files");
let fonts: Promise<[Buffer, Buffer]> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all([
    readFile(join(fontDir, "instrument-serif-latin-400-normal.woff")),
    readFile(join(fontDir, "instrument-serif-latin-400-italic.woff")),
  ]));

/** Satori ne gère pas le texte en ligne mêlant plusieurs styles : on compose mot par mot. */
function toWords(parts: Part[]) {
  const words: Part[][] = [];
  let current: Part[] = [];
  for (const part of parts) {
    part.text.split(" ").forEach((chunk, i) => {
      if (i > 0 && current.length) {
        words.push(current);
        current = [];
      }
      if (chunk) current.push({ text: chunk, accent: part.accent });
    });
  }
  if (current.length) words.push(current);
  return words;
}

function titleSize(parts: Part[]) {
  const length = parts.reduce((n, p) => n + p.text.length, 0);
  if (length <= 12) return 168;
  if (length <= 22) return 132;
  if (length <= 32) return 112;
  return 96;
}

/** Image de partage aux couleurs de la marque (réseaux sociaux, messageries, moteurs de recherche). */
export async function ogImage({
  title,
  topLeft = "Netlink Solutions",
  topRight,
  bottomLeft,
  bottomRight,
  background = "#04122e",
  color = "#ffffff",
  accent = "#08a6fb",
}: OgOptions) {
  const [regular, italic] = await loadFonts();
  const fontSize = titleSize(title);

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
          background,
          color,
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, letterSpacing: -0.5 }}>
          <span>{topLeft}</span>
          {topRight ? <span style={{ opacity: 0.55 }}>{topRight}</span> : null}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: fontSize * 0.24,
            fontSize,
            lineHeight: 0.95,
            letterSpacing: -fontSize * 0.024,
          }}
        >
          {toWords(title).map((word, i) => (
            <div key={i} style={{ display: "flex" }}>
              {word.map((piece, j) => (
                <span key={j} style={piece.accent ? { fontStyle: "italic", color: accent } : undefined}>
                  {piece.text}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <span style={{ opacity: 0.55 }}>{bottomLeft}</span>
          <span style={{ color: accent }}>{bottomRight}</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: regular, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: italic, style: "italic", weight: 400 },
      ],
    },
  );
}
