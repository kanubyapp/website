import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mudanzas en Monterrey | Kanuby",
  description:
    "Servicio de mudanzas locales en Monterrey y su área metropolitana: empaque, carga y traslado seguro con Kanuby.",
};

export default function MudanzasMonterreyPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="text-4xl tracking-tight md:text-5xl">
        Mudanzas en Monterrey
      </h1>
    </div>
  );
}
