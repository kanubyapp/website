import { test } from "node:test";
import assert from "node:assert/strict";
import { anotarGlobito, estaArriba, globitoYaSalio, siguienteFase } from "./globito-flotante.ts";

test("el globito aparece, se queda y se retira solo", () => {
  assert.equal(siguienteFase("esperando", "aparece"), "visible");
  assert.equal(siguienteFase("visible", "se-retira"), "terminado");
});

test("si ya salió en la visita, no vuelve a aparecer", () => {
  assert.equal(siguienteFase("esperando", "aparece", true), "terminado");
});

test("si la persona ya bajó cuando se cumple el tiempo, no sale", () => {
  assert.equal(siguienteFase("esperando", "aparece", false, false), "terminado");
  assert.equal(siguienteFase("esperando", "aparece", false, true), "visible");
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
  for (const evento of ["aparece", "se-retira", "cerrar", "popup"] as const) {
    assert.equal(siguienteFase("terminado", evento), "terminado");
  }
});

test("retirarse antes de aparecer no cambia nada", () => {
  assert.equal(siguienteFase("esperando", "se-retira"), "esperando");
});

function almacen() {
  const datos = new Map<string, string>();
  return {
    getItem: (clave: string) => datos.get(clave) ?? null,
    setItem: (clave: string, valor: string) => void datos.set(clave, valor),
  };
}

test("la visita recuerda que el globito ya salió", () => {
  const datos = almacen();
  const sesion = () => datos;
  assert.equal(globitoYaSalio(sesion), false);
  anotarGlobito(sesion);
  assert.equal(globitoYaSalio(sesion), true);
});

test("sin almacenamiento disponible no falla y el globito sale", () => {
  const bloqueado = () => {
    throw new Error("bloqueado");
  };
  const lanza = () => ({ getItem: bloqueado, setItem: bloqueado });
  assert.doesNotThrow(() => anotarGlobito(bloqueado));
  assert.equal(globitoYaSalio(bloqueado), false);
  assert.doesNotThrow(() => anotarGlobito(lanza));
  assert.equal(globitoYaSalio(lanza), false);
});
