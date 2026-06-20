/** @typedef {any} Any */
import "./styles.css";
import "./card-presentation.css";
import "./background/background-integration.css";
import gsap from "gsap";
import { preloadAssets } from "./utils/preload-assets.js";
import { createDebugPanel, resetDebugPanel } from "./components/create-debug-panel.js";
import { carouselTokens, resetCarouselTokens, updateCarouselToken } from "./carousel/carousel-tokens.js";
import { createCarousel } from "./carousel/carousel-controller.js";
import { collections } from "./data/collections.js";
import { prototypeCards, revealablePrototypeCards } from "./data/prototype-carousel.js";
import { createDiscoveryStore } from "./discovery/discovery-store.js";
import { createBeerResolver } from "./discovery/beer-resolver.js";
import { createDiscoveryController } from "./discovery/discovery-controller.js";
import { createRevealEngine } from "./reveal/reveal-engine.js";
import { motionTokens } from "./animation/motion-tokens.js";
import { createBeerBackground } from "./background/beer-background.js";
import { backgroundSettings, resetBackgroundSettings, updateBackgroundSetting } from "./background/background-settings.js";

const $ = (id) => document.getElementById(id);
const loadingScreen = $("loading-screen"), loadingBar = $("loading-bar"), settingsBtn = $("settings-btn"), debugPanel = $("debug-panel"), debugBody = $("debug-panel-body");
const collection = collections[0];
const BACKGROUND_CONTROLS = [
  ["beerT", "Couleur de bière", 0, 100, 1, ""],
  ["bubbleDensity", "Densité des bulles", 0, 100, 5, "%"],
  ["foamIntensity", "Intensité de la mousse", 0, 100, 5, "%"]
];
const CAROUSEL_CONTROLS = [["spacing", "Espacement", 80, 280, 4, "px"], ["depthStep", "Profondeur", 0, 250, 10, "px"], ["rotationStep", "Rotation latérale", 0, 40, 1, "°"], ["scaleStep", "Réduction d'échelle", 0, .25, .01, ""], ["minScale", "Échelle minimale", .3, 1, .02, ""], ["opacityStep", "Réduction d'opacité", 0, .4, .01, ""], ["minOpacity", "Opacité minimale", .2, 1, .05, ""], ["snapDuration", "Durée du snap", .05, 1.2, .05, "s"]];

function appendSectionTitle(text) {
  const title = document.createElement("h3");
  title.className = "debug-section-title";
  title.textContent = text;
  debugBody.appendChild(title);
}

function appendRangeControl({ id, label, min, max, step, value, unit, onInput }) {
  const row = document.createElement("div");
  row.className = "debug-row";
  row.innerHTML = `<label class="debug-label" for="${id}">${label}</label><div class="debug-input-row"><input class="debug-range" id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"><span class="debug-value">${value}${unit}</span></div>`;
  const input = row.querySelector("input"), output = row.querySelector("span");
  input.addEventListener("input", () => onInput(parseFloat(input.value), output));
  debugBody.appendChild(row);
}

function addBackgroundPanel(background) {
  appendSectionTitle(`Fond animé · ${background.getPaletteName()}`);
  BACKGROUND_CONTROLS.forEach(([key, label, min, max, step, unit]) => appendRangeControl({
    id: `bg-${key}`, label, min, max, step, value: backgroundSettings[key], unit,
    onInput: (value, output) => {
      updateBackgroundSetting(key, value);
      background.update({ [key]: value });
      output.textContent = key === "beerT" ? `${value} · ${background.getPaletteName()}` : `${value}${unit}`;
    }
  }));
}

function addCarouselPanel(carousel) {
  appendSectionTitle("Carrousel");
  CAROUSEL_CONTROLS.forEach(([key, label, min, max, step, unit]) => appendRangeControl({
    id: `csl-${key}`, label, min, max, step, value: carouselTokens[key], unit,
    onInput: (value, output) => { updateCarouselToken(key, value); output.textContent = `${value}${unit}`; carousel.refresh(); }
  }));
}

function rebuildDebugPanel(carousel, background) {
  debugBody.innerHTML = "";
  addBackgroundPanel(background);
  appendSectionTitle("Révélation");
  createDebugPanel(debugBody, () => {});
  addCarouselPanel(carousel);
}

function closeSettings() { debugPanel.hidden = true; settingsBtn.setAttribute("aria-expanded", "false"); }

async function boot() {
  const background = createBeerBackground({ hostEl: $("beer-background-root"), settings: backgroundSettings });
  background.mount();
  gsap.set(loadingScreen, { opacity: 1 });
  await preloadAssets((progress) => gsap.to(loadingBar, { width: `${progress * 100}%`, duration: .3, ease: "power2.out" }));
  const store = createDiscoveryStore();
  const carousel = createCarousel({ containerEl: $("carousel-container"), cards: prototypeCards, collection, tokens: carouselTokens, store });
  carousel.mount(); rebuildDebugPanel(carousel, background);
  const revealEngine = createRevealEngine({ stageEl: $("reveal-stage"), overlayEl: $("scene-overlay"), revealOverlay: $("reveal-overlay"), revealActions: $("reveal-actions"), revealHeadline: $("reveal-headline"), btnContinue: $("btn-continue"), motionTokens });
  const discovery = createDiscoveryController({
    formEl: $("reveal-search-form"), inputEl: $("reveal-search-input"), submitEl: $("reveal-search-submit"), feedbackEl: $("reveal-search-feedback"),
    carousel, revealEngine, store, resolver: createBeerResolver(revealablePrototypeCards), cards: prototypeCards, progressEl: $("progress-display"), settingsPanelEl: debugPanel,
    beforeReveal: () => { closeSettings(); background.pause(); }, afterReveal: () => background.resume()
  });
  discovery.mount();

  settingsBtn.addEventListener("click", async () => { if (revealEngine.isBusy()) return; await carousel.closeInspection(); const open = debugPanel.hidden; debugPanel.hidden = !open; settingsBtn.setAttribute("aria-expanded", String(open)); });
  $("debug-close").addEventListener("click", closeSettings);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !debugPanel.hidden) closeSettings(); });
  document.querySelectorAll("[data-focus-card]").forEach((btn) => btn.addEventListener("click", () => carousel.focusCard((/** @type {HTMLElement} */ (btn)).dataset.focusCard)));
  $("debug-reset-col").addEventListener("click", async () => { if (revealEngine.isBusy()) return; await carousel.closeInspection(); store.reset(); revealablePrototypeCards.forEach((c) => carousel.setDiscovered(c.id, false)); discovery.updateProgress(); });
  $("debug-reset-background").addEventListener("click", () => { resetBackgroundSettings(); background.update(backgroundSettings); rebuildDebugPanel(carousel, background); });
  $("debug-reset-settings").addEventListener("click", () => { resetDebugPanel(debugBody, () => {}); rebuildDebugPanel(carousel, background); });
  $("debug-reset-carousel").addEventListener("click", () => { resetCarouselTokens(); rebuildDebugPanel(carousel, background); carousel.refresh(); });
  $("debug-reset-all").addEventListener("click", async () => { await carousel.closeInspection(); resetBackgroundSettings(); background.update(backgroundSettings); resetCarouselTokens(); resetDebugPanel(debugBody, () => {}); rebuildDebugPanel(carousel, background); carousel.refresh(); });
  $("debug-replay").addEventListener("click", async () => {
    if (revealEngine.isBusy()) return;
    const id = carousel.getActiveCardId(); const card = revealablePrototypeCards.find((c) => c.id === id); if (!card) return;
    closeSettings(); background.pause(); carousel.lock();
    try { const result = await revealEngine.reveal({ cardEl: carousel.getCardElement(id), cardData: card, sceneContext: carousel.createRevealContext(id), mode: "full" }); if (result.status === "completed") await revealEngine.returnToSource(); }
    finally { carousel.unlock(); background.resume(); }
  });

  await gsap.to(loadingScreen, { opacity: 0, duration: .5, ease: "power2.out" }).then();
  loadingScreen.style.display = "none"; gsap.fromTo("#app", { opacity: 0 }, { opacity: 1, duration: .5, ease: "power2.out" });
}

document.addEventListener("DOMContentLoaded", boot);
