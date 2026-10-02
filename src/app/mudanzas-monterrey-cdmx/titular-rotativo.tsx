"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

/*
 * Titular decorativo del hero de /mudanzas-monterrey-cdmx/: "Mudanzas desde
 * Monterrey a CDMX" alterna con "Mudanzas desde CDMX a Monterrey" cada 2.5 s,
 * con la animación "wave" de Raven (las letras entran escalando una tras otra).
 *
 * No es un heading y está oculto para lectores de pantalla; el texto se pinta
 * con CSS (content: attr(data-letra)), así que tampoco lo leen los buscadores.
 * El H1 de la página va debajo del divisor. Con "reducir movimiento" no rota.
 */

const RUTAS = [
  ["Monterrey", "CDMX"],
  ["CDMX", "Monterrey"],
] as const;

const INTERVALO_MS = 2500;

function Letras({ texto, animar }: { texto: string; animar: boolean }) {
  return (
    <span className={styles.rotativoDinamico} key={texto}>
      {Array.from(texto).map((letra, indice) => (
        <span
          key={indice}
          className={animar ? styles.letraAnimada : styles.letra}
          data-letra={letra === " " ? " " : letra}
          style={{ animationDelay: `${indice * 50}ms` }}
        />
      ))}
    </span>
  );
}

function Texto({ texto }: { texto: string }) {
  return <span className={styles.letra} data-letra={texto} />;
}

export function TitularRotativo() {
  const [indice, setIndice] = useState(0);
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intervalo = window.setInterval(() => {
      setAnimar(true);
      setIndice((actual) => (actual + 1) % RUTAS.length);
    }, INTERVALO_MS);
    return () => window.clearInterval(intervalo);
  }, []);

  const [origen, destino] = RUTAS[indice];

  return (
    <span className={styles.rotativo} aria-hidden="true">
      <span className={styles.rotativoLinea1}>
        <Texto texto="Mudanzas" />
        <br />
        <Texto texto={"desde "} />
        <Letras texto={origen} animar={animar} />
      </span>
      <span className={styles.rotativoLinea2}>
        <Texto texto={"a "} />
        <Letras texto={destino} animar={animar} />
      </span>
    </span>
  );
}
