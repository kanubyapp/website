import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mudanzas corporativas en Monterrey | Kanuby",
  description:
    "Mudanzas corporativas y de oficinas en Monterrey: planeación, logística y traslado con mínima interrupción para tu empresa.",
};

export default function MudanzasCorporativasPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="text-4xl tracking-tight md:text-5xl">
        Mudanzas corporativas
      </h1>
    </div>
  );
}
