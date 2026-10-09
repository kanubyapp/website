import { test } from "node:test";
import assert from "node:assert/strict";
import { COLUMNAS_ESCRITORIO, sinVecinosIguales, TONOS_SERVICIOS } from "./tonos-servicios.ts";

test("hay un tono por cada uno de los 10 servicios y se usan los tres colores", () => {
  assert.equal(TONOS_SERVICIOS.length, 10);
  assert.deepEqual([...new Set(TONOS_SERVICIOS)].sort(), ["azul", "blanco", "naranja"]);
});

test("en la rejilla de escritorio ningún cuadro repite color con su vecino de fila o de columna", () => {
  assert.equal(sinVecinosIguales(TONOS_SERVICIOS, COLUMNAS_ESCRITORIO), true);
});

test("la comprobación detecta vecinos iguales en fila y en columna, sin cruzar de fila", () => {
  assert.equal(sinVecinosIguales(["a", "a", "b"], 3), false); // fila
  assert.equal(sinVecinosIguales(["a", "b", "a", "c"], 2), false); // columna
  assert.equal(sinVecinosIguales(["a", "b", "b", "a"], 2), true); // fin de fila y siguiente
});
