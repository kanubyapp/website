import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mudanzas nacionales México–Monterrey | Kanuby",
  description:
    "Mudanzas nacionales desde y hacia Monterrey a cualquier estado de México, con seguimiento y traslado asegurado.",
};

export default function MudanzasNacionalesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="text-4xl tracking-tight md:text-5xl">
        Mudanzas nacionales
      </h1>
    </div>
  );
}
