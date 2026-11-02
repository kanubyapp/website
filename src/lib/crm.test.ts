import { test } from "node:test";
import assert from "node:assert/strict";
import type { AvisoCotizacion, Envio, OrigenAviso } from "./correo.ts";
import { cuerpoCrm, enviarCrm } from "./crm.ts";

const entorno = {
  CRM_SECRET_COTIZACION: "secreto-cotizacion",
  CRM_SECRET_FLOTANTE: "secreto-flotante",
};

const avisoPopup: AvisoCotizacion = {
  negocio: "minibodega",
  nombre: "Ana López",
  telefono: "81 1234 5678",
  tipo: "3.5 m²",
  pagina: "/minibodegas-monterrey/",
};

const avisoFlotante: AvisoCotizacion = {
  negocio: "mudanza",
  nombre: "Luis",
  telefono: "8110000000",
  tipo: "",
  pagina: "/",
};

const popup: OrigenAviso = { formulario: "cotizacion", campana: null };
const flotante: OrigenAviso = { formulario: "flotante", campana: null };

/** Un fetch falso que guarda lo que se le mandó */
function grabadora(
  respuesta: () => Promise<Response> = async () => new Response(null, { status: 201 }),
) {
  const llamadas: { url: string; opciones: RequestInit }[] = [];
  const envio: Envio = async (url, opciones) => {
    llamadas.push({ url, opciones });
    return respuesta();
  };
  return { llamadas, envio };
}

const cuerpoDe = (opciones: RequestInit) => JSON.parse(String(opciones.body));
const encabezados = (opciones: RequestInit) => opciones.headers as Record<string, string>;

test("el popup de cotización manda su lead a source=cotizacion con CRM_SECRET_COTIZACION", async () => {
  const { llamadas, envio } = grabadora();
  assert.equal(await enviarCrm(avisoPopup, popup, { entorno, envio, informar: () => {} }), true);
  assert.equal(llamadas.length, 1);
  const { url, opciones } = llamadas[0];
  assert.equal(url, "https://api.scndal.com/leads/kanuby?source=cotizacion");
  assert.equal(opciones.method, "POST");
  assert.deepEqual(encabezados(opciones), {
    Authorization: "Bearer secreto-cotizacion",
    "Content-Type": "application/json",
  });
  // Los valores tal cual: negocio en minúsculas y el tamaño con su ²
  assert.deepEqual(cuerpoDe(opciones), {
    nombre: "Ana López",
    telefono: "81 1234 5678",
    negocio: "minibodega",
    tipo: "3.5 m²",
    pagina: "/minibodegas-monterrey/",
  });
});

test("el botón flotante manda su lead a source=flotante con CRM_SECRET_FLOTANTE y sin tipo", async () => {
  const { llamadas, envio } = grabadora();
  assert.equal(
    await enviarCrm(avisoFlotante, flotante, { entorno, envio, informar: () => {} }),
    true,
  );
  const { url, opciones } = llamadas[0];
  assert.equal(url, "https://api.scndal.com/leads/kanuby?source=flotante");
  assert.equal(encabezados(opciones).Authorization, "Bearer secreto-flotante");
  assert.deepEqual(cuerpoDe(opciones), {
    nombre: "Luis",
    telefono: "8110000000",
    negocio: "mudanza",
    pagina: "/",
  });
});

test("la fuente y el secreto viajan siempre del mismo par, nunca cruzados", async () => {
  const pares = { cotizacion: "secreto-cotizacion", flotante: "secreto-flotante" } as const;
  // Con los dos secretos, y con solo el del otro formulario cargado
  const entornos = [
    entorno,
    { CRM_SECRET_COTIZACION: "secreto-cotizacion" },
    { CRM_SECRET_FLOTANTE: "secreto-flotante" },
  ];
  for (const env of entornos)
    for (const [aviso, origen] of [
      [avisoPopup, popup],
      [avisoFlotante, flotante],
    ] as const) {
      const { llamadas, envio } = grabadora();
      await enviarCrm(aviso, origen, {
        entorno: env,
        envio,
        registrar: () => {},
        informar: () => {},
      });
      for (const { url, opciones } of llamadas) {
        const fuente = new URL(url).searchParams.get("source");
        assert.equal(fuente, origen.formulario);
        assert.equal(encabezados(opciones).Authorization, `Bearer ${pares[origen.formulario]}`);
      }
      // Sin su propio secreto no sale nada, aunque esté el del otro
      const propio =
        origen.formulario === "cotizacion" ? "CRM_SECRET_COTIZACION" : "CRM_SECRET_FLOTANTE";
      assert.equal(llamadas.length, propio in env ? 1 : 0);
    }
});

test("la campaña se aplana: cada parámetro en el primer nivel, sin el objeto campana", () => {
  const cuerpo = cuerpoCrm(avisoPopup, {
    formulario: "cotizacion",
    campana: {
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "minibodegas-mty",
      gclid: "Cj0KCQ",
    },
  });
  assert.deepEqual(cuerpo, {
    nombre: "Ana López",
    telefono: "81 1234 5678",
    negocio: "minibodega",
    tipo: "3.5 m²",
    pagina: "/minibodegas-monterrey/",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "minibodegas-mty",
    gclid: "Cj0KCQ",
  });
  assert.equal("campana" in cuerpo, false);
  // Las nueve, con su nombre exacto
  const todas = cuerpoCrm(avisoPopup, {
    formulario: "cotizacion",
    campana: {
      utm_source: "a",
      utm_medium: "b",
      utm_campaign: "c",
      utm_term: "d",
      utm_content: "e",
      gclid: "f",
      gbraid: "g",
      wbraid: "h",
      fbclid: "i",
    },
  });
  assert.deepEqual(Object.keys(todas), [
    "nombre",
    "telefono",
    "negocio",
    "tipo",
    "pagina",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "gbraid",
    "wbraid",
    "fbclid",
  ]);
  // Todos los valores son texto: un JSON plano, sin nada anidado
  assert.ok(Object.values(todas).every((valor) => typeof valor === "string"));
});

test("no viajan las llaves vacías ni las de control (sitio, ms, formulario)", () => {
  const aviso = {
    ...avisoFlotante,
    sitio: "",
    ms: 4000,
    formulario: "flotante",
  } as AvisoCotizacion;
  const cuerpo = cuerpoCrm(aviso, { formulario: "flotante", campana: { utm_source: "" } });
  assert.deepEqual(Object.keys(cuerpo), ["nombre", "telefono", "negocio", "pagina"]);
  for (const llave of ["sitio", "ms", "formulario", "tipo", "utm_source", "campana"])
    assert.equal(llave in cuerpo, false, llave);
});

test("si falta el secreto del formulario no se manda nada y queda en el registro", async () => {
  const registros: unknown[][] = [];
  const { llamadas, envio } = grabadora();
  const registrar = (...datos: unknown[]) => registros.push(datos);
  // Está el del otro formulario, pero no el de este
  assert.equal(
    await enviarCrm(avisoFlotante, flotante, {
      entorno: { CRM_SECRET_COTIZACION: "secreto-cotizacion", CRM_SECRET_FLOTANTE: " " },
      envio,
      registrar,
    }),
    false,
  );
  assert.equal(
    await enviarCrm(avisoPopup, popup, { entorno: { CRM_SECRET_FLOTANTE: "x" }, envio, registrar }),
    false,
  );
  assert.equal(llamadas.length, 0);
  assert.match(
    String(registros[0][0]),
    /^\[crm\] No se envió el lead \(flotante\): falta CRM_SECRET_FLOTANTE\.$/,
  );
  assert.match(String(registros[1][0]), /falta CRM_SECRET_COTIZACION\./);
});

test("si el CRM responde con error, no se puede contactar o no responde, se registra y no lanza", async () => {
  const registros: unknown[][] = [];
  const registrar = (...datos: unknown[]) => registros.push(datos);
  const conError = grabadora(async () => new Response("secreto inválido", { status: 401 }));
  assert.equal(
    await enviarCrm(avisoPopup, popup, { entorno, registrar, envio: conError.envio }),
    false,
  );
  assert.equal(
    await enviarCrm(avisoPopup, popup, {
      entorno,
      registrar,
      envio: async () => {
        throw new TypeError("fetch failed");
      },
    }),
    false,
  );
  // Un CRM que nunca contesta: se corta en el límite
  const colgado: Envio = (_url, opciones) =>
    new Promise((_listo, falla) =>
      opciones.signal?.addEventListener("abort", () => falla(opciones.signal?.reason)),
    );
  assert.equal(
    await enviarCrm(avisoPopup, popup, { entorno, registrar, envio: colgado, limiteMs: 20 }),
    false,
  );

  assert.equal(registros.length, 3);
  assert.match(String(registros[0][0]), /el CRM respondió 401\./);
  assert.match(String(registros[0][1]), /secreto inválido/);
  assert.match(String(registros[1][0]), /no se pudo contactar al CRM\./);
  assert.match(String(registros[2][0]), /el CRM no respondió en 20 ms\./);
  // El registro no lleva el secreto ni los datos personales del lead
  for (const [mensaje, detalle] of registros) {
    assert.doesNotMatch(`${mensaje} ${detalle}`, /secreto-cotizacion|Ana López|1234 5678/);
  }
});
