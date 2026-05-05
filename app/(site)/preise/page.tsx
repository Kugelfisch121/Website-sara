import { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { allPricesQuery } from "@/sanity/lib/queries";
import type { Price } from "@/types";

export const metadata: Metadata = {
  title: "Preise – Übersicht der Behandlungskosten",
  description:
    "Transparente Preisübersicht für alle Leistungen von Tierphysio Klauser – Physiotherapie, Blutegeltherapie und Kurse.",
};

const fallbackPrices: Price[] = [
  { _id: "1", category: "Ersttermin", leistung: "Erstuntersuchung & Anamnese", preis: "kostenlos", hinweis: "Telefonisch oder per E-Mail" },
  { _id: "2", category: "Physiotherapie", leistung: "Erstbehandlung (60–90 Min.)", preis: "ab 80 €", hinweis: "Inkl. ausführlicher Anamnese" },
  { _id: "3", category: "Physiotherapie", leistung: "Folgebehandlung (45–60 Min.)", preis: "ab 60 €", hinweis: "" },
  { _id: "4", category: "Physiotherapie", leistung: "Hausbesuch Aufschlag", preis: "nach Vereinbarung", hinweis: "Abhängig von Entfernung" },
  { _id: "5", category: "Blutegeltherapie", leistung: "Blutegelbehandlung (ca. 90 Min.)", preis: "ab 90 €", hinweis: "Inkl. Material" },
  { _id: "6", category: "Kurse & Workshops", leistung: "Massage-Grundkurs (2 Std.)", preis: "ab 50 €", hinweis: "Pro Teilnehmer" },
  { _id: "7", category: "Kurse & Workshops", leistung: "Einzelkurs bei dir zu Hause", preis: "ab 80 €", hinweis: "Individuell abgestimmt" },
];

function groupByCategory(prices: Price[]): Record<string, Price[]> {
  return prices.reduce<Record<string, Price[]>>((acc, price) => {
    if (!acc[price.category]) acc[price.category] = [];
    acc[price.category].push(price);
    return acc;
  }, {});
}

export default async function PreisePage() {
  const prices = await sanityFetch<Price[]>({
    query: allPricesQuery,
    revalidate: 3600,
  }).catch(() => fallbackPrices);

  const displayPrices = prices && prices.length > 0 ? prices : fallbackPrices;
  const grouped = groupByCategory(displayPrices);

  return (
    <>
      {/* Hero */}
      <section className="bg-accent py-12 md:py-16 border-b border-accent-dark/30">
        <div className="container-site text-center">
          <span className="text-highlight font-medium text-sm uppercase tracking-wide">
            Transparente Preise
          </span>
          <h1 className="section-title mt-2">Kosten & Preise</h1>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            Alle Preise sind Richtwerte – individuelle Angebote besprechen wir gerne persönlich.
          </p>
        </div>
      </section>

      {/* Preistabellen */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-site">
          <div className="max-w-3xl mx-auto space-y-10">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h2 className="font-serif text-xl font-bold text-brand-text mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-highlight inline-block" />
                  {category}
                </h2>
                <div className="rounded-2xl border border-accent-dark/30 overflow-hidden">
                  {items.map((item, idx) => (
                    <div
                      key={item._id}
                      className={`flex justify-between items-start gap-4 px-5 py-4 ${
                        idx < items.length - 1 ? "border-b border-accent-dark/30" : ""
                      } ${idx % 2 === 0 ? "bg-white" : "bg-accent/40"}`}
                    >
                      <div className="flex-grow">
                        <span className="font-medium text-brand-text">{item.leistung}</span>
                        {item.hinweis && (
                          <span className="block text-xs text-brand-text-muted mt-0.5">
                            {item.hinweis}
                          </span>
                        )}
                      </div>
                      <span className="font-semibold text-primary whitespace-nowrap flex-shrink-0">
                        {item.preis}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Hinweisbox */}
          <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-highlight/10 border border-highlight/30 rounded-2xl p-6">
              <h3 className="font-serif text-lg font-semibold text-brand-text mb-3">
                💡 Wichtige Hinweise
              </h3>
              <ul className="space-y-2 text-sm text-brand-text-light">
                <li className="flex items-start gap-2">
                  <span className="text-highlight mt-0.5">•</span>
                  Das Erstgespräch ist für dich kostenlos – so können wir zusammen schauen, ob und wie ich helfen kann.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-highlight mt-0.5">•</span>
                  Fahrtkosten werden nach Absprache berechnet. In einem Radius von ca. 20 km um Rheurdt keine Extrakosten.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-highlight mt-0.5">•</span>
                  Tierphysiotherapie wird von manchen Tierkrankenversicherungen erstattet – bitte bei deiner Versicherung nachfragen.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-highlight mt-0.5">•</span>
                  Für Mehrtierrabatte oder regelmäßige Behandlungen biete ich gerne individuelle Pakete an.
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/kontakt" className="btn-primary">
              Unverbindlich anfragen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
