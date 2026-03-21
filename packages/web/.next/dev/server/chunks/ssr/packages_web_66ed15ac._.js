module.exports = [
"[project]/packages/web/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"007a996769763bf09b53a2f8eb1b8a31670e3379c0":"getFollowing","400bd16a58a58e16e8e184740c50ca3cbcc7d9fa04":"unfollowUser","40ed3c806216f68c6815da405ef9973cbb9d521785":"followUser"},"",""] */ __turbopack_context__.s([
    "followUser",
    ()=>followUser,
    "getFollowing",
    ()=>getFollowing,
    "unfollowUser",
    ()=>unfollowUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function followUser(followingId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    const { error } = await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", followingId);
    if (error) throw error;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/seguiti");
}
async function getFollowing() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const { computeListSimilarity } = await __turbopack_context__.A("[project]/packages/web/src/lib/similarity.ts [app-rsc] (ecmascript, async loader)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(followUser, "40ed3c806216f68c6815da405ef9973cbb9d521785", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(unfollowUser, "400bd16a58a58e16e8e184740c50ca3cbcc7d9fa04", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getFollowing, "007a996769763bf09b53a2f8eb1b8a31670e3379c0", null);
}),
"[project]/packages/web/.next-internal/server/app/[locale]/(app)/seguiti/page/actions.js { ACTIONS_MODULE0 => \"[project]/packages/web/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/packages/web/.next-internal/server/app/[locale]/(app)/seguiti/page/actions.js { ACTIONS_MODULE0 => \"[project]/packages/web/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "007a996769763bf09b53a2f8eb1b8a31670e3379c0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFollowing"],
    "400bd16a58a58e16e8e184740c50ca3cbcc7d9fa04",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unfollowUser"],
    "40ed3c806216f68c6815da405ef9973cbb9d521785",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["followUser"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f28$app$292f$seguiti$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/packages/web/.next-internal/server/app/[locale]/(app)/seguiti/page/actions.js { ACTIONS_MODULE0 => "[project]/packages/web/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=packages_web_66ed15ac._.js.map