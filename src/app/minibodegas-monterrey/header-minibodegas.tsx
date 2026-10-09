"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconoMenu } from "@/components/iconos";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import { TelefonoHeader } from "@/components/telefono-header";
import styles from "./page.module.css";

/*
 * Header propio de minibodegas (template 5436 de kanuby.com): tarjeta blanca
 * redondeada con logo naranja, anclas a las secciones de la página y botón
 * "Cotiza Ahora" que abre el formulario de minibodega. Debajo de 768px el menú
 * pasa a pantalla completa.
 */

const enlaces = [
  { href: "#porque", texto: "¿Por qué Kanuby?" },
  { href: "#tamanos", texto: "Tamaños" },
  { href: "#clientes", texto: "Clientes Felices" },
  { href: "#faqs", texto: "Preguntas Frecuentes" },
];

export function HeaderMinibodegas() {
  const [abierto, setAbierto] = useState(false);
  const botonAbrir = useRef<HTMLButtonElement>(null);
  const botonCerrar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!abierto) return;
    botonCerrar.current?.focus();

    const alTeclear = (evento: KeyboardEvent) => {
      if (evento.key !== "Escape") return;
      setAbierto(false);
      botonAbrir.current?.focus();
    };
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  function cerrar() {
    setAbierto(false);
    botonAbrir.current?.focus();
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerTarjeta}>
        <Link href="/" className={styles.headerLogo}>
          <Image
            src="/images/kanuby-orange.svg"
            alt="Kanuby, ir al inicio"
            width={1593}
            height={338}
            sizes="150px"
            loading="eager"
          />
        </Link>

        <TelefonoHeader />

        <nav className={styles.headerMenu} aria-label="Secciones">
          <ul className={styles.headerLista}>
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a href={enlace.href} className={styles.headerEnlace}>
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={botonAbrir}
          type="button"
          className={styles.headerAbrir}
          aria-expanded={abierto}
          aria-controls="menu-movil-minibodegas"
          aria-label="Abrir menú"
          onClick={() => setAbierto(true)}
        >
          <IconoMenu />
        </button>

        <nav
          id="menu-movil-minibodegas"
          className={styles.headerMovil}
          data-abierto={abierto}
          aria-label="Secciones"
        >
          <button
            ref={botonCerrar}
            type="button"
            className={styles.headerCerrar}
            aria-label="Cerrar menú"
            onClick={cerrar}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <ul className={styles.headerListaMovil}>
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a
                  href={enlace.href}
                  className={styles.headerEnlaceMovil}
                  onClick={() => setAbierto(false)}
                >
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <BotonCotizar texto="Cotiza Ahora" className={styles.headerBoton} />
      </div>
    </header>
  );
}
