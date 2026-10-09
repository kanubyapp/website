import { test } from "node:test";
import assert from "node:assert/strict";
import {
  configCorreo,
  correoCotizacion,
  destinatarios,
  enviarCorreo,
  MINIMO_MS,
  validarAviso,
  type AvisoCotizacion,
  type Envio,
} from "./correo.ts";

const entorno = {
  RESEND_API_KEY: "re_prueba",
  EMAIL_FROM: "Kanuby <avisos@notifications.scndal.com>",
  EMAIL_TO: "ventas@kanuby.com, operaciones@kanuby.com",
  EMAIL_CC: " direccion@kanuby.com ,",
};

const aviso: AvisoCotizacion = {
  negocio: "minibodega",
  nombre: "Ana <b>López</b>",
  telefono: "81 1234 5678",
  tipo: "7 m²",
  pagina: "/minibodegas-monterrey/",
};

const cuerpo = { ...aviso, sitio: "", ms: 4000 };

/* Destinatarios */

test("la cotización va a EMAIL_TO y EMAIL_CC", () => {
  assert.deepEqual(destinatarios("cotizacion", entorno), {
    to: ["ventas@kanuby.com", "operaciones@kanuby.com"],
    cc: ["direccion@kanuby.com"],
  });
});

test("proveedores y contacto general van solo a EMAIL_TO", () => {
  for (const tipo of ["proveedores", "contacto"] as const) {
    assert.deepEqual(destinatarios(tipo, entorno), {
      to: ["ventas@kanuby.com", "operaciones@kanuby.com"],
      cc: [],
    });
  }
});

test("el envío manda a Resend los destinatarios de cada tipo, con la llave solo en el encabezado", async () => {
  const pedidos: { url: string; opciones: RequestInit }[] = [];
  const envio: Envio = async (url, opciones) => {
    pedidos.push({ url, opciones });
    return new Response("{}", { status: 200 });
  };
  const correo = correoCotizacion(aviso, new Date("2026-10-09T18:30:00Z"));

  assert.equal(await enviarCorreo("cotizacion", correo, { entorno, envio }), true);
  assert.equal(await enviarCorreo("contacto", correo, { entorno, envio }), true);

  const [cotizacion, contacto] = pedidos.map((p) => JSON.parse(p.opciones.body as string));
  assert.equal(pedidos[0].url, "https://api.resend.com/emails");
  assert.deepEqual((pedidos[0].opciones.headers as Record<string, string>).Authorization, "Bearer re_prueba");
  assert.deepEqual(cotizacion.to, ["ventas@kanuby.com", "operaciones@kanuby.com"]);
  assert.deepEqual(cotizacion.cc, ["direccion@kanuby.com"]);
  assert.equal(cotizacion.from, "Kanuby <avisos@notifications.scndal.com>");
  assert.equal(contacto.cc, undefined);
  assert.ok(!JSON.stringify(cotizacion).includes("re_prueba"));
});

/* Armado del correo */

test("el correo de cotización lleva el servicio y el nombre en el asunto y todos los datos en el cuerpo", () => {
  const correo = correoCotizacion(aviso, new Date("2026-10-09T18:30:00Z"));
  assert.equal(correo.asunto, "Cotización de minibodega: Ana <b>López</b>");
  for (const dato of ["Ana <b>López</b>", "81 1234 5678", "Minibodega", "Tamaño: 7 m²", "/minibodegas-monterrey/"])
    assert.ok(correo.texto.includes(dato), dato);
  // 18:30 UTC son las 12:30 en Monterrey
  assert.match(correo.texto, /9 de octubre de 2026.*12:30.*hora de Monterrey/);
  assert.match(correo.html, /href="tel:8112345678"/);
});

test("el correo de mudanza nombra el tipo de mudanza", () => {
  const correo = correoCotizacion(
    { ...aviso, negocio: "mudanza", tipo: "Mudanza empresarial", pagina: "/" },
    new Date("2026-10-09T18:30:00Z"),
  );
  assert.equal(correo.asunto, "Cotización de mudanza: Ana <b>López</b>");
  assert.ok(correo.texto.includes("Tipo de mudanza: Mudanza empresarial"));
});

test("el HTML escapa lo que escribe el cliente", () => {
  const { html } = correoCotizacion(aviso, new Date());
  assert.ok(!html.includes("<b>López</b>"));
  assert.ok(html.includes("Ana &lt;b&gt;López&lt;/b&gt;"));
});

/* Validación y bots */

test("un aviso completo es válido", () => {
  assert.deepEqual(validarAviso(cuerpo), { tipo: "valido", aviso: { ...aviso, nombre: aviso.nombre } });
});

test("la validación del servidor aplica las reglas del popup", () => {
  assert.deepEqual(validarAviso({ ...cuerpo, nombre: "  " }), { tipo: "invalido", motivo: "nombre" });
  assert.deepEqual(validarAviso({ ...cuerpo, telefono: "" }), { tipo: "invalido", motivo: "telefono" });
  assert.deepEqual(validarAviso({ ...cuerpo, tipo: "9 m²" }), { tipo: "invalido", motivo: "tipo" });
  assert.deepEqual(validarAviso({ ...cuerpo, negocio: "otro" }), { tipo: "invalido", motivo: "negocio" });
  assert.deepEqual(validarAviso({ ...cuerpo, pagina: "https://otro.com" }), { tipo: "invalido", motivo: "pagina" });
  assert.deepEqual(validarAviso({ ...cuerpo, nombre: "a".repeat(101) }), { tipo: "invalido", motivo: "nombre" });
  assert.deepEqual(validarAviso(null), { tipo: "invalido", motivo: "sin datos" });
  assert.deepEqual(validarAviso("texto"), { tipo: "invalido", motivo: "sin datos" });
});

test("bots: el campo trampa lleno o un envío demasiado rápido no mandan correo", () => {
  assert.deepEqual(validarAviso({ ...cuerpo, sitio: "https://spam.com" }), { tipo: "bot" });
  assert.deepEqual(validarAviso({ ...cuerpo, ms: MINIMO_MS - 1 }), { tipo: "bot" });
  assert.deepEqual(validarAviso({ ...cuerpo, ms: undefined }), { tipo: "bot" });
});

/* Sin variables */

test("sin variables no se envía nada, no se lanza error y queda registrado", async () => {
  const registros: unknown[][] = [];
  let llamadas = 0;
  const resultado = await enviarCorreo("cotizacion", correoCotizacion(aviso, new Date()), {
    entorno: {},
    envio: async () => {
      llamadas++;
      return new Response();
    },
    registrar: (...datos) => registros.push(datos),
  });
  assert.equal(resultado, false);
  assert.equal(llamadas, 0);
  assert.match(String(registros[0][0]), /faltan RESEND_API_KEY, EMAIL_FROM, EMAIL_TO/);
  assert.deepEqual(configCorreo("cotizacion", { ...entorno, EMAIL_CC: undefined }), {
    config: { llave: "re_prueba", remitente: entorno.EMAIL_FROM, to: ["ventas@kanuby.com", "operaciones@kanuby.com"], cc: [] },
  });
});

test("si Resend falla o no responde, se registra y no se lanza error", async () => {
  const registros: unknown[][] = [];
  const registrar = (...datos: unknown[]) => registros.push(datos);
  const correo = correoCotizacion(aviso, new Date());
  assert.equal(await enviarCorreo("cotizacion", correo, { entorno, registrar, envio: async () => new Response("mal", { status: 422 }) }), false);
  assert.equal(await enviarCorreo("cotizacion", correo, { entorno, registrar, envio: async () => { throw new Error("red"); } }), false);
  assert.equal(registros.length, 2);
});
