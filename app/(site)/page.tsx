import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { TrustSection } from "@/components/sections/TrustSection";
import { CTASection } from "@/components/sections/CTASection";
import { sanityFetch } from "@/sanity/lib/client";
import { latestNewsQuery, allServicesQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { NewsStory, Service, SiteSettings } from "@/types";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Tierphysio Klauser – Physio für Deine Liebsten",
  description:
    "Mobile Tierphysiotherapie für Hunde, Katzen und Pferde in Rheurdt und Umgebung. Sara Klauser kommt zu dir nach Hause.",
};

export default async function HomePage() {
  const [latestNews, services, siteSettings] = await Promise.all([
    sanityFetch<NewsStory[]>({ query: latestNewsQuery, revalidate: 300 }).catch(() => []),
    sanityFetch<Service[]>({ query: allServicesQuery, revalidate: 3600 }).catch(() => []),
    sanityFetch<SiteSettings>({ query: siteSettingsQuery, revalidate: 3600 }).catch(
      () => null
    ),
  ]);

  const heroImageUrl = siteSettings?.heroImage
    ? urlFor(siteSettings.heroImage).width(1600).height(900).url()
    : undefined;

  const aboutImageUrl = siteSettings?.aboutImage
    ? urlFor(siteSettings.aboutImage).width(800).height(1000).url()
    : undefined;

  return (
    <>
      <Hero imageUrl={heroImageUrl} />
      <AboutPreview imageUrl={aboutImageUrl} />
      <ServicesSection services={services} />
      {latestNews.length > 0 && <NewsPreview stories={latestNews} />}
      <TrustSection />
      <CTASection variant="light" />
    </>
  );
}
