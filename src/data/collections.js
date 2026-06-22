import { porterStoutCards, porterStoutCollection, porterStoutCardsById, revealablePorterStoutCards, validatePorterStoutCollection } from "./porters-stouts-collection.js";
import { lagersEtFermentationsBassesBundle } from "./lagers-et-fermentations-basses-collection.js";
import { paleAlesBittersEtIpaBundle } from "./pale-ales-bitters-et-ipa-collection.js";
import { traditionsBelgesEtFrancaisesBundle } from "./traditions-belges-et-francaises-collection.js";
import { bieresDeBleEtDeSeigleBundle } from "./bieres-de-ble-et-de-seigle-collection.js";
import { bieresAcidesSauvagesEtSpontaneesBundle } from "./bieres-acides-sauvages-et-spontanees-collection.js";
import { alesAmbreesBrunesMalteesEtFortesBundle } from "./ales-ambrees-brunes-maltees-et-fortes-collection.js";
import { stylesSinguliersHistoriquesEtHybridesBundle } from "./styles-singuliers-historiques-et-hybrides-collection.js";
import { appellationsCommercialesBundle } from "./appellations-commerciales-collection.js";

const porterStoutBundle = {
  collection: {
    ...porterStoutCollection,
    slug: "porters-et-stouts",
    order: 30,
    discoveryKey: "zythohunt.discovery.porters-et-stouts.v1",
    assetsReady: true,
    cardIds: porterStoutCards.map((card) => card.id),
    backgroundPreset: {
      beerT: 0,
      bubbleDensity: 50,
      foamIntensity: 55
    }
  },
  cards: porterStoutCards,
  cardsById: porterStoutCardsById,
  revealableCards: revealablePorterStoutCards,
  validate: validatePorterStoutCollection
};

export const collectionBundles = [
  lagersEtFermentationsBassesBundle,
  paleAlesBittersEtIpaBundle,
  porterStoutBundle,
  traditionsBelgesEtFrancaisesBundle,
  bieresDeBleEtDeSeigleBundle,
  bieresAcidesSauvagesEtSpontaneesBundle,
  alesAmbreesBrunesMalteesEtFortesBundle,
  stylesSinguliersHistoriquesEtHybridesBundle,
  appellationsCommercialesBundle
];
export const collections = collectionBundles.map((bundle) => bundle.collection);
export const readyCollectionBundles = collectionBundles.filter((bundle) => bundle.collection.assetsReady);
export const pendingCollectionBundles = collectionBundles.filter((bundle) => !bundle.collection.assetsReady);
