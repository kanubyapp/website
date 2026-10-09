import { test } from "node:test";
import assert from "node:assert/strict";
import { envioCotizacion } from "./envio-cotizacion.ts";
import { tamanoDeSuperficie } from "./whatsapp.ts";
import { flujoCotizacion, flujoInicial, type AccionFlujo, type FlujoCotizacion } from "./flujo-cotizacion.ts";

const aplicar = (estado: FlujoCotizacion, ...acciones: AccionFlujo[]) =>
  acciones.reduce(flujoCotizacion, estado);

/* Popup de un servicio (páginas de mudanzas y minibodegas): sin paso previo */

test("el popup de un servicio empieza en el paso 1 sin elección", () => {
  assert.deepEqual(flujoInicial("mudanza"), {
    paso: "servicio",
    negocio: "mudanza",
    tipo: null,
    conPrevio: false,
  });
});

test("elegir una opción avanza al paso 2 con esa opción", () => {
  const estado = aplicar(flujoInicial("mudanza"), { tipo: "elegir", valor: "Mudanza local" });
  assert.equal(estado.paso, "datos");
  assert.equal(estado.tipo, "Mudanza local");
});

test("volver regresa al paso 1 y conserva la elección", () => {
  const estado = aplicar(flujoInicial("minibodega"), { tipo: "elegir", valor: "7 m²" }, { tipo: "volver" });
  assert.equal(estado.paso, "servicio");
  assert.equal(estado.tipo, "7 m²");
});

test("tras volver, elegir otra opción la reemplaza y avanza de nuevo", () => {
  const estado = aplicar(
    flujoInicial("mudanza"),
    { tipo: "elegir", valor: "Mudanza local" },
    { tipo: "volver" },
    { tipo: "elegir", valor: "Mudanza empresarial" },
  );
  assert.equal(estado.paso, "datos");
  assert.equal(estado.tipo, "Mudanza empresarial");
});

test("sin paso previo, volver desde el paso 1 no cambia nada", () => {
  const inicial = flujoInicial("mudanza");
  assert.deepEqual(flujoCotizacion(inicial, { tipo: "volver" }), inicial);
});

test("sin paso previo, elegir negocio no hace nada", () => {
  const inicial = flujoInicial("minibodega");
  assert.deepEqual(flujoCotizacion(inicial, { tipo: "elegirNegocio", valor: "mudanza" }), inicial);
});

test("reiniciar regresa al paso 1 de su servicio desde cualquier paso", () => {
  const estado = aplicar(flujoInicial("minibodega"), { tipo: "elegir", valor: "14 m²" }, { tipo: "reiniciar" });
  assert.deepEqual(estado, flujoInicial("minibodega"));
});

/* Popup general (botón flotante de la home): con el paso previo */

test("el popup general empieza en el paso previo sin servicio", () => {
  assert.deepEqual(flujoInicial(null), { paso: "negocio", negocio: null, tipo: null, conPrevio: true });
});

test("elegir Mudanza lleva al paso 1 del flujo de mudanza", () => {
  const estado = aplicar(flujoInicial(null), { tipo: "elegirNegocio", valor: "mudanza" });
  assert.equal(estado.paso, "servicio");
  assert.equal(estado.negocio, "mudanza");
});

test("elegir Minibodega lleva al paso 1 del flujo de minibodega", () => {
  const estado = aplicar(flujoInicial(null), { tipo: "elegirNegocio", valor: "minibodega" });
  assert.equal(estado.paso, "servicio");
  assert.equal(estado.negocio, "minibodega");
});

test("desde el paso 1 se regresa al paso previo; desde el paso 2, al paso 1", () => {
  const enDatos = aplicar(
    flujoInicial(null),
    { tipo: "elegirNegocio", valor: "mudanza" },
    { tipo: "elegir", valor: "Mudanza local" },
  );
  const enServicio = flujoCotizacion(enDatos, { tipo: "volver" });
  assert.equal(enServicio.paso, "servicio");
  assert.equal(flujoCotizacion(enServicio, { tipo: "volver" }).paso, "negocio");
});

test("cambiar de servicio en el paso previo descarta la opción del otro", () => {
  const estado = aplicar(
    flujoInicial(null),
    { tipo: "elegirNegocio", valor: "mudanza" },
    { tipo: "elegir", valor: "Mudanza local" },
    { tipo: "volver" },
    { tipo: "volver" },
    { tipo: "elegirNegocio", valor: "minibodega" },
  );
  assert.deepEqual(estado, { paso: "servicio", negocio: "minibodega", tipo: null, conPrevio: true });
});

test("volver al paso previo y elegir el mismo servicio conserva su opción", () => {
  const estado = aplicar(
    flujoInicial(null),
    { tipo: "elegirNegocio", valor: "minibodega" },
    { tipo: "elegir", valor: "3.5 m²" },
    { tipo: "volver" },
    { tipo: "volver" },
    { tipo: "elegirNegocio", valor: "minibodega" },
  );
  assert.equal(estado.tipo, "3.5 m²");
});

test("reiniciar el popup general regresa al paso previo", () => {
  const estado = aplicar(flujoInicial(null), { tipo: "elegirNegocio", valor: "mudanza" }, { tipo: "reiniciar" });
  assert.deepEqual(estado, flujoInicial(null));
});

/* El evento de conversión corresponde al servicio elegido en el paso previo */

test("en la home, elegir Mudanza y completar emite cotizacion_mudanza con la página /", () => {
  const estado = aplicar(
    flujoInicial(null),
    { tipo: "elegirNegocio", valor: "mudanza" },
    { tipo: "elegir", valor: "Mudanza de Monterrey a CDMX" },
  );
  const resultado = envioCotizacion(
    estado.negocio!,
    { nombre: "Ana", telefono: "8112345678", tipo: estado.tipo! },
    "/",
  );
  assert.deepEqual(resultado.valido && resultado.evento, {
    event: "cotizacion_mudanza",
    pagina: "/",
    opcion: "Mudanza de Monterrey a CDMX",
  });
});

test("en la home, elegir Minibodega y completar emite cotizacion_minibodega con la página /", () => {
  const estado = aplicar(
    flujoInicial(null),
    { tipo: "elegirNegocio", valor: "minibodega" },
    { tipo: "elegir", valor: "No estoy seguro" },
  );
  const resultado = envioCotizacion(
    estado.negocio!,
    { nombre: "Ana", telefono: "8112345678", tipo: estado.tipo! },
    "/",
  );
  assert.deepEqual(resultado.valido && resultado.evento, {
    event: "cotizacion_minibodega",
    pagina: "/",
    opcion: "No estoy seguro",
  });
});

/* Apertura con tamaño preseleccionado (tarjetas de tamaño de /minibodegas-monterrey/) */

test("abrir con un tamaño preseleccionado va directo al paso 2 con ese tamaño", () => {
  const estado = aplicar(flujoInicial("minibodega"), { tipo: "preseleccionar", valor: "7 m²" });
  assert.deepEqual(estado, { paso: "datos", negocio: "minibodega", tipo: "7 m²", conPrevio: false });
});

test("desde el tamaño preseleccionado se regresa al paso 1 con ese tamaño marcado, y se puede cambiar", () => {
  const enServicio = aplicar(
    flujoInicial("minibodega"),
    { tipo: "preseleccionar", valor: "14 m²" },
    { tipo: "volver" },
  );
  assert.equal(enServicio.paso, "servicio");
  assert.equal(enServicio.tipo, "14 m²");
  const cambiado = flujoCotizacion(enServicio, { tipo: "elegir", valor: "3.5 m²" });
  assert.equal(cambiado.paso, "datos");
  assert.equal(cambiado.tipo, "3.5 m²");
});

test("reabrir sin tamaño vuelve a empezar en el paso 1", () => {
  const estado = aplicar(
    flujoInicial("minibodega"),
    { tipo: "preseleccionar", valor: "7 m²" },
    { tipo: "reiniciar" },
  );
  assert.deepEqual(estado, flujoInicial("minibodega"));
});

test("en el popup general (sin servicio todavía) no se puede preseleccionar", () => {
  const inicial = flujoInicial(null);
  assert.deepEqual(flujoCotizacion(inicial, { tipo: "preseleccionar", valor: "7 m²" }), inicial);
});

test("con tamaño preseleccionado, el mensaje y el evento llevan ese tamaño", () => {
  for (const [superficie, tamano] of [["3.5", "3.5 m²"], ["7", "7 m²"], ["14", "14 m²"]] as const) {
    const opcion = tamanoDeSuperficie(superficie);
    assert.equal(opcion, tamano);
    const estado = aplicar(flujoInicial("minibodega"), { tipo: "preseleccionar", valor: opcion! });
    const resultado = envioCotizacion(
      "minibodega",
      { nombre: "Ana", telefono: "8112345678", tipo: estado.tipo! },
      "/minibodegas-monterrey/",
    );
    assert.ok(resultado.valido);
    assert.deepEqual(resultado.evento, {
      event: "cotizacion_minibodega",
      pagina: "/minibodegas-monterrey/",
      opcion: tamano,
    });
    assert.equal(
      new URL(resultado.url).searchParams.get("text"),
      `Hola Kanuby, soy Ana. Me interesa rentar una minibodega de ${tamano}.`,
    );
  }
});

test("una superficie que no es de las tres opciones no preselecciona nada", () => {
  assert.equal(tamanoDeSuperficie("10"), null);
});
