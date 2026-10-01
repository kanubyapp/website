import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini bodegas en Monterrey | Kanuby",
  description:
    "Renta de mini bodegas en Monterrey: espacios vigilados, acceso flexible y contratos por mes. Elige el tamaño que necesitas y cotiza por WhatsApp.",
  robots: { index: false, follow: true },
};

/*
 * Página en pausa: el contenido anterior (tamaños, calculadora, qué incluye,
 * proceso, reseñas, FAQ y cierre) está en el commit 25fd5d7 y se recupera con
 * `git show 25fd5d7:src/app/mini-bodegas/page.tsx`.
 *
 * noindex temporal: solo tiene un H1 ("Próximamente"), contenido delgado que
 * indexado perjudica el dominio completo. Retirar este noindex cuando la
 * página tenga contenido real.
 */
export default function MiniBodegasPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="text-4xl tracking-tight md:text-5xl">Próximamente</h1>
    </section>
  );
}
