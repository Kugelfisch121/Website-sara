export type TemplateType =
  | "single_with_text"   // 1 Foto + Text
  | "before_after"       // Vorher/Nachher + Text
  | "collage_2_text"     // 2 Fotos + Text
  | "collage_3_text"     // 3 Fotos + Text
  | "single_no_text"     // Nur 1 Foto
  | "collage_no_text"    // Nur 2-3 Fotos ohne Text
  | "text_only";         // Nur Text

export type BotState =
  | "idle"
  | "collecting_photos"
  | "selecting_template"
  | "entering_keywords"
  | "selecting_cta"
  | "generating"
  | "reviewing"
  | "selecting_platforms"
  | "done";

export type CtaType = "phone" | "website" | "both";

export type Platform = "website" | "instagram" | "facebook" | "whatsapp";

export interface SessionData {
  state: BotState;
  photos: string[];          // Cloudinary public IDs
  template?: TemplateType;
  keywords: string[];
  ctaType?: CtaType;
  generatedText?: string;
  generatedImageUrl?: string;
  lastMessageId?: number;
}

export const TEMPLATE_LABELS: Record<TemplateType, string> = {
  single_with_text: "📸 1 Foto + Text",
  before_after: "🔄 Vorher / Nachher",
  collage_2_text: "🖼 Kollage 2 Fotos + Text",
  collage_3_text: "🖼 Kollage 3 Fotos + Text",
  single_no_text: "📷 Nur 1 Foto",
  collage_no_text: "🗂 Nur Kollage",
  text_only: "✍️ Nur Text",
};

export const TEMPLATE_PHOTO_COUNT: Record<TemplateType, number> = {
  single_with_text: 1,
  before_after: 2,
  collage_2_text: 2,
  collage_3_text: 3,
  single_no_text: 1,
  collage_no_text: 2, // 2 or 3
  text_only: 0,
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  website: "🌐 Website",
  instagram: "📸 Instagram",
  facebook: "📘 Facebook",
  whatsapp: "💬 WhatsApp",
};
