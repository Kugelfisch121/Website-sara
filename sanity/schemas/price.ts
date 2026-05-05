import { defineType, defineField } from "sanity";

export const price = defineType({
  name: "price",
  title: "Preis",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Kategorie",
      description: "z.B. Physiotherapie, Blutegeltherapie, Kurse",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "leistung",
      title: "Leistung",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "preis",
      title: "Preis",
      description: "z.B. 'ab 60 €' oder '80 €'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hinweis",
      title: "Hinweis",
      description: "Optionaler Zusatztext (z.B. 'inkl. Anfahrt bis 20 km')",
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
    select: { title: "leistung", subtitle: "preis", category: "category" },
    prepare({ title, subtitle, category }) {
      return { title, subtitle: `${category} · ${subtitle}` };
    },
  },
  orderings: [
    {
      title: "Kategorie & Reihenfolge",
      name: "categoryOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
