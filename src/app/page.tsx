import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

const negocios = [
  {
    titulo: "Mudanzas",
    texto:
      "Mudanzas locales, a CDMX y empresariales. Nuestro equipo empaca, carga y traslada todo por ti.",
    boton: "Ver mudanzas",
    href: "/mudanzas-monterrey/",
    // La imagen de /mudanzas-monterrey/ es un recorte sin fondo.
    recorte: true,
    imagen: {
      src: "/images/ddddd.png",
      alt: "Camión de mudanzas naranja de Kanuby con el lema “Tu vecino nunca aprenderá a cantar… Nosotros te mudamos”",
      width: 2048,
      height: 1365,
    },
  },
  {
    titulo: "Minibodegas",
    texto:
      "Espacios seguros de 3.5, 7 y 14 m² para guardar lo que necesites, el tiempo que lo necesites.",
    boton: "Ver minibodegas",
    href: "/minibodegas-monterrey/",
    recorte: false,
    imagen: {
      src: "/images/minibodegas/contenedores.png",
      alt: "Tres contenedores naranjas de Kanuby de distinto tamaño",
      width: 1376,
      height: 768,
    },
  },
];

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
        <section className={`kb-resplandor ${styles.hero}`}>
          <h1 className={styles.heroTitulo}>
            Mudanzas y Minibodegas <br />
            <span className={styles.heroAcento}>en Nuevo León</span>
          </h1>
          <p className={styles.heroTexto}>
            En Kanuby somos una compañía con más de 20 años de experiencia en
            Mudanzas, mini bodegas y proveeduría de productos para empaque y
            embalaje. Contamos con soluciones únicas a la medida de los
            clientes más exigentes.
          </p>
        </section>

        <section className={styles.necesitas} aria-labelledby="que-necesitas">
          <h2 id="que-necesitas" className={styles.tituloSeccion}>
            ¿Qué necesitas?
          </h2>
          <ul className={styles.negocios}>
            {negocios.map((negocio) => (
              <li key={negocio.href}>
                <article className={`kb-tarjeta ${styles.negocio}`}>
                  <div
                    className={`${styles.negocioMedia} ${negocio.recorte ? styles.negocioRecorte : ""}`}
                  >
                    <Image
                      src={negocio.imagen.src}
                      alt={negocio.imagen.alt}
                      width={negocio.imagen.width}
                      height={negocio.imagen.height}
                      sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1180px) 50vw, 560px"
                    />
                  </div>
                  <div className={styles.negocioCuerpo}>
                    <h3 className={styles.negocioTitulo}>{negocio.titulo}</h3>
                    <p className={styles.negocioTexto}>{negocio.texto}</p>
                    <Link href={negocio.href} className="kb-boton-principal">
                      {negocio.boton}
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* Lista abierta: aquí entrará la calificación de Google. */}
        <ul className={styles.confianza}>
          <li className="kb-pildora">
            <strong className={styles.confianzaDato}>+20 años</strong> de experiencia
          </li>
          <li className="kb-pildora">Mudanzas en Monterrey y a CDMX</li>
        </ul>

        <section
          className={`kb-resplandor-suave ${styles.noticias}`}
          aria-labelledby="ultimas-noticias"
        >
          <h2 id="ultimas-noticias" className={styles.tituloSeccion}>
            Últimas Noticias
          </h2>
          <CarruselNoticias
            posts={postsRecientes(10).map(({ slug, titulo, imagen }) => ({
              slug,
              titulo,
              imagen,
            }))}
          />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
