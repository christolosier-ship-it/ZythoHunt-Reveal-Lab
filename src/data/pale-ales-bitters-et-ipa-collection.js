import collectionJson from "./brassopedie/collection-02-pale-ales-bitters-et-ipa.json" with { type: "json" };
import { paleAlesBittersEtIpaAssets, paleAlesBittersEtIpaAssetPath, paleAlesBittersEtIpaCardImages, paleAlesBittersEtIpaThumbPath } from "./card-assets/pale-ales-bitters-et-ipa-assets.js";

const paleAlesBittersEtIpaEntries = collectionJson.cartes.map((entry) => entry);

export const paleAlesBittersEtIpaCollection = {
  ...collectionJson.collection,
  id: "pale-ales-bitters-et-ipa",
  name: collectionJson.collection?.nom || "Pale Ales, Bitters et IPA",
  subtitle: "36 cartes Brassopédie à illustrer",
  slug: "pale-ales-bitters-et-ipa",
  order: 20,
  discoveryKey: "zythohunt.discovery.pale-ales-bitters-et-ipa.v1",
  assetsReady: true,
  cardBack: paleAlesBittersEtIpaAssetPath(paleAlesBittersEtIpaAssets.cardBack),
  cardFrame: paleAlesBittersEtIpaAssetPath(paleAlesBittersEtIpaAssets.collectionFace),
  collectionFace: paleAlesBittersEtIpaAssetPath(paleAlesBittersEtIpaAssets.collectionFace),
  cardBackThumb: paleAlesBittersEtIpaThumbPath(paleAlesBittersEtIpaAssets.cardBack),
  collectionFaceThumb: paleAlesBittersEtIpaThumbPath(paleAlesBittersEtIpaAssets.collectionFace),
  backgroundPreset: {
    beerT: 72,
    bubbleDensity: 58,
    foamIntensity: 48
  },
  cardIds: paleAlesBittersEtIpaEntries.map((entry) => entry.id)
};

export const paleAlesBittersEtIpaCards = paleAlesBittersEtIpaEntries.map((entry) => {
  const fileName = paleAlesBittersEtIpaCardImages[entry.id];
  const image = paleAlesBittersEtIpaAssetPath(fileName);
  return {
    id: entry.id,
    name: entry.nom,
    type: entry.nature,
    path: entry.parentPrincipalId ? `${entry.parentPrincipalId} › ${entry.nom}` : entry.nom,
    tagline: entry.description,
    image,
    thumbImage: paleAlesBittersEtIpaThumbPath(fileName),
    fullImage: image,
    frame: paleAlesBittersEtIpaCollection.cardFrame,
    revealable: true,
    aliases: entry.aliases || [],
    brassopedie: entry
  };
});

export const paleAlesBittersEtIpaCardsById = Object.fromEntries(paleAlesBittersEtIpaCards.map((card) => [card.id, card]));
export const revealablePaleAlesBittersEtIpaCards = paleAlesBittersEtIpaCards.filter((card) => card.revealable);

export function validatePaleAlesBittersEtIpaCollection() {
  const errors = [];
  const ids = paleAlesBittersEtIpaCards.map((card) => card.id);
  if (paleAlesBittersEtIpaCards.length !== 36) errors.push(`Expected 36 cards, got ${paleAlesBittersEtIpaCards.length}.`);
  if (new Set(ids).size !== ids.length) errors.push("Duplicate card IDs detected.");
  paleAlesBittersEtIpaCards.forEach((card) => {
    if (!card.image) errors.push(`Missing image for ${card.id}.`);
    if (!card.thumbImage) errors.push(`Missing thumb image for ${card.id}.`);
    if (!card.fullImage) errors.push(`Missing full image for ${card.id}.`);
  });
  Object.keys(paleAlesBittersEtIpaCardImages).forEach((id) => { if (!paleAlesBittersEtIpaCardsById[id]) errors.push(`Image mapping references unknown ID ${id}.`); });
  if (!paleAlesBittersEtIpaAssets.cardBack) errors.push("Missing collection card back declaration.");
  if (!paleAlesBittersEtIpaAssets.collectionFace) errors.push("Missing collection face declaration.");
  if (!paleAlesBittersEtIpaCollection.cardFrame) errors.push("Missing collection card frame declaration.");
  if (!paleAlesBittersEtIpaCollection.cardBackThumb) errors.push("Missing collection card back thumbnail declaration.");
  if (!paleAlesBittersEtIpaCollection.collectionFaceThumb) errors.push("Missing collection face thumbnail declaration.");
  if (!paleAlesBittersEtIpaCollection.discoveryKey) errors.push("Missing discovery key.");
  if (!paleAlesBittersEtIpaCollection.backgroundPreset) errors.push("Missing background preset.");
  return { valid: errors.length === 0, errors };
}

const validation = validatePaleAlesBittersEtIpaCollection();
if (!validation.valid && import.meta.env?.DEV) {
  console.error("Invalid Pale Ales, Bitters et IPA collection", validation.errors);
}

export const paleAlesBittersEtIpaBundle = {
  collection: paleAlesBittersEtIpaCollection,
  cards: paleAlesBittersEtIpaCards,
  cardsById: paleAlesBittersEtIpaCardsById,
  revealableCards: revealablePaleAlesBittersEtIpaCards,
  validate: validatePaleAlesBittersEtIpaCollection
};
