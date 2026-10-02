import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { postsRecientes } from "@/lib/posts";
import { jsonLdBase, serializarJsonLd } from "@/lib/schema";
import { CarruselNoticias } from "./_home/carrusel-noticias";
import { HeaderHome } from "./_home/header-home";
import styles from "./page.module.css";

const titulo = "Mudanzas y Minibodegas en Monterrey - Kanuby";
const descripcion =
  "Recolectamos, organizamos, guardamos y cuando ocupas te lo llevamos. Con Kanuby consigue tu espacio minibodega a domicilio en Monterrey.";

export const metadata: Metadata = {
  title: { absolute: titulo },
  description: descripcion,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "Kanuby",
    title: titulo,
    description: descripcion,
    images: [{ url: "/images/pr3.jpg", width: 1000, height: 1000, type: "image/jpeg" }],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = jsonLdBase({ ruta: "/", nombre: titulo, descripcion });

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializarJsonLd(jsonLd),
        }}
      />
      <HeaderHome />
      <main>
        <section className={styles.hero}>
          <Image
            src="/images/sin-titulo-2.png"
            alt="Ilustración de personas cargando cajas de mudanza hacia un camión"
            width={1920}
            height={489}
            sizes="(max-width: 767px) 651px, 100vw"
            className={styles.heroImagen}
            preload
          />
          <div className={styles.heroContenido}>
            <h1 className={styles.heroTitulo}>
              Mudanzas y Minibodegas <br />
              en Nuevo León
            </h1>
            <div className={styles.divisor} aria-hidden="true">
              <span />
            </div>
            <p className={styles.heroTexto}>
              En Kanuby somos una compañía con más de 10 años de experiencia en
              Mudanzas, mini bodegas y proveeduría de productos para empaque y
              embalaje. Contamos con soluciones únicas a la medida de los
              clientes más exigentes.
            </p>
          </div>
        </section>

        <section className={styles.noticias}>
          <div className={styles.noticiasCaja}>
            <h2 className={styles.noticiasTitulo}>Últimas Noticias</h2>
            <CarruselNoticias
              posts={postsRecientes(10).map(({ slug, titulo, imagen }) => ({
                slug,
                titulo,
                imagen,
              }))}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
