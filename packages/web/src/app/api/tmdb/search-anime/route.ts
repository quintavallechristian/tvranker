import { NextRequest, NextResponse } from "next/server";
import { searchShows } from "@/lib/tmdb/client";

// TMDB genre ID 16 = Animation
const ANIMATION_GENRE_ID = 16;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await searchShows(query);
    // Filter to only animation genre
    const animeResults = data.results.filter((show) =>
      show.genre_ids?.includes(ANIMATION_GENRE_ID),
    );
    return NextResponse.json({
      results: animeResults.map((show) => ({
        tmdb_id: show.id,
        title: show.name,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date,
        overview: show.overview,
        vote_average: show.vote_average,
      })),
    });
  } catch (error) {
    console.error("TMDB anime search error:", error);
    return NextResponse.json(
      { error: "Failed to search anime" },
      { status: 500 },
    );
  }
}
