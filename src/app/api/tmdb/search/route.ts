import { NextRequest, NextResponse } from "next/server";
import { searchShows } from "@/lib/tmdb/client";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await searchShows(query);
    return NextResponse.json({
      results: data.results.map((show) => ({
        tmdb_id: show.id,
        title: show.name,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date,
        overview: show.overview,
        vote_average: show.vote_average,
      })),
    });
  } catch (error) {
    console.error("TMDB search error:", error);
    return NextResponse.json(
      { error: "Failed to search shows" },
      { status: 500 },
    );
  }
}
