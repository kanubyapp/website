"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { fechaRelativa } from "@/lib/fechas";
import type { Resena } from "./datos";
import styles from "./page.module.css";

/*
 * Reseñas de Google en estático, con el diseño del widget de Trustindex de
 * kanuby.com (layout "slider", borde claro): hasta 3 tarjetas visibles según
 * el ancho, avance automático cada 6 s que se pausa al pasar el ratón, flechas
 * desde 1024px y barra de progreso en móvil. Cada texto se corta a 4 líneas
 * con "Leer más". La fecha relativa se calcula en el navegador, como el widget.
 */

const AUTOPLAY_MS = 6000;

export function Resenas({ resenas }: { resenas: Resena[] }) {
  const [indice, setIndice] = useState(0);
  const [visibles, setVisibles] = useState(1);
  const [pausado, setPausado] = useState(false);
  const [hoy, setHoy] = useState<Date | null>(null);
  const [cortadas, setCortadas] = useState<Set<number>>(new Set());
  const [abiertas, setAbiertas] = useState<Set<number>>(new Set());
  const pista = useRef<HTMLDivElement>(null);

  const maximo = Math.max(resenas.length - visibles, 0);

  // Cuántas caben y qué textos no caben en 4 líneas.
  useEffect(() => {
    const elemento = pista.current;
    if (!elemento) return;
    const medir = () => {
      const primera = elemento.firstElementChild as HTMLElement | null;
      if (primera) setVisibles(Math.max(Math.round(elemento.offsetWidth / primera.offsetWidth), 1));
      const nuevas = new Set<number>();
      elemento.querySelectorAll<HTMLElement>("[data-texto]").forEach((texto, posicion) => {
        if (texto.scrollHeight > texto.clientHeight + 1) nuevas.add(posicion);
      });
      setCortadas(nuevas);
      setHoy(new Date());
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  const mover = useCallback(
    (direccion: 1 | -1) => {
      setIndice((actual) => {
        const siguiente = actual + direccion;
        if (siguiente > maximo) return 0;
        if (siguiente < 0) return maximo;
        return siguiente;
      });
    },
    [maximo],
  );

  useEffect(() => {
    if (pausado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intervalo = window.setInterval(() => mover(1), AUTOPLAY_MS);
    return () => window.clearInterval(intervalo);
  }, [pausado, mover]);

  function alternar(posicion: number) {
    setAbiertas((actuales) => {
      const nuevas = new Set(actuales);
      if (nuevas.has(posicion)) nuevas.delete(posicion);
      else nuevas.add(posicion);
      return nuevas;
    });
  }

  const actual = Math.min(indice, maximo);

  return (
    <div
      className={styles.resenas}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Reseñas de Google"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <div className={styles.resenasControles}>
        <button
          type="button"
          className={styles.resenasAnterior}
          aria-label="Reseña anterior"
          onClick={() => mover(-1)}
        />
        <button
          type="button"
          className={styles.resenasSiguiente}
          aria-label="Siguiente reseña"
          onClick={() => mover(1)}
        />
      </div>

      <div className={styles.resenasVentana}>
        <div
          ref={pista}
          className={styles.resenasPista}
          style={{ transform: `translateX(${(-actual * 100) / visibles}%)` }}
        >
          {resenas.map((resena, posicion) => {
            const visible = posicion >= actual && posicion < actual + visibles;
            return (
              <article
                key={resena.nombre}
                className={styles.resena}
                aria-hidden={!visible || undefined}
                inert={!visible || undefined}
              >
                <div className={styles.resenaTarjeta}>
                  <div className={styles.resenaCabecera}>
                    <Image
                      src="/images/minibodegas/resenas/google.svg"
                      alt="Publicado en Google"
                      width={20}
                      height={20}
                      className={styles.resenaPlataforma}
                    />
                    <Image
                      src={resena.avatar}
                      alt={`Foto de perfil de ${resena.nombre}`}
                      width={120}
                      height={120}
                      sizes="40px"
                      className={styles.resenaAvatar}
                    />
                    <div className={styles.resenaDatos}>
                      <p className={styles.resenaNombre}>{resena.nombre}</p>
                      <p className={styles.resenaFecha}>
                        {hoy ? fechaRelativa(resena.fecha, hoy) : ""}
                      </p>
                    </div>
                  </div>
                  <div
                    className={styles.resenaEstrellas}
                    role="img"
                    aria-label={`${resena.estrellas} de 5 estrellas`}
                  >
                    {Array.from({ length: resena.estrellas }, (_, estrella) => (
                      <Image
                        key={estrella}
                        src="/images/minibodegas/resenas/estrella.svg"
                        alt=""
                        width={17}
                        height={17}
                      />
                    ))}
                    <Image
                      src="/images/minibodegas/resenas/verificado.svg"
                      alt="Reseña verificada de Google"
                      width={15}
                      height={15}
                      className={styles.resenaVerificada}
                    />
                  </div>
                  <p
                    data-texto
                    className={styles.resenaTexto}
                    data-abierta={abiertas.has(posicion)}
                  >
                    {resena.texto}
                  </p>
                  {(cortadas.has(posicion) || abiertas.has(posicion)) && (
                    <button
                      type="button"
                      className={styles.resenaLeerMas}
                      aria-expanded={abiertas.has(posicion)}
                      onClick={() => alternar(posicion)}
                    >
                      {abiertas.has(posicion) ? "Ocultar" : "Leer más"}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className={styles.resenasLinea} aria-hidden="true">
        <span
          style={{
            left: `${maximo ? (actual / maximo) * (100 - 100 / (maximo + 1)) : 0}%`,
            width: `${100 / (maximo + 1)}%`,
          }}
        />
      </div>
    </div>
  );
}
