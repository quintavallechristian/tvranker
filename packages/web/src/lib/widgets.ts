export const WIDGET_TYPES = [
  "show_podium",
  "movie_podium",
  "anime_podium",
  "game_podium",
  "show_count",
  "movie_count",
  "anime_count",
  "game_count",
  "last_show_added",
  "last_movie_added",
  "last_anime_added",
  "last_game_added",
  "notifications",
  "recent_follows",
  "show_suggestions",
  "movie_suggestions",
  "anime_suggestions",
  "game_suggestions",
] as const;

export type WidgetType = (typeof WIDGET_TYPES)[number];

export const WIDGET_CATEGORIES = [
  "podium",
  "count",
  "last_added",
  "suggestions",
  "notifications",
  "recent_follows",
] as const;

export type WidgetCategory = (typeof WIDGET_CATEGORIES)[number];

export const WIDGET_TOPICS = ["show", "movie", "anime", "game"] as const;

export type WidgetTopic = (typeof WIDGET_TOPICS)[number];

/** Whether a category requires topic selection */
export const CATEGORY_NEEDS_TOPIC: Record<WidgetCategory, boolean> = {
  podium: true,
  count: true,
  last_added: true,
  suggestions: true,
  notifications: false,
  recent_follows: false,
};

/** Maps category + topic → WidgetType */
export const CATEGORY_TOPIC_TO_TYPE: Record<
  WidgetCategory,
  Partial<Record<WidgetTopic, WidgetType>>
> = {
  podium: { show: "show_podium", movie: "movie_podium", anime: "anime_podium", game: "game_podium" },
  count: { show: "show_count", movie: "movie_count", anime: "anime_count", game: "game_count" },
  last_added: {
    show: "last_show_added",
    movie: "last_movie_added",
    anime: "last_anime_added",
    game: "last_game_added",
  },
  suggestions: {
    show: "show_suggestions",
    movie: "movie_suggestions",
    anime: "anime_suggestions",
    game: "game_suggestions",
  },
  notifications: {},
  recent_follows: {},
};

/** For categories that need no topic, the direct WidgetType */
export const CATEGORY_DIRECT_TYPE: Partial<Record<WidgetCategory, WidgetType>> =
  {
    notifications: "notifications",
    recent_follows: "recent_follows",
  };

export type WidgetConfig = {
  id: string;
  type: WidgetType;
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
};

/** Default column span for each widget type */
export const DEFAULT_COL_SPAN: Record<WidgetType, 1 | 2> = {
  show_podium: 2,
  movie_podium: 2,
  anime_podium: 2,
  game_podium: 2,
  show_count: 1,
  movie_count: 1,
  anime_count: 1,
  game_count: 1,
  last_show_added: 1,
  last_movie_added: 1,
  last_anime_added: 1,
  last_game_added: 1,
  notifications: 1,
  recent_follows: 1,
  show_suggestions: 2,
  movie_suggestions: 2,
  anime_suggestions: 2,
  game_suggestions: 2,
};

/** Default row span for each widget type */
export const DEFAULT_ROW_SPAN: Record<WidgetType, 1 | 2> = {
  show_podium: 1,
  movie_podium: 1,
  anime_podium: 1,
  game_podium: 1,
  show_count: 1,
  movie_count: 1,
  anime_count: 1,
  game_count: 1,
  last_show_added: 1,
  last_movie_added: 1,
  last_anime_added: 1,
  last_game_added: 1,
  notifications: 1,
  recent_follows: 1,
  show_suggestions: 1,
  movie_suggestions: 1,
  anime_suggestions: 1,
  game_suggestions: 1,
};

/** Default widgets for new users (no config saved yet) */
export const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: "default-1", type: "show_podium", colSpan: 2, rowSpan: 1 },
  { id: "default-2", type: "movie_podium", colSpan: 2, rowSpan: 1 },
  { id: "default-3", type: "show_count", colSpan: 1, rowSpan: 1 },
  { id: "default-4", type: "movie_count", colSpan: 1, rowSpan: 1 },
];
