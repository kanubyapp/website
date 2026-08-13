"use client";

import { useContactModal } from "@/components/contact-modal";
import type { ServiceId, Vertical } from "@/lib/services";

export type ServiceTypeCard = {
  /** Servicio que queda preseleccionado en el modal al pulsar la tarjeta. */
  serviceId: ServiceId;
  eyebrow: string;
  title: string;
  description: string;
};

/**
 * Tarjetas de "Tipos de servicio". No navegan a ninguna página: cada una abre
 * el modal de contacto con su servicio ya elegido, así que el elemento correcto
 * es un <button>, no un enlace — y por eso tampoco aparecen en la lista de
 * enlaces de un lector de pantalla.
 */
export function ServiceTypeCards({
  cards,
  vertical,
}: {
  cards: ServiceTypeCard[];
  vertical: Vertical;
}) {
  const openContactModal = useContactModal();

  return (
    <ul className="mt-12 grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <li key={card.title}>
          {/*
            TODO(imagen): placeholder hasta tener foto real. Al conectarla,
            sustituir el bloque del centro por un <Image fill> con object-cover;
            el aspecto, el radio, el velo y el rótulo se quedan tal cual.
          */}
          <button
            type="button"
            onClick={() => openContactModal({ service: card.serviceId, vertical })}
            /* .card-lift (globals.css) pone las dos duraciones —320ms el
               desplazamiento, 620ms la sombra— y la curva --ease-soft. Aquí
               solo va el estado de hover. */
            className="card-lift relative flex aspect-[5/4] w-full flex-col justify-end overflow-hidden rounded-2xl bg-surface text-left shadow-lg shadow-brand-blue/5 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-blue/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="text-ui text-sm text-muted">
                Imagen · pendiente
              </span>
            </span>

            {/*
              Velo en AZUL DE MARCA, no negro. Cubre tres cuartos porque sostiene
              tres bloques de texto. Sobre el placeholder claro (#f5f7f8) —el
              peor caso, cualquier foto real es más oscura— el blanco da 6.2:1
              donde arranca la descripción y 10.9:1 en el pie.
            */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-brand-blue/95 via-brand-blue/75 to-transparent"
            />

            <span className="relative block p-6">
              <span className="text-ui block text-xs font-medium uppercase tracking-[0.14em] text-white/85">
                {card.eyebrow}
              </span>
              <span className="font-heading mt-2 block text-3xl leading-tight text-white">
                {card.title}
              </span>
              <span className="mt-3 block text-base text-white/90">
                {card.description}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
