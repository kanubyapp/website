import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { TELEFONO_INTERNACIONAL, TELEFONO_VISIBLE } from "./contacto.ts";
import { DIRECCION_VISIBLE, HORARIO_MINIBODEGAS, PERFIL_GOOGLE } from "./negocio.ts";
import { posts } from "./posts.ts";
import { FOTO_KANUBY, IDIOMA, jsonLdBase } from "./schema.ts";
import { preguntas as preguntasMudanzas } from "../app/mudanzas-monterrey/preguntas.ts";

type Nodo = Record<string, unknown>;
const grafo = (datos: ReturnType<typeof jsonLdBase>) => datos["@graph"] as Nodo[];
const nodo = (datos: ReturnType<typeof jsonLdBase>, tipo: string) =>
  grafo(datos).find((n) => n["@type"] === tipo);

test("la dirección es la que se publica en /minibodegas-monterrey/", () => {
  assert.equal(
    DIRECCION_VISIBLE,
    "CARR NACIONAL KM258 SN 5TA SN EMILIO, Los Rodríguez, 67300 Santiago, N.L.",
  );
});

test("el teléfono del JSON-LD sale de lib/contacto.ts", () => {
  assert.equal(TELEFONO_INTERNACIONAL, `+52 ${TELEFONO_VISIBLE}`);
  const base = jsonLdBase({ ruta: "/", nombre: "Kanuby" });
  assert.equal(nodo(base, "Organization")?.telephone, TELEFONO_INTERNACIONAL);
});

test("cada página de servicio emite su negocio local, con dirección, teléfono y ficha de Google", () => {
  for (const tipo of ["LocalBusiness", "MovingCompany", "SelfStorage"] as const) {
    const datos = jsonLdBase({
      ruta: "/x/",
      nombre: "X",
      negocio: { tipo, imagen: "/images/x.png" },
    });
    const negocio = nodo(datos, tipo)!;
    assert.ok(negocio, tipo);
    assert.equal(negocio.telephone, TELEFONO_INTERNACIONAL);
    assert.equal((negocio.address as Nodo).postalCode, "67300");
    assert.equal(negocio.hasMap, PERFIL_GOOGLE);
    assert.deepEqual(negocio.parentOrganization, { "@id": "https://kanuby.com/#organization" });
    // La página habla de ese negocio
    assert.deepEqual(nodo(datos, "WebPage")!.about, { "@id": negocio["@id"] });
  }
});

test("horario: minibodegas, el de acceso; mudanzas y el general, el de atención", () => {
  const horario = (tipo: "LocalBusiness" | "MovingCompany" | "SelfStorage") =>
    nodo(jsonLdBase({ ruta: "/m/", nombre: "M", negocio: { tipo, imagen: "/i.png" } }), tipo)!
      .openingHoursSpecification;
  assert.deepEqual(horario("SelfStorage"), [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:30",
      closes: "13:00",
    },
  ]);
  assert.equal(HORARIO_MINIBODEGAS[0].texto, "Lunes a Viernes: 9:00 AM – 7:00 PM");
  // Sin sábado hasta que Kanuby lo confirme
  const atencion = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ];
  assert.deepEqual(horario("MovingCompany"), atencion);
  assert.deepEqual(horario("LocalBusiness"), atencion);
});

test("el horario de atención es el que publica la pregunta de mudanzas", () => {
  const respuesta = preguntasMudanzas
    .find((p) => p.pregunta === "¿Qué días hacen mudanzas?")!
    .respuesta.join(" ");
  assert.match(respuesta, /de lunes a viernes, de 9:00 a 18:00/);
});

test("todo artículo lleva imagen: la suya o la foto general de Kanuby", () => {
  assert.equal(FOTO_KANUBY, "/images/pr3.jpg");
  assert.ok(existsSync(`public${FOTO_KANUBY}`));
  assert.equal(posts.filter((post) => !post.imagen).length, 2);
});

test("sin precios en ningún negocio", () => {
  for (const tipo of ["LocalBusiness", "MovingCompany", "SelfStorage"] as const) {
    const texto = JSON.stringify(
      jsonLdBase({ ruta: "/x/", nombre: "X", negocio: { tipo, imagen: "/i.png" } }),
    );
    assert.doesNotMatch(texto, /price|offers|\$/i, tipo);
  }
});

test("migas: Inicio, las intermedias y la página, en orden y con su enlace", () => {
  const datos = jsonLdBase({
    ruta: "/un-post/",
    nombre: "Un post - Kanuby",
    migas: [{ nombre: "Blog", ruta: "/blog/" }],
    nombreMiga: "Un post",
  });
  assert.deepEqual(nodo(datos, "BreadcrumbList")!.itemListElement, [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://kanuby.com/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://kanuby.com/blog/" },
    { "@type": "ListItem", position: 3, name: "Un post" },
  ]);
  assert.deepEqual(nodo(datos, "WebPage")!.breadcrumb, {
    "@id": "https://kanuby.com/un-post/#breadcrumb",
  });
  // Sin migas, ni BreadcrumbList ni breadcrumb
  const sin = jsonLdBase({ ruta: "/x/", nombre: "X" });
  assert.equal(nodo(sin, "BreadcrumbList"), undefined);
  assert.equal(nodo(sin, "WebPage")!.breadcrumb, undefined);
});

test("el idioma es el del <html>: es-MX", () => {
  assert.equal(IDIOMA, "es-MX");
  for (const n of grafo(jsonLdBase({ ruta: "/", nombre: "K" }))) {
    if ("inLanguage" in n) assert.equal(n.inLanguage, "es-MX");
  }
});

test("la última modificación de un post nunca es anterior a su publicación", () => {
  for (const post of posts) {
    assert.ok(Date.parse(post.modificado) >= Date.parse(post.fecha), post.slug);
  }
});
