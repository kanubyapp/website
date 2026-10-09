import { test } from "node:test";
import assert from "node:assert/strict";
import { acomodar, ordenDeDibujo, piezasDeLineas, type Bloque } from "./acomodo-bloques.ts";
import { lineasInventario } from "./calculadora.ts";
import { MINIBODEGAS } from "./minibodegas.ts";

const [chica, mediana, grande] = MINIBODEGAS;
const piezas = (inventario: Record<string, number>, limite?: number) =>
  piezasDeLineas(lineasInventario(inventario), limite);
const volumen = (bloques: Bloque[]) =>
  bloques.reduce((suma, { ancho, largo, alto }) => suma + ancho * largo * alto, 0);

test("un bloque por unidad, con clave estable", () => {
  assert.deepEqual(
    piezas({ silla: 3 }).map((pieza) => pieza.clave),
    ["silla-1", "silla-2", "silla-3"],
  );
});

test("sobre el límite, los objetos iguales se juntan empezando por los de más unidades", () => {
  const resultado = piezas({ "caja-mediana": 4, silla: 3, "sofa-3": 1 }, 5);
  assert.deepEqual(
    resultado.map(({ clave, cantidad }) => [clave, cantidad]),
    [
      ["sofa-3-1", 1],
      ["silla-1", 1],
      ["silla-2", 1],
      ["silla-3", 1],
      ["caja-mediana-grupo", 4],
    ],
  );
  const grupo = resultado.find((pieza) => pieza.clave === "caja-mediana-grupo");
  assert.ok(grupo && Math.abs(grupo.volumen - 0.28) < 1e-9);
});

test("con el límite por defecto, 99 cajas de cada tipo no pasan de 60 bloques", () => {
  const inventario = Object.fromEntries(
    ["caja-chica", "caja-mediana", "caja-grande", "caja-archivo", "caja-ropero", "maleta"].map((id) => [id, 99]),
  );
  assert.ok(piezas(inventario).length <= 60);
});

test("primero se cubre el piso", () => {
  const bloques = acomodar(piezas({ "caja-mediana": 6 }), chica);
  assert.ok(bloques.every((bloque) => bloque.z === 0));
});

test("cuando el piso se llena, apila hacia arriba", () => {
  const bloques = acomodar(piezas({ "caja-mediana": 40 }), chica);
  assert.ok(bloques.some((bloque) => bloque.z > 0));
});

test("cada bloque es proporcional a su volumen con el margen", () => {
  // 1.5 + 1 + 10 × 0.07 = 3.2 m³
  const inventario = { "sofa-3": 1, refrigerador: 1, "caja-mediana": 10 };
  const bloques = acomodar(piezas(inventario), grande, 0.3);
  assert.ok(Math.abs(volumen(bloques) - 3.2 * 1.3) < 1e-9);
});

test("lo grande va abajo", () => {
  const bloques = acomodar(piezas({ "caja-chica": 3, "cama-king": 1 }), mediana);
  const cama = bloques.find((bloque) => bloque.objetoId === "cama-king");
  assert.equal(cama?.z, 0);
});

test("todo queda dentro de la bodega, aun con más de lo que cabe", () => {
  for (const bodega of MINIBODEGAS) {
    const bloques = acomodar(piezas({ "cama-king": 10, "caja-grande": 50, ropero: 6 }), bodega);
    for (const bloque of bloques) {
      assert.ok(bloque.x >= 0 && bloque.x + bloque.ancho <= bodega.ancho + 1e-9);
      assert.ok(bloque.y >= 0 && bloque.y + bloque.largo <= bodega.largo + 1e-9);
      assert.ok(bloque.z >= 0 && bloque.z + bloque.alto <= bodega.alto + 1e-9);
    }
  }
});

test("al cambiar de bodega se conservan las claves: los bloques se reacomodan", () => {
  const lista = piezas({ silla: 2, "sofa-3": 1 });
  const enChica = acomodar(lista, chica).map((bloque) => bloque.clave).sort();
  const enGrande = acomodar(lista, grande).map((bloque) => bloque.clave).sort();
  assert.deepEqual(enChica, enGrande);
});

const bloque = (clave: string, x: number, y: number, z: number): Bloque => ({
  clave,
  objetoId: clave,
  cantidad: 1,
  volumen: 1,
  x,
  y,
  z,
  ancho: 1,
  largo: 1,
  alto: 1,
});

test("se dibuja de atrás hacia delante y de abajo hacia arriba", () => {
  const fondo = bloque("fondo", 0, 0, 0);
  const frente = bloque("frente", 0, 1, 0);
  const encima = bloque("encima", 0, 0, 1);
  const orden = ordenDeDibujo([encima, frente, fondo]).map((b) => b.clave);
  assert.ok(orden.indexOf("fondo") < orden.indexOf("frente"));
  assert.ok(orden.indexOf("fondo") < orden.indexOf("encima"));
});
