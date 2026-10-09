import { CATEGORIAS, MARGEN_ACOMODO, type CategoriaCatalogo, type ObjetoCatalogo } from "./catalogo-calculadora.ts";
import { MINIBODEGAS, volumenMinibodega, type Minibodega } from "./minibodegas.ts";
import { urlWhatsApp, type TamanoMinibodega } from "./whatsapp.ts";

/*
 * Calculadora de espacio para minibodegas: suma el volumen de lo que la
 * persona quiere guardar, le aplica el margen de acomodo y recomienda la
 * minibodega más chica donde cabe. Si no cabe ni en la más grande, lo dice.
 * Sin precios. Los volúmenes se suman en litros enteros para que los
 * decimales de los m³ no muevan un límite.
 */

/** Cantidad de cada objeto, por id del catálogo. Solo los que tienen 1 o más. */
export type Inventario = Record<string, number>;

export const CANTIDAD_MAXIMA = 99;

export type Linea = { objeto: ObjetoCatalogo; cantidad: number };

export type Recomendacion = {
  /** false: no cabe ni en la más grande, y bodega es la más grande */
  cabe: boolean;
  bodega: Minibodega;
  /** Volumen con margen entre capacidad: 1 es el límite recomendado */
  ocupacion: number;
};

const litros = (metrosCubicos: number) => Math.round(metrosCubicos * 1000);

export function objetosPorId(categorias: readonly CategoriaCatalogo[] = CATEGORIAS) {
  return new Map(
    categorias.flatMap((categoria) => categoria.objetos.map((objeto) => [objeto.id, objeto] as const)),
  );
}

/** Suma o resta a la cantidad de un objeto, entre 0 y CANTIDAD_MAXIMA. En 0 sale del inventario. */
export function cambiarCantidad(inventario: Inventario, id: string, cambio: number): Inventario {
  const cantidad = Math.min(Math.max((inventario[id] ?? 0) + cambio, 0), CANTIDAD_MAXIMA);
  const siguiente = { ...inventario };
  if (cantidad === 0) delete siguiente[id];
  else siguiente[id] = cantidad;
  return siguiente;
}

/** Objetos del inventario con su cantidad, en el orden del catálogo */
export function lineasInventario(
  inventario: Inventario,
  categorias: readonly CategoriaCatalogo[] = CATEGORIAS,
): Linea[] {
  return categorias.flatMap((categoria) =>
    categoria.objetos
      .filter((objeto) => (inventario[objeto.id] ?? 0) > 0)
      .map((objeto) => ({ objeto, cantidad: inventario[objeto.id] })),
  );
}

/** Volumen total de los objetos en m³, sin margen */
export function volumenInventario(lineas: readonly Linea[]): number {
  return lineas.reduce((suma, { objeto, cantidad }) => suma + litros(objeto.volumen) * cantidad, 0) / 1000;
}

export function recomendar(
  volumen: number,
  {
    bodegas = MINIBODEGAS,
    margen = MARGEN_ACOMODO,
  }: { bodegas?: readonly Minibodega[]; margen?: number } = {},
): Recomendacion {
  const requerido = litros(volumen * (1 + margen));
  for (const bodega of bodegas) {
    const capacidad = litros(volumenMinibodega(bodega));
    if (requerido <= capacidad) return { cabe: true, bodega, ocupacion: requerido / capacidad };
  }
  const grande = bodegas[bodegas.length - 1];
  return { cabe: false, bodega: grande, ocupacion: requerido / litros(volumenMinibodega(grande)) };
}

/** Tamaño que lleva el evento calculadora_solicitud */
export function tamanoSolicitado(recomendacion: Recomendacion): TamanoMinibodega | "excede" {
  return recomendacion.cabe ? recomendacion.bodega.tamano : "excede";
}

export function mensajeCalculadora(
  nombre: string,
  recomendacion: Recomendacion,
  lineas: readonly Linea[],
): string {
  const resultado = recomendacion.cabe
    ? `me recomendó una minibodega de ${recomendacion.bodega.tamano}.`
    : `lo que quiero guardar no cabe en una minibodega de ${recomendacion.bodega.tamano}, ¿me ayudan a encontrar una opción?`;
  const lista = lineas.map(({ objeto, cantidad }) => `- ${objeto.nombre}: ${cantidad}`).join("\n");
  return `Hola Kanuby, soy ${nombre.trim()}. Usé la calculadora de espacio y ${resultado} Esto es lo que quiero guardar:\n${lista}`;
}

export function urlCalculadora(
  nombre: string,
  recomendacion: Recomendacion,
  lineas: readonly Linea[],
): string {
  return urlWhatsApp(mensajeCalculadora(nombre, recomendacion, lineas));
}
