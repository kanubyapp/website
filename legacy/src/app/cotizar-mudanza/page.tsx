import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotiza tu mudanza en Monterrey | Kanuby",
  description:
    "Calcula el costo de tu mudanza en Monterrey. Dinos qué necesitas mover y te damos una estimación.",

  /*
   * TODO(quitar-noindex): retirar este bloque `robots` completo en cuanto el
   * cotizador sea funcional (ver TODO(cotizador) más abajo).
   *
   * Hoy la página es un contenedor vacío: indexarla así la deja entrar al
   * índice como contenido de baja calidad y cuesta después recuperar la
   * posición.
   *
   * NO olvidarlo: esta URL es el destino previsto de un grupo de anuncios de
   * intención de precio. Con noindex puesto, el tráfico de Ads entra igual
   * —Google Ads no consulta robots meta para servir el anuncio— pero la página
   * no acumula nada de orgánico, así que dejarlo más tiempo del necesario sale
   * caro.
   *
   * follow: true a propósito: el enlace interno desde /mudanzas debe seguir
   * transmitiendo señal, y los enlaces salientes de esta página también.
   */
  robots: {
    index: false,
    follow: true,
  },
};

export default function CotizarMudanzaPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="text-4xl tracking-tight md:text-5xl">
        Cotiza tu mudanza
      </h1>
      {/* TODO(contenido-sin-validar): texto de apoyo del cotizador. */}
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Cuéntanos qué vas a mover y desde dónde.
      </p>

      {/*
        TODO(cotizador): contenedor del cotizador. La lógica no se construye en
        este paso — es un frente de trabajo aparte. Aquí va el formulario por
        pasos (inventario, origen y destino, fecha) y el resultado.

        Al montarlo, revisar si esta página debe quedar fuera del índice hasta
        que funcione: hoy es una ruta indexable sin contenido útil.
      */}
      <div className="mt-12 flex min-h-80 items-center justify-center rounded-lg border border-border bg-surface">
        <p className="text-ui text-sm text-muted">Cotizador · pendiente</p>
      </div>
    </div>
  );
}
