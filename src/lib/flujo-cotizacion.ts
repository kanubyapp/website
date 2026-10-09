import type { Negocio } from "./conversiones.ts";

/*
 * Flujo del popup de cotización (estructura del modal de legacy).
 *
 * - "servicio": se elige el tipo de mudanza o el tamaño de minibodega, y
 *   elegirlo avanza a "datos". "volver" regresa sin perder la elección, para
 *   que se vea marcada.
 * - "negocio": paso previo solo del popup general (botón flotante de la
 *   home): "¿Qué necesitas?", Mudanza o Minibodega. Elegir lleva al flujo de
 *   ese servicio; desde su paso "servicio", "volver" regresa aquí.
 *
 * Cada apertura reinicia al primer paso de su popup.
 */

export type PasoCotizacion = "negocio" | "servicio" | "datos";

export type FlujoCotizacion = {
  paso: PasoCotizacion;
  /** Servicio del flujo; null hasta elegirlo en el paso previo */
  negocio: Negocio | null;
  tipo: string | null;
  /** true en el popup general, que empieza en el paso previo */
  conPrevio: boolean;
};

export type AccionFlujo =
  | { tipo: "elegirNegocio"; valor: Negocio }
  | { tipo: "elegir"; valor: string }
  | { tipo: "volver" }
  | { tipo: "reiniciar" };

/** negocio null: popup general, con el paso previo "¿Qué necesitas?" */
export function flujoInicial(negocio: Negocio | null): FlujoCotizacion {
  return negocio
    ? { paso: "servicio", negocio, tipo: null, conPrevio: false }
    : { paso: "negocio", negocio: null, tipo: null, conPrevio: true };
}

export function flujoCotizacion(estado: FlujoCotizacion, accion: AccionFlujo): FlujoCotizacion {
  switch (accion.tipo) {
    case "elegirNegocio":
      if (!estado.conPrevio) return estado;
      // Cambiar de servicio descarta la opción elegida del otro
      return {
        ...estado,
        paso: "servicio",
        negocio: accion.valor,
        tipo: accion.valor === estado.negocio ? estado.tipo : null,
      };
    case "elegir":
      return { ...estado, paso: "datos", tipo: accion.valor };
    case "volver":
      if (estado.paso === "datos") return { ...estado, paso: "servicio" };
      if (estado.paso === "servicio" && estado.conPrevio) return { ...estado, paso: "negocio" };
      return estado;
    case "reiniciar":
      return flujoInicial(estado.conPrevio ? null : estado.negocio);
  }
}
