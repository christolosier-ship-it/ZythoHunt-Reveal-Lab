/** @typedef {any} Any */
import { CARD_BACK_URL, CARD_FRAME_URL } from "../utils/preload-assets.js";
import { assetUrl } from "../utils/asset-url.js";

const PLACEHOLDER_STYLE = [
  "width:100%",
  "height:100%",
  "display:grid",
  "place-items:center",
  "border-radius:inherit",
  "background:#120904",
  "border:1px solid rgba(232,160,64,.28)",
  "color:#e8a040",
  "font-family:var(--font-serif)",
  "font-size:clamp(2rem,12vw,5rem)",
  "font-weight:700",
  "line-height:1",
  "user-select:none",
  "pointer-events:none"
].join(";");

function createAssetPlaceholder(label = "Image à venir") {
  const placeholder = document.createElement("div");
  placeholder.className = "asset-placeholder";
  placeholder.style.cssText = PLACEHOLDER_STYLE;
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", label);
  placeholder.textContent = "?";
  return placeholder;
}

function replaceWithPlaceholder(img, label) {
  const placeholder = createAssetPlaceholder(label);
  img.replaceWith(placeholder);
}

function bindMissingImagePlaceholder(img, label) {
  img.addEventListener("error", () => replaceWithPlaceholder(img, label), { once: true });
  return img;
}

export function createCardFront({ cardData, frameUrl, imagePath, framePath, imageLoading = "eager", imageFetchPriority = "auto" }) {
  const frontFace = document.createElement("div");
  frontFace.className = "card-face card-front";
  frontFace.setAttribute("aria-hidden", "true");

  const illWindow = document.createElement("div");
  illWindow.className = "illustration-window";
  const resolvedImagePath = imagePath || cardData?.image;
  if (resolvedImagePath) {
    const illImg = document.createElement("img");
    illImg.className = "card-illustration";
    illImg.src = assetUrl(resolvedImagePath);
    illImg.alt = cardData?.name || "";
    illImg.draggable = false;
    illImg.setAttribute("loading", imageLoading);
    illImg.decoding = "async";
    illImg.setAttribute("fetchpriority", imageFetchPriority);
    bindMissingImagePlaceholder(illImg, `Image à venir : ${cardData?.name || "carte"}`);
    illWindow.appendChild(illImg);
  } else {
    illWindow.appendChild(createAssetPlaceholder(`Image à venir : ${cardData?.name || "carte"}`));
  }

  const resolvedFrameUrl = frameUrl || (framePath ? assetUrl(framePath) : cardData?.frame ? assetUrl(cardData.frame) : CARD_FRAME_URL);
  const frameImg = document.createElement("img");
  frameImg.className = "card-frame";
  frameImg.src = resolvedFrameUrl;
  frameImg.alt = "";
  frameImg.draggable = false;
  frameImg.decoding = "async";
  frameImg.addEventListener("error", () => {
    frontFace.classList.add("has-missing-frame");
    frameImg.remove();
  }, { once: true });

  const copy = document.createElement("div");
  copy.className = "card-copy";
  const nameEl = document.createElement("h2");
  nameEl.className = "card-name";
  nameEl.textContent = cardData?.name || "";
  copy.appendChild(nameEl);

  const specular = document.createElement("div");
  specular.className = "card-specular";
  const glowBehind = document.createElement("div");
  glowBehind.className = "card-glow-behind";

  frontFace.append(illWindow, frameImg, copy, specular, glowBehind);
  return frontFace;
}

function createBackFace(backUrl = CARD_BACK_URL) {
  const backFace = document.createElement("div");
  backFace.className = "card-face card-back";
  const backImg = document.createElement("img");
  backImg.src = backUrl;
  backImg.alt = "";
  backImg.draggable = false;
  backImg.decoding = "async";
  bindMissingImagePlaceholder(backImg, "Dos de carte à venir");
  backFace.appendChild(backImg);
  return backFace;
}

function createClickGlow() {
  const glow = document.createElement("span");
  glow.className = "card-click-glow";
  glow.setAttribute("aria-hidden", "true");
  return glow;
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

  const frameUrl = cardData?.frame ? assetUrl(cardData.frame) : collection?.cardFrame ? assetUrl(collection.cardFrame) : CARD_FRAME_URL;
  const backUrl = collection?.cardBack ? assetUrl(collection.cardBack) : CARD_BACK_URL;
  const frontFace = createCardFront({
    cardData,
    frameUrl,
    imagePath: cardData?.thumbImage || cardData?.image,
    imageLoading: discovered ? "eager" : "lazy",
    imageFetchPriority: discovered ? "high" : "auto"
  });
  card.append(createBackFace(backUrl), frontFace);
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
  const frameUrl = cardData?.frame ? assetUrl(cardData.frame) : CARD_FRAME_URL;
  clone.className = "beer-card beer-card--clone";
  clone.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;z-index:1000;pointer-events:none;`;
  clone.append(createBackFace(), createCardFront({
    cardData,
    frameUrl,
    imagePath: cardData?.fullImage || cardData?.image,
    imageLoading: "eager",
    imageFetchPriority: "high"
  }));
  scheduleCardNameFit(clone);
  return clone;
}
