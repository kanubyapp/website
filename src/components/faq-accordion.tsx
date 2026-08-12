"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

/**
 * Acordeón accesible: cada pregunta es un <button> real con aria-expanded y
 * aria-controls, y el panel es una región etiquetada por su botón. Se navega
 * con Tab y se abre con Enter o Espacio sin JS adicional.
 *
 * Se usa <button> en vez de <details>/<summary> para poder animar y estilar el
 * estado abierto de forma consistente entre navegadores.
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="border-t border-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question} className="border-b border-border">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="text-ui flex w-full items-center justify-between gap-6 py-5 text-left text-base text-foreground transition-colors hover:text-brand-orange-accessible md:text-lg"
              >
                <span>{item.question}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 shrink-0 text-brand-blue transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pr-12"
            >
              <p className="text-base text-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
