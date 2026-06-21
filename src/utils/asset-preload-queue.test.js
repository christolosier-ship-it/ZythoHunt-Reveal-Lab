import test from "node:test";
import assert from "node:assert/strict";
import { getCardImageForPurpose, getPreloadWindowCards, getPreloadWindowUrls } from "./asset-preload-queue.js";

const cards = Array.from({ length: 8 }, (_, index) => ({
  id: `card-${index}`,
  image: `assets/full/card-${index}.webp`,
  thumbImage: `assets/thumb/card-${index}.webp`,
  fullImage: `assets/full/card-${index}.webp`
}));

test("selects thumb or full image paths with image fallback", () => {
  assert.equal(getCardImageForPurpose(cards[0], "thumb"), "assets/thumb/card-0.webp");
  assert.equal(getCardImageForPurpose(cards[0], "full"), "assets/full/card-0.webp");
  assert.equal(getCardImageForPurpose({ image: "fallback.webp" }, "thumb"), "fallback.webp");
  assert.equal(getCardImageForPurpose(null), null);
});

test("returns a bounded preload window around active index", () => {
  assert.deepEqual(getPreloadWindowCards(cards, 0, 2).map((card) => card.id), ["card-0", "card-1", "card-2"]);
  assert.deepEqual(getPreloadWindowCards(cards, 4, 2).map((card) => card.id), ["card-2", "card-3", "card-4", "card-5", "card-6"]);
  assert.deepEqual(getPreloadWindowCards(cards, 7, 2).map((card) => card.id), ["card-5", "card-6", "card-7"]);
});

test("builds unique preload urls for a purpose", () => {
  const urls = getPreloadWindowUrls(cards, 4, 1, "thumb");
  assert.equal(urls.length, 3);
  assert.ok(urls.every((url) => url.includes("assets/thumb/")));
});
