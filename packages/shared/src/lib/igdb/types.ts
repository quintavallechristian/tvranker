const IGDB_IMAGE_BASE = "https://images.igdb.com/igdb/image/upload";

export type IGDBGame = {
  id: number;
  name: string;
  cover?: { id: number; image_id: string };
  first_release_date?: number; // Unix timestamp
  summary?: string;
  platforms?: { id: number; name: string }[];
  genres?: { id: number; name: string }[];
  url?: string;
  total_rating?: number;
};

export type IGDBGameSearchResult = {
  id: number;
  name: string;
  cover?: { id: number; image_id: string };
  first_release_date?: number;
  platforms?: { id: number; name: string }[];
  genres?: { id: number; name: string }[];
};

export type IGDBCoverSize =
  | "cover_small" // 90×128
  | "cover_big" // 264×374
  | "720p" // 1280×720
  | "1080p"; // 1920×1080

export function getIGDBCoverUrl(
  imageId: string | null | undefined,
  size: IGDBCoverSize = "cover_big",
): string | null {
  if (!imageId) return null;
  return `${IGDB_IMAGE_BASE}/t_${size}/${imageId}.jpg`;
}
