"use client";

import { createContext, useContext, useId, useRef, useState } from "react";
import { IconoCerrar } from "@/components/iconos";
import {
  mensajeMudanza,
  TIPOS_MUDANZA,
  urlWhatsApp,
  validarCotizacionMudanza,
  type CotizacionMudanza,
  type ErroresCotizacion,
  type TipoMudanza,
} from "@/lib/whatsapp";

/*
 * Popup "Cotiza ahora tu Mudanza con Kanuby" (popup 4914 de kanuby.com).
 * Cualquier botón de la página lo abre con useCotizacion().abrir().
 * Se cierra con su botón, con Esc y con clic fuera del cuadro.
 */

const CotizacionContexto = createContext<{ abrir: () => void } | null>(null);

export function useCotizacion() {
  const contexto = useContext(CotizacionContexto);
  if (!contexto) throw new Error("useCotizacion necesita CotizacionMudanzaProvider");
  return contexto;
}

const vacio: CotizacionMudanza = {
  nombre: "",
  correo: "",
  telefono: "",
  tipo: TIPOS_MUDANZA[0],
};

const ordenCampos = ["nombre", "correo", "telefono", "tipo"] as const;

export function CotizacionMudanzaProvider({ children }: { children: React.ReactNode }) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const formulario = useRef<HTMLFormElement>(null);
  const id = useId();
  const [datos, setDatos] = useState(vacio);
  const [errores, setErrores] = useState<ErroresCotizacion>({});

  function abrir() {
    dialogo.current?.showModal();
  }

  function cerrar() {
    dialogo.current?.close();
  }

  function cambiar(campo: keyof CotizacionMudanza, valor: string) {
    setDatos((previos) => ({ ...previos, [campo]: valor }));
    if (errores[campo]) setErrores((previos) => ({ ...previos, [campo]: undefined }));
  }

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const encontrados = validarCotizacionMudanza(datos);
    setErrores(encontrados);

    const primero = ordenCampos.find((campo) => encontrados[campo]);
    if (primero) {
      formulario.current?.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    const mensaje = mensajeMudanza(datos.nombre, datos.tipo as TipoMudanza, datos.correo);
    window.location.assign(urlWhatsApp(mensaje));
  }

  function propsCampo(campo: keyof CotizacionMudanza) {
    const error = errores[campo];
    return {
      id: `${id}-${campo}`,
      name: campo,
      value: datos[campo],
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}-${campo}-error` : undefined,
    };
  }

  function mensajeError(campo: keyof CotizacionMudanza) {
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
              Cotiza ahora tu Mudanza con Kanuby
            </h2>
            <p className="kb-popup-subtitulo">
              Completa el formulario, te llevará a WhatsApp.
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
                  Tipo de Servicio:
                </label>
                <div className="kb-selector">
                  <select
                    {...propsCampo("tipo")}
                    required
                    className="kb-campo-texto"
                    onChange={(evento) => cambiar("tipo", evento.target.value)}
                  >
                    {TIPOS_MUDANZA.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
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
