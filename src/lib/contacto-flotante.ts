import { eventoCotizacion, type EventoConversion, type Negocio } from "./conversiones.ts";
import { mensajeServicio, urlWhatsApp, validarContacto } from "./whatsapp.ts";

/*
 * Popup chico del botón flotante: nombre y teléfono, sin tipo de mudanza ni
 * tamaño. El servicio sale de la página; en la home no se puede deducir y el
 * popup lo pregunta. Al enviar, mismo evento que el popup de cotización
 * (cotizacion_mudanza o cotizacion_minibodega) con la opción vacía.
 */

/** Servicio de cada página con botón flotante; null: el popup lo pregunta */
export const SERVICIO_FLOTANTE = {
  "/": null,
  "/mudanzas-monterrey/": "mudanza",
  "/minibodegas-monterrey/": "minibodega",
} as const satisfies Record<string, Negocio | null>;

export type PaginaFlotante = keyof typeof SERVICIO_FLOTANTE;

export type ContactoFlotante = {
  nombre: string;
  telefono: string;
  /** El elegido en el selector; solo cuenta donde la página no lo da */
  servicio: Negocio | null;
};

export type ErroresFlotante = Partial<Record<keyof ContactoFlotante, string>>;

export type ResultadoFlotante =
  | { valido: false; errores: ErroresFlotante }
  | { valido: true; negocio: Negocio; url: string; evento: EventoConversion };

function servicioDe(pagina: PaginaFlotante, datos: ContactoFlotante): Negocio | null {
  return SERVICIO_FLOTANTE[pagina] ?? datos.servicio;
}

/** Nombre y teléfono como el popup de cotización; el servicio, si falta */
export function validarFlotante(pagina: PaginaFlotante, datos: ContactoFlotante): ErroresFlotante {
  const errores: ErroresFlotante = validarContacto(datos);
  if (!servicioDe(pagina, datos)) errores.servicio = "Elige el servicio que buscas.";
  return errores;
}

export function envioFlotante(pagina: PaginaFlotante, datos: ContactoFlotante): ResultadoFlotante {
  const errores = validarFlotante(pagina, datos);
  const negocio = servicioDe(pagina, datos);
  if (Object.keys(errores).length > 0 || !negocio) return { valido: false, errores };
  return {
    valido: true,
    negocio,
    url: urlWhatsApp(mensajeServicio(negocio, datos.nombre)),
    evento: eventoCotizacion(negocio, pagina, ""),
  };
}
