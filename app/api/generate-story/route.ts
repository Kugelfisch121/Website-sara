import { NextResponse } from "next/server";
import { generateStoryText } from "@/lib/anthropic";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      title?: unknown;
      tags?: unknown;
      imageDescription?: unknown;
    };
    const { title, tags, imageDescription } = body;

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { error: "Bitte einen Titel eingeben." },
        { status: 400 }
      );
    }

    const validTags = Array.isArray(tags)
      ? tags.filter((t): t is string => typeof t === "string")
      : [];

    const result = await generateStoryText({
      title: title.trim(),
      tags: validTags,
      imageDescription: typeof imageDescription === "string" ? imageDescription : "",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate story error:", error);
    return NextResponse.json(
      { error: "Der Text konnte nicht generiert werden. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
