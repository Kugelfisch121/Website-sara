import Link from "next/link";
import type { Service } from "@/types";

interface ServicesSectionProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    _id: "1",
    title: "Physiotherapie für Hunde & Katzen",
    icon: "🐕",
    shortDescription:
      "Gezielte manuelle Therapie, Massagen und Bewegungsübungen für Schmerzen, Operationsfolgen oder Altersbeschwerden.",
  },
  {
    _id: "2",
    title: "Blutegeltherapie",
    icon: "🩸",
    shortDescription:
      "Die naturheilkundliche Methode fördert die Durchblutung, lindert Entzündungen und unterstützt die Selbstheilung.",
  },
  {
    _id: "3",
    title: "Kurse & Workshops",
    icon: "📚",
    shortDescription:
      "Lerne, wie du deinem Tier selbst helfen kannst: Massagekurse, Bewegungsübungen und mehr – für Tierhalter.",
  },
];

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="card p-6 md:p-8 flex flex-col">
      <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-3xl mb-5 flex-shrink-0">
        {service.icon ?? "🐾"}
      </div>
      <h3 className="font-serif text-xl font-semibold text-brand-text mb-3">
        {service.title}
      </h3>
      <p className="text-brand-text-light leading-relaxed flex-grow">
        {service.shortDescription}
      </p>
      <div className="mt-5">
        <Link
          href="/leistungen"
          className="text-primary font-medium text-sm hover:text-primary-light transition-colors inline-flex items-center gap-1"
        >
          Mehr erfahren
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const displayServices = services && services.length > 0 ? services : defaultServices;

  return (
    <section className="py-16 md:py-24 bg-accent">
      <div className="container-site">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-highlight font-medium text-sm uppercase tracking-wide">
            Meine Leistungen
          </span>
          <h2 className="section-title mt-2 mb-4">
            Was ich für dein Tier tun kann
          </h2>
          <p className="section-subtitle">
            Jede Behandlung ist individuell auf dein Tier abgestimmt – liebevoll, professionell
            und direkt bei euch zu Hause.
          </p>
        </div>

        {/* Service-Karten */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/leistungen" className="btn-primary">
            Alle Leistungen ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
