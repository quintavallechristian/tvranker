/**
 * import-boardgames-csv.ts
 *
 * Importa boardgames da un CSV (formato BGG ranks export) nel database.
 * Esclude automaticamente le espansioni (is_expansion = 1).
 * Usa upsert su bgg_id per evitare duplicati.
 *
 * Uso:
 *   npx tsx --env-file .env.local scripts/import-boardgames-csv.ts <path-to-csv>
 *
 * Variabili d'ambiente richieste:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Opzioni:
 *   --dry-run   Stampa statistiche senza scrivere nulla
 *   --batch N   Numero di record per batch (default: 500)
 */

import { createClient } from "@supabase/supabase-js";
import { createReadStream } from "fs";
import { createInterface } from "readline";

// ─── Config ────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const args = process.argv.slice(2);
const csvPath = args.find((a) => !a.startsWith("--"));
const DRY_RUN = args.includes("--dry-run");
const batchIdx = args.indexOf("--batch");
const BATCH_SIZE = batchIdx >= 0 ? Number(args[batchIdx + 1]) : 500;

// ─── Validation ─────────────────────────────────────────────────────────────

if (!csvPath) {
  console.error("Uso: npx tsx --env-file .env.local scripts/import-boardgames-csv.ts <path-to-csv>");
  process.exit(1);
}
if (!SUPABASE_URL) throw new Error("NEXT_PUBLIC_SUPABASE_URL non impostato");
if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY non impostato");

// ─── Supabase client ────────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ─── CSV Parsing ────────────────────────────────────────────────────────────

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        fields.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  fields.push(current);
  return fields;
}

type CSVRow = {
  bgg_id: number;
  title: string;
  year_published: number | null;
  bgg_rating: number | null;
};

function parseRow(headers: string[], fields: string[]): CSVRow | null {
  const get = (name: string) => {
    const idx = headers.indexOf(name);
    return idx >= 0 ? fields[idx]?.trim() : undefined;
  };

  // Escludi espansioni
  const isExpansion = get("is_expansion");
  if (isExpansion === "1" || isExpansion?.toLowerCase() === "true") {
    return null;
  }

  const bggId = Number(get("id"));
  const name = get("name");
  if (!bggId || !name) return null;

  const yearStr = get("yearpublished");
  const year = yearStr ? Number(yearStr) : null;

  const avgStr = get("average");
  const avg = avgStr ? Number(avgStr) : null;
  // bgg_rating è numeric(4,2) → arrotonda a 2 decimali
  const bggRating = avg && !isNaN(avg) ? Math.round(avg * 100) / 100 : null;

  return {
    bgg_id: bggId,
    title: name,
    year_published: year && !isNaN(year) ? year : null,
    bgg_rating: bggRating,
  };
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`📂 Lettura CSV: ${csvPath}`);
  if (DRY_RUN) console.log("🔍 DRY RUN — nessuna scrittura");

  const rl = createInterface({
    input: createReadStream(csvPath!),
    crlfDelay: Infinity,
  });

  let headers: string[] = [];
  const rows: CSVRow[] = [];
  let totalLines = 0;
  let expansionsSkipped = 0;
  let invalidSkipped = 0;

  for await (const line of rl) {
    if (!headers.length) {
      headers = parseCSVLine(line).map((h) => h.trim());
      continue;
    }

    totalLines++;
    const fields = parseCSVLine(line);
    const isExpansionIdx = headers.indexOf("is_expansion");
    const isExpansion = isExpansionIdx >= 0 ? fields[isExpansionIdx]?.trim() : "0";

    if (isExpansion === "1" || isExpansion?.toLowerCase() === "true") {
      expansionsSkipped++;
      continue;
    }

    const row = parseRow(headers, fields);
    if (row) {
      rows.push(row);
    } else {
      invalidSkipped++;
    }
  }

  console.log(`\n📊 Statistiche CSV:`);
  console.log(`   Righe totali:       ${totalLines}`);
  console.log(`   Espansioni escluse: ${expansionsSkipped}`);
  console.log(`   Righe non valide:   ${invalidSkipped}`);
  console.log(`   Giochi da importare: ${rows.length}`);

  if (DRY_RUN) {
    console.log("\n✅ Dry run completato. Nessun dato scritto.");
    return;
  }

  // Upsert in batch
  const totalBatches = Math.ceil(rows.length / BATCH_SIZE);
  let inserted = 0;
  let errors = 0;

  console.log(`\n🚀 Inizio import in ${totalBatches} batch da ${BATCH_SIZE}...\n`);

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;

    const records = batch.map((r) => ({
      bgg_id: r.bgg_id,
      title: r.title,
      year_published: r.year_published,
      bgg_rating: r.bgg_rating,
      bgg_fetched: false,
    }));

    const { error } = await supabase
      .from("boardgames")
      .upsert(records, { onConflict: "bgg_id", ignoreDuplicates: false });

    if (error) {
      console.error(`   ❌ Batch ${batchNum}/${totalBatches}: ${error.message}`);
      errors += batch.length;
    } else {
      inserted += batch.length;
      if (batchNum % 50 === 0 || batchNum === totalBatches) {
        console.log(`   ✅ Batch ${batchNum}/${totalBatches} — ${inserted} record importati`);
      }
    }
  }

  console.log(`\n🏁 Import completato!`);
  console.log(`   Importati: ${inserted}`);
  if (errors > 0) console.log(`   Errori:    ${errors}`);
}

main().catch((err) => {
  console.error("Errore fatale:", err);
  process.exit(1);
});
