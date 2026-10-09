import { test } from "node:test";
import assert from "node:assert/strict";
import { fechaLarga, fechaRelativa } from "./fechas.ts";

const hoy = new Date("2026-10-01T12:00:00Z");

test("el mismo día es hoy", () => {
  assert.equal(fechaRelativa("2026-10-01", hoy), "hoy");
});

test("días, semanas, meses y años, en singular y plural", () => {
  assert.equal(fechaRelativa("2026-09-30", hoy), "hace 1 día");
  assert.equal(fechaRelativa("2026-09-26", hoy), "hace 5 días");
  assert.equal(fechaRelativa("2026-09-24", hoy), "hace 1 semana");
  assert.equal(fechaRelativa("2026-09-10", hoy), "hace 3 semanas");
  assert.equal(fechaRelativa("2026-08-31", hoy), "hace 1 mes");
  assert.equal(fechaRelativa("2026-03-01", hoy), "hace 7 meses");
  assert.equal(fechaRelativa("2025-10-01", hoy), "hace 1 año");
  assert.equal(fechaRelativa("2024-06-07", hoy), "hace 2 años");
});

test("fecha larga de un post, en la hora de Monterrey", () => {
  assert.equal(fechaLarga("2025-03-10T18:00:00+00:00"), "10 de marzo de 2025");
  // 00:36 UTC del 14 todavía es el 13 en Monterrey
  assert.equal(fechaLarga("2025-05-14T00:36:05+00:00"), "13 de mayo de 2025");
});
