import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { ContactModalProvider } from "@/components/contact-modal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Kanuby | Mudanzas y minibodegas en Monterrey",
  description:
    "Kanuby ofrece mudanzas locales, nacionales y corporativas, además de renta de minibodegas en Monterrey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${dmSans.variable} h-full antialiased`}
    >
      {/*
        Header y main comparten celda: los dos empiezan en la fila 1, columna 1,
        y se dibujan uno encima del otro. Así el filo superior del header y el de
        la tarjeta del hero salen del MISMO --edge-gap medido desde el MISMO
        origen, sin ninguna cuenta que compense la altura del header. Cambiar el
        alto del pill ya no puede desalinear nada.

        grid-rows-[1fr_auto]: la fila apilada se come el alto sobrante y el
        footer queda al fondo también en páginas cortas.
      */}
      {/*
        El provider del modal envuelve todo el body: cualquier componente
        cliente del árbol puede abrirlo con useContactModal(), y el modal se
        monta una sola vez, fuera del flujo del grid.
      */}
      <body className="grid min-h-full grid-rows-[1fr_auto]">
        <ContactModalProvider>
          <SiteHeader />
          <main className="[grid-area:1/1]">{children}</main>
          <SiteFooter />
          <FloatingWhatsApp />
        </ContactModalProvider>
      </body>
    </html>
  );
}
