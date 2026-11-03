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
import Link from "next/link";

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

/*
 * Imagen del hero que comparten las páginas de mudanzas y /social/. Es el
 * LCP en celular y casi siempre en escritorio: precarga y prioridad alta.
 * sizes, medido: el 92% del ancho en móvil y la columna de la imagen
 * (50.7vw - 28px) desde 768px; /mudanzas-monterrey-cdmx/ la lleva más
 * angosta y pasa el suyo.
 */
export const IMAGEN_HERO = {
  src: "/images/ddddd.png",
  alt: "Camión de mudanzas naranja de Kanuby con el lema “Tu vecino nunca aprenderá a cantar… Nosotros te mudamos”",
  width: 2048,
  height: 1365,
  sizes: "(max-width: 767px) 92vw, calc(50.7vw - 28px)",
};

type ImagenHero = Omit<typeof IMAGEN_HERO, "sizes"> & {
  sizes: string;
  className?: string;
  /**
   * Sin precarga ni prioridad, cuando la imagen no es el LCP (en
   * /mudanzas-monterrey/ lo es el fondo del hero): carga diferida, que en la
   * primera pantalla empieza en cuanto se pinta. No eager: React precarga en
   * el <head> toda imagen que no sea diferida, aunque quede fuera de la
   * primera pantalla (a 320x568, el camión).
   */
  secundaria?: boolean;
};

export function HeroMudanzas({
  titulo,
  decoracion,
  claseTitulo = "kb-hero-titulo",
  texto,
  boton,
  fondoImagen,
  imagen = IMAGEN_HERO,
  fondo,
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
  /** Otra imagen principal para una página; sin ella, la compartida */
  imagen?: ImagenHero;
  /** Imagen de fondo de todo el hero, detrás del texto y la imagen */
  fondo?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`kb-hero ${className}`}>
      {fondo}
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
          src={imagen.src}
          alt={imagen.alt}
          width={imagen.width}
          height={imagen.height}
          sizes={imagen.sizes}
          className={imagen.className}
          {...(!imagen.secundaria && { preload: true, fetchPriority: "high" as const })}
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
        {/* Lema de la sección, no un encabezado: el H2 es el título que le sigue */}
        <p className="kb-porque-antetitulo">{antetitulo}</p>
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
                  // Medido: 36.8vw - 16px en móvil (tres por fila) y 18.4vw - 49px desde 768px
                  sizes="(max-width: 767px) calc(36.8vw - 16px), calc(18.4vw - 49px)"
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
        // Decorativa, bajo el velo oscuro: con calidad 40 no se nota y pesa un tercio menos
        quality={40}
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
 * fijo de TONOS_SERVICIOS; el azul es vidrio. Las que tienen página propia
 * son enlaces a ella (salvo en esa misma página): el nombre es el enlace y
 * cubre toda la tarjeta, que se ve igual. Las demás no enlazan.
 */

const SERVICIOS: { nombre: string; descripcion: string; Icono: PhosphorIcon; ruta?: string }[] = [
  {
    nombre: "Mudanza local",
    descripcion: "Casas y departamentos dentro de Monterrey.",
    Icono: House,
    ruta: "/mudanzas-monterrey/",
  },
  {
    nombre: "Mudanza a CDMX",
    descripcion: "De Monterrey a CDMX y de regreso.",
    Icono: MapTrifold,
    ruta: "/mudanzas-monterrey-cdmx/",
  },
  {
    nombre: "Mudanza empresarial",
    descripcion: "Oficinas y negocios sin detener tu operación.",
    Icono: Buildings,
    ruta: "/mudanzas-empresariales-monterrey/",
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
    ruta: "/minibodegas-monterrey/",
  },
  { nombre: "Material de empaque", descripcion: "Cajas, cinta y más con KanubyPack.", Icono: Scissors },
  { nombre: "Fletes", descripcion: "Traslado de piezas grandes.", Icono: Truck },
];

export function ServiciosMudanzas({
  id,
  titulo,
  texto,
  pagina,
  className = "",
}: {
  id?: string;
  titulo: string;
  texto: string;
  /** La ruta de la página que la muestra: su propia tarjeta no se enlaza */
  pagina: string;
  className?: string;
}) {
  return (
    <section id={id} className={`kb-servicios ${className}`}>
      <div className="kb-servicios-intro">
        <h2 className="kb-servicios-titulo">{titulo}</h2>
        <p className="kb-servicios-texto">{texto}</p>
      </div>
      <ul className="kb-servicios-rejilla">
        {SERVICIOS.map(({ nombre, descripcion, Icono, ruta }, indice) => (
          <li key={nombre} className="kb-tarjeta kb-servicio">
            <span
              className={`kb-servicio-icono${TONOS_SERVICIOS[indice] === "azul" ? " kb-vidrio" : ""}`}
              data-tono={TONOS_SERVICIOS[indice]}
            >
              <Icono weight="duotone" aria-hidden="true" />
            </span>
            <h3 className="kb-servicio-nombre">
              {ruta && ruta !== pagina ? (
                <Link href={ruta} className="kb-servicio-enlace">
                  {nombre}
                </Link>
              ) : (
                nombre
              )}
            </h3>
            <p className="kb-servicio-descripcion">{descripcion}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
