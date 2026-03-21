import { describe, it, expect } from "vitest";
import { parseTraktJson, validateTraktJson } from "@/lib/import/trakt-parser";

const validJson = {
  name: "Favorites",
  description: "Your favorite movies and shows.",
  is_public: true,
  movies: [],
  shows: [
    {
      id: {
        imdb: "tt15677150",
        tvdb: 411364,
      },
      title: "Shrinking",
      uuid: "5fd7786d-45f4-4e53-b67f-97f55602f91a",
      added_at: "2024-03-28T22:59:26Z",
    },
    {
      id: {
        imdb: "tt0944947",
      },
      title: "Game of Thrones",
      uuid: "abc123",
      added_at: "2024-01-01T00:00:00Z",
    },
  ],
};

describe("parseTraktJson", () => {
  it("parses a valid Trakt.tv JSON export", () => {
    const result = parseTraktJson(validJson);

    expect(result.name).toBe("Favorites");
    expect(result.description).toBe("Your favorite movies and shows.");
    expect(result.is_public).toBe(true);
    expect(result.shows).toHaveLength(2);
    expect(result.shows[0]).toEqual({
      title: "Shrinking",
      imdb_id: "tt15677150",
      score: null,
    });
    expect(result.shows[1]).toEqual({
      title: "Game of Thrones",
      imdb_id: "tt0944947",
      score: null,
    });
  });

  it("handles shows without IMDB IDs", () => {
    const json = {
      name: "Test",
      shows: [{ title: "Unknown Show" }],
    };

    const result = parseTraktJson(json);
    expect(result.shows).toHaveLength(1);
    expect(result.shows[0].imdb_id).toBeNull();
  });

  it("defaults is_public to false when not specified", () => {
    const json = {
      name: "Private List",
      shows: [{ title: "Show A" }],
    };

    const result = parseTraktJson(json);
    expect(result.is_public).toBe(false);
  });

  it("defaults description to empty string when not specified", () => {
    const json = {
      name: "No Desc",
      shows: [{ title: "Show A" }],
    };

    const result = parseTraktJson(json);
    expect(result.description).toBe("");
  });

  it("handles empty shows array", () => {
    const json = {
      name: "Empty List",
      shows: [],
    };

    const result = parseTraktJson(json);
    expect(result.shows).toHaveLength(0);
  });

  it("throws on missing name field", () => {
    const json = {
      shows: [{ title: "Show A" }],
    };

    expect(() => parseTraktJson(json)).toThrow();
  });

  it("throws on missing shows array", () => {
    const json = {
      name: "No Shows",
    };

    expect(() => parseTraktJson(json)).toThrow();
  });

  it("throws on non-object input", () => {
    expect(() => parseTraktJson("not an object")).toThrow();
    expect(() => parseTraktJson(null)).toThrow();
    expect(() => parseTraktJson(42)).toThrow();
  });

  it("throws when a show is missing title", () => {
    const json = {
      name: "Bad Show",
      shows: [{ id: { imdb: "tt123" } }],
    };

    expect(() => parseTraktJson(json)).toThrow();
  });
});

describe("validateTraktJson", () => {
  it("returns success for valid JSON", () => {
    const result = validateTraktJson(validJson);
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("returns error for invalid JSON", () => {
    const result = validateTraktJson({ shows: "not an array" });
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("returns error for completely wrong input", () => {
    const result = validateTraktJson("hello");
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
