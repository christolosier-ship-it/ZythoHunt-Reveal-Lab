import test from "node:test";
import assert from "node:assert/strict";
import { formatRange, formatService, formatTemperature, natureLabel, nonEmptyList, parentName, recipeSections } from "./brassopedie-formatters.js";

test("formats ranges, variables and nature labels", () => {
  assert.equal(formatRange({ min: 8, max: 12, unite: "%", statut: "defini" }, "%"), "8–12 %");
  assert.equal(formatRange({ min: null, max: null, unite: "%", statut: "variable" }, "%"), "Variable");
  assert.equal(formatRange({ min: 20, max: 80, unite: "IBU", statut: "large" }, "IBU"), "20–80 IBU · plage large");
  assert.equal(natureLabel("SS"), "Sous-style");
});

test("formats service, parents and filtered lists", () => {
  const parent = { id: "stout", nom: "Stout" };
  const child = { parentPrincipalId: "stout", service: { temperatureMin: 11, temperatureMax: 15, uniteTemperature: "°C", verresRecommandes: ["Tulipe", ""] } };
  assert.equal(parentName(child, { stout: parent }), "Stout");
  assert.equal(formatTemperature(child.service), "11–15 °C");
  assert.deepEqual(formatService(child), { temperature: "11–15 °C", glasses: ["Tulipe"] });
  assert.deepEqual(nonEmptyList(["a", "", null, "b"]), ["a", "b"]);
  assert.deepEqual(nonEmptyList("profil eau minéral"), ["profil eau minéral"]);
});

test("renders both array and string recipe sections, including the JSON empatage key", () => {
  const sections = recipeSections({
    maltsEtCereales: ["pale ale", "", "brown malt"],
    profilEau: "modérément carbonatée",
    empatage: "empâtage préservant un corps moyen",
    fermentation: "fermentation haute"
  });

  assert.deepEqual(sections, [
    { title: "Malts et céréales", items: ["pale ale", "brown malt"] },
    { title: "Profil eau", items: ["modérément carbonatée"] },
    { title: "Empâtage", items: ["empâtage préservant un corps moyen"] },
    { title: "Fermentation", items: ["fermentation haute"] }
  ]);
});
