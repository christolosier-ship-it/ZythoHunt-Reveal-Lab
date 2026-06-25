import collectionJson from "./brassopedie/collection-04-traditions-belges-et-francaises.json" with { type: "json" };
import { traditionsBelgesEtFrancaisesAssets, traditionsBelgesEtFrancaisesAssetPath, traditionsBelgesEtFrancaisesCardImages, traditionsBelgesEtFrancaisesThumbPath } from "./card-assets/traditions-belges-et-francaises-assets.js";

const traditionsBelgesEtFrancaisesEntries = collectionJson.cartes.map((entry) => entry);

export const traditionsBelgesEtFrancaisesCollection = {
  ...collectionJson.collection,
  id: "traditions-belges-et-francaises",
  name: collectionJson.collection?.nom || "Traditions belges et françaises",
  slug: "traditions-belges-et-francaises",
  subtitle: "17 cartes Brassopédie à illustrer",
  order: 40,
  discoveryKey: "zythohunt.discovery.traditions-belges-et-francaises.v1",
  assetsReady: true,
  cardBack: traditionsBelgesEtFrancaisesAssetPath(traditionsBelgesEtFrancaisesAssets.cardBack),
  cardFrame: traditionsBelgesEtFrancaisesAssetPath(traditionsBelgesEtFrancaisesAssets.collectionFace),
  collectionFace: traditionsBelgesEtFrancaisesAssetPath(traditionsBelgesEtFrancaisesAssets.collectionFace),
  cardBackThumb: traditionsBelgesEtFrancaisesThumbPath(traditionsBelgesEtFrancaisesAssets.cardBack),
  collectionFaceThumb: traditionsBelgesEtFrancaisesThumbPath(traditionsBelgesEtFrancaisesAssets.collectionFace),
  backgroundPreset: {
    beerT: 62,
    bubbleDensity: 62,
    foamIntensity: 70
  },
  cardIds: collectionJson.cartes.map((entry) => entry.id)
};

export const traditionsBelgesEtFrancaisesCards = traditionsBelgesEtFrancaisesEntries.map((entry) => {
  const fileName = traditionsBelgesEtFrancaisesCardImages[entry.id];
  const image = traditionsBelgesEtFrancaisesAssetPath(fileName);
  return {
    id: entry.id,
    name: entry.nom,
    type: entry.nature,
    path: entry.parentPrincipalId ? `${entry.parentPrincipalId} › ${entry.nom}` : entry.nom,
    tagline: entry.description,
    image,
    thumbImage: traditionsBelgesEtFrancaisesThumbPath(fileName),
    fullImage: image,
    frame: traditionsBelgesEtFrancaisesCollection.cardFrame,
    revealable: true,
    aliases: entry.aliases || [],
    brassopedie: entry
  };
});

export const traditionsBelgesEtFrancaisesCardsById = Object.fromEntries(traditionsBelgesEtFrancaisesCards.map((card) => [card.id, card]));
export const revealableTraditionsBelgesEtFrancaisesCards = traditionsBelgesEtFrancaisesCards.filter((card) => card.revealable);

export function validateTraditionsBelgesEtFrancaisesCollection() {
  const errors = [];
  const ids = traditionsBelgesEtFrancaisesCards.map((card) => card.id);
  if (traditionsBelgesEtFrancaisesCards.length !== 17) errors.push(`Expected 17 cards, got ${traditionsBelgesEtFrancaisesCards.length}.`);
  if (new Set(ids).size !== ids.length) errors.push("Duplicate card IDs detected.");
  traditionsBelgesEtFrancaisesCards.forEach((card) => {
    if (!card.image) errors.push(`Missing image for ${card.id}.`);
    if (!card.thumbImage) errors.push(`Missing thumb image for ${card.id}.`);
    if (!card.fullImage) errors.push(`Missing full image for ${card.id}.`);
  });
  Object.keys(traditionsBelgesEtFrancaisesCardImages).forEach((id) => { if (!traditionsBelgesEtFrancaisesCardsById[id]) errors.push(`Image mapping references unknown ID ${id}.`); });
  if (!traditionsBelgesEtFrancaisesAssets.cardBack) errors.push("Missing collection card back declaration.");
  if (!traditionsBelgesEtFrancaisesAssets.collectionFace) errors.push("Missing collection face declaration.");
  if (!traditionsBelgesEtFrancaisesCollection.cardFrame) errors.push("Missing collection card frame declaration.");
  if (!traditionsBelgesEtFrancaisesCollection.cardBackThumb) errors.push("Missing collection card back thumbnail declaration.");
  if (!traditionsBelgesEtFrancaisesCollection.collectionFaceThumb) errors.push("Missing collection face thumbnail declaration.");
  if (!traditionsBelgesEtFrancaisesCollection.discoveryKey) errors.push("Missing discovery key declaration.");
  return { valid: errors.length === 0, errors };
}

export const traditionsBelgesEtFrancaisesBundle = {
  collection: traditionsBelgesEtFrancaisesCollection,
  cards: traditionsBelgesEtFrancaisesCards,
  cardsById: traditionsBelgesEtFrancaisesCardsById,
  revealableCards: revealableTraditionsBelgesEtFrancaisesCards,
  validate: validateTraditionsBelgesEtFrancaisesCollection
};

const validation = validateTraditionsBelgesEtFrancaisesCollection();
if (!validation.valid && import.meta.env?.DEV) {
  console.error("Invalid Traditions belges et françaises collection", validation.errors);
}
