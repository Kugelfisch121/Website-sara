import { defineType, defineField } from "sanity";

export const successStory = defineType({
  name: "successStory",
  title: "Glückliche Vierbeiner",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Überschrift",
      type: "string",
      description: "z.B. 'Max läuft wieder!' oder 'Luna nach der OP'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tierart",
      title: "Tierart",
      type: "string",
      options: {
        list: [
          { title: "Hund", value: "hund" },
          { title: "Katze", value: "katze" },
          { title: "Pferd", value: "pferd" },
          { title: "Sonstiges", value: "sonstiges" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "template",
      title: "Template",
      type: "string",
      options: {
        list: [
          { title: "1 Foto + Text", value: "single_with_text" },
          { title: "Vorher / Nachher + Text", value: "before_after" },
          { title: "Kollage 2 Fotos + Text", value: "collage_2_text" },
          { title: "Kollage 3 Fotos + Text", value: "collage_3_text" },
          { title: "Nur 1 Foto", value: "single_no_text" },
          { title: "Nur Kollage (2-3 Fotos)", value: "collage_no_text" },
          { title: "Nur Text", value: "text_only" },
        ],
      },
    }),
    defineField({
      name: "photos",
      title: "Fotos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Bildbeschreibung" },
            {
              name: "label",
              type: "string",
              title: "Label (z.B. 'Vorher' / 'Nachher')",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "generatedImageUrl",
      title: "Generiertes Bild (URL)",
      type: "url",
      description: "Wird automatisch vom Telegram-Bot befüllt",
      readOnly: true,
    }),
    defineField({
      name: "text",
      title: "Text / Geschichte",
      type: "text",
      rows: 5,
      description: "Wird vom KI-Bot generiert, kann hier bearbeitet werden",
    }),
    defineField({
      name: "keywords",
      title: "Stichworte",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlicht am",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "publishedOn",
      title: "Geteilt auf",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Website", value: "website" },
          { title: "Instagram", value: "instagram" },
          { title: "Facebook", value: "facebook" },
          { title: "WhatsApp Status", value: "whatsapp" },
        ],
        layout: "grid",
      },
    }),
    defineField({
      name: "featured",
      title: "Auf Startseite zeigen?",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      tierart: "tierart",
      media: "photos.0",
    },
    prepare({ title, tierart, media }) {
      const emoji = { hund: "🐕", katze: "🐈", pferd: "🐴", sonstiges: "🐾" };
      return {
        title,
        subtitle: emoji[tierart as keyof typeof emoji] ?? "🐾",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Neueste zuerst",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
