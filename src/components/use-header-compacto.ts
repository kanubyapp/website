import { useEffect, type RefObject } from "react";
import { compactoSegunScroll } from "@/lib/header-compacto";

/*
 * Header sticky que se compacta al bajar (todas las páginas con header).
 *
 * - Marca el estado en <html> con data-header-compacto; los estilos de cada
 *   header lo consultan para reducirse.
 * - Publica en --alto-header dónde termina la barra visible: lo usa el margen
 *   de anclaje de base.css para que el header no tape el título de la sección.
 * - Con reservar, fija el alto del header (--alto-reservado) en su tamaño
 *   normal, para que al compactarse no mueva el contenido de la página. El
 *   header de la home es fijo y no ocupa espacio: no reserva.
 */
export function useHeaderCompacto(
  header: RefObject<HTMLElement | null>,
  barra: RefObject<HTMLElement | null>,
  { reservar = true }: { reservar?: boolean } = {},
) {
  useEffect(() => {
    const raiz = document.documentElement;
    const elemento = header.current;
    const caja = barra.current;
    if (!elemento || !caja) return;

    let compacto = false;
    let pendiente = 0;
    let alto = "";

    const medirReserva = () => {
      if (!reservar || compacto) return;
      elemento.style.removeProperty("--alto-reservado");
      elemento.style.setProperty("--alto-reservado", `${elemento.offsetHeight}px`);
    };

    const publicarAlto = () => {
      const valor = `${Math.round(caja.getBoundingClientRect().bottom)}px`;
      if (valor === alto) return;
      alto = valor;
      raiz.style.setProperty("--alto-header", valor);
    };

    const actualizar = () => {
      pendiente = 0;
      const nuevo = compactoSegunScroll(window.scrollY, compacto);
      if (nuevo !== compacto) {
        compacto = nuevo;
        if (compacto) raiz.dataset.headerCompacto = "";
        else delete raiz.dataset.headerCompacto;
      }
      publicarAlto();
    };

    const alDesplazar = () => {
      if (!pendiente) pendiente = window.requestAnimationFrame(actualizar);
    };

    const alRedimensionar = () => {
      medirReserva();
      alDesplazar();
    };

    medirReserva();
    actualizar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alRedimensionar);
    caja.addEventListener("transitionend", publicarAlto);

    return () => {
      window.cancelAnimationFrame(pendiente);
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alRedimensionar);
      caja.removeEventListener("transitionend", publicarAlto);
      delete raiz.dataset.headerCompacto;
      raiz.style.removeProperty("--alto-header");
    };
  }, [header, barra, reservar]);
}
