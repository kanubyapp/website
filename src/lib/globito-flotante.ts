/*
 * Globito "Contáctanos" junto al botón flotante de WhatsApp. Sale solo unos
 * segundos después de llegar a la página y se queda mientras la persona siga
 * arriba de ella, donde no tapa nada con lo que se pueda interactuar. Lo
 * quitan su ✕, abrir el popup o empezar a bajar por la página: al navegar
 * taparía botones. Sale en cada carga de página, sin recordar nada de cargas
 * anteriores, y en esa carga, una vez que se fue, ya no vuelve.
 *
 * Si la persona baja antes de que se cumpla el tiempo, tampoco sale.
 */

/** Desde que se llega a la página hasta que aparece */
export const GLOBITO_APARECE_MS = 2000;

/**
 * Arriba de la página: sin desplazamiento. Menos de 1px y no 0 exacto,
 * porque el desplazamiento suave puede dejar fracciones y el rebote de iOS
 * valores negativos.
 */
export function estaArriba(desplazamiento: number): boolean {
  return desplazamiento < 1;
}

export type FaseGlobito = "esperando" | "visible" | "terminado";

export type EventoGlobito =
  /** Se cumplió GLOBITO_APARECE_MS */
  | "aparece"
  /** La persona lo cerró con su ✕ */
  | "cerrar"
  /** Se abrió el popup del botón (desde el botón o desde el globito) */
  | "popup"
  /** La persona dejó lo alto de la página (estaArriba ya no se cumple) */
  | "baja";

/**
 * La fase que sigue. "aparece" solo muestra el globito si la persona sigue
 * arriba de la página; terminado es final.
 */
export function siguienteFase(
  fase: FaseGlobito,
  evento: EventoGlobito,
  arriba = true,
): FaseGlobito {
  if (fase === "terminado") return fase;
  switch (evento) {
    case "aparece":
      if (fase !== "esperando") return fase;
      return arriba ? "visible" : "terminado";
    case "cerrar":
    case "popup":
    case "baja":
      return "terminado";
  }
}

