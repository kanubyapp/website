/*
 * Posts del blog de kanuby.com: los 24 del post-sitemap, del más reciente al
 * más antiguo. Generado a partir del sitio publicado (contenido de la API de
 * WordPress, metadatos de Yoast); el cuerpo va limpio, sin markup de Elementor
 * ni de WordPress.
 *
 * En el publicado, 14 de los 24 posts no tienen contenido (la API también lo
 * devuelve vacío); aquí se replican igual, con contenido vacío.
 *
 * Encabezados: el título del post es el H1, así que el contenido empieza en
 * h2. Si un post empezaba en h3, sus niveles suben uno; "estilo" conserva el
 * nivel original para que se vean igual.
 */

export type CategoriaSlug = "mudanzas" | "minibodegas" | "sin-categoria";

export const categorias: Record<CategoriaSlug, string> = {
  mudanzas: "Mudanzas",
  minibodegas: "Minibodegas",
  "sin-categoria": "Sin categoría",
};

export type Inline =
  | string
  | { salto: true }
  | { negrita: Inline[] }
  | { cursiva: Inline[] }
  | { enlace: string; texto: Inline[] };

export type BloquePost =
  | { tipo: "titulo"; nivel: 2 | 3 | 4; estilo: 2 | 3 | 4; texto: Inline[] }
  | { tipo: "parrafo"; texto: Inline[] }
  | { tipo: "lista"; ordenada: boolean; items: Inline[][] }
  | { tipo: "separador" };

export type Post = {
  slug: string;
  titulo: string;
  /** datePublished del sitio publicado (ISO 8601) */
  fecha: string;
  /** dateModified del sitio publicado (ISO 8601) */
  modificado: string;
  categorias: CategoriaSlug[];
  imagen: {
    src: string;
    width: number;
    height: number;
    alt: string;
  } | null;
  seo: {
    /** <title> completo del publicado */
    titulo: string;
    descripcion: string | null;
    /** wordCount del JSON-LD de Article */
    palabras: number;
    /** "Tiempo de lectura" de Yoast */
    lectura: string | null;
  };
  contenido: BloquePost[];
};

export const posts: Post[] = [
  {
    "slug": "como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza",
    "titulo": "Cómo organizar tu nuevo hogar después de la mudanza",
    "fecha": "2025-05-14T00:36:05+00:00",
    "modificado": "2025-05-26T23:05:37+00:00",
    "categorias": [
      "sin-categoria"
    ],
    "imagen": {
      "src": "/images/posts/como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza.jpeg",
      "width": 626,
      "height": 417,
      "alt": "Familia jugando con cajas de mudanza en su nuevo hogar"
    },
    "seo": {
      "titulo": "Cómo organizar tu nuevo hogar después de la mudanza - Kanuby",
      "descripcion": "Descubre cómo organizar tu nuevo hogar después de tu mudanza. Tips prácticos para que disfrutes tu espacio desde el primer día",
      "palabras": 359,
      "lectura": "2 minutos"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Una vez que llegas a tu nueva casa, comienza una etapa clave: ",
          {
            "negrita": [
              "organizar tu nuevo hogar"
            ]
          },
          ". Después de la mudanza, es normal sentirse abrumado entre cajas y muebles, pero con un poco de orden, todo puede fluir mejor."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 3,
        "estilo": 3,
        "texto": [
          "Consejos para organizarte tras la mudanza:"
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 2,
        "texto": [
          "1. Desempaqueta por áreas clave"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Empieza por las zonas más necesarias: cocina, baño y recámara. Tener estos espacios funcionales desde el principio te dará comodidad mientras organizas el resto de la casa."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 2,
        "texto": [
          "2. Etiqueta y clasifica"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Antes de abrir todas las cajas, identifica qué contiene cada una. Esto te ahorrará tiempo y te permitirá colocar cada cosa en su sitio sin tanto movimiento."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 2,
        "texto": [
          "3. Depura mientras organizas"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "No todo lo que llegó a tu nuevo hogar necesita quedarse. Aprovecha este momento para hacer una limpieza consciente: tira lo que esté roto o en mal estado, dona lo que aún sirve pero ya no usas, y vende aquello que pueda tener un segundo valor para alguien más. Esta es tu oportunidad de comenzar en un espacio más ligero, funcional y libre de acumulaciones innecesarias. Menos cosas significa menos desorden y más claridad mental."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 2,
        "texto": [
          "4. Usa soluciones de almacenamiento"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Invierte en cajas, organizadores y repisas. Mantener cada categoría de objetos en su lugar hará más fácil el mantenimiento del orden a largo plazo. Cada categoría de objetos (ropa, papelería, herramientas, recuerdos, etc.) debe tener su propio espacio designado. Esto no solo facilita encontrar lo que necesitas rápidamente, sino que también hace más fácil mantener el orden a largo plazo."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 2,
        "texto": [
          "5. Considera una minibodega"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Si hay artículos que no vas a necesitar de inmediato o simplemente ocupan mucho espacio, ",
          {
            "negrita": [
              "rentar una minibodega en Monterrey"
            ]
          },
          " puede ser la mejor opción. Tendrás más libertad para organizar sin saturar tu casa."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 3,
        "estilo": 3,
        "texto": [
          "Haz de tu nuevo espacio un lugar cómodo y funcional"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "¿Listo para empezar esta nueva etapa? Organiza con calma y si necesitas apoyo, Kanuby está para ayudarte."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Te puede interesar: ",
          {
            "enlace": "/los-mejores-dias-y-horarios-para-hacer-tu-mudanza-en-monterrey/",
            "texto": [
              "Los mejores días y horarios para hacer tu mudanza en Monterrey"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "mudanzas-premium-san-pedro",
    "titulo": "Mudanzas en San Pedro Garza García: servicio premium en Monterrey",
    "fecha": "2025-05-14T00:33:02+00:00",
    "modificado": "2025-05-26T23:13:58+00:00",
    "categorias": [
      "sin-categoria"
    ],
    "imagen": {
      "src": "/images/posts/mudanzas-premium-san-pedro.jpeg",
      "width": 736,
      "height": 1104,
      "alt": "Niña ayudando a desempacar una caja con material de protección"
    },
    "seo": {
      "titulo": "Mudanzas premium en San Pedro Garza García",
      "descripcion": "Mudanzas en San Pedro Garza García. Traslados seguros, rápidos y personalizados en Monterrey. ¡Tu mudanza sin complicaciones!",
      "palabras": 377,
      "lectura": "2 minutos"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Si estás por cambiarte de casa o departamento en San Pedro Garza García, lo ideal es contratar un ",
          {
            "negrita": [
              "servicio de mudanzas premium"
            ]
          },
          " que entienda la importancia del cuidado, la puntualidad y la atención personalizada. Por eso hoy te contaremos por qué Kanuby es tu mejor opción en mudanzas."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "¿Por qué elegir un servicio premium de mudanza?"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "San Pedro es una de las zonas más exclusivas de Monterrey, y mudarte ahí no es cualquier cosa. Requiere un servicio de mudanza profesional que entienda el valor de tus pertenencias, desde muebles de diseño hasta equipos delicados o piezas con valor sentimental. Un servicio premium se distingue por su enfoque en la calidad, la confianza y el trato personalizado. ¿Qué lo hace diferente?"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Personal calificado y confiable"
            ]
          }
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "El equipo que maneja tus pertenencias debe ser experto en embalaje, carga, descarga y organización. Un servicio premium cuenta con personal entrenado para manejar objetos frágiles y valiosos, además de ser personas de confianza, seleccionadas cuidadosamente para brindarte seguridad en cada paso.",
          {
            "salto": true
          },
          {
            "negrita": [
              "Unidades limpias y seguras"
            ]
          }
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Tus objetos merecen ser transportados en condiciones óptimas. Las unidades de un servicio premium están limpias, monitoreadas y equipadas con sistemas de protección interna que evitan golpes, polvo o humedad. Esto garantiza que todo llegue a tu nuevo hogar tal como salió."
        ]
      },
      {
        "tipo": "separador"
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Atención uno a uno durante todo el proceso"
            ]
          }
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Desde la primera llamada hasta que se acomoda la última caja, contarás con un asesor o coordinador de mudanza que conoce tu caso a detalle, te mantiene informado y resuelve cualquier necesidad al instante. Nada se deja al azar."
        ]
      },
      {
        "tipo": "separador"
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Garantía de traslado sin intermediarios"
            ]
          }
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Un servicio premium se encarga directamente de tu mudanza, sin subcontratar personal o unidades externas. Esto se traduce en mayor control, cero sorpresas y responsabilidad total en el proceso, lo cual es clave cuando estás trasladando tus bienes más preciados."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Con ",
          {
            "negrita": [
              "Kanuby"
            ]
          },
          ", puedes olvidarte del estrés. Nos encargamos de todo, desde empacar hasta entregar en tu nuevo hogar."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Tu mudanza en San Pedro merece lo mejor"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Solicita una cotización y descubre cómo hacer de tu mudanza una experiencia sin complicaciones."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Te puede interesar: ",
          {
            "enlace": "https://kanuby.com/wp-content/uploads/2024/07/kanubymudanzas.svg",
            "texto": [
              "kanubymudanzas"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "mudanzas-oficina-monterrey-cambio-sin-interrumpir",
    "titulo": "Mudanzas de oficina en Monterrey: cómo hacer el cambio sin interrumpir tu negocio",
    "fecha": "2025-05-14T00:28:43+00:00",
    "modificado": "2025-05-26T23:22:55+00:00",
    "categorias": [
      "sin-categoria"
    ],
    "imagen": {
      "src": "/images/posts/mudanzas-oficina-monterrey-cambio-sin-interrumpir.jpeg",
      "width": 735,
      "height": 555,
      "alt": "Oficina con muebles y cajas empacados para la mudanza"
    },
    "seo": {
      "titulo": "Múdate de oficina sin complicaciones",
      "descripcion": "Realiza la mudanza de tu oficina sin pausa en tus operaciones. Aprende las mejores estrategias para mudarte sin contratiempos.",
      "palabras": 339,
      "lectura": "2 minutos"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Cuando se trata de trasladar tu oficina en Monterrey, la clave está en ",
          {
            "negrita": [
              "planificar estratégicamente"
            ]
          },
          " para no afectar tus operaciones. Una mudanza mal organizada de tu oficina puede causar pérdidas de tiempo y productividad."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Consejos para una mudanza de oficina sin interrupciones"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Hazlo en fin de semana o fuera de horario laboral"
            ]
          },
          {
            "salto": true
          },
          "Para minimizar el impacto en la productividad, programa la mudanza en horarios en los que tu equipo no esté trabajando, como fines de semana, noches o días festivos. Así, las actividades cotidianas no se detendrán y tu empresa podrá retomar su operación normal lo antes posible."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Clasifica y etiqueta todo"
            ]
          },
          {
            "salto": true
          },
          "Antes de la mudanza, realiza una clasificación exhaustiva de todo el material, equipo y mobiliario por departamentos, proyectos o equipos de trabajo. Utiliza etiquetas claras y códigos de colores para facilitar la identificación rápida y asegurar que cada cosa llegue exactamente al lugar correcto en el nuevo espacio, evitando pérdidas o confusiones."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Confía en expertos en mudanzas corporativas"
            ]
          },
          {
            "salto": true
          },
          "Opta por una empresa especializada en mudanzas de oficina en Monterrey que cuente con la experiencia y los recursos necesarios para manejar todo el proceso: embalaje seguro, traslado cuidadoso y montaje eficiente. Un equipo profesional te ayudará a reducir riesgos y te permitirá concentrarte en lo más importante: la continuidad de tu negocio."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Comunica con anticipación a todo el equipo"
            ]
          },
          {
            "salto": true
          },
          "Informa a todos los colaboradores con suficiente tiempo sobre la fecha, horarios y detalles de la mudanza. Esto les permitirá prepararse, organizar su trabajo y evitar sorpresas de último momento. Además, crea canales de comunicación abiertos para resolver dudas y recibir sugerencias, asegurando que todos estén alineados y comprometidos con el proceso."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Cambia de oficina sin estrés y sin detener tu negocio"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Con un servicio profesional como ",
          {
            "negrita": [
              "Kanuby"
            ]
          },
          ", tu oficina llega a su nuevo destino lista para seguir trabajando."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Cotiza tu mudanza corporativa hoy."
            ]
          },
          {
            "salto": true
          },
          "Te puede interesar: ",
          {
            "enlace": "https://kanuby.com/wp-content/uploads/2024/07/kanubyminibodegas.svg",
            "texto": [
              "kanubyminibodegas"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "como-evitar-errores-comunes-al-mudarte-en-monterrey",
    "titulo": "Cómo evitar errores comunes al mudarte en Monterrey",
    "fecha": "2025-05-14T00:26:12+00:00",
    "modificado": "2025-05-26T23:40:58+00:00",
    "categorias": [
      "sin-categoria"
    ],
    "imagen": {
      "src": "/images/posts/como-evitar-errores-comunes-al-mudarte-en-monterrey.jpeg",
      "width": 736,
      "height": 469,
      "alt": "Pareja sentada entre cajas de mudanza con signos de interrogación sobre la cabeza"
    },
    "seo": {
      "titulo": "Evita estos errores al mudarte.",
      "descripcion": "Te damos consejos prácticos para que tu mudanza sea sencilla, rápida, sin sorpresas y evita los errores más comunes al mudarte .",
      "palabras": 340,
      "lectura": "2 minutos"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Mudarse puede ser emocionante, pero también un reto si no se planifica bien, los errores se pueden notar. En Monterrey, donde las distancias, el tráfico y la logística pueden complicar las cosas, es clave evitar los errores más comunes al cambiarte de casa."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Errores que debes evitar al mudarte"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "No cotizar con anticipación"
            ]
          },
          {
            "salto": true
          },
          "Dejar la contratación para el último momento puede limitar tus opciones y hacer que termines pagando más por un servicio de menor calidad. Además, las empresas profesionales suelen tener agendas llenas, por lo que reservar con tiempo garantiza disponibilidad y mejores precios.",
          {
            "salto": true
          },
          {
            "salto": true
          },
          {
            "negrita": [
              "No etiquetar las cajas"
            ]
          },
          {
            "salto": true
          },
          "Si no etiquetas las cajas claramente, perderás tiempo valioso buscando artículos esenciales justo cuando los necesitas. Identifica cada caja por habitación o tipo de contenido, e incluso usa códigos de colores para acelerar el proceso de desempacado y organización.",
          {
            "salto": true
          },
          {
            "salto": true
          },
          {
            "negrita": [
              "Subestimar el volumen de tus pertenencias"
            ]
          },
          {
            "salto": true
          },
          "Es común pensar que todo cabrá en un solo viaje, pero muchas veces se calcula mal el espacio requerido. Esto genera múltiples traslados, lo que incrementa el costo y el tiempo total de la mudanza. Tómate el tiempo para medir y contar bien lo que vas a mover, y pide asesoría profesional si tienes dudas.",
          {
            "salto": true
          },
          {
            "salto": true
          },
          {
            "negrita": [
              "No contratar a profesionales"
            ]
          },
          {
            "salto": true
          },
          "Aunque hacer la mudanza por tu cuenta puede parecer una forma de ahorrar dinero, en realidad puede salir más caro. Transportar muebles pesados, equipos delicados o pertenencias valiosas sin el equipo adecuado ni la experiencia necesaria aumenta el riesgo de accidentes, daños materiales o incluso lesiones personales. Además, el proceso puede volverse agotador y mucho más lento de lo esperado."
        ]
      },
      {
        "tipo": "lista",
        "ordenada": true,
        "items": []
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Mudarte no tiene por qué ser complicado"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Evita errores y vive una mudanza sin estrés con un servicio profesional que se encarga de todo."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Cotiza hoy mismo con Kanuby."
            ]
          }
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Te puede interesar: ",
          {
            "enlace": "/mudanzas-oficina-monterrey-cambio-sin-interrumpir/",
            "texto": [
              "Mudanzas de oficina en Monterrey: cómo hacer el cambio sin interrumpir tu negocio"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "mudanza-urgente-en-monterrey",
    "titulo": "Mudanza urgente en Monterrey: soluciones rápidas con respaldo profesional",
    "fecha": "2025-05-14T00:13:34+00:00",
    "modificado": "2025-05-26T23:55:12+00:00",
    "categorias": [
      "sin-categoria"
    ],
    "imagen": {
      "src": "/images/posts/mudanza-urgente-en-monterrey.jpeg",
      "width": 736,
      "height": 1104,
      "alt": "Manos sellando una caja de mudanza con cinta adhesiva"
    },
    "seo": {
      "titulo": "Mudanza urgente en Monterrey",
      "descripcion": "¿Necesitas una mudanza urgente en Monterrey? Contamos con soluciones rápidas, seguras y profesionales para trasladarte sin estrés ni demoras.",
      "palabras": 340,
      "lectura": "2 minutos"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "¿Tienes que realizar tu mudanza ya? Muchas veces nos sale una mudanza inesperada y muchas veces no sabemos a quién recurrir en mente por eso la solución te la podemos dar aquí."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "¿Cómo funcionan las mudanzas urgentes?"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Esta mudanza está pensada para responder en el mismo día o en menos de 48 horas. Las empresas profesionales como ",
          {
            "negrita": [
              "Kanuby"
            ]
          },
          " cuentan con equipos listos para actuar de inmediato, garantizando puntualidad, protección de tus pertenencias y atención personalizada."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "¿Qué incluye este tipo de servicio?"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Recolección inmediata a domicilio"
            ]
          },
          {
            "salto": true
          },
          "Nos encargamos de recoger tus pertenencias directamente en tu casa u oficina, en el horario que más te convenga. Nuestro equipo llega puntual y preparado para proteger, empacar y cargar cada objeto con el mayor cuidado."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Transporte seguro y directo al nuevo destino"
            ]
          },
          {
            "salto": true
          },
          "Tus muebles, cajas y equipos se trasladan en unidades limpias, cerradas y monitoreadas. No hay trasbordos ni desvíos, lo que garantiza que todo llegue en perfecto estado y sin contratiempos."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Asistencia en todo momento"
            ]
          },
          {
            "salto": true
          },
          "Desde el primer contacto hasta que colocamos la última caja en tu nuevo espacio, nuestro equipo te acompaña en cada paso del proceso. Ofrecemos atención personalizada antes, durante y después de la mudanza para resolver dudas, hacer ajustes si es necesario y mantenerte informado en todo momento. Ya sea para confirmar horarios, hacer cambios de último minuto o simplemente darte tranquilidad, estamos disponibles para ti. Nuestra prioridad es que te sientas respaldado y que todo ocurra tal como lo planeaste, sin estrés ni sorpresas."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Sin intermediarios ni demoras"
            ]
          },
          {
            "salto": true
          },
          "Tu mudanza está 100% en manos de nuestro equipo, sin subcontrataciones ni terceros. Esto nos permite ofrecerte mayor control, puntualidad y una experiencia sin complicaciones ni sorpresas."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "¿Necesitas mudarte hoy mismo?"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Con ",
          {
            "negrita": [
              "Kanuby"
            ]
          },
          ", tu mudanza urgente en Monterrey se resuelve sin complicaciones. Nos encargamos de todo para que no tengas que preocuparte."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Cotiza ahora y recibe atención inmediata."
            ]
          }
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Te puede interesar: ",
          {
            "enlace": "/checklist-mudanza-monterrey/",
            "texto": [
              "Checklist para mudarte en Monterrey sin complicaciones"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "servicio-de-mudanza-profesional-en-monterrey",
    "titulo": "¿Qué incluye un servicio de mudanza profesional en Monterrey?",
    "fecha": "2025-05-14T00:07:13+00:00",
    "modificado": "2025-05-27T00:04:24+00:00",
    "categorias": [
      "sin-categoria"
    ],
    "imagen": {
      "src": "/images/posts/servicio-de-mudanza-profesional-en-monterrey.jpeg",
      "width": 736,
      "height": 1308,
      "alt": "Cajas de mudanza cargadas en una camioneta"
    },
    "seo": {
      "titulo": "Servicios de mudanza profesional",
      "descripcion": "Servicios de mudanza profesional con atención personalizada, seguridad y rapidez. Hacemos que tu traslado sea fácil y sin preocupaciones.",
      "palabras": 416,
      "lectura": "2 minutos"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Contratar un ",
          {
            "negrita": [
              "servicio de mudanza profesional en Monterrey"
            ]
          },
          " va más allá de mover cajas. Es una solución completa que te permite cambiarte de casa sin estrés, complicaciones ni sorpresas. No dejes en cualquier mano tu mudanza."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "¿Qué servicios están incluidos en una mudanza?"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "¿Qué incluye un servicio de mudanza profesional en Monterrey?"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Mudarse puede ser un proceso complejo y estresante, pero contratar una empresa profesional especializada marca la diferencia. Un servicio de mudanza profesional no solo se encarga del traslado, sino que te ofrece una experiencia organizada, segura y sin contratiempos. A continuación te explicamos qué servicios están incluidos y cómo benefician tu mudanza."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Recolección a domicilio"
            ]
          },
          {
            "salto": true
          },
          "El equipo de mudanza llega directamente a tu hogar u oficina para encargarse de cargar todos tus muebles, cajas y pertenencias. Esto significa que no tienes que preocuparte por mover objetos pesados o voluminosos; los profesionales cuentan con la experiencia y herramientas necesarias para hacerlo de forma segura y eficiente desde el primer momento."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Transporte seguro"
            ]
          },
          {
            "salto": true
          },
          "Tus pertenencias serán trasladadas en unidades cerradas, limpias y equipadas para proteger cada artículo durante el trayecto. Estas unidades están diseñadas para evitar golpes, movimientos bruscos o cualquier daño. Además, el transporte directo sin paradas innecesarias garantiza que todo llegue rápido y en perfecto estado, ya sea dentro de Monterrey o hacia otras ciudades."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Embalaje y protección (según el paquete contratado)"
            ]
          },
          {
            "salto": true
          },
          "Muchas empresas ofrecen servicios adicionales que incluyen el embalaje profesional de tus objetos, el desarme y armado de muebles, y la protección especial para artículos delicados o de alto valor. Esto es ideal para quienes desean delegar completamente el cuidado de sus pertenencias y minimizar riesgos durante la mudanza."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Entrega en el nuevo domicilio"
            ]
          },
          {
            "salto": true
          },
          "Al llegar al destino, el equipo no solo descarga tus pertenencias, sino que también las acomoda y coloca en el lugar que tú indiques. Así, no tienes que cargar ni mover nada, y tu nuevo hogar u oficina queda listo para usar lo antes posible."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Atención personalizada"
            ]
          },
          {
            "salto": true
          },
          "Desde el primer contacto hasta el final del proceso, contarás con asesoría y acompañamiento constante. Un equipo especializado resolverá todas tus dudas, te mantendrá informado y ajustará detalles para asegurar que la mudanza se realice sin problemas ni sorpresas."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Cotiza hoy y haz tu mudanza sin complicaciones."
            ]
          }
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Te puede interesar: ",
          {
            "enlace": "/cuanto-cuesta-una-mudanza-en-monterrey-en-2025/",
            "texto": [
              "¿Cuánto cuesta una mudanza en Monterrey en 2025?"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "mudanzas-residenciales-en-monterrey",
    "titulo": "Mudanzas residenciales en Monterrey: organiza tu traslado paso a paso",
    "fecha": "2025-05-13T23:57:41+00:00",
    "modificado": "2025-05-27T00:19:58+00:00",
    "categorias": [
      "sin-categoria"
    ],
    "imagen": {
      "src": "/images/posts/mudanzas-residenciales-en-monterrey.jpeg",
      "width": 626,
      "height": 937,
      "alt": "Pareja mirando dentro de una caja de mudanza"
    },
    "seo": {
      "titulo": "Mudanzas residenciales en Monterrey",
      "descripcion": "Servicio profesional de mudanzas en Monterrey con atención personalizada. Haz tu traslado fácil y sin preocupaciones.",
      "palabras": 355,
      "lectura": "2 minutos"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "¿Has planeado mudanzas residenciales en Monterrey? Contar con un plan bien estructurado puede hacer toda la diferencia para que el proceso sea ágil y sin contratiempos. Te compartimos una guía rápida con pasos clave para que las mudanzas sean exitosas."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "1.",
          {
            "negrita": [
              "Planea con anticipación"
            ]
          }
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Es fundamental definir con tiempo la fecha ideal para mudarte y reservar tu servicio de mudanza con al menos dos semanas de anticipación. Esto te ayudará a asegurar la disponibilidad del equipo profesional y evitará que tengas que hacer todo a última hora, lo que puede aumentar costos y complicar la logística."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "2. Haz un inventario detallado"
            ]
          },
          {
            "salto": true
          },
          "Antes de empezar a empacar, realiza una lista completa de todos los objetos, muebles y cajas que planeas trasladar. Esto no solo facilitará la organización del embalaje, sino que también será útil para obtener cotizaciones precisas y minimizar el riesgo de pérdida o confusión durante la mudanza."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "3. Empaca por secciones y etiqueta cada caja"
            ]
          },
          {
            "salto": true
          },
          "Comienza embalando primero las cosas que menos usas, como libros, decoración o ropa de temporada. Etiqueta cada caja con su contenido y la habitación a la que pertenece. Esto permitirá que al llegar a tu nuevo hogar, el equipo de mudanza coloque cada cosa en el lugar correcto, agilizando la organización."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "4. Protege tus objetos frágiles"
            ]
          },
          {
            "salto": true
          },
          "Usa papel burbuja, mantas, toallas o cualquier material acolchonado para envolver objetos delicados como vajillas, cristalería, aparatos electrónicos y decoraciones. Un buen embalaje evitará daños y asegurará que todo llegue en perfecto estado."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "5. Contrata una empresa confiable y profesional"
            ]
          },
          {
            "salto": true
          },
          "Busca un servicio de mudanza con experiencia en Monterrey, que cuente con personal capacitado y unidades equipadas para proteger tus pertenencias. Una empresa profesional te brindará atención personalizada, seguridad y tranquilidad durante todo el proceso."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "¿Listo para mudarte? Hazlo fácil con Kanuby."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "En ",
          {
            "negrita": [
              "Kanuby"
            ]
          },
          " hacemos tu mudanza residencial sin complicaciones: recolección, traslado y entrega, todo de manera segura y sin que muevas un dedo."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "Solicita tu cotización y vive una mudanza sin estrés."
            ]
          },
          {
            "salto": true
          },
          "Te puede interesar: ",
          {
            "enlace": "https://kanuby.com/wp-content/uploads/2024/07/kanubyminibodegas.svg",
            "texto": [
              "kanubyminibodegas"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "checklist-mudanza-monterrey",
    "titulo": "Checklist para mudarte en Monterrey sin complicaciones",
    "fecha": "2025-05-13T23:39:05+00:00",
    "modificado": "2025-05-27T00:26:33+00:00",
    "categorias": [
      "sin-categoria"
    ],
    "imagen": {
      "src": "/images/posts/checklist-mudanza-monterrey.jpeg",
      "width": 736,
      "height": 687,
      "alt": "Mujer recostada entre cajas de mudanza en una habitación vacía"
    },
    "seo": {
      "titulo": "Checklist para tu mudanza en Monterrey",
      "descripcion": "Organiza tu mudanza en Monterrey con nuestra checklist práctica. No olvides ningún detalle y haz tu traslado fácil y sin estrés.",
      "palabras": 386,
      "lectura": "2 minutos"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Una mudanza en Monterrey puede ser un proceso abrumador, pero con una buena planeación todo fluye mejor. Si estás por hacer una mudanza en Monterrey, sigue este checklist para evitar contratiempos."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          {
            "negrita": [
              "1. Planificación previa"
            ]
          }
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            "Define la fecha ideal para la mudanza y agenda el servicio con al menos dos semanas de anticipación para asegurar disponibilidad."
          ],
          [
            "Notifica a proveedores de servicios básicos como internet, agua, luz y gas sobre tu cambio de domicilio para evitar interrupciones."
          ],
          [
            "Informa a tu trabajo, escuela o cualquier institución sobre tu nueva dirección."
          ]
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "2. Inventario y organización"
            ]
          }
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            "Realiza una lista detallada de todos los muebles, cajas y objetos que vas a trasladar."
          ],
          [
            "Clasifica tus pertenencias por habitación, categoría o uso para facilitar el embalaje y la organización."
          ],
          [
            "Decide qué objetos puedes donar, vender o desechar para reducir el volumen y el desorden."
          ]
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "3. Empaque inteligente"
            ]
          }
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            "Empaca primero los artículos que menos usas y deja para el final lo esencial."
          ],
          [
            "Utiliza cajas resistentes y materiales como papel burbuja, mantas o toallas para proteger objetos frágiles."
          ],
          [
            "Etiqueta cada caja claramente con su contenido y la habitación a la que pertenece para facilitar la ubicación al llegar."
          ],
          [
            "Desarma muebles cuando sea posible y guarda tornillos y piezas en bolsas etiquetadas para evitar pérdidas."
          ]
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "4. Contratación de servicio de mudanza"
            ]
          }
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            "Elige una empresa profesional y con experiencia en Monterrey que ofrezca atención personalizada y unidades adecuadas para el transporte."
          ],
          [
            "Consulta qué servicios incluye el paquete (embalaje, traslado, armado) y verifica que no haya cargos ocultos."
          ]
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "5. Día de la mudanza"
            ]
          }
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            "Ten a la mano documentos importantes y objetos personales esenciales."
          ],
          [
            "Supervisa el proceso de carga y descarga, indicando dónde debe colocarse cada caja o mueble en el nuevo domicilio."
          ]
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "6. Después de la mudanza"
            ]
          }
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Realiza cambios de dirección en bancos, servicios y notifica a tus contactos."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Revisa que todas tus pertenencias hayan llegado en buen estado."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Abre las cajas por prioridad para organizar rápidamente los espacios más usados."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "¿Mudarte sin estrés? Con Kanuby, es posible."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "En ",
          {
            "negrita": [
              "Kanuby"
            ]
          },
          ", te ayudamos a mudarte de forma segura y sin complicaciones. Ofrecemos mudanzas locales, nacionales y minibodegas para almacenar lo que necesites."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Te puede interesar: ",
          {
            "enlace": "/como-evitar-errores-comunes-al-mudarte-en-monterrey/",
            "texto": [
              "Cómo evitar errores comunes al mudarte en Monterrey"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "mudanzas-en-monterrey-como-elegir-un-servicio-profesional-y-confiable",
    "titulo": "Mudanzas en Monterrey: cómo elegir un servicio profesional y confiable",
    "fecha": "2025-05-13T23:34:55+00:00",
    "modificado": "2025-05-27T00:35:03+00:00",
    "categorias": [
      "sin-categoria"
    ],
    "imagen": {
      "src": "/images/posts/mudanzas-en-monterrey-como-elegir-un-servicio-profesional-y-confiable.jpeg",
      "width": 736,
      "height": 736,
      "alt": "Mujer descansando con una taza entre cajas de mudanza"
    },
    "seo": {
      "titulo": "Mejores mudanzas en Monterrey: cómo elegir un servicio confiable",
      "descripcion": "Descubre cómo elegir un servicio de mudanzas en Monterrey profesional, seguro y sin contratiempos. Guía rápida para tomar la mejor decisión.",
      "palabras": 339,
      "lectura": "2 minutos"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Elegir entre tantas opciones de mudanzas en Monterrey puede parecer complicado, especialmente si buscas un servicio profesional, puntual y seguro. Las mudanzas en Monterrey requieren planificación y una empresa confiable que se encargue de cada detalle con responsabilidad. Si estás por cambiarte de casa o de oficina, esta guía te ayudará a tomar una decisión informada y sin sorpresas."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "1. ",
          {
            "negrita": [
              "Revisa reseñas y testimonios"
            ]
          },
          " de mudanzas"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Consulta las opiniones en Google, redes sociales o sitios especializados. Las experiencias de otros clientes te darán una visión clara sobre la calidad del servicio, la puntualidad y el trato del personal."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "2. Seguro y responsabilidad"
            ]
          },
          {
            "salto": true
          },
          "Una buena empresa de mudanzas debe ofrecer algún tipo de seguro o garantía para proteger tus pertenencias. Pregunta por las coberturas disponibles y qué procedimiento siguen en caso de daño o pérdida."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "3. Servicios adicionales"
            ]
          },
          {
            "salto": true
          },
          "Muchas compañías ofrecen embalaje profesional, almacenaje temporal, desmontaje y montaje de muebles. Verifica si estos servicios están incluidos o si tienen un costo extra, y asegúrate de que se ajusten a tus necesidades."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "4. Compara precios y condiciones"
            ]
          },
          {
            "salto": true
          },
          "Solicita cotizaciones de al menos tres proveedores. No elijas solo por el precio más bajo; compara lo que incluye cada paquete para asegurarte de obtener un buen valor por tu dinero."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "5. Experiencia y profesionalismo"
            ]
          },
          {
            "salto": true
          },
          "El personal debe ser puntual, cuidadoso y con experiencia. Una empresa con trayectoria sabrá cómo resolver imprevistos y mover objetos delicados o voluminosos sin problemas."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "6. Transporte adecuado"
            ]
          },
          {
            "salto": true
          },
          "Verifica que cuenten con unidades limpias, cerradas y con espacio suficiente para trasladar tus pertenencias de forma segura y ordenada."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "¿Por qué elegir a ",
          {
            "enlace": "https://kanuby.com/wp-content/uploads/2024/12/kanuby-web.png",
            "texto": [
              "Kanuby"
            ]
          },
          "?"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "En Kanuby nos especializamos en mudanzas profesionales en Monterrey. Con vehículos equipados y un equipo experto, garantizamos que tu mudanza sea segura, rápida y sin estrés. ",
          {
            "negrita": [
              "Solicita tu cotización hoy y haz tu mudanza fácil y segura."
            ]
          }
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Te puede interesar: ",
          {
            "enlace": "/mudanzas-residenciales-en-monterrey/",
            "texto": [
              "Mudanzas residenciales en Monterrey: organiza tu traslado paso a paso"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "tarifas-mudanzas-monterrey",
    "titulo": "¿Cuánto cuesta una mudanza en Monterrey en 2025? Guía completa de tarifas",
    "fecha": "2025-05-13T23:11:46+00:00",
    "modificado": "2025-05-27T00:43:07+00:00",
    "categorias": [
      "mudanzas"
    ],
    "imagen": {
      "src": "/images/posts/tarifas-mudanzas-monterrey.jpeg",
      "width": 736,
      "height": 1104,
      "alt": "Cajas de mudanza apiladas en una habitación"
    },
    "seo": {
      "titulo": "Guía para conocer las tarifas en mudanzas",
      "descripcion": "Descubre los factores en las tarifas de mudanzas. Conoce qué servicios incluye un traslado profesional y cómo elegir la mejor opción.",
      "palabras": 392,
      "lectura": "2 minutos"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Si estás por mudarte, seguro te preguntas cuánto cuesta. En Monterrey, las tarifas varían según la distancia, el volumen de objetos, el tipo de vivienda y si necesitas servicios adicionales como empaque, almacenamiento o seguro. Aquí te traemos una lista de factores que deberás tomar en cuenta para las tarifas."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Cuando planeas una mudanza en Monterrey, es importante considerar los factores que impactan directamente en el costo del servicio. Aquí te explicamos los principales:"
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            {
              "negrita": [
                "Distancia del traslado:"
              ]
            },
            " No es lo mismo mudarse dentro de Monterrey que a otra ciudad o estado. A mayor distancia, mayor será el costo por transporte y tiempo de servicio."
          ],
          [
            {
              "negrita": [
                "Cantidad de pertenencias:"
              ]
            },
            " Mientras más muebles, cajas o artículos voluminosos tengas, más grande y equipado deberá ser el vehículo, lo que puede elevar el precio."
          ],
          [
            {
              "negrita": [
                "Accesibilidad del inmueble:"
              ]
            },
            " Si el lugar de origen o destino no cuenta con elevador, se encuentra en un piso alto o tiene accesos complicados, es probable que el costo aumente por la dificultad logística."
          ],
          [
            {
              "negrita": [
                "Servicios adicionales:"
              ]
            },
            " El empaque profesional, la renta de cajas, el uso de minibodegas o la contratación de seguro pueden representar un cargo extra, pero también añaden valor y seguridad."
          ],
          [
            {
              "negrita": [
                "Temporada o día de la mudanza:"
              ]
            },
            " Mudarse en fines de semana, días festivos o a fin de mes suele ser más costoso por la alta demanda."
          ]
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "¿Qué incluye un servicio de mudanza profesional?"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Un servicio de calidad no solo implica mover cajas. Lo que generalmente incluye es:"
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            "Recolección en el domicilio"
          ],
          [
            "Carga segura y cuidadosa"
          ],
          [
            "Transporte protegido"
          ],
          [
            "Descarga en el nuevo destino"
          ]
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Además, muchas empresas ofrecen como ",
          {
            "negrita": [
              "opcional"
            ]
          },
          ": empaque y desempaque profesional, desmontaje y montaje de muebles, y almacenamiento temporal."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          {
            "negrita": [
              "En Kanuby"
            ]
          },
          " te acompañamos en todo el proceso, asegurando que tu mudanza sea eficiente, sin estrés y con total tranquilidad."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "¿Por qué elegir un servicio profesional?"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Aunque hacer la mudanza tú mismo puede parecer más barato, el riesgo, el esfuerzo y el tiempo invertido pueden salir más caros. Con ",
          {
            "negrita": [
              "Kanuby"
            ]
          },
          " tienes respaldo, eficiencia y tranquilidad."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Solicita tu cotización con ",
          {
            "enlace": "https://kanuby.com/wp-content/uploads/2024/12/kanuby-web.png",
            "texto": [
              "Kanuby"
            ]
          },
          " y deja tu mudanza en manos expertas."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Te puede interesar: ",
          {
            "enlace": "/mudanzas-oficina-monterrey-cambio-sin-interrumpir/",
            "texto": [
              "Mudanzas de oficina en Monterrey: cómo hacer el cambio sin interrumpir tu negocio"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte",
    "titulo": "¿Tu casa está en remodelación? Una minibodega puede salvarte",
    "fecha": "2025-05-13T23:10:16+00:00",
    "modificado": "2025-05-14T00:50:21+00:00",
    "categorias": [
      "minibodegas"
    ],
    "imagen": {
      "src": "/images/posts/tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte.jpeg",
      "width": 600,
      "height": 375,
      "alt": "Persona acomodando cajas dentro de una minibodega"
    },
    "seo": {
      "titulo": "¿Tu casa está en remodelación? Una minibodega puede salvarte - Kanuby",
      "descripcion": "Si vas a remodelar tu casa en Monterrey, una minibodega protege tus muebles del polvo y los golpes mientras trabajan. Te explicamos cómo aprovecharla.",
      "palabras": 10,
      "lectura": "1 minuto"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Remodelar la casa emociona hasta que llega el primer día de obra. Polvo en todos lados, trabajadores entrando y saliendo, muebles que estorban y cajas que nadie sabe dónde poner. Si ya te ha tocado, sabes que lo más difícil no es la obra, sino proteger todo lo que tienes mientras pasa."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Ahí es donde una minibodega puede salvarte."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Por qué no conviene dejar tus cosas en casa durante la obra"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Aunque cubras los muebles con plástico, una remodelación es dura con todo lo que queda cerca:"
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            {
              "negrita": [
                "El polvo se mete en todo."
              ]
            },
            " El polvo de yeso y de cemento llega a telas, colchones, electrónicos y cajones, aunque estén en otro cuarto."
          ],
          [
            {
              "negrita": [
                "Los golpes y las manchas son casi inevitables."
              ]
            },
            " Escaleras, herramientas y pintura pasan a centímetros de tus muebles todo el día."
          ],
          [
            {
              "negrita": [
                "Los muebles estorban."
              ]
            },
            " Si los trabajadores tienen que moverlos para avanzar, la obra se vuelve más lenta, y una obra más lenta casi siempre sale más cara."
          ],
          [
            {
              "negrita": [
                "Hay mucha gente entrando y saliendo."
              ]
            },
            " Entre más cosas queden en casa, más difícil es tener todo bajo control."
          ]
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Sacar tus pertenencias durante la obra te ahorra limpiezas, reparaciones y dolores de cabeza."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Qué conviene guardar en la minibodega"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "No hace falta vaciar toda la casa. Piensa en lo que está en las áreas que se van a remodelar y en lo que más sufre con el polvo:"
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            "Muebles grandes de las habitaciones en obra: salas, comedores, camas y roperos."
          ],
          [
            "Electrónicos que no vas a usar esas semanas."
          ],
          [
            "Ropa de cama, cortinas, tapetes y cojines."
          ],
          [
            "Cuadros, decoración y objetos frágiles."
          ],
          [
            "Documentos importantes y recuerdos familiares."
          ]
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Lo que uses todos los días, como ropa, artículos de cocina básicos y tu computadora de trabajo, mejor tenlo contigo."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Qué tamaño necesitas"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "En Kanuby manejamos minibodegas de 3.5, 7 y 14 m². Como referencia, si solo vas a remodelar una o dos habitaciones, una de las chicas suele ser suficiente. Si la obra es en las áreas principales de la casa, como sala, comedor y cocina, conviene pensar en una mediana. Y si la remodelación es de toda la casa, lo más práctico es la grande."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Si no sabes cuál te conviene, escríbenos con lo que piensas guardar y te ayudamos a calcularlo."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Cómo organizarte antes de que empiece la obra"
        ]
      },
      {
        "tipo": "lista",
        "ordenada": true,
        "items": [
          [
            {
              "negrita": [
                "Haz una lista"
              ]
            },
            " de lo que se va a la minibodega y lo que se queda en casa."
          ],
          [
            {
              "negrita": [
                "Empaca por habitación"
              ]
            },
            " y etiqueta cada caja con su contenido y el cuarto al que regresa."
          ],
          [
            {
              "negrita": [
                "Protege los muebles"
              ]
            },
            " con plástico, cobijas o emplayado, sobre todo los de tela y madera."
          ],
          [
            {
              "negrita": [
                "Deja al frente"
              ]
            },
            " lo que podrías necesitar antes de que termine la obra."
          ],
          [
            {
              "negrita": [
                "Calcula el tiempo con margen."
              ]
            },
            " Las remodelaciones casi siempre se alargan, así que planea unas semanas extra."
          ]
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Sin que tú cargues nada"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Con Kanuby no tienes que rentar un camión ni pedirle ayuda a nadie. Recolectamos tus cosas en tu casa, las guardamos en una minibodega segura y te las llevamos de regreso cuando la obra termine. Tú te dedicas a decidir colores y acabados; nosotros nos encargamos del resto."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "¿Ya tienes fecha para tu remodelación? Cotiza tu minibodega con nosotros y protege tus cosas desde el primer día."
        ]
      }
    ]
  },
  {
    "slug": "consejos-para-guardar-archivo-muerto-en-minibodega",
    "titulo": "Consejos para guardar archivo muerto en minibodega",
    "fecha": "2025-05-13T23:10:10+00:00",
    "modificado": "2025-05-14T00:48:18+00:00",
    "categorias": [
      "minibodegas"
    ],
    "imagen": {
      "src": "/images/posts/consejos-para-guardar-archivo-muerto-en-minibodega.jpeg",
      "width": 736,
      "height": 480,
      "alt": "Persona revisando documentos sobre cajas de archivo"
    },
    "seo": {
      "titulo": "Consejos para guardar archivo muerto en minibodega - Kanuby",
      "descripcion": "Cómo guardar el archivo muerto de tu negocio en una minibodega: organización, protección de documentos y consejos para encontrar todo cuando lo necesites.",
      "palabras": 7,
      "lectura": "1 minuto"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Todas las empresas acumulan papel: facturas, contratos, expedientes de empleados, estados de cuenta y documentos que no se usan a diario pero que no se pueden tirar. Con el tiempo, ese archivo muerto ocupa espacio valioso en la oficina, el que podría servir para trabajar, atender clientes o crecer."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Una minibodega es una forma práctica de sacarlo de la oficina sin perderlo de vista. Estos son los consejos para hacerlo bien."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Por qué no puedes simplemente tirarlo"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "En México, la ley fiscal obliga a conservar la contabilidad y la documentación que la respalda durante varios años; por regla general, son cinco. Además, hay contratos, expedientes laborales y documentos legales que conviene tener a la mano por si algún día se necesitan. Tu contador te puede decir exactamente qué conservar y por cuánto tiempo."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "La solución no es deshacerte de ellos, sino guardarlos en un lugar seguro, ordenado y fuera de la oficina."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "1. Clasifica antes de guardar"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Antes de mover una sola caja, separa los documentos por tipo y por año: contabilidad, nómina, contratos, clientes y proveedores. Aprovecha para desechar de forma segura lo que ya cumplió su tiempo de conservación, siempre con la confirmación de tu contador."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "2. Usa cajas iguales"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Las cajas de archivo del mismo tamaño se apilan mejor, aprovechan el espacio y no se aplastan entre ellas. Evita las cajas de supermercado o de distintos tamaños: se deforman con el peso y terminan rompiéndose."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "3. Etiqueta todo de forma clara"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Cada caja debe decir qué contiene, de qué año y de qué área. Pon la etiqueta al frente y de lado, para leerla sin mover las demás. Un sistema sencillo, como un número por caja, hace todo mucho más fácil."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "4. Haz un índice"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Lleva una lista, en papel o en una hoja de cálculo, con el número de cada caja y su contenido. Cuando necesites un documento, sabrás exactamente dónde buscar sin abrir veinte cajas. Guarda una copia del índice en la oficina y otra en la nube."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "5. Protege el papel"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "El papel sufre con la humedad, el calor y el contacto directo con el piso. No pongas las cajas directamente en el suelo; usa tarimas o una primera fila de cajas vacías como base. Y no guardes documentos junto a líquidos o productos que puedan derramarse."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "6. Acomoda pensando en lo que vas a consultar"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Lo más reciente o lo que podrías necesitar pronto va al frente y a la altura de la mano. Lo más antiguo, al fondo y arriba. Deja un pasillo para llegar a cualquier caja sin mover todo."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "7. Digitaliza lo más importante"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Escanear los documentos clave no sustituye al original, pero te da una copia de respaldo y te permite consultarlos sin ir a la minibodega. Empieza por contratos, escrituras y documentos legales."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Sin mover tú las cajas"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Mover cientos de cajas de archivo es pesado y quita horas de trabajo a tu equipo. En Kanuby recolectamos el archivo en tu oficina, lo trasladamos a una minibodega segura y te lo llevamos de regreso cuando lo necesites. Tu equipo sigue trabajando y tu oficina recupera su espacio."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "¿Tu oficina ya no tiene lugar para el archivo? Cotiza tu minibodega con nosotros."
        ]
      }
    ]
  },
  {
    "slug": "como-organizar-tu-minibodega-facilmente",
    "titulo": "Cómo organizar tu minibodega facilmente",
    "fecha": "2025-05-13T23:10:04+00:00",
    "modificado": "2025-05-14T00:46:47+00:00",
    "categorias": [
      "minibodegas"
    ],
    "imagen": {
      "src": "/images/posts/como-organizar-tu-minibodega-facilmente.jpeg",
      "width": 736,
      "height": 491,
      "alt": "Minibodega abierta con cajas de madera ordenadas"
    },
    "seo": {
      "titulo": "Cómo organizar tu minibodega facilmente - Kanuby",
      "descripcion": "Consejos prácticos para organizar tu minibodega, aprovechar cada metro y encontrar tus cosas sin mover todo. Fácil, rápido y sin estrés.",
      "palabras": 6,
      "lectura": "1 minuto"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Rentar una minibodega es la parte fácil. Lo que hace la diferencia es cómo la acomodas: una minibodega bien organizada guarda más, protege mejor tus cosas y te deja encontrar lo que buscas en minutos. Una desordenada se convierte en un rompecabezas cada vez que vas."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Estos consejos te ayudan a hacerlo bien desde el primer día."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Planea antes de llegar"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Haz una lista de todo lo que vas a guardar y separa lo que vas a necesitar seguido de lo que puede quedarse ahí por meses. Esa lista decide cómo vas a acomodar todo."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Usa cajas del mismo tamaño"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Las cajas iguales se apilan como bloques, aprovechan mejor la altura y no se aplastan unas a otras. Las cajas de distintos tamaños dejan huecos y se caen con facilidad."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Lo pesado abajo, lo ligero arriba"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Es la regla más importante. Libros, herramientas y vajillas van en las cajas de abajo; ropa, cobijas y peluches, arriba. Así nada se aplasta y las torres de cajas se mantienen firmes."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Etiqueta los cuatro lados"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Escribe el contenido y la habitación de origen en cada caja, y de preferencia en más de un lado. Cuando las cajas están apiladas, no siempre vas a ver el mismo lado."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Deja un pasillo"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Aunque quieras aprovechar cada centímetro, deja un pasillo al centro o a un costado. Te permitirá llegar a cualquier caja sin sacar todo lo demás."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Lo que más usas, al frente"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Organiza por frecuencia: lo que podrías necesitar pronto, cerca de la puerta; lo que no vas a tocar en meses, al fondo."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Aprovecha la altura"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "En una minibodega el espacio no solo se mide en metros cuadrados. Apilar cajas de forma segura y usar repisas, si las llevas, multiplica lo que cabe."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Cuida los muebles"
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            "Desarma lo que se pueda: patas de mesas, camas y libreros ocupan mucho menos desarmados. Guarda los tornillos en una bolsa pegada al mueble."
          ],
          [
            "Protege los muebles con cobijas o emplayado."
          ],
          [
            "Guarda los colchones en una funda y no les pongas peso encima."
          ],
          [
            "Deja un poco de espacio entre los muebles y la pared para que circule el aire."
          ]
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Lo que nunca debes guardar"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Alimentos, plantas, líquidos inflamables, gasolina, químicos o cualquier material peligroso. Además de dañar tus cosas, pueden ponerte en riesgo a ti y a los demás."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Toma fotos y haz un inventario"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Una foto de cada pared de la minibodega y una lista de lo que hay en cada caja te ahorran muchas vueltas. Guárdalas en tu celular y sabrás qué hay y dónde, sin ir a buscarlo."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Si prefieres no cargar nada"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Con Kanuby recolectamos tus cosas en tu casa u oficina, las llevamos a tu minibodega y te las regresamos cuando las necesites. Tú solo nos dices qué se va y qué se queda."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "¿Listo para recuperar espacio en casa? Cotiza tu minibodega con nosotros."
        ]
      }
    ]
  },
  {
    "slug": "guia-para-elegir-el-tamano-ideal-de-tu-minibodega",
    "titulo": "Guía para elegir el tamaño ideal de tu minibodega",
    "fecha": "2025-05-13T23:05:44+00:00",
    "modificado": "2025-05-14T00:46:11+00:00",
    "categorias": [
      "minibodegas"
    ],
    "imagen": {
      "src": "/images/posts/guia-para-elegir-el-tamano-ideal-de-tu-minibodega.jpeg",
      "width": 669,
      "height": 1000,
      "alt": "Pareja mirando una minibodega vacía"
    },
    "seo": {
      "titulo": "Guía para elegir el tamaño ideal de tu minibodega - Kanuby",
      "descripcion": "¿3.5, 7 o 14 m²? Esta guía te ayuda a calcular qué tamaño de minibodega necesitas según lo que vas a guardar, para no pagar de más ni quedarte corto.",
      "palabras": 11,
      "lectura": "1 minuto"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "Una de las dudas más comunes al rentar una minibodega es qué tamaño elegir. Si te quedas corto, tus cosas no caben o terminan apretadas y maltratadas. Si eliges de más, pagas por espacio que no usas."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "En Kanuby manejamos tres tamaños: 3.5, 7 y 14 m². Esta guía te ayuda a decidir cuál es el tuyo."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Paso 1: haz una lista de lo que vas a guardar"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Parece obvio, pero es el paso que más se salta. Recorre tu casa u oficina y anota todo lo que va a la minibodega: muebles, electrodomésticos, cajas y objetos sueltos. Es la base para todo lo demás."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Paso 2: piensa en volumen, no solo en metros"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Los metros cuadrados indican el piso, pero lo que realmente importa es cuánto puedes apilar. Las cajas y los muebles desarmados se acomodan en altura y ahorran mucho espacio. Un sillón, un refrigerador o un colchón ocupan su lugar aunque no les pongas nada encima."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Por eso, dos personas con la misma cantidad de cosas pueden necesitar tamaños distintos, según qué tanto desarmen y empaquen."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Paso 3: ubica tu caso"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Como referencia general:"
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            {
              "negrita": [
                "3.5 m²:"
              ]
            },
            " para cajas, maletas, muebles chicos o el contenido de una habitación. Funciona bien para estudiantes, para guardar cosas de temporada o para despejar un cuarto."
          ],
          [
            {
              "negrita": [
                "7 m²:"
              ]
            },
            " para el contenido de un departamento chico o de varias habitaciones, con algunos muebles grandes. Es una buena opción si estás entre mudanzas o remodelando."
          ],
          [
            {
              "negrita": [
                "14 m²:"
              ]
            },
            " para el contenido de una casa o para negocios que necesitan guardar mercancía, mobiliario o archivo."
          ]
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Cada caso es distinto, así que tómalo como punto de partida, no como regla."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Paso 4: deja espacio para moverte"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Si vas a entrar seguido a sacar o meter cosas, necesitas un pasillo. Si solo vas a guardar y no piensas volver en meses, puedes llenar más. Esa diferencia puede cambiar el tamaño que te conviene."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Paso 5: piensa en el futuro"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "¿Vas a seguir sumando cosas? ¿Tu remodelación podría alargarse? ¿Tu negocio va a crecer? Si la respuesta es sí, considera un tamaño un poco mayor desde el principio."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Señales de que necesitas el tamaño más grande"
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            "Vas a guardar muebles grandes que no se desarman, como salas o refrigeradores."
          ],
          [
            "No vas a empacar todo en cajas."
          ],
          [
            "Necesitas entrar seguido y moverte con comodidad."
          ]
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Señales de que te alcanza con uno más chico"
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            "Casi todo va en cajas del mismo tamaño."
          ],
          [
            "Vas a desarmar los muebles."
          ],
          [
            "Solo vas a guardar y no vas a entrar seguido."
          ]
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "¿Todavía no sabes?"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Es normal. Escríbenos con tu lista o cuéntanos qué vas a guardar y te ayudamos a elegir el tamaño correcto, para que pagues solo por el espacio que necesitas."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Cotiza tu minibodega con nosotros y resuelve la duda en minutos."
        ]
      }
    ]
  },
  {
    "slug": "asi-es-una-mudanza-con-recoleccion-y-minibodega-incluida-paso-a-paso",
    "titulo": "Así es una mudanza con recolección y minibodega incluida: paso a paso",
    "fecha": "2025-05-13T23:04:41+00:00",
    "modificado": "2025-05-14T00:44:42+00:00",
    "categorias": [
      "minibodegas"
    ],
    "imagen": {
      "src": "/images/posts/asi-es-una-mudanza-con-recoleccion-y-minibodega-incluida-paso-a-paso.jpeg",
      "width": 735,
      "height": 490,
      "alt": "Persona sellando una caja de mudanza con cinta"
    },
    "seo": {
      "titulo": "Así es una mudanza con recolección y minibodega incluida: paso a paso - Kanuby",
      "descripcion": "Así funciona una mudanza con recolección y minibodega incluida con Kanuby: recogemos tus cosas, las guardamos y te las llevamos cuando estés listo.",
      "palabras": 13,
      "lectura": "1 minuto"
    },
    "contenido": [
      {
        "tipo": "parrafo",
        "texto": [
          "A veces mudarte no es ir de una casa a otra en el mismo día. Te entregan la casa nueva después de que dejas la anterior, estás remodelando, vas a cambiar de ciudad o simplemente todavía no tienes a dónde llegar. En esos casos necesitas algo más que una mudanza: necesitas un lugar seguro para tus cosas mientras tanto."
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Para eso existe la mudanza con recolección y minibodega incluida. Así funciona, paso a paso."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Paso 1: nos cuentas qué necesitas"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Todo empieza con una cotización. Nos escribes por WhatsApp y nos cuentas qué vas a mover, desde dónde, cuándo y por cuánto tiempo crees que necesitas guardarlo. Si hace falta, revisamos contigo el volumen para calcular bien el servicio y el tamaño de minibodega que te conviene."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Paso 2: definimos la fecha de recolección"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Acordamos el día y la hora en que pasamos por tus cosas. Si necesitas que empaquemos nosotros, lo dejamos programado desde aquí."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Paso 3: empacamos y cargamos"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "El día de la recolección, nuestro equipo llega a tu domicilio, protege tus muebles, empaca lo que haga falta y carga todo en el camión. Tú no tienes que cargar ni una caja."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Paso 4: guardamos tus cosas en la minibodega"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Trasladamos todo a tu minibodega y lo acomodamos de forma ordenada y segura. Tus pertenencias quedan protegidas el tiempo que necesites, sean semanas o meses."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Paso 5: te lo llevamos cuando estés listo"
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Cuando ya tengas a dónde llegar, nos avisas y programamos la entrega. Recogemos tus cosas de la minibodega y te las llevamos a tu nuevo hogar u oficina. Si lo necesitas, también te ayudamos a acomodarlas al llegar."
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Por qué conviene hacerlo todo con una sola empresa"
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            {
              "negrita": [
                "Un solo responsable."
              ]
            },
            " El mismo equipo recolecta, guarda y entrega. No hay que coordinar a tres proveedores distintos."
          ],
          [
            {
              "negrita": [
                "Menos manejo de tus cosas."
              ]
            },
            " Entre menos veces se cargan y descargan, menos riesgo de golpes."
          ],
          [
            {
              "negrita": [
                "Menos estrés."
              ]
            },
            " No tienes que rentar un camión, conseguir ayuda ni buscar dónde guardar todo por tu cuenta."
          ],
          [
            {
              "negrita": [
                "Flexibilidad."
              ]
            },
            " Si tus planes cambian y la casa nueva se retrasa, tus cosas siguen seguras hasta que estés listo."
          ]
        ]
      },
      {
        "tipo": "titulo",
        "nivel": 2,
        "estilo": 3,
        "texto": [
          "Cuándo te conviene este servicio"
        ]
      },
      {
        "tipo": "lista",
        "ordenada": false,
        "items": [
          [
            "Vendiste tu casa y la nueva todavía no está lista."
          ],
          [
            "Estás remodelando y necesitas vaciar la casa."
          ],
          [
            "Te vas a cambiar de ciudad y todavía no tienes dónde llegar."
          ],
          [
            "Vas a vivir un tiempo fuera y quieres conservar tus muebles."
          ]
        ]
      },
      {
        "tipo": "parrafo",
        "texto": [
          "Mudarte en dos tiempos no tiene por qué ser complicado. Cotiza tu mudanza con minibodega incluida y deja que nosotros nos encarguemos de todo."
        ]
      }
    ]
  },
  {
    "slug": "cuanto-cuesta-rentar-una-minibodega-en-monterrey-guia-2025",
    "titulo": "¿Cuánto cuesta rentar una minibodega en Monterrey? Guía 2025",
    "fecha": "2025-05-13T23:04:34+00:00",
    "modificado": "2025-05-14T00:43:58+00:00",
    "categorias": [
      "minibodegas"
    ],
    "imagen": {
      "src": "/images/posts/cuanto-cuesta-rentar-una-minibodega-en-monterrey-guia-2025.jpeg",
      "width": 626,
      "height": 417,
      "alt": "Persona emplayando muebles con película plástica"
    },
    "seo": {
      "titulo": "¿Cuánto cuesta rentar una minibodega en Monterrey? Guía 2025 - Kanuby",
      "descripcion": null,
      "palabras": 10,
      "lectura": "1 minuto"
    },
    "contenido": []
  },
  {
    "slug": "mudanzas-y-minibodegas-la-combinacion-perfecta-si-aun-no-puedes-instalarte",
    "titulo": "Mudanzas y minibodegas: la combinación perfecta si aún no puedes instalarte",
    "fecha": "2025-05-13T22:56:53+00:00",
    "modificado": "2025-05-14T00:42:33+00:00",
    "categorias": [
      "minibodegas",
      "mudanzas"
    ],
    "imagen": {
      "src": "/images/posts/mudanzas-y-minibodegas-la-combinacion-perfecta-si-aun-no-puedes-instalarte.jpeg",
      "width": 736,
      "height": 552,
      "alt": "Dos personas pasándose una caja de mudanza"
    },
    "seo": {
      "titulo": "Mudanzas y minibodegas: la combinación perfecta si aún no puedes instalarte - Kanuby",
      "descripcion": null,
      "palabras": 13,
      "lectura": "1 minuto"
    },
    "contenido": []
  },
  {
    "slug": "guia-para-mudarte-a-monterrey-desde-otra-ciudad",
    "titulo": "Guía para mudarte a Monterrey desde otra ciudad",
    "fecha": "2025-05-13T22:54:26+00:00",
    "modificado": "2025-05-14T00:39:32+00:00",
    "categorias": [
      "mudanzas"
    ],
    "imagen": {
      "src": "/images/posts/guia-para-mudarte-a-monterrey-desde-otra-ciudad.jpeg",
      "width": 702,
      "height": 936,
      "alt": "Cajas de mudanza y plantas en un departamento"
    },
    "seo": {
      "titulo": "Guía para mudarte a Monterrey desde otra ciudad - Kanuby",
      "descripcion": null,
      "palabras": 9,
      "lectura": "1 minuto"
    },
    "contenido": []
  },
  {
    "slug": "checklist-definitiva-para-mudarte-en-monterrey-sin-estres",
    "titulo": "Checklist definitiva para mudarte en Monterrey sin estrés",
    "fecha": "2025-05-13T22:53:31+00:00",
    "modificado": "2025-05-14T00:38:31+00:00",
    "categorias": [
      "mudanzas"
    ],
    "imagen": {
      "src": "/images/posts/checklist-definitiva-para-mudarte-en-monterrey-sin-estres.jpeg",
      "width": 602,
      "height": 900,
      "alt": "Lista de verificación con casillas marcadas"
    },
    "seo": {
      "titulo": "Checklist definitiva para mudarte en Monterrey sin estrés - Kanuby",
      "descripcion": null,
      "palabras": 9,
      "lectura": "1 minuto"
    },
    "contenido": []
  },
  {
    "slug": "los-mejores-dias-y-horarios-para-hacer-tu-mudanza-en-monterrey",
    "titulo": "Los mejores días y horarios para hacer tu mudanza en Monterrey",
    "fecha": "2025-05-13T22:53:24+00:00",
    "modificado": "2025-05-14T00:37:38+00:00",
    "categorias": [
      "mudanzas"
    ],
    "imagen": {
      "src": "/images/posts/los-mejores-dias-y-horarios-para-hacer-tu-mudanza-en-monterrey.jpeg",
      "width": 735,
      "height": 490,
      "alt": "Persona cargando cajas de mudanza"
    },
    "seo": {
      "titulo": "Los mejores días y horarios para hacer tu mudanza en Monterrey - Kanuby",
      "descripcion": null,
      "palabras": 12,
      "lectura": null
    },
    "contenido": []
  },
  {
    "slug": "como-elegir-una-empresa-de-mudanzas-confiable-en-monterrey",
    "titulo": "Cómo elegir una empresa de mudanzas confiable en Monterrey",
    "fecha": "2025-05-13T22:53:11+00:00",
    "modificado": "2025-05-13T22:56:21+00:00",
    "categorias": [
      "mudanzas"
    ],
    "imagen": null,
    "seo": {
      "titulo": "Cómo elegir una empresa de mudanzas confiable en Monterrey - Kanuby",
      "descripcion": null,
      "palabras": 10,
      "lectura": null
    },
    "contenido": []
  },
  {
    "slug": "errores-comunes-al-mudarse-en-monterrey-y-como-evitarlos",
    "titulo": "Errores comunes al mudarse en Monterrey (y cómo evitarlos)",
    "fecha": "2025-05-13T22:53:05+00:00",
    "modificado": "2025-05-13T22:56:28+00:00",
    "categorias": [
      "mudanzas"
    ],
    "imagen": null,
    "seo": {
      "titulo": "Errores comunes al mudarse en Monterrey (y cómo evitarlos) - Kanuby",
      "descripcion": null,
      "palabras": 10,
      "lectura": null
    },
    "contenido": []
  },
  {
    "slug": "las-mejores-zonas-para-mudarte-en-monterrey-si-buscas-seguridad-y-conectividad",
    "titulo": "Las mejores zonas para mudarte en Monterrey si buscas seguridad y conectividad",
    "fecha": "2025-05-13T22:52:57+00:00",
    "modificado": "2025-05-13T22:56:16+00:00",
    "categorias": [
      "mudanzas"
    ],
    "imagen": null,
    "seo": {
      "titulo": "Las mejores zonas para mudarte en Monterrey si buscas seguridad y conectividad - Kanuby",
      "descripcion": null,
      "palabras": 12,
      "lectura": null
    },
    "contenido": []
  },
  {
    "slug": "cuanto-cuesta-una-mudanza-en-monterrey-en-2025",
    "titulo": "¿Cuánto cuesta una mudanza en Monterrey en 2025?",
    "fecha": "2025-05-13T22:52:54+00:00",
    "modificado": "2025-05-13T22:56:10+00:00",
    "categorias": [
      "mudanzas"
    ],
    "imagen": null,
    "seo": {
      "titulo": "¿Cuánto cuesta una mudanza en Monterrey en 2025? - Kanuby",
      "descripcion": null,
      "palabras": 8,
      "lectura": null
    },
    "contenido": []
  }
];

/** Los posts más recientes primero, como los ordena WordPress. */
export function postsRecientes(cantidad: number): Post[] {
  return [...posts]
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, cantidad);
}

export function postsDeCategoria(categoria: CategoriaSlug): Post[] {
  return posts
    .filter((post) => post.categorias.includes(categoria))
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}
