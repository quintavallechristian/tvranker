import { describe, it, expect } from "vitest";

/**
 * Rating validation utility tests.
 * The actual validation is done via CHECK constraint in Supabase (rating >= 1 AND rating <= 10)
 * and via the updateShowRating server action. These tests validate the logic.
 */

function isValidRating(rating: number): boolean {
  return Number.isInteger(rating) && rating >= 1 && rating <= 10;
}

function clampRating(value: number): number {
  return Math.min(10, Math.max(1, Math.round(value)));
}

describe("Rating validation", () => {
  it("accepts valid ratings 1-10", () => {
    for (let i = 1; i <= 10; i++) {
      expect(isValidRating(i)).toBe(true);
    }
  });

  it("rejects 0", () => {
    expect(isValidRating(0)).toBe(false);
  });

  it("rejects negative numbers", () => {
    expect(isValidRating(-1)).toBe(false);
    expect(isValidRating(-5)).toBe(false);
  });

  it("rejects numbers above 10", () => {
    expect(isValidRating(11)).toBe(false);
    expect(isValidRating(100)).toBe(false);
  });

  it("rejects non-integers", () => {
    expect(isValidRating(5.5)).toBe(false);
    expect(isValidRating(1.1)).toBe(false);
    expect(isValidRating(9.9)).toBe(false);
  });
});

describe("Rating clamping", () => {
  it("rounds and clamps to valid range", () => {
    expect(clampRating(0)).toBe(1);
    expect(clampRating(-5)).toBe(1);
    expect(clampRating(15)).toBe(10);
    expect(clampRating(5.4)).toBe(5);
    expect(clampRating(5.6)).toBe(6);
    expect(clampRating(0.4)).toBe(1);
    expect(clampRating(10.9)).toBe(10);
  });

  it("keeps valid integers unchanged", () => {
    for (let i = 1; i <= 10; i++) {
      expect(clampRating(i)).toBe(i);
    }
  });
});
