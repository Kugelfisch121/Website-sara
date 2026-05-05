export interface NewsStory {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: SanityImage;
  excerpt?: string;
  body?: PortableTextBlock[];
  tags?: string[];
  socialShared?: boolean;
}

export interface Service {
  _id: string;
  title: string;
  slug?: { current: string };
  icon?: string;
  image?: SanityImage;
  shortDescription?: string;
  description?: PortableTextBlock[];
  targetAudience?: string;
  order?: number;
}

export interface Price {
  _id: string;
  category: string;
  leistung: string;
  preis: string;
  hinweis?: string;
  order?: number;
}

export interface SiteSettings {
  telefon?: string;
  email?: string;
  adresse?: string;
  googleMapsUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  googleBusinessUrl?: string;
  heroImage?: SanityImage;
  aboutImage?: SanityImage;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any;

export interface SuccessStoryPreview {
  _id: string;
  title: string;
  tierart?: string;
  template?: string;
  photos?: {
    _key?: string;
    asset: { _ref: string; _type: string };
    alt?: string;
    label?: string;
  }[];
  generatedImageUrl?: string;
  text?: string;
  keywords?: string[];
  publishedAt?: string;
}
