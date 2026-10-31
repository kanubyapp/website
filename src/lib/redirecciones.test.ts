import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { posts } from "./posts.ts";
import { REDIRECCIONES, rutaEnMinusculas } from "./redirecciones.ts";

/* Las rutas que existen hoy: carpetas de src/app con página y los 24 posts */
const rutasVivas = [
  "/",
  ...readdirSync("src/app", { withFileTypes: true })
    .filter((e) => e.isDirectory() && !/^[_[]/.test(e.name) && e.name !== "styles")
    .map((e) => `/${e.name}/`),
  ...posts.map((post) => `/${post.slug}/`),
  "/sitemap.xml",
  "/robots.txt",
];

/* El origen de una regla como expresión regular, sin distinguir mayúsculas (como Next) */
function patron(source: string): RegExp {
  const cuerpo = source
    .replace(/[.]/g, "\\.")
    .replace(/:\w+\(([^)]+)\)/g, "($1)")
    .replace(/\/:\w+\*/g, "(?:/.*)?")
    .replace(/:\w+/g, "[^/]+");
  return new RegExp(`^${cuerpo}$`, "i");
}

const coincide = (ruta: string) => REDIRECCIONES.find((r) => patron(r.source).test(ruta));

test("todas son 301 explícitas y sin orígenes repetidos", () => {
  for (const r of REDIRECCIONES) assert.equal(r.statusCode, 301, r.source);
  const origenes = REDIRECCIONES.map((r) => r.source.toLowerCase());
  assert.equal(new Set(origenes).size, origenes.length);
});

test("ninguna regla captura una ruta que hoy existe", () => {
  assert.ok(rutasVivas.includes("/mudanzas-monterrey/") && rutasVivas.includes("/blog/"));
  for (const ruta of rutasVivas) assert.equal(coincide(ruta), undefined, ruta);
});

test("un solo salto: cada destino es una ruta viva y no lo captura otra regla", () => {
  for (const r of REDIRECCIONES) {
    assert.ok(rutasVivas.includes(r.destination), `${r.source} → ${r.destination}`);
    assert.equal(coincide(r.destination), undefined, r.destination);
  }
});

test("el feed de cada post va a su post; los demás feeds, al blog", () => {
  for (const post of posts)
    assert.equal(coincide(`/${post.slug}/feed/`)?.destination, `/${post.slug}/`);
  for (const ruta of [
    "/feed/",
    "/feed/atom/",
    "/mudanzas/feed/",
    "/comments/feed/",
    "/gracias/feed/",
  ])
    assert.equal(coincide(ruta)?.destination, "/blog/", ruta);
});

test("cada grupo del inventario llega a su destino", () => {
  const casos: [string, string][] = [
    ["/sitemap_index.xml", "/sitemap.xml"],
    ["/wp-sitemap.xml", "/sitemap.xml"],
    ["/HOME/", "/"],
    ["/cotizar-mudanza/", "/mudanzas-monterrey/"],
    ["/mudanzas/monterrey-cdmx/", "/mudanzas-monterrey-cdmx/"],
    ["/minibodegas-monterrey/container/", "/minibodegas-monterrey/"],
    ["/favicon/cropped-favicon-png/", "/"],
    ["/home/sin-titulo-2/", "/"],
    ["/pr2-2/", "/"],
    ["/page/2/", "/blog/"],
    ["/mudanzas/page/1/", "/blog/"],
    ["/author/scndal/", "/blog/"],
    ["/author/scndal/feed/", "/blog/"],
    ["/2025/05/14/", "/blog/"],
    ["/search/caja/", "/blog/"],
    ["/gracias/", "/"],
    ["/nosotros/", "/"],
    ["/mudanzas/monterrey/", "/mudanzas-monterrey/"],
    ["/minibodegas/puebla/", "/minibodegas-monterrey/"],
    ["/mudanzas-puebla/", "/mudanzas-monterrey/"],
    ["/calculator/", "/minibodegas-monterrey/"],
    ["/privacy/", "/aviso-de-privacidad/"],
    ["/blog/6-tips-para-mantener-tu-cuarto-habitaci-n-organizado/", "/blog/"],
    ["/quoter/5f2a9c1e/spaces/", "/minibodegas-monterrey/"],
  ];
  for (const [ruta, destino] of casos) assert.equal(coincide(ruta)?.destination, destino, ruta);
});

test("el cotizador viejo solo captura /quoter/{id}/spaces/", () => {
  assert.equal(coincide("/quoter/"), undefined);
  assert.equal(coincide("/quoter/abc/"), undefined);
  assert.equal(coincide("/quoter/abc/otra/"), undefined);
  assert.equal(coincide("/quoter/a/b/spaces/"), undefined);
});

/* Enlaces internos escritos en el código: href de componentes y "enlace" de los posts */
test("ningún enlace interno del código depende de una redirección", () => {
  const archivos = readdirSync("src", { recursive: true, encoding: "utf8" }).filter(
    (f) => /\.(tsx?|md)$/.test(f) && !f.includes("redirecciones"),
  );
  const enlaces = archivos.flatMap((f) =>
    [
      ...readFileSync(`src/${f}`, "utf8").matchAll(
        /(?:href|"enlace")[=:]\s*\{?["'`](\/[^"'`#?]*)/g,
      ),
    ].map((m) => [f, m[1]] as const),
  );
  assert.ok(enlaces.length > 20);
  for (const [archivo, ruta] of enlaces)
    assert.equal(coincide(ruta), undefined, `${archivo}: ${ruta}`);
});

test("minúsculas: solo cambia lo que tiene mayúsculas, sobre la ruta decodificada", () => {
  assert.equal(rutaEnMinusculas("/Mudanzas-Monterrey/"), "/mudanzas-monterrey/");
  assert.equal(rutaEnMinusculas("/ESPA%C3%91A/"), "/espa%C3%B1a/");
  assert.equal(rutaEnMinusculas("/espa%C3%B1a/"), null);
  assert.equal(rutaEnMinusculas("/mudanzas-monterrey/"), null);
  assert.equal(rutaEnMinusculas("/%E0%A4%A/"), null);
});

test("minúsculas: no toca /_next/, /api/ ni /images/", () => {
  assert.equal(rutaEnMinusculas("/images/Black-webtag.png"), null);
  assert.equal(rutaEnMinusculas("/_next/static/AbC/x.js"), null);
  assert.equal(rutaEnMinusculas("/api/Cotizacion/"), null);
});
