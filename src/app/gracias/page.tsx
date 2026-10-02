import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import styles from "./page.module.css";

const titulo = "Gracias";
const ruta = "/gracias/";

export const metadata: Metadata = {
  title: titulo,
  alternates: { canonical: ruta },
  robots: { index: false, follow: true },
  openGraph: {
    type: "article",
    locale: "es_MX",
    url: ruta,
    siteName: "Kanuby",
    title: `${titulo} - Kanuby`,
  },
};

export default function Gracias() {
  return (
    <>
      <main className={styles.gracias}>
        <h1 className={styles.titulo}>¡Todo Listo!</h1>
        <div className={styles.texto}>
          <p>
            En unos minutos uno de nuestros agentes se pondrá en contacto contigo.{" "}
            <strong>¡Mantente al pendiente!</strong>
          </p>
          <p>¡Sigue mudándote con los expertos!</p>
        </div>
        <div className={styles.imagen}>
          <Image
            src="/images/ddddd.png"
            alt="Camión de mudanzas naranja de Kanuby con el lema “Tu vecino nunca aprenderá a cantar… Nosotros te mudamos”"
            width={2048}
            height={1365}
            sizes="(max-width: 767px) 80vw, 33vw"
            preload
          />
        </div>
        <Link href="/" className={styles.boton}>
          Volver al Inicio
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
