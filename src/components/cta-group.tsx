"use client";

import { usePathname } from "next/navigation";
import { useContactModal } from "@/components/contact-modal";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { COTIZADOR_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { verticalFromPathname } from "@/lib/services";

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
   * La acción primaria ya no va a wa.me: abre el modal de contacto, que captura
   * los datos y de ahí sí manda a WhatsApp con el mensaje armado. Sin servicio
   * preseleccionado —desde un cierre de página no sabemos cuál— así que el modal
   * arranca en su paso 1.
   */
  const openContactModal = useContactModal();
  const vertical = verticalFromPathname(usePathname());

  /*
   * Sobre el mesh —que ahora es CLARO— el primario va en azul de marca sólido
   * con texto blanco. El blanco relleno que había antes era para el mesh café:
   * sobre un fondo crema pierde el contorno (1.19:1 contra el punto más claro,
   * y 1.4.11 pide 3.0).
   *
   * Contrastes verificados contra el punto MÁS CLARO del mesh (#ffebc4, el que
   * menos separa de un relleno oscuro; el peor caso del texto va al revés y
   * está calculado en globals.css):
   *   - blanco sobre azul #0f3446 .................. 12.31:1  (AA texto: 4.5)
   *   - azul contra el mesh claro .................. 11.24:1  (1.4.11: 3.0)
   *   - hover #0a2733 contra el mesh claro ......... 12.55:1
   *
   * En el tono light NO se toca nada: naranja accesible con texto blanco.
   */
  const primary = isWarm
    ? "rounded-full bg-brand-blue text-white hover:bg-brand-blue-hover"
    : "rounded-full bg-brand-orange-accessible text-white hover:bg-brand-orange-accessible-hover";

  const secondary =
    "border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white";

  const tertiary = "text-brand-blue hover:text-brand-blue-hover";

  return (
    <div className={className}>
      {/*
        flex-wrap + whitespace-nowrap: si los dos botones no caben a lo ancho de
        la columna, la fila pasa a dos líneas ANTES de que una etiqueta se parta
        en dos. "Cotizar por WhatsApp" y "Calcular mi mudanza" nunca se rompen.
      */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="button"
          onClick={() => openContactModal({ vertical })}
          className={`text-ui inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap px-7 py-4 text-base font-medium transition-colors sm:w-auto ${primary}`}
        >
          <WhatsAppIcon />
          {whatsappLabel}
        </button>

        {!isSingle && (
          <a
            href={secondaryHref}
            className={`text-ui inline-flex w-full items-center justify-center whitespace-nowrap rounded-full px-7 py-4 text-base font-medium transition-colors sm:w-auto ${secondary}`}
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
