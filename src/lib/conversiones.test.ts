import { test } from "node:test";
import assert from "node:assert/strict";
import {
  eventoWhatsApp,
  LIMITE_ESPERA_MS,
  negocioDePost,
  negocioDePagina,
  registrarConversion,
} from "./conversiones.ts";
import { envioCotizacion } from "./envio-cotizacion.ts";
import { posts } from "./posts.ts";

const valida = { nombre: "Ana", telefono: "8112345678" };

/* Temporizador falso: guarda la función para dispararla a mano. */
function temporizador() {
  const pendientes: { funcion: () => void; ms: number }[] = [];
  return {
    pendientes,
    programar: (funcion: () => void, ms: number) => pendientes.push({ funcion, ms }),
  };
}

test("cotización de mudanza válida: evento cotizacion_mudanza con página y opción", () => {
  const resultado = envioCotizacion(
    "mudanza",
    { ...valida, tipo: "Mudanza de Monterrey a CDMX" },
    "/mudanzas-monterrey-cdmx/",
  );
  assert.equal(resultado.valido, true);
  assert.deepEqual(resultado.valido && resultado.evento, {
    event: "cotizacion_mudanza",
    pagina: "/mudanzas-monterrey-cdmx/",
    opcion: "Mudanza de Monterrey a CDMX",
  });
  assert.match(resultado.valido ? resultado.url : "", /^https:\/\/wa\.me\/5218110287087\?text=/);
});

test("cotización de minibodega válida: evento cotizacion_minibodega con página y opción", () => {
  const resultado = envioCotizacion(
    "minibodega",
    { ...valida, tipo: "No estoy seguro" },
    "/minibodegas-monterrey/",
  );
  assert.deepEqual(resultado.valido && resultado.evento, {
    event: "cotizacion_minibodega",
    pagina: "/minibodegas-monterrey/",
    opcion: "No estoy seguro",
  });
});

test("cotización que falla la validación: errores y ningún evento ni URL", () => {
  for (const [negocio, datos] of [
    ["mudanza", { nombre: "", telefono: "8112345678", tipo: "Mudanza local" }],
    ["mudanza", { nombre: "Ana", telefono: " ", tipo: "Mudanza local" }],
    ["mudanza", { nombre: "Ana", telefono: "8112345678", tipo: "" }],
    ["minibodega", { nombre: "", telefono: "", tipo: "7 m²" }],
    ["minibodega", { nombre: "Ana", telefono: "8112345678", tipo: "Mudanza local" }],
  ] as const) {
    const resultado = envioCotizacion(negocio, datos, "/mudanzas-monterrey/");
    assert.equal(resultado.valido, false);
    assert.ok(!("evento" in resultado) && !("url" in resultado));
  }
});

test("WhatsApp directo: whatsapp_mudanza y whatsapp_minibodega con la página", () => {
  assert.deepEqual(eventoWhatsApp("mudanza", "/mudanzas-empresariales-monterrey/"), {
    event: "whatsapp_mudanza",
    pagina: "/mudanzas-empresariales-monterrey/",
  });
  assert.deepEqual(eventoWhatsApp("minibodega", "/como-organizar-tu-minibodega-facilmente/"), {
    event: "whatsapp_minibodega",
    pagina: "/como-organizar-tu-minibodega-facilmente/",
  });
});

test("negocio de un post: sale de su categoría", () => {
  assert.equal(negocioDePost(["mudanzas"]), "mudanza");
  assert.equal(negocioDePost(["minibodegas"]), "minibodega");
});

test("negocio de un post sin categoría: mudanza", () => {
  assert.equal(negocioDePost(["sin-categoria"]), "mudanza");
});

test("negocio de un post con las dos categorías: minibodega", () => {
  assert.equal(negocioDePost(["minibodegas", "mudanzas"]), "minibodega");
  assert.equal(negocioDePost(["mudanzas", "minibodegas"]), "minibodega");
});

test("posts reales: los 9 sin categoría son mudanza, el de las dos es minibodega y ninguno queda sin evento", () => {
  const sinCategoria = posts.filter((post) => post.categorias.includes("sin-categoria"));
  assert.equal(sinCategoria.length, 9);
  for (const post of sinCategoria) assert.equal(negocioDePost(post.categorias), "mudanza", post.slug);

  const combinado = posts.find(
    (post) => post.slug === "mudanzas-y-minibodegas-la-combinacion-perfecta-si-aun-no-puedes-instalarte",
  );
  assert.equal(combinado && negocioDePost(combinado.categorias), "minibodega");

  for (const post of posts) assert.notEqual(negocioDePost(post.categorias), null, post.slug);
});

test("sin redirección, el evento se empuja tal cual al dataLayer", () => {
  const capa: Record<string, unknown>[] = [];
  registrarConversion(eventoWhatsApp("mudanza", "/x/"), { capa });
  assert.deepEqual(capa, [{ event: "whatsapp_mudanza", pagina: "/x/" }]);
});

test("con redirección, espera a que GTM confirme y continúa una sola vez", () => {
  const capa: Record<string, unknown>[] = [];
  const reloj = temporizador();
  let redirecciones = 0;
  registrarConversion(eventoWhatsApp("mudanza", "/x/"), {
    capa,
    programar: reloj.programar,
    alSalir: () => redirecciones++,
  });

  assert.equal(redirecciones, 0, "no redirige antes de que salga el evento");
  assert.equal(capa[0].event, "whatsapp_mudanza");
  assert.equal(capa[0].eventTimeout, LIMITE_ESPERA_MS);

  (capa[0].eventCallback as () => void)();
  assert.equal(redirecciones, 1);
  reloj.pendientes[0].funcion(); // el límite vence después: no repite
  assert.equal(redirecciones, 1);
});

test("si GTM no responde, redirige al vencer el límite corto", () => {
  const reloj = temporizador();
  let redirecciones = 0;
  registrarConversion(eventoWhatsApp("minibodega", "/x/"), {
    capa: [],
    programar: reloj.programar,
    alSalir: () => redirecciones++,
  });
  assert.equal(reloj.pendientes[0].ms, LIMITE_ESPERA_MS);
  assert.ok(LIMITE_ESPERA_MS <= 1000);
  reloj.pendientes[0].funcion();
  assert.equal(redirecciones, 1);
});

test("páginas sin negocio propio: /social/, /blog/ y las legales emiten whatsapp_minibodega, por el mensaje de minibodega", () => {
  assert.equal(negocioDePagina["/social/"], "minibodega");
  assert.equal(negocioDePagina["/blog/"], "minibodega");
  assert.equal(negocioDePagina["/aviso-de-privacidad/"], "minibodega");
  assert.equal(negocioDePagina["/terminos-y-condiciones/"], "minibodega");
  assert.deepEqual(eventoWhatsApp(negocioDePagina["/blog/"], "/blog/"), {
    event: "whatsapp_minibodega",
    pagina: "/blog/",
  });
});
