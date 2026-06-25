import test from "node:test";
import assert from "node:assert/strict";
import { resolveCardBackPath, resolveCardFramePath } from "./create-card.js";

const collection = {
  cardBack: "assets/back-hd.webp",
  cardBackThumb: "assets/thumb/back.webp",
  cardFrame: "assets/frame-hd.webp",
  collectionFaceThumb: "assets/thumb/frame.webp"
};
const cardData = { frame: "assets/card-frame-hd.webp" };

test("carousel cards prefer collection thumbnail assets for back and frame", () => {
  assert.equal(resolveCardBackPath({ collection, as: "carousel" }), collection.cardBackThumb);
  assert.equal(resolveCardFramePath({ cardData, collection, as: "carousel" }), collection.collectionFaceThumb);
});

test("non-carousel cards keep HD assets for back and frame", () => {
  assert.equal(resolveCardBackPath({ collection, as: "slot" }), collection.cardBack);
  assert.equal(resolveCardFramePath({ cardData, collection, as: "slot" }), cardData.frame);
  assert.equal(resolveCardFramePath({ cardData: {}, collection, as: "slot" }), collection.cardFrame);
});

test("carousel cards fall back to existing HD assets when thumbnails are absent", () => {
  const hdOnlyCollection = {
    cardBack: collection.cardBack,
    cardFrame: collection.cardFrame
  };

  assert.equal(resolveCardBackPath({ collection: hdOnlyCollection, as: "carousel" }), collection.cardBack);
  assert.equal(resolveCardFramePath({ cardData, collection: hdOnlyCollection, as: "carousel" }), collection.cardFrame);
});
