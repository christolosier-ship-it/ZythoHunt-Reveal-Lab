import { assetUrl } from "../utils/asset-url.js";
import { formatRange, formatService, natureLabel, parentName, recipeSections } from "./brassopedie-formatters.js";

const INERT_SELECTORS = ["#app-header", "#reveal-search-form", "#carousel-container", "#debug-panel"];
const FOCUSABLE_SELECTOR = "button, [href], input, select, textarea, summary, [tabindex]:not([tabindex='-1'])";

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
};
const paragraph = (text) => text ? el("p", "brassopedie-text", text) : null;
function section(title, children) {
  const box = el("section", "brassopedie-section");
  box.appendChild(el("h3", "brassopedie-section-title", title));
  children.filter(Boolean).forEach((child) => box.appendChild(child));
  return box;
}
function list(items) {
  const ul = el("ul", "brassopedie-list");
  items.forEach((item) => ul.appendChild(el("li", "", item)));
  return ul;
}

export function shouldOpenBrassopedie({ cardId, isDiscovered }) {
  return Boolean(cardId && isDiscovered?.(cardId));
}

export function getFocusTrapWrapIndex(activeIndex, count, shiftKey) {
  if (count <= 0) return null;
  if (shiftKey && activeIndex <= 0) return count - 1;
  if (!shiftKey && activeIndex >= count - 1) return 0;
  return null;
}

function setBackgroundInert(value) {
  INERT_SELECTORS.forEach((selector) => {
    const node = document.querySelector(selector);
    if (node) (/** @type {any} */ (node)).inert = value;
  });
}

function getFocusableNodes(root) {
  return Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter((node) => !node.disabled && node.offsetParent !== null);
}

export function createBrassopediePanel({ cardsById, onOpen, onClose }) {
  let overlay = null;
  let previousFocus = null;
  let cleanupKeydown = null;
  const byBrassoId = Object.fromEntries(Object.values(cardsById).map((card) => [card.id, card.brassopedie]));

  function close() {
    if (!overlay) return;
    cleanupKeydown?.();
    cleanupKeydown = null;
    overlay.remove();
    overlay = null;
    setBackgroundInert(false);
    onClose?.();
    previousFocus?.focus?.();
    previousFocus = null;
  }

  function render(card) {
    const entry = card.brassopedie;
    const parent = parentName(entry, byBrassoId);
    const service = formatService(entry);
    const recipe = entry.recette || {};
    const root = el("div", "brassopedie-modal");
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", `Fiche Brassopédie ${card.name}`);
    root.tabIndex = -1;

    const closeBtn = el("button", "brassopedie-close", "×");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Fermer la fiche Brassopédie");
    closeBtn.addEventListener("click", close);

    const cardBox = el("div", "brassopedie-card-zoom");
    const img = el("img", "brassopedie-card-image");
    img.src = assetUrl(card.image);
    img.alt = card.name;
    img.draggable = false;
    img.loading = "eager";
    img.decoding = "async";
    img.setAttribute("fetchpriority", "high");
    cardBox.append(img);

    const article = el("article", "brassopedie-panel");
    const header = el("header", "brassopedie-header");
    header.append(el("p", "brassopedie-kicker", natureLabel(entry.nature)), el("h2", "brassopedie-title", entry.nom));
    if (entry.origine?.libelle) header.append(el("p", "brassopedie-origin", entry.origine.libelle));
    if (parent) header.append(el("p", "brassopedie-parent", `Parent : ${parent}`));

    const badges = el("div", "brassopedie-badges");
    [
      ["Alcool", formatRange(entry.alcool, "%")],
      ["IBU", formatRange(entry.amertume, "")],
      ["EBC", formatRange(entry.couleur, "")],
      ["Fermentation", entry.fermentation?.type || "Variable"],
      ["Service", service.temperature]
    ].forEach(([label, value]) => badges.append(el("span", "brassopedie-badge", `${label} : ${value}`)));

    const recipeChildren = [];
    if (recipe.profilUnique === false) recipeChildren.push(paragraph("Profil variable selon le sous-style ou l’interprétation."));
    recipeChildren.push(paragraph(recipe.explicationProfil));
    recipeSections(recipe).forEach(({ title, items }) => recipeChildren.push(section(title, [list(items)])));

    const sources = el("details", "brassopedie-sources");
    sources.appendChild(el("summary", "", "Sources"));
    (entry.sources || []).forEach((source) => {
      sources.appendChild(paragraph([source.organisme, source.edition, source.reference, source.type].filter(Boolean).join(" · ")));
    });

    article.append(
      header,
      badges,
      section("Description", [paragraph(entry.description)]),
      section("Histoire & origines", [paragraph(entry.histoireEtOrigines)]),
      section("Service", [paragraph(`Température : ${service.temperature}`), service.glasses.length ? list(service.glasses) : null]),
      section("Recette typique", recipeChildren),
      sources
    );
    root.append(closeBtn, cardBox, article);
    return root;
  }

  function activateKeyboardTrap(modal) {
    const onKeyDown = (event) => {
      if (!overlay) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = getFocusableNodes(modal);
      const activeIndex = focusables.indexOf(document.activeElement);
      const nextIndex = getFocusTrapWrapIndex(activeIndex, focusables.length, event.shiftKey);
      if (nextIndex == null) return;

      event.preventDefault();
      focusables[nextIndex]?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    cleanupKeydown = () => document.removeEventListener("keydown", onKeyDown);
  }

  function open(cardId) {
    const card = cardsById[cardId];
    if (!card) return { status: "missing" };
    close();
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    overlay = el("div", "brassopedie-overlay");
    overlay.addEventListener("click", (event) => { if (event.target === overlay) close(); });
    const modal = render(card);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    setBackgroundInert(true);
    activateKeyboardTrap(modal);
    onOpen?.();
    modal.focus();
    return { status: "opened", cardId };
  }

  return { open, close, isOpen: () => Boolean(overlay) };
}
