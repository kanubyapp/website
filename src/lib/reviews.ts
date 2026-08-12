export type Review = {
  name: string;
  text: string;
};

/**
 * Reviews de Google tomadas del carrusel de kanuby.com/mudanzas-monterrey.
 *
 * Texto y nombres VERBATIM: no corregir ortografía, acentos ni puntuación, y no
 * añadir reviews que no vengan de Google. Son reseñas reales de clientes.
 *
 * El sitio de origen no muestra la calificación en estrellas, por eso no hay
 * campo `rating`. Si se confirma la puntuación de cada una, añadirlo aquí y
 * pintarlo en la tarjeta.
 */
export const mudanzasReviews: Review[] = [
  {
    name: "Sergio Villarreal",
    text: "Les marque de urgencia y en 20 minutos me mandaron dos unidades para un flete local. Muy satisfecho y muy capacitado el equipo ellos se encargan de todo ampliamente recomendado",
  },
  {
    name: "Lucio Dominguez",
    text: "Todo muy bien, el personal fue a mi domicilio a verificar lo necesario, el día de la mudanza a tiempo al igual que la descarga, los operarios muy atentos y serviciales. Los volvería a contratar.",
  },
  {
    name: "Eva Sanchez",
    text: "Estoy muy agradecida del servicio que me han prestado, un precio razonable y un excelente servicio, ayuda muchisimo contar con tanto apoyo como el emplayado y el transporte, gracias!",
  },
  {
    name: "Maru Garza M",
    text: "Súper servicio de todo el equipo!!! Hicieron todo el trabajo en 2 horas!! De súper ultima hora los busqué y tenían espacio. Llegaron a tiempo y terminaron todo 👏🏼👏🏼 10/10",
  },
  {
    name: "Mónica González",
    text: "Muy recomendable, buena atención, 100 % seguro. Cada duda que tenía sin problema lo resolvían lo recomiendo mucho",
  },
];

/**
 * TODO(contenido-sin-validar): reseñas de clientes de MINI BODEGAS.
 *
 * Vacío a propósito. El sitio actual no publica reseñas de esta vertical y
 * NO se pueden reutilizar las de mudanzas: son de otro servicio y otro cliente,
 * y presentarlas en /mini-bodegas sería atribuir a un servicio opiniones que
 * hablan de otro.
 *
 * Mientras esté vacío, <ReviewsGrid /> no renderiza nada. Al pegar aquí las
 * reseñas reales de Google, la sección aparece sola.
 */
export const miniBodegasReviews: Review[] = [];
