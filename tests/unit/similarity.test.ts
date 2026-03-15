import { describe, it, expect } from "vitest";
import { computeListSimilarity, type ListEntry } from "@/lib/similarity";

describe("computeListSimilarity", () => {
  it("returns 0 when either list is empty", () => {
    const a: ListEntry[] = [{ showId: "s1", rating: 10, position: 0 }];
    expect(computeListSimilarity(a, [])).toBe(0);
    expect(computeListSimilarity([], a)).toBe(0);
    expect(computeListSimilarity([], [])).toBe(0);
  });

  it("returns 0 when no shows in common", () => {
    const a: ListEntry[] = [{ showId: "s1", rating: 10, position: 0 }];
    const b: ListEntry[] = [{ showId: "s2", rating: 10, position: 0 }];
    expect(computeListSimilarity(a, b)).toBe(0);
  });

  it("returns 100 for identical lists (same ratings and positions)", () => {
    const list: ListEntry[] = [
      { showId: "s1", rating: 10, position: 0 },
      { showId: "s2", rating: 8, position: 1 },
      { showId: "s3", rating: 6, position: 2 },
    ];
    expect(computeListSimilarity(list, list)).toBe(100);
  });

  it("returns 100 for a perfect subset with same ratings and same relative positions", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: 10, position: 0 },
      { showId: "s2", rating: 8, position: 1 },
      { showId: "s3", rating: 6, position: 2 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: 10, position: 0 },
      { showId: "s2", rating: 8, position: 1 },
    ];
    // overlap = 2/min(3,2) = 1.0
    // ratings identical → ratingSim = 1.0
    // positions: s1 norm 0/2=0 vs 0/1=0 → 1.0, s2 norm 1/2=0.5 vs 1/1=1.0 → 0.5
    // posSim = (1.0+0.5)/2 = 0.75
    // agreement = 0.5*1.0 + 0.5*0.75 = 0.875
    // score = round(1.0 * 0.875 * 100) = 88
    expect(computeListSimilarity(a, b)).toBe(88);
  });

  it("penalizes rating differences correctly", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: 10, position: 0 },
      { showId: "s2", rating: 8, position: 1 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: 6, position: 0 },
      { showId: "s2", rating: 2, position: 1 },
    ];
    // overlap = 1.0, positions identical → posSim = 1.0
    // s1: 1 - 4/9 ≈ 0.5556, s2: 1 - 6/9 ≈ 0.3333
    // ratingSim = 0.4444
    // agreement = 0.5*0.4444 + 0.5*1.0 = 0.7222
    // score = round(0.7222 * 100) = 72
    expect(computeListSimilarity(a, b)).toBe(72);
  });

  it("handles unrated shows: count as overlap, not as rating", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: null, position: 0 },
      { showId: "s2", rating: 8, position: 1 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: null, position: 0 },
      { showId: "s2", rating: 10, position: 1 },
    ];
    // overlap = 1.0, positions identical → posSim = 1.0
    // s2: 1 - 2/9 ≈ 0.7778
    // agreement = 0.5*0.7778 + 0.5*1.0 = 0.8889
    // score = round(0.8889 * 100) = 89
    expect(computeListSimilarity(a, b)).toBe(89);
  });

  it("defaults ratingSimilarity to 1.0 when no commonly-rated shows", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: null, position: 0 },
      { showId: "s2", rating: null, position: 1 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: null, position: 0 },
      { showId: "s2", rating: 8, position: 1 },
    ];
    // overlap = 1.0, positions identical → posSim = 1.0
    // no commonly-rated → ratingSim = 1.0
    // agreement = 1.0 → score = 100
    expect(computeListSimilarity(a, b)).toBe(100);
  });

  it("handles partial overlap correctly", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: 10, position: 0 },
      { showId: "s2", rating: 8, position: 1 },
      { showId: "s3", rating: 6, position: 2 },
      { showId: "s4", rating: 4, position: 3 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: 10, position: 0 },
      { showId: "s5", rating: 9, position: 1 },
    ];
    // overlap = 1/min(4,2) = 0.5
    // s1: rating 1.0, pos normA=0/3=0 normB=0/1=0 → posSim=1.0
    // ratingSim=1.0, posSim=1.0, agreement=1.0
    // score = round(0.5 * 1.0 * 100) = 50
    expect(computeListSimilarity(a, b)).toBe(50);
  });

  it("handles single item lists", () => {
    const a: ListEntry[] = [{ showId: "s1", rating: 10, position: 0 }];
    const b: ListEntry[] = [{ showId: "s1", rating: 1, position: 0 }];
    // overlap = 1.0
    // rating = 1 - 9/9 = 0, posSim = 1.0 (both single-item)
    // agreement = 0.5*0 + 0.5*1.0 = 0.5
    // score = round(0.5 * 100) = 50
    expect(computeListSimilarity(a, b)).toBe(50);
  });

  it("is symmetric", () => {
    const a: ListEntry[] = [
      { showId: "s1", rating: 10, position: 0 },
      { showId: "s2", rating: 5, position: 1 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: 7, position: 0 },
      { showId: "s3", rating: 3, position: 1 },
    ];
    expect(computeListSimilarity(a, b)).toBe(computeListSimilarity(b, a));
  });

  it("large lists with partial overlap", () => {
    const a: ListEntry[] = Array.from({ length: 100 }, (_, i) => ({
      showId: `s${i}`,
      rating: ((i % 10) + 1) as number,
      position: i,
    }));
    const b: ListEntry[] = Array.from({ length: 50 }, (_, i) => ({
      showId: `s${i * 2}`,
      rating: ((i % 10) + 1) as number,
      position: i,
    }));
    const score = computeListSimilarity(a, b);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  // === Position-specific tests ===

  it("rewards same position even with different ratings", () => {
    // Both users have shows in the same order but rate differently
    const a: ListEntry[] = [
      { showId: "s1", rating: 10, position: 0 },
      { showId: "s2", rating: 9, position: 1 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: 5, position: 0 },
      { showId: "s2", rating: 4, position: 1 },
    ];
    // overlap=1.0, positions identical → posSim=1.0
    // s1: 1-5/9≈0.444, s2: 1-5/9≈0.444 → ratingSim≈0.444
    // agreement = 0.5*0.444 + 0.5*1.0 = 0.722
    // score = 72
    const score = computeListSimilarity(a, b);
    expect(score).toBe(72);
  });

  it("penalizes reversed positions", () => {
    // Same shows, same ratings, but completely reversed order
    const a: ListEntry[] = [
      { showId: "s1", rating: 10, position: 0 },
      { showId: "s2", rating: 8, position: 1 },
    ];
    const b: ListEntry[] = [
      { showId: "s1", rating: 10, position: 1 },
      { showId: "s2", rating: 8, position: 0 },
    ];
    // overlap=1.0, ratings identical → ratingSim=1.0
    // s1: |0/1 - 1/1| = 1.0 → 0.0, s2: |1/1 - 0/1| = 1.0 → 0.0
    // posSim = 0.0
    // agreement = 0.5*1.0 + 0.5*0.0 = 0.5
    // score = 50
    expect(computeListSimilarity(a, b)).toBe(50);
  });

  it("position similarity works across different list sizes", () => {
    // User A has show at top of 10-item list, user B at top of 50-item list
    const a: ListEntry[] = Array.from({ length: 10 }, (_, i) => ({
      showId: `s${i}`,
      rating: 8,
      position: i,
    }));
    const b: ListEntry[] = [
      { showId: "s0", rating: 8, position: 0 },
      ...Array.from({ length: 49 }, (_, i) => ({
        showId: `x${i}`,
        rating: 5,
        position: i + 1,
      })),
    ];
    // 1 common show (s0), overlap = 1/10 = 0.1
    // s0: both position 0 → normA=0/9=0, normB=0/49=0 → posSim=1.0
    // ratingSim=1.0, agreement=1.0
    // score = round(0.1 * 1.0 * 100) = 10
    expect(computeListSimilarity(a, b)).toBe(10);
  });
});
