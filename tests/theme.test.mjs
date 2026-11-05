import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const layout = await readFile(
  new URL("../src/app/layout.tsx", import.meta.url),
  "utf8",
);
const bootstrap = layout.match(/const themeBoot = `([^`]+)`;/)?.[1];
assert.ok(bootstrap, "The actual early theme bootstrap must be available");

const styles = await readFile(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);
const tokens = (block) =>
  Object.fromEntries(
    [...block.matchAll(/(--[a-z-]+):\s*(#[a-f0-9]{6})\s*;/gi)].map((match) => [
      match[1],
      match[2],
    ]),
  );
const darkPalette = tokens(styles.match(/:root\s*\{([\s\S]*?)\}/)[1]);
const lightPalette = {
  ...darkPalette,
  ...tokens(styles.match(/html\[data-theme="light"\]\s*\{([\s\S]*?)\}/)[1]),
};
function luminance(hex) {
  const channels = [1, 3, 5]
    .map((index) => parseInt(hex.slice(index, index + 2), 16) / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}
function contrast(a, b) {
  const first = luminance(a),
    second = luminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}
for (const [theme, palette] of Object.entries({
  dark: darkPalette,
  light: lightPalette,
})) {
  test(`${theme} page, navigation and both card faces retain readable contrast`, () => {
    for (const background of ["--bg", "--surface", "--paper"])
      for (const foreground of ["--text", "--muted", "--accent", "--champagne"])
        assert.ok(
          contrast(palette[foreground], palette[background]) >= 4.5,
          `${foreground} on ${background}`,
        );
    for (const background of ["--card-paper", "--card-back"])
      for (const foreground of [
        "--card-ink",
        "--card-muted",
        "--card-ornament",
        "--card-accent",
      ])
        assert.ok(
          contrast(palette[foreground], palette[background]) >= 4.5,
          `${foreground} on ${background}`,
        );
    for (const background of ["--nav-bg", "--nav-panel", "--nav-selected"])
      for (const foreground of ["--nav-text", "--nav-muted", "--nav-highlight"])
        assert.ok(
          contrast(palette[foreground], palette[background]) >= 4.5,
          `${foreground} on ${background}`,
        );
    for (const background of ["--bg", "--surface"])
      assert.ok(
        contrast(palette["--control-line"], palette[background]) >= 3,
        `control border on ${background}`,
      );
  });
}

for (const [saved, systemDark, expected] of [
  [null, false, "light"],
  [null, true, "light"],
  ["light", true, "light"],
  ["dark", false, "dark"],
  ["system", true, "dark"],
  ["system", false, "light"],
  ["unknown", true, "light"],
  ["unavailable", true, "light"],
]) {
  test(`early theme: saved=${saved}, systemDark=${systemDark} selects ${expected}`, () => {
    let metadata;
    const dataset = {};
    runInNewContext(bootstrap, {
      localStorage: {
        getItem: () => {
          if (saved === "unavailable") throw new Error("Unavailable storage");
          return saved;
        },
      },
      matchMedia: () => ({ matches: systemDark }),
      document: {
        documentElement: { dataset },
        querySelector: () => ({
          setAttribute: (_, value) => {
            metadata = value;
          },
        }),
      },
    });
    assert.equal(dataset.theme, expected);
    assert.equal(metadata, expected === "light" ? "#F2EEE6" : "#0B0D10");
  });
}
