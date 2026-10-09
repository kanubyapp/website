"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { IconoMenu } from "@/components/iconos";
import { useHeaderCompacto } from "@/components/use-header-compacto";
import { TelefonoHeader } from "@/components/telefono-header";

/*
 * Header de las páginas de mudanzas: píldora de vidrio sticky con el logo
 * kanubymudanzas, anclas a las secciones de la propia página y, a la derecha,
 * las acciones de cada página. Al bajar se compacta (useHeaderCompacto).
 * Debajo de 768px la barra queda en una sola fila (logo, teléfono y menú) y
 * el menú pasa a pantalla completa con las acciones.
 */

type Enlace = { href: string; texto: string };

export function HeaderMudanzas({
  enlaces,
  acciones,
  className = "",
}: {
  enlaces: Enlace[];
  acciones: React.ReactNode;
  className?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const botonAbrir = useRef<HTMLButtonElement>(null);
  const botonCerrar = useRef<HTMLButtonElement>(null);
  const idMenu = useId();
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
    <header ref={elementoHeader} className={`kb-header kb-header-una-fila ${className}`}>
      <div ref={barra} className="kb-vidrio kb-cristal-liquido kb-header-barra">
        {/* Sobre el cristal blanco del header compacto va el logo original */}
        <Link href="/" className="kb-header-logo">
          <Image
            src="/images/kanubymudanzas-blanco.svg"
            alt="Kanuby Mudanzas, ir al inicio"
            width={1024}
            height={100}
            sizes="250px"
            loading="eager"
            className="kb-header-logo-normal"
          />
          <Image
            src="/images/kanubymudanzas.svg"
            alt="Kanuby Mudanzas, ir al inicio"
            width={1024}
            height={100}
            sizes="200px"
            className="kb-header-logo-compacto"
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
          aria-controls={idMenu}
          aria-label="Abrir menú"
          onClick={() => setAbierto(true)}
        >
          <IconoMenu />
        </button>

        {/* En móvil, con el header compacto, las acciones pasan al menú */}
        <div className="kb-header-acciones">{acciones}</div>
      </div>

      {/*
        El menú móvil va fuera de la barra: el backdrop-filter del vidrio
        convertiría la barra en el contenedor de su position: fixed.
      */}
      <nav
        id={idMenu}
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
        <div className="kb-header-acciones-movil">{acciones}</div>
      </nav>
    </header>
  );
}
