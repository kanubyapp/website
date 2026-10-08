import Image from "next/image";
import Link from "next/link";
import styles from "./site-footer.module.css";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/mudanzas-monterrey/", texto: "Mudanzas en Monterrey" },
  { href: "/minibodegas-monterrey/", texto: "Minibodegas en Monterrey" },
  { href: "/mudanzas-empresariales-monterrey/", texto: "Movimiento de oficinas" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
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

        <div className={styles.imagen}>
          <Image
            src="/images/contactanos.png"
            alt="Camioneta naranja de Kanuby con el lema Rápido, fácil y seguro"
            width={1080}
            height={800}
            sizes="(max-width: 767px) 80vw, (max-width: 1024px) 60vw, 330px"
          />
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
            src="/images/Black-webtag.png"
            alt="Created by SCNDAL"
            width={1814}
            height={221}
            sizes="150px"
          />
        </a>
        <p className={styles.copyright}>
          Copyright 2025. Kanuby© Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
