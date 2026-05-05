import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { sanityFetch } from "@/sanity/lib/client";
import { allNewsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";
import type { NewsStory } from "@/types";

export const metadata: Metadata = {
  title: "News & Tipps für Tierbesitzer",
  description:
    "Aktuelle News, Tipps und Wissenswertes rund um die Tiergesundheit von Sara Klauser – Tierphysiotherapeutin aus Rheurdt.",
};

const placeholderImages = [
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80",
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
  "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=80",
];
// ^ Platzhalter – werden durch echte Bilder aus Sanity ersetzt

export default async function NewsPage() {
  const stories = await sanityFetch<NewsStory[]>({
    query: allNewsQuery,
    revalidate: 300,
  }).catch(() => []);

  return (
    <>
      {/* Hero */}
      <section className="bg-accent py-12 md:py-16 border-b border-accent-dark/30">
        <div className="container-site text-center">
          <span className="text-highlight font-medium text-sm uppercase tracking-wide">
            Aktuell
          </span>
          <h1 className="section-title mt-2">News & Tipps</h1>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            Wissenswertes rund um die Tiergesundheit, Praxiseinblicke und nützliche Tipps
            für den Alltag mit deinem Tier.
          </p>
        </div>
      </section>

      {/* News-Gitter */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-site">
          {stories.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="font-serif text-xl font-semibold text-brand-text mb-2">
                Noch keine Beiträge
              </h2>
              <p className="text-brand-text-light">
                Hier erscheinen bald die ersten News. Schau gerne wieder vorbei!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story, index) => {
                const imageUrl = story.mainImage
                  ? urlFor(story.mainImage).width(600).height(400).url()
                  : placeholderImages[index % placeholderImages.length];

                const formattedDate = story.publishedAt
                  ? format(new Date(story.publishedAt), "d. MMMM yyyy", { locale: de })
                  : "";

                return (
                  <article key={story._id} className="card group flex flex-col">
                    <Link href={`/news/${story.slug.current}`} className="block">
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={story.mainImage?.alt ?? story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-grow">
                      {story.tags && story.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {story.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="green">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <h2 className="font-serif text-lg font-semibold text-brand-text mb-2 leading-snug group-hover:text-primary transition-colors">
                        <Link href={`/news/${story.slug.current}`}>{story.title}</Link>
                      </h2>
                      {story.excerpt && (
                        <p className="text-brand-text-light text-sm leading-relaxed line-clamp-3 flex-grow">
                          {story.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-accent-dark/30">
                        <span className="text-xs text-brand-text-muted">{formattedDate}</span>
                        <Link
                          href={`/news/${story.slug.current}`}
                          className="text-primary text-sm font-medium hover:text-primary-light transition-colors inline-flex items-center gap-1"
                        >
                          Weiterlesen <span aria-hidden="true">→</span>
                        </Link>
                      </div>
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
