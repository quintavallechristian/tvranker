const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export type TMDBShow = {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date: string;
  overview: string;
  vote_average: number;
};

export type TMDBSeason = {
  season_number: number;
  name: string;
  episode_count: number;
  air_date: string | null;
  overview: string;
};

export type TMDBVideo = {
  key: string;
  site: string;
  type: string;
  official: boolean;
};

export type TMDBWatchProvider = {
  provider_id: number;
  provider_name: string;
  logo_path: string;
};

export type TMDBWatchProviderRegion = {
  flatrate?: TMDBWatchProvider[];
  buy?: TMDBWatchProvider[];
  rent?: TMDBWatchProvider[];
};

export type TMDBShowExtended = TMDBShow & {
  seasons?: TMDBSeason[];
  videos?: { results: TMDBVideo[] };
  "watch/providers"?: { results: Record<string, TMDBWatchProviderRegion> };
};

export type TMDBMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
};

export type TMDBMovieExtended = TMDBMovie & {
  videos?: { results: TMDBVideo[] };
  "watch/providers"?: { results: Record<string, TMDBWatchProviderRegion> };
};

export type TMDBSearchResult = {
  page: number;
  results: TMDBShow[];
  total_results: number;
  total_pages: number;
};

export type TMDBMovieSearchResult = {
  page: number;
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
};

export type TMDBFindResult = {
  tv_results: TMDBShow[];
  movie_results: TMDBMovie[];
};

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

export function extractTrailerUrl(videos?: {
  results: TMDBVideo[];
}): string | null {
  if (!videos?.results?.length) return null;
  // Prefer official YouTube trailers, then teasers
  const yt = videos.results.filter((v) => v.site === "YouTube");
  const trailer =
    yt.find((v) => v.type === "Trailer" && v.official) ??
    yt.find((v) => v.type === "Trailer") ??
    yt.find((v) => v.type === "Teaser");
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
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

export function getPosterUrl(
  posterPath: string | null,
  size:
    | "w92"
    | "w154"
    | "w185"
    | "w342"
    | "w500"
    | "w780"
    | "original" = "w342",
): string | null {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE}/${size}${posterPath}`;
}
