import type { ParseResult, ParsedShow } from "./trakt-parser";

export type ImdbParseResult = ParseResult;

/**
 * Parse a CSV string handling quoted fields that may contain commas.
 */
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

/**
 * Parse an IMDb CSV export file.
 *
 * - Imports only rows where Title Type is a TV type (TV Series, TV Mini Series)
 * - Skips Movie rows
 * - Extracts IMDb ID (Const), title, Your Rating (1-10), and Date Rated
 */
export function parseImdbCsv(csvText: string): ImdbParseResult {
  const lines = csvText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) {
    throw new Error("CSV file is empty or has no data rows");
  }

  const header = parseCsvLine(lines[0]);
  const col = (name: string) => header.indexOf(name);

  const iConst = col("Const");
  const iTitle = col("Title");
  const iTitleType = col("Title Type");
  const iYourRating = col("Your Rating");
  const iDateRated = col("Date Rated");

  if (iConst === -1 || iTitle === -1 || iTitleType === -1) {
    throw new Error("Missing required columns (Const, Title, Title Type)");
  }

  const shows: ParsedShow[] = [];
  let moviesSkipped = 0;

  const TV_TYPES = new Set(["TV Series", "TV Mini Series", "TV Mini-Series"]);

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);

    const titleType = fields[iTitleType] ?? "";
    const title = fields[iTitle] ?? "";
    const constId = fields[iConst] ?? "";

    if (!title || !constId) continue;

    // Skip non-TV types
    if (!TV_TYPES.has(titleType)) {
      if (
        titleType === "Movie" ||
        titleType === "Short" ||
        titleType === "Video"
      ) {
        moviesSkipped++;
      }
      continue;
    }

    const rawRating =
      iYourRating !== -1 ? parseInt(fields[iYourRating] ?? "", 10) : NaN;
    const rating = rawRating >= 1 && rawRating <= 10 ? rawRating : null;

    const dateRated =
      iDateRated !== -1 && fields[iDateRated] ? fields[iDateRated] : null;

    shows.push({
      title,
      imdb_id: constId.startsWith("tt") ? constId : null,
      score: rating,
      added_at: dateRated,
    });
  }

  return {
    name: "IMDb Import",
    description: "",
    is_public: false,
    shows,
    moviesSkipped,
    seasonsSkipped: 0,
  };
}

export function validateImdbCsv(csvText: string): {
  success: boolean;
  error?: string;
} {
  try {
    const lines = csvText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 2) {
      return { success: false, error: "CSV file is empty or has no data rows" };
    }

    const header = parseCsvLine(lines[0]);
    const hasConst = header.includes("Const");
    const hasTitle = header.includes("Title");
    const hasTitleType = header.includes("Title Type");

    if (!hasConst || !hasTitle || !hasTitleType) {
      return {
        success: false,
        error: "Missing required columns: Const, Title, Title Type",
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to parse CSV file" };
  }
}
