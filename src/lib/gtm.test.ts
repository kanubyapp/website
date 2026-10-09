import assert from "node:assert/strict";
import test from "node:test";
import { contenedorGtm } from "./gtm.ts";

test("sin NEXT_PUBLIC_GTM_ID no se carga GTM", () => {
  assert.equal(contenedorGtm(undefined), null);
  assert.equal(contenedorGtm(""), null);
  assert.equal(contenedorGtm("   "), null);
});

test("con NEXT_PUBLIC_GTM_ID se carga el contenedor, con su respaldo sin JavaScript", () => {
  assert.deepEqual(contenedorGtm("GTM-ABC123"), {
    id: "GTM-ABC123",
    iframe: "https://www.googletagmanager.com/ns.html?id=GTM-ABC123",
  });
});

test("el ID se toma sin espacios alrededor", () => {
  assert.equal(contenedorGtm(" GTM-ABC123\n")?.id, "GTM-ABC123");
});

test("un valor que no es un ID de contenedor no carga nada", () => {
  assert.equal(contenedorGtm("G-ABC123"), null);
  assert.equal(contenedorGtm("GTM-abc"), null);
  assert.equal(contenedorGtm('GTM-1"><script>'), null);
});
