import { createDiscoveryStore } from "./discovery-store.js";

export function createDiscoveryRegistry(collectionBundles = []) {
  let stores = new Map();

  function buildStores() {
    stores = new Map(collectionBundles.map(({ collection }) => [
      collection.id,
      createDiscoveryStore({ key: collection.discoveryKey })
    ]));
  }

  function findBundle(collectionId) {
    return collectionBundles.find((bundle) => bundle.collection.id === collectionId);
  }

  function getStore(collectionId) {
    return stores.get(collectionId);
  }

  buildStores();

  return {
    refresh() {
      buildStores();
      return this;
    },
    isDiscovered(collectionId, cardId) {
      return Boolean(getStore(collectionId)?.isDiscovered(cardId));
    },
    getDiscoveredIds(collectionId) {
      const revealableIds = new Set((findBundle(collectionId)?.revealableCards || []).map((card) => card.id));
      return (getStore(collectionId)?.getDiscoveredIds() || []).filter((id) => revealableIds.has(id));
    },
    getCollectionProgress(collectionId) {
      const total = findBundle(collectionId)?.revealableCards?.length || 0;
      const discovered = this.getDiscoveredIds(collectionId).length;
      return { discovered, total, ratio: total ? discovered / total : 0 };
    },
    getTotalProgress() {
      return collectionBundles.reduce((acc, { collection }) => {
        const progress = this.getCollectionProgress(collection.id);
        acc.discovered += progress.discovered;
        acc.total += progress.total;
        acc.ratio = acc.total ? acc.discovered / acc.total : 0;
        return acc;
      }, { discovered: 0, total: 0, ratio: 0 });
    }
  };
}
