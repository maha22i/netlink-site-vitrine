/**
 * Capture une image de chaque réalisation pour les couvertures du portfolio.
 *
 *   npm i -D playwright && npx playwright install chromium
 *   npm run capture            → toutes les réalisations
 *   npm run capture -- silalo  → une seule
 *
 * Les images sont écrites dans public/work/<slug>.jpg et référencées dans
 * src/content/covers.json, lu automatiquement par src/content/projects.ts.
 */
import { chromium } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(join(root, "src/content/projects.ts"), "utf8");

// Extraction légère des couples slug / url depuis le fichier de contenu.
const entries = [...source.matchAll(/slug: "([^"]+)",[\s\S]*?url: "([^"]+)"/g)].map((m) => ({ slug: m[1], url: m[2] }));
const only = process.argv.slice(2);
const targets = only.length ? entries.filter((e) => only.includes(e.slug)) : entries;

await mkdir(join(root, "public/work"), { recursive: true });
const coversPath = join(root, "src/content/covers.json");
const covers = JSON.parse(await readFile(coversPath, "utf8").catch(() => "{}"));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });

for (const { slug, url } of targets) {
  try {
    process.stdout.write(`→ ${slug} (${url}) … `);
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForTimeout(2500); // laisse les animations d'entrée se terminer
    const file = `/work/${slug}.jpg`; // remplace la capture .webp existante
    await page.screenshot({ path: join(root, "public", file), type: "jpeg", quality: 86 });
    covers[slug] = file;
    console.log("ok");
  } catch (error) {
    console.log(`échec : ${error.message}`);
  }
}

await browser.close();
await writeFile(coversPath, JSON.stringify(covers, null, 2) + "\n");
console.log(`\n${Object.keys(covers).length} couverture(s) dans src/content/covers.json`);
