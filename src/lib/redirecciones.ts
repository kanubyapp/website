import { posts } from "./posts.ts";

/*
 * Redirecciones 301 de las URLs del sitio anterior en WordPress, a partir del
 * inventario de docs/redirecciones-301.md. Las usa next.config.ts. Todas son
 * 301 explícitas (permanent: true daría 308). Next compara las rutas sin
 * distinguir mayúsculas, así que /HOME/ también va directo a /. Las rutas
 * /wp-* no están: el firewall de Vercel las bloquea antes de llegar aquí.
 *
 * Ningún destino es a su vez un origen, para que cada URL vieja llegue en un
 * solo salto (redirecciones.test.ts).
 */

export type Redireccion = { source: string; destination: string; statusCode: 301 };

/*
 * Adjuntos de WordPress: una URL por imagen subida. Los que se subieron desde
 * una página o post van a ella; /home/ era la portada y /favicon/ y
 * /favicon-3/ no son páginas, así que esos van a la raíz.
 */
const ADJUNTOS_CON_PADRE: Record<string, string[]> = {
  "asi-es-una-mudanza-con-recoleccion-y-minibodega-incluida-paso-a-paso": [
    "moving-tips_-9-tricks-to-know-before-you-pack-_-quicken-loans",
  ],
  "checklist-definitiva-para-mudarte-en-monterrey-sin-estres": [
    "red-checklist-stock-photo_-image-of-isolated-list-closeup-10974106",
  ],
  "checklist-mudanza-monterrey": ["saiba-como-fazer-uma-mudanca-sem-transtorno"],
  "como-evitar-errores-comunes-al-mudarte-en-monterrey": [
    "is-it-worth-moving-your-homes-generator-when-you-change-homes_",
  ],
  "como-organizar-tu-minibodega-facilmente": [
    "26-secrets-personal-organizers-would-never-tell-you-for-free",
  ],
  "como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza": [
    "free-photo-_-carefree-family-having-fun-while-moving-into-new-home",
  ],
  "consejos-para-guardar-archivo-muerto-en-minibodega": [
    "warehouse-worker-writing-on-clipboard-with-checklist-details-shi",
  ],
  "cuanto-cuesta-rentar-una-minibodega-en-monterrey-guia-2025": [
    "free-photo-_-black-man-moving-furniture",
  ],
  "favicon-3": ["cropped-favicon-png-2"],
  favicon: ["cropped-favicon-png"],
  "guia-para-elegir-el-tamano-ideal-de-tu-minibodega": ["moving-abroad"],
  "guia-para-mudarte-a-monterrey-desde-otra-ciudad": [
    "red-checklist-stock-photo_-image-of-isolated-list-closeup-10974106-2",
    "the-ikea-storage-you-need-to-make-your-move-easier",
  ],
  home: ["sin-titulo-2", "sin-titulo-3"],
  "los-mejores-dias-y-horarios-para-hacer-tu-mudanza-en-monterrey": [
    "5-consejos-para-realizar-una-mudanza-con-exito",
  ],
  "minibodegas-monterrey": [
    "container",
    "gemini_generated_image_h2iunrh2iunrh2iu",
    "guardamos-kanuby",
    "man-looking-intently-at-work-tablet-in-garage",
    "mesa-de-trabajo-1-6",
    "mesa-de-trabajo-2-6",
    "mesa-de-trabajo-3-6",
    "mesa-de-trabajo-4-3",
    "mesa-de-trabajo-5",
    "minibodegas-monterrey-2",
    "nano_banana_pro_agrega_el_logo_a_los_tres_contenedores__que_se_vea_unificado_como_si_estuviese_pinta_1",
    "three-sleek-black-shipping-containers-stand-front-gray-industrial-building-showcasing-modern-storage-solutions-geometric-symmetry",
  ],
  "mudanza-urgente-en-monterrey": ["gumtape"],
  "mudanzas-empresariales-monterrey": [
    "black-webtag-2",
    "black-webtag",
    "sin-titulo-4",
    "white-webtag-2",
    "white-webtag",
  ],
  "mudanzas-en-monterrey-como-elegir-un-servicio-profesional-y-confiable": [
    "happy-tenant-moving-home-resting-breathing-fresh-air",
  ],
  "mudanzas-monterrey-cdmx": [
    "magnific__un-mapa-de-la-repblica-mexicana-en-un-gris-tenue-c__68702",
  ],
  "mudanzas-oficina-monterrey-cambio-sin-interrumpir": [
    "why-we-need-to-hire-commercial-removing-companies-in-london",
  ],
  "mudanzas-premium-san-pedro": [
    "trucos-para-hacer-una-mudanza-nacional-barata-sin-morir-en-el-intento",
  ],
  "mudanzas-residenciales-en-monterrey": ["pareja-mirando-dentro-de-la-caja-_-foto-gratis"],
  "mudanzas-y-minibodegas-la-combinacion-perfecta-si-aun-no-puedes-instalarte": ["home-2"],
  "servicio-de-mudanza-profesional-en-monterrey": ["_-1", "we-are-available-gbogbojijeoutlook"],
  "tarifas-mudanzas-monterrey": ["_"],
  "tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte": [
    "_-4",
    "how-to-build-a-pergola-perfectly",
  ],
};

const PADRES_SIN_PAGINA = ["home", "favicon", "favicon-3"];

/* Adjuntos sin página padre: no hay destino con contexto, van a la raíz. */
const ADJUNTOS_SIN_PADRE = [
  "10251-1",
  "10251-2",
  "10251",
  "3-10m-2",
  "3-15m-2",
  "3-20m-2",
  "3-30m-2",
  "3-3m-2",
  "3-6m-2",
  "about-bg",
  "bg4-free-img",
  "cactus1-free-img",
  "cactus2-free-img",
  "cactus4-free-img",
  "cactus5-free-img",
  "cactus6-free-img",
  "camion-celular-2",
  "camionvolador-2",
  "contact-bg",
  "contactanos-2",
  "cta-bg",
  "ddddd-2",
  "ddddd",
  "default-png",
  "demo-screenshot",
  "favicon-2",
  "favicon-3",
  "favicon",
  "final-kanuby-minibodegas",
  "free-shipping",
  "guardamos-2",
  "hero-bg",
  "kanuby-blue-2",
  "kanuby-blue-4",
  "kanuby-blue-5",
  "kanuby-blue",
  "kanuby-orange-2",
  "kanuby-orange-4",
  "kanuby-orange-5",
  "kanuby-orange",
  "kanuby-web",
  "kanuby-white-2",
  "kanuby-white-4",
  "kanuby-white-5",
  "kanuby-white",
  "kanubyminibodegas",
  "kanubymudanzas",
  "knauby-camion",
  "llevamos-2",
  "logo",
  "mesa-de-trabajo-1-2",
  "mesa-de-trabajo-1-3",
  "mesa-de-trabajo-1-4",
  "mesa-de-trabajo-1",
  "mesa-de-trabajo-2-2",
  "mesa-de-trabajo-2-3",
  "mesa-de-trabajo-2-4",
  "mesa-de-trabajo-2",
  "mesa-de-trabajo-3-2",
  "mesa-de-trabajo-3-3",
  "mesa-de-trabajo-3-4",
  "mesa-de-trabajo-3",
  "mesa-de-trabajo-4-2",
  "mesa-de-trabajo-4",
  "money-back",
  "nosabes-2",
  "nosabescomoblanco-2",
  "nosabescomofrase-2",
  "orange",
  "orangr-2-2",
  "organizamos-2",
  "plant-collection",
  "plant1-free-img",
  "plant2-free-img",
  "plant3-free-img",
  "plant4-free-img",
  "plant6-free-img",
  "plants-store-logo-green",
  "pr2-2",
  "pr3-2",
  "recolectamos-2",
  "store-bg",
  "teammate-1",
  "teammate-2",
  "teammate-3-1",
  "testimonial-2",
  "untitled8-1200x1200-2",
  "user1-free-img",
  "user3-free-img",
  "utiliza-calaculadora-2",
  "utilizacsalculadorablanco-2",
  "warehousekanuby-2",
  "website-tag-editable-2",
  "website-tag-editable",
  "website-tag-white-2",
  "website-tag-white",
  "whatsapp-image-2024-11-29-at-19-57-16",
  "woocommerce-placeholder-2",
  "woocommerce-placeholder",
];

const a = (source: string, destination: string): Redireccion => ({
  source,
  destination,
  statusCode: 301,
});

export const REDIRECCIONES: Redireccion[] = [
  // El formulario lleva a WhatsApp: /gracias/ no existe aquí.
  a("/gracias/", "/"),

  // Sitemaps de Yoast y de WordPress: Search Console puede tenerlos dados de alta.
  a("/sitemap_index.xml", "/sitemap.xml"),
  a("/post-sitemap.xml", "/sitemap.xml"),
  a("/page-sitemap.xml", "/sitemap.xml"),
  a("/wp-sitemap.xml", "/sitemap.xml"),

  // Portada y rutas de servicio anteriores.
  a("/home/", "/"),
  a("/cotizar-mudanza/", "/mudanzas-monterrey/"),
  a("/mini-bodegas/", "/minibodegas-monterrey/"),
  a("/mudanzas/empresariales/", "/mudanzas-empresariales-monterrey/"),
  a("/mudanzas/monterrey-cdmx/", "/mudanzas-monterrey-cdmx/"),
  a("/privacidad/", "/aviso-de-privacidad/"),
  a("/terminos/", "/terminos-y-condiciones/"),

  // Páginas de WordPress que no estaban en el inventario (Internet Archive).
  // Kanuby ya no opera en Puebla: esas van al servicio en Monterrey.
  a("/nosotros/", "/"),
  a("/mudanzas/monterrey/", "/mudanzas-monterrey/"),
  a("/minibodegas/monterrey/", "/minibodegas-monterrey/"),
  a("/mudanzas/puebla/", "/mudanzas-monterrey/"),
  a("/mudanzas-puebla/", "/mudanzas-monterrey/"),
  a("/minibodegas/puebla/", "/minibodegas-monterrey/"),

  // Sitio anterior a WordPress, en otro stack (Internet Archive). El
  // cotizador usaba un identificador variable: /quoter/{id}/spaces.
  a("/about/", "/"),
  a("/join/", "/"),
  a("/login/", "/"),
  a("/calculator/", "/minibodegas-monterrey/"),
  a("/privacy/", "/aviso-de-privacidad/"),
  a("/terms/", "/terminos-y-condiciones/"),
  a("/blog/6-tips-para-mantener-tu-cuarto-habitaci-n-organizado/", "/blog/"),
  a("/quoter/:id/spaces/", "/minibodegas-monterrey/"),

  // Slug anterior de un post (WordPress ya lo redirigía).
  a("/checklist-para-mudarte-en-monterrey-sin-complicaciones/", "/checklist-mudanza-monterrey/"),

  // Feeds: el de cada post va a su post; el general, los de categoría, el de
  // comentarios y cualquier otro, al blog. Los de post van antes del comodín.
  a("/feed/", "/blog/"),
  a("/feed/:tipo(atom|rdf|rss2)/", "/blog/"),
  ...posts.map((post) => a(`/${post.slug}/feed/`, `/${post.slug}/`)),
  a("/:padre/feed/", "/blog/"),

  // Paginación, autores, archivos por fecha y búsqueda: al blog.
  a("/page/:n(\\d+)/", "/blog/"),
  a("/:categoria(mudanzas|minibodegas|sin-categoria)/page/:n(\\d+)/", "/blog/"),
  a("/author/:autor/:resto*", "/blog/"),
  a("/:anio(20\\d{2})/", "/blog/"),
  a("/:anio(20\\d{2})/:mes(\\d{2})/", "/blog/"),
  a("/:anio(20\\d{2})/:mes(\\d{2})/:dia(\\d{2})/", "/blog/"),
  a("/search/:termino*", "/blog/"),

  // Adjuntos.
  ...Object.entries(ADJUNTOS_CON_PADRE).flatMap(([padre, adjuntos]) =>
    adjuntos.map((adjunto) =>
      a(`/${padre}/${adjunto}/`, PADRES_SIN_PAGINA.includes(padre) ? "/" : `/${padre}/`),
    ),
  ),
  ...ADJUNTOS_SIN_PADRE.map((adjunto) => a(`/${adjunto}/`, "/")),
];

/*
 * Rutas con mayúsculas: hoy dan 404. src/proxy.ts las manda a su versión en
 * minúsculas. Se compara la ruta decodificada (un escape como %C3%91 no es
 * una mayúscula; la Ñ que representa sí) y solo se reescriben los segmentos
 * que cambian. Fuera quedan /_next/ (archivos de compilación), /api/ (el
 * formulario) e /images/, que tiene archivos con mayúsculas.
 */
const EXCLUIDAS = /^\/(_next|api|images)\//;

/** La ruta en minúsculas, o null si ya lo está o no se toca */
export function rutaEnMinusculas(ruta: string): string | null {
  if (EXCLUIDAS.test(ruta)) return null;
  let cambio = false;
  const segmentos = ruta.split("/").map((segmento) => {
    let texto: string;
    try {
      texto = decodeURIComponent(segmento);
    } catch {
      return segmento;
    }
    const minusculas = texto.toLowerCase();
    if (minusculas === texto) return segmento;
    cambio = true;
    return encodeURIComponent(minusculas);
  });
  return cambio ? segmentos.join("/") : null;
}
