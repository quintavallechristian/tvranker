module.exports = [
"[project]/src/lib/similarity.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeListSimilarity",
    ()=>computeListSimilarity
]);
function computeListSimilarity(listA, listB) {
    if (listA.length === 0 || listB.length === 0) return 0;
    const mapA = new Map(listA.map((e)=>[
            e.showId,
            {
                rating: e.rating,
                position: e.position
            }
        ]));
    const mapB = new Map(listB.map((e)=>[
            e.showId,
            {
                rating: e.rating,
                position: e.position
            }
        ]));
    // Find common shows
    const commonShowIds = [];
    for (const showId of mapA.keys()){
        if (mapB.has(showId)) commonShowIds.push(showId);
    }
    if (commonShowIds.length === 0) return 0;
    const overlapRatio = commonShowIds.length / Math.min(listA.length, listB.length);
    // Rating similarity: only for shows rated in BOTH lists
    let ratingSum = 0;
    let ratingCount = 0;
    // Position similarity: for ALL common shows
    let positionSum = 0;
    const maxPosA = Math.max(listA.length - 1, 1);
    const maxPosB = Math.max(listB.length - 1, 1);
    for (const showId of commonShowIds){
        const a = mapA.get(showId);
        const b = mapB.get(showId);
        if (a.rating !== null && b.rating !== null) {
            ratingSum += 1 - Math.abs(a.rating - b.rating) / 9;
            ratingCount++;
        }
        const normPosA = a.position / maxPosA;
        const normPosB = b.position / maxPosB;
        positionSum += 1 - Math.abs(normPosA - normPosB);
    }
    const ratingSimilarity = ratingCount > 0 ? ratingSum / ratingCount : 1;
    const positionSimilarity = positionSum / commonShowIds.length;
    const agreementScore = 0.5 * ratingSimilarity + 0.5 * positionSimilarity;
    return Math.round(overlapRatio * agreementScore * 100);
}
}),
"[project]/src/lib/recommendations.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scoreRecommendations",
    ()=>scoreRecommendations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/similarity.ts [app-rsc] (ecmascript)");
;
function scoreRecommendations(viewerList, otherLists, topK = 20, limit = 10) {
    if (viewerList.length === 0 || otherLists.length === 0) return [];
    // 1. Compute similarity with each user and take top K
    const similarities = [];
    for (const other of otherLists){
        if (other.items.length === 0) continue;
        const sim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["computeListSimilarity"])(viewerList, other.items);
        if (sim > 0) similarities.push({
            userId: other.userId,
            similarity: sim
        });
    }
    similarities.sort((a, b)=>b.similarity - a.similarity);
    const neighbors = similarities.slice(0, topK);
    if (neighbors.length === 0) return [];
    // 2. Build a set of the viewer's shows for fast lookup
    const viewerShowIds = new Set(viewerList.map((e)=>e.showId));
    // 3. Build a map: userId → items lookup
    const listMap = new Map();
    for (const other of otherLists){
        listMap.set(other.userId, other.items);
    }
    // 4. Score each candidate show
    const showScores = new Map();
    for (const neighbor of neighbors){
        const items = listMap.get(neighbor.userId);
        if (!items) continue;
        const weight = neighbor.similarity / 100;
        const listLen = items.length;
        for (const item of items){
            if (viewerShowIds.has(item.showId)) continue;
            const normalizedRating = item.rating !== null ? item.rating / 10 : 1 - item.position / Math.max(listLen, 1);
            const contribution = weight * normalizedRating;
            const existing = showScores.get(item.showId);
            if (existing) {
                existing.score += contribution;
                existing.count += 1;
            } else {
                showScores.set(item.showId, {
                    score: contribution,
                    count: 1
                });
            }
        }
    }
    // 5. Sort by score descending, take top `limit`
    const results = [];
    for (const [showId, { score, count }] of showScores){
        // Normalize: average contribution × 100 → [0, 100]
        const normalizedScore = Math.round(score / count * 100);
        results.push({
            showId,
            score: normalizedScore,
            recommendedBy: count
        });
    }
    results.sort((a, b)=>b.score - a.score);
    return results.slice(0, limit);
}
}),
"[project]/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00013d22198e0917732ef4ee0783138d454c3f3c79":"getRecommendations","0027d96077220d72caf2f6c30f0adea6234f97de45":"getSimilarUsers"},"",""] */ __turbopack_context__.s([
    "getRecommendations",
    ()=>getRecommendations,
    "getSimilarUsers",
    ()=>getSimilarUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/recommendations.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/similarity.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getSimilarUsers() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    // Get current user's list items
    const { data: myList } = await supabase.from("lists").select("id").eq("user_id", user.id).single();
    if (!myList) return [];
    const { data: myItems } = await supabase.from("list_items").select("show_id, rating, position").eq("list_id", myList.id).order("position", {
        ascending: true
    });
    if (!myItems || myItems.length === 0) return [];
    const viewerList = myItems.map((i, idx)=>({
            showId: i.show_id,
            rating: i.rating,
            position: i.position ?? idx
        }));
    // Fetch all public lists (excluding self) with profile info
    const { data: publicLists } = await supabase.from("lists").select("id, user_id, profiles(id, username, avatar_url)").eq("is_public", true).neq("user_id", user.id);
    if (!publicLists || publicLists.length === 0) return [];
    const listIds = publicLists.map((l)=>l.id);
    // Fetch all items for those lists in one batch
    const { data: allItems } = await supabase.from("list_items").select("list_id, show_id, rating, position").in("list_id", listIds);
    if (!allItems) return [];
    // Group items by list_id
    const itemsByList = new Map();
    for (const item of allItems){
        if (!itemsByList.has(item.list_id)) itemsByList.set(item.list_id, []);
        itemsByList.get(item.list_id).push({
            showId: item.show_id,
            rating: item.rating,
            position: item.position
        });
    }
    // Check who the current user is already following
    const { data: followsData } = await supabase.from("follows").select("following_id").eq("follower_id", user.id);
    const followingIds = new Set((followsData ?? []).map((f)=>f.following_id));
    // Compute similarity for each user
    const results = [];
    for (const list of publicLists){
        const profile = Array.isArray(list.profiles) ? list.profiles[0] : list.profiles;
        if (!profile) continue;
        const otherItems = itemsByList.get(list.id) ?? [];
        if (otherItems.length === 0) continue;
        const similarity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["computeListSimilarity"])(viewerList, otherItems);
        if (similarity === 0) continue;
        results.push({
            id: profile.id,
            username: profile.username,
            avatar_url: profile.avatar_url,
            show_count: otherItems.length,
            similarity,
            is_following: followingIds.has(profile.id)
        });
    }
    // Sort by similarity descending, return top 3
    return results.sort((a, b)=>b.similarity - a.similarity).slice(0, 3);
}
async function getRecommendations() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    // 1. Get current user's list + items
    const { data: myList } = await supabase.from("lists").select("id").eq("user_id", user.id).single();
    if (!myList) return [];
    const { data: myItems } = await supabase.from("list_items").select("show_id, rating, position").eq("list_id", myList.id).order("position", {
        ascending: true
    });
    if (!myItems || myItems.length === 0) return [];
    const viewerList = myItems.map((i, idx)=>({
            showId: i.show_id,
            rating: i.rating,
            position: i.position ?? idx
        }));
    // 2. Fetch all other public lists with their items in one query
    const { data: publicLists } = await supabase.from("lists").select("id, user_id").eq("is_public", true).neq("user_id", user.id);
    if (!publicLists || publicLists.length === 0) return [];
    const listIds = publicLists.map((l)=>l.id);
    // Fetch all list items for those lists in one batch
    const { data: allItems } = await supabase.from("list_items").select("list_id, show_id, rating, position").in("list_id", listIds).order("position", {
        ascending: true
    });
    if (!allItems || allItems.length === 0) return [];
    // 3. Group items by user
    const listToUser = new Map();
    for (const l of publicLists){
        listToUser.set(l.id, l.user_id);
    }
    const userItemsMap = new Map();
    for (const item of allItems){
        const userId = listToUser.get(item.list_id);
        if (!userId) continue;
        if (!userItemsMap.has(userId)) userItemsMap.set(userId, []);
        userItemsMap.get(userId).push({
            showId: item.show_id,
            rating: item.rating,
            position: item.position
        });
    }
    const otherLists = [];
    for (const [userId, items] of userItemsMap){
        otherLists.push({
            userId,
            items
        });
    }
    // 4. Run scoring algorithm
    const scored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["scoreRecommendations"])(viewerList, otherLists);
    if (scored.length === 0) return [];
    // 5. Fetch show metadata for recommended shows
    const showIds = scored.map((s)=>s.showId);
    const { data: shows } = await supabase.from("shows").select("id, tmdb_id, title, poster_path, first_air_date, overview").in("id", showIds);
    if (!shows) return [];
    const showMap = new Map(shows.map((s)=>[
            s.id,
            s
        ]));
    return scored.map((s)=>{
        const show = showMap.get(s.showId);
        if (!show) return null;
        return {
            id: show.id,
            tmdb_id: show.tmdb_id,
            title: show.title,
            poster_path: show.poster_path,
            first_air_date: show.first_air_date,
            overview: show.overview,
            score: Math.round(s.score * 100) / 100,
            recommendedBy: s.recommendedBy
        };
    }).filter((r)=>r !== null);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getSimilarUsers,
    getRecommendations
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSimilarUsers, "0027d96077220d72caf2f6c30f0adea6234f97de45", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecommendations, "00013d22198e0917732ef4ee0783138d454c3f3c79", null);
}),
"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40a28c13a97e482f99f75f5981eded4d9dfadb2404":"addShowToMyList","40b8090c0cdf24303931698a900d141747fa612f10":"importToMyList","40fa8dcd5e3cf47ba1e824c96175aa20d3e0a8eb15":"copyListToMine","60500296d69c841163099142e2c7aa605ff7742051":"removeShowFromList","605c419b56fd315dcb68cfeb7a892d9b3822c401cd":"reorderListItems","605f2435efda81dd08e525867f8dd51303d334564d":"addShowToList","60d17600e3a1151ee7dff4cd2451a4528d05d2f90c":"updateList","70799100106412fb8a8f21e3ba730afee8596a92a7":"updateShowRating","70d9b1319a732a2917cbfba85bbc0d424270f62b48":"getListItemsPage"},"",""] */ __turbopack_context__.s([
    "addShowToList",
    ()=>addShowToList,
    "addShowToMyList",
    ()=>addShowToMyList,
    "copyListToMine",
    ()=>copyListToMine,
    "getListItemsPage",
    ()=>getListItemsPage,
    "importToMyList",
    ()=>importToMyList,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
// Helper: get the user's single list
async function getUserList(supabase, userId) {
    const { data } = await supabase.from("lists").select("id").eq("user_id", userId).single();
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
async function importToMyList(jsonData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const myList = await getUserList(supabase, user.id);
    if (!myList) throw new Error("List not found");
    const { parseTraktJson } = await __turbopack_context__.A("[project]/src/lib/import/trakt-parser.ts [app-rsc] (ecmascript, async loader)");
    const parsed = parseTraktJson(jsonData);
    // Get current max position in the user's list
    const { data: existingItems } = await supabase.from("list_items").select("position").eq("list_id", myList.id).order("position", {
        ascending: false
    }).limit(1);
    let position = (existingItems?.[0]?.position ?? -1) + 1;
    let importedCount = 0;
    for (const show of parsed.shows){
        try {
            let dbShowId = null;
            // Try to find existing show by imdb_id first, then by exact title
            if (show.imdb_id) {
                const { data: existing } = await supabase.from("shows").select("id").eq("imdb_id", show.imdb_id).limit(1).single();
                dbShowId = existing?.id ?? null;
            }
            if (!dbShowId) {
                const { data: existing } = await supabase.from("shows").select("id").ilike("title", show.title).limit(1).single();
                dbShowId = existing?.id ?? null;
            }
            // Insert new show if not found
            if (!dbShowId) {
                const placeholderTmdbId = -(Math.abs(show.title.split("").reduce((a, c)=>a + c.charCodeAt(0) * 31, 0)) % 2000000000);
                const { data: newShow } = await supabase.from("shows").insert({
                    title: show.title,
                    imdb_id: show.imdb_id,
                    tmdb_id: placeholderTmdbId,
                    poster_path: null,
                    first_air_date: null,
                    overview: null
                }).select("id").single();
                dbShowId = newShow?.id ?? null;
            }
            if (dbShowId) {
                // Skip if show already in list (unique constraint)
                const { error } = await supabase.from("list_items").insert({
                    list_id: myList.id,
                    show_id: dbShowId,
                    position
                });
                if (!error) {
                    position++;
                    importedCount++;
                }
            }
        } catch (e) {
            console.error(`Failed to save show: ${show.title}`, e);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/lists");
    return {
        importedCount
    };
}
async function getListItemsPage(listId, page, pageSize = 50) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: list } = await supabase.from("lists").select("user_id, is_public").eq("id", listId).single();
    if (!list) throw new Error("List not found");
    if (!list.is_public && list.user_id !== user?.id) throw new Error("Unauthorized");
    const from = page * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await supabase.from("list_items").select("*, shows(*)").eq("list_id", listId).order("rating", {
        ascending: false,
        nullsFirst: false
    }).order("position", {
        ascending: true
    }).range(from, to);
    if (error) throw new Error(error.message);
    const items = data ?? [];
    const hasMore = items.length === pageSize;
    const showTagsMap = {};
    if (user && items.length > 0) {
        const { data: showTags } = await supabase.from("show_tags").select("show_id, tag_id").eq("user_id", user.id).in("show_id", items.map((i)=>i.shows.id));
        for (const st of showTags ?? []){
            if (!showTagsMap[st.show_id]) showTagsMap[st.show_id] = [];
            showTagsMap[st.show_id].push(st.tag_id);
        }
    }
    return {
        items,
        hasMore,
        showTagsMap
    };
}
async function addShowToMyList(show) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const myList = await getUserList(supabase, user.id);
    if (!myList) throw new Error("List not found");
    // Ensure the show exists in our DB (reuse existing or create)
    let showId = show.id;
    const { data: existingShow } = await supabase.from("shows").select("id").eq("id", show.id).single();
    if (!existingShow) {
        const { data: newShow, error: showError } = await supabase.from("shows").insert({
            tmdb_id: show.tmdb_id ?? -(Math.abs(show.title.split("").reduce((a, c)=>a + c.charCodeAt(0) * 31, 0)) % 2000000000),
            imdb_id: show.imdb_id,
            title: show.title,
            poster_path: show.poster_path,
            first_air_date: show.first_air_date,
            overview: show.overview
        }).select("id").single();
        if (showError) throw new Error(showError.message);
        showId = newShow.id;
    }
    // Check if already in list
    const { data: existing } = await supabase.from("list_items").select("id").eq("list_id", myList.id).eq("show_id", showId).single();
    if (existing) return {
        alreadyExists: true
    };
    // Get max position
    const { data: items } = await supabase.from("list_items").select("position").eq("list_id", myList.id).order("position", {
        ascending: false
    }).limit(1);
    const nextPosition = (items?.[0]?.position ?? -1) + 1;
    const { error } = await supabase.from("list_items").insert({
        list_id: myList.id,
        show_id: showId,
        position: nextPosition
    });
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/lists");
    return {
        alreadyExists: false
    };
}
async function copyListToMine(sourceListId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    // Verify source list is public (or owned by user)
    const { data: sourceList } = await supabase.from("lists").select("id, is_public, user_id").eq("id", sourceListId).single();
    if (!sourceList) throw new Error("List not found");
    if (!sourceList.is_public && sourceList.user_id !== user.id) throw new Error("Unauthorized");
    const myList = await getUserList(supabase, user.id);
    if (!myList) throw new Error("Own list not found");
    // Verify own list is empty
    const { count } = await supabase.from("list_items").select("*", {
        count: "exact",
        head: true
    }).eq("list_id", myList.id);
    if ((count ?? 0) > 0) throw new Error("Can only copy to an empty list");
    // Fetch all items from source list
    const { data: sourceItems } = await supabase.from("list_items").select("show_id, rating, position, notes").eq("list_id", sourceListId).order("position", {
        ascending: true
    });
    if (sourceItems && sourceItems.length > 0) {
        const inserts = sourceItems.map((item)=>({
                list_id: myList.id,
                show_id: item.show_id,
                rating: item.rating,
                position: item.position,
                notes: item.notes
            }));
        const { error: insertError } = await supabase.from("list_items").insert(inserts);
        if (insertError) throw new Error(insertError.message);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/lists");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    updateList,
    addShowToList,
    removeShowFromList,
    updateShowRating,
    reorderListItems,
    importToMyList,
    getListItemsPage,
    addShowToMyList,
    copyListToMine
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateList, "60d17600e3a1151ee7dff4cd2451a4528d05d2f90c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addShowToList, "605f2435efda81dd08e525867f8dd51303d334564d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeShowFromList, "60500296d69c841163099142e2c7aa605ff7742051", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateShowRating, "70799100106412fb8a8f21e3ba730afee8596a92a7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(reorderListItems, "605c419b56fd315dcb68cfeb7a892d9b3822c401cd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(importToMyList, "40b8090c0cdf24303931698a900d141747fa612f10", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getListItemsPage, "70d9b1319a732a2917cbfba85bbc0d424270f62b48", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addShowToMyList, "40a28c13a97e482f99f75f5981eded4d9dfadb2404", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(copyListToMine, "40fa8dcd5e3cf47ba1e824c96175aa20d3e0a8eb15", null);
}),
"[project]/.next-internal/server/app/[locale]/(app)/explore/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/.next-internal/server/app/[locale]/(app)/explore/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00013d22198e0917732ef4ee0783138d454c3f3c79",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecommendations"],
    "0027d96077220d72caf2f6c30f0adea6234f97de45",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSimilarUsers"],
    "40a28c13a97e482f99f75f5981eded4d9dfadb2404",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addShowToMyList"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[locale]/(app)/explore/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_02e747fd._.js.map