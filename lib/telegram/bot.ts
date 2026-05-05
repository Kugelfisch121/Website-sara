/**
 * Telegram Bot – Hauptlogik
 *
 * Gesprächsablauf:
 * 1. Sara schickt Foto(s) oder /neu
 * 2. Bot fragt: Template wählen
 * 3. Bot fragt: Stichworte
 * 4. Bot fragt: CTA (Telefon / Website / Beides)
 * 5. Bot generiert Bild + Text → zeigt Vorschau
 * 6. Sara: ✅ Bestätigen oder ✏️ Ändern
 * 7. Sara wählt Plattformen zum Veröffentlichen
 * 8. Bot postet und speichert in Sanity
 *
 * Webhook-URL: https://deine-vercel-url.vercel.app/api/telegram
 * Telegram Token: @BotFather → /newbot
 */

import { SessionData, TemplateType, TEMPLATE_LABELS, TEMPLATE_PHOTO_COUNT, Platform, PLATFORM_LABELS } from "./types";
import { getSession, saveSession, clearSession } from "./state";
import { generatePostText } from "./textGenerator";
import { generateImageUrl, buildCtaText } from "../cloudinary";
import { uploadTelegramPhotoToCloudinary } from "./cloudinaryUpload";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const ALLOWED_USER_IDS = (process.env.TELEGRAM_ALLOWED_USER_IDS ?? "")
  .split(",")
  .map((id) => parseInt(id.trim(), 10))
  .filter(Boolean);

// ─── Telegram API helper ───────────────────────────────────────────────────

async function telegramRequest(method: string, body: Record<string, unknown>) {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function sendMessage(chatId: number, text: string, extra?: Record<string, unknown>) {
  return telegramRequest("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...extra,
  });
}

async function sendPhoto(chatId: number, photoUrl: string, caption: string, extra?: Record<string, unknown>) {
  return telegramRequest("sendPhoto", {
    chat_id: chatId,
    photo: photoUrl,
    caption,
    parse_mode: "HTML",
    ...extra,
  });
}

function inlineKeyboard(buttons: { text: string; data: string }[][]) {
  return {
    reply_markup: {
      inline_keyboard: buttons.map((row) =>
        row.map((btn) => ({ text: btn.text, callback_data: btn.data }))
      ),
    },
  };
}

// ─── State Handlers ────────────────────────────────────────────────────────

async function handleIdle(chatId: number, userId: number, update: TelegramUpdate) {
  const session = await getSession(userId);

  if (update.message?.photo) {
    // Foto empfangen → direkt in den Sammelmodus
    const photo = update.message.photo.at(-1)!; // Größtes verfügbares Format
    const fileUrl = await getFileUrl(photo.file_id);
    const publicId = await uploadTelegramPhotoToCloudinary(fileUrl);

    const newSession: SessionData = {
      state: "collecting_photos",
      photos: [publicId],
      keywords: [],
    };
    await saveSession(userId, newSession);
    await askForMorePhotosOrTemplate(chatId, newSession);
    return;
  }

  if (update.message?.text === "/neu" || update.message?.text === "/start") {
    await clearSession(userId);
    await sendMessage(
      chatId,
      "🐾 <b>Neuer Post!</b>\n\nSchick mir einfach ein Foto (oder mehrere Fotos nacheinander) um loszulegen.\n\nOder tippe <b>/neu</b> für einen neuen Post jederzeit."
    );
    return;
  }

  await sendMessage(chatId, "Schick mir ein Foto um einen neuen Post zu erstellen, oder tippe /neu.");
  void session;
}

async function askForMorePhotosOrTemplate(chatId: number, session: SessionData) {
  const count = session.photos.length;

  await sendMessage(
    chatId,
    `✅ Foto ${count} erhalten!\n\nMöchtest du noch ein weiteres Foto schicken, oder direkt das Template wählen?`,
    inlineKeyboard([
      [
        { text: "➕ Noch ein Foto", data: "more_photos" },
        { text: "▶️ Template wählen", data: "select_template" },
      ],
    ])
  );
}

async function askTemplate(chatId: number) {
  await sendMessage(
    chatId,
    "🖼 <b>Welches Format soll der Post haben?</b>",
    inlineKeyboard([
      [
        { text: TEMPLATE_LABELS.single_with_text, data: "tmpl:single_with_text" },
        { text: TEMPLATE_LABELS.before_after, data: "tmpl:before_after" },
      ],
      [
        { text: TEMPLATE_LABELS.collage_2_text, data: "tmpl:collage_2_text" },
        { text: TEMPLATE_LABELS.collage_3_text, data: "tmpl:collage_3_text" },
      ],
      [
        { text: TEMPLATE_LABELS.single_no_text, data: "tmpl:single_no_text" },
        { text: TEMPLATE_LABELS.collage_no_text, data: "tmpl:collage_no_text" },
      ],
      [{ text: TEMPLATE_LABELS.text_only, data: "tmpl:text_only" }],
    ])
  );
}

async function askKeywords(chatId: number) {
  await sendMessage(
    chatId,
    "🏷 <b>Welche Stichworte beschreiben den Post?</b>\n\nSchreib einfach Stichworte durch Komma getrennt:\n<i>z.B. Arthrose, Hund, Massage, Fortschritt</i>"
  );
}

async function askCta(chatId: number) {
  await sendMessage(
    chatId,
    "📞 <b>Welche Kontaktmöglichkeit soll eingebaut werden?</b>",
    inlineKeyboard([
      [
        { text: "📞 Telefonnummer", data: "cta:phone" },
        { text: "🌐 Website-Link", data: "cta:website" },
        { text: "📞🌐 Beides", data: "cta:both" },
      ],
    ])
  );
}

async function generateAndPreview(chatId: number, userId: number, session: SessionData) {
  await sendMessage(chatId, "✨ Ich generiere deinen Post… einen Moment!");

  const { postText, caption } = await generatePostText({
    keywords: session.keywords,
    template: session.template!,
    ctaType: session.ctaType!,
  });

  const ctaText = buildCtaText(
    process.env.SARA_PHONE,
    process.env.NEXT_PUBLIC_SITE_URL,
    session.ctaType
  );

  const generated = generateImageUrl({
    publicIds: session.photos,
    template: session.template!,
    mainText: postText,
    ctaText,
  });

  const updatedSession: SessionData = {
    ...session,
    state: "reviewing",
    generatedText: caption,
    generatedImageUrl: generated.url,
  };
  await saveSession(userId, updatedSession);

  await sendPhoto(
    chatId,
    generated.url,
    `📝 <b>Dein Post-Vorschau:</b>\n\n${caption}`,
    inlineKeyboard([
      [
        { text: "✅ Super, so passt's!", data: "approve" },
        { text: "✏️ Text ändern", data: "change_text" },
      ],
      [
        { text: "🔄 Neues Bild generieren", data: "regenerate" },
        { text: "❌ Abbrechen", data: "cancel" },
      ],
    ])
  );
}

async function askPlatforms(chatId: number) {
  await sendMessage(
    chatId,
    "🚀 <b>Wohin soll ich den Post veröffentlichen?</b>\n\n(Mehrfachauswahl möglich – tippe nacheinander)",
    inlineKeyboard([
      [
        { text: PLATFORM_LABELS.website, data: "pub:website" },
        { text: PLATFORM_LABELS.instagram, data: "pub:instagram" },
      ],
      [
        { text: PLATFORM_LABELS.facebook, data: "pub:facebook" },
        { text: PLATFORM_LABELS.whatsapp, data: "pub:whatsapp" },
      ],
      [
        { text: "📤 Alle!", data: "pub:all" },
        { text: "✅ Fertig & Veröffentlichen", data: "pub:done" },
      ],
    ])
  );
}

// ─── Main dispatcher ───────────────────────────────────────────────────────

export interface TelegramUpdate {
  message?: {
    message_id: number;
    from?: { id: number; first_name?: string };
    chat: { id: number };
    text?: string;
    photo?: { file_id: string; width: number; height: number }[];
  };
  callback_query?: {
    id: string;
    from: { id: number };
    message?: { chat: { id: number }; message_id: number };
    data?: string;
  };
}

export async function handleUpdate(update: TelegramUpdate): Promise<void> {
  const userId = update.message?.from?.id ?? update.callback_query?.from.id;
  const chatId = update.message?.chat.id ?? update.callback_query?.message?.chat.id;

  if (!userId || !chatId) return;

  // Zugriffskontrolle: Nur erlaubte Nutzer
  if (ALLOWED_USER_IDS.length > 0 && !ALLOWED_USER_IDS.includes(userId)) {
    await sendMessage(chatId, "⛔ Du bist leider nicht berechtigt diesen Bot zu nutzen.");
    return;
  }

  const session = await getSession(userId);

  // ── Callback-Query (Button-Klick) ────────────────────────────────────────
  if (update.callback_query) {
    const data = update.callback_query.data ?? "";
    await telegramRequest("answerCallbackQuery", { callback_query_id: update.callback_query.id });

    if (data === "more_photos") {
      const updated = { ...session, state: "collecting_photos" as const };
      await saveSession(userId, updated);
      await sendMessage(chatId, "📸 Schick mir das nächste Foto!");
      return;
    }

    if (data === "select_template") {
      const updated = { ...session, state: "selecting_template" as const };
      await saveSession(userId, updated);
      await askTemplate(chatId);
      return;
    }

    if (data.startsWith("tmpl:")) {
      const template = data.replace("tmpl:", "") as TemplateType;
      const needed = TEMPLATE_PHOTO_COUNT[template];
      const have = session.photos.length;

      if (have < needed) {
        await sendMessage(
          chatId,
          `Für dieses Template brauche ich ${needed} Foto(s), du hast mir bisher ${have} geschickt. Schick mir noch ${needed - have} Foto(s)!`
        );
        return;
      }

      const updated = { ...session, template, state: "entering_keywords" as const };
      await saveSession(userId, updated);
      await askKeywords(chatId);
      return;
    }

    if (data.startsWith("cta:")) {
      const ctaType = data.replace("cta:", "") as "phone" | "website" | "both";
      const updated = { ...session, ctaType, state: "generating" as const };
      await saveSession(userId, updated);
      await generateAndPreview(chatId, userId, updated);
      return;
    }

    if (data === "approve") {
      const updated = { ...session, state: "selecting_platforms" as const };
      await saveSession(userId, updated);
      await askPlatforms(chatId);
      return;
    }

    if (data === "change_text") {
      await sendMessage(chatId, "✏️ Schreib mir den neuen Text – ich passe ihn an:");
      const updated = { ...session, state: "entering_keywords" as const };
      await saveSession(userId, updated);
      return;
    }

    if (data === "regenerate") {
      await generateAndPreview(chatId, userId, session);
      return;
    }

    if (data === "cancel") {
      await clearSession(userId);
      await sendMessage(chatId, "❌ Abgebrochen. Tippe /neu für einen neuen Post.");
      return;
    }

    if (data.startsWith("pub:")) {
      const platform = data.replace("pub:", "") as Platform | "all" | "done";

      if (platform === "done") {
        await publishPost(chatId, userId, session);
        return;
      }

      if (platform === "all") {
        const updated = {
          ...session,
          publishedOn: ["website", "instagram", "facebook", "whatsapp"] as Platform[],
        };
        await saveSession(userId, updated);
        await sendMessage(chatId, "✅ Alle Plattformen ausgewählt! Tippe <b>✅ Fertig & Veröffentlichen</b> um zu posten.");
        return;
      }

      // Toggle platform
      const current = (session as SessionData & { publishedOn?: Platform[] }).publishedOn ?? [];
      const next = current.includes(platform as Platform)
        ? current.filter((p) => p !== platform)
        : [...current, platform as Platform];
      const updated = { ...session, publishedOn: next } as SessionData & { publishedOn: Platform[] };
      await saveSession(userId, updated);

      const selected = next.map((p) => PLATFORM_LABELS[p]).join(", ");
      await sendMessage(chatId, `📋 Ausgewählt: ${selected || "Noch nichts"}`);
      return;
    }
  }

  // ── Nachrichten ───────────────────────────────────────────────────────────
  if (update.message) {
    // Foto empfangen
    if (update.message.photo) {
      const photo = update.message.photo.at(-1)!;
      const fileUrl = await getFileUrl(photo.file_id);
      const publicId = await uploadTelegramPhotoToCloudinary(fileUrl);

      if (session.state === "collecting_photos") {
        const updated = { ...session, photos: [...session.photos, publicId] };
        await saveSession(userId, updated);
        await askForMorePhotosOrTemplate(chatId, updated);
        return;
      }

      // Neues Foto aus dem Idle-Zustand
      const newSession: SessionData = { state: "collecting_photos", photos: [publicId], keywords: [] };
      await saveSession(userId, newSession);
      await askForMorePhotosOrTemplate(chatId, newSession);
      return;
    }

    // Text empfangen
    if (update.message.text) {
      if (update.message.text === "/neu" || update.message.text === "/start") {
        await clearSession(userId);
        await sendMessage(chatId, "🐾 <b>Neuer Post!</b>\n\nSchick mir ein Foto um loszulegen.");
        return;
      }

      if (session.state === "entering_keywords") {
        const keywords = update.message.text.split(",").map((k) => k.trim()).filter(Boolean);
        const updated = { ...session, keywords, state: "selecting_cta" as const };
        await saveSession(userId, updated);
        await askCta(chatId);
        return;
      }

      await handleIdle(chatId, userId, update);
    }
  }
}

async function publishPost(chatId: number, userId: number, session: SessionData) {
  const publishedOn = (session as SessionData & { publishedOn?: Platform[] }).publishedOn ?? [];

  if (publishedOn.length === 0) {
    await sendMessage(chatId, "⚠️ Du hast noch keine Plattform ausgewählt. Tippe auf die Buttons oben!");
    return;
  }

  await sendMessage(chatId, "⏳ Ich veröffentliche den Post…");

  // Call the publish API route
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/publish-post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageUrl: session.generatedImageUrl,
      caption: session.generatedText,
      keywords: session.keywords,
      template: session.template,
      platforms: publishedOn,
    }),
  });

  const result = await res.json() as { success?: boolean; results?: Record<string, string>; error?: string };

  if (!res.ok) {
    await sendMessage(chatId, `❌ Fehler beim Veröffentlichen: ${result.error}`);
    return;
  }

  const lines = Object.entries(result.results ?? {}).map(
    ([platform, status]) => `${PLATFORM_LABELS[platform as Platform] ?? platform}: ${status}`
  );

  await sendMessage(
    chatId,
    `🎉 <b>Veröffentlicht!</b>\n\n${lines.join("\n")}\n\nToller Post! Tippe /neu für den nächsten.`
  );

  // WhatsApp: kein automatisches Posten möglich → Bild-Link schicken
  if (publishedOn.includes("whatsapp")) {
    await sendMessage(
      chatId,
      `💬 <b>WhatsApp Status:</b>\nLade dieses Bild herunter und poste es manuell als Status:\n\n${session.generatedImageUrl}`
    );
  }

  await clearSession(userId);
}

async function getFileUrl(fileId: string): Promise<string> {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
  const data = await res.json() as { result?: { file_path: string } };
  const filePath = data.result?.file_path;
  if (!filePath) throw new Error("Konnte Telegram-Datei nicht abrufen");
  return `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
}
