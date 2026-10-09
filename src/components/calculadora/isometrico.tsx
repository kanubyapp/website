"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  acomodar,
  ordenDeDibujo,
  piezasDeLineas,
  proyectar,
  puntos,
  type Bloque,
} from "@/lib/acomodo-bloques";
import type { Linea } from "@/lib/calculadora";
import { MINIBODEGAS, type Minibodega } from "@/lib/minibodegas";
import styles from "./calculadora.module.css";

/*
 * Minibodega en isométrico que se llena con un bloque por objeto agregado
 * (el acomodo está en lib/acomodo-bloques.ts). Todas las minibodegas a la
 * misma escala, para que el cambio de tamaño se note. Al agregar, el bloque
 * cae a su lugar; al quitar, sale; al cambiar de acomodo o de minibodega,
 * los bloques se desplazan a su nuevo lugar. Con "reducir movimiento" todo
 * es instantáneo: el CSS no anima y los bloques que salen no se conservan.
 */

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

export function Isometrico({
  bodega,
  lineas,
  etiqueta,
}: {
  bodega: Minibodega;
  lineas: readonly Linea[];
  etiqueta: string;
}) {
  const reducido = useMovimientoReducido();
  const bloques = useMemo(() => acomodar(piezasDeLineas(lineas), bodega), [lineas, bodega]);

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
  // Centrada a lo ancho y apoyada abajo de la vista
  const [, fondo] = proyectar(A, L, 0);
  const desplazamiento = `translate(${(((L - A) / 2) * Math.cos(Math.PI / 6)).toFixed(3)}px, ${(-fondo).toFixed(3)}px)`;

  return (
    <svg className={styles.isometrico} viewBox={CAJA_VISTA} role="img" aria-label={etiqueta}>
      <g className={styles.bodega} style={{ transform: desplazamiento }}>
        <polygon className={styles.piso} points={puntos([0, 0, 0], [A, 0, 0], [A, L, 0], [0, L, 0])} />
        <polygon className={styles.pared} points={puntos([0, 0, 0], [0, L, 0], [0, L, H], [0, 0, H])} />
        <polygon className={styles.pared} points={puntos([0, 0, 0], [A, 0, 0], [A, 0, H], [0, 0, H])} />

        {dibujo.map((bloque) => {
          const [x, y] = proyectar(bloque.x, bloque.y, bloque.z);
          const saliendo = claveSaliente.has(bloque.clave);
          return (
            <g
              key={saliendo ? `${bloque.clave}-saliendo` : bloque.clave}
              className={styles.bloque}
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

        {/* Las aristas del frente, sin tapar lo que hay dentro */}
        <polyline className={styles.arista} points={puntos([A, 0, 0], [A, 0, H], [A, L, H], [0, L, H], [0, L, 0])} />
        <polyline className={styles.arista} points={puntos([A, L, 0], [A, L, H])} />
      </g>
    </svg>
  );
}
