import test from "node:test";
import assert from "node:assert/strict";
import { getCollectionBackgroundSettings, hasBackgroundPreset, normalizeBackgroundPreset } from "./background-presets.js";

test("normalizes collection background presets", () => {
  assert.deepEqual(normalizeBackgroundPreset({ beerT: -10, bubbleDensity: 150, foamIntensity: "42" }), {
    beerT: 0,
    bubbleDensity: 100,
    foamIntensity: 42
  });
});

test("merges collection background presets onto current settings", () => {
  assert.deepEqual(getCollectionBackgroundSettings({ beerT: 50, bubbleDensity: 20, foamIntensity: 10 }, { beerT: 8, foamIntensity: 55 }), {
    beerT: 8,
    bubbleDensity: 20,
    foamIntensity: 55
  });
});

test("detects whether a collection has a background preset", () => {
  assert.equal(hasBackgroundPreset({ beerT: 0 }), true);
  assert.equal(hasBackgroundPreset({}), false);
  assert.equal(hasBackgroundPreset(null), false);
});
