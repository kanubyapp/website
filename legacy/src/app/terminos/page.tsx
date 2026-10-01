import type { Metadata } from "next";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Términos y condiciones | Kanuby",
  description:
    "Términos y condiciones del servicio de mudanzas y minibodegas de Kanuby en Monterrey.",
};

/*
 * Página de contenido plano, sin hero: main hereda el padding-top normal
 * del layout raíz (main:not(:has([data-hero-card])) en globals.css), no
 * hace falta nada especial aquí.
 *
 * max-w-3xl: la misma medida de lectura larga que ya usa el sitio para
 * párrafos de una sola columna (el intro de /mudanzas usa max-w-[42rem],
 * muy cerca de esto). Un documento legal es texto corrido, así que pide
 * una columna angosta, no el ancho completo de la página.
 */
export default function TerminosPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-ui text-sm font-medium tracking-wider text-brand-blue">
        TÉRMINOS Y CONDICIONES
      </p>
      <h1 className="font-heading mt-3 text-4xl tracking-tight text-brand-blue md:text-5xl">
        Términos y condiciones del servicio
      </h1>
      <p className="mt-4 text-lg text-brand-blue">
        Última actualización:{" "}
        <span className="font-semibold">[PENDIENTE — fecha de publicación]</span>
      </p>

      {/*
        Aviso de placeholder, bien visible arriba del documento — a
        propósito no es un párrafo más, es una caja con borde para que no
        se confunda con contenido ya validado si alguien solo escanea la
        página.
      */}
      <div className="mt-8 rounded-2xl border border-brand-orange/40 bg-surface p-5">
        <p className="text-ui text-sm font-semibold text-brand-blue">
          Contenido de ejemplo — pendiente de revisión legal
        </p>
        <p className="mt-2 text-sm text-muted">
          El texto de esta página es un modelo de referencia para cubrir la
          estructura mínima de un documento de términos y condiciones. No es
          un documento legal definitivo: los datos de la empresa, los plazos
          y las condiciones específicas deben ser revisados y validados por
          un abogado antes de publicarse como versión final.
        </p>
      </div>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            1. Identificación de la empresa
          </h2>
          <p className="mt-3 text-base text-muted">
            Kanuby (&ldquo;Kanuby&rdquo;, &ldquo;nosotros&rdquo;) es el nombre
            comercial bajo el que se ofrecen los servicios descritos en este
            documento en Monterrey, Nuevo León, y su área metropolitana.
          </p>
          <ul className="mt-3 space-y-1.5 text-base text-muted">
            <li>
              Razón social:{" "}
              <span className="font-semibold text-brand-blue">
                [PENDIENTE — razón social registrada]
              </span>
            </li>
            <li>
              RFC:{" "}
              <span className="font-semibold text-brand-blue">
                [PENDIENTE]
              </span>
            </li>
            <li>
              Domicilio fiscal:{" "}
              <span className="font-semibold text-brand-blue">
                [PENDIENTE]
              </span>
            </li>
            <li>
              Teléfono de contacto:{" "}
              <a href={PHONE_HREF} className="font-semibold text-brand-blue underline underline-offset-2">
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            2. Descripción de los servicios
          </h2>
          <p className="mt-3 text-base text-muted">
            Kanuby ofrece servicios de mudanza local, mudanza nacional,
            mudanza corporativa (oficinas y espacios de trabajo) y renta de
            minibodegas, todos con personal y transporte propio, sin
            subcontratar a terceros. El alcance exacto de cada servicio
            (empaque, desarmado y armado de muebles, materiales incluidos,
            tiempos estimados) se confirma con el cliente al momento de
            cotizar, antes de contratar.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            3. Condiciones de contratación
          </h2>
          <p className="mt-3 text-base text-muted">
            La contratación del servicio se confirma una vez que el cliente
            acepta la cotización enviada por Kanuby, ya sea por WhatsApp,
            teléfono o el medio de contacto que se haya usado. La cotización
            incluye el alcance del servicio, la fecha acordada y el costo
            total.
          </p>
          <p className="mt-3 text-base text-muted">
            [PENDIENTE — definir aquí condiciones de pago (anticipo,
            liquidación, medios de pago aceptados) y cualquier requisito
            previo a la mudanza, como acceso al inmueble o disponibilidad de
            elevador/estacionamiento.]
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            4. Responsabilidad sobre los bienes
          </h2>
          <p className="mt-3 text-base text-muted">
            Kanuby toma medidas de cuidado y empaque para proteger los bienes
            trasladados o almacenados durante todo el servicio. [PENDIENTE —
            definir aquí el alcance real de la responsabilidad de Kanuby
            ante daño, pérdida o robo: límites de cobertura, si existe algún
            seguro asociado al servicio, el procedimiento para reportar un
            incidente y los plazos para hacerlo.]
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            5. Cancelaciones y reprogramaciones
          </h2>
          <p className="mt-3 text-base text-muted">
            [PENDIENTE — definir aquí con cuánta anticipación se puede
            cancelar o reprogramar un servicio sin costo, si aplica algún
            cargo por cancelación tardía o no presentarse en la fecha
            acordada, y cómo se gestiona la devolución de un anticipo en
            caso de cancelación.]
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-brand-blue md:text-3xl">
            6. Contacto
          </h2>
          <p className="mt-3 text-base text-muted">
            Para dudas sobre estos términos y condiciones, puedes
            contactarnos por teléfono al{" "}
            <a href={PHONE_HREF} className="font-semibold text-brand-blue underline underline-offset-2">
              {PHONE_DISPLAY}
            </a>{" "}
            o por{" "}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-blue underline underline-offset-2"
            >
              WhatsApp
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
