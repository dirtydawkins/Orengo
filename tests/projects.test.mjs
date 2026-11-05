import test from "node:test";
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { projects } from "../src/data/projects.ts";
import {
  projectIssues,
  selectedProject,
  screenshotIndex,
  swipeDirection,
} from "../src/lib/projects.ts";

test("the public data contains only the genuine LOCKD project with valid source references", async () => {
  assert.equal(projects.length, 1);
  assert.equal(projects[0].title, "LOCKD");
  assert.equal(projects[0].url, "https://lockd2.vercel.app/");
  const ids = new Set();
  for (const project of projects) {
    assert.ok(!ids.has(project.id));
    ids.add(project.id);
    assert.deepEqual(projectIssues(project), []);
    if (project.caseStudyUrl)
      await access(
        new URL(`../src/app${project.caseStudyUrl}page.tsx`, import.meta.url),
      );
    for (const image of project.images) {
      const meta = await sharp(
        fileURLToPath(new URL(`../public${image.src}`, import.meta.url)),
      ).metadata();
      assert.deepEqual([meta.width, meta.height], [image.width, image.height]);
      for (const source of image.sources ?? []) {
        const responsive = await sharp(
          fileURLToPath(new URL(`../public${source.src}`, import.meta.url)),
        ).metadata();
        assert.equal(responsive.width, source.width);
      }
      if (image.mobile) {
        const mobile = await sharp(
          fileURLToPath(
            new URL(`../public${image.mobile.src}`, import.meta.url),
          ),
        ).metadata();
        assert.deepEqual(
          [mobile.width, mobile.height],
          [image.mobile.width, image.mobile.height],
        );
        if (image.mobile.webp)
          await access(
            new URL(`../public${image.mobile.webp}`, import.meta.url),
          );
      }
    }
  }
});

test("unsafe URLs, bad identifiers and invalid screenshot references are rejected", () => {
  for (const change of [
    { url: "javascript:alert(1)" },
    { url: "https://user:password@example.com" },
    { id: "../bad" },
    { title: " " },
    { caseStudyUrl: "https://example.com/fake" },
    { images: [{ ...projects[0].images[0], src: "/projects/../secret.jpg" }] },
    { images: [{ ...projects[0].images[0], width: 0 }] },
  ]) {
    assert.ok(projectIssues({ ...projects[0], ...change }).length > 0);
  }
  assert.deepEqual(
    projectIssues({
      ...projects[0],
      images: [],
      technologies: [],
      caseStudyUrl: undefined,
    }),
    [],
  );
});

test("selection returns the chosen record and safely handles a removed selection or empty list", () => {
  // Synthetic fixture used only by this unit test, never by the public site.
  const fixture = {
    ...projects[0],
    id: "test-only-fixture",
    title: "Test fixture",
    url: "https://example.invalid/",
  };
  assert.equal(selectedProject([...projects, fixture], fixture.id), fixture);
  assert.equal(selectedProject(projects, fixture.id), projects[0]);
  assert.equal(selectedProject([], fixture.id), undefined);
});

test("gallery navigation wraps deterministically and handles one or no screenshots", () => {
  assert.equal(screenshotIndex(0, -1, 2), 1);
  assert.equal(screenshotIndex(1, 1, 2), 0);
  assert.equal(screenshotIndex(0, 25, 2), 1);
  assert.equal(screenshotIndex(0, 1, 1), 0);
  assert.equal(screenshotIndex(0, 1, 0), 0);
});

test("intentional horizontal swipes navigate while short or vertical movements do not", () => {
  assert.equal(swipeDirection(-80, 10), 1);
  assert.equal(swipeDirection(80, 10), -1);
  assert.equal(swipeDirection(54, 0), 0);
  assert.equal(swipeDirection(80, 100), 0);
  assert.equal(swipeDirection(60, 50), 0);
});
