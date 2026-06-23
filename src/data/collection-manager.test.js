import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("./collections.js");

test("registry count", () => {
  assert.equal(mod.collections.length, 9);
});
