import Image from "next/image";
import Link from "next/link";

interface AboutPreviewProps {
  imageUrl?: string;
}

export function AboutPreview({ imageUrl }: AboutPreviewProps) {
  const defaultImage =
    "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=800&q=80";
  // ^ Platzhalter – ERSETZEN mit Sara's eigenem Foto

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Bild */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={imageUrl ?? defaultImage}
                alt="Sara Klauser – Tierphysiotherapeutin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Dekoratives Element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-accent border-4 border-white shadow-lg flex items-center justify-center">
              <div className="text-center">
                <span className="block text-3xl">🐾</span>
                <span className="block text-xs font-semibold text-primary mt-1">Mobil & persönlich</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-highlight font-medium text-sm uppercase tracking-wide">
              Über mich
            </span>
            <h2 className="section-title mt-2 mb-5">
              Hallo, ich bin Sara –{" "}
              <span className="text-primary italic">deine mobile Tierphysiotherapeutin</span>
            </h2>
            <div className="space-y-4 text-brand-text-light leading-relaxed">
              <p>
                Als leidenschaftliche Tierliebhaberin und ausgebildete Physiotherapeutin bringe
                ich professionelle Therapie direkt zu dir und deinem Tier – in eurer vertrauten
                Umgebung, ohne den Stress einer Praxisfahrt.
              </p>
              <p>
                Ob Hund, Katze oder Pferd: Mit Einfühlungsvermögen, Fachwissen und viel Herz
                unterstütze ich dein Tier auf dem Weg zur Schmerzfreiheit und Beweglichkeit.
              </p>
              <p>
                Mein Einzugsgebiet: Rheurdt, Geldern, Kevelaer, Straelen, Kempen und Umgebung
                in Nordrhein-Westfalen.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <Link href="/ueber-mich" className="btn-primary">
                Mehr über mich
              </Link>
              <Link href="/kontakt" className="btn-secondary">
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
