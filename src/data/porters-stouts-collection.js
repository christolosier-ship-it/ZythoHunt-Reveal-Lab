import collectionJson from "./brassopedie/collection-03-porters-et-stouts.json" with { type: "json" };
import { porterStoutAssetPath, porterStoutCardImages, porterStoutCollectionAssets } from "./card-assets/porters-stouts-assets.js";

export const porterStoutCollection = {
  ...collectionJson.collection,
  id: "porters-stouts",
  name: collectionJson.collection?.nom || "Porters & Stouts",
  subtitle: "Noirs, torréfiés et profonds",
  cardBack: porterStoutAssetPath(porterStoutCollectionAssets.cardBack),
  cardFrame: porterStoutAssetPath(porterStoutCollectionAssets.collectionFace),
  collectionFace: porterStoutAssetPath(porterStoutCollectionAssets.collectionFace),
  cardBackThumb: porterStoutAssetPath(`thumb/${porterStoutCollectionAssets.cardBack}`),
  collectionFaceThumb: porterStoutAssetPath(`thumb/${porterStoutCollectionAssets.collectionFace}`)
};

export const porterStoutCards = collectionJson.cartes.map((entry) => {
  const fileName = porterStoutCardImages[entry.id];
  const image = porterStoutAssetPath(fileName);
  return {
    id: entry.id,
    name: entry.nom,
    type: entry.nature,
    path: entry.parentPrincipalId ? `${entry.parentPrincipalId} › ${entry.nom}` : entry.nom,
    tagline: entry.description,
    image,
    thumbImage: porterStoutAssetPath(`thumb/${fileName}`),
    fullImage: image,
    frame: porterStoutCollection.cardFrame,
    revealable: true,
    aliases: entry.aliases || [],
    brassopedie: entry
  };
});

export const porterStoutCardsById = Object.fromEntries(porterStoutCards.map((card) => [card.id, card]));
export const revealablePorterStoutCards = porterStoutCards.filter((card) => card.revealable);

export function validatePorterStoutCollection() {
  const errors = [];
  const ids = porterStoutCards.map((card) => card.id);
  if (porterStoutCards.length !== 22) errors.push(`Expected 22 cards, got ${porterStoutCards.length}.`);
  if (new Set(ids).size !== ids.length) errors.push("Duplicate card IDs detected.");
  porterStoutCards.forEach((card) => {
    if (!card.image) errors.push(`Missing image for ${card.id}.`);
    if (!card.thumbImage) errors.push(`Missing thumb image for ${card.id}.`);
    if (!card.fullImage) errors.push(`Missing full image for ${card.id}.`);
  });
  Object.keys(porterStoutCardImages).forEach((id) => { if (!porterStoutCardsById[id]) errors.push(`Image mapping references unknown ID ${id}.`); });
  if (!porterStoutCollectionAssets.cardBack) errors.push("Missing collection card back declaration.");
  if (!porterStoutCollectionAssets.collectionFace) errors.push("Missing collection face declaration.");
  if (!porterStoutCollection.cardFrame) errors.push("Missing collection card frame declaration.");
  if (!porterStoutCollection.cardBackThumb) errors.push("Missing collection card back thumbnail declaration.");
  if (!porterStoutCollection.collectionFaceThumb) errors.push("Missing collection face thumbnail declaration.");
  return { valid: errors.length === 0, errors };
}

const validation = validatePorterStoutCollection();
if (!validation.valid && import.meta.env?.DEV) {
  console.error("Invalid Porters & Stouts collection", validation.errors);
}
