import { useRef, useState } from "react";
import { crearDialogoModal } from "@/lib/dialogo-modal";

/*
 * Hook de los modales del sitio (popup de cotización y calculadora): conecta
 * crearDialogoModal (foco de regreso, cierre con clic fuera, trampa de Tab)
 * con un <dialog> y su caja. El componente pone propsDialogo en el <dialog>
 * y caja en el contenedor de sus controles; abierto sirve para enfocar el
 * primer control del paso activo.
 */
export function useDialogoModal() {
  const dialogo = useRef<HTMLDialogElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const [abierto, setAbierto] = useState(false);
  const [control] = useState(crearDialogoModal);
  const enfocado = () => document.activeElement as HTMLElement | null;

  function abrir() {
    control.abrir(dialogo.current, enfocado());
    setAbierto(true);
  }

  function cerrar() {
    control.cerrar(dialogo.current);
  }

  return {
    caja,
    abierto,
    abrir,
    cerrar,
    propsDialogo: {
      ref: dialogo,
      onClose: () => {
        setAbierto(false);
        control.alCerrar();
      },
      onKeyDown: (evento: React.KeyboardEvent<HTMLDialogElement>) =>
        control.alTeclear(evento, caja.current, enfocado()),
      onClick: (evento: React.MouseEvent<HTMLDialogElement>) =>
        control.alClic(evento.target, dialogo.current),
    },
  };
}
