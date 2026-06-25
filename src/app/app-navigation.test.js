import test from "node:test";
import assert from "node:assert/strict";
import { createAppNavigation, resolveMenuView, isKnownAppView } from "./app-navigation.js";

function view() {
  return {
    hidden: false,
    attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; }
  };
}

test("showView toggles hidden state between app views", () => {
  const views = { zythosphere: view(), brassopedie: view() };
  const navigation = createAppNavigation({ views, initialView: "zythosphere" });

  assert.equal(navigation.showView("brassopedie"), true);
  assert.equal(views.zythosphere.hidden, true);
  assert.equal(views.brassopedie.hidden, false);
  assert.equal(navigation.getActiveView(), "brassopedie");

  assert.equal(navigation.showView("zythosphere"), true);
  assert.equal(views.zythosphere.hidden, false);
  assert.equal(views.brassopedie.hidden, true);
});

test("unknown views are ignored without changing the active view", () => {
  const views = { zythosphere: view(), brassopedie: view() };
  const navigation = createAppNavigation({ views, initialView: "zythosphere" });

  assert.equal(navigation.showView("unknown"), false);
  assert.equal(navigation.getActiveView(), "zythosphere");
  assert.equal(views.zythosphere.hidden, false);
});

test("menu entries map to app view ids", () => {
  assert.equal(resolveMenuView("zythosphere"), "zythosphere");
  assert.equal(resolveMenuView("brassopedie"), "brassopedie");
  assert.equal(resolveMenuView("degustation"), "degustation");
  assert.equal(resolveMenuView("badge"), "badges");
  assert.equal(resolveMenuView("reglages"), "reglages");
  assert.equal(resolveMenuView("missing"), null);
});

test("known view validation accepts only registered app views", () => {
  assert.equal(isKnownAppView("badges"), true);
  assert.equal(isKnownAppView("badge"), false);
});
