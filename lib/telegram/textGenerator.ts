import Anthropic from "@anthropic-ai/sdk";
import { TemplateType, CtaType } from "./types";

function getAnthropic() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

const CTA_PHONE = process.env.SARA_PHONE ?? "Telefonnummer anfragen";
const CTA_WEBSITE = process.env.NEXT_PUBLIC_SITE_URL ?? "tierphysio-klauser.de";

export async function generatePostText(opts: {
  keywords: string[];
  template: TemplateType;
  ctaType: CtaType;
}): Promise<{ postText: string; caption: string }> {
  const { keywords, template, ctaType } = opts;

  const ctaSnippet =
    ctaType === "phone"
      ? `Ruf mich an: ${CTA_PHONE}`
      : ctaType === "website"
      ? `Mehr erfahren: ${CTA_WEBSITE}`
      : `📞 ${CTA_PHONE} | 🌐 ${CTA_WEBSITE}`;

  const templateContext: Record<TemplateType, string> = {
    single_with_text: "ein einzelnes Foto mit einem kurzen, herzlichen Text",
    before_after: "ein Vorher-Nachher-Vergleich – betone den Fortschritt des Tieres",
    collage_2_text: "eine Bildkollage aus zwei Fotos",
    collage_3_text: "eine Bildkollage aus drei Fotos",
    single_no_text: "ein Foto ohne langen Text – nur eine kurze Bildunterschrift",
    collage_no_text: "eine Fotokollage ohne Text – nur eine Bildunterschrift",
    text_only: "ein reiner Textpost ohne Foto",
  };

  const prompt = `Du bist Texterin für Tierphysio Klauser – die mobile Tierphysiotherapie-Praxis von Sara Klauser in Rheurdt, NRW.

Erstelle einen Instagram-Post für folgende Situation:
- Template: ${templateContext[template]}
- Stichworte / Thema: ${keywords.join(", ")}
- Der Post soll IMMER eine Einladung zur Kontaktaufnahme enthalten: "${ctaSnippet}"

Schreibe:
1. "postText": Den Text der direkt auf das Bild gedruckt wird (max. 120 Zeichen, knackig & herzlich)
2. "caption": Die Instagram-Caption (150-250 Wörter, herzlich, mit Emojis, mit Hashtags am Ende, auf Deutsch)

Die Caption soll:
- Persönlich klingen (Sara spricht direkt)
- Eine kurze Geschichte erzählen
- Den Kontakt-CTA "${ctaSnippet}" eingebaut haben
- Mit 5-8 relevanten Hashtags enden (z.B. #Tierphysiotherapie #Hundephysio #Tiergesundheit)

Antworte NUR mit JSON:
{
  "postText": "...",
  "caption": "..."
}`;

  const msg = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const content = msg.content.find((c) => c.type === "text");
  if (!content || content.type !== "text") throw new Error("Keine KI-Antwort");

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Ungültiges KI-Antwortformat");

  return JSON.parse(jsonMatch[0]) as { postText: string; caption: string };
}
