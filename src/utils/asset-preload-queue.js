/** @typedef {any} Any */
import { assetUrl } from "./asset-url.js";
import { shouldAttemptImageLoad } from "./missing-assets.js";

/**
 * @param {Any} card
 * @param {"thumb"|"full"|string} [purpose]
 */
export function getCardImageForPurpose(card, purpose = "thumb") {
  if (!card) return null;
  if (purpose === "full") return card.fullImage || card.image || null;
  return card.thumbImage || card.image || null;
}

/**
 * @param {Any[]} cards
 * @param {number} activeIndex
 * @param {number} [radius]
 */
export function getPreloadWindowCards(cards, activeIndex, radius = 3) {
  const start = Math.max(0, activeIndex - radius);
  const end = Math.min(cards.length - 1, activeIndex + radius);
  return cards.slice(start, end + 1);
}

/**
 * @param {Any[]} cards
 * @param {number} activeIndex
 * @param {number} [radius]
 * @param {"thumb"|"full"|string} [purpose]
 */
export function getPreloadWindowUrls(cards, activeIndex, radius = 3, purpose = "thumb") {
  return [...new Set(getPreloadWindowCards(cards, activeIndex, radius)
    .map((card) => getCardImageForPurpose(card, purpose))
    .filter((path) => typeof path === "string" && path.length > 0)
    .map((path) => assetUrl(path)))];
}

/** @param {{ cards?: Any[], collection?: Any, radius?: number }} [config] */
export function createAssetPreloadQueue({ cards = [], collection = null, radius = 3 } = {}) {
  const loaded = new Set();
  let generation = 0;

  /**
   * @param {string} url
   * @param {number} currentGeneration
   */
  const loadImage = (url, currentGeneration) => {
    if (!url || loaded.has(url)) return Promise.resolve({ status: "cached", url });

    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (currentGeneration === generation) loaded.add(url);
        resolve({ status: "loaded", url });
      };
      img.onerror = () => {
        if (currentGeneration === generation) loaded.add(url);
        resolve({ status: "failed", url });
      };
      img.src = url;
    });
  };

  /** @param {string[]} urls */
  function preloadUrls(urls) {
    const currentGeneration = generation;
    return Promise.all([...new Set(urls)].map((url) => loadImage(url, currentGeneration)));
  }

  return {
    reset() {
      generation += 1;
      loaded.clear();
    },
    getLoadedCount: () => loaded.size,
    preloadUrls,
    preloadAround(activeIndex, options = {}) {
      const nextRadius = options.radius ?? radius;
      const purpose = options.purpose || "thumb";
      if (!collection?.assetsReady) return Promise.resolve([]);
      return preloadUrls(getPreloadWindowUrls(cards, activeIndex, nextRadius, purpose));
    },
    preloadCard(cardId, options = {}) {
      const card = cards.find((candidate) => candidate.id === cardId);
      const purpose = options.purpose || "full";
      const path = getCardImageForPurpose(card, purpose);
      return path && shouldAttemptImageLoad(collection, card, purpose) ? preloadUrls([assetUrl(path)]) : Promise.resolve([]);
    }
  };
}
