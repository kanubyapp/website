import { WhatsAppIcon } from "@/components/icons";
import { WHATSAPP_HREF } from "@/lib/contact";

/**
 * Botón flotante de WhatsApp, en pill de cristal coherente con el header.
 *
 * Usa .glass-floating (0.55) y no .glass-strong (0.45): al llegar al final de
 * la página este pill queda sobre la tarjeta azul del footer, y a 0.45 el azul
 * da 3.89:1 ahí. A 0.55 pasa sobre cualquier fondo de la paleta.
 *
 * El texto va en azul de marca, no en blanco: sobre cristal claro el blanco no
 * alcanza AA.
 *
 * OJO — colisión: el widget de respond.io (ver ChatWidget) también se inyecta
 * en la esquina inferior derecha. Este pill se coloca por encima de esa zona
 * (bottom-24) para no solaparse, pero la posición exacta de la burbuja la
 * decide su script y no se puede verificar desde el código.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-floating text-ui fixed bottom-24 right-4 z-40 inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-medium text-brand-blue transition-transform hover:scale-[1.03] md:right-8"
    >
      <WhatsAppIcon className="h-5 w-5" />
      Escríbenos
    </a>
  );
}
