import collectionJson from "../../docs/active/collection-09-appellations-commerciales.json" with { type: "json" };
import { createCollectionBundle } from "./create-collection-bundle.js";
import { appellationsCommercialesAssets, appellationsCommercialesAssetPath, appellationsCommercialesCardImages, appellationsCommercialesThumbPath } from "./card-assets/appellations-commerciales-assets.js";

export const appellationsCommercialesBundle = createCollectionBundle({
  collectionJson,
  collectionId: "appellations-commerciales",
  slug: "appellations-commerciales",
  subtitle: "30 cartes Brassopédie à illustrer",
  order: 90,
  discoveryKey: "zythohunt.discovery.appellations-commerciales.v1",
  assets: {
    cardImages: appellationsCommercialesCardImages,
    collectionAssets: appellationsCommercialesAssets,
    assetPath: appellationsCommercialesAssetPath,
    thumbPath: appellationsCommercialesThumbPath
  },
  backgroundPreset: {
    beerT: 75,
    bubbleDensity: 66,
    foamIntensity: 62
  },
  assetsReady: true
});