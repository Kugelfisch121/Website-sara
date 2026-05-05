import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-site">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl font-bold text-brand-text mb-8">
            Datenschutzerklärung
          </h1>

          {/* ================================================================
              PLATZHALTER – Diese Datenschutzerklärung ist ein Muster.
              Vor dem Go-Live durch eine professionelle, DSGVO-konforme
              Erklärung ersetzen oder durch einen Datenschutzgenerator
              (z.B. datenschutz.org) anpassen lassen!
              ================================================================ */}

          <div className="prose prose-sm max-w-none text-brand-text-light space-y-6">
            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="font-sans text-base font-semibold text-brand-text mt-4 mb-2">
                Allgemeine Hinweise
              </h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
                Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
                werden können.
              </p>
              <h3 className="font-sans text-base font-semibold text-brand-text mt-4 mb-2">
                Datenerfassung auf dieser Website
              </h3>
              <p>
                Wer ist verantwortlich für die Datenerfassung auf dieser Website? Die
                Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
                Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">
                2. Hosting
              </h2>
              <p>
                Diese Website wird bei Vercel Inc. gehostet. Anbieter ist Vercel Inc., 340 S
                Lemon Ave #4133, Walnut, CA 91789, USA. Details entnehmen Sie der
                Datenschutzerklärung von Vercel:{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  className="text-primary underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  vercel.com/legal/privacy-policy
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>
              <h3 className="font-sans text-base font-semibold text-brand-text mt-4 mb-2">
                Datenschutz
              </h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr
                ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend
                den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="font-sans text-base font-semibold text-brand-text mt-4 mb-2">
                Verantwortliche Stelle
              </h3>
              <p>
                {/* PLATZHALTER */}
                Sara Klauser<br />
                Tierphysio Klauser<br />
                Musterstraße 1, 47509 Rheurdt<br />
                E-Mail: info@tierphysio-klauser.de
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">
                4. Kontaktformular
              </h2>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
                aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten
                zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns
                gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p>
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
                DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder
                zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">
                5. Google Maps
              </h2>
              <p>
                Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland
                Limited, Gordon House, Barrow Street, Dublin 4, Irland. Zur Nutzung der
                Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern.
                Diese Informationen werden in der Regel an einen Server von Google in den USA
                übertragen und dort gespeichert.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">
                6. Ihre Rechte
              </h2>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger
                und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
                außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie
                diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie
                das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten zu verlangen.
              </p>
            </section>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
            <strong>Hinweis für Sara:</strong> Diese Datenschutzerklärung ist ein Muster-Platzhalter.
            Vor dem offiziellen Start der Website solltest du eine rechtssichere, auf deine
            konkrete Situation zugeschnittene Datenschutzerklärung erstellen lassen
            (z.B. über einen Datenschutzgenerator oder Anwalt).
          </div>
        </div>
      </div>
    </section>
  );
}
