import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeaderBlog } from "@/components/blog/header-blog";
import { SiteFooter } from "@/components/site-footer";
import { negocioDePagina } from "@/lib/conversiones";
import { fechaLarga } from "@/lib/fechas";
import { categorias, posts, postsRecientes, type CategoriaSlug } from "@/lib/posts";
import { jsonLdBase, serializarJsonLd } from "@/lib/schema";
import styles from "./page.module.css";

/*
 * /blog/: todos los posts, del más reciente al más antiguo, en tarjetas con
 * su imagen destacada, categoría, título y fecha, cada una enlazada a su post.
 * Arriba, un filtro que lleva a las páginas de categoría existentes.
 */

const titulo = "Blog";
const descripcion =
  "Consejos, guías y novedades de Kanuby sobre mudanzas y minibodegas en Monterrey y Nuevo León.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/blog/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/blog/",
    siteName: "Kanuby",
    title: `${titulo} - Kanuby`,
    description: descripcion,
  },
};

const jsonLd = jsonLdBase({ ruta: "/blog/", nombre: `${titulo} - Kanuby`, descripcion });

const filtros = Object.entries(categorias) as [CategoriaSlug, string][];

export default function Blog() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLd) }}
      />
      <HeaderBlog negocio={negocioDePagina["/blog/"]} />

      <main>
        <section className={`kb-resplandor ${styles.cabecera}`}>
          <h1 className={styles.titulo}>Blog</h1>
          <nav aria-label="Categorías del blog">
            <ul className={styles.filtros}>
              <li>
                <Link href="/blog/" className={styles.filtro} aria-current="page">
                  Todos
                </Link>
              </li>
              {filtros.map(([slug, nombre]) => (
                <li key={slug}>
                  <Link href={`/${slug}/`} className={styles.filtro}>
                    {nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <ul className={styles.rejilla}>
          {postsRecientes(posts.length).map((post, posicion) => (
            <li key={post.slug}>
              <article className={`kb-tarjeta ${styles.tarjeta}`}>
                <div className={styles.imagen}>
                  {post.imagen && (
                    <Image
                      src={post.imagen.src}
                      alt={post.imagen.alt}
                      width={post.imagen.width}
                      height={post.imagen.height}
                      sizes="(max-width: 767px) 92vw, (max-width: 1024px) 45vw, 30vw"
                      preload={posicion === 0}
                    />
                  )}
                </div>
                <div className={styles.cuerpo}>
                  <p className={styles.categorias}>
                    {post.categorias.map((categoria) => categorias[categoria]).join(" · ")}
                  </p>
                  <h2 className={styles.tarjetaTitulo}>
                    {/* El enlace del título cubre toda la tarjeta */}
                    <Link href={`/${post.slug}/`} className={styles.enlace}>
                      {post.titulo}
                    </Link>
                  </h2>
                  <time dateTime={post.fecha} className={styles.fecha}>
                    {fechaLarga(post.fecha)}
                  </time>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>

      <SiteFooter />
    </>
  );
}
