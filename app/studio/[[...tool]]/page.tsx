/**
 * Sanity Studio eingebettet in Next.js App Router.
 * Erreichbar unter /studio – NUR für Sara zugänglich.
 *
 * Für Produktion: Absichern mit Authentifizierung (z.B. Sanity eigene Auth)
 * oder Zugriffsschutz via Vercel password protection.
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
