"use client";

import { useEffect } from "react";
import { capturarCampana } from "@/lib/campana";

/*
 * Guarda los datos de campaña (UTM, gclid, fbclid…) de la dirección con la
 * que la persona entra al sitio, sea cual sea la página, para que sigan ahí
 * si llena un formulario después de navegar (lib/campana.ts). Va en el layout
 * raíz y no pinta nada.
 */
export function CapturaCampana() {
  useEffect(() => {
    capturarCampana(window.location.search);
  }, []);
  return null;
}
