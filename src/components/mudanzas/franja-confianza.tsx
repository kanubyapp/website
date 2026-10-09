import { IconoCaja, IconoEstrella, IconoMedalla, IconoRuta } from "@/components/iconos";

/*
 * Franja de confianza de las páginas de mudanzas, justo debajo del hero: una
 * tarjeta con cuatro puntos, cada uno con su ícono naranja y dos líneas
 * (el dato destacado y el detalle en gris claro).
 */

const puntos = [
  {
    dato: "+20 años",
    detalle: "Moviendo familias y empresas",
    Icono: IconoMedalla,
  },
  {
    dato: "Monterrey y a CDMX",
    detalle: "Mudanzas locales y nacionales",
    Icono: IconoRuta,
  },
  {
    dato: "Servicio completo",
    detalle: "Empacamos, cargamos y trasladamos",
    Icono: IconoCaja,
  },
];

export function FranjaConfianza() {
  return (
    <ul className="kb-tarjeta kb-confianza">
      <li className="kb-confianza-punto">
        <span className="kb-confianza-estrellas" role="img" aria-label="5 de 5 estrellas">
          {Array.from({ length: 5 }, (_, estrella) => (
            <IconoEstrella key={estrella} />
          ))}
        </span>
        <span className="kb-confianza-textos">
          <span className="kb-confianza-dato">4.9 en Google</span>
          <span className="kb-confianza-detalle">Basado en 120 opiniones</span>
        </span>
      </li>
      {puntos.map(({ dato, detalle, Icono }) => (
        <li key={dato} className="kb-confianza-punto">
          <Icono className="kb-confianza-icono" />
          <span className="kb-confianza-textos">
            <span className="kb-confianza-dato">{dato}</span>
            <span className="kb-confianza-detalle">{detalle}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
