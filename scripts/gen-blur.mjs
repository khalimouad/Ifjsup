/**
 * Génère les aperçus flous de `public/images` dans `src/lib/blur.ts`.
 *
 *   node scripts/gen-blur.mjs
 *
 * Chaque image est réduite à 12 px de large puis encodée en base64 : c'est le
 * `blurDataURL` que `next/image` affiche pendant le chargement. Le résultat est
 * versionné pour que le build reste sans dépendance supplémentaire — à relancer
 * après tout ajout ou remplacement de photo.
 */
import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const SRC = "public/images";
const OUT = "src/lib/blur.ts";

const files = (await readdir(SRC)).filter((f) => /\.(webp|jpe?g|png|avif)$/i.test(f)).sort();

const entries = [];
for (const f of files) {
  const buf = await sharp(join(SRC, f))
    .resize(12, null, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  entries.push([`/images/${f}`, `data:image/webp;base64,${buf.toString("base64")}`]);
}

const body = entries.map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n");

await writeFile(
  OUT,
  `/* Généré par scripts/gen-blur.mjs — ne pas modifier à la main. */\n\n` +
    `/** Aperçus flous de 12 px, affichés pendant le chargement des photos. */\n` +
    `export const BLUR: Record<string, string> = {\n${body}\n};\n`,
  "utf8"
);

const bytes = entries.reduce((n, [, v]) => n + v.length, 0);
console.log(`${entries.length} aperçus → ${OUT} (${(bytes / 1024).toFixed(1)} Kio)`);
