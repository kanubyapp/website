export type NavLink = {
  href: string;
  label: string;
  children?: NavLink[];
};

export const navLinks: NavLink[] = [
  {
    href: "/mudanzas",
    label: "Mudanzas",
    children: [
      { href: "/mudanzas/empresariales", label: "Empresariales" },
      { href: "/mudanzas/monterrey-cdmx", label: "Monterrey–CDMX" },
    ],
  },
  { href: "/mini-bodegas", label: "Mini Bodegas" },
];
