// Re-export types and utilities from shared
export type {
  TMDBShow,
  TMDBSeason,
  TMDBEpisode,
  TMDBSeasonDetails,
  TMDBVideo,
  TMDBWatchProvider,
  TMDBWatchProviderRegion,
  TMDBShowExtended,
  TMDBMovie,
  TMDBMovieExtended,
  TMDBSearchResult,
  TMDBMovieSearchResult,
  TMDBFindResult,
} from "@tvranker/shared";

export { getPosterUrl, extractTrailerUrl } from "@tvranker/shared";

import type {
  TMDBSearchResult,
  TMDBMovieSearchResult,
  TMDBShowExtended,
  TMDBMovieExtended,
  TMDBFindResult,
  TMDBShow,
  TMDBMovie,
  TMDBSeasonDetails,
  TMDBVideo,
} from "@tvranker/shared";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function getApiKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (!key) throw new Error("TMDB_API_KEY is not set");
  return key;
}

async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const apiKey = getApiKey();

  // JWT tokens (v4 Read Access Token) start with "ey" — use Bearer auth.
  // Short v3 API keys use the legacy api_key query param.
  const headers: Record<string, string> = apiKey.startsWith("ey")
    ? { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }
    : {};

  if (!apiKey.startsWith("ey")) {
    url.searchParams.set("api_key", apiKey);
  }

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 86400 }, // Cache for 24h
  });

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function searchShows(
  query: string,
  page = 1,
): Promise<TMDBSearchResult> {
  return tmdbFetch<TMDBSearchResult>("/search/tv", {
    query,
    page: String(page),
    include_adult: "false",
  });
}

export async function searchMovies(
  query: string,
  page = 1,
): Promise<TMDBMovieSearchResult> {
  return tmdbFetch<TMDBMovieSearchResult>("/search/movie", {
    query,
    page: String(page),
    include_adult: "false",
  });
}

export async function getShowDetails(
  tmdbId: number,
): Promise<TMDBShowExtended> {
  return tmdbFetch<TMDBShowExtended>(`/tv/${tmdbId}`, {
    append_to_response: "videos,watch/providers",
  });
}

export async function getMovieDetails(
  tmdbId: number,
): Promise<TMDBMovieExtended> {
  return tmdbFetch<TMDBMovieExtended>(`/movie/${tmdbId}`, {
    append_to_response: "videos,watch/providers",
  });
}

/**
 * Normalizes a TMDBMovieExtended into the TMDBShowExtended shape so the rest
 * of the enrichment pipeline can handle both transparently.
 * Movies use `title` / `release_date` while shows use `name` / `first_air_date`.
 */
export function normalizeMovieAsShow(
  movie: TMDBMovieExtended,
): TMDBShowExtended {
  return {
    id: movie.id,
    name: movie.title,
    poster_path: movie.poster_path,
    first_air_date: movie.release_date,
    overview: movie.overview,
    vote_average: movie.vote_average,
    videos: movie.videos,
    "watch/providers": movie["watch/providers"],
    // No seasons for movies
    seasons: undefined,
  };
}

export async function getSeasonDetails(
  tmdbId: number,
  seasonNumber: number,
): Promise<TMDBSeasonDetails> {
  return tmdbFetch<TMDBSeasonDetails>(`/tv/${tmdbId}/season/${seasonNumber}`);
}

export async function findByImdbId(
  imdbId: string,
): Promise<{ show: TMDBShow | null; movie: TMDBMovie | null }> {
  const result = await tmdbFetch<TMDBFindResult>(`/find/${imdbId}`, {
    external_source: "imdb_id",
  });
  return {
    show: result.tv_results[0] ?? null,
    movie: result.movie_results[0] ?? null,
  };
}
