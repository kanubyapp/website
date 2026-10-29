import assert from "node:assert/strict";
import test from "node:test";
import { eventoCotizacion, eventoWhatsApp, registrarConversion } from "./conversiones.ts";
import { contenedorGtm } from "./gtm.ts";

test("sin NEXT_PUBLIC_GTM_ID no se carga GTM", () => {
  assert.equal(contenedorGtm(undefined), null);
  assert.equal(contenedorGtm(""), null);
  assert.equal(contenedorGtm("   "), null);
});

test("con NEXT_PUBLIC_GTM_ID se carga el contenedor, con su respaldo sin JavaScript", () => {
  const gtm = contenedorGtm("GTM-ABC123");
  assert.equal(gtm?.id, "GTM-ABC123");
  assert.equal(gtm?.iframe, "https://www.googletagmanager.com/ns.html?id=GTM-ABC123");
});

test("el ID se toma sin espacios alrededor", () => {
  assert.equal(contenedorGtm(" GTM-ABC123\n")?.id, "GTM-ABC123");
});

test("un valor que no es un ID de contenedor no carga nada", () => {
  assert.equal(contenedorGtm("G-ABC123"), null);
  assert.equal(contenedorGtm("GTM-abc"), null);
  assert.equal(contenedorGtm('GTM-1"><script>'), null);
});

/* Ejecuta el snippet en una ventana falsa y devuelve lo que insertó. */
function ejecutarSnippet(ventana: { dataLayer?: Record<string, unknown>[] }) {
  const insertados: { async?: boolean; src?: string }[] = [];
  const primero = { parentNode: { insertBefore: (nuevo: object) => insertados.push(nuevo) } };
  const documento = {
    getElementsByTagName: () => [primero],
    createElement: () => ({}),
  };
  const snippet = contenedorGtm("GTM-ABC123")!.script;
  new Function("window", "document", snippet)(ventana, documento);
  return insertados;
}

test("el snippet estándar inicia el dataLayer y carga gtm.js asíncrono", () => {
  const ventana: { dataLayer?: Record<string, unknown>[] } = {};
  const insertados = ejecutarSnippet(ventana);
  assert.equal(ventana.dataLayer?.length, 1);
  assert.equal(ventana.dataLayer?.[0].event, "gtm.js");
  assert.equal(typeof ventana.dataLayer?.[0]["gtm.start"], "number");
  assert.deepEqual(insertados, [
    { async: true, src: "https://www.googletagmanager.com/gtm.js?id=GTM-ABC123" },
  ]);
});

test("los eventos del sitio llegan al mismo dataLayer que inició el snippet, sin duplicarse", () => {
  const ventana: { dataLayer?: Record<string, unknown>[] } = {};
  ejecutarSnippet(ventana);
  const capa = ventana.dataLayer!;
  registrarConversion(eventoCotizacion("mudanza", "/", "Mudanza local"), { capa });
  registrarConversion(eventoCotizacion("minibodega", "/", "7 m²"), { capa });
  registrarConversion(eventoWhatsApp("mudanza", "/"), { capa });
  registrarConversion(eventoWhatsApp("minibodega", "/"), { capa });
  assert.deepEqual(
    capa.map((entrada) => entrada.event),
    ["gtm.js", "cotizacion_mudanza", "cotizacion_minibodega", "whatsapp_mudanza", "whatsapp_minibodega"],
  );
});

test("si algo ya empujó al dataLayer antes del snippet, se conserva", () => {
  const previo = { event: "whatsapp_minibodega", pagina: "/" };
  const ventana = { dataLayer: [previo] as Record<string, unknown>[] };
  const capa = ventana.dataLayer;
  ejecutarSnippet(ventana);
  assert.equal(ventana.dataLayer, capa);
  assert.deepEqual(ventana.dataLayer.map((entrada) => entrada.event), ["whatsapp_minibodega", "gtm.js"]);
});
