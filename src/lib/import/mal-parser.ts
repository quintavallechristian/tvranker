import type { ParseResult, ParsedShow } from "./trakt-parser";

/**
 * Strips common MAL season/part suffixes to get the canonical series base title.
 * Enables deduplication across entries like:
 *   "3-gatsu no Lion" + "3-gatsu no Lion 2nd Season"  → keep only the first
 *   "Fruits Basket 1st Season" + "Fruits Basket 2nd Season" → keep base "Fruits Basket"
 */
export function extractBaseTitle(title: string): string {
  return (
    title
      // FIRST: ": [The] [Nth|Final] Season [...]" — e.g. ": The Final Season - Kanketsu-hen"
      // Must run before the standalone pattern to avoid leaving ": The" as a suffix.
      .replace(
        /:\s+(?:The\s+)?(?:\d+(?:st|nd|rd|th)|Final|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth)\s+Season\b.*/i,
        "",
      )
      // "Nth Season [...]" — e.g. "2nd Season", "Final Season", "Second Season"
      .replace(
        /\s+(?:\d+(?:st|nd|rd|th)|Final|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth)\s+Season\b.*/i,
        "",
      )
      // "Season N [...]" — e.g. "Season 2", "Season 2: Subtitle"
      .replace(/\s+Season\s+\d+\b.*/i, "")
      // "Part N" at the end — e.g. "Part 2"
      .replace(/\s+Part\s+\d+\b.*/i, "")
      .trim()
  );
}

/**
 * Parse a MyAnimeList XML export file.
 * Extracts anime entries with status "Completed" or "Watching" and maps
 * the MAL title to a ParsedShow (no IMDB id available from MAL exports).
 */
export function parseMalXml(xmlText: string): ParseResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    throw new Error("Invalid XML file");
  }

  const animeNodes = doc.querySelectorAll("anime");
  const shows: ParsedShow[] = [];
  const seen = new Set<string>();

  let moviesSkipped = 0;
  let seasonsSkipped = 0;

  animeNodes.forEach((node) => {
    const status = node.querySelector("my_status")?.textContent?.trim() ?? "";
    // Only import completed and currently watching anime
    if (status !== "Completed" && status !== "Watching") return;

    const title = node.querySelector("series_title")?.textContent?.trim() ?? "";
    if (!title) return;

    // Skip movies — this is a TV series ranker
    const seriesType =
      node.querySelector("series_type")?.textContent?.trim() ?? "";
    if (seriesType === "Movie") {
      moviesSkipped++;
      return;
    }

    // Deduplicate by base title: skip later seasons when the base series is already seen
    const baseTitle = extractBaseTitle(title);
    if (seen.has(baseTitle.toLowerCase())) {
      seasonsSkipped++;
      return;
    }
    seen.add(baseTitle.toLowerCase());

    const rawScore = parseInt(
      node.querySelector("my_score")?.textContent?.trim() ?? "0",
      10,
    );

    shows.push({
      // Use the base title so TMDB lookup finds the canonical series name
      title: baseTitle,
      imdb_id: null,
      score: rawScore >= 1 && rawScore <= 10 ? rawScore : null,
    });
  });

  return {
    name: "MyAnimeList Import",
    description: "",
    is_public: false,
    shows,
    moviesSkipped,
    seasonsSkipped,
  };
}

export function validateMalXml(xmlText: string): {
  success: boolean;
  error?: string;
} {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "text/xml");

    const parseError = doc.querySelector("parsererror");
    if (parseError) {
      return { success: false, error: "Invalid XML file" };
    }

    const animeNodes = doc.querySelectorAll("anime");
    if (animeNodes.length === 0) {
      return {
        success: false,
        error: "No anime entries found in the XML file",
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to parse XML file" };
  }
}
