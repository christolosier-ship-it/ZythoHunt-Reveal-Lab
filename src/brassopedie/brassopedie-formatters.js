export const NATURE_LABELS = {
  F: "Famille",
  S: "Style",
  SS: "Sous-style",
  T: "Catégorie transversale",
  A: "Appellation commerciale",
  R: "Dénomination ou certification"
};

export function natureLabel(nature) {
  return NATURE_LABELS[nature] || nature || "Style";
}

export function formatRange(range, label = range?.unite || "") {
  if (!range || range.statut === "variable" || range.min == null || range.max == null) return "Variable";
  const value = `${range.min}–${range.max}${label === "%" ? " %" : label ? ` ${label}` : ""}`;
  return range.statut === "large" ? `${value} · plage large` : value;
}

export function formatTemperature(service) {
  if (!service || service.temperatureMin == null || service.temperatureMax == null) return "Variable";
  return `${service.temperatureMin}–${service.temperatureMax} ${service.uniteTemperature || "°C"}`;
}

export function parentName(entry, byId) {
  return entry?.parentPrincipalId ? byId?.[entry.parentPrincipalId]?.nom || byId?.[entry.parentPrincipalId]?.name || entry.parentPrincipalId : null;
}

export function nonEmptyList(value) {
  if (Array.isArray(value)) return value.map((item) => String(item || "").trim()).filter(Boolean);
  const item = String(value || "").trim();
  return item ? [item] : [];
}

export function formatService(entry) {
  return {
    temperature: formatTemperature(entry?.service),
    glasses: nonEmptyList(entry?.service?.verresRecommandes)
  };
}

export function recipeSections(recipe = {}) {
  const sections = [];
  const add = (title, value) => {
    const items = nonEmptyList(value);
    if (items.length) sections.push({ title, items });
  };
  add("Malts et céréales", recipe.maltsEtCereales);
  add("Houblons", recipe.houblons);
  add("Levures et microorganismes", recipe.levuresEtMicroorganismes);
  add("Ingrédients complémentaires", recipe.ingredientsComplementaires);
  add("Profil eau", recipe.profilEau);
  add("Empâtage", recipe.empatage ?? recipe.empattage);
  add("Ébullition et houblonnage", recipe.ebullitionEtHoublonnage);
  add("Fermentation", recipe.fermentation);
  add("Maturation", recipe.maturation);
  add("Profil recherché", recipe.profilRecherche);
  return sections;
}
