import { NextResponse } from "next/server";
import { sendAppointmentEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name?: unknown;
      email?: unknown;
      telefon?: unknown;
      tierart?: unknown;
      tiername?: unknown;
      anliegen?: unknown;
      zeitraum?: unknown;
    };
    const { name, email, telefon, tierart, tiername, anliegen, zeitraum } = body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      typeof telefon !== "string" || !telefon.trim() ||
      typeof tierart !== "string" || !tierart.trim() ||
      typeof anliegen !== "string" || !anliegen.trim() ||
      typeof zeitraum !== "string" || !zeitraum.trim()
    ) {
      return NextResponse.json(
        { error: "Bitte alle Pflichtfelder ausfüllen." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Bitte eine gültige E-Mail-Adresse eingeben." },
        { status: 400 }
      );
    }

    await sendAppointmentEmail({
      name: name.trim(),
      email: email.trim(),
      telefon: telefon.trim(),
      tierart: tierart.trim(),
      tiername: typeof tiername === "string" ? tiername.trim() : undefined,
      anliegen: anliegen.trim(),
      zeitraum: zeitraum.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Appointment form error:", error);
    return NextResponse.json(
      { error: "Die Anfrage konnte nicht gesendet werden. Bitte versuche es später erneut." },
      { status: 500 }
    );
  }
}
