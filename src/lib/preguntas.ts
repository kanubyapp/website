/*
 * Preguntas frecuentes de las páginas de servicio (components/seccion-
 * preguntas.tsx): el formato de las respuestas y su JSON-LD de FAQPage.
 */

/** Un párrafo (con "\n" para un salto de línea) o una lista. */
export type Bloque = string | string[];

export type PreguntaFrecuente = { pregunta: string; respuesta: Bloque[] };

/** Texto plano de una respuesta, para el JSON-LD de FAQPage. */
export function textoPlano(bloques: Bloque[]): string {
  return bloques
    .map((bloque) => (Array.isArray(bloque) ? bloque.join(". ") : bloque.replace("\n", " ")))
    .join(" ");
}

/** JSON-LD de FAQPage con las preguntas de la página, en su orden. */
export function jsonLdPreguntas(preguntas: PreguntaFrecuente[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map(({ pregunta, respuesta }) => ({
      "@type": "Question",
      name: pregunta,
      acceptedAnswer: { "@type": "Answer", text: textoPlano(respuesta) },
    })),
  };
}
