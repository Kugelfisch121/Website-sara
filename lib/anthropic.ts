import Anthropic from "@anthropic-ai/sdk";

function getAnthropic() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

export interface GenerateStoryInput {
  title: string;
  tags: string[];
  imageDescription: string;
}

export interface GenerateStoryOutput {
  body: string;
  excerpt: string;
}

export async function generateStoryText(
  input: GenerateStoryInput
): Promise<GenerateStoryOutput> {
  const tagsText = input.tags.length > 0 ? input.tags.join(", ") : "Tierphysiotherapie";

  const prompt = `Du bist Texterin für eine mobile Tierphysiotherapie-Praxis in Deutschland.
Deine Texte sind herzlich, warm, auf Augenhöhe mit Tierbesitzern, ohne Fachjargon und immer auf Deutsch.

Schreibe einen Blogbeitrag für die folgende News Story:

Titel: "${input.title}"
Themen: ${tagsText}
Bildbeschreibung: ${input.imageDescription || "Kein Bild angegeben"}

Der Beitrag soll:
- 200 bis 350 Wörter lang sein
- Herzlich und persönlich klingen (als würde Sara direkt mit Tierbesitzern sprechen)
- Praktische Tipps oder interessante Infos enthalten
- Keine medizinischen Versprechen oder Heilsaussagen machen
- Mit einem einladenden Aufruf enden (z.B. Kontakt aufnehmen, mehr erfahren)

Antworte NUR mit einem JSON-Objekt in diesem Format, ohne zusätzlichen Text:
{
  "body": "Der vollständige Blogtext hier...",
  "excerpt": "Eine kurze Zusammenfassung in maximal 150 Zeichen für die Vorschau"
}`;

  const message = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const textContent = message.content.find((c) => c.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("Keine Textantwort von der KI erhalten");
  }

  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Ungültiges Antwortformat von der KI");

  return JSON.parse(jsonMatch[0]) as GenerateStoryOutput;
}
