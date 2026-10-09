import type { TamanoMinibodega } from "./whatsapp.ts";

/*
 * Medidas de las minibodegas, en metros, tal como las publican las tarjetas
 * de tamaño de /minibodegas-monterrey/. Única fuente: la página las muestra y
 * la calculadora de espacio calcula con ellas. Van de la más chica a la más
 * grande. Pendiente con Kanuby: confirmar si son medidas interiores.
 */

export type Minibodega = {
  nombre: "Chica" | "Mediana" | "Grande";
  /** Superficie en m², como la escribe la página */
  superficie: "3.5" | "7" | "14";
  tamano: TamanoMinibodega;
  alto: number;
  ancho: number;
  largo: number;
};

export const MINIBODEGAS: readonly Minibodega[] = [
  { nombre: "Chica", superficie: "3.5", tamano: "3.5 m²", alto: 2.45, ancho: 2.35, largo: 1.48 },
  { nombre: "Mediana", superficie: "7", tamano: "7 m²", alto: 2.45, ancho: 2.35, largo: 2.95 },
  { nombre: "Grande", superficie: "14", tamano: "14 m²", alto: 2.45, ancho: 2.35, largo: 6 },
];

/** Volumen interior en m³ */
export function volumenMinibodega({ alto, ancho, largo }: Minibodega): number {
  return alto * ancho * largo;
}

/** Medida como la escribe la página: "2.45m", "6.00m" */
export function formatoMedida(metros: number): string {
  return `${metros.toFixed(2)}m`;
}
