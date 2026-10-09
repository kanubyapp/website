"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { IconoWhatsApp } from "@/components/iconos";
import {
  escrituraInicial,
  espera,
  FRASES_COTIZAR,
  siguiente,
  textoVisible,
} from "@/lib/escritura";
import { useCotizacion } from "./cotizacion";

/*
 * "Cotiza Ahora / Whatsapp" del header de mudanzas. La línea grande se
 * escribe sola en ciclo (Whatsapp, Cotiza ahora, Respuesta rápida) y en cada
 * cambio el ícono de WhatsApp gira. Las frases se apilan invisibles en la
 * misma celda y reservan siempre el ancho de la más larga, desde la primera
 * carga y también sin animación, para que el botón nunca cambie de ancho. Para lectores de pantalla siempre es "Cotiza ahora
 * por WhatsApp". Con "reducir movimiento" (y antes de hidratar) muestra
 * "Whatsapp" fijo. Abre el popup de cotización.
 */

const REDUCIR = "(prefers-reduced-motion: reduce)";

function suscribir(avisar: () => void) {
  const consulta = window.matchMedia(REDUCIR);
  consulta.addEventListener("change", avisar);
  return () => consulta.removeEventListener("change", avisar);
}

export function BotonCotizarHeader({ className = "" }: { className?: string }) {
  const { abrir } = useCotizacion();
  const reducir = useSyncExternalStore(
    suscribir,
    () => window.matchMedia(REDUCIR).matches,
    () => true,
  );
  const animar = !reducir;
  const [estado, setEstado] = useState(() => escrituraInicial(FRASES_COTIZAR));

  useEffect(() => {
    if (!animar) return;
    const temporizador = window.setTimeout(
      () => setEstado((actual) => siguiente(actual, FRASES_COTIZAR)),
      espera(estado),
    );
    return () => window.clearTimeout(temporizador);
  }, [animar, estado]);

  const giro = animar && estado.cambios > 0 ? " kb-boton-giro" : "";

  return (
    <button
      type="button"
      className={`kb-boton-cotizar ${className}`}
      aria-haspopup="dialog"
      aria-label="Cotiza ahora por WhatsApp"
      onClick={abrir}
    >
      {/* key: al cambiar de frase el ícono se monta de nuevo y repite el giro */}
      <IconoWhatsApp key={estado.cambios} className={`kb-boton-cotizar-icono${giro}`} />
      <span className="kb-boton-cotizar-textos" aria-hidden="true">
        <span className="kb-boton-cotizar-texto">Cotiza Ahora</span>
        <span className="kb-boton-cotizar-subtexto kb-escritura">
          {FRASES_COTIZAR.map((frase) => (
            <span key={frase} className="kb-escritura-reserva">
              {frase}
            </span>
          ))}
          <span className="kb-escritura-texto">
            {animar ? textoVisible(estado, FRASES_COTIZAR) : FRASES_COTIZAR[0]}
          </span>
        </span>
      </span>
    </button>
  );
}
