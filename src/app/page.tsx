import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IconoBodegaChica,
  IconoBodegaGrande,
  IconoBodegaMediana,
  IconoCasa,
  IconoEdificio,
  IconoFlechaAbajo,
  IconoRuta,
} from "@/components/iconos";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import { BotonFlotante } from "@/components/mudanzas/boton-flotante";
import { CotizacionProvider } from "@/components/mudanzas/cotizacion";
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

/*
 * Servicios: una tarjeta con el valor de Kanuby y una por negocio.
 * Las de negocio llevan su foto de fondo, tres datos con ícono, "Ver más" a
 * la página del servicio y "Contactar", que abre el popup de su servicio.
 */
const negocios = [
  {
    titulo: "Mudanzas",
    texto:
      "Mudanzas locales, a CDMX y empresariales. Nuestro equipo empaca, carga y traslada todo por ti.",
    href: "/mudanzas-monterrey/",
    cotizacion: "mudanza",
    // La imagen de /mudanzas-monterrey/ es un recorte sin fondo: va entera.
    recorte: true,
    imagen: {
      src: "/images/ddddd.png",
      alt: "Camión de mudanzas naranja de Kanuby con el lema “Tu vecino nunca aprenderá a cantar… Nosotros te mudamos”",
      width: 2048,
      height: 1365,
    },
    datos: [
      { texto: "Local", Icono: IconoCasa },
      { texto: "A CDMX", Icono: IconoRuta },
      { texto: "Empresarial", Icono: IconoEdificio },
    ],
  },
  {
    titulo: "Minibodegas",
    texto:
      "Espacios seguros de 3.5, 7 y 14 m² para guardar lo que necesites, el tiempo que lo necesites.",
    href: "/minibodegas-monterrey/",
    cotizacion: "minibodega",
    recorte: false,
    imagen: {
      src: "/images/minibodegas/contenedores.png",
      alt: "Tres contenedores naranjas de Kanuby de distinto tamaño",
      width: 1376,
      height: 768,
    },
    datos: [
      { texto: "3.5 m²", Icono: IconoBodegaChica },
      { texto: "7 m²", Icono: IconoBodegaMediana },
      { texto: "14 m²", Icono: IconoBodegaGrande },
    ],
  },
] as const;

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
          {/* Datos de confianza. Lista abierta: aquí entrará la calificación de Google. */}
          <ul className={styles.confianza}>
            <li className="kb-pildora">
              <strong className={styles.confianzaDato}>+20 años</strong> de experiencia
            </li>
            <li className="kb-pildora">Mudanzas en Monterrey y a CDMX</li>
          </ul>
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
          {/* Indicador de scroll: lleva a los servicios y se desvanece al bajar */}
          <a href="#servicios" className={styles.indicador} aria-label="Ir a servicios">
            <IconoFlechaAbajo className={styles.indicadorIcono} />
          </a>
        </section>

        <section id="servicios" className={`kb-resplandor-suave ${styles.necesitas}`}>
          {/* Tarjeta grande de vidrio sobre el resplandor de la sección */}
          <div className={`kb-vidrio ${styles.necesitasCaja}`}>
            <ul className={styles.negocios}>
              <li>
                <article className={styles.valor}>
                  <h3 className={styles.valorTitulo}>¿Cómo te ayudamos?</h3>
                  <p className={styles.valorTexto}>
                    Llevamos más de 20 años moviendo y resguardando lo que más le importa a
                    familias y empresas de Nuevo León. Un solo equipo se encarga de todo:
                    empacamos, cargamos, trasladamos y, si lo necesitas, guardamos tus cosas en
                    una minibodega segura hasta que estés listo.
                  </p>
                </article>
              </li>
              {negocios.map((negocio) => (
                <li key={negocio.href}>
                  <CotizacionProvider tipo={negocio.cotizacion}>
                    <article className={`kb-tarjeta ${styles.negocio}`}>
                      <Image
                        src={negocio.imagen.src}
                        alt={negocio.imagen.alt}
                        width={negocio.imagen.width}
                        height={negocio.imagen.height}
                        sizes="(max-width: 767px) 92vw, 31vw"
                        className={`${styles.negocioFoto} ${negocio.recorte ? styles.negocioRecorte : ""}`}
                      />
                      <div className={styles.negocioCuerpo}>
                        <h3 className={styles.negocioTitulo}>{negocio.titulo}</h3>
                        <p className={styles.negocioTexto}>{negocio.texto}</p>
                        <ul className={styles.datos}>
                          {negocio.datos.map(({ texto, Icono }) => (
                            <li key={texto} className={styles.dato}>
                              <Icono className={styles.datoIcono} />
                              {texto}
                            </li>
                          ))}
                        </ul>
                        <div className={styles.negocioBotones}>
                          <Link
                            href={negocio.href}
                            className={`kb-vidrio kb-boton-secundario ${styles.negocioBoton}`}
                            aria-label={`Ver más de ${negocio.titulo}`}
                          >
                            Ver más
                          </Link>
                          <BotonCotizar
                            texto="Contactar"
                            className={`kb-boton-principal ${styles.negocioBoton} ${styles.contactar}`}
                          />
                        </div>
                      </div>
                    </article>
                  </CotizacionProvider>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className={`kb-resplandor-suave ${styles.noticias}`}
          aria-labelledby="ultimas-noticias"
        >
          <div className={styles.noticiasTexto}>
            <h2 id="ultimas-noticias" className={styles.noticiasTitulo}>
              Últimas Noticias
            </h2>
            <p className={styles.noticiasParrafo}>
              Guías y consejos para que tu mudanza o tu minibodega salgan sin estrés: cómo
              empacar, cuánto cuesta, qué tamaño elegir y más.
            </p>
            <Link href="/blog/" className="kb-boton-secundario">
              Ver todo el blog
            </Link>
          </div>
          {/* El carrusel llega al borde derecho de la pantalla y la última tarjeta asoma cortada */}
          <div className={styles.noticiasCarrusel}>
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

      {/* Botón flotante: el popup empieza en "¿Qué necesitas?" (Mudanza o Minibodega) */}
      <CotizacionProvider tipo="eleccion">
        <BotonFlotante className="kb-flotante" />
      </CotizacionProvider>
    </>
  );
}
