import { describe, it, expect } from "vitest";
import {
  scoreRecommendations,
  type UserList,
  type ScoredShow,
} from "@/lib/recommendations";
import type { ListEntry } from "@/lib/similarity";

describe("scoreRecommendations", () => {
  const viewer: ListEntry[] = [
    { showId: "s1", rating: 10, position: 0 },
    { showId: "s2", rating: 8, position: 1 },
    { showId: "s3", rating: 6, position: 2 },
  ];

  it("returns empty array when viewer list is empty", () => {
    const others: UserList[] = [
      {
        userId: "u1",
        items: [{ showId: "s4", rating: 9, position: 0 }],
      },
    ];
    expect(scoreRecommendations([], others)).toEqual([]);
  });

  it("returns empty array when no other lists", () => {
    expect(scoreRecommendations(viewer, [])).toEqual([]);
  });

  it("returns empty array when no similar users (no overlap)", () => {
    const others: UserList[] = [
      {
        userId: "u1",
        items: [{ showId: "s4", rating: 9, position: 0 }],
      },
    ];
    expect(scoreRecommendations(viewer, others)).toEqual([]);
  });

  it("recommends shows from similar users that viewer doesn't have", () => {
    const others: UserList[] = [
      {
        userId: "u1",
        items: [
          // shares s1, s2 with viewer -> similarity > 0
          { showId: "s1", rating: 10, position: 0 },
          { showId: "s2", rating: 8, position: 1 },
          // new show to recommend
          { showId: "s4", rating: 9, position: 2 },
        ],
      },
    ];

    const result = scoreRecommendations(viewer, others);
    expect(result.length).toBe(1);
    expect(result[0].showId).toBe("s4");
    expect(result[0].score).toBeGreaterThan(0);
    expect(result[0].recommendedBy).toBe(1);
  });

  it("does NOT recommend shows the viewer already has", () => {
    const others: UserList[] = [
      {
        userId: "u1",
        items: [
          { showId: "s1", rating: 10, position: 0 },
          { showId: "s2", rating: 8, position: 1 },
          { showId: "s3", rating: 6, position: 2 }, // viewer already has this
        ],
      },
    ];

    const result = scoreRecommendations(viewer, others);
    expect(result.length).toBe(0);
  });

  it("aggregates scores from multiple similar users", () => {
    const others: UserList[] = [
      {
        userId: "u1",
        items: [
          { showId: "s1", rating: 10, position: 0 },
          { showId: "s2", rating: 8, position: 1 },
          { showId: "s4", rating: 9, position: 2 },
        ],
      },
      {
        userId: "u2",
        items: [
          { showId: "s1", rating: 10, position: 0 },
          { showId: "s3", rating: 6, position: 1 },
          { showId: "s4", rating: 10, position: 2 },
        ],
      },
    ];

    const result = scoreRecommendations(viewer, others);
    const s4 = result.find((r) => r.showId === "s4");
    expect(s4).toBeDefined();
    expect(s4!.recommendedBy).toBe(2); // recommended by both users
  });

  it("ranks higher-rated shows above lower-rated ones", () => {
    const others: UserList[] = [
      {
        userId: "u1",
        items: [
          { showId: "s1", rating: 10, position: 0 },
          { showId: "s2", rating: 8, position: 1 },
          { showId: "s4", rating: 10, position: 2 }, // high rating
          { showId: "s5", rating: 2, position: 3 }, // low rating
        ],
      },
    ];

    const result = scoreRecommendations(viewer, others);
    expect(result.length).toBe(2);
    expect(result[0].showId).toBe("s4"); // higher rated → higher score
    expect(result[1].showId).toBe("s5");
    expect(result[0].score).toBeGreaterThan(result[1].score);
  });

  it("uses position as proxy when rating is null", () => {
    const others: UserList[] = [
      {
        userId: "u1",
        items: [
          { showId: "s1", rating: 10, position: 0 },
          { showId: "s2", rating: 8, position: 1 },
          { showId: "s4", rating: null, position: 0 }, // top position, no rating
          { showId: "s5", rating: null, position: 3 }, // low position, no rating
        ],
      },
    ];

    const result = scoreRecommendations(viewer, others);
    const s4 = result.find((r) => r.showId === "s4");
    const s5 = result.find((r) => r.showId === "s5");
    expect(s4).toBeDefined();
    expect(s5).toBeDefined();
    // s4 at position 0 should score higher than s5 at position 3
    expect(s4!.score).toBeGreaterThan(s5!.score);
  });

  it("respects the limit parameter", () => {
    const others: UserList[] = [
      {
        userId: "u1",
        items: [
          { showId: "s1", rating: 10, position: 0 },
          { showId: "s2", rating: 8, position: 1 },
          { showId: "s4", rating: 9, position: 2 },
          { showId: "s5", rating: 8, position: 3 },
          { showId: "s6", rating: 7, position: 4 },
        ],
      },
    ];

    const result = scoreRecommendations(viewer, others, 20, 2);
    expect(result.length).toBe(2);
  });

  it("respects the topK parameter for neighbor selection", () => {
    // Create many users with slight overlap, only top K should contribute
    const others: UserList[] = Array.from({ length: 30 }, (_, i) => ({
      userId: `u${i}`,
      items: [
        { showId: "s1", rating: 10, position: 0 },
        { showId: `new-${i}`, rating: 9, position: 1 },
      ],
    }));

    const resultK5 = scoreRecommendations(viewer, others, 5, 100);
    const resultK30 = scoreRecommendations(viewer, others, 30, 100);

    // With topK=5, only 5 neighbors contribute shows
    // With topK=30, all 30 contribute
    expect(resultK5.length).toBeLessThanOrEqual(5);
    expect(resultK30.length).toBe(30);
  });
});
