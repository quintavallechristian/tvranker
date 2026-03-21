import { NextRequest, NextResponse } from "next/server";
import { findByImdbId } from "@/lib/tmdb/client";

export async function GET(request: NextRequest) {
  const imdbId = request.nextUrl.searchParams.get("id");

  if (!imdbId) {
    return NextResponse.json({ error: "Missing IMDB ID" }, { status: 400 });
  }

  try {
    const { show, movie } = await findByImdbId(imdbId);
    const match = show ?? movie;
    if (!match) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    const isMovie = !show && !!movie;
    return NextResponse.json({
      tmdb_id: match.id,
      title: isMovie
        ? (match as typeof movie)!.title
        : (match as typeof show)!.name,
      poster_path: match.poster_path,
      first_air_date: isMovie
        ? (match as typeof movie)!.release_date
        : (match as typeof show)!.first_air_date,
      overview: match.overview,
    });
  } catch (error) {
    console.error("TMDB find error:", error);
    return NextResponse.json({ error: "Failed to find show" }, { status: 500 });
  }
}
