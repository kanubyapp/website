"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { IconoCerrar, IconoWhatsApp } from "@/components/iconos";
import { useDialogoModal } from "@/components/use-dialogo-modal";
import { CATEGORIAS } from "@/lib/catalogo-calculadora";
import {
  CANTIDAD_MAXIMA,
  cambiarCantidad,
  lineasInventario,
  objetosPorId,
  recomendar,
  tamanoSolicitado,
  urlCalculadora,
  volumenInventario,
} from "@/lib/calculadora";
import {
  eventoCalculadoraRegistro,
  eventoCalculadoraSolicitud,
  registrarConversion,
} from "@/lib/conversiones";
import {
  cargarCalculadora,
  estadoVacio,
  guardarCalculadora,
  type EstadoCalculadora,
} from "@/lib/guardado-calculadora";
import { validarContacto, type ErroresCotizacion } from "@/lib/whatsapp";
import { Isometrico } from "./isometrico";
import styles from "./calculadora.module.css";

/*
 * Calculadora de espacio para minibodegas, en un modal que abre cualquier
 * botón de la página con useCalculadora().abrir() (BotonCalculadora). Sin
 * precios. Dos pasos:
 *   1. Registro: nombre y teléfono. Al completarlo emite calculadora_registro.
 *   2. Inventario: el catálogo por categorías con cantidades, la minibodega
 *      en isométrico llenándose y la recomendación con su ocupación. "Quiero
 *      esta minibodega" (o "Escríbenos por WhatsApp" si no cabe) emite
 *      calculadora_solicitud y redirige a WhatsApp con la lista.
 * Lo que lleva se guarda conforme avanza (lib/guardado-calculadora.ts): si
 * cierra o regresa después, lo encuentra igual, y con el registro hecho abre
 * directo en el inventario. Foco, cierre y trampa de Tab son los del popup
 * de cotización (useDialogoModal).
 */

const CalculadoraContexto = createContext<{ abrir: () => void } | null>(null);

export function useCalculadora() {
  const contexto = useContext(CalculadoraContexto);
  if (!contexto) throw new Error("useCalculadora necesita CalculadoraProvider");
  return contexto;
}

const IDS_CATALOGO = new Set(objetosPorId().keys());

const ordenCampos = ["nombre", "telefono"] as const;

export function CalculadoraProvider({ children }: { children: React.ReactNode }) {
  const { caja, abierto, abrir: abrirDialogo, cerrar, propsDialogo } = useDialogoModal();
  /* Primer control del paso activo: ahí va el foco al entrar en el paso. */
  const entradaPaso = useRef<HTMLButtonElement & HTMLInputElement>(null);
  /* Mientras espera a que salga el evento, otro clic no registra de nuevo. */
  const enviando = useRef(false);
  const id = useId();

  const [estado, setEstado] = useState<EstadoCalculadora>(estadoVacio);
  const [cargado, setCargado] = useState(false);
  const [errores, setErrores] = useState<ErroresCotizacion>({});
  const [categoria, setCategoria] = useState(CATEGORIAS[0].id);

  useEffect(() => {
    let vigente = true;
    cargarCalculadora(IDS_CATALOGO, CANTIDAD_MAXIMA).then((guardado) => {
      if (!vigente) return;
      if (guardado) setEstado(guardado);
      setCargado(true);
    });
    return () => {
      vigente = false;
    };
  }, []);

  // Antes de cargar no se guarda: pisaría lo guardado con el estado vacío.
  useEffect(() => {
    if (cargado) guardarCalculadora(estado);
  }, [cargado, estado]);

  useEffect(() => {
    if (abierto) entradaPaso.current?.focus();
  }, [abierto, estado.registrado]);

  const lineas = useMemo(() => lineasInventario(estado.inventario), [estado.inventario]);
  const recomendacion = recomendar(volumenInventario(lineas));
  const porcentaje = Math.round(recomendacion.ocupacion * 100);
  const vacio = lineas.length === 0;
  const { bodega } = recomendacion;
  const categoriaActual = CATEGORIAS.find((opcion) => opcion.id === categoria) ?? CATEGORIAS[0];

  function abrir() {
    enviando.current = false;
    setErrores({});
    abrirDialogo();
  }

  function registrar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const encontrados = validarContacto(estado);
    const primero = ordenCampos.find((campo) => encontrados[campo]);
    if (primero) {
      setErrores(encontrados);
      document.getElementById(`${id}-${primero}`)?.focus();
      return;
    }
    setErrores({});
    setEstado((previo) => ({ ...previo, registrado: true }));
    registrarConversion(eventoCalculadoraRegistro(window.location.pathname));
  }

  function cambiar(objeto: string, cambio: number) {
    setEstado((previo) => ({
      ...previo,
      inventario: cambiarCantidad(previo.inventario, objeto, cambio),
    }));
  }

  function solicitar() {
    if (enviando.current || vacio) return;
    enviando.current = true;
    const url = urlCalculadora(estado.nombre, recomendacion, lineas);
    registrarConversion(
      eventoCalculadoraSolicitud(window.location.pathname, tamanoSolicitado(recomendacion)),
      { alSalir: () => window.location.assign(url) },
    );
  }

  /* Pestañas de categoría: las flechas, Inicio y Fin mueven la selección */
  function alTeclearPestana(evento: React.KeyboardEvent<HTMLButtonElement>, indice: number) {
    const destinos: Record<string, number> = {
      ArrowRight: (indice + 1) % CATEGORIAS.length,
      ArrowLeft: (indice - 1 + CATEGORIAS.length) % CATEGORIAS.length,
      Home: 0,
      End: CATEGORIAS.length - 1,
    };
    const destino = destinos[evento.key];
    if (destino === undefined) return;
    evento.preventDefault();
    setCategoria(CATEGORIAS[destino].id);
    document.getElementById(`${id}-pestana-${CATEGORIAS[destino].id}`)?.focus();
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

  function mensajeError(campo: (typeof ordenCampos)[number]) {
    const error = errores[campo];
    return error ? (
      <p id={`${id}-${campo}-error`} className="kb-campo-error">
        {error}
      </p>
    ) : null;
  }

  function escribir(campo: (typeof ordenCampos)[number], valor: string) {
    setEstado((previo) => ({ ...previo, [campo]: valor }));
    if (errores[campo]) setErrores((previos) => ({ ...previos, [campo]: undefined }));
  }

  return (
    <CalculadoraContexto.Provider value={{ abrir }}>
      {children}

      <dialog
        {...propsDialogo}
        className={`kb-popup ${styles.dialogo}`}
        data-lenis-prevent
        aria-labelledby={`${id}-titulo`}
      >
        <div ref={caja} className={`kb-cristal kb-popup-caja ${styles.caja}`}>
          <button type="button" className="kb-popup-cerrar" aria-label="Cerrar" onClick={cerrar}>
            <IconoCerrar />
          </button>

          <h2 id={`${id}-titulo`} className="kb-popup-titulo">
            Calcula tu espacio
          </h2>
          <p className="kb-popup-subtitulo">
            Agrega lo que quieres guardar y te recomendamos el tamaño de minibodega.
          </p>

          {!estado.registrado ? (
            <form className={`kb-popup-paso ${styles.registro}`} noValidate onSubmit={registrar}>
              <p className="kb-popup-pregunta">Ingresa tus datos</p>

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
                  value={estado.nombre}
                  onChange={(evento) => escribir("nombre", evento.target.value)}
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
                  value={estado.telefono}
                  onChange={(evento) => escribir("telefono", evento.target.value)}
                />
                {mensajeError("telefono")}
              </div>

              <button type="submit" className="kb-boton-principal kb-popup-enviar">
                Continuar
              </button>
              <p className="kb-popup-nota">
                Al continuar aceptas nuestro{" "}
                <Link href="/aviso-de-privacidad/" className={styles.enlace}>
                  aviso de privacidad
                </Link>
                .
              </p>
            </form>
          ) : (
            <div className={`kb-popup-paso ${styles.inventario}`}>
              <div className={styles.vista}>
                <Isometrico
                  bodega={bodega}
                  lineas={lineas}
                  etiqueta={`Minibodega ${bodega.nombre} de ${bodega.tamano}, ocupada al ${porcentaje}%`}
                />
                <p className={styles.ocupacion}>
                  <span className={styles.porcentaje}>{porcentaje}%</span> de ocupación
                </p>
                <p className={styles.resultado} aria-live="polite">
                  {vacio
                    ? "Agrega lo que quieres guardar para ver qué minibodega te conviene."
                    : recomendacion.cabe
                      ? `Te recomendamos la minibodega ${bodega.nombre} de ${bodega.tamano}, ocupada al ${porcentaje}%.`
                      : `Lo que agregaste no cabe en nuestra minibodega más grande, de ${bodega.tamano}: ocuparía el ${porcentaje}%. Escríbenos por WhatsApp y te ayudamos a encontrar una opción.`}
                </p>
              </div>

              <div className={styles.catalogo}>
                <p className="kb-popup-pregunta">¿Qué quieres guardar?</p>
                <div role="tablist" aria-label="Categorías" className={styles.pestanas}>
                  {CATEGORIAS.map((opcion, indice) => {
                    const activa = opcion.id === categoriaActual.id;
                    return (
                      <button
                        key={opcion.id}
                        ref={activa ? entradaPaso : undefined}
                        id={`${id}-pestana-${opcion.id}`}
                        type="button"
                        role="tab"
                        aria-selected={activa}
                        aria-controls={`${id}-panel`}
                        tabIndex={activa ? 0 : -1}
                        className={styles.pestana}
                        onClick={() => setCategoria(opcion.id)}
                        onKeyDown={(evento) => alTeclearPestana(evento, indice)}
                      >
                        {opcion.nombre}
                      </button>
                    );
                  })}
                </div>

                <ul
                  id={`${id}-panel`}
                  role="tabpanel"
                  aria-labelledby={`${id}-pestana-${categoriaActual.id}`}
                  className={styles.objetos}
                >
                  {categoriaActual.objetos.map((objeto) => {
                    const cantidad = estado.inventario[objeto.id] ?? 0;
                    const idCantidad = `${id}-cantidad-${objeto.id}`;
                    // En el límite, aria-disabled y no disabled: el botón conserva el foco.
                    // cambiarCantidad ya no pasa de 0 ni del máximo.
                    return (
                      <li key={objeto.id} className={styles.objeto}>
                        <span className={styles.objetoNombre}>{objeto.nombre}</span>
                        <span className={styles.contador}>
                          <button
                            type="button"
                            className={styles.contadorBoton}
                            aria-label={`Quitar: ${objeto.nombre}`}
                            aria-describedby={idCantidad}
                            aria-disabled={cantidad === 0}
                            onClick={() => cambiar(objeto.id, -1)}
                          >
                            <span aria-hidden="true">−</span>
                          </button>
                          <span id={idCantidad} className={styles.cantidad}>
                            {cantidad}
                          </span>
                          <button
                            type="button"
                            className={styles.contadorBoton}
                            aria-label={`Agregar: ${objeto.nombre}`}
                            aria-describedby={idCantidad}
                            aria-disabled={cantidad === CANTIDAD_MAXIMA}
                            onClick={() => cambiar(objeto.id, 1)}
                          >
                            <span aria-hidden="true">+</span>
                          </button>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className={styles.cierre}>
                <button
                  type="button"
                  className="kb-boton-principal kb-popup-enviar"
                  disabled={vacio}
                  onClick={solicitar}
                >
                  <IconoWhatsApp className="kb-popup-enviar-icono" />
                  {recomendacion.cabe ? "Quiero esta minibodega" : "Escríbenos por WhatsApp"}
                </button>
                <p className="kb-popup-nota">
                  Se abre WhatsApp con tu lista ya escrita. Solo tienes que enviar el mensaje.
                </p>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </CalculadoraContexto.Provider>
  );
}
