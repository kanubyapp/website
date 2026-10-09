import { test } from "node:test";
import assert from "node:assert/strict";
import { FLUJO_INICIAL, flujoCotizacion } from "./flujo-cotizacion.ts";

test("el popup empieza en el paso 1 sin elección", () => {
  assert.deepEqual(FLUJO_INICIAL, { paso: "servicio", tipo: null });
});

test("elegir una opción avanza al paso 2 con esa opción", () => {
  assert.deepEqual(flujoCotizacion(FLUJO_INICIAL, { tipo: "elegir", valor: "Mudanza local" }), {
    paso: "datos",
    tipo: "Mudanza local",
  });
});

test("volver regresa al paso 1 y conserva la elección", () => {
  const enDatos = flujoCotizacion(FLUJO_INICIAL, { tipo: "elegir", valor: "7 m²" });
  assert.deepEqual(flujoCotizacion(enDatos, { tipo: "volver" }), {
    paso: "servicio",
    tipo: "7 m²",
  });
});

test("tras volver, elegir otra opción la reemplaza y avanza de nuevo", () => {
  let estado = flujoCotizacion(FLUJO_INICIAL, { tipo: "elegir", valor: "Mudanza local" });
  estado = flujoCotizacion(estado, { tipo: "volver" });
  estado = flujoCotizacion(estado, { tipo: "elegir", valor: "Mudanza empresarial" });
  assert.deepEqual(estado, { paso: "datos", tipo: "Mudanza empresarial" });
});

test("volver desde el paso 1 no cambia nada", () => {
  assert.deepEqual(flujoCotizacion(FLUJO_INICIAL, { tipo: "volver" }), FLUJO_INICIAL);
});

test("reiniciar regresa al paso 1 sin elección desde cualquier paso", () => {
  const enDatos = flujoCotizacion(FLUJO_INICIAL, { tipo: "elegir", valor: "14 m²" });
  assert.deepEqual(flujoCotizacion(enDatos, { tipo: "reiniciar" }), FLUJO_INICIAL);
});
