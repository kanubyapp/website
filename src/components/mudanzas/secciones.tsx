import {
  Armchair,
  Buildings,
  House,
  Lightning,
  MapTrifold,
  Package,
  Scissors,
  Truck,
  Warehouse,
  Wine,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { TONOS_SERVICIOS } from "@/lib/tonos-servicios";
import Image from "next/image";

/*
 * Secciones que comparten las páginas de mudanzas de kanuby.com: hero,
 * "Por qué", marquesina y servicios. El texto y los botones llegan por
 * props; los estilos son los patrones kb-* y cada página ajusta lo suyo con
 * la className de la sección.
 */

type Tarjeta = {
  icono: string;
  alt: string;
  titulo: string;
  texto: string;
};

export function HeroMudanzas({
  titulo,
  decoracion,
  claseTitulo = "kb-hero-titulo",
  texto,
  boton,
  fondoImagen,
  className = "",
}: {
  titulo: React.ReactNode;
  /**
   * Titular decorativo sobre el divisor, oculto para lectores de pantalla
   * (el rotativo de /mudanzas-monterrey-cdmx/). Con él, el H1 va bajo el divisor.
   */
  decoracion?: React.ReactNode;
  claseTitulo?: string;
  texto: string;
  boton: React.ReactNode;
  /** Imagen detrás de la foto principal (el mapa en /mudanzas-monterrey-cdmx/) */
  fondoImagen?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`kb-hero ${className}`}>
      <div className="kb-hero-contenido">
        {decoracion ? (
          <div className="kb-hero-titulo" aria-hidden="true">
            {decoracion}
          </div>
        ) : (
          <h1 className={claseTitulo}>{titulo}</h1>
        )}
        <div className="kb-hero-divisor" aria-hidden="true">
          <span />
        </div>
        {decoracion && <h1 className={claseTitulo}>{titulo}</h1>}
        <p className="kb-hero-texto">{texto}</p>
        {boton}
      </div>
      <div className="kb-hero-imagen">
        {fondoImagen}
        <Image
          src="/images/ddddd.png"
          alt="Camión de mudanzas naranja de Kanuby con el lema “Tu vecino nunca aprenderá a cantar… Nosotros te mudamos”"
          width={2048}
          height={1365}
          sizes="(max-width: 767px) 92vw, 51vw"
          preload
        />
      </div>
    </section>
  );
}

export function PorQueMudanzas({
  id,
  antetitulo,
  titulo,
  etiqueta,
  tarjetas,
  className = "",
}: {
  id?: string;
  antetitulo: string;
  titulo: string;
  etiqueta: string;
  tarjetas: Tarjeta[];
  className?: string;
}) {
  return (
    <section id={id} className={`kb-porque ${className}`}>
      <div className="kb-porque-contenido">
        <h3 className="kb-porque-antetitulo">{antetitulo}</h3>
        <h2 className="kb-porque-titulo">{titulo}</h2>
        <p className="kb-porque-etiqueta">{etiqueta}</p>
        <div className="kb-porque-tarjetas">
          {tarjetas.map((tarjeta) => (
            <div key={tarjeta.titulo} className="kb-tarjeta kb-porque-tarjeta">
              <figure className="kb-porque-icono">
                <Image
                  src={tarjeta.icono}
                  alt={tarjeta.alt}
                  width={1080}
                  height={1080}
                  sizes="(max-width: 767px) 40vw, 16vw"
                />
              </figure>
              <h3 className="kb-porque-tarjeta-titulo">{tarjeta.titulo}</h3>
              <p className="kb-porque-tarjeta-texto">{tarjeta.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Marquesina({ items, className = "" }: { items: string[]; className?: string }) {
  const lista = (oculta: boolean) => (
    <ul className="kb-marquesina-items" aria-hidden={oculta || undefined}>
      {items.map((item) => (
        <li key={item} className="kb-marquesina-item">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <section className={`kb-marquesina ${className}`}>
      <Image
        src="/images/pr2.png"
        alt=""
        width={1000}
        height={1000}
        sizes="100vw"
        className="kb-marquesina-fondo"
      />
      <div className="kb-marquesina-pista">
        {lista(false)}
        {lista(true)}
      </div>
      <span className="kb-marquesina-degradado-izq" aria-hidden="true" />
      <span className="kb-marquesina-degradado-der" aria-hidden="true" />
    </section>
  );
}

/*
 * Servicios de mudanzas: el título y la introducción, centrados, y una rejilla
 * de 10 tarjetas compactas (5 columnas en escritorio, 3 en tablet, 2 en
 * móvil). Los íconos son de Phosphor (licencia MIT), en su peso duotono.
 * Cada cuadro lleva uno de tres tonos (naranja, azul o blanco) en el orden
 * fijo de TONOS_SERVICIOS; el azul es vidrio. Las tarjetas no son enlaces.
 */

const SERVICIOS: { nombre: string; descripcion: string; Icono: PhosphorIcon }[] = [
  { nombre: "Mudanza local", descripcion: "Casas y departamentos dentro de Monterrey.", Icono: House },
  { nombre: "Mudanza a CDMX", descripcion: "De Monterrey a CDMX y de regreso.", Icono: MapTrifold },
  {
    nombre: "Mudanza empresarial",
    descripcion: "Oficinas y negocios sin detener tu operación.",
    Icono: Buildings,
  },
  { nombre: "Mudanza urgente", descripcion: "Cuando necesitas mudarte ya.", Icono: Lightning },
  {
    nombre: "Empaque y desempaque",
    descripcion: "Empacamos todo y lo acomodamos al llegar.",
    Icono: Package,
  },
  { nombre: "Objetos frágiles", descripcion: "Embalaje especial para lo delicado.", Icono: Wine },
  { nombre: "Armado de muebles", descripcion: "Desarmamos y armamos tus muebles.", Icono: Armchair },
  {
    nombre: "Mudanza con minibodega",
    descripcion: "Guardamos tus cosas mientras te instalas.",
    Icono: Warehouse,
  },
  { nombre: "Material de empaque", descripcion: "Cajas, cinta y más con KanubyPack.", Icono: Scissors },
  { nombre: "Fletes", descripcion: "Traslado de piezas grandes.", Icono: Truck },
];

export function ServiciosMudanzas({
  id,
  titulo,
  texto,
  className = "",
}: {
  id?: string;
  titulo: string;
  texto: string;
  className?: string;
}) {
  return (
    <section id={id} className={`kb-servicios ${className}`}>
      <div className="kb-servicios-intro">
        <h2 className="kb-servicios-titulo">{titulo}</h2>
        <p className="kb-servicios-texto">{texto}</p>
      </div>
      <ul className="kb-servicios-rejilla">
        {SERVICIOS.map(({ nombre, descripcion, Icono }, indice) => (
          <li key={nombre} className="kb-tarjeta kb-servicio">
            <span
              className={`kb-servicio-icono${TONOS_SERVICIOS[indice] === "azul" ? " kb-vidrio" : ""}`}
              data-tono={TONOS_SERVICIOS[indice]}
            >
              <Icono weight="duotone" aria-hidden="true" />
            </span>
            <h3 className="kb-servicio-nombre">{nombre}</h3>
            <p className="kb-servicio-descripcion">{descripcion}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
