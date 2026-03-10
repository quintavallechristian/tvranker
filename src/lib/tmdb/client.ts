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

export type TMDBSearchResult = {
  page: number;
  results: TMDBShow[];
  total_results: number;
  total_pages: number;
};

export type TMDBFindResult = {
  tv_results: TMDBShow[];
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
  console.log(query);
  return tmdbFetch<TMDBSearchResult>("/search/tv", {
    query,
    page: String(page),
    include_adult: "false",
  });
}

export async function getShowDetails(tmdbId: number): Promise<TMDBShow> {
  return tmdbFetch<TMDBShow>(`/tv/${tmdbId}`);
}

export async function findByImdbId(imdbId: string): Promise<TMDBShow | null> {
  const result = await tmdbFetch<TMDBFindResult>(`/find/${imdbId}`, {
    external_source: "imdb_id",
  });
  return result.tv_results[0] || null;
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
