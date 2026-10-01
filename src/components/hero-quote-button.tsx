"use client";

import { useContactModal } from "@/components/contact-modal";
import { WhatsAppIcon } from "@/components/icons";
import type { ServiceId } from "@/lib/services";

/**
 * CTA del hero de /mudanzas y sus páginas hijas (empresariales,
 * monterrey-cdmx). Antes era un <button> sin onClick: page.tsx es Server
 * Component (exporta metadata) y no puede usar hooks, así que no tenía
 * forma de abrir nada — se extrae aquí para poder usar useContactModal().
 *
 * `service` opcional: en el hub (/mudanzas) se omite y el modal arranca en
 * su paso 1, igual que el botón del header — ahí no se sabe qué servicio
 * quiere el visitante. En una página hija el visitante YA llegó buscando
 * ese servicio específico (la keyword de la página lo dice), así que se
 * preselecciona y el modal salta directo al paso 2.
 */
export function HeroQuoteButton({ service }: { service?: ServiceId } = {}) {
  const openContactModal = useContactModal();

  return (
    /*
      Padding reducido (antes px-7 py-4 gap-2.5): más proporcionado al resto
      del hero. text-[1.1875rem] (19px) y font-semibold (600) NO se tocan —
      es el mínimo documentado en globals.css para que blanco sobre este
      naranja siga pasando AA de texto grande (3:1); bajar de ahí saca el
      botón de cumplimiento.

      gap-2 ya coincidía con el del botón de WhatsApp del header; el ícono
      usa el mismo tamaño (h-4 w-4) que ahí, para que se lean como el mismo
      sistema.
    */
    <button
      type="button"
      onClick={() => openContactModal({ vertical: "mudanzas", service })}
      className="text-ui mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-[1.1875rem] font-semibold text-white transition-colors hover:bg-brand-orange-hover"
    >
      <WhatsAppIcon className="h-4 w-4" />
      Cotiza Ahora por WhatsApp
    </button>
  );
}
