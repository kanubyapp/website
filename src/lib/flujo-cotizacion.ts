/*
 * Flujo en dos pasos del popup de cotización (estructura del modal de
 * legacy): en "servicio" se elige el tipo de mudanza o el tamaño de
 * minibodega, y elegirlo avanza a "datos". "volver" regresa al paso 1 sin
 * perder la elección, para que se vea marcada. Cada apertura reinicia.
 */

export type PasoCotizacion = "servicio" | "datos";

export type FlujoCotizacion = {
  paso: PasoCotizacion;
  tipo: string | null;
};

export type AccionFlujo =
  | { tipo: "elegir"; valor: string }
  | { tipo: "volver" }
  | { tipo: "reiniciar" };

export const FLUJO_INICIAL: FlujoCotizacion = { paso: "servicio", tipo: null };

export function flujoCotizacion(estado: FlujoCotizacion, accion: AccionFlujo): FlujoCotizacion {
  switch (accion.tipo) {
    case "elegir":
      return { paso: "datos", tipo: accion.valor };
    case "volver":
      return { ...estado, paso: "servicio" };
    case "reiniciar":
      return FLUJO_INICIAL;
  }
}
