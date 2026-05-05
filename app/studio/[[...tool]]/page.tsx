"use client";
/**
 * Sanity Studio – eingebettet in Next.js.
 * Erreichbar unter /studio. "use client" ist erforderlich,
 * da Sanity Studio vollständig client-seitig läuft.
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
