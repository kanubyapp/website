import type { Metadata } from "next";
import Link from "next/link";
import { CtaGroup } from "@/components/cta-group";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { Hero } from "@/components/hero";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { ReviewsGrid } from "@/components/reviews-grid";
import {
  StorageSizeCards,
  type StorageSize,
} from "@/components/storage-size-cards";
import { CALCULADORA_HREF } from "@/lib/contact";
import { miniBodegasReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Mini bodegas en Monterrey | Kanuby",
  description:
    "Renta de mini bodegas en Monterrey: espacios vigilados, acceso flexible y contratos por mes. Elige el tamaño que necesitas y cotiza por WhatsApp.",
};

/*
 * TODO(contenido-sin-validar): TAMAÑOS Y PRECIOS.
 *
 * Ninguna medida ni precio está confirmado, así que no se inventan: las tarjetas
 * se publican con valores que se leen como pendientes ("00 m²", "Precio
 * pendiente") en vez de con cifras plausibles pero falsas. Una cifra inventada
 * que se cuela a producción es un compromiso comercial que alguien va a tener
 * que sostener por teléfono.
 *
 * Al llegar los datos reales solo hay que sustituir este array; el componente
 * ya está estructurado para recibir nombre, m², equivalencia y precio mensual.
 */
const storageSizes: StorageSize[] = [
  {
    name: "Bodega chica",
    area: "00 m²",
    equivalence: "Equivalencia pendiente de confirmar",
    monthlyPrice: "Precio pendiente",
  },
  {
    name: "Bodega mediana",
    area: "00 m²",
    equivalence: "Equivalencia pendiente de confirmar",
    monthlyPrice: "Precio pendiente",
  },
  {
    name: "Bodega grande",
    area: "00 m²",
    equivalence: "Equivalencia pendiente de confirmar",
    monthlyPrice: "Precio pendiente",
  },
];

// TODO(contenido-sin-validar): qué incluye la renta. Los cuatro ejes vienen del
// brief; el texto de cada uno está sin confirmar y son justo los puntos que
// deciden la contratación (acceso, vigilancia, seguro, contrato mínimo).
const rentalIncludes = [
  {
    title: "Acceso a tu bodega",
    description: "Horario y condiciones de acceso pendientes de confirmar.",
  },
  {
    title: "Vigilancia",
    description:
      "Esquema de vigilancia y control de acceso pendiente de confirmar.",
  },
  {
    title: "Seguro",
    description:
      "Cobertura sobre lo almacenado pendiente de confirmar. No afirmar que existe hasta tener el dato.",
  },
  {
    title: "Contrato mínimo",
    description: "Plazo mínimo de renta pendiente de confirmar.",
  },
];

// TODO(contenido-sin-validar): el proceso real de contratación no está descrito
// por nadie. Los cuatro pasos son una hipótesis razonable, no el flujo de Kanuby.
const processSteps = [
  {
    title: "Eliges el tamaño",
    description:
      "Te ayudamos a estimar cuánto espacio necesitas según lo que vas a guardar.",
  },
  {
    title: "Contratas",
    description: "Condiciones y plazo de contratación pendientes de confirmar.",
  },
  {
    title: "Llevas tus cosas",
    description:
      "Puedes traerlas tú o contratar el traslado con nuestro equipo de mudanzas.",
  },
  {
    title: "Entras cuando lo necesites",
    description: "Condiciones de acceso pendientes de confirmar.",
  },
];

const otherServices = [
  {
    href: "/mudanzas",
    title: "Mudanzas en Monterrey",
    description:
      "Mudanzas locales de casa o departamento con equipo propio, en Monterrey y su área metropolitana.",
  },
  {
    href: "/mudanzas/empresariales",
    title: "Mudanzas empresariales",
    description:
      "Traslado de oficinas, mobiliario y archivo con la menor interrupción posible de la operación.",
  },
  {
    href: "/mudanzas/monterrey-cdmx",
    title: "Mudanza Monterrey a CDMX",
    description:
      "Servicio en el corredor Monterrey–Ciudad de México, puerta a puerta.",
  },
];

// TODO(contenido): respuestas pendientes de confirmar con el cliente.
const faqItems: FaqItem[] = [
  { question: "¿Qué tamaño de bodega necesito?", answer: "Pendiente de confirmar" },
  { question: "¿Cuánto cuesta rentar una mini bodega al mes?", answer: "Pendiente de confirmar" },
  { question: "¿Puedo acceder a mi bodega cuando quiera?", answer: "Pendiente de confirmar" },
  { question: "¿Hay contrato mínimo?", answer: "Pendiente de confirmar" },
  { question: "¿Qué medidas de seguridad tienen?", answer: "Pendiente de confirmar" },
  { question: "¿Puedo guardar cualquier tipo de objeto?", answer: "Pendiente de confirmar" },
  { question: "¿Kanuby me lleva las cosas a la bodega?", answer: "Pendiente de confirmar" },
];

// TODO(SEO): activar el JSON-LD de FAQPage SOLO cuando las respuestas reales
// estén escritas arriba. Publicarlo con "Pendiente de confirmar" como
// acceptedAnswer es structured data engañoso. Al descomentar, montarlo dentro
// del <section> de FAQ:
//
// <script
//   type="application/ld+json"
//   dangerouslySetInnerHTML={{
//     __html: JSON.stringify({
//       "@context": "https://schema.org",
//       "@type": "FAQPage",
//       mainEntity: faqItems.map((item) => ({
//         "@type": "Question",
//         name: item.question,
//         acceptedAnswer: { "@type": "Answer", text: item.answer },
//       })),
//     }),
//   }}
// />

export default function MiniBodegasPage() {
  return (
    <>
      {/* TODO(contenido-sin-validar): el subtítulo afirma vigilancia y
          flexibilidad de plazo. Ninguna de las dos está confirmada. */}
      <Hero
        title="Mini bodegas en Monterrey"
        subtitle="Espacio vigilado y contratos flexibles: renta solo por el tiempo que lo necesites, sin mudarte de ciudad para guardar tus cosas."
        secondaryHref={CALCULADORA_HREF}
        secondaryLabel="Calcular mi espacio"
      />

      {/* 1. Tamaños disponibles */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
          Tamaños disponibles
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Elige según lo que vas a guardar. Si no estás seguro, te ayudamos a
          estimarlo.
        </p>
        <StorageSizeCards sizes={storageSizes} />
      </section>

      {/* 2. Calculadora de espacio — contenedor listo, lógica en otro frente */}
      {/* El scroll-margin-top ya lo aplica la regla global de [id] en
          globals.css, a partir de --header-offset. */}
      <section id="calculadora" className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
            ¿Cuánto espacio necesitas?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Dinos qué vas a guardar y te decimos qué tamaño de bodega te queda.
          </p>

          {/*
            TODO(calculadora): slot de la calculadora de espacio. Frente de
            trabajo aparte: aquí va el componente interactivo que, a partir de un
            inventario de muebles, recomienda un tamaño de los de arriba.
            Depende de tener las medidas reales de cada bodega.
          */}
          <div className="mt-12 flex min-h-64 items-center justify-center rounded-lg border border-border bg-background">
            <p className="text-ui text-sm text-muted">
              Calculadora de espacio · pendiente
            </p>
          </div>
        </div>
      </section>

      {/* 3. Qué incluye */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
          Qué incluye la renta
        </h2>
        <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {rentalIncludes.map((item) => (
            <li key={item.title} className="flex gap-4">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <div>
                <h3 className="font-heading text-lg text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-base text-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Cómo funciona */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
            Cómo funciona
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
            {processSteps.map((step, index) => (
              <li key={step.title} className="border-t border-brand-blue/20 pt-6">
                <span
                  aria-hidden="true"
                  className="font-heading block text-4xl text-brand-blue"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading mt-4 text-lg text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-base text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/*
        5. Prueba social. Montada pero hoy no renderiza: miniBodegasReviews está
        vacío a propósito. Ver TODO en src/lib/reviews.ts — las reseñas de
        mudanzas NO se reutilizan aquí.
      */}
      <ReviewsGrid reviews={miniBodegasReviews} />

      {/* 6. Otros servicios — enlazado interno */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
          Otros servicios
        </h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {otherServices.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-lg border border-border p-7 transition-colors hover:border-brand-blue"
              >
                <h3 className="font-heading text-xl text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-base text-muted">
                  {service.description}
                </p>
                <span className="text-ui mt-6 inline-flex items-center gap-2 text-sm text-brand-blue">
                  Ver servicio
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Preguntas frecuentes */}
      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
        <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-12 max-w-3xl">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* 8. Cierre */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <h2 className="text-3xl tracking-tight md:text-4xl">
              ¿Necesitas espacio ahora?
            </h2>
            {/* TODO(contenido-sin-validar): "disponibilidad al momento" es una
                promesa operativa sin confirmar. */}
            <p className="mt-4 text-lg text-muted">
              Escríbenos y te decimos qué tamaño te conviene y qué
              disponibilidad hay.
            </p>
            <CtaGroup
              className="mt-9"
              secondaryHref={CALCULADORA_HREF}
              secondaryLabel="Calcular mi espacio"
            />
          </div>
        </div>
      </section>
    </>
  );
}
