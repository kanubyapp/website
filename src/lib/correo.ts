import { limpiarCampana, type Campana, type ParametroCampana } from "./campana.ts";
import { REMITENTE_AVISOS } from "./contacto.ts";
import type { Negocio } from "./conversiones.ts";
import { SITIO } from "./schema.ts";
import {
  validarContacto,
  validarCotizacionMinibodega,
  validarCotizacionMudanza,
  type Cotizacion,
} from "./whatsapp.ts";

/*
 * Correos de aviso de los formularios, enviados con Resend desde el servidor
 * (src/app/api/cotizacion/route.ts). Aquí va todo lo que no depende de la
 * red: destinatarios por tipo, validación del aviso, protección contra bots,
 * origen del lead y armado del correo. El remitente está en lib/contacto.ts;
 * las variables (RESEND_API_KEY, EMAIL_TO, EMAIL_CC) solo se leen en el
 * servidor: la llave nunca llega al navegador.
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
    to.length === 0 && "EMAIL_TO",
  ].filter((nombre): nombre is string => Boolean(nombre));
  if (faltan.length > 0) return { faltan };
  return {
    config: { llave: entorno.RESEND_API_KEY!.trim(), remitente: REMITENTE_AVISOS, to, cc },
  };
}

/* Aviso de cotización que manda el popup */

export type AvisoCotizacion = Cotizacion & { negocio: Negocio; pagina: string };

/**
 * Lo que manda el navegador: el aviso más la trampa y el tiempo para bots.
 * formulario "flotante": el popup chico del botón flotante, que no pide tipo
 * de mudanza ni tamaño (tipo vacío). Sin él, es el popup de cotización.
 * campana: los parámetros con los que llegó la persona (lib/campana.ts).
 */
export type CuerpoAviso = AvisoCotizacion & {
  sitio: string;
  ms: number;
  formulario?: "flotante";
  campana?: Campana;
};

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
  // El del botón flotante no lleva tipo; el del popup de cotización, sí.
  const errores =
    datos.formulario === "flotante"
      ? {
          ...validarContacto(cotizacion),
          ...(cotizacion.tipo !== "" && { tipo: "sin tipo en el botón flotante" }),
        }
      : negocio === "mudanza"
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

/* Origen del lead: qué formulario y con qué campaña llegó */

export type Formulario = "cotizacion" | "flotante";

export type OrigenAviso = { formulario: Formulario; campana: Campana | null };

/**
 * El formulario y los datos de campaña de un aviso ya validado. La campaña
 * viene del navegador: solo pasan los parámetros conocidos, como texto y con
 * largo máximo. Si llega rara se descarta, sin rechazar el aviso.
 */
export function origenDelAviso(cuerpo: unknown): OrigenAviso {
  const datos = (cuerpo && typeof cuerpo === "object" ? cuerpo : {}) as Record<string, unknown>;
  return {
    formulario: datos.formulario === "flotante" ? "flotante" : "cotizacion",
    campana: limpiarCampana(datos.campana),
  };
}

/**
 * Número de WhatsApp del lead para wa.me. Diez dígitos son un número de
 * México: se les antepone el 52. Si ya trae la lada (52 o 521), queda igual.
 * Con menos de diez dígitos no hay enlace.
 */
export function whatsappDelTelefono(telefono: string): string | null {
  const digitos = telefono.replace(/\D/g, "");
  if (digitos.length < 10) return null;
  return digitos.length === 10 ? `52${digitos}` : digitos;
}

/* Armado del correo de cotización */

const SERVICIO: Record<Negocio, string> = { mudanza: "Mudanza", minibodega: "Minibodega" };
const OPCION: Record<Negocio, string> = { mudanza: "Tipo de mudanza", minibodega: "Tamaño" };
const FORMULARIO: Record<Formulario, string> = {
  cotizacion: "Popup de cotización",
  flotante: "Botón flotante",
};

const CAMPANA: Record<ParametroCampana, string> = {
  utm_source: "Fuente (utm_source)",
  utm_medium: "Medio (utm_medium)",
  utm_campaign: "Campaña (utm_campaign)",
  utm_term: "Término (utm_term)",
  utm_content: "Contenido (utm_content)",
  gclid: "Clic de Google Ads (gclid)",
  gbraid: "Clic de Google Ads (gbraid)",
  wbraid: "Clic de Google Ads (wbraid)",
  fbclid: "Clic de Meta (fbclid)",
};

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

/*
 * Colores del correo: los claros del sistema (los oscuros del sitio, muchos
 * clientes de correo los rompen o los invierten). Fondo gris claro, tarjeta
 * blanca, texto azul noche (--color-texto-oscuro), secundario
 * (--color-texto-oscuro-secundario), el naranja de marca solo como acento y
 * los enlaces en naranja oscuro, que sí cumple sobre blanco.
 */
const C = {
  fondo: "#f4f6f8",
  tarjeta: "#ffffff",
  texto: "#0f3446",
  secundario: "#4b5f6b",
  linea: "#e3e8eb",
  naranja: "#ec5b2a",
  enlace: "#b23f14",
};
const FUENTE = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";

/** Valor de una fila: texto escapado o HTML ya armado (enlaces) */
type Fila = { etiqueta: string; valor: string; html?: string };

export function correoCotizacion(
  aviso: AvisoCotizacion,
  fecha: Date,
  origen: OrigenAviso = { formulario: "cotizacion", campana: null },
): Correo {
  const servicio = SERVICIO[aviso.negocio];
  const formulario = FORMULARIO[origen.formulario];
  const enlaceTelefono = aviso.telefono.replace(/[^\d+]/g, "");
  const whatsapp = whatsappDelTelefono(aviso.telefono);
  const urlWhatsApp = whatsapp ? `https://wa.me/${whatsapp}` : null;
  const urlPagina = `${SITIO}${aviso.pagina}`;
  const enlace = (href: string, texto: string, negrita = false) =>
    `<a href="${escapar(href)}" style="color:${C.enlace};${negrita ? "font-weight:700;" : ""}">${escapar(texto)}</a>`;

  // En el HTML, el teléfono lleva debajo los enlaces para llamar y escribir
  const accionesTelefono = [
    enlaceTelefono && enlace(`tel:${enlaceTelefono}`, "Llamar"),
    urlWhatsApp && enlace(urlWhatsApp, "Escribir por WhatsApp"),
  ]
    .filter(Boolean)
    .join(` <span style="color:${C.secundario};">·</span> `);
  const telefono: Fila = {
    etiqueta: "Teléfono",
    valor: aviso.telefono,
    html: [
      enlaceTelefono ? enlace(`tel:${enlaceTelefono}`, aviso.telefono, true) : escapar(aviso.telefono),
      accionesTelefono,
    ]
      .filter(Boolean)
      .join("<br>"),
  };
  const nombre: Fila = { etiqueta: "Nombre", valor: aviso.nombre };
  const servicioYTipo: Fila[] = [
    { etiqueta: "Servicio", valor: servicio },
    // El aviso del botón flotante no trae tipo: sin esa fila
    ...(aviso.tipo ? [{ etiqueta: OPCION[aviso.negocio], valor: aviso.tipo }] : []),
  ];
  const lead: Fila[] = [nombre, telefono, ...servicioYTipo];
  // En el texto plano, el enlace de WhatsApp va como fila aparte
  const leadTexto: Fila[] = [
    nombre,
    telefono,
    ...(urlWhatsApp ? [{ etiqueta: "WhatsApp", valor: urlWhatsApp }] : []),
    ...servicioYTipo,
  ];

  const procedencia: Fila[] = [
    { etiqueta: "Formulario", valor: formulario },
    // Con el dominio: la home sola sería un "/" que no se entiende
    { etiqueta: "Página", valor: urlPagina, html: enlace(urlPagina, `kanuby.com${aviso.pagina}`) },
    // Sin datos de campaña, la sección no los menciona
    ...Object.entries(origen.campana ?? {}).map(([parametro, valor]) => ({
      etiqueta: CAMPANA[parametro as ParametroCampana],
      valor: valor as string,
    })),
  ];

  const cuando: Fila[] = [
    { etiqueta: "Fecha", valor: `${FECHA_MONTERREY.format(fecha)} (hora de Monterrey)` },
  ];

  const secciones: [string, Fila[], Fila[]][] = [
    ["Datos del lead", lead, leadTexto],
    ["De dónde vino", procedencia, procedencia],
    ["Cuándo entró", cuando, cuando],
  ];

  const asunto = `${servicio} · ${formulario} · ${aviso.nombre}`;

  const texto = [
    `Nuevo lead de kanuby.com: ${servicio} · ${formulario}`,
    ...secciones.flatMap(([titulo, , filas]) => [
      "",
      titulo.toUpperCase(),
      ...filas.map(({ etiqueta, valor }) => `${etiqueta}: ${valor}`),
    ]),
  ].join("\n");

  // Tablas y estilos en línea, una columna de 520px como máximo: es lo que
  // respetan Gmail, Outlook y el correo del celular.
  const filasHtml = (filas: Fila[]) =>
    filas
      .map(
        ({ etiqueta, valor, html }) => `<tr>
<td valign="top" style="padding:7px 12px 7px 0;width:38%;font-family:${FUENTE};font-size:13px;line-height:1.4;color:${C.secundario};">${escapar(etiqueta)}</td>
<td valign="top" style="padding:7px 0;font-family:${FUENTE};font-size:15px;line-height:1.4;color:${C.texto};word-break:break-word;">${html ?? escapar(valor)}</td>
</tr>`,
      )
      .join("\n");

  const html = `<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapar(asunto)}</title>
</head>
<body style="margin:0;padding:0;background:${C.fondo};">
<div style="display:none;max-height:0;overflow:hidden;">${escapar(`${aviso.nombre} · ${aviso.telefono}`)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.fondo};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;background:${C.tarjeta};border-top:4px solid ${C.naranja};border-radius:12px;">
<tr><td style="padding:24px 24px 4px;">
<p style="margin:0;font-family:${FUENTE};font-size:24px;font-weight:700;letter-spacing:-0.02em;color:${C.naranja};">kanuby</p>
<p style="margin:16px 0 0;font-family:${FUENTE};font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:${C.secundario};">Nuevo lead · ${escapar(formulario)}</p>
<h1 style="margin:6px 0 0;font-family:${FUENTE};font-size:22px;line-height:1.3;color:${C.texto};">${escapar(servicio)}: ${escapar(aviso.nombre)}</h1>
</td></tr>
${secciones
  .map(
    ([titulo, filas]) => `<tr><td style="padding:20px 24px 0;">
<p style="margin:0 0 4px;padding-bottom:8px;border-bottom:1px solid ${C.linea};font-family:${FUENTE};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.enlace};">${escapar(titulo)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${filasHtml(filas)}
</table>
</td></tr>`,
  )
  .join("\n")}
<tr><td style="padding:20px 24px 24px;font-family:${FUENTE};font-size:12px;line-height:1.5;color:${C.secundario};">Aviso automático de los formularios de kanuby.com. Responde al cliente por teléfono o WhatsApp: este correo no recibe respuestas.</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  return { asunto, html, texto };
}

/* Envío con la API de Resend */

export type Envio = (url: string, opciones: RequestInit) => Promise<Response>;

/** Hasta dónde se guarda en el registro lo que respondió Resend */
const LARGO_RESPUESTA = 1000;

/**
 * Envía un correo de un tipo de formulario. Nunca lanza ni frena a quien llenó
 * el formulario. Si faltan variables o Resend falla, deja en el registro del
 * servidor (los de Vercel) una línea "[correo] No se envió…" con todo lo
 * necesario para diagnosticarlo: qué respondió Resend, el remitente, a quién
 * se intentaba mandar y desde qué página venía el lead. Si sale, una línea
 * "[correo] Aviso enviado" con el id de Resend.
 */
export async function enviarCorreo(
  tipo: TipoFormulario,
  correo: Correo,
  {
    entorno = process.env,
    envio = fetch,
    registrar = console.error,
    informar = console.info,
    pagina,
  }: {
    entorno?: Entorno;
    envio?: Envio;
    registrar?: (...datos: unknown[]) => void;
    informar?: (...datos: unknown[]) => void;
    /** La página donde se llenó el formulario, para el registro */
    pagina?: string;
  } = {},
): Promise<boolean> {
  const resultado = configCorreo(tipo, entorno);
  const { to, cc } = destinatarios(tipo, entorno);
  const detalle = (extra: Record<string, unknown>) =>
    JSON.stringify({ tipo, pagina, remitente: REMITENTE_AVISOS, to, cc, asunto: correo.asunto, ...extra });

  if ("faltan" in resultado) {
    registrar(
      `[correo] No se envió el aviso (${tipo}): faltan ${resultado.faltan.join(", ")}.`,
      detalle({ faltan: resultado.faltan }),
    );
    return false;
  }
  const { llave, remitente } = resultado.config;
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
    const cuerpo = await respuesta.text().catch(() => "");
    if (!respuesta.ok) {
      registrar(
        `[correo] No se envió el aviso (${tipo}): Resend respondió ${respuesta.status}.`,
        detalle({ estado: respuesta.status, respuesta: cuerpo.slice(0, LARGO_RESPUESTA) }),
      );
      return false;
    }
    let id: unknown = null;
    try {
      id = (JSON.parse(cuerpo) as { id?: unknown }).id ?? null;
    } catch {
      // Respuesta sin JSON: se registra el envío sin id.
    }
    informar(`[correo] Aviso enviado (${tipo}).`, JSON.stringify({ id, pagina, to, cc }));
    return true;
  } catch (error) {
    registrar(
      `[correo] No se envió el aviso (${tipo}): no se pudo contactar a Resend.`,
      detalle({ error: error instanceof Error ? error.message : String(error) }),
    );
    return false;
  }
}
