import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  searchShows,
  getShowDetails,
  findByImdbId,
  getPosterUrl,
} from "@/lib/tmdb/client";

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Mock env variable
vi.stubEnv("TMDB_API_KEY", "test-api-key");

beforeEach(() => {
  mockFetch.mockReset();
});

describe("searchShows", () => {
  it("searches for TV shows by query", async () => {
    const mockResponse = {
      page: 1,
      results: [
        {
          id: 136315,
          name: "Shrinking",
          poster_path: "/poster.jpg",
          first_air_date: "2023-01-27",
          overview: "A comedy about...",
          vote_average: 8.1,
        },
      ],
      total_results: 1,
      total_pages: 1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await searchShows("Shrinking");

    expect(result.results).toHaveLength(1);
    expect(result.results[0].name).toBe("Shrinking");
    expect(result.results[0].id).toBe(136315);

    // Verify the URL was called correctly
    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain("/search/tv");
    expect(calledUrl).toContain("query=Shrinking");
    expect(calledUrl).toContain("api_key=test-api-key");
  });

  it("passes page parameter", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        page: 2,
        results: [],
        total_results: 0,
        total_pages: 0,
      }),
    });

    await searchShows("test", 2);

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain("page=2");
  });

  it("throws on API error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    });

    await expect(searchShows("test")).rejects.toThrow("TMDB API error: 401");
  });
});

describe("getShowDetails", () => {
  it("fetches show details by TMDB ID", async () => {
    const mockShow = {
      id: 136315,
      name: "Shrinking",
      poster_path: "/poster.jpg",
      first_air_date: "2023-01-27",
      overview: "A comedy about a therapist...",
      vote_average: 8.1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockShow,
    });

    const result = await getShowDetails(136315);

    expect(result.name).toBe("Shrinking");
    expect(result.id).toBe(136315);

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain("/tv/136315");
  });
});

describe("findByImdbId", () => {
  it("finds a show by IMDB ID", async () => {
    const mockResult = {
      tv_results: [
        {
          id: 136315,
          name: "Shrinking",
          poster_path: "/poster.jpg",
          first_air_date: "2023-01-27",
          overview: "A comedy...",
          vote_average: 8.1,
        },
      ],
      movie_results: [],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResult,
    });

    const result = await findByImdbId("tt15677150");

    expect(result.show).not.toBeNull();
    expect(result.show!.name).toBe("Shrinking");

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain("/find/tt15677150");
    expect(calledUrl).toContain("external_source=imdb_id");
  });

  it("returns null when no show found", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ tv_results: [], movie_results: [] }),
    });

    const result = await findByImdbId("tt0000000");
    expect(result.show).toBeNull();
    expect(result.movie).toBeNull();
  });
});

describe("getPosterUrl", () => {
  it("returns a full poster URL with default size", () => {
    const url = getPosterUrl("/poster.jpg");
    expect(url).toBe("https://image.tmdb.org/t/p/w342/poster.jpg");
  });

  it("returns a poster URL with custom size", () => {
    const url = getPosterUrl("/poster.jpg", "w500");
    expect(url).toBe("https://image.tmdb.org/t/p/w500/poster.jpg");
  });

  it("returns null for null poster path", () => {
    const url = getPosterUrl(null);
    expect(url).toBeNull();
  });

  it("returns original size URL", () => {
    const url = getPosterUrl("/poster.jpg", "original");
    expect(url).toBe("https://image.tmdb.org/t/p/original/poster.jpg");
  });
});
