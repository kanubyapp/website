"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/*
 * Desplazamiento suave con inercia (Lenis) para la rueda del ratón y el
 * trackpad. Solo con puntero fino que puede pasar por encima (escritorio) y
 * sin "reducir movimiento": en táctiles, o si cambia la preferencia, queda el
 * scroll nativo.
 *
 * Lenis mueve el scroll real de la ventana, así que lo que escucha el evento
 * scroll (header compacto, camión de minibodegas) y lo sticky siguen igual.
 * - anchors: Lenis anima los saltos a anclas, respetando scroll-padding-top
 *   (el margen del header); si no, un clic a mitad de la inercia se perdía.
 * - lerp 0.12: llega a su destino en unos 0.4 s; suave sin sentirse tarde.
 * - autoToggle: se detiene mientras <html> tiene overflow hidden (el popup
 *   abierto bloquea así el fondo, en interacciones.css).
 * - stopInertiaOnNavigate: al ir a otra página no arrastra la inercia.
 * Lo que tiene scroll propio conserva el nativo: el popup y los menús
 * móviles llevan data-lenis-prevent; el carrusel de noticias,
 * data-lenis-prevent-horizontal (los gestos laterales son suyos; los
 * verticales siguen moviendo la página).
 */

const CONSULTA = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function ScrollSuave() {
  useEffect(() => {
    const consulta = window.matchMedia(CONSULTA);
    let lenis: Lenis | null = null;

    const actualizar = () => {
      if (consulta.matches && !lenis) {
        lenis = new Lenis({
          autoRaf: true,
          lerp: 0.12,
          anchors: true,
          autoToggle: true,
          stopInertiaOnNavigate: true,
        });
      } else if (!consulta.matches && lenis) {
        lenis.destroy();
        lenis = null;
      }
    };

    actualizar();
    consulta.addEventListener("change", actualizar);
    return () => {
      consulta.removeEventListener("change", actualizar);
      lenis?.destroy();
    };
  }, []);

  return null;
}
