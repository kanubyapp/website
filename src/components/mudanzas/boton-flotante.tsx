"use client";

import { IconoWhatsApp } from "@/components/iconos";
import { useCotizacion } from "./cotizacion";

/* Botón flotante de WhatsApp que abre el popup de cotización. */
export function BotonFlotante({ className }: { className: string }) {
  const { abrir } = useCotizacion();
  return (
    <button
      type="button"
      className={className}
      aria-label="Cotizar por WhatsApp"
      aria-haspopup="dialog"
      onClick={abrir}
    >
      <IconoWhatsApp />
    </button>
  );
}
