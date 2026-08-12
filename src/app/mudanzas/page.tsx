import type { Metadata } from "next";
import Link from "next/link";
import { CtaGroup } from "@/components/cta-group";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { Hero } from "@/components/hero";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { QuoterIllustration } from "@/components/quoter-illustration";
import { ReviewsGrid } from "@/components/reviews-grid";
import { mudanzasReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Mudanzas en Monterrey | Kanuby",
  description:
    "Servicio de mudanzas en Monterrey y su área metropolitana. Equipo propio, más de 20 años de experiencia. Cotiza por WhatsApp.",
};

/*
 * TODO(contenido-sin-validar): ambos bloques describen operación real y los
 * redactó el asistente a partir del brief. "Levantamos el inventario",
 * "protegemos los muebles" y "los acomodamos en el domicilio destino" están sin
 * confirmar.
 *
 * NO añadir aquí un bloque de fletes. Se probó y se descartó: "fletes" atrae
 * intención de bajo valor (traslado de un solo mueble) y compite contra la
 * keyword objetivo de esta página, que es "mudanzas Monterrey". Si en algún
 * momento hay que cubrir fletes, va en su propia página, no diluyendo esta.
 */
const serviceTypes = [
  {
    title: "Mudanza local",
    description:
      "Mudanzas de casa o departamento dentro de Monterrey y su área metropolitana. Levantamos el inventario, protegemos los muebles y los acomodamos en el domicilio destino.",
  },
  {
    title: "Mudanza de oficina",
    description:
      "Traslado de mobiliario, equipo y archivo con la menor interrupción posible de la operación.",
    href: "/mudanzas/empresariales",
    linkLabel: "Ver mudanzas empresariales",
  },
];

// TODO(contenido-sin-validar): los cuatro TÍTULOS vienen del brief y están
// confirmados. Las DESCRIPCIONES las redactó el asistente inventando el detalle
// operativo; sustituir por lo que confirme el cliente antes de publicar.
const serviceIncludes = [
  {
    title: "Personal propio capacitado",
    // TODO(contenido-sin-validar): "cuadrillas de plantilla", "entrenadas en maniobra y carga".
    description:
      "Cuadrillas de plantilla, entrenadas en maniobra y carga. No subcontratamos a terceros.",
  },
  {
    title: "Camión equipado",
    // TODO(contenido-sin-validar): "rampa", "amarres", "diablos de carga".
    // Nadie ha confirmado con qué van equipadas las unidades.
    description:
      "Unidades con rampa, amarres y diablos de carga para mover muebles y electrodomésticos sin improvisar.",
  },
  {
    title: "Protección de muebles",
    // TODO(contenido-sin-validar): "emplayado", "cobertores".
    description:
      "Emplayado y cobertores para proteger superficies, esquinas y tapicería durante la maniobra y el traslado.",
  },
  {
    title: "Carga y descarga",
    // TODO(contenido-sin-validar): "acomodamos donde nos indiques" implica un
    // alcance de servicio que no está confirmado.
    description:
      "Nosotros subimos, acomodamos en la unidad y descargamos en el domicilio destino.",
  },
];

// TODO(contenido): confirmar con operaciones y añadir a la lista de arriba.
//   - ¿El servicio incluye empaque (cajas, material, mano de obra)?
//   - ¿Incluye desarmado y armado de muebles?
//   - ¿Hay seguro de carga o alguna responsabilidad formal por daños?
// Sin dato confirmado no se pinta nada en pantalla: son justo las tres dudas
// que más pesan en la decisión y no se pueden insinuar.

// TODO(contenido-sin-validar): los cuatro pasos vienen del brief, pero el
// detalle de cada uno lo redactó el asistente. Nadie ha descrito el proceso real
// de Kanuby; verificar paso por paso con operaciones.
const processSteps = [
  {
    title: "Contacto y cotización",
    // TODO(contenido-sin-validar): "levantamos el inventario" — no sabemos si la
    // cotización es por inventario, por visita previa o por metros cúbicos.
    description:
      "Nos escribes por WhatsApp o llamas. Levantamos el inventario y te damos precio.",
  },
  {
    title: "Agenda de fecha",
    // TODO(contenido-sin-validar): "tamaño de unidad y cuadrilla" — asume que
    // ambos son variables y que se pactan con el cliente.
    description:
      "Cerramos día y hora de llegada, y el tamaño de unidad y cuadrilla que necesitas.",
  },
  {
    title: "Día de la mudanza",
    description:
      "Llegamos a la hora acordada, protegemos los muebles y cargamos la unidad.",
  },
  {
    title: "Entrega",
    // TODO(contenido-sin-validar): "acomodamos donde nos indiques".
    description:
      "Descargamos en el domicilio destino y acomodamos donde nos indiques.",
  },
];

const differentiators = [
  {
    title: "Personal propio",
    description:
      "La cuadrilla que llega a tu casa es de Kanuby. No subcontratamos fleteros ni personal por evento, que es de donde salen la mayoría de los problemas en una mudanza.",
  },
  {
    title: "Más de 20 años operando",
    // TODO(contenido-sin-validar): "casas y oficinas" da por hecho que los 20
    // años cubren ambos verticales.
    description:
      "Dos décadas moviendo casas y oficinas en Monterrey. No es una operación que se armó el año pasado.",
  },
  {
    title: "Monterrey y área metropolitana",
    // TODO(contenido-sin-validar): la lista de municipios la inventó el
    // asistente a partir de "área metropolitana". Confirmar cobertura real —
    // enumerar un municipio donde no se da servicio genera leads muertos.
    description:
      "Cobertura en San Pedro, San Nicolás, Guadalupe, Apodaca, Escobedo, Santa Catarina y el resto del área metropolitana.",
  },
];

const otherServices = [
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
  {
    href: "/mini-bodegas",
    title: "Mini bodegas",
    description:
      "Renta de espacio seguro por mes para guardar muebles, inventario o archivo.",
  },
];

// TODO(contenido): respuestas pendientes de confirmar con el cliente.
const faqItems: FaqItem[] = [
  { question: "¿Cuánto cuesta una mudanza en Monterrey?", answer: "Pendiente de confirmar" },
  { question: "¿Con cuánta anticipación debo agendar?", answer: "Pendiente de confirmar" },
  { question: "¿Qué pasa si algo se daña durante la mudanza?", answer: "Pendiente de confirmar" },
  { question: "¿Trabajan fines de semana?", answer: "Pendiente de confirmar" },
  { question: "¿Qué zonas cubren?", answer: "Pendiente de confirmar" },
  { question: "¿Necesito empacar yo mis cosas?", answer: "Pendiente de confirmar" },
];

// TODO(SEO): activar el JSON-LD de FAQPage SOLO cuando las respuestas reales
// estén escritas arriba. Publicarlo con "Pendiente de confirmar" como acceptedAnswer
// es contenido basura para Google y puede costar una acción manual por structured
// data engañoso. Al descomentar, montarlo dentro del <section> de FAQ:
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

export default function MudanzasPage() {
  return (
    <>
      <Hero
        title="Mudanzas en Monterrey"
        subtitle="Equipo propio, nunca subcontratamos. Más de 20 años haciendo mudanzas en Monterrey, Nuevo León y su área metropolitana."
      />

      {/* Tipos de servicio */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
          Tipos de servicio
        </h2>
        <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {serviceTypes.map((service) => (
            <li key={service.title} className="flex gap-4">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <div>
                <h3 className="font-heading text-lg text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-base text-muted">
                  {service.description}
                </p>
                {service.href && (
                  <Link
                    href={service.href}
                    className="text-ui mt-3 inline-flex items-center gap-2 text-sm text-brand-blue underline underline-offset-4"
                  >
                    {service.linkLabel}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 1. Qué incluye el servicio */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
          Qué incluye el servicio
        </h2>
        <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {serviceIncludes.map((item) => (
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

      {/* 2. Cómo funciona */}
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
        CTA del cotizador. Toda la sección es un único enlace a
        /cotizar-mudanza: por eso el "botón" es un <span> con aspecto de botón y
        no otro enlace — anidar interactivos dentro de un enlace rompe la
        navegación por teclado y lectores de pantalla.
      */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Link
          href="/cotizar-mudanza"
          className="group grid items-center gap-10 rounded-3xl border border-border p-8 transition-colors hover:border-brand-blue md:grid-cols-2 md:gap-16 md:p-12"
        >
          <div>
            {/*
              TODO(contenido-sin-validar): copy de negocio. Placeholder a
              propósito: sin cifras, sin tiempos de respuesta y sin promesas de
              precio hasta que el cliente defina qué puede prometer el cotizador.
            */}
            <h2 className="text-3xl tracking-tight md:text-4xl">
              Calcula el costo de tu mudanza
            </h2>
            <p className="mt-4 text-lg text-muted">
              Dinos qué necesitas mover y desde dónde.
            </p>
            <span className="text-ui mt-8 inline-flex items-center gap-2.5 whitespace-nowrap rounded-md bg-brand-orange-accessible px-7 py-4 text-base font-medium text-white transition-colors group-hover:bg-brand-orange-accessible-hover">
              Cotizar mi mudanza
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          <div className="md:justify-self-end">
            <QuoterIllustration />
          </div>
        </Link>
      </section>

      {/* 3. Por qué Kanuby */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
          Por qué Kanuby
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {differentiators.map((item) => (
            <div key={item.title}>
              <h3 className="font-heading text-xl text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-base text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Prueba social — reviews reales de Google, texto verbatim */}
      <ReviewsGrid reviews={mudanzasReviews} />

      {/* 5. Otros servicios — enlazado interno */}
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

      {/* 6. Preguntas frecuentes */}
      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
        <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-12 max-w-3xl">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* 7. Cierre */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <h2 className="text-3xl tracking-tight md:text-4xl">
              ¿Listo para agendar tu mudanza?
            </h2>
            {/* TODO(contenido-sin-validar): "precio el mismo día" es una promesa
                de tiempo de respuesta que nadie ha confirmado. */}
            <p className="mt-4 text-lg text-muted">
              Cuéntanos qué necesitas mover y te damos precio el mismo día.
            </p>
            <CtaGroup className="mt-9" />
          </div>
        </div>
      </section>
    </>
  );
}
