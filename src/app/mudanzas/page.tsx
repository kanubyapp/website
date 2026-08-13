import type { Metadata } from "next";
import Link from "next/link";
import { CtaGroup } from "@/components/cta-group";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { Hero } from "@/components/hero";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { QuoterIllustration } from "@/components/quoter-illustration";
import { ReviewsGrid } from "@/components/reviews-grid";
import {
  ServiceTypeCards,
  type ServiceTypeCard,
} from "@/components/service-type-cards";
import { mudanzasReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Mudanzas en Monterrey | Kanuby",
  description:
    "Servicio de mudanzas en Monterrey y su área metropolitana. Equipo propio, más de 20 años de experiencia. Cotiza por WhatsApp.",
};

/*
 * TODO(contenido-sin-validar): los tres títulos están confirmados; las
 * descripciones describen operación real sin validar — el alcance del área
 * metropolitana, el "puerta a puerta" del corredor a CDMX y la "menor
 * interrupción posible" de la empresarial. Confirmar con el cliente antes de
 * publicar.
 *
 * NO añadir aquí un bloque de fletes. Se probó y se descartó: "fletes" atrae
 * intención de bajo valor (traslado de un solo mueble) y compite contra la
 * keyword objetivo de esta página, que es "mudanzas Monterrey". Si en algún
 * momento hay que cubrir fletes, va en su propia página, no diluyendo esta.
 */
/*
 * Tarjetas NO navegables: no llevan a ninguna página, ni siquiera las dos que
 * tienen una propia. Cada una abre el modal de contacto con su `serviceId` ya
 * elegido.
 */
const serviceTypes: ServiceTypeCard[] = [
  {
    serviceId: "local",
    eyebrow: "Casa y departamento",
    title: "Mudanza local",
    description:
      "Mudanza de casa o departamento dentro de Monterrey y su área metropolitana.",
  },
  {
    serviceId: "monterrey-cdmx",
    eyebrow: "Corredor nacional",
    title: "Mudanza Monterrey–CDMX",
    description:
      "Traslado en el corredor Monterrey a Ciudad de México, puerta a puerta.",
  },
  {
    serviceId: "oficinas",
    eyebrow: "Oficinas y empresas",
    title: "Mudanza empresarial",
    description:
      "Traslado de oficinas, mobiliario, equipo y archivo con la menor interrupción posible de la operación.",
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

      {/*
        Tipos de servicio.

        A ancho completo y con el lateral en --edge-gap, el mismo token que
        separa del viewport a la tarjeta del hero: las tarjetas arrancan y
        terminan en su mismo eje. Por eso NO lleva el `mx-auto max-w-6xl px-5`
        del resto de secciones de la página.
      */}
      <section className="px-[var(--edge-gap)] py-20 md:py-28">
        <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
          Tipos de servicio
        </h2>
        {/*
          El marcado de las tarjetas vive en un componente cliente: cada una
          abre el modal de contacto, así que necesita manejador de eventos. La
          página se queda como componente de servidor.
        */}
        <ServiceTypeCards cards={serviceTypes} vertical="mudanzas" />
      </section>

      {/* 1. Por qué Kanuby */}
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
          className="bg-gradient-quoter group grid items-center gap-10 rounded-3xl p-8 md:grid-cols-2 md:gap-16 md:p-12"
        >
          <div>
            {/*
              TODO(contenido-sin-validar): copy de negocio. Placeholder a
              propósito: sin cifras, sin tiempos de respuesta y sin promesas de
              precio hasta que el cliente defina qué puede prometer el cotizador.
            */}
            {/*
              Texto en BLANCO, no en azul: sobre este gradiente el azul de marca
              se hunde. Blanco sólido da 4.78:1 en el punto más claro (#bc531c),
              el mismo caso peor documentado en --gradient-quoter.
            */}
            <h2 className="text-3xl tracking-tight text-white md:text-4xl">
              Calcula el costo de tu mudanza
            </h2>
            <p className="mt-4 text-lg text-white">
              Dinos qué necesitas mover y desde dónde.
            </p>
            {/* Mismo tratamiento que el primario del hero: relleno blanco,
                texto azul, rounded-full. Hover: solo se atenúa el blanco. */}
            <span className="text-ui mt-8 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white px-7 py-4 text-base font-medium text-brand-blue transition-colors group-hover:bg-white/90">
              Cotizar mi mudanza
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          <div className="md:justify-self-end">
            <QuoterIllustration />
          </div>
        </Link>
      </section>

      {/* 3. Qué incluye el servicio */}
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

      {/* 4. Prueba social — reviews reales de Google, texto verbatim */}
      <ReviewsGrid reviews={mudanzasReviews} />

      {/*
        5. Cross-sell de mini bodegas — enlazado interno.

        Antes esto era "Otros servicios" con tres tarjetas. Dos (empresariales y
        Monterrey–CDMX) se fueron: ya se enlazan desde "Tipos de servicio", y
        repetirlas aquí no añadía nada. Queda mini bodegas, que es la única otra
        vertical y el único cruce que no está dicho en ninguna otra parte de la
        página.

        Tarjeta única a ancho completo, no una retícula con dos huecos. Toda
        ella es el enlace, igual que el CTA del cotizador: por eso el pie es un
        <span> con aspecto de enlace y no otro <a>.
      */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Link
          href="/mini-bodegas"
          className="group block rounded-lg border border-border p-8 transition-colors hover:border-brand-blue md:p-12"
        >
          {/*
            TODO(contenido-sin-validar): el ángulo (Kanuby cubre la mudanza Y el
            espacio donde guardar, sin segundo proveedor) sale del brief, pero la
            redacción es del asistente. Falta confirmar que las mini bodegas son
            propias y que el traslado entre domicilio y bodega lo hace el mismo
            equipo, que es justo lo que promete el texto.
          */}
          <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
            ¿Necesitas guardar tus cosas?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Kanuby hace las dos cosas: la mudanza y el espacio donde guardar. Si
            entre una casa y la siguiente hay semanas de por medio, tus muebles
            esperan en una de nuestras mini bodegas y los movemos nosotros
            mismos, sin meter a un segundo proveedor.
          </p>
          <span className="text-ui mt-8 inline-flex items-center gap-2 text-base text-brand-blue">
            Ver mini bodegas
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
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
