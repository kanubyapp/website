import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import { CotizacionProvider } from "@/components/mudanzas/cotizacion";
import { FranjaConfianza } from "@/components/mudanzas/franja-confianza";
import { HeaderMudanzas } from "@/components/mudanzas/header-mudanzas";
import {
  HeroMudanzas,
  Marquesina,
  PorQueMudanzas,
  ServiciosMudanzas,
} from "@/components/mudanzas/secciones";
import { jsonLdBase, serializarJsonLd } from "@/lib/schema";
import { Faq } from "@/components/faq";
import styles from "./page.module.css";

const titulo = "Mudanzas empresariales y de oficinas en Monterrey";
const ruta = "/mudanzas-empresariales-monterrey/";

const descripcion =
  "Mudanza de oficinas en Monterrey: trasladamos mobiliario, equipo y documentos de tu empresa con un servicio llave en mano. Más de 20 años de experiencia.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: ruta },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: ruta,
    siteName: "Kanuby",
    title: `${titulo} - Kanuby`,
    description: descripcion,
    // La imagen del hero, en JPG para que la lean todas las redes
    images: [{ url: "/images/ddddd-og.jpg", width: 1200, height: 800, type: "image/jpeg" }],
  },
  twitter: { card: "summary_large_image" },
};

const preguntas = [
  {
    pregunta: "¿En la mudanza de oficinas empacan los equipos sensibles y los documentos?",
    respuesta:
      "Sí, nuestro servicio completo incluye el empaque profesional de todos tus activos, utilizando materiales especializados para equipos electrónicos y la organización segura de documentos.",
  },
  {
    pregunta: "¿Puedo asegurar la mercancía durante la mudanza de oficinas?",
    respuesta:
      "Sí. El seguro de carga se contrata como un servicio adicional: pídelo al cotizar y lo agregamos a tu cotización, junto con lo demás que necesites.",
  },
  {
    pregunta: "¿Pueden hacer la mudanza de oficinas fuera del horario laboral o en fin de semana?",
    respuesta:
      "Sí, ofrecemos flexibilidad de horarios para adaptarnos a las necesidades de tu negocio y minimizar el impacto en tus operaciones diarias. Consulta con tu coordinador de proyecto.",
  },
  {
    pregunta: "¿Cómo se coordinan el desmontaje y el montaje en una mudanza de oficinas?",
    respuesta:
      "Nuestro equipo de planificación trabajará de la mano contigo para establecer un cronograma detallado que minimice el tiempo de inactividad y asegure un montaje eficiente en tu nueva ubicación.",
  },
];

const jsonLd = jsonLdBase({
  ruta,
  nombre: `${titulo} - Kanuby`,
  negocio: { tipo: "MovingCompany", imagen: "/images/ddddd.png" },
  migas: [],
});

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: preguntas.map(({ pregunta, respuesta }) => ({
    "@type": "Question",
    name: pregunta,
    acceptedAnswer: { "@type": "Answer", text: respuesta },
  })),
};

export default function MudanzasEmpresariales() {
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
          titulo={titulo}
          texto="En Kanuby somos expertos en mudanza de oficinas y reubicación empresarial. Nos encargamos de todo para que tu empresa no pare."
          boton={
            <BotonCotizar
              texto="Cotiza Ahora"
              className={`kb-boton-principal ${styles.botonSimple}`}
            />
          }
        />

        <FranjaConfianza />

        <PorQueMudanzas
          id="porque"
          className={styles.porque}
          antetitulo="Tu Traslado Empresarial, ¡Simplificado y Eficiente!"
          titulo="Tu mudanza de oficinas en Monterrey, de principio a fin"
          etiqueta="Contamos con más de 20 años de experiencia."
          tarjetas={[
            {
              icono: "/images/mudanzas/mesa-de-trabajo-3.png",
              alt: "Medalla con una casa y tres estrellas",
              titulo: "Protección y Cuidado",
              texto:
                "Cada equipo, documento y mobiliario es tratado con el máximo cuidado y con empaques especializados. Si quieres una protección extra, puedes sumar un seguro de carga a tu mudanza.",
            },
            {
              icono: "/images/mudanzas/mesa-de-trabajo-2.png",
              alt: "Ícono de una persona de atención al cliente",
              titulo: "Planificación Experta",
              texto:
                "Desde la primera llamada, asignamos un coordinador dedicado que gestionará cada fase de tu mudanza, asegurando que todo salga según lo planeado.",
            },
            {
              icono: "/images/mudanzas/mesa-de-trabajo-1.png",
              alt: "Documentos con el sello de una casa",
              titulo: "Logística Inteligente",
              texto:
                "Optimizamos rutas y tiempos para ofrecerte la solución más eficiente, ya sea un traslado dentro de la misma ciudad o entre municipios clave.",
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
          pagina="/mudanzas-empresariales-monterrey/"
          id="servicios"
          titulo="Otros Servicios"
          texto="En Kanuby, te ofrecemos un servicio “llave en mano” para tu mudanza de oficinas, sin complicaciones."
        />

        <section className={`kb-resplandor-suave ${styles.faq}`}>
          <div className={styles.faqContenido}>
            <div className={styles.faqImagen}>
              <Image
                src="/images/empresariales/sin-titulo-4.png"
                alt="Caja abierta con signos de interrogación"
                width={954}
                height={807}
                /*
                 * Se queda pidiendo 456px desde 768px aunque en tablet ocupe menos:
                 * el original mide 954px y las variantes de 640 a 828 pesan más
                 * que él (31.7 a 42.2 KB contra 27.5), así que en 2x conviene que
                 * llegue a la original.
                 */
                sizes="(max-width: 767px) 46vw, 456px"
              />
            </div>
            <p className={styles.faqAntetitulo}>¿Alguna Duda?</p>
            <h2 className={styles.faqTitulo}>
              Preguntas frecuentes sobre la mudanza de oficinas
            </h2>
            <Faq
              inicial={1}
              preguntas={preguntas.map(({ pregunta, respuesta }) => ({
                pregunta,
                respuesta: <p>{respuesta}</p>,
              }))}
            />
            {/*
             * La guía es para quien todavía está investigando. Va al final de
             * las preguntas, lejos de los botones de cotizar, y su texto no
             * repite "mudanza de oficinas": esa búsqueda es de esta página.
             */}
            <p className={styles.faqGuia}>
              ¿Estás planeando el cambio?{" "}
              <Link href="/mudanzas-oficina-monterrey-cambio-sin-interrumpir/">
                Lee la guía
              </Link>{" "}
              para organizarlo sin detener tu operación.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </CotizacionProvider>
  );
}
