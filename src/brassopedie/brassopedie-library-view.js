import { assetUrl } from "../utils/asset-url.js";
import { formatRange, formatService, natureLabel, parentName, recipeSections } from "./brassopedie-formatters.js";

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

function paragraph(text) { return text ? el("p", "brassopedie-library-text", text) : null; }
function list(items) {
  const ul = el("ul", "brassopedie-library-list");
  items.forEach((item) => ul.append(el("li", "", item)));
  return ul;
}
function section(title, children) {
  const box = el("section", "brassopedie-library-section");
  box.append(el("h3", "brassopedie-library-section-title", title));
  children.filter(Boolean).forEach((child) => box.append(child));
  return box;
}

export function createBrassopedieLibraryView({ root, collectionBundles, registry, initialCollectionId }) {
  let selectedCollectionId = initialCollectionId;
  let selectedCard = null;

  function renderDetail(card, collectionId) {
    const panel = el("aside", "brassopedie-library-detail");
    panel.tabIndex = -1;
    if (!card) {
      panel.append(el("p", "brassopedie-library-empty", "Sélectionne un style révélé pour ouvrir sa fiche."));
      return panel;
    }
    const entry = card.brassopedie;
    const bundle = collectionBundles.find((item) => item.collection.id === collectionId);
    const byBrassoId = Object.fromEntries(Object.values(bundle?.cardsById || {}).map((item) => [item.id, item.brassopedie]));
    const service = formatService(entry);
    const recipe = entry.recette || {};
    const close = el("button", "brassopedie-library-close", "Fermer");
    close.type = "button";
    close.addEventListener("click", () => { selectedCard = null; render(); });
    const media = el("div", "brassopedie-library-detail-media");
    if (card.fullImage || card.image || card.thumbImage) {
      const img = el("img", "", null);
      img.src = assetUrl(card.fullImage || card.image || card.thumbImage);
      img.alt = card.name;
      img.loading = "lazy";
      media.append(img);
    } else media.append(el("div", "brassopedie-library-image-placeholder", "???"));
    const header = el("header", "brassopedie-library-detail-header");
    header.append(el("p", "brassopedie-library-kicker", natureLabel(entry.nature)), el("h2", "", entry.nom));
    const parent = parentName(entry, byBrassoId);
    if (parent) header.append(el("p", "", `Parent : ${parent}`));
    const badges = el("div", "brassopedie-library-badges");
    [["Alcool", formatRange(entry.alcool, "%")], ["IBU", formatRange(entry.amertume)], ["EBC", formatRange(entry.couleur)], ["Service", service.temperature]].forEach(([label, value]) => badges.append(el("span", "", `${label} · ${value}`)));
    const recipeChildren = [paragraph(recipe.explicationProfil)];
    recipeSections(recipe).forEach(({ title, items }) => recipeChildren.push(section(title, [list(items)])));
    const sources = entry.sources?.length ? section("Sources", [list(entry.sources.map((source) => [source.organisme, source.edition, source.reference, source.type].filter(Boolean).join(" · ")))]) : null;
    panel.append(close, media, header, badges, section("Description", [paragraph(entry.description)]), section("Histoire", [paragraph(entry.histoireEtOrigines)]), section("Service", [paragraph(`Température : ${service.temperature}`), service.glasses.length ? list(service.glasses) : null]), section("Recette", recipeChildren), sources);
    return panel;
  }

  function render() {
    registry.refresh();
    const model = buildBrassopedieLibraryModel({ collectionBundles, registry, selectedCollectionId });
    selectedCollectionId = model.selectedCollectionId;
    root.replaceChildren();
    const shell = el("div", "brassopedie-library");
    const header = el("header", "brassopedie-library-hero");
    const total = registry.getTotalProgress();
    header.append(el("p", "brassopedie-library-eyebrow", "Archives révélées"), el("h1", "", "Brassopédie"), el("p", "", `La bibliothèque des styles révélés · ${total.discovered} / ${total.total} styles découverts`));
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
      btn.addEventListener("click", () => { selectedCollectionId = collection.id; selectedCard = null; render(); });
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
      if (style.canOpen) btn.addEventListener("click", () => { selectedCard = style.card; render(); setTimeout(() => root.querySelector(".brassopedie-library-detail")?.focus?.(), 0); });
      grid.append(btn);
    });
    main.append(el("h2", "brassopedie-library-subtitle", "Styles de bière"), grid);
    layout.append(collections, main, renderDetail(selectedCard, selectedCollectionId));
    shell.append(header, layout);
    root.append(shell);
  }
  render();
  return { refresh: render, selectCollection(id) { selectedCollectionId = id; selectedCard = null; render(); } };
}
