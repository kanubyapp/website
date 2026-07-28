"use client";

import Script from "next/script";

/**
 * Widget de chat de respond.io.
 * El script se inyecta a sí mismo la burbuja en el DOM, por eso el componente
 * no renderiza ningún contenedor propio.
 */
export function ChatWidget() {
  return (
    <Script
      id="respondio__widget"
      src="https://cdn.respond.io/webchat/widget/widget.js?cId=16643cc0f8ebb2fd336711a46ecde30"
      strategy="afterInteractive"
    />
  );
}
