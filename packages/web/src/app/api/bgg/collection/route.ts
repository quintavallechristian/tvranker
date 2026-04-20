import { NextRequest, NextResponse } from "next/server";
import { getUserCollection } from "@/lib/bgg/client";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username || username.length < 1) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    const collection = await getUserCollection(username);
    return NextResponse.json({ items: collection });
  } catch (error) {
    console.error("BGG collection error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch collection";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
