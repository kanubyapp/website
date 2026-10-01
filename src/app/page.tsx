import type { Metadata } from "next";

/*
 * noindex temporal: la home todavía no tiene contenido real (un solo H1,
 * sin secciones), y contenido delgado indexado perjudica el dominio
 * completo. Retirar este noindex cuando la página tenga contenido real.
 */
export const metadata: Metadata = {
  title: "Kanuby | Mudanzas y minibodegas en Monterrey",
  description:
    "Mudanzas locales, nacionales y corporativas y renta de minibodegas en Monterrey. Cotiza tu mudanza con Kanuby.",
  robots: { index: false, follow: true },
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="text-4xl tracking-tight md:text-5xl">
        Mudanzas y minibodegas en Monterrey
      </h1>
    </div>
  );
}
