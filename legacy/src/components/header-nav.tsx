"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type HeaderNavLink = {
  href: string;
  label: string;
};

const HeaderNavContext = createContext<{
  links: HeaderNavLink[];
  setLinks: (links: HeaderNavLink[]) => void;
} | null>(null);

/**
 * Vive una vez en el layout raíz, por encima de SiteHeader y de <main>. Así
 * una página dentro de <main> puede publicar su propio nav y SiteHeader —que
 * no recibe props porque el layout lo monta sin conocer la página activa—
 * lo lee de aquí.
 */
export function HeaderNavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [links, setLinks] = useState<HeaderNavLink[]>([]);

  return (
    <HeaderNavContext.Provider value={{ links, setLinks }}>
      {children}
    </HeaderNavContext.Provider>
  );
}

/** Lo consume SiteHeader para pintar el nav de la página activa, si hay. */
export function useHeaderNavLinks() {
  const ctx = useContext(HeaderNavContext);
  if (!ctx) {
    throw new Error(
      "useHeaderNavLinks necesita <HeaderNavProvider> por encima en el árbol.",
    );
  }
  return ctx.links;
}

/**
 * Lo monta la página que quiere nav propio en el header — es el "prop" de
 * cada página hacia el header, expresado como componente porque el header
 * vive fuera del árbol de la página. Se limpia al desmontar —al navegar a
 * otra ruta— para que esos enlaces no se queden pegados en páginas que no
 * los declaran.
 */
export function SetHeaderNav({ links }: { links: HeaderNavLink[] }) {
  const ctx = useContext(HeaderNavContext);
  if (!ctx) {
    throw new Error(
      "SetHeaderNav necesita <HeaderNavProvider> por encima en el árbol.",
    );
  }
  const { setLinks } = ctx;

  // links es un literal nuevo en cada render del padre: se compara por
  // contenido vía JSON.stringify, no por identidad, para no reabrir el
  // efecto en cada render sin que los enlaces hayan cambiado de verdad.
  useEffect(() => {
    setLinks(links);
    return () => setLinks([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(links)]);

  return null;
}
