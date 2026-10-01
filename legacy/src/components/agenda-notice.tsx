"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useContactModal } from "@/components/contact-modal";
import { CloseIcon } from "@/components/icons";
import { verticalFromPathname } from "@/lib/services";

/** Píxeles de scroll antes de aparecer. Por debajo, el hero se ve limpio. */
const SHOW_AFTER = 600;

/** Se recuerda por pestaña, no para siempre: en la siguiente visita vuelve. */
const DISMISSED_KEY = "kanuby:agenda-notice-dismissed";

/*
 * "Cerrado" vía useSyncExternalStore, no useState+useEffect (era
 * react-hooks/set-state-in-effect: llamar setState de forma síncona dentro
 * de un efecto dispara una segunda pasada de render evitable).
 *
 * sessionStorage no dispara ningún evento cuando se escribe desde la MISMA
 * pestaña, así que subscribe no tiene a qué suscribirse de verdad — está
 * para que dismiss() pueda avisarle a React "vuelve a leer el snapshot"
 * llamando a los listeners a mano (ver markDismissed más abajo), en vez de
 * depender de que algún otro render incidental refresque el valor.
 *
 * getServerSnapshot (siempre false, sin tocar sessionStorage) es lo que
 * evita dos problemas a la vez:
 * 1. sessionStorage no existe en el servidor — leerlo ahí tronaría.
 * 2. React usa getServerSnapshot (no getSnapshot) también en el PRIMER
 *    render del cliente, el de hidratación — así ese primer render
 *    coincide exactamente con el del servidor (false, sin importar lo que
 *    diga sessionStorage) y no hay mismatch de hidratación. Recién
 *    después de montar, React vuelve a llamar a getSnapshot con el valor
 *    real y re-renderiza si cambió — mismo momento en el que antes corría
 *    el useEffect, así que el comportamiento visible no cambia: el aviso
 *    ya arranca invisible (opacity-0, pointer-events-none) hasta que el
 *    scroll lo revela, así que ese ajuste posterior al montaje no pinta
 *    nada distinto en pantalla.
 */
const dismissedListeners = new Set<() => void>();

function subscribeToDismissed(onStoreChange: () => void) {
  dismissedListeners.add(onStoreChange);
  return () => dismissedListeners.delete(onStoreChange);
}

function getDismissedSnapshot() {
  return sessionStorage.getItem(DISMISSED_KEY) === "1";
}

function getDismissedServerSnapshot() {
  return false;
}

function markDismissed() {
  sessionStorage.setItem(DISMISSED_KEY, "1");
  dismissedListeners.forEach((listener) => listener());
}

/**
 * Aviso flotante de disponibilidad, esquina inferior IZQUIERDA.
 *
 * La derecha es del pill de WhatsApp (z-40, bottom-4 right-4), así que este
 * ocupa la esquina contraria y los dos conviven sin solaparse.
 *
 * Solo de sm para arriba: en un móvil de 375px, con el pill de WhatsApp a la
 * derecha, quedan ~200px de ancho libre — no caben un título y dos líneas sin
 * apelmazarse, y taparía el contenido que se está leyendo.
 */
export function AgendaNotice() {
  const isDismissed = useSyncExternalStore(
    subscribeToDismissed,
    getDismissedSnapshot,
    getDismissedServerSnapshot,
  );
  const [isVisible, setIsVisible] = useState(false);

  /* Sin servicio: desde aquí no sabemos cuál, así que el modal arranca en su
     paso 1. */
  const openContactModal = useContactModal();
  const vertical = verticalFromPathname(usePathname());

  useEffect(() => {
    if (isDismissed) return;

    /* Mismo patrón que el resto del sitio: rAF + listener pasivo, para no
       hacer trabajo en cada evento de scroll. */
    let ticking = false;

    const update = () => {
      ticking = false;
      setIsVisible(window.scrollY > SHOW_AFTER);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    /*
     * aria-hidden mientras está oculto —y no un desmontaje— para que la entrada
     * pueda animarse. `pointer-events-none` en ese estado evita que un botón
     * invisible capture clics.
     *
     * Sin role="alert" ni aria-live: es un aviso comercial, no un cambio de
     * estado urgente. Interrumpir la lectura de un lector de pantalla para esto
     * sería abusar del patrón.
     */
    <aside
      aria-hidden={!isVisible}
      /*
       * La sacudida (.agenda-nudge) solo se engancha cuando la tarjeta ya está
       * visible, para que el primer aviso caiga después de la entrada y no a la
       * vez. Anima `transform`, mientras que la entrada anima `translate`: son
       * propiedades distintas y se componen, así que no compiten.
       */
      className={`fixed bottom-4 left-4 z-40 hidden max-w-xs rounded-2xl bg-background shadow-xl shadow-brand-blue/10 transition-[opacity,translate] duration-500 sm:block ${
        isVisible
          ? "agenda-nudge translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      } motion-reduce:transition-none`}
    >
      {/*
        Toda la tarjeta es el botón que abre el modal. El de cerrar NO va dentro
        —anidar botones es marcado inválido— sino como hermano en posición
        absoluta encima. Al no estar anidados, tampoco hace falta detener la
        propagación del clic: cerrar no puede disparar la apertura.

        El padding vive aquí y no en el <aside> para que el área pulsable cubra
        la tarjeta entera. pr-10 reserva el hueco de la ✕.
      */}
      <button
        type="button"
        onClick={() => openContactModal({ vertical })}
        tabIndex={isVisible ? undefined : -1}
        className="flex w-full items-start gap-3 rounded-2xl p-4 pr-10 text-left transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        {/* Punto de estado. mt-1.5 lo alinea con la primera línea del título,
            no con la caja. aria-hidden: no aporta nada que no diga el texto. */}
        <span
          aria-hidden="true"
          className="mt-1.5 block h-2.5 w-2.5 shrink-0 rounded-full bg-green-600 ring-4 ring-green-600/15"
        />

        <span className="block">
          <span className="text-ui block text-sm font-medium text-brand-blue">
            La agenda se llena
          </span>
          {/*
            Sin cifras ni plazos: no hay dato de ocupación real que respaldarlos,
            y una urgencia inventada es una promesa que alguien tiene que
            sostener después por teléfono.
          */}
          <span className="mt-1 block text-sm leading-snug text-muted">
            Aparta tu fecha con tiempo para asegurarla.
          </span>
        </span>
      </button>

      <button
        type="button"
        onClick={markDismissed}
        aria-label="Cerrar aviso"
        tabIndex={isVisible ? undefined : -1}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-brand-blue/10 hover:text-brand-blue"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </aside>
  );
}
