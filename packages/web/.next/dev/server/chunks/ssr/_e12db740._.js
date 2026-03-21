module.exports = [
"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40a28c13a97e482f99f75f5981eded4d9dfadb2404":"addShowToMyList","40b8090c0cdf24303931698a900d141747fa612f10":"importToMyList","40fa8dcd5e3cf47ba1e824c96175aa20d3e0a8eb15":"copyListToMine","40fe120f64dab30717c098ecfa2a30f52943210883":"getListAnalytics","60500296d69c841163099142e2c7aa605ff7742051":"removeShowFromList","605c419b56fd315dcb68cfeb7a892d9b3822c401cd":"reorderListItems","605f2435efda81dd08e525867f8dd51303d334564d":"addShowToList","60d17600e3a1151ee7dff4cd2451a4528d05d2f90c":"updateList","701f91fa768c121e8e2aaa5337dc327d75aa3bc291":"updateShowNotes","70799100106412fb8a8f21e3ba730afee8596a92a7":"updateShowRating","70d9b1319a732a2917cbfba85bbc0d424270f62b48":"getListItemsPage"},"",""] */ __turbopack_context__.s([
    "addShowToList",
    ()=>addShowToList,
    "addShowToMyList",
    ()=>addShowToMyList,
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
    decadeCounts: []
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
    const { data: rawItems } = await supabase.from("list_items").select("rating, show_id, added_at, shows(first_air_date)").eq("list_id", resolvedListId);
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
    for (const item of items){
        const firstAirDate = item.shows?.first_air_date;
        if (!firstAirDate) continue;
        const year = parseInt(firstAirDate.slice(0, 4), 10);
        if (isNaN(year) || year < 1900) continue;
        const decade = `${Math.floor(year / 10) * 10}s`;
        decadeMap[decade] = (decadeMap[decade] ?? 0) + 1;
    }
    const decadeCounts = Object.entries(decadeMap).sort(([a], [b])=>a.localeCompare(b)).map(([decade, count])=>({
            decade,
            count
        }));
    return {
        totalCount,
        ratedCount,
        avgRating,
        ratingCounts,
        tagCounts,
        tagAvgRatings,
        monthlyAdded,
        decadeCounts
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
    updateShowNotes,
    reorderListItems,
    importToMyList,
    getListAnalytics,
    getListItemsPage,
    addShowToMyList,
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(copyListToMine, "40fa8dcd5e3cf47ba1e824c96175aa20d3e0a8eb15", null);
}),
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

/* __next_internal_action_entry_do_not_use__ [{"00013d22198e0917732ef4ee0783138d454c3f3c79":"getRecommendations","0027d96077220d72caf2f6c30f0adea6234f97de45":"getSimilarUsers","008f333da7a28ce9ead97137e25b61f15f0d1e1602":"getPopularShows"},"",""] */ __turbopack_context__.s([
    "getPopularShows",
    ()=>getPopularShows,
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
async function getPopularShows() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // Get all public list IDs
    const { data: publicLists } = await supabase.from("lists").select("id").eq("is_public", true);
    if (!publicLists || publicLists.length === 0) return [];
    const publicListIds = publicLists.map((l)=>l.id);
    // Get all items from public lists
    const { data: items } = await supabase.from("list_items").select("show_id").in("list_id", publicListIds);
    if (!items || items.length === 0) return [];
    // Count occurrences per show
    const countMap = new Map();
    for (const item of items){
        countMap.set(item.show_id, (countMap.get(item.show_id) ?? 0) + 1);
    }
    // Sort by count, take top 12
    const topEntries = Array.from(countMap.entries()).sort((a, b)=>b[1] - a[1]).slice(0, 12);
    const showIds = topEntries.map(([id])=>id);
    const { data: shows } = await supabase.from("shows").select("id, tmdb_id, title, poster_path, first_air_date, overview").in("id", showIds);
    if (!shows) return [];
    const showMap = new Map(shows.map((s)=>[
            s.id,
            s
        ]));
    return topEntries.map(([id, count])=>{
        const show = showMap.get(id);
        if (!show) return null;
        return {
            id: show.id,
            tmdb_id: show.tmdb_id,
            title: show.title,
            poster_path: show.poster_path,
            first_air_date: show.first_air_date,
            overview: show.overview,
            addedCount: count
        };
    }).filter((r)=>r !== null);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getSimilarUsers,
    getRecommendations,
    getPopularShows
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSimilarUsers, "0027d96077220d72caf2f6c30f0adea6234f97de45", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecommendations, "00013d22198e0917732ef4ee0783138d454c3f3c79", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPopularShows, "008f333da7a28ce9ead97137e25b61f15f0d1e1602", null);
}),
"[project]/src/app/[locale]/(app)/tags/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00c04e7aae9c811327d3f6f03c49e080008231d9c3":"getUserTags","4077628df55625cad8a43ead310e43b47d97bb6789":"deleteTag","408b42e4ff3b22d5ca1de542e2ee038ded847ae85e":"getShowTagIds","6047a68e29f9813fbbe64f95450ec562613b4d4092":"addTagToShow","608e9ea41197d7d7ace02c93d35d89052daba0afbf":"removeTagFromShow","60d8731241f7f02ef758fdd95e3f779b4382a6368e":"createTag","60ee9722e8b438a7bcf5e67d75c685afb94e3c6124":"updateTagColor"},"",""] */ __turbopack_context__.s([
    "addTagToShow",
    ()=>addTagToShow,
    "createTag",
    ()=>createTag,
    "deleteTag",
    ()=>deleteTag,
    "getShowTagIds",
    ()=>getShowTagIds,
    "getUserTags",
    ()=>getUserTags,
    "removeTagFromShow",
    ()=>removeTagFromShow,
    "updateTagColor",
    ()=>updateTagColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getUserTags() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("tags").select("*").order("is_default", {
        ascending: false
    }).order("name");
    if (error) throw new Error(error.message);
    // Filter to only default + own (RLS also enforces this, but be explicit)
    return (data ?? []).filter((t)=>t.is_default || t.user_id === user?.id);
}
async function createTag(name, color = "slate") {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const trimmed = name.trim();
    if (!trimmed || trimmed.length > 50) throw new Error("Invalid tag name");
    const { data, error } = await supabase.from("tags").insert({
        user_id: user.id,
        name: trimmed,
        color,
        is_default: false
    }).select().single();
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/profile");
    return data;
}
async function updateTagColor(tagId, color) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("tags").update({
        color
    }).eq("id", tagId).eq("user_id", user.id).eq("is_default", false);
    if (error) throw new Error(error.message);
}
async function deleteTag(tagId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("tags").delete().eq("id", tagId).eq("user_id", user.id).eq("is_default", false);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/profile");
}
async function addTagToShow(showId, tagId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("show_tags").insert({
        user_id: user.id,
        show_id: showId,
        tag_id: tagId
    });
    // Ignore duplicate (already tagged)
    if (error && error.code !== "23505") throw new Error(error.message);
}
async function removeTagFromShow(showId, tagId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("show_tags").delete().eq("user_id", user.id).eq("show_id", showId).eq("tag_id", tagId);
    if (error) throw new Error(error.message);
}
async function getShowTagIds(showId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data } = await supabase.from("show_tags").select("tag_id").eq("user_id", user.id).eq("show_id", showId);
    return (data ?? []).map((r)=>r.tag_id);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getUserTags,
    createTag,
    updateTagColor,
    deleteTag,
    addTagToShow,
    removeTagFromShow,
    getShowTagIds
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserTags, "00c04e7aae9c811327d3f6f03c49e080008231d9c3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTag, "60d8731241f7f02ef758fdd95e3f779b4382a6368e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTagColor, "60ee9722e8b438a7bcf5e67d75c685afb94e3c6124", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTag, "4077628df55625cad8a43ead310e43b47d97bb6789", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addTagToShow, "6047a68e29f9813fbbe64f95450ec562613b4d4092", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeTagFromShow, "608e9ea41197d7d7ace02c93d35d89052daba0afbf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getShowTagIds, "408b42e4ff3b22d5ca1de542e2ee038ded847ae85e", null);
}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
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
        return updated2;
    }
    return updated;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchTmdbData
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchTmdbData, "409722b1e6e2facdc7051447d11177a4e821d718a5", null);
}),
"[project]/.next-internal/server/app/[locale]/(app)/lists/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/app/[locale]/(app)/tags/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/app/[locale]/(app)/shows/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/tags/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/shows/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/[locale]/(app)/lists/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/app/[locale]/(app)/tags/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/app/[locale]/(app)/shows/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00013d22198e0917732ef4ee0783138d454c3f3c79",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecommendations"],
    "0027d96077220d72caf2f6c30f0adea6234f97de45",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSimilarUsers"],
    "008f333da7a28ce9ead97137e25b61f15f0d1e1602",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPopularShows"],
    "409722b1e6e2facdc7051447d11177a4e821d718a5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchTmdbData"],
    "40a28c13a97e482f99f75f5981eded4d9dfadb2404",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addShowToMyList"],
    "40b8090c0cdf24303931698a900d141747fa612f10",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["importToMyList"],
    "40fa8dcd5e3cf47ba1e824c96175aa20d3e0a8eb15",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copyListToMine"],
    "40fe120f64dab30717c098ecfa2a30f52943210883",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getListAnalytics"],
    "6047a68e29f9813fbbe64f95450ec562613b4d4092",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addTagToShow"],
    "60500296d69c841163099142e2c7aa605ff7742051",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeShowFromList"],
    "605c419b56fd315dcb68cfeb7a892d9b3822c401cd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reorderListItems"],
    "605f2435efda81dd08e525867f8dd51303d334564d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addShowToList"],
    "608e9ea41197d7d7ace02c93d35d89052daba0afbf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeTagFromShow"],
    "60d17600e3a1151ee7dff4cd2451a4528d05d2f90c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateList"],
    "60d8731241f7f02ef758fdd95e3f779b4382a6368e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTag"],
    "701f91fa768c121e8e2aaa5337dc327d75aa3bc291",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateShowNotes"],
    "70799100106412fb8a8f21e3ba730afee8596a92a7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateShowRating"],
    "70d9b1319a732a2917cbfba85bbc0d424270f62b48",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getListItemsPage"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[locale]/(app)/lists/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/src/app/[locale]/(app)/tags/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/src/app/[locale]/(app)/shows/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/tags/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/shows/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_e12db740._.js.map