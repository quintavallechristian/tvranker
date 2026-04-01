import { NextRequest, NextResponse } from "next/server";
import { searchGames } from "@/lib/igdb/client";
import { getIGDBCoverUrl } from "@tvranker/shared";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await searchGames(query);
    return NextResponse.json({
      results: data.map((game) => ({
        igdb_id: game.id,
        title: game.name,
        cover_url: getIGDBCoverUrl(game.cover?.image_id, "cover_big"),
        first_release_date: game.first_release_date
          ? new Date(game.first_release_date * 1000).toISOString().slice(0, 10)
          : null,
        platforms: game.platforms?.map((p) => p.name) ?? [],
        genres: game.genres?.map((g) => g.name) ?? [],
      })),
    });
  } catch (error) {
    console.error("IGDB search error:", error);
    return NextResponse.json(
      { error: "Failed to search games" },
      { status: 500 },
    );
  }
}
