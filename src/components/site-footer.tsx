import Image from "next/image";
import Link from "next/link";
import { IconoTelefonoLinea } from "@/components/iconos";
import styles from "./site-footer.module.css";

/*
 * Footer compartido con la estructura del de legacy: una sola tarjeta oscura
 * con cuatro columnas (Kanuby, Servicios, Más información y Contacto), y
 * abajo, dentro de la misma tarjeta, la franja de créditos separada por una
 * línea fina.
 */

const menus = [
  {
    id: "footer-servicios",
    titulo: "Servicios",
    enlaces: [
      { href: "/mudanzas-monterrey/", texto: "Mudanzas en Monterrey" },
      { href: "/mudanzas-monterrey-cdmx/", texto: "Mudanzas de Monterrey a CDMX" },
      { href: "/mudanzas-empresariales-monterrey/", texto: "Mudanzas empresariales" },
      { href: "/minibodegas-monterrey/", texto: "Minibodegas en Monterrey" },
    ],
  },
  {
    id: "footer-informacion",
    titulo: "Más información",
    enlaces: [
      { href: "/", texto: "Inicio" },
      { href: "/blog/", texto: "Blog" },
      { href: "https://kanubypack.com", texto: "Empaque y Embalaje" },
      { href: "/aviso-de-privacidad/", texto: "Aviso de privacidad" },
      { href: "/terminos-y-condiciones/", texto: "Términos y condiciones" },
    ],
  },
];

export function SiteFooter() {
  const año = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`kb-tarjeta ${styles.tarjeta}`}>
        <div className={styles.principal}>
          <div className={styles.marca}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/images/kanuby-white.svg"
                alt="Kanuby, ir al inicio"
                width={1593}
                height={338}
                sizes="160px"
              />
            </Link>
            <p className={styles.texto}>
              En Kanuby somos expertos en mudanzas para hogares y oficinas,
              contamos con minibodegas seguras para resguardar lo que más te
              importa, y proveemos de todo el material de empaque que necesites
              con KanubyPack. Confía en nuestra experiencia para darte una
              solución rápida, justa y a tu medida.
            </p>
          </div>

          {menus.map((menu) => (
            <nav key={menu.id} className={styles.menu} aria-labelledby={menu.id}>
              <p id={menu.id} className={styles.menuTitulo}>
                {menu.titulo}
              </p>
              <ul className={styles.menuLista}>
                {menu.enlaces.map((enlace) => (
                  <li key={enlace.href}>
                    {enlace.href.startsWith("http") ? (
                      <a href={enlace.href} className={styles.menuEnlace}>
                        {enlace.texto}
                      </a>
                    ) : (
                      <Link href={enlace.href} className={styles.menuEnlace}>
                        {enlace.texto}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.menu}>
            <p className={styles.menuTitulo}>Contacto</p>
            <a href="tel:+528110287087" className={`${styles.menuEnlace} ${styles.telefono}`}>
              <IconoTelefonoLinea className={styles.telefonoIcono} />
              81 1028 7087
            </a>
          </div>
        </div>

        <div className={styles.creditos}>
          <a
            href="https://scndal.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.webtag}
          >
            <Image
              src="/images/website-tag-editable-blanco.svg"
              alt="Created by SCNDAL"
              width={1813}
              height={221}
              sizes="(max-width: 767px) 160px, 190px"
            />
          </a>
          <p className={styles.copyright}>© {año} Kanuby. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
