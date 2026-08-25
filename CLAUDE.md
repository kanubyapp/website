@AGENTS.md
# Reglas de trabajo

## Git
- No ejecutes `git add`, `git commit`, `git push` ni ningún comando de git.
- No despliegues a producción bajo ninguna circunstancia, ni con aprobación verbal.
- Al terminar una tarea, deja los cambios en el working directory y lista los archivos
  que tocaste. El commit y el push los hace el equipo manualmente desde terminal.

## Flujo de trabajo
- Antes de escribir código, entrega un plan: qué archivos vas a crear o modificar,
  qué decisiones técnicas implica y qué riesgos ves.
- Espera aprobación explícita antes de ejecutar. No asumas aprobación por silencio.
- Si durante la ejecución encuentras algo que el plan no contemplaba, detente
  y repórtalo antes de improvisar una solución.

## Fidelidad de diseño
- Fase actual: copia fiel. No refactorices, no optimices, no "limpies" markup.
- Nada de Tailwind. Todo estilo viene de CSS propio.
- Si algo se ve duplicado, mal escrito o mejorable, repórtalo. No lo corrijas.

## Alcance
- Haz solo lo que se pide. No agregues elementos, secciones ni mejoras no solicitadas.
- No repitas contexto ya establecido en el proyecto.

## Verificación
- No hagas comprobaciones repetidas ni ciclos de validación por tu cuenta.
  Ejecuta la tarea una vez y reporta.
- La revisión visual la hace el equipo. No levantes el servidor ni abras
  el navegador para verificar cómo se ve algo.
- Si detectas un error real que impide que la tarea funcione, repórtalo.
  Esa es la única excepción.