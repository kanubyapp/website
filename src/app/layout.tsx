import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import Script from "next/script";
import { CapturaCampana } from "@/components/captura-campana";
import { ScrollSuave } from "@/components/scroll-suave";
import { TELEFONO_VISIBLE } from "@/lib/contacto";
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

/*
 * Tag de Google propio para la conversión de llamada de Google Ads con número
 * de reenvío: a quien llega de un anuncio, Google cambia en la página el
 * número visible por uno suyo. phone_conversion_number tiene que ser idéntico
 * al que se pinta, por eso sale de lib/contacto.ts. Convive con GTM (mismo
 * dataLayer), no lo reemplaza.
 */
const gadsLlamadas = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-11154476951');
  gtag('config', 'AW-11154476951/sBUSCLnP9q4dEJef78Yp', {
    'phone_conversion_number': ${JSON.stringify(TELEFONO_VISIBLE)}
  });
`;

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11154476951"
          strategy="afterInteractive"
        />
        <Script id="gads-llamadas" strategy="afterInteractive">
          {gadsLlamadas}
        </Script>
        <ScrollSuave />
        <CapturaCampana />
        {children}
      </body>
    </html>
  );
}
