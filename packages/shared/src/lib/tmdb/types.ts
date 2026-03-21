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

export function extractTrailerUrl(videos?: {
  results: TMDBVideo[];
}): string | null {
  if (!videos?.results?.length) return null;
  const yt = videos.results.filter((v) => v.site === "YouTube");
  const trailer =
    yt.find((v) => v.type === "Trailer" && v.official) ??
    yt.find((v) => v.type === "Trailer") ??
    yt.find((v) => v.type === "Teaser");
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}
