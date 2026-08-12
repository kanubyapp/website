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
     * La tarjeta sube --header-flow menos --edge-gap: acaba separada del borde
     * superior exactamente lo mismo que de los laterales, y el pill queda
     * flotando encima con algo detrás que desenfocar.
     */
    <div className="mt-[calc((var(--header-flow)-var(--edge-gap))*-1)] px-[var(--edge-gap)]">
      <section className="hero-card">
        <div className="hero-mesh" aria-hidden="true">
          <div className="hero-mesh__layer hero-mesh__layer--a" />
          <div className="hero-mesh__layer hero-mesh__layer--b" />
          <div className="hero-mesh__layer hero-mesh__layer--c" />
        </div>

        {/* z-10 sobre el mesh. El pill del header va en z-50 y sigue por encima. */}
        {/*
          pt reducido: solo hay que librar el pill (--header-flow, 70/82px) más
          aire, no el doble. pb bajado en la misma proporción.
        */}
        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32">
          {/*
            Sin items-center: las columnas se estiran a la misma altura y cada
            una centra su propio contenido. Así empiezan y terminan a la vez, en
            vez de quedar una flotando respecto a la otra.
          */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col justify-center lg:col-span-5">
              {/*
                Blanco, no azul: el mesh va de #7e2a0e a #c1541b y ahí el azul
                de marca se queda en 1.4:1. El blanco da 4.61:1 en el peor caso.
              */}
              <h1 className="text-4xl leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
                {title}
              </h1>
              <p className="mt-6 max-w-md text-lg text-white">{subtitle}</p>
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
