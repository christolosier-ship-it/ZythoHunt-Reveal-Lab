import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { assetUrl } from "../utils/asset-url.js";

gsap.registerPlugin(Draggable);

const DRAG_CLICK_THRESHOLD = 8;

const GRID_INDEX_TO_CARD_ID = { 0: "stout", 4: "imperial-stout", 8: "baltic-porter" };

function getDiscoveredIds() {
  try {
    const stored = localStorage.getItem("zythohunt_revealed");
    if (!stored) return new Set();
    const obj = JSON.parse(stored);
    return new Set(
      Object.keys(obj)
        .map((k) => GRID_INDEX_TO_CARD_ID[parseInt(k)])
        .filter(Boolean)
    );
  } catch (_) {
    return new Set();
  }
}

function buildCardEl(card, collection, isDiscovered) {
  const wrapper = document.createElement("div");
  wrapper.className = "csl-card";
  wrapper.dataset.cardId = card.id;
  wrapper.setAttribute("role", isDiscovered ? "button" : "img");
  wrapper.setAttribute(
    "aria-label",
    isDiscovered ? `Carte ${card.name} — ouvrir` : "Carte non découverte"
  );

  const inner = document.createElement("div");
  inner.className = "csl-card-inner";

  const backFace = document.createElement("div");
  backFace.className = "csl-card-face csl-card-back";
  const backImg = document.createElement("img");
  backImg.src = assetUrl(collection.cardBack);
  backImg.alt = "";
  backImg.draggable = false;
  backFace.appendChild(backImg);

  const frontFace = document.createElement("div");
  frontFace.className = "csl-card-face csl-card-front";
  frontFace.setAttribute("aria-hidden", isDiscovered ? "false" : "true");

  if (isDiscovered) {
    const illWindow = document.createElement("div");
    illWindow.className = "csl-ill-window";
    const illImg = document.createElement("img");
    illImg.className = "csl-ill-img";
    illImg.src = assetUrl(card.image);
    illImg.alt = card.name;
    illImg.draggable = false;
    illWindow.appendChild(illImg);

    const frameImg = document.createElement("img");
    frameImg.className = "csl-frame-img";
    frameImg.src = assetUrl(collection.cardFrame);
    frameImg.alt = "";
    frameImg.draggable = false;

    const copy = document.createElement("div");
    copy.className = "csl-card-copy";
    const nameEl = document.createElement("h3");
    nameEl.className = "csl-card-name";
    nameEl.textContent = card.name;
    copy.appendChild(nameEl);

    frontFace.appendChild(illWindow);
    frontFace.appendChild(frameImg);
    frontFace.appendChild(copy);
  }

  inner.appendChild(backFace);
  inner.appendChild(frontFace);
  wrapper.appendChild(inner);

  if (isDiscovered) {
    gsap.set(inner, { rotateY: 180, transformStyle: "preserve-3d" });
  }

  return wrapper;
}

export function createCarousel({ containerEl, cards, collection, tokens, onActiveChange }) {
  let activeIndex = 0;
  let draggableInstance = null;
  let cardEls = [];
  let proxyEl = null;
  let stageEl = null;
  let didDrag = false;

  const abortController = new AbortController();
  const { signal } = abortController;
  const discoveredIds = getDiscoveredIds();

  function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function getVisualState(index, vPos) {
    const distance = index - vPos;
    const abs = Math.abs(distance);
    return {
      x:       distance * tokens.spacing,
      y:       abs * 5,
      z:       -abs * tokens.depthStep,
      rotateY: distance * -tokens.rotationStep,
      scale:   Math.max(tokens.minScale,   1 - abs * tokens.scaleStep),
      opacity: Math.max(tokens.minOpacity, 1 - abs * tokens.opacityStep)
    };
  }

  function applyState(cardEl, state, animate) {
    if (reducedMotion()) {
      gsap.set(cardEl, {
        x: state.x, y: 0, z: 0, rotateY: 0,
        scale: state.scale, opacity: state.opacity
      });
      return;
    }
    if (animate) {
      gsap.to(cardEl, {
        x: state.x, y: state.y, z: state.z, rotateY: state.rotateY,
        scale: state.scale, opacity: state.opacity,
        duration: 0.35, ease: "power2.out", overwrite: "auto"
      });
    } else {
      gsap.set(cardEl, {
        x: state.x, y: state.y, z: state.z, rotateY: state.rotateY,
        scale: state.scale, opacity: state.opacity
      });
    }
  }

  function updateFromVPos(vPos, animate) {
    cardEls.forEach((cardEl, i) => {
      applyState(cardEl, getVisualState(i, vPos), animate);
      cardEl.style.zIndex = String(Math.round(20 - Math.abs(i - vPos) * 4));
    });
  }

  function snapTo(index, duration) {
    const clamped = Math.max(0, Math.min(cards.length - 1, index));
    const targetX = -clamped * tokens.spacing;
    const dur = duration !== undefined ? duration : tokens.snapDuration;

    return new Promise((resolve) => {
      if (reducedMotion() || dur === 0) {
        gsap.set(proxyEl, { x: targetX });
        activeIndex = clamped;
        updateFromVPos(clamped, false);
        onActiveChange && onActiveChange(clamped);
        resolve();
        return;
      }
      gsap.to(proxyEl, {
        x: targetX,
        duration: dur,
        ease: "power3.out",
        onUpdate() {
          const vPos = -gsap.getProperty(proxyEl, "x") / tokens.spacing;
          updateFromVPos(vPos, false);
        },
        onComplete() {
          activeIndex = clamped;
          updateFromVPos(clamped, false);
          onActiveChange && onActiveChange(clamped);
          resolve();
        }
      });
    });
  }

  function mount() {
    stageEl = document.createElement("div");
    stageEl.className = "carousel-stage";
    stageEl.setAttribute("aria-label", `Collection ${collection.name}`);
    containerEl.appendChild(stageEl);

    const anchor = document.createElement("div");
    anchor.className = "carousel-anchor";
    stageEl.appendChild(anchor);

    proxyEl = document.createElement("div");
    proxyEl.style.cssText =
      "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;" +
      "left:-9999px;top:-9999px;";
    document.body.appendChild(proxyEl);
    gsap.set(proxyEl, { x: 0 });

    cardEls = cards.map((card) => {
      const el = buildCardEl(card, collection, discoveredIds.has(card.id));
      anchor.appendChild(el);
      return el;
    });

    updateFromVPos(0, false);

    const minX = -(cards.length - 1) * tokens.spacing;
    const maxX = 0;

    draggableInstance = Draggable.create(proxyEl, {
      type: "x",
      trigger: stageEl,
      bounds: { minX, maxX },
      edgeResistance: 0.65,
      onDragStart() {
        didDrag = false;
        gsap.killTweensOf(proxyEl);
      },
      onDrag() {
        if (Math.abs(this.x - this.startX) > DRAG_CLICK_THRESHOLD) didDrag = true;
        const vPos = -this.x / tokens.spacing;
        updateFromVPos(vPos, false);
      },
      onDragEnd() {
        const vPos = -this.x / tokens.spacing;
        const nearest = Math.max(0, Math.min(cards.length - 1, Math.round(vPos)));
        snapTo(nearest);
        requestAnimationFrame(() => { didDrag = false; });
      }
    })[0];

    cardEls.forEach((cardEl, i) => {
      cardEl.addEventListener("click", () => {
        if (didDrag) return;
        if (i !== activeIndex) {
          snapTo(i);
        } else if (!discoveredIds.has(cards[i].id) && !reducedMotion()) {
          gsap.to(cardEl, {
            y: "+=7", duration: 0.09, ease: "power2.out",
            yoyo: true, repeat: 1, overwrite: "auto"
          });
        }
      }, { signal });
    });

    document.addEventListener("keydown", handleKeyDown, { signal });
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowLeft" && activeIndex > 0) {
      e.preventDefault();
      snapTo(activeIndex - 1);
    } else if (e.key === "ArrowRight" && activeIndex < cards.length - 1) {
      e.preventDefault();
      snapTo(activeIndex + 1);
    }
  }

  function refresh() {
    if (!proxyEl || !draggableInstance) return;
    const minX = -(cards.length - 1) * tokens.spacing;
    const maxX = 0;
    draggableInstance.applyBounds({ minX, maxX });
    const targetX = -activeIndex * tokens.spacing;
    gsap.set(proxyEl, { x: targetX });
    updateFromVPos(activeIndex, true);
  }

  function destroy() {
    abortController.abort();
    if (draggableInstance) draggableInstance.kill();
    if (proxyEl) { gsap.killTweensOf(proxyEl); proxyEl.remove(); }
    gsap.killTweensOf(cardEls);
    containerEl.innerHTML = "";
    cardEls = [];
    proxyEl = null;
    stageEl = null;
  }

  return { mount, destroy, snapTo, refresh, getActiveIndex: () => activeIndex };
}
