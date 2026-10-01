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

/**
 * Índice (dentro de `items`, no de `visibleReviews`) de la última reseña
 * de la columna 1: la 3ª (índice 2). Fuerza el corte de columna ahí
 * (TestimonialCard, prop forceColumnBreakAfter) para que la columna 2
 * arranque siempre con la reseña que sigue y el banner —insertado justo
 * después, ver BANNER_POSITION— caiga como su SEGUNDA tarjeta, como se
 * pidió. También es lo que deja la columna del centro con más contenido
 * que la izquierda: columna 1 se corta a propósito (3 reseñas) en vez de
 * dejar que el balance automático del navegador le agregue una cuarta.
 *
 * Solo aplica con !showAll (el estado inicial, 9 reseñas): con las 14
 * completas ("Ver más" ya pulsado) el mismo corte fijo deja la columna 1
 * despoblada frente a las otras dos, que siguen creciendo con las 5
 * reseñas nuevas — ahí conviene volver a soltarle el balance automático
 * del navegador a las tres columnas.
 */
const LEFT_COLUMN_BREAK_INDEX = 2;

function TestimonialCard({
  review,
  forceColumnBreakAfter = false,
}: {
  review: Review;
  /*
    break-after-column: fuerza dónde corta la columna 1, en vez de dejarlo
    en manos del algoritmo de balance del navegador. Se probó dejándolo
    libre y el resultado no era el pedido: el navegador metía una reseña
    de más en la columna 1 (la dejaba más alta que el resto) y el banner
    caía como PRIMERA tarjeta de la columna 2, no la segunda. Con el corte
    forzado después de la 3ª reseña, la columna 2 arranca siempre con la
    4ª reseña y el banner cae exactamente en su segundo lugar.
  */
  forceColumnBreakAfter?: boolean;
}) {
  const initial = review.name.trim().charAt(0).toUpperCase();

  return (
    /*
      break-inside-avoid: la tarjeta no se parte entre columnas del masonry
      CSS. mb-4 en vez de gap: columns-* no tiene gap vertical propio, el
      espaciado entre tarjetas de una misma columna sale del margen inferior
      de cada una.
    */
    <article
      className={`mb-4 break-inside-avoid rounded-2xl bg-background p-6 shadow-[0_4px_20px_-6px_rgba(15,52,70,0.12)] ${forceColumnBreakAfter ? "break-after-column" : ""}`}
    >
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
 *
 * bg-brand-orange a propósito, para que destaque contra las tarjetas
 * blancas de reseña — con el contraste medido, no a ojo:
 *
 * - Título (text-2xl, 24px): azul de marca da 3.81:1 sobre este naranja.
 *   24px regular ya califica como "texto grande" en WCAG (umbral 24px), así
 *   que pasa AA (3:1) con margen.
 * - Párrafo: a text-base/16px normal NINGÚN color pasa AA sobre este
 *   naranja (blanco 3.44:1, azul 3.81:1 — ninguno llega a 4.5:1 de texto
 *   normal). Subido a 19px/600 —el mismo mínimo ya establecido y en uso
 *   para el botón del hero sobre este mismo naranja (ver el comentario de
 *   --color-brand-orange en globals.css)— para que también califique como
 *   texto grande y pase con los mismos 3.81:1.
 * - Botón: bg-brand-orange (naranja sobre naranja) se volvía invisible.
 *   Por la regla de botones sólidos del sistema ("sobre fondo naranja,
 *   relleno azul, texto blanco"), pasa a bg-brand-blue. Blanco sobre
 *   #0f3446 da 12.31:1, muy por encima de cualquier mínimo.
 */
function ConversionBanner() {
  const openContactModal = useContactModal();

  return (
    <article className="mb-4 flex break-inside-avoid flex-col items-start rounded-2xl bg-brand-orange p-6 shadow-[0_4px_20px_-6px_rgba(15,52,70,0.12)]">
      <p className="font-heading text-2xl text-brand-blue">
        ¿Listo para tu mudanza?
      </p>
      <p className="text-ui mt-2 text-[1.1875rem] font-semibold text-brand-blue">
        Cotiza sin compromiso y recibe tu propuesta el mismo día.
      </p>
      <button
        type="button"
        onClick={() => openContactModal({ vertical: "mudanzas" })}
        className="text-ui mt-5 inline-flex items-center rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover"
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
        {items.map((item, index) =>
          item.type === "banner" ? (
            <ConversionBanner key="conversion-banner" />
          ) : (
            <TestimonialCard
              key={item.review.name}
              review={item.review}
              forceColumnBreakAfter={!showAll && index === LEFT_COLUMN_BREAK_INDEX}
            />
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
