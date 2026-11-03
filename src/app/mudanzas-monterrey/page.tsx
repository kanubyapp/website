import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SeccionPreguntas } from "@/components/seccion-preguntas";
import { SiteFooter } from "@/components/site-footer";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import { BotonFlotante } from "@/components/mudanzas/boton-flotante";
import { CotizacionProvider } from "@/components/mudanzas/cotizacion";
import { FranjaConfianza } from "@/components/mudanzas/franja-confianza";
import { HeaderMudanzas } from "@/components/mudanzas/header-mudanzas";
import {
  HeroMudanzas,
  Marquesina,
  PorQueMudanzas,
  ServiciosMudanzas,
} from "@/components/mudanzas/secciones";
import { Testimonios } from "@/components/mudanzas/testimonios";
import { jsonLdPreguntas } from "@/lib/preguntas";
import { jsonLdBase, serializarJsonLd } from "@/lib/schema";
import { testimonios } from "@/lib/testimonios";
import { preguntas } from "./preguntas";
import styles from "./page.module.css";

const titulo = "Mudanzas en Monterrey";
const descripcion =
  "Mudanzas en Monterrey de casas, departamentos y oficinas. Empacamos, cargamos y trasladamos tus muebles con cuidado. Más de 20 años de experiencia.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/mudanzas-monterrey/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/mudanzas-monterrey/",
    siteName: "Kanuby",
    title: `${titulo} - Kanuby`,
    description: descripcion,
    // El camión del hero, en JPG para que lo lean todas las redes
    images: [
      { url: "/images/mudanzas/truck-kanuby-og.jpg", width: 1200, height: 675, type: "image/jpeg" },
    ],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = jsonLdBase({
  ruta: "/mudanzas-monterrey/",
  nombre: `${titulo} - Kanuby`,
  negocio: { tipo: "MovingCompany", imagen: "/images/mudanzas/truck-kanuby.webp" },
  migas: [],
});
const jsonLdFaq = jsonLdPreguntas(preguntas);

export default function MudanzasMonterrey() {
  return (
    <CotizacionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLdFaq) }}
      />
      <HeaderMudanzas
        enlaces={[
          { href: "#porque", texto: "¿Por qué Kanuby?" },
          { href: "#servicios", texto: "Servicios" },
          { href: "#testimonios", texto: "Testimonios" },
          { href: "#faqs", texto: "Preguntas" },
        ]}
        acciones={
          <BotonCotizar
            texto="Cotiza Ahora"
            className="kb-boton-principal kb-boton-header-corto kb-boton-naranja-oscuro"
          />
        }
      />

      <main>
        <HeroMudanzas
          className={styles.hero}
          fondo={
            // Decorativa: fondo difuso y muy tenue. Calidad 40 y la mitad de
            // resolución (sizes 50vw): el desenfoque oculta la diferencia.
            // Es el elemento más grande al cargar (LCP) y pesa muy poco: se
            // pide de inmediato y con prioridad alta, junto con el camión.
            <Image
              src="/images/mudanzas/fondo-hero-mudanzas.webp"
              alt=""
              fill
              sizes="50vw"
              quality={40}
              loading="eager"
              fetchPriority="high"
              className={styles.fondoHero}
            />
          }
          imagen={{
            src: "/images/mudanzas/truck-kanuby.webp",
            alt: "Camión de mudanzas de Kanuby, con cabina blanca y caja naranja con el logo y www.kanuby.com",
            width: 2048,
            height: 1152,
            // La columna de la imagen: unos 49vw (92vw en móvil).
            sizes: "(max-width: 767px) 92vw, 49vw",
            // El LCP es el fondo del hero; el camión no le quita prioridad.
            secundaria: true,
          }}
          titulo="Servicio de Mudanzas en Monterrey"
          texto="Mudanzas en Monterrey y su área metropolitana, de casas, departamentos y oficinas. Empacamos, cargamos y trasladamos tus muebles con cuidado, con más de 20 años de experiencia y la opción de guardar tus cosas en una minibodega si las necesitas."
          boton={
            <BotonCotizar
              texto="Cotiza Ahora por"
              subtexto="Whatsapp"
              className="kb-boton-principal kb-boton-dos-lineas kb-boton-hero"
            />
          }
        />

        <FranjaConfianza />

        <PorQueMudanzas
          id="porque"
          antetitulo="Hazlo con Kanuby, hazlo con expertos."
          titulo="Mudanzas en Monterrey con más de 20 años de experiencia"
          etiqueta="Contamos con más de 20 años de experiencia."
          tarjetas={[
            {
              icono: "/images/mudanzas/mesa-de-trabajo-3.png",
              alt: "Medalla con una casa y tres estrellas",
              titulo: "Expertos Calificados",
              texto:
                "Nuestro equipo se mantiene en constante certificación, preparados para resolver uno a uno los retos que se nos presenten y ofrecerte el mejor servicio de mudanza.",
            },
            {
              icono: "/images/mudanzas/mesa-de-trabajo-2.png",
              alt: "Ícono de una persona de atención al cliente",
              titulo: "Atención Personalizada",
              texto:
                "Nuestro equipo de atención se encargará de resolver, guiarte y apoyarte ante cualquier adversidad, nos encargamos de hacer de tu experiencia una experiencia disfrutable.",
            },
            {
              icono: "/images/mudanzas/mesa-de-trabajo-1.png",
              alt: "Documentos con el sello de una casa",
              titulo: "Seguridad y Confianza",
              texto:
                "Olvídate de servicios poco confiables, en Kanuby nos encargamos de mudarte de punto a punto sin tratos con terceros, por ello nos responsabilizamos por todas tus cosas.",
            },
          ]}
        />

        <Marquesina
          items={[
            "¡Más de 20 años de experiencia!",
            "Empaque y Desempaque",
            "Mudanzas Locales y Nacionales",
          ]}
        />

        <ServiciosMudanzas
          pagina="/mudanzas-monterrey/"
          id="servicios"
          titulo="Nuestros Servicios"
          texto="En Kanuby llevamos más de 20 años haciendo mudanzas en Monterrey. Nos encargamos del servicio completo: desarmamos y armamos tus muebles, los protegemos, los cargamos y los llevamos a tu nuevo domicilio."
        />

        {/*
         * Tres secciones de texto con los patrones de la página: el
         * encabezado de "Nuestros Servicios" (kb-servicios-intro) y, para los
         * bloques con H3, las tarjetas de "¿Por qué Kanuby?" sin ícono.
         */}
        <section className={`kb-servicios ${styles.seccionTexto}`}>
          <div className="kb-servicios-intro">
            <h2 className="kb-servicios-titulo">Qué incluye el servicio</h2>
          </div>
          <div className="kb-porque-tarjetas">
            <div className="kb-tarjeta kb-porque-tarjeta">
              <h3 className="kb-porque-tarjeta-titulo">Antes de cargar</h3>
              <p className="kb-porque-tarjeta-texto">
                Protegemos los muebles con cobijas y emplaye, empacamos lo que nos pidas y
                etiquetamos las cajas por cuarto. Desarmamos lo que haga falta y guardamos los
                tornillos identificados, para que al llegar no haya que buscarlos.
              </p>
            </div>
            <div className="kb-tarjeta kb-porque-tarjeta">
              <h3 className="kb-porque-tarjeta-titulo">Durante el traslado</h3>
              <p className="kb-porque-tarjeta-texto">
                El camión va con nuestro equipo, no subcontratamos. La misma gente que carga es
                la que descarga, así que nadie tiene que explicar dos veces qué es frágil.
              </p>
            </div>
            <div className="kb-tarjeta kb-porque-tarjeta">
              <h3 className="kb-porque-tarjeta-titulo">Al llegar</h3>
              <p className="kb-porque-tarjeta-texto">
                Acomodamos los muebles donde los quieras y armamos lo que desarmamos. Si
                contrataste desempaque, sacamos y acomodamos el contenido de las cajas.
              </p>
            </div>
            <div className="kb-tarjeta kb-porque-tarjeta">
              <h3 className="kb-porque-tarjeta-titulo">Si todavía no puedes instalarte</h3>
              <p className="kb-porque-tarjeta-texto">
                Podemos guardar tus cosas en{" "}
                <Link href="/minibodegas-monterrey/" className={styles.enlaceTexto}>
                  una minibodega
                </Link>{" "}
                el tiempo que necesites y llevártelas después, sin que tengas que contratar dos
                servicios por separado.
              </p>
            </div>
          </div>
        </section>

        <section className={`kb-servicios ${styles.seccionTexto}`}>
          <div className="kb-servicios-intro">
            <h2 className="kb-servicios-titulo">¿Cuánto cuesta una mudanza en Monterrey?</h2>
            <p className="kb-servicios-texto">
              No hay una tarifa única. El precio se arma sobre lo que de verdad vas a mover y
              sobre las condiciones de cada domicilio, así que cotizamos caso por caso. Pedir tu
              cotización no tiene costo y te la damos por escrito antes de que contrates nada.
            </p>
            <p className="kb-servicios-texto">
              Lo que hace que una mudanza cueste más o menos es casi siempre lo mismo:
            </p>
          </div>
          <div className="kb-porque-tarjetas">
            <div className="kb-tarjeta kb-porque-tarjeta">
              <h3 className="kb-porque-tarjeta-titulo">Cuántas cosas hay que mover</h3>
              <p className="kb-porque-tarjeta-texto">
                Un departamento de una recámara no ocupa el mismo camión ni el mismo equipo que
                una casa de tres. Por eso cotizamos sobre lo que de verdad vas a mover, no sobre
                una tarifa fija por tipo de vivienda.
              </p>
            </div>
            <div className="kb-tarjeta kb-porque-tarjeta">
              <h3 className="kb-porque-tarjeta-titulo">
                Qué tan accesibles están los dos domicilios
              </h3>
              <p className="kb-porque-tarjeta-texto">
                Un tercer piso sin elevador, una calle donde no cabe el camión o un
                fraccionamiento con horario de acceso restringido alargan la maniobra. Si nos lo
                dices desde la cotización, lo contemplamos en el tiempo y no hay sorpresas el día
                de la mudanza.
              </p>
            </div>
            <div className="kb-tarjeta kb-porque-tarjeta">
              <h3 className="kb-porque-tarjeta-titulo">Si necesitas que empaquemos nosotros</h3>
              <p className="kb-porque-tarjeta-texto">
                Puedes empacar tú y nosotros cargamos, o nos encargamos del empaque completo. Son
                dos servicios distintos y el segundo suma horas.
              </p>
            </div>
            <div className="kb-tarjeta kb-porque-tarjeta">
              <h3 className="kb-porque-tarjeta-titulo">Objetos que piden manejo especial</h3>
              <p className="kb-porque-tarjeta-texto">
                Pianos, caja fuerte, obra de arte, electrodomésticos grandes o cristalería fina
                llevan embalaje y maniobra aparte.
              </p>
            </div>
          </div>
          <div className="kb-servicios-intro">
            <p className="kb-servicios-texto">
              Una cotización seria tiene que decirte todo esto por escrito antes de que
              contrates. Si alguien te da un número sin preguntarte qué vas a mover y desde
              dónde, ese número va a cambiar el día de la mudanza.
            </p>
          </div>
        </section>

        <section className={`kb-servicios ${styles.seccionTexto}`}>
          <div className="kb-servicios-intro">
            <h2 className="kb-servicios-titulo">Zonas donde hacemos mudanzas</h2>
            <p className="kb-servicios-texto">
              Cubrimos todo el área metropolitana de Monterrey: San Pedro Garza García,
              Guadalupe, San Nicolás de los Garza, Apodaca, General Escobedo, Santa Catarina,
              Cumbres, Juárez y el centro de la ciudad. También hacemos la ruta{" "}
              <Link href="/mudanzas-monterrey-cdmx/" className={styles.enlaceTexto}>
                de Monterrey a Ciudad de México
              </Link>{" "}
              y de regreso.
            </p>
            <p className="kb-servicios-texto">
              Cada zona tiene lo suyo. En San Pedro y en Cumbres la mayoría de los
              fraccionamientos piden aviso previo y tienen horarios de acceso. En el centro el
              problema es el estacionamiento y el tráfico, así que conviene arrancar temprano. En
              Apodaca y Escobedo las distancias entre colonias son largas y eso pesa en el tiempo
              total.
            </p>
            <p className="kb-servicios-texto">No hacemos mudanzas internacionales.</p>
          </div>
        </section>

        <Testimonios
          titulo={
            <h2 className="kb-testimonios-titulo">
              Historias de confianza <br />
              en cada movimiento.
            </h2>
          }
          texto="No solo trasladamos objetos, cuidamos el patrimonio de nuestros clientes. Descubre por qué cientos de familias y empresas en Monterrey confían en Kanuby para sus mudanzas y almacenamiento."
          testimonios={testimonios}
        />

        <SeccionPreguntas
          descripcion="Resolvemos aquí las dudas que más nos llegan sobre contratar una mudanza. Si la tuya no aparece, escríbenos y te respondemos."
          textoBoton="Cotizar Mudanza"
          preguntas={preguntas}
        />
      </main>

      <SiteFooter />
      <BotonFlotante pagina="/mudanzas-monterrey/" className="kb-flotante" />
    </CotizacionProvider>
  );
}
