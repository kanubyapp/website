import { NextResponse, type NextRequest } from "next/server";
import { encabezadoNoIndex } from "@/lib/indexacion";
import { rutaEnMinusculas } from "@/lib/redirecciones";

/*
 * Una ruta con mayúsculas se manda con 301 a su versión en minúsculas
 * (lib/redirecciones.ts). Fuera de kanuby.com (la URL de Vercel, vistas
 * previas), todas las respuestas llevan X-Robots-Tag: noindex, nofollow,
 * también las páginas estáticas. En kanuby.com no se agrega nada
 * (lib/indexacion.ts).
 */
export function proxy(peticion: NextRequest) {
  const minusculas = rutaEnMinusculas(peticion.nextUrl.pathname);
  const destino = peticion.nextUrl.clone();
  if (minusculas) destino.pathname = minusculas;
  const respuesta = minusculas ? NextResponse.redirect(destino, 301) : NextResponse.next();
  const noIndex = encabezadoNoIndex(peticion.headers.get("host"));
  if (noIndex) respuesta.headers.set("X-Robots-Tag", noIndex);
  return respuesta;
}

export const config = {
  // Todo menos los archivos de compilación de Next, que no se indexan.
  matcher: "/((?!_next/static|_next/webpack-hmr).*)",
};
