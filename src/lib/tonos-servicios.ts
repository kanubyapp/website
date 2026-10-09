/*
 * Color de los cuadros de ícono de la rejilla de servicios de mudanzas, en un
 * orden fijo que parece aleatorio. En escritorio la rejilla tiene 5 columnas:
 * ningún cuadro comparte color con su vecino de fila ni con el de columna.
 */

export type TonoServicio = "naranja" | "azul" | "blanco";

export const COLUMNAS_ESCRITORIO = 5;

export const TONOS_SERVICIOS: readonly TonoServicio[] = [
  "naranja", "azul", "blanco", "azul", "naranja",
  "blanco", "naranja", "azul", "blanco", "azul",
];

/** true si ningún tono se repite junto a su vecino de fila o de columna */
export function sinVecinosIguales(tonos: readonly string[], columnas: number): boolean {
  return tonos.every((tono, indice) => {
    const derecha = (indice + 1) % columnas !== 0 && tonos[indice + 1] === tono;
    const abajo = tonos[indice + columnas] === tono;
    return !derecha && !abajo;
  });
}
