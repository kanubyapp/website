@AGENTS.md
# Reglas de trabajo

## Git
- No ejecutes comandos de git que modifiquen el repositorio: nada de add, commit,
  push, checkout, reset ni stash. Solo puedes usar git status y git diff para leer.
- No despliegues a producción bajo ninguna circunstancia, ni con aprobación verbal.
- Al terminar una tarea, deja los cambios en el working directory, muestra
  git status y un resumen de qué cambió. El commit y el push los hace el equipo
  manualmente desde terminal.

## Flujo de trabajo
- Ejecuta directamente. No entregues plan previo ni esperes aprobación, salvo que
  la instrucción pida un plan, que la tarea sea ambigua o que ejecutarla implique
  una decisión que no está en la instrucción.
- Cuando se pide plan, entrégalo y espera aprobación explícita. No asumas
  aprobación por silencio.
- Si durante la ejecución encuentras algo que la instrucción no contemplaba,
  detente y repórtalo antes de improvisar una solución.
- No repitas contexto ya establecido en el proyecto.

## Fase actual: réplica de kanuby.com
- El sitio se reconstruye como copia fiel de lo publicado en https://kanuby.com,
  hoy hecho en WordPress con Elementor: mismas rutas, mismo texto literal, mismas
  imágenes y misma apariencia.
- Lo que no se copia es la estructura de Elementor: contenedores anidados sin
  función, estilos en línea, clases generadas y envoltorios vacíos. El markup se
  escribe limpio y semántico.
- Cuando haya duda de cómo se ve o qué dice algo, la referencia es el sitio
  publicado, no tu criterio.
- Si algo del sitio publicado está roto, duplicado o mal escrito, repórtalo.
  No lo copies con el error ni lo corrijas por tu cuenta.

## legacy/
- legacy/ guarda la versión anterior del sitio en Next: componentes, páginas SEO
  y páginas legales. Es solo referencia: no se publica, no entra al build y nada
  fuera de legacy importa desde ahí.
- Reutilizar algo de legacy significa traerlo al sistema actual adaptado a sus
  reglas, nunca enlazarlo.
- No modifiques ni borres nada dentro de legacy salvo que se pida.

## Sistema de diseño
- El proyecto NO usa Tailwind. No lo reintroduzcas ni escribas clases de utilidad.
- Todo el estilo es CSS propio, organizado en capas:
    src/app/styles/tokens.css         los valores de diseño, única fuente de verdad
    src/app/styles/base.css           el reset y los estilos de elemento, únicos
    src/app/styles/patrones.css       el vocabulario compartido, clases kb-*
    src/app/styles/interacciones.css  las clases que consulta el JavaScript
  Lo propio de una página va en su módulo CSS. No hay ni debe haber hojas
  globales de página: el orden de capas (base, patrones, y los módulos fuera de
  toda capa) hace que un módulo siempre pueda ajustar un patrón con una regla
  normal, sin !important ni selectores inflados.
- Los valores de tokens.css (colores, tipografías, espaciados) salen del sitio
  publicado, no se inventan.
- Un patrón sube a patrones.css cuando lo piden dos páginas, no antes. Lo que
  solo usa una se queda en su módulo por evidente que parezca.
- No escribas valores sueltos fuera del sistema: usa los tokens. Si un valor no
  está, no lo inventes: decide si toca añadirlo al sistema y repórtalo.
- Si un cambio toca un patrón compartido y afectaría a otras páginas, no lo
  toques: aplica el override acotado a la sección y repórtalo.
- El naranja de marca #EC5B2A no cumple contraste AA para texto normal. Si el
  sitio publicado lo usa en texto, cópialo fiel y repórtalo.

## Imágenes
- Todas las imágenes se descargan a public/images/ y se sirven desde el
  proyecto. Ninguna se enlaza a kanuby.com ni a otro dominio.
- Toda foto o ilustración se sirve con el componente de imagen de Next y su
  sizes, para que lleve srcset. Nada de fondos CSS para fotos o ilustraciones:
  van como imagen con object-fit.
- La imagen principal visible al cargar cada página se marca como prioritaria.
- Si un cambio altera el tamaño en que se muestra una imagen, revisa su sizes.

## Alcance
- Haz solo lo que se pide. No agregues elementos, secciones ni mejoras no
  solicitadas.
- Si algo se ve duplicado, mal escrito o mejorable fuera del alcance, repórtalo.
  No lo corrijas.

## Verificación
- La revisión visual la hace el equipo. No abras el navegador para valorar cómo
  se ve algo.
- El comportamiento sí lo compruebas tú. Si arreglas una lógica, escribe una
  prueba que falle antes del arreglo y pase después. Si no pudiste comprobarlo,
  dilo claro en tu resumen en vez de darlo por bueno.
- No hagas ciclos de validación repetidos. Ejecuta la tarea una vez y reporta.
- Para diagnosticar un fallo reportado, sí levanta el servidor y mide en el
  navegador. No deduzcas la causa leyendo el CSS: repróducela.
- Si detectas un error real que impide que la tarea funcione, repórtalo.
