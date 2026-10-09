import { eventoCotizacion, type EventoConversion, type Negocio } from "./conversiones.ts";
import {
  mensajeMinibodega,
  mensajeMudanza,
  urlWhatsApp,
  validarCotizacionMinibodega,
  validarCotizacionMudanza,
  type Cotizacion,
  type ErroresCotizacion,
  type TamanoMinibodega,
  type TipoMudanza,
} from "./whatsapp.ts";

/*
 * Envío del popup de cotización: si los datos no pasan la validación,
 * devuelve los errores y nada más (ni evento ni URL). Si pasan, devuelve la
 * URL de WhatsApp y el evento de conversión que se registra antes de
 * redirigir.
 */

export type ResultadoEnvio =
  | { valido: false; errores: ErroresCotizacion }
  | { valido: true; url: string; evento: EventoConversion };

export function envioCotizacion(
  negocio: Negocio,
  datos: Cotizacion,
  pagina: string,
): ResultadoEnvio {
  const errores =
    negocio === "mudanza" ? validarCotizacionMudanza(datos) : validarCotizacionMinibodega(datos);
  if (Object.keys(errores).length > 0) return { valido: false, errores };

  const mensaje =
    negocio === "mudanza"
      ? mensajeMudanza(datos.nombre, datos.tipo as TipoMudanza)
      : mensajeMinibodega(datos.nombre, datos.tipo as TamanoMinibodega);

  return {
    valido: true,
    url: urlWhatsApp(mensaje),
    evento: eventoCotizacion(negocio, pagina, datos.tipo),
  };
}
