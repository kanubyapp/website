import { test } from "node:test";
import assert from "node:assert/strict";
import { atenderAviso, type Tareas } from "./atender-aviso.ts";
import { correoCotizacion, enviarCorreo, type Envio } from "./correo.ts";
import { enviarCrm, URL_CRM } from "./crm.ts";

const popup = {
  negocio: "mudanza",
  nombre: "Ana López",
  telefono: "81 1234 5678",
  tipo: "Mudanza local",
  pagina: "/mudanzas-monterrey/",
  sitio: "",
  ms: 4000,
  campana: { utm_source: "google", gclid: "Cj0KCQ" },
};

const flotante = {
  negocio: "minibodega",
  nombre: "Luis",
  telefono: "8110000000",
  tipo: "",
  pagina: "/",
  sitio: "",
  ms: 4000,
  formulario: "flotante",
};

const entorno = {
  RESEND_API_KEY: "re_prueba",
  EMAIL_TO: "ventas@kanuby.com",
  EMAIL_CC: "direccion@kanuby.com",
  CRM_SECRET_COTIZACION: "secreto-cotizacion",
  CRM_SECRET_FLOTANTE: "secreto-flotante",
};

const callado = () => {};

/** Las tareas que el endpoint deja para después de responder, para correrlas a mano */
function despuesDeResponder() {
  const tareas: (() => Promise<unknown>)[] = [];
  return {
    despues: (tarea: () => Promise<unknown>) => void tareas.push(tarea),
    correr: () => Promise.allSettled(tareas.map((tarea) => tarea())),
    tareas,
  };
}

/** Correo y CRM reales, con un fetch falso que separa Resend del CRM */
function conRed(crm: (opciones: RequestInit) => Promise<Response>) {
  const resend: RequestInit[] = [];
  const alCrm: RequestInit[] = [];
  const envio: Envio = async (url, opciones) => {
    if (url === URL_CRM) {
      alCrm.push(opciones);
      return crm(opciones);
    }
    resend.push(opciones);
    return new Response(JSON.stringify({ id: "re_1" }), { status: 200 });
  };
  const tareas: Omit<Tareas, "despues"> = {
    correo: (aviso, origen, recibido) =>
      enviarCorreo("cotizacion", correoCotizacion(aviso, recibido, origen), {
        entorno,
        envio,
        registrar: callado,
        informar: callado,
        pagina: aviso.pagina,
      }),
    crm: (aviso, origen) =>
      enviarCrm(aviso, origen, { entorno, envio, registrar: callado, informar: callado }),
    registrar: callado,
  };
  return { resend, alCrm, tareas };
}

test("un envío válido responde 202 y deja programados el correo y el CRM", async () => {
  for (const cuerpo of [popup, flotante]) {
    const red = conRed(async () => new Response(null, { status: 201 }));
    const { despues, correr } = despuesDeResponder();
    assert.equal(atenderAviso(cuerpo, { despues, ...red.tareas }), 202);
    // Nada sale antes de responder
    assert.equal(red.resend.length + red.alCrm.length, 0);
    await correr();
    assert.equal(red.resend.length, 1);
    assert.equal(red.alCrm.length, 1);
  }
});

test("cada formulario llega al CRM con su secreto y su cuerpo plano", async () => {
  const red = conRed(async () => new Response(null, { status: 201 }));
  const { despues, correr } = despuesDeResponder();
  atenderAviso(popup, { despues, ...red.tareas });
  atenderAviso(flotante, { despues, ...red.tareas });
  await correr();
  const [delPopup, delFlotante] = red.alCrm;
  assert.equal(
    (delPopup.headers as Record<string, string>).Authorization,
    "Bearer secreto-cotizacion",
  );
  assert.deepEqual(JSON.parse(String(delPopup.body)), {
    nombre: "Ana López",
    telefono: "81 1234 5678",
    negocio: "mudanza",
    tipo: "Mudanza local",
    pagina: "/mudanzas-monterrey/",
    utm_source: "google",
    gclid: "Cj0KCQ",
  });
  assert.equal(
    (delFlotante.headers as Record<string, string>).Authorization,
    "Bearer secreto-flotante",
  );
  assert.deepEqual(JSON.parse(String(delFlotante.body)), {
    nombre: "Luis",
    telefono: "8110000000",
    negocio: "minibodega",
    pagina: "/",
  });
});

test("un envío que parece bot responde 202 pero no llega ni al correo ni al CRM", async () => {
  for (const bot of [
    { ...popup, sitio: "https://spam.com" },
    { ...flotante, ms: 200 },
  ]) {
    const red = conRed(async () => new Response(null, { status: 201 }));
    const { despues, correr, tareas } = despuesDeResponder();
    assert.equal(atenderAviso(bot, { despues, ...red.tareas }), 202);
    await correr();
    assert.equal(tareas.length, 0);
    assert.equal(red.alCrm.length, 0);
    assert.equal(red.resend.length, 0);
  }
});

test("un envío que no valida responde 400 y no sale nada", async () => {
  const red = conRed(async () => new Response(null, { status: 201 }));
  const { despues, correr, tareas } = despuesDeResponder();
  assert.equal(atenderAviso({ ...popup, negocio: "kanubypack" }, { despues, ...red.tareas }), 400);
  assert.equal(atenderAviso({ ...popup, telefono: " " }, { despues, ...red.tareas }), 400);
  assert.equal(atenderAviso(null, { despues, ...red.tareas }), 400);
  await correr();
  assert.equal(tareas.length, 0);
  assert.equal(red.alCrm.length + red.resend.length, 0);
});

test("si el CRM falla, la respuesta y el correo salen igual que sin CRM", async () => {
  const ahora = () => new Date("2026-11-02T18:30:00Z");
  // El correo de referencia: el mismo aviso con un CRM que funciona
  const bien = conRed(async () => new Response(null, { status: 201 }));
  const referencia = despuesDeResponder();
  atenderAviso(popup, { despues: referencia.despues, ...bien.tareas, ahora });
  await referencia.correr();

  const fallas: (() => Promise<Response>)[] = [
    async () => new Response("caído", { status: 503 }),
    async () => {
      throw new TypeError("fetch failed");
    },
  ];
  for (const falla of fallas) {
    const mal = conRed(falla);
    const { despues, correr } = despuesDeResponder();
    assert.equal(atenderAviso(popup, { despues, ...mal.tareas, ahora }), 202);
    const resultados = await correr();
    assert.ok(resultados.every((resultado) => resultado.status === "fulfilled"));
    assert.equal(mal.alCrm.length, 1);
    // El mismo correo, idéntico: destinatarios, asunto, HTML y texto
    assert.equal(mal.resend.length, 1);
    assert.deepEqual(
      JSON.parse(String(mal.resend[0].body)),
      JSON.parse(String(bien.resend[0].body)),
    );
  }
});

test("aunque la tarea del CRM lance, la del correo corre por su lado", async () => {
  let correos = 0;
  const { despues, correr } = despuesDeResponder();
  const estado = atenderAviso(flotante, {
    despues,
    correo: async () => {
      correos++;
    },
    crm: async () => {
      throw new Error("inesperado");
    },
    registrar: callado,
  });
  assert.equal(estado, 202);
  const [correo, crm] = await correr();
  assert.equal(correo.status, "fulfilled");
  assert.equal(crm.status, "rejected");
  assert.equal(correos, 1);
});

test("el correo lleva la hora en que llegó el aviso, no la de cuando se manda", async () => {
  let recibido: Date | null = null;
  let reloj = new Date("2026-11-02T18:30:00Z");
  const { despues, correr } = despuesDeResponder();
  atenderAviso(popup, {
    despues,
    ahora: () => reloj,
    correo: async (_aviso, _origen, fecha) => {
      recibido = fecha;
    },
    crm: async () => {},
  });
  reloj = new Date("2026-11-02T18:31:00Z");
  await correr();
  assert.deepEqual(recibido, new Date("2026-11-02T18:30:00Z"));
});
