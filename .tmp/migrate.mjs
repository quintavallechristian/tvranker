import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");

const env = fs
  .readFileSync(envPath, "utf8")
  .split("\n")
  .reduce((acc, line) => {
    const [k, ...v] = line.split("=");
    if (k && k.trim()) acc[k.trim()] = v.join("=").trim();
    return acc;
  }, {});

const url = env["NEXT_PUBLIC_SUPABASE_URL"];
const key = env["SUPABASE_SERVICE_ROLE_KEY"];

// Test if tmdb_id is already nullable
const testRes = await fetch(`${url}/rest/v1/shows`, {
  method: "POST",
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
  body: JSON.stringify({ title: "__migration_test__", tmdb_id: null }),
});
const testData = await testRes.json();
console.log("Test insert result:", JSON.stringify(testData));

if (testData[0]?.id) {
  // Migration already applied — clean up test row
  await fetch(`${url}/rest/v1/shows?id=eq.${testData[0].id}`, {
    method: "DELETE",
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  console.log("✅ Migration already applied. Database is ready.");
} else if (testData.message || testData.code) {
  console.log(
    "❌ Migration NOT yet applied. Error:",
    testData.message || testData.code,
  );
  console.log(
    "Please run the SQL in supabase/migrations/001_lazy_tmdb.sql via the Supabase Dashboard SQL Editor.",
  );
  console.log(
    "URL: https://supabase.com/dashboard/project/lvtvqjacdtlvaaqgdrna/sql/new",
  );
}
