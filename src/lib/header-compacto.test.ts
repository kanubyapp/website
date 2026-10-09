import { test } from "node:test";
import assert from "node:assert/strict";
import { compactoSegunScroll, UMBRAL_COMPACTAR, UMBRAL_EXPANDIR } from "./header-compacto.ts";

test("arriba de la página el header se ve normal", () => {
  assert.equal(compactoSegunScroll(0, false), false);
  assert.equal(compactoSegunScroll(UMBRAL_COMPACTAR, false), false);
});

test("al empezar a bajar se compacta", () => {
  assert.equal(compactoSegunScroll(UMBRAL_COMPACTAR + 1, false), true);
  assert.equal(compactoSegunScroll(2000, false), true);
});

test("compacto, sigue así hasta regresar casi arriba (sin parpadeo entre umbrales)", () => {
  assert.equal(compactoSegunScroll(30, true), true);
  assert.equal(compactoSegunScroll(UMBRAL_EXPANDIR + 1, true), true);
  assert.equal(compactoSegunScroll(UMBRAL_EXPANDIR, true), false);
  assert.equal(compactoSegunScroll(0, true), false);
});

test("entre los dos umbrales conserva el estado en el que venía", () => {
  assert.equal(compactoSegunScroll(30, false), false);
  assert.equal(compactoSegunScroll(30, true), true);
});
