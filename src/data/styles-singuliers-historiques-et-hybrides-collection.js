import collectionJson from "./brassopedie/collection-08-styles-singuliers-historiques-et-hybrides.json" with { type: "json" };
import { stylesSinguliersHistoriquesEtHybridesAssets, stylesSinguliersHistoriquesEtHybridesAssetPath, stylesSinguliersHistoriquesEtHybridesCardImages, stylesSinguliersHistoriquesEtHybridesThumbPath } from "./card-assets/styles-singuliers-historiques-et-hybrides-assets.js";

const stylesSinguliersHistoriquesEtHybridesEntries = collectionJson.cartes.map((entry) => entry);

export const stylesSinguliersHistoriquesEtHybridesCollection = {
  ...collectionJson.collection,
  id: "styles-singuliers-historiques-et-hybrides",
  slug: "styles-singuliers-historiques-et-hybrides",
  name: collectionJson.collection?.nom || "Styles singuliers, historiques et hybrides",
  subtitle: "40 cartes Brassopédie à illustrer",
  order: 80,
  discoveryKey: "zythohunt.discovery.styles-singuliers-historiques-et-hybrides.v1",
  assetsReady: true,
  cardBack: stylesSinguliersHistoriquesEtHybridesAssetPath(stylesSinguliersHistoriquesEtHybridesAssets.cardBack),
  cardFrame: stylesSinguliersHistoriquesEtHybridesAssetPath(stylesSinguliersHistoriquesEtHybridesAssets.collectionFace),
  collectionFace: stylesSinguliersHistoriquesEtHybridesAssetPath(stylesSinguliersHistoriquesEtHybridesAssets.collectionFace),
  cardBackThumb: stylesSinguliersHistoriquesEtHybridesThumbPath(stylesSinguliersHistoriquesEtHybridesAssets.cardBack),
  collectionFaceThumb: stylesSinguliersHistoriquesEtHybridesThumbPath(stylesSinguliersHistoriquesEtHybridesAssets.collectionFace),
  backgroundPreset: {
    beerT: 50,
    bubbleDensity: 50,
    foamIntensity: 50
  },
  cardIds: stylesSinguliersHistoriquesEtHybridesEntries.map((entry) => entry.id)
};

export const stylesSinguliersHistoriquesEtHybridesCards = stylesSinguliersHistoriquesEtHybridesEntries.map((entry) => {
  const fileName = stylesSinguliersHistoriquesEtHybridesCardImages[entry.id];
  const image = stylesSinguliersHistoriquesEtHybridesAssetPath(fileName);
  return {
    id: entry.id,
    name: entry.nom,
    type: entry.nature,
    path: entry.parentPrincipalId ? `${entry.parentPrincipalId} › ${entry.nom}` : entry.nom,
    tagline: entry.description,
    image,
    thumbImage: stylesSinguliersHistoriquesEtHybridesThumbPath(fileName),
    fullImage: image,
    frame: stylesSinguliersHistoriquesEtHybridesCollection.cardFrame,
    revealable: true,
    aliases: entry.aliases || [],
    brassopedie: entry
  };
});

export const stylesSinguliersHistoriquesEtHybridesCardsById = Object.fromEntries(
  stylesSinguliersHistoriquesEtHybridesCards.map((card) => [card.id, card])
);
export const revealableStylesSinguliersHistoriquesEtHybridesCards = stylesSinguliersHistoriquesEtHybridesCards.filter(
  (card) => card.revealable
);

export function validateStylesSinguliersHistoriquesEtHybridesCollection() {
  const errors = [];
  const ids = stylesSinguliersHistoriquesEtHybridesCards.map((card) => card.id);
  if (stylesSinguliersHistoriquesEtHybridesCards.length !== 40) errors.push(`Expected 40 cards, got ${stylesSinguliersHistoriquesEtHybridesCards.length}.`);
  if (new Set(ids).size !== ids.length) errors.push("Duplicate card IDs detected.");
  stylesSinguliersHistoriquesEtHybridesCards.forEach((card) => {
    if (!card.image) errors.push(`Missing image for ${card.id}.`);
    if (!card.thumbImage) errors.push(`Missing thumb image for ${card.id}.`);
    if (!card.fullImage) errors.push(`Missing full image for ${card.id}.`);
  });
  Object.keys(stylesSinguliersHistoriquesEtHybridesCardImages).forEach((id) => {
    if (!stylesSinguliersHistoriquesEtHybridesCardsById[id]) errors.push(`Image mapping references unknown ID ${id}.`);
  });
  if (!stylesSinguliersHistoriquesEtHybridesCollection.discoveryKey) errors.push("Missing collection discovery key.");
  if (!stylesSinguliersHistoriquesEtHybridesCollection.backgroundPreset) errors.push("Missing collection background preset.");
  if (!stylesSinguliersHistoriquesEtHybridesAssets.cardBack) errors.push("Missing collection card back declaration.");
  if (!stylesSinguliersHistoriquesEtHybridesAssets.collectionFace) errors.push("Missing collection face declaration.");
  return { valid: errors.length === 0, errors };
}

export const stylesSinguliersHistoriquesEtHybridesBundle = {
  collection: stylesSinguliersHistoriquesEtHybridesCollection,
  cards: stylesSinguliersHistoriquesEtHybridesCards,
  cardsById: stylesSinguliersHistoriquesEtHybridesCardsById,
  revealableCards: revealableStylesSinguliersHistoriquesEtHybridesCards,
  validate: validateStylesSinguliersHistoriquesEtHybridesCollection
};

const validation = validateStylesSinguliersHistoriquesEtHybridesCollection();
if (!validation.valid && import.meta.env?.DEV) {
  console.error("Invalid Styles singuliers, historiques et hybrides collection", validation.errors);
}
