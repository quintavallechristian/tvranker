module.exports = [
"[project]/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00df629b158a891a1c8a0acec522d9c8b425db3f21":"getFollowing","401b0557fadc9e5b3c25bd473cdc965fc6d95aa4bf":"unfollowUser","40bbc9ce8487a3d31a6b3b60316f37cc379c620508":"followUser"},"",""] */ __turbopack_context__.s([
    "followUser",
    ()=>followUser,
    "getFollowing",
    ()=>getFollowing,
    "unfollowUser",
    ()=>unfollowUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function followUser(followingId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    const { error } = await supabase.from("follows").insert({
        follower_id: user.id,
        following_id: followingId
    });
    if (error) throw error;
    // Notify the followed user (best-effort, don't block on failure)
    await supabase.from("notifications").insert({
        user_id: followingId,
        actor_id: user.id,
        type: "new_follower"
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/seguiti");
}
async function unfollowUser(followingId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    const { error } = await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", followingId);
    if (error) throw error;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/seguiti");
}
async function getFollowing() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data: follows } = await supabase.from("follows").select("following_id").eq("follower_id", user.id);
    if (!follows || follows.length === 0) return [];
    const followingIds = follows.map((f)=>f.following_id);
    const { data: profiles } = await supabase.from("profiles").select("id, username, avatar_url").in("id", followingIds);
    if (!profiles || profiles.length === 0) return [];
    // Get viewer's list for similarity computation
    const { data: viewerList } = await supabase.from("lists").select("id").eq("user_id", user.id).single();
    let viewerItems = [];
    if (viewerList) {
        const { data } = await supabase.from("list_items").select("show_id, rating, position").eq("list_id", viewerList.id).order("position", {
            ascending: true
        });
        viewerItems = (data ?? []).map((i, idx)=>({
                showId: i.show_id,
                rating: i.rating,
                position: i.position ?? idx
            }));
    }
    const { computeListSimilarity } = await __turbopack_context__.A("[project]/src/lib/similarity.ts [app-rsc] (ecmascript, async loader)");
    const results = [];
    for (const profile of profiles){
        const { data: pList } = await supabase.from("lists").select("id, is_public").eq("user_id", profile.id).single();
        let show_count = 0;
        let similarity = null;
        if (pList?.is_public) {
            const { data: listItems, count } = await supabase.from("list_items").select("show_id, rating, position", {
                count: "exact"
            }).eq("list_id", pList.id).order("position", {
                ascending: true
            });
            show_count = count ?? 0;
            if (viewerItems.length > 0 && listItems && listItems.length > 0) {
                const otherItems = listItems.map((i, idx)=>({
                        showId: i.show_id,
                        rating: i.rating,
                        position: i.position ?? idx
                    }));
                similarity = computeListSimilarity(viewerItems, otherItems);
            }
        }
        results.push({
            ...profile,
            show_count,
            similarity
        });
    }
    return results;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    followUser,
    unfollowUser,
    getFollowing
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(followUser, "40bbc9ce8487a3d31a6b3b60316f37cc379c620508", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(unfollowUser, "401b0557fadc9e5b3c25bd473cdc965fc6d95aa4bf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getFollowing, "00df629b158a891a1c8a0acec522d9c8b425db3f21", null);
}),
"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40896a8c2d5517f52724399b06d12b3c1a078c8d57":"addTmdbShowToMyList","40a28c13a97e482f99f75f5981eded4d9dfadb2404":"addShowToMyList","40b8090c0cdf24303931698a900d141747fa612f10":"importToMyList","40fa8dcd5e3cf47ba1e824c96175aa20d3e0a8eb15":"copyListToMine","40fe120f64dab30717c098ecfa2a30f52943210883":"getListAnalytics","60500296d69c841163099142e2c7aa605ff7742051":"removeShowFromList","605c419b56fd315dcb68cfeb7a892d9b3822c401cd":"reorderListItems","605f2435efda81dd08e525867f8dd51303d334564d":"addShowToList","60d17600e3a1151ee7dff4cd2451a4528d05d2f90c":"updateList","701f91fa768c121e8e2aaa5337dc327d75aa3bc291":"updateShowNotes","70799100106412fb8a8f21e3ba730afee8596a92a7":"updateShowRating","70d9b1319a732a2917cbfba85bbc0d424270f62b48":"getListItemsPage"},"",""] */ __turbopack_context__.s([
    "addShowToList",
    ()=>addShowToList,
    "addShowToMyList",
    ()=>addShowToMyList,
    "addTmdbShowToMyList",
    ()=>addTmdbShowToMyList,
    "copyListToMine",
    ()=>copyListToMine,
    "getListAnalytics",
    ()=>getListAnalytics,
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
    "updateShowNotes",
    ()=>updateShowNotes,
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
    // Check if already in list
    const { data: duplicate } = await supabase.from("list_items").select("id").eq("list_id", listId).eq("show_id", existingShow.id).single();
    if (duplicate) return;
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
async function updateShowNotes(listId, itemId, notes) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("list_items").update({
        notes: notes.trim() || null
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
    const isMalImport = parsed.name === "MyAnimeList Import";
    let animeTagId = null;
    if (isMalImport) {
        const { data: animeTag } = await supabase.from("tags").select("id").eq("is_default", true).ilike("name", "anime").maybeSingle();
        animeTagId = animeTag?.id ?? null;
    }
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
                const rating = typeof show.score === "number" && show.score >= 1 && show.score <= 10 ? show.score : null;
                const { error } = await supabase.from("list_items").insert({
                    list_id: myList.id,
                    show_id: dbShowId,
                    position,
                    rating
                });
                if (!error) {
                    if (animeTagId) {
                        // Best-effort: keep import resilient even if tag assignment fails.
                        await supabase.from("show_tags").insert({
                            user_id: user.id,
                            show_id: dbShowId,
                            tag_id: animeTagId
                        });
                    }
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
const EMPTY_ANALYTICS = {
    totalCount: 0,
    ratedCount: 0,
    avgRating: null,
    ratingCounts: Array.from({
        length: 10
    }, (_, i)=>({
            rating: i + 1,
            count: 0
        })),
    tagCounts: [],
    tagAvgRatings: [],
    monthlyAdded: [],
    decadeCounts: [],
    yearCounts: [],
    decadeAvgRatings: [],
    yearAvgRatings: [],
    showsByRating: {},
    showsByYear: {}
};
async function getListAnalytics(listId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    let resolvedListId;
    let ownerId;
    if (listId) {
        // Viewing someone else's (or own) list by explicit id
        const { data: listRow } = await supabase.from("lists").select("id, user_id, is_public").eq("id", listId).single();
        if (!listRow) return EMPTY_ANALYTICS;
        // Only allow access if public or owned by the logged-in user
        if (!listRow.is_public && listRow.user_id !== user?.id) return EMPTY_ANALYTICS;
        resolvedListId = listRow.id;
        ownerId = listRow.user_id;
    } else {
        if (!user) throw new Error("Unauthorized");
        const list = await getUserList(supabase, user.id);
        if (!list) return EMPTY_ANALYTICS;
        resolvedListId = list.id;
        ownerId = user.id;
    }
    const { data: rawItems } = await supabase.from("list_items").select("rating, show_id, added_at, shows(id, title, poster_path, first_air_date)").eq("list_id", resolvedListId);
    const items = rawItems ?? [];
    const totalCount = items.length;
    const ratedRows = items.filter((r)=>r.rating !== null);
    const ratedCount = ratedRows.length;
    const avgRating = ratedCount > 0 ? Math.round(ratedRows.reduce((s, r)=>s + r.rating, 0) / ratedCount * 10) / 10 : null;
    // Rating distribution
    const ratingMap = {};
    for(let r = 1; r <= 10; r++)ratingMap[r] = 0;
    for (const row of items){
        if (row.rating !== null) ratingMap[row.rating] = (ratingMap[row.rating] ?? 0) + 1;
    }
    const ratingCounts = Array.from({
        length: 10
    }, (_, i)=>({
            rating: i + 1,
            count: ratingMap[i + 1]
        }));
    // Tag distribution — use the list owner's tags
    const showIds = items.map((i)=>i.show_id);
    const tagCounts = [];
    const tagAvgRatings = [];
    if (showIds.length > 0) {
        const [{ data: showTagRows }, { data: tagDefs }] = await Promise.all([
            supabase.from("show_tags").select("tag_id, show_id").eq("user_id", ownerId).in("show_id", showIds),
            supabase.from("tags").select("id, name, color").or(`is_default.eq.true,user_id.eq.${ownerId}`)
        ]);
        const tagMap = new Map((tagDefs ?? []).map((t)=>[
                t.id,
                t
            ]));
        const showRatingMap = new Map(items.map((i)=>[
                i.show_id,
                i.rating
            ]));
        const tagCountMap = {};
        const tagRatingAcc = {};
        for (const row of showTagRows ?? []){
            const tag = tagMap.get(row.tag_id);
            if (!tag) continue;
            tagCountMap[row.tag_id] ??= {
                id: tag.id,
                name: tag.name,
                color: tag.color,
                count: 0
            };
            tagCountMap[row.tag_id].count++;
            const rating = showRatingMap.get(row.show_id);
            if (rating != null) {
                tagRatingAcc[row.tag_id] ??= {
                    id: tag.id,
                    name: tag.name,
                    color: tag.color,
                    sum: 0,
                    count: 0
                };
                tagRatingAcc[row.tag_id].sum += rating;
                tagRatingAcc[row.tag_id].count++;
            }
        }
        tagCounts.push(...Object.values(tagCountMap).sort((a, b)=>b.count - a.count));
        tagAvgRatings.push(...Object.values(tagRatingAcc).map((t)=>({
                id: t.id,
                name: t.name,
                color: t.color,
                avgRating: Math.round(t.sum / t.count * 10) / 10,
                count: t.count
            })).sort((a, b)=>b.avgRating - a.avgRating));
    }
    // Timeline: group by added_at month (YYYY-MM)
    const monthlyMap = {};
    for (const item of items){
        if (!item.added_at) continue;
        const month = item.added_at.slice(0, 7);
        monthlyMap[month] = (monthlyMap[month] ?? 0) + 1;
    }
    const monthlyAdded = Object.entries(monthlyMap).sort(([a], [b])=>a.localeCompare(b)).map(([month, count])=>({
            month,
            count
        }));
    // Decade distribution: group by decade of first_air_date
    const decadeMap = {};
    const yearCountMap = {};
    const decadeRatingAcc = {};
    const yearRatingAcc = {};
    for (const item of items){
        const firstAirDate = item.shows?.first_air_date;
        if (!firstAirDate) continue;
        const year = parseInt(firstAirDate.slice(0, 4), 10);
        if (isNaN(year) || year < 1900) continue;
        const decade = `${Math.floor(year / 10) * 10}s`;
        const yearStr = String(year);
        decadeMap[decade] = (decadeMap[decade] ?? 0) + 1;
        yearCountMap[yearStr] = (yearCountMap[yearStr] ?? 0) + 1;
        if (item.rating !== null) {
            decadeRatingAcc[decade] ??= {
                sum: 0,
                count: 0
            };
            decadeRatingAcc[decade].sum += item.rating;
            decadeRatingAcc[decade].count++;
            yearRatingAcc[yearStr] ??= {
                sum: 0,
                count: 0
            };
            yearRatingAcc[yearStr].sum += item.rating;
            yearRatingAcc[yearStr].count++;
        }
    }
    const decadeCounts = Object.entries(decadeMap).sort(([a], [b])=>a.localeCompare(b)).map(([decade, count])=>({
            decade,
            count
        }));
    const yearCounts = Object.entries(yearCountMap).sort(([a], [b])=>a.localeCompare(b)).map(([year, count])=>({
            year,
            count
        }));
    const decadeAvgRatings = Object.entries(decadeRatingAcc).sort(([a], [b])=>a.localeCompare(b)).map(([decade, { sum, count }])=>({
            decade,
            avgRating: Math.round(sum / count * 10) / 10
        }));
    const yearAvgRatings = Object.entries(yearRatingAcc).sort(([a], [b])=>a.localeCompare(b)).map(([year, { sum, count }])=>({
            year,
            avgRating: Math.round(sum / count * 10) / 10
        }));
    // Build show lookup maps for modal drill-through
    const showsByRating = {};
    const showsByYear = {};
    for (const item of items){
        const summary = {
            id: item.shows?.id ?? item.show_id,
            title: item.shows?.title ?? "",
            poster_path: item.shows?.poster_path ?? null,
            rating: item.rating,
            first_air_date: item.shows?.first_air_date ?? null
        };
        if (item.rating !== null) {
            showsByRating[item.rating] ??= [];
            showsByRating[item.rating].push(summary);
        }
        const fad = item.shows?.first_air_date;
        if (fad) {
            const y = parseInt(fad.slice(0, 4), 10);
            if (!isNaN(y) && y >= 1900) {
                const yr = String(y);
                showsByYear[yr] ??= [];
                showsByYear[yr].push(summary);
            }
        }
    }
    return {
        totalCount,
        ratedCount,
        avgRating,
        ratingCounts,
        tagCounts,
        tagAvgRatings,
        monthlyAdded,
        decadeCounts,
        yearCounts,
        decadeAvgRatings,
        yearAvgRatings,
        showsByRating,
        showsByYear
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
async function addTmdbShowToMyList(show) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const myList = await getUserList(supabase, user.id);
    if (!myList) throw new Error("List not found");
    // Find or create the show by tmdb_id
    let { data: existingShow } = await supabase.from("shows").select("id").eq("tmdb_id", show.tmdb_id).single();
    if (!existingShow) {
        const { data: newShow, error: showError } = await supabase.from("shows").insert({
            tmdb_id: show.tmdb_id,
            title: show.title,
            poster_path: show.poster_path,
            first_air_date: show.first_air_date,
            overview: show.overview
        }).select("id").single();
        if (showError) throw new Error(showError.message);
        existingShow = newShow;
    }
    // Check if already in list
    const { data: existing } = await supabase.from("list_items").select("id").eq("list_id", myList.id).eq("show_id", existingShow.id).single();
    if (existing) return {
        alreadyExists: true
    };
    const { data: items } = await supabase.from("list_items").select("position").eq("list_id", myList.id).order("position", {
        ascending: false
    }).limit(1);
    const nextPosition = (items?.[0]?.position ?? -1) + 1;
    const { error } = await supabase.from("list_items").insert({
        list_id: myList.id,
        show_id: existingShow.id,
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
    updateShowNotes,
    reorderListItems,
    importToMyList,
    getListAnalytics,
    getListItemsPage,
    addShowToMyList,
    addTmdbShowToMyList,
    copyListToMine
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateList, "60d17600e3a1151ee7dff4cd2451a4528d05d2f90c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addShowToList, "605f2435efda81dd08e525867f8dd51303d334564d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeShowFromList, "60500296d69c841163099142e2c7aa605ff7742051", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateShowRating, "70799100106412fb8a8f21e3ba730afee8596a92a7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateShowNotes, "701f91fa768c121e8e2aaa5337dc327d75aa3bc291", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(reorderListItems, "605c419b56fd315dcb68cfeb7a892d9b3822c401cd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(importToMyList, "40b8090c0cdf24303931698a900d141747fa612f10", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getListAnalytics, "40fe120f64dab30717c098ecfa2a30f52943210883", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getListItemsPage, "70d9b1319a732a2917cbfba85bbc0d424270f62b48", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addShowToMyList, "40a28c13a97e482f99f75f5981eded4d9dfadb2404", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addTmdbShowToMyList, "40896a8c2d5517f52724399b06d12b3c1a078c8d57", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(copyListToMine, "40fa8dcd5e3cf47ba1e824c96175aa20d3e0a8eb15", null);
}),
"[project]/.next-internal/server/app/[locale]/(app)/users/[username]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/.next-internal/server/app/[locale]/(app)/users/[username]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "401b0557fadc9e5b3c25bd473cdc965fc6d95aa4bf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unfollowUser"],
    "40a28c13a97e482f99f75f5981eded4d9dfadb2404",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addShowToMyList"],
    "40bbc9ce8487a3d31a6b3b60316f37cc379c620508",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["followUser"],
    "70d9b1319a732a2917cbfba85bbc0d424270f62b48",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getListItemsPage"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f28$app$292f$users$2f5b$username$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[locale]/(app)/users/[username]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_9813dca1._.js.map