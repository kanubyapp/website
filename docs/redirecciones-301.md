# Inventario de redirecciones 301

Inventario de las URLs que hoy existen en el WordPress de kanuby.com, para el día en que el dominio apunte al sitio nuevo en Vercel. Todavía no se implementa ninguna redirección.

## Fuentes

Revisado el 9 de octubre de 2026.

- **Sitemap publicado:** https://kanuby.com/sitemap_index.xml, generado por Yoast SEO. /wp-sitemap.xml y /sitemap.xml redirigen a él. Tiene dos sub-sitemaps: post-sitemap.xml (24 posts) y page-sitemap.xml (7 páginas). Yoast no publica sub-sitemaps de categorías, etiquetas, autores ni adjuntos.
- **API REST pública de WordPress** (`/wp-json/wp/v2/`), para lo que no está en el sitemap: 3 categorías, 0 etiquetas, 2 autores y 175 adjuntos. La API solo muestra 157 adjuntos; los otros 18 no son públicos.
- **Pruebas directas con curl** sobre kanuby.com para comprobar feeds, paginación, archivos por fecha, búsqueda y redirecciones que WordPress ya hace.
- **legacy/:** sus rutas propias (/cotizar-mudanza/, /mini-bodegas/, /mudanzas/empresariales/, /mudanzas/monterrey-cdmx/, /privacidad/, /terminos/).
- **docs/replica-decisiones.md.**
- **Rutas del sitio nuevo:** src/app y los 24 slugs de src/lib/posts.ts, que coinciden exactos con el post-sitemap.

Todas las URLs del sitio nuevo llevan barra final (`trailingSlash: true`), igual que WordPress.

## Clasificaciones

- **Existe igual:** la misma ruta responde en el sitio nuevo. No necesita redirección.
- **Tiene equivalente:** el contenido existe con otra ruta. 301 al destino propuesto.
- **No tiene equivalente:** sin contenido equivalente. 301 al destino más cercano o 410.

## Páginas (page-sitemap.xml)

| URL vieja | Clasificación | Destino propuesto | Motivo |
|---|---|---|---|
| `/` | Existe igual | — | |
| `/social/` | Existe igual | — | |
| `/mudanzas-monterrey/` | Existe igual | — | |
| `/mudanzas-monterrey-cdmx/` | Existe igual | — | |
| `/mudanzas-empresariales-monterrey/` | Existe igual | — | |
| `/minibodegas-monterrey/` | Existe igual | — | |
| `/gracias/` | No tiene equivalente | `/` (provisional) | El sitio nuevo no tiene /gracias/: el formulario redirige a WhatsApp. docs/replica-decisiones.md lista "/gracias/ con noindex" entre lo que se corrige al replicar, así que se esperaba la página. Si se replica, pasa a "existe igual". Si Google Ads o GTM cuentan conversiones con la visita a /gracias/, esa medición deja de funcionar. Hoy WordPress la publica con `index, nofollow` y en el sitemap. |

## Posts (post-sitemap.xml)

Los 24 existen igual en el sitio nuevo, con el mismo slug en la raíz.

| URL vieja | Clasificación | Destino propuesto |
|---|---|---|
| `/cuanto-cuesta-una-mudanza-en-monterrey-en-2025/` | Existe igual | — |
| `/las-mejores-zonas-para-mudarte-en-monterrey-si-buscas-seguridad-y-conectividad/` | Existe igual | — |
| `/como-elegir-una-empresa-de-mudanzas-confiable-en-monterrey/` | Existe igual | — |
| `/errores-comunes-al-mudarse-en-monterrey-y-como-evitarlos/` | Existe igual | — |
| `/los-mejores-dias-y-horarios-para-hacer-tu-mudanza-en-monterrey/` | Existe igual | — |
| `/checklist-definitiva-para-mudarte-en-monterrey-sin-estres/` | Existe igual | — |
| `/guia-para-mudarte-a-monterrey-desde-otra-ciudad/` | Existe igual | — |
| `/mudanzas-y-minibodegas-la-combinacion-perfecta-si-aun-no-puedes-instalarte/` | Existe igual | — |
| `/cuanto-cuesta-rentar-una-minibodega-en-monterrey-guia-2025/` | Existe igual | — |
| `/asi-es-una-mudanza-con-recoleccion-y-minibodega-incluida-paso-a-paso/` | Existe igual | — |
| `/guia-para-elegir-el-tamano-ideal-de-tu-minibodega/` | Existe igual | — |
| `/como-organizar-tu-minibodega-facilmente/` | Existe igual | — |
| `/consejos-para-guardar-archivo-muerto-en-minibodega/` | Existe igual | — |
| `/tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte/` | Existe igual | — |
| `/como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza/` | Existe igual | — |
| `/mudanzas-premium-san-pedro/` | Existe igual | — |
| `/mudanzas-oficina-monterrey-cambio-sin-interrumpir/` | Existe igual | — |
| `/como-evitar-errores-comunes-al-mudarte-en-monterrey/` | Existe igual | — |
| `/mudanza-urgente-en-monterrey/` | Existe igual | — |
| `/servicio-de-mudanza-profesional-en-monterrey/` | Existe igual | — |
| `/mudanzas-residenciales-en-monterrey/` | Existe igual | — |
| `/checklist-mudanza-monterrey/` | Existe igual | — |
| `/mudanzas-en-monterrey-como-elegir-un-servicio-profesional-y-confiable/` | Existe igual | — |
| `/tarifas-mudanzas-monterrey/` | Existe igual | — |

## Categorías, etiquetas y autores

WordPress publica las categorías sin el prefijo /category/.

| URL vieja | Clasificación | Destino propuesto | Motivo |
|---|---|---|---|
| `/mudanzas/` | Existe igual | — | Una sola página: `/mudanzas/page/2/` da 404 en WordPress. |
| `/minibodegas/` | Existe igual | — | Una sola página. |
| `/sin-categoria/` | Existe igual | — | Una sola página. |
| Etiquetas | — | — | WordPress no tiene ninguna. |
| `/author/scndal/` | No tiene equivalente | `/` | WordPress ya la redirige con 301 a /. Se conserva igual. |
| `/author/softwarekanuby/` | No tiene equivalente | `/` | Igual que la anterior. |
| `/author/{autor}/page/{n}/` y `/author/{autor}/feed/` | No tiene equivalente | `/` | WordPress ya las redirige con 301 a /. |

## Archivos por fecha y paginación

Los 24 posts son de mayo de 2025.

| URL vieja | Clasificación | Destino propuesto | Motivo |
|---|---|---|---|
| `/2025/`, `/2025/05/` y `/2025/05/{día}/` | No tiene equivalente | `/` | WordPress (Yoast) ya los redirige con 301 a /. Se conserva igual. |
| `/page/{n}/` | No tiene equivalente | `/` | En WordPress responde 200 con la home y un canonical a /, con cualquier número (hasta /page/99/). El sitio nuevo no tiene paginación en la raíz. |
| `/mudanzas/page/1/` (y en las otras categorías) | Tiene equivalente | `/mudanzas/` (su categoría) | WordPress ya la redirige con 301 a la categoría. |

## Feeds

El sitio nuevo no publica RSS.

| URL vieja | Clasificación | Destino propuesto | Motivo |
|---|---|---|---|
| `/feed/` | No tiene equivalente | `/blog/` | Feed general de posts; /blog/ es el listado equivalente. |
| `/feed/atom/` y `/feed/rdf/` | No tiene equivalente | `/blog/` | Variantes del feed general. |
| `/feed/rss2/` | No tiene equivalente | `/blog/` | WordPress ya la redirige a /feed/. |
| `/comments/feed/` | No tiene equivalente | 410 | El sitio nuevo no tiene comentarios. |
| `/mudanzas/feed/` | No tiene equivalente | `/mudanzas/` | Feed de la categoría. |
| `/minibodegas/feed/` | No tiene equivalente | `/minibodegas/` | Feed de la categoría. |
| `/sin-categoria/feed/` | No tiene equivalente | `/sin-categoria/` | Feed de la categoría. |
| `/{slug}/feed/` de los 24 posts y las 7 páginas | No tiene equivalente | `/{slug}/` | Feed de comentarios de cada post o página. Responde 200 en todos los probados. Una sola regla por patrón: /gracias/feed/ sigue el destino que se decida para /gracias/. |

## Búsqueda

| URL vieja | Clasificación | Destino propuesto | Motivo |
|---|---|---|---|
| `/search/{término}/` | No tiene equivalente | 410 | El sitio nuevo no tiene buscador. Son resultados internos, no contenido. |
| `/?s={término}` | No tiene equivalente | Sin regla | Next ignora el parámetro y sirve la home (200). |

## Redirecciones que WordPress ya hace

| URL vieja | Clasificación | Destino propuesto | Motivo |
|---|---|---|---|
| `/checklist-para-mudarte-en-monterrey-sin-complicaciones/` | Tiene equivalente | `/checklist-mudanza-monterrey/` | Hoy hace 301 a ese destino. Es la que cita docs/replica-decisiones.md. |
| `/home/` | Tiene equivalente | `/` | Hoy hace 301 a /. "home" es el slug de la portada. |
| `/{ruta}` sin barra final | Existe igual | — | Next la agrega por `trailingSlash: true`, como hoy hace WordPress. |
| `http://kanuby.com/...` | Existe igual | — | Vercel fuerza HTTPS. |
| `https://www.kanuby.com/...` | Tiene equivalente | `https://kanuby.com/...` | Hoy hace 301. Se configura en el dominio de Vercel; está como pendiente en docs/replica-decisiones.md. |

Puede haber más 301 configuradas en WordPress, en el módulo de redirecciones de Yoast Premium, en el plugin Redirection o como slugs antiguos de posts (`_wp_old_slug`). No se pueden listar desde fuera: hay que exportarlas desde wp-admin.

## Sitemaps, robots y archivos de WordPress

| URL vieja | Clasificación | Destino propuesto | Motivo |
|---|---|---|---|
| `/sitemap_index.xml` | Tiene equivalente | `/sitemap.xml` | Sitemap de Yoast; el sitio nuevo lo sirve en /sitemap.xml. |
| `/post-sitemap.xml` y `/page-sitemap.xml` | Tiene equivalente | `/sitemap.xml` | Sub-sitemaps de Yoast. |
| `/wp-sitemap.xml` | Tiene equivalente | `/sitemap.xml` | Hoy redirige a /sitemap_index.xml. |
| `/sitemap.xml` | Existe igual | — | |
| `/robots.txt` | Existe igual | — | |
| `/wp-content/uploads/2024/07/kanubymudanzas.svg` | Tiene equivalente | `/mudanzas-monterrey/` | Ver "Hallazgos": un post del sitio nuevo enlaza a este archivo. |
| `/wp-content/uploads/2024/07/kanubyminibodegas.svg` | Tiene equivalente | `/minibodegas-monterrey/` | Ver "Hallazgos": dos posts del sitio nuevo enlazan a este archivo. |
| `/wp-content/uploads/2024/12/kanuby-web.png` | Tiene equivalente | `/` | Ver "Hallazgos": dos posts del sitio nuevo enlazan a este archivo. |
| `/wp-content/uploads/...` (el resto de archivos) | No tiene equivalente | 410 | Las imágenes del sitio nuevo se sirven desde /images/ con otros nombres; no hay correspondencia uno a uno. |
| `/wp-content/...`, `/wp-includes/...` | No tiene equivalente | 410 | Archivos internos de WordPress. |
| `/wp-admin/...`, `/wp-login.php`, `/xmlrpc.php` | No tiene equivalente | 410 | Administración de WordPress. |
| `/wp-json/...` | No tiene equivalente | 410 | API de WordPress. |

## Rutas de legacy/

Ninguna existe hoy en kanuby.com: todas responden 404. No necesitan redirección, salvo que esa versión se haya publicado alguna vez en el dominio. Por si acaso, los destinos más cercanos:

| URL vieja | Clasificación | Destino propuesto |
|---|---|---|
| `/cotizar-mudanza/` | No tiene equivalente | `/mudanzas-monterrey/` |
| `/mini-bodegas/` | Tiene equivalente | `/minibodegas-monterrey/` |
| `/mudanzas/empresariales/` | Tiene equivalente | `/mudanzas-empresariales-monterrey/` |
| `/mudanzas/monterrey-cdmx/` | Tiene equivalente | `/mudanzas-monterrey-cdmx/` |
| `/privacidad/` | Tiene equivalente | `/aviso-de-privacidad/` |
| `/terminos/` | Tiene equivalente | `/terminos-y-condiciones/` |

`/mudanzas/` de legacy coincide con la categoría actual, que existe igual.

## Adjuntos

WordPress crea una URL por cada imagen subida: `/{padre}/{adjunto}/` si se subió desde una página o post, `/{adjunto}/` si no. Hoy Yoast redirige todas con 301 al archivo en /wp-content/uploads/. Como esos archivos desaparecen, la propuesta es:

- **Adjunto con padre:** 301 a la página o post padre.
- **Adjunto sin padre:** 410.

En la tabla: 43 van a su padre, 101 a 410 y 13 son URLs con `?attachment_id=` que no necesitan regla. Ninguna choca con una ruta del sitio nuevo. Faltan los 18 adjuntos que la API no hace públicos.

| URL vieja | Clasificación | Destino propuesto | Motivo |
|---|---|---|---|
| `/10251-1/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/10251-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/10251/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/3-10m-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/3-15m-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/3-20m-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/3-30m-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/3-3m-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/3-6m-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/?attachment_id=3167` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=3211` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=3212` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=3213` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=4297` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=4310` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=4313` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=5226` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=5254` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=5255` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=5256` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=5257` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/?attachment_id=5258` | No tiene equivalente | Sin regla (cae en la home, 200) | URL con parámetro: Next ignora la query y sirve la home. No hace falta regla. |
| `/about-bg/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/asi-es-una-mudanza-con-recoleccion-y-minibodega-incluida-paso-a-paso/moving-tips_-9-tricks-to-know-before-you-pack-_-quicken-loans/` | Tiene equivalente | /asi-es-una-mudanza-con-recoleccion-y-minibodega-incluida-paso-a-paso/ | La página o post donde se subió la imagen. |
| `/bg4-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/cactus1-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/cactus2-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/cactus4-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/cactus5-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/cactus6-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/camion-celular-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/camionvolador-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/checklist-definitiva-para-mudarte-en-monterrey-sin-estres/red-checklist-stock-photo_-image-of-isolated-list-closeup-10974106/` | Tiene equivalente | /checklist-definitiva-para-mudarte-en-monterrey-sin-estres/ | La página o post donde se subió la imagen. |
| `/checklist-mudanza-monterrey/saiba-como-fazer-uma-mudanca-sem-transtorno/` | Tiene equivalente | /checklist-mudanza-monterrey/ | La página o post donde se subió la imagen. |
| `/como-evitar-errores-comunes-al-mudarte-en-monterrey/is-it-worth-moving-your-homes-generator-when-you-change-homes_/` | Tiene equivalente | /como-evitar-errores-comunes-al-mudarte-en-monterrey/ | La página o post donde se subió la imagen. |
| `/como-organizar-tu-minibodega-facilmente/26-secrets-personal-organizers-would-never-tell-you-for-free/` | Tiene equivalente | /como-organizar-tu-minibodega-facilmente/ | La página o post donde se subió la imagen. |
| `/como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza/free-photo-_-carefree-family-having-fun-while-moving-into-new-home/` | Tiene equivalente | /como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza/ | La página o post donde se subió la imagen. |
| `/consejos-para-guardar-archivo-muerto-en-minibodega/warehouse-worker-writing-on-clipboard-with-checklist-details-shi/` | Tiene equivalente | /consejos-para-guardar-archivo-muerto-en-minibodega/ | La página o post donde se subió la imagen. |
| `/contact-bg/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/contactanos-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/cta-bg/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/cuanto-cuesta-rentar-una-minibodega-en-monterrey-guia-2025/free-photo-_-black-man-moving-furniture/` | Tiene equivalente | /cuanto-cuesta-rentar-una-minibodega-en-monterrey-guia-2025/ | La página o post donde se subió la imagen. |
| `/ddddd-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/ddddd/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/default-png/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/demo-screenshot/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/favicon-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/favicon-3/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/favicon-3/cropped-favicon-png-2/` | No tiene equivalente | 410 | Su padre (/favicon-3/) es otro adjunto, no una página. |
| `/favicon/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/favicon/cropped-favicon-png/` | No tiene equivalente | 410 | Su padre (/favicon/) es otro adjunto, no una página. |
| `/final-kanuby-minibodegas/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/free-shipping/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/guardamos-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/guia-para-elegir-el-tamano-ideal-de-tu-minibodega/moving-abroad/` | Tiene equivalente | /guia-para-elegir-el-tamano-ideal-de-tu-minibodega/ | La página o post donde se subió la imagen. |
| `/guia-para-mudarte-a-monterrey-desde-otra-ciudad/red-checklist-stock-photo_-image-of-isolated-list-closeup-10974106-2/` | Tiene equivalente | /guia-para-mudarte-a-monterrey-desde-otra-ciudad/ | La página o post donde se subió la imagen. |
| `/guia-para-mudarte-a-monterrey-desde-otra-ciudad/the-ikea-storage-you-need-to-make-your-move-easier/` | Tiene equivalente | /guia-para-mudarte-a-monterrey-desde-otra-ciudad/ | La página o post donde se subió la imagen. |
| `/hero-bg/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/home/sin-titulo-2/` | Tiene equivalente | / | El padre es la página "home", que WordPress ya redirige a /. |
| `/home/sin-titulo-3/` | Tiene equivalente | / | El padre es la página "home", que WordPress ya redirige a /. |
| `/kanuby-blue-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-blue-4/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-blue-5/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-blue/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-orange-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-orange-4/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-orange-5/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-orange/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-web/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-white-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-white-4/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-white-5/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanuby-white/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanubyminibodegas/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/kanubymudanzas/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/knauby-camion/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/llevamos-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/logo/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/los-mejores-dias-y-horarios-para-hacer-tu-mudanza-en-monterrey/5-consejos-para-realizar-una-mudanza-con-exito/` | Tiene equivalente | /los-mejores-dias-y-horarios-para-hacer-tu-mudanza-en-monterrey/ | La página o post donde se subió la imagen. |
| `/mesa-de-trabajo-1-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-1-3/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-1-4/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-1/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-2-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-2-3/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-2-4/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-3-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-3-3/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-3-4/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-3/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-4-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mesa-de-trabajo-4/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/minibodegas-monterrey/container/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/minibodegas-monterrey/gemini_generated_image_h2iunrh2iunrh2iu/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/minibodegas-monterrey/guardamos-kanuby/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/minibodegas-monterrey/man-looking-intently-at-work-tablet-in-garage/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/minibodegas-monterrey/mesa-de-trabajo-1-6/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/minibodegas-monterrey/mesa-de-trabajo-2-6/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/minibodegas-monterrey/mesa-de-trabajo-3-6/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/minibodegas-monterrey/mesa-de-trabajo-4-3/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/minibodegas-monterrey/mesa-de-trabajo-5/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/minibodegas-monterrey/minibodegas-monterrey-2/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/minibodegas-monterrey/nano_banana_pro_agrega_el_logo_a_los_tres_contenedores__que_se_vea_unificado_como_si_estuviese_pinta_1/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/minibodegas-monterrey/three-sleek-black-shipping-containers-stand-front-gray-industrial-building-showcasing-modern-storage-solutions-geometric-symmetry/` | Tiene equivalente | /minibodegas-monterrey/ | La página o post donde se subió la imagen. |
| `/money-back/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/mudanza-urgente-en-monterrey/gumtape/` | Tiene equivalente | /mudanza-urgente-en-monterrey/ | La página o post donde se subió la imagen. |
| `/mudanzas-empresariales-monterrey/black-webtag-2/` | Tiene equivalente | /mudanzas-empresariales-monterrey/ | La página o post donde se subió la imagen. |
| `/mudanzas-empresariales-monterrey/black-webtag/` | Tiene equivalente | /mudanzas-empresariales-monterrey/ | La página o post donde se subió la imagen. |
| `/mudanzas-empresariales-monterrey/sin-titulo-4/` | Tiene equivalente | /mudanzas-empresariales-monterrey/ | La página o post donde se subió la imagen. |
| `/mudanzas-empresariales-monterrey/white-webtag-2/` | Tiene equivalente | /mudanzas-empresariales-monterrey/ | La página o post donde se subió la imagen. |
| `/mudanzas-empresariales-monterrey/white-webtag/` | Tiene equivalente | /mudanzas-empresariales-monterrey/ | La página o post donde se subió la imagen. |
| `/mudanzas-en-monterrey-como-elegir-un-servicio-profesional-y-confiable/happy-tenant-moving-home-resting-breathing-fresh-air/` | Tiene equivalente | /mudanzas-en-monterrey-como-elegir-un-servicio-profesional-y-confiable/ | La página o post donde se subió la imagen. |
| `/mudanzas-monterrey-cdmx/magnific__un-mapa-de-la-repblica-mexicana-en-un-gris-tenue-c__68702/` | Tiene equivalente | /mudanzas-monterrey-cdmx/ | La página o post donde se subió la imagen. |
| `/mudanzas-oficina-monterrey-cambio-sin-interrumpir/why-we-need-to-hire-commercial-removing-companies-in-london/` | Tiene equivalente | /mudanzas-oficina-monterrey-cambio-sin-interrumpir/ | La página o post donde se subió la imagen. |
| `/mudanzas-premium-san-pedro/trucos-para-hacer-una-mudanza-nacional-barata-sin-morir-en-el-intento/` | Tiene equivalente | /mudanzas-premium-san-pedro/ | La página o post donde se subió la imagen. |
| `/mudanzas-residenciales-en-monterrey/pareja-mirando-dentro-de-la-caja-_-foto-gratis/` | Tiene equivalente | /mudanzas-residenciales-en-monterrey/ | La página o post donde se subió la imagen. |
| `/mudanzas-y-minibodegas-la-combinacion-perfecta-si-aun-no-puedes-instalarte/home-2/` | Tiene equivalente | /mudanzas-y-minibodegas-la-combinacion-perfecta-si-aun-no-puedes-instalarte/ | La página o post donde se subió la imagen. |
| `/nosabes-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/nosabescomoblanco-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/nosabescomofrase-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/orange/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/orangr-2-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/organizamos-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/plant-collection/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/plant1-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/plant2-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/plant3-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/plant4-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/plant6-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/plants-store-logo-green/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/pr2-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/pr3-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/recolectamos-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/servicio-de-mudanza-profesional-en-monterrey/_-1/` | Tiene equivalente | /servicio-de-mudanza-profesional-en-monterrey/ | La página o post donde se subió la imagen. |
| `/servicio-de-mudanza-profesional-en-monterrey/we-are-available-gbogbojijeoutlook/` | Tiene equivalente | /servicio-de-mudanza-profesional-en-monterrey/ | La página o post donde se subió la imagen. |
| `/store-bg/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/tarifas-mudanzas-monterrey/_/` | Tiene equivalente | /tarifas-mudanzas-monterrey/ | La página o post donde se subió la imagen. |
| `/teammate-1/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/teammate-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/teammate-3-1/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/testimonial-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte/_-4/` | Tiene equivalente | /tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte/ | La página o post donde se subió la imagen. |
| `/tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte/how-to-build-a-pergola-perfectly/` | Tiene equivalente | /tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte/ | La página o post donde se subió la imagen. |
| `/untitled8-1200x1200-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/user1-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/user3-free-img/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/utiliza-calaculadora-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/utilizacsalculadorablanco-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/warehousekanuby-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/website-tag-editable-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/website-tag-editable/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/website-tag-white-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/website-tag-white/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/whatsapp-image-2024-11-29-at-19-57-16/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/woocommerce-placeholder-2/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |
| `/woocommerce-placeholder/` | No tiene equivalente | 410 | Adjunto sin página padre: no hay destino con contexto. |

## Hallazgos fuera del inventario

Hay que resolverlos antes de publicar. No se corrigió nada.

1. **/gracias/ no existe en el sitio nuevo**, aunque docs/replica-decisiones.md la incluye con noindex entre lo que se corrige al replicar. Hay que decidir si se replica o se redirige, y revisar si alguna conversión de Google Ads o GTM depende de ella.
2. **Cinco enlaces de posts apuntan a archivos de WordPress** (`https://kanuby.com/wp-content/uploads/...`), los que lista docs/replica-decisiones.md. En cuanto el dominio cambie darán 404, salvo que se implementen las tres redirecciones de archivo propuestas arriba o se cambie el enlace en el contenido.
3. **Las redirecciones configuradas en WordPress no se pueden inventariar desde fuera.** Hay que exportarlas desde wp-admin: Yoast Premium, Redirection o los `_wp_old_slug` de la base de datos.
4. **18 de los 175 adjuntos no son públicos en la API** y no aparecen en la tabla.
