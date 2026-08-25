"use client";

import { useState } from "react";
import { useContactModal } from "@/components/contact-modal";
import { StarRow } from "@/components/star-row";
import type { Review } from "@/lib/reviews";

/** Cuántas reseñas se muestran antes de pulsar "Ver más reseñas". */
const INITIAL_VISIBLE = 9;

/**
 * Dónde cae el banner de conversión dentro del bloque visible: después de
 * la 4ª reseña (o sea, es la 5ª tarjeta). Ni primero ni al final —a
 * propósito, se pidió que se lea natural intercalado, no como cierre— y
 * deja siempre reseñas después (5 en el estado inicial, 10 con "Ver más"
 * ya pulsado), así que nunca termina siendo la última tarjeta en ningún
 * estado.
 */
const BANNER_POSITION = 4;

function TestimonialCard({ review }: { review: Review }) {
  const initial = review.name.trim().charAt(0).toUpperCase();

  return (
    /*
      break-inside-avoid: la tarjeta no se parte entre columnas del masonry
      CSS. mb-4 en vez de gap: columns-* no tiene gap vertical propio, el
      espaciado entre tarjetas de una misma columna sale del margen inferior
      de cada una.
    */
    <article className="mb-4 break-inside-avoid rounded-2xl bg-background p-6 shadow-[0_4px_20px_-6px_rgba(15,52,70,0.12)]">
      <span
        aria-hidden="true"
        className="font-heading block text-5xl leading-none text-border"
      >
        &ldquo;
      </span>
      <p className="mt-2 text-base text-muted">{review.text}</p>
      <div className="mt-5 flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-medium text-white"
        >
          {initial}
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">{review.name}</p>
          <StarRow size="h-3 w-3" className="mt-0.5" />
        </div>
      </div>
    </article>
  );
}

/**
 * Banner de conversión intercalado en el masonry de testimonios. MISMO
 * contenedor que TestimonialCard (mismo radio, sombra, padding,
 * break-inside-avoid) para que se lea como parte del mismo sistema de
 * tarjetas — lo que cambia es el contenido de adentro, no la caja.
 *
 * No es una Review: vive fuera de mudanzasReviews, así que no se cuenta en
 * REVIEW_COUNT ni entra en el promedio (ambos se calculan en page.tsx
 * directo del array de datos, antes de que este componente intercale nada).
 */
function ConversionBanner() {
  const openContactModal = useContactModal();

  return (
    <article className="mb-4 flex break-inside-avoid flex-col items-start rounded-2xl bg-background p-6 shadow-[0_4px_20px_-6px_rgba(15,52,70,0.12)]">
      <p className="font-heading text-2xl text-brand-blue">
        ¿Listo para tu mudanza?
      </p>
      <p className="mt-2 text-base text-muted">
        Cotiza sin compromiso y recibe tu propuesta el mismo día.
      </p>
      <button
        type="button"
        onClick={() => openContactModal({ vertical: "mudanzas" })}
        className="text-ui mt-5 inline-flex items-center rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-hover"
      >
        Cotizar ahora
      </button>
    </article>
  );
}

export function TestimonialsMasonry({ reviews }: { reviews: Review[] }) {
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? reviews : reviews.slice(0, INITIAL_VISIBLE);

  /* El banner se intercala en el render, no en los datos: mudanzasReviews
     no se toca, así que REVIEW_COUNT y AVERAGE_RATING (calculados en
     page.tsx) nunca lo ven. */
  const items = [
    ...visibleReviews
      .slice(0, BANNER_POSITION)
      .map((review) => ({ type: "review" as const, review })),
    { type: "banner" as const },
    ...visibleReviews
      .slice(BANNER_POSITION)
      .map((review) => ({ type: "review" as const, review })),
  ];

  return (
    <>
      <div className="mt-12 columns-1 gap-4 px-4 sm:columns-2 md:px-16 lg:columns-3">
        {items.map((item) =>
          item.type === "banner" ? (
            <ConversionBanner key="conversion-banner" />
          ) : (
            <TestimonialCard key={item.review.name} review={item.review} />
          ),
        )}
      </div>

      {!showAll && (
        <div className="mt-4 flex justify-center px-4 md:px-16">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="text-ui inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-brand-blue transition-colors hover:border-brand-blue hover:bg-surface"
          >
            Ver más reseñas
          </button>
        </div>
      )}
    </>
  );
}
