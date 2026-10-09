import { IconoTelefono } from "@/components/iconos";

/*
 * Teléfono del header, junto al logo en todas las páginas: ícono en círculo
 * naranja que timbra (repique y dos aros de pulso desfasados, del header de
 * legacy) y el número al lado. En móvil queda solo el círculo, con el número
 * como nombre accesible. Los estilos son el patrón kb-telefono.
 */
export function TelefonoHeader({ className = "" }: { className?: string }) {
  return (
    <a href="tel:+528110287087" className={`kb-telefono ${className}`}>
      <span className="kb-telefono-circulo" aria-hidden="true">
        <span className="kb-telefono-pulso" />
        <span className="kb-telefono-pulso kb-telefono-pulso-desfase" />
        <IconoTelefono className="kb-telefono-icono" />
      </span>
      <span className="kb-telefono-numero">81 1028 7087</span>
    </a>
  );
}
