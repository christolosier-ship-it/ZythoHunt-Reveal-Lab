import { CARD_BACK_URL, CARD_FRAME_URL } from "../utils/preload-assets.js";

/**
 * Creates a single card DOM element.
 *
 * @param {object} options
 * @param {number} options.index   – position in the 9-card grid (0-8)
 * @param {object|null} options.cardData – card data object (null for decorative)
 * @param {boolean} options.revealable – whether this card can be revealed
 * @returns {HTMLElement}
 */
export function createCard({ index, cardData, revealable }) {
  const wrapper = document.createElement("li");
  wrapper.className = "card-slot";
  wrapper.setAttribute("role", "listitem");
  wrapper.dataset.index = index;

  const card = document.createElement("div");
  card.className = "beer-card";
  if (revealable) card.classList.add("beer-card--revealable");
  else card.classList.add("beer-card--locked");
  card.setAttribute("tabindex", revealable ? "0" : "-1");
  card.setAttribute("aria-label", revealable ? "Carte à révéler" : "Carte verrouillée");
  if (revealable) {
    card.setAttribute("role", "button");
  }

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

  if (cardData) {
    const illWindow = document.createElement("div");
    illWindow.className = "illustration-window";
    const illImg = document.createElement("img");
    illImg.className = "card-illustration";
    illImg.src = cardData.image;
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

    const typeEl = document.createElement("p");
    typeEl.className = "card-type";
    typeEl.textContent = cardData.type;

    const nameEl = document.createElement("h2");
    nameEl.className = "card-name";
    nameEl.textContent = cardData.name;

    const pathEl = document.createElement("p");
    pathEl.className = "card-path";
    pathEl.textContent = cardData.path;

    const tagEl = document.createElement("p");
    tagEl.className = "card-tagline";
    tagEl.textContent = cardData.tagline;

    copy.appendChild(typeEl);
    copy.appendChild(nameEl);
    copy.appendChild(pathEl);
    copy.appendChild(tagEl);

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
  illImg.src = cardData.image;
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

  const typeEl = document.createElement("p");
  typeEl.className = "card-type";
  typeEl.textContent = cardData.type;

  const nameEl = document.createElement("h2");
  nameEl.className = "card-name";
  nameEl.textContent = cardData.name;

  const pathEl = document.createElement("p");
  pathEl.className = "card-path";
  pathEl.textContent = cardData.path;

  const tagEl = document.createElement("p");
  tagEl.className = "card-tagline";
  tagEl.textContent = cardData.tagline;

  copy.appendChild(typeEl);
  copy.appendChild(nameEl);
  copy.appendChild(pathEl);
  copy.appendChild(tagEl);

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
