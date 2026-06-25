import test from "node:test";
import assert from "node:assert/strict";
import { isInsideRenderWindow, setCarouselCardRenderClasses } from "./carousel-controller.js";

test("detects cards inside the carousel render window", () => {
  assert.equal(isInsideRenderWindow(4, 4, 2), true);
  assert.equal(isInsideRenderWindow(2, 4, 2), true);
  assert.equal(isInsideRenderWindow(6, 4, 2), true);
  assert.equal(isInsideRenderWindow(1, 4, 2), false);
  assert.equal(isInsideRenderWindow(7, 4, 2), false);
});


test("updates visible and active carousel render classes independently", () => {
  const classes = new Set(["csl-card"]);
  const cardEl = {
    classList: {
      toggle(name, enabled) {
        if (enabled) classes.add(name);
        else classes.delete(name);
      },
      contains(name) {
        return classes.has(name);
      }
    }
  };

  setCarouselCardRenderClasses(cardEl, { visible: true, active: true });
  assert.equal(classes.has("is-visible"), true);
  assert.equal(classes.has("is-active"), true);

  setCarouselCardRenderClasses(cardEl, { visible: false, active: true });
  assert.equal(classes.has("is-visible"), false);
  assert.equal(classes.has("is-active"), true);

  setCarouselCardRenderClasses(cardEl, { visible: false, active: false });
  assert.equal(classes.has("is-visible"), false);
  assert.equal(classes.has("is-active"), false);
});
