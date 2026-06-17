import gsap from "gsap";
import { createRevealTimeline, createQuickReveal } from "./reveal-timeline.js";
import { computeNeighborShifts } from "../utils/geometry.js";
import { motionTokens } from "./motion-tokens.js";
import { saveRevealedState } from "../components/create-grid.js";
import { CARD_BACK_URL } from "../utils/preload-assets.js";

let isAnimating = false;
let currentClone = null;
let currentRevealedIndex = null;
let lastRevealedCardData = null;

/**
 * Main controller for the reveal flow.
 */
export function createRevealController({
  cardEls,
  getCardData,
  isRevealable,
  revealed,
  stageEl,
  overlayEl,
  gridEl,
  navEl,
  headerEl,
  revealOverlay,
  revealActions,
  revealHeadline,
  btnSeeSheet,
  btnContinue,
  dataPanelEl,
  dataPanelTitle,
  dataPanelFields,
  dataPanelClose,
  progressDisplay,
  onRevealComplete
}) {
  function updateProgress() {
    const count = revealed.size;
    progressDisplay.textContent = `${count} / 3 révélées`;
  }

  function lockInteractions() {
    isAnimating = true;
    cardEls.forEach((el) => el.setAttribute("tabindex", "-1"));
  }

  function unlockInteractions() {
    isAnimating = false;
    cardEls.forEach((el, i) => {
      if (isRevealable(i)) el.setAttribute("tabindex", "0");
    });
  }

  function clearScene(fromCardEl) {
    if (currentClone) {
      currentClone.remove();
      currentClone = null;
    }
    if (fromCardEl) {
      gsap.set(fromCardEl, { opacity: 1 });
    }
    // Reset overlays and filters
    gsap.to(overlayEl, { opacity: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(gridEl, { filter: "none", duration: 0.3, ease: "power2.out" });
    gsap.to([navEl, headerEl], { opacity: 1, duration: 0.3, ease: "power2.out" });
    revealActions.hidden = true;
    revealOverlay.hidden = true;
  }

  function closeContinue(cardEl) {
    lockInteractions();

    // Animate clone back if present
    if (currentClone && currentRevealedIndex !== null) {
      const originalCard = cardEls[currentRevealedIndex];
      const originalRect = originalCard.getBoundingClientRect();

      // Flip back toward back briefly, then shrink to grid position
      gsap.to(currentClone, {
        left: originalRect.left,
        top: originalRect.top,
        width: originalRect.width,
        height: originalRect.height,
        rotateY: 0,
        rotateX: 0,
        rotateZ: 0,
        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => {
          // Mark as revealed in grid
          if (currentRevealedIndex !== null) {
            originalCard.classList.add("beer-card--revealed");
            // Show recto thumbnail in grid
            showRevealedFront(originalCard, lastRevealedCardData);
          }
          clearScene(originalCard);
          unlockInteractions();
        }
      });

      // Re-show neighbors
      const neighbors = computeNeighborShifts(cardEls, currentRevealedIndex, motionTokens.maxNeighborShift);
      neighbors.forEach(({ el }) => {
        gsap.to(el, { x: 0, y: 0, rotation: 0, duration: 0.35, ease: "power3.out" });
      });
    } else {
      clearScene(null);
      unlockInteractions();
    }

    revealActions.hidden = true;
  }

  function showRevealedFront(cardEl, cardData) {
    const backFace = cardEl.querySelector(".card-back");
    const frontFace = cardEl.querySelector(".card-front");
    if (!backFace || !frontFace) return;

    // Show the card front directly (it's already been flipped in the full scene)
    // We flip the card in the grid so it shows the front thumbnail
    gsap.set(cardEl, {
      rotateY: 180,
      transformStyle: "preserve-3d",
      transformPerspective: 1400
    });
    gsap.set(backFace, { backfaceVisibility: "hidden" });
    gsap.set(frontFace, { backfaceVisibility: "hidden" });

    // Make all front elements visible
    const els = frontFace.querySelectorAll(".card-illustration, .card-frame, .card-type, .card-name, .card-path, .card-tagline");
    gsap.set(els, { opacity: 1 });
    cardEl.setAttribute("aria-label", `Carte révélée: ${cardData.name}`);
  }

  function handleCardClick(cardEl, index) {
    if (isAnimating) return;

    const cardData = getCardData(index);
    if (!cardData) return;

    const isAlreadyRevealed = revealed.has(index);

    lockInteractions();
    revealOverlay.hidden = false;
    stageEl.innerHTML = "";

    if (isAlreadyRevealed) {
      // Quick re-reveal
      const { tl, cloneEl } = createQuickReveal({
        cardEl, cardData, stageEl, overlayEl
      });
      currentClone = cloneEl;
      currentRevealedIndex = index;
      lastRevealedCardData = cardData;

      tl.play().then(() => {
        revealHeadline.textContent = "Carte déjà découverte";
        revealActions.hidden = false;
        unlockInteractions();
      });
    } else {
      // Full reveal
      const { tl, cloneEl } = createRevealTimeline({
        cardEl, cardData,
        allCardEls: cardEls,
        cardIndex: index,
        stageEl, overlayEl, gridEl, navEl, headerEl
      });
      currentClone = cloneEl;
      currentRevealedIndex = index;
      lastRevealedCardData = cardData;

      tl.play().then(() => {
        revealed.add(index);
        saveRevealedState(revealed);
        updateProgress();
        revealHeadline.textContent = "Nouvelle carte révélée";
        revealActions.hidden = false;
        onRevealComplete && onRevealComplete(cardData);
        unlockInteractions();
      });
    }
  }

  // Wire up card click/touch/keyboard events
  cardEls.forEach((cardEl, index) => {
    if (!isRevealable(index)) return;

    let touchStartTime = 0;
    let touchMoved = false;

    cardEl.addEventListener("click", (e) => {
      e.preventDefault();
      handleCardClick(cardEl, index);
    });

    cardEl.addEventListener("touchstart", (e) => {
      touchStartTime = Date.now();
      touchMoved = false;
    }, { passive: true });

    cardEl.addEventListener("touchmove", () => {
      touchMoved = true;
    }, { passive: true });

    cardEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick(cardEl, index);
      }
    });
  });

  // Continue button
  btnContinue.addEventListener("click", () => {
    if (isAnimating) return;
    closeContinue(cardEls[currentRevealedIndex]);
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !revealOverlay.hidden) {
      closeContinue(cardEls[currentRevealedIndex]);
      dataPanelEl.hidden = true;
    }
  });

  // See sheet button
  btnSeeSheet.addEventListener("click", () => {
    if (!lastRevealedCardData) return;
    const d = lastRevealedCardData;
    dataPanelTitle.textContent = d.name;
    dataPanelFields.innerHTML = `
      <div class="dpf-row"><dt>Type</dt><dd>${d.type}</dd></div>
      <div class="dpf-row"><dt>Chemin</dt><dd>${d.path}</dd></div>
      <div class="dpf-row"><dt>Description</dt><dd>${d.tagline}</dd></div>
    `;
    dataPanelEl.hidden = false;
  });

  dataPanelClose.addEventListener("click", () => {
    dataPanelEl.hidden = true;
  });

  updateProgress();

  // Replay support (for debug panel)
  return {
    replay(index) {
      if (isAnimating) return;
      if (index === undefined || index === null) return;
      // Reset that card if it was revealed
      if (revealed.has(index)) {
        revealed.delete(index);
        saveRevealedState(revealed);
        updateProgress();
        const cardEl = cardEls[index];
        cardEl.classList.remove("beer-card--revealed");
        const cardData = getCardData(index);
        // Reset visual state
        gsap.set(cardEl, { rotateY: 0 });
        const backFace = cardEl.querySelector(".card-back");
        const frontFace = cardEl.querySelector(".card-front");
        if (backFace) gsap.set(backFace, { backfaceVisibility: "visible" });
        if (frontFace) {
          gsap.set(frontFace, { backfaceVisibility: "hidden" });
          const els = frontFace.querySelectorAll(".card-illustration, .card-frame, .card-type, .card-name, .card-path, .card-tagline");
          gsap.set(els, { opacity: 0 });
        }
      }
    },
    resetAll() {
      clearScene(currentRevealedIndex !== null ? cardEls[currentRevealedIndex] : null);
      unlockInteractions();
    }
  };
}
