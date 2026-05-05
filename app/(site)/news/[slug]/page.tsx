import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { sanityFetch, client } from "@/sanity/lib/client";
import { newsStoryBySlugQuery, allNewsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";
import { ShareButtons } from "@/components/social-share/ShareButtons";
import type { NewsStory } from "@/types";
import { groq } from "next-sanity";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const stories = await client
    .fetch<{ slug: { current: string } }[]>(
      groq`*[_type == "newsStory"]{ slug }`
    )
    .catch(() => []);
  return stories.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await sanityFetch<NewsStory | null>({
    query: newsStoryBySlugQuery,
    params: { slug: params.slug },
  }).catch(() => null);

  if (!story) return { title: "Beitrag nicht gefunden" };

  const imageUrl = story.mainImage
    ? urlFor(story.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: imageUrl ? [imageUrl] : [],
      type: "article",
    },
  };
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-brand-text-light">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl font-bold text-brand-text mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl font-semibold text-brand-text mt-6 mb-3">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-brand-text">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
};

export default async function NewsStoryPage({ params }: Props) {
  const story = await sanityFetch<NewsStory | null>({
    query: newsStoryBySlugQuery,
    params: { slug: params.slug },
    revalidate: 300,
  }).catch(() => null);

  if (!story) notFound();

  const imageUrl = story.mainImage
    ? urlFor(story.mainImage).width(1200).height(630).url()
    : "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1200&q=80";

  const formattedDate = story.publishedAt
    ? format(new Date(story.publishedAt), "d. MMMM yyyy", { locale: de })
    : "";

  return (
    <>
      {/* Beitragsbild */}
      <div className="relative w-full aspect-[21/9] max-h-96 bg-accent overflow-hidden">
        <Image
          src={imageUrl}
          alt={story.mainImage?.alt ?? story.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Artikel */}
      <article className="py-12 md:py-16 bg-white">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-brand-text-muted mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Startseite
              </Link>
              <span>/</span>
              <Link href="/news" className="hover:text-primary transition-colors">
                News & Tipps
              </Link>
              <span>/</span>
              <span className="text-brand-text line-clamp-1">{story.title}</span>
            </nav>

            {/* Tags */}
            {story.tags && story.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.map((tag) => (
                  <Badge key={tag} variant="green">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Titel */}
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-text mb-4 leading-tight">
              {story.title}
            </h1>

            {/* Datum */}
            {formattedDate && (
              <p className="text-brand-text-muted text-sm mb-8 flex items-center gap-2">
                <span>📅</span>
                <time dateTime={story.publishedAt}>{formattedDate}</time>
              </p>
            )}

            {/* Excerpt */}
            {story.excerpt && (
              <p className="text-lg text-brand-text-light italic border-l-4 border-highlight pl-4 mb-8 leading-relaxed">
                {story.excerpt}
              </p>
            )}

            {/* Body */}
            {story.body && (
              <div className="prose prose-lg max-w-none">
                <PortableText value={story.body} components={portableTextComponents} />
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-12">
              <ShareButtons
                title={story.title}
                excerpt={story.excerpt}
                url={`/news/${story.slug.current}`}
                imageUrl={imageUrl}
              />
            </div>

            {/* Zurück-Link */}
            <div className="mt-8 pt-8 border-t border-accent-dark/30">
              <Link
                href="/news"
                className="text-primary font-medium hover:text-primary-light transition-colors inline-flex items-center gap-2"
              >
                <span aria-hidden="true">←</span>
                Zurück zu allen Beiträgen
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
