/*
 * Cuándo se compacta el header sticky: al bajar más de UMBRAL_COMPACTAR px se
 * compacta y solo vuelve a su tamaño al regresar por debajo de
 * UMBRAL_EXPANDIR. La diferencia entre los dos evita que parpadee al
 * detenerse cerca del umbral.
 */

export const UMBRAL_COMPACTAR = 48;
export const UMBRAL_EXPANDIR = 8;

export function compactoSegunScroll(scrollY: number, compactoActual: boolean): boolean {
  if (compactoActual) return scrollY > UMBRAL_EXPANDIR;
  return scrollY > UMBRAL_COMPACTAR;
}
