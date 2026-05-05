import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-site">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl font-bold text-brand-text mb-8">Impressum</h1>

          {/* ================================================================
              PLATZHALTER – Bitte alle Felder mit echten Daten ersetzen!
              ================================================================ */}

          <div className="prose prose-sm max-w-none text-brand-text-light space-y-6">
            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">
                Angaben gemäß § 5 TMG
              </h2>
              <p>
                <strong>Sara Klauser</strong><br />
                Tierphysio Klauser<br />
                {/* PLATZHALTER – Straße und Hausnummer einsetzen */}
                Musterstraße 1<br />
                47509 Rheurdt<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">Kontakt</h2>
              <p>
                {/* PLATZHALTER – Echte Telefonnummer einsetzen */}
                Telefon: +49 (0) XXXX XXXXXX<br />
                E-Mail: info@tierphysio-klauser.de
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">
                Berufsbezeichnung und berufsrechtliche Regelungen
              </h2>
              <p>
                Berufsbezeichnung: Tierphysiotherapeutin<br />
                {/* PLATZHALTER – Zuständige Kammer oder Verband ggf. eintragen */}
                Zuständige Aufsichtsbehörde: [Zuständige Behörde eintragen]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">
                Haftung für Inhalte
              </h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf
                diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10
                TMG sind wir als Diensteanbieter jedoch nicht unter der Pflicht, übermittelte
                oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">
                Haftung für Links
              </h2>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
                wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch
                keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
                jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-brand-text">Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
                Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                bzw. Erstellers.
              </p>
            </section>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
            <strong>Hinweis für Sara:</strong> Bitte ersetze die Platzhalter (PLATZHALTER) mit
            deinen echten Daten – insbesondere Adresse, Telefonnummer und ggf. zuständige
            Behörde. Im Zweifelsfall einen Rechtsanwalt konsultieren.
          </div>
        </div>
      </div>
    </section>
  );
}
