import type { Inventario } from "./calculadora.ts";

/*
 * Guardado de la calculadora de espacio: único punto donde se lee y escribe
 * lo que la persona lleva (registro e inventario), para que si cierra el
 * modal o regresa después lo encuentre como lo dejó, aunque nunca lo envíe.
 * Hoy vive en el localStorage del navegador; cuando se conecte la base de
 * datos solo cambian cargarCalculadora y guardarCalculadora, que ya son
 * asíncronas para eso. Si el almacenamiento no está disponible (modo
 * privado, bloqueado), la calculadora funciona igual, sin recordar nada.
 */

export type EstadoCalculadora = {
  nombre: string;
  telefono: string;
  /** El registro se completó: se abre directo en el inventario */
  registrado: boolean;
  inventario: Inventario;
};

const CLAVE = "kanuby-calculadora";
const VERSION = 1;

export const estadoVacio: EstadoCalculadora = {
  nombre: "",
  telefono: "",
  registrado: false,
  inventario: {},
};

/**
 * Estado a partir de lo guardado. Lo que no se entienda (otra versión, JSON
 * roto, campos de otro tipo) se descarta, y del inventario solo quedan los
 * objetos que siguen en el catálogo, con cantidades enteras entre 1 y máximo.
 */
export function leerEstado(
  texto: string | null,
  idsValidos: ReadonlySet<string>,
  maximo: number,
): EstadoCalculadora | null {
  if (!texto) return null;
  let datos: unknown;
  try {
    datos = JSON.parse(texto);
  } catch {
    return null;
  }
  if (typeof datos !== "object" || datos === null) return null;
  const { version, nombre, telefono, registrado, inventario } = datos as Record<string, unknown>;
  if (version !== VERSION) return null;

  const limpio: Inventario = {};
  if (typeof inventario === "object" && inventario !== null) {
    for (const [id, cantidad] of Object.entries(inventario)) {
      if (idsValidos.has(id) && Number.isInteger(cantidad) && (cantidad as number) > 0) {
        limpio[id] = Math.min(cantidad as number, maximo);
      }
    }
  }

  return {
    nombre: typeof nombre === "string" ? nombre : "",
    telefono: typeof telefono === "string" ? telefono : "",
    registrado: registrado === true,
    inventario: limpio,
  };
}

export function escribirEstado(estado: EstadoCalculadora): string {
  return JSON.stringify({ version: VERSION, ...estado });
}

export async function cargarCalculadora(
  idsValidos: ReadonlySet<string>,
  maximo: number,
): Promise<EstadoCalculadora | null> {
  try {
    return leerEstado(window.localStorage.getItem(CLAVE), idsValidos, maximo);
  } catch {
    return null;
  }
}

export async function guardarCalculadora(estado: EstadoCalculadora): Promise<void> {
  try {
    window.localStorage.setItem(CLAVE, escribirEstado(estado));
  } catch {
    // Sin almacenamiento disponible no se recuerda; la calculadora sigue.
  }
}
