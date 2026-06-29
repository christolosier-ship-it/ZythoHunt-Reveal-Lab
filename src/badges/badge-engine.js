import { BADGE_DEFINITIONS } from "./badge-definitions.js";

function collectionIds(ctx) { return ctx.collectionBundles?.map(({ collection }) => collection.id) || []; }
function progress(ctx, id) { return ctx.discoveryRegistry?.getCollectionProgress(id) || { discovered: 0, total: 0, ratio: 0 }; }
function total(ctx) { return ctx.discoveryRegistry?.getTotalProgress() || { discovered: 0, total: 0, ratio: 0 }; }
function stats(ctx) { return ctx.revealStatsStore?.getState?.() || ctx.revealStats || {}; }
function daysBetween(a, b) { return (new Date(b).getTime() - new Date(a).getTime()) / 86400000; }

export function isBadgeConditionMet(badge, ctx) {
  const c = badge.condition || {}; const s = stats(ctx); const now = ctx.now ? ctx.now() : new Date();
  switch (c.type) {
    case "totalDiscoveredAtLeast": return total(ctx).discovered >= c.count;
    case "totalDiscoveredEquals": return total(ctx).discovered === c.count;
    case "collectionDiscoveredAtLeast": return progress(ctx, c.collectionId || badge.collectionId).discovered >= c.count;
    case "collectionComplete": { const p = progress(ctx, c.collectionId || badge.collectionId); return p.total > 0 && p.discovered >= p.total; }
    case "allCollectionsDiscoveredAtLeast": return collectionIds(ctx).every((id) => progress(ctx, id).discovered >= c.count);
    case "allCollectionsRatioAtLeast": return collectionIds(ctx).every((id) => { const p = progress(ctx, id); return p.total > 0 && p.discovered >= Math.ceil(p.total * c.ratio); });
    case "unknownAttemptsAtLeast": return (s.unknownAttempts || 0) >= c.count;
    case "unknownStreakAtLeast": return (s.bestUnknownStreak || 0) >= c.count;
    case "alreadyDiscoveredAttemptsAtLeast": return (s.alreadyDiscoveredAttempts || 0) >= c.count;
    case "externalCollectionMatchesAtLeast": return (s.externalCollectionMatches || 0) >= c.count;
    case "unknownStreakThenValid": return s.lastOutcome === "new-discovery" && (ctx.previousRevealStats?.currentUnknownStreak || 0) >= c.count;
    case "alreadyDiscoveredAfterNewDiscovery": return s.lastOutcome === "already-discovered" && ctx.previousRevealStats?.lastDiscoveryWasNew === true;
    case "lastCardInCollection": return s.lastOutcome === "new-discovery" && collectionIds(ctx).some((id) => { const p = progress(ctx, id); return p.total > 0 && p.discovered === p.total; });
    case "revealedAfterMidnight": return s.lastOutcome === "new-discovery" && now.getHours() >= 0 && now.getHours() < 5;
    case "revealedBeforeHour": return s.lastOutcome === "new-discovery" && now.getHours() < c.hour;
    case "backAfterDaysWithoutDiscovery": return s.lastOutcome === "new-discovery" && s.lastKnownDiscoveryAtBeforeCurrent && daysBetween(s.lastKnownDiscoveryAtBeforeCurrent, s.lastDiscoveryAt || now) >= c.days;
    case "collectionsInSessionAtLeast": return (s.sessionCollectionIds || []).length >= c.count;
    case "allCollectionsInSession": return collectionIds(ctx).every((id) => (s.sessionCollectionIds || []).includes(id));
    case "finalCardDiscovered": { const p = total(ctx); return s.lastOutcome === "new-discovery" && p.total > 0 && p.discovered >= p.total; }
    default: return false;
  }
}

export function getBadgeProgress(badge, ctx) {
  const c = badge.condition || {}; let current; let target;
  if (["totalDiscoveredAtLeast", "totalDiscoveredEquals"].includes(c.type)) { current = total(ctx).discovered; target = c.count; }
  else if (c.type === "collectionDiscoveredAtLeast") { current = progress(ctx, c.collectionId || badge.collectionId).discovered; target = c.count; }
  else if (c.type === "collectionComplete") { const p = progress(ctx, c.collectionId || badge.collectionId); current = p.discovered; target = p.total; }
  else if (c.type === "allCollectionsDiscoveredAtLeast") { current = Math.min(...collectionIds(ctx).map((id) => progress(ctx, id).discovered)); target = c.count; }
  else if (c.type === "allCollectionsRatioAtLeast") { current = Math.min(...collectionIds(ctx).map((id) => progress(ctx, id).ratio)); target = c.ratio; }
  else if (c.type === "unknownAttemptsAtLeast") { current = stats(ctx).unknownAttempts || 0; target = c.count; }
  else if (c.type === "unknownStreakAtLeast") { current = stats(ctx).bestUnknownStreak || 0; target = c.count; }
  else if (c.type === "alreadyDiscoveredAttemptsAtLeast") { current = stats(ctx).alreadyDiscoveredAttempts || 0; target = c.count; }
  else if (c.type === "externalCollectionMatchesAtLeast") { current = stats(ctx).externalCollectionMatches || 0; target = c.count; }
  else return null;
  return { current, target, ratio: target ? Math.min(current / target, 1) : 0 };
}

/** @param {{[key: string]: any}} [options] */
export function createBadgeEngine({ badgeStore, discoveryRegistry, revealStatsStore, collectionBundles, definitions = BADGE_DEFINITIONS, now } = {}) {
  const base = () => ({ discoveryRegistry, revealStatsStore, collectionBundles, now });
  return { evaluate({ silent = false, previousRevealStats = null } = {}) {
      const unlocked = [];
      for (const badge of definitions) if (!badgeStore.isUnlocked(badge.id) && isBadgeConditionMet(badge, { ...base(), previousRevealStats })) {
        const item = badgeStore.unlock(badge, (now ? now() : new Date()).toISOString()); if (item) unlocked.push(item);
      }
      return silent ? [] : unlocked;
    }, getProgress: (badge) => getBadgeProgress(badge, base()) };
}
