import type { CategoriaSlug } from "./posts.ts";
import type { TamanoMinibodega } from "./whatsapp.ts";

/*
 * Eventos de conversión para el dataLayer. El sitio solo los emite; GTM los
 * conecta después con Google Ads y Meta. Cuatro eventos, uno por tipo de
 * envío y negocio:
 *   cotizacion_mudanza / cotizacion_minibodega: el popup pasó la validación
 *     y va a redirigir a WhatsApp. Llevan la página y la opción del paso 1.
 *   whatsapp_mudanza / whatsapp_minibodega: clic en un enlace que abre
 *     WhatsApp directo, sin formulario. Llevan la página.
 * Y dos de la calculadora de espacio, independientes de los cuatro:
 *   calculadora_registro: la persona completó nombre y teléfono. Lleva la
 *     página; los datos personales no van al dataLayer.
 *   calculadora_solicitud: pidió su minibodega y va a redirigir a WhatsApp.
 *     Lleva la página y el tamaño recomendado, o "excede" si no cabe ni en
 *     la más grande.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type Negocio = "mudanza" | "minibodega";

export type EventoConversion =
  | { event: `cotizacion_${Negocio}`; pagina: string; opcion: string }
  | { event: `whatsapp_${Negocio}`; pagina: string }
  | { event: "calculadora_registro"; pagina: string }
  | { event: "calculadora_solicitud"; pagina: string; tamano: TamanoMinibodega | "excede" };

export function eventoCotizacion(negocio: Negocio, pagina: string, opcion: string): EventoConversion {
  return { event: `cotizacion_${negocio}`, pagina, opcion };
}

export function eventoWhatsApp(negocio: Negocio, pagina: string): EventoConversion {
  return { event: `whatsapp_${negocio}`, pagina };
}

export function eventoCalculadoraRegistro(pagina: string): EventoConversion {
  return { event: "calculadora_registro", pagina };
}

export function eventoCalculadoraSolicitud(
  pagina: string,
  tamano: TamanoMinibodega | "excede",
): EventoConversion {
  return { event: "calculadora_solicitud", pagina, tamano };
}

/**
 * Negocio de un post según su categoría, solo para el evento (la categoría
 * no cambia). Los posts sin categoría son de mudanza y el que tiene las dos
 * (mudanzas-y-minibodegas-la-combinacion-perfecta…) es de minibodega.
 */
export function negocioDePost(categorias: readonly CategoriaSlug[]): Negocio {
  if (categorias.includes("minibodegas")) return "minibodega";
  return "mudanza";
}

/**
 * Negocio de las páginas que no son de un servicio. Su WhatsApp directo lleva
 * el mensaje prellenado de minibodega, así que cuentan como minibodega.
 */
export const negocioDePagina: Record<
  "/social/" | "/blog/" | "/aviso-de-privacidad/" | "/terminos-y-condiciones/",
  Negocio
> = {
  "/social/": "minibodega",
  "/blog/": "minibodega",
  "/aviso-de-privacidad/": "minibodega",
  "/terminos-y-condiciones/": "minibodega",
};

/** Lo más que espera una redirección a que el evento salga. */
export const LIMITE_ESPERA_MS = 500;

/**
 * Empuja el evento al dataLayer. Con alSalir (redirecciones en la misma
 * pestaña), lo llama cuando GTM confirma que el evento salió (eventCallback)
 * o al vencer el límite, lo que pase primero, y una sola vez: sin GTM
 * cargado o si falla, el cliente nunca se queda esperando más del límite.
 */
export function registrarConversion(
  evento: EventoConversion,
  {
    alSalir,
    capa = (window.dataLayer ??= []),
    limiteMs = LIMITE_ESPERA_MS,
    programar = (funcion: () => void, ms: number) => setTimeout(funcion, ms),
  }: {
    alSalir?: () => void;
    capa?: Record<string, unknown>[];
    limiteMs?: number;
    programar?: (funcion: () => void, ms: number) => unknown;
  } = {},
) {
  if (!alSalir) {
    capa.push({ ...evento });
    return;
  }

  let salio = false;
  const continuar = () => {
    if (salio) return;
    salio = true;
    alSalir();
  };

  capa.push({ ...evento, eventCallback: continuar, eventTimeout: limiteMs });
  programar(continuar, limiteMs);
}
