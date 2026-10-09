import Image from "next/image";
import Link from "next/link";
import styles from "./site-footer.module.css";

/*
 * Footer compartido con la estructura del de legacy: una sola tarjeta oscura
 * con el logo, el párrafo y "Descubre más", y abajo, dentro de la misma
 * tarjeta, la franja de créditos separada por una línea fina.
 */

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/mudanzas-monterrey/", texto: "Mudanzas en Monterrey" },
  { href: "/minibodegas-monterrey/", texto: "Minibodegas en Monterrey" },
  { href: "/mudanzas-empresariales-monterrey/", texto: "Movimiento de oficinas" },
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

          <nav className={styles.menu} aria-labelledby="footer-menu-titulo">
            <p id="footer-menu-titulo" className={styles.menuTitulo}>
              Descubre más
            </p>
            <ul className={styles.menuLista}>
              {enlaces.map((enlace) => (
                <li key={enlace.href}>
                  <Link href={enlace.href} className={styles.menuEnlace}>
                    {enlace.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.creditos}>
          <p className={styles.copyright}>© {año} Kanuby. Todos los derechos reservados.</p>
          <a
            href="https://scndal.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.webtag}
          >
            <Image
              src="/images/Black-webtag.png"
              alt="Created by SCNDAL"
              width={1814}
              height={221}
              sizes="150px"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
