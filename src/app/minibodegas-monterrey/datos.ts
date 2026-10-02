/*
 * Contenido de /minibodegas-monterrey/ copiado del publicado: preguntas
 * frecuentes y reseñas de Google (antes widget de Trustindex, ahora estáticas
 * según docs/replica-decisiones.md). El texto de las reseñas es de usuario y
 * va tal cual.
 */

/** Un párrafo (con "\n" para el salto de línea del original) o una lista. */
export type Bloque = string | string[];

export const preguntas: { pregunta: string; respuesta: Bloque[] }[] = [
  {
    pregunta: "¿Cuál es el horario para acceder a mi mini bodega?",
    respuesta: [
      "Nuestro horario es:",
      [
        "Lunes a Viernes: 9:00 AM – 7:00 PM",
        "Sábados: 9:30 AM – 1:00 PM",
        "Domingos: Cerrado",
        "Días festivos oficiales: Cerrado",
      ],
      "Estamos trabajando para implementar acceso 24/7 mediante tecnología automatizada próximamente.",
    ],
  },
  {
    pregunta: "¿Qué seguridad tiene la sucursal?",
    respuesta: [
      "La sucursal cuenta con:",
      [
        "Sistema de videovigilancia 24/7",
        "Accesos controlados",
        "Iluminación automática nocturna",
        "Instalaciones cerradas y monitoreadas",
      ],
      "Nuestro objetivo es brindarte seguridad y tranquilidad para tus pertenencias.",
    ],
  },
  {
    pregunta: "¿Qué medidas de mini bodegas manejan?",
    respuesta: [
      "Contamos con 3 tamaños de Mini-Bodega:",
      [
        "3.5 m² – Ideal para cajas, artículos personales o inventario pequeño.",
        "7 m² – Perfecta para muebles de un departamento o inventario comercial.",
        "14 m² – Ideal para mudanzas completas, mobiliario o mercancía voluminosa.",
      ],
      "Si necesitas más espacio, puedes rentar varias bodegas según tus necesidades.",
    ],
  },
  {
    pregunta: "¿Cómo recibo mi mini bodega al momento de rentarla?",
    respuesta: [
      "Tu mini bodega se entrega:",
      ["Limpia", "Fumigada", "En óptimas condiciones"],
      "Lista para utilizarse de inmediato.",
    ],
  },
  {
    pregunta: "¿Cuentan con control de plagas?",
    respuesta: [
      "Sí. Realizamos fumigación profesional mensual con empresa especializada para mantener las instalaciones en condiciones adecuadas.",
    ],
  },
  {
    pregunta: "¿Ofrecen servicio de mudanza o recolección?",
    respuesta: [
      "Sí. Contamos con nuestra empresa hermana Kanuby Mudanzas, que puede encargarse de recoger y devolver tus pertenencias.",
      "Como cliente de nuestras mini bodegas, obtienes tarifa preferencial.",
    ],
  },
  {
    pregunta: "¿Cómo puedo pagar mi mini bodega?",
    respuesta: [
      "Aceptamos:",
      [
        "Tarjeta de débito o crédito (con opción de domiciliación)",
        "Transferencia bancaria",
        "Pago directo en sucursal",
      ],
    ],
  },
  {
    pregunta: "¿Qué necesito para contratar una mini bodega?",
    respuesta: [
      "Persona Física:",
      ["Identificación oficial vigente", "Comprobante de domicilio vigente"],
      "Persona Moral:",
      [
        "Acta constitutiva",
        "Poder del representante legal",
        "Identificación oficial del representante",
        "Cédula de situación fiscal",
      ],
    ],
  },
  {
    pregunta: "¿Existe plazo mínimo de renta?",
    respuesta: [
      "Sí. El plazo mínimo de renta es de 1 mes.",
      "La renta se paga por mensualidades adelantadas.\nPor ejemplo, si contrataste el día 14, tu siguiente pago deberá realizarse el día 14 del mes siguiente.",
      "Si transcurre un día después de tu fecha de pago sin haberse realizado el mismo, ya corresponde el pago completo del siguiente mes de almacenamiento conforme a tu contrato.",
    ],
  },
  {
    pregunta: "¿Cómo se formaliza la contratación?",
    respuesta: [
      "La contratación se realiza mediante la firma de un contrato, el cual puede firmarse:",
      ["De forma presencial en sucursal", "De forma digital"],
      "El proceso es ágil y sencillo.",
    ],
  },
];

/** Texto plano de una respuesta, para el JSON-LD de FAQPage. */
export function textoPlano(bloques: Bloque[]): string {
  return bloques
    .map((bloque) => (Array.isArray(bloque) ? bloque.join(". ") : bloque.replace("\n", " ")))
    .join(" ");
}

export type Resena = {
  nombre: string;
  /** AAAA-MM-DD, del data-time del widget publicado */
  fecha: string;
  estrellas: number;
  avatar: string;
  texto: string;
};

export const resenas: Resena[] = [
  {
    nombre: "Elsy Gutierrez",
    fecha: "2024-06-07",
    estrellas: 5,
    avatar: "/images/minibodegas/resenas/elsy-gutierrez.png",
    texto: "Excelente servicio, muy puntuales y súper profesionales",
  },
  {
    nombre: "Felipeduardo Villarreal",
    fecha: "2024-04-29",
    estrellas: 5,
    avatar: "/images/minibodegas/resenas/felipeduardo-villarreal.png",
    texto:
      "Excelente servicio, el mejor precio del mercado y muy puntuales. Emplayaron todas mis cosas incluyendo un colchon king size, muy profesionales.",
  },
  {
    nombre: "Alejandro Lozano",
    fecha: "2024-04-19",
    estrellas: 5,
    avatar: "/images/minibodegas/resenas/alejandro-lozano.png",
    texto:
      "Excelente servicio! Muy rápido todo el proceso desde la contratación hasta recolección y servicio posterior. Gracias por todo!",
  },
  {
    nombre: "Marcela Santos",
    fecha: "2024-03-25",
    estrellas: 5,
    avatar: "/images/minibodegas/resenas/marcela-santos.png",
    texto:
      "Excelente servicio de Kanuby. Muy contenta con la atención que han tenido en general, desde el primer contacto fueron muy amables y me explicaron todo a detalle. Fueron a mi casa en el día acordado, llegaron muy puntuales. Cubrieron con una película de plástico todo lo que iba a guardar en la bodega. Ellos cargaron todo con mucho cuidado. Todos muy atentos y el servicio fue muy rápido. Me gustó mucho que solo pagas por el espacio real que usas en la bodega.\nEn tu cuenta dentro de Kanuby puedes ver las fotografías de las cosas que están en la bodega. El sistema de pago es muy sencillo. Los recomiendo ampliamente.",
  },
  {
    nombre: "Daniel Escalon",
    fecha: "2024-03-14",
    estrellas: 5,
    avatar: "/images/minibodegas/resenas/daniel-escalon.png",
    texto:
      "El servicio es muy práctico a las necesidades que tenia muy recomendable por mi parte, excelente servicio 👍",
  },
  {
    nombre: "Brenn Balderas",
    fecha: "2024-03-11",
    estrellas: 5,
    avatar: "/images/minibodegas/resenas/brenn-balderas.png",
    texto:
      "Excelente servicio en atención por parte del personal, súper accesible y fácil el método que manejan. Gracias Fabricio por todo",
  },
  {
    nombre: "Mario De La Portilla",
    fecha: "2024-03-04",
    estrellas: 5,
    avatar: "/images/minibodegas/resenas/mario-de-la-portilla.png",
    texto:
      "El servicio es rápido, eficiente, son amables Diego y Fabrizio se aseguran de que todo marche en órden, se tiene una documentación por imagenes de lo que uno tiene guardado y eso es un valor agregado, además del ahorro de tiempo de llevar y traer lo cual me hizo decidirme pro Kanuby",
  },
  {
    nombre: "Ulyses Argomedo",
    fecha: "2024-02-14",
    estrellas: 5,
    avatar: "/images/minibodegas/resenas/ulyses-argomedo.png",
    texto: "Muy recomendable.... Soy cuidadosos con la manipulación y acomodo de los muebles.",
  },
  {
    nombre: "Adolfo Orduno",
    fecha: "2024-01-13",
    estrellas: 5,
    avatar: "/images/minibodegas/resenas/adolfo-orduno.png",
    texto:
      "Todo muy eficiente y cordial, tuvieron mucho cuidado con los muebles, y ellos mismos hicieron el emplayado de mis artículos; dieron seguimiento completo a cada paso del proceso, excelente sitio web. Recomendadísimo!",
  },
  {
    nombre: "Danna Trueba",
    fecha: "2024-01-11",
    estrellas: 5,
    avatar: "/images/minibodegas/resenas/danna-trueba.png",
    texto:
      "Una opción súper buena, fácil y rápida para almacenar tus cosas sin preocuparte de la logística !!",
  },
];
