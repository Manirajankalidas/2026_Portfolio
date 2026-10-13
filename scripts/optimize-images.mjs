// Usage: npm run images -- <sourceDir> <outDir>
// Converts every jpg/png in <sourceDir> to a max-1000px-wide WebP in <outDir>,
// with kebab-case names (Hubbli_Event.PNG -> hubbli-event.webp).
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error("Usage: npm run images -- <sourceDir> <outDir>");
  process.exit(1);
}

await mkdir(out, { recursive: true });
for (const file of await readdir(src)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = path.parse(file).name.toLowerCase().replace(/[\s_]+/g, "-");
  const dest = path.join(out, `${name}.webp`);
  const info = await sharp(path.join(src, file))
    .rotate()
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(dest);
  console.log(`${file} -> ${dest} (${Math.round(info.size / 1024)} KB)`);
}
