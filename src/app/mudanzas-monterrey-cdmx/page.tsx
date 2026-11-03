import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import { CotizacionProvider } from "@/components/mudanzas/cotizacion";
import { FranjaConfianza } from "@/components/mudanzas/franja-confianza";
import { HeaderMudanzas } from "@/components/mudanzas/header-mudanzas";
import {
  HeroMudanzas,
  IMAGEN_HERO,
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

const descripcion =
  "Mudanzas entre Monterrey y CDMX en camión directo, sin escalas ni terceros. Empacamos, cargamos y trasladamos tus cosas. Más de 20 años de experiencia.";

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

const jsonLd = jsonLdBase({
  ruta,
  nombre: `${titulo} - Kanuby`,
  negocio: { tipo: "MovingCompany", imagen: "/images/ddddd.png" },
  migas: [],
});

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
          <BotonCotizar
            texto="Cotiza Ahora"
            className="kb-boton-principal kb-boton-header-corto kb-boton-naranja-oscuro"
          />
        }
      />

      <main>
        <HeroMudanzas
          className={styles.hero}
          decoracion={<TitularRotativo />}
          // Aquí la imagen va más angosta, junto al mapa: 92vw - 20px en móvil
          // y 33.2vw - 22px desde 768px, medido
          imagen={{
            ...IMAGEN_HERO,
            sizes: "(max-width: 767px) calc(92vw - 20px), calc(33.2vw - 22px)",
          }}
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
              /*
               * Medido sobre lo que se dibuja (object-fit: contain): 61.4vw + 7px
               * en móvil, 44.2vw - 30px desde 768px y 450px fijos desde 1101px.
               * De 394 a 767px pide el ancho de la caja (92vw), de más: con 3x,
               * lo justo caería en la variante de 828, que pesa más que la
               * original de 1024 (28.3 contra 25.2 KB). Hasta 393px, en 3x
               * alcanza la de 750, más ligera.
               * Es el LCP desde 768px: precarga y prioridad alta.
               */
              sizes="(max-width: 393px) calc(61.4vw + 7px), (max-width: 767px) 92vw, (max-width: 1100px) calc(44.2vw - 30px), 450px"
              className={styles.mapa}
              preload
              fetchPriority="high"
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
          titulo="Nuestros Servicios"
          texto="Mudarse entre Monterrey y Ciudad de México no tiene que ser complicado. En Kanuby lo hacemos simple, seguro y sin sorpresas. Con más de 20 años en el negocio, sabemos exactamente qué necesitas para que tu mudanza llegue bien."
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
