const CARD_BACK = "/assets/collections/porters-stouts/card-back.webp";
const CARD_FRAME = "/assets/collections/porters-stouts/card-front-frame.svg";

import { cards } from "../data/cards.js";

export async function preloadAssets(onProgress) {
  const urls = [
    CARD_BACK,
    CARD_FRAME,
    ...cards.map((c) => c.image)
  ];

  let loaded = 0;
  const total = urls.length;

  const load = (url) =>
    new Promise((resolve) => {
      const isSvg = url.endsWith(".svg");
      if (isSvg) {
        fetch(url)
          .then(() => { loaded++; onProgress && onProgress(loaded / total); resolve(); })
          .catch(() => { loaded++; onProgress && onProgress(loaded / total); resolve(); });
      } else {
        const img = new Image();
        img.onload = () => { loaded++; onProgress && onProgress(loaded / total); resolve(); };
        img.onerror = () => { loaded++; onProgress && onProgress(loaded / total); resolve(); };
        img.src = url;
      }
    });

  await Promise.all(urls.map(load));
}

export const CARD_BACK_URL = CARD_BACK;
export const CARD_FRAME_URL = CARD_FRAME;
