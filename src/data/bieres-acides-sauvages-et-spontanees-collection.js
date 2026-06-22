import collectionJson from "../../docs/active/collection-06-bieres-acides-sauvages-et-spontanees.json" with { type: "json" };
import { createCollectionBundle } from "./create-collection-bundle.js";
import { bieresAcidesSauvagesEtSpontaneesAssets, bieresAcidesSauvagesEtSpontaneesAssetPath, bieresAcidesSauvagesEtSpontaneesCardImages, bieresAcidesSauvagesEtSpontaneesThumbPath } from "./card-assets/bieres-acides-sauvages-et-spontanees-assets.js";

export const bieresAcidesSauvagesEtSpontaneesBundle = createCollectionBundle({
  collectionJson,
  collectionId: "bieres-acides-sauvages-et-spontanees",
  slug: "bieres-acides-sauvages-et-spontanees",
  subtitle: "21 cartes Brassopédie à illustrer",
  order: 60,
  discoveryKey: "zythohunt.discovery.bieres-acides-sauvages-et-spontanees.v1",
  assets: {
    cardImages: bieresAcidesSauvagesEtSpontaneesCardImages,
    collectionAssets: bieresAcidesSauvagesEtSpontaneesAssets,
    assetPath: bieresAcidesSauvagesEtSpontaneesAssetPath,
    thumbPath: bieresAcidesSauvagesEtSpontaneesThumbPath
  },
  backgroundPreset: {
      "beerT": 48,
      "bubbleDensity": 54,
      "foamIntensity": 50
  },
  assetsReady: false
});
