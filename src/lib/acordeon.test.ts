import { test } from "node:test";
import assert from "node:assert/strict";
import { alPulsar } from "./acordeon.ts";

test("grupo: abrir una cierra la que estaba abierta", () => {
  assert.deepEqual(alPulsar([], 2, "grupo"), [2]);
  assert.deepEqual(alPulsar([2], 4, "grupo"), [4]);
});

test("grupo: pulsar la abierta la cierra y no queda ninguna", () => {
  assert.deepEqual(alPulsar([2], 2, "grupo"), []);
});

test("grupo: tras cerrarla se puede volver a abrir", () => {
  assert.deepEqual(alPulsar(alPulsar([2], 2, "grupo"), 2, "grupo"), [2]);
});

test("independiente: se abren varias y pulsar una abierta solo cierra esa", () => {
  assert.deepEqual(alPulsar([1], 3, "independiente"), [1, 3]);
  assert.deepEqual(alPulsar([1, 3], 1, "independiente"), [3]);
});
