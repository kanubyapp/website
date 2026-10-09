import { test } from "node:test";
import assert from "node:assert/strict";
import { crearDialogoModal, ENFOCABLES, type Enfocable } from "./dialogo-modal.ts";

/*
 * Comportamiento del popup de cotización (y de la calculadora), que antes
 * vivía dentro de cotizacion.tsx: abrir y cerrar el <dialog>, devolver el
 * foco a quien lo abrió, cerrar con clic fuera y la trampa de Tab.
 */

function escenario() {
  const registro: string[] = [];
  let enfocado: Enfocable | null = null;
  const control = (nombre: string): Enfocable => {
    const elemento: Enfocable = {
      focus: () => {
        enfocado = elemento;
        registro.push(`foco:${nombre}`);
      },
    };
    return elemento;
  };
  const dialogo = {
    showModal: () => registro.push("showModal"),
    close: () => registro.push("close"),
  };
  const boton = control("boton");
  const [primero, medio, ultimo] = [control("primero"), control("medio"), control("ultimo")];
  const selectores: string[] = [];
  const caja = {
    querySelectorAll: (selector: string) => {
      selectores.push(selector);
      return [primero, medio, ultimo];
    },
  };
  const controlador = crearDialogoModal();
  // Como el hook: el <dialog> y el foco actual en cada llamada
  const modal = {
    abrir: () => controlador.abrir(dialogo, enfocado),
    cerrar: () => controlador.cerrar(dialogo),
    alCerrar: () => controlador.alCerrar(),
    alClic: (target: unknown) => controlador.alClic(target, dialogo),
    alTeclear: (evento: Parameters<typeof controlador.alTeclear>[0], cajaActual: typeof caja | null) =>
      controlador.alTeclear(evento, cajaActual, enfocado),
  };
  const enfocar = (elemento: Enfocable) => {
    enfocado = elemento;
  };
  return { registro, modal, dialogo, caja, boton, primero, medio, ultimo, enfocar, selectores };
}

const tecla = (key: string, shiftKey = false) => {
  const evento = { key, shiftKey, prevenido: false, preventDefault: () => (evento.prevenido = true) };
  return evento;
};

test("abrir muestra el diálogo como modal", () => {
  const { registro, modal } = escenario();
  modal.abrir();
  assert.deepEqual(registro, ["showModal"]);
});

test("al cerrarse, el foco vuelve a quien lo abrió", () => {
  const { registro, modal, boton, primero, enfocar } = escenario();
  enfocar(boton);
  modal.abrir();
  enfocar(primero);
  modal.cerrar();
  modal.alCerrar();
  assert.deepEqual(registro, ["showModal", "close", "foco:boton"]);
});

test("el clic en el fondo (el propio dialog) cierra; dentro de la caja no", () => {
  const { registro, modal, dialogo, caja } = escenario();
  modal.alClic(caja);
  assert.deepEqual(registro, []);
  modal.alClic(dialogo);
  assert.deepEqual(registro, ["close"]);
});

test("Tab en el último control vuelve al primero", () => {
  const { registro, modal, caja, ultimo, enfocar } = escenario();
  enfocar(ultimo);
  const evento = tecla("Tab");
  modal.alTeclear(evento, caja);
  assert.equal(evento.prevenido, true);
  assert.deepEqual(registro, ["foco:primero"]);
});

test("Shift+Tab en el primer control va al último", () => {
  const { registro, modal, caja, primero, enfocar } = escenario();
  enfocar(primero);
  const evento = tecla("Tab", true);
  modal.alTeclear(evento, caja);
  assert.equal(evento.prevenido, true);
  assert.deepEqual(registro, ["foco:ultimo"]);
});

test("Tab en medio, otras teclas o sin caja: el navegador sigue normal", () => {
  const { registro, modal, caja, medio, ultimo, enfocar } = escenario();
  enfocar(medio);
  const enMedio = tecla("Tab");
  modal.alTeclear(enMedio, caja);
  enfocar(ultimo);
  const otra = tecla("Enter");
  modal.alTeclear(otra, caja);
  const sinCaja = tecla("Tab");
  modal.alTeclear(sinCaja, null);
  assert.equal(enMedio.prevenido || otra.prevenido || sinCaja.prevenido, false);
  assert.deepEqual(registro, []);
});

test("la trampa considera los mismos controles que antes", () => {
  const { modal, caja, ultimo, enfocar, selectores } = escenario();
  enfocar(ultimo);
  modal.alTeclear(tecla("Tab"), caja);
  assert.deepEqual(selectores, [ENFOCABLES]);
  assert.equal(
    ENFOCABLES,
    'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
});
