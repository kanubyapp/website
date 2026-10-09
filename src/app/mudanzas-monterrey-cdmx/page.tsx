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
import { Testimonios } from "@/components/mudanzas/testimonios";
import { jsonLdBase, serializarJsonLd } from "@/lib/schema";
import { testimonios } from "@/lib/testimonios";
import { TitularRotativo } from "./titular-rotativo";
import styles from "./page.module.css";

const titulo = "Mudanzas de Monterrey a CDMX y de CDMX a Monterrey";
const ruta = "/mudanzas-monterrey-cdmx/";

export const metadata: Metadata = {
  title: titulo,
  alternates: { canonical: ruta },
  openGraph: {
    type: "article",
    locale: "es_MX",
    url: ruta,
    siteName: "Kanuby",
    title: `${titulo} - Kanuby`,
    images: [
      {
        url: "/images/posts/checklist-mudanza-monterrey.jpeg",
        width: 736,
        height: 687,
        type: "image/jpeg",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = jsonLdBase({ ruta, nombre: `${titulo} - Kanuby` });

export default function MudanzasMonterreyCdmx() {
  return (
    <CotizacionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLd) }}
      />
      <HeaderMudanzas
        enlaces={[
          { href: "#porque", texto: "¿Por qué Kanuby?" },
          { href: "#servicios", texto: "Servicios" },
          { href: "#testimonios", texto: "Testimonios" },
        ]}
        acciones={
          <BotonCotizarHeader className="kb-boton-principal kb-boton-dos-lineas kb-boton-header" />
        }
      />

      <main>
        <HeroMudanzas
          className={styles.hero}
          decoracion={<TitularRotativo />}
          titulo={titulo}
          claseTitulo={styles.titulo}
          texto="En Kanuby nos especializamos en la ruta más transitada del país. Si te mudas entre Monterrey y Ciudad de México, somos tu mejor opción: camiones directos, sin escalas, sin terceros."
          boton={
            <BotonCotizar
              texto="Cotiza Ahora por"
              subtexto="Whatsapp"
              className="kb-boton-principal kb-boton-dos-lineas kb-boton-hero"
            />
          }
          fondoImagen={
            <Image
              src="/images/cdmx/mapa-mexico.png"
              alt="Mapa de México con la ruta de Monterrey a la Ciudad de México"
              width={1024}
              height={1024}
              sizes="(max-width: 767px) 92vw, 41vw"
              className={styles.mapa}
            />
          }
        />

        <FranjaConfianza />

        <PorQueMudanzas
          id="porque"
          antetitulo="Mudanzas directas entre Monterrey y CDMX. Sin escalas, sin sorpresas."
          titulo="La ruta MTY↔CDMX con más de 20 años de experiencia."
          etiqueta="Contamos con más de 20 años moviendo México."
          tarjetas={[
            {
              icono: "/images/mudanzas/mesa-de-trabajo-3.png",
              alt: "Medalla con una casa y tres estrellas",
              titulo: "Expertos en ruta larga",
              texto:
                "Nuestro equipo está entrenado para mudanzas de larga distancia. Empacamos, cargamos y entregamos tus cosas en perfectas condiciones sin importar los kilómetros.",
            },
            {
              icono: "/images/mudanzas/mesa-de-trabajo-2.png",
              alt: "Ícono de una persona de atención al cliente",
              titulo: "Ruta directa, sin intermediarios",
              texto:
                "Trabajamos sin terceros. El mismo equipo que recoge tus cosas en Monterrey o en CDMX es el que las entrega en destino. Sin transferencias, sin riesgos.",
            },
            {
              icono: "/images/mudanzas/mesa-de-trabajo-1.png",
              alt: "Documentos con el sello de una casa",
              titulo: "Responsabilidad total",
              texto:
                "Nos hacemos cargo de todo desde el momento en que tocamos tu puerta hasta que tus cosas están en su nuevo lugar. Tus pertenencias son nuestra responsabilidad.",
            },
          ]}
        />

        <Marquesina
          className={styles.marquesina}
          items={[
            "Monterrey → CDMX",
            "CDMX → Monterrey",
            "Camiones directos",
            "Sin escalas",
            "Más de 20 años de experiencia",
            "Atención personalizada",
          ]}
        />

        <ServiciosMudanzas
          id="servicios"
          className={styles.servicios}
          titulo="Nuestros Servicios"
          texto="Mudarse entre Monterrey y Ciudad de México no tiene que ser complicado. En Kanuby lo hacemos simple, seguro y sin sorpresas. Con más de 20 años en el negocio, sabemos exactamente qué necesitas para que tu mudanza llegue bien."
          boton={
            <BotonCotizar
              texto="Cotiza Ahora por"
              subtexto="Whatsapp"
              className="kb-boton-principal kb-boton-dos-lineas kb-boton-servicios"
            />
          }
          tarjetas={[
            {
              icono: "/images/mudanzas/mesa-de-trabajo-1-1.png",
              alt: "Caja de mudanza con un escudo de protección",
              titulo: "Empaque profesional",
              texto:
                "Emplayamos, protegemos y etiquetamos todo antes de subirlo al camión. Tus muebles, electrodomésticos y objetos delicados viajan seguros de extremo a extremo.",
            },
            {
              icono: "/images/mudanzas/mesa-de-trabajo-2-1.png",
              alt: "Carrito de carga con cajas de mudanza",
              titulo: "Transporte directo MTY↔CDMX",
              texto:
                "Camión exclusivo para tu mudanza de Monterrey a CDMX o de CDMX a Monterrey. Sin escalas, sin cambios de unidad, sin que tus cosas pasen por bodegas intermedias.",
            },
            {
              icono: "/images/mudanzas/mesa-de-trabajo-4.png",
              alt: "Edificio de oficinas",
              titulo: "Carga y descarga incluida",
              texto:
                "Nuestro equipo sube todo en origen y baja todo en destino. Tú solo dinos dónde va cada cosa.",
            },
          ]}
        />

        <Testimonios
          titulo={
            <h2 className="kb-testimonios-titulo">
              Historias de confianza <br />
              en cada kilómetro
            </h2>
          }
          texto="Cientos de familias y profesionistas han hecho la ruta Monterrey↔CDMX con Kanuby. Sus cosas llegaron completas, a tiempo y sin un rasguño."
          testimonios={testimonios}
        />
      </main>

      <SiteFooter />
    </CotizacionProvider>
  );
}
