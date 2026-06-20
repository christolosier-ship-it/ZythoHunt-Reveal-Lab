/** @typedef {any} Any */
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { createCard, fitAllCardNames } from "../components/create-card.js";
import { motionTokens } from "../animation/motion-tokens.js";

gsap.registerPlugin(Draggable);
const DRAG_CLICK_THRESHOLD = 8;

export function createCarousel(/** @type {any} */ { containerEl, cards, collection, tokens, store, onActiveChange }) {
  let activeIndex = 4, draggableInstance = null, cardEls = [], proxyEl = null, stageEl = null, locked = false;
  let suppressClickUntil = 0, inspectionId = null, inspectionTl = null, feedbackTl = null;
  let feedbackGlowEl = null, feedbackCardEl = null;
  const abortController = new AbortController();
  const { signal } = abortController;
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDiscovered = (id) => store?.isDiscovered(id) || false;
  const now = () => performance.now();
  const isFormField = (el) => ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(el?.tagName) || el?.closest?.("#debug-panel");

  function getVisualState(index, vPos) {
    const distance = index - vPos, abs = Math.abs(distance);
    return { x: distance * tokens.spacing, y: abs * 5, z: -abs * tokens.depthStep, rotateY: distance * -tokens.rotationStep, scale: Math.max(tokens.minScale, 1 - abs * tokens.scaleStep), opacity: Math.max(tokens.minOpacity, 1 - abs * tokens.opacityStep) };
  }
  function applyState(cardEl, state, animate) {
    const vars = reducedMotion() ? { x: state.x, y: 0, z: 0, rotateY: 0, scale: state.scale, opacity: state.opacity } : state;
    animate ? gsap.to(cardEl, { ...vars, duration: 0.35, ease: "power2.out", overwrite: "auto" }) : gsap.set(cardEl, vars);
  }
  function updateA11y() {
    cardEls.forEach((wrap, i) => {
      const card = cards[i]; const inner = wrap.querySelector(".beer-card");
      if (i === activeIndex) wrap.setAttribute("aria-current", "true"); else wrap.removeAttribute("aria-current");
      if (!inner) return;
      inner.setAttribute("tabindex", i === activeIndex && !locked ? "0" : "-1");
      const label = isDiscovered(card.id) && card.name ? `${card.name}, carte découverte, position ${i + 1} sur ${cards.length}` : `Carte non découverte, position ${i + 1} sur ${cards.length}. Activer pour centrer la carte ou jouer un retour visuel verrouillé.`;
      inner.setAttribute("aria-label", label);
    });
  }
  function updateFromVPos(vPos, animate) { cardEls.forEach((el, i) => { if (cards[i]?.id === inspectionId) return; applyState(el, getVisualState(i, vPos), animate); el.style.zIndex = String(Math.round(20 - Math.abs(i - vPos) * 4)); }); }
  async function closeInspection() {
    if (!inspectionId) return { status: "idle" };
    const id = inspectionId, wrap = cardEls[cards.findIndex((c) => c.id === id)], inner = getCardElement(id);
    inspectionId = null; inspectionTl?.kill(); wrap?.classList.remove("is-inspecting");
    if (inner) await gsap.to(inner, { scale: 1, z: 0, y: 0, boxShadow: "0 4px 16px rgba(0,0,0,0.4)", duration: reducedMotion() ? 0.08 : 0.26, ease: "power2.out", overwrite: "auto" });
    updateFromVPos(activeIndex, false); return { status: "closed" };
  }
  function snapTo(index, duration) {
    const clamped = Math.max(0, Math.min(cards.length - 1, index)); const targetX = -clamped * tokens.spacing; const dur = duration ?? tokens.snapDuration;
    gsap.killTweensOf(proxyEl);
    return new Promise((resolve) => {
      const done = () => { activeIndex = clamped; updateFromVPos(clamped, false); updateA11y(); onActiveChange?.(clamped); fitAllCardNames(containerEl); resolve({ status: "focused", index: clamped }); };
      if (reducedMotion() || dur === 0) { gsap.set(proxyEl, { x: targetX }); done(); return; }
      gsap.to(proxyEl, { x: targetX, duration: dur, ease: "power3.out", onUpdate: () => updateFromVPos(-gsap.getProperty(proxyEl, "x") / tokens.spacing, false), onComplete: done });
    });
  }
  async function focusCard(cardId) { await closeInspection(); const index = cards.findIndex((c) => c.id === cardId); return index < 0 ? { status: "missing", cardId } : snapTo(index); }
  function getCardElement(cardId) { const index = cards.findIndex((c) => c.id === cardId); return index < 0 ? null : cardEls[index]?.querySelector(".beer-card"); }
  function setDiscovered(cardId, discovered = true) { const el = getCardElement(cardId); if (!el) return; el.classList.toggle("beer-card--discovered", discovered); gsap.set(el, { rotateY: discovered ? 180 : 0 }); el.querySelector(".card-front")?.setAttribute("aria-hidden", discovered ? "false" : "true"); updateA11y(); fitAllCardNames(el); }
  function highlight(cardId) { const el = getCardElement(cardId); return el ? gsap.fromTo(el, { boxShadow: "0 0 0 rgba(255,214,137,0)" }, { boxShadow: "0 0 34px rgba(255,214,137,.75)", duration: .22, yoyo: true, repeat: 1 }) : Promise.resolve(); }
  async function inspectCard(cardId) {
    if (locked) return { status: "locked" };
    if (inspectionId === cardId) return closeInspection();
    const i = cards.findIndex((c) => c.id === cardId);
    if (i < 0 || !isDiscovered(cardId)) return { status: "unavailable" };

    await closeInspection();
    if (i !== activeIndex) await snapTo(i);

    inspectionId = cardId;
    const wrap = cardEls[i], inner = getCardElement(cardId);
    const otherWraps = cardEls.filter((_, index) => index !== i);
    wrap.classList.add("is-inspecting");
    wrap.style.zIndex = "160";

    inspectionTl = gsap.timeline();
    if (otherWraps.length) {
      inspectionTl.to(otherWraps, {
        opacity: reducedMotion() ? 0.55 : 0.32,
        duration: reducedMotion() ? 0.08 : 0.28,
        ease: "power2.out",
        overwrite: "auto"
      }, 0);
    }
    inspectionTl.to(inner, {
      scale: reducedMotion() ? 1.08 : 1.42,
      z: reducedMotion() ? 0 : 220,
      y: reducedMotion() ? -2 : -12,
      boxShadow: "0 34px 86px rgba(0,0,0,.82), 0 0 46px rgba(232,160,64,.46)",
      duration: reducedMotion() ? .1 : .38,
      ease: "power3.out",
      overwrite: "auto"
    }, 0);

    await inspectionTl;
    return { status: "inspecting" };
  }
  function isInspecting() { return Boolean(inspectionId); }

  function resetLockedFeedback() {
    feedbackTl?.kill();
    if (feedbackGlowEl) gsap.set(feedbackGlowEl, { opacity: 0, scale: 0.92 });
    if (feedbackCardEl) gsap.set(feedbackCardEl, { y: 0, scale: 1 });
    feedbackTl = null;
    feedbackGlowEl = null;
    feedbackCardEl = null;
  }

  async function playLockedFeedback(cardId) {
    const i = cards.findIndex((c) => c.id === cardId);
    if (i < 0) return;
    if (i !== activeIndex) await snapTo(i);

    const wrap = cardEls[i];
    const cardEl = getCardElement(cardId);
    const glowEl = wrap?.querySelector(".card-click-glow");
    if (!cardEl || !glowEl) return;

    resetLockedFeedback();
    feedbackGlowEl = glowEl;
    feedbackCardEl = cardEl;
    gsap.set(glowEl, { opacity: 0, scale: 0.9 });

    feedbackTl = gsap.timeline({
      onComplete: () => {
        gsap.set(glowEl, { opacity: 0, scale: 0.92 });
        gsap.set(cardEl, { y: 0, scale: 1 });
        if (feedbackGlowEl === glowEl) feedbackGlowEl = null;
        if (feedbackCardEl === cardEl) feedbackCardEl = null;
        feedbackTl = null;
      }
    });

    feedbackTl
      .to(cardEl, {
        y: reducedMotion() ? 2 : 5,
        scale: reducedMotion() ? 0.995 : 0.982,
        duration: reducedMotion() ? 0.05 : 0.1,
        ease: "power2.out",
        overwrite: "auto"
      }, 0)
      .to(glowEl, {
        opacity: 1,
        scale: reducedMotion() ? 1.02 : 1.08,
        duration: reducedMotion() ? 0.06 : 0.12,
        ease: "power2.out",
        overwrite: "auto"
      }, 0)
      .to(cardEl, {
        y: 0,
        scale: 1,
        duration: reducedMotion() ? 0.08 : 0.18,
        ease: "power2.out"
      }, reducedMotion() ? 0.05 : 0.1)
      .to(glowEl, {
        opacity: 0,
        scale: reducedMotion() ? 1.05 : 1.2,
        duration: reducedMotion() ? 0.12 : 0.28,
        ease: "power2.out"
      }, reducedMotion() ? 0.05 : 0.1);

    await feedbackTl;
  }

  function lock() { locked = true; resetLockedFeedback(); closeInspection(); draggableInstance?.disable(); updateA11y(); }
  function unlock() { locked = false; draggableInstance?.enable(); updateA11y(); }
  function createRevealContext(cardId, options = {}) { const target = getCardElement(cardId); const shift = options.neighborShift ?? motionTokens.maxNeighborShift; const chromeEls = [document.getElementById("app-header"), document.getElementById("reveal-search-form")].filter(Boolean); const neighbors = cardEls.map((w) => w.querySelector(".beer-card")).filter((el) => el && el !== target).map((el, i) => ({ el, x: (i % 2 ? 1 : -1) * shift, y: Math.min(12, shift / 2), rotation: (i % 2 ? 1 : -1) * 2 })); return { contentEl: containerEl, chromeEls, neighborMotions: neighbors, async restore() { const tl = gsap.timeline(); tl.to(containerEl, { filter: "none", duration: .3, ease: "power2.out", overwrite: true }, 0); if (chromeEls.length) tl.to(chromeEls, { opacity: 1, duration: .3, ease: "power2.out", overwrite: true }, 0); if (neighbors.length) tl.to(neighbors.map(({ el }) => el), { x: 0, y: 0, rotation: 0, duration: .35, ease: "power3.out", overwrite: true }, 0); await tl; gsap.set(containerEl, { clearProps: "filter" }); if (chromeEls.length) gsap.set(chromeEls, { clearProps: "opacity" }); updateFromVPos(activeIndex, false); } }; }
  function handleKeyDown(e) { if (locked || isFormField(document.activeElement)) return; if (["ArrowLeft","ArrowRight","Home","End","Enter"," "].includes(e.key)) e.preventDefault(); if (e.key === "ArrowLeft") snapTo(activeIndex - 1); else if (e.key === "ArrowRight") snapTo(activeIndex + 1); else if (e.key === "Home") snapTo(0); else if (e.key === "End") snapTo(cards.length - 1); else if (e.key === "Enter" || e.key === " ") isDiscovered(cards[activeIndex].id) ? inspectCard(cards[activeIndex].id) : playLockedFeedback(cards[activeIndex].id); }
  function shouldIgnoreClick() { return locked || now() < suppressClickUntil; }
  async function handleCardClick(i) { if (shouldIgnoreClick()) return; const id = cards[i].id; if (isDiscovered(id)) await inspectCard(id); else await playLockedFeedback(id); }
  function mount() { stageEl = document.createElement("div"); stageEl.className = "carousel-stage"; containerEl.appendChild(stageEl); const anchor = document.createElement("div"); anchor.className = "carousel-anchor"; stageEl.appendChild(anchor); proxyEl = document.createElement("div"); proxyEl.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;top:-9999px;"; document.body.appendChild(proxyEl); cardEls = cards.map((card, index) => { const wrap = createCard({ index, cardData: card, revealable: card.revealable, discovered: isDiscovered(card.id), as: "carousel", collection }); anchor.appendChild(wrap); return wrap; }); gsap.set(proxyEl, { x: -activeIndex * tokens.spacing }); updateFromVPos(activeIndex, false); updateA11y(); draggableInstance = Draggable.create(proxyEl, { type: "x", trigger: stageEl, bounds: { minX: -(cards.length - 1) * tokens.spacing, maxX: 0 }, edgeResistance: .65, onDragStart() { if (locked) return false; resetLockedFeedback(); closeInspection(); gsap.killTweensOf(proxyEl); }, onDrag() { updateFromVPos(-this.x / tokens.spacing, false); }, onDragEnd() { if (Math.abs(this.x - this.startX) > DRAG_CLICK_THRESHOLD) suppressClickUntil = now() + 180; snapTo(Math.round(-this.x / tokens.spacing)); } })[0]; cardEls.forEach((el, i) => el.addEventListener("click", () => handleCardClick(i), { signal })); document.addEventListener("click", (e) => { if (inspectionId && !(/** @type {Element} */ (e.target)).closest?.(".csl-card")) closeInspection(); }, { signal }); document.addEventListener("keydown", (e) => { if (e.key === "Escape" && inspectionId) closeInspection(); handleKeyDown(e); }, { signal }); window.addEventListener("resize", () => { resetLockedFeedback(); closeInspection(); refresh(); fitAllCardNames(containerEl); }, { signal }); }
  function refresh() { if (!proxyEl) return; draggableInstance?.applyBounds({ minX: -(cards.length - 1) * tokens.spacing, maxX: 0 }); gsap.set(proxyEl, { x: -activeIndex * tokens.spacing }); updateFromVPos(activeIndex, true); }
  function destroy() { abortController.abort(); resetLockedFeedback(); inspectionTl?.kill(); draggableInstance?.kill(); proxyEl?.remove(); containerEl.innerHTML = ""; }
  return { mount, destroy, snapTo, focusCard, getCardElement, setDiscovered, isDiscovered, lock, unlock, createRevealContext, highlight, refresh, inspectCard, closeInspection, isInspecting, playLockedFeedback, getActiveIndex: () => activeIndex, getActiveCardId: () => cards[activeIndex]?.id };
}
