import { test } from "node:test";
import assert from "node:assert/strict";
import { CATEGORIAS, MARGEN_ACOMODO } from "./catalogo-calculadora.ts";
import {
  CANTIDAD_MAXIMA,
  cambiarCantidad,
  lineasInventario,
  mensajeCalculadora,
  objetosPorId,
  recomendar,
  tamanoSolicitado,
  urlCalculadora,
  volumenInventario,
} from "./calculadora.ts";
import { eventoCalculadoraRegistro, eventoCalculadoraSolicitud } from "./conversiones.ts";
import { MINIBODEGAS, type Minibodega } from "./minibodegas.ts";

const lineas = (inventario: Record<string, number>) => lineasInventario(inventario);

/* Bodegas de prueba con volúmenes redondos: 1, 2 y 4 m³ */
const cubo = (largo: number, nombre: Minibodega["nombre"], tamano: Minibodega["tamano"]): Minibodega => ({
  nombre,
  superficie: "3.5",
  tamano,
  alto: 1,
  ancho: 1,
  largo,
});
const bodegasPrueba = [cubo(1, "Chica", "3.5 m²"), cubo(2, "Mediana", "7 m²"), cubo(4, "Grande", "14 m²")];

/* Catálogo */

test("los ids del catálogo no se repiten", () => {
  const ids = CATEGORIAS.flatMap((categoria) => categoria.objetos.map((objeto) => objeto.id));
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(objetosPorId().size, ids.length);
});

test("el catálogo tiene las categorías pedidas, en orden", () => {
  assert.deepEqual(
    CATEGORIAS.map((categoria) => categoria.nombre),
    ["Sala", "Recámara", "Comedor", "Cocina", "Oficina", "Cajas", "Otros"],
  );
});

/* Inventario */

test("sumar y restar cantidades, sin bajar de 0 ni pasar del máximo", () => {
  let inventario = cambiarCantidad({}, "silla", 1);
  inventario = cambiarCantidad(inventario, "silla", 1);
  assert.deepEqual(inventario, { silla: 2 });
  inventario = cambiarCantidad(inventario, "silla", -1);
  assert.deepEqual(inventario, { silla: 1 });
  assert.deepEqual(cambiarCantidad(inventario, "silla", -1), {});
  assert.deepEqual(cambiarCantidad({}, "silla", -1), {});
  assert.deepEqual(cambiarCantidad({ silla: CANTIDAD_MAXIMA }, "silla", 1), { silla: CANTIDAD_MAXIMA });
});

test("las líneas salen en el orden del catálogo, no en el de agregado", () => {
  const resultado = lineas({ "caja-mediana": 10, "sofa-3": 1 });
  assert.deepEqual(
    resultado.map(({ objeto, cantidad }) => [objeto.id, cantidad]),
    [
      ["sofa-3", 1],
      ["caja-mediana", 10],
    ],
  );
});

/* Volumen */

test("volumen total: suma de volumen por cantidad, sin margen", () => {
  // 1.5 + 10 × 0.07
  assert.equal(volumenInventario(lineas({ "sofa-3": 1, "caja-mediana": 10 })), 2.2);
  assert.equal(volumenInventario([]), 0);
});

test("los decimales de los m³ no se acumulan", () => {
  // 0.1 + 0.2 en flotante es 0.30000000000000004
  assert.equal(volumenInventario(lineas({ tapete: 1, silla: 1 })), 0.3);
});

/* Recomendación */

test("el margen de acomodo es 30%", () => {
  assert.equal(MARGEN_ACOMODO, 0.3);
});

test("recomienda la más chica donde cabe con el margen", () => {
  const recomendacion = recomendar(0.5, { bodegas: bodegasPrueba, margen: 0.25 });
  assert.equal(recomendacion.cabe, true);
  assert.equal(recomendacion.bodega.tamano, "3.5 m²");
  assert.equal(recomendacion.ocupacion, 0.625);
});

test("justo en el límite todavía cabe; un litro más pasa al siguiente tamaño", () => {
  const limite = recomendar(0.8, { bodegas: bodegasPrueba, margen: 0.25 });
  assert.equal(limite.bodega.tamano, "3.5 m²");
  assert.equal(limite.ocupacion, 1);

  const siguiente = recomendar(0.804, { bodegas: bodegasPrueba, margen: 0.25 });
  assert.equal(siguiente.cabe, true);
  assert.equal(siguiente.bodega.tamano, "7 m²");
});

test("sin objetos recomienda la chica, vacía", () => {
  const recomendacion = recomendar(0);
  assert.equal(recomendacion.cabe, true);
  assert.equal(recomendacion.bodega.nombre, "Chica");
  assert.equal(recomendacion.ocupacion, 0);
});

test("con las medidas publicadas: chica, mediana y grande", () => {
  // Capacidades: 8.52, 16.98 y 34.55 m³; se aprovecha el 77%
  assert.equal(recomendar(6).bodega.nombre, "Chica");
  assert.equal(recomendar(7).bodega.nombre, "Mediana");
  assert.equal(recomendar(13).bodega.nombre, "Mediana");
  assert.equal(recomendar(14).bodega.nombre, "Grande");
  assert.equal(recomendar(26).cabe, true);
});

/* No cabe */

test("si no cabe en la más grande, lo dice y se queda en la más grande", () => {
  const recomendacion = recomendar(27);
  assert.equal(recomendacion.cabe, false);
  assert.equal(recomendacion.bodega, MINIBODEGAS[MINIBODEGAS.length - 1]);
  assert.ok(recomendacion.ocupacion > 1);
  assert.equal(tamanoSolicitado(recomendacion), "excede");
});

test("si cabe, el tamaño del evento es el recomendado", () => {
  assert.equal(tamanoSolicitado(recomendar(7)), "7 m²");
});

/* Mensaje de WhatsApp */

test("mensaje con el nombre, el tamaño recomendado y la lista con cantidades", () => {
  const inventario = lineas({ "caja-mediana": 10, "sofa-3": 1 });
  assert.equal(
    mensajeCalculadora("  Ana ", recomendar(7), inventario),
    "Hola Kanuby, soy Ana. Usé la calculadora de espacio y me recomendó una minibodega de 7 m². Esto es lo que quiero guardar:\n- Sofá de 3 plazas: 1\n- Caja mediana: 10",
  );
});

test("mensaje cuando no cabe en la más grande", () => {
  assert.equal(
    mensajeCalculadora("Ana", recomendar(27), lineas({ "cama-king": 2 })),
    "Hola Kanuby, soy Ana. Usé la calculadora de espacio y lo que quiero guardar no cabe en una minibodega de 14 m², ¿me ayudan a encontrar una opción? Esto es lo que quiero guardar:\n- Cama king con base: 2",
  );
});

test("la URL va al número de Kanuby con el mensaje codificado", () => {
  const url = urlCalculadora("Ana", recomendar(1), lineas({ silla: 4 }));
  assert.ok(url.startsWith("https://wa.me/5218110287087?text="));
  assert.equal(
    decodeURIComponent(url.split("?text=")[1]),
    mensajeCalculadora("Ana", recomendar(1), lineas({ silla: 4 })),
  );
});

/* Eventos */

test("eventos de la calculadora, sin datos personales", () => {
  assert.deepEqual(eventoCalculadoraRegistro("/minibodegas-monterrey/"), {
    event: "calculadora_registro",
    pagina: "/minibodegas-monterrey/",
  });
  assert.deepEqual(eventoCalculadoraSolicitud("/minibodegas-monterrey/", "excede"), {
    event: "calculadora_solicitud",
    pagina: "/minibodegas-monterrey/",
    tamano: "excede",
  });
});
