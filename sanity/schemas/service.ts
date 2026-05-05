import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Leistung",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Bezeichnung",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Pfad",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "icon",
      title: "Icon / Emoji",
      description: "Ein Emoji als Icon (z.B. 🐕) oder ein Bild hochladen",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "shortDescription",
      title: "Kurzbeschreibung",
      description: "Für die Startseiten-Übersicht (max. 150 Zeichen)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "description",
      title: "Ausführliche Beschreibung",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "targetAudience",
      title: "Für wen ist diese Leistung?",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: "title", icon: "icon", media: "image" },
    prepare({ title, icon, media }) {
      return { title: `${icon ?? ""} ${title}`, media };
    },
  },
  orderings: [
    { title: "Reihenfolge", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
