# Réplica de kanuby.com: decisiones

Decisiones aprobadas por el equipo para la réplica. Aplican a todas las tareas.

## Decisiones

1. Commit previo: ya está hecho, el working directory está limpio.
2. Blog: se replican los 24 posts y las 3 páginas de categoría (/mudanzas/, /minibodegas/, /sin-categoria/), en la tarea 11.
3. Formularios: los dos redirigen a WhatsApp al número +52 1 81 1028 7087 (wa.me/5218110287087) con un mensaje prellenado armado con los campos del formulario:
   Mudanza: "Hola Kanuby, soy {nombre}. Me interesa cotizar {una mudanza local | una mudanza nacional | un flete}. Mi correo es {correo}."
   Minibodega: "Hola Kanuby, soy {nombre}. Me interesa rentar una minibodega de {3.5 m² | 7 m² | 14 m²}. Mi correo es {correo}." Si elige "No estoy seguro": "Hola Kanuby, soy {nombre}. Me interesa rentar una minibodega, aún no sé qué tamaño necesito. Mi correo es {correo}."
   No envían correo ni guardan datos en ningún lado; solo validan y redirigen.
4. Botón flotante: se replica en las mismas páginas y abre el formulario igual que hoy, pero el popup sí se puede cerrar (botón de cerrar, Esc y clic fuera).
5. Instagram: el feed se omite en esta fase, sin dejar espacio vacío. Trustindex: las 10 reseñas se pasan como contenido estático, con el mismo diseño, y un enlace al perfil de Google.
6. GTM, Google Ads y Meta Pixel: sí, en la tarea 12. Antes de incluirlos revisa qué etiquetas se disparan dentro del contenedor de GTM y cuáles están pegadas directo en el HTML, y repórtalo para no duplicar eventos.
7. Glancyr: no se usa. El menú móvil va con Outfit.
8. DDDDD: se descarga la variante de 2048px como origen.
9. Formularios y respond.io: los formularios de cotización, además de redirigir a WhatsApp, enviarán el contacto a respond.io desde el servidor (nombre, correo, teléfono, servicio y origen "formulario web") para que respond.io detecte quién llenó el formulario pero no escribió y le dé seguimiento con plantilla. Llevarán una línea de consentimiento para ser contactado por WhatsApp. Se construye como tarea propia al terminar las tres páginas de mudanzas; mientras tanto el formulario no cambia. El campo teléfono se queda obligatorio.

## Errores del sitio publicado

### a) Se corrigen al replicar

Faltas de ortografía ("Llama Ahora", "nos responsabilizamos", "tú", el espacio después del punto), el carácter invisible, los dos puntos sobrantes al final de títulos, "Read More" y el copyright en español, "Política de Privacidad", un solo H1 por página, nombres y fechas de testimonios fuera de headings, texto alternativo en todas las imágenes, aria-label en íconos que son enlace, /gracias/ con noindex, ids únicos en los formularios, sin opción vacía en el select, mensajes de validación en español, anclas del menú apuntando a las secciones de su propia página (en empresariales se quita "Testimonios" porque no hay sección), y logos enlazados al inicio.

### b) Se copian tal cual: pendientes de confirmar con Kanuby

- [ ] 10 contra 20 años de experiencia.
- [ ] Los teléfonos 81 8336 3637 y 81 1500 6365 y sus formatos.
- [ ] "Monterrey" contra Santiago en minibodegas.
- [ ] "Ver Tamaños y Precios".
- [ ] "Próximamente Minibodegas".
- [ ] Los enlaces de Cobertura que dan 404.
- [ ] Las meta descriptions y og:image faltantes.
- [ ] El mensaje de minibodega en los posts de mudanzas.
