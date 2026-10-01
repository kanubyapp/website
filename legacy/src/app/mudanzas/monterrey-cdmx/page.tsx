import type { Metadata } from "next";
import Image from "next/image";
import { SetHeaderNav } from "@/components/header-nav";
import { HeroQuoteButton } from "@/components/hero-quote-button";

export const metadata: Metadata = {
  title: "Mudanza de Monterrey a CDMX | Kanuby",
  description:
    "Mudanza de Monterrey a Ciudad de México con Kanuby. Traslado directo, seguimiento durante todo el trayecto y coordinación de fecha de entrega. Cotiza por WhatsApp.",
};

const HEADER_NAV_LINKS = [
  { href: "#cobertura", label: "Cobertura" },
  { href: "#preguntas", label: "Preguntas frecuentes" },
];

/*
 * Página hija de /mudanzas (spoke del modelo hub-and-spoke), apuntada a la
 * keyword "mudanza Monterrey CDMX". Mismo criterio que
 * /mudanzas/empresariales: reutiliza la tarjeta blanca del hero
 * (data-hero-card, fórmula de alto, --edge-gap) sin el sistema decorativo de
 * círculos hecho a mano para el hero del hub.
 *
 * Restricción de negocio explícita: Kanuby solo cubre de forma confiable el
 * sentido Monterrey → CDMX, no el regreso. El copy del hero lo dice de
 * frente, no lo esconde ni promete el viaje de vuelta.
 */
export default function MudanzasMonterreyCdmxPage() {
  return (
    <>
      <SetHeaderNav links={HEADER_NAV_LINKS} />

      <section className="w-full">
        <div
          data-hero-card
          className="relative mx-[var(--edge-gap)] mb-[var(--edge-gap)] h-[calc(85vh-var(--edge-gap)-var(--header-row))] overflow-hidden rounded-3xl bg-background shadow-[0_10px_48px_-8px_rgba(15,52,70,0.18)]"
        >
          <div className="grid h-full md:grid-cols-2">
            <div className="flex h-full flex-col justify-center px-4 py-8 md:px-16">
              <p className="text-ui text-sm font-medium tracking-wider text-brand-blue">
                Mudanzas foráneas de Monterrey a CDMX
              </p>
              <h1 className="mt-3 text-4xl leading-[1.1] tracking-tight text-brand-blue md:text-5xl">
                Mudanza de Monterrey a Ciudad de México
              </h1>
              <p className="mt-4 max-w-md text-lg text-brand-blue">
                Kanuby cubre el traslado directo de Monterrey a la Ciudad de
                México, con seguimiento durante todo el trayecto y
                coordinación de la fecha de entrega. Por ahora damos un
                servicio confiable solo en este sentido, Monterrey hacia
                CDMX; no operamos el viaje de regreso.
              </p>
              <HeroQuoteButton service="monterrey-cdmx" />
            </div>

            <div className="relative h-56 md:h-full">
              <Image
                src="/mudanzas/mudanza-nacional.webp"
                alt="Mudanza de Monterrey a Ciudad de México con Kanuby"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="cobertura" className="w-full pt-16 md:pt-20">
        <div className="mx-[var(--edge-gap)]">
          <div className="mx-auto max-w-3xl">
            <p className="text-ui text-sm font-medium tracking-wider text-brand-blue">
              COBERTURA
            </p>
            <h2 className="mt-3 text-3xl tracking-tight text-brand-blue md:text-4xl">
              Contenido en preparación
            </h2>

            <div className="mt-6 rounded-2xl border border-brand-orange/40 bg-surface p-5">
              <p className="text-ui text-sm font-semibold text-brand-blue">
                Contenido de ejemplo — pendiente de redacción final
              </p>
              <p className="mt-2 text-sm text-muted">
                Esta sección todavía no tiene el contenido definitivo de
                marketing. Aquí va el detalle de la ruta (tiempos estimados,
                tipo de transporte, seguimiento del envío) y la aclaración de
                que el servicio hoy solo opera Monterrey → CDMX, una vez que
                el equipo lo defina.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="preguntas" className="w-full pb-16 pt-16 md:pb-20 md:pt-20">
        <div className="mx-[var(--edge-gap)]">
          <div className="mx-auto max-w-3xl">
            <p className="text-ui text-sm font-medium tracking-wider text-brand-blue">
              PREGUNTAS FRECUENTES
            </p>
            <h2 className="mt-3 text-3xl tracking-tight text-brand-blue md:text-4xl">
              Contenido en preparación
            </h2>

            <div className="mt-6 rounded-2xl border border-brand-orange/40 bg-surface p-5">
              <p className="text-ui text-sm font-semibold text-brand-blue">
                Contenido de ejemplo — pendiente de redacción final
              </p>
              <p className="mt-2 text-sm text-muted">
                Esta sección todavía no tiene preguntas frecuentes
                definitivas. Aquí va el bloque de FAQ sobre la mudanza
                foránea (tiempos de entrega, seguro de la mercancía,
                cobertura solo de ida) una vez que el equipo lo defina.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
