/*
 * Globito "Contáctanos" junto al botón flotante de WhatsApp. Sale solo unos
 * segundos después de llegar a la página, se queda un rato y se retira solo;
 * también se cierra con su ✕. Una vez que salió no vuelve en esa visita (la
 * sesión de la pestaña: sessionStorage), aunque la persona cambie de página.
 * Si el popup del botón se abre, el globito ya no hace falta: se termina.
 *
 * Solo sale si al cumplirse el tiempo la persona sigue arriba de la página:
 * ahí no tapa nada con lo que se pueda interactuar. Si ya bajó, se da por
 * perdido para la visita, como si lo hubieran cerrado. Una vez que salió,
 * desplazar la página no lo retira.
 */

/** Desde que se llega a la página hasta que aparece */
export const GLOBITO_APARECE_MS = 4000;
/** Lo que se queda visible antes de retirarse solo */
export const GLOBITO_VISIBLE_MS = 8000;

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
  /** Se cumplió GLOBITO_VISIBLE_MS con el globito visible */
  | "se-retira"
  /** La persona lo cerró con su ✕ */
  | "cerrar"
  /** Se abrió el popup del botón (desde el botón o desde el globito) */
  | "popup";

/**
 * La fase que sigue. "aparece" solo muestra el globito si no salió antes en
 * la visita y la persona sigue arriba de la página; terminado es final.
 */
export function siguienteFase(
  fase: FaseGlobito,
  evento: EventoGlobito,
  yaSalio = false,
  arriba = true,
): FaseGlobito {
  if (fase === "terminado") return fase;
  switch (evento) {
    case "aparece":
      return fase === "esperando" && !yaSalio && arriba ? "visible" : "terminado";
    case "se-retira":
      return fase === "visible" ? "terminado" : fase;
    case "cerrar":
    case "popup":
      return "terminado";
  }
}

/* Registro de la visita */

const CLAVE = "kanuby-globito-flotante";

type Almacen = Pick<Storage, "getItem" | "setItem">;

/*
 * El almacén llega como función: en algunos navegadores con el
 * almacenamiento bloqueado, solo leer window.sessionStorage ya lanza.
 */
const sesion = () => window.sessionStorage;

/** Si el globito ya salió en esta visita. Sin almacenamiento: como si no. */
export function globitoYaSalio(almacen: () => Almacen = sesion): boolean {
  try {
    return almacen().getItem(CLAVE) !== null;
  } catch {
    return false;
  }
}

/** Anota que el globito salió. Sin almacenamiento no se recuerda. */
export function anotarGlobito(almacen: () => Almacen = sesion): void {
  try {
    almacen().setItem(CLAVE, "1");
  } catch {
    // Modo privado o bloqueado: el globito sigue funcionando en la página.
  }
}
