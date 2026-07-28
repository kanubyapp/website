import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanuby | Mudanzas y minibodegas en Monterrey",
  description:
    "Mudanzas locales, nacionales y corporativas y renta de minibodegas en Monterrey. Cotiza tu mudanza con Kanuby.",
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="text-4xl tracking-tight md:text-5xl">
        Mudanzas y minibodegas en Monterrey
      </h1>
    </div>
  );
}
