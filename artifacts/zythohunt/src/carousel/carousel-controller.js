import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { createCard } from "../components/create-card.js";

gsap.registerPlugin(Draggable);
const DRAG_CLICK_THRESHOLD = 8;

export function createCarousel({ containerEl, cards, collection, tokens, store, onActiveChange }) {
  let activeIndex = 4, draggableInstance = null, cardEls = [], proxyEl = null, stageEl = null, locked = false, didDrag = false;
  const abortController = new AbortController();
  const { signal } = abortController;
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDiscovered = (id) => store?.isDiscovered(id) || false;

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
      wrap.toggleAttribute("aria-current", i === activeIndex);
      if (!inner) return;
      inner.setAttribute("aria-label", isDiscovered(card.id) && card.name ? `${card.name}, carte découverte, position ${i + 1} sur ${cards.length}` : `Carte non découverte, position ${i + 1} sur ${cards.length}`);
    });
  }
  function updateFromVPos(vPos, animate) { cardEls.forEach((el, i) => { applyState(el, getVisualState(i, vPos), animate); el.style.zIndex = String(Math.round(20 - Math.abs(i - vPos) * 4)); }); }
  function snapTo(index, duration) {
    const clamped = Math.max(0, Math.min(cards.length - 1, index)); const targetX = -clamped * tokens.spacing; const dur = duration ?? tokens.snapDuration;
    gsap.killTweensOf(proxyEl);
    return new Promise((resolve) => {
      const done = () => { activeIndex = clamped; updateFromVPos(clamped, false); updateA11y(); onActiveChange?.(clamped); resolve({ status: "focused", index: clamped }); };
      if (reducedMotion() || dur === 0) { gsap.set(proxyEl, { x: targetX }); done(); return; }
      gsap.to(proxyEl, { x: targetX, duration: dur, ease: "power3.out", onUpdate: () => updateFromVPos(-gsap.getProperty(proxyEl, "x") / tokens.spacing, false), onComplete: done });
    });
  }
  function focusCard(cardId) { const index = cards.findIndex((c) => c.id === cardId); return index < 0 ? Promise.resolve({ status: "missing", cardId }) : snapTo(index); }
  function getCardElement(cardId) { const index = cards.findIndex((c) => c.id === cardId); return index < 0 ? null : cardEls[index]?.querySelector(".beer-card"); }
  function setDiscovered(cardId, discovered = true) {
    const el = getCardElement(cardId); if (!el) return;
    el.classList.toggle("beer-card--discovered", discovered); gsap.set(el, { rotateY: discovered ? 180 : 0 });
    el.querySelector(".card-front")?.setAttribute("aria-hidden", discovered ? "false" : "true"); updateA11y();
  }
  function highlight(cardId) { const el = getCardElement(cardId); if (el) return gsap.fromTo(el, { boxShadow: "0 0 0 rgba(255,214,137,0)" }, { boxShadow: "0 0 34px rgba(255,214,137,.75)", duration: .22, yoyo: true, repeat: 1 }); }
  function lock() { locked = true; draggableInstance?.disable(); }
  function unlock() { locked = false; draggableInstance?.enable(); }
  function createRevealContext(cardId) {
    const target = getCardElement(cardId);
    const neighbors = cardEls.map((w) => w.querySelector(".beer-card")).filter((el) => el && el !== target).map((el, i) => ({ el, x: (i % 2 ? 1 : -1) * 18, y: 8, rotation: (i % 2 ? 1 : -1) * 2 }));
    return { contentEl: containerEl, chromeEls: [document.getElementById("app-header"), document.getElementById("reveal-search-form")].filter(Boolean), neighborMotions: neighbors, async restore() { gsap.set(neighbors.map((n) => n.el), { clearProps: "filter" }); updateFromVPos(activeIndex, true); } };
  }
  function handleKeyDown(e) { if (locked || ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return; if (e.key === "ArrowLeft") { e.preventDefault(); snapTo(activeIndex - 1); } else if (e.key === "ArrowRight") { e.preventDefault(); snapTo(activeIndex + 1); } else if (e.key === "Home") { e.preventDefault(); snapTo(0); } else if (e.key === "End") { e.preventDefault(); snapTo(cards.length - 1); } }
  function mount() {
    stageEl = document.createElement("div"); stageEl.className = "carousel-stage"; containerEl.appendChild(stageEl);
    const anchor = document.createElement("div"); anchor.className = "carousel-anchor"; stageEl.appendChild(anchor);
    proxyEl = document.createElement("div"); proxyEl.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;top:-9999px;"; document.body.appendChild(proxyEl);
    cardEls = cards.map((card, index) => { const wrap = createCard({ index, cardData: card, revealable: card.revealable, discovered: isDiscovered(card.id), as: "carousel", collection }); anchor.appendChild(wrap); return wrap; });
    gsap.set(proxyEl, { x: -activeIndex * tokens.spacing }); updateFromVPos(activeIndex, false); updateA11y();
    draggableInstance = Draggable.create(proxyEl, { type: "x", trigger: stageEl, bounds: { minX: -(cards.length - 1) * tokens.spacing, maxX: 0 }, edgeResistance: .65, onDragStart() { if (locked) return false; didDrag = false; gsap.killTweensOf(proxyEl); }, onDrag() { if (Math.abs(this.x - this.startX) > DRAG_CLICK_THRESHOLD) didDrag = true; updateFromVPos(-this.x / tokens.spacing, false); }, onDragEnd() { snapTo(Math.round(-this.x / tokens.spacing)); requestAnimationFrame(() => { didDrag = false; }); } })[0];
    cardEls.forEach((el, i) => el.addEventListener("click", () => { if (locked || didDrag) return; i !== activeIndex ? snapTo(i) : highlight(cards[i].id); }, { signal }));
    document.addEventListener("keydown", handleKeyDown, { signal });
  }
  function refresh() { if (!proxyEl) return; draggableInstance?.applyBounds({ minX: -(cards.length - 1) * tokens.spacing, maxX: 0 }); gsap.set(proxyEl, { x: -activeIndex * tokens.spacing }); updateFromVPos(activeIndex, true); }
  function destroy() { abortController.abort(); draggableInstance?.kill(); proxyEl?.remove(); containerEl.innerHTML = ""; }
  return { mount, destroy, snapTo, focusCard, getCardElement, setDiscovered, isDiscovered, lock, unlock, createRevealContext, highlight, refresh, getActiveIndex: () => activeIndex, getActiveCardId: () => cards[activeIndex]?.id };
}
