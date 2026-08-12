export type StorageSize = {
  /** Nombre comercial del tamaño. Ej: "Chica". */
  name: string;
  /** Medidas en m². Ej: "4 m²". */
  area: string;
  /** A qué corresponde en muebles, en lenguaje del cliente. */
  equivalence: string;
  /** Precio mensual ya formateado. Ej: "$1,200 / mes". */
  monthlyPrice: string;
};

type StorageSizeCardsProps = {
  sizes: StorageSize[];
};

/**
 * Tarjetas de tamaños de bodega.
 *
 * El componente NO conoce ningún tamaño ni precio: los recibe enteros. Los
 * datos que hoy le llegan son de ejemplo y están marcados en la página; al
 * llegar los reales solo se sustituye el array.
 */
export function StorageSizeCards({ sizes }: StorageSizeCardsProps) {
  return (
    <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sizes.map((size) => (
        <li
          key={size.name}
          className="flex flex-col rounded-lg border border-border p-7"
        >
          <h3 className="font-heading text-xl text-foreground">{size.name}</h3>
          <p className="font-heading mt-1 text-3xl text-brand-blue">
            {size.area}
          </p>
          <p className="mt-4 flex-1 text-base text-muted">
            {size.equivalence}
          </p>
          <p className="text-ui mt-6 border-t border-border pt-5 text-base font-medium text-foreground">
            {size.monthlyPrice}
          </p>
        </li>
      ))}
    </ul>
  );
}
