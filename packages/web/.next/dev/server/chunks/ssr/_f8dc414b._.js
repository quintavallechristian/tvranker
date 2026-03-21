module.exports = [
"[project]/src/lib/tmdb/client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findByImdbId",
    ()=>findByImdbId,
    "getPosterUrl",
    ()=>getPosterUrl,
    "getShowDetails",
    ()=>getShowDetails,
    "searchShows",
    ()=>searchShows
]);
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
function getApiKey() {
    const key = process.env.TMDB_API_KEY;
    if (!key) throw new Error("TMDB_API_KEY is not set");
    return key;
}
async function tmdbFetch(endpoint, params = {}) {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([k, v])=>url.searchParams.set(k, v));
    const apiKey = getApiKey();
    // JWT tokens (v4 Read Access Token) start with "ey" — use Bearer auth.
    // Short v3 API keys use the legacy api_key query param.
    const headers = apiKey.startsWith("ey") ? {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
    } : {};
    if (!apiKey.startsWith("ey")) {
        url.searchParams.set("api_key", apiKey);
    }
    const res = await fetch(url.toString(), {
        headers,
        next: {
            revalidate: 86400
        }
    });
    if (!res.ok) {
        throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
async function searchShows(query, page = 1) {
    console.log(query);
    return tmdbFetch("/search/tv", {
        query,
        page: String(page),
        include_adult: "false"
    });
}
async function getShowDetails(tmdbId) {
    return tmdbFetch(`/tv/${tmdbId}`);
}
async function findByImdbId(imdbId) {
    const result = await tmdbFetch(`/find/${imdbId}`, {
        external_source: "imdb_id"
    });
    return result.tv_results[0] || null;
}
function getPosterUrl(posterPath, size = "w342") {
    if (!posterPath) return null;
    return `${TMDB_IMAGE_BASE}/${size}${posterPath}`;
}
}),
"[project]/src/app/[locale]/(app)/shows/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"409722b1e6e2facdc7051447d11177a4e821d718a5":"fetchTmdbData"},"",""] */ __turbopack_context__.s([
    "fetchTmdbData",
    ()=>fetchTmdbData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tmdb/client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function fetchTmdbData(showId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: show } = await supabase.from("shows").select("*").eq("id", showId).single();
    if (!show) return null;
    // Already enriched
    const needsFetch = show.tmdb_fetched === false || show.tmdb_id !== null && show.tmdb_id < 0 || show.tmdb_id === null;
    if (!needsFetch) return show;
    let found = null;
    // Strategy 1: lookup by existing positive tmdb_id
    if (show.tmdb_id !== null && show.tmdb_id > 0) {
        try {
            found = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getShowDetails"])(show.tmdb_id);
        } catch  {
        /* fall through */ }
    }
    // Strategy 2: lookup by IMDb ID
    if (!found && show.imdb_id) {
        try {
            found = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findByImdbId"])(show.imdb_id);
        } catch  {
        /* fall through */ }
    }
    // Strategy 3: search by title
    if (!found) {
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchShows"])(show.title);
            found = data.results?.[0] ?? null;
        } catch  {
        /* ignore */ }
    }
    if (!found) {
        // Mark as fetched even if TMDB has no match, to avoid repeated lookups.
        // tmdb_fetched column is only present after migration — ignore errors if missing.
        await supabase.from("shows").update({
            tmdb_fetched: true
        }).eq("id", showId).then(()=>null, ()=>null); // ignore errors
        return show;
    }
    // Check if another show row already holds this real tmdb_id
    const { data: conflict } = await supabase.from("shows").select("id").eq("tmdb_id", found.id).neq("id", showId).limit(1).single();
    if (conflict) {
        // Merge: point all list_items from this placeholder to the existing canonical show
        await supabase.from("list_items").update({
            show_id: conflict.id
        }).eq("show_id", showId);
        // Delete the placeholder show
        await supabase.from("shows").delete().eq("id", showId);
        // Return the canonical show
        const { data: canonical } = await supabase.from("shows").select("*").eq("id", conflict.id).single();
        return canonical;
    }
    // Update the show with real TMDB data.
    // tmdb_fetched is only in updates after migration — PostgREST ignores unknown columns gracefully.
    const updates = {
        tmdb_id: found.id,
        title: found.name,
        poster_path: found.poster_path,
        first_air_date: found.first_air_date || null,
        overview: found.overview || null,
        tmdb_fetched: true
    };
    const { data: updated, error: updateError } = await supabase.from("shows").update(updates).eq("id", showId).select("*").single();
    if (updateError) {
        // Retry without tmdb_fetched if column doesn't exist yet (pre-migration)
        const { data: updated2 } = await supabase.from("shows").update({
            tmdb_id: found.id,
            title: found.name,
            poster_path: found.poster_path,
            first_air_date: found.first_air_date || null,
            overview: found.overview || null
        }).eq("id", showId).select("*").single();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/shows/${showId}`);
        return updated2;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/shows/${showId}`);
    return updated;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchTmdbData
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchTmdbData, "409722b1e6e2facdc7051447d11177a4e821d718a5", null);
}),
"[project]/.next-internal/server/app/[locale]/(app)/shows/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/shows/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/shows/actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/[locale]/(app)/shows/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/shows/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "409722b1e6e2facdc7051447d11177a4e821d718a5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchTmdbData"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[locale]/(app)/shows/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/[locale]/(app)/shows/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/shows/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_f8dc414b._.js.map