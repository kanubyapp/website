"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { IconoChevronAbajo, IconoMenu, IconoWhatsApp } from "@/components/iconos";
import { TelefonoHeader } from "@/components/telefono-header";
import { useHeaderCompacto } from "@/components/use-header-compacto";
import type { Negocio } from "@/lib/conversiones";
import styles from "@/app/[slug]/page.module.css";

/*
 * Header de los posts: píldora de vidrio con el logo, el teléfono, el menú con
 * dos submenús (Mudanzas y Minibodegas → Monterrey) y el botón "Cotiza Aquí",
 * que lleva a WhatsApp con el mensaje de minibodega (en pendientes). Debajo
 * de 768px la barra queda en una sola fila (logo, teléfono y menú) y el menú
 * pasa a pantalla completa, fuera de la barra de vidrio, con "Cotiza Aquí" al
 * final. Es sticky y se compacta al bajar.
 */

const menu = [
  { texto: "Mudanzas", hijos: [{ href: "/mudanzas-monterrey/", texto: "Monterrey" }] },
  { texto: "Minibodegas", hijos: [{ href: "/minibodegas-monterrey/", texto: "Monterrey" }] },
];

const COTIZA_AQUI =
  "https://wa.me/528115006365?text=Hola%20Kanuby!%20Estoy%20buscando%20una%20minibodega!%20";

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

/* negocio: el del post según su categoría, para el evento de "Cotiza Aquí" */
export function HeaderBlog({ negocio }: { negocio: Negocio | null }) {
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
          <EnlaceWhatsApp
            href={COTIZA_AQUI}
            negocio={negocio}
            target="_blank"
            rel="noopener noreferrer"
            className={`kb-boton-principal ${styles.headerBoton}`}
          >
            <IconoWhatsApp className={styles.headerBotonIcono} />
            Cotiza Aquí
          </EnlaceWhatsApp>
        </div>
      </div>

      {/*
        El menú móvil va fuera de la barra: el backdrop-filter del vidrio
        convertiría la barra en el contenedor de su position: fixed.
      */}
      <nav id={idMenu} className={styles.headerMovil} data-abierto={abierto} aria-label="Principal">
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
          <EnlaceWhatsApp
            href={COTIZA_AQUI}
            negocio={negocio}
            target="_blank"
            rel="noopener noreferrer"
            className={`kb-boton-principal ${styles.headerBoton}`}
          >
            <IconoWhatsApp className={styles.headerBotonIcono} />
            Cotiza Aquí
          </EnlaceWhatsApp>
        </div>
      </nav>
    </header>
  );
}
