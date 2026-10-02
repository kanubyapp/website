/*
 * JSON-LD base de cada página: WebPage, WebSite y Organization, con la misma
 * estructura que genera Yoast en kanuby.com.
 */

export const SITIO = "https://kanuby.com";

type DatosPagina = {
  /** Ruta con barra final, por ejemplo "/mudanzas-monterrey/" */
  ruta: string;
  nombre: string;
  descripcion?: string;
};

export function jsonLdBase({ ruta, nombre, descripcion }: DatosPagina) {
  const url = `${SITIO}${ruta}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: nombre,
        isPartOf: { "@id": `${SITIO}/#website` },
        about: { "@id": `${SITIO}/#organization` },
        ...(descripcion ? { description: descripcion } : {}),
        inLanguage: "es",
      },
      {
        "@type": "WebSite",
        "@id": `${SITIO}/#website`,
        url: `${SITIO}/`,
        name: "Kanuby",
        description: "Más Espacio, menos Problemas",
        publisher: { "@id": `${SITIO}/#organization` },
        inLanguage: "es",
      },
      {
        "@type": "Organization",
        "@id": `${SITIO}/#organization`,
        name: "Kanuby",
        url: `${SITIO}/`,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITIO}/#/schema/logo/image/`,
          url: `${SITIO}/images/kanuby-orange.svg`,
          contentUrl: `${SITIO}/images/kanuby-orange.svg`,
          caption: "Kanuby",
        },
        image: { "@id": `${SITIO}/#/schema/logo/image/` },
        sameAs: [
          "https://www.facebook.com/KanubyBodegas/",
          "https://www.instagram.com/kanuby.mx/",
        ],
      },
    ],
  };
}

/** Contenido seguro para un <script type="application/ld+json">. */
export function serializarJsonLd(datos: unknown): string {
  return JSON.stringify(datos).replace(/</g, "\\u003c");
}
