import type { Metadata } from "next";
import Image from "next/image";
import { SetHeaderNav } from "@/components/header-nav";
import { HeroQuoteButton } from "@/components/hero-quote-button";

export const metadata: Metadata = {
  title: "Mudanzas de Oficinas en Monterrey | Kanuby",
  description:
    "Mudanza de oficinas y espacios de trabajo en Monterrey. Planeación por etapas, equipo propio y experiencia moviendo mobiliario y equipo de cómputo. Cotiza por WhatsApp.",
};

const HEADER_NAV_LINKS = [
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#preguntas", label: "Preguntas frecuentes" },
];

/*
 * Página hija de /mudanzas (spoke del modelo hub-and-spoke), apuntada a la
 * keyword "mudanza de oficinas Monterrey". Reutiliza el mismo mecanismo de
 * tarjeta blanca (data-hero-card, fórmula de alto, --edge-gap) del hub, pero
 * SIN el sistema decorativo de círculos (.hero-blob-solid-v2 /
 * .hero-glass-orb-v4) del hero de /mudanzas — es un ajuste fino hecho a mano
 * para esa página específica, y replicarlo aquí sería duplicación sin
 * aportar nada a "sigue la estructura visual".
 */
export default function MudanzasEmpresarialesPage() {
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
                Mudanzas empresariales en Monterrey
              </p>
              <h1 className="mt-3 text-4xl leading-[1.1] tracking-tight text-brand-blue md:text-5xl">
                Mudanza de Oficinas y Espacios de Trabajo en Monterrey
              </h1>
              <p className="mt-4 max-w-md text-lg text-brand-blue">
                En Kanuby coordinamos la mudanza de tu oficina por etapas,
                para que tu operación se detenga lo menos posible. Equipo
                propio, sin subcontratar, con experiencia moviendo
                mobiliario, equipo de cómputo y archivo de empresas en
                Monterrey.
              </p>
              <HeroQuoteButton service="oficinas" />
            </div>

            <div className="relative h-56 md:h-full">
              <Image
                src="/mudanzas/mudanza-empresarial.webp"
                alt="Mudanza de oficina de Kanuby en Monterrey"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="proceso" className="w-full pt-16 md:pt-20">
        <div className="mx-[var(--edge-gap)]">
          <div className="mx-auto max-w-3xl">
            <p className="text-ui text-sm font-medium tracking-wider text-brand-blue">
              CÓMO TRABAJAMOS
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
                marketing. Aquí va la descripción del proceso de una mudanza
                empresarial (levantamiento, planeación por etapas o fines de
                semana, desarmado/armado de mobiliario, protección de equipo
                de cómputo y archivo) una vez que el equipo lo defina.
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
                definitivas. Aquí va el bloque de FAQ sobre mudanzas
                empresariales (horarios fuera de oficina, cobertura de
                pólizas, tiempos estimados por tamaño de oficina) una vez que
                el equipo lo defina.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
