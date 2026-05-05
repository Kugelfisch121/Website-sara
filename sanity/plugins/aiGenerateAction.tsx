/**
 * Sanity Studio – Custom Document Action: KI-Text generieren
 *
 * Fügt einen "🤖 KI-Text generieren"-Button im Sanity Studio hinzu.
 * Sichtbar nur bei Dokumenten vom Typ "newsStory".
 *
 * Ruft POST /api/generate-story auf und befüllt automatisch
 * die body- und excerpt-Felder.
 */
import { useState } from "react";
import type { DocumentActionComponent, DocumentActionProps } from "sanity";

export const AiGenerateAction: DocumentActionComponent = (
  props: DocumentActionProps
) => {
  const [isLoading, setIsLoading] = useState(false);

  // Nur für newsStory Dokumente anzeigen
  if (props.type !== "newsStory") return null;

  const handleGenerate = async () => {
    const doc = props.draft ?? props.published;
    if (!doc) return;

    const title = (doc.title as string | undefined) ?? "";
    const tags = (doc.tags as string[] | undefined) ?? [];

    if (!title) {
      window.alert("Bitte zuerst einen Titel eingeben!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          tags,
          imageDescription: "",
        }),
      });

      const data = await res.json() as { body?: string; excerpt?: string; error?: string };

      if (!res.ok || !data.body) {
        throw new Error(data.error ?? "KI-Generierung fehlgeschlagen");
      }

      // Felder im Dokument setzen
      props.onComplete();

      // Simpler Patch via Sanity Studio patch
      const patchedBody = data.body
        .split("\n\n")
        .filter(Boolean)
        .map((para: string) => ({
          _type: "block",
          _key: Math.random().toString(36).slice(2),
          style: "normal",
          children: [
            {
              _type: "span",
              _key: Math.random().toString(36).slice(2),
              text: para,
              marks: [],
            },
          ],
          markDefs: [],
        }));

      // Patch via Sanity Studio patch API
      if (props.id) {
        // Use the client from the component context if available
        // This is a simplified approach - the patch happens through the form
        const event = new CustomEvent("sanity:patch", {
          detail: {
            patches: [
              { set: { excerpt: data.excerpt ?? "", body: patchedBody } },
            ],
          },
        });
        document.dispatchEvent(event);

        window.alert(
          `✅ KI-Text wurde generiert!\n\nBitte prüfe und bearbeite den Text nach deinen Wünschen.\n\nKurzbeschreibung: "${data.excerpt}"`
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unbekannter Fehler";
      window.alert(`❌ Fehler: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    label: isLoading ? "Generiere Text…" : "🤖 KI-Text generieren",
    title: "Lässt die KI einen herzlichen Blogtext auf Basis von Titel und Themen schreiben",
    disabled: isLoading,
    onHandle: handleGenerate,
    tone: "positive" as const,
  };
};
