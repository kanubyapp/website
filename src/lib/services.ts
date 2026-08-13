/**
 * Catálogo de servicios del modal de contacto. Fuente única: lo consumen el
 * selector del modal, las tarjetas de "Tipos de servicio" y el mensaje que se
 * arma para WhatsApp.
 *
 * `id` es lo que viaja por la app; `title` y `description` son lo que se ve en
 * cada caja del selector; `message` es cómo se nombra el servicio dentro del
 * texto que se manda por WhatsApp, donde conviene ser explícito porque lo lee
 * una persona del equipo sin más contexto.
 */
export type ServiceId = "local" | "monterrey-cdmx" | "oficinas";

export type ServiceOption = {
  id: ServiceId;
  title: string;
  description: string;
  message: string;
};

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "local",
    title: "Mudanza local",
    description: "Dentro de Monterrey",
    message: "Mudanza dentro de Monterrey",
  },
  {
    id: "monterrey-cdmx",
    title: "Mudanza nacional",
    description: "Monterrey a CDMX",
    message: "Mudanza de Monterrey a CDMX",
  },
  {
    id: "oficinas",
    title: "Mudanza empresarial",
    description: "Mudanza de oficinas",
    message: "Mudanza de oficinas",
  },
];

/**
 * Vertical de la página desde la que se abre el modal. Viaja como dato oculto:
 * el usuario no lo elige ni lo ve, pero llega en el mensaje para saber en qué
 * parte del sitio estaba.
 */
export type Vertical = "mudanzas" | "mini-bodegas";

export const VERTICAL_LABEL: Record<Vertical, string> = {
  mudanzas: "Mudanzas",
  "mini-bodegas": "Mini bodegas",
};

/**
 * Vertical a partir de la ruta. La necesitan los puntos de entrada COMPARTIDOS
 * —header, botón flotante, CTAs de cierre—, que no reciben la vertical por
 * props porque viven fuera de la página.
 *
 * Todo lo que no sea mini bodegas cae en mudanzas, que es la vertical principal
 * y la de la home.
 */
export function verticalFromPathname(pathname: string): Vertical {
  return pathname.startsWith("/mini-bodegas") ? "mini-bodegas" : "mudanzas";
}
