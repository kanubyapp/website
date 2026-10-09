"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconoMenu } from "@/components/iconos";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import { TelefonoHeader } from "@/components/telefono-header";
import { useHeaderCompacto } from "@/components/use-header-compacto";
import styles from "./page.module.css";

/*
 * Header de minibodegas: la píldora de vidrio de las páginas de mudanzas
 * (patrón kb-header) con el logo naranja, el teléfono, las anclas a las
 * secciones de la página y "Cotiza Ahora", que abre el formulario de
 * minibodega. Es sticky y se compacta al bajar (useHeaderCompacto). Debajo de
 * 768px la barra queda en una sola fila (logo, teléfono y menú) y el menú
 * pasa a pantalla completa con "Cotiza Ahora".
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
  const elementoHeader = useRef<HTMLElement>(null);
  const barra = useRef<HTMLDivElement>(null);
  useHeaderCompacto(elementoHeader, barra);

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
    <header ref={elementoHeader} className={`kb-header kb-header-una-fila ${styles.header}`}>
      <div ref={barra} className="kb-vidrio kb-cristal-liquido kb-header-barra">
        <Link href="/" className="kb-header-logo">
          <Image
            src="/images/kanuby-orange.svg"
            alt="Kanuby, ir al inicio"
            width={1593}
            height={338}
            sizes="(max-width: 767px) 120px, 140px"
            loading="eager"
          />
        </Link>

        <TelefonoHeader />

        <nav className="kb-header-menu" aria-label="Secciones">
          <ul className="kb-header-lista">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a href={enlace.href} className="kb-header-enlace">
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={botonAbrir}
          type="button"
          className="kb-header-abrir"
          aria-expanded={abierto}
          aria-controls="menu-movil-minibodegas"
          aria-label="Abrir menú"
          onClick={() => setAbierto(true)}
        >
          <IconoMenu />
        </button>

        {/* En móvil, con el header compacto, la acción pasa al menú */}
        <div className="kb-header-acciones">
          <BotonCotizar
            texto="Cotiza Ahora"
            className={`kb-boton-principal ${styles.headerBoton}`}
          />
        </div>
      </div>

      {/*
        El menú móvil va fuera de la barra: el backdrop-filter del vidrio
        convertiría la barra en el contenedor de su position: fixed.
      */}
      <nav
        id="menu-movil-minibodegas"
        className="kb-header-movil"
        data-lenis-prevent
        data-abierto={abierto}
        aria-label="Secciones"
      >
        <button
          ref={botonCerrar}
          type="button"
          className="kb-header-cerrar"
          aria-label="Cerrar menú"
          onClick={cerrar}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <ul className="kb-header-lista-movil">
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <a
                href={enlace.href}
                className="kb-header-enlace-movil"
                onClick={() => setAbierto(false)}
              >
                {enlace.texto}
              </a>
            </li>
          ))}
        </ul>
        <div className="kb-header-acciones-movil">
          <BotonCotizar
            texto="Cotiza Ahora"
            className={`kb-boton-principal ${styles.headerBoton}`}
          />
        </div>
      </nav>
    </header>
  );
}
