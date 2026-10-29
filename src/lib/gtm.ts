/*
 * Contenedor de Google Tag Manager a partir de NEXT_PUBLIC_GTM_ID. Sin la
 * variable (o con un valor que no es un ID de contenedor) no se carga nada de
 * GTM y el sitio funciona igual: los eventos de conversión se siguen empujando
 * al dataLayer y la redirección a WhatsApp espera solo hasta el límite.
 */

export type ContenedorGtm = {
  id: string;
  /** Snippet estándar de GTM, para el <head>: inicia dataLayer y carga gtm.js */
  script: string;
  /** Respaldo para navegadores sin JavaScript (iframe dentro de <noscript>) */
  iframe: string;
};

const FORMATO_ID = /^GTM-[A-Z0-9]+$/;

export function contenedorGtm(valor: string | undefined): ContenedorGtm | null {
  const id = valor?.trim();
  if (!id || !FORMATO_ID.test(id)) return null;
  // window.dataLayer = window.dataLayer || []: si el sitio ya empujó eventos
  // (conversiones.ts), el snippet usa el mismo arreglo y no los pierde.
  const script =
    "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
    "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
    "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
    "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
    `})(window,document,'script','dataLayer','${id}');`;
  return { id, script, iframe: `https://www.googletagmanager.com/ns.html?id=${id}` };
}
