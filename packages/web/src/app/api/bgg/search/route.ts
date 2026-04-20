import { NextRequest, NextResponse } from "next/server";
import { searchBoardgames } from "@/lib/bgg/client";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await searchBoardgames(query);
    return NextResponse.json({
      results: data.map((bg) => ({
        bgg_id: bg.id,
        title: bg.name,
        year_published: bg.yearPublished ?? null,
        type: bg.type,
      })),
    });
  } catch (error) {
    console.error("BGG search error:", error);
    return NextResponse.json(
      { error: "Failed to search board games" },
      { status: 500 },
    );
  }
}
