export const BADGE_STORAGE_KEY = "zythohunt.badges.v1";
export const BADGE_QUEUE_KEY = "zythohunt.badgeQueue.v1";
const emptyBadges = () => ({ schemaVersion: 1, unlocked: {} });
const emptyQueue = () => ({ schemaVersion: 1, pending: [] });
function readJson(storage, key, fallback) { try { return { ...fallback(), ...(JSON.parse(storage.getItem(key) || "null") || {}) }; } catch { return fallback(); } }
export function createBadgeStore({ storage = globalThis.localStorage } = {}) {
  let state = readJson(storage, BADGE_STORAGE_KEY, emptyBadges);
  let queue = readJson(storage, BADGE_QUEUE_KEY, emptyQueue);
  const save = () => storage?.setItem(BADGE_STORAGE_KEY, JSON.stringify(state));
  const saveQueue = () => storage?.setItem(BADGE_QUEUE_KEY, JSON.stringify(queue));
  return {
    getState: () => ({ schemaVersion: 1, unlocked: { ...state.unlocked } }),
    isUnlocked: (id) => Boolean(state.unlocked[id]),
    getUnlocked: (id) => state.unlocked[id] || null,
    unlock(badge, unlockedAt = new Date().toISOString()) { if (this.isUnlocked(badge.id)) return null; state.unlocked[badge.id] = { unlockedAt }; save(); return { badge, unlockedAt }; },
    enqueue(items) { queue.pending.push(...items.map(({ badge, badgeId, unlockedAt }) => ({ badgeId: badgeId || badge.id, unlockedAt }))); saveQueue(); },
    takeQueue() { const pending = queue.pending.slice(); queue = emptyQueue(); saveQueue(); return pending; }
  };
}
