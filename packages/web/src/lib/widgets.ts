export const WIDGET_TYPES = [
  "show_podium",
  "movie_podium",
  "anime_podium",
  "show_count",
  "movie_count",
  "anime_count",
  "last_show_added",
  "last_movie_added",
  "last_anime_added",
  "notifications",
  "recent_follows",
  "show_suggestions",
  "movie_suggestions",
  "anime_suggestions",
] as const;

export type WidgetType = (typeof WIDGET_TYPES)[number];

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
  show_count: 1,
  movie_count: 1,
  anime_count: 1,
  last_show_added: 1,
  last_movie_added: 1,
  last_anime_added: 1,
  notifications: 1,
  recent_follows: 1,
  show_suggestions: 2,
  movie_suggestions: 2,
  anime_suggestions: 2,
};

/** Default row span for each widget type */
export const DEFAULT_ROW_SPAN: Record<WidgetType, 1 | 2> = {
  show_podium: 1,
  movie_podium: 1,
  anime_podium: 1,
  show_count: 1,
  movie_count: 1,
  anime_count: 1,
  last_show_added: 1,
  last_movie_added: 1,
  last_anime_added: 1,
  notifications: 1,
  recent_follows: 1,
  show_suggestions: 1,
  movie_suggestions: 1,
  anime_suggestions: 1,
};

/** Default widgets for new users (no config saved yet) */
export const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: "default-1", type: "show_podium", colSpan: 2, rowSpan: 1 },
  { id: "default-2", type: "movie_podium", colSpan: 2, rowSpan: 1 },
  { id: "default-3", type: "show_count", colSpan: 1, rowSpan: 1 },
  { id: "default-4", type: "movie_count", colSpan: 1, rowSpan: 1 },
];
