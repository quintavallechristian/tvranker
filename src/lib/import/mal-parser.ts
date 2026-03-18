import type { ParseResult, ParsedShow } from "./trakt-parser";

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

  animeNodes.forEach((node) => {
    const status =
      node.querySelector("my_status")?.textContent?.trim() ?? "";
    // Only import completed and currently watching anime
    if (status !== "Completed" && status !== "Watching") return;

    const title =
      node.querySelector("series_title")?.textContent?.trim() ?? "";
    if (!title) return;

    // Deduplicate by title (MAL lists can have seasons as separate entries)
    if (seen.has(title.toLowerCase())) return;
    seen.add(title.toLowerCase());

    const rawScore = parseInt(
      node.querySelector("my_score")?.textContent?.trim() ?? "0",
      10,
    );

    shows.push({
      title,
      imdb_id: null,
      score: rawScore >= 1 && rawScore <= 10 ? rawScore : null,
    });
  });

  return {
    name: "MyAnimeList Import",
    description: "",
    is_public: false,
    shows,
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
