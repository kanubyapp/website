"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Post } from "@/lib/posts";
import styles from "./carrusel-noticias.module.css";

/*
 * Carrusel de posts de la home. En kanuby.com es un Swiper sin autoplay, sin
 * bucle, sin flechas ni puntos: solo se navega arrastrando. Aquí el
 * desplazamiento es nativo con scroll-snap (táctil, trackpad y teclado) y el
 * arrastre con ratón se añade a mano.
 */
export function CarruselNoticias({ posts }: { posts: Post[] }) {
  const pista = useRef<HTMLUListElement>(null);
  const arrastre = useRef({ activo: false, inicioX: 0, inicioScroll: 0, movido: false });

  function alPresionar(evento: React.PointerEvent<HTMLUListElement>) {
    if (evento.pointerType !== "mouse" || evento.button !== 0 || !pista.current) return;
    arrastre.current = {
      activo: true,
      inicioX: evento.clientX,
      inicioScroll: pista.current.scrollLeft,
      movido: false,
    };
  }

  function alMover(evento: React.PointerEvent<HTMLUListElement>) {
    const estado = arrastre.current;
    if (!estado.activo || !pista.current) return;
    const distancia = evento.clientX - estado.inicioX;
    if (!estado.movido && Math.abs(distancia) < 5) return;
    if (!estado.movido) {
      estado.movido = true;
      pista.current.setPointerCapture(evento.pointerId);
      pista.current.dataset.arrastrando = "true";
    }
    pista.current.scrollLeft = estado.inicioScroll - distancia;
  }

  function alSoltar() {
    arrastre.current.activo = false;
    if (pista.current) delete pista.current.dataset.arrastrando;
  }

  function alHacerClic(evento: React.MouseEvent<HTMLUListElement>) {
    // Un arrastre no debe abrir el post sobre el que se soltó.
    if (arrastre.current.movido) {
      evento.preventDefault();
      arrastre.current.movido = false;
    }
  }

  return (
    <ul
      ref={pista}
      className={styles.pista}
      aria-label="Últimas noticias"
      onPointerDown={alPresionar}
      onPointerMove={alMover}
      onPointerUp={alSoltar}
      onPointerCancel={alSoltar}
      onClickCapture={alHacerClic}
      onDragStart={(evento) => evento.preventDefault()}
    >
      {posts.map((post) => (
        <li key={post.slug} className={styles.slide}>
          <article className={styles.tarjeta}>
            {post.imagen && (
              <div className={styles.imagen}>
                <Image
                  src={post.imagen.src}
                  alt={post.imagen.alt}
                  width={post.imagen.width}
                  height={post.imagen.height}
                  sizes="(min-width: 1024px) 23vw, (min-width: 768px) 45vw, 85vw"
                />
              </div>
            )}
            <span className={styles.capa} aria-hidden="true" />
            <div className={styles.contenido}>
              <h3 className={styles.titulo}>
                <Link href={`/${post.slug}`}>{post.titulo}</Link>
              </h3>
              <Link href={`/${post.slug}`} className={styles.leerMas} tabIndex={-1} aria-hidden="true">
                Leer más
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
