/** @typedef {any} Any */
import "./styles.css";
import "./card-presentation.css";
import "./background/background-integration.css";
import "./brassopedie/brassopedie-panel.css";
import gsap from "gsap";
import { preloadAssets } from "./utils/preload-assets.js";
import { carouselTokens, resetCarouselTokens } from "./carousel/carousel-tokens.js";
import { createCarousel } from "./carousel/carousel-controller.js";
import { collections } from "./data/collections.js";
import { porterStoutCards, porterStoutCardsById, revealablePorterStoutCards, validatePorterStoutCollection } from "./data/porters-stouts-collection.js";
import { createDiscoveryStore } from "./discovery/discovery-store.js";
import { createBeerResolver } from "./discovery/beer-resolver.js";
import { createDiscoveryController } from "./discovery/discovery-controller.js";
import { createRevealEngine } from "./reveal/reveal-engine.js";
import { motionTokens, resetTokens } from "./animation/motion-tokens.js";
import { createBeerBackground } from "./background/beer-background.js";
import { backgroundSettings, resetBackgroundSettings } from "./background/background-settings.js";
import { createLabPanel } from "./lab/lab-panel.js";
import { createBrassopediePanel, shouldOpenBrassopedie } from "./brassopedie/brassopedie-panel.js";

const $ = (id) => document.getElementById(id);
const loadingScreen = $("loading-screen");
const loadingBar = $("loading-bar");
const collection = collections[0];

function createBackgroundFallback(hostEl, error) {
  console.error("Le fond animé n'a pas pu démarrer. Le laboratoire continue avec un fond statique.", error);
  hostEl?.replaceChildren();
  hostEl?.classList.add("is-static-fallback");

  return {
    isAvailable: false,
    update() {},
    pause() {},
    resume() {},
    destroy() {},
    getPaletteName() { return "statique"; }
  };
}

function mountBackground() {
  const hostEl = $("beer-background-root");
  try {
    const engine = createBeerBackground({ hostEl, settings: backgroundSettings });
    engine.mount();
    return { ...engine, isAvailable: true };
  } catch (error) {
    return createBackgroundFallback(hostEl, error);
  }
}

async function boot() {
  const background = mountBackground();

  gsap.set(loadingScreen, { opacity: 1 });
  await preloadAssets((progress) => gsap.to(loadingBar, {
    width: `${progress * 100}%`,
    duration: 0.3,
    ease: "power2.out"
  }));

  const validation = validatePorterStoutCollection();
  if (!validation.valid) console.error("Collection Porters & Stouts invalide", validation.errors);

  const store = createDiscoveryStore();
  const brassopediePanel = createBrassopediePanel({
    cardsById: porterStoutCardsById,
    onOpen: () => background.pause(),
    onClose: () => background.resume()
  });
  const carousel = createCarousel({
    containerEl: $("carousel-container"),
    cards: porterStoutCards,
    collection,
    tokens: carouselTokens,
    store,
    onInspect: (cardId) => {
      if (shouldOpenBrassopedie({ cardId, isDiscovered: store.isDiscovered })) brassopediePanel.open(cardId);
    }
  });
  carousel.mount();

  const revealEngine = createRevealEngine({
    stageEl: $("reveal-stage"),
    overlayEl: $("scene-overlay"),
    revealOverlay: $("reveal-overlay"),
    revealActions: $("reveal-actions"),
    revealHeadline: $("reveal-headline"),
    btnContinue: $("btn-continue"),
    motionTokens
  });

  const labPanel = createLabPanel({
    panelEl: $("debug-panel"),
    bodyEl: $("debug-panel-body"),
    settingsBtn: $("settings-btn"),
    closeBtn: $("debug-close"),
    resetBackgroundBtn: $("debug-reset-background"),
    background,
    carousel,
    canOpen: () => !revealEngine.isBusy()
  });
  labPanel.mount();

  const discovery = createDiscoveryController({
    formEl: $("reveal-search-form"),
    inputEl: $("reveal-search-input"),
    submitEl: $("reveal-search-submit"),
    feedbackEl: $("reveal-search-feedback"),
    carousel,
    revealEngine,
    store,
    resolver: createBeerResolver(revealablePorterStoutCards),
    cards: porterStoutCards,
    progressEl: $("progress-display"),
    closeSettings: labPanel.close,
    beforeReveal: () => background.pause(),
    afterReveal: () => background.resume()
  });
  discovery.mount();

  document.querySelectorAll("[data-focus-card]").forEach((btn) => {
    btn.addEventListener("click", () => carousel.focusCard((/** @type {HTMLElement} */ (btn)).dataset.focusCard));
  });

  $("debug-reset-col").addEventListener("click", async () => {
    if (revealEngine.isBusy()) return;
    await carousel.closeInspection();
    store.reset();
    revealablePorterStoutCards.forEach((card) => carousel.setDiscovered(card.id, false));
    discovery.updateProgress();
  });

  $("debug-reset-background").addEventListener("click", () => {
    resetBackgroundSettings();
    background.update(backgroundSettings);
    labPanel.render();
  });

  $("debug-reset-settings").addEventListener("click", () => {
    resetTokens();
    labPanel.render();
  });

  $("debug-reset-carousel").addEventListener("click", () => {
    resetCarouselTokens();
    labPanel.render();
    carousel.refresh();
  });

  $("debug-reset-all").addEventListener("click", async () => {
    await carousel.closeInspection();
    resetBackgroundSettings();
    background.update(backgroundSettings);
    resetCarouselTokens();
    resetTokens();
    labPanel.render();
    carousel.refresh();
  });

  $("debug-replay").addEventListener("click", async () => {
    if (revealEngine.isBusy()) return;
    const id = carousel.getActiveCardId();
    const card = revealablePorterStoutCards.find((candidate) => candidate.id === id);
    if (!card) return;

    labPanel.close();
    background.pause();
    let prepared = false;
    try {
      await carousel.prepareForReveal();
      prepared = true;
      const result = await revealEngine.reveal({
        cardEl: carousel.getCardElement(id),
        cardData: card,
        sceneContext: carousel.createRevealContext(id),
        mode: "full"
      });
      if (result.status === "completed") await revealEngine.returnToSource();
    } finally {
      if (prepared) carousel.unlock();
      background.resume();
    }
  });

  await gsap.to(loadingScreen, { opacity: 0, duration: 0.5, ease: "power2.out" }).then();
  loadingScreen.style.display = "none";
  gsap.fromTo("#app", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
}

document.addEventListener("DOMContentLoaded", boot);
