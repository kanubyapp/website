import { CATEGORIAS, MARGEN_ACOMODO, type CategoriaCatalogo, type ObjetoCatalogo } from "./catalogo-calculadora.ts";
import { MINIBODEGAS, volumenMinibodega, type Minibodega } from "./minibodegas.ts";
import { urlWhatsApp } from "./whatsapp.ts";

/*
 * Calculadora de espacio para minibodegas: suma el volumen de lo que la
 * persona quiere guardar, le aplica el margen de acomodo y recomienda dónde
 * cabe. Sin precios. Los volúmenes se suman en litros enteros para que los
 * decimales de los m³ no muevan un límite.
 *
 * La recomendación es una combinación de minibodegas: el menor número
 * posible (casi siempre una, la más chica donde cabe) y, entre las
 * combinaciones con ese número, la de menor capacidad total. Hasta
 * TOPE_BODEGAS; si ni así cabe, no hay recomendación y se invita a escribir
 * por WhatsApp. Los objetos se reparten llenando una bodega antes de pasar a
 * la siguiente (de la más grande a la más chica), cada uno entero en una
 * sola bodega; una combinación solo vale si así caben todos, de modo que
 * ninguna bodega pasa del 100%.
 */

/** Cantidad de cada objeto, por id del catálogo. Solo los que tienen 1 o más. */
export type Inventario = Record<string, number>;

export const CANTIDAD_MAXIMA = 99;

export type Linea = { objeto: ObjetoCatalogo; cantidad: number };

export const TOPE_BODEGAS = 4;

export type BodegaOcupada = {
  bodega: Minibodega;
  /** Los objetos que van en esta bodega */
  lineas: Linea[];
  /** Volumen con margen entre capacidad: 1 es el límite recomendado */
  ocupacion: number;
};

export type Recomendacion = {
  /** false: no cabe ni en TOPE_BODEGAS de las más grandes; bodegas son esas, llenas */
  cabe: boolean;
  /** De la más grande a la más chica */
  bodegas: BodegaOcupada[];
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

type Unidad = { objeto: ObjetoCatalogo; litros: number };

const conMargen = (litrosObjetos: number, margen: number) => Math.round(litrosObjetos * (1 + margen));

/**
 * Combinaciones de 1 a tope bodegas (con repetición), de la más grande a la
 * más chica dentro de cada una, ordenadas por número de bodegas y luego por
 * capacidad total.
 */
export function combinaciones(
  bodegas: readonly Minibodega[] = MINIBODEGAS,
  tope = TOPE_BODEGAS,
): Minibodega[][] {
  const deMayorAMenor = [...bodegas].reverse();
  const resultado: Minibodega[][] = [];
  const armar = (desde: number, actual: Minibodega[]) => {
    if (actual.length > 0) resultado.push(actual);
    if (actual.length === tope) return;
    for (let indice = desde; indice < deMayorAMenor.length; indice++) {
      armar(indice, [...actual, deMayorAMenor[indice]]);
    }
  };
  armar(0, []);
  const capacidad = (combinacion: Minibodega[]) =>
    combinacion.reduce((suma, bodega) => suma + litros(volumenMinibodega(bodega)), 0);
  // sort es estable: a igual capacidad, primero la que tiene bodegas más grandes
  return resultado.sort((a, b) => a.length - b.length || capacidad(a) - capacidad(b));
}

/** Cada objeto en la primera bodega donde todavía cabe, de lo más grande a lo más chico */
function repartir(unidades: readonly Unidad[], combinacion: readonly Minibodega[], margen: number) {
  const capacidades = combinacion.map((bodega) => litros(volumenMinibodega(bodega)));
  const usados = combinacion.map(() => 0);
  const asignadas: Unidad[][] = combinacion.map(() => []);
  let sobran = false;
  for (const unidad of unidades) {
    const indice = capacidades.findIndex(
      (capacidad, numero) => conMargen(usados[numero] + unidad.litros, margen) <= capacidad,
    );
    if (indice === -1) {
      sobran = true;
      continue;
    }
    usados[indice] += unidad.litros;
    asignadas[indice].push(unidad);
  }
  const bodegas = combinacion.map((bodega, numero) => ({
    bodega,
    lineas: lineasDeUnidades(asignadas[numero]),
    ocupacion: conMargen(usados[numero], margen) / capacidades[numero],
  }));
  return { bodegas, sobran };
}

/* Las unidades de nuevo como líneas, en el orden en que llegaron los objetos */
function lineasDeUnidades(unidades: readonly Unidad[]): Linea[] {
  const lineas = new Map<string, Linea>();
  for (const { objeto } of unidades) {
    const linea = lineas.get(objeto.id);
    if (linea) linea.cantidad++;
    else lineas.set(objeto.id, { objeto, cantidad: 1 });
  }
  return [...lineas.values()];
}

export function recomendar(
  lineas: readonly Linea[],
  {
    bodegas = MINIBODEGAS,
    margen = MARGEN_ACOMODO,
    tope = TOPE_BODEGAS,
  }: { bodegas?: readonly Minibodega[]; margen?: number; tope?: number } = {},
): Recomendacion {
  // De lo más grande a lo más chico; sort es estable: a igual volumen, el orden del catálogo
  const unidades = lineas
    .flatMap(({ objeto, cantidad }) =>
      Array.from({ length: cantidad }, () => ({ objeto, litros: litros(objeto.volumen) })),
    )
    .sort((a, b) => b.litros - a.litros);
  const requerido = conMargen(
    unidades.reduce((suma, unidad) => suma + unidad.litros, 0),
    margen,
  );

  const opciones = combinaciones(bodegas, tope);
  for (const combinacion of opciones) {
    const capacidad = combinacion.reduce((suma, bodega) => suma + litros(volumenMinibodega(bodega)), 0);
    if (requerido > capacidad) continue;
    const reparto = repartir(unidades, combinacion, margen);
    if (!reparto.sobran) return { cabe: true, bodegas: reparto.bodegas };
  }
  const grandes = Array.from({ length: tope }, () => bodegas[bodegas.length - 1]);
  return { cabe: false, bodegas: repartir(unidades, grandes, margen).bodegas };
}

const PLURALES: Record<Minibodega["nombre"], string> = {
  Chica: "Chicas",
  Mediana: "Medianas",
  Grande: "Grandes",
};

/* Cuántas de cada tamaño, de la más grande a la más chica */
function conteo(recomendacion: Recomendacion) {
  const cuentas = new Map<Minibodega, number>();
  for (const { bodega } of recomendacion.bodegas) cuentas.set(bodega, (cuentas.get(bodega) ?? 0) + 1);
  return [...cuentas].map(([bodega, cantidad]) => ({ bodega, cantidad }));
}

const nombreEn = (bodega: Minibodega, cantidad: number) =>
  cantidad === 1 ? bodega.nombre : PLURALES[bodega.nombre];

/** "a", "a y b", "a, b y c" */
export const enLista = (partes: readonly string[]) =>
  partes.length === 1 ? partes[0] : `${partes.slice(0, -1).join(", ")} y ${partes[partes.length - 1]}`;

/**
 * La combinación en lenguaje claro: "Minibodega Grande, 14 m²" si es una,
 * "2 minibodegas Grandes de 14 m²" si son varias del mismo tamaño y
 * "1 Grande y 1 Mediana" si son de tamaños distintos.
 */
export function textoCombinacion(recomendacion: Recomendacion): string {
  const grupos = conteo(recomendacion);
  if (recomendacion.bodegas.length === 1) {
    const { bodega } = recomendacion.bodegas[0];
    return `Minibodega ${bodega.nombre}, ${bodega.tamano}`;
  }
  if (grupos.length === 1) {
    const { bodega, cantidad } = grupos[0];
    return `${cantidad} minibodegas ${PLURALES[bodega.nombre]} de ${bodega.tamano}`;
  }
  return enLista(grupos.map(({ bodega, cantidad }) => `${cantidad} ${nombreEn(bodega, cantidad)}`));
}

/* Para el mensaje: "una minibodega de 14 m²", "2 minibodegas Grandes de 14 m²" o "1 minibodega Grande de 14 m² y 1 Mediana de 7 m²" */
function combinacionEnMensaje(recomendacion: Recomendacion): string {
  const grupos = conteo(recomendacion);
  if (recomendacion.bodegas.length === 1) return `una minibodega de ${grupos[0].bodega.tamano}`;
  const partes = grupos.map(({ bodega, cantidad }, indice) => {
    const sustantivo = indice > 0 ? "" : cantidad === 1 ? "minibodega " : "minibodegas ";
    return `${cantidad} ${sustantivo}${nombreEn(bodega, cantidad)} de ${bodega.tamano}`;
  });
  return enLista(partes);
}

/** Lo que lleva el evento calculadora_solicitud: "14 m²", "14 m² + 7 m²" o "excede" */
export function tamanoSolicitado(recomendacion: Recomendacion): string {
  if (!recomendacion.cabe) return "excede";
  return recomendacion.bodegas.map(({ bodega }) => bodega.tamano).join(" + ");
}

export function mensajeCalculadora(
  nombre: string,
  recomendacion: Recomendacion,
  lineas: readonly Linea[],
): string {
  const resultado = recomendacion.cabe
    ? `me recomendó ${combinacionEnMensaje(recomendacion)}.`
    : `lo que quiero guardar no cabe ni en ${combinacionEnMensaje(recomendacion)}, ¿me ayudan a armar un plan a mi medida?`;
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
