import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import type { NewsStory } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";

interface NewsPreviewProps {
  stories: NewsStory[];
}

const placeholderImages = [
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80",
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
];
// ^ Platzhalter-Bilder – werden durch echte Bilder aus Sanity ersetzt

function NewsCard({ story, index }: { story: NewsStory; index: number }) {
  const imageUrl = story.mainImage
    ? urlFor(story.mainImage).width(600).height(400).url()
    : placeholderImages[index % placeholderImages.length];

  const formattedDate = story.publishedAt
    ? format(new Date(story.publishedAt), "d. MMMM yyyy", { locale: de })
    : "";

  return (
    <article className="card group flex flex-col">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={imageUrl}
          alt={story.mainImage?.alt ?? story.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {story.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="green">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <h3 className="font-serif text-lg font-semibold text-brand-text mb-2 leading-snug group-hover:text-primary transition-colors">
          {story.title}
        </h3>
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
}

export function NewsPreview({ stories }: NewsPreviewProps) {
  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-highlight font-medium text-sm uppercase tracking-wide">
              Aktuell
            </span>
            <h2 className="section-title mt-2">
              News & Tipps für Tierbesitzer
            </h2>
          </div>
          <Link
            href="/news"
            className="text-primary font-medium hover:text-primary-light transition-colors inline-flex items-center gap-1 flex-shrink-0"
          >
            Alle Beiträge <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <NewsCard key={story._id} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
