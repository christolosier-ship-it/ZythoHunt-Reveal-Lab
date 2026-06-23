/** @typedef {any} Any */
import "./styles.css";
import "./card-presentation.css";
import "./background/background-integration.css";
import "./brassopedie/brassopedie-panel.css";
import gsap from "gsap";
import { preloadAssets } from "./utils/preload-assets.js";
import { createAssetPreloadQueue } from "./utils/asset-preload-queue.js";
import { carouselTokens, resetCarouselTokens } from "./carousel/carousel-tokens.js";
import { createCarousel } from "./carousel/carousel-controller.js";
import { collectionBundles } from "./data/collections.js";
import { createCollectionManager, validateCollectionBundle } from "./data/collection-manager.js";
import { createDiscoveryStore } from "./discovery/discovery-store.js";
import { createDiscoveryController } from "./discovery/discovery-controller.js";
import { normalizeBeerName } from "./discovery/normalize-text.js";
import { createRevealEngine } from "./reveal/reveal-engine.js";
import { motionTokens, resetTokens } from "./animation/motion-tokens.js";
import { createBeerBackground } from "./background/beer-background.js";
import { backgroundSettings, resetBackgroundSettings } from "./background/background-settings.js";
import { getCollectionBackgroundSettings } from "./background/background-presets.js";
import { getEditorialBackgroundPreset } from "./background/editorial-background-presets.js";
import { createLabPanel } from "./lab/lab-panel.js";
import { createBrassopediePanel, shouldOpenBrassopedie } from "./brassopedie/brassopedie-panel.js";

const ACTIVE_COLLECTION_STORAGE_KEY = "zythohunt.activeCollectionId.v1";
const PENDING_REVEAL_STORAGE_KEY = "zythohunt.pendingReveal.v1";
const $ = (id) => document.getElementById(id);
const loadingScreen = $("loading-screen");
const loadingBar = $("loading-bar");

function getStoredActiveCollectionId() {
  try {
    return localStorage.getItem(ACTIVE_COLLECTION_STORAGE_KEY) || undefined;
  } catch {
    return undefined;
  }
}

function setStoredActiveCollectionId(collectionId) {
  try {
    localStorage.setItem(ACTIVE_COLLECTION_STORAGE_KEY, collectionId);
  } catch {}
}

function setPendingReveal(match) {
  try {
    localStorage.setItem(PENDING_REVEAL_STORAGE_KEY, JSON.stringify({ collectionId: match.collectionId, cardId: match.cardId }));
  } catch {}
}

function takePendingReveal() {
  try {
    const value = JSON.parse(localStorage.getItem(PENDING_REVEAL_STORAGE_KEY) || "null");
    localStorage.removeItem(PENDING_REVEAL_STORAGE_KEY);
    return value && value.collectionId && value.cardId ? value : null;
  } catch {
    return null;
  }
}

function createGlobalBeerResolver(bundles, preferredCollectionId) {
  const aliases = new Map();
  bundles.forEach((bundle) => {
    bundle.revealableCards.forEach((card) => {
      [card.name, ...(card.aliases || [])].forEach((alias) => {
        const key = normalizeBeerName(alias);
        if (!aliases.has(key)) aliases.set(key, []);
        aliases.get(key).push({
          collectionId: bundle.collection.id,
          collectionName: bundle.collection.name || bundle.collection.nom || bundle.collection.id,
          cardId: card.id,
          cardName: card.name
        });
      });
    });
  });

  return {
    resolve(input) {
      const matches = aliases.get(normalizeBeerName(input)) || [];
      if (!matches.length) return { status: "unknown" };
      const match = matches.find((candidate) => candidate.collectionId === preferredCollectionId) || matches[0];
      return { status: "matched", ...match, matches };
    }
  };
}

const collectionManager = createCollectionManager(collectionBundles, { initialCollectionId: getStoredActiveCollectionId() });

function renderCollectionSelector(manager, activeCollectionId, onSelect) {
  const listEl = $("collection-selector-list");
  if (!listEl) return;
  listEl.replaceChildren();

  manager.listCollections().forEach((collection) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "collection-selector-item";
    button.setAttribute("aria-pressed", collection.id === activeCollectionId ? "true" : "false");
    if (!collection.assetsReady) button.title = "Collection jouable avec placeholders en attendant les assets";

    const name = document.createElement("span");
    name.className = "collection-selector-name";
    name.textContent = collection.name || collection.nom || collection.id;

    const status = document.createElement("span");
    status.className = collection.assetsReady ? "collection-selector-status is-ready" : "collection-selector-status is-pending";
    status.textContent = collection.assetsReady ? "Disponible" : "Images à compléter";

    button.append(name, status);
    button.addEventListener("click", () => onSelect(collection.id));
    listEl.appendChild(button);
  });
}

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

function applyCollectionBackground(background, collection) {
  const nextSettings = getCollectionBackgroundSettings(backgroundSettings, getEditorialBackgroundPreset(collection));
  background.update(nextSettings);
  return nextSettings;
}

async function boot() {
  const pendingReveal = takePendingReveal();
  const activeBundle = collectionManager.getActiveBundle();
  const { collection, cards, cardsById, revealableCards } = activeBundle;
  const background = mountBackground();
  applyCollectionBackground(background, collection);
  const assetQueue = createAssetPreloadQueue({ cards });
  const activeCollectionLabel = $("active-collection-label");
  if (activeCollectionLabel) activeCollectionLabel.textContent = `Collection ${collection.name || collection.nom}`;
  renderCollectionSelector(collectionManager, collection.id, (collectionId) => {
    const result = collectionManager.setActiveCollection(collectionId);
    if (result.status !== "active") return;
    setStoredActiveCollectionId(collectionId);
    if (collectionId !== collection.id) window.location.reload();
  });

  gsap.set(loadingScreen, { opacity: 1 });
  await preloadAssets((progress) => gsap.to(loadingBar, {
    width: `${progress * 100}%`,
    duration: 0.3,
    ease: "power2.out"
  }), { cards });

  const validation = validateCollectionBundle(activeBundle);
  if (!validation.valid) console.error(`Collection ${collection.name} invalide`, validation.errors);

  const store = createDiscoveryStore({ key: collection.discoveryKey });
  const brassopediePanel = createBrassopediePanel({
    cardsById,
    onOpen: () => background.pause(),
    onClose: () => background.resume()
  });
  const carousel = createCarousel({
    containerEl: $("carousel-container"),
    cards,
    collection,
    tokens: carouselTokens,
    store,
    onActiveChange: (index) => { void assetQueue.preloadAround(index, { purpose: "thumb" }); },
    onInspect: (cardId) => {
      void assetQueue.preloadCard(cardId, { purpose: "full" });
      if (shouldOpenBrassopedie({ cardId, isDiscovered: store.isDiscovered })) brassopediePanel.open(cardId);
    }
  });
  carousel.mount();
  void assetQueue.preloadAround(4, { purpose: "thumb" });

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
    resolver: createGlobalBeerResolver(collectionBundles, collection.id),
    cards,
    progressEl: $("progress-display"),
    closeSettings: labPanel.close,
    beforeReveal: () => background.pause(),
    afterReveal: () => background.resume(),
    currentCollectionId: collection.id,
    onExternalMatch: (match) => {
      setStoredActiveCollectionId(match.collectionId);
      setPendingReveal(match);
      window.location.reload();
    }
  });
  discovery.mount();

  document.querySelectorAll("[data-focus-card]").forEach((btn) => {
    btn.addEventListener("click", () => carousel.focusCard((/** @type {HTMLElement} */ (btn)).dataset.focusCard));
  });

  $("debug-reset-col").addEventListener("click", async () => {
    if (revealEngine.isBusy()) return;
    await carousel.closeInspection();
    store.reset();
    revealableCards.forEach((card) => carousel.setDiscovered(card.id, false));
    discovery.updateProgress();
  });

  $("debug-reset-background").addEventListener("click", () => {
    resetBackgroundSettings();
    applyCollectionBackground(background, collection);
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
    applyCollectionBackground(background, collection);
    resetCarouselTokens();
    resetTokens();
    labPanel.render();
    carousel.refresh();
  });

  $("debug-replay").addEventListener("click", async () => {
    if (revealEngine.isBusy()) return;
    const id = carousel.getActiveCardId();
    const card = revealableCards.find((candidate) => candidate.id === id);
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

  if (pendingReveal?.collectionId === collection.id) {
    requestAnimationFrame(() => { void discovery.revealCard(pendingReveal.cardId, { focusInput: false }); });
  }
}

document.addEventListener("DOMContentLoaded", boot);
