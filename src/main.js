/** @typedef {any} Any */
import "./styles.css";
import "./card-presentation.css";
import "./background/background-integration.css";
import "./brassopedie/brassopedie-panel.css";
import "./brassopedie/brassopedie-library.css";
import "./carousel/carousel-layout.css";
import gsap from "gsap";
import { collectionBundles } from "./data/collections.js";
import { createCollectionManager, validateCollectionBundle } from "./data/collection-manager.js";
import { createBeerBackground } from "./background/beer-background.js";
import { backgroundSettings } from "./background/background-settings.js";
import { getCollectionBackgroundSettings } from "./background/background-presets.js";
import { getEditorialBackgroundPreset } from "./background/editorial-background-presets.js";
import { getStoredActiveCollectionId, setStoredActiveCollectionId } from "./app/active-collection-storage.js";
import { setPendingReveal, takePendingReveal } from "./app/pending-reveal-storage.js";
import { mountCollectionSession } from "./app/collection-session.js";
import { createAppNavigation, resolveMenuView } from "./app/app-navigation.js";
import { registerServiceWorker } from "./pwa/register-service-worker.js";
import { createDiscoveryRegistry } from "./discovery/discovery-registry.js";
import { createBrassopedieLibraryView } from "./brassopedie/brassopedie-library-view.js";

const $ = (id) => document.getElementById(id);

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

    const availabilityLabel = collection.assetsReady ? "Disponible" : "Images à compléter";
    button.setAttribute("aria-label", `${name.textContent} — ${availabilityLabel}`);

    button.append(name);
    button.addEventListener("click", () => onSelect(collection.id));
    listEl.appendChild(button);
  });
}

function createBackgroundFallback(hostEl, error) {
  console.error("Le fond animé n'a pas pu démarrer. L'application continue avec un fond statique.", error);
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
    const engine = createBeerBackground({ hostEl, settings: { ...backgroundSettings } });
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

function getNavigationViews() {
  return {
    zythosphere: $("zythosphere-view"),
    brassopedie: $("brassopedie-view"),
    degustation: $("degustation-view"),
    badges: $("badges-view"),
    reglages: $("reglages-view")
  };
}

function getSessionElements() {
  return {
    loadingBar: $("loading-bar"),
    carouselContainer: $("carousel-container"),
    revealStage: $("reveal-stage"),
    sceneOverlay: $("scene-overlay"),
    revealOverlay: $("reveal-overlay"),
    revealActions: $("reveal-actions"),
    revealHeadline: $("reveal-headline"),
    btnContinue: $("btn-continue"),
    revealSearchForm: $("reveal-search-form"),
    revealSearchInput: $("reveal-search-input"),
    revealSearchSubmit: $("reveal-search-submit"),
    revealSearchFeedback: $("reveal-search-feedback"),
    progressDisplay: $("progress-display")
  };
}

async function boot(navigation) {
  const loadingScreen = $("loading-screen");
  const pendingReveal = takePendingReveal();
  const collectionManager = createCollectionManager(collectionBundles, { initialCollectionId: getStoredActiveCollectionId() });
  const activeBundle = collectionManager.getActiveBundle();
  const { collection } = activeBundle;
  const background = mountBackground();
  applyCollectionBackground(background, collection);

  const activeCollectionLabel = $("active-collection-label");
  if (activeCollectionLabel) activeCollectionLabel.textContent = `Collection ${collection.name || collection.nom}`;
  renderCollectionSelector(collectionManager, collection.id, (collectionId) => {
    const result = collectionManager.setActiveCollection(collectionId);
    if (result.status !== "active") return;
    setStoredActiveCollectionId(collectionId);
    if (collectionId !== collection.id) window.location.reload();
  });

  const validation = validateCollectionBundle(activeBundle);
  if (!validation.valid) console.error(`Collection ${collection.name} invalide`, validation.errors);

  gsap.set(loadingScreen, { opacity: 1 });
  const discoveryRegistry = createDiscoveryRegistry(collectionBundles);
  const brassopedieRoot = $("brassopedie-view");
  let brassopedieLibrary = null;
  if (brassopedieRoot) {
    brassopedieLibrary = createBrassopedieLibraryView({
      root: brassopedieRoot,
      collectionBundles,
      registry: discoveryRegistry,
      initialCollectionId: collection.id
    });
  }
  navigation?.onViewChange((viewId) => {
    if (viewId === "brassopedie") brassopedieLibrary?.refresh();
  });

  await mountCollectionSession({
    bundle: activeBundle,
    elements: getSessionElements(),
    background,
    collectionBundles,
    pendingReveal,
    beforeValidReveal: () => {
      discoveryRegistry.refresh();
      brassopedieLibrary?.refresh();
      navigation?.showView("zythosphere");
    },
    onExternalMatch: (match) => {
      navigation?.showView("zythosphere");
      setStoredActiveCollectionId(match.collectionId);
      setPendingReveal(match);
      window.location.reload();
    }
  });

  await gsap.to(loadingScreen, { opacity: 0, duration: 0.5, ease: "power2.out" }).then();
  loadingScreen.style.display = "none";
  gsap.fromTo("#app", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
}

function mountAppMenu(navigation) {
  const toggle = $("app-menu-toggle");
  const menu = $("app-menu");
  if (!toggle || !menu) return;

  const menuButtons = Array.from(menu.querySelectorAll("[data-menu-view]"));

  const syncCurrent = (viewId) => {
    menuButtons.forEach((button) => {
      const isCurrent = resolveMenuView(/** @type {HTMLElement} */ (button).dataset.menuView) === viewId;
      button.classList.toggle("is-active", isCurrent);
      if (isCurrent) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  };

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  };

  const toggleMenu = () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
    menu.hidden = isOpen;
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  menu.addEventListener("click", (event) => {
    event.stopPropagation();
    const target = /** @type {Element | null} */ (event.target instanceof Element ? event.target : null);
    const button = /** @type {HTMLElement | null} */ (target?.closest("[data-menu-view]") || null);
    if (!button) return;
    const viewId = resolveMenuView(button.dataset.menuView);
    if (viewId && navigation?.showView(viewId)) syncCurrent(viewId);
    closeMenu();
  });
  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  navigation?.onViewChange(syncCurrent);
  syncCurrent(navigation?.getActiveView?.() || "zythosphere");
}

function showStartupError(error) {
  console.error("ZythoHunt startup failed", error);
  const loadingLabel = document.querySelector(".loading-label");
  if (loadingLabel) loadingLabel.textContent = "Erreur de chargement. Recharge la page.";
}

document.addEventListener("DOMContentLoaded", () => {
  const navigation = createAppNavigation({ views: getNavigationViews(), initialView: "zythosphere" });
  mountAppMenu(navigation);
  void registerServiceWorker().catch((error) => console.warn("Service worker registration failed", error));
  void boot(navigation).catch(showStartupError);
});
