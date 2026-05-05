import { Metadata } from "next";
import { AppointmentForm } from "@/components/sections/AppointmentForm";
import { ContactForm } from "@/components/sections/ContactForm";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types";

export const metadata: Metadata = {
  title: "Kontakt & Terminanfrage",
  description:
    "Terminanfrage und Kontakt für Tierphysio Klauser – mobile Tierphysiotherapie in Rheurdt und Umgebung.",
};

export default async function KontaktPage() {
  const siteSettings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    revalidate: 3600,
  }).catch(() => null);

  const googleMapsUrl =
    siteSettings?.googleMapsUrl ??
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9944.123!2d6.427!3d51.497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8a3e5c93b3a1d%3A0x1234567890abcdef!2sRheurdt!5e0!3m2!1sde!2sde!4v1234567890";

  return (
    <>
      {/* Hero */}
      <section className="bg-accent py-12 md:py-16 border-b border-accent-dark/30">
        <div className="container-site text-center">
          <span className="text-highlight font-medium text-sm uppercase tracking-wide">
            Schreib mir
          </span>
          <h1 className="section-title mt-2">Kontakt & Termin</h1>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            Ich freue mich auf deine Nachricht! Gemeinsam finden wir den richtigen Termin
            und die passende Behandlung für dein Tier.
          </p>
        </div>
      </section>

      {/* Kontakt-Infos + Formulare */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Linke Spalte: Infos & Map */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-brand-text mb-4">
                  Direkter Kontakt
                </h2>
                <ul className="space-y-3 text-brand-text-light">
                  <li className="flex items-center gap-3">
                    <span className="text-2xl w-10 text-center flex-shrink-0">📞</span>
                    <div>
                      <span className="block text-xs font-medium text-brand-text uppercase tracking-wide mb-0.5">
                        Telefon
                      </span>
                      <a
                        href={`tel:${siteSettings?.telefon ?? ""}`}
                        className="text-primary hover:text-primary-light transition-colors font-medium"
                      >
                        {siteSettings?.telefon ?? "Telefonnummer folgt"}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl w-10 text-center flex-shrink-0">✉️</span>
                    <div>
                      <span className="block text-xs font-medium text-brand-text uppercase tracking-wide mb-0.5">
                        E-Mail
                      </span>
                      <a
                        href={`mailto:${siteSettings?.email ?? "info@tierphysio-klauser.de"}`}
                        className="text-primary hover:text-primary-light transition-colors font-medium break-all"
                      >
                        {siteSettings?.email ?? "info@tierphysio-klauser.de"}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl w-10 text-center flex-shrink-0">📍</span>
                    <div>
                      <span className="block text-xs font-medium text-brand-text uppercase tracking-wide mb-0.5">
                        Einzugsgebiet
                      </span>
                      <p className="text-sm whitespace-pre-line">
                        {siteSettings?.adresse ??
                          "Rheurdt und Umgebung\nNordrhein-Westfalen\n(ca. 40 km Radius)"}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Öffnungszeiten */}
              <div className="bg-accent rounded-2xl p-5">
                <h3 className="font-serif text-base font-semibold text-brand-text mb-3">
                  ⏰ Erreichbarkeit
                </h3>
                <ul className="space-y-1.5 text-sm text-brand-text-light">
                  <li className="flex justify-between">
                    <span>Montag – Freitag</span>
                    <span className="font-medium">9–18 Uhr</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Samstag</span>
                    <span className="font-medium">9–13 Uhr</span>
                  </li>
                  <li className="flex justify-between text-brand-text-muted">
                    <span>Sonntag</span>
                    <span>geschlossen</span>
                  </li>
                </ul>
                <p className="text-xs text-brand-text-muted mt-3">
                  Außerhalb der Zeiten gerne per E-Mail oder Nachricht.
                </p>
              </div>

              {/* Google Maps */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-accent-dark/30 aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19888.04!2d6.418!3d51.497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8a3e5c93b3a1d%3A0x0!2sRheurdt%2C+47509%2C+Germany!5e0!3m2!1sde!2sde!4v1000000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Standort Tierphysio Klauser – Rheurdt"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Rechte Spalte: Formulare */}
            <div className="lg:col-span-2 space-y-10">
              {/* Terminanfrage */}
              <div>
                <h2 className="font-serif text-xl font-bold text-brand-text mb-6 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-highlight inline-block" />
                  Termin anfragen
                </h2>
                <AppointmentForm />
              </div>

              <hr className="border-accent-dark/30" />

              {/* Allgemeines Kontaktformular */}
              <div>
                <h2 className="font-serif text-xl font-bold text-brand-text mb-2 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-highlight inline-block" />
                  Allgemeine Anfrage
                </h2>
                <p className="text-brand-text-light text-sm mb-5">
                  Fragen, Feedback oder einfach nur Hallo sagen? Schreib mir!
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
