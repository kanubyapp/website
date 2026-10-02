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
      "descripcion": null,
      "palabras": 10,
      "lectura": "1 minuto"
    },
    "contenido": []
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
      "descripcion": null,
      "palabras": 7,
      "lectura": "1 minuto"
    },
    "contenido": []
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
      "descripcion": null,
      "palabras": 6,
      "lectura": "1 minuto"
    },
    "contenido": []
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
      "descripcion": null,
      "palabras": 11,
      "lectura": "1 minuto"
    },
    "contenido": []
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
      "descripcion": null,
      "palabras": 13,
      "lectura": "1 minuto"
    },
    "contenido": []
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
