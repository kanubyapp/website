import { test } from "node:test";
import assert from "node:assert/strict";
import {
  campanaDeUrl,
  campanaGuardada,
  capturarCampana,
  LARGO_MAXIMO,
  limpiarCampana,
} from "./campana.ts";

function almacen() {
  const datos = new Map<string, string>();
  const objeto = {
    getItem: (clave: string) => datos.get(clave) ?? null,
    setItem: (clave: string, valor: string) => void datos.set(clave, valor),
  };
  return () => objeto;
}

test("de la dirección salen los UTM y los identificadores de clic de Google y Meta, y nada más", () => {
  assert.deepEqual(
    campanaDeUrl(
      "?utm_source=google&utm_medium=cpc&utm_campaign=minibodegas-mty&utm_term=bodega&utm_content=a1&gclid=Cj0K&gbraid=0AA&wbraid=Cl&fbclid=IwAR&otro=x",
    ),
    {
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "minibodegas-mty",
      utm_term: "bodega",
      utm_content: "a1",
      gclid: "Cj0K",
      gbraid: "0AA",
      wbraid: "Cl",
      fbclid: "IwAR",
    },
  );
});

test("sin parámetros de campaña, o vacíos, no hay campaña", () => {
  assert.equal(campanaDeUrl(""), null);
  assert.equal(campanaDeUrl("?pagina=2&utm_source=  "), null);
});

test("limpiar: solo claves conocidas, solo texto, recortado al largo máximo", () => {
  assert.deepEqual(
    limpiarCampana({ utm_source: " meta ", fbclid: "x".repeat(LARGO_MAXIMO + 50), gclid: 123, malicioso: "<script>" }),
    { utm_source: "meta", fbclid: "x".repeat(LARGO_MAXIMO) },
  );
  assert.equal(limpiarCampana("texto"), null);
  assert.equal(limpiarCampana(null), null);
});

test("se guarda al llegar y se conserva al navegar a páginas sin parámetros", () => {
  const sesion = almacen();
  capturarCampana("?utm_source=google&gclid=abc", sesion);
  capturarCampana("", sesion); // segunda página
  capturarCampana("?pagina=3", sesion); // tercera página
  assert.deepEqual(campanaGuardada(sesion), { utm_source: "google", gclid: "abc" });
});

test("si vuelve a entrar por otro anuncio en la misma visita, cuenta el último", () => {
  const sesion = almacen();
  capturarCampana("?utm_source=google&gclid=abc", sesion);
  capturarCampana("?utm_source=facebook&fbclid=xyz", sesion);
  assert.deepEqual(campanaGuardada(sesion), { utm_source: "facebook", fbclid: "xyz" });
});

test("sin nada guardado o sin almacenamiento disponible: sin campaña y sin error", () => {
  assert.equal(campanaGuardada(almacen()), null);
  const bloqueado = () => {
    throw new Error("bloqueado");
  };
  assert.doesNotThrow(() => capturarCampana("?utm_source=google", bloqueado));
  assert.equal(campanaGuardada(bloqueado), null);
});
