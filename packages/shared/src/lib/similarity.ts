export type MovieListEntry = {
  movieId: string;
  rating: number | null;
  position: number;
};

/**
 * Sorts a list by display order (rating DESC NULLS LAST, position ASC)
 * and returns items with position replaced by their 0-based display rank.
 * This ensures positionSimilarity reflects the user's actual ranking, not
 * insertion order.
 */
function toDisplayRanked<T extends { rating: number | null; position: number }>(
  list: T[],
): T[] {
  return [...list]
    .sort((a, b) => {
      if (a.rating !== null && b.rating !== null) {
        if (b.rating !== a.rating) return b.rating - a.rating;
      } else if (a.rating !== null) {
        return -1;
      } else if (b.rating !== null) {
        return 1;
      }
      return a.position - b.position;
    })
    .map((item, idx) => ({ ...item, position: idx }));
}

/**
 * Compute similarity between two movie lists (0–100).
 * Same formula as computeListSimilarity but keyed by movieId.
 */
export function computeMovieListSimilarity(
  listA: MovieListEntry[],
  listB: MovieListEntry[],
): number {
  if (listA.length === 0 || listB.length === 0) return 0;

  const rankedA = toDisplayRanked(listA);
  const rankedB = toDisplayRanked(listB);

  const mapA = new Map(
    rankedA.map((e) => [e.movieId, { rating: e.rating, position: e.position }]),
  );
  const mapB = new Map(
    rankedB.map((e) => [e.movieId, { rating: e.rating, position: e.position }]),
  );

  const commonIds: string[] = [];
  for (const movieId of mapA.keys()) {
    if (mapB.has(movieId)) commonIds.push(movieId);
  }

  if (commonIds.length === 0) return 0;

  const overlapRatio = commonIds.length / Math.min(listA.length, listB.length);

  let ratingSum = 0;
  let ratingCount = 0;
  let positionSum = 0;
  const maxPosA = Math.max(listA.length - 1, 1);
  const maxPosB = Math.max(listB.length - 1, 1);

  for (const movieId of commonIds) {
    const a = mapA.get(movieId)!;
    const b = mapB.get(movieId)!;

    if (a.rating !== null && b.rating !== null) {
      ratingSum += 1 - Math.abs(a.rating - b.rating) / 9;
      ratingCount++;
    }

    const normPosA = a.position / maxPosA;
    const normPosB = b.position / maxPosB;
    positionSum += 1 - Math.abs(normPosA - normPosB);
  }

  const ratingSimilarity = ratingCount > 0 ? ratingSum / ratingCount : 1;
  const positionSimilarity = positionSum / commonIds.length;
  const agreementScore = 0.5 * ratingSimilarity + 0.5 * positionSimilarity;
  return Math.round(overlapRatio * agreementScore * 100);
}

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
 * - agreementScore = 0.5 × ratingSimilarity + 0.5 × positionSimilarity
 * - ratingSimilarity = average of (1 - |rA - rB| / 9) for shows rated in BOTH lists
 * - positionSimilarity = average of (1 - |normPosA - normPosB|) for all common shows
 */
export type AnimeListEntry = {
  animeId: string;
  rating: number | null;
  position: number;
};

/**
 * Compute similarity between two anime lists (0–100).
 * Same formula as computeListSimilarity but keyed by animeId.
 */
export function computeAnimeListSimilarity(
  listA: AnimeListEntry[],
  listB: AnimeListEntry[],
): number {
  if (listA.length === 0 || listB.length === 0) return 0;

  const rankedA = toDisplayRanked(listA);
  const rankedB = toDisplayRanked(listB);

  const mapA = new Map(
    rankedA.map((e) => [e.animeId, { rating: e.rating, position: e.position }]),
  );
  const mapB = new Map(
    rankedB.map((e) => [e.animeId, { rating: e.rating, position: e.position }]),
  );

  const commonIds: string[] = [];
  for (const animeId of mapA.keys()) {
    if (mapB.has(animeId)) commonIds.push(animeId);
  }

  if (commonIds.length === 0) return 0;

  const overlapRatio = commonIds.length / Math.min(listA.length, listB.length);

  let ratingSum = 0;
  let ratingCount = 0;
  let positionSum = 0;
  const maxPosA = Math.max(listA.length - 1, 1);
  const maxPosB = Math.max(listB.length - 1, 1);

  for (const animeId of commonIds) {
    const a = mapA.get(animeId)!;
    const b = mapB.get(animeId)!;

    if (a.rating !== null && b.rating !== null) {
      ratingSum += 1 - Math.abs(a.rating - b.rating) / 9;
      ratingCount++;
    }

    const normPosA = a.position / maxPosA;
    const normPosB = b.position / maxPosB;
    positionSum += 1 - Math.abs(normPosA - normPosB);
  }

  const ratingSimilarity = ratingCount > 0 ? ratingSum / ratingCount : 1;
  const positionSimilarity = positionSum / commonIds.length;
  const agreementScore = 0.5 * ratingSimilarity + 0.5 * positionSimilarity;

  return Math.round(overlapRatio * agreementScore * 100);
}

export type GameListEntry = {
  gameId: string;
  rating: number | null;
  position: number;
};

/**
 * Compute similarity between two game lists (0–100).
 * Same formula as computeListSimilarity but keyed by gameId.
 */
export function computeGameListSimilarity(
  listA: GameListEntry[],
  listB: GameListEntry[],
): number {
  if (listA.length === 0 || listB.length === 0) return 0;

  const rankedA = toDisplayRanked(listA);
  const rankedB = toDisplayRanked(listB);

  const mapA = new Map(
    rankedA.map((e) => [e.gameId, { rating: e.rating, position: e.position }]),
  );
  const mapB = new Map(
    rankedB.map((e) => [e.gameId, { rating: e.rating, position: e.position }]),
  );

  const commonIds: string[] = [];
  for (const gameId of mapA.keys()) {
    if (mapB.has(gameId)) commonIds.push(gameId);
  }

  if (commonIds.length === 0) return 0;

  const overlapRatio = commonIds.length / Math.min(listA.length, listB.length);

  let ratingSum = 0;
  let ratingCount = 0;
  let positionSum = 0;
  const maxPosA = Math.max(listA.length - 1, 1);
  const maxPosB = Math.max(listB.length - 1, 1);

  for (const gameId of commonIds) {
    const a = mapA.get(gameId)!;
    const b = mapB.get(gameId)!;

    if (a.rating !== null && b.rating !== null) {
      ratingSum += 1 - Math.abs(a.rating - b.rating) / 9;
      ratingCount++;
    }

    const normPosA = a.position / maxPosA;
    const normPosB = b.position / maxPosB;
    positionSum += 1 - Math.abs(normPosA - normPosB);
  }

  const ratingSimilarity = ratingCount > 0 ? ratingSum / ratingCount : 1;
  const positionSimilarity = positionSum / commonIds.length;
  const agreementScore = 0.5 * ratingSimilarity + 0.5 * positionSimilarity;

  return Math.round(overlapRatio * agreementScore * 100);
}

export type BoardgameListEntry = {
  boardgameId: string;
  rating: number | null;
  position: number;
};

/**
 * Compute similarity between two board game lists (0–100).
 * Same formula as computeListSimilarity but keyed by boardgameId.
 */
export function computeBoardgameListSimilarity(
  listA: BoardgameListEntry[],
  listB: BoardgameListEntry[],
): number {
  if (listA.length === 0 || listB.length === 0) return 0;

  const rankedA = toDisplayRanked(listA);
  const rankedB = toDisplayRanked(listB);

  const mapA = new Map(
    rankedA.map((e) => [
      e.boardgameId,
      { rating: e.rating, position: e.position },
    ]),
  );
  const mapB = new Map(
    rankedB.map((e) => [
      e.boardgameId,
      { rating: e.rating, position: e.position },
    ]),
  );

  const commonIds: string[] = [];
  for (const boardgameId of mapA.keys()) {
    if (mapB.has(boardgameId)) commonIds.push(boardgameId);
  }

  if (commonIds.length === 0) return 0;

  const overlapRatio = commonIds.length / Math.min(listA.length, listB.length);

  let ratingSum = 0;
  let ratingCount = 0;
  let positionSum = 0;
  const maxPosA = Math.max(listA.length - 1, 1);
  const maxPosB = Math.max(listB.length - 1, 1);

  for (const boardgameId of commonIds) {
    const a = mapA.get(boardgameId)!;
    const b = mapB.get(boardgameId)!;

    if (a.rating !== null && b.rating !== null) {
      ratingSum += 1 - Math.abs(a.rating - b.rating) / 9;
      ratingCount++;
    }

    const normPosA = a.position / maxPosA;
    const normPosB = b.position / maxPosB;
    positionSum += 1 - Math.abs(normPosA - normPosB);
  }

  const ratingSimilarity = ratingCount > 0 ? ratingSum / ratingCount : 1;
  const positionSimilarity = positionSum / commonIds.length;
  const agreementScore = 0.5 * ratingSimilarity + 0.5 * positionSimilarity;

  return Math.round(overlapRatio * agreementScore * 100);
}

export function computeListSimilarity(
  listA: ListEntry[],
  listB: ListEntry[],
): number {
  if (listA.length === 0 || listB.length === 0) return 0;

  const rankedA = toDisplayRanked(listA);
  const rankedB = toDisplayRanked(listB);

  const mapA = new Map(
    rankedA.map((e) => [e.showId, { rating: e.rating, position: e.position }]),
  );
  const mapB = new Map(
    rankedB.map((e) => [e.showId, { rating: e.rating, position: e.position }]),
  );

  const commonShowIds: string[] = [];
  for (const showId of mapA.keys()) {
    if (mapB.has(showId)) commonShowIds.push(showId);
  }

  if (commonShowIds.length === 0) return 0;

  const overlapRatio =
    commonShowIds.length / Math.min(listA.length, listB.length);

  let ratingSum = 0;
  let ratingCount = 0;
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
