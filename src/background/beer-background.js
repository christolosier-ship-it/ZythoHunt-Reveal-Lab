import "./beer-background.css";
import { PARTICLE_PROFILES, getParticleBucket, getParticleTier } from "./particle-profile.js";

const BEER_STOPS = [
  { t: 0, name: "Stout", top: [22,55,10], mid: [20,70,5], bot: [20,85,2], glow: [28,70,22], rim: [35,80,35], foamHi: [32,25,78], foamMid: [30,30,68], foamLo: [28,35,55], lightness: .05 },
  { t: 15, name: "Brune", top: [24,75,20], mid: [22,80,12], bot: [20,85,6], glow: [34,75,35], rim: [38,85,48], foamHi: [34,35,84], foamMid: [32,38,74], foamLo: [30,40,62], lightness: .18 },
  { t: 30, name: "Kriek", top: [4,78,32], mid: [2,85,20], bot: [358,90,10], glow: [12,85,50], rim: [18,90,60], foamHi: [14,55,90], foamMid: [12,55,82], foamLo: [10,50,70], lightness: .35 },
  { t: 45, name: "Sour orange", top: [24,90,52], mid: [22,92,36], bot: [20,92,20], glow: [32,95,65], rim: [38,95,72], foamHi: [30,80,94], foamMid: [28,75,88], foamLo: [26,70,78], lightness: .55 },
  { t: 60, name: "Ambrée", top: [38,90,56], mid: [34,88,42], bot: [30,85,24], glow: [44,95,70], rim: [48,95,78], foamHi: [42,80,95], foamMid: [40,75,90], foamLo: [36,65,80], lightness: .65 },
  { t: 80, name: "Blonde", top: [48,95,64], mid: [44,92,50], bot: [40,88,30], glow: [52,95,80], rim: [54,95,86], foamHi: [50,85,97], foamMid: [48,80,92], foamLo: [44,70,84], lightness: .82 },
  { t: 100, name: "Pâle", top: [56,90,84], mid: [52,80,70], bot: [48,70,48], glow: [58,95,92], rim: [58,95,95], foamHi: [54,60,98], foamMid: [52,55,95], foamLo: [50,45,88], lightness: .98 }
];

const lerp = (a, b, t) => a + (b - a) * t;
const lerpTriplet = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

/** @param {number[]} triplet */
const toHsl = (triplet, alpha = 1) => {
  const [h, s, l] = triplet;
  return alpha < 1
    ? `hsl(${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}% / ${alpha})`
    : `hsl(${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%)`;
};

function getPalette(value) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  let start = BEER_STOPS[0];
  let end = BEER_STOPS.at(-1);

  for (let index = 0; index < BEER_STOPS.length - 1; index += 1) {
    if (clamped >= BEER_STOPS[index].t && clamped <= BEER_STOPS[index + 1].t) {
      start = BEER_STOPS[index];
      end = BEER_STOPS[index + 1];
      break;
    }
  }

  const progress = (clamped - start.t) / Math.max(1, end.t - start.t);
  return {
    name: progress < .5 ? start.name : end.name,
    top: lerpTriplet(start.top, end.top, progress),
    mid: lerpTriplet(start.mid, end.mid, progress),
    bot: lerpTriplet(start.bot, end.bot, progress),
    glow: lerpTriplet(start.glow, end.glow, progress),
    rim: lerpTriplet(start.rim, end.rim, progress),
    foamHi: lerpTriplet(start.foamHi, end.foamHi, progress),
    foamMid: lerpTriplet(start.foamMid, end.foamMid, progress),
    foamLo: lerpTriplet(start.foamLo, end.foamLo, progress),
    lightness: lerp(start.lightness, end.lightness, progress)
  };
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const randomFamily = (random) => 1 + Math.floor(random() * 4);

function makeMicro(count, seed = 101) {
  const random = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    i,
    size: 1.2 + random() * 3.2,
    left: random() * 100,
    duration: 14 + random() * 18,
    delay: -random() * 30,
    drift: (random() - .5) * 18,
    opacity: .12 + random() * .35,
    family: randomFamily(random)
  }));
}

function makeMain(count, seed = 202) {
  const random = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => {
    const depth = random();
    return {
      i,
      size: 5 + depth * 22 + random() * 6,
      left: random() * 100,
      duration: 7 + (1 - depth) * 8 + random() * 4,
      delay: -random() * 22,
      drift: (random() - .5) * 60,
      opacity: .35 + depth * .5,
      blur: (1 - depth) * 1.6,
      squash: .92 + random() * .16,
      family: randomFamily(random),
      shineX: 22 + random() * 24,
      shineY: 20 + random() * 22
    };
  });
}

function makeHero(count, seed = 303) {
  const random = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    i,
    size: 36 + random() * 44,
    left: random() * 100,
    duration: 5 + random() * 4,
    delay: -random() * 12,
    drift: (random() - .5) * 120,
    opacity: .18 + random() * .18,
    blur: 2 + random() * 3,
    tilt: (random() - .5) * 30
  }));
}

function makeFoam(count, seed = 404) {
  const random = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => {
    const top = random() * 100;
    const layer = top < 35 ? "hi" : top < 75 ? "mid" : "lo";
    const size = layer === "hi"
      ? 4 + random() * 10
      : layer === "mid"
        ? 8 + random() * 22
        : 14 + random() * 34;

    return {
      i,
      size,
      left: random() * 100,
      top,
      opacity: layer === "hi"
        ? .7 + random() * .3
        : layer === "mid"
          ? .55 + random() * .4
          : .35 + random() * .45,
      duration: 4 + random() * 8,
      delay: -random() * 10,
      family: randomFamily(random),
      layer
    };
  });
}

const toCssProperty = (property) => property.startsWith("--")
  ? property
  : property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const span = (className, styles = {}) => {
  const node = document.createElement("span");
  node.className = className;
  Object.entries(styles).forEach(([property, value]) => {
    node.style.setProperty(toCssProperty(property), String(value));
  });
  return node;
};

const blurValue = (value, scale) => {
  const scaled = value * scale;
  return scaled > .2 ? `blur(${scaled.toFixed(2)}px)` : "";
};

export function createBeerBackground({ hostEl, settings }) {
  let root = null;
  let tier = getParticleTier();
  let densityBucket = null;
  let foamBucket = null;
  let manualPause = false;
  let resizeTimer = 0;

  const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const abortController = new AbortController();
  const { signal } = abortController;
  const refs = {};

  function buildStructure() {
    root = document.createElement("div");
    root.className = "beer-stage";
    root.dataset.tier = tier;
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = `
      <div class="beer-liquid"></div><div class="beer-depth"></div>
      <div class="beer-caustics c1"></div><div class="beer-caustics c2"></div>
      <div class="beer-rim"></div><div class="beer-vignette"></div>
      <div class="beer-shine s1"></div><div class="beer-shine s2"></div><div class="beer-shine s3"></div>
      <div class="beer-bubbles micro-layer"></div><div class="beer-bubbles main-layer"></div><div class="beer-bubbles hero-layer"></div>
      <div class="beer-surface"><div class="surface-line"></div><div class="surface-ripple r1"></div><div class="surface-ripple r2"></div></div>
      <div class="beer-foam"><div class="foam-layer lo"></div><div class="foam-layer mid"></div><div class="foam-layer hi"></div><div class="foam-bubbles"></div><div class="foam-edge"></div></div>`;

    refs.micro = root.querySelector(".micro-layer");
    refs.main = root.querySelector(".main-layer");
    refs.hero = root.querySelector(".hero-layer");
    refs.surface = root.querySelector(".beer-surface");
    refs.foam = root.querySelector(".beer-foam");
    refs.foamBubbles = root.querySelector(".foam-bubbles");
    hostEl.appendChild(root);
  }

  function applyPalette() {
    const palette = getPalette(settings.beerT);
    const lightness = palette.lightness;
    const foamHeight = 8 + (settings.foamIntensity / 100) * 26;
    const speed = (0.75 + lightness * .45) * (reducedQuery.matches ? .25 : 1);
    const rimStrength = .35 + (1 - lightness) * .55;
    const props = {
      "--liq-top": toHsl(palette.top),
      "--liq-mid": toHsl(palette.mid),
      "--liq-bot": toHsl(palette.bot),
      "--liq-glow": toHsl(palette.glow, .55),
      "--liq-glow-soft": toHsl(palette.glow, .22),
      "--liq-rim": toHsl(palette.rim, rimStrength),
      "--liq-deep": toHsl([palette.bot[0], palette.bot[1], Math.max(2, palette.bot[2] - 4)], .85),
      "--bub-tint": toHsl(palette.rim, .18),
      "--foam-hi": toHsl(palette.foamHi),
      "--foam-mid": toHsl(palette.foamMid),
      "--foam-lo": toHsl(palette.foamLo, .85),
      "--foam-lo-soft": toHsl(palette.foamLo, 0),
      "--speed": speed.toFixed(3),
      "--caustic-op": (.18 + lightness * .45).toFixed(3),
      "--micro-vis": (.25 + lightness * .85).toFixed(3),
      "--foam-height": `${foamHeight}vh`
    };

    Object.entries(props).forEach(([key, value]) => root.style.setProperty(key, value));
    refs.surface.style.top = "calc(var(--foam-height) - 6px)";
    refs.foam.style.height = "var(--foam-height)";
    refs.foam.style.opacity = String(.5 + (settings.foamIntensity / 100) * .5);
    root.dataset.palette = palette.name;
  }

  function renderBubbleLayers(profile, bucket) {
    const density = bucket / 100;
    const counts = {
      micro: Math.round(profile.caps.micro * (.35 + density * .65)),
      main: Math.round(profile.caps.main * (.25 + density * .75)),
      hero: Math.max(1, Math.round(profile.caps.hero * (.2 + density * .8)))
    };

    refs.micro.replaceChildren(
      ...makeMicro(counts.micro).map((bubble) => span(`micro f${bubble.family}`, {
        width: `${bubble.size}px`,
        height: `${bubble.size}px`,
        left: `${bubble.left}%`,
        animationDuration: `${bubble.duration}s`,
        animationDelay: `${bubble.delay}s`,
        opacity: bubble.opacity,
        "--drift": `${bubble.drift}px`
      }))
    );

    refs.main.replaceChildren(
      ...makeMain(counts.main).map((bubble) => span(`bubble f${bubble.family}`, {
        width: `${bubble.size}px`,
        height: `${bubble.size * bubble.squash}px`,
        left: `${bubble.left}%`,
        animationDuration: `${bubble.duration}s`,
        animationDelay: `${bubble.delay}s`,
        opacity: bubble.opacity,
        filter: blurValue(bubble.blur, profile.mainBlurScale),
        "--drift": `${bubble.drift}px`,
        "--sx": `${bubble.shineX}%`,
        "--sy": `${bubble.shineY}%`
      }))
    );

    refs.hero.replaceChildren(
      ...makeHero(counts.hero).map((bubble) => span("hero-bubble", {
        width: `${bubble.size}px`,
        height: `${bubble.size}px`,
        left: `${bubble.left}%`,
        animationDuration: `${bubble.duration}s`,
        animationDelay: `${bubble.delay}s`,
        opacity: bubble.opacity,
        filter: blurValue(bubble.blur, profile.heroBlurScale),
        "--drift": `${bubble.drift}px`,
        "--tilt": `${bubble.tilt}deg`
      }))
    );
  }

  function renderFoamLayer(profile, bucket) {
    const foam = bucket / 100;
    const count = Math.round(profile.caps.foam * (.3 + foam * .7));
    refs.foamBubbles.replaceChildren(
      ...makeFoam(count).map((bubble) => span(`foam-bubble fl-${bubble.layer} fa-${bubble.family}`, {
        width: `${bubble.size}px`,
        height: `${bubble.size}px`,
        left: `${bubble.left}%`,
        top: `${bubble.top}%`,
        opacity: bubble.opacity,
        animationDuration: `${bubble.duration}s`,
        animationDelay: `${bubble.delay}s`
      }))
    );
  }

  function renderParticles({ force = false } = {}) {
    const profile = PARTICLE_PROFILES[tier];
    const nextDensityBucket = getParticleBucket(settings.bubbleDensity);
    const nextFoamBucket = getParticleBucket(settings.foamIntensity);

    if (force || nextDensityBucket !== densityBucket) {
      densityBucket = nextDensityBucket;
      renderBubbleLayers(profile, densityBucket);
    }

    if (force || nextFoamBucket !== foamBucket) {
      foamBucket = nextFoamBucket;
      renderFoamLayer(profile, foamBucket);
    }
  }

  function syncPauseState() {
    root.classList.toggle("is-paused", manualPause || document.hidden);
    root.classList.toggle("is-reduced", reducedQuery.matches);
  }

  function mount() {
    if (root) return;
    buildStructure();
    applyPalette();
    renderParticles({ force: true });
    syncPauseState();

    document.addEventListener("visibilitychange", syncPauseState, { signal });
    reducedQuery.addEventListener?.("change", () => {
      applyPalette();
      syncPauseState();
    }, { signal });

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const nextTier = getParticleTier();
        if (nextTier === tier) return;
        tier = nextTier;
        root.dataset.tier = tier;
        renderParticles({ force: true });
      }, 160);
    }, { signal });
  }

  function update(next = {}) {
    Object.assign(settings, next);
    applyPalette();
    renderParticles();
  }

  function pause() {
    manualPause = true;
    syncPauseState();
  }

  function resume() {
    manualPause = false;
    syncPauseState();
  }

  function destroy() {
    clearTimeout(resizeTimer);
    abortController.abort();
    root?.remove();
    root = null;
  }

  return {
    mount,
    update,
    pause,
    resume,
    destroy,
    getPaletteName: () => root?.dataset.palette || getPalette(settings.beerT).name
  };
}
