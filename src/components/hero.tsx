import { CtaGroup } from "@/components/cta-group";

type HeroProps = {
  title: string;
  subtitle: string;
  /**
   * Video en loop del hero. Mientras no exista el archivo, se renderiza un
   * placeholder con la misma relación de aspecto (16:9) para que el layout no
   * cambie al conectarlo.
   */
  videoSrc?: string;
  /** Imagen de poster: primer frame. Se muestra antes de que el video cargue. */
  poster?: string;
  whatsappLabel?: string;
  /** Se pasa tal cual a CtaGroup: cambia el destino de la acción secundaria. */
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function Hero({
  title,
  subtitle,
  videoSrc,
  poster,
  whatsappLabel,
  secondaryHref,
  secondaryLabel,
}: HeroProps) {
  return (
    /*
     * --edge-gap por los cuatro lados, sin compensar nada: el header no ocupa
     * sitio en el flujo, va apilado sobre <main> en la misma celda de grid (ver
     * layout.tsx). Los dos filos superiores salen de este mismo token y del
     * mismo origen, así que coinciden pase lo que pase con el alto del header.
     *
     * pt y no mt: como <main> no tiene padding ni borde, un margen superior aquí
     * colapsaría hacia fuera y movería la tarjeta y el header a la vez.
     */
    <div className="px-[var(--edge-gap)] pt-[var(--edge-gap)]">
      <section className="hero-card">
        <div className="hero-mesh" aria-hidden="true">
          <div className="hero-mesh__layer hero-mesh__layer--a" />
          <div className="hero-mesh__layer hero-mesh__layer--b" />
          <div className="hero-mesh__layer hero-mesh__layer--c" />
        </div>

        {/* z-10 sobre el mesh. El pill del header va en z-50 y sigue por encima. */}
        {/*
          Lateral: --hero-pad, propio del hero. Sin max-width: la tarjeta es el
          contenedor.

          pt solo tiene que librar el pill —que va superpuesto sobre esta misma
          tarjeta— más aire, no el doble. pb bajado en la misma proporción.

          ALTURA MÍNIMA (solo md+): 90svh menos el --edge-gap que la tarjeta
          tiene por encima, así que su borde inferior cae al 90% del viewport y
          la siguiente sección asoma — que es lo que indica que hay más abajo.
          Va en este div y no en .hero-card porque el alto de la tarjeta lo
          define este único hijo en flujo; así basta un nivel de flex.

          En móvil NO se aplica: ahí una altura fija empuja el resto fuera de la
          vista y el contenido ya da de sobra.

          svh y no vh: en tablets con barra de navegación retráctil, vh mide el
          viewport grande y la tarjeta se comería el asomo de la sección
          siguiente justo cuando la barra está visible.
        */}
        <div className="relative z-10 flex flex-col px-[var(--hero-pad)] pb-12 pt-28 md:min-h-[calc(90svh-var(--edge-gap))] md:pb-16 md:pt-32">
          {/*
            flex-1: la rejilla ocupa todo el alto sobrante de la tarjeta en vez
            de quedarse en su alto natural. Sin esto el slot de video no crecería
            con la tarjeta.

            Sin items-center ni content-center: las filas y columnas se estiran,
            y cada columna centra su propio contenido. Así empiezan y terminan a
            la vez, en vez de quedar una flotando respecto a la otra.
          */}
          <div className="grid flex-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col justify-center lg:col-span-5">
              {/*
                Azul, no blanco: el mesh es claro (L 0.367 .. 0.848) y ahí el
                blanco se queda en 1.9:1 en el punto más claro. El azul de marca
                da 4.90:1 en el peor caso —la mancha naranja fuerte— y 11.24:1
                en el más claro. El presupuesto completo está en globals.css,
                en la cabecera del mesh.
              */}
              <h1 className="text-4xl leading-[1.1] tracking-tight text-brand-blue md:text-5xl lg:text-[3.5rem]">
                {title}
              </h1>
              <p className="mt-6 max-w-md text-lg text-brand-blue">{subtitle}</p>
              <CtaGroup
                className="mt-8"
                tone="warm"
                variant="single"
                whatsappLabel={whatsappLabel}
                secondaryHref={secondaryHref}
                secondaryLabel={secondaryLabel}
              />
            </div>

            <div className="lg:col-span-7">
              {/*
                A partir de lg el slot ocupa el alto de la fila en vez de imponer
                su 16:9, que es lo que dejaba espacio muerto. Por debajo de lg
                conserva la proporción.
              */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-surface lg:aspect-auto lg:h-full lg:min-h-[20rem]">
                {videoSrc ? (
                  <video
                    className="h-full w-full object-cover"
                    src={videoSrc}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center border border-border">
                    <p className="text-ui text-sm text-muted">
                      Slot de video · 16:9
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
