import test from "node:test";
import assert from "node:assert/strict";
import { buildBrassopedieLibraryModel, canOpenBrassopedieEntry, getVisibleStyleLabel, resolveLibraryPanelCard } from "./brassopedie-library-view.js";

const bundles = [
  { collection: { id: "a", name: "A" }, cardsById: { one: { id: "one", name: "Pilsner", brassopedie: { nom: "Pilsner" } } }, revealableCards: [{ id: "one", name: "Pilsner", brassopedie: { nom: "Pilsner" } }] },
  { collection: { id: "b", name: "B" }, revealableCards: [{ id: "two", name: "Porter", brassopedie: { nom: "Porter" } }] }
];
const registry = {
  getCollectionProgress: (id) => id === "a" ? { discovered: 1, total: 1, ratio: 1 } : { discovered: 0, total: 1, ratio: 0 },
  isDiscovered: (collectionId, cardId) => collectionId === "a" && cardId === "one"
};

test("visible labels hide unknown styles and show discovered names", () => {
  assert.equal(getVisibleStyleLabel({ card: { name: "Secret" }, discovered: false }), "???");
  assert.equal(getVisibleStyleLabel({ card: { name: "Pilsner" }, discovered: true }), "Pilsner");
});

test("only discovered Brassopédie entries can open", () => {
  assert.equal(canOpenBrassopedieEntry({ discovered: false, card: { brassopedie: {} } }), false);
  assert.equal(canOpenBrassopedieEntry({ discovered: true, card: { brassopedie: {} } }), true);
});

test("library model changes styles when collection changes", () => {
  const first = buildBrassopedieLibraryModel({ collectionBundles: bundles, registry, selectedCollectionId: "a" });
  const second = buildBrassopedieLibraryModel({ collectionBundles: bundles, registry, selectedCollectionId: "b" });
  assert.equal(first.styles[0].label, "Pilsner");
  assert.equal(second.styles[0].label, "???");
  assert.equal(second.styles[0].canOpen, false);
});


test("library panel card resolver returns the card and collection cardsById", () => {
  const resolved = resolveLibraryPanelCard({ collectionBundles: bundles, collectionId: "a", cardId: "one" });
  assert.equal(resolved.card.name, "Pilsner");
  assert.equal(resolved.cardsById.one.name, "Pilsner");
  assert.equal(resolveLibraryPanelCard({ collectionBundles: bundles, collectionId: "b", cardId: "missing" }), null);
});
