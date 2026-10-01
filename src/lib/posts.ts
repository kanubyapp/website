/*
 * Posts del blog de kanuby.com: los 24 del post-sitemap, del más reciente al
 * más antiguo.
 *
 * Por ahora solo trae lo que pide el carrusel de la home y lo que reutilizará
 * la plantilla de post: título, slug, fechas, categorías e imagen destacada.
 * El contenido de cada post llega en la tarea 11.
 *
 * Imagen destacada: solo están descargadas las 10 que muestra el carrusel de la
 * home. Las del resto de posts se añaden en la tarea 11. Cuatro posts no tienen
 * imagen destacada en el sitio publicado.
 */

export type CategoriaSlug = "mudanzas" | "minibodegas" | "sin-categoria";

export const categorias: Record<CategoriaSlug, string> = {
  mudanzas: "Mudanzas",
  minibodegas: "Minibodegas",
  "sin-categoria": "Sin categoría",
};

export type Post = {
  slug: string;
  titulo: string;
  /** datePublished del sitio publicado (ISO 8601) */
  fecha: string;
  /** dateModified del sitio publicado (ISO 8601) */
  modificado: string;
  categorias: CategoriaSlug[];
  imagen?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
};

export const posts: Post[] = [
  {
    slug: "como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza",
    titulo: "Cómo organizar tu nuevo hogar después de la mudanza",
    fecha: "2025-05-14T00:36:05+00:00",
    modificado: "2025-05-26T23:05:37+00:00",
    categorias: ["sin-categoria"],
    imagen: {
      src: "/images/posts/como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza.jpeg",
      width: 626,
      height: 417,
      alt: "Familia jugando con cajas de mudanza en su nuevo hogar",
    },
  },
  {
    slug: "mudanzas-premium-san-pedro",
    titulo: "Mudanzas en San Pedro Garza García: servicio premium en Monterrey",
    fecha: "2025-05-14T00:33:02+00:00",
    modificado: "2025-05-26T23:13:58+00:00",
    categorias: ["sin-categoria"],
    imagen: {
      src: "/images/posts/mudanzas-premium-san-pedro.jpeg",
      width: 736,
      height: 1104,
      alt: "Niña ayudando a desempacar una caja con material de protección",
    },
  },
  {
    slug: "mudanzas-oficina-monterrey-cambio-sin-interrumpir",
    titulo: "Mudanzas de oficina en Monterrey: cómo hacer el cambio sin interrumpir tu negocio",
    fecha: "2025-05-14T00:28:43+00:00",
    modificado: "2025-05-26T23:22:55+00:00",
    categorias: ["sin-categoria"],
    imagen: {
      src: "/images/posts/mudanzas-oficina-monterrey-cambio-sin-interrumpir.jpeg",
      width: 735,
      height: 555,
      alt: "Oficina con muebles y cajas empacados para la mudanza",
    },
  },
  {
    slug: "como-evitar-errores-comunes-al-mudarte-en-monterrey",
    titulo: "Cómo evitar errores comunes al mudarte en Monterrey",
    fecha: "2025-05-14T00:26:12+00:00",
    modificado: "2025-05-26T23:40:58+00:00",
    categorias: ["sin-categoria"],
    imagen: {
      src: "/images/posts/como-evitar-errores-comunes-al-mudarte-en-monterrey.jpeg",
      width: 736,
      height: 469,
      alt: "Pareja sentada entre cajas de mudanza con signos de interrogación sobre la cabeza",
    },
  },
  {
    slug: "mudanza-urgente-en-monterrey",
    titulo: "Mudanza urgente en Monterrey: soluciones rápidas con respaldo profesional",
    fecha: "2025-05-14T00:13:34+00:00",
    modificado: "2025-05-26T23:55:12+00:00",
    categorias: ["sin-categoria"],
    imagen: {
      src: "/images/posts/mudanza-urgente-en-monterrey.jpeg",
      width: 736,
      height: 1104,
      alt: "Manos sellando una caja de mudanza con cinta adhesiva",
    },
  },
  {
    slug: "servicio-de-mudanza-profesional-en-monterrey",
    titulo: "¿Qué incluye un servicio de mudanza profesional en Monterrey?",
    fecha: "2025-05-14T00:07:13+00:00",
    modificado: "2025-05-27T00:04:24+00:00",
    categorias: ["sin-categoria"],
    imagen: {
      src: "/images/posts/servicio-de-mudanza-profesional-en-monterrey.jpeg",
      width: 736,
      height: 1308,
      alt: "Cajas de mudanza cargadas en una camioneta",
    },
  },
  {
    slug: "mudanzas-residenciales-en-monterrey",
    titulo: "Mudanzas residenciales en Monterrey: organiza tu traslado paso a paso",
    fecha: "2025-05-13T23:57:41+00:00",
    modificado: "2025-05-27T00:19:58+00:00",
    categorias: ["sin-categoria"],
    imagen: {
      src: "/images/posts/mudanzas-residenciales-en-monterrey.jpeg",
      width: 626,
      height: 937,
      alt: "Pareja mirando dentro de una caja de mudanza",
    },
  },
  {
    slug: "checklist-mudanza-monterrey",
    titulo: "Checklist para mudarte en Monterrey sin complicaciones",
    fecha: "2025-05-13T23:39:05+00:00",
    modificado: "2025-05-27T00:26:33+00:00",
    categorias: ["sin-categoria"],
    imagen: {
      src: "/images/posts/checklist-mudanza-monterrey.jpeg",
      width: 736,
      height: 687,
      alt: "Mujer recostada entre cajas de mudanza en una habitación vacía",
    },
  },
  {
    slug: "mudanzas-en-monterrey-como-elegir-un-servicio-profesional-y-confiable",
    titulo: "Mudanzas en Monterrey: cómo elegir un servicio profesional y confiable",
    fecha: "2025-05-13T23:34:55+00:00",
    modificado: "2025-05-27T00:35:03+00:00",
    categorias: ["sin-categoria"],
    imagen: {
      src: "/images/posts/mudanzas-en-monterrey-como-elegir-un-servicio-profesional-y-confiable.jpeg",
      width: 736,
      height: 736,
      alt: "Mujer descansando con una taza entre cajas de mudanza",
    },
  },
  {
    slug: "tarifas-mudanzas-monterrey",
    titulo: "¿Cuánto cuesta una mudanza en Monterrey en 2025? Guía completa de tarifas",
    fecha: "2025-05-13T23:11:46+00:00",
    modificado: "2025-05-27T00:43:07+00:00",
    categorias: ["mudanzas"],
    imagen: {
      src: "/images/posts/tarifas-mudanzas-monterrey.jpeg",
      width: 736,
      height: 1104,
      alt: "Cajas de mudanza apiladas en una habitación",
    },
  },
  {
    slug: "tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte",
    titulo: "¿Tu casa está en remodelación? Una minibodega puede salvarte",
    fecha: "2025-05-13T23:10:16+00:00",
    modificado: "2025-05-14T00:50:21+00:00",
    categorias: ["minibodegas"],
  },
  {
    slug: "consejos-para-guardar-archivo-muerto-en-minibodega",
    titulo: "Consejos para guardar archivo muerto en minibodega",
    fecha: "2025-05-13T23:10:10+00:00",
    modificado: "2025-05-14T00:48:18+00:00",
    categorias: ["minibodegas"],
  },
  {
    slug: "como-organizar-tu-minibodega-facilmente",
    titulo: "Cómo organizar tu minibodega facilmente",
    fecha: "2025-05-13T23:10:04+00:00",
    modificado: "2025-05-14T00:46:47+00:00",
    categorias: ["minibodegas"],
  },
  {
    slug: "guia-para-elegir-el-tamano-ideal-de-tu-minibodega",
    titulo: "Guía para elegir el tamaño ideal de tu minibodega",
    fecha: "2025-05-13T23:05:44+00:00",
    modificado: "2025-05-14T00:46:11+00:00",
    categorias: ["minibodegas"],
  },
  {
    slug: "asi-es-una-mudanza-con-recoleccion-y-minibodega-incluida-paso-a-paso",
    titulo: "Así es una mudanza con recolección y minibodega incluida: paso a paso",
    fecha: "2025-05-13T23:04:41+00:00",
    modificado: "2025-05-14T00:44:42+00:00",
    categorias: ["minibodegas"],
  },
  {
    slug: "cuanto-cuesta-rentar-una-minibodega-en-monterrey-guia-2025",
    titulo: "¿Cuánto cuesta rentar una minibodega en Monterrey? Guía 2025",
    fecha: "2025-05-13T23:04:34+00:00",
    modificado: "2025-05-14T00:43:58+00:00",
    categorias: ["minibodegas"],
  },
  {
    slug: "mudanzas-y-minibodegas-la-combinacion-perfecta-si-aun-no-puedes-instalarte",
    titulo: "Mudanzas y minibodegas: la combinación perfecta si aún no puedes instalarte",
    fecha: "2025-05-13T22:56:53+00:00",
    modificado: "2025-05-14T00:42:33+00:00",
    categorias: ["minibodegas", "mudanzas"],
  },
  {
    slug: "guia-para-mudarte-a-monterrey-desde-otra-ciudad",
    titulo: "Guía para mudarte a Monterrey desde otra ciudad",
    fecha: "2025-05-13T22:54:26+00:00",
    modificado: "2025-05-14T00:39:32+00:00",
    categorias: ["mudanzas"],
  },
  {
    slug: "checklist-definitiva-para-mudarte-en-monterrey-sin-estres",
    titulo: "Checklist definitiva para mudarte en Monterrey sin estrés",
    fecha: "2025-05-13T22:53:31+00:00",
    modificado: "2025-05-14T00:38:31+00:00",
    categorias: ["mudanzas"],
  },
  {
    slug: "los-mejores-dias-y-horarios-para-hacer-tu-mudanza-en-monterrey",
    titulo: "Los mejores días y horarios para hacer tu mudanza en Monterrey",
    fecha: "2025-05-13T22:53:24+00:00",
    modificado: "2025-05-14T00:37:38+00:00",
    categorias: ["mudanzas"],
  },
  {
    slug: "como-elegir-una-empresa-de-mudanzas-confiable-en-monterrey",
    titulo: "Cómo elegir una empresa de mudanzas confiable en Monterrey",
    fecha: "2025-05-13T22:53:11+00:00",
    modificado: "2025-05-13T22:56:21+00:00",
    categorias: ["mudanzas"],
  },
  {
    slug: "errores-comunes-al-mudarse-en-monterrey-y-como-evitarlos",
    titulo: "Errores comunes al mudarse en Monterrey (y cómo evitarlos)",
    fecha: "2025-05-13T22:53:05+00:00",
    modificado: "2025-05-13T22:56:28+00:00",
    categorias: ["mudanzas"],
  },
  {
    slug: "las-mejores-zonas-para-mudarte-en-monterrey-si-buscas-seguridad-y-conectividad",
    titulo: "Las mejores zonas para mudarte en Monterrey si buscas seguridad y conectividad",
    fecha: "2025-05-13T22:52:57+00:00",
    modificado: "2025-05-13T22:56:16+00:00",
    categorias: ["mudanzas"],
  },
  {
    slug: "cuanto-cuesta-una-mudanza-en-monterrey-en-2025",
    titulo: "¿Cuánto cuesta una mudanza en Monterrey en 2025?",
    fecha: "2025-05-13T22:52:54+00:00",
    modificado: "2025-05-13T22:56:10+00:00",
    categorias: ["mudanzas"],
  },
];

/** Los posts más recientes primero, como los ordena WordPress. */
export function postsRecientes(cantidad: number): Post[] {
  return [...posts]
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, cantidad);
}
