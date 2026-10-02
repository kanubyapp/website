import Image from "next/image";
import { BotonCotizar } from "./boton-cotizar";
import styles from "@/app/mudanzas-monterrey/page.module.css";

/*
 * Secciones que comparten las páginas de mudanzas de kanuby.com: hero con
 * olas, "Por qué", marquesina y servicios. El texto llega por props; la
 * estructura y el aspecto son los mismos en las tres páginas.
 */

type Boton = { texto: string; subtexto: string };

type Tarjeta = {
  icono: string;
  alt: string;
  titulo: string;
  texto: string;
};

/* Forma "waves" de Elementor, al pie del hero. */
function Olas() {
  return (
    <div className={styles.heroOlas} aria-hidden="true">
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z" />
      </svg>
    </div>
  );
}

export function HeroMudanzas({
  titulo,
  texto,
  boton,
}: {
  titulo: React.ReactNode;
  texto: string;
  boton: Boton;
}) {
  return (
    <section className={styles.hero}>
      <Olas />
      <div className={styles.heroContenido}>
        {titulo}
        <div className={styles.divisor} aria-hidden="true">
          <span />
        </div>
        <p className={styles.heroTexto}>{texto}</p>
        <BotonCotizar
          texto={boton.texto}
          subtexto={boton.subtexto}
          className={`${styles.botonGrande} ${styles.ocultoMovil}`}
        />
      </div>
      <div className={styles.heroImagen}>
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
}: {
  id?: string;
  antetitulo: string;
  titulo: string;
  etiqueta: string;
  tarjetas: Tarjeta[];
}) {
  return (
    <section id={id} className={styles.porque}>
      <div className={styles.porqueContenido}>
        <h3 className={styles.porqueAntetitulo}>{antetitulo}</h3>
        <h2 className={styles.porqueTitulo}>{titulo}</h2>
        <p className={styles.porqueEtiqueta}>{etiqueta}</p>
        <div className={styles.porqueTarjetas}>
          {tarjetas.map((tarjeta) => (
            <div key={tarjeta.titulo} className={styles.porqueTarjeta}>
              <figure className={styles.porqueIcono}>
                <Image
                  src={tarjeta.icono}
                  alt={tarjeta.alt}
                  width={1080}
                  height={1080}
                  sizes="(max-width: 767px) 35vw, 19vw"
                />
              </figure>
              <h3 className={styles.porqueTarjetaTitulo}>{tarjeta.titulo}</h3>
              <p className={styles.porqueTarjetaTexto}>{tarjeta.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Marquesina({ items }: { items: string[] }) {
  const lista = (oculta: boolean) => (
    <ul className={styles.marquesinaItems} aria-hidden={oculta || undefined}>
      {items.map((item) => (
        <li key={item} className={styles.marquesinaItem}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.marquesina}>
      <Image
        src="/images/pr2.png"
        alt=""
        width={1000}
        height={1000}
        sizes="100vw"
        className={styles.marquesinaFondo}
      />
      <div className={styles.marquesinaPista}>
        {lista(false)}
        {lista(true)}
      </div>
      <span className={styles.marquesinaDegradadoIzq} aria-hidden="true" />
      <span className={styles.marquesinaDegradadoDer} aria-hidden="true" />
    </section>
  );
}

export function ServiciosMudanzas({
  id,
  titulo,
  texto,
  boton,
  tarjetas,
}: {
  id?: string;
  titulo: string;
  texto: string;
  boton: Boton;
  tarjetas: Tarjeta[];
}) {
  return (
    <section id={id} className={styles.servicios}>
      <div className={styles.serviciosCabecera}>
        <div className={styles.serviciosIntro}>
          <h2 className={styles.serviciosTitulo}>{titulo}</h2>
          <p className={styles.serviciosTexto}>{texto}</p>
          <BotonCotizar
            texto={boton.texto}
            subtexto={boton.subtexto}
            className={`${styles.botonGrande} ${styles.botonServicios} ${styles.ocultoMovil}`}
          />
        </div>
        <div className={styles.serviciosImagen}>
          <Image
            src="/images/ddddd.png"
            alt="Camión de mudanzas naranja de Kanuby"
            width={2048}
            height={1365}
            sizes="(max-width: 767px) 84vw, 31vw"
          />
        </div>
      </div>
      <div className={styles.serviciosTarjetas}>
        {tarjetas.map((tarjeta) => (
          <div key={tarjeta.titulo} className={styles.servicioTarjeta}>
            <figure className={styles.servicioIcono}>
              <Image
                src={tarjeta.icono}
                alt={tarjeta.alt}
                width={1080}
                height={1080}
                sizes="(max-width: 767px) 67vw, 25vw"
              />
            </figure>
            <h3 className={styles.servicioTitulo}>{tarjeta.titulo}</h3>
            <p className={styles.servicioTexto}>{tarjeta.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
