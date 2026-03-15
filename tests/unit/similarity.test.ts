import { describe, it, expect } from "vitest";
import { computeListSimilarity, type ListEntry } from "@/lib/similarity";

describe("computeListSimilarity", () => {
  it("returns 0 when either list is empty", () => {
    const a: ListEntry[] = [{ showId: "s1", rating: 10 }];
    expect(computeListSimilarity(a, [])).toBe(0);
    expect(computeListSimilarity([], a)).toBe(0);
    expect(computeListSimilarity([], [])).toBe(0);
  });

  it("returns 0 when no shows in common", () => {
    const a: ListEntry[] = [{ showId: "s1", rating: 10 }];
    const b: ListEntry[] = [{ showId: "s2", rating: 10 }];
    expect(computeListSimilarity(a, b)).toBe(0);
  });

  it("returns 100 for identical lists", () => {
    const list: ListEntry[] = [
      { showId: "s1", rating: 10 },
      { showId: "s2", rating: 8 },
      { showId: "s3", rating: 6 },
    ];
    expect(computeListSimilarity(list, list)).toBe(100);
  });

  it("returns 100 for a perfect subset with same ratings", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: 10 },
      { showId: "s2", rating: 8 },
      { showId: "s3", rating: 6 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: 10 },
      { showId: "s2", rating: 8 },
    ];
    // overlap = 2/min(3,2) = 2/2 = 1.0, ratings identical → 100
    expect(computeListSimilarity(a, b)).toBe(100);
  });

  it("penalizes rating differences correctly", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: 10 },
      { showId: "s2", rating: 8 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: 6 },
      { showId: "s2", rating: 2 },
    ];
    // overlap = 2/2 = 1.0
    // s1: 1 - |10-6|/9 = 1 - 4/9 ≈ 0.5556
    // s2: 1 - |8-2|/9 = 1 - 6/9 ≈ 0.3333
    // avg = (0.5556 + 0.3333) / 2 ≈ 0.4444
    // score = round(1.0 * 0.4444 * 100) = 44
    expect(computeListSimilarity(a, b)).toBe(44);
  });

  it("handles unrated shows: count as overlap, not as rating", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: null },
      { showId: "s2", rating: 8 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: null },
      { showId: "s2", rating: 10 },
    ];
    // overlap = 2/2 = 1.0
    // s1: both null → skip rating
    // s2: 1 - |8-10|/9 = 1 - 2/9 ≈ 0.7778
    // avg rating = 0.7778
    // score = round(1.0 * 0.7778 * 100) = 78
    expect(computeListSimilarity(a, b)).toBe(78);
  });

  it("defaults ratingSimilarity to 1.0 when no commonly-rated shows", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: null },
      { showId: "s2", rating: null },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: null },
      { showId: "s2", rating: 8 },
    ];
    // overlap = 2/2 = 1.0
    // s1: both null → skip
    // s2: one null → skip
    // no commonly-rated → ratingSimilarity = 1.0
    // score = round(1.0 * 1.0 * 100) = 100
    expect(computeListSimilarity(a, b)).toBe(100);
  });

  it("handles partial overlap correctly", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: 10 },
      { showId: "s2", rating: 8 },
      { showId: "s3", rating: 6 },
      { showId: "s4", rating: 4 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: 10 },
      { showId: "s5", rating: 9 },
    ];
    // overlap = 1/min(4,2) = 1/2 = 0.5
    // s1: 1 - |10-10|/9 = 1.0
    // ratingSimilarity = 1.0
    // score = round(0.5 * 1.0 * 100) = 50
    expect(computeListSimilarity(a, b)).toBe(50);
  });

  it("handles single item lists", () => {
    const a: ListEntry[] = [{ showId: "s1", rating: 10 }];
    const b: ListEntry[] = [{ showId: "s1", rating: 1 }];
    // overlap = 1/1 = 1.0
    // rating = 1 - 9/9 = 0
    // score = 0
    expect(computeListSimilarity(a, b)).toBe(0);
  });

  it("is symmetric", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: 10 },
      { showId: "s2", rating: 5 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: 7 },
      { showId: "s3", rating: 3 },
    ];
    expect(computeListSimilarity(a, b)).toBe(computeListSimilarity(b, a));
  });

  it("large lists with partial overlap", () => {
    const a: ListEntry[] = Array.from({ length: 100 }, (_, i) => ({
      showId: `s${i}`,
      rating: ((i % 10) + 1) as number,
    }));
    const b: ListEntry[] = Array.from({ length: 50 }, (_, i) => ({
      showId: `s${i * 2}`,
      rating: ((i % 10) + 1) as number,
    }));
    // 50 common shows / min(100,50) = 50/50 = 1.0
    // Ratings: some match, some differ, non-trivial
    const score = computeListSimilarity(a, b);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});
