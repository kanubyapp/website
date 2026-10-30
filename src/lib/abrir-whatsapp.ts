import { registrarConversion, type EventoConversion } from "./conversiones.ts";

/*
 * Fin del envío de los popups de cotización: WhatsApp en una pestaña nueva y
 * el sitio se queda donde estaba. La pestaña se abre en el mismo momento del
 * envío, sin esperar a GTM: los navegadores bloquean las pestañas que se
 * abren después de una espera, porque ya no las asocian al clic. El evento
 * entra al dataLayer enseguida y sin esperar confirmación: como la página
 * no se va, GTM lo manda cuando le toca. Si el navegador bloquea la pestaña,
 * el popup muestra siempre un enlace al mismo WhatsApp.
 */
export function abrirWhatsApp(
  url: string,
  evento: EventoConversion,
  {
    abrir = (direccion: string) => {
      window.open(direccion, "_blank", "noopener,noreferrer");
    },
    registrar = registrarConversion,
  }: {
    abrir?: (direccion: string) => void;
    registrar?: (evento: EventoConversion) => void;
  } = {},
) {
  abrir(url);
  registrar(evento);
}
