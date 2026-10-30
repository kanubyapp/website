import { Faq } from "@/components/faq";
import { IconoDuda } from "@/components/iconos";
import { BotonCotizar } from "@/components/mudanzas/boton-cotizar";
import type { Bloque, PreguntaFrecuente } from "@/lib/preguntas";

/*
 * Sección de preguntas frecuentes de las páginas de servicio (patrón kb-faq):
 * a la izquierda, la etiqueta, el título, el texto descriptivo y una tarjeta
 * clara con la frase, el ícono y el botón de cotizar, que abre el popup de
 * la página (su CotizacionProvider); a la derecha, el acordeón compartido con
 * una sola pregunta abierta a la vez. El JSON-LD de FAQPage lo pone cada
 * página con jsonLdPreguntas (lib/preguntas.ts).
 */

function Respuesta({ bloques }: { bloques: Bloque[] }) {
  return bloques.map((bloque, indice) =>
    Array.isArray(bloque) ? (
      <ul key={indice}>
        {bloque.map((elemento) => (
          <li key={elemento}>{elemento}</li>
        ))}
      </ul>
    ) : (
      <p key={indice}>
        {bloque.split("\n").map((linea, numero) => (
          <span key={numero}>
            {numero > 0 && <br />}
            {linea}
          </span>
        ))}
      </p>
    ),
  );
}

export function SeccionPreguntas({
  id = "faqs",
  descripcion,
  textoBoton,
  preguntas,
}: {
  id?: string;
  descripcion: string;
  textoBoton: string;
  preguntas: PreguntaFrecuente[];
}) {
  return (
    <section id={id} className="kb-faq">
      <div className="kb-faq-columna">
        <div className="kb-faq-fijo">
          <h2 className="kb-faq-etiqueta">Preguntas Frecuentes</h2>
          <p className="kb-faq-titulo">¿Alguna duda?</p>
          <p className="kb-faq-descripcion">{descripcion}</p>
          {/* Cierre de la columna: la frase y el botón en una tarjeta clara */}
          <div className="kb-tarjeta kb-cristal kb-faq-tarjeta">
            <div className="kb-faq-apoyo">
              <IconoDuda className="kb-faq-icono" />
              <p className="kb-faq-frase">Lo tenemos cubierto…</p>
            </div>
            <BotonCotizar texto={textoBoton} className="kb-boton-principal" />
          </div>
        </div>
      </div>
      <div className="kb-faq-preguntas">
        {/* Una sola abierta a la vez: abrir una cierra la anterior */}
        <Faq
          className="kb-faq-acordeon"
          preguntas={preguntas.map(({ pregunta, respuesta }) => ({
            pregunta,
            respuesta: <Respuesta bloques={respuesta} />,
          }))}
        />
      </div>
    </section>
  );
}
