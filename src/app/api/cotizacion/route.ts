import { after } from "next/server";
import { atenderAviso } from "@/lib/atender-aviso";

/*
 * Aviso de una cotización del popup (o del popup chico del botón flotante,
 * sin tipo de mudanza ni tamaño). El navegador lo manda con keepalive al
 * enviar el formulario, sin esperar la respuesta, así que nunca frena la
 * redirección a WhatsApp y sobrevive a que la página se vaya. Aquí se valida
 * y se responde de inmediato; después (after) salen, cada uno por su lado,
 * el correo con el formulario y los datos de campaña del lead
 * (lib/correo.ts) y el lead al CRM de SCNDAL Studio (lib/crm.ts). Los fallos
 * (Resend, el CRM, variables que faltan) quedan en los registros de Vercel
 * con su detalle ("[correo] No se envió…", "[crm] No se envió…"), sin
 * afectar a quien llenó el formulario ni al otro envío.
 */
export async function POST(peticion: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await peticion.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  return new Response(null, { status: atenderAviso(cuerpo, { despues: after }) });
}
