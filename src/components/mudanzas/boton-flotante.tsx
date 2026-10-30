"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IconoBodegaMediana, IconoCamion, IconoCerrar, IconoWhatsApp } from "@/components/iconos";
import { avisarCotizacion } from "@/lib/aviso-cotizacion";
import {
  envioFlotante,
  SERVICIO_FLOTANTE,
  type ErroresFlotante,
  type PaginaFlotante,
} from "@/lib/contacto-flotante";
import { registrarConversion, type Negocio } from "@/lib/conversiones";
import {
  estaArriba,
  GLOBITO_APARECE_MS,
  siguienteFase,
  type FaseGlobito,
} from "@/lib/globito-flotante";
import styles from "./boton-flotante.module.css";

/*
 * Botón flotante de WhatsApp y su popup chico, anclado a la esquina del
 * botón: nombre y teléfono (y en la home, el servicio). No es el popup de
 * cotización: sin velo, sin pasos y sin bloquear la página. Es un popover
 * nativo: el botón lo abre y lo cierra, y el navegador lo cierra con Esc o
 * con clic fuera; al cerrarse, el foco vuelve al botón. Al enviar hace lo
 * mismo que el popup de cotización: aviso por correo sin esperar, evento
 * cotizacion_* y WhatsApp en la misma pestaña al confirmar GTM o al límite.
 *
 * Para que se note: el botón pulsa de vez en cuando (solo CSS) y, unos
 * segundos después de llegar, sale un globito "Contáctanos" que abre el
 * mismo popup si la persona sigue arriba de la página
 * (lib/globito-flotante.ts). Ninguno de los dos toma el foco.
 */

/* Los íconos son los del paso "¿Qué necesitas?" del popup de cotización */
const SERVICIOS: {
  valor: Negocio;
  nombre: string;
  Icono: (props: { className?: string }) => React.ReactNode;
}[] = [
  { valor: "mudanza", nombre: "Mudanzas", Icono: IconoCamion },
  { valor: "minibodega", nombre: "Minibodegas", Icono: IconoBodegaMediana },
];

const ordenCampos = ["nombre", "telefono", "servicio"] as const;

export function BotonFlotante({ pagina, className }: { pagina: PaginaFlotante; className: string }) {
  const id = useId();
  const idPopup = `${id}-popup`;
  const boton = useRef<HTMLButtonElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const primerCampo = useRef<HTMLInputElement>(null);
  /* Contra bots (aviso por correo): cuándo se abrió y el campo trampa. */
  const abiertoEn = useRef(0);
  const trampa = useRef<HTMLInputElement>(null);
  /* Mientras espera a que salga el evento, otro envío no registra de nuevo. */
  const enviando = useRef(false);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState<Negocio | null>(null);
  const [errores, setErrores] = useState<ErroresFlotante>({});
  const preguntaServicio = SERVICIO_FLOTANTE[pagina] === null;

  /* Globito: su temporizador, para cortarlo si se abre el popup antes de que salga */
  const [fase, setFase] = useState<FaseGlobito>("esperando");
  const aparicion = useRef<number | undefined>(undefined);

  function detenerGlobito() {
    window.clearTimeout(aparicion.current);
  }

  useEffect(() => {
    aparicion.current = window.setTimeout(() => {
      const arriba = estaArriba(window.scrollY);
      setFase((actual) => siguienteFase(actual, "aparece", arriba));
    }, GLOBITO_APARECE_MS);
    return detenerGlobito;
  }, []);

  /*
   * Ya visible, se queda aunque la persona baje; fuera de lo alto de la
   * página deja pasar los clics a lo que tenga debajo (salvo su ✕). Sale
   * siempre estando arriba, así que empieza en true.
   */
  const [globitoArriba, setGlobitoArriba] = useState(true);

  useEffect(() => {
    if (fase !== "visible") return;
    const alDesplazar = () => setGlobitoArriba(estaArriba(window.scrollY));
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, [fase]);

  /* Cerrado con su ✕: el foco, que se queda sin lugar, pasa al botón */
  function cerrarGlobito() {
    detenerGlobito();
    setFase((actual) => siguienteFase(actual, "cerrar"));
    boton.current?.focus();
  }

  /* Cada apertura empieza vacía; al cerrar, el foco vuelve al botón si estaba dentro o se perdió */
  function alAlternar(evento: React.ToggleEvent<HTMLDivElement>) {
    if (evento.newState === "open") {
      // Con el popup abierto el globito sobra, y ya no vuelve en esta carga
      detenerGlobito();
      setFase((actual) => siguienteFase(actual, "popup"));
      abiertoEn.current = Date.now();
      enviando.current = false;
      setNombre("");
      setTelefono("");
      setServicio(null);
      setErrores({});
      primerCampo.current?.focus();
      return;
    }
    const activo = document.activeElement;
    if (!activo || activo === document.body || popup.current?.contains(activo)) {
      boton.current?.focus();
    }
  }

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (enviando.current) return;
    const resultado = envioFlotante(pagina, { nombre, telefono, servicio });

    if (!resultado.valido) {
      setErrores(resultado.errores);
      const primero = ordenCampos.find((campo) => resultado.errores[campo]);
      if (primero) document.getElementById(`${id}-${primero}`)?.focus();
      return;
    }

    setErrores({});
    enviando.current = true;
    // Aviso por correo al equipo: sale sin esperar y no frena la redirección.
    avisarCotizacion({
      nombre,
      telefono,
      tipo: "",
      negocio: resultado.negocio,
      pagina: window.location.pathname,
      formulario: "flotante",
      sitio: trampa.current?.value ?? "",
      ms: Date.now() - abiertoEn.current,
    });
    registrarConversion(resultado.evento, {
      alSalir: () => window.location.assign(resultado.url),
    });
  }

  function propsCampo(campo: "nombre" | "telefono") {
    const error = errores[campo];
    return {
      id: `${id}-${campo}`,
      name: campo,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}-${campo}-error` : undefined,
    };
  }

  function mensajeError(campo: (typeof ordenCampos)[number], className = "") {
    const error = errores[campo];
    return error ? (
      <p id={`${id}-${campo}-error`} className={`kb-campo-error ${className}`}>
        {error}
      </p>
    ) : null;
  }

  return (
    <>
      <button
        ref={boton}
        type="button"
        className={`${className} ${styles.boton}`}
        aria-label="Cotizar por WhatsApp"
        popoverTarget={idPopup}
      >
        <IconoWhatsApp />
      </button>

      {/*
        Globito: siempre en el HTML, oculto (sin foco ni lector de pantalla)
        salvo en su fase visible, para que entre y salga con transición.
      */}
      <div
        className={[
          styles.globito,
          fase === "visible" && styles.globitoVisible,
          fase === "visible" && !globitoArriba && styles.globitoAtravesable,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <button type="button" className={styles.globitoMensaje} popoverTarget={idPopup}>
          Contáctanos
        </button>
        <button
          type="button"
          className={`kb-popup-cerrar ${styles.globitoCerrar}`}
          aria-label="Cerrar mensaje"
          onClick={cerrarGlobito}
        >
          <IconoCerrar />
        </button>
      </div>

      <div
        ref={popup}
        id={idPopup}
        popover="auto"
        role="dialog"
        aria-labelledby={`${id}-titulo`}
        className={`kb-cristal ${styles.popup}`}
        data-lenis-prevent
        onToggle={alAlternar}
      >
        <button
          type="button"
          className={`kb-popup-cerrar ${styles.cerrar}`}
          aria-label="Cerrar"
          popoverTarget={idPopup}
          popoverTargetAction="hide"
        >
          <IconoCerrar />
        </button>

        <h2 id={`${id}-titulo`} className={`kb-popup-titulo ${styles.titulo}`}>
          Contáctanos por WhatsApp
        </h2>

        <form className={styles.formulario} noValidate onSubmit={enviar}>
          {/*
            Etiquetas flotantes: el marcador de posición es un espacio para
            que el CSS sepa con :placeholder-shown si el campo está vacío.
          */}
          <div className={`kb-campo ${styles.campo}`}>
            <label htmlFor={`${id}-nombre`} className={`kb-campo-etiqueta ${styles.etiqueta}`}>
              Nombre
            </label>
            <input
              {...propsCampo("nombre")}
              ref={primerCampo}
              type="text"
              autoComplete="name"
              placeholder=" "
              required
              className={`kb-campo-texto ${styles.campoTexto}`}
              value={nombre}
              onChange={(evento) => {
                setNombre(evento.target.value);
                if (errores.nombre) setErrores((previos) => ({ ...previos, nombre: undefined }));
              }}
            />
            {mensajeError("nombre")}
          </div>

          <div className={`kb-campo ${styles.campo}`}>
            <label htmlFor={`${id}-telefono`} className={`kb-campo-etiqueta ${styles.etiqueta}`}>
              Teléfono
            </label>
            <input
              {...propsCampo("telefono")}
              type="tel"
              autoComplete="tel"
              placeholder=" "
              required
              className={`kb-campo-texto ${styles.campoTexto}`}
              value={telefono}
              onChange={(evento) => {
                setTelefono(evento.target.value);
                if (errores.telefono)
                  setErrores((previos) => ({ ...previos, telefono: undefined }));
              }}
            />
            {mensajeError("telefono")}
          </div>

          {preguntaServicio && (
            // Sin etiqueta visible: Mudanzas y Minibodegas se explican solas
            <fieldset
              className={styles.servicio}
              aria-label="Servicio"
              aria-describedby={errores.servicio ? `${id}-servicio-error` : undefined}
            >
              <div className={styles.opciones}>
                {SERVICIOS.map(({ valor, nombre: texto, Icono }, indice) => (
                  <label key={valor} className={`kb-popup-opcion ${styles.opcion}`}>
                    <input
                      id={indice === 0 ? `${id}-servicio` : undefined}
                      type="radio"
                      name="servicio"
                      value={valor}
                      required
                      className={styles.radio}
                      checked={servicio === valor}
                      onChange={() => {
                        setServicio(valor);
                        if (errores.servicio)
                          setErrores((previos) => ({ ...previos, servicio: undefined }));
                      }}
                    />
                    <Icono className={styles.opcionIcono} />
                    {texto}
                  </label>
                ))}
              </div>
              {mensajeError("servicio", styles.error)}
            </fieldset>
          )}

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

          <button type="submit" className={`kb-boton-principal kb-popup-enviar ${styles.enviar}`}>
            <IconoWhatsApp className="kb-popup-enviar-icono" />
            Ir a WhatsApp
          </button>
          <p className={`kb-popup-nota ${styles.nota}`}>
            Al dar clic aceptas recibir comunicaciones de Kanuby.
          </p>
        </form>
      </div>
    </>
  );
}
