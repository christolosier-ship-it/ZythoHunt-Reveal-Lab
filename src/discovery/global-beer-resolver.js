import { normalizeBeerName } from "./normalize-text.js";

export function createGlobalBeerResolver(collectionBundles, preferredCollectionId) {
  const aliases = new Map();
  collectionBundles.forEach((bundle) => {
    bundle.revealableCards.forEach((card) => {
      [card.name, ...(card.aliases || [])].forEach((alias) => {
        const key = normalizeBeerName(alias);
        if (!aliases.has(key)) aliases.set(key, []);
        aliases.get(key).push({
          collectionId: bundle.collection.id,
          collectionName: bundle.collection.name || bundle.collection.nom || bundle.collection.id,
          cardId: card.id,
          cardName: card.name
        });
      });
    });
  });

  return {
    resolve(input) {
      const matches = aliases.get(normalizeBeerName(input)) || [];
      if (!matches.length) return { status: "unknown" };
      const match = matches.find((candidate) => candidate.collectionId === preferredCollectionId) || matches[0];
      return { status: "matched", ...match, matches };
    }
  };
}
