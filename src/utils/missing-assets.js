export const FALLBACK_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 504"><rect width="360" height="504" rx="18" fill="#120904"/><rect x="12" y="12" width="336" height="480" rx="16" fill="none" stroke="#e8a040" stroke-opacity="0.32" stroke-width="3"/><text x="180" y="270" text-anchor="middle" font-family="Georgia,serif" font-size="150" font-weight="700" fill="#e8a040">?</text></svg>`)}`;

export function shouldAttemptImageLoad(collection, card, purpose = "thumb") {
  if (purpose === "frame" || purpose === "back" || purpose === "collection") return Boolean(collection?.assetsReady);
  if (!card) return false;
  return Boolean(collection?.assetsReady);
}

export function useFallbackImage(img) {
  img.onerror = null;
  img.src = FALLBACK_SVG;
  img.classList.add("is-missing-asset");
}
