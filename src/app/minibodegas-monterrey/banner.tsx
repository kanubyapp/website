"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useCotizacion } from "@/components/mudanzas/cotizacion";
import styles from "./page.module.css";

/*
 * Banner con el camión, la ilustración "¿No sabes cómo elegir?" y el botón
 * "Contáctanos", en cristal claro, montado sobre el borde inferior de la
 * tarjeta de tamaños: mitad sobre ella y mitad fuera. Para eso sube la mitad
 * de su alto, que se mide aquí (--banner-alto). Como en el publicado, el camión entra desde la izquierda
 * (fadeInLeft) al aparecer en pantalla y se desplaza en horizontal al hacer
 * scroll (motion effects de Elementor, solo escritorio y tablet). Con
 * "reducir movimiento" no hay ninguna de las dos animaciones.
 */

/* Elementor: velocidad 1 → hasta 50px a cada lado del centro, en sentido negativo */
const DESPLAZAMIENTO_MAXIMO = 50;

export function Banner() {
  const { abrir } = useCotizacion();
  const camion = useRef<HTMLDivElement>(null);
  const banner = useRef<HTMLElement>(null);
  const tarjeta = useRef<HTMLDivElement>(null);

  // Alto de la tarjeta, para subirla la mitad sobre la de tamaños.
  useEffect(() => {
    const seccion = banner.current;
    const elemento = tarjeta.current;
    if (!seccion || !elemento) return;
    const observador = new ResizeObserver(() => {
      seccion.style.setProperty("--banner-alto", `${elemento.offsetHeight}px`);
    });
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    const elemento = camion.current;
    if (!elemento) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Entrada: oculto hasta que aparece en pantalla (el estado vive en el DOM).
    elemento.dataset.estado = "esperando";
    const observador = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return;
      elemento.dataset.estado = "visible";
      observador.disconnect();
    });
    observador.observe(elemento);

    // Desplazamiento según cuánto ha recorrido el banner la ventana.
    let pendiente = 0;
    const mover = () => {
      pendiente = 0;
      const caja = elemento.getBoundingClientRect();
      const recorrido = (window.innerHeight - caja.top) / (window.innerHeight + caja.height);
      const progreso = Math.min(Math.max(recorrido, 0), 1);
      elemento.style.setProperty(
        "--desplazamiento",
        `${-(progreso - 0.5) * 2 * DESPLAZAMIENTO_MAXIMO}px`,
      );
    };
    const alDesplazar = () => {
      if (!pendiente) pendiente = window.requestAnimationFrame(mover);
    };
    mover();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar);

    return () => {
      observador.disconnect();
      window.cancelAnimationFrame(pendiente);
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
    };
  }, []);

  return (
    <section ref={banner} className={styles.banner}>
      <div ref={tarjeta} className={`kb-tarjeta kb-cristal ${styles.bannerTarjeta}`}>
        <div ref={camion} className={styles.bannerCamion}>
          <Image
            src="/images/minibodegas/camionvolador.png"
            alt="Camión de reparto con una caja grande"
            width={800}
            height={522}
            sizes="188px"
          />
        </div>
        <div className={styles.bannerIlustracion}>
          <Image
            src="/images/nosabescomoazul.svg"
            alt="¿No sabes cómo elegir?"
            width={1024}
            height={257}
            sizes="(max-width: 767px) 60vw, 300px"
          />
        </div>
        <button
          type="button"
          className={`kb-boton-principal ${styles.bannerBoton}`}
          aria-haspopup="dialog"
          onClick={() => abrir()}
        >
          Contáctanos
        </button>
      </div>
    </section>
  );
}
