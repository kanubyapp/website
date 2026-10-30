import { after } from "next/server";
import { correoCotizacion, enviarCorreo, origenDelAviso, validarAviso } from "@/lib/correo";

/*
 * Aviso por correo de una cotización del popup (o del popup chico del botón
 * flotante, sin tipo de mudanza ni tamaño). El navegador lo manda con
 * keepalive al enviar el formulario, sin esperar la respuesta, así que nunca
 * frena la redirección a WhatsApp y sobrevive a que la página se vaya. Aquí
 * se valida y se responde de inmediato; el correo sale después (after), con
 * el formulario y los datos de campaña del lead. Los fallos (Resend,
 * variables que faltan) quedan en los registros de Vercel con su detalle
 * ("[correo] No se envió…"), sin afectar a quien llenó el formulario.
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

  const correo = correoCotizacion(resultado.aviso, new Date(), origenDelAviso(cuerpo));
  after(() => enviarCorreo("cotizacion", correo, { pagina: resultado.aviso.pagina }));
  return new Response(null, { status: 202 });
}
