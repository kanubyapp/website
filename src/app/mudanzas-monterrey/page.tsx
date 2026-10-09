import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import { BotonCotizarHeader } from "@/components/mudanzas/boton-cotizar-header";
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
import { jsonLdBase, serializarJsonLd } from "@/lib/schema";
import { testimonios } from "@/lib/testimonios";
import styles from "./page.module.css";

const titulo = "Mudanzas en Monterrey";
const descripcion =
  "Mudanzas en Monterrey de casas, departamentos y oficinas. Empacamos, cargamos y trasladamos tus muebles con cuidado. Más de 20 años de experiencia.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/mudanzas-monterrey/" },
  openGraph: {
    type: "article",
    locale: "es_MX",
    url: "/mudanzas-monterrey/",
    siteName: "Kanuby",
    title: `${titulo} - Kanuby`,
    description: descripcion,
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = jsonLdBase({ ruta: "/mudanzas-monterrey/", nombre: `${titulo} - Kanuby` });

export default function MudanzasMonterrey() {
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
          titulo="Las Mejores Mudanzas en Monterrey, Nuevo León"
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
          id="servicios"
          titulo="Nuestros Servicios"
          texto="En Kanuby contamos con la experiencia de más de 20 años en mudanzas en Monterrey. Puedes confiar en nosotros, donde tu mudanza será realizada con la rapidez que nos caracteriza además de la seguridad que solo un servicio de calidad como el nuestro puede garantizar."
        />

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
      </main>

      <SiteFooter />
      <BotonFlotante className="kb-flotante" />
    </CotizacionProvider>
  );
}
