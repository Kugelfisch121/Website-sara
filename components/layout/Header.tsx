import Link from "next/link";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-accent-dark/30 shadow-sm">
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Wortmarke */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Startseite">
            {/* Placeholder logo – ersetzen wenn das echte Logo verfügbar ist */}
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-xl flex-shrink-0 group-hover:bg-primary-light transition-colors">
              T
            </div>
            <div className="leading-tight">
              <span className="block font-serif text-lg font-bold text-primary leading-none">
                Tierphysio
              </span>
              <span className="block font-sans text-sm text-brand-text-light leading-none mt-0.5">
                Klauser
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Navigation />
            <Link
              href="/kontakt"
              className="hidden md:inline-flex btn-primary text-sm py-2.5"
            >
              Termin anfragen
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
