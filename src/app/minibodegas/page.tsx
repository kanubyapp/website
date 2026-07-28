import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renta de minibodegas en Monterrey | Kanuby",
  description:
    "Renta de minibodegas en Monterrey por mes: espacios seguros y vigilados para guardar muebles, inventario o documentos.",
};

export default function MinibodegasPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="text-4xl tracking-tight md:text-5xl">
        Renta de minibodegas
      </h1>
    </div>
  );
}
