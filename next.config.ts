import type { NextConfig } from "next";
import { REDIRECCIONES } from "./src/lib/redirecciones.ts";

const nextConfig: NextConfig = {
  // kanuby.com publica todas sus URLs con barra final; se conservan igual.
  trailingSlash: true,
  images: {
    // 75: la calidad por omisión. 40: fondos difusos y muy tenues (el del
    // hero de /mudanzas-monterrey/), donde la compresión no se nota.
    qualities: [75, 40],
  },
  // URLs del WordPress anterior, todas 301 (src/lib/redirecciones.ts).
  async redirects() {
    return REDIRECCIONES;
  },
};

export default nextConfig;
