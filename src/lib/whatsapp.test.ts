import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mensajeMinibodega,
  mensajeMudanza,
  urlWhatsApp,
  validarCotizacionMinibodega,
  validarCotizacionMudanza,
} from "./whatsapp.ts";

const correo = "ana@correo.com";

test("mensaje de mudanza local", () => {
  assert.equal(
    mensajeMudanza("Ana", "Mudanza Local", correo),
    "Hola Kanuby, soy Ana. Me interesa cotizar una mudanza local. Mi correo es ana@correo.com.",
  );
});

test("mensaje de mudanza nacional", () => {
  assert.equal(
    mensajeMudanza("Ana", "Mudanza Nacional", correo),
    "Hola Kanuby, soy Ana. Me interesa cotizar una mudanza nacional. Mi correo es ana@correo.com.",
  );
});

test("mensaje de flete", () => {
  assert.equal(
    mensajeMudanza("Ana", "Flete o Movimiento pequeño", correo),
    "Hola Kanuby, soy Ana. Me interesa cotizar un flete. Mi correo es ana@correo.com.",
  );
});

test("el mensaje recorta espacios del nombre y el correo", () => {
  assert.equal(
    mensajeMudanza("  Ana  ", "Mudanza Local", "  ana@correo.com "),
    "Hola Kanuby, soy Ana. Me interesa cotizar una mudanza local. Mi correo es ana@correo.com.",
  );
});

test("la URL apunta al número de Kanuby y codifica el mensaje", () => {
  assert.equal(
    urlWhatsApp("Hola Kanuby"),
    "https://wa.me/5218110287087?text=Hola%20Kanuby",
  );
});

test("caracteres especiales en el nombre llegan intactos a WhatsApp", () => {
  const nombre = "José Ñúñez & Hijos #1 + Cía. ¿?/=";
  const url = urlWhatsApp(mensajeMudanza(nombre, "Mudanza Local", correo));
  const texto = new URL(url).searchParams.get("text");

  assert.equal(
    texto,
    `Hola Kanuby, soy ${nombre}. Me interesa cotizar una mudanza local. Mi correo es ana@correo.com.`,
  );
  // Ni & ni # ni + pueden quedar sin codificar: cortarían o alterarían el texto.
  assert.doesNotMatch(url.split("?text=")[1], /[&#+ ]/);
});

test("validación: todo correcto no devuelve errores", () => {
  assert.deepEqual(
    validarCotizacionMudanza({ nombre: "Ana", correo, telefono: "8112345678", tipo: "Mudanza Local" }),
    {},
  );
});

test("validación: campos vacíos, correo inválido y tipo fuera de la lista", () => {
  const errores = validarCotizacionMudanza({ nombre: " ", correo: "ana@", telefono: "", tipo: "" });
  assert.deepEqual(Object.keys(errores).sort(), ["correo", "nombre", "telefono", "tipo"]);
});

test("mensaje de minibodega de 3.5 m²", () => {
  assert.equal(
    mensajeMinibodega("Ana", "3.5m²", correo),
    "Hola Kanuby, soy Ana. Me interesa rentar una minibodega de 3.5 m². Mi correo es ana@correo.com.",
  );
});

test("mensaje de minibodega de 7 m²", () => {
  assert.equal(
    mensajeMinibodega("Ana", "7m²", correo),
    "Hola Kanuby, soy Ana. Me interesa rentar una minibodega de 7 m². Mi correo es ana@correo.com.",
  );
});

test("mensaje de minibodega de 14 m²", () => {
  assert.equal(
    mensajeMinibodega("Ana", "14m²", correo),
    "Hola Kanuby, soy Ana. Me interesa rentar una minibodega de 14 m². Mi correo es ana@correo.com.",
  );
});

test("mensaje de minibodega sin tamaño decidido", () => {
  assert.equal(
    mensajeMinibodega("Ana", "No estoy Seguro", correo),
    "Hola Kanuby, soy Ana. Me interesa rentar una minibodega, aún no sé qué tamaño necesito. Mi correo es ana@correo.com.",
  );
});

test("el mensaje de minibodega con caracteres especiales llega intacto a WhatsApp", () => {
  const nombre = "José Ñúñez & Hijos #1 + Cía.";
  const url = urlWhatsApp(mensajeMinibodega(nombre, "7m²", correo));
  assert.equal(
    new URL(url).searchParams.get("text"),
    `Hola Kanuby, soy ${nombre}. Me interesa rentar una minibodega de 7 m². Mi correo es ana@correo.com.`,
  );
});

test("validación de minibodega: acepta los 4 tamaños y rechaza otros", () => {
  for (const tipo of ["3.5m²", "7m²", "14m²", "No estoy Seguro"]) {
    assert.deepEqual(
      validarCotizacionMinibodega({ nombre: "Ana", correo, telefono: "8112345678", tipo }),
      {},
    );
  }
  const errores = validarCotizacionMinibodega({ nombre: "Ana", correo, telefono: "8112345678", tipo: "Mudanza Local" });
  assert.deepEqual(Object.keys(errores), ["tipo"]);
});
