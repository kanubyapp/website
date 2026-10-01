"use client";

import { usePathname } from "next/navigation";
import { useContactModal } from "@/components/contact-modal";
import { WhatsAppIcon } from "@/components/icons";
import { verticalFromPathname } from "@/lib/services";

/**
 * Botón flotante de WhatsApp, en cristal líquido naranja.
 *
 * Usaba .glass-floating —cristal blanco al 55%, el mismo lenguaje que el
 * header— y sobre las secciones claras del sitio se fundía con el fondo: solo
 * se leía el texto, sin superficie. Ahora lleva .liquid-orange, que es opaca
 * por defecto y translúcida donde hay backdrop-filter, con el presupuesto de
 * contraste calculado en globals.css.
 *
 * El texto va en BLANCO: sobre esa superficie da 5.04:1 en el peor caso, que es
 * el pill sobre fondo claro.
 *
 * Es el ÚNICO elemento flotante del sitio (junto con .agenda-nudge, en la
 * esquina contraria), así que va pegado a la esquina: bottom-4, la misma
 * distancia que right-4. El padding inferior del footer está calculado a
 * partir de esta posición para que el pill no tape su contenido — ese
 * cálculo no distingue por ruta, así que ya vale también para /mudanzas.
 *
 * En TODO el sitio, incluida /mudanzas: antes tenía un `if (pathname ===
 * "/mudanzas") return null` porque se asumía que esa página iba a tener su
 * propio modal de cotización separado. Nunca se construyó así — /mudanzas
 * usa el mismo useContactModal() que el resto del sitio, así que la
 * exclusión ya no tenía motivo (no hay "dos caminos" que separar) y se
 * quitó.
 */
export function FloatingWhatsApp() {
  /* No va directo a wa.me: abre el modal de contacto, sin servicio
     preseleccionado, y este arranca en su paso 1. */
  const openContactModal = useContactModal();
  const pathname = usePathname();
  const vertical = verticalFromPathname(pathname);

  return (
    <button
      type="button"
      onClick={() => openContactModal({ vertical })}
      className="liquid-orange text-ui fixed bottom-4 right-4 z-40 inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.04] md:right-8"
    >
      {/*
        Aros de pulso: mismo criterio que .phone-pulse del header (ver
        globals.css) — dos aros desfasados, solo transform/opacity, loop
        continuo, apagados bajo prefers-reduced-motion. absolute inset-0
        toma la forma exacta del pill (ancho variable según el texto),
        detrás del contenido por orden de DOM. pointer-events-none: son
        decorativos, no deben interceptar el clic del botón.
      */}
      <span
        aria-hidden="true"
        className="whatsapp-pill-pulse pointer-events-none absolute inset-0 rounded-full bg-brand-orange"
      />
      <span
        aria-hidden="true"
        className="whatsapp-pill-pulse whatsapp-pill-pulse-offset pointer-events-none absolute inset-0 rounded-full bg-brand-orange"
      />
      <WhatsAppIcon className="relative z-10 h-5 w-5" />
      <span className="relative z-10">Escríbenos</span>
    </button>
  );
}
