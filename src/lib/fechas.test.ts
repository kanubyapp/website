import { test } from "node:test";
import assert from "node:assert/strict";
import { fechaRelativa } from "./fechas.ts";

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
