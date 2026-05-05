"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/preise", label: "Preise" },
  { href: "/news", label: "News & Tipps" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="relative" aria-label="Hauptnavigation">
      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-brand-text-light hover:text-primary hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 rounded-lg text-brand-text hover:bg-accent transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-lg border border-accent-dark/30 overflow-hidden z-50">
          <ul className="py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-brand-text hover:text-primary hover:bg-accent"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-4 pt-2 pb-3 border-t border-accent-dark/30 mt-2">
              <Link
                href="/kontakt"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full text-center text-sm py-2.5"
              >
                Termin anfragen
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
