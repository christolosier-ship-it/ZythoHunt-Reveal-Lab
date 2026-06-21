const BACKGROUND_KEYS = ["beerT", "bubbleDensity", "foamIntensity"];

function clampPercent(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : fallback;
}

export function normalizeBackgroundPreset(preset = {}, fallback = {}) {
  return BACKGROUND_KEYS.reduce((next, key) => {
    if (preset[key] == null) return next;
    next[key] = clampPercent(preset[key], fallback[key] ?? 0);
    return next;
  }, {});
}

export function getCollectionBackgroundSettings(baseSettings = {}, preset = {}) {
  return {
    ...baseSettings,
    ...normalizeBackgroundPreset(preset, baseSettings)
  };
}

export function hasBackgroundPreset(preset) {
  return Boolean(preset && BACKGROUND_KEYS.some((key) => preset[key] != null));
}
