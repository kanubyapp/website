import type { Metadata } from "next";

/*
 * Páginas legales: el aviso de privacidad y los términos y condiciones.
 *
 * LEGALES_CONFIRMADOS es la única señal para pasarlas a indexables. Mientras
 * sea false llevan noindex y quedan fuera del sitemap. Se cambia a true solo
 * cuando Kanuby haya confirmado todos los datos y no quede ningún
 * <Pendiente> en las dos páginas: una prueba lo exige (legales.test.ts).
 */
export const LEGALES_CONFIRMADOS = false;

export const RUTAS_LEGALES = ["/aviso-de-privacidad/", "/terminos-y-condiciones/"] as const;

/** robots de las dos páginas: noindex hasta que se confirmen los datos. */
export const robotsLegales: Metadata["robots"] = LEGALES_CONFIRMADOS
  ? undefined
  : { index: false, follow: true };
