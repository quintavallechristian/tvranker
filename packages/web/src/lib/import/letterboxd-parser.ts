import type { ParseResult, ParsedShow } from "./trakt-parser";

export type LetterboxdParseResult = ParseResult & { showsSkipped: number };

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
 * Detect if a CSV text is a Letterboxd diary export.
 * Looks for the "Letterboxd URI" column in the header.
 */
export function isLetterboxdCsv(csvText: string): boolean {
  const firstLine = csvText.split("\n")[0] ?? "";
  return firstLine.includes("Letterboxd URI");
}

/**
 * Parse a Letterboxd diary CSV export.
 *
 * Columns: Date, Name, Year, Letterboxd URI, Rating, Rewatch, Tags, Watched Date
 *
 * - Rating: 0.5–5 scale → converted to 1–10 by multiplying by 2
 * - added_at: uses "Watched Date" if present, otherwise falls back to "Date"
 */
export function parseLetterboxdDiaryCsv(
  csvText: string,
): LetterboxdParseResult {
  const lines = csvText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) {
    throw new Error("CSV file is empty or has no data rows");
  }

  const header = parseCsvLine(lines[0]);
  const col = (name: string) => header.indexOf(name);

  const iDate = col("Date");
  const iName = col("Name");
  const iRating = col("Rating");
  const iWatchedDate = col("Watched Date");

  if (iDate === -1 || iName === -1) {
    throw new Error(
      "Missing required columns (Date, Name) — not a valid Letterboxd diary CSV",
    );
  }

  const shows: ParsedShow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);

    const title = fields[iName] ?? "";
    if (!title) continue;

    // Rating: Letterboxd uses 0.5–5 half-star scale → multiply by 2 for 1–10
    const rawRating =
      iRating !== -1 ? parseFloat(fields[iRating] ?? "") : NaN;
    const score =
      !isNaN(rawRating) && rawRating >= 0.5 && rawRating <= 5
        ? Math.round(rawRating * 2)
        : null;

    // added_at: prefer "Watched Date", fall back to "Date"
    const watchedDate =
      iWatchedDate !== -1 && fields[iWatchedDate]
        ? fields[iWatchedDate]
        : null;
    const logDate = iDate !== -1 && fields[iDate] ? fields[iDate] : null;
    const added_at = watchedDate ?? logDate;

    shows.push({
      title,
      imdb_id: null,
      score,
      added_at,
    });
  }

  return {
    name: "Letterboxd Import",
    description: "",
    is_public: false,
    shows,
    moviesSkipped: 0,
    seasonsSkipped: 0,
    showsSkipped: 0,
  };
}
