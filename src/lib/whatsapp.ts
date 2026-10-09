/*
 * Formularios de cotización: validan, arman el mensaje y redirigen a
 * WhatsApp. No envían correo ni guardan datos (docs/replica-decisiones.md).
 */

export const NUMERO_WHATSAPP = "5218110287087";

/* Opciones del paso 1 del popup, en el orden en que se muestran */

export const TIPOS_MUDANZA = [
  "Mudanza local",
  "Mudanza de Monterrey a CDMX",
  "Mudanza empresarial",
] as const;

export type TipoMudanza = (typeof TIPOS_MUDANZA)[number];

const SERVICIO_EN_MENSAJE: Record<TipoMudanza, string> = {
  "Mudanza local": "una mudanza local",
  "Mudanza de Monterrey a CDMX": "una mudanza de Monterrey a CDMX",
  "Mudanza empresarial": "una mudanza empresarial",
};

export const TAMANOS_MINIBODEGA = ["3.5 m²", "7 m²", "14 m²", "No estoy seguro"] as const;

export type TamanoMinibodega = (typeof TAMANOS_MINIBODEGA)[number];

/** Datos del formulario. "tipo" es el servicio (mudanza) o el tamaño (minibodega). */
export type Cotizacion = {
  nombre: string;
  telefono: string;
  tipo: string;
};

export type ErroresCotizacion = Partial<Record<keyof Cotizacion, string>>;

export function esTipoMudanza(valor: string): valor is TipoMudanza {
  return (TIPOS_MUDANZA as readonly string[]).includes(valor);
}

export function esTamanoMinibodega(valor: string): valor is TamanoMinibodega {
  return (TAMANOS_MINIBODEGA as readonly string[]).includes(valor);
}

function validarContacto(datos: Cotizacion): ErroresCotizacion {
  const errores: ErroresCotizacion = {};
  if (!datos.nombre.trim()) errores.nombre = "Escribe tu nombre.";
  if (!datos.telefono.trim()) errores.telefono = "Escribe tu teléfono.";
  return errores;
}

export function validarCotizacionMudanza(datos: Cotizacion): ErroresCotizacion {
  const errores = validarContacto(datos);
  if (!esTipoMudanza(datos.tipo)) errores.tipo = "Elige el tipo de mudanza.";
  return errores;
}

export function validarCotizacionMinibodega(datos: Cotizacion): ErroresCotizacion {
  const errores = validarContacto(datos);
  if (!esTamanoMinibodega(datos.tipo)) errores.tipo = "Elige el espacio que buscas.";
  return errores;
}

export function mensajeMudanza(nombre: string, tipo: TipoMudanza): string {
  return `Hola Kanuby, soy ${nombre.trim()}. Me interesa cotizar ${SERVICIO_EN_MENSAJE[tipo]}.`;
}

export function mensajeMinibodega(nombre: string, tamano: TamanoMinibodega): string {
  const interes =
    tamano === "No estoy seguro"
      ? "rentar una minibodega, aún no sé qué tamaño necesito"
      : `rentar una minibodega de ${tamano}`;
  return `Hola Kanuby, soy ${nombre.trim()}. Me interesa ${interes}.`;
}

export function urlWhatsApp(mensaje: string): string {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}
