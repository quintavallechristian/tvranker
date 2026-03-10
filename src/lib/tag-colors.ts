export type TagColor =
  | "blue"
  | "green"
  | "pink"
  | "yellow"
  | "orange"
  | "purple"
  | "red"
  | "teal"
  | "indigo"
  | "slate";

export const TAG_COLORS: TagColor[] = [
  "blue",
  "green",
  "pink",
  "yellow",
  "orange",
  "purple",
  "red",
  "teal",
  "indigo",
  "slate",
];

/** Hex value of the "solid" color for swatches and dots */
export const TAG_COLOR_HEX: Record<TagColor, string> = {
  blue: "#3B82F6",
  green: "#22C55E",
  pink: "#EC4899",
  yellow: "#EAB308",
  orange: "#F97316",
  purple: "#A855F7",
  red: "#EF4444",
  teal: "#14B8A6",
  indigo: "#6366F1",
  slate: "#64748B",
};

/** Human-readable label for each color */
export const TAG_COLOR_LABEL: Record<TagColor, string> = {
  blue: "Blu",
  green: "Verde",
  pink: "Rosa",
  yellow: "Giallo",
  orange: "Arancione",
  purple: "Viola",
  red: "Rosso",
  teal: "Teal",
  indigo: "Indaco",
  slate: "Grigio",
};

/** Returns inline style props for a colored tag badge */
export function tagBadgeStyle(color: TagColor | string): React.CSSProperties {
  const hex = TAG_COLOR_HEX[color as TagColor] ?? TAG_COLOR_HEX.slate;
  return {
    backgroundColor: `${hex}18`,
    borderColor: `${hex}50`,
    color: hex,
  };
}

/** Returns the hex for a dot/swatch */
export function tagDotColor(color: TagColor | string): string {
  return TAG_COLOR_HEX[color as TagColor] ?? TAG_COLOR_HEX.slate;
}
