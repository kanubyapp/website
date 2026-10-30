"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { IconoChevronAbajo, IconoMenu } from "@/components/iconos";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import { CotizacionProvider } from "@/components/mudanzas/cotizacion";
import { TelefonoHeader } from "@/components/telefono-header";
import { useHeaderCompacto } from "@/components/use-header-compacto";
import type { Negocio } from "@/lib/conversiones";
import styles from "@/app/[slug]/page.module.css";

/*
 * Header de los posts: píldora de vidrio con el logo, el teléfono, el menú con
 * dos submenús (Mudanzas y Minibodegas → Monterrey) y "Cotiza Ahora", el de
 * los demás headers: abre el popup de cotización en el servicio del contenido
 * o, si no se sabe, en el paso de elegir entre mudanza y minibodega (como el
 * header de la home). Debajo de 768px la barra queda en una sola fila (logo,
 * teléfono y menú) y el menú pasa a pantalla completa, fuera de la barra de
 * vidrio, con "Cotiza Ahora" al final. Es sticky y se compacta al bajar.
 */

const menu = [
  { texto: "Mudanzas", hijos: [{ href: "/mudanzas-monterrey/", texto: "Monterrey" }] },
  { texto: "Minibodegas", hijos: [{ href: "/minibodegas-monterrey/", texto: "Monterrey" }] },
];

function Submenu({ texto, hijos }: (typeof menu)[number]) {
  const [abierto, setAbierto] = useState(false);
  const id = useId();
  return (
    <li
      className={styles.headerItem}
      data-abierto={abierto}
      onMouseEnter={() => setAbierto(true)}
      onMouseLeave={() => setAbierto(false)}
      onBlur={(evento) => {
        if (!evento.currentTarget.contains(evento.relatedTarget as Node)) setAbierto(false);
      }}
    >
      <button
        type="button"
        className={styles.headerEnlace}
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto((actual) => !actual)}
      >
        {texto}
        <IconoChevronAbajo className={styles.headerFlecha} />
      </button>
      <ul id={id} className={styles.headerSubmenu}>
        {hijos.map((hijo) => (
          <li key={hijo.href}>
            <Link href={hijo.href} className={styles.headerSubenlace}>
              {hijo.texto}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

/*
 * servicio: el que deja claro el contenido (servicioDePost), con el que abre
 * el popup; null si no se sabe (índice del blog, posts sin categoría,
 * legales): el popup pregunta primero.
 */
export function HeaderBlog({ servicio }: { servicio: Negocio | null }) {
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
    <CotizacionProvider tipo={servicio ?? "eleccion"}>
      <header ref={elementoHeader} className={styles.header}>
        <div ref={barra} className={`kb-vidrio kb-cristal-liquido ${styles.headerBarra}`}>
          <Link href="/" className={styles.headerLogo}>
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

          <nav className={styles.headerMenu} aria-label="Principal">
            <ul className={styles.headerLista}>
              {menu.map((item) => (
                <Submenu key={item.texto} {...item} />
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

          {/* En móvil la acción pasa al menú */}
          <div className={styles.headerAcciones}>
            <BotonCotizar
              texto="Cotiza Ahora"
              className="kb-boton-principal kb-boton-header-corto kb-boton-naranja-oscuro"
            />
          </div>
        </div>

        {/*
        El menú móvil va fuera de la barra: el backdrop-filter del vidrio
        convertiría la barra en el contenedor de su position: fixed.
      */}
        <nav
          id={idMenu}
          className={styles.headerMovil}
          data-abierto={abierto}
          data-lenis-prevent
          aria-label="Principal"
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
            {menu.map((item) => (
              <li key={item.texto}>
                <span className={styles.headerEnlaceMovil}>{item.texto}</span>
                <ul>
                  {item.hijos.map((hijo) => (
                    <li key={hijo.href}>
                      <Link
                        href={hijo.href}
                        className={styles.headerSubenlaceMovil}
                        onClick={() => setAbierto(false)}
                      >
                        {hijo.texto}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className={styles.headerAccionesMovil}>
            <BotonCotizar
              texto="Cotiza Ahora"
              className="kb-boton-principal kb-boton-header-corto kb-boton-naranja-oscuro"
            />
          </div>
        </nav>
      </header>
    </CotizacionProvider>
  );
}
