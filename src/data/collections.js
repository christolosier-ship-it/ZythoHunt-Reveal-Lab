import { porterStoutCards, porterStoutCollection, porterStoutCardsById, revealablePorterStoutCards, validatePorterStoutCollection } from "./porters-stouts-collection.js";

const porterStoutBundle = {
  collection: {
    ...porterStoutCollection,
    slug: "porters-et-stouts",
    order: 10,
    discoveryKey: "zythohunt.discovery.porters-et-stouts.v1",
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

export const collectionBundles = [porterStoutBundle];
export const collections = collectionBundles.map((bundle) => bundle.collection);
