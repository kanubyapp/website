import { IconoWhatsApp } from "@/components/iconos";

/*
 * Confirmación de los popups de cotización (el grande y el del botón
 * flotante), en lugar del formulario una vez enviado: WhatsApp se está
 * abriendo en otra pestaña y, siempre, un enlace al mismo WhatsApp con el
 * mismo mensaje, porque el navegador puede bloquear la pestaña nueva sin
 * avisar. Quien la muestra le pasa el foco (tabIndex -1): un lector de
 * pantalla lee el aviso completo y con Tab se llega al enlace.
 */
export function WhatsAppEnviado({ url, ref }: { url: string; ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className="kb-whatsapp-enviado" tabIndex={-1}>
      <IconoWhatsApp className="kb-whatsapp-enviado-icono" />
      <p className="kb-whatsapp-enviado-titulo">Abriendo WhatsApp…</p>
      <p className="kb-whatsapp-enviado-texto">
        Se abre en otra pestaña con tu mensaje ya escrito. Solo tienes que enviarlo.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="kb-whatsapp-enviado-enlace"
      >
        ¿No se abrió? Toca aquí para ir a WhatsApp
      </a>
    </div>
  );
}
