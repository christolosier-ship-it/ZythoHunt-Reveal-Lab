import test from "node:test";
import assert from "node:assert/strict";
import { collectionBundles, collections, pendingCollectionBundles, readyCollectionBundles } from "./collections.js";
import { createCollectionManager, validateCollectionBundle } from "./collection-manager.js";

const porterBundle = collectionBundles.find((bundle) => bundle.collection.id === "porters-stouts");
const pendingBundles = collectionBundles.filter((bundle) => bundle.collection.id !== "porters-stouts");

test("collection registry exposes 9 collections with Porters & Stouts ready", () => {
  assert.equal(collectionBundles.length, 9);
  assert.equal(collections.length, 9);
  assert.equal(readyCollectionBundles.length, 1);
  assert.equal(pendingCollectionBundles.length, 8);
  assert.equal(porterBundle.collection.discoveryKey, "zythohunt.discovery.porters-et-stouts.v1");
  assert.equal(porterBundle.collection.assetsReady, true);
  assert.equal(porterBundle.cards.length, 22);
  assert.equal(porterBundle.revealableCards.length, 22);
  assert.deepEqual(pendingBundles.map((bundle) => bundle.collection.assetsReady), Array(8).fill(false));
});

test("collection registry keeps unique slugs and discovery keys", () => {
  const slugs = collections.map((collection) => collection.slug);
  const discoveryKeys = collections.map((collection) => collection.discoveryKey);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal(new Set(discoveryKeys).size, discoveryKeys.length);
});

test("collection registry validates presets and image fields for every card", () => {
  for (const bundle of collectionBundles) {
    const preset = bundle.collection.backgroundPreset;
    assert.ok(preset.beerT >= 0 && preset.beerT <= 100, bundle.collection.id);
    assert.ok(preset.bubbleDensity >= 35 && preset.bubbleDensity <= 75, bundle.collection.id);
    assert.ok(preset.foamIntensity >= 30 && preset.foamIntensity <= 70, bundle.collection.id);
    for (const card of bundle.cards) {
      assert.ok(card.image, `${bundle.collection.id}:${card.id}:image`);
      assert.ok(card.thumbImage, `${bundle.collection.id}:${card.id}:thumbImage`);
      assert.ok(card.fullImage, `${bundle.collection.id}:${card.id}:fullImage`);
    }
  }
});

test("collection manager activates only asset-ready collections", () => {
  const manager = createCollectionManager(collectionBundles);
  assert.equal(manager.getActiveCollectionId(), "porters-stouts");
  assert.equal(manager.getActiveBundle().collection.id, "porters-stouts");
  assert.equal(manager.setActiveCollection("missing").status, "missing");
  assert.equal(manager.setActiveCollection("lagers-et-fermentations-basses").status, "pending-assets");
  assert.equal(manager.getActiveCollectionId(), "porters-stouts");
  assert.equal(manager.setActiveCollection("porters-stouts").status, "active");
});

test("validates complete collection bundles", () => {
  for (const bundle of collectionBundles) assert.deepEqual(validateCollectionBundle(bundle), { valid: true, errors: [] });
  assert.equal(validateCollectionBundle({ collection: { id: "broken" } }).valid, false);
});
