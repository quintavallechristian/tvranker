import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb/client";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await searchMovies(query);
    return NextResponse.json({
      results: data.results.map((movie) => ({
        tmdb_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        overview: movie.overview,
        vote_average: movie.vote_average,
      })),
    });
  } catch (error) {
    console.error("TMDB movie search error:", error);
    return NextResponse.json(
      { error: "Failed to search movies" },
      { status: 500 },
    );
  }
}
