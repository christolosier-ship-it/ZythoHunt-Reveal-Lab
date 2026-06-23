import { assetUrl } from "./asset-url.js";
import { getPreloadWindowUrls } from "./asset-preload-queue.js";

export const INITIAL_CAROUSEL_INDEX = 4;
export const INITIAL_PRELOAD_RADIUS = 3;

function collectionAssetUrls(collection) {
  if (!collection?.assetsReady) return [];
  return [collection.cardBack, collection.cardFrame].filter(Boolean).map((path) => assetUrl(path));
}

/** @param {{ collection?: any, cards?: any[], activeIndex?: number, radius?: number }} [options] */
export function getInitialPreloadUrls({ collection, cards = [], activeIndex = INITIAL_CAROUSEL_INDEX, radius = INITIAL_PRELOAD_RADIUS } = {}) {
  const cardUrls = collection?.assetsReady ? getPreloadWindowUrls(cards, activeIndex, radius, "thumb") : [];
  return [...new Set([...collectionAssetUrls(collection), ...cardUrls])];
}

export async function preloadAssets(onProgress, options = {}) {
  const urls = getInitialPreloadUrls(options);
  let loaded = 0;
  const total = urls.length || 1;
  if (!urls.length) onProgress?.(1);

  const load = (url) =>
    new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => { loaded++; onProgress?.(loaded / total); resolve(); };
      img.onerror = () => { loaded++; onProgress?.(loaded / total); resolve(); };
      img.src = url;
    });

  await Promise.all(urls.map(load));
}
