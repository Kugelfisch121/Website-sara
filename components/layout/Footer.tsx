import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Spalte 1: Über */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-serif font-bold text-xl">
                T
              </div>
              <div className="leading-tight">
                <span className="block font-serif text-lg font-bold leading-none">Tierphysio</span>
                <span className="block font-sans text-sm text-white/70 leading-none mt-0.5">Klauser</span>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Mobile Tierphysiotherapie für Hunde, Katzen und Pferde – ich komme zu dir nach Hause.
              Rheurdt und Umgebung.
            </p>
          </div>

          {/* Spalte 2: Navigation */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Schnellnavigation</h3>
            <ul className="space-y-2">
              {[
                { href: "/ueber-mich", label: "Über mich" },
                { href: "/leistungen", label: "Leistungen" },
                { href: "/preise", label: "Preise" },
                { href: "/news", label: "News & Tipps" },
                { href: "/kontakt", label: "Kontakt & Termin" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spalte 3: Kontakt */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a
                  href="tel:+4928351234567"
                  className="hover:text-white transition-colors"
                >
                  {/* Echte Telefonnummer einsetzen */}
                  📞 Telefonnummer folgt
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@tierphysio-klauser.de"
                  className="hover:text-white transition-colors"
                >
                  ✉️ info@tierphysio-klauser.de
                </a>
              </li>
              <li className="text-white/70">
                📍 Rheurdt, Nordrhein-Westfalen
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-5">
              {/* Facebook-Link aus Sanity SiteSettings einbinden */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Unterer Streifen */}
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-white/60">
          <p>© {currentYear} Tierphysio Klauser – Sara Klauser. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
