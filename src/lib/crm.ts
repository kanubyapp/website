import { PARAMETROS_CAMPANA } from "./campana.ts";
import type { AvisoCotizacion, Entorno, Envio, OrigenAviso } from "./correo.ts";

/*
 * Envío de los leads al CRM de SCNDAL Studio, además del correo de aviso
 * (src/app/api/cotizacion/route.ts). Solo los avisos que pasaron la
 * validación y no parecen bot. El CRM tiene una fuente por formulario y el
 * secreto es lo que dice de cuál viene: CRM_SECRET_COTIZACION para el popup
 * de cotización y CRM_SECRET_FLOTANTE para el del botón flotante. Las dos son
 * variables de Vercel que solo se leen en el servidor.
 *
 * Nunca lanza ni frena: si falta el secreto, el CRM responde con error o no
 * responde a tiempo, queda una línea "[crm] No se envió…" en los registros
 * de Vercel y el correo y la respuesta al navegador siguen igual.
 */

export const URL_CRM = "https://api.scndal.com/leads/kanuby";

/** Lo más que se espera al CRM antes de darlo por caído */
export const LIMITE_CRM_MS = 10_000;

/** Hasta dónde se guarda en el registro lo que respondió el CRM */
const LARGO_RESPUESTA = 1000;

export const SECRETO_CRM = {
  cotizacion: "CRM_SECRET_COTIZACION",
  flotante: "CRM_SECRET_FLOTANTE",
} as const;

/**
 * El lead como lo recibe el CRM: un JSON plano con nombre, telefono,
 * negocio, tipo y pagina, y los parámetros de campaña que haya, cada uno en
 * el primer nivel con su mismo nombre. Los valores van tal cual los produce
 * el sitio (negocio en minúsculas, tipo con su ²). Lo que esté vacío no va:
 * el tipo del botón flotante, por ejemplo.
 */
export function cuerpoCrm(aviso: AvisoCotizacion, origen: OrigenAviso): Record<string, string> {
  const campos: [string, string | undefined][] = [
    ["nombre", aviso.nombre],
    ["telefono", aviso.telefono],
    ["negocio", aviso.negocio],
    ["tipo", aviso.tipo],
    ["pagina", aviso.pagina],
    ...PARAMETROS_CAMPANA.map((parametro): [string, string | undefined] => [
      parametro,
      origen.campana?.[parametro],
    ]),
  ];
  return Object.fromEntries(campos.filter((campo): campo is [string, string] => Boolean(campo[1])));
}

/** Manda el lead al CRM. true si el CRM lo aceptó; nunca lanza. */
export async function enviarCrm(
  aviso: AvisoCotizacion,
  origen: OrigenAviso,
  {
    entorno = process.env,
    envio = fetch,
    registrar = console.error,
    informar = console.info,
    limiteMs = LIMITE_CRM_MS,
  }: {
    entorno?: Entorno;
    envio?: Envio;
    registrar?: (...datos: unknown[]) => void;
    informar?: (...datos: unknown[]) => void;
    limiteMs?: number;
  } = {},
): Promise<boolean> {
  const { formulario } = origen;
  const variable = SECRETO_CRM[formulario];
  const detalle = (extra: Record<string, unknown> = {}) =>
    JSON.stringify({ formulario, pagina: aviso.pagina, negocio: aviso.negocio, ...extra });

  const secreto = entorno[variable]?.trim();
  if (!secreto) {
    registrar(`[crm] No se envió el lead (${formulario}): falta ${variable}.`, detalle());
    return false;
  }

  try {
    const respuesta = await envio(URL_CRM, {
      method: "POST",
      headers: { Authorization: `Bearer ${secreto}`, "Content-Type": "application/json" },
      body: JSON.stringify(cuerpoCrm(aviso, origen)),
      signal: AbortSignal.timeout(limiteMs),
    });
    if (!respuesta.ok) {
      const cuerpo = await respuesta.text().catch(() => "");
      registrar(
        `[crm] No se envió el lead (${formulario}): el CRM respondió ${respuesta.status}.`,
        detalle({ estado: respuesta.status, respuesta: cuerpo.slice(0, LARGO_RESPUESTA) }),
      );
      return false;
    }
    informar(`[crm] Lead enviado (${formulario}).`, detalle({ estado: respuesta.status }));
    return true;
  } catch (error) {
    const sinRespuesta = error instanceof Error && error.name === "TimeoutError";
    registrar(
      sinRespuesta
        ? `[crm] No se envió el lead (${formulario}): el CRM no respondió en ${limiteMs} ms.`
        : `[crm] No se envió el lead (${formulario}): no se pudo contactar al CRM.`,
      detalle({ error: error instanceof Error ? error.message : String(error) }),
    );
    return false;
  }
}
