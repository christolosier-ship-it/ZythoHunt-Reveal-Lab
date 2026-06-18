import gsap from "gsap";
import { motionTokens } from "../animation/motion-tokens.js";
import { saveRevealedState } from "../components/create-grid.js";
import { computeNeighborShifts } from "../utils/geometry.js";
import { createRevealEngine } from "../reveal/reveal-engine.js";

export function createRevealLabController({
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
  const abortController = new AbortController();
  const { signal } = abortController;
  let isLocked = false;
  let currentRevealedIndex = null;
  let lastRevealedCardData = null;

  const revealEngine = createRevealEngine({ stageEl, overlayEl, revealOverlay, revealActions, revealHeadline, motionTokens });

  function updateProgress() {
    progressDisplay.textContent = `${revealed.size} / 3 révélées`;
  }

  function lockInteractions() {
    isLocked = true;
    cardEls.forEach((el) => el.setAttribute("tabindex", "-1"));
  }

  function unlockInteractions() {
    isLocked = false;
    cardEls.forEach((el, i) => {
      if (isRevealable(i)) el.setAttribute("tabindex", "0");
    });
  }

  function showRevealedFront(cardEl, cardData) {
    const backFace = cardEl.querySelector(".card-back");
    const frontFace = cardEl.querySelector(".card-front");
    if (!backFace || !frontFace) return;

    gsap.set(cardEl, { rotateY: 180, transformStyle: "preserve-3d", transformPerspective: 1400 });
    gsap.set(backFace, { backfaceVisibility: "hidden" });
    gsap.set(frontFace, { backfaceVisibility: "hidden" });

    const els = frontFace.querySelectorAll(".card-illustration, .card-frame, .card-type, .card-name, .card-path, .card-tagline");
    gsap.set(els, { opacity: 1 });
    cardEl.setAttribute("aria-label", `Carte révélée: ${cardData.name}`);
  }

  function createLabSceneContext(index) {
    const neighborMotions = computeNeighborShifts(cardEls, index, motionTokens.maxNeighborShift)
      .map(({ el, dx, dy, rot }) => ({ el, x: dx, y: dy, rotation: rot }));

    return {
      contentEl: gridEl,
      chromeEls: [navEl, headerEl],
      neighborMotions,
      async restore() {
        const tweens = [
          gsap.to(gridEl, { filter: "none", duration: 0.3, ease: "power2.out" }),
          gsap.to([navEl, headerEl], { opacity: 1, duration: 0.3, ease: "power2.out" }),
          ...neighborMotions.map(({ el }) => gsap.to(el, { x: 0, y: 0, rotation: 0, duration: 0.35, ease: "power3.out" }))
        ];
        await Promise.all(tweens);
      }
    };
  }

  async function closeContinue() {
    if (isLocked || revealEngine.isBusy()) return;
    lockInteractions();
    await revealEngine.returnToSource({
      beforeSourceRestore({ cardEl, cardData }) {
        if (currentRevealedIndex !== null) {
          cardEl.classList.add("beer-card--revealed");
          showRevealedFront(cardEl, cardData);
        }
      }
    });
    unlockInteractions();
  }

  async function handleCardClick(cardEl, index) {
    if (isLocked || revealEngine.isBusy()) return;
    const cardData = getCardData(index);
    if (!cardData) return;

    const isAlreadyRevealed = revealed.has(index);
    lockInteractions();
    currentRevealedIndex = index;
    lastRevealedCardData = cardData;

    const result = await revealEngine.reveal({
      cardEl,
      cardData,
      sceneContext: createLabSceneContext(index),
      mode: isAlreadyRevealed ? "quick" : "full"
    });

    if (result.status !== "completed") {
      unlockInteractions();
      return;
    }

    if (isAlreadyRevealed) {
      revealHeadline.textContent = "Carte déjà découverte";
    } else {
      revealed.add(index);
      saveRevealedState(revealed);
      updateProgress();
      revealHeadline.textContent = "Nouvelle carte révélée";
      onRevealComplete && onRevealComplete(cardData);
    }

    revealActions.hidden = false;
    unlockInteractions();
  }

  cardEls.forEach((cardEl, index) => {
    if (!isRevealable(index)) return;
    cardEl.addEventListener("click", (e) => {
      e.preventDefault();
      handleCardClick(cardEl, index);
    }, { signal });
    cardEl.addEventListener("touchstart", () => {}, { passive: true, signal });
    cardEl.addEventListener("touchmove", () => {}, { passive: true, signal });
    cardEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick(cardEl, index);
      }
    }, { signal });
  });

  btnContinue.addEventListener("click", closeContinue, { signal });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !revealOverlay.hidden) {
      closeContinue();
      dataPanelEl.hidden = true;
    }
  }, { signal });

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
  }, { signal });

  dataPanelClose.addEventListener("click", () => {
    dataPanelEl.hidden = true;
  }, { signal });

  updateProgress();

  return {
    replay(index) {
      if (isLocked || index === undefined || index === null) return;
      if (revealed.has(index)) {
        revealed.delete(index);
        saveRevealedState(revealed);
        updateProgress();
        const cardEl = cardEls[index];
        cardEl.classList.remove("beer-card--revealed");
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
      revealEngine.returnToSource();
      unlockInteractions();
    },
    destroy() {
      abortController.abort();
      revealEngine.destroy();
    }
  };
}
