import collectionJson from "./brassopedie/collection-07-ales-ambrees-brunes-maltees-et-fortes.json" with { type: "json" };
import { createCollectionBundle } from "./create-collection-bundle.js";
import { alesAmbreesBrunesMalteesEtFortesAssets, alesAmbreesBrunesMalteesEtFortesAssetPath, alesAmbreesBrunesMalteesEtFortesCardImages, alesAmbreesBrunesMalteesEtFortesThumbPath } from "./card-assets/ales-ambrees-brunes-maltees-et-fortes-assets.js";

const bundle = createCollectionBundle({
  collectionJson,
  collectionId: "ales-ambrees-brunes-maltees-et-fortes",
  slug: "ales-ambrees-brunes-maltees-et-fortes",
  subtitle: "27 cartes Brassopédie à illustrer",
  order: 70,
  discoveryKey: "zythohunt.discovery.ales-ambrees-brunes-maltees-et-fortes.v1",
  assets: {
    cardImages: alesAmbreesBrunesMalteesEtFortesCardImages,
    collectionAssets: alesAmbreesBrunesMalteesEtFortesAssets,
    assetPath: alesAmbreesBrunesMalteesEtFortesAssetPath,
    thumbPath: alesAmbreesBrunesMalteesEtFortesThumbPath
  },
  backgroundPreset: {
    beerT: 57,
    bubbleDensity: 58,
    foamIntensity: 54
  },
  assetsReady: true
});

export const alesAmbreesBrunesMalteesEtFortesBundle = bundle;
export const alesAmbreesBrunesMalteesEtFortesCollection = bundle.collection;
export const alesAmbreesBrunesMalteesEtFortesCards = bundle.cards;
export const alesAmbreesBrunesMalteesEtFortesCardsById = bundle.cardsById;
export const revealableAlesAmbreesBrunesMalteesEtFortesCards = bundle.revealableCards;
export const validateAlesAmbreesBrunesMalteesEtFortesCollection = bundle.validate;
