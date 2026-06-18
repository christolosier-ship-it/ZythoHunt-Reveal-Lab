import "./styles.css";
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

const $ = (id) => document.getElementById(id);
const loadingScreen = $("loading-screen"), loadingBar = $("loading-bar"), settingsBtn = $("settings-btn"), debugPanel = $("debug-panel"), debugBody = $("debug-panel-body");
const collection = collections[0];
const CAROUSEL_CONTROLS = [
  ["spacing", "Espacement", 80, 280, 4, "px"], ["depthStep", "Profondeur", 0, 250, 10, "px"], ["rotationStep", "Rotation latérale", 0, 40, 1, "°"], ["scaleStep", "Réduction d'échelle", 0, .25, .01, ""], ["minScale", "Échelle minimale", .3, 1, .02, ""], ["opacityStep", "Réduction d'opacité", 0, .4, .01, ""], ["minOpacity", "Opacité minimale", .2, 1, .05, ""], ["snapDuration", "Durée du snap", .05, 1.2, .05, "s"]
];

function addCarouselPanel(carousel) {
  const title = document.createElement("h3"); title.className = "debug-section-title"; title.textContent = "Carrousel"; debugBody.appendChild(title);
  CAROUSEL_CONTROLS.forEach(([key, label, min, max, step, unit]) => {
    const row = document.createElement("div"); row.className = "debug-row";
    row.innerHTML = `<label class="debug-label" for="csl-${key}">${label}</label><div class="debug-input-row"><input class="debug-range" id="csl-${key}" type="range" min="${min}" max="${max}" step="${step}" value="${carouselTokens[key]}"><span class="debug-value">${carouselTokens[key]}${unit}</span></div>`;
    const input = row.querySelector("input"), value = row.querySelector("span");
    input.addEventListener("input", () => { const v = parseFloat(input.value); updateCarouselToken(key, v); value.textContent = `${v}${unit}`; carousel.refresh(); });
    debugBody.appendChild(row);
  });
}
function buildPanel(carousel) { debugBody.innerHTML = '<h3 class="debug-section-title">Révélation</h3>'; createDebugPanel(debugBody, () => {}); addCarouselPanel(carousel); }

async function boot() {
  gsap.set(loadingScreen, { opacity: 1 });
  await preloadAssets((progress) => gsap.to(loadingBar, { width: `${progress * 100}%`, duration: .3, ease: "power2.out" }));
  const store = createDiscoveryStore();
  const carousel = createCarousel({ containerEl: $("carousel-container"), cards: prototypeCards, collection, tokens: carouselTokens, store });
  carousel.mount();
  buildPanel(carousel);
  const revealEngine = createRevealEngine({ stageEl: $("reveal-stage"), overlayEl: $("scene-overlay"), revealOverlay: $("reveal-overlay"), revealActions: $("reveal-actions"), revealHeadline: $("reveal-headline"), btnContinue: $("btn-continue"), motionTokens });
  const discovery = createDiscoveryController({ formEl: $("reveal-search-form"), inputEl: $("reveal-search-input"), submitEl: $("reveal-search-submit"), feedbackEl: $("reveal-search-feedback"), carousel, revealEngine, store, resolver: createBeerResolver(revealablePrototypeCards), cards: prototypeCards, progressEl: $("progress-display"), settingsPanelEl: debugPanel, beforeReveal: () => settingsBtn.setAttribute("aria-expanded", "false") });
  discovery.mount();

  settingsBtn.addEventListener("click", () => { const open = debugPanel.hidden; debugPanel.hidden = !open; settingsBtn.setAttribute("aria-expanded", String(open)); });
  $("debug-close").addEventListener("click", () => { debugPanel.hidden = true; settingsBtn.setAttribute("aria-expanded", "false"); });
  document.querySelectorAll("[data-focus-card]").forEach((btn) => btn.addEventListener("click", () => carousel.focusCard(btn.dataset.focusCard)));
  $("debug-reset-col").addEventListener("click", () => { store.reset(); revealablePrototypeCards.forEach((c) => carousel.setDiscovered(c.id, false)); discovery.updateProgress(); });
  $("debug-reset-settings").addEventListener("click", () => { resetDebugPanel(debugBody, () => {}); addCarouselPanel(carousel); });
  $("debug-reset-carousel").addEventListener("click", () => { resetCarouselTokens(); buildPanel(carousel); carousel.refresh(); });
  $("debug-reset-all").addEventListener("click", () => { resetCarouselTokens(); resetDebugPanel(debugBody, () => {}); buildPanel(carousel); carousel.refresh(); });
  $("debug-replay").addEventListener("click", async () => { const id = carousel.getActiveCardId(); const card = revealablePrototypeCards.find((c) => c.id === id); if (!card) return; debugPanel.hidden = true; carousel.lock(); try { await revealEngine.reveal({ cardEl: carousel.getCardElement(id), cardData: card, sceneContext: carousel.createRevealContext(id), mode: "full" }); await revealEngine.returnToSource(); } finally { carousel.unlock(); } });

  await gsap.to(loadingScreen, { opacity: 0, duration: .5, ease: "power2.out" }).then();
  loadingScreen.style.display = "none"; gsap.fromTo("#app", { opacity: 0 }, { opacity: 1, duration: .5, ease: "power2.out" });
}

document.addEventListener("DOMContentLoaded", boot);
