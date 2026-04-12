/**
 * enrich-shows.ts
 *
 * Per ogni show in database con tmdb_fetched = false, fetcha i dati da TMDB
 * e aggiorna il record con titolo, poster, stagioni, trailer e watch providers.
 *
 * Uso:
 *   npx tsx --env-file .env.local scripts/enrich-shows.ts
 *
 * Variabili d'ambiente richieste:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (bypassa RLS — NON usare l'anon key)
 *   TMDB_API_KEY
 *
 * Opzioni:
 *   --all       Arricchisce tutti i record, anche quelli già fetched
 *   --dry-run   Stampa cosa farebbe senza scrivere nulla
 *   --batch N   Numero di show per batch (default: 20)
 *   --delay N   Millisecondi tra le richieste TMDB (default: 250)
 */

import { createClient } from "@supabase/supabase-js";

// ─── Config ────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const args = process.argv.slice(2);
const ALL_SHOWS = args.includes("--all");
const DRY_RUN = args.includes("--dry-run");
const BATCH_SIZE = Number(args[args.indexOf("--batch") + 1] ?? 20);
const DELAY_MS = Number(args[args.indexOf("--delay") + 1] ?? 250);

// ─── Validation ─────────────────────────────────────────────────────────────

if (!SUPABASE_URL) throw new Error("NEXT_PUBLIC_SUPABASE_URL non impostato");
if (!SUPABASE_SERVICE_ROLE_KEY)
  throw new Error("SUPABASE_SERVICE_ROLE_KEY non impostato");
if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY non impostato");

// ─── Types ───────────────────────────────────────────────────────────────────

type Show = {
  id: string;
  tmdb_id: number | null;
  imdb_id: string | null;
  title: string;
  poster_path: string | null;
  overview: string | null;
  tmdb_fetched: boolean;
};

type TMDBSeason = {
  season_number: number;
  name: string;
  episode_count: number;
  air_date: string | null;
  overview: string;
};

type TMDBEpisode = {
  episode_number: number;
  name: string;
  runtime: number | null;
};

type TMDBSeasonDetails = {
  season_number: number;
  name: string;
  episodes: TMDBEpisode[];
};

type TMDBVideo = {
  key: string;
  site: string;
  type: string;
  official: boolean;
};

type TMDBWatchProvider = {
  provider_id: number;
  provider_name: string;
  logo_path: string;
};

type TMDBWatchProviderRegion = {
  flatrate?: TMDBWatchProvider[];
  buy?: TMDBWatchProvider[];
  rent?: TMDBWatchProvider[];
};

type TMDBGenre = { id: number; name: string };

type TMDBShowExtended = {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date: string;
  overview: string;
  vote_average: number;
  genres?: TMDBGenre[];
  seasons?: TMDBSeason[];
  videos?: { results: TMDBVideo[] };
  "watch/providers"?: { results: Record<string, TMDBWatchProviderRegion> };
};

type TMDBMovieExtended = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  videos?: { results: TMDBVideo[] };
  "watch/providers"?: { results: Record<string, TMDBWatchProviderRegion> };
};

type TMDBFindResult = {
  tv_results: { id: number; name: string }[];
  movie_results: { id: number; title: string }[];
};

type TMDBSearchResult = {
  results: { id: number }[];
};

// ─── TMDB client ─────────────────────────────────────────────────────────────

function buildHeaders(): Record<string, string> {
  if (TMDB_API_KEY!.startsWith("ey")) {
    return {
      Authorization: `Bearer ${TMDB_API_KEY}`,
      "Content-Type": "application/json",
    };
  }
  return {};
}

async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  if (!TMDB_API_KEY!.startsWith("ey")) {
    url.searchParams.set("api_key", TMDB_API_KEY!);
  }
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), { headers: buildHeaders() });
  if (!res.ok) {
    throw new Error(`TMDB ${res.status}: ${endpoint}`);
  }
  return res.json() as Promise<T>;
}

async function getShowDetails(tmdbId: number): Promise<TMDBShowExtended> {
  return tmdbFetch<TMDBShowExtended>(`/tv/${tmdbId}`, {
    append_to_response: "videos,watch/providers",
  });
}

async function getSeasonDetails(
  tmdbId: number,
  seasonNumber: number,
): Promise<TMDBSeasonDetails> {
  return tmdbFetch<TMDBSeasonDetails>(`/tv/${tmdbId}/season/${seasonNumber}`);
}

async function getMovieDetails(tmdbId: number): Promise<TMDBMovieExtended> {
  return tmdbFetch<TMDBMovieExtended>(`/movie/${tmdbId}`, {
    append_to_response: "videos,watch/providers",
  });
}

function normalizeMovieAsShow(movie: TMDBMovieExtended): TMDBShowExtended {
  return {
    id: movie.id,
    name: movie.title,
    poster_path: movie.poster_path,
    first_air_date: movie.release_date,
    overview: movie.overview,
    vote_average: movie.vote_average,
    videos: movie.videos,
    "watch/providers": movie["watch/providers"],
  };
}

async function findByImdbId(
  imdbId: string,
): Promise<{ tvId: number | null; movieId: number | null }> {
  const result = await tmdbFetch<TMDBFindResult>(`/find/${imdbId}`, {
    external_source: "imdb_id",
  });
  return {
    tvId: result.tv_results[0]?.id ?? null,
    movieId: result.movie_results[0]?.id ?? null,
  };
}

async function searchTV(title: string): Promise<number | null> {
  const result = await tmdbFetch<TMDBSearchResult>("/search/tv", {
    query: title,
    include_adult: "false",
  });
  return result.results[0]?.id ?? null;
}

async function searchMovie(title: string): Promise<number | null> {
  const result = await tmdbFetch<TMDBSearchResult>("/search/movie", {
    query: title,
    include_adult: "false",
  });
  return result.results[0]?.id ?? null;
}

function extractTrailerUrl(videos?: { results: TMDBVideo[] }): string | null {
  if (!videos?.results?.length) return null;
  const yt = videos.results.filter((v) => v.site === "YouTube");
  const trailer =
    yt.find((v) => v.type === "Trailer" && v.official) ??
    yt.find((v) => v.type === "Trailer") ??
    yt.find((v) => v.type === "Teaser");
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}

// ─── Enrichment logic ─────────────────────────────────────────────────────────

type EnrichResult =
  | { action: "updated"; data: Record<string, unknown> }
  | { action: "movie_deleted" }
  | { action: "merged_into"; targetId: string }
  | { action: "not_found" }
  | { action: "error"; error: string };

async function resolveShow(
  show: Show,
): Promise<{ found: TMDBShowExtended | null; isMovie: boolean }> {
  let found: TMDBShowExtended | null = null;
  let isMovie = false;

  // Strategy 1: lookup by existing positive tmdb_id
  if (show.tmdb_id !== null && show.tmdb_id > 0) {
    try {
      found = await getShowDetails(show.tmdb_id);
    } catch {
      try {
        found = normalizeMovieAsShow(await getMovieDetails(show.tmdb_id));
        isMovie = true;
      } catch {
        /* fall through */
      }
    }
  }

  // Strategy 2: lookup by IMDb ID
  if (!found && show.imdb_id) {
    try {
      const { tvId, movieId } = await findByImdbId(show.imdb_id);
      if (tvId) {
        found = await getShowDetails(tvId);
      } else if (movieId) {
        found = normalizeMovieAsShow(await getMovieDetails(movieId));
        isMovie = true;
      }
    } catch {
      /* fall through */
    }
  }

  // Strategy 3: text search as TV show
  if (!found) {
    try {
      const id = await searchTV(show.title);
      if (id) found = await getShowDetails(id);
    } catch {
      /* fall through */
    }
  }

  // Strategy 4: text search as movie (TV ranker — flag for removal)
  if (!found) {
    try {
      const id = await searchMovie(show.title);
      if (id) {
        found = normalizeMovieAsShow(await getMovieDetails(id));
        isMovie = true;
      }
    } catch {
      /* fall through */
    }
  }

  return { found, isMovie };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function enrichShow(supabase: any, show: Show): Promise<EnrichResult> {
  const { found, isMovie } = await resolveShow(show);

  if (!found) {
    if (!DRY_RUN) {
      await supabase
        .from("shows")
        .update({ tmdb_fetched: true } as never)
        .eq("id", show.id);
    }
    return { action: "not_found" };
  }

  // This is a TV ranker — delete movies
  if (isMovie) {
    if (!DRY_RUN) {
      await supabase.from("shows").delete().eq("id", show.id);
    }
    return { action: "movie_deleted" };
  }

  // Check for duplicates: another row already holds this tmdb_id
  const { data: conflict } = await supabase
    .from("shows")
    .select("id")
    .eq("tmdb_id", found.id)
    .neq("id", show.id)
    .limit(1)
    .maybeSingle();

  if (conflict) {
    if (!DRY_RUN) {
      await supabase
        .from("list_items")
        .update({ show_id: (conflict as { id: string }).id } as never)
        .eq("show_id", show.id);
      await supabase.from("shows").delete().eq("id", show.id);
    }
    return { action: "merged_into", targetId: (conflict as { id: string }).id };
  }

  // Build update payload
  const seasonsData = found.seasons
    ? await Promise.all(
        found.seasons
          .filter((s) => s.season_number > 0)
          .map(async (s) => {
            let episodes: TMDBEpisode[] = [];
            try {
              const details = await getSeasonDetails(found!.id, s.season_number);
              episodes = details.episodes.map((e) => ({
                episode_number: e.episode_number,
                name: e.name,
                runtime: e.runtime ?? null,
              }));
            } catch {
              /* episodi non disponibili — procedi senza */
            }
            return {
              season_number: s.season_number,
              name: s.name,
              episode_count: s.episode_count,
              air_date: s.air_date || null,
              episodes,
            };
          }),
      )
    : null;

  const updates: Record<string, unknown> = {
    tmdb_id: found.id,
    title: found.name,
    poster_path: found.poster_path,
    first_air_date: found.first_air_date || null,
    overview: found.overview || null,
    tmdb_fetched: true,
    episodes_fetched: true,
    seasons_data: seasonsData,
    trailer_url: extractTrailerUrl(found.videos),
    watch_providers: found["watch/providers"]?.results ?? null,
    genres: found.genres ?? null,
  };

  if (!DRY_RUN) {
    await supabase
      .from("shows")
      .update(updates as never)
      .eq("id", show.id);
  }
  return { action: "updated", data: updates };
}

// ─── Progress helpers ─────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function progress(done: number, total: number) {
  const pct = Math.round((done / total) * 100);
  const bar =
    "█".repeat(Math.floor(pct / 5)) + "░".repeat(20 - Math.floor(pct / 5));
  process.stdout.write(`\r  [${bar}] ${pct}% (${done}/${total})`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  console.log("🔍  Recupero shows dal database...");

  let query = supabase
    .from("shows")
    .select("id, tmdb_id, imdb_id, title, poster_path, overview, tmdb_fetched");
  if (!ALL_SHOWS) {
    query = query.eq("tmdb_fetched", false);
  }

  const { data: shows, error } = await query.order("title");

  if (error) throw new Error(`Supabase error: ${error.message}`);
  if (!shows?.length) {
    console.log("✅  Nessun show da arricchire.");
    return;
  }

  const total = shows.length;
  console.log(
    `📋  ${total} show da elaborare${DRY_RUN ? " (DRY RUN)" : ""}${ALL_SHOWS ? " (--all)" : ""}`,
  );
  console.log();

  const stats = {
    updated: 0,
    movie_deleted: 0,
    merged: 0,
    not_found: 0,
    error: 0,
  };

  for (let i = 0; i < shows.length; i += BATCH_SIZE) {
    const batch = shows.slice(i, i + BATCH_SIZE) as Show[];

    for (const show of batch) {
      progress(i + batch.indexOf(show), total);

      try {
        const result = await enrichShow(supabase, show);

        switch (result.action) {
          case "updated":
            stats.updated++;
            break;
          case "movie_deleted":
            stats.movie_deleted++;
            process.stdout.write(
              `\n  🎬  Rimosso (è un film): "${show.title}"\n`,
            );
            break;
          case "merged_into":
            stats.merged++;
            process.stdout.write(
              `\n  🔗  Mergiato "${show.title}" → ${result.targetId}\n`,
            );
            break;
          case "not_found":
            stats.not_found++;
            process.stdout.write(
              `\n  ⚠️   Non trovato su TMDB: "${show.title}"\n`,
            );
            break;
          case "error":
            stats.error++;
            process.stdout.write(
              `\n  ❌  Errore per "${show.title}": ${result.error}\n`,
            );
            break;
        }
      } catch (err) {
        stats.error++;
        const msg = err instanceof Error ? err.message : String(err);
        process.stdout.write(`\n  ❌  Errore per "${show.title}": ${msg}\n`);
      }

      if (DELAY_MS > 0) await sleep(DELAY_MS);
    }
  }

  progress(total, total);
  console.log("\n");
  console.log("─".repeat(40));
  console.log(`✅  Aggiornati:   ${stats.updated}`);
  if (stats.movie_deleted)
    console.log(`🎬  Rimossi (film): ${stats.movie_deleted}`);
  if (stats.merged) console.log(`🔗  Mergati:       ${stats.merged}`);
  if (stats.not_found) console.log(`⚠️   Non trovati:   ${stats.not_found}`);
  if (stats.error) console.log(`❌  Errori:        ${stats.error}`);
  console.log("─".repeat(40));
}

main().catch((err) => {
  console.error("\n❌ Errore fatale:", err.message ?? err);
  process.exit(1);
});
