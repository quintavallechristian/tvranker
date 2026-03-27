// Similarity & recommendations
export { computeListSimilarity, type ListEntry } from "./lib/similarity";
export {
  scoreRecommendations,
  type UserList,
  type ScoredShow,
} from "./lib/recommendations";

// Rating labels
export { DEFAULT_RATING_LABELS, getRatingLabel } from "./lib/rating-labels";

// Tag colors
export {
  TAG_COLORS,
  TAG_COLOR_HEX,
  TAG_COLOR_LABEL,
  tagDotColor,
  type TagColor,
} from "./lib/tag-colors";

// TMDB types & utilities
export {
  getPosterUrl,
  extractTrailerUrl,
  type TMDBShow,
  type TMDBSeason,
  type TMDBEpisode,
  type TMDBSeasonDetails,
  type TMDBVideo,
  type TMDBWatchProvider,
  type TMDBWatchProviderRegion,
  type TMDBShowExtended,
  type TMDBMovie,
  type TMDBMovieExtended,
  type TMDBSearchResult,
  type TMDBMovieSearchResult,
  type TMDBFindResult,
} from "./lib/tmdb/types";

// Supabase types
export type {
  Database,
  Profile,
  List,
  Show,
  ListItem,
  Tag,
  ShowTag,
  Follow,
  Notification,
  ListWithItems,
  EpisodeInfo,
  SeasonInfo,
  WatchProvider,
  WatchProviderRegion,
  Movie,
  MovieList,
  MovieListItem,
} from "./lib/supabase/types";

// Import parsers
export {
  parseTraktJson,
  validateTraktJson,
  type TraktShow,
  type TraktList,
  type ParsedShow,
  type ParseResult,
} from "./lib/import/trakt-parser";
export {
  parseMalXml,
  extractBaseTitle,
  validateMalXml,
} from "./lib/import/mal-parser";
