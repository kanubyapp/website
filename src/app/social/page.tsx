import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IconoFacebook,
  IconoInstagram,
  IconoLinkedin,
  IconoTiktok,
  IconoWhatsApp,
} from "@/components/iconos";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import { CotizacionProvider } from "@/components/mudanzas/cotizacion";
import { posts } from "@/lib/posts";
import { jsonLdBase, serializarJsonLd } from "@/lib/schema";
import styles from "./page.module.css";

const titulo = "Social";
const ruta = "/social/";

export const metadata: Metadata = {
  title: titulo,
  alternates: { canonical: ruta },
  openGraph: {
    type: "article",
    locale: "es_MX",
    url: ruta,
    siteName: "Kanuby",
    title: `${titulo} - Kanuby`,
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = jsonLdBase({ ruta, nombre: `${titulo} - Kanuby` });

/* El único post que muestra el publicado (el más reciente). */
const post = posts.find((p) => p.slug === "como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza")!;

const redes = [
  {
    href: "https://www.facebook.com/KanubyBodegas/",
    etiqueta: "Facebook de Kanuby",
    Icono: IconoFacebook,
  },
  {
    href: "https://www.instagram.com/kanuby.mx/",
    etiqueta: "Instagram de Kanuby",
    Icono: IconoInstagram,
  },
  {
    href: "https://mx.linkedin.com/company/kanuby",
    etiqueta: "LinkedIn de Kanuby",
    Icono: IconoLinkedin,
  },
  {
    href: "https://wa.me/528115006365?text=Hola%20Kanuby!%20Estoy%20buscando%20una%20minibodega!%20",
    etiqueta: "Escribir a Kanuby por WhatsApp",
    Icono: IconoWhatsApp,
  },
  {
    href: "https://www.tiktok.com/@kanuby.mx",
    etiqueta: "TikTok de Kanuby",
    Icono: IconoTiktok,
  },
];

export default function Social() {
  return (
    <CotizacionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLd) }}
      />
      <main className={styles.social}>
        <div className={styles.contenido}>
          <div className={styles.cabecera}>
            {/* El publicado no tiene H1: el logo, que dice "Kanuby", hace de título. */}
            <h1 className={styles.logo}>
              <Image
                src="/images/kanuby-blue.svg"
                alt="Kanuby"
                width={1593}
                height={338}
                sizes="(max-width: 767px) 180px, 12vw"
                preload
              />
            </h1>
            <Link href="/" className={styles.botonSitio}>
              Sitio Web
            </Link>
          </div>

          <section className={styles.tarjeta}>
            <div className={styles.fila}>
              <div className={styles.mudanzaImagen}>
                <Image
                  src="/images/ddddd.png"
                  alt="Camión de mudanzas naranja de Kanuby"
                  width={2048}
                  height={1365}
                  sizes="(max-width: 767px) 28vw, 10vw"
                />
              </div>
              <div className={styles.mudanzaTexto}>
                <h2 className={styles.mudanzaTitulo}>
                  Múdate <br />
                  con Kanuby
                </h2>
                <BotonCotizar texto="Cotizar Mudanza" className={styles.botonBloque} />
              </div>
            </div>
          </section>

          <section className={styles.tarjeta}>
            <div className={styles.fila}>
              <div className={styles.minibodegaTexto}>
                <h2 className={styles.minibodegaTitulo}>
                  Consigue una <br />
                  Minibodega
                </h2>
              </div>
              <div className={styles.minibodegaImagen}>
                <Image
                  src="/images/contactanos.png"
                  alt="Camioneta naranja de Kanuby con el lema Rápido, fácil y seguro"
                  width={1080}
                  height={800}
                  sizes="(max-width: 767px) 23vw, 10vw"
                />
              </div>
            </div>
            <span className={styles.proximamente}>🔔 Próximamente Minibodegas</span>
          </section>

          <ul className={styles.redes}>
            {redes.map(({ href, etiqueta, Icono }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={etiqueta}
                  className={styles.red}
                >
                  <Icono />
                </a>
              </li>
            ))}
          </ul>

          <h2 className={styles.noticiasTitulo}>⬇️ Últimas Noticias ⬇️</h2>

          <div className={styles.posts}>
            <article className={styles.post}>
              {post.imagen && (
                <Link href={`/${post.slug}/`} className={styles.postImagen} tabIndex={-1} aria-hidden="true">
                  <Image
                    src={post.imagen.src}
                    alt={post.imagen.alt}
                    width={post.imagen.width}
                    height={post.imagen.height}
                    sizes="(max-width: 767px) 22vw, 10vw"
                  />
                </Link>
              )}
              <h3 className={styles.postTitulo}>
                <Link href={`/${post.slug}/`}>{post.titulo}</Link>
              </h3>
            </article>
          </div>
        </div>
      </main>
    </CotizacionProvider>
  );
}
