import Link from "next/link";
import { navLinks } from "@/lib/nav";

// TODO(pagina-pendiente): /terminos y /privacidad NO existen todavía como rutas.
// Estos dos enlaces devuelven 404 hasta que se creen las páginas. No publicar a
// producción sin crearlas: un enlace legal roto en el footer se indexa y además
// es lo primero que se revisa en cualquier auditoría.
const legalLinks = [
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/privacidad", label: "Aviso de privacidad" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    /*
     * Tarjeta, no franja: márgenes laterales iguales a los del header pill y
     * margen inferior para que se vea fondo debajo.
     *
     * Fondo SÓLIDO en azul de marca, no cristal: el footer lleva texto de
     * lectura y enlaces, y la regla 1 del sistema reserva el cristal al chrome.
     */
    <footer className="px-4 pb-4 md:px-6">
      <div className="rounded-3xl bg-gradient-footer px-6 pb-28 pt-12 text-white md:px-12 md:pb-14 md:pt-16">
        <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <div>
            {/* Logotipo: naranja de marca a propósito, ver nota en site-header. */}
            <Link
              href="/"
              className="font-heading text-2xl font-semibold lowercase tracking-tight text-brand-orange transition-colors hover:text-brand-orange-hover"
            >
              kanuby
            </Link>
            {/*
              Descripción actualizada: decía "locales, nacionales y corporativas".
              "Nacionales" contradice la arquitectura acordada — no hay cobertura
              nacional real, por eso el corredor se llama Monterrey–CDMX.
            */}
            <p className="mt-4 max-w-sm text-base text-white/70">
              Mudanzas y mini bodegas en Monterrey y su área metropolitana.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-sm font-medium uppercase tracking-wider text-white">
              Descubre más
            </h2>
            <ul className="mt-4 space-y-3">
              {navLinks
                .flatMap((link) => [link, ...(link.children ?? [])])
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-ui text-base text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-medium uppercase tracking-wider text-white">
              Legal
            </h2>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ui text-base text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/*
            TODO(asset-pendiente): gráfico del vehículo. No existe en el repo —
            public/ solo tiene los SVG por defecto de Next. Slot con la relación
            de aspecto puesta para que el layout no salte al colocarlo.
          */}
          <div className="flex items-center justify-center rounded-2xl border border-white/15 md:min-h-40">
            <p className="text-ui px-4 py-10 text-center text-sm text-white/60">
              Gráfico del vehículo · pendiente
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-ui text-sm text-white/70">
            © {year} Kanuby. Todos los derechos reservados.
          </p>

          {/*
            TODO(asset-pendiente): logotipo de SCNDAL en SVG. Cuando llegue,
            sustituir el <span> por la imagen y dejar el texto como alt.
            Mientras tanto el texto ES el crédito, no un placeholder vacío: así
            el crédito se ve aunque el asset nunca llegue.

            TODO(contenido-sin-validar): sin enlace a scndal.com hasta confirmar
            la URL.
          */}
          <p className="text-ui flex items-center gap-2 text-sm text-white/70">
            Created by
            <span className="font-heading font-medium text-white">SCNDAL</span>
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
