/*
 * Comportamiento compartido de los modales del sitio (popup de cotización y
 * calculadora de espacio), sobre un <dialog> abierto con showModal():
 *
 * - Al abrir, recuerda quién tenía el foco; al cerrarse (con su botón, con
 *   Esc o con clic fuera, todos llegan al evento close) se lo devuelve.
 * - El clic en el fondo oscuro llega al propio <dialog>: lo cierra. El clic
 *   dentro de la caja no.
 * - Trampa de Tab: del último control al primero y al revés.
 *
 * Sin React ni DOM real para poder probarlo; el hook use-dialogo-modal lo
 * conecta con el componente.
 */

export const ENFOCABLES =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export type Enfocable = { focus: () => void };

export type DialogoNativo = { showModal: () => void; close: () => void };

export type TeclaDialogo = { key: string; shiftKey: boolean; preventDefault: () => void };

export type CajaDialogo = { querySelectorAll: (selector: string) => ArrayLike<Enfocable> };

/**
 * Cada método recibe el <dialog> y el elemento con el foco en el momento de
 * usarse (document.activeElement); el controlador solo recuerda a quién
 * devolverle el foco.
 */
export function crearDialogoModal() {
  let abridor: Enfocable | null = null;

  return {
    abrir(dialogo: DialogoNativo | null, enfocado: Enfocable | null) {
      abridor = enfocado;
      dialogo?.showModal();
    },
    cerrar(dialogo: DialogoNativo | null) {
      dialogo?.close();
    },
    /** Para el evento close del <dialog> */
    alCerrar() {
      abridor?.focus();
    },
    /** Para el clic en el <dialog>: target es donde cayó el clic */
    alClic(target: unknown, dialogo: DialogoNativo | null) {
      if (dialogo && target === dialogo) dialogo.close();
    },
    alTeclear(evento: TeclaDialogo, caja: CajaDialogo | null, enfocado: Enfocable | null) {
      if (evento.key !== "Tab" || !caja) return;
      const enfocables = caja.querySelectorAll(ENFOCABLES);
      if (enfocables.length === 0) return;
      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];
      if (evento.shiftKey && enfocado === primero) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && enfocado === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    },
  };
}
