export function slugifyCollectionId(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " et ")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function createCollectionBundle({
  collectionJson,
  collectionId,
  slug,
  subtitle,
  order,
  discoveryKey,
  assets,
  backgroundPreset,
  assetsReady
}) {
  const sourceCollection = collectionJson.collection || {};
  const normalizedSlug = slug || sourceCollection.slug || slugifyCollectionId(sourceCollection.nom);
  const cardBack = assets.assetPath(assets.collectionAssets.cardBack);
  const collectionFace = assets.assetPath(assets.collectionAssets.collectionFace);
  const collection = {
    ...sourceCollection,
    id: collectionId || normalizedSlug,
    slug: normalizedSlug,
    name: sourceCollection.nom || normalizedSlug,
    subtitle,
    order,
    discoveryKey,
    assetsReady: Boolean(assetsReady),
    cardBack,
    cardFrame: collectionFace,
    collectionFace,
    cardBackThumb: assets.thumbPath(assets.collectionAssets.cardBack),
    collectionFaceThumb: assets.thumbPath(assets.collectionAssets.collectionFace),
    backgroundPreset,
    cardIds: collectionJson.cartes.map((entry) => entry.id)
  };

  const cards = collectionJson.cartes.map((entry) => {
    const fileName = assets.cardImages[entry.id];
    const image = assets.assetPath(fileName);
    return {
      id: entry.id,
      name: entry.nom,
      type: entry.nature,
      path: entry.parentPrincipalId ? `${entry.parentPrincipalId} › ${entry.nom}` : entry.nom,
      tagline: entry.description,
      image,
      thumbImage: assets.thumbPath(fileName),
      fullImage: image,
      frame: collection.cardFrame,
      revealable: true,
      aliases: entry.aliases || [],
      brassopedie: entry
    };
  });

  const cardsById = Object.fromEntries(cards.map((card) => [card.id, card]));
  const revealableCards = cards.filter((card) => card.revealable);

  function validate() {
    const errors = [];
    const ids = cards.map((card) => card.id);
    if (new Set(ids).size !== ids.length) errors.push(`Duplicate card IDs detected in ${collection.id}.`);
    cards.forEach((card) => {
      if (!card.image) errors.push(`Missing image for ${card.id}.`);
      if (!card.thumbImage) errors.push(`Missing thumb image for ${card.id}.`);
      if (!card.fullImage) errors.push(`Missing full image for ${card.id}.`);
    });
    Object.keys(assets.cardImages).forEach((id) => {
      if (!cardsById[id]) errors.push(`Image mapping references unknown ID ${id}.`);
    });
    if (!collection.discoveryKey) errors.push(`Missing discovery key for ${collection.id}.`);
    if (!collection.backgroundPreset) errors.push(`Missing background preset for ${collection.id}.`);
    return { valid: errors.length === 0, errors };
  }

  return { collection, cards, cardsById, revealableCards, validate };
}
