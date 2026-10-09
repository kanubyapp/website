import type { Metadata } from "next";
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

const titulo = "Mudanzas en Monterrey";

export const metadata: Metadata = {
  title: titulo,
  alternates: { canonical: "/mudanzas-monterrey/" },
  openGraph: {
    type: "article",
    locale: "es_MX",
    url: "/mudanzas-monterrey/",
    siteName: "Kanuby",
    title: `${titulo} - Kanuby`,
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
          titulo="Servicio de Fletes y Mudanzas en Monterrey"
          texto="En Kanuby cambiamos la forma de mudarse, contamos con el mejor servicio de fletes y mudanzas en Monterrey."
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
          boton={
            <BotonCotizar
              texto="Cotiza Ahora por"
              subtexto="Whatsapp"
              className="kb-boton-principal kb-boton-dos-lineas kb-boton-servicios"
            />
          }
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
      <BotonFlotante className="kb-vidrio kb-flotante" />
    </CotizacionProvider>
  );
}
