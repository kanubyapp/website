"use client";

import { createContext, useContext, useEffect, useId, useReducer, useRef, useState } from "react";
import { IconoCerrar, IconoWhatsApp } from "@/components/iconos";
import { FLUJO_INICIAL, flujoCotizacion } from "@/lib/flujo-cotizacion";
import {
  mensajeMinibodega,
  mensajeMudanza,
  TAMANOS_MINIBODEGA,
  TIPOS_MUDANZA,
  urlWhatsApp,
  validarCotizacionMinibodega,
  validarCotizacionMudanza,
  type Cotizacion,
  type ErroresCotizacion,
  type TamanoMinibodega,
  type TipoMudanza,
} from "@/lib/whatsapp";

/*
 * Popup de cotización con la estructura del modal de legacy: paso 1, el tipo
 * de mudanza o el tamaño de minibodega como tarjetas que avanzan al tocarlas;
 * paso 2, nombre y teléfono. Al enviar, valida y redirige a WhatsApp en la
 * misma pestaña. Cualquier botón de la página lo abre con
 * useCotizacion().abrir(). Se cierra con su botón, con Esc y con clic fuera;
 * mientras está abierto el foco queda dentro, el fondo no hace scroll
 * (interacciones.css) y al cerrar el foco vuelve a quien lo abrió.
 */

const FORMULARIOS = {
  mudanza: {
    titulo: "Cotiza ahora tu Mudanza con Kanuby",
    subtitulo: "Completa el formulario, te llevará a WhatsApp.",
    pregunta: "¿Qué tipo de mudanza estás buscando?",
    opciones: TIPOS_MUDANZA as readonly string[],
    validar: validarCotizacionMudanza,
    mensaje: (datos: Cotizacion) => mensajeMudanza(datos.nombre, datos.tipo as TipoMudanza),
  },
  minibodega: {
    titulo: "Cotiza tu minibodega ahora",
    subtitulo: "Al completar el formulario te llevará a WhatsApp.",
    pregunta: "¿Cuánto Espacio Buscas?",
    opciones: TAMANOS_MINIBODEGA as readonly string[],
    validar: validarCotizacionMinibodega,
    mensaje: (datos: Cotizacion) =>
      mensajeMinibodega(datos.nombre, datos.tipo as TamanoMinibodega),
  },
};

const CotizacionContexto = createContext<{ abrir: () => void } | null>(null);

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
  tipo?: keyof typeof FORMULARIOS;
  children: React.ReactNode;
}) {
  const formularioActual = FORMULARIOS[tipo];
  const dialogo = useRef<HTMLDialogElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  /* Primer control del paso activo: ahí va el foco al entrar en el paso. */
  const entradaPaso = useRef<HTMLButtonElement & HTMLInputElement>(null);
  /* Quien abrió el popup, para devolverle el foco al cerrar. */
  const abridor = useRef<HTMLElement | null>(null);
  const id = useId();

  const [abierto, setAbierto] = useState(false);
  const [flujo, despachar] = useReducer(flujoCotizacion, FLUJO_INICIAL);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errores, setErrores] = useState<ErroresCotizacion>({});

  useEffect(() => {
    if (abierto) entradaPaso.current?.focus();
  }, [abierto, flujo.paso]);

  function abrir() {
    abridor.current = document.activeElement as HTMLElement | null;
    despachar({ tipo: "reiniciar" });
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
    const datos: Cotizacion = { nombre, telefono, tipo: flujo.tipo ?? "" };
    const encontrados = formularioActual.validar(datos);
    setErrores(encontrados);

    if (encontrados.tipo) {
      despachar({ tipo: "volver" });
      return;
    }
    const primero = ordenCampos.find((campo) => encontrados[campo]);
    if (primero) {
      document.getElementById(`${id}-${primero}`)?.focus();
      return;
    }

    window.location.assign(urlWhatsApp(formularioActual.mensaje(datos)));
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
        aria-labelledby={`${id}-titulo`}
        onClose={alCerrar}
        onKeyDown={alTeclear}
        onClick={(evento) => {
          // El clic en el fondo oscuro llega al propio <dialog>.
          if (evento.target === dialogo.current) cerrar();
        }}
      >
        <div ref={caja} className="kb-vidrio kb-popup-caja">
          <button
            type="button"
            className="kb-popup-cerrar"
            aria-label="Cerrar"
            onClick={cerrar}
          >
            <IconoCerrar />
          </button>

          <h2 id={`${id}-titulo`} className="kb-popup-titulo">
            {formularioActual.titulo}
          </h2>
          <p className="kb-popup-subtitulo">{formularioActual.subtitulo}</p>

          {flujo.paso === "servicio" ? (
            <div className="kb-popup-paso">
              <p className="kb-popup-pregunta">{formularioActual.pregunta}</p>
              {mensajeError("tipo")}
              {/*
                Botones, no radios: cada opción avanza en cuanto se pulsa. Con
                radios, las flechas del teclado cambiarían la selección y
                dispararían el avance sin querer.
              */}
              <ul className="kb-popup-opciones">
                {formularioActual.opciones.map((opcion, indice) => (
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
                      {opcion}
                    </button>
                  </li>
                ))}
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

              <button type="submit" className="kb-boton-principal kb-popup-enviar">
                <IconoWhatsApp className="kb-popup-enviar-icono" />
                Ir a WhatsApp
              </button>
              <p className="kb-popup-nota">
                Se abre WhatsApp con tus datos ya escritos. Solo tienes que enviar el mensaje.
              </p>
            </form>
          )}
        </div>
      </dialog>
    </CotizacionContexto.Provider>
  );
}
