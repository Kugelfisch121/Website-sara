import { groq } from "next-sanity";

export const latestNewsQuery = groq`
  *[_type == "newsStory"] | order(publishedAt desc) [0..2] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    tags
  }
`;

export const allNewsQuery = groq`
  *[_type == "newsStory"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    tags
  }
`;

export const newsStoryBySlugQuery = groq`
  *[_type == "newsStory" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    body,
    tags,
    socialShared
  }
`;

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    icon,
    image,
    shortDescription,
    description,
    targetAudience
  }
`;

export const allPricesQuery = groq`
  *[_type == "price"] | order(category asc, order asc) {
    _id,
    category,
    leistung,
    preis,
    hinweis
  }
`;

export const featuredSuccessStoriesQuery = groq`
  *[_type == "successStory" && featured == true] | order(publishedAt desc) [0..5] {
    _id,
    title,
    tierart,
    template,
    photos,
    generatedImageUrl,
    text,
    keywords,
    publishedAt
  }
`;

export const allSuccessStoriesQuery = groq`
  *[_type == "successStory"] | order(publishedAt desc) {
    _id,
    title,
    tierart,
    template,
    photos,
    generatedImageUrl,
    text,
    keywords,
    publishedAt
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    telefon,
    email,
    adresse,
    googleMapsUrl,
    facebookUrl,
    instagramUrl,
    googleBusinessUrl,
    heroImage,
    aboutImage
  }
`;
