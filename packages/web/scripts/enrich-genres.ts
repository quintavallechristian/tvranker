/**
 * enrich-genres.ts
 *
 * Popola il campo `genres` per tutti i record di shows, movies e animes
 * che hanno un tmdb_id ma il campo genres è ancora NULL.
 *
 * Uso:
 *   npx tsx --env-file .env.local scripts/enrich-genres.ts
 *
 * Variabili d'ambiente richieste:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (bypassa RLS — NON usare l'anon key)
 *   TMDB_API_KEY
 *
 * Opzioni:
 *   --dry-run      Stampa cosa farebbe senza scrivere nulla
 *   --batch N      Record per batch (default: 20)
 *   --concurrency N  Richieste TMDB parallele per batch (default: 5)
 *   --delay N      Millisecondi tra batch (default: 500)
 *   --table NAME   Processa solo una tabella specifica: shows | movies | animes
 */

import { createClient } from "@supabase/supabase-js";

// ─── Config ────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const BATCH_SIZE = Number(args[args.indexOf("--batch") + 1] ?? 20);
const CONCURRENCY = Math.max(
  1,
  Number(args[args.indexOf("--concurrency") + 1] ?? 5),
);
const DELAY_MS = Number(args[args.indexOf("--delay") + 1] ?? 500);
const TABLE_FILTER = args[args.indexOf("--table") + 1] as
  | "shows"
  | "movies"
  | "animes"
  | undefined;

// ─── Validation ─────────────────────────────────────────────────────────────

if (!SUPABASE_URL) throw new Error("NEXT_PUBLIC_SUPABASE_URL non impostato");
if (!SUPABASE_SERVICE_ROLE_KEY)
  throw new Error("SUPABASE_SERVICE_ROLE_KEY non impostato");
if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY non impostato");
if (TABLE_FILTER && !["shows", "movies", "animes"].includes(TABLE_FILTER)) {
  throw new Error(
    `--table deve essere uno tra: shows, movies, animes (ricevuto: "${TABLE_FILTER}")`,
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

type TMDBGenre = { id: number; name: string };

type TMDBBaseDetails = {
  id: number;
  genres?: TMDBGenre[];
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
  if (!res.ok) throw new Error(`TMDB ${res.status}: ${endpoint}`);
  return res.json() as Promise<T>;
}

async function fetchGenres(
  tmdbId: number,
  type: "tv" | "movie",
): Promise<TMDBGenre[] | null> {
  try {
    const data = await tmdbFetch<TMDBBaseDetails>(
      `/${type}/${tmdbId}`,
    );
    return data.genres ?? null;
  } catch {
    return null;
  }
}

// ─── Concurrency helpers ──────────────────────────────────────────────────────

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

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function progress(done: number, total: number) {
  const pct = Math.round((done / total) * 100);
  const bar =
    "█".repeat(Math.floor(pct / 5)) + "░".repeat(20 - Math.floor(pct / 5));
  process.stdout.write(`\r  [${bar}] ${pct}% (${done}/${total})`);
}

// ─── Enrichment for a single table ───────────────────────────────────────────

async function enrichTable(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  tableName: "shows" | "movies" | "animes",
  tmdbType: "tv" | "movie",
) {
  console.log(`\n📋  Tabella: ${tableName}`);

  const { data: records, error } = await supabase
    .from(tableName)
    .select("id, tmdb_id, title")
    .is("genres", null)
    .not("tmdb_id", "is", null)
    .order("title");

  if (error) throw new Error(`Supabase error (${tableName}): ${error.message}`);
  if (!records?.length) {
    console.log(`  ✅  Nessun record da arricchire in ${tableName}.`);
    return;
  }

  const total = records.length;
  console.log(
    `  🎯  ${total} record da elaborare${DRY_RUN ? " (DRY RUN)" : ""}`,
  );

  const stats = { updated: 0, not_found: 0, error: 0 };
  let done = 0;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);

    const tasks = batch.map(
      (record: { id: string; tmdb_id: number; title: string }) => async () => {
        try {
          const genres = await fetchGenres(record.tmdb_id, tmdbType);

          if (genres === null) {
            stats.not_found++;
            return;
          }

          if (!DRY_RUN) {
            await supabase
              .from(tableName)
              .update({ genres } as never)
              .eq("id", record.id);
          }
          stats.updated++;
        } catch (err) {
          stats.error++;
          process.stdout.write(
            `\n  ⚠️  Errore su "${record.title}": ${err instanceof Error ? err.message : String(err)}\n`,
          );
        } finally {
          done++;
          progress(done, total);
        }
      },
    );

    await pLimit(tasks, CONCURRENCY);

    if (i + BATCH_SIZE < records.length) {
      await sleep(DELAY_MS);
    }
  }

  process.stdout.write("\n");
  console.log(
    `  📊  Risultati: ${stats.updated} aggiornati, ${stats.not_found} non trovati, ${stats.error} errori`,
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  console.log("🎬  enrich-genres.ts");
  console.log(
    `⚡  Concorrenza: ${CONCURRENCY} richieste parallele, batch ${BATCH_SIZE}, delay ${DELAY_MS}ms`,
  );
  if (DRY_RUN) console.log("🔍  Modalità DRY RUN — nessuna scrittura");
  if (TABLE_FILTER) console.log(`🔎  Solo tabella: ${TABLE_FILTER}`);

  const tables: { name: "shows" | "movies" | "animes"; type: "tv" | "movie" }[] = [
    { name: "shows", type: "tv" },
    { name: "movies", type: "movie" },
    { name: "animes", type: "tv" },
  ];

  for (const table of tables) {
    if (TABLE_FILTER && TABLE_FILTER !== table.name) continue;
    await enrichTable(supabase, table.name, table.type);
  }

  console.log("\n✅  Completato.");
}

main().catch((err) => {
  console.error("\n❌  Errore fatale:", err);
  process.exit(1);
});
