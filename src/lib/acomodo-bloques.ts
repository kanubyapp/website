import { MARGEN_ACOMODO } from "./catalogo-calculadora.ts";
import type { Linea } from "./calculadora.ts";
import type { Minibodega } from "./minibodegas.ts";

/*
 * Acomodo de la vista isométrica de la calculadora: cada objeto agregado es
 * un bloque dentro de la minibodega, proporcional al espacio que ocupa con
 * el margen de acomodo (así la bodega se ve llena justo al 100% de
 * ocupación). Bloques simples, sin ilustrar cada mueble.
 *
 * - El piso se divide en una rejilla de celdas de ~CELDA m. Cada bloque toma
 *   un rectángulo de celdas cercano a un cubo de su volumen, y su alto es lo
 *   que le falta para completar ese volumen.
 * - Van de mayor a menor (lo grande abajo) y cada uno se pone donde el piso
 *   o la pila está más baja, empezando por el fondo: primero se cubre el
 *   piso y después se apila hacia arriba.
 * - Los huecos que deja el acomodo pueden subir la pila más que el techo
 *   aunque el cálculo diga que cabe (o cuando no cabe). En ese caso los altos
 *   se comprimen para que la pila llegue justo al techo.
 * - Con más de LIMITE_BLOQUES unidades, los objetos iguales se juntan en un
 *   solo bloque, empezando por los que tienen más unidades, hasta quedar en
 *   el límite. El catálogo tiene menos objetos distintos que el límite.
 *
 * Coordenadas en metros: x a lo ancho, y a lo largo (las dos desde el fondo,
 * de donde se mira hacia el frente) y z hacia arriba.
 */

export const LIMITE_BLOQUES = 60;
export const CELDA = 0.5;

export type Pieza = {
  /** Estable entre renders: la vista anima por ella */
  clave: string;
  objetoId: string;
  /** Posición del objeto entre los distintos del inventario: la vista alterna tonos por ella */
  indiceObjeto: number;
  /** Unidades que representa: más de 1 cuando se agruparon */
  cantidad: number;
  /** m³ sin margen */
  volumen: number;
};

export type Bloque = Pieza & {
  x: number;
  y: number;
  z: number;
  ancho: number;
  largo: number;
  alto: number;
};

/**
 * indiceDe da la posición del objeto entre todos los del inventario (con
 * varias bodegas, cada una recibe solo sus líneas y el tono debe ser el
 * mismo en todas); sin él, la posición en estas líneas.
 */
export function piezasDeLineas(
  lineas: readonly Linea[],
  limite = LIMITE_BLOQUES,
  indiceDe?: (objetoId: string) => number,
): Pieza[] {
  let total = lineas.reduce((suma, { cantidad }) => suma + cantidad, 0);
  const agrupados = new Set<string>();
  for (const { objeto, cantidad } of [...lineas].sort((a, b) => b.cantidad - a.cantidad)) {
    if (total <= limite) break;
    if (cantidad < 2) continue;
    agrupados.add(objeto.id);
    total -= cantidad - 1;
  }

  return lineas.flatMap(({ objeto, cantidad }, indice) => {
    const indiceObjeto = indiceDe ? indiceDe(objeto.id) : indice;
    return agrupados.has(objeto.id)
      ? [
          {
            clave: `${objeto.id}-grupo`,
            objetoId: objeto.id,
            indiceObjeto,
            cantidad,
            volumen: objeto.volumen * cantidad,
          },
        ]
      : Array.from({ length: cantidad }, (_, numero) => ({
          clave: `${objeto.id}-${numero + 1}`,
          objetoId: objeto.id,
          indiceObjeto,
          cantidad: 1,
          volumen: objeto.volumen,
        }));
  });
}

const limitar = (valor: number, minimo: number, maximo: number) =>
  Math.min(Math.max(valor, minimo), maximo);

export function acomodar(
  piezas: readonly Pieza[],
  bodega: Minibodega,
  margen = MARGEN_ACOMODO,
): Bloque[] {
  const columnas = Math.max(1, Math.round(bodega.ancho / CELDA));
  const filas = Math.max(1, Math.round(bodega.largo / CELDA));
  const anchoCelda = bodega.ancho / columnas;
  const largoCelda = bodega.largo / filas;
  const alturas = new Array<number>(columnas * filas).fill(0);

  const bloques: Bloque[] = [];
  // sort es estable: a igual volumen, el orden del catálogo
  for (const pieza of [...piezas].sort((a, b) => b.volumen - a.volumen)) {
    const volumen = pieza.volumen * (1 + margen);
    const lado = Math.cbrt(volumen);
    const celdasAncho = limitar(Math.round(lado / anchoCelda), 1, columnas);
    const celdasLargo = limitar(Math.round(lado / largoCelda), 1, filas);

    let mejor = { columna: 0, fila: 0, base: Infinity };
    for (let fila = 0; fila + celdasLargo <= filas; fila++) {
      for (let columna = 0; columna + celdasAncho <= columnas; columna++) {
        let base = 0;
        for (let f = fila; f < fila + celdasLargo; f++) {
          for (let c = columna; c < columna + celdasAncho; c++) {
            base = Math.max(base, alturas[f * columnas + c]);
          }
        }
        if (base < mejor.base - 1e-9) mejor = { columna, fila, base };
      }
    }

    const ancho = celdasAncho * anchoCelda;
    const largo = celdasLargo * largoCelda;
    const alto = volumen / (ancho * largo);
    for (let f = mejor.fila; f < mejor.fila + celdasLargo; f++) {
      for (let c = mejor.columna; c < mejor.columna + celdasAncho; c++) {
        alturas[f * columnas + c] = mejor.base + alto;
      }
    }
    bloques.push({
      ...pieza,
      x: mejor.columna * anchoCelda,
      y: mejor.fila * largoCelda,
      z: mejor.base,
      ancho,
      largo,
      alto,
    });
  }

  const techo = Math.max(0, ...bloques.map((bloque) => bloque.z + bloque.alto));
  if (techo <= bodega.alto) return bloques;
  const factor = bodega.alto / techo;
  return bloques.map((bloque) => ({ ...bloque, z: bloque.z * factor, alto: bloque.alto * factor }));
}

/*
 * Orden de dibujo (de atrás hacia delante): un bloque va antes que otro si
 * queda del lado del fondo en algún eje (x, y o z). Entre bloques que no se
 * tocan siempre hay un eje así; si dos se excluyen mutuamente, no se cruzan
 * en pantalla y el orden entre ellos da igual.
 */
const detras = (a: Bloque, b: Bloque) =>
  a.x + a.ancho <= b.x + 1e-9 || a.y + a.largo <= b.y + 1e-9 || a.z + a.alto <= b.z + 1e-9;

export function ordenDeDibujo(bloques: readonly Bloque[]): Bloque[] {
  const pendientes = [...bloques];
  const orden: Bloque[] = [];
  while (pendientes.length > 0) {
    const indice = pendientes.findIndex((bloque) =>
      pendientes.every((otro) => otro === bloque || !detras(otro, bloque) || detras(bloque, otro)),
    );
    orden.push(...pendientes.splice(Math.max(indice, 0), 1));
  }
  return orden;
}

/* Proyección isométrica: x e y a 30° de la horizontal, z vertical */
const COSENO = Math.cos(Math.PI / 6);
const SENO = Math.sin(Math.PI / 6);

export function proyectar(x: number, y: number, z: number): [number, number] {
  return [(x - y) * COSENO, (x + y) * SENO - z];
}

export function puntos(...vertices: [number, number, number][]): string {
  return vertices
    .map((vertice) => proyectar(...vertice).map((valor) => valor.toFixed(3)).join(","))
    .join(" ");
}
