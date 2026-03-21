/**
 * enrich-episodes.ts
 *
 * Per ogni show già enrichito (tmdb_fetched = true) ma senza episodi (episodes_fetched = false),
 * fetcha da TMDB i dettagli di ogni stagione (titolo episodio + durata) e aggiorna seasons_data.
 *
 * Uso:
 *   npx tsx --env-file .env.local scripts/enrich-episodes.ts
 *
 * Variabili d'ambiente richieste:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (bypassa RLS — NON usare l'anon key)
 *   TMDB_API_KEY
 *
 * Opzioni:
 *   --all       Riesegui anche per gli show già processati (episodes_fetched = true)
 *   --dry-run   Stampa cosa farebbe senza scrivere nulla
 *   --batch N   Numero di show per batch (default: 10)
 *   --delay N   Millisecondi tra le richieste TMDB (default: 300)
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
const BATCH_SIZE = Number(args[args.indexOf("--batch") + 1] ?? 10);
const DELAY_MS = Number(args[args.indexOf("--delay") + 1] ?? 300);

// ─── Validation ─────────────────────────────────────────────────────────────

if (!SUPABASE_URL) throw new Error("NEXT_PUBLIC_SUPABASE_URL non impostato");
if (!SUPABASE_SERVICE_ROLE_KEY)
  throw new Error("SUPABASE_SERVICE_ROLE_KEY non impostato");
if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY non impostato");

// ─── Types ───────────────────────────────────────────────────────────────────

type SeasonInfo = {
  season_number: number;
  name: string;
  episode_count: number;
  air_date: string | null;
  episodes?: EpisodeInfo[];
};

type EpisodeInfo = {
  episode_number: number;
  name: string;
  runtime: number | null;
};

type ShowRow = {
  id: string;
  tmdb_id: number;
  title: string;
  seasons_data: SeasonInfo[] | null;
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

async function getSeasonDetails(
  tmdbId: number,
  seasonNumber: number,
): Promise<TMDBSeasonDetails> {
  return tmdbFetch<TMDBSeasonDetails>(`/tv/${tmdbId}/season/${seasonNumber}`);
}

// ─── Per-delay helper ────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Progress bar ────────────────────────────────────────────────────────────

function progress(done: number, total: number) {
  const pct = Math.round((done / total) * 100);
  const bar =
    "█".repeat(Math.floor(pct / 5)) + "░".repeat(20 - Math.floor(pct / 5));
  process.stdout.write(`\r  [${bar}] ${pct}% (${done}/${total})`);
}

// ─── Core enrichment ─────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function enrichEpisodes(supabase: any, show: ShowRow): Promise<"updated" | "skipped" | "error"> {
  if (!show.seasons_data || show.seasons_data.length === 0) {
    // Nessuna stagione registrata — segna come processato e vai avanti
    if (!DRY_RUN) {
      await supabase
        .from("shows")
        .update({ episodes_fetched: true } as never)
        .eq("id", show.id);
    }
    return "skipped";
  }

  const enrichedSeasons: SeasonInfo[] = [];
  let anyFailed = false;

  for (const season of show.seasons_data) {
    if (DELAY_MS > 0 && enrichedSeasons.length > 0) {
      await sleep(DELAY_MS);
    }

    try {
      const details = await getSeasonDetails(show.tmdb_id, season.season_number);
      const episodes: EpisodeInfo[] = details.episodes.map((e) => ({
        episode_number: e.episode_number,
        name: e.name,
        runtime: e.runtime ?? null,
      }));

      enrichedSeasons.push({ ...season, episodes });
    } catch {
      // Stagione non disponibile — mantieni i dati esistenti senza episodi
      enrichedSeasons.push(season);
      anyFailed = true;
    }
  }

  if (!DRY_RUN) {
    await supabase
      .from("shows")
      .update({
        seasons_data: enrichedSeasons,
        // Segna come processato anche se alcune stagioni hanno fallito, per evitare retry infiniti.
        // Il campo anyFailed viene loggato ma non blocca il flusso.
        episodes_fetched: true,
      } as never)
      .eq("id", show.id);
  }

  if (anyFailed) {
    process.stdout.write(
      `\n  ⚠️   Stagioni parziali per "${show.title}" (alcune stagioni non disponibili su TMDB)\n`,
    );
  }

  return "updated";
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  console.log("🔍  Recupero shows dal database...");

  let query = supabase
    .from("shows")
    .select("id, tmdb_id, title, seasons_data")
    .eq("tmdb_fetched", true)
    .not("tmdb_id", "is", null);

  if (!ALL_SHOWS) {
    query = query.eq("episodes_fetched", false);
  }

  const { data: shows, error } = await query.order("title");

  if (error) throw new Error(`Supabase error: ${error.message}`);
  if (!shows?.length) {
    console.log("✅  Nessun show da arricchire con episodi.");
    return;
  }

  const total = shows.length;
  console.log(
    `📋  ${total} show da elaborare${DRY_RUN ? " (DRY RUN)" : ""}${ALL_SHOWS ? " (--all)" : ""}`,
  );
  console.log();

  const stats = { updated: 0, skipped: 0, error: 0 };

  for (let i = 0; i < shows.length; i += BATCH_SIZE) {
    const batch = shows.slice(i, i + BATCH_SIZE) as ShowRow[];

    for (const show of batch) {
      progress(i + batch.indexOf(show), total);

      try {
        const result = await enrichEpisodes(supabase, show);
        if (result === "updated") stats.updated++;
        else if (result === "skipped") stats.skipped++;
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
  if (stats.skipped) console.log(`⏭️   Saltati:      ${stats.skipped}`);
  if (stats.error) console.log(`❌  Errori:        ${stats.error}`);
  console.log("─".repeat(40));
}

main().catch((err) => {
  console.error("❌  Errore fatale:", err);
  process.exit(1);
});
