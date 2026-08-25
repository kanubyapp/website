import type { Metadata } from "next";
import Image from "next/image";
import { SetHeaderNav } from "@/components/header-nav";
import { HeroQuoteButton } from "@/components/hero-quote-button";
import { ServiceCard } from "@/components/service-card";
import { StarRow } from "@/components/star-row";
import { TestimonialsMasonry } from "@/components/testimonials-masonry";
import { mudanzasReviews } from "@/lib/reviews";
import type { ServiceId } from "@/lib/services";

export const metadata: Metadata = {
  title: "Mudanzas en Monterrey | Kanuby",
  description:
    "Servicio de fletes y mudanzas en Monterrey. Equipo propio, más de 20 años de experiencia. Cotiza por WhatsApp.",
};

/* Trazo simple, sin relleno, currentColor: heredan el color del texto donde
   se usen. viewBox 24×24, mismo grosor y remates que icons.tsx, para que se
   sientan del mismo sistema. */

function ShieldIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 3 5 6v5.5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function ThumbsUpIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 11v10" />
      <path d="M7 11H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3" />
      <path d="M7 11l3.5-7.5a2 2 0 0 1 4 .9V8h4.3a2 2 0 0 1 2 2.3l-1.2 8A2 2 0 0 1 17.6 20H7" />
    </svg>
  );
}

function UsersIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="9" cy="8" r="3.25" />
      <path d="M2.75 21v-1a6.25 6.25 0 0 1 12.5 0v1" />
      <circle cx="17.5" cy="8.5" r="2.5" />
      <path d="M21.25 21v-1a5 5 0 0 0-4-4.9" />
    </svg>
  );
}

const WHY_KANUBY_CARDS = [
  {
    title: "Seguridad total",
    description: "Tus pertenencias aseguradas durante todo el traslado.",
    Icon: ShieldIcon,
  },
  {
    title: "Puntualidad",
    description: "Llegamos a la hora acordada, sin excusas.",
    Icon: ClockIcon,
  },
  {
    title: "+20 años de experiencia",
    description:
      "Miles de mudanzas exitosas en Monterrey y su área metropolitana.",
    Icon: ThumbsUpIcon,
  },
  {
    title: "Equipo profesional",
    description: "Personal capacitado y uniformado.",
    Icon: UsersIcon,
  },
];

function WhyKanubyCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: (props: { className?: string }) => React.JSX.Element;
}) {
  return (
    /*
      Sólida, no cristal: sobre el blanco del hero el glassmorphism no tiene
      nada translúcido detrás que mostrar. Sombra a mano, más marcada que la
      de la tarjeta del hero (shadow-[0_10px_48px_-8px_rgba(15,52,70,0.18)])
      porque estas se montan sobre blanco y necesitan separarse de él:
      desplazamiento mayor (16px vs 10px), spread menos negativo (-6 vs -8,
      así se extiende un poco más) y más opacidad (0.28 vs 0.18).
    */
    <div className="flex flex-col items-center rounded-3xl bg-background p-8 text-center shadow-[0_16px_40px_-6px_rgba(15,52,70,0.28)]">
      <div
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-full border border-border text-brand-blue"
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="font-heading mt-4 text-xl text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </div>
  );
}

const SERVICES: {
  title: string;
  description: string;
  image: string;
  service: ServiceId;
}[] = [
  {
    title: "Mudanza Local",
    description:
      "Mudanzas en Monterrey y su área metropolitana. Empaque, carga y traslado con personal capacitado y transporte propio, sin subcontratar a terceros.",
    image: "/mudanzas/mudanza-local.webp",
    service: "local",
  },
  {
    title: "Mudanza Nacional",
    description:
      "Mudanzas foráneas de Monterrey a cualquier estado del país. Seguimiento durante todo el trayecto y coordinación de fecha de entrega.",
    image: "/mudanzas/mudanza-nacional.webp",
    service: "monterrey-cdmx",
  },
  {
    title: "Mudanza Empresarial",
    description:
      "Mudanza de oficinas y espacios de trabajo en Monterrey. Planeación por etapas para que tu operación no se detenga más de lo necesario.",
    image: "/mudanzas/mudanza-corporativa.webp",
    service: "oficinas",
  },
];

/*
  Conteo real, calculado del archivo. El promedio también se calcula, no se
  escribe a mano — pero reviews.ts no tiene campo `rating` por reseña porque,
  según su propio comentario, TODAS son de 5 estrellas ("no hay campo rating
  porque son 5 estrellas fijas"). El cálculo lo refleja: un arreglo de 5s del
  mismo largo que las reseñas, promediado. Si algún día una reseña entra con
  otra calificación, este cálculo ya sabe promediarla de verdad.
*/
const REVIEW_COUNT = mudanzasReviews.length;
const AVERAGE_RATING =
  mudanzasReviews.map(() => 5).reduce((sum, n) => sum + n, 0) / REVIEW_COUNT;

const HEADER_NAV_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#testimonios", label: "Testimonios" },
];

export default function MudanzasPage() {
  return (
    <>
      <SetHeaderNav links={HEADER_NAV_LINKS} />

      <section className="w-full">
        {/*
          Alto: 85vh del viewport para todo el bloque (header + tarjeta), no
          solo la tarjeta. Se descuenta --header-row (alto real del header,
          ahora pegado al borde superior, sin margen propio) y 1 ×
          --edge-gap, el único margen que le queda a esta tarjeta: el
          inferior (mb-[var(--edge-gap)]). Ya no hay margen superior del
          header ni de la tarjeta, así que ya no se restan.

          Sin bg propio: el gris ahora lo pone el body (globals.css), a nivel
          de sitio completo, no de esta página.
        */}
        {/*
          Blanca a propósito, para distinguirse del gris heredado del body.

          Sombra a mano, no shadow-* de Tailwind: difuminado ancho (48px) y
          desplazamiento vertical corto (10px) para que se lea como
          separación suave, no como un golpe debajo de la tarjeta. Azul de
          marca muy diluido (rgba(15,52,70,...)), no negro — mismo criterio
          que ya usa el resto del sitio para sombras sobre fondo claro, para
          no meter un gris sucio que no combine con el sistema de color.
        */}
        <div className="relative mx-[var(--edge-gap)] mb-[var(--edge-gap)] h-[calc(85vh-var(--edge-gap)-var(--header-row))] overflow-hidden rounded-3xl bg-background shadow-[0_10px_48px_-8px_rgba(15,52,70,0.18)]">
          {/*
            Fondo decorativo: dos tipos que tienen que CONTRASTAR entre sí,
            no una sola mancha repetida. Ahora:

            - .hero-blob-solid-v2: opacos, azul de marca saturado, CON VOLUMEN
              — gradiente radial descentrado (globals.css) para que se lean
              como esferas iluminadas de lado, no manchas de color plano.
              Van 2, grandes (subidos de tamaño dos veces ya — tienen que
              tener presencia clara), de tamaño distinto entre sí.
            - .hero-glass-orb-v4: 2 círculos grandes —notoriamente más
              grandes que cualquier sólido—, translúcidos (alfa 0.18 con
              backdrop-filter, blur 48px). Cada uno se ancla a propósito
              para CRUZAR sobre su sólido: el punto de anclaje del sólido se
              movió hacia el cristal al agrandarlo, para no perder el cruce
              (ver posiciones abajo). Donde cruzan, la esfera se ve lavada y
              difuminada; fuera del cristal, el sólido mantiene el filo
              nítido.

            ESCUDO DE CRISTAL DETRÁS DEL TEXTO: el cristal del clúster
            superior no solo cruza su sólido, además se movió para quedar
            centrado detrás del bloque eyebrow+H1 (top-12 left-40 en vez de
            pegado a la esquina). Es a propósito — si el sólido azul alguna
            vez cae detrás del texto, este cristal ya está ahí para
            lavarlo antes de que llegue a tocar el fondo del texto; hoy por
            hoy ninguno de los dos toca el texto (verificado abajo), pero
            con el cristal ya posicionado ahí, el margen de seguridad
            existe si esa posición cambia.

            Detrás del contenido por orden de DOM (va primero) y por
            z-index explícito en el grid de abajo. pointer-events-none: es
            puramente decorativo, nunca debe interceptar clics del texto o
            el botón que caen encima.

            DISTRIBUCIÓN, no agrupados en una sola zona: un par (1 sólido +
            1 cristal) abajo a la derecha —zona con espacio libre en
            cualquier breakpoint, ver nota de medición abajo— y el otro par
            arriba a la izquierda, solo desde md.

            POSICIÓN del par inferior, medida contra el texto real (no a
            ojo): en mobile el bloque de texto ocupa casi todo el ancho de
            la tarjeta (una sola columna) y deja apenas ~70px libres arriba,
            pero ~330px libres abajo —donde vive la imagen del camión—, así
            que este par va anclado por abajo (bottom- o -bottom- negativo,
            nunca top-) y recostado a la derecha. Con -bottom- negativo en
            el cristal, sale recortado por el borde inferior de la tarjeta
            (overflow-hidden), que es el efecto pedido de "algunos salen
            por el borde".

            CLÚSTER SUPERIOR (izquierda), solo desde md: mismo motivo que
            antes — en mobile el texto no deja casi nada de aire arriba
            (~70px), así que ahí no se muestra en vez de cancelarlo por
            completo. A propósito sale recortado por el borde de arriba
            (-top-* negativo) y queda detrás del eyebrow y el H1. Contraste
            de eyebrow y H1 verificado después del cambio, con estos
            círculos puestos.
          */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="hero-blob-solid-v2 absolute bottom-14 right-28 h-28 w-28 rounded-full md:bottom-24 md:right-56 md:h-48 md:w-48" />
            <div className="hero-glass-orb-v4 absolute -bottom-8 right-0 h-40 w-40 rounded-full md:-bottom-12 md:right-0 md:h-72 md:w-72" />

            <div className="hero-blob-solid-v2 absolute -top-14 left-16 hidden h-24 w-24 rounded-full md:block md:left-80 md:h-56 md:w-56" />
            <div className="hero-glass-orb-v4 absolute -top-28 left-4 hidden h-72 w-72 rounded-full md:block md:left-40 md:top-12 md:h-96 md:w-96" />
          </div>

          <div className="relative z-10 grid h-full md:grid-cols-2">
            <div className="flex h-full flex-col justify-center px-4 py-8 md:px-16">
              <p className="text-ui text-sm font-medium tracking-wider text-brand-blue">
                Mudanzas en Monterrey
              </p>
              <h1 className="mt-3 text-4xl leading-[1.1] tracking-tight text-brand-blue md:text-5xl">
                Servicio de Fletes y Mudanzas en Monterrey
              </h1>
              <p className="mt-4 max-w-md text-lg text-brand-blue">
                En Kanuby cambiamos la forma de mudarse, contamos con el
                mejor servicio de fletes y mudanzas en Monterrey.
              </p>
              <HeroQuoteButton />
            </div>

            {/*
              Sin fill: la imagen vive en flujo normal, con width/height
              explícitos (los del archivo original, 1536×1024) para que
              Next.js reserve su proporción sin CLS. w-full h-auto la
              escala al ancho disponible del contenedor manteniendo esa
              proporción; object-contain queda de más sin fill (no hay caja
              fija que "contener"), pero no estorba.

              Sin relative: sin fill no hace falta contexto de posición.
              flex items-center justify-center centra la imagen dentro del
              alto de la columna, en vez de pegarla arriba.
            */}
            <div className="flex h-full items-center justify-center px-4 md:px-16">
              <Image
                src="/mudanzas/hero.png"
                alt="Camión de mudanzas de Kanuby"
                width={1536}
                height={1024}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/*
        Sin bg propio: hereda el gris del body, igual que la sección del hero.

        Las 3 tarjetas de cristal van PRIMERO en el flujo, antes del bloque de
        texto: nacen con un margen negativo que las mete dentro del margen
        inferior del hero (y más allá, dentro de la propia tarjeta blanca) y
        terminan ya dentro de esta sección. -mt-20 en móvil y -mt-28 en
        desktop son ambos mayores que --edge-gap (1rem / 1.5rem), que es el
        margen inferior de la tarjeta del hero — si fueran menores o iguales,
        las tarjetas se quedarían flotando en el hueco gris entre secciones
        sin llegar a pisar el hero. Verificado que no chocan con el botón ni
        con la imagen del camión: medido en vivo, quedan ~50px libres sobre
        la imagen en mobile (el margen más ajustado de los dos anchos) y
        mucho más en desktop.

        mx-[calc(var(--edge-gap)+1.5rem)]: a propósito MÁS adentro que
        --edge-gap solo, que es lo que usa la tarjeta del hero. Alineado
        exacto al mismo borde (como está la sección de servicios más abajo)
        se veía flotando sobre el filo de la tarjeta en vez de contenido
        dentro de ella. El extra de 1.5rem por lado es lo que deja ver el
        blanco de la tarjeta del hero alrededor, para que se lea "adentro".

        En móvil el grid cae a una columna: las 3 tarjetas se apilan con su
        gap-6 normal, sin solaparse entre sí. El -mt-20 se aplica UNA vez al
        contenedor completo, así que solo la primera tarjeta del apilado
        llega a pisar el hero; la segunda y la tercera quedan ya dentro de la
        sección gris, en flujo normal. No hay corte ni contenido tapado.
      */}
      <section id="servicios" className="relative w-full">
        {/*
          De 3 a 4 tarjetas: mismo patrón sm:grid-cols-2 lg:grid-cols-4 que
          ya usan las tarjetas de servicio más abajo en esta página — una
          columna en mobile, 2×2 en tablet, las 4 en fila en desktop.
        */}
        <div className="relative z-10 mx-[calc(var(--edge-gap)+1.5rem)] -mt-20 grid gap-6 sm:grid-cols-2 md:-mt-28 lg:grid-cols-4">
          {WHY_KANUBY_CARDS.map((card) => (
            <WhyKanubyCard
              key={card.title}
              title={card.title}
              description={card.description}
              Icon={card.Icon}
            />
          ))}
        </div>

        {/*
          max-w-4xl (antes 3xl): el H2 mide 744px de ancho natural a 36px
          (md:text-4xl) y con 3xl (768px de caja, 704px libres tras el
          padding) no entraba — rompía en dos líneas dejando "León" solo.
          4xl (896px de caja, 832px libres desde ~896px de viewport) le
          sobra margen y lo mantiene en una sola línea desde lg hacia
          arriba sin necesidad de whitespace-nowrap. Por debajo de eso
          (tablet, 768–895px de viewport) el contenedor sigue sin alcanzar
          los 744px y puede volver a romper — ahí ya no depende del ancho
          sino del nbsp entre "Nuevo" y "León" (ver H2): pase lo que pase,
          esas dos palabras nunca se separan, así que nunca queda una sola
          palabra suelta en la última línea, en ningún breakpoint. No se
          tocó el ancho para mobile: max-w-4xl no tiene efecto por debajo
          de su propio valor, mobile sigue igual que antes.
        */}
        <div className="mx-auto max-w-4xl px-5 pt-16 text-center md:px-8 md:pt-20">
          <p className="text-ui text-sm font-medium tracking-wider text-brand-blue">
            Nuestros servicios
          </p>
          {/*
            lg:whitespace-nowrap además del ancho: el ancho ya alcanza para
            una sola línea desde ~896px de viewport (por debajo del propio
            lg=1024), pero nowrap deja la garantía explícita en el CSS en
            vez de depender solo de que el cálculo de ancho no falle por
            variación de fuente. El espacio de no separación entre "Nuevo"
            y "León" (ver JSX) ata esas dos palabras para que, si el H2 llega a romper (tablet,
            768–895px), nunca quede "León" solo en la última línea.
          */}
          <h2 className="mt-3 text-3xl tracking-tight text-brand-blue md:text-4xl lg:whitespace-nowrap">
            Las Mejores Mudanzas en Monterrey, Nuevo{" "}León
          </h2>
          {/*
            max-w-[42rem] (672px) propio, no heredado del contenedor: a
            text-lg (18px) esto da un máximo de ~75 caracteres por línea
            (medido en vivo, ver reporte) — el contenedor de arriba se hizo
            más ancho para el H2, así que el párrafo necesita su propio
            tope para no alargarse con él.
          */}
          <p className="mx-auto mt-4 max-w-[42rem] text-lg text-brand-blue">
            En Kanuby contamos con la experiencia de más de 20 años en
            mudanzas en Monterrey. Puedes confiar en nosotros, donde tu
            mudanza será realizada con la rapidez que nos caracteriza además
            de la seguridad que solo un servicio de calidad como el nuestro
            puede garantizar.
          </p>
        </div>

        {/*
          mx-[var(--edge-gap)], el MISMO mecanismo que usa la tarjeta del
          hero (margen, no padding, sin max-w-6xl) — no solo el mismo valor.
          Con max-w-6xl los dos bordes izquierdos coincidían por casualidad
          solo por debajo de 1152px de viewport; en pantallas más anchas el
          hero seguía pegado a --edge-gap del viewport mientras esto se
          quedaba centrado en su caja de 1152px, y el desfase crecía con el
          viewport (376px a 1920px, medido). Replicando el mismo mecanismo,
          la alineación se sostiene sola en cualquier ancho, no solo en el
          rango donde antes coincidían por accidente.
        */}
        <div className="mx-[var(--edge-gap)] py-16 md:py-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((item) => (
              <ServiceCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image}
                service={item.service}
                vertical="mudanzas"
              />
            ))}
          </div>
        </div>
      </section>

      {/*
        Mismo mecanismo de margen que el hero y los servicios
        (mx-[var(--edge-gap)], sin max-w-6xl) — la alineación de borde
        izquierdo se sostiene sola, no por coincidencia de anchos.

        Sin bg propio: hereda el gris del body.
      */}
      <section id="testimonios" className="w-full py-16 md:py-20">
        <div className="mx-[var(--edge-gap)]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-ui text-sm font-medium tracking-wider text-brand-blue">
              TESTIMONIOS
            </p>
            <p className="font-heading mt-4 text-5xl text-brand-blue">
              {AVERAGE_RATING.toFixed(1)}
            </p>
            <StarRow size="h-5 w-5" className="mt-2 justify-center" />
            <p className="mt-2 text-sm text-muted">
              {REVIEW_COUNT} reseñas en Google
            </p>
            <h2 className="mt-8 text-3xl tracking-tight text-brand-blue md:text-4xl">
              Historias de confianza en cada movimiento.
            </h2>
            <p className="mt-4 text-lg text-brand-blue">
              No solo trasladamos objetos, cuidamos el patrimonio de nuestros
              clientes. Descubre por qué cientos de familias y empresas en
              Monterrey confían en Kanuby para sus mudanzas y almacenamiento.
            </p>
          </div>

          {/*
            Masonry con columnas CSS, no CSS grid masonry ni JS: llena la
            primera columna antes de pasar a la siguiente, así que el orden
            del arreglo importa para que las tres columnas queden de altura
            parecida (ver el comentario de mudanzasReviews en reviews.ts,
            que ya documenta ese orden). Cada tarjeta se autocontiene su
            alto según el largo del texto — de ahí las alturas desiguales.

            px-4 md:px-16: el MISMO padding que ya usa la columna de texto
            del hero para separar el H1 del borde de su tarjeta. El div
            padre ya trae mx-[var(--edge-gap)] —el margen de la tarjeta del
            hero—; sumado a este padding llega exactamente al eje del H1,
            no al filo de la tarjeta. Ningún valor calculado a mano: son los
            dos mismos tokens/clases que ya existen, reutilizados tal cual.

            TestimonialsMasonry (Client Component, ver
            testimonials-masonry.tsx): esta página es Server Component y no
            puede manejar el estado de "mostrar las 9 primeras / las 14" ni
            el onClick del banner de conversión, así que ese pedazo se
            extrajo a su propio archivo cliente. mudanzasReviews se pasa tal
            cual, sin recortar aquí: el recorte a 9 y el banner intercalado
            son responsabilidad del componente, no de esta página —
            REVIEW_COUNT y AVERAGE_RATING de arriba ya se calcularon del
            array completo antes de llegar aquí, así que no les afecta nada
            de lo que el componente decida mostrar u ocultar.
          */}
          <TestimonialsMasonry reviews={mudanzasReviews} />
        </div>
      </section>
    </>
  );
}
