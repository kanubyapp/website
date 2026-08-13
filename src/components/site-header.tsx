"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useContactModal } from "@/components/contact-modal";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { KanubyLogo } from "@/components/kanuby-logo";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { navLinks } from "@/lib/nav";
import { verticalFromPathname } from "@/lib/services";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const openContactModal = useContactModal();
  const vertical = verticalFromPathname(pathname);

  const isCurrent = (href: string) => pathname === href;
  const isSection = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    /*
     * El header vive apilado sobre <main>, en la misma celda de grid (ver
     * layout.tsx). Los laterales salen de --edge-gap, el mismo token —y desde el
     * mismo origen— que usa la tarjeta del hero, así que quedan a ras por
     * construcción: aquí ya no se compensa ninguna altura.
     *
     * Arriba, --edge-gap sitúa el filo de la tarjeta y --header-inset-top es lo
     * que el pill baja desde ahí (cero sin hero).
     *
     * SIN sticky: el header se queda donde está y se va con el scroll como
     * cualquier otro bloque. Por eso el pill vive siempre en su estado
     * transparente (.glass-top): nunca llega a pasar por encima de contenido
     * imprevisible, así que no hay nada que resolver con cristal opaco.
     *
     * self-start: sin esto el header se estiraría a todo el alto de la celda.
     *
     * pointer-events-none: la caja del header cubre una banda del contenido de
     * abajo. Los eventos se reactivan en el pill y en el menú móvil, que es lo
     * único que se ve.
     */
    <header className="pointer-events-none z-50 mx-[var(--edge-gap)] mt-[calc(var(--edge-gap)+var(--header-inset-top))] self-start [grid-area:1/1]">
      <div className="glass-top pointer-events-auto h-[var(--header-row)] rounded-full">
        {/*
          Sin max-width propio: el ancho lo define la tarjeta del hero, y el
          padding lateral es su mismo --card-pad. Así el logo queda a la misma
          distancia del borde izquierdo que el botón de WhatsApp del derecho, y
          la misma que hay del borde superior de la tarjeta al header.

          El alto NO se declara aquí: lo pone --header-row en el div de cristal
          de arriba (borde incluido, box-sizing: border-box). Una sola fuente,
          así que el token y lo que se pinta no pueden desincronizarse.

          El -1px descuenta el borde de 1px del pill (.glass-top / .glass*, que
          existe también en el estado transparente): sin él el logo caería 1px
          más adentro que el H1 del hero.
        */}
        <div className="flex h-full items-center gap-6 px-[calc(var(--card-pad)-1px)]">
        {/* Logotipo: usa el naranja de marca a propósito. Los logotipos quedan
            fuera del requisito de contraste de texto (WCAG 1.4.3). No cambiar
            al token accesible.

            El color va en el enlace, no en el SVG: el logo hereda por
            currentColor, y así la regla de globals.css que pinta .header-brand
            de blanco sobre el mesh lo alcanza sin cambios. */}
        {/*
          El flex-1 que centra la nav vive en este div, NO en el enlace: si va
          en el <Link>, el hitbox se estira hasta "Mudanzas" y el foco dibuja un
          outline del ancho de media cabecera.

          El p-2 da área de toque alrededor del logo y el -m-2 lo compensa, así
          que el logotipo no se mueve ni un píxel respecto al borde del pill.
        */}
        <div className="flex shrink-0 basis-0 items-center md:flex-1">
          <Link
            href="/"
            className="header-brand -m-2 inline-flex w-fit items-center p-2 text-brand-orange transition-colors hover:text-brand-orange-hover"
          >
            <KanubyLogo className="h-[var(--logo-height)] w-auto" />
            {/* El SVG es decorativo: el nombre accesible del enlace sale de aquí. */}
            <span className="sr-only">Kanuby</span>
          </Link>
        </div>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href} className="group relative">
                <Link
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className={`header-link text-ui text-sm transition-colors hover:text-brand-orange-accessible ${
                    isSection(link.href)
                      ? "font-medium text-brand-orange-accessible underline decoration-2 underline-offset-[6px]"
                      : "text-brand-blue"
                  }`}
                >
                  {link.label}
                </Link>

                {link.children && (
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="glass-strong min-w-52 rounded-2xl p-2">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={
                              isCurrent(child.href) ? "page" : undefined
                            }
                            className="text-ui block whitespace-nowrap rounded-full px-4 py-2.5 text-sm text-brand-blue transition-colors hover:bg-white/40 hover:text-brand-orange-accessible aria-[current=page]:font-medium aria-[current=page]:text-brand-orange-accessible aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:flex-1 md:justify-end">
          {/*
            Relleno blanco sólido y sin borde: el mismo patrón que el primario
            del hero (cta-group.tsx). Sobre el mesh, el blanco da 4.78:1 en su
            punto más claro, así que el contorno del control se ve sin necesidad
            de borde. El texto va en azul de marca —12.31:1 sobre blanco—, no en
            blanco, que sobre este relleno sería invisible.

            h-10 y no padding vertical: este botón es el elemento más alto de la
            fila y su alto entra en el cálculo de --header-inset-top vía
            --header-tallest (globals.css). Con py-2.5 el alto dependía del
            contenido y cambiaba en el breakpoint sm —38px con el texto oculto,
            42px con el texto visible—, así que el aire de arriba se descuadraba
            solo a cierto ancho. Los 40px coinciden con el h-10 del botón de
            menú, que es el más alto en móvil. Si cambia, cambiar
            --header-tallest.
          */}
          {/* Abre el modal de contacto, sin servicio preseleccionado: desde el
              header no sabemos cuál. */}
          <button
            type="button"
            onClick={() => openContactModal({ vertical })}
            className="text-ui inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-brand-blue transition-colors hover:bg-white/90 md:px-5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sr-only sm:hidden">Escríbenos por WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="header-icon flex h-10 w-10 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-white/40 md:hidden"
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-200 ${
                  isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-200 ${
                  isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <nav
          id="mobile-nav"
          aria-label="Principal móvil"
          className="glass-strong pointer-events-auto mt-2 rounded-3xl md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-2">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-white/40">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className="text-ui block py-3 text-base text-brand-blue aria-[current=page]:font-medium aria-[current=page]:text-brand-orange-accessible aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]"
                >
                  {link.label}
                </Link>

                {link.children && (
                  <ul className="pb-2 pl-4">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={
                            isCurrent(child.href) ? "page" : undefined
                          }
                          className="text-ui block py-2 text-base text-brand-blue-muted aria-[current=page]:font-medium aria-[current=page]:text-brand-orange-accessible aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <li>
              <a
                href={PHONE_HREF}
                onClick={() => setIsOpen(false)}
                className="text-ui flex items-center gap-2 py-3 text-base text-brand-blue-muted"
              >
                <PhoneIcon />
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
