import { test } from "node:test";
import assert from "node:assert/strict";
import { CATEGORIAS, MARGEN_ACOMODO } from "./catalogo-calculadora.ts";
import {
  CANTIDAD_MAXIMA,
  TOPE_BODEGAS,
  cambiarCantidad,
  combinaciones,
  textoCombinacion,
  lineasInventario,
  mensajeCalculadora,
  objetosPorId,
  recomendar,
  tamanoSolicitado,
  urlCalculadora,
  volumenInventario,
} from "./calculadora.ts";
import { eventoCalculadoraRegistro, eventoCalculadoraSolicitud } from "./conversiones.ts";
import type { Minibodega } from "./minibodegas.ts";

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

/* Volumen exacto con unidades de 10 litros de un objeto de prueba */
const unidad = { id: "prueba", nombre: "Caja de prueba", volumen: 0.01 };
const deVolumen = (metrosCubicos: number) => [{ objeto: unidad, cantidad: Math.round(metrosCubicos * 100) }];
const tamanos = (recomendacion: ReturnType<typeof recomendar>) =>
  recomendacion.bodegas.map(({ bodega }) => bodega.tamano);
const ocupaciones = (recomendacion: ReturnType<typeof recomendar>) =>
  recomendacion.bodegas.map(({ ocupacion }) => ocupacion);

test("el margen de acomodo es 30% y el tope, 4 bodegas", () => {
  assert.equal(MARGEN_ACOMODO, 0.3);
  assert.equal(TOPE_BODEGAS, 4);
});

test("recomienda la más chica donde cabe con el margen", () => {
  const recomendacion = recomendar(deVolumen(0.5), { bodegas: bodegasPrueba, margen: 0.25 });
  assert.equal(recomendacion.cabe, true);
  assert.deepEqual(tamanos(recomendacion), ["3.5 m²"]);
  assert.deepEqual(ocupaciones(recomendacion), [0.625]);
});

test("justo en el límite todavía cabe; un poco más pasa al siguiente tamaño", () => {
  const limite = recomendar(deVolumen(0.8), { bodegas: bodegasPrueba, margen: 0.25 });
  assert.deepEqual(tamanos(limite), ["3.5 m²"]);
  assert.deepEqual(ocupaciones(limite), [1]);

  const siguiente = recomendar(deVolumen(0.81), { bodegas: bodegasPrueba, margen: 0.25 });
  assert.deepEqual(tamanos(siguiente), ["7 m²"]);
});

test("sin objetos recomienda la chica, vacía", () => {
  const recomendacion = recomendar([]);
  assert.equal(recomendacion.cabe, true);
  assert.deepEqual(tamanos(recomendacion), ["3.5 m²"]);
  assert.deepEqual(ocupaciones(recomendacion), [0]);
});

test("con las medidas publicadas: chica, mediana y grande", () => {
  // Capacidades: 8.52, 16.98 y 34.55 m³; se aprovecha el 77%
  assert.deepEqual(tamanos(recomendar(deVolumen(6))), ["3.5 m²"]);
  assert.deepEqual(tamanos(recomendar(deVolumen(7))), ["7 m²"]);
  assert.deepEqual(tamanos(recomendar(deVolumen(13))), ["7 m²"]);
  assert.deepEqual(tamanos(recomendar(deVolumen(14))), ["14 m²"]);
  assert.deepEqual(tamanos(recomendar(deVolumen(26))), ["14 m²"]);
});

/* Combinación de bodegas (de prueba: Chica 1 m³, Mediana 2 m³, Grande 4 m³; margen 25%) */

const prueba = (metrosCubicos: number) =>
  recomendar(deVolumen(metrosCubicos), { bodegas: bodegasPrueba, margen: 0.25 });

test("justo en la capacidad de la Grande: una sola Grande, al 100%", () => {
  const recomendacion = prueba(3.2);
  assert.equal(recomendacion.cabe, true);
  assert.deepEqual(tamanos(recomendacion), ["14 m²"]);
  assert.deepEqual(ocupaciones(recomendacion), [1]);
});

test("justo arriba de la Grande: dos bodegas, la combinación de menor capacidad", () => {
  // 3.21 × 1.25 = 4.0125 m³: Grande + Chica (5 m³) gana a Grande + Mediana (6) y a 2 Grandes (8)
  const recomendacion = prueba(3.21);
  assert.equal(recomendacion.cabe, true);
  assert.deepEqual(tamanos(recomendacion), ["14 m²", "3.5 m²"]);
  // Llena la Grande antes de pasar a la siguiente
  assert.equal(recomendacion.bodegas[0].ocupacion, 1);
  assert.ok(recomendacion.bodegas[1].ocupacion > 0 && recomendacion.bodegas[1].ocupacion <= 1);
});

test("con tres bodegas no alcanza: cuatro, la de menor capacidad", () => {
  // 9.61 × 1.25 = 12.0125 m³, más que 3 Grandes (12): 3 Grandes + Chica (13)
  assert.deepEqual(tamanos(prueba(9.61)), ["14 m²", "14 m²", "14 m²", "3.5 m²"]);
});

test("el tope: justo en 4 Grandes todavía cabe", () => {
  const recomendacion = prueba(12.8);
  assert.equal(recomendacion.cabe, true);
  assert.deepEqual(tamanos(recomendacion), ["14 m²", "14 m²", "14 m²", "14 m²"]);
  assert.deepEqual(ocupaciones(recomendacion), [1, 1, 1, 1]);
});

test("sobre el tope no hay recomendación, y ninguna bodega pasa del 100%", () => {
  const recomendacion = prueba(12.81);
  assert.equal(recomendacion.cabe, false);
  assert.equal(recomendacion.bodegas.length, 4);
  assert.ok(ocupaciones(recomendacion).every((ocupacion) => ocupacion <= 1));
  assert.equal(tamanoSolicitado(recomendacion), "excede");
});

test("un objeto va entero en una bodega: si no se puede repartir, se sube de combinación", () => {
  // Piezas de 0.8 m³: 1 m³ cada una con el margen
  const grande = { id: "pieza", nombre: "Pieza", volumen: 0.8 };
  const recomendacion = recomendar([{ objeto: grande, cantidad: 3 }], {
    bodegas: bodegasPrueba,
    margen: 0.25,
  });
  // 3 m³ con margen: Grande sola
  assert.deepEqual(tamanos(recomendacion), ["14 m²"]);
  const cinco = recomendar([{ objeto: grande, cantidad: 5 }], { bodegas: bodegasPrueba, margen: 0.25 });
  // 5 m³ con margen: Grande + Chica suma 5, y cada pieza de 1 m³ entra entera
  assert.deepEqual(tamanos(cinco), ["14 m²", "3.5 m²"]);
  assert.deepEqual(
    cinco.bodegas.map(({ lineas }) => lineas.map(({ cantidad }) => cantidad)),
    [[4], [1]],
  );
});

test("las combinaciones van por número de bodegas y luego por capacidad", () => {
  const nombres = combinaciones(bodegasPrueba, 2).map((combinacion) =>
    combinacion.map((bodega) => bodega.nombre[0]).join(""),
  );
  assert.deepEqual(nombres, ["C", "M", "G", "CC", "MC", "MM", "GC", "GM", "GG"]);
});

test("el evento lleva la combinación recomendada", () => {
  assert.equal(tamanoSolicitado(recomendar(deVolumen(7))), "7 m²");
  assert.equal(tamanoSolicitado(prueba(3.21)), "14 m² + 3.5 m²");
});

/* Texto de la combinación */

test("la combinación en lenguaje claro", () => {
  assert.equal(textoCombinacion(recomendar(deVolumen(14))), "Minibodega Grande, 14 m²");
  // 5.6 m³ con margen = 7 m³: no cabe en Grande + Mediana (6), sí en 2 Grandes
  assert.equal(textoCombinacion(prueba(5.6)), "2 minibodegas Grandes de 14 m²");
  assert.equal(textoCombinacion(prueba(3.21)), "1 Grande y 1 Chica");
  // 10.4 m³ con margen = 13 m³: 3 Grandes y 1 Chica
  assert.equal(textoCombinacion(prueba(10.4)), "3 Grandes y 1 Chica");
});

/* Mensaje de WhatsApp */

test("mensaje con el nombre, el tamaño recomendado y la lista con cantidades", () => {
  const inventario = lineas({ "caja-mediana": 10, "sofa-3": 1 });
  assert.equal(
    mensajeCalculadora("  Ana ", recomendar(deVolumen(7)), inventario),
    "Hola Kanuby, soy Ana. Usé la calculadora de espacio y me recomendó una minibodega de 7 m². Esto es lo que quiero guardar:\n- Sofá de 3 plazas: 1\n- Caja mediana: 10",
  );
});

test("mensaje con varias bodegas del mismo tamaño", () => {
  assert.equal(
    mensajeCalculadora("Ana", prueba(5.6), lineas({ "cama-king": 2 })),
    "Hola Kanuby, soy Ana. Usé la calculadora de espacio y me recomendó 2 minibodegas Grandes de 14 m². Esto es lo que quiero guardar:\n- Cama king con base: 2",
  );
});

test("mensaje con bodegas de tamaños distintos", () => {
  assert.equal(
    mensajeCalculadora("Ana", prueba(10.4), lineas({ silla: 4 })),
    "Hola Kanuby, soy Ana. Usé la calculadora de espacio y me recomendó 3 minibodegas Grandes de 14 m² y 1 Chica de 3.5 m². Esto es lo que quiero guardar:\n- Silla: 4",
  );
  assert.equal(
    mensajeCalculadora("Ana", prueba(3.21), lineas({ silla: 4 })),
    "Hola Kanuby, soy Ana. Usé la calculadora de espacio y me recomendó 1 minibodega Grande de 14 m² y 1 Chica de 3.5 m². Esto es lo que quiero guardar:\n- Silla: 4",
  );
});

test("mensaje cuando no cabe ni en el tope", () => {
  assert.equal(
    mensajeCalculadora("Ana", prueba(13), lineas({ "cama-king": 2 })),
    "Hola Kanuby, soy Ana. Usé la calculadora de espacio y lo que quiero guardar no cabe ni en 4 minibodegas Grandes de 14 m², ¿me ayudan a armar un plan a mi medida? Esto es lo que quiero guardar:\n- Cama king con base: 2",
  );
});

test("la URL va al número de Kanuby con el mensaje codificado", () => {
  const recomendacion = recomendar(lineas({ silla: 4 }));
  const url = urlCalculadora("Ana", recomendacion, lineas({ silla: 4 }));
  assert.ok(url.startsWith("https://wa.me/5218110287087?text="));
  assert.equal(
    decodeURIComponent(url.split("?text=")[1]),
    mensajeCalculadora("Ana", recomendacion, lineas({ silla: 4 })),
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
