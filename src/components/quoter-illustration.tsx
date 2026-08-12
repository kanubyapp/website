/**
 * Ilustración esquemática del cotizador: una interfaz con filas de objetos y un
 * resultado abajo. SVG inline, sin assets externos, dibujado solo con colores
 * del sistema (azul de marca a distintas opacidades).
 *
 * Es decorativa: el significado lo lleva el texto de la sección, por eso va con
 * aria-hidden y sin título accesible.
 */
export function QuoterIllustration() {
  const rows = [
    { y: 68, label: 96, qty: 22 },
    { y: 108, label: 128, qty: 30 },
    { y: 148, label: 78, qty: 18 },
  ];

  return (
    <svg
      viewBox="0 0 380 260"
      fill="none"
      aria-hidden="true"
      className="h-auto w-full text-brand-blue"
    >
      {/* Marco de la interfaz */}
      <rect
        x="8"
        y="8"
        width="364"
        height="244"
        rx="16"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />

      {/* Barra de título */}
      <rect
        x="8"
        y="8"
        width="364"
        height="36"
        rx="16"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <circle cx="32" cy="26" r="4" fill="currentColor" fillOpacity="0.35" />
      <circle cx="46" cy="26" r="4" fill="currentColor" fillOpacity="0.2" />
      <circle cx="60" cy="26" r="4" fill="currentColor" fillOpacity="0.2" />
      <rect
        x="84"
        y="22"
        width="88"
        height="8"
        rx="4"
        fill="currentColor"
        fillOpacity="0.25"
      />

      {/* Filas de objetos: icono de caja, etiqueta y cantidad */}
      {rows.map((row) => (
        <g key={row.y}>
          <rect
            x="32"
            y={row.y}
            width="24"
            height="24"
            rx="5"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <path
            d={`M32 ${row.y + 9}h24`}
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <rect
            x="70"
            y={row.y + 8}
            width={row.label}
            height="8"
            rx="4"
            fill="currentColor"
            fillOpacity="0.22"
          />
          <rect
            x={348 - row.qty}
            y={row.y + 6}
            width={row.qty}
            height="12"
            rx="6"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
        </g>
      ))}

      {/* Divisor */}
      <path
        d="M32 192h316"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Resultado */}
      <rect
        x="32"
        y="208"
        width="316"
        height="30"
        rx="8"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <rect
        x="46"
        y="219"
        width="72"
        height="8"
        rx="4"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <rect
        x="252"
        y="216"
        width="82"
        height="14"
        rx="7"
        fill="currentColor"
        fillOpacity="0.5"
      />
    </svg>
  );
}
