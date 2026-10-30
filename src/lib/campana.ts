/*
 * Datos de campaña con los que llegó la persona: los UTM y los
 * identificadores de clic de Google Ads (gclid, gbraid, wbraid) y de Meta
 * (fbclid). Vienen en la dirección con la que entra al sitio y se pierden al
 * navegar, así que se guardan en cuanto llega (components/captura-campana.tsx)
 * y se conservan mientras dure la visita (sessionStorage de la pestaña). Los
 * popups los mandan con el aviso por correo; el servidor los vuelve a
 * limpiar, porque llegan del navegador.
 */

export const PARAMETROS_CAMPANA = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;

export type ParametroCampana = (typeof PARAMETROS_CAMPANA)[number];

export type Campana = Partial<Record<ParametroCampana, string>>;

/** Lo más largo que se acepta de cada valor (un gclid o un fbclid caben de sobra) */
export const LARGO_MAXIMO = 300;

/**
 * Solo los parámetros conocidos, como texto, sin espacios sobrantes, no
 * vacíos y recortados al largo máximo. Sin ninguno: null.
 */
export function limpiarCampana(valor: unknown): Campana | null {
  if (!valor || typeof valor !== "object") return null;
  const datos = valor as Record<string, unknown>;
  const campana: Campana = {};
  for (const parametro of PARAMETROS_CAMPANA) {
    const texto = datos[parametro];
    if (typeof texto !== "string") continue;
    const limpio = texto.trim().slice(0, LARGO_MAXIMO);
    if (limpio) campana[parametro] = limpio;
  }
  return Object.keys(campana).length > 0 ? campana : null;
}

/** Los parámetros de campaña de una dirección ("?utm_source=…"), o null */
export function campanaDeUrl(busqueda: string): Campana | null {
  const parametros = new URLSearchParams(busqueda);
  return limpiarCampana(Object.fromEntries(parametros.entries()));
}

/* Guardado durante la visita */

const CLAVE = "kanuby-campana";

type Almacen = Pick<Storage, "getItem" | "setItem">;

/* El almacén llega como función: con el almacenamiento bloqueado, leerlo ya lanza */
const sesion = () => window.sessionStorage;

/**
 * Al llegar a una página: si su dirección trae datos de campaña, se guardan
 * (reemplazan a los anteriores: cuenta el último anuncio que la trajo). Si no
 * trae, se conserva lo que ya había.
 */
export function capturarCampana(busqueda: string, almacen: () => Almacen = sesion): void {
  const campana = campanaDeUrl(busqueda);
  if (!campana) return;
  try {
    almacen().setItem(CLAVE, JSON.stringify(campana));
  } catch {
    // Sin almacenamiento disponible: el aviso sale sin datos de campaña.
  }
}

/** Los datos de campaña de la visita, o null si no llegó con ninguno */
export function campanaGuardada(almacen: () => Almacen = sesion): Campana | null {
  try {
    const texto = almacen().getItem(CLAVE);
    return texto ? limpiarCampana(JSON.parse(texto)) : null;
  } catch {
    return null;
  }
}
