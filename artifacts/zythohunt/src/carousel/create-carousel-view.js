import { carouselTokens, updateCarouselToken, resetCarouselTokens } from "./carousel-tokens.js";
import { createCarousel } from "./carousel-controller.js";
import { cards } from "../data/cards.js";
import { collections } from "../data/collections.js";

const CONTROLS = [
  { key: "spacing",       label: "Espacement",         min: 80,   max: 280,  step: 4,    unit: "px" },
  { key: "depthStep",     label: "Profondeur",          min: 0,    max: 250,  step: 10,   unit: "px" },
  { key: "rotationStep",  label: "Rotation latérale",   min: 0,    max: 40,   step: 1,    unit: "°"  },
  { key: "scaleStep",     label: "Réduction d'échelle", min: 0,    max: 0.25, step: 0.01, unit: ""   },
  { key: "minScale",      label: "Échelle minimale",    min: 0.3,  max: 1,    step: 0.02, unit: ""   },
  { key: "opacityStep",   label: "Réduction d'opacité", min: 0,    max: 0.4,  step: 0.01, unit: ""   },
  { key: "minOpacity",    label: "Opacité minimale",    min: 0.2,  max: 1,    step: 0.05, unit: ""   },
  { key: "snapDuration",  label: "Durée du snap",       min: 0.05, max: 1.2,  step: 0.05, unit: "s"  }
];

export function createCarouselView({ carouselContainerEl, debugBodyEl, onTokenChange }) {
  const collection = collections[0];
  const collectionCards = collection.cardIds
    .map((id) => cards.find((c) => c.id === id))
    .filter(Boolean);

  const carousel = createCarousel({
    containerEl: carouselContainerEl,
    cards: collectionCards,
    collection,
    tokens: carouselTokens,
    onActiveChange() {}
  });

  function buildDebugPanel() {
    debugBodyEl.innerHTML = "";
    CONTROLS.forEach(({ key, label, min, max, step, unit }) => {
      const row = document.createElement("div");
      row.className = "debug-row";

      const lbl = document.createElement("label");
      lbl.className = "debug-label";
      lbl.textContent = label;
      lbl.htmlFor = `csl-debug-${key}`;

      const inputRow = document.createElement("div");
      inputRow.className = "debug-input-row";

      const range = document.createElement("input");
      range.type = "range";
      range.id = `csl-debug-${key}`;
      range.min = String(min);
      range.max = String(max);
      range.step = String(step);
      range.value = String(carouselTokens[key]);
      range.className = "debug-range";

      const val = document.createElement("span");
      val.className = "debug-value";
      val.textContent = `${carouselTokens[key]}${unit}`;

      range.addEventListener("input", () => {
        const v = parseFloat(range.value);
        updateCarouselToken(key, v);
        val.textContent = `${v}${unit}`;
        onTokenChange && onTokenChange(key, v);
        carousel.refresh();
      });

      inputRow.appendChild(range);
      inputRow.appendChild(val);
      row.appendChild(lbl);
      row.appendChild(inputRow);
      debugBodyEl.appendChild(row);
    });
  }

  function mount() {
    buildDebugPanel();
    carousel.mount();
  }

  function destroy() {
    carousel.destroy();
  }

  function resetPanel() {
    resetCarouselTokens();
    buildDebugPanel();
    carousel.refresh();
  }

  return { mount, destroy, resetPanel };
}
