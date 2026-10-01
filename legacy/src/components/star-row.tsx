import { StarIcon } from "@/components/icons";

/**
 * Fila de 5 estrellas. Se usa en el encabezado de la sección de testimonios
 * (Server Component) y dentro de cada TestimonialCard (Client Component,
 * ver testimonials-masonry.tsx) — vive en su propio archivo para no
 * duplicarla ni forzar una dirección de import rara entre página y
 * componente cliente.
 */
export function StarRow({
  size = "h-3.5 w-3.5",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-0.5 text-brand-orange ${className}`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} className={size} />
      ))}
    </div>
  );
}
