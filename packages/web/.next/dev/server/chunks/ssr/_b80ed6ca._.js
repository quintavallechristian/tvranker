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
"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40135b4f04efdd27899e4e5ea2914c4c77e68be858":"importFromJson","40b3b70915d422f898dc384efe43a41ba5197bb91f":"deleteList","40bd5e2228d2b79ff0832846deab75c90d2d340093":"createList","60500296d69c841163099142e2c7aa605ff7742051":"removeShowFromList","605c419b56fd315dcb68cfeb7a892d9b3822c401cd":"reorderListItems","605f2435efda81dd08e525867f8dd51303d334564d":"addShowToList","60d17600e3a1151ee7dff4cd2451a4528d05d2f90c":"updateList","70799100106412fb8a8f21e3ba730afee8596a92a7":"updateShowRating"},"",""] */ __turbopack_context__.s([
    "addShowToList",
    ()=>addShowToList,
    "createList",
    ()=>createList,
    "deleteList",
    ()=>deleteList,
    "importFromJson",
    ()=>importFromJson,
    "removeShowFromList",
    ()=>removeShowFromList,
    "reorderListItems",
    ()=>reorderListItems,
    "updateList",
    ()=>updateList,
    "updateShowRating",
    ()=>updateShowRating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tmdb/client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function createList(formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const name = formData.get("name");
    const description = formData.get("description") || null;
    // Get max position
    const { data: lists } = await supabase.from("lists").select("position").eq("user_id", user.id).order("position", {
        ascending: false
    }).limit(1);
    const nextPosition = (lists?.[0]?.position ?? -1) + 1;
    const { data, error } = await supabase.from("lists").insert({
        user_id: user.id,
        name,
        description,
        position: nextPosition
    }).select().single();
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/lists");
    return data;
}
async function updateList(listId, updates) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("lists").update(updates).eq("id", listId).eq("user_id", user.id);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/lists");
}
async function deleteList(listId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("lists").delete().eq("id", listId).eq("user_id", user.id);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/lists");
}
async function addShowToList(listId, show) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    // Upsert show in shows table
    let { data: existingShow } = await supabase.from("shows").select("id").eq("tmdb_id", show.tmdb_id).single();
    if (!existingShow) {
        const { data: newShow, error: showError } = await supabase.from("shows").insert({
            tmdb_id: show.tmdb_id,
            title: show.title,
            poster_path: show.poster_path,
            first_air_date: show.first_air_date || null,
            overview: show.overview || null
        }).select().single();
        if (showError) throw new Error(showError.message);
        existingShow = newShow;
    }
    // Get max position in list
    const { data: items } = await supabase.from("list_items").select("position").eq("list_id", listId).order("position", {
        ascending: false
    }).limit(1);
    const nextPosition = (items?.[0]?.position ?? -1) + 1;
    const { error } = await supabase.from("list_items").insert({
        list_id: listId,
        show_id: existingShow.id,
        position: nextPosition
    });
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/lists/${listId}`);
}
async function removeShowFromList(listId, itemId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("list_items").delete().eq("id", itemId);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/lists/${listId}`);
}
async function updateShowRating(listId, itemId, rating) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    if (rating < 1 || rating > 10) throw new Error("Rating must be 1-10");
    const { error } = await supabase.from("list_items").update({
        rating
    }).eq("id", itemId);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/lists/${listId}`);
}
async function reorderListItems(listId, itemIds) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    // Update positions
    const updates = itemIds.map((id, index)=>supabase.from("list_items").update({
            position: index
        }).eq("id", id));
    await Promise.all(updates);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/lists/${listId}`);
}
async function importFromJson(jsonData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    console.log("quauaaaa");
    const { parseTraktJson } = await __turbopack_context__.A("[project]/src/lib/import/trakt-parser.ts [app-rsc] (ecmascript, async loader)");
    const parsed = parseTraktJson(jsonData);
    // Create the list
    const { data: lists } = await supabase.from("lists").select("position").eq("user_id", user.id).order("position", {
        ascending: false
    }).limit(1);
    const nextPosition = (lists?.[0]?.position ?? -1) + 1;
    const { data: list, error: listError } = await supabase.from("lists").insert({
        user_id: user.id,
        name: parsed.name,
        description: parsed.description || null,
        is_public: parsed.is_public,
        position: nextPosition
    }).select().single();
    if (listError) throw new Error(listError.message);
    // For each show, look up TMDB data and insert
    let position = 0;
    console.log("hie", parsed);
    for (const show of parsed.shows){
        try {
            // Try IMDB ID lookup first, then fall back to title search
            let foundShow = null;
            if (show.imdb_id) {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findByImdbId"])(show.imdb_id);
                console.log(result);
                if (result) {
                    foundShow = {
                        tmdb_id: result.id,
                        title: result.name,
                        poster_path: result.poster_path,
                        first_air_date: result.first_air_date || null,
                        overview: result.overview || null
                    };
                }
            }
            if (!foundShow) {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchShows"])(show.title);
                const first = data.results?.[0];
                if (first) {
                    foundShow = {
                        tmdb_id: first.id,
                        title: first.name,
                        poster_path: first.poster_path,
                        first_air_date: first.first_air_date || null,
                        overview: first.overview || null
                    };
                }
            }
            if (foundShow?.tmdb_id) {
                const tmdbShow = foundShow;
                // Upsert show
                let { data: existingShow } = await supabase.from("shows").select("id").eq("tmdb_id", tmdbShow.tmdb_id).single();
                if (!existingShow) {
                    const { data: newShow } = await supabase.from("shows").insert({
                        tmdb_id: tmdbShow.tmdb_id,
                        imdb_id: show.imdb_id,
                        title: tmdbShow.title || show.title,
                        poster_path: tmdbShow.poster_path,
                        first_air_date: tmdbShow.first_air_date || null,
                        overview: tmdbShow.overview || null
                    }).select().single();
                    existingShow = newShow;
                }
                if (existingShow) {
                    await supabase.from("list_items").insert({
                        list_id: list.id,
                        show_id: existingShow.id,
                        position
                    });
                    position++;
                }
            } else {
                // TMDB unavailable — insert show with title-only data so it's never lost
                const fakeTmdbId = Math.abs(show.title.split("").reduce((a, c)=>a + c.charCodeAt(0), 0));
                let { data: existingShow } = await supabase.from("shows").select("id").eq("tmdb_id", fakeTmdbId).single();
                if (!existingShow) {
                    const { data: newShow } = await supabase.from("shows").insert({
                        tmdb_id: fakeTmdbId,
                        imdb_id: show.imdb_id,
                        title: show.title,
                        poster_path: null,
                        first_air_date: null,
                        overview: null
                    }).select().single();
                    existingShow = newShow;
                }
                if (existingShow) {
                    await supabase.from("list_items").insert({
                        list_id: list.id,
                        show_id: existingShow.id,
                        position
                    });
                    position++;
                }
            }
        } catch (e) {
            console.error(`Failed to import show: ${show.title}`, e);
        // Continue with next show
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/lists");
    return {
        listId: list.id,
        importedCount: position
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createList,
    updateList,
    deleteList,
    addShowToList,
    removeShowFromList,
    updateShowRating,
    reorderListItems,
    importFromJson
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createList, "40bd5e2228d2b79ff0832846deab75c90d2d340093", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateList, "60d17600e3a1151ee7dff4cd2451a4528d05d2f90c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteList, "40b3b70915d422f898dc384efe43a41ba5197bb91f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addShowToList, "605f2435efda81dd08e525867f8dd51303d334564d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeShowFromList, "60500296d69c841163099142e2c7aa605ff7742051", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateShowRating, "70799100106412fb8a8f21e3ba730afee8596a92a7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(reorderListItems, "605c419b56fd315dcb68cfeb7a892d9b3822c401cd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(importFromJson, "40135b4f04efdd27899e4e5ea2914c4c77e68be858", null);
}),
"[project]/.next-internal/server/app/[locale]/(app)/lists/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/.next-internal/server/app/[locale]/(app)/lists/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "60500296d69c841163099142e2c7aa605ff7742051",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeShowFromList"],
    "605c419b56fd315dcb68cfeb7a892d9b3822c401cd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reorderListItems"],
    "605f2435efda81dd08e525867f8dd51303d334564d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addShowToList"],
    "60d17600e3a1151ee7dff4cd2451a4528d05d2f90c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateList"],
    "70799100106412fb8a8f21e3ba730afee8596a92a7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateShowRating"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[locale]/(app)/lists/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_b80ed6ca._.js.map