import test from "node:test";
import assert from "node:assert/strict";
import { normalizeBeerName } from "./normalize-text.js";
import { createBeerResolver } from "./beer-resolver.js";
import { createDiscoveryStore } from "./discovery-store.js";
import { prototypeCards } from "../data/prototype-carousel.js";

test("normalizes beer names and aliases", () => {
  assert.equal(normalizeBeerName("Imperial Stout"), "imperial stout");
  assert.equal(normalizeBeerName("imperial-stout"), "imperial stout");
  assert.equal(normalizeBeerName("stout impérial"), "stout imperial");
  assert.equal(normalizeBeerName("  stout   imperial  "), "stout imperial");
  assert.equal(normalizeBeerName("l’porter"), "l porter");
});

test("resolves canonical names and aliases only", () => {
  const resolver = createBeerResolver(prototypeCards);
  assert.deepEqual(resolver.resolve("Stout"), { status: "matched", cardId: "stout" });
  assert.deepEqual(resolver.resolve("stout impérial"), { status: "matched", cardId: "imperial-stout" });
  assert.deepEqual(resolver.resolve("porter baltique"), { status: "matched", cardId: "baltic-porter" });
  assert.equal(resolver.resolve("placeholder-01").status, "unknown");
  assert.equal(resolver.resolve("porter").status, "unknown");
  assert.equal(resolver.resolve("unknown").status, "unknown");
});

test("store supports progress, reset, migration, and corrupt data", () => {
  const data = new Map();
  globalThis.localStorage = { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) };
  let store = createDiscoveryStore();
  assert.deepEqual(store.getDiscoveredIds(), []);
  store.markDiscovered("stout");
  assert.equal(store.isDiscovered("stout"), true);
  store.reset();
  assert.deepEqual(store.getDiscoveredIds(), []);
  data.clear(); data.set("zythohunt_revealed", JSON.stringify([0, 4, 8]));
  store = createDiscoveryStore();
  assert.deepEqual(store.getDiscoveredIds().sort(), ["baltic-porter", "imperial-stout", "stout"]);
  data.set("zythohunt_progress_v2", "{");
  store = createDiscoveryStore();
  assert.deepEqual(store.getDiscoveredIds(), []);
});
