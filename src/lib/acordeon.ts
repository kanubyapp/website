/*
 * Qué preguntas quedan abiertas en el acordeón de preguntas frecuentes
 * (components/faq.tsx) al pulsar una. Pulsar una abierta la cierra.
 *
 * - "grupo": una sola abierta a la vez; abrir una cierra la anterior.
 * - "independiente": cada pregunta se abre y se cierra por su cuenta.
 */

export type ModoAcordeon = "grupo" | "independiente";

export function alPulsar(abiertas: number[], indice: number, modo: ModoAcordeon): number[] {
  if (abiertas.includes(indice)) return abiertas.filter((abierta) => abierta !== indice);
  return modo === "grupo" ? [indice] : [...abiertas, indice];
}
