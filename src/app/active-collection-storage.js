const ACTIVE_COLLECTION_STORAGE_KEY = "zythohunt.activeCollectionId.v1";

export function getStoredActiveCollectionId() {
  try {
    return localStorage.getItem(ACTIVE_COLLECTION_STORAGE_KEY) || undefined;
  } catch {
    return undefined;
  }
}

export function setStoredActiveCollectionId(collectionId) {
  try {
    localStorage.setItem(ACTIVE_COLLECTION_STORAGE_KEY, collectionId);
  } catch {}
}

export function clearStoredActiveCollectionId() {
  try {
    localStorage.removeItem(ACTIVE_COLLECTION_STORAGE_KEY);
  } catch {}
}
