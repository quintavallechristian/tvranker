import { NextRequest, NextResponse } from "next/server";
import { findByImdbId } from "@/lib/tmdb/client";

export async function GET(request: NextRequest) {
  const imdbId = request.nextUrl.searchParams.get("id");

  if (!imdbId) {
    return NextResponse.json({ error: "Missing IMDB ID" }, { status: 400 });
  }

  try {
    const show = await findByImdbId(imdbId);
    if (!show) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    return NextResponse.json({
      tmdb_id: show.id,
      title: show.name,
      poster_path: show.poster_path,
      first_air_date: show.first_air_date,
      overview: show.overview,
    });
  } catch (error) {
    console.error("TMDB find error:", error);
    return NextResponse.json({ error: "Failed to find show" }, { status: 500 });
  }
}
