"use client";

import { eventoWhatsApp, registrarConversion, type Negocio } from "@/lib/conversiones";

/*
 * Enlace que abre WhatsApp directo, sin formulario. Al hacer clic registra
 * whatsapp_mudanza o whatsapp_minibodega con la página. Abre en otra pestaña,
 * así que no hay redirección que esperar. Sin negocio claro (null) no emite
 * evento.
 */
export function EnlaceWhatsApp({
  negocio,
  onClick,
  ...props
}: React.ComponentProps<"a"> & { negocio: Negocio | null }) {
  return (
    <a
      {...props}
      onClick={(evento) => {
        if (negocio) registrarConversion(eventoWhatsApp(negocio, window.location.pathname));
        onClick?.(evento);
      }}
    />
  );
}
