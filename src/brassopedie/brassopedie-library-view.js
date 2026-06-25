import { createBrassopediePanel } from "./brassopedie-panel.js";
import { natureLabel } from "./brassopedie-formatters.js";

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
};

export function getVisibleStyleLabel({ card, discovered }) {
  return discovered ? card?.name || card?.brassopedie?.nom || "Style révélé" : "???";
}

export function canOpenBrassopedieEntry({ discovered, card }) {
  return Boolean(discovered && card?.brassopedie);
}

export function buildBrassopedieLibraryModel({ collectionBundles = [], registry, selectedCollectionId }) {
  const selectedBundle = collectionBundles.find((bundle) => bundle.collection.id === selectedCollectionId) || collectionBundles[0] || null;
  return {
    selectedCollectionId: selectedBundle?.collection.id || null,
    collections: collectionBundles.map((bundle) => ({
      id: bundle.collection.id,
      name: bundle.collection.name || bundle.collection.nom || bundle.collection.id,
      progress: registry.getCollectionProgress(bundle.collection.id)
    })),
    styles: (selectedBundle?.revealableCards || []).map((card) => {
      const discovered = registry.isDiscovered(selectedBundle.collection.id, card.id);
      return { id: card.id, card, discovered, label: getVisibleStyleLabel({ card, discovered }), canOpen: canOpenBrassopedieEntry({ card, discovered }) };
    })
  };
}

export function resolveLibraryPanelCard({ collectionBundles = [], collectionId, cardId }) {
  const bundle = collectionBundles.find((item) => item.collection.id === collectionId);
  const card = bundle?.cardsById?.[cardId] || bundle?.revealableCards?.find((item) => item.id === cardId) || null;
  return card ? { card, cardsById: bundle.cardsById || Object.fromEntries((bundle.revealableCards || []).map((item) => [item.id, item])) } : null;
}

export function createBrassopedieLibraryView({ root, collectionBundles, registry, initialCollectionId, onOpen, onClose }) {
  let selectedCollectionId = initialCollectionId;
  const fallbackCardsById = collectionBundles[0]?.cardsById || Object.fromEntries((collectionBundles[0]?.revealableCards || []).map((card) => [card.id, card]));
  const brassopediePanel = createBrassopediePanel({ cardsById: fallbackCardsById, onOpen, onClose });

  function render() {
    registry.refresh();
    const model = buildBrassopedieLibraryModel({ collectionBundles, registry, selectedCollectionId });
    selectedCollectionId = model.selectedCollectionId;
    root.replaceChildren();

    const shell = el("div", "brassopedie-library");
    const layout = el("div", "brassopedie-library-layout");
    const collections = el("nav", "brassopedie-library-collections");
    collections.setAttribute("aria-label", "Collections Brassopédie");

    model.collections.forEach((collection) => {
      const btn = el("button", "brassopedie-library-collection", null);
      btn.type = "button";
      const active = collection.id === selectedCollectionId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-current", active ? "true" : "false");
      const name = el("span", "", collection.name);
      const progress = el("small", "", `${collection.progress.discovered} / ${collection.progress.total} révélés`);
      const meter = el("i", "", null);
      meter.style.setProperty("--progress", `${Math.round(collection.progress.ratio * 100)}%`);
      btn.append(name, progress, meter);
      btn.addEventListener("click", () => { selectedCollectionId = collection.id; render(); });
      collections.append(btn);
    });

    const main = el("div", "brassopedie-library-main");
    const grid = el("div", "brassopedie-library-grid");
    model.styles.forEach((style) => {
      const btn = el("button", `brassopedie-library-card ${style.discovered ? "is-revealed" : "is-locked"}`, null);
      btn.type = "button";
      btn.disabled = !style.canOpen;
      btn.setAttribute("aria-label", style.canOpen ? `Ouvrir la fiche ${style.label}` : "Style non révélé");
      btn.append(el("span", "brassopedie-library-thumb", style.discovered ? "✦" : "???"), el("strong", "", style.label), el("small", "", style.discovered ? natureLabel(style.card.brassopedie?.nature) : "Non révélé"));
      if (style.canOpen) {
        btn.addEventListener("click", () => {
          const resolved = resolveLibraryPanelCard({ collectionBundles, collectionId: selectedCollectionId, cardId: style.id });
          if (resolved) brassopediePanel.openEntry(resolved);
        });
      }
      grid.append(btn);
    });
    const scroll = el("div", "brassopedie-library-styles-scroll");
    scroll.append(grid);
    main.append(el("h2", "brassopedie-library-subtitle", "Styles de bière"), scroll);
    layout.append(collections, main);
    shell.append(layout);
    root.append(shell);
  }
  render();
  return { refresh: render, selectCollection(id) { selectedCollectionId = id; render(); }, closePanel: brassopediePanel.close };
}
