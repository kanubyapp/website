import {
  correoCotizacion,
  enviarCorreo,
  origenDelAviso,
  validarAviso,
  type AvisoCotizacion,
  type OrigenAviso,
} from "./correo.ts";
import { enviarCrm } from "./crm.ts";

/*
 * Lo que hace el endpoint con un aviso de cotización ya leído como JSON
 * (src/app/api/cotizacion/route.ts): valida, responde de inmediato y deja
 * programados el correo y el envío al CRM, cada uno por su lado, para
 * después de responder. Un bot recibe la misma respuesta que una persona,
 * pero no sale ni correo ni lead al CRM. Aparte de Next para poder probarlo:
 * "despues" es el after() de la ruta.
 */

export type Tareas = {
  /** Corre la tarea después de responder (after de next/server) */
  despues: (tarea: () => Promise<unknown>) => void;
  /** recibido: cuándo llegó el aviso, la fecha del correo */
  correo?: (aviso: AvisoCotizacion, origen: OrigenAviso, recibido: Date) => Promise<unknown>;
  crm?: (aviso: AvisoCotizacion, origen: OrigenAviso) => Promise<unknown>;
  registrar?: (...datos: unknown[]) => void;
  /** El reloj, para las pruebas */
  ahora?: () => Date;
};

const correoDelAviso = (aviso: AvisoCotizacion, origen: OrigenAviso, recibido: Date) =>
  enviarCorreo("cotizacion", correoCotizacion(aviso, recibido, origen), {
    pagina: aviso.pagina,
  });

/** El estado HTTP de la respuesta: 202 si se acepta (o es bot), 400 si no valida */
export function atenderAviso(
  cuerpo: unknown,
  {
    despues,
    correo = correoDelAviso,
    crm = (aviso, origen) => enviarCrm(aviso, origen),
    registrar = console.error,
    ahora = () => new Date(),
  }: Tareas,
): number {
  const resultado = validarAviso(cuerpo);
  if (resultado.tipo === "bot") return 202;
  if (resultado.tipo === "invalido") {
    registrar(`[correo] Aviso de cotización rechazado: ${resultado.motivo}.`);
    return 400;
  }

  const recibido = ahora();
  const origen = origenDelAviso(cuerpo);
  // Por separado: si el CRM falla o tarda, el correo no se entera.
  despues(() => correo(resultado.aviso, origen, recibido));
  despues(() => crm(resultado.aviso, origen));
  return 202;
}
