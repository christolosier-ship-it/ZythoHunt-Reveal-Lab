const BADGE_ICON_BASE = "assets/badges/icons/";

export function getBadgeIconUrl(number) {
  return `${import.meta.env.BASE_URL}${BADGE_ICON_BASE}${String(number).padStart(3, "0")}.webp`;
}

export function getBadgeFallbackIconUrl() {
  return `${import.meta.env.BASE_URL}${BADGE_ICON_BASE}fallback.webp`;
}

export function installBadgeImageFallback(img, { secret = false } = {}) {
  if (!img) return;
  img.addEventListener("error", () => {
    if (img.dataset.fallbackTried === "true") {
      img.replaceWith(Object.assign(document.createElement("span"), { className: "badge-medal-fallback", textContent: secret ? "❔" : "🏅" }));
      return;
    }
    img.dataset.fallbackTried = "true";
    img.src = getBadgeFallbackIconUrl();
  }, { passive: true });
}
