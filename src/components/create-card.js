/** @typedef {any} Any */
import { CARD_BACK_URL, CARD_FRAME_URL } from "../utils/preload-assets.js";
import { assetUrl } from "../utils/asset-url.js";

export function createCardFront({ cardData, frameUrl = CARD_FRAME_URL }) {
  const frontFace = document.createElement("div");
  frontFace.className = "card-face card-front";
  frontFace.setAttribute("aria-hidden", "true");

  if (cardData?.image) {
    const illWindow = document.createElement("div");
    illWindow.className = "illustration-window";
    const illImg = document.createElement("img");
    illImg.className = "card-illustration";
    illImg.src = assetUrl(cardData.image);
    illImg.alt = cardData.name || "";
    illImg.draggable = false;
    illWindow.appendChild(illImg);

    const frameImg = document.createElement("img");
    frameImg.className = "card-frame";
    frameImg.src = frameUrl;
    frameImg.alt = "";
    frameImg.draggable = false;

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

function createBackFace() {
  const backFace = document.createElement("div");
  backFace.className = "card-face card-back";
  const backImg = document.createElement("img");
  backImg.src = CARD_BACK_URL;
  backImg.alt = "";
  backImg.draggable = false;
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

  const frameUrl = collection?.cardFrame ? assetUrl(collection.cardFrame) : CARD_FRAME_URL;
  const frontFace = createCardFront({ cardData, frameUrl });
  card.append(createBackFace(), frontFace);
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
  clone.className = "beer-card beer-card--clone";
  clone.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;z-index:1000;pointer-events:none;`;
  clone.append(createBackFace(), createCardFront({ cardData, frameUrl: CARD_FRAME_URL }));
  scheduleCardNameFit(clone);
  return clone;
}
