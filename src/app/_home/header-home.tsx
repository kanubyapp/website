"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./header-home.module.css";

const enlaces = [
  { href: "/mudanzas-monterrey/", texto: "Mudanzas" },
  { href: "/minibodegas-monterrey/", texto: "Minibodegas" },
  { href: "/mudanzas-empresariales-monterrey/", texto: "Mudanza Empresarial" },
  { href: "https://kanubypack.com", texto: "Empaque y Embalaje" },
];

function Enlaces({ alElegir }: { alElegir?: () => void }) {
  return enlaces.map((enlace) => (
    <li key={enlace.href}>
      {enlace.href.startsWith("http") ? (
        <a href={enlace.href} className={styles.enlace} onClick={alElegir}>
          {enlace.texto}
        </a>
      ) : (
        <Link href={enlace.href} className={styles.enlace} onClick={alElegir}>
          {enlace.texto}
        </Link>
      )}
    </li>
  ));
}

export function HeaderHome() {
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
      <div className={`kb-vidrio ${styles.barra}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/kanuby-orange.svg"
            alt="Kanuby, ir al inicio"
            width={1593}
            height={338}
            sizes="(max-width: 767px) 120px, 140px"
            preload
          />
        </Link>

        <nav className={styles.menu} aria-label="Principal">
          <ul className={styles.lista}>
            <Enlaces />
          </ul>
        </nav>

        <button
          ref={botonAbrir}
          type="button"
          className={styles.abrir}
          aria-expanded={abierto}
          aria-controls="menu-movil-home"
          aria-label="Abrir menú"
          onClick={() => setAbierto(true)}
        >
          <svg viewBox="0 0 448 512" aria-hidden="true" focusable="false">
            <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
          </svg>
        </button>
      </div>

      {/*
        El menú móvil va fuera de la barra: el backdrop-filter del vidrio
        convertiría la barra en el contenedor de su position: fixed.
      */}
      <nav
        id="menu-movil-home"
        className={`kb-resplandor ${styles.movil}`}
        data-abierto={abierto}
        aria-label="Principal"
      >
        <button
          ref={botonCerrar}
          type="button"
          className={styles.cerrar}
          aria-label="Cerrar menú"
          onClick={cerrar}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <ul className={styles.listaMovil}>
          <Enlaces alElegir={() => setAbierto(false)} />
        </ul>
      </nav>
    </header>
  );
}
