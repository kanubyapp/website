/*
 * Reseñas del carrusel de testimonios de las páginas de mudanzas (CPT
 * "testimonio" de kanuby.com). Texto de usuario copiado tal cual. La fecha es
 * la que muestra el sitio publicado.
 */

export type Testimonio = {
  nombre: string;
  fecha: string;
  estrellas: number;
  texto: string;
  avatar: string;
};

export const testimonios: Testimonio[] = [
  {
    nombre: "Sergio Villarreal",
    fecha: "Hace 9 semanas",
    estrellas: 5,
    texto:
      "Les marque de urgencia y en 20 minutos me mandaron dos unidades para un flete local. Muy satisfecho y muy capacitado el equipo ellos se encargan de todo ampliamente recomendado",
    avatar: "/images/mudanzas/testimonios/sergio-villarreal.png",
  },
  {
    nombre: "Eva Sanchez",
    fecha: "Hace 4 semanas",
    estrellas: 5,
    texto:
      "Estoy muy agradecida del servicio que me han prestado, un precio razonable y un excelente servicio, ayuda muchisimo contar con tanto apoyo como el emplayado y el transporte, gracias!",
    avatar: "/images/mudanzas/testimonios/eva-sanchez.jpg",
  },
  {
    nombre: "Mónica González",
    fecha: "Hace 31 semanas",
    estrellas: 5,
    texto:
      "Muy recomendable, buena atención, 100 % seguro. Cada duda que tenía sin problema lo resolvían lo recomiendo mucho",
    avatar: "/images/mudanzas/testimonios/monica-gonzalez.jpg",
  },
  {
    nombre: "Lucio Dominguez",
    fecha: "Hace 26 semanas",
    estrellas: 5,
    texto:
      "Todo muy bien, el personal fue a mi domicilio a verificar lo necesario, el día de la mudanza a tiempo al igual que la descarga, los operarios muy atentos y serviciales. Los volvería a contratar.",
    avatar: "/images/mudanzas/testimonios/lucio-dominguez.jpg",
  },
  {
    nombre: "Maru Garza M",
    fecha: "Hace 6 semanas",
    estrellas: 5,
    texto:
      "Súper servicio de todo el equipo!!! Hicieron todo el trabajo en 2 horas!! De súper ultima hora los busqué y tenían espacio. Llegaron a tiempo y terminaron todo 👏🏼👏🏼 10/10",
    avatar: "/images/mudanzas/testimonios/maru-garza.png",
  },
];
