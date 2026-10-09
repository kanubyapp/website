"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useId, useReducer, useRef, useState } from "react";
import {
  IconoBodegaChica,
  IconoBodegaGrande,
  IconoBodegaMediana,
  IconoCamion,
  IconoCasa,
  IconoCerrar,
  IconoDuda,
  IconoEdificio,
  IconoRuta,
  IconoWhatsApp,
} from "@/components/iconos";
import { registrarConversion, type Negocio } from "@/lib/conversiones";
import { avisarCotizacion } from "@/lib/aviso-cotizacion";
import { envioCotizacion } from "@/lib/envio-cotizacion";
import { flujoCotizacion, flujoInicial } from "@/lib/flujo-cotizacion";
import {
  TAMANOS_MINIBODEGA,
  TIPOS_MUDANZA,
  type Cotizacion,
  type ErroresCotizacion,
  type TamanoMinibodega,
  type TipoMudanza,
} from "@/lib/whatsapp";

/*
 * Popup de cotización con la estructura del modal de legacy: paso 1, el tipo
 * de mudanza o el tamaño de minibodega como tarjetas que avanzan al tocarlas;
 * paso 2, nombre y teléfono. Al enviar, valida; si pasa, registra el evento
 * de conversión (cotizacion_mudanza o cotizacion_minibodega) y, cuando sale
 * o vence el límite corto, redirige a WhatsApp en la misma pestaña.
 * Con tipo="eleccion" (botón flotante de la home) hay un paso previo, "¿Qué
 * necesitas?", con Mudanza y Minibodega; desde el paso 1 se regresa a él.
 * Cualquier botón de la página lo abre con useCotizacion().abrir(). Se cierra con su botón, con Esc y con clic fuera;
 * mientras está abierto el foco queda dentro, el fondo no hace scroll
 * (interacciones.css) y al cerrar el foco vuelve a quien lo abrió.
 */

type Icono = (props: { className?: string }) => React.ReactNode;

/* Ícono de cada opción del paso 1: los de mudanza son los del modal de legacy */
const ICONOS_MUDANZA: Record<TipoMudanza, Icono> = {
  "Mudanza local": IconoCasa,
  "Mudanza de Monterrey a CDMX": IconoRuta,
  "Mudanza empresarial": IconoEdificio,
};

const ICONOS_MINIBODEGA: Record<TamanoMinibodega, Icono> = {
  "3.5 m²": IconoBodegaChica,
  "7 m²": IconoBodegaMediana,
  "14 m²": IconoBodegaGrande,
  "No estoy seguro": IconoDuda,
};

const FORMULARIOS: Record<
  "mudanza" | "minibodega",
  {
    titulo: string;
    subtitulo: string;
    pregunta: string;
    opciones: readonly string[];
    iconos?: Partial<Record<string, Icono>>;
  }
> = {
  mudanza: {
    titulo: "Cotiza ahora tu Mudanza con Kanuby",
    subtitulo: "Completa el formulario, te llevará a WhatsApp.",
    pregunta: "¿Qué tipo de mudanza estás buscando?",
    opciones: TIPOS_MUDANZA,
    iconos: ICONOS_MUDANZA,
  },
  minibodega: {
    titulo: "Cotiza tu minibodega ahora",
    subtitulo: "Al completar el formulario te llevará a WhatsApp.",
    pregunta: "¿Cuánto Espacio Buscas?",
    opciones: TAMANOS_MINIBODEGA,
    iconos: ICONOS_MINIBODEGA,
  },
};

/* Paso previo del popup general */
const NEGOCIOS: { valor: Negocio; nombre: string; Icono: Icono }[] = [
  { valor: "mudanza", nombre: "Mudanza", Icono: IconoCamion },
  { valor: "minibodega", nombre: "Minibodega", Icono: IconoBodegaMediana },
];

/* abrir(opcion): con una opción del paso 1, el popup abre directo en el paso 2 con ella */
const CotizacionContexto = createContext<{ abrir: (opcion?: string) => void } | null>(null);

export function useCotizacion() {
  const contexto = useContext(CotizacionContexto);
  if (!contexto) throw new Error("useCotizacion necesita CotizacionProvider");
  return contexto;
}

const ordenCampos = ["nombre", "telefono"] as const;

const ENFOCABLES =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CotizacionProvider({
  tipo = "mudanza",
  children,
}: {
  tipo?: keyof typeof FORMULARIOS | "eleccion";
  children: React.ReactNode;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  /* Primer control del paso activo: ahí va el foco al entrar en el paso. */
  const entradaPaso = useRef<HTMLButtonElement & HTMLInputElement>(null);
  /* Quien abrió el popup, para devolverle el foco al cerrar. */
  const abridor = useRef<HTMLElement | null>(null);
  /* Mientras espera a que salga el evento, otro envío no registra de nuevo. */
  const enviando = useRef(false);
  /* Contra bots (aviso por correo): cuándo se abrió y el campo trampa. */
  const abiertoEn = useRef(0);
  const trampa = useRef<HTMLInputElement>(null);
  const id = useId();

  const [abierto, setAbierto] = useState(false);
  const [flujo, despachar] = useReducer(
    flujoCotizacion,
    tipo === "eleccion" ? null : tipo,
    flujoInicial,
  );
  /* En el paso previo todavía no hay formulario de servicio */
  const formularioActual =
    flujo.paso !== "negocio" && flujo.negocio ? FORMULARIOS[flujo.negocio] : null;
  const nombreNegocio = NEGOCIOS.find((negocio) => negocio.valor === flujo.negocio)?.nombre;
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errores, setErrores] = useState<ErroresCotizacion>({});

  useEffect(() => {
    if (abierto) entradaPaso.current?.focus();
  }, [abierto, flujo.paso]);

  function abrir(opcion?: string) {
    abiertoEn.current = Date.now();
    abridor.current = document.activeElement as HTMLElement | null;
    enviando.current = false;
    despachar({ tipo: "reiniciar" });
    if (opcion) despachar({ tipo: "preseleccionar", valor: opcion });
    setNombre("");
    setTelefono("");
    setErrores({});
    dialogo.current?.showModal();
    setAbierto(true);
  }

  function cerrar() {
    dialogo.current?.close();
  }

  /* El evento close llega con el botón, con Esc y con clic fuera. */
  function alCerrar() {
    setAbierto(false);
    abridor.current?.focus();
  }

  /* Trampa de Tab: del último control al primero y al revés. */
  function alTeclear(evento: React.KeyboardEvent<HTMLDialogElement>) {
    if (evento.key !== "Tab" || !caja.current) return;
    const enfocables = caja.current.querySelectorAll<HTMLElement>(ENFOCABLES);
    if (enfocables.length === 0) return;
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  }

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (enviando.current || !flujo.negocio) return;
    const datos: Cotizacion = { nombre, telefono, tipo: flujo.tipo ?? "" };
    const resultado = envioCotizacion(flujo.negocio, datos, window.location.pathname);

    if (!resultado.valido) {
      const encontrados = resultado.errores;
      setErrores(encontrados);
      if (encontrados.tipo) {
        despachar({ tipo: "volver" });
        return;
      }
      const primero = ordenCampos.find((campo) => encontrados[campo]);
      if (primero) document.getElementById(`${id}-${primero}`)?.focus();
      return;
    }

    setErrores({});
    enviando.current = true;
    // Aviso por correo al equipo: sale sin esperar y no frena la redirección.
    avisarCotizacion({
      ...datos,
      negocio: flujo.negocio,
      pagina: window.location.pathname,
      sitio: trampa.current?.value ?? "",
      ms: Date.now() - abiertoEn.current,
    });
    registrarConversion(resultado.evento, {
      alSalir: () => window.location.assign(resultado.url),
    });
  }

  function propsCampo(campo: (typeof ordenCampos)[number]) {
    const error = errores[campo];
    return {
      id: `${id}-${campo}`,
      name: campo,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}-${campo}-error` : undefined,
    };
  }

  function mensajeError(campo: keyof Cotizacion) {
    const error = errores[campo];
    return error ? (
      <p id={`${id}-${campo}-error`} className="kb-campo-error">
        {error}
      </p>
    ) : null;
  }

  return (
    <CotizacionContexto.Provider value={{ abrir }}>
      {children}

      <dialog
        ref={dialogo}
        className="kb-popup"
        data-lenis-prevent
        aria-labelledby={`${id}-titulo`}
        onClose={alCerrar}
        onKeyDown={alTeclear}
        onClick={(evento) => {
          // El clic en el fondo oscuro llega al propio <dialog>.
          if (evento.target === dialogo.current) cerrar();
        }}
      >
        <div ref={caja} className="kb-cristal kb-popup-caja">
          <button
            type="button"
            className="kb-popup-cerrar"
            aria-label="Cerrar"
            onClick={cerrar}
          >
            <IconoCerrar />
          </button>

          <h2 id={`${id}-titulo`} className="kb-popup-titulo">
            {formularioActual ? formularioActual.titulo : "¿Qué necesitas?"}
          </h2>
          {formularioActual && (
            <p className="kb-popup-subtitulo">{formularioActual.subtitulo}</p>
          )}

          {!formularioActual ? (
            <div className="kb-popup-paso">
              <ul className="kb-popup-opciones">
                {NEGOCIOS.map(({ valor, nombre: texto, Icono }, indice) => (
                  <li key={valor}>
                    <button
                      ref={indice === 0 ? entradaPaso : undefined}
                      type="button"
                      className="kb-popup-opcion"
                      aria-pressed={flujo.negocio === valor}
                      onClick={() => {
                        setErrores({});
                        despachar({ tipo: "elegirNegocio", valor });
                      }}
                    >
                      <Icono className="kb-popup-opcion-icono" />
                      {texto}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : flujo.paso === "servicio" ? (
            <div className="kb-popup-paso">
              <div className="kb-popup-encabezado">
                <p className="kb-popup-pregunta">{formularioActual.pregunta}</p>
                {flujo.conPrevio && (
                  <button
                    type="button"
                    className="kb-popup-volver"
                    aria-label={`Volver al paso anterior: ${nombreNegocio}`}
                    onClick={() => despachar({ tipo: "volver" })}
                  >
                    <span aria-hidden="true">←</span> {nombreNegocio}
                  </button>
                )}
              </div>
              {mensajeError("tipo")}
              {/*
                Botones, no radios: cada opción avanza en cuanto se pulsa. Con
                radios, las flechas del teclado cambiarían la selección y
                dispararían el avance sin querer.
              */}
              <ul className="kb-popup-opciones">
                {formularioActual.opciones.map((opcion, indice) => {
                  const Icono = formularioActual.iconos?.[opcion];
                  return (
                    <li key={opcion}>
                      <button
                        ref={indice === 0 ? entradaPaso : undefined}
                        type="button"
                        className="kb-popup-opcion"
                        aria-pressed={flujo.tipo === opcion}
                        onClick={() => {
                          setErrores({});
                          despachar({ tipo: "elegir", valor: opcion });
                        }}
                      >
                        {Icono && <Icono className="kb-popup-opcion-icono" />}
                        {opcion}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <form className="kb-popup-paso" noValidate onSubmit={enviar}>
              <div className="kb-popup-encabezado">
                <p className="kb-popup-pregunta">Ingresa tus datos</p>
                <button
                  type="button"
                  className="kb-popup-volver"
                  aria-label={`Volver al paso anterior: ${flujo.tipo}`}
                  onClick={() => despachar({ tipo: "volver" })}
                >
                  <span aria-hidden="true">←</span> {flujo.tipo}
                </button>
              </div>

              <div className="kb-campo">
                <label htmlFor={`${id}-nombre`} className="kb-campo-etiqueta">
                  Nombre
                </label>
                <input
                  {...propsCampo("nombre")}
                  ref={entradaPaso}
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  required
                  className="kb-campo-texto"
                  value={nombre}
                  onChange={(evento) => {
                    setNombre(evento.target.value);
                    if (errores.nombre) setErrores((previos) => ({ ...previos, nombre: undefined }));
                  }}
                />
                {mensajeError("nombre")}
              </div>

              <div className="kb-campo">
                <label htmlFor={`${id}-telefono`} className="kb-campo-etiqueta">
                  Teléfono
                </label>
                <input
                  {...propsCampo("telefono")}
                  type="tel"
                  autoComplete="tel"
                  placeholder="81 0000 0000"
                  required
                  className="kb-campo-texto"
                  value={telefono}
                  onChange={(evento) => {
                    setTelefono(evento.target.value);
                    if (errores.telefono)
                      setErrores((previos) => ({ ...previos, telefono: undefined }));
                  }}
                />
                {mensajeError("telefono")}
              </div>

              {/*
                Campo trampa contra bots: oculto para las personas y fuera del
                orden de tabulación. Si llega lleno, no sale el correo de aviso.
              */}
              <input
                ref={trampa}
                type="text"
                name="sitio"
                className="kb-popup-trampa"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <button type="submit" className="kb-boton-principal kb-popup-enviar">
                <IconoWhatsApp className="kb-popup-enviar-icono" />
                Ir a WhatsApp
              </button>
              <p className="kb-popup-nota">
                Se abre WhatsApp con tus datos ya escritos. Solo tienes que enviar el mensaje.
              </p>
            </form>
          )}

          {/* Pie: el logo de Kanuby, sin enlace, en los dos pasos */}
          <Image
            src="/images/kanuby-orange.svg"
            alt="Kanuby"
            width={1593}
            height={338}
            sizes="110px"
            className="kb-popup-logo"
          />
        </div>
      </dialog>
    </CotizacionContexto.Provider>
  );
}
