import sharp from "sharp";
import path from "node:path";

const root = path.resolve("public/projects");
for (const name of ["lockd-home", "lockd-categories"]) {
  const source = path.join(root, `${name}.jpg`);
  await Promise.all(
    [640, 960, 1425].map((width) =>
      sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 86 })
        .toFile(path.join(root, `${name}-${width}.webp`)),
    ),
  );
}
console.log(
  "Generated responsive WebP copies from the genuine LOCKD screenshots.",
);
