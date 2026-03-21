// Re-export from shared package
export {
  TAG_COLORS,
  TAG_COLOR_HEX,
  TAG_COLOR_LABEL,
  tagDotColor,
  type TagColor,
} from "@tvranker/shared";

import { TAG_COLOR_HEX as hexMap, type TagColor as TC } from "@tvranker/shared";

/** Returns inline style props for a colored tag badge (web-only) */
export function tagBadgeStyle(color: TC | string): React.CSSProperties {
  const hex = hexMap[color as TC] ?? hexMap.slate;
  return {
    backgroundColor: `${hex}18`,
    borderColor: `${hex}50`,
    color: hex,
  };
}
