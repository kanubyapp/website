import type { NextConfig } from "next";
import { REDIRECCIONES } from "./src/lib/redirecciones.ts";

const nextConfig: NextConfig = {
  // kanuby.com publica todas sus URLs con barra final; se conservan igual.
  trailingSlash: true,
  images: {
    // 75: la calidad por omisión. 40: fondos difusos y muy tenues (el del
    // hero de /mudanzas-monterrey/), donde la compresión no se nota.
    qualities: [75, 40],
    /*
     * Los de Next (32 a 384) más 480 y 560: sin ellos, de 384 se saltaba a
     * 640 y una imagen de unos 400px (las tarjetas de /blog/ en escritorio)
     * bajaba la de 640.
     */
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 480, 560],
  },
  // URLs del WordPress anterior, todas 301 (src/lib/redirecciones.ts).
  async redirects() {
    return REDIRECCIONES;
  },
};

export default nextConfig;
