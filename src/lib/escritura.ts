/*
 * Texto que se escribe solo, letra por letra, para el botón "Cotiza Ahora"
 * del header de mudanzas: escribe una frase, la deja visible, la borra y
 * escribe la siguiente, en ciclo. Empieza con la primera frase completa (lo
 * que se ve sin animación). "cambios" cuenta cada cambio de frase: el botón lo
 * usa para girar el ícono.
 */

export const FRASES_COTIZAR = ["Whatsapp", "Cotiza ahora", "Respuesta rápida"] as const;

export type Escritura = {
  frase: number;
  letras: number;
  fase: "escribiendo" | "pausa" | "borrando";
  cambios: number;
};

export const ESPERA_MS = { escribiendo: 90, pausa: 2200, borrando: 45 } as const;

export function escrituraInicial(frases: readonly string[]): Escritura {
  return { frase: 0, letras: Array.from(frases[0]).length, fase: "pausa", cambios: 0 };
}

/** Cuánto se queda en el estado actual antes del siguiente paso. */
export function espera(estado: Escritura): number {
  return ESPERA_MS[estado.fase];
}

export function siguiente(estado: Escritura, frases: readonly string[]): Escritura {
  const largo = Array.from(frases[estado.frase]).length;
  switch (estado.fase) {
    case "escribiendo": {
      const letras = estado.letras + 1;
      return { ...estado, letras, fase: letras >= largo ? "pausa" : "escribiendo" };
    }
    case "pausa":
      return { ...estado, fase: "borrando" };
    case "borrando": {
      const letras = estado.letras - 1;
      if (letras > 0) return { ...estado, letras };
      return {
        frase: (estado.frase + 1) % frases.length,
        letras: 0,
        fase: "escribiendo",
        cambios: estado.cambios + 1,
      };
    }
  }
}

export function textoVisible(estado: Escritura, frases: readonly string[]): string {
  return Array.from(frases[estado.frase]).slice(0, estado.letras).join("");
}
