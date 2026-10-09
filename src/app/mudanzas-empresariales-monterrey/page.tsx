import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import { BotonCotizarHeader } from "@/components/mudanzas/boton-cotizar-header";
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

const titulo = "Mudanzas Empresariales en Monterrey";
const ruta = "/mudanzas-empresariales-monterrey/";

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

const preguntas = [
  {
    pregunta: "¿Ofrecen servicio de empaque para equipos sensibles y documentos?",
    respuesta:
      "Sí, nuestro servicio completo incluye el empaque profesional de todos tus activos, utilizando materiales especializados para equipos electrónicos y la organización segura de documentos.",
  },
  {
    pregunta: "¿Cuentan con seguro para la mercancía durante el traslado?",
    respuesta:
      "Absolutamente. Todas nuestras mudanzas empresariales incluyen un seguro de carga para brindarte total tranquilidad y protección sobre tus bienes.",
  },
  {
    pregunta: "¿Pueden realizar la mudanza fuera del horario de oficina o fines de semana?",
    respuesta:
      "Sí, ofrecemos flexibilidad de horarios para adaptarnos a las necesidades de tu negocio y minimizar el impacto en tus operaciones diarias. Consulta con tu coordinador de proyecto.",
  },
  {
    pregunta: "¿Cómo se coordinan los tiempos de desmontaje y montaje?",
    respuesta:
      "Nuestro equipo de planificación trabajará de la mano contigo para establecer un cronograma detallado que minimice el tiempo de inactividad y asegure un montaje eficiente en tu nueva ubicación.",
  },
];

const jsonLd = jsonLdBase({ ruta, nombre: `${titulo} - Kanuby` });

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
          <BotonCotizarHeader className="kb-boton-principal kb-boton-dos-lineas kb-boton-header" />
        }
      />

      <main>
        <HeroMudanzas
          className={styles.hero}
          titulo="Mudamos tu Empresa en Monterrey"
          texto="En Kanuby somos expertos en reubicación empresarial. Nos encargamos de todo para que tu empresa no pare."
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
          titulo="Las Mejores Mudanzas de oficinas en Monterrey, Nuevo León"
          etiqueta="Contamos con más de 20 años de experiencia."
          tarjetas={[
            {
              icono: "/images/mudanzas/mesa-de-trabajo-3.png",
              alt: "Medalla con una casa y tres estrellas",
              titulo: "Protección Total",
              texto:
                "Cada equipo, documento y mobiliario es tratado con el máximo cuidado. Contamos con empaques especializados y seguro de carga para tu completa tranquilidad.",
            },
            {
              icono: "/images/mudanzas/mesa-de-trabajo-2.png",
              alt: "Ícono de una persona de atención al cliente",
              titulo: "Planificación Experta",
              texto:
                "Desde la primera llamada, asignamos un coordinador dedicado que gestionará cada fase de tu mudanza, asegurando que todo salga según lo planeado y a tiempo.",
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
          id="servicios"
          titulo="Otros Servicios"
          texto="En Kanuby, te ofrecemos un servicio “llave en mano”. Así es como garantizamos un traslado empresarial sin complicaciones"
        />

        <section className={`kb-resplandor-suave ${styles.faq}`}>
          <div className={styles.faqContenido}>
            <div className={styles.faqImagen}>
              <Image
                src="/images/empresariales/sin-titulo-4.png"
                alt="Caja abierta con signos de interrogación"
                width={954}
                height={807}
                sizes="(max-width: 767px) 46vw, 456px"
              />
            </div>
            <p className={styles.faqAntetitulo}>¿Alguna Duda?</p>
            <h2 className={styles.faqTitulo}>
              Preguntas Frecuentes sobre Mudanzas de Oficinas
            </h2>
            <Faq
              inicial={1}
              preguntas={preguntas.map(({ pregunta, respuesta }) => ({
                pregunta,
                respuesta: <p>{respuesta}</p>,
              }))}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </CotizacionProvider>
  );
}
