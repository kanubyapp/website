"use client";

import { useId, useState } from "react";
import { IconoChevronAbajo, IconoChevronDerecha } from "@/components/iconos";
import { alPulsar, type ModoAcordeon } from "@/lib/acordeon";

/*
 * Acordeón de preguntas frecuentes (raven-advanced-accordion de kanuby.com).
 * Pulsar una pregunta abierta la cierra (lib/acordeon.ts).
 *
 * - "grupo": un solo acordeón; abrir una pregunta cierra la anterior
 *   (/mudanzas-empresariales-monterrey/, abre con la segunda, y
 *   /minibodegas-monterrey/, todas cerradas al cargar).
 * - "independiente": cada pregunta es su propio acordeón y se abre y cierra
 *   por su cuenta (hoy ninguna página lo usa).
 */

export type Pregunta = { pregunta: string; respuesta: React.ReactNode };

function Item({
  item,
  id,
  activa,
  alAbrir,
}: {
  item: Pregunta;
  id: string;
  activa: boolean;
  alAbrir: () => void;
}) {
  return (
    <div className="kb-acordeon-item" data-activa={activa}>
      <h3 className="kb-acordeon-encabezado">
        <button
          type="button"
          id={`${id}-boton`}
          className="kb-acordeon-boton"
          aria-expanded={activa}
          aria-controls={`${id}-panel`}
          onClick={alAbrir}
        >
          <span className="kb-acordeon-titulo">{item.pregunta}</span>
          {activa ? (
            <IconoChevronAbajo className="kb-acordeon-icono" />
          ) : (
            <IconoChevronDerecha className="kb-acordeon-icono" />
          )}
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-boton`}
        className="kb-acordeon-cuerpo"
        hidden={!activa}
      >
        {item.respuesta}
      </div>
    </div>
  );
}

export function Faq({
  preguntas,
  modo = "grupo",
  inicial = -1,
  className = "",
}: {
  preguntas: Pregunta[];
  modo?: ModoAcordeon;
  /** Índice abierto al cargar, en modo grupo */
  inicial?: number;
  className?: string;
}) {
  const id = useId();
  const [abiertas, setAbiertas] = useState<number[]>(inicial >= 0 ? [inicial] : []);

  function abrir(indice: number) {
    setAbiertas((actuales) => alPulsar(actuales, indice, modo));
  }

  const items = preguntas.map((item, indice) => (
    <Item
      key={item.pregunta}
      item={item}
      id={`${id}-${indice}`}
      activa={abiertas.includes(indice)}
      alAbrir={() => abrir(indice)}
    />
  ));

  if (modo === "grupo") {
    return <div className={`kb-acordeon ${className}`}>{items}</div>;
  }

  return (
    <div className={`kb-acordeones ${className}`}>
      {items.map((item) => (
        <div key={item.key} className="kb-acordeon">
          {item}
        </div>
      ))}
    </div>
  );
}
