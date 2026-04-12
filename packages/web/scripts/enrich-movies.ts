/**
 * enrich-movies.ts
 *
 * Per ogni movie in database con tmdb_fetched = false, fetcha i dati da TMDB
 * e aggiorna il record con titolo, poster, runtime, trailer e watch providers.
 *
 * Uso:
 *   npx tsx --env-file .env.local scripts/enrich-movies.ts
 *
 * Variabili d'ambiente richieste:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (bypassa RLS — NON usare l'anon key)
 *   TMDB_API_KEY
 *
 * Opzioni:
 *   --all          Arricchisce tutti i record, anche quelli già fetched
 *   --dry-run      Stampa cosa farebbe senza scrivere nulla
 *   --batch N      Numero di movie per batch (default: 20)
 *   --concurrency N  Richieste TMDB parallele per batch (default: 5)
 *   --delay N      Millisecondi tra batch (default: 500)
 *
 * Strategia di ottimizzazione API:
 *   - Ogni singola chiamata GET /movie/{id} usa append_to_response=videos,watch/providers
 *     per ottenere in una sola request: dettagli + trailer + piattaforme streaming.
 *   - I movie in ogni batch vengono processati in parallelo (fino a --concurrency richieste
 *     simultanee), riducendo significativamente il tempo totale rispetto all'approccio
 *     sequenziale.
 *   - Per i movie con solo imdb_id viene usato /find/{imdb_id} per risolvere il tmdb_id
 *     prima della chiamata di dettaglio, evitando ricerche testuali costose.
 */

import { createClient } from "@supabase/supabase-js";

// ─── Config ────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const args = process.argv.slice(2);
const ALL_MOVIES = args.includes("--all");
const DRY_RUN = args.includes("--dry-run");
const BATCH_SIZE = Number(args[args.indexOf("--batch") + 1] ?? 20);
const CONCURRENCY = Math.max(
  1,
  Number(args[args.indexOf("--concurrency") + 1] ?? 5),
);
const DELAY_MS = Number(args[args.indexOf("--delay") + 1] ?? 500);

// ─── Validation ─────────────────────────────────────────────────────────────

if (!SUPABASE_URL) throw new Error("NEXT_PUBLIC_SUPABASE_URL non impostato");
if (!SUPABASE_SERVICE_ROLE_KEY)
  throw new Error("SUPABASE_SERVICE_ROLE_KEY non impostato");
if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY non impostato");

// ─── Types ───────────────────────────────────────────────────────────────────

type Movie = {
  id: string;
  tmdb_id: number | null;
  imdb_id: string | null;
  title: string;
  poster_path: string | null;
  overview: string | null;
  tmdb_fetched: boolean;
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

type TMDBMovieExtended = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  runtime: number | null;
  genres?: TMDBGenre[];
  videos?: { results: TMDBVideo[] };
  "watch/providers"?: { results: Record<string, TMDBWatchProviderRegion> };
};

type TMDBFindResult = {
  tv_results: { id: number }[];
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

/**
 * Fetcha i dettagli di un movie con videos + watch/providers in una sola chiamata
 * grazie ad append_to_response.
 */
async function getMovieDetails(tmdbId: number): Promise<TMDBMovieExtended> {
  return tmdbFetch<TMDBMovieExtended>(`/movie/${tmdbId}`, {
    append_to_response: "videos,watch/providers",
  });
}

async function findByImdbId(
  imdbId: string,
): Promise<{ movieId: number | null }> {
  const result = await tmdbFetch<TMDBFindResult>(`/find/${imdbId}`, {
    external_source: "imdb_id",
  });
  return {
    movieId: result.movie_results[0]?.id ?? null,
  };
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
  | { action: "tv_show_deleted" }
  | { action: "merged_into"; targetId: string }
  | { action: "not_found" }
  | { action: "error"; error: string };

async function resolveMovie(
  movie: Movie,
): Promise<{ found: TMDBMovieExtended | null; isTvShow: boolean }> {
  let found: TMDBMovieExtended | null = null;
  let isTvShow = false;

  // Strategy 1: lookup by existing positive tmdb_id
  if (movie.tmdb_id !== null && movie.tmdb_id > 0) {
    try {
      found = await getMovieDetails(movie.tmdb_id);
    } catch {
      /* potrebbe essere un tmdb_id TV — verificato sotto */
    }
  }

  // Strategy 2: lookup by IMDb ID via /find (risolve in una sola chiamata)
  if (!found && movie.imdb_id) {
    try {
      const { movieId } = await findByImdbId(movie.imdb_id);
      if (movieId) {
        found = await getMovieDetails(movieId);
      } else {
        // Se /find restituisce solo tv_results, questo record è una serie TV da eliminare
        const result = await tmdbFetch<TMDBFindResult>(
          `/find/${movie.imdb_id}`,
          { external_source: "imdb_id" },
        );
        if (result.tv_results.length > 0) isTvShow = true;
      }
    } catch {
      /* fall through */
    }
  }

  // Strategy 3: ricerca testuale come movie
  if (!found && !isTvShow) {
    try {
      const id = await searchMovie(movie.title);
      if (id) found = await getMovieDetails(id);
    } catch {
      /* fall through */
    }
  }

  return { found, isTvShow };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function enrichMovie(supabase: any, movie: Movie): Promise<EnrichResult> {
  const { found, isTvShow } = await resolveMovie(movie);

  // Questo è un movie ranker — rimuovi eventuali serie TV finite qui per errore
  if (isTvShow) {
    if (!DRY_RUN) {
      await supabase.from("movies").delete().eq("id", movie.id);
    }
    return { action: "tv_show_deleted" };
  }

  if (!found) {
    if (!DRY_RUN) {
      await supabase
        .from("movies")
        .update({ tmdb_fetched: true } as never)
        .eq("id", movie.id);
    }
    return { action: "not_found" };
  }

  // Controlla duplicati: un altro record possiede già questo tmdb_id
  const { data: conflict } = await supabase
    .from("movies")
    .select("id")
    .eq("tmdb_id", found.id)
    .neq("id", movie.id)
    .limit(1)
    .maybeSingle();

  if (conflict) {
    if (!DRY_RUN) {
      await supabase
        .from("movie_list_items")
        .update({ movie_id: (conflict as { id: string }).id } as never)
        .eq("movie_id", movie.id);
      await supabase.from("movies").delete().eq("id", movie.id);
    }
    return { action: "merged_into", targetId: (conflict as { id: string }).id };
  }

  const updates: Record<string, unknown> = {
    tmdb_id: found.id,
    title: found.title,
    poster_path: found.poster_path,
    release_date: found.release_date || null,
    overview: found.overview || null,
    runtime: found.runtime ?? null,
    tmdb_fetched: true,
    trailer_url: extractTrailerUrl(found.videos),
    watch_providers: found["watch/providers"]?.results ?? null,
    genres: found.genres ?? null,
  };

  if (!DRY_RUN) {
    await supabase
      .from("movies")
      .update(updates as never)
      .eq("id", movie.id);
  }
  return { action: "updated", data: updates };
}

// ─── Concurrency helpers ──────────────────────────────────────────────────────

/**
 * Esegue `tasks` con al massimo `limit` promesse attive contemporaneamente.
 * Riduce il numero di round-trip rispetto all'esecuzione sequenziale senza
 * saturare il rate limit TMDB (40 req/s su piano gratuito).
 */
async function pLimit<T>(
  tasks: (() => Promise<T>)[],
  limit: number,
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const current = index++;
      results[current] = await tasks[current]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () =>
    worker(),
  );
  await Promise.all(workers);
  return results;
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

  console.log("🔍  Recupero movies dal database...");

  let query = supabase
    .from("movies")
    .select("id, tmdb_id, imdb_id, title, poster_path, overview, tmdb_fetched");
  if (!ALL_MOVIES) {
    query = query.eq("tmdb_fetched", false);
  }

  const { data: movies, error } = await query.order("title");

  if (error) throw new Error(`Supabase error: ${error.message}`);
  if (!movies?.length) {
    console.log("✅  Nessun movie da arricchire.");
    return;
  }

  const total = movies.length;
  console.log(
    `🎬  ${total} movie da elaborare${DRY_RUN ? " (DRY RUN)" : ""}${ALL_MOVIES ? " (--all)" : ""}`,
  );
  console.log(
    `⚡  Concorrenza: ${CONCURRENCY} richieste parallele per batch di ${BATCH_SIZE}`,
  );
  console.log();

  const stats = {
    updated: 0,
    tv_show_deleted: 0,
    merged: 0,
    not_found: 0,
    error: 0,
  };

  let done = 0;

  for (let i = 0; i < movies.length; i += BATCH_SIZE) {
    const batch = (movies as Movie[]).slice(i, i + BATCH_SIZE);

    const tasks = batch.map((movie) => async () => {
      try {
        const result = await enrichMovie(supabase, movie);

        switch (result.action) {
          case "updated":
            stats.updated++;
            break;
          case "tv_show_deleted":
            stats.tv_show_deleted++;
            process.stdout.write(
              `\n  📺  Rimosso (è una serie TV): "${movie.title}"\n`,
            );
            break;
          case "merged_into":
            stats.merged++;
            process.stdout.write(
              `\n  🔗  Mergiato "${movie.title}" → ${result.targetId}\n`,
            );
            break;
          case "not_found":
            stats.not_found++;
            process.stdout.write(
              `\n  ⚠️   Non trovato su TMDB: "${movie.title}"\n`,
            );
            break;
          case "error":
            stats.error++;
            process.stdout.write(
              `\n  ❌  Errore per "${movie.title}": ${result.error}\n`,
            );
            break;
        }
      } catch (err) {
        stats.error++;
        const msg = err instanceof Error ? err.message : String(err);
        process.stdout.write(`\n  ❌  Errore per "${movie.title}": ${msg}\n`);
      } finally {
        done++;
        progress(done, total);
      }
    });

    // Esegui il batch con concorrenza controllata
    await pLimit(tasks, CONCURRENCY);

    if (DELAY_MS > 0 && i + BATCH_SIZE < movies.length) {
      await sleep(DELAY_MS);
    }
  }

  progress(total, total);
  console.log("\n");
  console.log("─".repeat(40));
  console.log(`✅  Aggiornati:       ${stats.updated}`);
  if (stats.tv_show_deleted)
    console.log(`📺  Rimossi (TV):     ${stats.tv_show_deleted}`);
  if (stats.merged) console.log(`🔗  Mergati:          ${stats.merged}`);
  if (stats.not_found) console.log(`⚠️   Non trovati:     ${stats.not_found}`);
  if (stats.error) console.log(`❌  Errori:           ${stats.error}`);
  console.log("─".repeat(40));
}

main().catch((err) => {
  console.error("\n❌ Errore fatale:", err.message ?? err);
  process.exit(1);
});
