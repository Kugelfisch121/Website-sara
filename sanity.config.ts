import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { AiGenerateAction } from "./sanity/plugins/aiGenerateAction";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "tierphysio-klauser",
  title: "Tierphysio Klauser – Inhaltsverwaltung",
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Inhalt")
          .items([
            S.listItem()
              .title("Website-Einstellungen")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.listItem()
              .title("News & Tipps")
              .child(
                S.documentTypeList("newsStory").title("Alle News Stories")
              ),
            S.listItem()
              .title("Leistungen")
              .child(S.documentTypeList("service").title("Alle Leistungen")),
            S.listItem()
              .title("Preise")
              .child(S.documentTypeList("price").title("Alle Preise")),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      if (context.schemaType === "newsStory") {
        return [...prev, AiGenerateAction];
      }
      return prev;
    },
  },
});
