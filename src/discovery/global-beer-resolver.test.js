import assert from "node:assert/strict";
import test from "node:test";
import { createGlobalBeerResolver } from "./global-beer-resolver.js";

const bundles = [
  {
    collection: { id: "porters-stouts", name: "Porters & Stouts" },
    revealableCards: [
      { id: "stout", name: "Stout", aliases: ["dark ale"] },
      { id: "porter", name: "Porter", aliases: [] }
    ]
  },
  {
    collection: { id: "lagers", name: "Lagers" },
    revealableCards: [
      { id: "pilsner", name: "Pilsner", aliases: ["pils"] },
      { id: "stout-lager", name: "Stout", aliases: ["black lager"] }
    ]
  }
];

test("finds a local card", () => {
  const result = createGlobalBeerResolver(bundles, "porters-stouts").resolve("porter");
  assert.equal(result.status, "matched");
  assert.equal(result.collectionId, "porters-stouts");
  assert.equal(result.cardId, "porter");
});

test("finds a card in another collection", () => {
  const result = createGlobalBeerResolver(bundles, "porters-stouts").resolve("pilsner");
  assert.equal(result.status, "matched");
  assert.equal(result.collectionId, "lagers");
  assert.equal(result.cardId, "pilsner");
});

test("prefers the active collection on duplicates", () => {
  const result = createGlobalBeerResolver(bundles, "lagers").resolve("stout");
  assert.equal(result.status, "matched");
  assert.equal(result.collectionId, "lagers");
  assert.equal(result.cardId, "stout-lager");
});

test("returns unknown when nothing matches", () => {
  assert.deepEqual(createGlobalBeerResolver(bundles, "lagers").resolve("gose"), { status: "unknown" });
});

test("handles aliases", () => {
  const result = createGlobalBeerResolver(bundles, "porters-stouts").resolve("pils");
  assert.equal(result.status, "matched");
  assert.equal(result.collectionId, "lagers");
  assert.equal(result.cardId, "pilsner");
});
