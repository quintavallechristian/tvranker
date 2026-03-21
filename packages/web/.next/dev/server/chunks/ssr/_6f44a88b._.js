module.exports = [
"[project]/src/app/[locale]/(app)/rankings/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"009a2c5c52cffcc121bfd71aec94ea2dda7ec16106":"getTopRatedShows"},"",""] */ __turbopack_context__.s([
    "getTopRatedShows",
    ()=>getTopRatedShows
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getTopRatedShows() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // Get all public list IDs
    const { data: publicLists } = await supabase.from("lists").select("id").eq("is_public", true);
    if (!publicLists || publicLists.length === 0) return [];
    const publicListIds = publicLists.map((l)=>l.id);
    // Get all rated items from public lists
    const { data: items } = await supabase.from("list_items").select("show_id, rating").in("list_id", publicListIds).not("rating", "is", null);
    if (!items || items.length === 0) return [];
    // Aggregate: sum ratings and count per show
    const aggregates = new Map();
    for (const item of items){
        if (item.rating == null) continue;
        const existing = aggregates.get(item.show_id) ?? {
            sum: 0,
            count: 0
        };
        aggregates.set(item.show_id, {
            sum: existing.sum + item.rating,
            count: existing.count + 1
        });
    }
    // Require at least 2 votes to be included in the ranking
    const MIN_VOTES = 2;
    const ranked = Array.from(aggregates.entries()).filter(([, agg])=>agg.count >= MIN_VOTES).map(([showId, agg])=>({
            showId,
            avg: agg.sum / agg.count,
            count: agg.count
        })).sort((a, b)=>b.avg - a.avg || b.count - a.count).slice(0, 50);
    if (ranked.length === 0) return [];
    const showIds = ranked.map((r)=>r.showId);
    const { data: shows } = await supabase.from("shows").select("id, tmdb_id, title, poster_path, first_air_date, overview").in("id", showIds);
    if (!shows) return [];
    const showMap = new Map(shows.map((s)=>[
            s.id,
            s
        ]));
    return ranked.map((r)=>{
        const show = showMap.get(r.showId);
        if (!show) return null;
        return {
            id: show.id,
            tmdb_id: show.tmdb_id,
            title: show.title,
            poster_path: show.poster_path,
            first_air_date: show.first_air_date,
            overview: show.overview,
            avg_rating: Math.round(r.avg * 10) / 10,
            vote_count: r.count
        };
    }).filter((r)=>r !== null);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getTopRatedShows
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTopRatedShows, "009a2c5c52cffcc121bfd71aec94ea2dda7ec16106", null);
}),
"[project]/.next-internal/server/app/[locale]/(app)/rankings/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/rankings/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$rankings$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/rankings/actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/[locale]/(app)/rankings/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/[locale]/(app)/rankings/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "009a2c5c52cffcc121bfd71aec94ea2dda7ec16106",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$rankings$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTopRatedShows"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f28$app$292f$rankings$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$rankings$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[locale]/(app)/rankings/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/[locale]/(app)/rankings/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$rankings$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/rankings/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_6f44a88b._.js.map