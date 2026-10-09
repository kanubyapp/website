import { NextResponse, type NextRequest } from "next/server";
import { encabezadoNoIndex } from "@/lib/indexacion";

/*
 * Fuera de kanuby.com (la URL de Vercel, vistas previas), todas las
 * respuestas llevan X-Robots-Tag: noindex, nofollow, también las páginas
 * estáticas. En kanuby.com no se agrega nada (lib/indexacion.ts).
 */
export function proxy(peticion: NextRequest) {
  const respuesta = NextResponse.next();
  const noIndex = encabezadoNoIndex(peticion.headers.get("host"));
  if (noIndex) respuesta.headers.set("X-Robots-Tag", noIndex);
  return respuesta;
}

export const config = {
  // Todo menos los archivos de compilación de Next, que no se indexan.
  matcher: "/((?!_next/static|_next/webpack-hmr).*)",
};
