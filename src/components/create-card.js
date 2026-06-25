/** @typedef {any} Any */
import { assetUrl } from "../utils/asset-url.js";
import { FALLBACK_SVG, shouldAttemptImageLoad, useFallbackImage } from "../utils/missing-assets.js";

export function createCardFront({ cardData, frameUrl, imagePath, imageLoading = "eager", imageFetchPriority = "auto", collection = null }) {
  const frontFace = document.createElement("div");
  frontFace.className = "card-face card-front";
  frontFace.setAttribute("aria-hidden", "true");

  if (cardData?.image || imagePath) {
    const illWindow = document.createElement("div");
    illWindow.className = "illustration-window";
    const illImg = document.createElement("img");
    illImg.className = "card-illustration";
    illImg.src = shouldAttemptImageLoad(collection, cardData, "thumb") ? assetUrl(imagePath || cardData.image) : FALLBACK_SVG;
    if (!shouldAttemptImageLoad(collection, cardData, "thumb")) illImg.classList.add("is-missing-asset");
    illImg.alt = cardData.name || "";
    illImg.draggable = false;
    illImg.setAttribute("loading", imageLoading);
    illImg.decoding = "async";
    illImg.setAttribute("fetchpriority", imageFetchPriority);
    illImg.onerror = () => useFallbackImage(illImg);
    illWindow.appendChild(illImg);

    const resolvedFrameUrl = frameUrl || (cardData.frame ? assetUrl(cardData.frame) : null);
    const frameImg = document.createElement("img");
    frameImg.className = "card-frame";
    if (resolvedFrameUrl) frameImg.src = resolvedFrameUrl;
    frameImg.alt = "";
    frameImg.draggable = false;
    frameImg.decoding = "async";
    frameImg.onerror = () => frameImg.remove();

    const copy = document.createElement("div");
    copy.className = "card-copy";
    const nameEl = document.createElement("h2");
    nameEl.className = "card-name";
    nameEl.textContent = cardData.name || "";
    copy.appendChild(nameEl);

    const specular = document.createElement("div");
    specular.className = "card-specular";
    const glowBehind = document.createElement("div");
    glowBehind.className = "card-glow-behind";

    frontFace.append(illWindow, frameImg, copy, specular, glowBehind);
  }
  return frontFace;
}

function createBackFace(backUrl = null, collection = null) {
  const backFace = document.createElement("div");
  backFace.className = "card-face card-back";
  const backImg = document.createElement("img");
  backImg.src = shouldAttemptImageLoad(collection, null, "back") && backUrl ? backUrl : FALLBACK_SVG;
  if (!shouldAttemptImageLoad(collection, null, "back") || !backUrl) backImg.classList.add("is-missing-asset");
  backImg.alt = "";
  backImg.draggable = false;
  backImg.decoding = "async";
  backImg.onerror = () => useFallbackImage(backImg);
  backFace.appendChild(backImg);
  return backFace;
}

function createClickGlow() {
  const glow = document.createElement("span");
  glow.className = "card-click-glow";
  glow.setAttribute("aria-hidden", "true");
  return glow;
}

export function resolveCardFramePath(/** @type {any} */ options = {}) {
  const { cardData, collection, as } = options;
  const isCarousel = as === "carousel";
  if (isCarousel) {
    return cardData?.frameThumb || collection?.collectionFaceThumb || collection?.cardFrame || cardData?.frame || null;
  }
  return cardData?.frame || collection?.cardFrame || null;
}

export function resolveCardBackPath(/** @type {any} */ options = {}) {
  const { collection, as } = options;
  const isCarousel = as === "carousel";
  if (isCarousel) return collection?.cardBackThumb || collection?.cardBack || null;
  return collection?.cardBack || null;
}

export function fitCardName(nameEl, containerEl = nameEl?.parentElement) {
  if (!nameEl || !containerEl) return;

  const title = nameEl.textContent?.trim() || "";
  nameEl.classList.toggle("is-short", title.length <= 10);
  nameEl.classList.toggle("is-long", title.length >= 18);

  const availableWidth = Math.max(1, containerEl.clientWidth * 0.94);
  const availableHeight = Math.max(1, containerEl.clientHeight * 0.88);
  const max = Math.max(12, Math.min(36, availableHeight * 0.72));
  const min = 7;

  nameEl.style.whiteSpace = "nowrap";
  nameEl.style.width = "max-content";
  nameEl.style.maxWidth = "94%";
  nameEl.style.fontSize = `${max}px`;

  for (let size = max; size >= min; size -= 0.5) {
    nameEl.style.fontSize = `${size}px`;
    if (nameEl.scrollWidth <= availableWidth && nameEl.scrollHeight <= availableHeight) break;
  }
}

export function fitAllCardNames(/** @type {any} */ root = document) {
  root.querySelectorAll(".card-name").forEach((nameEl) => fitCardName(nameEl, nameEl.parentElement));
}

function scheduleCardNameFit(root) {
  requestAnimationFrame(() => fitAllCardNames(root));
  document.fonts?.ready.then(() => fitAllCardNames(root)).catch(() => {});
}

export function createCard({ index = 0, cardData, revealable, discovered = false, as = "slot", collection = null }) {
  const wrapper = document.createElement(as === "carousel" ? "div" : "li");
  wrapper.className = as === "carousel" ? "csl-card card-slot" : "card-slot";
  wrapper.setAttribute("role", "listitem");
  wrapper.dataset.index = String(index);
  wrapper.dataset.cardId = cardData?.id || `placeholder-${String(index + 1).padStart(2, "0")}`;

  const card = document.createElement("div");
  card.className = "beer-card csl-card-inner";
  card.classList.add(revealable ? "beer-card--revealable" : "beer-card--locked");
  card.dataset.cardId = wrapper.dataset.cardId;
  card.setAttribute("tabindex", "-1");
  card.setAttribute("role", "button");

  const framePath = resolveCardFramePath({ cardData, collection, as });
  const backPath = resolveCardBackPath({ collection, as });
  const frameUrl = framePath ? assetUrl(framePath) : null;
  const backUrl = backPath ? assetUrl(backPath) : null;
  const frontFace = createCardFront({
    cardData,
    frameUrl,
    imagePath: cardData?.thumbImage || cardData?.image,
    imageLoading: discovered ? "eager" : "lazy",
    imageFetchPriority: discovered ? "high" : "auto",
    collection
  });
  card.append(createBackFace(backUrl, collection), frontFace);
  if (discovered) {
    card.classList.add("beer-card--discovered");
    frontFace.setAttribute("aria-hidden", "false");
    card.style.transform = "rotateY(180deg)";
  }

  if (as === "carousel") wrapper.append(card, createClickGlow());
  else wrapper.appendChild(card);

  scheduleCardNameFit(wrapper);
  return wrapper;
}

export function cloneCardForReveal(cardEl, rect, cardData) {
  const clone = document.createElement("div");
  const frameUrl = cardData?.frame ? assetUrl(cardData.frame) : null;
  clone.className = "beer-card beer-card--clone";
  clone.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;z-index:1000;pointer-events:none;`;
  clone.append(createBackFace(null, null), createCardFront({
    cardData,
    frameUrl,
    imagePath: cardData?.fullImage || cardData?.image,
    imageLoading: "eager",
    imageFetchPriority: "high",
    collection: { assetsReady: true }
  }));
  scheduleCardNameFit(clone);
  return clone;
}
