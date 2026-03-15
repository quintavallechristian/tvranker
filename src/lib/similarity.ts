export type ListEntry = {
  showId: string;
  rating: number | null;
  position: number;
};

/**
 * Compute similarity between two TV show lists (0–100).
 *
 * Formula: overlapRatio × agreementScore × 100
 *
 * - overlapRatio = |common shows| / min(|A|, |B|)
 *   → A perfect subset scores 1.0
 *
 * - agreementScore = 0.5 × ratingSimilarity + 0.5 × positionSimilarity
 *
 * - ratingSimilarity = average of (1 - |rA - rB| / 9) for shows rated in BOTH lists
 *   → Shows unrated in either list contribute to overlap but not to rating score
 *   → If no commonly-rated shows exist, defaults to 1.0 (no disagreement)
 *
 * - positionSimilarity = average of (1 - |normPosA - normPosB|) for all common shows
 *   → normPos = position / (listLength - 1), so first=0, last=1
 *   → Captures ranking agreement even when rating styles differ
 *   → Single-item lists: normPos = 0
 */
export function computeListSimilarity(
  listA: ListEntry[],
  listB: ListEntry[],
): number {
  if (listA.length === 0 || listB.length === 0) return 0;

  const mapA = new Map(
    listA.map((e) => [e.showId, { rating: e.rating, position: e.position }]),
  );
  const mapB = new Map(
    listB.map((e) => [e.showId, { rating: e.rating, position: e.position }]),
  );

  // Find common shows
  const commonShowIds: string[] = [];
  for (const showId of mapA.keys()) {
    if (mapB.has(showId)) commonShowIds.push(showId);
  }

  if (commonShowIds.length === 0) return 0;

  const overlapRatio =
    commonShowIds.length / Math.min(listA.length, listB.length);

  // Rating similarity: only for shows rated in BOTH lists
  let ratingSum = 0;
  let ratingCount = 0;

  // Position similarity: for ALL common shows
  let positionSum = 0;
  const maxPosA = Math.max(listA.length - 1, 1);
  const maxPosB = Math.max(listB.length - 1, 1);

  for (const showId of commonShowIds) {
    const a = mapA.get(showId)!;
    const b = mapB.get(showId)!;

    if (a.rating !== null && b.rating !== null) {
      ratingSum += 1 - Math.abs(a.rating - b.rating) / 9;
      ratingCount++;
    }

    const normPosA = a.position / maxPosA;
    const normPosB = b.position / maxPosB;
    positionSum += 1 - Math.abs(normPosA - normPosB);
  }

  const ratingSimilarity = ratingCount > 0 ? ratingSum / ratingCount : 1;
  const positionSimilarity = positionSum / commonShowIds.length;

  const agreementScore = 0.5 * ratingSimilarity + 0.5 * positionSimilarity;

  return Math.round(overlapRatio * agreementScore * 100);
}
