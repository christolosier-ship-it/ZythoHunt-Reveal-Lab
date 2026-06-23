import collectionJson from "../../docs/active/collection-08-styles-singuliers-historiques-et-hybrides.json" with { type: "json" };
import { createCollectionBundle } from "./create-collection-bundle.js";
import { stylesSinguliersHistoriquesEtHybridesAssets, stylesSinguliersHistoriquesEtHybridesAssetPath, stylesSinguliersHistoriquesEtHybridesCardImages, stylesSinguliersHistoriquesEtHybridesThumbPath } from "./card-assets/styles-singuliers-historiques-et-hybrides-assets.js";

export const stylesSinguliersHistoriquesEtHybridesBundle = createCollectionBundle({
  collectionJson,
  collectionId: "styles-singuliers-historiques-et-hybrides",
  slug: "styles-singuliers-historiques-et-hybrides",
  subtitle: "40 cartes Brassopédie à illustrer",
  order: 80,
  discoveryKey: "zythohunt.discovery.styles-singuliers-historiques-et-hybrides.v1",
  assets: {
    cardImages: stylesSinguliersHistoriquesEtHybridesCardImages,
    collectionAssets: stylesSinguliersHistoriquesEtHybridesAssets,
    assetPath: stylesSinguliersHistoriquesEtHybridesAssetPath,
    thumbPath: stylesSinguliersHistoriquesEtHybridesThumbPath
  },
  backgroundPreset: {
    beerT: 50,
    bubbleDensity: 50,
    foamIntensity: 50
  },
  assetsReady: false
});
