"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { IconoMenu } from "@/components/iconos";
import { BotonCotizar } from "./boton-cotizar";
import styles from "@/app/mudanzas-monterrey/page.module.css";

/*
 * Header de las páginas de mudanzas: logo kanubymudanzas, anclas a las
 * secciones de la propia página y botón de cotización. Debajo de 768px el
 * menú pasa a pantalla completa.
 */

type Enlace = { href: string; texto: string };

export function HeaderMudanzas({
  enlaces,
  boton,
}: {
  enlaces: Enlace[];
  boton: { texto: string; subtexto: string };
}) {
  const [abierto, setAbierto] = useState(false);
  const botonAbrir = useRef<HTMLButtonElement>(null);
  const botonCerrar = useRef<HTMLButtonElement>(null);
  const idMenu = useId();

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
      <Link href="/" className={styles.headerLogo}>
        <Image
          src="/images/kanubymudanzas.svg"
          alt="Kanuby Mudanzas, ir al inicio"
          width={1024}
          height={100}
          sizes="250px"
          loading="eager"
        />
      </Link>

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
        aria-controls={idMenu}
        aria-label="Abrir menú"
        onClick={() => setAbierto(true)}
      >
        <IconoMenu />
      </button>

      <nav
        id={idMenu}
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

      <BotonCotizar
        texto={boton.texto}
        subtexto={boton.subtexto}
        className={styles.botonHeader}
      />
    </header>
  );
}
