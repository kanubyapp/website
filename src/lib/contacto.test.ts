import { test } from "node:test";
import assert from "node:assert/strict";
import { NUMERO_WHATSAPP, TELEFONO_ENLACE, TELEFONO_VISIBLE } from "./contacto.ts";

test("el teléfono sale de un solo número en sus tres formas", () => {
  assert.equal(TELEFONO_VISIBLE, "81 1028 7087");
  assert.equal(TELEFONO_ENLACE, "tel:+528110287087");
  assert.equal(NUMERO_WHATSAPP, "5218110287087");
});
