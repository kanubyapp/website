import { test } from "node:test";
import assert from "node:assert/strict";
import { avisarCotizacion } from "./aviso-cotizacion.ts";

const cuerpo = {
  negocio: "mudanza" as const,
  nombre: "Ana",
  telefono: "81 1234 5678",
  tipo: "Mudanza local",
  pagina: "/",
  sitio: "",
  ms: 3000,
};

test("el aviso sale con keepalive para sobrevivir a la redirección a WhatsApp", () => {
  let pedido: [string, RequestInit] | null = null;
  avisarCotizacion(cuerpo, (async (url: string, opciones: RequestInit) => {
    pedido = [url, opciones];
    return new Response(null, { status: 202 });
  }) as typeof fetch);
  assert.ok(pedido);
  const [url, opciones] = pedido as [string, RequestInit];
  assert.equal(url, "/api/cotizacion/");
  assert.equal(opciones.method, "POST");
  assert.equal(opciones.keepalive, true);
  assert.deepEqual(JSON.parse(opciones.body as string), cuerpo);
});

test("si el aviso falla, no detiene al cliente", async () => {
  assert.doesNotThrow(() => avisarCotizacion(cuerpo, (async () => { throw new Error("red"); }) as typeof fetch));
  assert.doesNotThrow(() => avisarCotizacion(cuerpo, (() => { throw new Error("sin fetch"); }) as typeof fetch));
  await new Promise((resolver) => setTimeout(resolver, 10));
});
