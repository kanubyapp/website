import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { reglasRobots } from "@/lib/indexacion";

/*
 * Según el dominio de la petición: en kanuby.com permite el rastreo y apunta
 * al sitemap; en cualquier otro lo bloquea todo (lib/indexacion.ts). Leer el
 * Host lo vuelve dinámico: se resuelve en cada petición.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  return reglasRobots((await headers()).get("host"));
}
