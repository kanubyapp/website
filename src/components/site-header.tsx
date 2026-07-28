"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/nav";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="font-heading text-2xl font-semibold lowercase tracking-tight text-brand-orange transition-colors hover:text-brand-orange-hover"
        >
          kanuby
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="text-ui text-sm text-foreground transition-colors hover:text-brand-orange aria-[current=page]:text-brand-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface md:hidden"
        >
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-200 ${
                isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-200 ${
                isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-nav"
          aria-label="Principal móvil"
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="text-ui block border-b border-border py-3 text-base text-foreground last:border-b-0 aria-[current=page]:text-brand-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
