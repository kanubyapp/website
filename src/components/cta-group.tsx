import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import {
  COTIZADOR_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
} from "@/lib/contact";

type CtaGroupProps = {
  /** Etiqueta de la acción primaria. */
  whatsappLabel?: string;
  /**
   * Destino de la acción secundaria. Cambia por vertical: mudanzas manda al
   * cotizador, mini bodegas a la calculadora de espacio.
   */
  secondaryHref?: string;
  secondaryLabel?: string;
  /**
   * "light" — sobre fondo blanco o gris claro: azul de marca.
   * "warm"  — sobre el mesh cálido del hero: blanco.
   *
   * No es una preferencia estética. Sobre el mesh el azul de marca da 1.4:1 y
   * el gris --color-muted 1.2:1; sobre blanco es el blanco el que no se ve.
   */
  tone?: "light" | "warm";
  /**
   * "full"   — dos botones: primario sólido + secundario outline. Cierre de página.
   * "single" — solo el primario y el teléfono. La acción secundaria NO aparece:
   *            en el hero el cotizador tiene su propia sección más abajo.
   */
  variant?: "full" | "single";
  className?: string;
};

/**
 * Sistema de conversión del sitio. Tres acciones con jerarquía visual explícita
 * y orden fijo: WhatsApp (primaria, sólida naranja) → Cotizador (secundaria,
 * outline) → Teléfono (terciaria, enlace discreto).
 *
 * El naranja de marca está reservado a la acción primaria: no usarlo aquí para
 * nada más.
 */
export function CtaGroup({
  whatsappLabel = "Cotizar por WhatsApp",
  secondaryHref = COTIZADOR_HREF,
  secondaryLabel = "Calcular mi mudanza",
  tone = "light",
  variant = "full",
  className = "",
}: CtaGroupProps) {
  const isWarm = tone === "warm";
  const isSingle = variant === "single";

  /*
   * El relleno del primario es #cb4e24 en ambos tonos. Sobre el mesh ese naranja
   * queda a 1.08:1 del fondo en el punto claro, así que el contorno del control
   * desaparece (WCAG 1.4.11 pide 3:1). El borde blanco devuelve ese límite sin
   * tocar ni el relleno ni el color del texto.
   */
  const primary = isWarm
    ? "bg-brand-orange-accessible text-white border border-white hover:bg-brand-orange-accessible-hover"
    : "bg-brand-orange-accessible text-white hover:bg-brand-orange-accessible-hover";

  const secondary = isWarm
    ? "border border-white text-white hover:bg-white hover:text-brand-blue"
    : "border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white";

  const tertiary = isWarm
    ? "text-white hover:text-white/80"
    : "text-brand-blue hover:text-brand-blue-hover";

  return (
    <div className={className}>
      {/*
        flex-wrap + whitespace-nowrap: si los dos botones no caben a lo ancho de
        la columna, la fila pasa a dos líneas ANTES de que una etiqueta se parta
        en dos. "Cotizar por WhatsApp" y "Calcular mi mudanza" nunca se rompen.
      */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-ui inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-md px-7 py-4 text-base font-medium transition-colors sm:w-auto ${primary}`}
        >
          <WhatsAppIcon />
          {whatsappLabel}
        </a>

        {!isSingle && (
          <a
            href={secondaryHref}
            className={`text-ui inline-flex w-full items-center justify-center whitespace-nowrap rounded-md px-7 py-4 text-base font-medium transition-colors sm:w-auto ${secondary}`}
          >
            {secondaryLabel}
          </a>
        )}
      </div>

      <a
        href={PHONE_HREF}
        className={`text-ui inline-flex items-center gap-2 text-sm transition-colors ${
          isSingle ? "mt-3" : "mt-5"
        } ${tertiary}`}
      >
        <PhoneIcon />
        <span>
          O llámanos al <span className="font-medium">{PHONE_DISPLAY}</span>
        </span>
      </a>
    </div>
  );
}
