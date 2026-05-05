import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";

interface SuccessStoryPhoto {
  _key?: string;
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

interface SuccessStoriesProps {
  stories: SuccessStory[];
}

const tierartEmoji: Record<string, string> = {
  hund: "🐕",
  katze: "🐈",
  pferd: "🐴",
  sonstiges: "🐾",
};

function StoryCard({ story }: { story: SuccessStory }) {
  // Use generated image if available, otherwise first Sanity photo
  const imageUrl =
    story.generatedImageUrl ??
    (story.photos?.[0]
      ? urlFor(story.photos[0]).width(600).height(600).url()
      : "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&q=80");

  const formattedDate = story.publishedAt
    ? format(new Date(story.publishedAt), "MMMM yyyy", { locale: de })
    : "";

  const emoji = story.tierart ? tierartEmoji[story.tierart] : "🐾";

  return (
    <article className="card group overflow-hidden">
      {/* Quadratisches Bild – Instagram-Style */}
      <div className="relative aspect-square overflow-hidden bg-accent">
        <Image
          src={imageUrl}
          alt={story.photos?.[0]?.alt ?? story.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Emoji Badge */}
        <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-lg shadow-sm">
          {emoji}
        </div>
      </div>

      {/* Text */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-brand-text mb-2 leading-snug">
          {story.title}
        </h3>
        {story.text && (
          <p className="text-brand-text-light text-sm leading-relaxed line-clamp-3">
            {story.text}
          </p>
        )}
        {story.keywords && story.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {story.keywords.slice(0, 3).map((kw) => (
              <Badge key={kw} variant="gold">
                {kw}
              </Badge>
            ))}
          </div>
        )}
        {formattedDate && (
          <p className="text-xs text-brand-text-muted mt-3">{formattedDate}</p>
        )}
      </div>
    </article>
  );
}

export function SuccessStories({ stories }: SuccessStoriesProps) {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-accent">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-highlight font-medium text-sm uppercase tracking-wide">
              Erfolgsgeschichten
            </span>
            <h2 className="section-title mt-2">
              Glückliche Vierbeiner 🐾
            </h2>
            <p className="section-subtitle mt-2 max-w-xl">
              Einblicke aus der Praxis – echte Geschichten, echte Fortschritte.
            </p>
          </div>
          <Link
            href="/tiergeschichten"
            className="text-primary font-medium hover:text-primary-light transition-colors inline-flex items-center gap-1 flex-shrink-0"
          >
            Alle Geschichten <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Grid – Instagram-Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
