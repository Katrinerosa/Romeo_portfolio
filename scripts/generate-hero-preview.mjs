import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// I generate the private preview locally instead of storing photograph data in Git.
const projectRoot = new URL("../", import.meta.url);
const photo = await sharp(fileURLToPath(new URL("public/hero.jpg", projectRoot)))
  .resize({ width: 960 })
  .jpeg({ quality: 68, mozjpeg: true })
  .toBuffer();

const preview = "data:image/jpeg;base64," + photo.toString("base64");
await mkdir(new URL("src/data/", projectRoot), { recursive: true });
await writeFile(
  new URL("src/data/hero-preview.ts", projectRoot),
  "// I embed a local preview so the photograph is visible from the first render.\n" +
    "export const heroPreview = " + JSON.stringify(preview) + ";\n",
);

console.log("Created src/data/hero-preview.ts locally. This file stays outside Git.");
