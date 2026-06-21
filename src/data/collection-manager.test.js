import test from "node:test";
import assert from "node:assert/strict";
import { collectionBundles, collections } from "./collections.js";
import { createCollectionManager, validateCollectionBundle } from "./collection-manager.js";

test("collection registry exposes the current Porters & Stouts bundle", () => {
  assert.equal(collectionBundles.length, 1);
  assert.equal(collections.length, 1);
  assert.equal(collectionBundles[0].collection.id, "porters-stouts");
  assert.equal(collectionBundles[0].collection.discoveryKey, "zythohunt.discovery.porters-et-stouts.v1");
  assert.equal(collectionBundles[0].cards.length, 22);
  assert.equal(collectionBundles[0].revealableCards.length, 22);
});

test("collection manager returns and switches active collection bundles", () => {
  const manager = createCollectionManager(collectionBundles);
  assert.equal(manager.getActiveCollectionId(), "porters-stouts");
  assert.equal(manager.getActiveBundle().collection.id, "porters-stouts");
  assert.equal(manager.setActiveCollection("missing").status, "missing");
  assert.equal(manager.setActiveCollection("porters-stouts").status, "active");
});

test("validates complete collection bundles", () => {
  assert.deepEqual(validateCollectionBundle(collectionBundles[0]), { valid: true, errors: [] });
  assert.equal(validateCollectionBundle({ collection: { id: "broken" } }).valid, false);
});
