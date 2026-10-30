import { test } from "node:test";
import assert from "node:assert/strict";
import { abrirWhatsApp } from "./abrir-whatsapp.ts";
import { eventoCotizacion, registrarConversion } from "./conversiones.ts";

const url = "https://wa.me/5218110287087?text=Hola";
const evento = eventoCotizacion("mudanza", "/mudanzas-monterrey/", "Mudanza local");

test("abre WhatsApp en el mismo momento del envío y después registra el evento, sin esperar", () => {
  const orden: string[] = [];
  abrirWhatsApp(url, evento, {
    abrir: (direccion) => orden.push(`abrir ${direccion}`),
    registrar: (registrado) => orden.push(`registrar ${registrado.event}`),
  });
  // Todo pasó dentro de la llamada: nada quedó para después de una espera
  assert.deepEqual(orden, [`abrir ${url}`, "registrar cotizacion_mudanza"]);
});

test("el evento entra al dataLayer completo y sin esperar confirmación de GTM", () => {
  const capa: Record<string, unknown>[] = [];
  abrirWhatsApp(url, evento, { abrir: () => {}, registrar: (e) => registrarConversion(e, { capa }) });
  assert.deepEqual(capa, [{ event: "cotizacion_mudanza", pagina: "/mudanzas-monterrey/", opcion: "Mudanza local" }]);
  assert.equal("eventCallback" in capa[0], false);
});
