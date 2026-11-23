/**
 * Export 100 % statique (dossier out/) pour un hébergement sans Node.js.
 * Les routes dynamiques (/api, image Open Graph, icône Apple, manifest, robots, sitemap) sont mises de côté
 * le temps du build : l’export exige `dynamic = "force-static"`, option interdite avec cacheComponents.
 * En statique, branche les formulaires sur un service tiers (Formspree, Resend via une fonction…).
 */
import { renameSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const moves = [
  ["src/app/api", "src/app/_api"],
  ["src/app/opengraph-image.tsx", "src/app/_opengraph-image.tsx"],
  ["src/app/apple-icon.tsx", "src/app/_apple-icon.tsx"],
  ["src/app/manifest.ts", "src/app/_manifest.ts"],
  ["src/app/robots.ts", "src/app/_robots.ts"],
  ["src/app/sitemap.ts", "src/app/_sitemap.ts"],
];

for (const [from, to] of moves) if (existsSync(from)) renameSync(from, to);
try {
  execSync("next build", { stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "1" } });
} finally {
  for (const [from, to] of moves) if (existsSync(to)) renameSync(to, from);
}
