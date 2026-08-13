"use client";

import { usePathname } from "next/navigation";
import { useContactModal } from "@/components/contact-modal";
import { WhatsAppIcon } from "@/components/icons";
import { verticalFromPathname } from "@/lib/services";

/**
 * Botón flotante de WhatsApp, en pill de cristal coherente con el header.
 *
 * Usa .glass-floating (0.55) y no .glass-strong (0.45): al llegar al final de
 * la página este pill queda sobre la tarjeta azul del footer, y a 0.45 el azul
 * da 3.89:1 ahí. A 0.55 pasa sobre cualquier fondo de la paleta.
 *
 * El texto va en azul de marca, no en blanco: sobre cristal claro el blanco no
 * alcanza AA.
 *
 * Es el ÚNICO elemento flotante del sitio, así que va pegado a la esquina:
 * bottom-4, la misma distancia que right-4. El padding inferior del footer está
 * calculado a partir de esta posición para que el pill no tape su contenido.
 */
export function FloatingWhatsApp() {
  /* No va directo a wa.me: abre el modal de contacto, sin servicio
     preseleccionado, y este arranca en su paso 1. */
  const openContactModal = useContactModal();
  const vertical = verticalFromPathname(usePathname());

  return (
    <button
      type="button"
      onClick={() => openContactModal({ vertical })}
      className="glass-floating text-ui fixed bottom-4 right-4 z-40 inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-medium text-brand-blue transition-transform hover:scale-[1.03] md:right-8"
    >
      <WhatsAppIcon className="h-5 w-5" />
      Escríbenos
    </button>
  );
}
