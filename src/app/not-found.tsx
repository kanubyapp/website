import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";

/*
 * 404 de todo el sitio, con el texto de la de legacy: logo al inicio, la
 * ilustración, el mensaje y el botón para volver. Next agrega el noindex a
 * las respuestas 404.
 */

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <main className={`kb-resplandor ${styles.pagina}`}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/images/kanuby-white.svg"
          alt="Kanuby, ir al inicio"
          width={1593}
          height={338}
          sizes="160px"
        />
      </Link>
      <Image
        src="/images/404-kanuby.webp"
        alt=""
        width={641}
        height={426}
        sizes="(max-width: 767px) 92vw, 641px"
        className={styles.ilustracion}
        preload
      />
      <h1 className={styles.titulo}>No encontramos esta página pero...</h1>
      <p className={styles.texto}>Lo mejor es volver al inicio</p>
      <Link href="/" className="kb-boton-principal">
        Volver al inicio
      </Link>
    </main>
  );
}
