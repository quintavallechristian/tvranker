export type ListEntry = {
  showId: string;
  rating: number | null;
};

/**
 * Compute similarity between two TV show lists (0–100).
 *
 * Formula: overlapRatio × ratingSimilarity × 100
 *
 * - overlapRatio = |common shows| / min(|A|, |B|)
 *   → A perfect subset scores 1.0
 * - ratingSimilarity = average of (1 - |rA - rB| / 9) for shows rated in BOTH lists
 *   → Shows unrated in either list contribute to overlap but not to rating score
 *   → If no commonly-rated shows exist, defaults to 1.0 (no disagreement)
 */
export function computeListSimilarity(
  listA: ListEntry[],
  listB: ListEntry[],
): number {
  if (listA.length === 0 || listB.length === 0) return 0;

  const mapA = new Map(listA.map((e) => [e.showId, e.rating]));
  const mapB = new Map(listB.map((e) => [e.showId, e.rating]));

  // Find common shows
  const commonShowIds: string[] = [];
  for (const showId of mapA.keys()) {
    if (mapB.has(showId)) commonShowIds.push(showId);
  }

  if (commonShowIds.length === 0) return 0;

  const overlapRatio =
    commonShowIds.length / Math.min(listA.length, listB.length);

  // Compute rating similarity only for shows rated in BOTH lists
  let ratingSum = 0;
  let ratingCount = 0;

  for (const showId of commonShowIds) {
    const rA = mapA.get(showId)!;
    const rB = mapB.get(showId)!;
    if (rA !== null && rB !== null) {
      ratingSum += 1 - Math.abs(rA - rB) / 9;
      ratingCount++;
    }
  }

  const ratingSimilarity = ratingCount > 0 ? ratingSum / ratingCount : 1;

  return Math.round(overlapRatio * ratingSimilarity * 100);
}
