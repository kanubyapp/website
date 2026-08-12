"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";
import { navLinks } from "@/lib/nav";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();

  const lastScrollY = useRef(0);
  /** Píxeles recorridos hacia abajo desde el último cambio de dirección. */
  const scrolledDown = useRef(0);

  /*
   * Ocultar al bajar, reaparecer al subir.
   *
   * - Al separarse del borde superior, el pill sube a --glass-bg-strong. Sobre
   *   contenido impredecible el 0.28 es el mínimo justo para AA; el 0.45 da
   *   margen cuando debajo pasa una sección con gradiente cálido.
   * - Arriba del todo siempre visible y en cristal normal.
   * - Se oculta solo tras acumular HIDE_THRESHOLD píxeles bajando seguido, para
   *   que un rebote de scroll de dos o tres píxeles no lo dispare.
   * - Al subir reaparece en el primer delta negativo, sin umbral.
   * - Con el menú móvil abierto no se oculta nunca: el desplegable cuelga del
   *   pill y esconderlo se llevaría por delante el menú que el usuario acaba de
   *   abrir.
   */
  useEffect(() => {
    /** Por debajo de esto se considera "arriba del todo". */
    const TOP_ZONE = 8;
    /** Píxeles bajando seguido antes de ocultar. */
    const HIDE_THRESHOLD = 12;
    /** No ocultar hasta haber pasado la altura del propio pill. */
    const MIN_SCROLL_TO_HIDE = 96;

    let ticking = false;

    const update = () => {
      ticking = false;

      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      setIsScrolled(y > TOP_ZONE);

      if (isOpen || y <= TOP_ZONE) {
        scrolledDown.current = 0;
        setIsHidden(false);
        return;
      }

      if (delta < 0) {
        scrolledDown.current = 0;
        setIsHidden(false);
        return;
      }

      scrolledDown.current += delta;

      if (scrolledDown.current > HIDE_THRESHOLD && y > MIN_SCROLL_TO_HIDE) {
        setIsHidden(true);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    lastScrollY.current = window.scrollY;
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  const isCurrent = (href: string) => pathname === href;
  const isSection = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  /*
   * Arriba del todo el pill no lleva fondo ni borde: se funde con el mesh. El
   * cristal aparece al hacer scroll. La transición la definen las propias
   * clases .glass* en globals.css.
   */
  const surface = isScrolled ? "glass-strong" : "glass-top";

  return (
    /*
     * El pill no tiene márgenes propios: los tres lados salen de --edge-gap, el
     * mismo token que usa la tarjeta del hero. Así el pill y la tarjeta quedan
     * a ras por los laterales y con idéntico aire por arriba.
     */
    <header
      data-transparent={!isScrolled}
      className={`sticky top-[var(--edge-gap)] z-50 mt-[var(--edge-gap)] px-[var(--edge-gap)] transition-transform duration-300 motion-reduce:transition-none ${
        isHidden ? "-translate-y-[calc(100%+2rem)]" : "translate-y-0"
      }`}
    >
      <div className={`${surface} rounded-full`}>
        {/* Alto fijo: --header-flow en globals.css depende de este valor. */}
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 pl-6 pr-2.5 md:h-16 md:pl-8 md:pr-3">
        {/* Logotipo: usa el naranja de marca a propósito. Los logotipos quedan
            fuera del requisito de contraste de texto (WCAG 1.4.3). No cambiar
            al token accesible. */}
        <Link
          href="/"
          className="header-brand font-heading shrink-0 basis-0 text-2xl font-semibold lowercase tracking-tight text-brand-orange transition-colors hover:text-brand-orange-hover md:flex-1"
        >
          kanuby
        </Link>

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
                            className="text-ui block whitespace-nowrap rounded-xl px-4 py-2.5 text-sm text-brand-blue transition-colors hover:bg-white/40 hover:text-brand-orange-accessible aria-[current=page]:font-medium aria-[current=page]:text-brand-orange-accessible aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]"
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
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ui inline-flex items-center gap-2 rounded-full bg-brand-orange-accessible px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-orange-accessible-hover md:px-5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sr-only sm:hidden">Escríbenos por WhatsApp</span>
          </a>

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
          className="glass-strong mt-2 rounded-3xl md:hidden"
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
