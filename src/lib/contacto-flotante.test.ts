import { test } from "node:test";
import assert from "node:assert/strict";
import { envioFlotante, SERVICIO_FLOTANTE, validarFlotante } from "./contacto-flotante.ts";
import { mensajeServicio, NUMERO_WHATSAPP } from "./whatsapp.ts";

const valida = { nombre: "Ana", telefono: "8112345678" };

function textoDe(url: string): string {
  return new URL(url).searchParams.get("text") ?? "";
}

/* Servicio de cada página */

test("el servicio sale de la página: mudanzas, minibodegas y la home lo pregunta", () => {
  assert.deepEqual(SERVICIO_FLOTANTE, {
    "/": null,
    "/mudanzas-monterrey/": "mudanza",
    "/minibodegas-monterrey/": "minibodega",
  });
});

/* Mensajes */

test("mensaje de mudanza sin tipo", () => {
  assert.equal(
    mensajeServicio("mudanza", "Ana"),
    "Hola Kanuby, soy Ana. Me interesa cotizar una mudanza.",
  );
});

test("mensaje de minibodega sin tamaño", () => {
  assert.equal(
    mensajeServicio("minibodega", "Ana"),
    "Hola Kanuby, soy Ana. Me interesa rentar una minibodega.",
  );
});

test("el mensaje recorta espacios del nombre", () => {
  assert.equal(
    mensajeServicio("mudanza", "  Ana  "),
    "Hola Kanuby, soy Ana. Me interesa cotizar una mudanza.",
  );
});

/* Envío en cada página */

test("en /mudanzas-monterrey/: mensaje de mudanza y cotizacion_mudanza con opción vacía", () => {
  const resultado = envioFlotante("/mudanzas-monterrey/", { ...valida, servicio: null });
  assert.equal(resultado.valido, true);
  if (!resultado.valido) return;
  assert.equal(resultado.negocio, "mudanza");
  assert.ok(resultado.url.startsWith(`https://wa.me/${NUMERO_WHATSAPP}?text=`));
  assert.equal(textoDe(resultado.url), "Hola Kanuby, soy Ana. Me interesa cotizar una mudanza.");
  assert.deepEqual(resultado.evento, {
    event: "cotizacion_mudanza",
    pagina: "/mudanzas-monterrey/",
    opcion: "",
  });
});

test("en /minibodegas-monterrey/: mensaje de minibodega y cotizacion_minibodega con opción vacía", () => {
  const resultado = envioFlotante("/minibodegas-monterrey/", { ...valida, servicio: null });
  assert.equal(resultado.valido, true);
  if (!resultado.valido) return;
  assert.equal(resultado.negocio, "minibodega");
  assert.equal(textoDe(resultado.url), "Hola Kanuby, soy Ana. Me interesa rentar una minibodega.");
  assert.deepEqual(resultado.evento, {
    event: "cotizacion_minibodega",
    pagina: "/minibodegas-monterrey/",
    opcion: "",
  });
});

test("en las páginas de servicio, un servicio enviado de más no cambia el de la página", () => {
  const resultado = envioFlotante("/mudanzas-monterrey/", { ...valida, servicio: "minibodega" });
  assert.equal(resultado.valido && resultado.negocio, "mudanza");
});

test("en la home, el mensaje y el evento salen del servicio elegido", () => {
  const mudanza = envioFlotante("/", { ...valida, servicio: "mudanza" });
  const minibodega = envioFlotante("/", { ...valida, servicio: "minibodega" });
  assert.ok(mudanza.valido && minibodega.valido);
  if (!mudanza.valido || !minibodega.valido) return;
  assert.equal(textoDe(mudanza.url), "Hola Kanuby, soy Ana. Me interesa cotizar una mudanza.");
  assert.deepEqual(mudanza.evento, { event: "cotizacion_mudanza", pagina: "/", opcion: "" });
  assert.equal(textoDe(minibodega.url), "Hola Kanuby, soy Ana. Me interesa rentar una minibodega.");
  assert.deepEqual(minibodega.evento, { event: "cotizacion_minibodega", pagina: "/", opcion: "" });
});

test("el mensaje lleva el nombre y nunca el teléfono", () => {
  const resultado = envioFlotante("/", { nombre: "Ana", telefono: "81 1234 5678", servicio: "mudanza" });
  assert.ok(resultado.valido);
  if (!resultado.valido) return;
  const texto = textoDe(resultado.url);
  assert.ok(texto.includes("Ana"));
  assert.ok(!texto.includes("81 1234 5678"));
  assert.ok(!texto.includes("8112345678"));
});

/* Validación */

test("validación: nombre y teléfono obligatorios, igual que el popup de cotización", () => {
  assert.deepEqual(validarFlotante("/mudanzas-monterrey/", { nombre: " ", telefono: "", servicio: null }), {
    nombre: "Escribe tu nombre.",
    telefono: "Escribe tu teléfono.",
  });
});

test("validación: en la home el servicio es obligatorio", () => {
  assert.deepEqual(validarFlotante("/", { ...valida, servicio: null }), {
    servicio: "Elige el servicio que buscas.",
  });
  assert.deepEqual(validarFlotante("/", { ...valida, servicio: "minibodega" }), {});
});

test("validación: en las páginas de servicio no se pide servicio", () => {
  assert.deepEqual(validarFlotante("/mudanzas-monterrey/", { ...valida, servicio: null }), {});
  assert.deepEqual(validarFlotante("/minibodegas-monterrey/", { ...valida, servicio: null }), {});
});

test("un envío que no pasa la validación no da evento ni URL", () => {
  const resultado = envioFlotante("/", { nombre: "", telefono: "", servicio: null });
  assert.deepEqual(resultado, {
    valido: false,
    errores: {
      nombre: "Escribe tu nombre.",
      telefono: "Escribe tu teléfono.",
      servicio: "Elige el servicio que buscas.",
    },
  });
});
