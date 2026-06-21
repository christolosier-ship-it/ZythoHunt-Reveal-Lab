import { porterStoutCards, porterStoutCollection } from "./porters-stouts-collection.js";

export const collections = [
  {
    ...porterStoutCollection,
    order: 10,
    cardIds: porterStoutCards.map((card) => card.id)
  }
];
