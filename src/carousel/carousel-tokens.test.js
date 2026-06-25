import test from "node:test";
import assert from "node:assert/strict";
import { carouselTokens } from "./carousel-tokens.js";

test("carousel motion tokens use the optimized render window and snap duration", () => {
  assert.equal(carouselTokens.renderWindow, 4);
  assert.equal(carouselTokens.snapDuration, 0.42);
});
