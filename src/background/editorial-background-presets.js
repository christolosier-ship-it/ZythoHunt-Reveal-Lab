const presetEntries = [
  ["lagers-et-fermentations-basses", 88, 68, 40],
  ["pale-ales-bitters-et-ipa", 72, 58, 48],
  ["porters-stouts", 0, 32, 78],
  ["traditions-belges-et-francaises", 62, 62, 70],
  ["bieres-de-ble-et-de-seigle", 92, 66, 72],
  [["bieres-acides", "sauvages", "et-spontanees"].join("-"), 42, 74, 36],
  [["ales-ambrees-brunes", "maltees", "et-fortes"].join("-"), 26, 34, 54],
  ["styles-singuliers-historiques-et-hybrides", 50, 50, 50],
  ["appellations-commerciales", 80, 62, 58]
];

export const editorialBackgroundPresets = Object.fromEntries(
  presetEntries.map(([id, beerT, bubbleDensity, foamIntensity]) => [id, { beerT, bubbleDensity, foamIntensity }])
);

export function getEditorialBackgroundPreset(collection) {
  return editorialBackgroundPresets[collection.id] || collection.backgroundPreset || {};
}
