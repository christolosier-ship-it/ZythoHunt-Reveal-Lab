const PENDING_REVEAL_STORAGE_KEY = "zythohunt.pendingReveal.v1";

export function setPendingReveal(match) {
  try {
    localStorage.setItem(PENDING_REVEAL_STORAGE_KEY, JSON.stringify({ collectionId: match.collectionId, cardId: match.cardId }));
  } catch {}
}

export function takePendingReveal() {
  try {
    const value = JSON.parse(localStorage.getItem(PENDING_REVEAL_STORAGE_KEY) || "null");
    localStorage.removeItem(PENDING_REVEAL_STORAGE_KEY);
    return value && value.collectionId && value.cardId ? value : null;
  } catch {
    return null;
  }
}

export function clearPendingReveal() {
  try {
    localStorage.removeItem(PENDING_REVEAL_STORAGE_KEY);
  } catch {}
}
