import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { entradasSitemap } from "./indexacion.ts";
import { LEGALES_CONFIRMADOS, RUTAS_LEGALES, robotsLegales } from "./legales.ts";

const urls = entradasSitemap().map((entrada) => entrada.url);
const codigoDe = (ruta: string) => readFileSync(new URL(`../app${ruta}page.tsx`, import.meta.url), "utf8");

test("las legales están en el sitemap y sin noindex solo cuando LEGALES_CONFIRMADOS es true", () => {
  for (const ruta of RUTAS_LEGALES) {
    assert.equal(urls.includes(`https://kanuby.com${ruta}`), LEGALES_CONFIRMADOS, ruta);
    assert.match(codigoDe(ruta), /robots: robotsLegales/, ruta);
  }
  assert.deepEqual(robotsLegales, LEGALES_CONFIRMADOS ? undefined : { index: false, follow: true });
});

test("no se confirman las legales mientras quede un dato pendiente", () => {
  if (!LEGALES_CONFIRMADOS) return;
  for (const ruta of RUTAS_LEGALES) assert.doesNotMatch(codigoDe(ruta), /<Pendiente/, ruta);
});
