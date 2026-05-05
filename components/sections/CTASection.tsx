import Link from "next/link";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  variant?: "light" | "dark";
}

export function CTASection({
  title = "Dein Tier verdient das Beste",
  description = "Schreib mir einfach – gemeinsam finden wir den richtigen Behandlungsplan für dein Tier. Erstgespräch kostenlos und unverbindlich.",
  buttonLabel = "Jetzt Termin anfragen",
  buttonHref = "/kontakt",
  variant = "light",
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`py-16 md:py-20 ${
        isDark ? "bg-primary" : "bg-accent"
      }`}
    >
      <div className="container-site">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">🐾</div>
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-brand-text"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-lg leading-relaxed mb-8 ${
              isDark ? "text-white/80" : "text-brand-text-light"
            }`}
          >
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={buttonHref} className="btn-highlight text-lg px-8 py-4">
              {buttonLabel}
            </Link>
            <Link
              href="/leistungen"
              className={`inline-flex items-center justify-center px-8 py-4 border-2 font-semibold rounded-full transition-colors duration-200 text-lg ${
                isDark
                  ? "border-white/50 text-white hover:border-white hover:bg-white/10"
                  : "border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              Leistungen ansehen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
