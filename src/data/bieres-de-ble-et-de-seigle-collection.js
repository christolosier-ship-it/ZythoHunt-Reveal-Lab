import collectionJson from "../../docs/active/collection-05-bieres-de-ble-et-de-seigle.json" with { type: "json" };
import { createCollectionBundle } from "./create-collection-bundle.js";
import { bieresDeBleEtDeSeigleAssets, bieresDeBleEtDeSeigleAssetPath, bieresDeBleEtDeSeigleCardImages, bieresDeBleEtDeSeigleThumbPath } from "./card-assets/bieres-de-ble-et-de-seigle-assets.js";

export const bieresDeBleEtDeSeigleBundle = createCollectionBundle({
  collectionJson,
  collectionId: "bieres-de-ble-et-de-seigle",
  slug: "bieres-de-ble-et-de-seigle",
  subtitle: "13 cartes Brassopédie à illustrer",
  order: 50,
  discoveryKey: "zythohunt.discovery.bieres-de-ble-et-de-seigle.v1",
  assets: {
    cardImages: bieresDeBleEtDeSeigleCardImages,
    collectionAssets: bieresDeBleEtDeSeigleAssets,
    assetPath: bieresDeBleEtDeSeigleAssetPath,
    thumbPath: bieresDeBleEtDeSeigleThumbPath
  },
  backgroundPreset: {
    beerT: 92,
    bubbleDensity: 66,
    foamIntensity: 72
  },
  assetsReady: true
});