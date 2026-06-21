import test from "node:test";
import assert from "node:assert/strict";
import { isInsideRenderWindow } from "./carousel-controller.js";

test("detects cards inside the carousel render window", () => {
  assert.equal(isInsideRenderWindow(4, 4, 2), true);
  assert.equal(isInsideRenderWindow(2, 4, 2), true);
  assert.equal(isInsideRenderWindow(6, 4, 2), true);
  assert.equal(isInsideRenderWindow(1, 4, 2), false);
  assert.equal(isInsideRenderWindow(7, 4, 2), false);
});
