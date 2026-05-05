import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  imageUrl?: string;
}

export function Hero({ imageUrl }: HeroProps) {
  const defaultImage =
    "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1600&q=80";
  // ^ Platzhalter: Hund bei Physiotherapie – ERSETZEN mit Sara's eigenem Bild

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary">
      {/* Hintergrundbild */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl ?? defaultImage}
          alt="Tierphysiotherapie – Sara Klauser behandelt einen Hund"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/20" />
      </div>

      {/* Inhalt */}
      <div className="relative container-site py-16 md:py-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-highlight/90 text-white text-sm font-medium mb-6">
            Mobile Tierphysiotherapie · Rheurdt & Umgebung
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Physio für{" "}
            <span className="text-highlight-light italic">Deine Liebsten</span>
          </h1>

          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            Sara Klauser kommt zu dir nach Hause – für eine sanfte, professionelle
            Physiotherapie deines Hundes, deiner Katze oder deines Pferdes. Direkt bei euch.
            Ohne Stress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/kontakt"
              className="btn-highlight text-base px-8 py-4"
            >
              Termin anfragen
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary transition-colors duration-200 text-base"
            >
              Leistungen entdecken
            </Link>
          </div>

          {/* Trust-Indikatoren */}
          <div className="flex flex-wrap gap-4 mt-10 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-highlight/60 flex items-center justify-center text-xs">✓</span>
              Staatlich anerkannt
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-highlight/60 flex items-center justify-center text-xs">✓</span>
              Mobiler Hausbesuch
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-highlight/60 flex items-center justify-center text-xs">✓</span>
              Hund · Katze · Pferd
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
