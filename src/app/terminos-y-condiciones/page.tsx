import type { Metadata } from "next";
import { DocumentoLegal, Pendiente } from "@/components/legales/documento-legal";
import { robotsLegales } from "@/lib/legales";
import { jsonLdBase, serializarJsonLd } from "@/lib/schema";

/*
 * Términos y condiciones de los servicios de mudanza. Las minibodegas se
 * rigen por su propio acuerdo, en app.kanuby.com/terms. Parte de la
 * estructura del borrador de legacy. Los datos sin confirmar van con
 * <Pendiente> y la página lleva noindex hasta que se confirmen
 * (lib/legales.ts).
 */

const ruta = "/terminos-y-condiciones/";
const titulo = "Términos y condiciones";
const descripcion = "Términos y condiciones de los servicios de mudanza de Kanuby en Monterrey.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: ruta },
  robots: robotsLegales,
  openGraph: {
    type: "article",
    locale: "es_MX",
    url: ruta,
    siteName: "Kanuby",
    title: `${titulo} - Kanuby`,
    description: descripcion,
  },
};

const jsonLd = jsonLdBase({ ruta, nombre: `${titulo} - Kanuby`, descripcion });

export default function TerminosYCondiciones() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializarJsonLd(jsonLd) }}
      />
      <DocumentoLegal
        ruta={ruta}
        antetitulo="Términos y condiciones"
        titulo="Términos y condiciones del servicio"
        actualizacion={<Pendiente>fecha de publicación</Pendiente>}
      >
        <p>
          <Pendiente>
            revisión de un abogado antes de publicar. Este texto es la estructura de referencia, no
            la versión final.
          </Pendiente>
        </p>

        <h2 data-estilo="3">1. Identificación de la empresa</h2>
        <p>
          Kanuby (&ldquo;Kanuby&rdquo;, &ldquo;nosotros&rdquo;) es el nombre comercial bajo el que
          se ofrecen los servicios descritos en este documento en Monterrey, Nuevo León, y su área
          metropolitana.
        </p>
        <ul>
          <li>
            Razón social: <Pendiente>confirmar si es KANUBY, S.A. de C.V. también para mudanzas</Pendiente>
          </li>
          <li>
            RFC: <Pendiente>RFC</Pendiente>
          </li>
          <li>
            Domicilio fiscal: <Pendiente>domicilio fiscal</Pendiente>
          </li>
          <li>
            Teléfono: <Pendiente>cuál de 81 1028 7087, 81 1500 6365 u 81 8336 3637</Pendiente>
          </li>
          <li>
            Correo: <Pendiente>confirmar si es info@kanuby.com u otro</Pendiente>
          </li>
        </ul>

        <h2 data-estilo="3">2. Servicios que cubren estos términos</h2>
        <p>Estos términos aplican a los servicios de mudanza de Kanuby:</p>
        <ul>
          <li>Mudanza local, en Monterrey y su área metropolitana.</li>
          <li>
            Mudanza de Monterrey a la Ciudad de México.{" "}
            <Pendiente>confirmar si incluye el regreso de CDMX a Monterrey</Pendiente>
          </li>
          <li>Mudanza empresarial, de oficinas y espacios de trabajo.</li>
          <li>
            Mudanza nacional. <Pendiente>a qué estados llega la cobertura</Pendiente>
          </li>
        </ul>
        <p>
          Kanuby presta estos servicios con personal y transporte{" "}
          <Pendiente>confirmar: propios, sin subcontratar a terceros</Pendiente>. El alcance exacto
          de cada servicio (empaque, desarmado y armado de muebles, materiales incluidos, tiempos
          estimados) se confirma con el cliente al cotizar, antes de contratar.
        </p>
        <p>
          La renta de minibodegas se rige por su propio acuerdo de servicios de almacenamiento,
          publicado en <a href="https://app.kanuby.com/terms">app.kanuby.com/terms</a>.
        </p>

        <h2 data-estilo="3">3. Condiciones de contratación</h2>
        <p>
          La contratación del servicio se confirma una vez que el cliente acepta la cotización
          enviada por Kanuby, ya sea por WhatsApp, teléfono o el medio de contacto que se haya
          usado. La cotización incluye el alcance del servicio, la fecha acordada y el costo total.
        </p>
        <p>
          <Pendiente>
            condiciones de pago (anticipo, liquidación, medios de pago aceptados) y requisitos
            previos a la mudanza, como acceso al inmueble o disponibilidad de elevador y
            estacionamiento.
          </Pendiente>
        </p>

        <h2 data-estilo="3">4. Responsabilidad sobre los bienes</h2>
        <p>
          Kanuby toma medidas de cuidado y empaque para proteger los bienes trasladados durante
          todo el servicio.
        </p>
        <p>
          <Pendiente>
            alcance de la responsabilidad ante daño, pérdida o robo: límites de cobertura, si existe
            un seguro de traslado, cómo se reporta un incidente y en qué plazo.
          </Pendiente>
        </p>

        <h2 data-estilo="3">5. Cancelaciones y reprogramaciones</h2>
        <p>
          <Pendiente>
            con cuánta anticipación se puede cancelar o reprogramar sin costo, si hay cargo por
            cancelación tardía o por no presentarse en la fecha acordada, y cómo se devuelve el
            anticipo en caso de cancelación.
          </Pendiente>
        </p>

        <h2 data-estilo="3">6. Contacto</h2>
        <p>
          Para dudas sobre estos términos y condiciones, puedes contactarnos al{" "}
          <Pendiente>teléfono y correo de contacto</Pendiente>.
        </p>
      </DocumentoLegal>
    </>
  );
}
