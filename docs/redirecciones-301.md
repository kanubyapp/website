# Redirecciones 301

Referencia de las redirecciones que están implementadas en el sitio para las URLs de los sitios anteriores de kanuby.com: el WordPress y, antes de él, un sitio en otro stack. Las reglas viven en `src/lib/redirecciones.ts` (las carga `next.config.ts`) y la de mayúsculas en `src/proxy.ts`. `src/lib/redirecciones.test.ts` comprueba lo que este documento promete. Si se cambia una regla, se cambia aquí también.

Actualizado el 30 de octubre de 2026.

## Cómo funcionan

- **Todas son 301.** Cada regla lleva `statusCode: 301` explícito, porque `permanent: true` de Next da 308. `/gracias/` también se pasó de 308 a 301.
- **Un solo salto.** Cada destino es una ruta viva que responde 200, y ninguna regla captura un destino de otra.
- **Ninguna captura una ruta viva.** Ni la home, ni los 4 servicios, ni `/blog/`, ni las categorías, `/social/`, las legales o los 24 posts.
- **Ningún enlace interno depende de una redirección.** Los `href` de los componentes y los `"enlace"` de los posts apuntan siempre a la ruta viva. La prueba falla si alguien enlaza una ruta vieja.
- **Mayúsculas.** Next compara los orígenes sin distinguir mayúsculas: `/HOME/` va directo a `/`. Cualquier otra ruta con mayúsculas la manda `src/proxy.ts` con 301 a su versión en minúsculas. Compara la ruta decodificada (`%C3%91` es la Ñ) y conserva la query. No toca `/_next/` (archivos de compilación), `/api/` (el formulario) ni `/images/`, que tiene archivos con mayúsculas como `Black-webtag.png`.
- **Barra final.** Con `trailingSlash: true`, Next pone su propia redirección de barra final (308) antes que cualquier regla, con prioridad (`node_modules/next/dist/lib/load-custom-routes.js`). Una URL vieja pedida sin barra hace dos saltos: `/about` → 308 `/about/` → 301 `/`. Esto afecta sobre todo al sitio anterior a WordPress, cuyas URLs no llevaban barra. Se decidió dejarlo así: no se tocan la regla de barra final ni la configuración de Vercel. El destino final es correcto.
- **Firewall de Vercel.** Todo lo que empieza con `/wp-` (`/wp-content/`, `/wp-admin/`, `/wp-json/`, `/wp-login.php`, `/wp-includes/`) y `/xmlrpc.php` responde 403 (`x-vercel-mitigated: deny`) antes de llegar a Next. Ahí no hay reglas, porque nunca se ejecutarían. El bloqueo se mantiene.
- **Orden.** Primero la barra final de Next, luego las reglas en el orden de `REDIRECCIONES` (los feeds de cada post van antes del comodín de feeds) y al final la regla de minúsculas en el proxy.

## Fuentes

- **WordPress, revisado el 9 de octubre de 2026:** el sitemap de Yoast (`/sitemap_index.xml`, con `post-sitemap.xml` de 24 posts y `page-sitemap.xml` de 7 páginas), la API REST pública (`/wp-json/wp/v2/`: 3 categorías, 0 etiquetas, 2 autores y 157 de 175 adjuntos), pruebas con curl de feeds, paginación, fechas, búsqueda y de las redirecciones que WordPress ya hacía, y las rutas de `legacy/`.
- **Internet Archive, octubre de 2026:** 18 URLs que no salían en esas fuentes, de WordPress y del sitio anterior. Todas daban 404 en kanuby.com.

## Rutas que existen igual

No llevan regla: responden igual en el sitio nuevo.

- **Páginas:** `/`, `/social/`, `/mudanzas-monterrey/`, `/mudanzas-monterrey-cdmx/`, `/mudanzas-empresariales-monterrey/`, `/minibodegas-monterrey/`.
- **Categorías:** `/mudanzas/`, `/minibodegas/`, `/sin-categoria/` (cada una con una sola página).
- **Los 24 posts**, con los mismos slugs de `src/lib/posts.ts`.
- **`/sitemap.xml`** y **`/robots.txt`.**

## Sitemaps

Search Console puede tener dados de alta los de WordPress.

| Origen | Destino |
|---|---|
| `/sitemap_index.xml` | `/sitemap.xml` |
| `/post-sitemap.xml` | `/sitemap.xml` |
| `/page-sitemap.xml` | `/sitemap.xml` |
| `/wp-sitemap.xml` | `/sitemap.xml` |

`/wp-sitemap.xml` no la bloquea el firewall: solo bloquea `/wp-` seguido de una carpeta o de los archivos PHP listados arriba.

## Páginas y servicios anteriores

| Origen | Destino | Nota |
|---|---|---|
| `/gracias/` | `/` | El formulario lleva a WhatsApp; no hay página de gracias. Si Google Ads o GTM contaban conversiones con la visita a /gracias/, esa medición ya no ocurre. |
| `/home/` | `/` | Slug de la portada en WordPress. |
| `/nosotros/` | `/` | Internet Archive. |
| `/cotizar-mudanza/` | `/mudanzas-monterrey/` | legacy/ |
| `/mini-bodegas/` | `/minibodegas-monterrey/` | legacy/ |
| `/mudanzas/empresariales/` | `/mudanzas-empresariales-monterrey/` | legacy/ |
| `/mudanzas/monterrey-cdmx/` | `/mudanzas-monterrey-cdmx/` | legacy/ |
| `/privacidad/` | `/aviso-de-privacidad/` | legacy/ |
| `/terminos/` | `/terminos-y-condiciones/` | legacy/ |
| `/mudanzas/monterrey/` | `/mudanzas-monterrey/` | Internet Archive. |
| `/minibodegas/monterrey/` | `/minibodegas-monterrey/` | Internet Archive. |
| `/mudanzas/puebla/` | `/mudanzas-monterrey/` | Internet Archive. Kanuby ya no opera en Puebla y no hay página de Puebla. |
| `/mudanzas-puebla/` | `/mudanzas-monterrey/` | Igual que la anterior. |
| `/minibodegas/puebla/` | `/minibodegas-monterrey/` | Igual que la anterior. |
| `/checklist-para-mudarte-en-monterrey-sin-complicaciones/` | `/checklist-mudanza-monterrey/` | Slug anterior del post; WordPress ya lo redirigía. |

## Sitio anterior a WordPress

Del Internet Archive. Sus URLs no llevaban barra final, así que pedidas tal cual hacen dos saltos (ver "Barra final").

| Origen | Destino | Nota |
|---|---|---|
| `/about/` | `/` | |
| `/join/` | `/` | |
| `/login/` | `/` | |
| `/calculator/` | `/minibodegas-monterrey/` | |
| `/privacy/` | `/aviso-de-privacidad/` | |
| `/terms/` | `/terminos-y-condiciones/` | |
| `/blog/6-tips-para-mantener-tu-cuarto-habitaci-n-organizado/` | `/blog/` | |
| `/quoter/:id/spaces/` | `/minibodegas-monterrey/` | Comodín para las nueve URLs del cotizador. Captura solo `/quoter/{un segmento}/spaces/`; `/quoter/`, `/quoter/{id}/` y rutas más largas siguen en 404. |

## Feeds

Van primero las 24 reglas de los posts y después el comodín.

| Origen | Destino | Captura |
|---|---|---|
| `/feed/` | `/blog/` | Feed general. |
| `/feed/:tipo(atom\|rdf\|rss2)/` | `/blog/` | Sus tres variantes. |
| `/{slug}/feed/` (24 reglas, una por post) | `/{slug}/` | El feed de comentarios de cada post va a su post. Se generan desde `src/lib/posts.ts`: un post nuevo trae su regla. |
| `/:padre/feed/` | `/blog/` | Cualquier otro `/{algo}/feed/`: las categorías, `/comments/feed/`, `/gracias/feed/` y los de las páginas. Ninguna ruta viva termina en `/feed/`. |

## Paginación, autores, fechas y búsqueda

Todas van a `/blog/`.

| Origen | Captura |
|---|---|
| `/page/:n(\d+)/` | `/page/1/`, `/page/2/`, … solo con número. |
| `/:categoria(mudanzas\|minibodegas\|sin-categoria)/page/:n(\d+)/` | La paginación de las tres categorías. |
| `/author/:autor/:resto*` | `/author/scndal/`, `/author/softwarekanuby/` y lo que cuelgue de ellas (feed, páginas). |
| `/:anio(20\d{2})/` | Archivos por año, como `/2025/`. Ningún slug vivo es un año. |
| `/:anio(20\d{2})/:mes(\d{2})/` | Por mes, como `/2025/05/`. |
| `/:anio(20\d{2})/:mes(\d{2})/:dia(\d{2})/` | Por día, como `/2025/05/14/`. |
| `/search/:termino*` | `/search/` y `/search/{término}/`. El sitio no tiene buscador. |

## Adjuntos

WordPress creaba una URL por cada imagen subida: `/{padre}/{adjunto}/` si se subió desde una página o post, `/{adjunto}/` si no. Están escritos uno por uno, sin comodín: un patrón de un segmento capturaría páginas vivas y uno de dos segmentos, los feeds.

- **Con padre (45):** van a su página o post padre. Las excepciones son los de `/home/` (la portada) y los dos de `/favicon/` y `/favicon-3/`, que no son páginas: esos van a `/`.
- **Sin padre (99):** van a `/`.

| Origen | Destino |
|---|---|
| `/10251-1/` | `/` |
| `/10251-2/` | `/` |
| `/10251/` | `/` |
| `/3-10m-2/` | `/` |
| `/3-15m-2/` | `/` |
| `/3-20m-2/` | `/` |
| `/3-30m-2/` | `/` |
| `/3-3m-2/` | `/` |
| `/3-6m-2/` | `/` |
| `/about-bg/` | `/` |
| `/asi-es-una-mudanza-con-recoleccion-y-minibodega-incluida-paso-a-paso/moving-tips_-9-tricks-to-know-before-you-pack-_-quicken-loans/` | `/asi-es-una-mudanza-con-recoleccion-y-minibodega-incluida-paso-a-paso/` |
| `/bg4-free-img/` | `/` |
| `/cactus1-free-img/` | `/` |
| `/cactus2-free-img/` | `/` |
| `/cactus4-free-img/` | `/` |
| `/cactus5-free-img/` | `/` |
| `/cactus6-free-img/` | `/` |
| `/camion-celular-2/` | `/` |
| `/camionvolador-2/` | `/` |
| `/checklist-definitiva-para-mudarte-en-monterrey-sin-estres/red-checklist-stock-photo_-image-of-isolated-list-closeup-10974106/` | `/checklist-definitiva-para-mudarte-en-monterrey-sin-estres/` |
| `/checklist-mudanza-monterrey/saiba-como-fazer-uma-mudanca-sem-transtorno/` | `/checklist-mudanza-monterrey/` |
| `/como-evitar-errores-comunes-al-mudarte-en-monterrey/is-it-worth-moving-your-homes-generator-when-you-change-homes_/` | `/como-evitar-errores-comunes-al-mudarte-en-monterrey/` |
| `/como-organizar-tu-minibodega-facilmente/26-secrets-personal-organizers-would-never-tell-you-for-free/` | `/como-organizar-tu-minibodega-facilmente/` |
| `/como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza/free-photo-_-carefree-family-having-fun-while-moving-into-new-home/` | `/como-organizar-tu-nuevo-hogar-despues-de-tu-mudanza/` |
| `/consejos-para-guardar-archivo-muerto-en-minibodega/warehouse-worker-writing-on-clipboard-with-checklist-details-shi/` | `/consejos-para-guardar-archivo-muerto-en-minibodega/` |
| `/contact-bg/` | `/` |
| `/contactanos-2/` | `/` |
| `/cta-bg/` | `/` |
| `/cuanto-cuesta-rentar-una-minibodega-en-monterrey-guia-2025/free-photo-_-black-man-moving-furniture/` | `/cuanto-cuesta-rentar-una-minibodega-en-monterrey-guia-2025/` |
| `/ddddd-2/` | `/` |
| `/ddddd/` | `/` |
| `/default-png/` | `/` |
| `/demo-screenshot/` | `/` |
| `/favicon-2/` | `/` |
| `/favicon-3/` | `/` |
| `/favicon-3/cropped-favicon-png-2/` | `/` |
| `/favicon/` | `/` |
| `/favicon/cropped-favicon-png/` | `/` |
| `/final-kanuby-minibodegas/` | `/` |
| `/free-shipping/` | `/` |
| `/guardamos-2/` | `/` |
| `/guia-para-elegir-el-tamano-ideal-de-tu-minibodega/moving-abroad/` | `/guia-para-elegir-el-tamano-ideal-de-tu-minibodega/` |
| `/guia-para-mudarte-a-monterrey-desde-otra-ciudad/red-checklist-stock-photo_-image-of-isolated-list-closeup-10974106-2/` | `/guia-para-mudarte-a-monterrey-desde-otra-ciudad/` |
| `/guia-para-mudarte-a-monterrey-desde-otra-ciudad/the-ikea-storage-you-need-to-make-your-move-easier/` | `/guia-para-mudarte-a-monterrey-desde-otra-ciudad/` |
| `/hero-bg/` | `/` |
| `/home/sin-titulo-2/` | `/` |
| `/home/sin-titulo-3/` | `/` |
| `/kanuby-blue-2/` | `/` |
| `/kanuby-blue-4/` | `/` |
| `/kanuby-blue-5/` | `/` |
| `/kanuby-blue/` | `/` |
| `/kanuby-orange-2/` | `/` |
| `/kanuby-orange-4/` | `/` |
| `/kanuby-orange-5/` | `/` |
| `/kanuby-orange/` | `/` |
| `/kanuby-web/` | `/` |
| `/kanuby-white-2/` | `/` |
| `/kanuby-white-4/` | `/` |
| `/kanuby-white-5/` | `/` |
| `/kanuby-white/` | `/` |
| `/kanubyminibodegas/` | `/` |
| `/kanubymudanzas/` | `/` |
| `/knauby-camion/` | `/` |
| `/llevamos-2/` | `/` |
| `/logo/` | `/` |
| `/los-mejores-dias-y-horarios-para-hacer-tu-mudanza-en-monterrey/5-consejos-para-realizar-una-mudanza-con-exito/` | `/los-mejores-dias-y-horarios-para-hacer-tu-mudanza-en-monterrey/` |
| `/mesa-de-trabajo-1-2/` | `/` |
| `/mesa-de-trabajo-1-3/` | `/` |
| `/mesa-de-trabajo-1-4/` | `/` |
| `/mesa-de-trabajo-1/` | `/` |
| `/mesa-de-trabajo-2-2/` | `/` |
| `/mesa-de-trabajo-2-3/` | `/` |
| `/mesa-de-trabajo-2-4/` | `/` |
| `/mesa-de-trabajo-2/` | `/` |
| `/mesa-de-trabajo-3-2/` | `/` |
| `/mesa-de-trabajo-3-3/` | `/` |
| `/mesa-de-trabajo-3-4/` | `/` |
| `/mesa-de-trabajo-3/` | `/` |
| `/mesa-de-trabajo-4-2/` | `/` |
| `/mesa-de-trabajo-4/` | `/` |
| `/minibodegas-monterrey/container/` | `/minibodegas-monterrey/` |
| `/minibodegas-monterrey/gemini_generated_image_h2iunrh2iunrh2iu/` | `/minibodegas-monterrey/` |
| `/minibodegas-monterrey/guardamos-kanuby/` | `/minibodegas-monterrey/` |
| `/minibodegas-monterrey/man-looking-intently-at-work-tablet-in-garage/` | `/minibodegas-monterrey/` |
| `/minibodegas-monterrey/mesa-de-trabajo-1-6/` | `/minibodegas-monterrey/` |
| `/minibodegas-monterrey/mesa-de-trabajo-2-6/` | `/minibodegas-monterrey/` |
| `/minibodegas-monterrey/mesa-de-trabajo-3-6/` | `/minibodegas-monterrey/` |
| `/minibodegas-monterrey/mesa-de-trabajo-4-3/` | `/minibodegas-monterrey/` |
| `/minibodegas-monterrey/mesa-de-trabajo-5/` | `/minibodegas-monterrey/` |
| `/minibodegas-monterrey/minibodegas-monterrey-2/` | `/minibodegas-monterrey/` |
| `/minibodegas-monterrey/nano_banana_pro_agrega_el_logo_a_los_tres_contenedores__que_se_vea_unificado_como_si_estuviese_pinta_1/` | `/minibodegas-monterrey/` |
| `/minibodegas-monterrey/three-sleek-black-shipping-containers-stand-front-gray-industrial-building-showcasing-modern-storage-solutions-geometric-symmetry/` | `/minibodegas-monterrey/` |
| `/money-back/` | `/` |
| `/mudanza-urgente-en-monterrey/gumtape/` | `/mudanza-urgente-en-monterrey/` |
| `/mudanzas-empresariales-monterrey/black-webtag-2/` | `/mudanzas-empresariales-monterrey/` |
| `/mudanzas-empresariales-monterrey/black-webtag/` | `/mudanzas-empresariales-monterrey/` |
| `/mudanzas-empresariales-monterrey/sin-titulo-4/` | `/mudanzas-empresariales-monterrey/` |
| `/mudanzas-empresariales-monterrey/white-webtag-2/` | `/mudanzas-empresariales-monterrey/` |
| `/mudanzas-empresariales-monterrey/white-webtag/` | `/mudanzas-empresariales-monterrey/` |
| `/mudanzas-en-monterrey-como-elegir-un-servicio-profesional-y-confiable/happy-tenant-moving-home-resting-breathing-fresh-air/` | `/mudanzas-en-monterrey-como-elegir-un-servicio-profesional-y-confiable/` |
| `/mudanzas-monterrey-cdmx/magnific__un-mapa-de-la-repblica-mexicana-en-un-gris-tenue-c__68702/` | `/mudanzas-monterrey-cdmx/` |
| `/mudanzas-oficina-monterrey-cambio-sin-interrumpir/why-we-need-to-hire-commercial-removing-companies-in-london/` | `/mudanzas-oficina-monterrey-cambio-sin-interrumpir/` |
| `/mudanzas-premium-san-pedro/trucos-para-hacer-una-mudanza-nacional-barata-sin-morir-en-el-intento/` | `/mudanzas-premium-san-pedro/` |
| `/mudanzas-residenciales-en-monterrey/pareja-mirando-dentro-de-la-caja-_-foto-gratis/` | `/mudanzas-residenciales-en-monterrey/` |
| `/mudanzas-y-minibodegas-la-combinacion-perfecta-si-aun-no-puedes-instalarte/home-2/` | `/mudanzas-y-minibodegas-la-combinacion-perfecta-si-aun-no-puedes-instalarte/` |
| `/nosabes-2/` | `/` |
| `/nosabescomoblanco-2/` | `/` |
| `/nosabescomofrase-2/` | `/` |
| `/orange/` | `/` |
| `/orangr-2-2/` | `/` |
| `/organizamos-2/` | `/` |
| `/plant-collection/` | `/` |
| `/plant1-free-img/` | `/` |
| `/plant2-free-img/` | `/` |
| `/plant3-free-img/` | `/` |
| `/plant4-free-img/` | `/` |
| `/plant6-free-img/` | `/` |
| `/plants-store-logo-green/` | `/` |
| `/pr2-2/` | `/` |
| `/pr3-2/` | `/` |
| `/recolectamos-2/` | `/` |
| `/servicio-de-mudanza-profesional-en-monterrey/_-1/` | `/servicio-de-mudanza-profesional-en-monterrey/` |
| `/servicio-de-mudanza-profesional-en-monterrey/we-are-available-gbogbojijeoutlook/` | `/servicio-de-mudanza-profesional-en-monterrey/` |
| `/store-bg/` | `/` |
| `/tarifas-mudanzas-monterrey/_/` | `/tarifas-mudanzas-monterrey/` |
| `/teammate-1/` | `/` |
| `/teammate-2/` | `/` |
| `/teammate-3-1/` | `/` |
| `/testimonial-2/` | `/` |
| `/tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte/_-4/` | `/tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte/` |
| `/tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte/how-to-build-a-pergola-perfectly/` | `/tu-casa-esta-en-remodelacion-una-minibodega-puede-salvarte/` |
| `/untitled8-1200x1200-2/` | `/` |
| `/user1-free-img/` | `/` |
| `/user3-free-img/` | `/` |
| `/utiliza-calaculadora-2/` | `/` |
| `/utilizacsalculadorablanco-2/` | `/` |
| `/warehousekanuby-2/` | `/` |
| `/website-tag-editable-2/` | `/` |
| `/website-tag-editable/` | `/` |
| `/website-tag-white-2/` | `/` |
| `/website-tag-white/` | `/` |
| `/whatsapp-image-2024-11-29-at-19-57-16/` | `/` |
| `/woocommerce-placeholder-2/` | `/` |
| `/woocommerce-placeholder/` | `/` |

## Lo que no se redirige

| URL vieja | Por qué |
|---|---|
| `/wp-content/uploads/2024/07/kanubymudanzas.svg`, `/wp-content/uploads/2024/07/kanubyminibodegas.svg`, `/wp-content/uploads/2024/12/kanuby-web.png` | Tenían destino (dos logotipos y la ilustración del camión), pero el firewall de Vercel bloquea `/wp-content/` antes de llegar a Next. El bloqueo se mantiene y no hay regla. Ningún post enlaza ya a ellas. |
| El resto de `/wp-content/`, `/wp-includes/`, `/wp-admin/`, `/wp-login.php`, `/xmlrpc.php`, `/wp-json/` | Bloqueadas por el firewall (403). |
| `/?s={término}` | Next ignora el parámetro y sirve la home (200). |
| `/?attachment_id={id}` (13 URLs: 3167, 3211, 3212, 3213, 4297, 4310, 4313, 5226, 5254, 5255, 5256, 5257, 5258) | Igual: cae en la home (200). |
| URLs sin barra final | No necesitan regla propia: Next agrega la barra (308) y después aplica la regla que corresponda. |

## Pendientes

1. **Redirecciones configuradas dentro de WordPress.** No se pueden listar desde fuera: hay que exportarlas desde wp-admin (Yoast Premium, el plugin Redirection o los `_wp_old_slug` de la base de datos). Solo se conoce la del checklist.
2. **18 de los 175 adjuntos no eran públicos en la API** y no tienen regla. Si aparecen, se agregan a `ADJUNTOS_CON_PADRE` o `ADJUNTOS_SIN_PADRE`.

## Historial

- **9 de octubre de 2026.** Inventario inicial, sin implementar. Ese día se corrigieron cinco enlaces de posts que apuntaban a archivos de `/wp-content/uploads/` (en `src/lib/posts.ts`): cuatro pasaron a enlazar a `/mudanzas-monterrey/` o `/minibodegas-monterrey/` y en el quinto se quitó el enlace.
- **30 de octubre de 2026.** Se implementó. Decisiones respecto al inventario inicial:
  - Todas 301. Lo que el inventario proponía como 410 pasó a 301: los adjuntos sin padre y los dos de favicon a `/`, y `/search/` y `/comments/feed/` a `/blog/`.
  - Feeds de cada post a su post; el resto de feeds, categorías incluidas, a `/blog/`.
  - Adjuntos con padre a su padre.
  - Paginación, autores y archivos por fecha a `/blog/`, en lugar de `/`.
  - `/gracias/` pasó de 308 a 301.
  - Regla de mayúsculas a minúsculas en el proxy.
  - Las tres imágenes bajo `/wp-content/` no se redirigen: las bloquea el firewall y el bloqueo se mantiene.
  - Las URLs sin barra final hacen dos saltos y se dejan así.
  - Se agregaron las 18 URLs del Internet Archive. En el bloque "Cobertura" del cierre del blog se quitaron los enlaces de Puebla y los de Monterrey pasaron a apuntar a `/mudanzas-monterrey/` y `/minibodegas-monterrey/`.
