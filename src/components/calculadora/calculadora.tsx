"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { IconoCerrar, IconoWhatsApp } from "@/components/iconos";
import { useDialogoModal } from "@/components/use-dialogo-modal";
import { buscar, normalizar } from "@/lib/busqueda-calculadora";
import { CATEGORIAS, type ObjetoCatalogo } from "@/lib/catalogo-calculadora";
import {
  CANTIDAD_MAXIMA,
  cambiarCantidad,
  enLista,
  lineasInventario,
  objetosPorId,
  recomendar,
  tamanoSolicitado,
  urlCalculadora,
  textoCombinacion,
  TOPE_BODEGAS,
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
 *      (o la combinación de minibodegas) en isométrico llenándose y la
 *      recomendación con su ocupación. "Quiero esta minibodega" ("estas
 *      minibodegas" si son varias, "Escríbenos por WhatsApp" si no cabe ni en
 *      el tope) emite calculadora_solicitud y redirige a WhatsApp con la lista.
 * Arriba del catálogo, un buscador en todo el catálogo (lib/busqueda-
 * calculadora.ts): mientras tiene texto, la lista muestra los resultados y
 * las sugerencias de cajas en lugar de la categoría; al borrarlo (o con Esc)
 * regresa a la categoría donde estaba. Si no encuentra nada, ofrece
 * calcularlo en cajas. Cuántos resultados hay se anuncia (aria-live).
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

const OBJETOS = objetosPorId();
const IDS_CATALOGO = new Set(OBJETOS.keys());

function anuncioBusqueda(objetos: number, sugerencias: number): string {
  const cajas = sugerencias > 0 ? "te sugerimos cajas" : "";
  if (objetos === 0) return cajas ? `Sin objetos con ese nombre: ${cajas}.` : "Sin resultados.";
  const conteo = objetos === 1 ? "1 resultado" : `${objetos} resultados`;
  return cajas ? `${conteo}; también ${cajas}.` : `${conteo}.`;
}

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
  const [busqueda, setBusqueda] = useState("");

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
  const recomendacion = useMemo(() => recomendar(lineas), [lineas]);
  const porcentajes = recomendacion.bodegas.map(({ ocupacion }) => `${Math.round(ocupacion * 100)}%`);
  const una = recomendacion.cabe && recomendacion.bodegas.length === 1;
  const vacio = lineas.length === 0;
  const categoriaActual = CATEGORIAS.find((opcion) => opcion.id === categoria) ?? CATEGORIAS[0];
  const buscando = normalizar(busqueda) !== "";
  const resultado = useMemo(() => buscar(busqueda), [busqueda]);
  const sinResultados = resultado.objetos.length === 0 && resultado.sugerencias.length === 0;

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
    elegirCategoria(CATEGORIAS[destino].id);
  }

  /*
   * Elegir una categoría deja la búsqueda y lleva el foco a su pestaña. En
   * móvil las pestañas van en una fila con desplazamiento horizontal: la
   * elegida se trae a la vista (Safari no enfoca los botones al tocarlos).
   */
  function elegirCategoria(categoriaId: string) {
    setBusqueda("");
    setCategoria(categoriaId);
    const pestana = document.getElementById(`${id}-pestana-${categoriaId}`);
    pestana?.focus();
    pestana?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  /* Esc con texto limpia la búsqueda en lugar de cerrar el modal */
  function alTeclearBusqueda(evento: React.KeyboardEvent<HTMLInputElement>) {
    if (evento.key !== "Escape" || !busqueda) return;
    evento.preventDefault();
    evento.stopPropagation();
    setBusqueda("");
  }

  /*
   * Fila de un objeto con su contador. ambito distingue los ids cuando el
   * mismo objeto sale dos veces (en los resultados y en una sugerencia).
   * En el límite, aria-disabled y no disabled: el botón conserva el foco;
   * cambiarCantidad ya no pasa de 0 ni del máximo.
   */
  function fila(objeto: ObjetoCatalogo, ambito: string) {
    const cantidad = estado.inventario[objeto.id] ?? 0;
    const idCantidad = `${id}-${ambito}-cantidad-${objeto.id}`;
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
        <div
          ref={caja}
          className={`kb-cristal kb-popup-caja ${styles.caja} ${estado.registrado ? styles.cajaInventario : ""}`}
        >
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
                  bodegas={recomendacion.bodegas}
                  lineas={lineas}
                  etiqueta={recomendacion.bodegas
                    .map(
                      ({ bodega }, indice) =>
                        `Minibodega ${bodega.nombre} de ${bodega.tamano}, ocupada al ${porcentajes[indice]}`,
                    )
                    .join("; ")}
                />
                {/* La ocupación y la combinación se anuncian juntas */}
                <div className={styles.resultado} aria-live="polite" aria-atomic="true">
                  {una ? (
                    <p className={styles.ocupacion}>
                      <span className={styles.porcentaje}>{porcentajes[0]}</span> de ocupación
                    </p>
                  ) : (
                    <p className={styles.ocupacion}>Ocupación: {enLista(porcentajes)}</p>
                  )}
                  <p className={styles.tamano}>
                    {recomendacion.cabe
                      ? textoCombinacion(recomendacion)
                      : `No cabe ni en ${TOPE_BODEGAS} minibodegas Grandes. Escríbenos por WhatsApp y armamos un plan a tu medida.`}
                  </p>
                </div>
              </div>

              <div className={styles.catalogo}>
                <p className="kb-popup-pregunta">¿Qué quieres guardar?</p>
                <div role="search" className={styles.buscador}>
                  <input
                    ref={entradaPaso}
                    type="search"
                    className={`kb-campo-texto ${styles.busqueda}`}
                    aria-label="Buscar en el catálogo"
                    aria-controls={`${id}-resultados`}
                    placeholder="Busca: refri, librero, cajas…"
                    autoComplete="off"
                    enterKeyHint="search"
                    value={busqueda}
                    onChange={(evento) => setBusqueda(evento.target.value)}
                    onKeyDown={alTeclearBusqueda}
                  />
                  <p className={styles.conteo} aria-live="polite">
                    {buscando
                      ? anuncioBusqueda(resultado.objetos.length, resultado.sugerencias.length)
                      : ""}
                  </p>
                </div>

                <div role="tablist" aria-label="Categorías" className={styles.pestanas}>
                  {CATEGORIAS.map((opcion, indice) => {
                    const activa = !buscando && opcion.id === categoriaActual.id;
                    const enfocable = opcion.id === categoriaActual.id;
                    return (
                      <button
                        key={opcion.id}
                        id={`${id}-pestana-${opcion.id}`}
                        type="button"
                        role="tab"
                        aria-selected={activa}
                        aria-controls={`${id}-panel`}
                        tabIndex={enfocable ? 0 : -1}
                        className={styles.pestana}
                        onClick={() => elegirCategoria(opcion.id)}
                        onKeyDown={(evento) => alTeclearPestana(evento, indice)}
                      >
                        {opcion.nombre}
                      </button>
                    );
                  })}
                </div>

                {buscando ? (
                  <div id={`${id}-resultados`} className={styles.lista}>
                    {resultado.sugerencias.map((sugerencia) => (
                      <div key={sugerencia.id} className={styles.sugerencia}>
                        <p className={styles.sugerenciaTexto}>{sugerencia.texto}</p>
                        <ul className={styles.objetos}>
                          {sugerencia.cajas.flatMap((caja) => {
                            const objeto = OBJETOS.get(caja);
                            return objeto ? [fila(objeto, `sugerencia-${sugerencia.id}`)] : [];
                          })}
                        </ul>
                      </div>
                    ))}
                    {resultado.objetos.length > 0 && (
                      <ul className={styles.objetos}>
                        {resultado.objetos.map((objeto) => fila(objeto, "resultado"))}
                      </ul>
                    )}
                    {sinResultados && (
                      <button type="button" className={styles.chip} onClick={() => elegirCategoria("cajas")}>
                        ¿No encuentras lo que buscas? Calcúlalo en cajas
                      </button>
                    )}
                  </div>
                ) : (
                  <ul
                    id={`${id}-panel`}
                    role="tabpanel"
                    aria-labelledby={`${id}-pestana-${categoriaActual.id}`}
                    className={`${styles.lista} ${styles.objetos}`}
                  >
                    {categoriaActual.objetos.map((objeto) => fila(objeto, "categoria"))}
                  </ul>
                )}
              </div>

              <div className={styles.cierre}>
                <button
                  type="button"
                  className="kb-boton-principal kb-popup-enviar"
                  disabled={vacio}
                  onClick={solicitar}
                >
                  <IconoWhatsApp className="kb-popup-enviar-icono" />
                  {!recomendacion.cabe
                    ? "Escríbenos por WhatsApp"
                    : recomendacion.bodegas.length === 1
                      ? "Quiero esta minibodega"
                      : "Quiero estas minibodegas"}
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
