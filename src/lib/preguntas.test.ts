import { test } from "node:test";
import assert from "node:assert/strict";
import { jsonLdPreguntas, textoPlano } from "./preguntas.ts";

test("texto plano: párrafos seguidos, listas con punto y el salto de línea como espacio", () => {
  assert.equal(
    textoPlano(["Aceptamos:", ["Tarjeta", "Transferencia"], "Uno\nDos"]),
    "Aceptamos: Tarjeta. Transferencia Uno Dos",
  );
});

test("JSON-LD de FAQPage: una Question por pregunta, en orden, con su respuesta en texto", () => {
  const datos = jsonLdPreguntas([
    { pregunta: "¿Primera?", respuesta: ["Sí."] },
    { pregunta: "¿Segunda?", respuesta: ["Incluye:", ["A", "B"]] },
  ]);
  assert.equal(datos["@context"], "https://schema.org");
  assert.equal(datos["@type"], "FAQPage");
  assert.deepEqual(datos.mainEntity, [
    { "@type": "Question", name: "¿Primera?", acceptedAnswer: { "@type": "Answer", text: "Sí." } },
    {
      "@type": "Question",
      name: "¿Segunda?",
      acceptedAnswer: { "@type": "Answer", text: "Incluye: A. B" },
    },
  ]);
});
