/**
 * Cloudinary Bildverarbeitung – erstellt Instagram-fertige Posts.
 *
 * Jedes Template bekommt:
 * - Einheitlichen Warm-Filter (leicht erhöhte Sättigung & Wärme)
 * - Konsistenten Rahmen (Farbe aus dem Brand-Design)
 * - Logo-Overlay unten rechts (wird als "tierphysio/logo" in Cloudinary erwartet)
 * - CTA-Zeile unten (Telefon + Website)
 *
 * Setup: https://cloudinary.com → kostenloses Konto erstellen
 * → Account Name + API Key + API Secret in .env.local eintragen
 * → Logo als PNG (mit Transparenz) unter public_id "tierphysio/logo" hochladen
 */

import { TemplateType } from "./telegram/types";

const BRAND = {
  frameColor: "2D5016",      // Dunkelgrün – Primärfarbe
  textColor: "ffffff",        // Weiß für Text auf Bild
  bgColor: "F5F0E8",          // Beige für Text-only Template
  textBgColor: "2D5016",      // Grüner Hintergrundstreifen für Text
  font: "Arial",
  logoPublicId: "tierphysio/logo", // Logo muss in Cloudinary hochgeladen werden
};

function getCloudName() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) throw new Error("CLOUDINARY_CLOUD_NAME nicht konfiguriert");
  return cloudName;
}

/** Erstellt eine Cloudinary-Transformation-URL für ein einzelnes Foto */
function baseImageTransform(publicId: string, size = 1080): string {
  const cloudName = getCloudName();
  const transforms = [
    `w_${size},h_${size},c_fill,g_center`,
    `e_brightness:3`,
    `e_saturation:12`,
    `e_contrast:5`,
    // Warm-Tönung: leicht rötlich-gelber Cast
    `e_hue:8`,
  ].join("/");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`;
}

/** Fügt Rahmen, Logo und CTA-Zeile hinzu */
function addBrandOverlays(
  baseTransform: string,
  ctaText: string,
  publicId: string
): string {
  const cloudName = getCloudName();
  const safeCtaText = encodeURIComponent(ctaText.replace(/,/g, "%2C"));

  const overlays = [
    // Rahmen (5px grüner Border-Effekt via Padding-Overlay)
    `b_rgb:${BRAND.frameColor},bo_6px_solid_rgb:${BRAND.frameColor}`,
    // Logo unten rechts
    `l_${BRAND.logoPublicId.replace("/", ":")},g_south_east,w_120,x_15,y_15,o_90`,
    // CTA-Hintergrundstreifen
    `l_gen_fill,w_1080,h_70,g_south,y_0`,
    // CTA-Text
    `l_text:${BRAND.font}_24_bold:${safeCtaText},co_rgb:${BRAND.textColor},g_south,y_20`,
  ].join("/");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${overlays}/${publicId}`;
}

export interface GenerateImageOptions {
  publicIds: string[];
  template: TemplateType;
  mainText: string;
  ctaText: string; // z.B. "📞 0152 1234567 | tierphysio-klauser.de"
}

export interface GeneratedImage {
  url: string;
  width: number;
  height: number;
}

export function generateImageUrl(options: GenerateImageOptions): GeneratedImage {
  const cloudName = getCloudName();
  const { publicIds, template, mainText, ctaText } = options;

  const safeText = encodeURIComponent(mainText.slice(0, 200).replace(/,/g, "%2C"));
  const safeCta = encodeURIComponent(ctaText.replace(/,/g, "%2C"));

  switch (template) {
    case "single_with_text": {
      const pid = publicIds[0];
      // Bild oben (70%), Textstreifen unten (30%)
      const url = [
        `https://res.cloudinary.com/${cloudName}/image/upload`,
        `w_1080,h_1080,c_fill`,
        `e_brightness:3/e_saturation:12/e_hue:8`,
        `bo_6px_solid_rgb:${BRAND.frameColor}`,
        // Dunkler Gradient unten
        `l_gradient:fade,w_1080,h_400,g_south,y_0,o_70`,
        // Haupttext
        `l_text:${BRAND.font}_34_bold:${safeText},co_rgb:${BRAND.textColor},g_south_west,x_30,y_90,w_900,c_fit`,
        // CTA
        `l_text:${BRAND.font}_22:${safeCta},co_rgb:${BRAND.textColor},g_south_west,x_30,y_30`,
        // Logo
        `l_${BRAND.logoPublicId.replace("/", ":")},g_south_east,w_100,x_15,y_15,o_90`,
        pid,
      ].join("/");
      return { url, width: 1080, height: 1080 };
    }

    case "before_after": {
      // Zwei Bilder nebeneinander
      const [before, after] = publicIds;
      const url = [
        `https://res.cloudinary.com/${cloudName}/image/upload`,
        `w_1080,h_1080,c_fill`,
        // Linke Hälfte: Vorher
        `l_${before.replace("/", ":")},w_530,h_1080,c_fill,g_west,x_0`,
        `l_text:${BRAND.font}_28_bold:VORHER,co_rgb:${BRAND.textColor},g_north_west,x_20,y_20`,
        // Rechte Hälfte: Nachher
        `l_${after.replace("/", ":")},w_530,h_1080,c_fill,g_east,x_0`,
        `l_text:${BRAND.font}_28_bold:NACHHER,co_rgb:${BRAND.textColor},g_north_east,x_20,y_20`,
        // Trennlinie
        `l_gen_fill,w_6,h_1080,g_center,x_0,co_rgb:${BRAND.frameColor}`,
        // Logo
        `l_${BRAND.logoPublicId.replace("/", ":")},g_south_east,w_100,x_15,y_15,o_90`,
        // CTA
        `l_text:${BRAND.font}_22:${safeCta},co_rgb:${BRAND.textColor},g_south,y_15`,
        `b_rgb:000000,o_50,w_1080,h_50,g_south`,
        before, // Basis-Bild
      ].join("/");
      return { url, width: 1080, height: 1080 };
    }

    case "collage_2_text": {
      const [p1, p2] = publicIds;
      const url = [
        `https://res.cloudinary.com/${cloudName}/image/upload`,
        `w_1080,h_1080,b_rgb:${BRAND.frameColor}`,
        `l_${p1.replace("/", ":")},w_520,h_500,c_fill,g_north_west,x_5,y_5`,
        `l_${p2.replace("/", ":")},w_520,h_500,c_fill,g_north_east,x_5,y_5`,
        `l_text:${BRAND.font}_30_bold:${safeText},co_rgb:${BRAND.textColor},g_south,y_60,w_900,c_fit`,
        `l_text:${BRAND.font}_22:${safeCta},co_rgb:${BRAND.textColor},g_south,y_20`,
        `l_${BRAND.logoPublicId.replace("/", ":")},g_south_east,w_90,x_10,y_10,o_90`,
        p1,
      ].join("/");
      return { url, width: 1080, height: 1080 };
    }

    case "collage_3_text": {
      const [p1, p2, p3] = publicIds;
      const url = [
        `https://res.cloudinary.com/${cloudName}/image/upload`,
        `w_1080,h_1080,b_rgb:${BRAND.frameColor}`,
        // Oben: großes Bild
        `l_${p1.replace("/", ":")},w_1060,h_520,c_fill,g_north,y_5,x_5`,
        // Unten links
        `l_${p2.replace("/", ":")},w_520,h_380,c_fill,g_south_west,x_5,y_80`,
        // Unten rechts
        `l_${p3.replace("/", ":")},w_520,h_380,c_fill,g_south_east,x_5,y_80`,
        `l_text:${BRAND.font}_28_bold:${safeText},co_rgb:${BRAND.textColor},g_south,y_30,w_800,c_fit`,
        `l_${BRAND.logoPublicId.replace("/", ":")},g_north_east,w_90,x_15,y_15,o_90`,
        p1,
      ].join("/");
      return { url, width: 1080, height: 1080 };
    }

    case "single_no_text": {
      const pid = publicIds[0];
      const url = [
        `https://res.cloudinary.com/${cloudName}/image/upload`,
        `w_1080,h_1080,c_fill,g_center`,
        `e_brightness:3/e_saturation:12/e_hue:8`,
        `bo_6px_solid_rgb:${BRAND.frameColor}`,
        `l_${BRAND.logoPublicId.replace("/", ":")},g_south_east,w_100,x_15,y_15,o_90`,
        pid,
      ].join("/");
      return { url, width: 1080, height: 1080 };
    }

    case "collage_no_text": {
      const [p1, p2] = publicIds;
      const url = [
        `https://res.cloudinary.com/${cloudName}/image/upload`,
        `w_1080,h_1080,b_rgb:${BRAND.frameColor}`,
        `l_${p1.replace("/", ":")},w_530,h_1060,c_fill,g_west,x_5,y_5`,
        `l_${p2.replace("/", ":")},w_530,h_1060,c_fill,g_east,x_5,y_5`,
        `l_${BRAND.logoPublicId.replace("/", ":")},g_south_east,w_90,x_10,y_10,o_90`,
        p1,
      ].join("/");
      return { url, width: 1080, height: 1080 };
    }

    case "text_only": {
      const url = [
        `https://res.cloudinary.com/${cloudName}/image/upload`,
        `w_1080,h_1080,b_rgb:${BRAND.bgColor}`,
        `l_text:${BRAND.font}_42_bold:${safeText},co_rgb:${BRAND.frameColor},g_center,w_900,c_fit`,
        `l_text:${BRAND.font}_26:${safeCta},co_rgb:${BRAND.frameColor},g_south,y_60`,
        `l_${BRAND.logoPublicId.replace("/", ":")},g_south_east,w_90,x_20,y_20,o_90`,
        `bo_8px_solid_rgb:${BRAND.frameColor}`,
        "sample", // Cloudinary benötigt ein Basis-Bild, sample ist immer vorhanden
      ].join("/");
      return { url, width: 1080, height: 1080 };
    }
  }
}

export function buildCtaText(phone?: string, website?: string, ctaType?: string): string {
  const parts: string[] = [];
  if ((ctaType === "phone" || ctaType === "both") && phone) {
    parts.push(`📞 ${phone}`);
  }
  if ((ctaType === "website" || ctaType === "both") && website) {
    parts.push(`🌐 ${website}`);
  }
  return parts.join("  |  ") || "📞 Jetzt Termin anfragen";
}
