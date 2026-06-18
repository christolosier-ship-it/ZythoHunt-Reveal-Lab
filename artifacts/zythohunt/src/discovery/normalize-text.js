export function normalizeBeerName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[-_’']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
