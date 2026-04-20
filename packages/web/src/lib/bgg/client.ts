import { XMLParser } from "fast-xml-parser";
import type {
  BGGSearchResult,
  BGGThingItem,
  BGGCollectionItem,
} from "@tvranker/shared";

const BGG_BASE_URL = "https://boardgamegeek.com/xmlapi2";

function bggHeaders(): HeadersInit {
  const token = process.env.BGG_API_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  isArray: (name) => {
    // These elements can appear multiple times
    return ["item", "link", "name"].includes(name);
  },
});

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#10;/g, "\n")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&ldquo;/g, "\u201C");
}

// Simple delay between requests to respect BGG rate limits
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --------------- Search ---------------

export async function searchBoardgames(
  query: string,
): Promise<BGGSearchResult[]> {
  const url = `${BGG_BASE_URL}/search?query=${encodeURIComponent(query)}&type=boardgame`;
  const res = await fetch(url, { next: { revalidate: 3600 }, headers: bggHeaders() });
  if (!res.ok) throw new Error(`BGG search error: ${res.status}`);

  const xml = await res.text();
  const parsed = parser.parse(xml);

  const items = parsed?.items?.item;
  if (!items || !Array.isArray(items)) return [];

  return items.slice(0, 30).map((item: Record<string, unknown>) => {
    const names = item.name as Record<string, unknown>[];
    const primaryName =
      names?.find((n: Record<string, unknown>) => n["@_type"] === "primary") ??
      names?.[0];

    return {
      id: Number(item["@_id"]),
      name: String(primaryName?.["@_value"] ?? ""),
      yearPublished:
        (item.yearpublished as Record<string, unknown>)?.["@_value"] != null
          ? Number((item.yearpublished as Record<string, unknown>)["@_value"])
          : undefined,
      type: String(item["@_type"] ?? "boardgame"),
    };
  });
}

// --------------- Thing (details) ---------------

export async function getBoardgameDetails(
  bggId: number,
): Promise<BGGThingItem | null> {
  const results = await getBoardgameDetailsMulti([bggId]);
  return results[0] ?? null;
}

export async function getBoardgameDetailsMulti(
  bggIds: number[],
): Promise<BGGThingItem[]> {
  if (bggIds.length === 0) return [];

  // BGG supports comma-separated IDs, but limit batch size
  const BATCH_SIZE = 20;
  const allResults: BGGThingItem[] = [];

  for (let i = 0; i < bggIds.length; i += BATCH_SIZE) {
    if (i > 0) await delay(200);
    const batch = bggIds.slice(i, i + BATCH_SIZE);
    const ids = batch.join(",");
    const url = `${BGG_BASE_URL}/thing?id=${ids}&stats=1`;
    const res = await fetch(url, { next: { revalidate: 86400 }, headers: bggHeaders() });
    if (!res.ok) throw new Error(`BGG thing error: ${res.status}`);

    const xml = await res.text();
    const parsed = parser.parse(xml);

    const items = parsed?.items?.item;
    if (!items) continue;

    const itemArray = Array.isArray(items) ? items : [items];

    for (const item of itemArray) {
      allResults.push(parseThingItem(item));
    }
  }

  return allResults;
}

function parseThingItem(item: Record<string, unknown>): BGGThingItem {
  const names = item.name as Record<string, unknown>[];
  const primaryName =
    names?.find((n: Record<string, unknown>) => n["@_type"] === "primary") ??
    names?.[0];

  const links = (item.link as Record<string, unknown>[]) ?? [];

  const categories = links
    .filter((l) => l["@_type"] === "boardgamecategory")
    .map((l) => ({ id: Number(l["@_id"]), name: String(l["@_value"]) }));

  const mechanics = links
    .filter((l) => l["@_type"] === "boardgamemechanic")
    .map((l) => ({ id: Number(l["@_id"]), name: String(l["@_value"]) }));

  const designers = links
    .filter((l) => l["@_type"] === "boardgamedesigner")
    .map((l) => ({ id: Number(l["@_id"]), name: String(l["@_value"]) }));

  const stats = item.statistics as Record<string, unknown> | undefined;
  const ratings = stats?.ratings as Record<string, unknown> | undefined;
  const avgRating = (ratings?.average as Record<string, unknown>)?.["@_value"];
  const avgWeight = (ratings?.averageweight as Record<string, unknown>)?.[
    "@_value"
  ];

  const rawDescription = item.description
    ? String(item.description)
    : undefined;

  return {
    id: Number(item["@_id"]),
    name: String(primaryName?.["@_value"] ?? ""),
    description: rawDescription
      ? decodeHtmlEntities(rawDescription)
      : undefined,
    thumbnail: item.thumbnail ? String(item.thumbnail) : undefined,
    image: item.image ? String(item.image) : undefined,
    yearPublished:
      (item.yearpublished as Record<string, unknown>)?.["@_value"] != null
        ? Number((item.yearpublished as Record<string, unknown>)["@_value"])
        : undefined,
    minPlayers:
      (item.minplayers as Record<string, unknown>)?.["@_value"] != null
        ? Number((item.minplayers as Record<string, unknown>)["@_value"])
        : undefined,
    maxPlayers:
      (item.maxplayers as Record<string, unknown>)?.["@_value"] != null
        ? Number((item.maxplayers as Record<string, unknown>)["@_value"])
        : undefined,
    playingTime:
      (item.playingtime as Record<string, unknown>)?.["@_value"] != null
        ? Number((item.playingtime as Record<string, unknown>)["@_value"])
        : undefined,
    minPlaytime:
      (item.minplaytime as Record<string, unknown>)?.["@_value"] != null
        ? Number((item.minplaytime as Record<string, unknown>)["@_value"])
        : undefined,
    maxPlaytime:
      (item.maxplaytime as Record<string, unknown>)?.["@_value"] != null
        ? Number((item.maxplaytime as Record<string, unknown>)["@_value"])
        : undefined,
    minAge:
      (item.minage as Record<string, unknown>)?.["@_value"] != null
        ? Number((item.minage as Record<string, unknown>)["@_value"])
        : undefined,
    categories: categories.length > 0 ? categories : undefined,
    mechanics: mechanics.length > 0 ? mechanics : undefined,
    designers: designers.length > 0 ? designers : undefined,
    averageRating: avgRating != null ? Number(avgRating) : undefined,
    averageWeight: avgWeight != null ? Number(avgWeight) : undefined,
  };
}

// --------------- Collection ---------------

export async function getUserCollection(
  username: string,
): Promise<BGGCollectionItem[]> {
  // Sanitize username to prevent injection
  const sanitizedUsername = username.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!sanitizedUsername) throw new Error("Invalid BGG username");

  const url = `${BGG_BASE_URL}/collection?username=${encodeURIComponent(sanitizedUsername)}&subtype=boardgame&stats=1&own=1`;

  // BGG may return 202 (queued) — retry with delay
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 3000;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const res = await fetch(url, { cache: "no-store", headers: bggHeaders() });

    if (res.status === 202) {
      // Collection is being prepared, wait and retry
      if (attempt < MAX_RETRIES - 1) {
        await delay(RETRY_DELAY);
        continue;
      }
      throw new Error("BGG collection still processing after retries");
    }

    if (!res.ok) {
      throw new Error(`BGG collection error: ${res.status}`);
    }

    const xml = await res.text();
    const parsed = parser.parse(xml);

    const items = parsed?.items?.item;
    if (!items) return [];

    const itemArray = Array.isArray(items) ? items : [items];

    return itemArray.map((item: Record<string, unknown>) => {
      const statsObj = item.stats as Record<string, unknown> | undefined;
      const rating = statsObj?.rating as Record<string, unknown> | undefined;
      const userRatingVal = rating?.["@_value"];
      const bggRatingObj = rating?.average as
        | Record<string, unknown>
        | undefined;

      const status = item.status as Record<string, unknown> | undefined;

      // name is always parsed as an array due to XMLParser isArray config
      const nameItem = Array.isArray(item.name)
        ? (item.name[0] as Record<string, unknown>)
        : (item.name as Record<string, unknown>);

      return {
        bggId: Number(item["@_objectid"]),
        name: String(nameItem?.["#text"] ?? nameItem?.["@_value"] ?? ""),
        yearPublished:
          item.yearpublished != null ? Number(item.yearpublished) : undefined,
        thumbnail: item.thumbnail ? String(item.thumbnail) : undefined,
        image: item.image ? String(item.image) : undefined,
        userRating:
          userRatingVal != null && userRatingVal !== "N/A"
            ? Number(userRatingVal)
            : undefined,
        bggRating:
          bggRatingObj?.["@_value"] != null
            ? Number(bggRatingObj["@_value"])
            : undefined,
        numPlays: item.numplays != null ? Number(item.numplays) : undefined,
        owned: status?.["@_own"] === "1",
      } satisfies BGGCollectionItem;
    });
  }

  throw new Error("BGG collection request failed");
}

// --------------- Hot Items ---------------

export async function getHotBoardgames(): Promise<BGGSearchResult[]> {
  const url = `${BGG_BASE_URL}/hot?type=boardgame`;
  const res = await fetch(url, { next: { revalidate: 3600 }, headers: bggHeaders() });
  if (!res.ok) throw new Error(`BGG hot error: ${res.status}`);

  const xml = await res.text();
  const parsed = parser.parse(xml);

  const items = parsed?.items?.item;
  if (!items || !Array.isArray(items)) return [];

  return items.map((item: Record<string, unknown>) => ({
    id: Number(item["@_id"]),
    name: String((item.name as Record<string, unknown>)?.["@_value"] ?? ""),
    yearPublished:
      (item.yearpublished as Record<string, unknown>)?.["@_value"] != null
        ? Number((item.yearpublished as Record<string, unknown>)["@_value"])
        : undefined,
    type: "boardgame",
  }));
}
