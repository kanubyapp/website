import Link from "next/link";
import { navLinks } from "@/lib/nav";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <Link
              href="/"
              className="font-heading text-2xl font-semibold lowercase tracking-tight text-brand-orange transition-colors hover:text-brand-orange-hover"
            >
              kanuby
            </Link>
            <p className="mt-4 max-w-sm text-base text-white/70">
              Mudanzas y minibodegas en Monterrey. Locales, nacionales y
              corporativas.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-sm font-medium uppercase tracking-wider text-white">
              Descubre más
            </h2>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ui text-base text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6">
          <p className="text-ui text-sm text-white/60">
            © {year} Kanuby. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
