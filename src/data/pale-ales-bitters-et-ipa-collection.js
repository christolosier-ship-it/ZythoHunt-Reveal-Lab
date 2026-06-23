import collectionJson from "../../docs/active/collection-02-pale-ales-bitters-et-ipa.json" with { type: "json" };
import { createCollectionBundle } from "./create-collection-bundle.js";
import { paleAlesBittersEtIpaAssets, paleAlesBittersEtIpaAssetPath, paleAlesBittersEtIpaCardImages, paleAlesBittersEtIpaThumbPath } from "./card-assets/pale-ales-bitters-et-ipa-assets.js";

export const paleAlesBittersEtIpaBundle = createCollectionBundle({
  collectionJson,
  collectionId: "pale-ales-bitters-et-ipa",
  slug: "pale-ales-bitters-et-ipa",
  subtitle: "36 cartes Brassopédie à illustrer",
  order: 20,
  discoveryKey: "zythohunt.discovery.pale-ales-bitters-et-ipa.v1",
  assets: {
    cardImages: paleAlesBittersEtIpaCardImages,
    collectionAssets: paleAlesBittersEtIpaAssets,
    assetPath: paleAlesBittersEtIpaAssetPath,
    thumbPath: paleAlesBittersEtIpaThumbPath
  },
  backgroundPreset: {
    beerT: 72,
    bubbleDensity: 58,
    foamIntensity: 48
  },
  assetsReady: false
});
