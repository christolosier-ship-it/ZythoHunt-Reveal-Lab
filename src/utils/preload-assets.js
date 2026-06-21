import { assetUrl } from "./asset-url.js";
import { getPreloadWindowUrls } from "./asset-preload-queue.js";
import { porterStoutCards, porterStoutCollection } from "../data/porters-stouts-collection.js";

export const CARD_BACK_URL = assetUrl(porterStoutCollection.cardBack);
export const CARD_FRAME_URL = assetUrl(porterStoutCollection.cardFrame);
export const INITIAL_CAROUSEL_INDEX = 4;
export const INITIAL_PRELOAD_RADIUS = 3;

export function getInitialPreloadUrls(cards = porterStoutCards, activeIndex = INITIAL_CAROUSEL_INDEX, radius = INITIAL_PRELOAD_RADIUS) {
  return [...new Set([
    CARD_BACK_URL,
    CARD_FRAME_URL,
    ...getPreloadWindowUrls(cards, activeIndex, radius, "thumb")
  ])];
}

export async function preloadAssets(onProgress, options = {}) {
  const urls = getInitialPreloadUrls(options.cards, options.activeIndex, options.radius);
  let loaded = 0;
  const total = urls.length || 1;

  const load = (url) =>
    new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => { loaded++; onProgress && onProgress(loaded / total); resolve(); };
      img.onerror = () => { loaded++; onProgress && onProgress(loaded / total); resolve(); };
      img.src = url;
    });

  await Promise.all(urls.map(load));
}
