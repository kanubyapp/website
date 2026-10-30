import { test } from "node:test";
import assert from "node:assert/strict";
import { REMITENTE_AVISOS } from "./contacto.ts";
import {
  configCorreo,
  correoCotizacion,
  destinatarios,
  enviarCorreo,
  MINIMO_MS,
  origenDelAviso,
  validarAviso,
  whatsappDelTelefono,
  type AvisoCotizacion,
  type Envio,
} from "./correo.ts";

const entorno = {
  RESEND_API_KEY: "re_prueba",
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
  // El remitente ya no sale de una variable: está fijo en lib/contacto.ts
  assert.equal(cotizacion.from, "Kanuby <notificaciones@kanuby.com>");
  assert.equal(contacto.cc, undefined);
  assert.ok(!JSON.stringify(cotizacion).includes("re_prueba"));
});

/* Armado del correo */

test("el correo de cotización lleva el servicio y el nombre en el asunto y todos los datos en el cuerpo", () => {
  const correo = correoCotizacion(aviso, new Date("2026-10-09T18:30:00Z"));
  assert.equal(correo.asunto, "Minibodega · Popup de cotización · Ana <b>López</b>");
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
  assert.equal(correo.asunto, "Mudanza · Popup de cotización · Ana <b>López</b>");
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

/* Aviso del popup del botón flotante: sin sub-tipo */

const cuerpoFlotante = {
  negocio: "mudanza",
  nombre: "Ana",
  telefono: "81 1234 5678",
  tipo: "",
  pagina: "/",
  formulario: "flotante",
  sitio: "",
  ms: 4000,
};

test("el aviso del botón flotante es válido sin sub-tipo", () => {
  assert.deepEqual(validarAviso(cuerpoFlotante), {
    tipo: "valido",
    aviso: { negocio: "mudanza", nombre: "Ana", telefono: "81 1234 5678", tipo: "", pagina: "/" },
  });
});

test("el aviso del botón flotante conserva las demás reglas y no acepta sub-tipo", () => {
  assert.deepEqual(validarAviso({ ...cuerpoFlotante, nombre: "" }), { tipo: "invalido", motivo: "nombre" });
  assert.deepEqual(validarAviso({ ...cuerpoFlotante, telefono: " " }), { tipo: "invalido", motivo: "telefono" });
  assert.deepEqual(validarAviso({ ...cuerpoFlotante, negocio: "" }), { tipo: "invalido", motivo: "negocio" });
  assert.deepEqual(validarAviso({ ...cuerpoFlotante, tipo: "Mudanza local" }), { tipo: "invalido", motivo: "tipo" });
  assert.deepEqual(validarAviso({ ...cuerpoFlotante, sitio: "x" }), { tipo: "bot" });
  assert.deepEqual(validarAviso({ ...cuerpoFlotante, ms: MINIMO_MS - 1 }), { tipo: "bot" });
});

test("el popup de cotización sigue exigiendo el sub-tipo", () => {
  assert.deepEqual(validarAviso({ ...cuerpo, tipo: "" }), { tipo: "invalido", motivo: "tipo" });
  assert.deepEqual(validarAviso({ ...cuerpo, tipo: "", formulario: "otro" }), { tipo: "invalido", motivo: "tipo" });
});

test("el correo sin sub-tipo no lleva esa fila", () => {
  const correo = correoCotizacion(
    { negocio: "minibodega", nombre: "Ana", telefono: "81 1234 5678", tipo: "", pagina: "/" },
    new Date("2026-10-09T18:30:00Z"),
    { formulario: "flotante", campana: null },
  );
  assert.equal(correo.asunto, "Minibodega · Botón flotante · Ana");
  assert.ok(!correo.texto.includes("Tamaño"));
  assert.ok(!correo.html.includes("Tamaño"));
  assert.ok(correo.texto.includes("Servicio: Minibodega"));
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
  assert.match(String(registros[0][0]), /faltan RESEND_API_KEY, EMAIL_TO\./);
  assert.deepEqual(configCorreo("cotizacion", { ...entorno, EMAIL_CC: undefined }), {
    config: { llave: "re_prueba", remitente: REMITENTE_AVISOS, to: ["ventas@kanuby.com", "operaciones@kanuby.com"], cc: [] },
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

/* Remitente */

test("el remitente es fijo y EMAIL_FROM ya no hace falta ni se usa", () => {
  assert.equal(REMITENTE_AVISOS, "Kanuby <notificaciones@kanuby.com>");
  const resultado = configCorreo("cotizacion", { ...entorno, EMAIL_FROM: "Otro <otro@ejemplo.com>" });
  assert.ok("config" in resultado);
  assert.equal(resultado.config.remitente, "Kanuby <notificaciones@kanuby.com>");
});

/* Registro de fallas: lo necesario para diagnosticar desde los registros de Vercel */

const detalleDe = (registro: unknown[]) => JSON.parse(String(registro[1]));

test("si Resend rechaza el envío, el registro dice qué respondió, a quién y desde qué página", async () => {
  const registros: unknown[][] = [];
  const correo = correoCotizacion(aviso, new Date());
  const enviado = await enviarCorreo("cotizacion", correo, {
    entorno,
    pagina: "/minibodegas-monterrey/",
    registrar: (...datos) => registros.push(datos),
    envio: async () => new Response('{"statusCode":403,"message":"The domain is not verified"}', { status: 403 }),
  });
  assert.equal(enviado, false);
  assert.match(String(registros[0][0]), /^\[correo\] No se envió el aviso \(cotizacion\): Resend respondió 403\./);
  const detalle = detalleDe(registros[0]);
  assert.equal(detalle.estado, 403);
  assert.match(detalle.respuesta, /The domain is not verified/);
  assert.equal(detalle.remitente, "Kanuby <notificaciones@kanuby.com>");
  assert.deepEqual(detalle.to, ["ventas@kanuby.com", "operaciones@kanuby.com"]);
  assert.deepEqual(detalle.cc, ["direccion@kanuby.com"]);
  assert.equal(detalle.pagina, "/minibodegas-monterrey/");
  assert.equal(detalle.asunto, correo.asunto);
  assert.ok(!JSON.stringify(registros).includes("re_prueba"), "la llave no va al registro");
});

test("si no hay red o faltan variables, el registro también lleva el detalle", async () => {
  const registros: unknown[][] = [];
  const registrar = (...datos: unknown[]) => registros.push(datos);
  const correo = correoCotizacion(aviso, new Date());
  await enviarCorreo("cotizacion", correo, { entorno, pagina: "/", registrar, envio: async () => { throw new Error("ECONNRESET"); } });
  await enviarCorreo("cotizacion", correo, { entorno: { EMAIL_TO: "ventas@kanuby.com" }, pagina: "/blog/", registrar, envio: async () => new Response() });
  assert.match(String(registros[0][0]), /no se pudo contactar a Resend/);
  assert.equal(detalleDe(registros[0]).error, "ECONNRESET");
  assert.equal(detalleDe(registros[0]).pagina, "/");
  assert.match(String(registros[1][0]), /faltan RESEND_API_KEY\./);
  assert.deepEqual(detalleDe(registros[1]).faltan, ["RESEND_API_KEY"]);
  assert.equal(detalleDe(registros[1]).pagina, "/blog/");
});

test("un envío que sale queda registrado con el id de Resend, sin errores", async () => {
  const registros: unknown[][] = [];
  const informes: unknown[][] = [];
  const enviado = await enviarCorreo("cotizacion", correoCotizacion(aviso, new Date()), {
    entorno,
    pagina: "/",
    registrar: (...datos) => registros.push(datos),
    informar: (...datos) => informes.push(datos),
    envio: async () => new Response('{"id":"abc-123"}', { status: 200 }),
  });
  assert.equal(enviado, true);
  assert.equal(registros.length, 0);
  assert.match(String(informes[0][0]), /\[correo\] Aviso enviado \(cotizacion\)/);
  assert.equal(JSON.parse(String(informes[0][1])).id, "abc-123");
});

/* Origen del lead: formulario y campaña */

test("el origen distingue el botón flotante del popup de cotización", () => {
  assert.equal(origenDelAviso(cuerpoFlotante).formulario, "flotante");
  assert.equal(origenDelAviso(cuerpo).formulario, "cotizacion");
  assert.deepEqual(origenDelAviso(null), { formulario: "cotizacion", campana: null });
});

test("la campaña del navegador se limpia y una rara se descarta sin rechazar el aviso", () => {
  const conCampana = { ...cuerpo, campana: { utm_source: "google", gclid: "Cj0K", otro: "x", fbclid: 5 } };
  assert.deepEqual(origenDelAviso(conCampana).campana, { utm_source: "google", gclid: "Cj0K" });
  assert.equal(origenDelAviso({ ...cuerpo, campana: "basura" }).campana, null);
  // La validación de siempre no cambia por la campaña
  assert.deepEqual(validarAviso(conCampana), validarAviso(cuerpo));
  assert.deepEqual(validarAviso({ ...conCampana, sitio: "x" }), { tipo: "bot" });
});

/* WhatsApp del lead */

test("el WhatsApp del lead: diez dígitos son de México, con lada se respeta, corto no hay", () => {
  assert.equal(whatsappDelTelefono("81 1234 5678"), "528112345678");
  assert.equal(whatsappDelTelefono("(81) 1234-5678"), "528112345678");
  assert.equal(whatsappDelTelefono("+52 1 81 1234 5678"), "5218112345678");
  assert.equal(whatsappDelTelefono("+52 81 1234 5678"), "528112345678");
  assert.equal(whatsappDelTelefono("1234"), null);
});

/* El correo: identidad, tres bloques, enlaces y campaña */

const fechaPrueba = new Date("2026-10-09T18:30:00Z");
const campana = { utm_source: "google", utm_medium: "cpc", utm_campaign: "minibodegas-mty", gclid: "Cj0K<b>", fbclid: "IwAR" };

test("el correo va en tres bloques, en orden: datos del lead, de dónde vino y cuándo entró", () => {
  const { texto, html } = correoCotizacion(aviso, fechaPrueba, { formulario: "cotizacion", campana });
  const orden = ["DATOS DEL LEAD", "DE DÓNDE VINO", "CUÁNDO ENTRÓ"].map((titulo) => texto.indexOf(titulo));
  assert.ok(orden.every((i) => i >= 0) && orden[0] < orden[1] && orden[1] < orden[2], texto);
  const ordenHtml = ["Datos del lead", "De dónde vino", "Cuándo entró"].map((titulo) => html.indexOf(titulo));
  assert.ok(ordenHtml.every((i) => i >= 0) && ordenHtml[0] < ordenHtml[1] && ordenHtml[1] < ordenHtml[2]);
});

test("el teléfono es enlace para llamar y para escribir por WhatsApp", () => {
  const { html, texto } = correoCotizacion(aviso, fechaPrueba);
  assert.match(html, /href="tel:8112345678"[^>]*>81 1234 5678</);
  assert.match(html, /href="https:\/\/wa\.me\/528112345678"[^>]*>Escribir por WhatsApp</);
  assert.ok(texto.includes("WhatsApp: https://wa.me/528112345678"));
});

test("de dónde vino: formulario, página con su dirección completa y la campaña", () => {
  const { html, texto } = correoCotizacion(aviso, fechaPrueba, { formulario: "flotante", campana });
  for (const dato of [
    "Formulario: Botón flotante",
    "Página: https://kanuby.com/minibodegas-monterrey/",
    "Fuente (utm_source): google",
    "Medio (utm_medium): cpc",
    "Campaña (utm_campaign): minibodegas-mty",
    "Clic de Google Ads (gclid): Cj0K<b>",
    "Clic de Meta (fbclid): IwAR",
  ])
    assert.ok(texto.includes(dato), dato);
  assert.ok(html.includes('href="https://kanuby.com/minibodegas-monterrey/"'));
  assert.ok(html.includes("Cj0K&lt;b&gt;") && !html.includes("Cj0K<b>"), "la campaña también se escapa");
});

test("sin datos de campaña, el correo no muestra esa parte", () => {
  const { html, texto } = correoCotizacion(aviso, fechaPrueba, { formulario: "cotizacion", campana: null });
  for (const contenido of [texto, html]) {
    assert.doesNotMatch(contenido, /utm_|gclid|gbraid|wbraid|fbclid|Clic de/);
  }
  assert.ok(texto.includes("Página: https://kanuby.com/minibodegas-monterrey/"));
});

test("el asunto distingue servicio y formulario de un vistazo", () => {
  assert.equal(correoCotizacion(aviso, fechaPrueba, { formulario: "flotante", campana: null }).asunto, "Minibodega · Botón flotante · Ana <b>López</b>");
  assert.equal(
    correoCotizacion({ ...aviso, negocio: "mudanza", tipo: "Mudanza local" }, fechaPrueba, { formulario: "cotizacion", campana: null }).asunto,
    "Mudanza · Popup de cotización · Ana <b>López</b>",
  );
});

test("el diseño es claro, con el naranja como acento y maquetado con tablas", () => {
  const { html } = correoCotizacion(aviso, fechaPrueba);
  assert.ok(html.includes("background:#f4f6f8"), "fondo claro");
  assert.ok(!/#04151e|#082430/i.test(html), "sin los fondos oscuros del sitio");
  assert.ok(html.includes("border-top:4px solid #ec5b2a"), "el naranja de marca como acento");
  assert.ok(html.includes('role="presentation"') && html.includes("max-width:520px"));
  assert.ok(html.includes('name="color-scheme" content="light"'));
});
