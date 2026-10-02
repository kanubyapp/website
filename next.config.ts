import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // kanuby.com publica todas sus URLs con barra final; se conservan igual.
  trailingSlash: true,
};

export default nextConfig;
