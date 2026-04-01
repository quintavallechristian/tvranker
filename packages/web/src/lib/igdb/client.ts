// Re-export types and utilities from shared
export type {
  IGDBGame,
  IGDBGameSearchResult,
  IGDBCoverSize,
} from "@tvranker/shared";

export { getIGDBCoverUrl } from "@tvranker/shared";

import type { IGDBGame, IGDBGameSearchResult } from "@tvranker/shared";

const IGDB_BASE_URL = "https://api.igdb.com/v4";
const TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token";

// In-memory token cache
let cachedToken: { accessToken: string; expiresAt: number } | null = null;

function getClientId(): string {
  const id = process.env.IGDB_CLIENT_ID;
  if (!id) throw new Error("IGDB_CLIENT_ID is not set");
  return id;
}

function getClientSecret(): string {
  const secret = process.env.IGDB_CLIENT_SECRET;
  if (!secret) throw new Error("IGDB_CLIENT_SECRET is not set");
  return secret;
}

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.accessToken;
  }

  const clientId = getClientId();
  const clientSecret = getClientSecret();

  const res = await fetch(
    `${TWITCH_TOKEN_URL}?client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&grant_type=client_credentials`,
    { method: "POST" },
  );

  if (!res.ok) {
    throw new Error(`Twitch OAuth error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return cachedToken.accessToken;
}

async function igdbFetch<T>(endpoint: string, body: string): Promise<T> {
  const clientId = getClientId();
  const accessToken = await getAccessToken();

  const res = await fetch(`${IGDB_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "text/plain",
    },
    body,
    next: { revalidate: 86400 }, // 24h cache like TMDB
  });

  if (res.status === 401) {
    // Token expired — clear cache and retry once
    cachedToken = null;
    const newToken = await getAccessToken();
    const retry = await fetch(`${IGDB_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${newToken}`,
        "Content-Type": "text/plain",
      },
      body,
      next: { revalidate: 86400 },
    });
    if (!retry.ok) {
      throw new Error(`IGDB API error: ${retry.status} ${retry.statusText}`);
    }
    return retry.json() as Promise<T>;
  }

  if (!res.ok) {
    throw new Error(`IGDB API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function searchGames(
  query: string,
): Promise<IGDBGameSearchResult[]> {
  // Escape double quotes in query to prevent injection in IGDB query language
  const sanitized = query.replace(/"/g, '\\"');
  const body = `search "${sanitized}"; fields name, cover.image_id, first_release_date, platforms.name, genres.name; limit 20;`;
  return igdbFetch<IGDBGameSearchResult[]>("games", body);
}

export async function getGameDetails(
  igdbId: number,
): Promise<IGDBGame | null> {
  const results = await igdbFetch<IGDBGame[]>(
    "games",
    `fields name, cover.image_id, first_release_date, summary, platforms.name, genres.name, url, total_rating; where id = ${Number(igdbId)}; limit 1;`,
  );
  return results[0] ?? null;
}
