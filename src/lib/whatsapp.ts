/*
 * Formularios de cotización: validan, arman el mensaje y redirigen a
 * WhatsApp. No envían correo ni guardan datos (docs/replica-decisiones.md).
 */

export const NUMERO_WHATSAPP = "5218110287087";

export const TIPOS_MUDANZA = [
  "Mudanza Local",
  "Mudanza Nacional",
  "Flete o Movimiento pequeño",
] as const;

export type TipoMudanza = (typeof TIPOS_MUDANZA)[number];

const SERVICIO_EN_MENSAJE: Record<TipoMudanza, string> = {
  "Mudanza Local": "una mudanza local",
  "Mudanza Nacional": "una mudanza nacional",
  "Flete o Movimiento pequeño": "un flete",
};

export const TAMANOS_MINIBODEGA = ["3.5m²", "7m²", "14m²", "No estoy Seguro"] as const;

export type TamanoMinibodega = (typeof TAMANOS_MINIBODEGA)[number];

const TAMANO_EN_MENSAJE: Record<Exclude<TamanoMinibodega, "No estoy Seguro">, string> = {
  "3.5m²": "3.5 m²",
  "7m²": "7 m²",
  "14m²": "14 m²",
};

/** Datos del formulario. "tipo" es el servicio (mudanza) o el tamaño (minibodega). */
export type Cotizacion = {
  nombre: string;
  correo: string;
  telefono: string;
  tipo: string;
};

export type ErroresCotizacion = Partial<Record<keyof Cotizacion, string>>;

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function esTipoMudanza(valor: string): valor is TipoMudanza {
  return (TIPOS_MUDANZA as readonly string[]).includes(valor);
}

export function esTamanoMinibodega(valor: string): valor is TamanoMinibodega {
  return (TAMANOS_MINIBODEGA as readonly string[]).includes(valor);
}

function validarContacto(datos: Cotizacion): ErroresCotizacion {
  const errores: ErroresCotizacion = {};
  if (!datos.nombre.trim()) errores.nombre = "Escribe tu nombre.";
  if (!datos.correo.trim()) errores.correo = "Escribe tu correo.";
  else if (!CORREO_VALIDO.test(datos.correo.trim()))
    errores.correo = "Escribe un correo válido, por ejemplo nombre@correo.com.";
  if (!datos.telefono.trim()) errores.telefono = "Escribe tu teléfono.";
  return errores;
}

export function validarCotizacionMudanza(datos: Cotizacion): ErroresCotizacion {
  const errores = validarContacto(datos);
  if (!esTipoMudanza(datos.tipo)) errores.tipo = "Elige el tipo de servicio.";
  return errores;
}

export function validarCotizacionMinibodega(datos: Cotizacion): ErroresCotizacion {
  const errores = validarContacto(datos);
  if (!esTamanoMinibodega(datos.tipo)) errores.tipo = "Elige el espacio que buscas.";
  return errores;
}

export function mensajeMudanza(nombre: string, tipo: TipoMudanza, correo: string): string {
  return `Hola Kanuby, soy ${nombre.trim()}. Me interesa cotizar ${SERVICIO_EN_MENSAJE[tipo]}. Mi correo es ${correo.trim()}.`;
}

export function mensajeMinibodega(
  nombre: string,
  tamano: TamanoMinibodega,
  correo: string,
): string {
  const interes =
    tamano === "No estoy Seguro"
      ? "rentar una minibodega, aún no sé qué tamaño necesito"
      : `rentar una minibodega de ${TAMANO_EN_MENSAJE[tamano]}`;
  return `Hola Kanuby, soy ${nombre.trim()}. Me interesa ${interes}. Mi correo es ${correo.trim()}.`;
}

export function urlWhatsApp(mensaje: string): string {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}
