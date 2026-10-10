# Réplica de kanuby.com: decisiones

Decisiones aprobadas por el equipo para la réplica. Aplican a todas las tareas.

## Decisiones

1. Commit previo: ya está hecho, el working directory está limpio.
2. Blog: se replican los 24 posts y las 3 páginas de categoría (/mudanzas/, /minibodegas/, /sin-categoria/), en la tarea 11.
3. Formularios: el popup de cotización usa la estructura del modal de legacy, en dos pasos. Paso 1: el tipo de servicio como tarjetas que avanzan al tocarlas (mudanza: Mudanza local, Mudanza de Monterrey a CDMX, Mudanza empresarial; minibodega: 3.5 m², 7 m², 14 m², No estoy seguro). Paso 2: nombre y teléfono, los dos obligatorios; ya no se pide correo. Redirige en la misma pestaña a WhatsApp al número +52 1 81 1028 7087 (wa.me/5218110287087) con un mensaje prellenado:
   Mudanza: "Hola Kanuby, soy {nombre}. Me interesa cotizar {una mudanza local | una mudanza de Monterrey a CDMX | una mudanza empresarial}."
   Minibodega: "Hola Kanuby, soy {nombre}. Me interesa rentar una minibodega de {3.5 m² | 7 m² | 14 m²}." Si elige "No estoy seguro": "Hola Kanuby, soy {nombre}. Me interesa rentar una minibodega, aún no sé qué tamaño necesito."
   El popup no guarda datos: valida y redirige. La calculadora de espacio de /minibodegas-monterrey/ sí guarda en el navegador (localStorage) el nombre, el teléfono y el inventario conforme avanza (src/lib/guardado-calculadora.ts), y de ahí no sale nada salvo el mensaje de WhatsApp que la persona envía. Al completarse el popup, el servidor manda un correo de aviso al equipo con Resend (src/lib/correo.ts), sin frenar la redirección.
4. Botón flotante: se replica en las mismas páginas y abre el formulario igual que hoy, pero el popup sí se puede cerrar (botón de cerrar, Esc y clic fuera).
5. Instagram: el feed se omite en esta fase, sin dejar espacio vacío. Trustindex: las 10 reseñas de minibodegas se pasan como contenido estático y ya no usan el diseño del widget: van en el mismo componente de testimonios de las páginas de mudanzas, con su fecha relativa calculada en el navegador y el enlace al perfil de Google debajo del carrusel.
6. GTM, Google Ads y Meta Pixel: sí, en la tarea 12. Antes de incluirlos revisa qué etiquetas se disparan dentro del contenedor de GTM y cuáles están pegadas directo en el HTML, y repórtalo para no duplicar eventos.
7. Glancyr: no se usa. El menú móvil va con Outfit.
8. DDDDD: se descarga la variante de 2048px como origen.
9. Formularios y respond.io: los formularios de cotización, además de redirigir a WhatsApp, enviarán el contacto a respond.io desde el servidor (nombre, teléfono, servicio y origen "formulario web"; sin correo, que el formulario ya no pide, como en la decisión 3) para que respond.io detecte quién llenó el formulario pero no escribió y le dé seguimiento con plantilla. Llevarán una línea de consentimiento para ser contactado por WhatsApp. Se construye como tarea propia al terminar las tres páginas de mudanzas; mientras tanto el formulario no cambia. El campo teléfono se queda obligatorio.

## Indexación: sitemap y robots

- El sitio solo se indexa en kanuby.com. La decisión se toma en cada petición por el dominio que pidió el visitante o el buscador (el encabezado Host), no por una variable de entorno: el mismo despliegue de producción responde en kanuby.com y en su URL de vercel.app, y solo el Host los distingue. La lógica está en src/lib/indexacion.ts, con pruebas.
- En kanuby.com: /robots.txt permite el rastreo y apunta a https://kanuby.com/sitemap.xml, y las páginas responden normal.
- En cualquier otro dominio (la URL de Vercel, las vistas previas, www.kanuby.com, localhost): /robots.txt bloquea todo (Disallow: /) y todas las respuestas llevan el encabezado X-Robots-Tag: noindex, nofollow, que agrega src/proxy.ts. Funciona también con las páginas estáticas, porque no depende del HTML.
- /sitemap.xml lista las páginas indexables y los 24 posts con URL absoluta en https://kanuby.com y barra final; los posts llevan su fecha de modificación. Las páginas de categoría y /social/, que llevan noindex, no van. Una página nueva tiene que entrar al sitemap (PAGINAS_INDEXABLES) o llevar noindex: una prueba lo exige.
- Al publicar no hay que cambiar nada: en cuanto kanuby.com apunte al sitio nuevo, ese dominio se indexa y los demás siguen bloqueados.

## Errores del sitio publicado

### a) Se corrigen al replicar

Faltas de ortografía ("Llama Ahora", "nos responsabilizamos", "tú", el espacio después del punto), el carácter invisible, los dos puntos sobrantes al final de títulos, "Read More" y el copyright en español, "Política de Privacidad", un solo H1 por página, nombres y fechas de testimonios fuera de headings, texto alternativo en todas las imágenes, aria-label en íconos que son enlace, /gracias/ con noindex, ids únicos en los formularios, sin opción vacía en el select, mensajes de validación en español, anclas del menú apuntando a las secciones de su propia página (en empresariales se quita "Testimonios" porque no hay sección), y logos enlazados al inicio.

### b) Se copian tal cual: pendientes de confirmar con Kanuby

- [x] 10 contra 20 años de experiencia: resuelto, son más de 20. La home ya dice "más de 20 años".
- [ ] Los teléfonos 81 8336 3637 y 81 1500 6365 y sus formatos.
- [ ] "Monterrey" contra Santiago en minibodegas.
- [ ] "Ver Tamaños y Precios".
- [ ] "Próximamente Minibodegas".
- [ ] Los enlaces de Cobertura que dan 404.
- [ ] Las meta descriptions y og:image faltantes.
- [ ] El mensaje de minibodega en los posts de mudanzas.
- [ ] Calculadora de espacio de /minibodegas-monterrey/:
  - Si las medidas publicadas de las minibodegas son interiores. La calculadora las toma así (src/lib/minibodegas.ts).
  - Validar la tabla de volúmenes de los objetos y el margen de acomodo de 30% (src/lib/catalogo-calculadora.ts), hoy estimaciones de referencia.
  - Si el texto de la tarjeta Mediana ("los muebles de una recámara pequeña") sigue cuadrando con la calculadora: con la tabla actual, una recámara típica cabe en la Chica.
  - Que el aviso de privacidad mencione que la calculadora guarda nombre, teléfono e inventario en el navegador.
  - Cuando no cabe en una Grande, la calculadora recomienda una combinación de hasta 4 minibodegas. Confirmar si un cliente puede rentar varias, si pueden ser contiguas y si hay disponibilidad suficiente de cada tamaño.
- [ ] Posts que enlazan a una imagen en lugar de a una página (se copian tal cual, apuntando al archivo en kanuby.com/wp-content):
  - /mudanzas-premium-san-pedro/: "kanubymudanzas" → kanubymudanzas.svg
  - /mudanzas-oficina-monterrey-cambio-sin-interrumpir/: "kanubyminibodegas" → kanubyminibodegas.svg
  - /mudanzas-residenciales-en-monterrey/: "kanubyminibodegas" → kanubyminibodegas.svg
  - /mudanzas-en-monterrey-como-elegir-un-servicio-profesional-y-confiable/: "Kanuby" → kanuby-web.png
  - /tarifas-mudanzas-monterrey/: "Kanuby" → kanuby-web.png
- [ ] Decisiones editoriales en el contenido de los posts (se copian tal cual):
  - /como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza/: repite la idea "mantener el orden a largo plazo" en dos frases seguidas.
  - /servicio-de-mudanza-profesional-en-monterrey/: dos títulos-pregunta seguidos que dicen lo mismo ("¿Qué servicios están incluidos en una mudanza?" y "¿Qué incluye un servicio de mudanza profesional en Monterrey?").
- [x] Posts publicados sin contenido: resuelto. Los 14 posts vacíos ya tienen contenido (docs/posts-tanda-1.md, -2.md y -3.md).
- [ ] Antes de publicar: crear en Vercel las variables del correo de aviso de los formularios (Resend). Sin ellas el sitio funciona igual, pero no sale ningún correo y el servidor registra el error:
  - RESEND_API_KEY: la llave de Resend (solo servidor, nunca con prefijo NEXT_PUBLIC_).
  - EMAIL_FROM: el remitente, una dirección del dominio verificado notifications.scndal.com.
  - EMAIL_TO: los destinatarios principales, separados por comas (cotizaciones, proveedores y contacto general).
  - EMAIL_CC: los destinatarios en copia, separados por comas (solo cotizaciones).
- [ ] Antes de publicar: que www.kanuby.com redirija a kanuby.com en Vercel. Si sirviera el sitio directo, sus páginas responderían con noindex (solo kanuby.com se indexa).
- [ ] Antes de publicar: crear la variable NEXT_PUBLIC_GTM_ID en Vercel con el ID del contenedor de GTM (GTM-XXXXXXX) el día en que kanuby.com apunte al sitio nuevo. Sin ella el sitio no carga GTM y los eventos de conversión no llegan a ningún contenedor.
- [ ] Antes de publicar: inventariar las redirecciones 301 que tenga configuradas WordPress (por ejemplo /checklist-para-mudarte-en-monterrey-sin-complicaciones/ → /checklist-mudanza-monterrey/) para replicarlas en el sitio nuevo.
- [ ] Antes de publicar: no se migra kanuby.com a Vercel sin los legales publicados. Con los datos de la lista c) confirmados y revisados por un abogado, LEGALES_CONFIRMADOS pasa a true en src/lib/legales.ts y /aviso-de-privacidad/ y /terminos-y-condiciones/ se indexan y entran al sitemap.

### c) Legales y servicios: pendientes de confirmar con Kanuby

Cada uno aparece como marcador <Pendiente> en /aviso-de-privacidad/ o /terminos-y-condiciones/.

1. Razón social: si es KANUBY, S.A. de C.V. (la de app.kanuby.com/terms) también para mudanzas.
2. RFC y domicilio fiscal.
3. Domicilio del responsable para el aviso de privacidad.
4. Correo para privacidad y solicitudes ARCO (¿info@kanuby.com?), con su procedimiento y plazo de respuesta.
5. Teléfono de los legales: 81 1028 7087, 81 1500 6365 u 81 8336 3637.
6. Datos que se recaban además de nombre, teléfono y servicio (facturación, fotos o inventario) y si hay datos sensibles.
7. Finalidades secundarias (promociones, encuestas) y cómo negarse a ellas.
8. Proveedores que reciben datos y si hay transferencias a terceros, como aseguradoras.
9. Etiquetas que dispara el contenedor de GTM, para la sección de cookies.
10. Condiciones de pago y requisitos previos a la mudanza.
11. Responsabilidad ante daño, pérdida o robo, y cómo se reporta un incidente.
12. Cancelaciones y reprogramaciones.
13. Fecha de publicación de los dos documentos y revisión de un abogado conforme a la LFPDPPP de marzo de 2025.
14. Si la mudanza Monterrey–CDMX incluye el regreso: el sitio dice que sí; legacy decía que no.
15. Si existe seguro de traslado.
16. Qué cobertura nacional tienen.
17. Que el personal y el transporte son propios, sin subcontratar.
