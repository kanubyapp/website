import type { Review } from "@/lib/reviews";

type ReviewsGridProps = {
  reviews: Review[];
  title?: string;
};

/**
 * Prueba social en grid, no en carrusel: todas las reseñas van en el HTML
 * inicial, visibles e indexables.
 *
 * Devuelve null si no hay reseñas para esa vertical, para no publicar una
 * sección vacía. Las reseñas son por servicio: no mezclar las de mudanzas en
 * mini bodegas ni al revés.
 */
export function ReviewsGrid({
  reviews,
  title = "Lo que dicen nuestros clientes",
}: ReviewsGridProps) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="max-w-2xl text-3xl tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="text-ui mt-4 text-sm text-muted">
          Reseñas publicadas en Google por clientes de Kanuby.
        </p>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={review.name}
              className="flex flex-col rounded-lg border border-border bg-background p-7"
            >
              <blockquote className="flex-1 text-base text-foreground">
                {review.text}
              </blockquote>
              <p className="text-ui mt-6 text-sm text-muted">{review.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
