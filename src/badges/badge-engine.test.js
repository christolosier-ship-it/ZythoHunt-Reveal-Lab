import test from "node:test";
import assert from "node:assert/strict";
import { BADGE_DEFINITIONS } from "./badge-definitions.js";
import { createBadgeEngine } from "./badge-engine.js";
import { createBadgeStore } from "./badge-storage.js";
import { createRevealStatsStore } from "./badge-stats-storage.js";

function memoryStorage() { const m = new Map(); return { getItem: (k) => m.get(k) || null, setItem: (k, v) => m.set(k, v) }; }
const bundles = [{ collection: { id: "lagers-et-fermentations-basses" } }, { collection: { id: "porters-stouts" } }];
function registry(values, totalValue = Object.values(values).reduce((a, p) => ({ discovered: a.discovered + p.discovered, total: a.total + p.total }), { discovered: 0, total: 0 })) { return { getCollectionProgress: (id) => values[id] || { discovered: 0, total: 10, ratio: 0 }, getTotalProgress: () => ({ ...totalValue, ratio: totalValue.total ? totalValue.discovered / totalValue.total : 0 }) }; }
function engine({ values, stats, total }) { const storage = memoryStorage(); const badgeStore = createBadgeStore({ storage }); const revealStatsStore = { getState: () => stats || {} }; return { badgeStore, badgeEngine: createBadgeEngine({ badgeStore, revealStatsStore, collectionBundles: bundles, discoveryRegistry: registry(values, total) }) }; }

test("total 1 carte découverte débloque le badge 001", () => { const { badgeEngine } = engine({ values: {}, total: { discovered: 1, total: 251 } }); assert.equal(badgeEngine.evaluate().some((i) => i.badge.number === 1), true); });
test("total 25 cartes découvertes débloque Chasseur de capsules", () => { const { badgeEngine } = engine({ values: {}, total: { discovered: 25, total: 251 } }); assert.equal(badgeEngine.evaluate().some((i) => i.badge.id === "global-chasseur-de-capsules"), true); });
test("une collection complète débloque son badge complet", () => { const { badgeEngine } = engine({ values: { "porters-stouts": { discovered: 22, total: 22, ratio: 1 } } }); assert.equal(badgeEngine.evaluate().some((i) => i.badge.number === 38), true); });
test("toutes les collections avec au moins 5 cartes débloquent le badge équilibré", () => { const { badgeEngine } = engine({ values: { "lagers-et-fermentations-basses": { discovered: 5, total: 45, ratio: .11 }, "porters-stouts": { discovered: 5, total: 22, ratio: .22 } } }); assert.equal(badgeEngine.evaluate().some((i) => i.badge.number === 78), true); });
test("50 noms inconnus débloquent Inventeur de bières imaginaires", () => { const { badgeEngine } = engine({ values: {}, stats: { unknownAttempts: 50 } }); assert.equal(badgeEngine.evaluate().some((i) => i.badge.number === 85), true); });
test("un badge déjà débloqué ne se redéclenche pas", () => { const { badgeEngine } = engine({ values: {}, total: { discovered: 1, total: 251 } }); assert.equal(badgeEngine.evaluate().length, 1); assert.equal(badgeEngine.evaluate().length, 0); });
test("les assets WebP absents ne concernent pas le moteur", () => { assert.equal(BADGE_DEFINITIONS[106].iconFile, "107.webp"); assert.doesNotThrow(() => engine({ values: {} }).badgeEngine.evaluate()); });
