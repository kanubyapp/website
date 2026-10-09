import { test } from "node:test";
import assert from "node:assert/strict";
import { escribirEstado, estadoVacio, leerEstado } from "./guardado-calculadora.ts";

const ids = new Set(["silla", "sofa-3"]);

test("lo guardado se lee tal cual", () => {
  const estado = { nombre: "Ana", telefono: "81 1234 5678", registrado: true, inventario: { silla: 4 } };
  assert.deepEqual(leerEstado(escribirEstado(estado), ids, 99), estado);
});

test("sin nada guardado, JSON roto u otra versión: nada", () => {
  assert.equal(leerEstado(null, ids, 99), null);
  assert.equal(leerEstado("{roto", ids, 99), null);
  assert.equal(leerEstado("[]", ids, 99), null);
  assert.equal(leerEstado(JSON.stringify({ ...estadoVacio, version: 2 }), ids, 99), null);
});

test("del inventario se descartan objetos fuera del catálogo y cantidades inválidas", () => {
  const texto = JSON.stringify({
    version: 1,
    nombre: "Ana",
    telefono: "81",
    registrado: true,
    inventario: { silla: 2.5, "sofa-3": 150, "ya-no-existe": 3, otro: -1 },
  });
  assert.deepEqual(leerEstado(texto, ids, 99)?.inventario, { "sofa-3": 99 });
});

test("campos de otro tipo vuelven a su valor vacío", () => {
  const texto = JSON.stringify({ version: 1, nombre: 3, telefono: null, registrado: "sí", inventario: "x" });
  assert.deepEqual(leerEstado(texto, ids, 99), estadoVacio);
});
