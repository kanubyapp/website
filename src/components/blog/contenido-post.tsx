import Link from "next/link";
import type { BloquePost, Inline } from "@/lib/posts";

/*
 * Cuerpo de un post a partir de los bloques limpios de src/lib/posts.ts. Sin
 * estilos propios: cada página los da con su módulo. "desplazamiento" baja los
 * encabezados cuando el post va dentro de otra jerarquía (en las categorías,
 * el título del post ya es un h2).
 */

function Texto({ nodos }: { nodos: Inline[] }) {
  return nodos.map((nodo, indice) => {
    if (typeof nodo === "string") return nodo;
    if ("salto" in nodo) return <br key={indice} />;
    if ("negrita" in nodo)
      return (
        <strong key={indice}>
          <Texto nodos={nodo.negrita} />
        </strong>
      );
    if ("cursiva" in nodo)
      return (
        <em key={indice}>
          <Texto nodos={nodo.cursiva} />
        </em>
      );
    const contenido = <Texto nodos={nodo.texto} />;
    return nodo.enlace.startsWith("/") ? (
      <Link key={indice} href={nodo.enlace}>
        {contenido}
      </Link>
    ) : (
      <a key={indice} href={nodo.enlace}>
        {contenido}
      </a>
    );
  });
}

export function ContenidoPost({
  bloques,
  desplazamiento = 0,
  className,
}: {
  bloques: BloquePost[];
  desplazamiento?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {bloques.map((bloque, indice) => {
        switch (bloque.tipo) {
          case "titulo": {
            const Etiqueta = `h${Math.min(bloque.nivel + desplazamiento, 6)}` as "h2";
            return (
              <Etiqueta key={indice} data-estilo={bloque.estilo}>
                <Texto nodos={bloque.texto} />
              </Etiqueta>
            );
          }
          case "parrafo":
            return (
              <p key={indice}>
                <Texto nodos={bloque.texto} />
              </p>
            );
          case "lista": {
            const Lista = bloque.ordenada ? "ol" : "ul";
            return (
              <Lista key={indice}>
                {bloque.items.map((item, numero) => (
                  <li key={numero}>
                    <Texto nodos={item} />
                  </li>
                ))}
              </Lista>
            );
          }
          case "separador":
            return <hr key={indice} />;
        }
      })}
    </div>
  );
}
