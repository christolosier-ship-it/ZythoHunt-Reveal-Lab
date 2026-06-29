import test from "node:test"; import assert from "node:assert/strict"; import { createRevealStatsStore } from "./badge-stats-storage.js";
function memoryStorage() { const m = new Map(); return { getItem: (k) => m.get(k) || null, setItem: (k, v) => m.set(k, v) }; }
test("une bascule inter-collection incrémente externalCollectionMatches", () => { const store = createRevealStatsStore({ storage: memoryStorage() }); store.recordExternalCollectionMatch({ collectionId: "porters-stouts" }); assert.equal(store.getState().externalCollectionMatches, 1); });
