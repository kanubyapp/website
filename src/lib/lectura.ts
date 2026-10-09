import type { BloquePost, Inline } from "./posts.ts";

/*
 * Número de palabras y tiempo de lectura de un post, calculados de su
 * contenido real (títulos, párrafos y listas). Sustituyen a los valores fijos
 * que venían del sitio publicado.
 */

/** Palabras por minuto con las que se estima el tiempo de lectura */
export const PALABRAS_POR_MINUTO = 200;

function textoDe(nodos: Inline[]): string {
  return nodos
    .map((nodo) => {
      if (typeof nodo === "string") return nodo;
      if ("salto" in nodo) return " ";
      if ("negrita" in nodo) return textoDe(nodo.negrita);
      if ("cursiva" in nodo) return textoDe(nodo.cursiva);
      return textoDe(nodo.texto);
    })
    .join("");
}

/** Cuenta como palabra cualquier grupo que tenga al menos una letra o un número. */
export function contarPalabras(contenido: BloquePost[]): number {
  const textos = contenido.flatMap((bloque) => {
    if (bloque.tipo === "separador") return [];
    if (bloque.tipo === "lista") return bloque.items.map(textoDe);
    return [textoDe(bloque.texto)];
  });
  return textos
    .join(" ")
    .split(/\s+/)
    .filter((palabra) => /[\p{L}\p{N}]/u.test(palabra)).length;
}

/** "1 minuto", "N minutos"; sin palabras, null */
export function tiempoLectura(palabras: number): string | null {
  if (palabras === 0) return null;
  const minutos = Math.max(1, Math.ceil(palabras / PALABRAS_POR_MINUTO));
  return minutos === 1 ? "1 minuto" : `${minutos} minutos`;
}
