import { test } from "node:test";
import assert from "node:assert/strict";
import { estaArriba, siguienteFase } from "./globito-flotante.ts";

test("el globito aparece y se queda: ningún evento de tiempo lo retira", () => {
  assert.equal(siguienteFase("esperando", "aparece"), "visible");
  assert.equal(siguienteFase("visible", "aparece"), "visible");
});

test("bajar por la página lo termina, esté visible o todavía esperando", () => {
  assert.equal(siguienteFase("visible", "baja"), "terminado");
  assert.equal(siguienteFase("esperando", "baja"), "terminado");
});

test("si la persona ya bajó cuando se cumple el tiempo, no sale", () => {
  assert.equal(siguienteFase("esperando", "aparece", false), "terminado");
  assert.equal(siguienteFase("esperando", "aparece", true), "visible");
});

test("arriba de la página: sin desplazamiento, con tolerancia a fracciones y rebote", () => {
  assert.equal(estaArriba(0), true);
  assert.equal(estaArriba(0.4), true);
  assert.equal(estaArriba(-12), true);
  assert.equal(estaArriba(1), false);
  assert.equal(estaArriba(300), false);
});

test("cerrarlo lo termina", () => {
  assert.equal(siguienteFase("visible", "cerrar"), "terminado");
});

test("abrir el popup lo termina, esté visible o todavía esperando", () => {
  assert.equal(siguienteFase("visible", "popup"), "terminado");
  assert.equal(siguienteFase("esperando", "popup"), "terminado");
});

test("terminado es final: ningún evento lo vuelve a mostrar", () => {
  for (const evento of ["aparece", "cerrar", "popup", "baja"] as const) {
    assert.equal(siguienteFase("terminado", evento), "terminado");
  }
});

