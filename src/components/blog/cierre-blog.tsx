import Image from "next/image";
import Link from "next/link";
import {
  IconoFacebook,
  IconoInstagram,
  IconoLinkedin,
  IconoTiktok,
  IconoWhatsApp,
} from "@/components/iconos";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { TELEFONO_ENLACE, TELEFONO_VISIBLE } from "@/lib/contacto";
import type { Negocio } from "@/lib/conversiones";
import { urlWhatsAppDirecto } from "@/lib/whatsapp";
import styles from "@/app/[slug]/page.module.css";

/*
 * Bloque de cierre de los posts, en una tarjeta del sistema: texto, redes,
 * "Descubre más", "Cobertura" (sus enlaces dan 404 en el publicado; en
 * pendientes) y la llamada "¿Necesitas ayuda?". Va antes del footer global,
 * que lleva los créditos.
 */

/* El WhatsApp lleva el mensaje del servicio del post (o el general) */
function redes(servicio: Negocio | null) {
  return [
    { href: "https://www.facebook.com/KanubyBodegas/", etiqueta: "Facebook de Kanuby", Icono: IconoFacebook },
    { href: "https://www.instagram.com/kanuby.mx/", etiqueta: "Instagram de Kanuby", Icono: IconoInstagram },
    { href: "https://mx.linkedin.com/company/kanuby", etiqueta: "LinkedIn de Kanuby", Icono: IconoLinkedin },
    { href: urlWhatsAppDirecto(servicio), etiqueta: "Escribir a Kanuby por WhatsApp", Icono: IconoWhatsApp },
    { href: "https://www.tiktok.com/@kanuby.mx", etiqueta: "TikTok de Kanuby", Icono: IconoTiktok },
  ];
}

/*
 * negocio: el del post según su categoría, para el evento del ícono de
 * WhatsApp (negocioDePost); servicio: el que su categoría deja claro, para el
 * mensaje (servicioDePost, null si no se sabe).
 */
export function CierreBlog({ negocio, servicio }: { negocio: Negocio | null; servicio: Negocio | null }) {
  return (
    <section className={`kb-tarjeta ${styles.cierre}`}>
      <div className={styles.cierreMarca}>
        <Link href="/" className={styles.cierreLogo}>
          <Image
            src="/images/kanuby-white.svg"
            alt="Kanuby, ir al inicio"
            width={1593}
            height={338}
            sizes="(max-width: 767px) 53vw, 17vw"
          />
        </Link>
        <p className={styles.cierreTexto}>
          En Kanuby reinventamos la manera en que te mudas en México y ofrecemos nuestras
          increíbles mudanzas y minibodegas a domicilio con servicio de recolección,
          organización, almacenamiento y hasta entrega a domicilio.
        </p>
        <ul className={styles.cierreRedes}>
          {redes(servicio).map(({ href, etiqueta, Icono }) => (
            <li key={href}>
              {href.startsWith("https://wa.me/") ? (
                <EnlaceWhatsApp
                  href={href}
                  negocio={negocio}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={etiqueta}
                >
                  <Icono />
                </EnlaceWhatsApp>
              ) : (
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={etiqueta}>
                  <Icono />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cierreColumna}>
        <p className={styles.cierreTitulo}>Descubre más</p>
        <ul className={styles.cierreLista}>
          <li>
            <Link href="/terminos-y-condiciones/">Términos y condiciones</Link>
          </li>
          <li>
            <Link href="/aviso-de-privacidad/">Aviso de privacidad</Link>
          </li>
          <li>
            <a href="https://app.kanuby.com/login" target="_blank" rel="noopener noreferrer">
              Iniciar Sesión
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.cierreColumna}>
        <p className={styles.cierreTitulo}>Cobertura</p>
        <p className={styles.cierreSubtitulo}>Minibodegas</p>
        <ul className={styles.cierreLista}>
          <li>
            <Link href="/minibodegas/monterrey/" target="_blank" rel="noopener noreferrer">Monterrey</Link>
          </li>
          <li>
            <Link href="/minibodegas/puebla/" target="_blank" rel="noopener noreferrer">Puebla</Link>
          </li>
        </ul>
        <p className={styles.cierreSubtitulo}>Mudanzas</p>
        <ul className={styles.cierreLista}>
          <li>
            <Link href="/mudanzas/monterrey/">Monterrey</Link>
          </li>
          <li>
            <Link href="/mudanzas/puebla/" target="_blank" rel="noopener noreferrer">Puebla</Link>
          </li>
        </ul>
      </div>

      <div className={styles.cierreAyuda}>
        <a href={TELEFONO_ENLACE} className={styles.cta}>
          <span className={styles.ctaContenido}>
            <span className={styles.ctaTitulo}>¿Necesitas ayuda?</span>
            <span className={styles.ctaDescripcion}>Llámanos</span>
            <span className={styles.ctaNumero}>{TELEFONO_VISIBLE}</span>
          </span>
          <span className={styles.ctaImagen}>
            <Image
              src="/images/contactanos.png"
              alt="Camioneta naranja de Kanuby con el lema Rápido, fácil y seguro"
              width={1080}
              height={800}
              sizes="(max-width: 1024px) 88vw, 21vw"
            />
          </span>
        </a>
      </div>
    </section>
  );
}
