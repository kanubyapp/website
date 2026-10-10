import {
  CATEGORIAS,
  SUGERENCIAS_CAJAS,
  type CategoriaCatalogo,
  type ObjetoCatalogo,
  type SugerenciaCajas,
} from "./catalogo-calculadora.ts";

/*
 * Buscador de la calculadora: busca en todo el catálogo, por nombre y por
 * sinónimos, sin distinguir mayúsculas ni acentos.
 *
 * - Un objeto aparece si cada palabra de la búsqueda está dentro de su
 *   nombre o de uno de sus sinónimos ("mesa jard" encuentra "Mesa de
 *   jardín"). Cada palabra se prueba también sin la s o la es final, para
 *   que "sillas" o "colchones" encuentren "silla" y "colchón".
 * - Una sugerencia de cajas aparece si alguna palabra de la búsqueda es uno
 *   de sus términos ("mis libros" → "libro") o, desde 4 letras, el comienzo
 *   de uno ("libr" mientras se escribe).
 * - Sin objetos ni sugerencias, la calculadora ofrece calcularlo en cajas.
 */

export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function palabras(texto: string): string[] {
  const normal = normalizar(texto);
  return normal ? normal.split(" ") : [];
}

/* La palabra y sus formas sin plural: "colchones" → colchones, colchone, colchon */
function formas(palabra: string): string[] {
  const resultado = [palabra];
  if (palabra.length > 3 && palabra.endsWith("s")) resultado.push(palabra.slice(0, -1));
  if (palabra.length > 4 && palabra.endsWith("es")) resultado.push(palabra.slice(0, -2));
  return resultado;
}

export type ResultadoBusqueda = {
  objetos: ObjetoCatalogo[];
  sugerencias: SugerenciaCajas[];
};

export function buscar(
  consulta: string,
  {
    categorias = CATEGORIAS,
    sugerencias = SUGERENCIAS_CAJAS,
  }: { categorias?: readonly CategoriaCatalogo[]; sugerencias?: readonly SugerenciaCajas[] } = {},
): ResultadoBusqueda {
  const buscadas = palabras(consulta);
  if (buscadas.length === 0) return { objetos: [], sugerencias: [] };

  const objetos = categorias.flatMap((categoria) =>
    categoria.objetos.filter((objeto) => {
      const textos = [objeto.nombre, ...(objeto.sinonimos ?? [])].map(normalizar);
      return textos.some((texto) =>
        buscadas.every((palabra) => formas(palabra).some((forma) => texto.includes(forma))),
      );
    }),
  );

  const encontradas = sugerencias.filter((sugerencia) =>
    sugerencia.terminos.map(normalizar).some((termino) =>
      buscadas.some((palabra) =>
        formas(palabra).some(
          (forma) => forma === termino || (forma.length >= 4 && termino.startsWith(forma)),
        ),
      ),
    ),
  );

  return { objetos, sugerencias: encontradas };
}
