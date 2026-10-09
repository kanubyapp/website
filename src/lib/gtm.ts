/*
 * Contenedor de Google Tag Manager a partir de NEXT_PUBLIC_GTM_ID. Sin la
 * variable (o con un valor que no es un ID de contenedor) no se carga nada de
 * GTM y el sitio funciona igual: los eventos de conversión se siguen empujando
 * al dataLayer y la redirección a WhatsApp espera solo hasta el límite.
 */

export type ContenedorGtm = {
  id: string;
  /** Respaldo para navegadores sin JavaScript (iframe dentro de <noscript>) */
  iframe: string;
};

const FORMATO_ID = /^GTM-[A-Z0-9]+$/;

export function contenedorGtm(valor: string | undefined): ContenedorGtm | null {
  const id = valor?.trim();
  if (!id || !FORMATO_ID.test(id)) return null;
  return { id, iframe: `https://www.googletagmanager.com/ns.html?id=${id}` };
}
