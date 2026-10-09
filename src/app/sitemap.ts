import type { MetadataRoute } from "next";
import { entradasSitemap } from "@/lib/indexacion";

/* Las páginas indexables, con URL absoluta en kanuby.com (lib/indexacion.ts) */
export default function sitemap(): MetadataRoute.Sitemap {
  return entradasSitemap();
}
