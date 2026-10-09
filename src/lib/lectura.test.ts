import { test } from "node:test";
import assert from "node:assert/strict";
import { contarPalabras, PALABRAS_POR_MINUTO, tiempoLectura } from "./lectura.ts";
import { posts } from "./posts.ts";

test("cuenta las palabras de títulos, párrafos y listas, incluidas negritas y enlaces", () => {
  assert.equal(
    contarPalabras([
      { tipo: "titulo", nivel: 2, estilo: 3, texto: ["Paso 1: haz una lista"] },
      { tipo: "parrafo", texto: ["Hola ", { negrita: ["mundo"] }, " y ", { enlace: "/x/", texto: ["más"] }, "."] },
      { tipo: "lista", ordenada: false, items: [["3.5 m²"], ["Cajas — cinta"]] },
      { tipo: "separador" },
    ]),
    // Paso 1: haz una lista (5) + Hola mundo y más (4) + 3.5 m² (2) + Cajas cinta (2); el guion no cuenta
    13,
  );
});

test("un post sin contenido tiene cero palabras", () => {
  assert.equal(contarPalabras([]), 0);
});

test("tiempo de lectura: mínimo 1 minuto, redondeado hacia arriba", () => {
  assert.equal(tiempoLectura(1), "1 minuto");
  assert.equal(tiempoLectura(PALABRAS_POR_MINUTO), "1 minuto");
  assert.equal(tiempoLectura(PALABRAS_POR_MINUTO + 1), "2 minutos");
  assert.equal(tiempoLectura(PALABRAS_POR_MINUTO * 5), "5 minutos");
});

test("sin palabras no hay tiempo de lectura", () => {
  assert.equal(tiempoLectura(0), null);
});

test("cada post toma sus palabras y su tiempo de lectura de su contenido real", () => {
  for (const post of posts) {
    const palabras = contarPalabras(post.contenido);
    assert.equal(post.seo.palabras, palabras, post.slug);
    assert.equal(post.seo.lectura, tiempoLectura(palabras), post.slug);
  }
  const integrado = posts.find((post) => post.slug === "guia-para-elegir-el-tamano-ideal-de-tu-minibodega")!;
  assert.ok(integrado.seo.palabras > 300, "un post con contenido ya no usa el valor fijo del publicado");
});
