import collectionJson from "../../docs/active/collection-04-traditions-belges-et-francaises.json" with { type: "json" };
import { createCollectionBundle } from "./create-collection-bundle.js";
import { traditionsBelgesEtFrancaisesAssets, traditionsBelgesEtFrancaisesAssetPath, traditionsBelgesEtFrancaisesCardImages, traditionsBelgesEtFrancaisesThumbPath } from "./card-assets/traditions-belges-et-francaises-assets.js";

export const traditionsBelgesEtFrancaisesBundle = createCollectionBundle({
  collectionJson,
  collectionId: "traditions-belges-et-francaises",
  slug: "traditions-belges-et-francaises",
  subtitle: "17 cartes Brassopédie à illustrer",
  order: 40,
  discoveryKey: "zythohunt.discovery.traditions-belges-et-francaises.v1",
  assets: {
    cardImages: traditionsBelgesEtFrancaisesCardImages,
    collectionAssets: traditionsBelgesEtFrancaisesAssets,
    assetPath: traditionsBelgesEtFrancaisesAssetPath,
    thumbPath: traditionsBelgesEtFrancaisesThumbPath
  },
  backgroundPreset: {
      "beerT": 30,
      "bubbleDensity": 46,
      "foamIntensity": 42
  },
  assetsReady: false
});
