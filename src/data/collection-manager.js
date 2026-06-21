export function createCollectionManager(collectionBundles, { initialCollectionId } = {}) {
  const orderedBundles = [...collectionBundles].sort((a, b) => (a.collection.order || 0) - (b.collection.order || 0));
  const bundlesById = new Map(orderedBundles.map((bundle) => [bundle.collection.id, bundle]));
  let activeCollectionId = initialCollectionId || orderedBundles[0]?.collection.id || null;

  function getActiveBundle() {
    const bundle = activeCollectionId ? bundlesById.get(activeCollectionId) : null;
    if (!bundle) throw new Error(`Unknown active collection: ${activeCollectionId}`);
    return bundle;
  }

  return {
    listCollections: () => orderedBundles.map((bundle) => bundle.collection),
    getActiveCollectionId: () => activeCollectionId,
    getActiveBundle,
    getActiveCollection: () => getActiveBundle().collection,
    setActiveCollection(collectionId) {
      if (!bundlesById.has(collectionId)) return { status: "missing", collectionId };
      activeCollectionId = collectionId;
      return { status: "active", collectionId, bundle: getActiveBundle() };
    }
  };
}

export function validateCollectionBundle(bundle) {
  const errors = [];
  if (!bundle?.collection?.id) errors.push("Missing collection id.");
  if (!bundle?.collection?.discoveryKey) errors.push(`Missing discovery key for ${bundle?.collection?.id || "unknown collection"}.`);
  if (!Array.isArray(bundle?.cards)) errors.push("Missing cards array.");
  if (!bundle?.cardsById || typeof bundle.cardsById !== "object") errors.push("Missing cardsById mapping.");
  if (!Array.isArray(bundle?.revealableCards)) errors.push("Missing revealable cards array.");

  const validation = bundle?.validate?.();
  if (validation && !validation.valid) errors.push(...validation.errors);

  return { valid: errors.length === 0, errors };
}
