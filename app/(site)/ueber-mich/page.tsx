import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Über mich – Sara Klauser",
  description:
    "Lerne Sara Klauser kennen – mobile Tierphysiotherapeutin aus Rheurdt. Ausbildung, Qualifikationen und Philosophie.",
};

const qualifications = [
  "Ausbildung zur staatlich anerkannten Tierphysiotherapeutin",
  "Tierheilpraktikerin",
  "Zertifizierte Blutegeltherapeutin",
  "Regelmäßige Fachfortbildungen",
  "Jahrelange Erfahrung mit Hunden, Katzen und Pferden",
];

export default async function UeberMichPage() {
  const siteSettings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    revalidate: 3600,
  }).catch(() => null);

  const aboutImageUrl = siteSettings?.aboutImage
    ? urlFor(siteSettings.aboutImage).width(800).height(1000).url()
    : "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=800&q=80";
  // ^ Platzhalter – ERSETZEN mit Saras eigenem Foto

  return (
    <>
      {/* Hero-Banner */}
      <section className="bg-accent py-12 md:py-16 border-b border-accent-dark/30">
        <div className="container-site text-center">
          <span className="text-highlight font-medium text-sm uppercase tracking-wide">
            Über mich
          </span>
          <h1 className="section-title mt-2">Hallo, ich bin Sara</h1>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            Tierphysiotherapeutin aus Leidenschaft – mobil in Rheurdt und der ganzen Region NRW.
          </p>
        </div>
      </section>

      {/* Hauptinhalt */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Bild */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={aboutImageUrl}
                  alt="Sara Klauser – Tierphysiotherapeutin"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Qualifikationen-Badge */}
              <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-2xl shadow-lg p-5 border border-accent-dark/20">
                <h3 className="font-serif text-base font-semibold text-brand-text mb-3">
                  Meine Qualifikationen
                </h3>
                <ul className="space-y-2">
                  {qualifications.map((q) => (
                    <li key={q} className="flex items-start gap-2 text-sm text-brand-text-light">
                      <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Text */}
            <div className="pt-0 lg:pt-4">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-text mb-6">
                Mein Weg zur mobilen Tierphysiotherapie
              </h2>

              <div className="space-y-5 text-brand-text-light leading-relaxed">
                <p>
                  Tiere sind für mich seit jeher mehr als nur Haustiere – sie sind Familienmitglieder,
                  Seelentröster und Begleiter. Diese tiefe Verbindung hat mich dazu bewogen, meine
                  Leidenschaft zum Beruf zu machen.
                </p>
                <p>
                  Nach meiner Ausbildung zur Tierphysiotherapeutin und weiteren Qualifikationen
                  als Tierheilpraktikerin habe ich mich bewusst für den mobilen Service entschieden:
                  Denn das Tier fühlt sich am wohlsten in seiner vertrauten Umgebung.
                </p>
                <p>
                  Stress durch unbekannte Praxisräume, fremde Gerüche und den Transportweg
                  können sich negativ auf den Behandlungserfolg auswirken. Bei mir kommt die
                  Therapie zu euch – ruhig, persönlich und individuell.
                </p>

                <div className="bg-accent rounded-2xl p-6 my-6">
                  <h3 className="font-serif text-lg font-semibold text-brand-text mb-3">
                    Meine Philosophie
                  </h3>
                  <blockquote className="text-brand-text-light italic text-base leading-relaxed border-l-4 border-highlight pl-4">
                    &ldquo;Ich sehe das Tier als Ganzes – sein Wohlbefinden, seine Geschichte
                    und seine Beziehung zu euch. Physiotherapie bedeutet für mich nicht nur
                    Behandlung, sondern auch Fürsorge und Vertrauen.&rdquo;
                  </blockquote>
                </div>

                <h3 className="font-serif text-xl font-semibold text-brand-text mt-6 mb-3">
                  Mobile Praxis – was bedeutet das?
                </h3>
                <p>
                  Als mobile Tierphysiotherapeutin habe ich alles Nötige dabei: Behandlungsliege,
                  Therapiemittel, Wärmepads und mehr. Ich fahre in einem Umkreis von ca. 40 km
                  rund um Rheurdt – also auch nach Geldern, Kevelaer, Kempen, Krefeld, Straelen
                  und weiteren Orten in der Region.
                </p>
                <p>
                  Bei Bedarf können wir auch besprechen, ob ein Termin in deiner Stallanlage
                  (für Pferde) oder beim Tierarzt deines Vertrauens möglich ist.
                </p>
              </div>

              <div className="mt-8">
                <Link href="/kontakt" className="btn-primary">
                  Termin anfragen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Lern mich persönlich kennen"
        description="Ruf mich an oder schreib mir eine Nachricht – ich freue mich auf dein Tier und euch!"
        buttonLabel="Jetzt Kontakt aufnehmen"
        variant="light"
      />
    </>
  );
}
