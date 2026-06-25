import test from "node:test";
import assert from "node:assert/strict";
import { createDiscoveryRegistry } from "./discovery-registry.js";

function storage() {
  const map = new Map();
  globalThis.localStorage = { getItem: (k) => map.get(k) ?? null, setItem: (k, v) => map.set(k, String(v)), removeItem: (k) => map.delete(k), clear: () => map.clear() };
  return map;
}

const bundles = [
  { collection: { id: "lagers", discoveryKey: "d.lagers" }, revealableCards: [{ id: "pils" }, { id: "helles" }] },
  { collection: { id: "stouts", discoveryKey: "d.stouts" }, revealableCards: [{ id: "porter" }] }
];

test("registry reads progress by collection", () => {
  const map = storage();
  map.set("d.lagers", JSON.stringify({ schemaVersion: 2, discovered: { pils: {} } }));
  const registry = createDiscoveryRegistry(bundles);
  assert.deepEqual(registry.getCollectionProgress("lagers"), { discovered: 1, total: 2, ratio: 0.5 });
});

test("registry calculates total progress and refreshes stores", () => {
  const map = storage();
  const registry = createDiscoveryRegistry(bundles);
  assert.deepEqual(registry.getTotalProgress(), { discovered: 0, total: 3, ratio: 0 });
  map.set("d.lagers", JSON.stringify({ schemaVersion: 2, discovered: { pils: {} } }));
  map.set("d.stouts", JSON.stringify({ schemaVersion: 2, discovered: { porter: {} } }));
  registry.refresh();
  assert.equal(registry.isDiscovered("stouts", "porter"), true);
  assert.deepEqual(registry.getTotalProgress(), { discovered: 2, total: 3, ratio: 2 / 3 });
});
