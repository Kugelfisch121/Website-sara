import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Leistungen – Physiotherapie, Blutegeltherapie & Kurse",
  description:
    "Alle Leistungen von Tierphysio Klauser: Physiotherapie für Hunde & Katzen, Blutegeltherapie und Kurse für Tierhalter.",
};

const leistungen = [
  {
    id: "physiotherapie",
    icon: "🐕",
    title: "Physiotherapie für Hunde & Katzen",
    image:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=80",
    // ^ Platzhalter – ERSETZEN mit eigenem Bild
    subtitle: "Sanfte Behandlung für mehr Lebensqualität",
    description: `Die Tierphysiotherapie befasst sich mit der Behandlung von Erkrankungen und Verletzungen des Bewegungsapparates bei Tieren. Durch gezielte manuelle Techniken, Massagen und Bewegungsübungen können Schmerzen gelindert, die Beweglichkeit verbessert und die Lebensqualität deines Tieres deutlich gesteigert werden.`,
    anwendungsgebiete: [
      "Operationsnachsorge (z.B. nach Kreuzband-OP oder Bandscheibenvorfall)",
      "Arthrose und Gelenkprobleme",
      "Muskelverspannungen und -verhärtungen",
      "Neurologische Erkrankungen",
      "Altersbedingte Bewegungseinschränkungen",
      "Sportliche Rehabilitation",
      "Vorbeugung und Leistungsoptimierung",
    ],
    ablauf: `Jede Behandlung beginnt mit einer ausführlichen Anamnese. Ich beobachte dein Tier in Bewegung, taste die Muskeln und Gelenke ab und bespreche mit dir die Ziele der Therapie. Die eigentliche Behandlung umfasst dann je nach Bedarf Massagen, Dehnungen, Mobilisierungen und Übungen, die du auch zu Hause weiterführen kannst.`,
  },
  {
    id: "blutegeltherapie",
    icon: "🩸",
    title: "Blutegeltherapie",
    image:
      "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=800&q=80",
    // ^ Platzhalter – ERSETZEN mit eigenem Bild
    subtitle: "Naturheilkunde mit langer Tradition",
    description: `Die Blutegeltherapie ist eine der ältesten naturheilkundlichen Methoden und erlebt heute eine Renaissance in der Tiermedizin. Blutegel geben beim Saugen natürliche Wirkstoffe ab, die entzündungshemmend, schmerzlindernd und durchblutungsfördernd wirken.`,
    anwendungsgebiete: [
      "Arthrose und Gelenkbeschwerden",
      "Chronische Entzündungen",
      "Schmerzzustände",
      "Unterstützung nach Operationen",
      "Venenprobleme",
      "Stressbedingte Spannungszustände",
    ],
    ablauf: `Die Blutegel werden gezielt auf die entsprechenden Körperstellen gesetzt und verbleiben dort 30 bis 60 Minuten. Die Behandlung ist für die meisten Tiere sehr angenehm und entspannend. Ich begleite den gesamten Prozess und stelle sicher, dass sich dein Tier wohlfühlt.`,
  },
  {
    id: "kurse",
    icon: "📚",
    title: "Kurse & Workshops",
    image:
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80",
    // ^ Platzhalter – ERSETZEN mit eigenem Bild
    subtitle: "Wissen für Tierbesitzer",
    description: `Als Tierbesitzer kennst du dein Tier am besten. In meinen Kursen und Workshops lernst du, wie du deinem Tier auch zu Hause helfen kannst – durch einfache Massagegriffe, Dehnübungen und gezieltes Beobachten.`,
    anwendungsgebiete: [
      "Massage-Grundkurs für Hundebesitzer",
      "Fitness-Übungen für ältere Hunde",
      "Dehnprogramme für aktive Hunde",
      "Erkennen von Schmerzsignalen beim Tier",
      "Präventionsworkshops",
    ],
    ablauf: `Kurse finden in kleinen Gruppen (max. 4-6 Teilnehmer) oder als Einzelkurs statt – entweder bei mir oder ich komme zu euch. Aktuelle Kurstermine findest du in meinen News oder melde dich direkt bei mir für ein individuelles Angebot.`,
  },
];

export default function LeistungenPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-accent py-12 md:py-16 border-b border-accent-dark/30">
        <div className="container-site text-center">
          <span className="text-highlight font-medium text-sm uppercase tracking-wide">
            Was ich anbiete
          </span>
          <h1 className="section-title mt-2">Meine Leistungen</h1>
          <p className="section-subtitle mt-3 max-w-2xl mx-auto">
            Von der klassischen Physiotherapie über Naturheilkunde bis hin zu Kursen für
            Tierbesitzer – ich begleite dich und dein Tier ganzheitlich.
          </p>
        </div>
      </section>

      {/* Leistungen */}
      <div className="py-16 md:py-20 bg-white">
        <div className="container-site space-y-20">
          {leistungen.map((leistung, index) => (
            <section key={leistung.id} id={leistung.id}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Bild (wechselnde Seite) */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                    <Image
                      src={leistung.image}
                      alt={leistung.title}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="text-4xl mb-4">{leistung.icon}</div>
                  <span className="text-highlight font-medium text-sm uppercase tracking-wide">
                    {leistung.subtitle}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-text mt-1 mb-4">
                    {leistung.title}
                  </h2>
                  <p className="text-brand-text-light leading-relaxed mb-6">
                    {leistung.description}
                  </p>

                  <div className="bg-accent rounded-2xl p-5 mb-6">
                    <h3 className="font-sans text-sm font-semibold text-brand-text uppercase tracking-wide mb-3">
                      Anwendungsgebiete
                    </h3>
                    <ul className="space-y-1.5">
                      {leistung.anwendungsgebiete.map((a) => (
                        <li
                          key={a}
                          className="flex items-start gap-2 text-sm text-brand-text-light"
                        >
                          <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-sans text-sm font-semibold text-brand-text uppercase tracking-wide mb-2">
                      Ablauf
                    </h3>
                    <p className="text-brand-text-light text-sm leading-relaxed">
                      {leistung.ablauf}
                    </p>
                  </div>

                  <Link href="/kontakt" className="btn-primary">
                    Termin anfragen
                  </Link>
                </div>
              </div>

              {index < leistungen.length - 1 && (
                <hr className="mt-16 border-accent-dark/30" />
              )}
            </section>
          ))}
        </div>
      </div>

      <CTASection
        title="Nicht sicher, was das Richtige ist?"
        description="Kein Problem – ruf mich einfach an oder schreib mir. Wir schauen gemeinsam, welche Behandlung deinem Tier am besten hilft."
        variant="light"
      />
    </>
  );
}
