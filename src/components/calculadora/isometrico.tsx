"use client";

import { Fragment, useMemo, useState, useSyncExternalStore } from "react";
import {
  LIMITE_BLOQUES,
  acomodar,
  ordenDeDibujo,
  piezasDeLineas,
  proyectar,
  puntos,
  type Bloque,
} from "@/lib/acomodo-bloques";
import type { BodegaOcupada, Linea } from "@/lib/calculadora";
import { MINIBODEGAS, type Minibodega } from "@/lib/minibodegas";
import styles from "./calculadora.module.css";

/*
 * Minibodegas en isométrico que se llenan con un bloque por objeto agregado
 * (el acomodo está en lib/acomodo-bloques.ts). Con varias bodegas, los
 * bloques ya llegan repartidos: cada una dibuja los suyos. Al agregar, el bloque
 * cae a su lugar; al quitar, sale; al cambiar de acomodo o de minibodega,
 * los bloques se desplazan a su nuevo lugar. Con "reducir movimiento" todo
 * es instantáneo: el CSS no anima y los bloques que salen no se conservan.
 * Los objetos distintos alternan tres tonos (todas las unidades de un objeto
 * van en el mismo). Las aristas del frente se leen como vidrio: firmes
 * detrás de los bloques y tenues por delante, sin cortarlos.
 */

const TONOS = [styles.tonoNaranja, styles.tonoAzul, styles.tonoGris];

const MARGEN = 0.2;
const ANCHO_MAXIMO = Math.max(...MINIBODEGAS.map((bodega) => bodega.ancho));
const LARGO_MAXIMO = Math.max(...MINIBODEGAS.map((bodega) => bodega.largo));
const ALTO_MAXIMO = Math.max(...MINIBODEGAS.map((bodega) => bodega.alto));
const [, FONDO_MAXIMO] = proyectar(ANCHO_MAXIMO, LARGO_MAXIMO, 0);
const ANCHO_VISTA = proyectar(ANCHO_MAXIMO, 0, 0)[0] - proyectar(0, LARGO_MAXIMO, 0)[0] + 2 * MARGEN;
const ALTO_VISTA = FONDO_MAXIMO + ALTO_MAXIMO + 2 * MARGEN;
const CAJA_VISTA = [-ANCHO_VISTA / 2, -ALTO_VISTA + MARGEN, ANCHO_VISTA, ALTO_VISTA]
  .map((valor) => valor.toFixed(3))
  .join(" ");

const consulta = "(prefers-reduced-motion: reduce)";

function useMovimientoReducido() {
  return useSyncExternalStore(
    (avisar) => {
      const medio = window.matchMedia(consulta);
      medio.addEventListener("change", avisar);
      return () => medio.removeEventListener("change", avisar);
    },
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}

function Prisma({ bloque }: { bloque: Bloque }) {
  const { ancho: a, largo: l, alto: h } = bloque;
  return (
    <>
      <polygon className={styles.caraLargo} points={puntos([0, l, 0], [a, l, 0], [a, l, h], [0, l, h])} />
      <polygon className={styles.caraAncho} points={puntos([a, 0, 0], [a, l, 0], [a, l, h], [a, 0, h])} />
      <polygon className={styles.caraArriba} points={puntos([0, 0, h], [a, 0, h], [a, l, h], [0, l, h])} />
    </>
  );
}

/* Aristas del frente de la bodega: el canto superior y las verticales del frente */
function Frente({ A, L, H, className }: { A: number; L: number; H: number; className: string }) {
  return (
    <>
      <polyline className={className} points={puntos([A, 0, 0], [A, 0, H], [A, L, H], [0, L, H], [0, L, 0])} />
      <polyline className={className} points={puntos([A, L, 0], [A, L, H])} />
    </>
  );
}

/*
 * Una bodega con sus bloques, ya colocada en la vista (desplazamiento). Cada
 * una lleva su propio registro de bloques que salen.
 */
function BodegaDibujada({
  bodega,
  lineas,
  limite,
  indiceDe,
  desplazamiento,
}: {
  bodega: Minibodega;
  lineas: readonly Linea[];
  limite: number;
  indiceDe: (objetoId: string) => number;
  desplazamiento: string;
}) {
  const reducido = useMovimientoReducido();
  const bloques = useMemo(
    () => acomodar(piezasDeLineas(lineas, limite, indiceDe), bodega),
    [lineas, limite, indiceDe, bodega],
  );

  // Los bloques que dejan de estar se conservan mientras dura su salida.
  const [previos, setPrevios] = useState(bloques);
  const [salientes, setSalientes] = useState<Bloque[]>([]);
  if (previos !== bloques) {
    setPrevios(bloques);
    const claves = new Set(bloques.map((bloque) => bloque.clave));
    const idos = reducido ? [] : previos.filter((bloque) => !claves.has(bloque.clave));
    setSalientes((actuales) => [...actuales.filter((bloque) => !claves.has(bloque.clave)), ...idos]);
  }

  const claveSaliente = new Set(salientes.map((bloque) => bloque.clave));
  const dibujo = ordenDeDibujo([...bloques, ...salientes]);
  const { ancho: A, largo: L, alto: H } = bodega;

  return (
    <g className={styles.bodega} style={{ transform: desplazamiento }}>
      <polygon className={styles.piso} points={puntos([0, 0, 0], [A, 0, 0], [A, L, 0], [0, L, 0])} />
      <polygon className={styles.pared} points={puntos([0, 0, 0], [0, L, 0], [0, L, H], [0, 0, H])} />
      <polygon className={styles.pared} points={puntos([0, 0, 0], [A, 0, 0], [A, 0, H], [0, 0, H])} />
      <Frente A={A} L={L} H={H} className={styles.arista} />

      {dibujo.map((bloque) => {
        const [x, y] = proyectar(bloque.x, bloque.y, bloque.z);
        const saliendo = claveSaliente.has(bloque.clave);
        return (
          <g
            key={saliendo ? `${bloque.clave}-saliendo` : bloque.clave}
            className={`${styles.bloque} ${TONOS[bloque.indiceObjeto % TONOS.length]}`}
            style={{ transform: `translate(${x.toFixed(3)}px, ${y.toFixed(3)}px)` }}
          >
            <g
              className={saliendo ? styles.saliendo : styles.entrando}
              onAnimationEnd={
                saliendo
                  ? () =>
                      setSalientes((actuales) =>
                        actuales.filter((otro) => otro.clave !== bloque.clave),
                      )
                  : undefined
              }
            >
              <Prisma bloque={bloque} />
            </g>
          </g>
        );
      })}

      {/* De nuevo por delante, tenues: el vidrio sobre los bloques */}
      <Frente A={A} L={L} H={H} className={styles.aristaVidrio} />
    </g>
  );
}

const COSENO = Math.cos(Math.PI / 6);
const ancho = ({ ancho: A, largo: L }: Minibodega) => (A + L) * COSENO;
const alto = ({ ancho: A, largo: L, alto: H }: Minibodega) => H + (A + L) / 2;
/* Desplazamiento que deja la bodega centrada en x y con su punto más bajo en y */
const colocar = ({ ancho: A, largo: L }: Minibodega, x: number, y: number) =>
  `translate(${(x + ((L - A) / 2) * COSENO).toFixed(3)}px, ${(y - (A + L) / 2).toFixed(3)}px)`;

/* Varias bodegas: en filas de dos, cada una con su etiqueta debajo */
const SEPARACION = 0.6;
const ALTO_ETIQUETA = 0.9;
/* El texto de la etiqueta se escribe en px de pantalla y se reduce a metros del dibujo */
const ESCALA_ETIQUETA = 0.025;

function disposicion(bodegas: readonly Minibodega[]) {
  if (bodegas.length === 1) {
    return { caja: CAJA_VISTA, lugares: [{ desplazamiento: colocar(bodegas[0], 0, 0), etiqueta: null }] };
  }
  const columnas = 2;
  const filas = Math.ceil(bodegas.length / columnas);
  const celda = Math.max(...bodegas.map(ancho));
  const altoCelda = Math.max(...bodegas.map(alto)) + ALTO_ETIQUETA;
  const lugares = bodegas.map((bodega, indice) => {
    const fila = Math.floor(indice / columnas);
    const enFila = Math.min(columnas, bodegas.length - fila * columnas);
    // Una fila incompleta queda centrada
    const inicio = ((columnas - enFila) * (celda + SEPARACION)) / 2;
    const x = inicio + (indice % columnas) * (celda + SEPARACION) + celda / 2;
    const base = fila * (altoCelda + SEPARACION) + altoCelda - ALTO_ETIQUETA;
    return { desplazamiento: colocar(bodega, x, base), etiqueta: { x, y: base + ALTO_ETIQUETA * 0.75 } };
  });
  const caja = [
    -MARGEN,
    -MARGEN,
    columnas * celda + (columnas - 1) * SEPARACION + 2 * MARGEN,
    filas * altoCelda + (filas - 1) * SEPARACION + 2 * MARGEN,
  ]
    .map((valor) => valor.toFixed(3))
    .join(" ");
  return { caja, lugares };
}

/**
 * Con una sola bodega, todas a la misma escala para que el cambio de tamaño
 * se note y sin etiqueta. Con varias, las de la combinación juntas a la
 * misma escala, cada una con su tamaño y su ocupación debajo.
 */
export function Isometrico({
  bodegas,
  lineas,
  etiqueta,
}: {
  bodegas: readonly BodegaOcupada[];
  /** Todo el inventario: da el tono de cada objeto */
  lineas: readonly Linea[];
  etiqueta: string;
}) {
  const indiceDe = useMemo(() => {
    const indices = new Map(lineas.map(({ objeto }, indice) => [objeto.id, indice]));
    return (objetoId: string) => indices.get(objetoId) ?? 0;
  }, [lineas]);
  const { caja, lugares } = disposicion(bodegas.map(({ bodega }) => bodega));
  const limite = Math.floor(LIMITE_BLOQUES / bodegas.length);

  return (
    <svg className={styles.isometrico} viewBox={caja} role="img" aria-label={etiqueta}>
      {bodegas.map(({ bodega, lineas: suyas, ocupacion }, indice) => {
        const lugar = lugares[indice];
        return (
          <Fragment key={indice}>
            <BodegaDibujada
              bodega={bodega}
              lineas={suyas}
              limite={limite}
              indiceDe={indiceDe}
              desplazamiento={lugar.desplazamiento}
            />
            {lugar.etiqueta && (
              <text
                className={styles.etiquetaBodega}
                transform={`translate(${lugar.etiqueta.x.toFixed(3)} ${lugar.etiqueta.y.toFixed(3)}) scale(${ESCALA_ETIQUETA})`}
              >
                {`${bodega.nombre} · ${bodega.tamano} · ${Math.round(ocupacion * 100)}%`}
              </text>
            )}
          </Fragment>
        );
      })}
    </svg>
  );
}
