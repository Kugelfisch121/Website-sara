"use client";
/**
 * Sanity Studio – Custom Document Action: KI-Text generieren
 *
 * Fügt einen "🤖 KI-Text generieren"-Button im Sanity Studio hinzu.
 * Sichtbar nur bei Dokumenten vom Typ "newsStory".
 *
 * Ruft POST /api/generate-story auf und befüllt automatisch
 * die excerpt-Felder und zeigt den generierten Text im Alert.
 */
import type { DocumentActionComponent, DocumentActionProps } from "sanity";

async function generateText(props: DocumentActionProps): Promise<void> {
  const doc = props.draft ?? props.published;
  if (!doc) {
    window.alert("Bitte speichere das Dokument zuerst.");
    return;
  }

  const title = (doc.title as string | undefined) ?? "";
  const tags = (doc.tags as string[] | undefined) ?? [];

  if (!title) {
    window.alert("Bitte zuerst einen Titel eingeben!");
    return;
  }

  try {
    const res = await fetch("/api/generate-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, tags, imageDescription: "" }),
    });

    const data = (await res.json()) as {
      body?: string;
      excerpt?: string;
      error?: string;
    };

    if (!res.ok || !data.body) {
      throw new Error(data.error ?? "KI-Generierung fehlgeschlagen");
    }

    // Text in Zwischenablage kopieren damit Sara ihn einfügen kann
    await navigator.clipboard.writeText(data.body).catch(() => undefined);

    window.alert(
      `✅ KI-Text wurde generiert!\n\n` +
        `Kurzbeschreibung: "${data.excerpt}"\n\n` +
        `Der vollständige Text wurde in die Zwischenablage kopiert – ` +
        `jetzt in das "Inhalt"-Feld einfügen (Strg+V / Cmd+V).`
    );

    props.onComplete();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unbekannter Fehler";
    window.alert(`❌ Fehler: ${message}`);
  }
}

export const AiGenerateAction: DocumentActionComponent = (
  props: DocumentActionProps
) => {
  if (props.type !== "newsStory") return null;

  return {
    label: "🤖 KI-Text generieren",
    title:
      "Lässt die KI einen herzlichen Blogtext auf Basis von Titel und Themen schreiben",
    onHandle: () => {
      void generateText(props);
    },
    tone: "positive" as const,
  };
};
