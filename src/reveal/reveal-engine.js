/** @typedef {any} Any */
import gsap from "gsap";
import { createQuickReveal, createRevealTimeline } from "../animation/reveal-timeline.js";

const STATES = {
  IDLE: "idle",
  PREPARING: "preparing",
  REVEALING: "revealing",
  COMPLETE: "complete",
  RETURNING: "returning",
  DESTROYED: "destroyed"
};

export function createRevealEngine(/** @type {any} */ {
  stageEl,
  overlayEl,
  revealOverlay,
  revealActions,
  revealHeadline,
  btnContinue,
  motionTokens
}) {
  let state = STATES.IDLE;
  let currentTimeline = null;
  let currentClone = null;
  let currentSourceEl = null;
  let currentCardData = null;
  let currentSceneContext = null;
  let previousFocus = null;
  const inertSelectors = ["#app-header", "#reveal-search-form", "#carousel-container"];
  let cleanupModal = null;

  function isBusy() {
    return [STATES.PREPARING, STATES.REVEALING, STATES.COMPLETE, STATES.RETURNING].includes(state);
  }

  function hideActions() {
    if (revealActions) revealActions.hidden = true;
  }

  function setBackgroundInert(value) {
    inertSelectors.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el && el !== revealOverlay) (/** @type {any} */ (el)).inert = value;
    });
  }

  function activateModal() {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setBackgroundInert(true);
    const onKeyDown = (event) => {
      if (event.key !== "Escape" && event.key !== "Tab") return;
      if (event.key === "Escape") {
        if (state === STATES.COMPLETE) { event.preventDefault(); btnContinue?.click(); }
        else event.preventDefault();
        return;
      }
      const focusables = Array.from(revealOverlay?.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])") || []).filter((el) => !el.disabled && el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    cleanupModal = () => { document.removeEventListener("keydown", onKeyDown); setBackgroundInert(false); previousFocus?.focus?.(); cleanupModal = null; previousFocus = null; };
  }

  function waitForContinue() {
    if (revealHeadline) revealHeadline.textContent = "Nouvelle carte révélée";
    if (revealActions) revealActions.hidden = false;
    btnContinue?.focus();
    return new Promise((resolve) => {
      const done = () => resolve();
      btnContinue?.addEventListener("click", done, { once: true });
    });
  }

  function showOverlay() {
    if (revealOverlay) revealOverlay.hidden = false;
    if (stageEl) stageEl.innerHTML = "";
  }

  function restoreSource() {
    if (currentSourceEl) gsap.set(currentSourceEl, { opacity: 1 });
  }

  function resetSceneVisuals() {
    if (overlayEl) gsap.to(overlayEl, { opacity: 0, duration: 0.3, ease: "power2.out" });
    if (revealOverlay) revealOverlay.hidden = true;
    hideActions();
  }

  async function restoreContext() {
    if (currentSceneContext?.restore) {
      await currentSceneContext.restore();
    }
  }

  async function reveal({ cardEl, cardData, sceneContext, mode = "full" }) {
    if (state === STATES.DESTROYED) return { status: "destroyed", cardData };
    if (isBusy() || state === STATES.COMPLETE) return { status: "busy", cardData: currentCardData };
    if (!cardEl || !cardData) return { status: "invalid", cardData };

    state = STATES.PREPARING;
    currentSourceEl = cardEl;
    currentCardData = cardData;
    currentSceneContext = sceneContext || null;
    showOverlay();
    activateModal();
    hideActions();

    try {
      const result = mode === "quick"
        ? createQuickReveal({ cardEl, cardData, stageEl, overlayEl })
        : createRevealTimeline({ cardEl, cardData, stageEl, overlayEl, sceneContext, motionTokens });

      currentTimeline = result.tl;
      currentClone = result.cloneEl;
      state = STATES.REVEALING;
      await currentTimeline.play();
      state = STATES.COMPLETE;
      await waitForContinue();
      return { status: "completed", cardData };
    } catch (error) {
      await cleanupAfterError();
      throw error;
    }
  }

  async function returnToSource(/** @type {any} */ { beforeSourceRestore } = {}) {
    if (state === STATES.DESTROYED) return { status: "destroyed" };
    if (!currentClone || !currentSourceEl) {
      resetSceneVisuals();
      cleanupModal?.();
      await restoreContext();
      state = STATES.IDLE;
      return { status: "idle" };
    }

    state = STATES.RETURNING;
    currentTimeline?.kill();
    const sourceEl = currentSourceEl;
    const cardData = currentCardData;
    const cloneEl = currentClone;
    const originalRect = sourceEl.getBoundingClientRect();

    await gsap.to(cloneEl, {
      left: originalRect.left,
      top: originalRect.top,
      width: originalRect.width,
      height: originalRect.height,
      rotateY: 0,
      rotateX: 0,
      rotateZ: 0,
      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
      duration: 0.45,
      ease: "power3.inOut"
    });

    if (beforeSourceRestore) beforeSourceRestore({ cardEl: sourceEl, cardData });
    restoreSource();
    cloneEl.remove();
    currentClone = null;
    currentTimeline = null;
    resetSceneVisuals();
    cleanupModal?.();
    await restoreContext();
    currentSourceEl = null;
    currentCardData = null;
    currentSceneContext = null;
    state = STATES.IDLE;
    return { status: "returned", cardData };
  }

  async function cleanupAfterError() {
    currentTimeline?.kill();
    currentClone?.remove();
    currentClone = null;
    restoreSource();
    resetSceneVisuals();
    cleanupModal?.();
    await restoreContext();
    state = STATES.IDLE;
  }

  function destroy() {
    if (state === STATES.DESTROYED) return;
    currentTimeline?.kill();
    currentClone?.remove();
    restoreSource();
    resetSceneVisuals();
    cleanupModal?.();
    if (currentSceneContext?.restore) currentSceneContext.restore();
    currentTimeline = null;
    currentClone = null;
    currentSourceEl = null;
    currentCardData = null;
    currentSceneContext = null;
    state = STATES.DESTROYED;
  }

  return { reveal, returnToSource, isBusy, destroy };
}
