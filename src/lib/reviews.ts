export type Review = {
  name: string;
  text: string;
  /**
   * Opcionales: solo los presentan las reseñas usadas en el carrusel de
   * testimonios de /mudanzas (foto + antigüedad). El resto del masonry no los
   * lleva y sigue funcionando igual.
   */
  photo?: string;
  /** ISO yyyy-mm-dd. La antigüedad ("hace N semanas") se calcula en el render
   * a partir de esta fecha, no se guarda como texto — así no queda
   * desactualizada. */
  date?: string;
};

/**
 * Reviews de Google tomadas del carrusel de kanuby.com/mudanzas-monterrey.
 *
 * Texto y nombres VERBATIM: no corregir ortografía, acentos ni puntuación, y no
 * añadir reviews que no vengan de Google. Son reseñas reales de clientes.
 *
 * Todas son de 5 estrellas: la tarjeta pinta 5 estrellas fijas y por eso no hay
 * campo `rating`. Si algún día entra una reseña con otra puntuación, añadirlo
 * aquí antes de publicarla.
 *
 * El orden importa: la sección es un masonry en columnas CSS, que llena la
 * primera columna antes de pasar a la siguiente. Reseñas largas y cortas van
 * intercaladas para que las tres columnas queden de altura parecida.
 */
export const mudanzasReviews: Review[] = [
  {
    name: "Sergio Villarreal",
    text: "Les marque de urgencia y en 20 minutos me mandaron dos unidades para un flete local. Muy satisfecho y muy capacitado el equipo ellos se encargan de todo ampliamente recomendado",
    photo: "/mudanzas/testimonios/sergio-villarreal.png",
    date: "2026-06-15",
  },
  {
    name: "Maru Garza M",
    text: "Súper servicio de todo el equipo!!! Hicieron todo el trabajo en 2 horas!! De súper ultima hora los busqué y tenían espacio. Llegaron a tiempo y terminaron todo 10/10",
    photo: "/mudanzas/testimonios/maru-garza.png",
    date: "2026-07-06",
  },
  {
    name: "Edgar Holguin",
    text: "Muy buen servicio, llegaron a tiempo, cuidaron los muebles y la cuenta al final fue muy clara",
  },
  {
    name: "Gloria Fuertes",
    text: "Kanuby nos dio un servicio de mudanza local excelente, desde el primer contacto al cotizar, hasta el final. Fueron claros, puntuales, de trato respetuoso, cordial, amable y eficiente. Por la experiencia que tuvimos lo recomendamos ámpliamente.",
  },
  {
    name: "Lucio Dominguez",
    text: "Todo muy bien, el personal fue a mi domicilio a verificar lo necesario, el día de la mudanza a tiempo al igual que la descarga, los operarios muy atentos y serviciales. Los volvería a contratar",
    photo: "/mudanzas/testimonios/lucio-dominguez.jpg",
    date: "2026-02-16",
  },
  {
    name: "Eva Sanchez",
    text: "Estoy muy agradecida del servicio que me han prestado, un precio razonable y un excelente servicio, ayuda muchisimo contar con tanto apoyo como el emplayado y el transporte, gracias!",
    photo: "/mudanzas/testimonios/eva-sanchez.jpg",
    date: "2026-07-20",
  },
  {
    name: "Mónica González",
    text: "Muy recomendable, buena atención, 100 % seguro. Cada duda que tenía sin problema lo resolvían lo recomiendo mucho",
    photo: "/mudanzas/testimonios/monica-gonzalez.jpg",
    date: "2026-01-12",
  },
  {
    name: "Carmen Valdez",
    text: "Las personas que manejan los muebles son muy cuidadosos, se fijan en detalles y hacen las cosas muy bien. Además dan tips y te ayudan en cosas específicas que pudieras necesitar. Felicidades por el excelente servicio.",
  },
  {
    name: "Adolfo Orduno",
    text: "Todo muy eficiente y cordial, tuvieron mucho cuidado con los muebles, y ellos mismos hicieron el emplayado de mis artículos; dieron seguimiento completo a cada paso del proceso, excelente sitio web. Recomendadísimo!",
  },
  {
    name: "Francisco Flores",
    text: "Excelente servicio, desde la cotización que nos mandaron se ve que el trabajo lo hacen muy profesional, las personas que vinieron se portaron muy accesibles, respetuosos y honestos, nos ayudaron con todo muy bien. Muchas gracias por el excelente trato. Los recomiendo ampliamente",
  },
  {
    name: "Nina Garza",
    text: "Excelente servicio! Muy profesionales en todos los aspectos. Puntualidad, manejo de las cosas, servicio del personal, calidad de los camiones, etc. Muy recomendable!",
  },
  {
    name: "Romelia Herrera Valle",
    text: "Llegaron a tiempo, con excelente actitud y disposición. Hicieron sus maniobras con mucho cuidado, empacaron súper bien, y fueron muy ágiles. Definitivamente lo recomiendo ampliamente.",
  },
  {
    name: "Patricia Alemán",
    text: "Ha sido la mejor experiencia con ellos, cordial atención, ellos se ocupan de mover, embalar y transportar. Precios super accesibles. Los mejores, lo recomiendo.",
  },
  {
    name: "Mario Chavez",
    text: "Muy buen servicio! Eficiente, transparente y a la medida! 1000% los volvería a contratar, si tienes alguna problema en específico están dispuestos a ayudarte",
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
