import collectionJson from "../../docs/active/collection-01-lagers-et-fermentations-basses.json" with { type: "json" };
import { createCollectionBundle } from "./create-collection-bundle.js";
import { lagersEtFermentationsBassesAssets, lagersEtFermentationsBassesAssetPath, lagersEtFermentationsBassesCardImages, lagersEtFermentationsBassesThumbPath } from "./card-assets/lagers-et-fermentations-basses-assets.js";

export const lagersEtFermentationsBassesBundle = createCollectionBundle({
  collectionJson,
  collectionId: "lagers-et-fermentations-basses",
  slug: "lagers-et-fermentations-basses",
  subtitle: "45 cartes Brassopédie à illustrer",
  order: 10,
  discoveryKey: "zythohunt.discovery.lagers-et-fermentations-basses.v1",
  assets: {
    cardImages: lagersEtFermentationsBassesCardImages,
    collectionAssets: lagersEtFermentationsBassesAssets,
    assetPath: lagersEtFermentationsBassesAssetPath,
    thumbPath: lagersEtFermentationsBassesThumbPath
  },
  backgroundPreset: {
      "beerT": 12,
      "bubbleDensity": 38,
      "foamIntensity": 34
  },
  assetsReady: false
});
