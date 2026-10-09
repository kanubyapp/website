import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { encabezadoNoIndex, entradasSitemap, esDominioPublico, reglasRobots } from "./indexacion.ts";
import { posts } from "./posts.ts";

const urls = entradasSitemap().map((entrada) => entrada.url);

test("el sitemap lleva las páginas indexables y todos los posts, con URL absoluta y barra final", () => {
  for (const ruta of ["/", "/mudanzas-monterrey/", "/mudanzas-monterrey-cdmx/", "/mudanzas-empresariales-monterrey/", "/minibodegas-monterrey/", "/blog/"])
    assert.ok(urls.includes(`https://kanuby.com${ruta}`), ruta);
  for (const post of posts) assert.ok(urls.includes(`https://kanuby.com/${post.slug}/`), post.slug);
  for (const url of urls) assert.match(url, /^https:\/\/kanuby\.com\/(.*\/)?$/);
  assert.equal(new Set(urls).size, urls.length);
});

test("los posts llevan su fecha de modificación", () => {
  const entrada = entradasSitemap().find((e) => e.url === `https://kanuby.com/${posts[0].slug}/`);
  assert.equal(entrada?.lastModified, posts[0].modificado);
});

test("el sitemap deja fuera las páginas con noindex (las de categoría y /social/)", () => {
  for (const ruta of ["/mudanzas/", "/minibodegas/", "/sin-categoria/", "/social/"])
    assert.ok(!urls.includes(`https://kanuby.com${ruta}`), ruta);
});

test("cada página del sitio está en el sitemap o lleva noindex", () => {
  const app = new URL("../app/", import.meta.url);
  for (const carpeta of readdirSync(app)) {
    const pagina = new URL(`${carpeta}/page.tsx`, app);
    if (carpeta.startsWith("[") || !existsSync(pagina)) continue;
    const codigo = readFileSync(pagina, "utf8");
    const noindex = /index: false|metadataCategoria/.test(codigo);
    assert.equal(urls.includes(`https://kanuby.com/${carpeta}/`), !noindex, carpeta);
  }
});

test("solo kanuby.com cuenta como el dominio público", () => {
  for (const host of ["kanuby.com", "Kanuby.com", "kanuby.com:443", "kanuby.com."]) assert.ok(esDominioPublico(host), host);
  for (const host of ["kanuby-website.vercel.app", "kanuby-website-git-main-scndal.vercel.app", "www.kanuby.com", "localhost:3000", "kanuby.com.evil.com", "", null, undefined])
    assert.ok(!esDominioPublico(host), String(host));
});

test("fuera de kanuby.com, robots.txt bloquea todo y las respuestas llevan noindex", () => {
  assert.deepEqual(reglasRobots("kanuby-website.vercel.app"), { rules: { userAgent: "*", disallow: "/" } });
  assert.equal(encabezadoNoIndex("kanuby-website.vercel.app"), "noindex, nofollow");
  assert.equal(encabezadoNoIndex(null), "noindex, nofollow");
});

test("en kanuby.com, robots.txt permite el rastreo y apunta al sitemap, sin noindex", () => {
  assert.deepEqual(reglasRobots("kanuby.com"), {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kanuby.com/sitemap.xml",
  });
  assert.equal(encabezadoNoIndex("kanuby.com"), null);
});
