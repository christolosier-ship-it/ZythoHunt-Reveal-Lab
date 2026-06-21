import test from "node:test";
import assert from "node:assert/strict";
import { getInitialPreloadUrls } from "./preload-assets.js";

const cards = Array.from({ length: 10 }, (_, index) => ({ image: `assets/card-${index}.webp` }));

test("preloads only essential assets and the initial carousel window", () => {
  const urls = getInitialPreloadUrls(cards, 4, 2);

  assert.equal(urls.length, 7);
  assert.ok(urls.some((url) => url.endsWith("dos-porters-et-stouts.webp")));
  assert.ok(urls.some((url) => url.endsWith("face-porters-et-stouts.webp")));
  assert.ok(urls.some((url) => url.endsWith("assets/card-2.webp")));
  assert.ok(urls.some((url) => url.endsWith("assets/card-6.webp")));
  assert.equal(urls.some((url) => url.endsWith("assets/card-7.webp")), false);
});
