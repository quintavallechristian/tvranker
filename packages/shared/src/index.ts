// Similarity & recommendations
export {
  computeListSimilarity,
  computeMovieListSimilarity,
  computeAnimeListSimilarity,
  computeGameListSimilarity,
  computeBoardgameListSimilarity,
  type ListEntry,
  type MovieListEntry,
  type AnimeListEntry,
  type GameListEntry,
  type BoardgameListEntry,
} from "./lib/similarity";
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

// IGDB types & utilities
export {
  getIGDBCoverUrl,
  type IGDBGame,
  type IGDBGameSearchResult,
  type IGDBCoverSize,
} from "./lib/igdb/types";

// BGG types
export type {
  BGGSearchResult,
  BGGThingItem,
  BGGCollectionItem,
} from "./lib/bgg/types";

// Supabase types
export type {
  Database,
  Json,
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
  Anime,
  AnimeList,
  AnimeListItem,
  Game,
  GameList,
  GameListItem,
  Boardgame,
  BoardgameList,
  BoardgameListItem,
} from "./lib/supabase/types";
