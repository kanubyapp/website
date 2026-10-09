import { after } from "next/server";
import { correoCotizacion, enviarCorreo, validarAviso } from "@/lib/correo";

/*
 * Aviso por correo de una cotización del popup. El navegador lo manda con
 * keepalive al enviar el formulario, sin esperar la respuesta, así que nunca
 * frena la redirección a WhatsApp y sobrevive a que la página se vaya. Aquí
 * se valida y se responde de inmediato; el correo sale después (after). Los
 * fallos (Resend, variables que faltan) solo quedan registrados en el
 * servidor.
 */
export async function POST(peticion: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await peticion.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  const resultado = validarAviso(cuerpo);
  // A un bot se le contesta igual que a una persona, pero no sale correo.
  if (resultado.tipo === "bot") return new Response(null, { status: 202 });
  if (resultado.tipo === "invalido") {
    console.error(`[correo] Aviso de cotización rechazado: ${resultado.motivo}.`);
    return new Response(null, { status: 400 });
  }

  const correo = correoCotizacion(resultado.aviso, new Date());
  after(() => enviarCorreo("cotizacion", correo));
  return new Response(null, { status: 202 });
}
