"use client";

import { createContext, useContext, useId, useRef, useState } from "react";
import { IconoCerrar } from "@/components/iconos";
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
 * Popup de cotización de kanuby.com: el de mudanza (popup 4914) y el de
 * minibodega (popup 4947) comparten estructura; cambian textos, opciones y
 * mensaje. Cualquier botón de la página lo abre con useCotizacion().abrir().
 * Se cierra con su botón, con Esc y con clic fuera del cuadro.
 */

const FORMULARIOS = {
  mudanza: {
    titulo: "Cotiza ahora tu Mudanza con Kanuby",
    subtitulo: "Completa el formulario, te llevará a WhatsApp.",
    etiqueta: "Tipo de Servicio:",
    opciones: TIPOS_MUDANZA as readonly string[],
    selectorObligatorio: true,
    validar: validarCotizacionMudanza,
    mensaje: (datos: Cotizacion) =>
      mensajeMudanza(datos.nombre, datos.tipo as TipoMudanza, datos.correo),
  },
  minibodega: {
    titulo: "Cotiza tu minibodega ahora",
    subtitulo: "Al completar el formulario te llevará a WhatsApp.",
    etiqueta: "¿Cuánto Espacio Buscas?",
    opciones: TAMANOS_MINIBODEGA as readonly string[],
    selectorObligatorio: false,
    validar: validarCotizacionMinibodega,
    mensaje: (datos: Cotizacion) =>
      mensajeMinibodega(datos.nombre, datos.tipo as TamanoMinibodega, datos.correo),
  },
};

const CotizacionContexto = createContext<{ abrir: () => void } | null>(null);

export function useCotizacion() {
  const contexto = useContext(CotizacionContexto);
  if (!contexto) throw new Error("useCotizacion necesita CotizacionProvider");
  return contexto;
}

const ordenCampos = ["nombre", "correo", "telefono", "tipo"] as const;

export function CotizacionProvider({
  tipo = "mudanza",
  className = "",
  children,
}: {
  tipo?: keyof typeof FORMULARIOS;
  className?: string;
  children: React.ReactNode;
}) {
  const formularioActual = FORMULARIOS[tipo];
  const dialogo = useRef<HTMLDialogElement>(null);
  const formulario = useRef<HTMLFormElement>(null);
  const id = useId();
  const [datos, setDatos] = useState<Cotizacion>({
    nombre: "",
    correo: "",
    telefono: "",
    tipo: formularioActual.opciones[0],
  });
  const [errores, setErrores] = useState<ErroresCotizacion>({});

  function abrir() {
    dialogo.current?.showModal();
  }

  function cerrar() {
    dialogo.current?.close();
  }

  function cambiar(campo: keyof Cotizacion, valor: string) {
    setDatos((previos) => ({ ...previos, [campo]: valor }));
    if (errores[campo]) setErrores((previos) => ({ ...previos, [campo]: undefined }));
  }

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const encontrados = formularioActual.validar(datos);
    setErrores(encontrados);

    const primero = ordenCampos.find((campo) => encontrados[campo]);
    if (primero) {
      formulario.current?.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    window.location.assign(urlWhatsApp(formularioActual.mensaje(datos)));
  }

  function propsCampo(campo: keyof Cotizacion) {
    const error = errores[campo];
    return {
      id: `${id}-${campo}`,
      name: campo,
      value: datos[campo],
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
        className={`kb-popup ${className}`}
        aria-labelledby={`${id}-titulo`}
        onClick={(evento) => {
          // El clic en el fondo oscuro llega al propio <dialog>.
          if (evento.target === dialogo.current) cerrar();
        }}
      >
        <div className="kb-popup-caja">
          <button
            type="button"
            className="kb-popup-cerrar"
            aria-label="Cerrar"
            onClick={cerrar}
          >
            <IconoCerrar />
          </button>

          <div className="kb-popup-contenido">
            <h2 id={`${id}-titulo`} className="kb-popup-titulo">
              {formularioActual.titulo}
            </h2>
            <p className="kb-popup-subtitulo">
              {formularioActual.subtitulo}
            </p>

            <form
              ref={formulario}
              className="kb-formulario"
              noValidate
              onSubmit={enviar}
            >
              <div className="kb-campo">
                <input
                  {...propsCampo("nombre")}
                  type="text"
                  autoComplete="name"
                  placeholder="Nombre"
                  aria-label="Nombre"
                  required
                  className="kb-campo-texto"
                  onChange={(evento) => cambiar("nombre", evento.target.value)}
                />
                {mensajeError("nombre")}
              </div>
              <div className="kb-campo kb-campo-mitad">
                <input
                  {...propsCampo("correo")}
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  aria-label="Email"
                  required
                  className="kb-campo-texto"
                  onChange={(evento) => cambiar("correo", evento.target.value)}
                />
                {mensajeError("correo")}
              </div>
              <div className="kb-campo kb-campo-mitad">
                <input
                  {...propsCampo("telefono")}
                  type="tel"
                  autoComplete="tel"
                  placeholder="Teléfono"
                  aria-label="Teléfono"
                  required
                  className="kb-campo-texto"
                  onChange={(evento) => cambiar("telefono", evento.target.value)}
                />
                {mensajeError("telefono")}
              </div>
              <div className="kb-campo">
                <label htmlFor={`${id}-tipo`} className="kb-campo-etiqueta">
                  {formularioActual.etiqueta}
                </label>
                <div className="kb-selector">
                  <select
                    {...propsCampo("tipo")}
                    required={formularioActual.selectorObligatorio}
                    className="kb-campo-texto"
                    onChange={(evento) => cambiar("tipo", evento.target.value)}
                  >
                    {formularioActual.opciones.map((opcion) => (
                      <option key={opcion} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
                {mensajeError("tipo")}
              </div>
              <div className="kb-campo">
                <button type="submit" className="kb-enviar">
                  Ir a WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </CotizacionContexto.Provider>
  );
}
