"use client";

import { useId, useState } from "react";
import { IconoChevronAbajo, IconoChevronDerecha } from "@/components/iconos";
import styles from "./page.module.css";

/*
 * Acordeón de preguntas frecuentes (raven-advanced-accordion de kanuby.com).
 * Como en el publicado, siempre hay una pregunta abierta (la segunda al cargar)
 * y la abierta no se cierra al pulsarla: abrir otra cierra la anterior.
 */

export type Pregunta = { pregunta: string; respuesta: string };

export function Faq({ preguntas }: { preguntas: Pregunta[] }) {
  const [abierta, setAbierta] = useState(1);
  const id = useId();

  return (
    <div className={styles.acordeon}>
      {preguntas.map((item, indice) => {
        const activa = indice === abierta;
        return (
          <div key={item.pregunta} className={styles.acordeonItem} data-activa={activa}>
            <h3 className={styles.acordeonEncabezado}>
              <button
                type="button"
                id={`${id}-boton-${indice}`}
                className={styles.acordeonBoton}
                aria-expanded={activa}
                aria-controls={`${id}-panel-${indice}`}
                onClick={() => setAbierta(indice)}
              >
                <span className={styles.acordeonTitulo}>{item.pregunta}</span>
                {activa ? (
                  <IconoChevronAbajo className={styles.acordeonIcono} />
                ) : (
                  <IconoChevronDerecha className={styles.acordeonIcono} />
                )}
              </button>
            </h3>
            <div
              id={`${id}-panel-${indice}`}
              role="region"
              aria-labelledby={`${id}-boton-${indice}`}
              className={styles.acordeonCuerpo}
              hidden={!activa}
            >
              <p>{item.respuesta}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
