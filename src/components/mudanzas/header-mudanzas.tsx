"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { IconoMenu } from "@/components/iconos";
import { TelefonoHeader } from "@/components/telefono-header";

/*
 * Header de las páginas de mudanzas: píldora de vidrio con el logo
 * kanubymudanzas, anclas a las secciones de la propia página y, a la derecha,
 * las acciones de cada página. Debajo de 768px el menú pasa a pantalla
 * completa.
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
    <header className={`kb-header ${className}`}>
      <div className="kb-vidrio kb-header-barra">
        <Link href="/" className="kb-header-logo">
          <Image
            src="/images/kanubymudanzas-blanco.svg"
            alt="Kanuby Mudanzas, ir al inicio"
            width={1024}
            height={100}
            sizes="250px"
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
          aria-controls={idMenu}
          aria-label="Abrir menú"
          onClick={() => setAbierto(true)}
        >
          <IconoMenu />
        </button>

        {acciones}
      </div>

      {/*
        El menú móvil va fuera de la barra: el backdrop-filter del vidrio
        convertiría la barra en el contenedor de su position: fixed.
      */}
      <nav
        id={idMenu}
        className="kb-header-movil"
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
      </nav>
    </header>
  );
}
