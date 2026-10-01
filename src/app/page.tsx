import type { Metadata } from "next";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { postsRecientes } from "@/lib/posts";
import { CarruselNoticias } from "./_home/carrusel-noticias";
import { HeaderHome } from "./_home/header-home";
import styles from "./page.module.css";

// Roboto solo la usa el "Leer más" del carrusel (fuente de texto del kit).
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "400",
});

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

const sitio = "https://kanuby.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${sitio}/`,
      url: `${sitio}/`,
      name: titulo,
      isPartOf: { "@id": `${sitio}/#website` },
      about: { "@id": `${sitio}/#organization` },
      description: descripcion,
      inLanguage: "es",
    },
    {
      "@type": "WebSite",
      "@id": `${sitio}/#website`,
      url: `${sitio}/`,
      name: "Kanuby",
      description: "Más Espacio, menos Problemas",
      publisher: { "@id": `${sitio}/#organization` },
      inLanguage: "es",
    },
    {
      "@type": "Organization",
      "@id": `${sitio}/#organization`,
      name: "Kanuby",
      url: `${sitio}/`,
      logo: {
        "@type": "ImageObject",
        "@id": `${sitio}/#/schema/logo/image/`,
        url: `${sitio}/images/kanuby-orange.svg`,
        contentUrl: `${sitio}/images/kanuby-orange.svg`,
        caption: "Kanuby",
      },
      image: { "@id": `${sitio}/#/schema/logo/image/` },
      sameAs: [
        "https://www.facebook.com/KanubyBodegas/",
        "https://www.instagram.com/kanuby.mx/",
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
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

        <section className={`${styles.noticias} ${roboto.variable}`}>
          <div className={styles.noticiasCaja}>
            <h2 className={styles.noticiasTitulo}>Últimas Noticias</h2>
            <CarruselNoticias posts={postsRecientes(10)} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
