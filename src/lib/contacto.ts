/*
 * Teléfono de Kanuby: el único lugar del sitio donde está escrito. De él
 * salen el número que se muestra, el enlace para llamar y el de WhatsApp
 * (popups, enlaces directos, header, footer y cierre del blog). Para
 * cambiarlo, se cambia aquí.
 */

/** Número nacional de 10 dígitos, sin lada de país */
const NACIONAL = "8110287087";

/** Como se muestra: "81 1028 7087" */
export const TELEFONO_VISIBLE = `${NACIONAL.slice(0, 2)} ${NACIONAL.slice(2, 6)} ${NACIONAL.slice(6)}`;

/** Enlace para llamar, con la lada de México */
export const TELEFONO_ENLACE = `tel:+52${NACIONAL}`;

/** Número de WhatsApp para wa.me: 52 de México y el 1 de celular */
export const NUMERO_WHATSAPP = `521${NACIONAL}`;
