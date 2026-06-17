import "./styles.css";
import gsap from "gsap";
import { preloadAssets } from "./utils/preload-assets.js";
import { createGrid, resetRevealedState } from "./components/create-grid.js";
import { createDebugPanel, resetDebugPanel } from "./components/create-debug-panel.js";
import { createRevealController } from "./animation/reveal-controller.js";

// ─── DOM refs ────────────────────────────────────────────────────────────────
const loadingScreen   = document.getElementById("loading-screen");
const loadingBar      = document.getElementById("loading-bar");
const gridEl          = document.getElementById("card-grid");
const gridContainer   = document.getElementById("grid-container");
const revealOverlay   = document.getElementById("reveal-overlay");
const stageEl         = document.getElementById("reveal-stage");
const overlayEl       = document.getElementById("scene-overlay");
const revealActions   = document.getElementById("reveal-actions");
const revealHeadline  = document.getElementById("reveal-headline");
const btnSeeSheet     = document.getElementById("btn-see-sheet");
const btnContinue     = document.getElementById("btn-continue");
const dataPanelEl     = document.getElementById("data-panel");
const dataPanelTitle  = document.getElementById("data-panel-title");
const dataPanelFields = document.getElementById("data-panel-fields");
const dataPanelClose  = document.getElementById("data-panel-close");
const progressDisplay = document.getElementById("progress-display");
const settingsBtn     = document.getElementById("settings-btn");
const debugPanel      = document.getElementById("debug-panel");
const debugClose      = document.getElementById("debug-close");
const debugPanelBody  = document.getElementById("debug-panel-body");
const debugReplay     = document.getElementById("debug-replay");
const debugResetCol   = document.getElementById("debug-reset-col");
const debugResetSets  = document.getElementById("debug-reset-settings");
const headerEl        = document.getElementById("app-header");
const navEl           = document.getElementById("app-nav");

// ─── Ambient animations ────────────────────────────────────────────────────
let ambientTimelines = [];

function startAmbientAnimations(cardEls) {
  ambientTimelines.forEach((t) => t.kill());
  ambientTimelines = [];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  cardEls.forEach((card, i) => {
    const seed = i * 1.618;
    const duration = 6 + (seed % 4);
    const delay = seed % 2.5;
    const yAmt = 1 + (seed % 1);
    const rotAmt = 0.1 + (seed % 0.2);

    const tl = gsap.timeline({ repeat: -1, yoyo: true, delay });
    tl.to(card, {
      y: yAmt,
      rotation: rotAmt,
      duration,
      ease: "sine.inOut"
    }).to(card, {
      y: -yAmt * 0.5,
      rotation: -rotAmt * 0.6,
      duration: duration * 0.8,
      ease: "sine.inOut"
    });

    ambientTimelines.push(tl);
  });

  // Scene glow pulse
  const glowEl = document.querySelector(".scene-glow");
  if (glowEl) {
    const glowTl = gsap.timeline({ repeat: -1, yoyo: true });
    glowTl.to(glowEl, { opacity: 0.55, duration: 7, ease: "sine.inOut" });
    ambientTimelines.push(glowTl);
  }
}

// ─── Parallax on pointer move ─────────────────────────────────────────────
function setupParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let rafId = null;
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;

  function applyParallax() {
    const nx = (mx / window.innerWidth - 0.5) * 2;
    const ny = (my / window.innerHeight - 0.5) * 2;
    gsap.to(".scene-glow", {
      x: nx * 18,
      y: ny * 12,
      duration: 1.2,
      ease: "power1.out"
    });
    gsap.to("#grid-container", {
      x: nx * 4,
      y: ny * 3,
      duration: 1.2,
      ease: "power1.out"
    });
    rafId = null;
  }

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(applyParallax);
  });

  document.addEventListener("touchmove", (e) => {
    if (e.touches[0]) {
      mx = e.touches[0].clientX;
      my = e.touches[0].clientY;
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    }
  }, { passive: true });
}

// ─── Boot ─────────────────────────────────────────────────────────────────
async function boot() {
  gsap.set(loadingScreen, { opacity: 1 });

  await preloadAssets((progress) => {
    gsap.to(loadingBar, { width: `${progress * 100}%`, duration: 0.3, ease: "power2.out" });
  });

  // Build the grid
  const { cardEls, revealed, getCardData, isRevealable } = createGrid(gridEl);

  // Set up debug panel
  createDebugPanel(debugPanelBody, () => {});

  // Wire reveal controller
  const controller = createRevealController({
    cardEls, getCardData, isRevealable, revealed,
    stageEl, overlayEl, gridEl: gridContainer, navEl, headerEl,
    revealOverlay, revealActions, revealHeadline,
    btnSeeSheet, btnContinue,
    dataPanelEl, dataPanelTitle, dataPanelFields, dataPanelClose,
    progressDisplay,
    onRevealComplete: () => {}
  });

  // Debug panel controls
  settingsBtn.addEventListener("click", () => {
    debugPanel.hidden = !debugPanel.hidden;
  });
  debugClose.addEventListener("click", () => {
    debugPanel.hidden = true;
  });

  debugResetSets.addEventListener("click", () => {
    resetDebugPanel(debugPanelBody, () => {});
  });

  debugResetCol.addEventListener("click", () => {
    resetRevealedState();
    // Reload page to reset grid state cleanly
    window.location.reload();
  });

  debugReplay.addEventListener("click", () => {
    // Replay the last revealed index if any, or reset all
    controller.resetAll();
    debugPanel.hidden = true;
  });

  // Start ambient life
  startAmbientAnimations(cardEls);
  setupParallax();

  // Hide loading screen
  await gsap.to(loadingScreen, { opacity: 0, duration: 0.5, ease: "power2.out" }).then();
  loadingScreen.style.display = "none";

  // Fade in app
  gsap.fromTo("#app", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
}

document.addEventListener("DOMContentLoaded", boot);
