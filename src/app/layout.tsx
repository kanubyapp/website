import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { CapturaCampana } from "@/components/captura-campana";
import { ScrollSuave } from "@/components/scroll-suave";
import { contenedorGtm } from "@/lib/gtm";
import "lenis/dist/lenis.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/patrones.css";
import "./styles/interacciones.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kanuby.com"),
  title: {
    template: "%s - Kanuby",
    default: "Kanuby",
  },
  openGraph: {
    siteName: "Kanuby",
  },
};

/*
 * GTM solo si existe NEXT_PUBLIC_GTM_ID (se da de alta en Vercel al publicar).
 * Instalación estándar: el snippet en el <head>, lo antes posible (gtm.js se
 * pide asíncrono y no bloquea), y el <noscript> justo al abrir el <body>.
 * Va como <script> en el HTML y no con next/script: beforeInteractive deja el
 * código en línea a cargo del runtime de Next, que corre más tarde.
 */
const gtm = contenedorGtm(process.env.NEXT_PUBLIC_GTM_ID);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior: Next quita el desplazamiento suave al cambiar de
    // página; solo se anima el salto a anclas de la misma página (base.css).
    <html
      lang="es-MX"
      className={`${outfit.variable} ${dmSans.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        {gtm && <script dangerouslySetInnerHTML={{ __html: gtm.script }} />}
      </head>
      <body>
        {gtm && (
          <noscript>
            <iframe src={gtm.iframe} title="Google Tag Manager" width="0" height="0" hidden />
          </noscript>
        )}
        <ScrollSuave />
        <CapturaCampana />
        {children}
      </body>
    </html>
  );
}
