"use client";

import Image from "next/image";
import { useContactModal } from "@/components/contact-modal";
import type { ServiceId, Vertical } from "@/lib/services";

/**
 * Tarjeta de servicio clicable: abre el modal de cotización con el
 * servicio ya preseleccionado (el modal salta directo al paso 2, los datos
 * de contacto — ver options.service en contact-modal.tsx).
 *
 * "use client" porque necesita useContactModal() (hook) y onClick — la
 * página que la monta (/mudanzas) es Server Component y exporta metadata,
 * así que esto no puede vivir ahí; se extrae a su propio archivo cliente.
 *
 * <button>, no un <div onClick>: da rol="button", foco por teclado (Tab) y
 * activación con Enter/Espacio gratis, sin JS ni ARIA a mano. text-left y
 * w-full porque un <button> por defecto centra el texto y no se estira a
 * su contenedor — el resto de clases son las mismas que ya tenía la
 * tarjeta cuando era un <div>.
 */
export function ServiceCard({
  title,
  description,
  image,
  service,
  vertical,
}: {
  title: string;
  description: string;
  image: string;
  service: ServiceId;
  vertical: Vertical;
}) {
  const openContactModal = useContactModal();

  return (
    <button
      type="button"
      onClick={() => openContactModal({ vertical, service })}
      aria-label={`Cotizar ${title}`}
      /*
        aspect-[3/4] en mobile/tablet, lg:aspect-[4/3] en desktop — a
        propósito responsive, no un solo valor fijo como antes. Solo el ancho
        de tarjeta en desktop cambió con el paso de 4 a 3 columnas (453px
        ahora); en mobile (1 columna) y tablet (2 columnas) el ancho por
        tarjeta es el mismo de siempre, así que la proporción que ya
        funcionaba ahí (3/4, retrato) no tenía motivo para cambiar. En
        desktop, 3/4 a 453px de ancho daba ~604px de alto — excesivo para 3
        tarjetas en fila. 4/3 (paisaje) da 340px, mucho más proporcionado a
        ese ancho. bg-surface es el relleno de respaldo mientras no hay foto:
        la foto es cover, siempre cubre el 100% del área, pero bg-surface
        evita un parpadeo a blanco/transparente durante la carga.

        focus-visible: mismo tratamiento que las opciones de servicio del
        propio modal (contact-modal.tsx) — outline de 2px en brand-blue con
        offset, solo por teclado (focus-visible, no focus), para no dejar un
        anillo permanente en clic con mouse.
      */
      className="relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden rounded-2xl bg-surface text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue lg:aspect-[4/3]"
    >
      {/*
        fill + object-cover: cubre el área completa de la tarjeta sin
        deformarse, recortando lo que sobre — el mismo criterio que
        cualquier fondo decorativo con foto. Decorativa de verdad: alt=""
        y aria-hidden, el texto de la tarjeta ya dice qué servicio es.

        sizes: sin esto, fill asume 100vw y el navegador pide siempre la
        versión más grande del srcset, incluso en mobile con 1 columna
        angosta. Con el grid real (1 columna <640px, 2 columnas 640–1023px,
        3 columnas ≥1024px, más el gap y el edge-gap del contenedor) cada
        tarjeta ronda 33vw en desktop, 50vw en tablet y el ancho casi
        completo del viewport en mobile.
      */}
      <Image
        src={image}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />

      {/*
        Overlay: capa intermedia a propósito — encima de la foto, debajo del
        texto (que lleva su propio z-10). Gradiente en background-image,
        nunca en el shorthand `background`.

        Antes: 0%–68% plano a 0.92 (sin variar) y recién ahí empezaba a
        bajar hasta 0 en 90%. Ese tramo plano seguido de una caída es lo que
        se leía como un corte en línea recta a media altura — el ojo nota
        el cambio de pendiente, no solo el color. Ahora son 4 paradas sin
        ningún tramo plano, así que la opacidad cambia todo el tiempo, de
        abajo arriba: 0.95 → 0.85 → 0.62 → 0.32. El mínimo ya no es 0: la
        parada de arriba queda en 0.32, no transparente del todo, para que
        la foto se vea más tenue en TODA la tarjeta, no solo detrás del
        texto.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,52,70,0.95)_0%,rgba(15,52,70,0.85)_45%,rgba(15,52,70,0.62)_70%,rgba(15,52,70,0.32)_100%)]"
      />

      <div className="relative z-10 p-6 text-white">
        {/* Espacio para ícono, sin imagen todavía. Borde blanco: sobre el
            azul del overlay, border-border (pensado para fondo claro) se
            perdía. */}
        <div
          aria-hidden="true"
          className="h-12 w-12 rounded-full border border-white/40"
        />
        <h3 className="font-heading mt-3 text-2xl">{title}</h3>
        <p className="mt-2 text-sm text-white/80">{description}</p>
      </div>
    </button>
  );
}
