import { type ListEntry, computeListSimilarity } from "./similarity";

export type UserList = {
  userId: string;
  items: ListEntry[];
};

export type ScoredShow = {
  showId: string;
  score: number;
  /** How many similar users have this show */
  recommendedBy: number;
};

/**
 * Collaborative filtering: score candidate shows from similar users.
 *
 * For each show NOT in the viewer's list, compute:
 *   score = Σ (similarity_i / 100) × normalizedRating_i(show)
 *
 * normalizedRating = rating / 10 if rated, else (1 - position / listLength)
 * i.e. shows ranked higher in a user's list get a higher proxy score.
 *
 * @param viewerList  The current user's list entries
 * @param otherLists  All other users' public list entries
 * @param topK        Number of nearest neighbors to use (default 20)
 * @param limit       Max number of recommendations to return (default 10)
 */
export function scoreRecommendations(
  viewerList: ListEntry[],
  otherLists: UserList[],
  topK = 20,
  limit = 10,
): ScoredShow[] {
  if (viewerList.length === 0 || otherLists.length === 0) return [];

  // 1. Compute similarity with each user and take top K
  const similarities: { userId: string; similarity: number }[] = [];
  for (const other of otherLists) {
    if (other.items.length === 0) continue;
    const sim = computeListSimilarity(viewerList, other.items);
    if (sim > 0) similarities.push({ userId: other.userId, similarity: sim });
  }

  similarities.sort((a, b) => b.similarity - a.similarity);
  const neighbors = similarities.slice(0, topK);

  if (neighbors.length === 0) return [];

  // 2. Build a set of the viewer's shows for fast lookup
  const viewerShowIds = new Set(viewerList.map((e) => e.showId));

  // 3. Build a map: userId → items lookup
  const listMap = new Map<string, ListEntry[]>();
  for (const other of otherLists) {
    listMap.set(other.userId, other.items);
  }

  // 4. Score each candidate show
  const showScores = new Map<string, { score: number; count: number }>();

  for (const neighbor of neighbors) {
    const items = listMap.get(neighbor.userId);
    if (!items) continue;

    const weight = neighbor.similarity / 100;
    const listLen = items.length;

    for (const item of items) {
      if (viewerShowIds.has(item.showId)) continue;

      const normalizedRating =
        item.rating !== null
          ? item.rating / 10
          : 1 - item.position / Math.max(listLen, 1);

      const contribution = weight * normalizedRating;

      const existing = showScores.get(item.showId);
      if (existing) {
        existing.score += contribution;
        existing.count += 1;
      } else {
        showScores.set(item.showId, { score: contribution, count: 1 });
      }
    }
  }

  // 5. Sort by score descending, take top `limit`
  const results: ScoredShow[] = [];
  for (const [showId, { score, count }] of showScores) {
    // Normalize: average contribution × 100 → [0, 100]
    const normalizedScore = Math.round((score / count) * 100);
    results.push({ showId, score: normalizedScore, recommendedBy: count });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
