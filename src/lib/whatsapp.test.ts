import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mensajeMinibodega,
  mensajeMudanza,
  TAMANOS_MINIBODEGA,
  TIPOS_MUDANZA,
  urlWhatsApp,
  validarCotizacionMinibodega,
  validarCotizacionMudanza,
} from "./whatsapp.ts";

test("opciones de mudanza del paso 1", () => {
  assert.deepEqual(TIPOS_MUDANZA, [
    "Mudanza local",
    "Mudanza de Monterrey a CDMX",
    "Mudanza empresarial",
  ]);
});

test("opciones de minibodega del paso 1", () => {
  assert.deepEqual(TAMANOS_MINIBODEGA, ["3.5 m²", "7 m²", "14 m²", "No estoy seguro"]);
});

test("mensaje de mudanza local", () => {
  assert.equal(
    mensajeMudanza("Ana", "Mudanza local"),
    "Hola Kanuby, soy Ana. Me interesa cotizar una mudanza local.",
  );
});

test("mensaje de mudanza de Monterrey a CDMX", () => {
  assert.equal(
    mensajeMudanza("Ana", "Mudanza de Monterrey a CDMX"),
    "Hola Kanuby, soy Ana. Me interesa cotizar una mudanza de Monterrey a CDMX.",
  );
});

test("mensaje de mudanza empresarial", () => {
  assert.equal(
    mensajeMudanza("Ana", "Mudanza empresarial"),
    "Hola Kanuby, soy Ana. Me interesa cotizar una mudanza empresarial.",
  );
});

test("el mensaje recorta espacios del nombre", () => {
  assert.equal(
    mensajeMudanza("  Ana  ", "Mudanza local"),
    "Hola Kanuby, soy Ana. Me interesa cotizar una mudanza local.",
  );
});

test("el mensaje no lleva correo ni teléfono", () => {
  for (const mensaje of [
    mensajeMudanza("Ana", "Mudanza local"),
    mensajeMinibodega("Ana", "7 m²"),
  ]) {
    assert.doesNotMatch(mensaje, /correo|@|teléfono/i);
  }
});

test("la URL apunta al número de Kanuby y codifica el mensaje", () => {
  assert.equal(
    urlWhatsApp("Hola Kanuby"),
    "https://wa.me/5218110287087?text=Hola%20Kanuby",
  );
});

test("caracteres especiales en el nombre llegan intactos a WhatsApp", () => {
  const nombre = "José Ñúñez & Hijos #1 + Cía. ¿?/=";
  const url = urlWhatsApp(mensajeMudanza(nombre, "Mudanza local"));
  const texto = new URL(url).searchParams.get("text");

  assert.equal(texto, `Hola Kanuby, soy ${nombre}. Me interesa cotizar una mudanza local.`);
  // Ni & ni # ni + pueden quedar sin codificar: cortarían o alterarían el texto.
  assert.doesNotMatch(url.split("?text=")[1], /[&#+ ]/);
});

test("validación: nombre y teléfono llenos y tipo válido no devuelve errores", () => {
  assert.deepEqual(
    validarCotizacionMudanza({ nombre: "Ana", telefono: "8112345678", tipo: "Mudanza local" }),
    {},
  );
});

test("validación: nombre y teléfono vacíos o en blanco son obligatorios", () => {
  const errores = validarCotizacionMudanza({ nombre: " ", telefono: "", tipo: "Mudanza local" });
  assert.deepEqual(errores, {
    nombre: "Escribe tu nombre.",
    telefono: "Escribe tu teléfono.",
  });
});

test("validación: el tipo de mudanza debe ser una de las opciones", () => {
  for (const tipo of ["", "Mudanza Nacional", "3.5 m²"]) {
    const errores = validarCotizacionMudanza({ nombre: "Ana", telefono: "8112345678", tipo });
    assert.deepEqual(errores, { tipo: "Elige el tipo de mudanza." });
  }
});

test("mensaje de minibodega de 3.5 m²", () => {
  assert.equal(
    mensajeMinibodega("Ana", "3.5 m²"),
    "Hola Kanuby, soy Ana. Me interesa rentar una minibodega de 3.5 m².",
  );
});

test("mensaje de minibodega de 7 m²", () => {
  assert.equal(
    mensajeMinibodega("Ana", "7 m²"),
    "Hola Kanuby, soy Ana. Me interesa rentar una minibodega de 7 m².",
  );
});

test("mensaje de minibodega de 14 m²", () => {
  assert.equal(
    mensajeMinibodega("Ana", "14 m²"),
    "Hola Kanuby, soy Ana. Me interesa rentar una minibodega de 14 m².",
  );
});

test("mensaje de minibodega sin tamaño decidido", () => {
  assert.equal(
    mensajeMinibodega("Ana", "No estoy seguro"),
    "Hola Kanuby, soy Ana. Me interesa rentar una minibodega, aún no sé qué tamaño necesito.",
  );
});

test("el mensaje de minibodega con caracteres especiales llega intacto a WhatsApp", () => {
  const nombre = "José Ñúñez & Hijos #1 + Cía.";
  const url = urlWhatsApp(mensajeMinibodega(nombre, "7 m²"));
  assert.equal(
    new URL(url).searchParams.get("text"),
    `Hola Kanuby, soy ${nombre}. Me interesa rentar una minibodega de 7 m².`,
  );
});

test("validación de minibodega: acepta los 4 tamaños y rechaza otros", () => {
  for (const tipo of TAMANOS_MINIBODEGA) {
    assert.deepEqual(
      validarCotizacionMinibodega({ nombre: "Ana", telefono: "8112345678", tipo }),
      {},
    );
  }
  const errores = validarCotizacionMinibodega({ nombre: "Ana", telefono: "8112345678", tipo: "Mudanza local" });
  assert.deepEqual(errores, { tipo: "Elige el espacio que buscas." });
});

test("validación de minibodega: nombre y teléfono obligatorios", () => {
  const errores = validarCotizacionMinibodega({ nombre: "", telefono: "  ", tipo: "7 m²" });
  assert.deepEqual(Object.keys(errores).sort(), ["nombre", "telefono"]);
});
