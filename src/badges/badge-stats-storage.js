export const REVEAL_STATS_KEY = "zythohunt.revealStats.v1";
export const defaultRevealStats = () => ({ schemaVersion: 1, totalAttempts: 0, validAttempts: 0, unknownAttempts: 0, alreadyDiscoveredAttempts: 0, externalCollectionMatches: 0, currentUnknownStreak: 0, bestUnknownStreak: 0, lastOutcome: null, lastUnlockedCardAt: null, lastDiscoveryWasNew: false, lastDiscoveryAt: null, lastKnownDiscoveryAtBeforeCurrent: null, sessionCollectionIds: [] });
function read(storage) { try { return { ...defaultRevealStats(), ...(JSON.parse(storage.getItem(REVEAL_STATS_KEY) || "null") || {}) }; } catch { return defaultRevealStats(); } }
export function createRevealStatsStore({ storage = globalThis.localStorage, now = () => new Date() } = {}) {
  let state = read(storage); const save = () => storage?.setItem(REVEAL_STATS_KEY, JSON.stringify(state));
  const touch = (outcome) => { state.totalAttempts += 1; state.lastOutcome = outcome; };
  const addSessionCollection = (collectionId) => { if (collectionId && !state.sessionCollectionIds.includes(collectionId)) state.sessionCollectionIds.push(collectionId); };
  return { getState: () => ({ ...state, sessionCollectionIds: [...state.sessionCollectionIds] }),
    recordUnknown(input) { touch("unknown"); state.unknownAttempts += 1; state.currentUnknownStreak += 1; state.bestUnknownStreak = Math.max(state.bestUnknownStreak, state.currentUnknownStreak); save(); return this.getState(); },
    recordAlreadyDiscovered(payload = {}) { const { collectionId } = payload; touch("already-discovered"); state.validAttempts += 1; state.alreadyDiscoveredAttempts += 1; state.lastDiscoveryWasNew = false; addSessionCollection(collectionId); save(); return this.getState(); },
    recordNewDiscovery(payload = {}) { const { collectionId } = payload; touch("new-discovery"); state.validAttempts += 1; state.lastKnownDiscoveryAtBeforeCurrent = state.lastDiscoveryAt; state.lastDiscoveryAt = now().toISOString(); state.lastUnlockedCardAt = state.lastDiscoveryAt; state.lastDiscoveryWasNew = true; state.currentUnknownStreak = 0; addSessionCollection(collectionId); save(); return this.getState(); },
    recordExternalCollectionMatch(result = {}) { touch("external-collection"); state.validAttempts += 1; state.externalCollectionMatches += 1; state.currentUnknownStreak = 0; addSessionCollection(result.collectionId); save(); return this.getState(); } };
}
