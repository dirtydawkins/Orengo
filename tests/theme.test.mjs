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
