import { NextRequest, NextResponse } from "next/server";
import { handleUpdate, TelegramUpdate } from "@/lib/telegram/bot";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Optional: Telegram webhook secret token for security
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Verify secret token if configured
  if (SECRET) {
    const token = req.headers.get("x-telegram-bot-api-secret-token");
    if (token !== SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let update: TelegramUpdate;
  try {
    update = (await req.json()) as TelegramUpdate;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Process update in background – we must return 200 to Telegram within 5s
  void handleUpdate(update).catch((err) => {
    console.error("[Telegram Bot] Error handling update:", err);
  });

  return NextResponse.json({ ok: true });
}

// Telegram sends GET for webhook verification
export function GET(): NextResponse {
  return NextResponse.json({ ok: true, info: "Tierphysio Klauser Bot is running" });
}
