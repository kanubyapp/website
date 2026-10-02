import Image from "next/image";
import Link from "next/link";
import {
  IconoFacebook,
  IconoInstagram,
  IconoLinkedin,
  IconoTiktok,
  IconoWhatsApp,
} from "@/components/iconos";
import styles from "@/app/[slug]/page.module.css";

/*
 * Bloque de cierre de los posts (plantilla 4541): texto, redes, "Descubre
 * más", "Cobertura" (sus enlaces dan 404 en el publicado; en pendientes) y la
 * llamada "¿Necesitas ayuda?", más la franja de créditos. Va antes del footer
 * global, como en el publicado.
 */

const redes = [
  { href: "https://www.facebook.com/KanubyBodegas/", etiqueta: "Facebook de Kanuby", Icono: IconoFacebook },
  { href: "https://www.instagram.com/kanuby.mx/", etiqueta: "Instagram de Kanuby", Icono: IconoInstagram },
  { href: "https://mx.linkedin.com/company/kanuby", etiqueta: "LinkedIn de Kanuby", Icono: IconoLinkedin },
  {
    href: "https://wa.me/528115006365?text=Hola%20Kanuby!%20Estoy%20buscando%20una%20minibodega!%20",
    etiqueta: "Escribir a Kanuby por WhatsApp",
    Icono: IconoWhatsApp,
  },
  { href: "https://www.tiktok.com/@kanuby.mx", etiqueta: "TikTok de Kanuby", Icono: IconoTiktok },
];

const GL = "?_gl=1*1une87i*_gcl_au*MTUyNTMwOTQ1My4xNzQxNjE2MDYzLjE3MzA2Mzk3NjUuMTc0MTYyMTI0My4xNzQxNjIyOTAy";

export function CierreBlog() {
  return (
    <>
      <section className={styles.cierre}>
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
            {redes.map(({ href, etiqueta, Icono }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={etiqueta}>
                  <Icono />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.cierreColumna}>
          <p className={styles.cierreTitulo}>Descubre más</p>
          <ul className={styles.cierreLista}>
            <li>
              <a href={`https://app.kanuby.com/terms${GL}`}>Términos y Condiciones</a>
            </li>
            <li>
              <a href={`https://app.kanuby.com/privacy${GL}`} target="_blank" rel="noopener noreferrer">
                Política de Privacidad
              </a>
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
          <a href="tel:+5218115006365" className={styles.cta}>
            <span className={styles.ctaContenido}>
              <span className={styles.ctaTitulo}>¿Necesitas ayuda?</span>
              <span className={styles.ctaDescripcion}>Llámanos</span>
              <span className={styles.ctaNumero}>81 1500 6365</span>
            </span>
            <span className={styles.ctaImagen}>
              <Image
                src="/images/contactanos.png"
                alt="Camioneta naranja de Kanuby con el lema Rápido, fácil y seguro"
                width={1080}
                height={800}
                sizes="(max-width: 767px) 88vw, 21vw"
              />
            </span>
          </a>
        </div>
      </section>

      <div className={styles.creditos}>
        <a href="https://scndal.com" target="_blank" rel="noopener noreferrer" className={styles.webtag}>
          <Image
            src="/images/website-tag-editable.svg"
            alt="Sitio creado por SCNDAL"
            width={1746}
            height={208}
            sizes="(max-width: 767px) 173px, 231px"
          />
        </a>
        <p className={styles.copyright}>Copyright 2025. Kanuby© Todos los derechos reservados.</p>
      </div>
    </>
  );
}
