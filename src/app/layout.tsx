import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { ScrollSuave } from "@/components/scroll-suave";
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
      <body>
        <ScrollSuave />
        {children}
      </body>
    </html>
  );
}
