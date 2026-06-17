const STORAGE_KEY = "zythohunt_motion_tokens";

const defaults = {
  extractionDuration: 0.55,
  flipDuration: 0.78,
  settleDuration: 0.35,
  perspective: 1400,
  finalScale: 1,
  maxNeighborShift: 18,
  backgroundBlur: 8,
  tiltX: -4,
  tiltZ: 1.2,
  glowIntensity: 0.6,
  specularIntensity: 0.7
};

function load() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaults, ...JSON.parse(stored) };
  } catch (_) {}
  return { ...defaults };
}

function save(tokens) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch (_) {}
}

export const motionTokens = load();

export function updateToken(key, value) {
  motionTokens[key] = value;
  save(motionTokens);
}

export function resetTokens() {
  Object.assign(motionTokens, defaults);
  localStorage.removeItem(STORAGE_KEY);
}

export function getDefaults() {
  return { ...defaults };
}
