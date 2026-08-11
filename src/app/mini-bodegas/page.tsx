import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini bodegas en Monterrey | Kanuby",
  description:
    "Renta de mini bodegas en Monterrey: espacios seguros y vigilados por mes para guardar muebles, inventario o archivo.",
};

export default function MiniBodegasPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="text-4xl tracking-tight md:text-5xl">Mini bodegas</h1>
      <p className="mt-6 text-base text-foreground/60">Contenido pendiente</p>
    </div>
  );
}
