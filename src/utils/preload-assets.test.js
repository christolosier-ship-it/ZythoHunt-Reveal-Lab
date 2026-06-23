import test from "node:test";
import assert from "node:assert/strict";
import { getInitialPreloadUrls } from "./preload-assets.js";

const cards = Array.from({ length: 10 }, (_, index) => ({ image: `assets/card-${index}.webp` }));
const collection = { assetsReady: true, cardBack: "assets/back.webp", cardFrame: "assets/frame.webp" };

test("preloads only active collection assets and the initial carousel window", () => {
  const urls = getInitialPreloadUrls({ collection, cards, activeIndex: 4, radius: 2 });

  assert.equal(urls.length, 7);
  assert.ok(urls.some((url) => url.endsWith("assets/back.webp")));
  assert.ok(urls.some((url) => url.endsWith("assets/frame.webp")));
  assert.ok(urls.some((url) => url.endsWith("assets/card-2.webp")));
  assert.ok(urls.some((url) => url.endsWith("assets/card-6.webp")));
  assert.equal(urls.some((url) => url.endsWith("assets/card-7.webp")), false);
});

test("skips card image preloads for incomplete collections", () => {
  const urls = getInitialPreloadUrls({ collection: { ...collection, assetsReady: false }, cards, activeIndex: 4, radius: 2 });
  assert.deepEqual(urls, []);
});
