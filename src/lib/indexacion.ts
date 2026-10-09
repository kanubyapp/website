import type { MetadataRoute } from "next";
import { posts } from "./posts.ts";

/*
 * Indexación: el sitio solo se indexa en kanuby.com. En cualquier otro
 * dominio (la URL de Vercel, las vistas previas, otro dominio que apunte al
 * proyecto) robots.txt bloquea todo el rastreo y todas las respuestas llevan
 * X-Robots-Tag: noindex (src/proxy.ts). Se decide por el Host de cada
 * petición, que es el dominio que pidió el visitante o el buscador: una
 * variable de entorno no sirve, porque el mismo despliegue de producción
 * responde en kanuby.com y en su URL de vercel.app.
 */

export const DOMINIO_PUBLICO = "kanuby.com";
export const URL_SITIO = `https://${DOMINIO_PUBLICO}`;

/** "Kanuby.com:443" o "kanuby.com." también cuentan; www.kanuby.com no. */
export function esDominioPublico(host: string | null | undefined): boolean {
  const dominio = (host ?? "").trim().toLowerCase().replace(/:\d+$/, "").replace(/\.$/, "");
  return dominio === DOMINIO_PUBLICO;
}

/** Encabezado que bloquea la indexación fuera de kanuby.com; null en kanuby.com. */
export function encabezadoNoIndex(host: string | null | undefined): string | null {
  return esDominioPublico(host) ? null : "noindex, nofollow";
}

export function reglasRobots(host: string | null | undefined): MetadataRoute.Robots {
  if (!esDominioPublico(host)) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${URL_SITIO}/sitemap.xml`,
  };
}

/*
 * Páginas indexables fuera del blog. Las de categoría (/mudanzas/,
 * /minibodegas/, /sin-categoria/) llevan noindex y no van.
 */
export const PAGINAS_INDEXABLES = [
  "/",
  "/mudanzas-monterrey/",
  "/mudanzas-monterrey-cdmx/",
  "/mudanzas-empresariales-monterrey/",
  "/minibodegas-monterrey/",
  "/blog/",
  "/social/",
] as const;

export function entradasSitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGINAS_INDEXABLES.map((ruta) => ({ url: `${URL_SITIO}${ruta}` })),
    ...posts.map((post) => ({
      url: `${URL_SITIO}/${post.slug}/`,
      lastModified: post.modificado,
    })),
  ];
}
