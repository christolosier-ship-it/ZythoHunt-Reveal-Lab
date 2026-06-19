import { motionTokens, updateToken, resetTokens, getDefaults } from "../animation/motion-tokens.js";

const CONTROLS = [
  { key: "extractionDuration", label: "Durée d'extraction", min: 0.1, max: 2, step: 0.05, unit: "s" },
  { key: "flipDuration", label: "Durée du retournement", min: 0.1, max: 2, step: 0.05, unit: "s" },
  { key: "perspective", label: "Perspective", min: 400, max: 3000, step: 50, unit: "px" },
  { key: "tiltX", label: "Inclinaison X", min: -15, max: 15, step: 0.5, unit: "°" },
  { key: "tiltZ", label: "Inclinaison Z", min: -10, max: 10, step: 0.2, unit: "°" },
  { key: "finalScale", label: "Échelle finale", min: 0.5, max: 1.2, step: 0.02, unit: "" },
  { key: "maxNeighborShift", label: "Déplacement voisins", min: 0, max: 50, step: 1, unit: "px" },
  { key: "backgroundBlur", label: "Intensité du flou", min: 0, max: 20, step: 1, unit: "px" },
  { key: "glowIntensity", label: "Lueur ambiante", min: 0, max: 1, step: 0.05, unit: "" },
  { key: "specularIntensity", label: "Intensité du reflet", min: 0, max: 1, step: 0.05, unit: "" }
];

export function createDebugPanel(panelBodyEl, onTokenChange) {
  panelBodyEl.innerHTML = "";

  CONTROLS.forEach(({ key, label, min, max, step, unit }) => {
    const row = document.createElement("div");
    row.className = "debug-row";

    const lbl = document.createElement("label");
    lbl.className = "debug-label";
    lbl.textContent = label;
    lbl.htmlFor = `debug-${key}`;

    const inputRow = document.createElement("div");
    inputRow.className = "debug-input-row";

    const range = document.createElement("input");
    range.type = "range";
    range.id = `debug-${key}`;
    range.min = String(min);
    range.max = String(max);
    range.step = String(step);
    range.value = motionTokens[key];
    range.className = "debug-range";

    const val = document.createElement("span");
    val.className = "debug-value";
    val.textContent = `${motionTokens[key]}${unit}`;

    range.addEventListener("input", () => {
      const v = parseFloat(range.value);
      updateToken(key, v);
      val.textContent = `${v}${unit}`;
      onTokenChange && onTokenChange(key, v);
    });

    inputRow.appendChild(range);
    inputRow.appendChild(val);
    row.appendChild(lbl);
    row.appendChild(inputRow);
    panelBodyEl.appendChild(row);
  });
}

export function resetDebugPanel(panelBodyEl, onTokenChange) {
  resetTokens();
  createDebugPanel(panelBodyEl, onTokenChange);
}
