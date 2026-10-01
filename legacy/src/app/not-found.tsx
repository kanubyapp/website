import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { KanubyLogo } from "@/components/kanuby-logo";

export const metadata: Metadata = {
  title: "Página no encontrada | Kanuby",
  robots: { index: false, follow: true },
};

/**
 * 404 del sitio completo. Página aislada a propósito, no una sección más
 * dentro de <main>: el header y el footer normales del layout raíz siguen
 * montados detrás (Next.js envuelve not-found.tsx en el layout raíz, no hay
 * forma de saltárselo), pero esta capa los tapa por completo con
 * fixed inset-0 — así no aparece un segundo logo (el del header, arriba a
 * la izquierda) ni el nav/botón de WhatsApp encima del fondo naranja. z-[100]
 * queda por encima de cualquier otra cosa del sitio (el header usa z-50, el
 * pill de WhatsApp z-40, el modal de contacto z-60 — nada de eso debería
 * verse aquí de todas formas, pero el z-index lo garantiza).
 */
export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-brand-orange px-6 py-12">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <Link href="/" className="inline-flex w-fit text-white">
          <KanubyLogo className="h-8 w-auto" />
          <span className="sr-only">Kanuby</span>
        </Link>

        <Image
          src="/404-kanuby.webp"
          alt=""
          aria-hidden="true"
          width={641}
          height={426}
          className="mt-10 h-auto w-full max-w-xs"
          priority
        />

        {/*
          text-3xl/4xl (30/36px): califica como "texto grande" en WCAG por
          tamaño solo (umbral 24px regular), así que el blanco sobre este
          naranja pasa AA (3:1) con margen — medido en vivo, ver reporte.
        */}
        <h1 className="font-heading mt-8 text-3xl text-white md:text-4xl">
          No encontramos esta página pero...
        </h1>

        {/*
          text-[1.1875rem] (19px) font-semibold: el mismo mínimo ya
          establecido en el sistema (globals.css, --color-brand-orange) para
          que un texto normal sobre este naranja siga calificando como
          "texto grande" y pase AA — blanco a 16px/400 normal NO pasa aquí
          (3.44:1, por debajo del 4.5:1 que exige texto de tamaño normal).
        */}
        <p className="text-ui mt-4 text-[1.1875rem] font-semibold text-white">
          Lo mejor es volver al inicio
        </p>

        {/*
          Sobre fondo naranja: relleno azul de marca, texto blanco — la
          regla de botones sólidos del sistema (globals.css,
          --color-brand-orange). Blanco sobre #0f3446 da 12.31:1.
        */}
        <Link
          href="/"
          className="text-ui mt-6 inline-flex items-center rounded-full bg-brand-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-blue-hover"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
