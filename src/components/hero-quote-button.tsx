"use client";

import { useContactModal } from "@/components/contact-modal";
import { WhatsAppIcon } from "@/components/icons";

/**
 * CTA del hero de /mudanzas. Antes era un <button> sin onClick: page.tsx es
 * Server Component (exporta metadata) y no puede usar hooks, así que no
 * tenía forma de abrir nada — se extrae aquí para poder usar
 * useContactModal(). Sin `service`: arranca en el paso 1, igual que el
 * botón del header.
 */
export function HeroQuoteButton() {
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
      onClick={() => openContactModal({ vertical: "mudanzas" })}
      className="text-ui mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-[1.1875rem] font-semibold text-white transition-colors hover:bg-brand-orange-hover"
    >
      <WhatsAppIcon className="h-4 w-4" />
      Cotiza Ahora por WhatsApp
    </button>
  );
}
