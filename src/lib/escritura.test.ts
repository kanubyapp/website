import { test } from "node:test";
import assert from "node:assert/strict";
import {
  escrituraInicial,
  espera,
  FRASES_COTIZAR,
  siguiente,
  textoVisible,
  type Escritura,
} from "./escritura.ts";

const frases = FRASES_COTIZAR;

/* Avanza hasta que se cumpla la condición; devuelve los textos vistos. */
function avanzarHasta(estado: Escritura, hasta: (e: Escritura) => boolean) {
  const textos: string[] = [];
  let actual = estado;
  for (let i = 0; i < 500 && !hasta(actual); i++) {
    actual = siguiente(actual, frases);
    textos.push(textoVisible(actual, frases));
  }
  return { estado: actual, textos };
}

test("empieza con la primera frase completa y quieta, como sin animación", () => {
  const inicial = escrituraInicial(frases);
  assert.equal(textoVisible(inicial, frases), "Whatsapp");
  assert.equal(inicial.fase, "pausa");
  assert.ok(espera(inicial) >= 1000, "se queda visible unos segundos");
});

test("borra la frase letra por letra y escribe la siguiente letra por letra", () => {
  const { textos } = avanzarHasta(escrituraInicial(frases), (e) => e.frase === 1 && e.fase === "pausa");
  assert.deepEqual(textos.slice(0, 9), [
    "Whatsapp", // pasa de pausa a borrando
    "Whatsap",
    "Whatsa",
    "Whats",
    "What",
    "Wha",
    "Wh",
    "W",
    "", // borrada: cambia a la siguiente frase
  ]);
  assert.deepEqual(textos.slice(9, 12), ["C", "Co", "Cot"]);
  assert.equal(textos.at(-1), "Cotiza ahora");
});

test("recorre las tres frases en orden y vuelve a la primera", () => {
  let estado = escrituraInicial(frases);
  const completas: string[] = [];
  for (let vuelta = 0; vuelta < 3; vuelta++) {
    estado = avanzarHasta(estado, (e) => e.fase === "borrando").estado;
    estado = avanzarHasta(estado, (e) => e.fase === "pausa").estado;
    completas.push(textoVisible(estado, frases));
  }
  assert.deepEqual(completas, ["Cotiza ahora", "Respuesta rápida", "Whatsapp"]);
});

test("cada cambio de frase suma uno a cambios (el ícono gira en cada uno)", () => {
  let estado = escrituraInicial(frases);
  const vistos = [estado.cambios];
  for (let i = 0; i < 4; i++) {
    estado = avanzarHasta(estado, (e) => e.cambios === vistos.at(-1)! + 1).estado;
    vistos.push(estado.cambios);
  }
  assert.deepEqual(vistos, [0, 1, 2, 3, 4]);
});

test("las letras con acento cuentan como una sola", () => {
  const estado: Escritura = { frase: 2, letras: 15, fase: "escribiendo", cambios: 0 };
  assert.equal(textoVisible(estado, frases), "Respuesta rápid");
  assert.equal(siguiente(estado, frases).fase, "pausa");
});
