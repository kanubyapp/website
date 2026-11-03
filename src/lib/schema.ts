import { TELEFONO_INTERNACIONAL } from "./contacto.ts";
import {
  COORDENADAS,
  DIRECCION,
  HORARIO_ATENCION,
  HORARIO_MINIBODEGAS,
  PERFIL_GOOGLE,
} from "./negocio.ts";

/*
 * JSON-LD de cada página: WebPage, WebSite y Organization, con la misma
 * estructura que genera Yoast en kanuby.com, más lo que la página pida: el
 * negocio local (LocalBusiness en la home, MovingCompany en las de mudanzas,
 * SelfStorage en minibodegas) y la ruta de migas (BreadcrumbList).
 *
 * El negocio local lleva la dirección, las coordenadas, la ficha de Google y
 * el teléfono publicados (lib/negocio.ts y lib/contacto.ts). Sin precios: no
 * se publican en ningún lado. Horario: en SelfStorage, el de acceso a las
 * minibodegas; en los demás, el de atención publicado en /mudanzas-monterrey/.
 */

export const SITIO = "https://kanuby.com";

/** Igual que el lang del <html> (app/layout.tsx) */
export const IDIOMA = "es-MX";

export const ID_ORGANIZACION = `${SITIO}/#organization`;

/** Foto general de Kanuby (la de compartir de la home): la de los posts que no tienen una */
export const FOTO_KANUBY = "/images/pr3.jpg";

export type TipoNegocio = "LocalBusiness" | "MovingCompany" | "SelfStorage";

/* Un nodo por tipo, con el mismo @id en todas las páginas que lo emiten */
const NEGOCIOS: Record<TipoNegocio, { id: string; url: string }> = {
  LocalBusiness: { id: `${SITIO}/#negocio`, url: `${SITIO}/` },
  MovingCompany: { id: `${SITIO}/#mudanzas`, url: `${SITIO}/mudanzas-monterrey/` },
  SelfStorage: { id: `${SITIO}/#minibodegas`, url: `${SITIO}/minibodegas-monterrey/` },
};

export type Miga = { nombre: string; ruta: string };

type DatosPagina = {
  /** Ruta con barra final, por ejemplo "/mudanzas-monterrey/" */
  ruta: string;
  nombre: string;
  descripcion?: string;
  /** Negocio local de la página y su foto (ruta en /public) */
  negocio?: { tipo: TipoNegocio; imagen: string };
  /** Migas entre el inicio y la página, sin incluirlos: van solos ([] si no hay) */
  migas?: Miga[];
  /** Nombre de la página en las migas; por omisión, nombre sin " - Kanuby" */
  nombreMiga?: string;
};

const direccion = {
  "@type": "PostalAddress",
  streetAddress: `${DIRECCION.calle}, ${DIRECCION.colonia}`,
  addressLocality: DIRECCION.municipio,
  addressRegion: DIRECCION.estado,
  postalCode: DIRECCION.codigoPostal,
  addressCountry: "MX",
};

export function jsonLdNegocio(tipo: TipoNegocio, imagen: string) {
  const { id, url } = NEGOCIOS[tipo];
  return {
    "@type": tipo,
    "@id": id,
    name: "Kanuby",
    url,
    image: `${SITIO}${imagen}`,
    telephone: TELEFONO_INTERNACIONAL,
    address: direccion,
    geo: {
      "@type": "GeoCoordinates",
      latitude: COORDENADAS.latitud,
      longitude: COORDENADAS.longitud,
    },
    hasMap: PERFIL_GOOGLE,
    sameAs: [PERFIL_GOOGLE],
    parentOrganization: { "@id": ID_ORGANIZACION },
    // Minibodegas, su horario de acceso; mudanzas y el general, el de atención
    openingHoursSpecification: (tipo === "SelfStorage"
      ? HORARIO_MINIBODEGAS
      : HORARIO_ATENCION
    ).map((franja) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: franja.dias,
      opens: franja.abre,
      closes: franja.cierra,
    })),
  };
}

/** Inicio, las migas intermedias y la página; cada una con su posición */
export function jsonLdMigas(url: string, nombre: string, migas: Miga[] = []) {
  const elementos = [{ nombre: "Inicio", ruta: "/" }, ...migas];
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      ...elementos.map((miga, indice) => ({
        "@type": "ListItem",
        position: indice + 1,
        name: miga.nombre,
        item: `${SITIO}${miga.ruta}`,
      })),
      { "@type": "ListItem", position: elementos.length + 1, name: nombre },
    ],
  };
}

export function jsonLdBase({ ruta, nombre, descripcion, negocio, migas, nombreMiga }: DatosPagina) {
  const url = `${SITIO}${ruta}`;
  const conMigas = migas !== undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: nombre,
        isPartOf: { "@id": `${SITIO}/#website` },
        about: { "@id": negocio ? NEGOCIOS[negocio.tipo].id : ID_ORGANIZACION },
        ...(descripcion ? { description: descripcion } : {}),
        ...(conMigas ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
        inLanguage: IDIOMA,
      },
      {
        "@type": "WebSite",
        "@id": `${SITIO}/#website`,
        url: `${SITIO}/`,
        name: "Kanuby",
        description: "Más Espacio, menos Problemas",
        publisher: { "@id": ID_ORGANIZACION },
        inLanguage: IDIOMA,
      },
      {
        "@type": "Organization",
        "@id": ID_ORGANIZACION,
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
        telephone: TELEFONO_INTERNACIONAL,
        address: direccion,
        sameAs: ["https://www.facebook.com/KanubyBodegas/", "https://www.instagram.com/kanuby.mx/"],
      },
      ...(negocio ? [jsonLdNegocio(negocio.tipo, negocio.imagen)] : []),
      ...(conMigas
        ? [jsonLdMigas(url, nombreMiga ?? nombre.replace(/ - Kanuby$/, ""), migas)]
        : []),
    ],
  };
}

/** Contenido seguro para un <script type="application/ld+json">. */
export function serializarJsonLd(datos: unknown): string {
  return JSON.stringify(datos).replace(/</g, "\\u003c");
}
