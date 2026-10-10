import { test } from "node:test";
import assert from "node:assert/strict";
import { buscar, normalizar } from "./busqueda-calculadora.ts";
import { CATEGORIAS, SUGERENCIAS_CAJAS } from "./catalogo-calculadora.ts";
import { objetosPorId } from "./calculadora.ts";

const ids = (consulta: string) => buscar(consulta).objetos.map((objeto) => objeto.id);
const sugerencias = (consulta: string) => buscar(consulta).sugerencias.map((sugerencia) => sugerencia.id);

test("normaliza mayúsculas, acentos, eñes y signos", () => {
  assert.equal(normalizar("  ¿Sillón   ÁRBOL, Niño? "), "sillon arbol nino");
});

/* Acentos y mayúsculas */

test("encuentra con y sin acentos, en mayúsculas o minúsculas", () => {
  for (const consulta of ["sillón", "sillon", "SILLÓN", "Sillon"]) {
    assert.ok(ids(consulta).includes("sillon"), consulta);
  }
  assert.deepEqual(ids("comoda"), ["comoda"]);
  assert.deepEqual(ids("Cómoda"), ["comoda"]);
  assert.ok(ids("arbol").includes("arbol-navidad"));
  assert.ok(ids("lampara").includes("lampara-pie"));
});

test("busca en todo el catálogo, no solo en una categoría", () => {
  // Silla de comedor, de oficina y de jardín
  assert.deepEqual(ids("silla"), ["silla", "silla-oficina", "silla-jardin"]);
});

test("acepta palabras sueltas, en cualquier orden, y plurales", () => {
  assert.deepEqual(ids("mesa jardín"), ["mesa-jardin"]);
  assert.deepEqual(ids("jardin mesa"), ["mesa-jardin"]);
  assert.ok(ids("sillas").includes("silla"));
  assert.ok(ids("colchones").includes("colchon"));
  assert.ok(ids("bicicletas").includes("bicicleta"));
});

test("mientras se escribe, encuentra por el comienzo", () => {
  assert.ok(ids("refr").includes("refrigerador"));
  assert.ok(ids("escri").includes("escritorio"));
});

/* Sinónimos */

test("sinónimos de cómo habla la gente", () => {
  assert.deepEqual(ids("refri"), ["refrigerador", "refrigerador-duplex"]);
  assert.ok(ids("tele").includes("pantalla"));
  assert.ok(ids("tv").includes("pantalla"));
  assert.ok(ids("TV").includes("mueble-tv"));
  assert.ok(ids("clóset").includes("ropero"));
  assert.ok(ids("closet").includes("ropero"));
  assert.deepEqual(ids("love seat"), ["sofa-2"]);
  assert.deepEqual(ids("cama de niño"), ["cama-individual"]);
  assert.deepEqual(ids("compu"), ["computadora"]);
  assert.ok(ids("bici").includes("bicicleta"));
  assert.ok(ids("nevera").includes("refrigerador"));
  assert.ok(ids("alfombra").includes("tapete"));
});

/* Sugerencias de cajas */

test("libros, documentos y papeles: cajas chicas y de archivo muerto", () => {
  for (const consulta of ["libros", "Libro", "documentos", "papeles", "mis libros", "libr"]) {
    assert.deepEqual(sugerencias(consulta), ["libros"], consulta);
  }
  const [libros] = buscar("libros").sugerencias;
  assert.deepEqual(libros.cajas, ["caja-chica", "caja-archivo"]);
  assert.equal(
    libros.texto,
    "Libros y artículos pequeños se guardan mejor en cajas. Te sugerimos cajas chicas, porque pesan.",
  );
});

test("ropa, zapatos, cobijas, almohadas y peluches: caja de ropero y caja grande", () => {
  for (const consulta of ["ropa", "zapatos", "cobijas", "almohada", "peluches"]) {
    assert.deepEqual(sugerencias(consulta), ["ropa"], consulta);
  }
  assert.deepEqual(buscar("ropa").sugerencias[0].cajas, ["caja-ropero", "caja-grande"]);
});

test("platos, vasos, trastes y ollas: caja mediana", () => {
  for (const consulta of ["platos", "vasos", "trastes", "ollas"]) {
    assert.deepEqual(sugerencias(consulta), ["cocina"], consulta);
  }
  assert.deepEqual(buscar("trastes").sugerencias[0].cajas, ["caja-mediana"]);
});

test("juguetes, adornos, cables, aparatos pequeños y herramientas: caja mediana", () => {
  for (const consulta of ["juguetes", "adornos", "cables", "aparatos", "herramientas", "herramienta"]) {
    assert.deepEqual(sugerencias(consulta), ["pequenos"], consulta);
  }
  assert.deepEqual(buscar("juguetes").sugerencias[0].cajas, ["caja-mediana"]);
});

test("cada sugerencia apunta a cajas que existen en el catálogo", () => {
  const objetos = objetosPorId();
  for (const sugerencia of SUGERENCIAS_CAJAS) {
    assert.ok(sugerencia.cajas.length > 0, sugerencia.id);
    for (const caja of sugerencia.cajas) {
      assert.ok(objetos.has(caja), `${sugerencia.id}: ${caja}`);
      assert.ok(CATEGORIAS.find((categoria) => categoria.id === "cajas")?.objetos.some((objeto) => objeto.id === caja));
    }
  }
});

test("los nombres de muebles no disparan sugerencias de cajas", () => {
  for (const consulta of ["cama", "sofá", "refri", "mesa", "car", "librero"]) {
    assert.deepEqual(sugerencias(consulta), [], consulta);
  }
});

/* Sin resultados */

test("sin objeto ni equivalencia: nada, para ofrecer calcularlo en cajas", () => {
  assert.deepEqual(buscar("piano"), { objetos: [], sugerencias: [] });
  assert.deepEqual(buscar("xyz"), { objetos: [], sugerencias: [] });
});

test("una búsqueda vacía o de puros espacios no busca", () => {
  assert.deepEqual(buscar(""), { objetos: [], sugerencias: [] });
  assert.deepEqual(buscar("   "), { objetos: [], sugerencias: [] });
});

/* Catálogo */

test("el catálogo tiene los objetos pedidos por categoría", () => {
  assert.deepEqual(
    CATEGORIAS.map((categoria) => [categoria.nombre, categoria.objetos.length]),
    [
      ["Sala", 13],
      ["Recámara", 12],
      ["Comedor", 5],
      ["Cocina y lavado", 8],
      ["Oficina", 4],
      ["Exterior y otros", 10],
      ["Cajas", 6],
    ],
  );
});
