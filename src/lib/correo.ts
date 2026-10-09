import type { Negocio } from "./conversiones.ts";
import {
  validarCotizacionMinibodega,
  validarCotizacionMudanza,
  type Cotizacion,
} from "./whatsapp.ts";

/*
 * Correos de aviso de los formularios, enviados con Resend desde el servidor
 * (src/app/api/cotizacion/route.ts). Aquí va todo lo que no depende de la
 * red: destinatarios por tipo, validación del aviso, protección contra bots y
 * armado del correo. Las variables (RESEND_API_KEY, EMAIL_FROM, EMAIL_TO,
 * EMAIL_CC) solo se leen en el servidor: la llave nunca llega al navegador.
 */

/** Tipos de formulario. Proveedores y contacto todavía no tienen formulario. */
export type TipoFormulario = "cotizacion" | "proveedores" | "contacto";

export type Entorno = Record<string, string | undefined>;

export type Correo = { asunto: string; html: string; texto: string };

export type ConfigCorreo = { llave: string; remitente: string; to: string[]; cc: string[] };

/** "a@x.com, b@x.com" → ["a@x.com", "b@x.com"] */
export function listaCorreos(valor: string | undefined): string[] {
  return (valor ?? "")
    .split(",")
    .map((correo) => correo.trim())
    .filter(Boolean);
}

/** Cotizaciones a TO y CC; proveedores y contacto general solo a TO. */
export function destinatarios(tipo: TipoFormulario, entorno: Entorno) {
  return {
    to: listaCorreos(entorno.EMAIL_TO),
    cc: tipo === "cotizacion" ? listaCorreos(entorno.EMAIL_CC) : [],
  };
}

/** La configuración completa para un tipo, o las variables que faltan. */
export function configCorreo(
  tipo: TipoFormulario,
  entorno: Entorno,
): { config: ConfigCorreo } | { faltan: string[] } {
  const { to, cc } = destinatarios(tipo, entorno);
  const faltan = [
    !entorno.RESEND_API_KEY?.trim() && "RESEND_API_KEY",
    !entorno.EMAIL_FROM?.trim() && "EMAIL_FROM",
    to.length === 0 && "EMAIL_TO",
  ].filter((nombre): nombre is string => Boolean(nombre));
  if (faltan.length > 0) return { faltan };
  return {
    config: {
      llave: entorno.RESEND_API_KEY!.trim(),
      remitente: entorno.EMAIL_FROM!.trim(),
      to,
      cc,
    },
  };
}

/* Aviso de cotización que manda el popup */

export type AvisoCotizacion = Cotizacion & { negocio: Negocio; pagina: string };

/** Lo que manda el navegador: el aviso más la trampa y el tiempo para bots. */
export type CuerpoAviso = AvisoCotizacion & { sitio: string; ms: number };

/*
 * Contra bots, sin pasos extra: el campo trampa "sitio" va oculto en el
 * formulario (una persona no lo ve ni lo llena) y el formulario no se puede
 * completar en menos de MINIMO_MS desde que se abre el popup.
 */
export const MINIMO_MS = 1500;

const LIMITES = { nombre: 100, telefono: 30, pagina: 200 };

export type ResultadoAviso =
  | { tipo: "valido"; aviso: AvisoCotizacion }
  | { tipo: "bot" }
  | { tipo: "invalido"; motivo: string };

/** Valida en el servidor lo que llega: las mismas reglas del popup y límites. */
export function validarAviso(cuerpo: unknown): ResultadoAviso {
  if (!cuerpo || typeof cuerpo !== "object") return { tipo: "invalido", motivo: "sin datos" };
  const datos = cuerpo as Record<string, unknown>;
  const texto = (campo: string) => (typeof datos[campo] === "string" ? (datos[campo] as string) : "");

  if (texto("sitio").trim() !== "") return { tipo: "bot" };
  if (typeof datos.ms !== "number" || !Number.isFinite(datos.ms) || datos.ms < MINIMO_MS)
    return { tipo: "bot" };

  const negocio = datos.negocio;
  if (negocio !== "mudanza" && negocio !== "minibodega")
    return { tipo: "invalido", motivo: "negocio" };

  const cotizacion: Cotizacion = {
    nombre: texto("nombre").trim(),
    telefono: texto("telefono").trim(),
    tipo: texto("tipo"),
  };
  const errores =
    negocio === "mudanza"
      ? validarCotizacionMudanza(cotizacion)
      : validarCotizacionMinibodega(cotizacion);
  const primero = Object.keys(errores)[0];
  if (primero) return { tipo: "invalido", motivo: primero };

  const pagina = texto("pagina");
  if (!pagina.startsWith("/") || pagina.length > LIMITES.pagina)
    return { tipo: "invalido", motivo: "pagina" };
  if (cotizacion.nombre.length > LIMITES.nombre) return { tipo: "invalido", motivo: "nombre" };
  if (cotizacion.telefono.length > LIMITES.telefono)
    return { tipo: "invalido", motivo: "telefono" };

  return { tipo: "valido", aviso: { ...cotizacion, negocio, pagina } };
}

/* Armado del correo de cotización */

const SERVICIO: Record<Negocio, string> = { mudanza: "Mudanza", minibodega: "Minibodega" };
const OPCION: Record<Negocio, string> = { mudanza: "Tipo de mudanza", minibodega: "Tamaño" };

const FECHA_MONTERREY = new Intl.DateTimeFormat("es-MX", {
  timeZone: "America/Monterrey",
  dateStyle: "long",
  timeStyle: "short",
});

function escapar(valor: string): string {
  return valor
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function correoCotizacion(aviso: AvisoCotizacion, fecha: Date): Correo {
  const servicio = SERVICIO[aviso.negocio];
  const filas: [string, string][] = [
    ["Nombre", aviso.nombre],
    ["Teléfono", aviso.telefono],
    ["Servicio", servicio],
    [OPCION[aviso.negocio], aviso.tipo],
    ["Página", aviso.pagina],
    ["Fecha", `${FECHA_MONTERREY.format(fecha)} (hora de Monterrey)`],
  ];

  const asunto = `Cotización de ${servicio.toLowerCase()}: ${aviso.nombre}`;
  const texto = [`Nueva cotización de ${servicio.toLowerCase()} desde kanuby.com`, "", ...filas.map(([etiqueta, valor]) => `${etiqueta}: ${valor}`)].join("\n");
  const enlaceTelefono = aviso.telefono.replace(/[^\d+]/g, "");

  // Una sola columna, tipografía del sistema y estilos en línea: es lo que
  // leen bien los clientes de correo, también en el celular.
  const html = `<!doctype html>
<html lang="es-MX">
<body style="margin:0;padding:24px 16px;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0f3446;">
<div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;">
<p style="margin:0 0 4px;font-size:13px;color:#5b6f7a;">Nueva cotización desde kanuby.com</p>
<h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;">${escapar(servicio)}: ${escapar(aviso.nombre)}</h1>
${filas
  .map(
    ([etiqueta, valor]) =>
      `<p style="margin:0 0 14px;font-size:16px;line-height:1.4;"><span style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:#5b6f7a;">${escapar(etiqueta)}</span>${
        etiqueta === "Teléfono" && enlaceTelefono
          ? `<a href="tel:${escapar(enlaceTelefono)}" style="color:#b23f14;">${escapar(valor)}</a>`
          : escapar(valor)
      }</p>`,
  )
  .join("\n")}
</div>
</body>
</html>`;

  return { asunto, html, texto };
}

/* Envío con la API de Resend */

export type Envio = (url: string, opciones: RequestInit) => Promise<Response>;

/**
 * Envía un correo de un tipo de formulario. Nunca lanza: si faltan variables
 * o Resend falla, lo registra en el servidor y devuelve false.
 */
export async function enviarCorreo(
  tipo: TipoFormulario,
  correo: Correo,
  {
    entorno = process.env,
    envio = fetch,
    registrar = console.error,
  }: { entorno?: Entorno; envio?: Envio; registrar?: (...datos: unknown[]) => void } = {},
): Promise<boolean> {
  const resultado = configCorreo(tipo, entorno);
  if ("faltan" in resultado) {
    registrar(`[correo] No se envió el aviso (${tipo}): faltan ${resultado.faltan.join(", ")}.`);
    return false;
  }
  const { llave, remitente, to, cc } = resultado.config;
  try {
    const respuesta = await envio("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${llave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: remitente,
        to,
        ...(cc.length > 0 && { cc }),
        subject: correo.asunto,
        html: correo.html,
        text: correo.texto,
      }),
    });
    if (!respuesta.ok) {
      registrar(`[correo] Resend respondió ${respuesta.status} (${tipo}):`, await respuesta.text());
      return false;
    }
    return true;
  } catch (error) {
    registrar(`[correo] No se pudo contactar a Resend (${tipo}):`, error);
    return false;
  }
}
