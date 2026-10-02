import Image from "next/image";

/*
 * Secciones que comparten las páginas de mudanzas de kanuby.com: hero con
 * olas, "Por qué", marquesina y servicios. El texto y los botones llegan por
 * props; los estilos son los patrones kb-* y cada página ajusta lo suyo con
 * la className de la sección.
 */

type Tarjeta = {
  icono: string;
  alt: string;
  titulo: string;
  texto: string;
};

/* Forma "waves" de Elementor, al pie del hero. */
function Olas() {
  return (
    <div className="kb-hero-olas" aria-hidden="true">
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z" />
      </svg>
    </div>
  );
}

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
      <Olas />
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
          sizes="(max-width: 767px) 84vw, 46vw"
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
            <div key={tarjeta.titulo} className="kb-porque-tarjeta">
              <figure className="kb-porque-icono">
                <Image
                  src={tarjeta.icono}
                  alt={tarjeta.alt}
                  width={1080}
                  height={1080}
                  sizes="(max-width: 767px) 35vw, 19vw"
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

export function ServiciosMudanzas({
  id,
  titulo,
  texto,
  boton,
  tarjetas,
  sizesTarjeta = "(max-width: 767px) 67vw, 25vw",
  className = "",
}: {
  id?: string;
  titulo: string;
  texto: string;
  boton: React.ReactNode;
  tarjetas: Tarjeta[];
  sizesTarjeta?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`kb-servicios ${className}`}>
      <div className="kb-servicios-cabecera">
        <div className="kb-servicios-intro">
          <h2 className="kb-servicios-titulo">{titulo}</h2>
          <p className="kb-servicios-texto">{texto}</p>
          {boton}
        </div>
        <div className="kb-servicios-imagen">
          <Image
            src="/images/ddddd.png"
            alt="Camión de mudanzas naranja de Kanuby"
            width={2048}
            height={1365}
            sizes="(max-width: 767px) 84vw, 31vw"
          />
        </div>
      </div>
      <div className="kb-servicios-tarjetas">
        {tarjetas.map((tarjeta) => (
          <div key={tarjeta.titulo} className="kb-servicio-tarjeta">
            <figure className="kb-servicio-icono">
              <Image
                src={tarjeta.icono}
                alt={tarjeta.alt}
                width={1080}
                height={1080}
                sizes={sizesTarjeta}
              />
            </figure>
            <h3 className="kb-servicio-titulo">{tarjeta.titulo}</h3>
            <p className="kb-servicio-texto">{tarjeta.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
