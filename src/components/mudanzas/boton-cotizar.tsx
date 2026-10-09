"use client";

import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { IconoWhatsApp } from "@/components/iconos";
import type { Negocio } from "@/lib/conversiones";
import { useCotizacion } from "./cotizacion";

/*
 * Botón con ícono de WhatsApp de las páginas de mudanzas (raven-button). Sin
 * href abre el popup de cotización; con href es un enlace normal. El subtexto
 * es la segunda línea de los botones de dos líneas ("Cotiza Ahora por" /
 * "Whatsapp"). Con href, el negocio es el del evento whatsapp_* del clic. Tamaños y colores de cada variante van en el módulo de la página.
 */
export function BotonCotizar({
  texto,
  subtexto,
  href,
  negocio = null,
  opcion,
  className = "",
}: {
  texto: string;
  subtexto?: string;
  href?: string;
  negocio?: Negocio | null;
  /** Opción del paso 1 ya elegida: el popup abre directo en el paso 2 */
  opcion?: string;
  className?: string;
}) {
  const { abrir } = useCotizacion();
  const contenido = (
    <>
      <IconoWhatsApp className="kb-boton-cotizar-icono" />
      <span className="kb-boton-cotizar-textos">
        <span className="kb-boton-cotizar-texto">{texto}</span>
        {subtexto && <span className="kb-boton-cotizar-subtexto">{subtexto}</span>}
      </span>
    </>
  );

  if (href) {
    return (
      <EnlaceWhatsApp
        href={href}
        negocio={negocio}
        target="_blank"
        rel="noopener noreferrer"
        className={`kb-boton-cotizar ${className}`}
      >
        {contenido}
      </EnlaceWhatsApp>
    );
  }

  return (
    <button
      type="button"
      className={`kb-boton-cotizar ${className}`}
      aria-haspopup="dialog"
      onClick={() => abrir(opcion)}
    >
      {contenido}
    </button>
  );
}
