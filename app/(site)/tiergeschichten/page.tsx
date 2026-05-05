import { Metadata } from "next";
import Image from "next/image";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { sanityFetch } from "@/sanity/lib/client";
import { allSuccessStoriesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Glückliche Vierbeiner – Erfolgsgeschichten",
  description:
    "Echte Geschichten von Hunden, Katzen und Pferden die mit Tierphysio Klauser wieder in Bewegung gekommen sind.",
};

interface SuccessStoryPhoto {
  asset: { _ref: string; _type: string };
  alt?: string;
  label?: string;
}

interface SuccessStory {
  _id: string;
  title: string;
  tierart?: string;
  template?: string;
  photos?: SuccessStoryPhoto[];
  generatedImageUrl?: string;
  text?: string;
  keywords?: string[];
  publishedAt?: string;
}

const tierartLabel: Record<string, string> = {
  hund: "🐕 Hund",
  katze: "🐈 Katze",
  pferd: "🐴 Pferd",
  sonstiges: "🐾 Sonstiges",
};

export default async function TiergeschichtenPage() {
  const stories = await sanityFetch<SuccessStory[]>({
    query: allSuccessStoriesQuery,
    revalidate: 300,
  }).catch(() => []);

  return (
    <>
      {/* Hero */}
      <section className="bg-accent py-12 md:py-16 border-b border-accent-dark/30">
        <div className="container-site text-center">
          <span className="text-highlight font-medium text-sm uppercase tracking-wide">
            Aus der Praxis
          </span>
          <h1 className="section-title mt-2">Glückliche Vierbeiner 🐾</h1>
          <p className="section-subtitle mt-3 max-w-2xl mx-auto">
            Jedes Tier hat seine eigene Geschichte. Hier teile ich Momente, die mich jeden
            Tag aufs Neue motivieren – Fortschritte, Freude und kleine Wunder.
          </p>
        </div>
      </section>

      {/* Inhalt */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-site">
          {stories.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🐾</div>
              <h2 className="font-serif text-xl font-semibold text-brand-text mb-2">
                Bald gibt es hier Geschichten zu entdecken
              </h2>
              <p className="text-brand-text-light">
                Die ersten Erfolgsgeschichten folgen in Kürze. Schau gerne wieder vorbei!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => {
                const imageUrl =
                  story.generatedImageUrl ??
                  (story.photos?.[0]
                    ? urlFor(story.photos[0]).width(600).height(600).url()
                    : "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&q=80");

                const formattedDate = story.publishedAt
                  ? format(new Date(story.publishedAt), "d. MMMM yyyy", { locale: de })
                  : "";

                return (
                  <article key={story._id} className="card group overflow-hidden">
                    <div className="relative aspect-square overflow-hidden bg-accent">
                      <Image
                        src={imageUrl}
                        alt={story.photos?.[0]?.alt ?? story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      {story.tierart && (
                        <span className="text-xs font-medium text-highlight uppercase tracking-wide">
                          {tierartLabel[story.tierart] ?? "🐾"}
                        </span>
                      )}
                      <h2 className="font-serif text-lg font-semibold text-brand-text mt-1 mb-2 leading-snug">
                        {story.title}
                      </h2>
                      {story.text && (
                        <p className="text-brand-text-light text-sm leading-relaxed line-clamp-4">
                          {story.text}
                        </p>
                      )}
                      {story.keywords && story.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {story.keywords.map((kw) => (
                            <Badge key={kw} variant="gold">
                              {kw}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {formattedDate && (
                        <p className="text-xs text-brand-text-muted mt-3 pt-3 border-t border-accent-dark/30">
                          {formattedDate}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
