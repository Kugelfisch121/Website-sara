import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

interface PublishRequest {
  imageUrl: string;
  caption: string;
  keywords: string[];
  template: string;
  platforms: string[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: PublishRequest;
  try {
    body = (await req.json()) as PublishRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { imageUrl, caption, keywords, template, platforms } = body;

  if (!imageUrl || !caption || !platforms?.length) {
    return NextResponse.json(
      { error: "imageUrl, caption und platforms sind erforderlich" },
      { status: 400 }
    );
  }

  const results: Record<string, string> = {};

  // ── Website (Sanity) ─────────────────────────────────────────────────────
  if (platforms.includes("website")) {
    try {
      const title = extractTitle(caption);
      await client.create({
        _type: "successStory",
        title,
        template,
        keywords,
        text: caption,
        generatedImageUrl: imageUrl,
        publishedAt: new Date().toISOString(),
        publishedOn: platforms,
        featured: true,
      });
      results.website = "✅ Auf Website veröffentlicht";
    } catch (err) {
      console.error("[publish-post] Sanity error:", err);
      results.website = "❌ Website-Fehler";
    }
  }

  // ── Instagram ────────────────────────────────────────────────────────────
  // Requires Meta Graph API: https://developers.facebook.com/docs/instagram-api/
  // Setup: Create Meta App → Instagram Basic Display API → get long-lived token
  if (platforms.includes("instagram")) {
    const igToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const igUserId = process.env.INSTAGRAM_USER_ID;

    if (!igToken || !igUserId) {
      results.instagram = "⚠️ Instagram nicht konfiguriert (INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_USER_ID setzen)";
    } else {
      try {
        // Step 1: Create media container
        const containerRes = await fetch(
          `https://graph.facebook.com/v19.0/${igUserId}/media`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              image_url: imageUrl,
              caption,
              access_token: igToken,
            }),
          }
        );
        const container = (await containerRes.json()) as { id?: string; error?: { message: string } };

        if (!container.id) {
          throw new Error(container.error?.message ?? "Container-Erstellung fehlgeschlagen");
        }

        // Step 2: Publish container
        const publishRes = await fetch(
          `https://graph.facebook.com/v19.0/${igUserId}/media_publish`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              creation_id: container.id,
              access_token: igToken,
            }),
          }
        );
        const published = (await publishRes.json()) as { id?: string; error?: { message: string } };

        if (!published.id) {
          throw new Error(published.error?.message ?? "Veröffentlichung fehlgeschlagen");
        }

        results.instagram = "✅ Auf Instagram gepostet";
      } catch (err) {
        console.error("[publish-post] Instagram error:", err);
        results.instagram = `❌ Instagram-Fehler: ${err instanceof Error ? err.message : "Unbekannt"}`;
      }
    }
  }

  // ── Facebook ─────────────────────────────────────────────────────────────
  // Requires Meta Graph API with a Facebook Page access token
  if (platforms.includes("facebook")) {
    const fbToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    const fbPageId = process.env.FACEBOOK_PAGE_ID;

    if (!fbToken || !fbPageId) {
      results.facebook = "⚠️ Facebook nicht konfiguriert (FACEBOOK_PAGE_ACCESS_TOKEN + FACEBOOK_PAGE_ID setzen)";
    } else {
      try {
        const res = await fetch(
          `https://graph.facebook.com/v19.0/${fbPageId}/photos`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: imageUrl,
              caption,
              access_token: fbToken,
            }),
          }
        );
        const data = (await res.json()) as { id?: string; error?: { message: string } };

        if (!data.id) {
          throw new Error(data.error?.message ?? "Veröffentlichung fehlgeschlagen");
        }

        results.facebook = "✅ Auf Facebook gepostet";
      } catch (err) {
        console.error("[publish-post] Facebook error:", err);
        results.facebook = `❌ Facebook-Fehler: ${err instanceof Error ? err.message : "Unbekannt"}`;
      }
    }
  }

  // ── WhatsApp ──────────────────────────────────────────────────────────────
  // WhatsApp Status can't be posted automatically via API; handled in bot.ts
  if (platforms.includes("whatsapp")) {
    results.whatsapp = "📥 Bild-Link wurde im Chat gesendet (manuell als Status posten)";
  }

  return NextResponse.json({ success: true, results });
}

/** Extracts a short title from the caption (first sentence, max 60 chars) */
function extractTitle(caption: string): string {
  const firstLine = caption.split("\n")[0]?.replace(/[*_~`]/g, "").trim() ?? "";
  const firstSentence = firstLine.split(/[.!?]/)[0]?.trim() ?? "";
  return firstSentence.slice(0, 60) || "Neuer Post";
}
