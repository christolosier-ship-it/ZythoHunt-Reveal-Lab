import { createCard } from "./create-card.js";
import { cards } from "../data/cards.js";

// Card positions in the 9-card grid (0-indexed)
// Position 0 → Stout, position 4 → Imperial Stout, position 8 → Baltic Porter
const CARD_POSITIONS = {
  0: cards[0],
  4: cards[1],
  8: cards[2]
};

const REVEALED_KEY = "zythohunt_revealed";

function loadRevealedState() {
  try {
    const stored = localStorage.getItem(REVEALED_KEY);
    if (stored) return new Set(JSON.parse(stored));
  } catch (_) {}
  return new Set();
}

export function saveRevealedState(revealed) {
  try {
    localStorage.setItem(REVEALED_KEY, JSON.stringify([...revealed]));
  } catch (_) {}
}

export function resetRevealedState() {
  localStorage.removeItem(REVEALED_KEY);
}

/**
 * Builds the 3×3 grid of cards.
 * Returns { gridEl, cardEls, revealedSet, getRevealableCardData }.
 */
export function createGrid(containerEl) {
  containerEl.innerHTML = "";
  const revealed = loadRevealedState();

  const cardEls = [];

  for (let i = 0; i < 9; i++) {
    const cardData = CARD_POSITIONS[i] || null;
    const revealable = cardData !== null;
    const isRevealed = revealable && revealed.has(i);

    const slot = createCard({ index: i, cardData, revealable });
    const beerCard = slot.querySelector(".beer-card");

    if (isRevealed) {
      beerCard.classList.add("beer-card--revealed");
      beerCard.setAttribute("aria-label", `Carte révélée: ${cardData.name}`);
    }

    containerEl.appendChild(slot);
    cardEls.push(beerCard);
  }

  return {
    cardEls,
    revealed,
    getCardData: (index) => CARD_POSITIONS[index] || null,
    isRevealable: (index) => index in CARD_POSITIONS
  };
}
