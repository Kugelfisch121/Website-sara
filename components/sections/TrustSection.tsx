const qualifications = [
  {
    icon: "🎓",
    title: "Staatlich anerkannte Ausbildung",
    description:
      "Abgeschlossene Ausbildung zur Tierphysiotherapeutin an einer staatlich anerkannten Schule.",
  },
  {
    icon: "🏥",
    title: "Tier-Heilpraktikerin",
    description:
      "Zusätzliche Qualifikation als Tierheilpraktikerin für einen ganzheitlichen Behandlungsansatz.",
  },
  {
    icon: "🚐",
    title: "Mobiler Service",
    description:
      "Ich komme zu dir nach Hause – kein Stress durch Fahrtweg, kein fremdes Wartezimmer.",
  },
  {
    icon: "❤️",
    title: "Tierliebe & Einfühlungsvermögen",
    description:
      "Jedes Tier wird individuell behandelt. Der Aufbau von Vertrauen kommt immer zuerst.",
  },
  {
    icon: "🔄",
    title: "Regelmäßige Fortbildungen",
    description:
      "Ständige Weiterbildung zu neuesten Methoden und Erkenntnissen in der Tierphysiotherapie.",
  },
  {
    icon: "📍",
    title: "Regionaler Fokus",
    description:
      "Persönlicher Kontakt und kurze Wege – ich kenne die Region rund um Rheurdt gut.",
  },
];

export function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-highlight-light font-medium text-sm uppercase tracking-wide">
            Warum Tierphysio Klauser?
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mt-2 mb-4">
            In guten Händen – und Pfoten
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Für dein Tier nur das Beste: Fundiertes Fachwissen, echte Tierliebe und ein
            professioneller mobiler Service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualifications.map((item) => (
            <div
              key={item.title}
              className="bg-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-serif text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-white/75 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
