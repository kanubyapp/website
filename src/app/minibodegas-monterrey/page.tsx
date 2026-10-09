import type { Metadata } from "next";
import Image from "next/image";
import { Faq } from "@/components/faq";
import { SiteFooter } from "@/components/site-footer";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import { BotonFlotante } from "@/components/mudanzas/boton-flotante";
import { CotizacionProvider } from "@/components/mudanzas/cotizacion";
import { jsonLdBase, serializarJsonLd } from "@/lib/schema";
import { Banner } from "./banner";
import { preguntas, resenas, textoPlano, type Bloque } from "./datos";
import { HeaderMinibodegas } from "./header-minibodegas";
import { Resenas } from "./resenas";
import styles from "./page.module.css";

const titulo = "Minibodegas en Monterrey";
const ruta = "/minibodegas-monterrey/";
const perfilGoogle = "https://share.google/idvTeRuzwdaQkGoee";

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
      { url: "/images/minibodegas/camionvolador-og.png", width: 800, height: 522, type: "image/png" },
    ],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = jsonLdBase({ ruta, nombre: `${titulo} - Kanuby` });

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: preguntas.map(({ pregunta, respuesta }) => ({
    "@type": "Question",
    name: pregunta,
    acceptedAnswer: { "@type": "Answer", text: textoPlano(respuesta) },
  })),
};

function Respuesta({ bloques }: { bloques: Bloque[] }) {
  return bloques.map((bloque, indice) =>
    Array.isArray(bloque) ? (
      <ul key={indice}>
        {bloque.map((elemento) => (
          <li key={elemento}>{elemento}</li>
        ))}
      </ul>
    ) : (
      <p key={indice}>
        {bloque.split("\n").map((linea, numero) => (
          <span key={numero}>
            {numero > 0 && <br />}
            {linea}
          </span>
        ))}
      </p>
    ),
  );
}

const tamanos = [
  {
    nombre: "Chica",
    superficie: "3.5",
    funciona: "Ideal para cajas, archivo muerto, artículos de temporada o desahogar un clóset.",
    medidas: ["2.45m", "2.35m", "1.48m"],
  },
  {
    nombre: "Mediana",
    superficie: "7",
    funciona: "Perfecta para los muebles de una recámara pequeña, electrodomésticos o un pequeño inventario.",
    medidas: ["2.45m", "2.35m", "2.95m"],
  },
  {
    nombre: "Grande",
    superficie: "14",
    funciona:
      "Espacio suficiente para la mudanza de un departamento pequeño, muebles grandes o stock de negocios.",
    medidas: ["2.45m", "2.35m", "6.00m"],
  },
];

export default function Minibodegas() {
  return (
    <CotizacionProvider tipo="minibodega">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLdFaq) }}
      />
      <HeaderMinibodegas />

      <main>
        <section className={styles.hero}>
          <Image
            src="/images/minibodegas/hero-minibodegas.webp"
            alt="Persona metiendo un sillón en un contenedor naranja de Kanuby"
            width={1920}
            height={1080}
            sizes="100vw"
            className={styles.heroFondo}
            preload
          />
          <h1 className={styles.heroTitulo}>Renta de Minibodegas</h1>
          <p className={styles.heroTexto}>
            Libera espacio en tu hogar o negocio. Renta tu propia minibodega, guarda tus
            pertenencias con total seguridad y accede a ellas cuando lo necesites. Tú tienes la
            llave.
          </p>
          <div className={styles.heroBotones}>
            <BotonCotizar
              texto="Cotizar Mi bodega"
              className={`kb-boton-principal ${styles.botonPrincipal}`}
            />
            <a href="#tamanos" className={`kb-boton-secundario ${styles.ocultoMovil}`}>
              Ver Tamaños y Precios
            </a>
          </div>
        </section>

        <section id="tamanos" className={styles.tamanos}>
          <h2 className={styles.tamanosTitulo}>Una para cada Necesidad</h2>
          <p className={styles.tamanosTexto}>
            Desde artículos de decoración hasta el inventario de tu negocio, tenemos el tamaño
            perfecto para lo que necesites guardar.
          </p>
          <div className={styles.tamanosCaja}>
            <Image
              src="/images/minibodegas/contenedores.png"
              alt="Tres contenedores naranjas de Kanuby de distinto tamaño"
              width={1376}
              height={768}
              sizes="(max-width: 767px) 92vw, 86vw"
              className={styles.tamanosFondo}
            />
            <div className={styles.tamanosRejilla}>
              {tamanos.map((tamano) => (
                <div key={tamano.nombre} className={`kb-vidrio ${styles.tamano}`}>
                  <div className={styles.tamanoCabecera}>
                    <h3 className={styles.tamanoNombre}>{tamano.nombre}</h3>
                    <span className={styles.tamanoSuperficie}>
                      {tamano.superficie}m<sup>2</sup>
                    </span>
                  </div>
                  <p className={styles.tamanoUso}>
                    <strong>Puede Funcionar:</strong> {tamano.funciona}
                  </p>
                  <ol className={styles.tamanoMedidas}>
                    <li>
                      <strong>Alto:</strong> {tamano.medidas[0]}
                    </li>
                    <li>
                      <strong>Ancho:</strong> {tamano.medidas[1]}
                    </li>
                    <li>
                      <strong>Largo:</strong> {tamano.medidas[2]}
                    </li>
                  </ol>
                  <BotonCotizar
                    texto="Cotizar Ahora"
                    className={`kb-boton-principal ${styles.tamanoBoton}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Banner />

        <section id="porque" className={styles.porque}>
          <div className={`kb-tarjeta ${styles.porqueTarjeta}`}>
            <div className={styles.porqueImagen}>
              <Image
                src="/images/minibodegas/hombre-tablet.jpg"
                alt="Encargado revisando una tablet dentro de una minibodega"
                width={2560}
                height={1703}
                sizes="(max-width: 767px) 84vw, 40vw"
              />
            </div>
            <div className={styles.porqueContenido}>
              <h2 className={styles.porqueTitulo}>¿Por qué con Kanuby?</h2>
              <p className={styles.porqueTexto}>
                En Kanuby entendemos que tus pertenencias son importantes. Por eso, hemos diseñado
                instalaciones de primer nivel en Monterrey pensadas para darte tranquilidad y
                comodidad. Ya sea que estés mudándote, redecorando tu casa, o necesites espacio
                extra para el inventario de tu negocio, te ofrecemos bodegas limpias, seguras y
                libres de plagas. Disfruta de la flexibilidad de rentar por el tiempo que
                necesites, con la certeza de que tus cosas están protegidas y siempre al alcance
                de tus manos.
              </p>
              <div className={styles.porqueBotones}>
                <BotonCotizar
                  texto="Cotizar Espacio"
                  className={`kb-boton-principal ${styles.botonPrincipal}`}
                />
                <a href="#tamanos" className="kb-boton-secundario">
                  Ver Tamaños
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className={styles.faq}>
          <div className={styles.faqColumna}>
            <div className={styles.faqFijo}>
              <h2 className={styles.faqTitulo}>Preguntas Frecuentes</h2>
              <p className={styles.faqAntetitulo}>¿Alguna duda?</p>
              <p className={styles.faqTexto}>Lo tenemos cubierto…</p>
              <BotonCotizar
                texto="Cotizar Espacio"
                className={`kb-boton-principal ${styles.botonPrincipal}`}
              />
            </div>
          </div>
          <div className={styles.faqPreguntas}>
            <Faq
              modo="independiente"
              className={styles.acordeones}
              preguntas={preguntas.map(({ pregunta, respuesta }) => ({
                pregunta,
                respuesta: <Respuesta bloques={respuesta} />,
              }))}
            />
          </div>
        </section>

        <section id="clientes" className={styles.clientes}>
          <h2 className={styles.clientesTitulo}>Nuestros Clientes...</h2>
          <Resenas resenas={resenas} />
          <a
            href={perfilGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.botonEnlace}
          >
            Ver todas las reseñas en Google
          </a>
        </section>

        <section id="ubicacion" className={styles.ubicacion}>
          <div className={`kb-tarjeta ${styles.ubicacionCaja}`}>
            <h2 className={styles.ubicacionTitulo}>Ubícanos</h2>
            <p className={styles.ubicacionDireccion}>
              CARR NACIONAL KM258 SN 5TA SN EMILIO, Los Rodríguez, 67300 Santiago, N.L.
            </p>
            <a
              href={perfilGoogle}
              target="_blank"
              rel="noopener noreferrer"
              className={`kb-boton-secundario ${styles.comoLlegar}`}
            >
              Cómo Llegar
            </a>
            <div className={styles.mapa}>
              <iframe
                src="https://maps.google.com/maps?q=25.489192%2C%20-100.183956&t=m&z=16&output=embed&iwloc=near"
                title="Mapa de la ubicación de las minibodegas de Kanuby"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BotonFlotante className={`kb-vidrio ${styles.flotante}`} />
    </CotizacionProvider>
  );
}
