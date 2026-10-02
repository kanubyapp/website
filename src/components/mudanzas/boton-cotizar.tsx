"use client";

import { IconoWhatsApp } from "@/components/iconos";
import { useCotizacion } from "./cotizacion";

/*
 * Botón con ícono de WhatsApp de las páginas de mudanzas (raven-button). Sin
 * href abre el popup de cotización; con href es un enlace normal. El subtexto
 * es la segunda línea de los botones de dos líneas ("Cotiza Ahora por" /
 * "Whatsapp"). Tamaños y colores de cada variante van en el módulo de la página.
 */
export function BotonCotizar({
  texto,
  subtexto,
  href,
  className = "",
}: {
  texto: string;
  subtexto?: string;
  href?: string;
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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`kb-boton-cotizar ${className}`}
      >
        {contenido}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`kb-boton-cotizar ${className}`}
      aria-haspopup="dialog"
      onClick={abrir}
    >
      {contenido}
    </button>
  );
}
