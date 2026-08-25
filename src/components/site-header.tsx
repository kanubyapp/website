"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useContactModal } from "@/components/contact-modal";
import { useHeaderNavLinks } from "@/components/header-nav";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { KanubyLogo } from "@/components/kanuby-logo";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { verticalFromPathname } from "@/lib/services";

/** Píxeles de scroll antes de colapsar el pill. Chico a propósito: el
    colapso debe sentirse como reacción inmediata al scroll, no como un
    umbral que hay que buscar. */
const COLLAPSE_AFTER = 40;

export function SiteHeader() {
  const pathname = usePathname();

  const openContactModal = useContactModal();
  const vertical = verticalFromPathname(pathname);
  /* Enlaces propios de la página activa (p. ej. /mudanzas): los publica ella
     misma con <SetHeaderNav>, montado dentro de <main>. Vacío en el resto de
     rutas — ahí no se pinta ningún nav. */
  const navLinks = useHeaderNavLinks();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    /* Mismo patrón que agenda-notice.tsx: rAF + listener pasivo, para no
       hacer trabajo en cada evento de scroll. */
    let ticking = false;

    const update = () => {
      ticking = false;
      setCollapsed(window.scrollY > COLLAPSE_AFTER);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /*
     * El header vive apilado sobre <main>, en la misma celda de grid (ver
     * layout.tsx). Los laterales salen de --edge-gap, el mismo token que usa
     * la tarjeta del hero.
     *
     * self-start: sin esto el header se estiraría a todo el alto de la celda.
     *
     * top condicional, no fijo: en top-0 la posición inicial (sin scroll) es
     * la misma de siempre —flush con el filo de la tarjeta del hero, sin
     * hueco—, así que esa alineación no se toca. Al colapsar, top pasa a
     * --edge-gap: recién AHÍ se separa del borde superior del viewport, que
     * es el estado al que se refería el pedido ("el sticky... pegado"), sin
     * romper la alineación del estado inicial. transition-[top] anima el
     * cambio entre los dos en vez de saltar.
     *
     * flex justify-center: centra el pill horizontalmente en el viewport
     * cuando su ancho es MENOR al del header (que sigue midiendo edge-gap a
     * edge-gap siempre). En el estado normal el pill usa max-w-full —ocupa
     * el header entero, así que centrar no tiene nada que hacer, se ve
     * igual que antes—; al colapsar, el pill se angosta (max-width, más
     * abajo) y justify-content lo centra automáticamente. Con esto el
     * centrado queda incluido en la MISMA transición de max-width del pill
     * —se centra encogiéndose desde los dos lados a la vez, sin saltos—, en
     * vez de necesitar su propia animación de margen (margin:auto no
     * transiciona suave desde un margen fijo).
     */
    <header
      className={`pointer-events-none sticky z-50 mx-[var(--edge-gap)] flex justify-center self-start transition-[top] duration-300 ease-in-out motion-reduce:transition-none [grid-area:1/1] ${
        collapsed ? "top-[var(--edge-gap)]" : "top-0"
      }`}
    >
      {/*
        Arriba (sin scroll): sin borde, sin fondo, sin sombra — igual que
        antes. Con scroll pasa a un alto menor (h-14, 56px, contra los
        4.5rem/72px de --header-row) más sombra, y el fondo de cristal lo
        pone el div de abajo. height y box-shadow transicionan AQUÍ, en
        este contenedor; el fondo/blur transicionan por su cuenta en
        .glass-strong (globals.css, mismo sistema que .glass/.glass-floating
        del resto del sitio) — van en capas separadas a propósito, porque
        `transition` es un shorthand: si ambas transiciones vivieran en el
        mismo elemento, la que se declare después en el CSS compilado
        pisaría enteras a la otra en vez de combinarse.

        relative: necesario para que el fondo de cristal (absolute inset-0
        más abajo) se posicione contra ESTE contenedor.

        max-width angosta el pill entero al colapsar — antes solo se
        ocultaban piezas de adentro y la caja seguía de punta a punta,
        dejando un hueco enorme entre el logo y el botón. max-w-full en el
        estado normal deja el mismo ancho de siempre (edge-gap a edge-gap);
        ambos son valores de longitud (%, px), así que sí transicionan
        suave entre sí.

        Tres valores, no uno: un <div> de flujo normal SIEMPRE intenta
        llenar su ancho disponible hasta el max-width (max-width no lo hace
        encogerse a su contenido, solo le pone un techo) — así que un solo
        número no sirve para todos los anchos de viewport, porque el
        contenido real cambia de tamaño en cada breakpoint (el botón pasa
        de solo ícono a "Cotizar ahora" en sm, y --card-pad crece en md).
        Medido en vivo contra el contenido real de cada uno, con margen:
        230px (mobile, botón solo ícono), 320px (sm, ya con el texto del
        botón), 356px (md+, con el padding lateral más grande).

        Sin gap-6 compartido: cada bloque de abajo trae su propio margen
        condicional (ver comentarios donde corresponda) — un gap fijo en
        este contenedor se aplicaría IGUAL aunque el teléfono esté colapsado
        a 0 de ancho, dejando espacio fantasma.
      */}
      {/*
        w-full FIJO (no condicional): el header (arriba) ya es flex, así
        que este pill es un flex item. Si w-full cambiara junto con
        max-width, el flex-basis cambiaría de golpe (no transiciona) y el
        ancho saltaría en vez de animarse. Dejando width siempre al 100%,
        lo único que varía entre estados es max-width —que sí es una
        longitud transicionable—, y el ancho renderizado (min de los dos)
        sigue esa transición sin saltos en ningún momento. Cuando max-width
        cae por debajo del 100% del header, flex-shrink (1 por defecto) lo
        deja exactamente en su max-width, y justify-content:center del
        header (arriba) reparte el sobrante a los lados.
      */}
      <div
        className={`pointer-events-auto relative flex w-full items-center overflow-hidden rounded-3xl px-[var(--card-pad)] transition-[height,max-width,box-shadow] duration-300 ease-in-out motion-reduce:transition-none ${
          collapsed
            ? "h-14 max-w-[230px] shadow-[0_8px_24px_-10px_rgba(15,52,70,0.25)] sm:max-w-[320px] md:max-w-[356px]"
            : "h-[var(--header-row)] max-w-full shadow-none"
        }`}
      >
        {/*
          Fondo de cristal, en su propia capa: -z-10 lo manda detrás de
          TODO el contenido en flujo normal (logo, teléfono, nav, botón)
          sin tener que ponerle z-index a cada uno. .glass-strong (mismo
          token --glass-bg-strong que ya documenta "estado con scroll" en
          globals.css) trae su propia transición de background-color/
          backdrop-filter, su fallback opaco sin backdrop-filter y su
          apagado bajo prefers-reduced-transparency — nada de eso se
          reimplementa aquí, solo se activa o no según collapsed.
        */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 rounded-3xl ${collapsed ? "glass-strong" : ""}`}
        />

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
          Envoltorio de colapso: al hacer scroll el teléfono desaparece, no
          solo con opacity —eso dejaría el hueco vacío— sino encogiendo
          también su ancho a 0, para que el pill se vea más chico de
          verdad, como se pidió. max-width (no width) porque no se conoce
          el ancho exacto de antemano (depende del número); 220px es
          generoso de sobra para "81 8336 3637" con su círculo. overflow-
          hidden recorta durante la transición.

          El aro de pulso más grande (.phone-pulse, globals.css) llega a
          ~68px de diámetro por transform: scale(), casi el doble del
          círculo de 36px — sobresale ~16px MÁS ALLÁ del círculo en las
          CUATRO direcciones (arriba, abajo, izquierda, derecha), no solo
          a los lados. overflow-hidden en este envoltorio (necesario para
          que el teléfono se vea encoger de verdad al colapsar, no solo
          desvanecerse dejando el hueco) recorta cualquier cosa que cruce
          su borde — así que el círculo necesita ese margen de ~16px
          LIBRE en los cuatro lados, no solo a la izquierda:

          - pl-8 (32px) a la izquierda: cubre el aro (16px) Y de paso
            reproduce el hueco con el logo que ya existía antes de este
            fix (era ml-8, 32px — mismo número, ahora como padding, para
            que quede DENTRO de la caja recortada en vez de afuera).
          - pr-4 (16px) a la derecha: el aro no llega a tocar el texto
            (empieza en x:44px, el aro llega a ~52px), pero necesita su
            propio margen de sobra en el borde derecho del envoltorio.
          - py-[18px] arriba y abajo: el envoltorio no tenía NINGÚN
            padding vertical — su alto era exactamente el del contenido
            (36px, el círculo), así que el aro se recortaba arriba y
            abajo en TODOS los casos, no solo con el pill comprimido.
            18px (un poco más que los 15.8px que el aro necesita) hace
            que el envoltorio mida 36+18+18=72px de alto, EXACTO al alto
            del pill (--header-row) en el estado normal — no se pasa del
            propio pill, así que tampoco hay un segundo recorte ahí.

          pl-8/pl-0 sigue condicional (colapsa con el ancho, para no
          dejar un hueco residual junto al logo cuando el teléfono ya no
          está); pr-4 y py-[18px] son fijos: no dependen del ancho, así
          que no necesitan transicionar ni colapsar aparte.

          whitespace-nowrap + w-max en el <a> de adentro: evita que el
          texto del teléfono se reparta en dos líneas a medio camino de la
          transición, mientras el ancho disponible todavía está encogiendo.

          motion-reduce:transition-none: mismo criterio que .agenda-nudge,
          la transición se apaga bajo prefers-reduced-motion.
        */}
        <div
          className={`overflow-hidden py-[18px] pr-4 transition-[max-width,opacity,padding-left] duration-300 ease-in-out motion-reduce:transition-none ${
            collapsed
              ? "max-w-0 pl-0 opacity-0"
              : "max-w-[220px] pl-8 opacity-100"
          }`}
        >
          <a
            href={PHONE_HREF}
            className="inline-flex w-max items-center gap-2 whitespace-nowrap text-brand-blue transition-colors hover:text-brand-blue-hover"
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
              <PhoneIcon className="phone-ring relative z-10 h-4 w-4 text-white" />
            </span>
            {/*
              hidden sm:inline: mismo criterio que ya usa el texto del
              botón de WhatsApp más abajo ("Cotizar ahora"). Causa raíz del
              desborde a 320px: el número completo necesita ~353px sólo
              para el header (logo + teléfono + botón), pero a 320px el
              área disponible es de apenas ~248px — nunca alcanza, en
              ningún ancho por debajo de ~425px. Antes esto no causaba
              scroll de página (el overflow-hidden del envoltorio se
              encargaba), pero SÍ dejaba el número recortado a solo unos
              px visibles — ilegible, no solo "un poco corto". Ocultar el
              texto y dejar el círculo (que sigue siendo el link
              tel:, sigue funcionando al tocarlo) es la misma solución que
              ya existe para el botón, no una nueva.

              sr-only sm:hidden: sin el texto visible, el link quedaría sin
              nombre accesible (el ícono solo no dice nada). Mismo patrón
              que el sr-only del botón de WhatsApp.
            */}
            <span className="hidden text-lg font-semibold sm:inline">
              {PHONE_DISPLAY}
            </span>
            <span className="sr-only sm:hidden">Llamar al {PHONE_DISPLAY}</span>
          </a>
        </div>

        {/*
          ml-auto SIEMPRE, en los dos estados: empuja el nav+botón contra
          el borde derecho del pill. Antes, en colapsado, se cambiaba por
          un margen fijo (ml-6) porque el pill quedaba pegado al ancho de
          su contenido y ml-auto no tenía sobrante que empujar — ahora que
          el pill mantiene su max-width real (230–356px, no se angosta más
          de eso) en vez de encogerse a un ancho mínimo, sí queda margen
          de sobra dentro del pill, y ml-auto lo usa para separar el botón
          del logo en vez de dejarlos pegados.

          gap también colapsa (6 → 0): sin esto, con el nav en max-w-0 el
          hueco vacío del gap se quedaría flotando junto al botón.
        */}
        <div
          className={`ml-auto flex items-center transition-[gap] duration-300 ease-in-out motion-reduce:transition-none ${
            collapsed ? "gap-0" : "gap-6"
          }`}
        >
          {navLinks.length > 0 && (
            /*
              Oculto por debajo de md con display (hidden md:block), igual
              que antes — eso no puede transicionar, así que el colapso por
              scroll va en un envoltorio aparte, ADENTRO, que solo entra en
              juego cuando el display ya es block. Mismo truco que el
              teléfono: max-width + opacity + overflow-hidden, con w-max +
              whitespace-nowrap en la lista para que los links no se
              repartan en dos líneas a medio colapsar.
            */
            <div className="hidden md:block">
              <div
                className={`overflow-hidden transition-[max-width,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
                  collapsed ? "max-w-0 opacity-0" : "max-w-[400px] opacity-100"
                }`}
              >
                <nav
                  aria-label="Secciones de esta página"
                  className="w-max"
                >
                  <ul className="flex items-center gap-6 whitespace-nowrap">
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
              </div>
            </div>
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
