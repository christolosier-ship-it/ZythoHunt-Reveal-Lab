import { CARD_BACK_URL, CARD_FRAME_URL } from "../utils/preload-assets.js";
import { assetUrl } from "../utils/asset-url.js";

/**
 * Creates a single card DOM element.
 *
 * @param {object} options
 * @param {number} options.index   – position in the 9-card grid (0-8)
 * @param {object|null} options.cardData – card data object (null for decorative)
 * @param {boolean} options.revealable – whether this card can be revealed
 * @returns {HTMLElement}
 */
export function createCard({ index = 0, cardData, revealable, discovered = false, as = "slot", collection = null }) {
  const wrapper = document.createElement(as === "carousel" ? "div" : "li");
  wrapper.className = as === "carousel" ? "csl-card card-slot" : "card-slot";
  wrapper.setAttribute("role", "listitem");
  wrapper.dataset.index = index;

  const card = document.createElement("div");
  card.className = "beer-card csl-card-inner";
  if (revealable) card.classList.add("beer-card--revealable");
  else card.classList.add("beer-card--locked");
  card.dataset.cardId = cardData?.id || `placeholder-${String(index + 1).padStart(2, "0")}`;
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", discovered && cardData?.name ? `${cardData.name}, carte découverte, position ${index + 1} sur 9` : `Carte non découverte, position ${index + 1} sur 9`);
  card.setAttribute("role", "button");

  // Back face
  const backFace = document.createElement("div");
  backFace.className = "card-face card-back";
  const backImg = document.createElement("img");
  backImg.src = CARD_BACK_URL;
  backImg.alt = "";
  backImg.draggable = false;
  backFace.appendChild(backImg);

  // Front face
  const frontFace = document.createElement("div");
  frontFace.className = "card-face card-front";
  frontFace.setAttribute("aria-hidden", "true");

  if (cardData?.revealable || cardData?.image) {
    const illWindow = document.createElement("div");
    illWindow.className = "illustration-window";
    const illImg = document.createElement("img");
    illImg.className = "card-illustration";
    illImg.src = assetUrl(cardData.image);
    illImg.alt = cardData.name;
    illImg.draggable = false;
    illWindow.appendChild(illImg);

    const frameImg = document.createElement("img");
    frameImg.className = "card-frame";
    frameImg.src = collection?.cardFrame ? assetUrl(collection.cardFrame) : CARD_FRAME_URL;
    frameImg.alt = "";
    frameImg.draggable = false;

    const copy = document.createElement("div");
    copy.className = "card-copy";

    const nameEl = document.createElement("h2");
    nameEl.className = "card-name";
    nameEl.textContent = cardData.name;

    copy.appendChild(nameEl);

    const specular = document.createElement("div");
    specular.className = "card-specular";

    const glowBehind = document.createElement("div");
    glowBehind.className = "card-glow-behind";

    frontFace.appendChild(illWindow);
    frontFace.appendChild(frameImg);
    frontFace.appendChild(copy);
    frontFace.appendChild(specular);
    frontFace.appendChild(glowBehind);
  }

  card.appendChild(backFace);
  card.appendChild(frontFace);
  if (discovered) {
    card.classList.add("beer-card--discovered");
    frontFace.setAttribute("aria-hidden", "false");
    card.style.transform = "rotateY(180deg)";
  }
  wrapper.appendChild(card);
  return wrapper;
}

/**
 * Creates a clone of a card slot for the reveal animation.
 * The clone is positioned absolutely over the original.
 */
export function cloneCardForReveal(cardEl, rect, cardData) {
  const clone = document.createElement("div");
  clone.className = "beer-card beer-card--clone";
  clone.style.cssText = `
    position: fixed;
    left: ${rect.left}px;
    top: ${rect.top}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    z-index: 1000;
    pointer-events: none;
  `;

  // Back face
  const backFace = document.createElement("div");
  backFace.className = "card-face card-back";
  const backImg = document.createElement("img");
  backImg.src = CARD_BACK_URL;
  backImg.alt = "";
  backImg.draggable = false;
  backFace.appendChild(backImg);

  // Front face
  const frontFace = document.createElement("div");
  frontFace.className = "card-face card-front";

  const illWindow = document.createElement("div");
  illWindow.className = "illustration-window";
  const illImg = document.createElement("img");
  illImg.className = "card-illustration";
  illImg.src = assetUrl(cardData.image);
  illImg.alt = cardData.name;
  illImg.draggable = false;
  illWindow.appendChild(illImg);

  const frameImg = document.createElement("img");
  frameImg.className = "card-frame";
  frameImg.src = CARD_FRAME_URL;
  frameImg.alt = "";
  frameImg.draggable = false;

  const copy = document.createElement("div");
  copy.className = "card-copy";

  const nameEl = document.createElement("h2");
  nameEl.className = "card-name";
  nameEl.textContent = cardData.name;

  copy.appendChild(nameEl);

  const specular = document.createElement("div");
  specular.className = "card-specular";

  const glowBehind = document.createElement("div");
  glowBehind.className = "card-glow-behind";

  frontFace.appendChild(illWindow);
  frontFace.appendChild(frameImg);
  frontFace.appendChild(copy);
  frontFace.appendChild(specular);
  frontFace.appendChild(glowBehind);

  clone.appendChild(backFace);
  clone.appendChild(frontFace);
  return clone;
}
