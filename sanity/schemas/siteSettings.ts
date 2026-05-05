import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  // Singleton: only one document of this type
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "telefon",
      title: "Telefonnummer",
      type: "string",
      description: "z.B. +49 (0) 2835 123456",
    }),
    defineField({
      name: "email",
      title: "E-Mail-Adresse",
      type: "string",
    }),
    defineField({
      name: "adresse",
      title: "Adresse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps Link",
      type: "url",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook-Seite",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram-Profil",
      type: "url",
    }),
    defineField({
      name: "googleBusinessUrl",
      title: "Google Business Profil",
      type: "url",
    }),
    defineField({
      name: "heroImage",
      title: "Startseiten-Headerbild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutImage",
      title: "Über-mich-Bild",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Website-Einstellungen" };
    },
  },
});
