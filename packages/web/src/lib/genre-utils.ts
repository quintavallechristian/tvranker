/**
 * Shared genre utilities — non-server code, safe to import anywhere.
 */

export type GenreCount = { id: number; name: string; count: number };

/**
 * Aggregates genre counts from an array of genre arrays (one per item).
 * Returns genres sorted by count descending.
 */
export function computeGenreCounts(
  genresArrays: ({ id: number; name: string }[] | null)[],
): GenreCount[] {
  const map: Record<number, GenreCount> = {};
  for (const genres of genresArrays) {
    if (!genres) continue;
    for (const genre of genres) {
      map[genre.id] ??= { id: genre.id, name: genre.name, count: 0 };
      map[genre.id].count++;
    }
  }
  return Object.values(map).sort((a, b) => b.count - a.count);
}
