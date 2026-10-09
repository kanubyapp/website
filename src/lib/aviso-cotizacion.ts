import type { CuerpoAviso } from "./correo.ts";

/*
 * Manda al servidor el aviso por correo de una cotización. keepalive: la
 * petición sigue aunque la página se vaya a WhatsApp. No se espera ni se
 * reintenta: un fallo nunca detiene al cliente (el servidor lo registra).
 */
export function avisarCotizacion(cuerpo: CuerpoAviso, envio: typeof fetch = fetch) {
  try {
    envio("/api/cotizacion/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Sin fetch o con keepalive no admitido: el cliente sigue a WhatsApp igual.
  }
}
