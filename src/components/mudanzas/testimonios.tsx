"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconoAnterior, IconoEstrella, IconoSiguiente } from "@/components/iconos";
import type { Testimonio } from "@/lib/testimonios";

/*
 * Carrusel de testimonios (loop-carousel de Elementor Pro en kanuby.com):
 * autoplay cada 5 s, pausa al pasar el ratón, bucle infinito, transición de
 * 500 ms y flechas. Tras usar las flechas o arrastrar, el autoplay se detiene,
 * como con pause_on_interaction en el publicado.
 *
 * El bucle se hace con tres copias de la lista: se navega por la del centro y,
 * al salir de ella, se salta sin animación a la posición equivalente.
 */

const AUTOPLAY_MS = 5000;
const TRANSICION_MS = 500;

export function Testimonios({
  titulo,
  texto,
  testimonios,
}: {
  titulo: React.ReactNode;
  texto: string;
  testimonios: Testimonio[];
}) {
  const total = testimonios.length;
  const [indice, setIndice] = useState(total);
  const [animar, setAnimar] = useState(false);
  const [paso, setPaso] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [detenido, setDetenido] = useState(false);
  const pista = useRef<HTMLDivElement>(null);
  const inicioArrastre = useRef<number | null>(null);

  // Ancho de una tarjeta más la separación, medido en el navegador.
  useEffect(() => {
    const elemento = pista.current;
    if (!elemento) return;
    const medir = () => {
      const primera = elemento.firstElementChild as HTMLElement | null;
      if (!primera) return;
      const separacion = parseFloat(getComputedStyle(elemento).columnGap) || 0;
      setPaso(primera.offsetWidth + separacion);
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  const mover = useCallback((direccion: 1 | -1) => {
    setAnimar(true);
    setIndice((actual) => actual + direccion);
  }, []);

  useEffect(() => {
    if (pausado || detenido) return;
    // Sin autoplay para quien pidió reducir el movimiento.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intervalo = window.setInterval(() => mover(1), AUTOPLAY_MS);
    return () => window.clearInterval(intervalo);
  }, [pausado, detenido, mover]);

  // Vuelve a la copia central sin animación al terminar la transición.
  function alTerminarTransicion(evento: React.TransitionEvent<HTMLDivElement>) {
    if (evento.target !== evento.currentTarget) return;
    if (indice >= total && indice < total * 2) return;
    setAnimar(false);
    setIndice(total + (((indice - total) % total) + total) % total);
  }

  function interactuar(direccion: 1 | -1) {
    setDetenido(true);
    mover(direccion);
  }

  const copias = [0, 1, 2].flatMap((copia) =>
    testimonios.map((testimonio) => ({ testimonio, copia })),
  );

  return (
    <section id="testimonios" className="kb-testimonios">
      <div className="kb-testimonios-cabecera">
        {titulo}
        <p className="kb-testimonios-texto">{texto}</p>
        <hr className="kb-testimonios-divisor" />
      </div>

      <div
        className="kb-carrusel"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Testimonios"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocus={() => setPausado(true)}
        onBlur={() => setPausado(false)}
        onPointerDown={(evento) => {
          inicioArrastre.current = evento.clientX;
        }}
        onPointerUp={(evento) => {
          if (inicioArrastre.current === null) return;
          const distancia = evento.clientX - inicioArrastre.current;
          inicioArrastre.current = null;
          if (Math.abs(distancia) > 50) interactuar(distancia < 0 ? 1 : -1);
        }}
      >
        <div className="kb-carrusel-ventana">
          <div
            ref={pista}
            className="kb-carrusel-pista"
            style={{
              transform: `translateX(${-indice * paso}px)`,
              transition: animar ? `transform ${TRANSICION_MS}ms ease` : "none",
            }}
            onTransitionEnd={alTerminarTransicion}
          >
            {copias.map(({ testimonio, copia }, posicion) => (
              <article
                key={`${copia}-${testimonio.nombre}`}
                className="kb-testimonio"
                aria-hidden={copia !== 1 || undefined}
                inert={copia !== 1 || undefined}
                aria-roledescription="diapositiva"
                aria-label={`${(posicion % total) + 1} de ${total}`}
              >
                <div className="kb-testimonio-autor">
                  <Image
                    src={testimonio.avatar}
                    alt={`Avatar de ${testimonio.nombre}`}
                    width={512}
                    height={512}
                    sizes="64px"
                    className="kb-testimonio-avatar"
                  />
                  <div className="kb-testimonio-datos">
                    <p className="kb-testimonio-nombre">{testimonio.nombre}</p>
                    <p className="kb-testimonio-fecha">{testimonio.fecha}</p>
                    <div
                      className="kb-estrellas"
                      role="img"
                      aria-label={`${testimonio.estrellas} de 5 estrellas`}
                    >
                      {Array.from({ length: 5 }, (_, estrella) => (
                        <IconoEstrella
                          key={estrella}
                          className={estrella < testimonio.estrellas ? "kb-estrella-marcada" : undefined}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="kb-testimonio-texto">{testimonio.texto}</p>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="kb-carrusel-flecha kb-carrusel-anterior"
          aria-label="Testimonio anterior"
          onClick={() => interactuar(-1)}
        >
          <IconoAnterior />
        </button>
        <button
          type="button"
          className="kb-carrusel-flecha kb-carrusel-siguiente"
          aria-label="Testimonio siguiente"
          onClick={() => interactuar(1)}
        >
          <IconoSiguiente />
        </button>
      </div>
    </section>
  );
}
