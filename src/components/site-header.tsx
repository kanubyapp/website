"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContactModal } from "@/components/contact-modal";
import { useHeaderNavLinks } from "@/components/header-nav";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { KanubyLogo } from "@/components/kanuby-logo";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { verticalFromPathname } from "@/lib/services";

export function SiteHeader() {
  const pathname = usePathname();

  const openContactModal = useContactModal();
  const vertical = verticalFromPathname(pathname);
  /* Enlaces propios de la página activa (p. ej. /mudanzas): los publica ella
     misma con <SetHeaderNav>, montado dentro de <main>. Vacío en el resto de
     rutas — ahí no se pinta ningún nav. */
  const navLinks = useHeaderNavLinks();

  return (
    /*
     * El header vive apilado sobre <main>, en la misma celda de grid (ver
     * layout.tsx). Los laterales salen de --edge-gap, el mismo token que usa
     * la tarjeta del hero.
     *
     * Sin margen superior: pegado al borde de arriba del viewport.
     *
     * self-start: sin esto el header se estiraría a todo el alto de la celda.
     */
    <header className="pointer-events-none z-50 mx-[var(--edge-gap)] self-start [grid-area:1/1]">
      {/*
        Caja sin estilo propio: sin borde, sin fondo, sin sombra, sin radio.
        Solo alto (--header-row) y el mismo padding lateral que el resto del
        header ya usaba.
      */}
      <div className="pointer-events-auto flex h-[var(--header-row)] items-center gap-6 rounded-3xl px-[var(--card-pad)]">
        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className="header-brand -m-2 inline-flex w-fit items-center p-2 text-brand-orange transition-colors hover:text-brand-orange-hover"
          >
            <KanubyLogo className="h-[var(--logo-height)] w-auto" />
            <span className="sr-only">Kanuby</span>
          </Link>
        </div>

        {/*
          ml-2 extra sobre el gap-6 del contenedor: gap-6 es compartido por
          los tres bloques del header (logo, teléfono, nav+botón) — subirlo
          ahí también separaría el bloque de la derecha, que no se pidió
          tocar. Este margen es propio del bloque de teléfono, así que solo
          afecta el hueco con el logo.
        */}
        <a
          href={PHONE_HREF}
          className="ml-2 inline-flex items-center gap-2 text-brand-blue transition-colors hover:text-brand-blue-hover"
        >
          {/*
            Círculo naranja solo detrás del ícono, no del número: bg-brand-orange
            en este span, no en el <a>. El ícono va relative z-10, encima de los
            dos aros de pulso (mismo span, absolute inset-0, detrás por orden de
            DOM). Los aros comparten el bg-brand-orange del círculo — así el
            pulso se lee como el mismo círculo expandiéndose, no como un halo de
            otro color.
          */}
          <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange">
            <span
              aria-hidden="true"
              className="phone-pulse pointer-events-none absolute inset-0 rounded-full bg-brand-orange"
            />
            <span
              aria-hidden="true"
              className="phone-pulse phone-pulse-offset pointer-events-none absolute inset-0 rounded-full bg-brand-orange"
            />
            <PhoneIcon className="phone-ring-v2 relative z-10 h-4 w-4 text-white" />
          </span>
          <span className="text-lg font-semibold">{PHONE_DISPLAY}</span>
        </a>

        {/*
          ml-auto en el contenedor, no en el botón: así el nav y el botón se
          justifican a la derecha juntos, con el nav inmediatamente antes.

          Oculto por debajo de md: en mobile no cabe junto al teléfono y el
          botón (ver nota en la tarea) — ahí solo quedan teléfono y
          WhatsApp, igual que ya funcionaba antes de este cambio.
        */}
        <div className="ml-auto flex items-center gap-6">
          {navLinks.length > 0 && (
            <nav aria-label="Secciones de esta página" className="hidden md:block">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-ui text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-hover"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <button
            type="button"
            onClick={() => openContactModal({ vertical })}
            className="text-ui inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-brand-blue px-4 text-sm font-medium text-white transition-colors hover:bg-brand-blue-hover md:px-5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Cotizar ahora</span>
            <span className="sr-only sm:hidden">Cotizar ahora por WhatsApp</span>
          </button>
        </div>
      </div>
    </header>
  );
}
