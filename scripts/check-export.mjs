import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
const root = path.resolve("out");
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
const files = await walk(root),
  htmlFiles = files.filter((f) => f.endsWith(".html"));
let references = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^\"]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (!value.startsWith("/") || value.startsWith("//")) continue;
    const url = new URL(value, "https://lamecorengo.vercel.app");
    let target = path.join(root, decodeURIComponent(url.pathname));
    const info = await stat(target).catch(() => null);
    if (info?.isDirectory()) target = path.join(target, "index.html");
    assert.ok(
      await stat(target).catch(() => null),
      `Missing target ${value} in ${path.relative(root, file)}`,
    );
    if (url.hash) {
      const page = await readFile(target, "utf8");
      assert.ok(
        page.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `Missing anchor ${value}`,
      );
    }
    references++;
  }
}
const services = [
  "business-websites",
  "booking-systems",
  "payment-integrations",
  "web-applications",
  "automation",
  "ai-integrations",
  "maintenance",
];
for (const slug of services)
  assert.ok(
    files.includes(path.join(root, "services", slug, "index.html")),
    `Missing service ${slug}`,
  );
assert.ok(files.includes(path.join(root, "work", "lockd", "index.html")));
const home = await readFile(path.join(root, "index.html"), "utf8");
assert.ok(home.includes("https://lamecorengo.vercel.app"));
assert.ok(home.includes('id="skills"'));
assert.equal((home.match(/class="playing-card /g) || []).length, 6);
assert.ok(home.includes('id="project-enquiry"'));
assert.equal((home.match(/class="timeline-stage /g) || []).length, 7);
assert.equal((home.match(/name="project-type"/g) || []).length, 8);
assert.equal((home.match(/name="project-stage"/g) || []).length, 4);
assert.ok(
  home.indexOf('id="home"') < home.indexOf('id="work"') &&
    home.indexOf('id="work"') < home.indexOf('id="services"'),
  "The project spotlight must follow the hero and precede Services",
);
assert.ok(
  home.includes("Visit Live Website") && home.includes("View Case Study"),
);
assert.match(home, /<button[^>]*class="capsule-theme"/);
assert.ok(
  !home.includes("appearance-options"),
  "Desktop theme control must not render a dropdown",
);
assert.ok(
  !home.includes("ENGINEERING SERIES") &&
    !home.includes("THE DETAIL") &&
    !home.includes('class="card-edition'),
  "Cards must not render internal collection labels",
);
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/gi))
    for (const candidate of match[1].split(",")) {
      const source = candidate.trim().split(/\s+/)[0];
      if (source.startsWith("/"))
        assert.ok(
          await stat(path.join(root, source)).catch(() => null),
          `Missing responsive image ${source}`,
        );
    }
}
const pdf = await readFile(
  path.join(root, "assets", "Lameck_Orengo_CV_updated.pdf"),
);
assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
for (const image of [
  "images/lameck-orengo.jpg",
  "projects/lockd-home.jpg",
  "projects/lockd-categories.jpg",
]) {
  const bytes = await readFile(path.join(root, image));
  assert.equal(bytes[0], 255);
  assert.equal(bytes[1], 216);
}
console.log(
  `PASS: ${htmlFiles.length} HTML pages, ${references} internal references, seven service routes, six cards, seven timeline stages, enquiry choices, portrait, real screenshots and CV.`,
);
