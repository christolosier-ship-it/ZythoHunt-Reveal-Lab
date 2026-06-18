import { normalizeBeerName } from "./normalize-text.js";

export function createBeerResolver(cards) {
  const aliases = new Map();
  cards.filter((card) => card.revealable).forEach((card) => {
    [card.name, ...(card.aliases || [])].forEach((alias) => aliases.set(normalizeBeerName(alias), card.id));
  });
  return {
    resolve(input) {
      const cardId = aliases.get(normalizeBeerName(input));
      return cardId ? { status: "matched", cardId } : { status: "unknown" };
    }
  };
}
