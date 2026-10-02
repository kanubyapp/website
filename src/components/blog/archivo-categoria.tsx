import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContenidoPost } from "@/components/blog/contenido-post";
import { SiteFooter } from "@/components/site-footer";
import { categorias, postsDeCategoria, type CategoriaSlug } from "@/lib/posts";
import styles from "./archivo-categoria.module.css";

/*
 * Archivo de una categoría del blog con la plantilla del tema JupiterX de
 * kanuby.com: sin header visible, todos los posts de la categoría (sin
 * paginación) con su título, su imagen destacada y su contenido completo, y el
 * footer global. En el publicado son "noindex, follow".
 */

export function metadataCategoria(categoria: CategoriaSlug): Metadata {
  const titulo = `${categorias[categoria]} archivos - Kanuby`;
  return {
    title: { absolute: titulo },
    robots: { index: false, follow: true },
    openGraph: {
      type: "article",
      locale: "es_MX",
      url: `/${categoria}/`,
      siteName: "Kanuby",
      title: titulo,
    },
  };
}

export function ArchivoCategoria({ categoria }: { categoria: CategoriaSlug }) {
  return (
    <>
      <main className={styles.archivo}>
        {postsDeCategoria(categoria).map((post) => (
          <article key={post.slug} className={styles.post}>
            <h2 className={styles.titulo}>
              <Link href={`/${post.slug}/`}>{post.titulo}</Link>
            </h2>
            {post.imagen && (
              <Link href={`/${post.slug}/`} className={styles.imagen} tabIndex={-1} aria-hidden="true">
                <Image
                  src={post.imagen.src}
                  alt={post.imagen.alt}
                  width={post.imagen.width}
                  height={post.imagen.height}
                  sizes="(max-width: 1180px) 100vw, 1100px"
                />
              </Link>
            )}
            <ContenidoPost
              bloques={post.contenido}
              desplazamiento={1}
              className={styles.contenido}
            />
          </article>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
