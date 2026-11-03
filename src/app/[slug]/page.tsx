import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CierreBlog } from "@/components/blog/cierre-blog";
import { ContenidoPost } from "@/components/blog/contenido-post";
import { HeaderBlog } from "@/components/blog/header-blog";
import { SiteFooter } from "@/components/site-footer";
import { negocioDePost, servicioDePost } from "@/lib/conversiones";
import { categorias, posts } from "@/lib/posts";
import {
  FOTO_KANUBY,
  ID_ORGANIZACION,
  IDIOMA,
  jsonLdBase,
  serializarJsonLd,
  SITIO,
} from "@/lib/schema";
import styles from "./page.module.css";

/* Los 24 posts viven en la raíz (/<slug>/), como en el publicado. */

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

function buscar(slug: string) {
  return posts.find((post) => post.slug === slug);
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = buscar((await params).slug);
  if (!post) return {};
  const ruta = `/${post.slug}/`;
  return {
    title: { absolute: post.seo.titulo },
    description: post.seo.descripcion ?? undefined,
    alternates: { canonical: ruta },
    authors: [{ name: "Kanuby", url: SITIO }],
    openGraph: {
      type: "article",
      locale: "es_MX",
      url: ruta,
      siteName: "Kanuby",
      title: post.seo.titulo,
      description: post.seo.descripcion ?? undefined,
      publishedTime: post.fecha,
      modifiedTime: post.modificado,
      images: post.imagen
        ? [
            {
              url: post.imagen.src,
              width: post.imagen.width,
              height: post.imagen.height,
              type: "image/jpeg",
            },
          ]
        : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PaginaPost({ params }: Props) {
  const post = buscar((await params).slug);
  if (!post) notFound();
  const negocio = negocioDePost(post.categorias);
  const servicio = servicioDePost(post.categorias);

  const ruta = `/${post.slug}/`;
  const url = `${SITIO}${ruta}`;
  const base = jsonLdBase({
    ruta,
    nombre: post.seo.titulo,
    descripcion: post.seo.descripcion ?? undefined,
    migas: [{ nombre: "Blog", ruta: "/blog/" }],
    nombreMiga: post.titulo,
  });
  // Los posts sin imagen propia llevan en el JSON-LD la foto general de Kanuby
  const imagen = `${SITIO}${post.imagen?.src ?? FOTO_KANUBY}`;
  const jsonLd = {
    ...base,
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        isPartOf: { "@id": url },
        // El autor es Kanuby, la organización (no la agencia)
        author: { "@id": ID_ORGANIZACION, name: "Kanuby", url: `${SITIO}/` },
        headline: post.titulo,
        datePublished: post.fecha,
        dateModified: post.modificado,
        mainEntityOfPage: { "@id": url },
        wordCount: post.seo.palabras,
        publisher: { "@id": ID_ORGANIZACION },
        image: imagen,
        thumbnailUrl: imagen,
        ...(post.categorias.includes("sin-categoria")
          ? {}
          : { articleSection: post.categorias.map((categoria) => categorias[categoria]) }),
        inLanguage: IDIOMA,
      },
      {
        ...base["@graph"][0],
        thumbnailUrl: imagen,
        datePublished: post.fecha,
        dateModified: post.modificado,
      },
      ...base["@graph"].slice(1),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLd) }}
      />
      <HeaderBlog servicio={servicio} />
      <main>
        <section className={styles.hero}>
          {post.imagen && (
            <Image
              src={post.imagen.src}
              alt={post.imagen.alt}
              width={post.imagen.width}
              height={post.imagen.height}
              sizes="92vw"
              className={styles.heroImagen}
              preload
            />
          )}
          <div className={styles.heroInterior}>
            <h1 className={styles.heroTitulo}>{post.titulo}</h1>
          </div>
        </section>

        <div className={styles.cuerpo}>
          <ContenidoPost bloques={post.contenido} className={`kb-prosa ${styles.contenido}`} />
        </div>

        <CierreBlog negocio={negocio} servicio={servicio} />
      </main>
      <SiteFooter />
    </>
  );
}
