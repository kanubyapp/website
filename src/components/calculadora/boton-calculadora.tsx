"use client";

import { useCalculadora } from "./calculadora";

/* Botón que abre la calculadora de espacio. El aspecto lo pone quien lo usa. */
export function BotonCalculadora({ className = "" }: { className?: string }) {
  const { abrir } = useCalculadora();
  return (
    <button type="button" className={className} aria-haspopup="dialog" onClick={abrir}>
      Calcula tu espacio
    </button>
  );
}
