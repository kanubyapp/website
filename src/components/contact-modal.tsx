"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  BuildingIcon,
  CloseIcon,
  HomeIcon,
  RouteIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { WHATSAPP_HREF } from "@/lib/contact";
import {
  SERVICE_OPTIONS,
  VERTICAL_LABEL,
  type ServiceId,
  type Vertical,
} from "@/lib/services";

type OpenOptions = {
  /**
   * Servicio preseleccionado. Cuando llega, el modal SALTA el paso 1 y arranca
   * en los datos de contacto. Se omite desde puntos de entrada genéricos (el
   * botón de WhatsApp): ahí el usuario elige primero.
   */
  service?: ServiceId;
  /** Vertical de la página. Dato oculto: no se pinta, viaja en el mensaje. */
  vertical: Vertical;
};

const ContactModalContext = createContext<((options: OpenOptions) => void) | null>(
  null,
);

/**
 * Abre el modal de contacto. Solo funciona dentro de <ContactModalProvider>,
 * que se monta una vez en el layout raíz.
 */
export function useContactModal() {
  const open = useContext(ContactModalContext);

  if (!open) {
    throw new Error(
      "useContactModal necesita <ContactModalProvider> por encima en el árbol.",
    );
  }

  return open;
}

const ICONS: Record<ServiceId, typeof HomeIcon> = {
  local: HomeIcon,
  "monterrey-cdmx": RouteIcon,
  oficinas: BuildingIcon,
};

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [options, setOptions] = useState<OpenOptions | null>(null);

  const open = useCallback((next: OpenOptions) => setOptions(next), []);
  const close = useCallback(() => setOptions(null), []);

  return (
    <ContactModalContext.Provider value={open}>
      {children}
      {options && (
        <ContactModal
          key={`${options.vertical}-${options.service ?? "sin-servicio"}`}
          options={options}
          onClose={close}
        />
      )}
    </ContactModalContext.Provider>
  );
}

type Step = "servicio" | "datos";

function ContactModal({
  options,
  onClose,
}: {
  options: OpenOptions;
  onClose: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  /** Primer control del paso activo: es donde se pone el foco al entrar. */
  const stepEntryRef = useRef<HTMLButtonElement | HTMLInputElement>(null);
  /** Quien abrió el modal, para devolverle el foco al cerrar. */
  const openerRef = useRef<HTMLElement | null>(null);

  const [service, setService] = useState<ServiceId | undefined>(options.service);
  /*
   * Abierto desde una tarjeta de servicio, el paso 1 sobra: ya sabemos qué
   * quiere mover. Desde un punto de entrada genérico se empieza por la
   * pregunta.
   */
  const [step, setStep] = useState<Step>(options.service ? "datos" : "servicio");

  const chosen = SERVICE_OPTIONS.find((option) => option.id === service);

  /*
   * Escape, bloqueo del scroll de fondo y trampa de Tab: los tres viven lo que
   * vive el modal.
   *
   * El trap consulta los focusables en cada pulsación en vez de cachearlos: al
   * cambiar de paso el contenido del panel cambia entero.
   */
  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [onClose]);

  /* Al entrar en un paso, el foco va a su primer control. */
  useEffect(() => {
    stepEntryRef.current?.focus();
  }, [step]);

  /*
   * El mensaje se arma aquí y se abre wa.me con ?text=. No hay backend: los
   * datos capturados viajan DENTRO del texto de la conversación, que es lo
   * único que WhatsApp acepta prellenar.
   *
   * window.open dentro del submit, no un <a> con href precalculado: el texto
   * depende de lo que el usuario acabe de escribir.
   */
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const lines = [
      "Hola Kanuby, me interesa cotizar.",
      "",
      `Servicio: ${chosen?.message ?? "Sin especificar"}`,
      `Sección: ${VERTICAL_LABEL[options.vertical]}`,
      `Nombre: ${String(data.get("nombre") ?? "").trim()}`,
      `Teléfono: ${String(data.get("telefono") ?? "").trim()}`,
    ];

    const email = String(data.get("email") ?? "").trim();
    if (email) lines.push(`Email: ${email}`);

    window.open(
      `${WHATSAPP_HREF}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );

    onClose();
  };

  const field =
    "text-ui mt-1.5 w-full rounded-full border border-border bg-white px-5 py-3 text-base text-brand-blue outline-none transition-colors placeholder:text-muted focus:border-brand-blue";
  const label = "text-ui text-sm text-brand-blue";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-brand-blue/60 p-4 sm:items-center"
      /* Cerrar al pulsar el fondo, no al soltar sobre él tras arrastrar desde
         dentro del panel: por eso se compara el target con el propio fondo. */
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-2xl rounded-3xl bg-background p-6 shadow-2xl md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-surface"
        >
          <CloseIcon />
        </button>

        {/* Título FIJO: no cambia entre pasos. Lo que cambia es el encabezado
            de cada paso, más abajo.

            Sin max-width y con pr-12 para librar la ✕: así entra en una sola
            línea en vez de partirse en dos. */}
        <h2
          id={titleId}
          className="pr-12 text-2xl tracking-tight md:text-3xl"
        >
          Solicita una cotización
        </h2>

        {step === "servicio" ? (
          <div className="mt-8">
            {/*
              La pregunta es el encabezado del paso, no la etiqueta de un campo:
              por eso va en la tipografía de texto y no en la de UI.

              Botones, no radios: cada opción avanza al paso siguiente en cuanto
              se pulsa. Con radios, las flechas del teclado cambiarían la
              selección y dispararían el avance sin querer.
            */}
            <p className="text-lg text-brand-blue">
              ¿Qué tipo de mudanza estás buscando?
            </p>

            {/*
              Tres cajas en columna: icono arriba, título y descripción debajo.
              Apiladas por debajo de sm — a un tercio del ancho de un móvil,
              "Mudanza empresarial" se parte en tres líneas.

              rounded-2xl y no el pill del resto de botones: una caja alta con
              rounded-full se convierte en un óvalo.
            */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {SERVICE_OPTIONS.map((option, index) => {
                const Icon = ICONS[option.id];

                return (
                  <button
                    key={option.id}
                    ref={index === 0 ? (stepEntryRef as React.RefObject<HTMLButtonElement>) : undefined}
                    type="button"
                    onClick={() => {
                      setService(option.id);
                      setStep("datos");
                    }}
                    className="flex flex-col items-center rounded-2xl border border-border px-4 py-6 text-center transition-colors hover:border-brand-blue hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  >
                    <Icon className="h-7 w-7 text-brand-blue" />
                    <span className="text-ui mt-3 block text-base font-medium text-brand-blue">
                      {option.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8">
            <p className="text-lg text-brand-blue">Ingresa tus datos</p>

            {/* Servicio y vertical: datos ocultos, no editables aquí. */}
            <input type="hidden" name="servicio" value={service ?? ""} />
            <input type="hidden" name="vertical" value={options.vertical} />

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="contacto-nombre" className={label}>
                  Nombre
                </label>
                <input
                  ref={stepEntryRef as React.RefObject<HTMLInputElement>}
                  id="contacto-nombre"
                  name="nombre"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Tu nombre"
                  className={field}
                />
              </div>

              {/* Teléfono y email comparten fila a partir de sm. En móvil
                  siguen apilados: dos campos a media pantalla no se llenan
                  cómodamente. */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contacto-telefono" className={label}>
                    Teléfono
                  </label>
                  <input
                    id="contacto-telefono"
                    name="telefono"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="81 0000 0000"
                    className={field}
                  />
                </div>

                <div>
                  <label htmlFor="contacto-email" className={label}>
                    Email <span className="text-muted">(opcional)</span>
                  </label>
                  <input
                    id="contacto-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    className={field}
                  />
                </div>
              </div>
            </div>

            {/* Cae sobre el panel blanco del modal: fondo neutro, luego botón
                naranja con texto blanco. 19px/600 es el mínimo del naranja para
                cumplir AA por la vía del texto grande (ver globals.css). */}
            <button
              type="submit"
              className="text-ui mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-orange px-7 py-4 text-[1.1875rem] font-semibold text-white transition-colors hover:bg-brand-orange-hover"
            >
              <WhatsAppIcon />
              Ir a WhatsApp
            </button>

            <p className="mt-4 text-center text-sm text-muted">
              Se abre WhatsApp con tus datos ya escritos. Solo tienes que enviar
              el mensaje.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
