"use client";

import { IconoWhatsApp } from "@/components/iconos";
import { useCotizacion } from "./cotizacion";
import styles from "@/app/mudanzas-monterrey/page.module.css";

/*
 * Botón de dos líneas de kanuby.com ("Cotiza Ahora por" / "Whatsapp") que abre
 * el popup de cotización. La variante define tamaños y colores.
 */
export function BotonCotizar({
  texto,
  subtexto,
  className = "",
}: {
  texto: string;
  subtexto: string;
  className?: string;
}) {
  const { abrir } = useCotizacion();
  return (
    <button
      type="button"
      className={`${styles.botonCotizar} ${className}`}
      aria-haspopup="dialog"
      onClick={abrir}
    >
      <IconoWhatsApp className={styles.botonCotizarIcono} />
      <span className={styles.botonCotizarTextos}>
        <span className={styles.botonCotizarTexto}>{texto}</span>
        <span className={styles.botonCotizarSubtexto}>{subtexto}</span>
      </span>
    </button>
  );
}

export function BotonFlotante() {
  const { abrir } = useCotizacion();
  return (
    <button
      type="button"
      className={styles.flotante}
      aria-label="Cotizar por WhatsApp"
      aria-haspopup="dialog"
      onClick={abrir}
    >
      <IconoWhatsApp />
    </button>
  );
}
