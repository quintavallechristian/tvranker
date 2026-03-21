(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/shared/src/lib/similarity.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    const commonShowIds = [];
    for (const showId of mapA.keys()){
        if (mapB.has(showId)) commonShowIds.push(showId);
    }
    if (commonShowIds.length === 0) return 0;
    const overlapRatio = commonShowIds.length / Math.min(listA.length, listB.length);
    let ratingSum = 0;
    let ratingCount = 0;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/src/lib/recommendations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scoreRecommendations",
    ()=>scoreRecommendations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/similarity.ts [app-client] (ecmascript)");
;
function scoreRecommendations(viewerList, otherLists, topK = 20, limit = 10) {
    if (viewerList.length === 0 || otherLists.length === 0) return [];
    const similarities = [];
    for (const other of otherLists){
        if (other.items.length === 0) continue;
        const sim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeListSimilarity"])(viewerList, other.items);
        if (sim > 0) similarities.push({
            userId: other.userId,
            similarity: sim
        });
    }
    similarities.sort((a, b)=>b.similarity - a.similarity);
    const neighbors = similarities.slice(0, topK);
    if (neighbors.length === 0) return [];
    const viewerShowIds = new Set(viewerList.map((e)=>e.showId));
    const listMap = new Map();
    for (const other of otherLists){
        listMap.set(other.userId, other.items);
    }
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
    const results = [];
    for (const [showId, { score, count }] of showScores){
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/src/lib/rating-labels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Default rating label names (index 0 = rating 1, index 9 = rating 10)
__turbopack_context__.s([
    "DEFAULT_RATING_LABELS",
    ()=>DEFAULT_RATING_LABELS,
    "getRatingLabel",
    ()=>getRatingLabel
]);
const DEFAULT_RATING_LABELS = [
    "Unwatchable",
    "Terrible",
    "Bad",
    "Poor",
    "Average",
    "Fine",
    "Good",
    "Great",
    "Excellent",
    "Masterpiece"
];
function getRatingLabel(rating, labels) {
    const l = labels && labels.length === 10 ? labels : DEFAULT_RATING_LABELS;
    return l[rating - 1] ?? DEFAULT_RATING_LABELS[rating - 1];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/src/lib/tag-colors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TAG_COLORS",
    ()=>TAG_COLORS,
    "TAG_COLOR_HEX",
    ()=>TAG_COLOR_HEX,
    "TAG_COLOR_LABEL",
    ()=>TAG_COLOR_LABEL,
    "tagDotColor",
    ()=>tagDotColor
]);
const TAG_COLORS = [
    "blue",
    "green",
    "pink",
    "yellow",
    "orange",
    "purple",
    "red",
    "teal",
    "indigo",
    "slate"
];
const TAG_COLOR_HEX = {
    blue: "#3B82F6",
    green: "#22C55E",
    pink: "#EC4899",
    yellow: "#EAB308",
    orange: "#F97316",
    purple: "#A855F7",
    red: "#EF4444",
    teal: "#14B8A6",
    indigo: "#6366F1",
    slate: "#64748B"
};
const TAG_COLOR_LABEL = {
    blue: "Blu",
    green: "Verde",
    pink: "Rosa",
    yellow: "Giallo",
    orange: "Arancione",
    purple: "Viola",
    red: "Rosso",
    teal: "Teal",
    indigo: "Indaco",
    slate: "Grigio"
};
function tagDotColor(color) {
    return TAG_COLOR_HEX[color] ?? TAG_COLOR_HEX.slate;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/src/lib/tmdb/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractTrailerUrl",
    ()=>extractTrailerUrl,
    "getPosterUrl",
    ()=>getPosterUrl
]);
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
function getPosterUrl(posterPath, size = "w342") {
    if (!posterPath) return null;
    return `${TMDB_IMAGE_BASE}/${size}${posterPath}`;
}
function extractTrailerUrl(videos) {
    if (!videos?.results?.length) return null;
    const yt = videos.results.filter((v)=>v.site === "YouTube");
    const trailer = yt.find((v)=>v.type === "Trailer" && v.official) ?? yt.find((v)=>v.type === "Trailer") ?? yt.find((v)=>v.type === "Teaser");
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/src/lib/import/trakt-parser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseTraktJson",
    ()=>parseTraktJson,
    "validateTraktJson",
    ()=>validateTraktJson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/index.js [app-client] (ecmascript)");
;
// Format A: Trakt.tv list export { name, shows: [...] }
const TraktShowSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
        imdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional(),
        tvdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number().optional()
    }).optional(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    uuid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional(),
    added_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional(),
    score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number().optional()
});
const TraktListSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional().default(""),
    is_public: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].boolean().optional().default(false),
    movies: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].unknown()).optional().default([]),
    shows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(TraktShowSchema)
});
// Format B: raw array of show objects (e.g. Serializd export)
// [ { uuid, id: { tvdb, imdb }, title, seasons, created_at, status } ]
const SerializdShowSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    uuid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional(),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
        tvdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number().optional(),
        imdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional()
    }).optional(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    seasons: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].unknown()).optional(),
    created_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional(),
    score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number().optional()
});
const SerializdArraySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(SerializdShowSchema);
_c = SerializdArraySchema;
function normalizeImdb(value) {
    if (!value || value === "-1" || value.trim() === "") return null;
    return value;
}
function parseTraktJson(input) {
    // Detect Format B: root is an array
    if (Array.isArray(input)) {
        const parsed = SerializdArraySchema.parse(input);
        return {
            name: "Imported Shows",
            description: "",
            is_public: false,
            shows: parsed.map((show)=>({
                    title: show.title,
                    imdb_id: normalizeImdb(show.id?.imdb),
                    score: show.score ?? null
                })),
            moviesSkipped: 0,
            seasonsSkipped: 0
        };
    }
    // Format A: Trakt list object
    const parsed = TraktListSchema.parse(input);
    return {
        name: parsed.name,
        description: parsed.description ?? "",
        is_public: parsed.is_public ?? false,
        shows: parsed.shows.map((show)=>({
                title: show.title,
                imdb_id: normalizeImdb(show.id?.imdb),
                score: show.score ?? null
            })),
        moviesSkipped: parsed.movies?.length ?? 0,
        seasonsSkipped: 0
    };
}
function validateTraktJson(input) {
    // Accept both formats
    if (Array.isArray(input)) {
        const result = SerializdArraySchema.safeParse(input);
        if (result.success) return {
            success: true
        };
        return {
            success: false,
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].prettifyError(result.error)
        };
    }
    const result = TraktListSchema.safeParse(input);
    if (result.success) {
        return {
            success: true
        };
    }
    return {
        success: false,
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].prettifyError(result.error)
    };
}
var _c;
__turbopack_context__.k.register(_c, "SerializdArraySchema");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/src/lib/import/mal-parser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractBaseTitle",
    ()=>extractBaseTitle,
    "parseMalXml",
    ()=>parseMalXml,
    "validateMalXml",
    ()=>validateMalXml
]);
function extractBaseTitle(title) {
    return title// FIRST: ": [The] [Nth|Final] Season [...]" — e.g. ": The Final Season - Kanketsu-hen"
    // Must run before the standalone pattern to avoid leaving ": The" as a suffix.
    .replace(/:\s+(?:The\s+)?(?:\d+(?:st|nd|rd|th)|Final|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth)\s+Season\b.*/i, "")// "Nth Season [...]" — e.g. "2nd Season", "Final Season", "Second Season"
    .replace(/\s+(?:\d+(?:st|nd|rd|th)|Final|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth)\s+Season\b.*/i, "")// "Season N [...]" — e.g. "Season 2", "Season 2: Subtitle"
    .replace(/\s+Season\s+\d+\b.*/i, "")// "Part N" at the end — e.g. "Part 2"
    .replace(/\s+Part\s+\d+\b.*/i, "").trim();
}
function parseMalXml(xmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "text/xml");
    const parseError = doc.querySelector("parsererror");
    if (parseError) {
        throw new Error("Invalid XML file");
    }
    const animeNodes = doc.querySelectorAll("anime");
    const shows = [];
    const seen = new Set();
    let moviesSkipped = 0;
    let seasonsSkipped = 0;
    animeNodes.forEach((node)=>{
        const status = node.querySelector("my_status")?.textContent?.trim() ?? "";
        // Only import completed and currently watching anime
        if (status !== "Completed" && status !== "Watching") return;
        const title = node.querySelector("series_title")?.textContent?.trim() ?? "";
        if (!title) return;
        // Skip movies — this is a TV series ranker
        const seriesType = node.querySelector("series_type")?.textContent?.trim() ?? "";
        if (seriesType === "Movie") {
            moviesSkipped++;
            return;
        }
        // Deduplicate by base title: skip later seasons when the base series is already seen
        const baseTitle = extractBaseTitle(title);
        if (seen.has(baseTitle.toLowerCase())) {
            seasonsSkipped++;
            return;
        }
        seen.add(baseTitle.toLowerCase());
        const rawScore = parseInt(node.querySelector("my_score")?.textContent?.trim() ?? "0", 10);
        shows.push({
            // Use the base title so TMDB lookup finds the canonical series name
            title: baseTitle,
            imdb_id: null,
            score: rawScore >= 1 && rawScore <= 10 ? rawScore : null
        });
    });
    return {
        name: "MyAnimeList Import",
        description: "",
        is_public: false,
        shows,
        moviesSkipped,
        seasonsSkipped
    };
}
function validateMalXml(xmlText) {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, "text/xml");
        const parseError = doc.querySelector("parsererror");
        if (parseError) {
            return {
                success: false,
                error: "Invalid XML file"
            };
        }
        const animeNodes = doc.querySelectorAll("anime");
        if (animeNodes.length === 0) {
            return {
                success: false,
                error: "No anime entries found in the XML file"
            };
        }
        return {
            success: true
        };
    } catch  {
        return {
            success: false,
            error: "Failed to parse XML file"
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/shared/src/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Similarity & recommendations
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/similarity.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$recommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/recommendations.ts [app-client] (ecmascript)");
// Rating labels
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/rating-labels.ts [app-client] (ecmascript)");
// Tag colors
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tag-colors.ts [app-client] (ecmascript)");
// TMDB types & utilities
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tmdb/types.ts [app-client] (ecmascript)");
// Import parsers
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$import$2f$trakt$2d$parser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/import/trakt-parser.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$import$2f$mal$2d$parser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/import/mal-parser.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/lib/tag-colors.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tagBadgeStyle",
    ()=>tagBadgeStyle
]);
// Re-export from shared package
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tag-colors.ts [app-client] (ecmascript)");
;
;
function tagBadgeStyle(color) {
    const hex = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAG_COLOR_HEX"][color] ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAG_COLOR_HEX"].slate;
    return {
        backgroundColor: `${hex}18`,
        borderColor: `${hex}50`,
        color: hex
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/ListHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ListHeader",
    ()=>ListHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Globe$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Globe.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$LockSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/LockSimple.es.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ListHeader({ description, isPublic, onDescriptionChange, onTogglePublic, readOnly = false, saveStatus }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("common");
    const tLists = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("lists");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold tracking-tight text-text-primary",
                        children: tLists("title")
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ListHeader.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    onTogglePublic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onTogglePublic,
                        className: `flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${isPublic ? "border-accent/30 bg-accent-muted text-accent" : "border-border bg-bg-surface text-text-muted"}`,
                        children: isPublic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Globe$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Globe"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/ListHeader.tsx",
                                    lineNumber: 45,
                                    columnNumber: 17
                                }, this),
                                " ",
                                t("public")
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$LockSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LockSimple"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/ListHeader.tsx",
                                    lineNumber: 49,
                                    columnNumber: 17
                                }, this),
                                " ",
                                t("private")
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ListHeader.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `flex items-center gap-1.5 text-xs ${isPublic ? "text-accent" : "text-text-muted"}`,
                        children: [
                            isPublic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Globe$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Globe"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/ListHeader.tsx",
                                lineNumber: 59,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$LockSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LockSimple"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/ListHeader.tsx",
                                lineNumber: 59,
                                columnNumber: 47
                            }, this),
                            isPublic ? t("public") : t("private")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/ListHeader.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    saveStatus && saveStatus !== "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `ml-1 text-xs transition-opacity ${saveStatus === "saving" ? "text-text-faint" : "text-text-muted"}`,
                        children: saveStatus === "saving" ? "Saving…" : "Saved"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ListHeader.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/ListHeader.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            readOnly ? description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-text-secondary",
                children: description
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/ListHeader.tsx",
                lineNumber: 78,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: description || "",
                onChange: (e)=>onDescriptionChange?.(e.target.value),
                className: "w-full bg-transparent text-sm text-text-secondary outline-none placeholder:text-text-faint",
                placeholder: "Add a description..."
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/ListHeader.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/ListHeader.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(ListHeader, "QXLGb17SjK2Z6fnReYnYLl1SPfM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c = ListHeader;
var _c;
__turbopack_context__.k.register(_c, "ListHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/lib/tmdb/client.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// Re-export types and utilities from shared
__turbopack_context__.s([
    "findByImdbId",
    ()=>findByImdbId,
    "getMovieDetails",
    ()=>getMovieDetails,
    "getSeasonDetails",
    ()=>getSeasonDetails,
    "getShowDetails",
    ()=>getShowDetails,
    "normalizeMovieAsShow",
    ()=>normalizeMovieAsShow,
    "searchMovies",
    ()=>searchMovies,
    "searchShows",
    ()=>searchShows
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-client] (ecmascript) <locals>");
;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
function getApiKey() {
    const key = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.TMDB_API_KEY;
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
    return tmdbFetch("/search/tv", {
        query,
        page: String(page),
        include_adult: "false"
    });
}
async function searchMovies(query, page = 1) {
    return tmdbFetch("/search/movie", {
        query,
        page: String(page),
        include_adult: "false"
    });
}
async function getShowDetails(tmdbId) {
    return tmdbFetch(`/tv/${tmdbId}`, {
        append_to_response: "videos,watch/providers"
    });
}
async function getMovieDetails(tmdbId) {
    return tmdbFetch(`/movie/${tmdbId}`, {
        append_to_response: "videos,watch/providers"
    });
}
function normalizeMovieAsShow(movie) {
    return {
        id: movie.id,
        name: movie.title,
        poster_path: movie.poster_path,
        first_air_date: movie.release_date,
        overview: movie.overview,
        vote_average: movie.vote_average,
        videos: movie.videos,
        "watch/providers": movie["watch/providers"],
        // No seasons for movies
        seasons: undefined
    };
}
async function getSeasonDetails(tmdbId, seasonNumber) {
    return tmdbFetch(`/tv/${tmdbId}/season/${seasonNumber}`);
}
async function findByImdbId(imdbId) {
    const result = await tmdbFetch(`/find/${imdbId}`, {
        external_source: "imdb_id"
    });
    return {
        show: result.tv_results[0] ?? null,
        movie: result.movie_results[0] ?? null
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/lib/rating-labels.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Re-export from shared package
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-client] (ecmascript) <locals>");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/ShowCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RatingBar",
    ()=>RatingBar,
    "ShowCard",
    ()=>ShowCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/tmdb/client.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tmdb/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Television.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/i18n/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/rating-labels.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/rating-labels.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function ShowCard({ title, posterPath, rating, position, onRatingChange, compact = false, showId, ratingLabels }) {
    const posterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPosterUrl"])(posterPath, compact ? "w185" : "w342");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-surface transition-colors hover:border-border-hover",
        children: [
            position !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] bg-bg-primary/80 text-xs font-mono font-bold text-text-primary tabular-nums backdrop-blur-sm",
                children: position
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative w-full ${compact ? "aspect-[2/3]" : "aspect-[2/3]"} bg-bg-elevated`,
                children: [
                    posterUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: posterUrl,
                        alt: title,
                        fill: true,
                        className: "object-cover",
                        sizes: compact ? "120px" : "200px"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                            size: 32,
                            className: "text-text-faint"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    onRatingChange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RatingBar, {
                            value: rating ?? null,
                            onChange: onRatingChange,
                            labels: ratingLabels,
                            className: "w-full p-2"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3",
                children: [
                    showId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                        href: `/shows/${showId}`,
                        className: "truncate text-sm font-medium text-text-primary hover:text-accent transition-colors block",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "truncate text-sm font-medium text-text-primary",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    rating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 font-mono text-xs text-accent tabular-nums",
                        children: [
                            rating,
                            "/10"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/ShowCard.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = ShowCard;
function RatingBar({ value, onChange, className = "", labels, fullWidth = false }) {
    _s();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const active = hovered ?? value;
    const label = active ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(active, labels) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center gap-2 ${className}`,
        children: [
            active && label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "hidden sm:inline whitespace-nowrap font-mono text-xs tabular-nums text-text-muted",
                children: [
                    active,
                    " · ",
                    label
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: fullWidth ? "grid grid-cols-10 w-full gap-1" : "flex gap-0.5 sm:gap-1",
                children: Array.from({
                    length: 10
                }, (_, i)=>i + 1).map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            onChange(n);
                        },
                        onMouseEnter: ()=>setHovered(n),
                        onMouseLeave: ()=>setHovered(null),
                        className: `${fullWidth ? "w-full aspect-square" : "size-4 sm:size-3.5"} rounded-full transition-colors ${active && n <= active ? "bg-accent" : "bg-text-faint/30 hover:bg-accent/50"}`,
                        "aria-label": `Rate ${n}`
                    }, n, false, {
                        fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/ShowCard.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/ShowCard.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
_s(RatingBar, "mEhKvegbaT+HE5gyL2KiZdVDWeQ=");
_c1 = RatingBar;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "ShowCard");
__turbopack_context__.k.register(_c1, "RatingBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/TagPicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TagPicker",
    ()=>TagPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Tag$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Tag.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Plus.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/X.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Check$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Check.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/tag-colors.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tag-colors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function TagPicker({ allTags, selectedTagIds, onAdd, onRemove, onCreateTag }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newTagName, setNewTagName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newTagColor, setNewTagColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("slate");
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TagPicker.useEffect": ()=>{
            if (!open) return;
            function handleClick(e) {
                if (containerRef.current && !containerRef.current.contains(e.target)) {
                    setOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClick);
            return ({
                "TagPicker.useEffect": ()=>document.removeEventListener("mousedown", handleClick)
            })["TagPicker.useEffect"];
        }
    }["TagPicker.useEffect"], [
        open
    ]);
    const selectedTags = allTags.filter((t)=>selectedTagIds.includes(t.id));
    function handleToggle(tag) {
        if (selectedTagIds.includes(tag.id)) {
            onRemove(tag.id);
        } else {
            onAdd(tag.id);
        }
    }
    function handleCreate(e) {
        e.preventDefault();
        const name = newTagName.trim();
        if (!name || isPending) return;
        startTransition(async ()=>{
            const newTag = await onCreateTag(name, newTagColor);
            setNewTagName("");
            setNewTagColor("slate");
            onAdd(newTag.id);
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative flex flex-wrap items-center gap-1",
        children: [
            selectedTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tagBadgeStyle"])(tag.color),
                    className: "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                            style: {
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagDotColor"])(tag.color)
                            }
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        tag.name,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: (e)=>{
                                e.stopPropagation();
                                onRemove(tag.id);
                            },
                            className: "opacity-60 hover:opacity-100",
                            "aria-label": `Remove tag ${tag.name}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                                size: 10,
                                weight: "bold"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    ]
                }, tag.id, true, {
                    fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: (e)=>{
                    e.stopPropagation();
                    setOpen((v)=>!v);
                },
                className: "inline-flex items-center gap-0.5 rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] text-text-faint transition-colors hover:border-border-hover hover:text-text-muted",
                "aria-label": "Manage tags",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Tag$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tag"], {
                        size: 10
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                        size: 8,
                        weight: "bold"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-full z-50 mt-1 w-56 max-w-[calc(100vw-2rem)] rounded-md border border-border bg-bg-surface shadow-lg",
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-48 overflow-y-auto p-1",
                        children: allTags.map((tag)=>{
                            const selected = selectedTagIds.includes(tag.id);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleToggle(tag),
                                className: "flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-xs transition-colors hover:bg-bg-elevated",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2 w-2 shrink-0 rounded-full",
                                        style: {
                                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagDotColor"])(tag.color)
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                                        lineNumber: 132,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1 truncate text-text-secondary",
                                        children: tag.name
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                                        lineNumber: 136,
                                        columnNumber: 19
                                    }, this),
                                    selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Check$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Check"], {
                                        size: 12,
                                        weight: "bold",
                                        style: {
                                            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagDotColor"])(tag.color)
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                                        lineNumber: 140,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, tag.id, true, {
                                fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                                lineNumber: 127,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 border-t border-border p-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1.5",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAG_COLORS"].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        title: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAG_COLOR_LABEL"][c],
                                        onClick: ()=>setNewTagColor(c),
                                        className: "h-4 w-4 rounded-full transition-transform hover:scale-110",
                                        style: {
                                            backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAG_COLOR_HEX"][c],
                                            outline: newTagColor === c ? `2px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAG_COLOR_HEX"][c]}` : "none",
                                            outlineOffset: "2px"
                                        }
                                    }, c, false, {
                                        fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleCreate,
                                className: "flex gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: newTagName,
                                        onChange: (e)=>setNewTagName(e.target.value),
                                        placeholder: "Nuovo tag...",
                                        maxLength: 50,
                                        className: "min-w-0 flex-1 rounded-[var(--radius-sm)] border border-border bg-bg-elevated px-2 py-1 text-xs text-text-primary placeholder:text-text-faint outline-none focus:border-accent"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: !newTagName.trim() || isPending,
                                        className: "rounded-[var(--radius-sm)] bg-accent px-2 py-1 text-xs font-medium text-bg-primary hover:bg-accent-hover disabled:opacity-40",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                                            size: 12,
                                            weight: "bold"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                                            lineNumber: 187,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/TagPicker.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/TagPicker.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(TagPicker, "SnNxULYvWYXNM7I9az/VPPbpRsU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = TagPicker;
var _c;
__turbopack_context__.k.register(_c, "TagPicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/ShowRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShowRow",
    ()=>ShowRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/tmdb/client.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tmdb/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$DotsSixVertical$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/DotsSixVertical.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Trash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Trash.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Television.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$PlusCircle$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/PlusCircle.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$NotePencil$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/NotePencil.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$ShowCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/ShowCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/i18n/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/rating-labels.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/rating-labels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$TagPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/TagPicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/tag-colors.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tag-colors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
function ShowRow({ id, title, posterPath, rating, position, onRatingChange, onRemove, readOnly = false, showId, ratingLabels, allTags, selectedTagIds, onTagAdd, onTagRemove, onTagCreate, onQuickAdd, quickAddLabel, notes, onNotesChange, openMobileRating, onMobileRatingChange }) {
    _s();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])({
        id,
        disabled: readOnly
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition
    };
    const [mobileRatingOpenLocal, setMobileRatingOpenLocal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mobileRatingOpen = openMobileRating !== undefined ? openMobileRating : mobileRatingOpenLocal;
    const setMobileRatingOpen = (open)=>{
        if (openMobileRating !== undefined) {
            onMobileRatingChange?.(open);
        } else {
            setMobileRatingOpenLocal(open);
        }
    };
    const [editingNote, setEditingNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [localNote, setLocalNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(notes ?? "");
    const noteInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleNoteBlur = ()=>{
        setEditingNote(false);
        if (onNotesChange) {
            onNotesChange(localNote);
        }
    };
    const handleNoteKeyDown = (e)=>{
        if (e.key === "Escape") {
            setLocalNote(notes ?? "");
            setEditingNote(false);
        }
    };
    const posterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPosterUrl"])(posterPath, "w92");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        className: `group rounded-md border border-border bg-bg-surface p-2.5 md:p-3 transition-colors hover:border-border-hover ${isDragging ? "opacity-50 shadow-lg" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 md:gap-3",
                children: [
                    !readOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        ...attributes,
                        ...listeners,
                        className: "cursor-grab touch-none text-text-faint hover:text-text-muted active:cursor-grabbing",
                        "aria-label": "Drag to reorder",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$DotsSixVertical$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DotsSixVertical"], {
                            size: 20,
                            weight: "bold"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-5 md:w-6 text-center font-mono text-xs font-bold text-text-muted tabular-nums",
                        children: position
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-12 w-8 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-bg-elevated",
                        children: posterUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: posterUrl,
                            alt: title,
                            fill: true,
                            className: "object-cover",
                            sizes: "32px"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                            lineNumber: 147,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-full items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                                size: 14,
                                className: "text-text-faint"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            showId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                href: `/shows/${showId}`,
                                className: "block truncate text-sm font-medium text-text-primary hover:text-accent transition-colors",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block truncate text-sm font-medium text-text-primary",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                lineNumber: 171,
                                columnNumber: 13
                            }, this),
                            selectedTagIds && selectedTagIds.length > 0 && allTags && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:hidden mt-1 flex items-center gap-1",
                                children: allTags.filter((t)=>selectedTagIds.includes(t.id)).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block h-2 w-2 shrink-0 rounded-full",
                                        style: {
                                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagDotColor"])(tag.color)
                                        },
                                        title: tag.name
                                    }, tag.id, false, {
                                        fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                        lineNumber: 182,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:block",
                                children: allTags && onTagAdd && onTagRemove && onTagCreate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$TagPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TagPicker"], {
                                        showId: showId ?? id,
                                        allTags: allTags,
                                        selectedTagIds: selectedTagIds ?? [],
                                        onAdd: onTagAdd,
                                        onRemove: onTagRemove,
                                        onCreateTag: onTagCreate
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                        lineNumber: 196,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this) : selectedTagIds && selectedTagIds.length > 0 && allTags ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 flex flex-wrap gap-1",
                                    children: allTags.filter((t)=>selectedTagIds.includes(t.id)).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tagBadgeStyle"])(tag.color),
                                            className: "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                                                    style: {
                                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagDotColor"])(tag.color)
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 23
                                                }, this),
                                                tag.name
                                            ]
                                        }, tag.id, true, {
                                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                            lineNumber: 210,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this) : null
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            (onNotesChange !== undefined || notes && notes.trim()) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1.5",
                                children: editingNote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ref: noteInputRef,
                                    autoFocus: true,
                                    value: localNote,
                                    onChange: (e)=>setLocalNote(e.target.value),
                                    onBlur: handleNoteBlur,
                                    onKeyDown: handleNoteKeyDown,
                                    placeholder: "Aggiungi una nota...",
                                    "aria-label": "Nota personale",
                                    rows: 2,
                                    className: "w-full resize-none bg-transparent text-xs text-text-secondary border-b border-dashed border-border focus:border-border-hover focus:outline-none placeholder:text-text-faint transition-colors leading-relaxed"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                    lineNumber: 230,
                                    columnNumber: 17
                                }, this) : localNote.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onNotesChange ? ()=>setEditingNote(true) : undefined,
                                    className: `flex items-start gap-1 text-left text-xs text-text-muted leading-relaxed line-clamp-2 ${onNotesChange ? "hover:text-text-secondary cursor-text transition-colors" : "cursor-default"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$NotePencil$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotePencil"], {
                                            size: 11,
                                            className: "mt-0.5 shrink-0 text-text-faint"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                            lineNumber: 253,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: localNote
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                            lineNumber: 257,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                    lineNumber: 243,
                                    columnNumber: 17
                                }, this) : onNotesChange ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setEditingNote(true),
                                    className: "flex items-center gap-1 text-xs text-text-faint transition-opacity hover:text-text-muted sm:opacity-0 sm:group-hover:opacity-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$NotePencil$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotePencil"], {
                                            size: 11
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                            lineNumber: 264,
                                            columnNumber: 19
                                        }, this),
                                        "Aggiungi una nota..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                    lineNumber: 260,
                                    columnNumber: 17
                                }, this) : null
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center gap-2 shrink-0",
                        children: onRatingChange ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$ShowCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RatingBar"], {
                            value: rating,
                            onChange: onRatingChange,
                            labels: ratingLabels
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                            lineNumber: 275,
                            columnNumber: 13
                        }, this) : rating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "whitespace-nowrap font-mono text-xs tabular-nums text-accent",
                            children: [
                                rating,
                                " · ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(rating, ratingLabels)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-text-faint",
                            children: "—"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                            lineNumber: 285,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                        lineNumber: 273,
                        columnNumber: 9
                    }, this),
                    onQuickAdd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onQuickAdd,
                        className: "rounded-[var(--radius-sm)] p-1.5 text-accent transition-colors hover:bg-accent/10 hover:text-accent-hover",
                        "aria-label": quickAddLabel || "Add to my list",
                        title: quickAddLabel || "Add to my list",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$PlusCircle$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlusCircle"], {
                            size: 18,
                            weight: "bold"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                            lineNumber: 297,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this),
                    onRemove && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onRemove,
                        className: "rounded-[var(--radius-sm)] p-1.5 text-text-faint transition-colors hover:bg-error/10 hover:text-error",
                        "aria-label": "Remove from list",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Trash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trash"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                            lineNumber: 308,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden mt-2 pl-7",
                children: onRatingChange ? mobileRatingOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$ShowCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RatingBar"], {
                    value: rating,
                    onChange: (n)=>{
                        onRatingChange(n);
                        setMobileRatingOpen(false);
                    },
                    labels: ratingLabels,
                    fullWidth: true
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                    lineNumber: 317,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setMobileRatingOpen(true),
                    className: "flex items-center gap-0.5",
                    "aria-label": rating ? `Voto: ${rating}/10. Tocca per cambiare.` : "Tocca per votare",
                    children: rating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs tabular-nums text-accent",
                        children: [
                            rating,
                            " · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(rating, ratingLabels)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                        lineNumber: 337,
                        columnNumber: 17
                    }, this) : Array.from({
                        length: 10
                    }, (_, i)=>i + 1).map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "size-4 rounded-full bg-text-faint/30"
                        }, n, false, {
                            fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                            lineNumber: 342,
                            columnNumber: 19
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                    lineNumber: 327,
                    columnNumber: 13
                }, this) : rating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono text-xs tabular-nums text-accent",
                    children: [
                        rating,
                        "/10 · ",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(rating, ratingLabels)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                    lineNumber: 351,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs text-text-faint",
                    children: "—"
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                    lineNumber: 355,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/ShowRow.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/ShowRow.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_s(ShowRow, "KthAk6zqNmmk0ErID3Qk+bz6iy4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
});
_c = ShowRow;
var _c;
__turbopack_context__.k.register(_c, "ShowRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/SearchInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchInput",
    ()=>SearchInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$MagnifyingGlass$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/MagnifyingGlass.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SearchInput({ placeholder, onSearch, debounceMs = 300, className = "" }) {
    _s();
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchInput.useEffect": ()=>{
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout({
                "SearchInput.useEffect": ()=>{
                    onSearch(value);
                }
            }["SearchInput.useEffect"], debounceMs);
            return ({
                "SearchInput.useEffect": ()=>{
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }
            })["SearchInput.useEffect"];
        }
    }["SearchInput.useEffect"], [
        value,
        debounceMs,
        onSearch
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$MagnifyingGlass$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MagnifyingGlass"], {
                size: 16,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/SearchInput.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "search",
                value: value,
                onChange: (e)=>setValue(e.target.value),
                placeholder: placeholder,
                className: "w-full rounded-md border border-border bg-bg-surface py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-faint transition-colors focus:border-accent focus:outline-none"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/SearchInput.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/SearchInput.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(SearchInput, "5f04A8aakEEjBtdQU0bmxuW/oWQ=");
_c = SearchInput;
var _c;
__turbopack_context__.k.register(_c, "SearchInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/AddShowDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddShowDialog",
    ()=>AddShowDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/tmdb/client.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tmdb/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SearchInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/SearchInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/X.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Plus.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Television.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/SpinnerGap.es.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function AddShowDialog({ open, onClose, onAdd, existingTmdbIds = [], scoreMap }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("shows");
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AddShowDialog.useCallback[handleSearch]": async (query)=>{
            if (query.length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const res = await fetch(`/api/tmdb/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data.results || []);
            } catch  {
                setResults([]);
            } finally{
                setLoading(false);
            }
        }
    }["AddShowDialog.useCallback[handleSearch]"], []);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-end sm:items-start justify-center bg-black/60 sm:pt-[10vh] backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full sm:mx-4 sm:max-w-lg rounded-t-[16px] sm:rounded-[var(--radius-lg)] border border-border bg-bg-surface max-h-[85vh] flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-border p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-sm font-semibold text-text-primary",
                            children: t("addShow")
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-text-muted hover:text-text-primary",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SearchInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchInput"], {
                        placeholder: t("searchShows"),
                        onSearch: handleSearch,
                        debounceMs: 400
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto",
                    children: [
                        loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center py-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpinnerGap"], {
                                size: 24,
                                className: "animate-spin text-text-muted"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this),
                        !loading && results.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-8 text-center text-sm text-text-muted",
                            children: t("searchShows")
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        !loading && results.map((show)=>{
                            const isAdded = existingTmdbIds.includes(show.tmdb_id);
                            const posterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPosterUrl"])(show.poster_path, "w92");
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>!isAdded && onAdd(show),
                                disabled: isAdded,
                                className: "flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-bg-surface-hover disabled:opacity-40",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative h-14 w-10 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-bg-elevated",
                                        children: posterUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: posterUrl,
                                            alt: show.title,
                                            fill: true,
                                            className: "object-cover",
                                            sizes: "40px"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                            lineNumber: 109,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                                                size: 14,
                                                className: "text-text-faint"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                                lineNumber: 118,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                            lineNumber: 117,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                        lineNumber: 107,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "truncate text-sm font-medium text-text-primary",
                                                children: show.title
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                                lineNumber: 124,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-text-muted",
                                                children: show.first_air_date?.slice(0, 4) || "Unknown"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                                lineNumber: 127,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                        lineNumber: 123,
                                        columnNumber: 19
                                    }, this),
                                    scoreMap?.has(show.tmdb_id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "shrink-0 rounded-[var(--radius-sm)] bg-accent-muted border border-accent/30 px-1.5 py-0.5 text-xs font-mono font-semibold text-accent tabular-nums",
                                        children: [
                                            scoreMap.get(show.tmdb_id),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                        lineNumber: 133,
                                        columnNumber: 21
                                    }, this),
                                    isAdded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-text-muted",
                                        children: "Added"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                        lineNumber: 139,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                                        size: 16,
                                        className: "shrink-0 text-accent"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                        lineNumber: 141,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, show.tmdb_id, true, {
                                fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                                lineNumber: 101,
                                columnNumber: 17
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/AddShowDialog.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(AddShowDialog, "RlU+UAj8gJb95XIfz4tiP6Ewito=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c = AddShowDialog;
var _c;
__turbopack_context__.k.register(_c, "AddShowDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/EmptyState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyState",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$ssr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/ssr/Television.es.js [app-client] (ecmascript)");
;
;
function EmptyState({ title, description, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center py-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-bg-surface",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$ssr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                    size: 24,
                    className: "text-text-faint"
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/EmptyState.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/EmptyState.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-medium text-text-secondary",
                children: title
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/EmptyState.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-xs text-text-muted",
                children: description
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/EmptyState.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: action
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/EmptyState.tsx",
                lineNumber: 19,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/EmptyState.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = EmptyState;
var _c;
__turbopack_context__.k.register(_c, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/components/ImportDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImportDialog",
    ()=>ImportDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$UploadSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/UploadSimple.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/X.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileText$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/FileText.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/SpinnerGap.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ArrowLeft$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/ArrowLeft.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$TelevisionSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/TelevisionSimple.es.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ImportDialog({ open, onClose, onImport }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("import");
    const [service, setService] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const resetState = ()=>{
        setService(null);
        setFile(null);
        setPreview(null);
        setError(null);
        setLoading(false);
    };
    const handleClose = ()=>{
        resetState();
        onClose();
    };
    const handleBack = ()=>{
        setFile(null);
        setPreview(null);
        setError(null);
        setService(null);
    };
    const handleFileSelectTvTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImportDialog.useCallback[handleFileSelectTvTime]": async (selectedFile)=>{
            setError(null);
            try {
                const text = await selectedFile.text();
                const json = JSON.parse(text);
                const isFormatA = json && !Array.isArray(json) && Array.isArray(json.shows);
                const isFormatB = Array.isArray(json) && json.length > 0 && json[0]?.title;
                if (!isFormatA && !isFormatB) {
                    setError(t("invalidFormatJson"));
                    return;
                }
                setFile(selectedFile);
                const moviesSkipped = isFormatA ? json.movies?.length ?? 0 : 0;
                setPreview({
                    name: isFormatA ? json.name || selectedFile.name : selectedFile.name,
                    showCount: isFormatA ? json.shows.length : json.length,
                    moviesSkipped,
                    seasonsSkipped: 0
                });
            } catch  {
                setError(t("invalidFormatJson"));
            }
        }
    }["ImportDialog.useCallback[handleFileSelectTvTime]"], [
        t
    ]);
    const handleFileSelectMal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImportDialog.useCallback[handleFileSelectMal]": async (selectedFile)=>{
            setError(null);
            try {
                const text = await selectedFile.text();
                const { parseMalXml } = await __turbopack_context__.A("[project]/packages/web/src/lib/import/mal-parser.ts [app-client] (ecmascript, async loader)");
                const parsed = parseMalXml(text);
                setFile(selectedFile);
                setPreview({
                    name: selectedFile.name,
                    showCount: parsed.shows.length,
                    moviesSkipped: parsed.moviesSkipped,
                    seasonsSkipped: parsed.seasonsSkipped
                });
            } catch  {
                setError(t("invalidFormatXml"));
            }
        }
    }["ImportDialog.useCallback[handleFileSelectMal]"], [
        t
    ]);
    const handleImport = async ()=>{
        if (!file) return;
        setLoading(true);
        setError(null);
        try {
            if (service === "mal") {
                const text = await file.text();
                const { parseMalXml } = await __turbopack_context__.A("[project]/packages/web/src/lib/import/mal-parser.ts [app-client] (ecmascript, async loader)");
                const parsed = parseMalXml(text);
                // Keep MAL imports identifiable on the server side.
                const asJson = {
                    name: parsed.name,
                    description: parsed.description,
                    is_public: parsed.is_public,
                    shows: parsed.shows.map((s)=>({
                            title: s.title,
                            id: s.imdb_id ? {
                                imdb: s.imdb_id
                            } : undefined,
                            score: s.score ?? undefined
                        }))
                };
                await onImport(asJson);
            } else {
                const text = await file.text();
                const json = JSON.parse(text);
                await onImport(json);
            }
            handleClose();
        } catch  {
            setError(t("error"));
        } finally{
            setLoading(false);
        }
    };
    if (!open) return null;
    // ── Service picker step ──
    if (!service) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full sm:mx-4 sm:max-w-md rounded-t-[16px] sm:rounded-[var(--radius-lg)] border border-border bg-bg-surface p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClose,
                        className: "absolute right-4 top-4 text-text-muted hover:text-text-primary",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-1 text-lg font-semibold text-text-primary",
                        children: t("title")
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-6 text-sm text-text-secondary",
                        children: t("chooseService")
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setService("tvtime"),
                                className: "flex items-center gap-4 rounded-md border border-border p-4 text-left transition-colors hover:border-border-hover hover:bg-bg-surface-hover",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-10 w-10 items-center justify-center rounded-md bg-[#FFD12A]/10 text-[#FFD12A]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$TelevisionSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TelevisionSimple"], {
                                            size: 22,
                                            weight: "duotone"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-text-primary",
                                                children: "TV Time"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                                lineNumber: 175,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-text-secondary",
                                                children: t("tvtimeDesc")
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                                lineNumber: 176,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setService("mal"),
                                className: "flex items-center gap-4 rounded-md border border-border p-4 text-left transition-colors hover:border-border-hover hover:bg-bg-surface-hover",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-10 w-10 items-center justify-center rounded-md bg-[#2E51A2]/10 text-[#2E51A2]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base font-bold",
                                            children: "MAL"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-text-primary",
                                                children: "MyAnimeList"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                                lineNumber: 188,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-text-secondary",
                                                children: t("malDesc")
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                                lineNumber: 191,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                        lineNumber: 187,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                lineNumber: 151,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
            lineNumber: 150,
            columnNumber: 7
        }, this);
    }
    // ── File upload step ──
    const isMal = service === "mal";
    const fileAccept = isMal ? ".xml" : ".json";
    const handleFileSelect = isMal ? handleFileSelectMal : handleFileSelectTvTime;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full sm:mx-4 sm:max-w-md rounded-t-[16px] sm:rounded-[var(--radius-lg)] border border-border bg-bg-surface p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleBack,
                    className: "absolute left-4 top-4 text-text-muted hover:text-text-primary",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ArrowLeft$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowLeft"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleClose,
                    className: "absolute right-4 top-4 text-text-muted hover:text-text-primary",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "mb-1 text-lg font-semibold text-text-primary",
                    children: isMal ? t("malTitle") : t("tvtimeTitle")
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-6 text-sm text-text-secondary",
                    children: isMal ? t("malDescription") : t("tvtimeDescription")
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: ()=>fileInputRef.current?.click(),
                    className: "flex cursor-pointer flex-col items-center gap-2 rounded-md border-2 border-dashed border-border p-8 transition-colors hover:border-border-hover hover:bg-bg-surface-hover",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$UploadSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadSimple"], {
                            size: 28,
                            className: "text-text-muted"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-text-secondary",
                            children: isMal ? t("selectFileXml") : t("selectFileJson")
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: fileInputRef,
                            type: "file",
                            accept: fileAccept,
                            className: "hidden",
                            onChange: (e)=>{
                                const f = e.target.files?.[0];
                                if (f) handleFileSelect(f);
                            }
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, this),
                preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex items-center gap-3 rounded-md border border-border bg-bg-elevated p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileText$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileText"], {
                            size: 20,
                            className: "text-accent"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-text-primary",
                                    children: preview.name
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                    lineNumber: 257,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-text-secondary",
                                    children: [
                                        t("previewShows", {
                                            count: preview.showCount
                                        }),
                                        preview.moviesSkipped > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-text-muted",
                                            children: [
                                                "· ",
                                                t("moviesSkipped", {
                                                    count: preview.moviesSkipped
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                            lineNumber: 263,
                                            columnNumber: 19
                                        }, this),
                                        preview.seasonsSkipped > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-text-muted",
                                            children: [
                                                "· ",
                                                t("seasonsSkipped", {
                                                    count: preview.seasonsSkipped
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                            lineNumber: 268,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                    lineNumber: 254,
                    columnNumber: 11
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-3 text-xs text-error",
                    role: "alert",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                    lineNumber: 279,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex justify-end gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleClose,
                            className: "rounded-md px-4 py-2 text-sm text-text-secondary hover:text-text-primary",
                            children: t("cancel")
                        }, void 0, false, {
                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                            lineNumber: 286,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleImport,
                            disabled: !file || loading,
                            className: "flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg-primary transition-colors hover:bg-accent-hover disabled:opacity-50",
                            children: [
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpinnerGap"], {
                                    size: 14,
                                    className: "animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                                    lineNumber: 297,
                                    columnNumber: 25
                                }, this),
                                loading ? t("importing") : t("importButton", {
                                    count: preview?.showCount ?? 0
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                            lineNumber: 292,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
                    lineNumber: 285,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
            lineNumber: 207,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/ImportDialog.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
_s(ImportDialog, "+7Jk1Byur7gEwUYYppQPHTqchVc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c = ImportDialog;
var _c;
__turbopack_context__.k.register(_c, "ImportDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/app/[locale]/(app)/rankings/data:35933d [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTopRatedShows",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"00c8c8ab8a823c3be254589922a5a74281b2e9d91c":"getTopRatedShows"},"packages/web/src/app/[locale]/(app)/rankings/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("00c8c8ab8a823c3be254589922a5a74281b2e9d91c", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getTopRatedShows");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuXG5leHBvcnQgdHlwZSBUb3BSYXRlZFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIGF2Z19yYXRpbmc6IG51bWJlcjtcbiAgdm90ZV9jb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRvcFJhdGVkU2hvd3MoKTogUHJvbWlzZTxUb3BSYXRlZFNob3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuXG4gIC8vIEdldCBhbGwgcHVibGljIGxpc3QgSURzXG4gIGNvbnN0IHsgZGF0YTogcHVibGljTGlzdHMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlzX3B1YmxpY1wiLCB0cnVlKTtcblxuICBpZiAoIXB1YmxpY0xpc3RzIHx8IHB1YmxpY0xpc3RzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHB1YmxpY0xpc3RJZHMgPSBwdWJsaWNMaXN0cy5tYXAoKGwpID0+IGwuaWQpO1xuXG4gIC8vIEdldCBhbGwgcmF0ZWQgaXRlbXMgZnJvbSBwdWJsaWMgbGlzdHNcbiAgY29uc3QgeyBkYXRhOiBpdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nXCIpXG4gICAgLmluKFwibGlzdF9pZFwiLCBwdWJsaWNMaXN0SWRzKVxuICAgIC5ub3QoXCJyYXRpbmdcIiwgXCJpc1wiLCBudWxsKTtcblxuICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIC8vIEFnZ3JlZ2F0ZTogc3VtIHJhdGluZ3MgYW5kIGNvdW50IHBlciBzaG93XG4gIGNvbnN0IGFnZ3JlZ2F0ZXMgPSBuZXcgTWFwPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBpZiAoaXRlbS5yYXRpbmcgPT0gbnVsbCkgY29udGludWU7XG4gICAgY29uc3QgZXhpc3RpbmcgPSBhZ2dyZWdhdGVzLmdldChpdGVtLnNob3dfaWQpID8/IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgIGFnZ3JlZ2F0ZXMuc2V0KGl0ZW0uc2hvd19pZCwge1xuICAgICAgc3VtOiBleGlzdGluZy5zdW0gKyBpdGVtLnJhdGluZyxcbiAgICAgIGNvdW50OiBleGlzdGluZy5jb3VudCArIDEsXG4gICAgfSk7XG4gIH1cblxuICAvLyBSZXF1aXJlIGF0IGxlYXN0IDIgdm90ZXMgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIHJhbmtpbmdcbiAgY29uc3QgTUlOX1ZPVEVTID0gMjtcbiAgY29uc3QgcmFua2VkID0gQXJyYXkuZnJvbShhZ2dyZWdhdGVzLmVudHJpZXMoKSlcbiAgICAuZmlsdGVyKChbLCBhZ2ddKSA9PiBhZ2cuY291bnQgPj0gTUlOX1ZPVEVTKVxuICAgIC5tYXAoKFtzaG93SWQsIGFnZ10pID0+ICh7XG4gICAgICBzaG93SWQsXG4gICAgICBhdmc6IGFnZy5zdW0gLyBhZ2cuY291bnQsXG4gICAgICBjb3VudDogYWdnLmNvdW50LFxuICAgIH0pKVxuICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2ZyAtIGEuYXZnIHx8IGIuY291bnQgLSBhLmNvdW50KVxuICAgIC5zbGljZSgwLCA1MCk7XG5cbiAgaWYgKHJhbmtlZC5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBzaG93SWRzID0gcmFua2VkLm1hcCgocikgPT4gci5zaG93SWQpO1xuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHJhbmtlZFxuICAgIC5tYXAoKHIpID0+IHtcbiAgICAgIGNvbnN0IHNob3cgPSBzaG93TWFwLmdldChyLnNob3dJZCk7XG4gICAgICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHNob3cuaWQsXG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICAgIGF2Z19yYXRpbmc6IE1hdGgucm91bmQoci5hdmcgKiAxMCkgLyAxMCxcbiAgICAgICAgdm90ZV9jb3VudDogci5jb3VudCxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZmlsdGVyKChyKTogciBpcyBUb3BSYXRlZFNob3cgPT4gciAhPT0gbnVsbCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRUQWVzQiw2TEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/explore/data:c03a3a [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPopularShows",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"002a8f726f568507c58a270619d7a92c63dbe4a5c5":"getPopularShows"},"packages/web/src/app/[locale]/(app)/explore/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("002a8f726f568507c58a270619d7a92c63dbe4a5c5", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getPopularShows");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgc2NvcmVSZWNvbW1lbmRhdGlvbnMsIHR5cGUgVXNlckxpc3QgfSBmcm9tIFwiQC9saWIvcmVjb21tZW5kYXRpb25zXCI7XG5pbXBvcnQgeyBjb21wdXRlTGlzdFNpbWlsYXJpdHksIHR5cGUgTGlzdEVudHJ5IH0gZnJvbSBcIkAvbGliL3NpbWlsYXJpdHlcIjtcblxuZXhwb3J0IHR5cGUgU2ltaWxhclVzZXIgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGF2YXRhcl91cmw6IHN0cmluZyB8IG51bGw7XG4gIHNob3dfY291bnQ6IG51bWJlcjtcbiAgc2ltaWxhcml0eTogbnVtYmVyO1xuICBpc19mb2xsb3dpbmc6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2ltaWxhclVzZXJzKCk6IFByb21pc2U8U2ltaWxhclVzZXJbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgaXRlbXNcbiAgY29uc3QgeyBkYXRhOiBteUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFteUxpc3QpIHJldHVybiBbXTtcblxuICBjb25zdCB7IGRhdGE6IG15SXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoIW15SXRlbXMgfHwgbXlJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCB2aWV3ZXJMaXN0OiBMaXN0RW50cnlbXSA9IG15SXRlbXMubWFwKChpLCBpZHgpID0+ICh7XG4gICAgc2hvd0lkOiBpLnNob3dfaWQsXG4gICAgcmF0aW5nOiBpLnJhdGluZyxcbiAgICBwb3NpdGlvbjogaS5wb3NpdGlvbiA/PyBpZHgsXG4gIH0pKTtcblxuICAvLyBGZXRjaCBhbGwgcHVibGljIGxpc3RzIChleGNsdWRpbmcgc2VsZikgd2l0aCBwcm9maWxlIGluZm9cbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBwcm9maWxlcyhpZCwgdXNlcm5hbWUsIGF2YXRhcl91cmwpXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZm9yIHRob3NlIGxpc3RzIGluIG9uZSBiYXRjaFxuICBjb25zdCB7IGRhdGE6IGFsbEl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJsaXN0X2lkLCBzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uXCIpXG4gICAgLmluKFwibGlzdF9pZFwiLCBsaXN0SWRzKTtcblxuICBpZiAoIWFsbEl0ZW1zKSByZXR1cm4gW107XG5cbiAgLy8gR3JvdXAgaXRlbXMgYnkgbGlzdF9pZFxuICBjb25zdCBpdGVtc0J5TGlzdCA9IG5ldyBNYXA8c3RyaW5nLCBMaXN0RW50cnlbXT4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGFsbEl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtc0J5TGlzdC5oYXMoaXRlbS5saXN0X2lkKSkgaXRlbXNCeUxpc3Quc2V0KGl0ZW0ubGlzdF9pZCwgW10pO1xuICAgIGl0ZW1zQnlMaXN0LmdldChpdGVtLmxpc3RfaWQpIS5wdXNoKHtcbiAgICAgIHNob3dJZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ2hlY2sgd2hvIHRoZSBjdXJyZW50IHVzZXIgaXMgYWxyZWFkeSBmb2xsb3dpbmdcbiAgY29uc3QgeyBkYXRhOiBmb2xsb3dzRGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuc2VsZWN0KFwiZm9sbG93aW5nX2lkXCIpXG4gICAgLmVxKFwiZm9sbG93ZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgY29uc3QgZm9sbG93aW5nSWRzID0gbmV3IFNldCgoZm9sbG93c0RhdGEgPz8gW10pLm1hcCgoZikgPT4gZi5mb2xsb3dpbmdfaWQpKTtcblxuICAvLyBDb21wdXRlIHNpbWlsYXJpdHkgZm9yIGVhY2ggdXNlclxuICBjb25zdCByZXN1bHRzOiBTaW1pbGFyVXNlcltdID0gW107XG5cbiAgZm9yIChjb25zdCBsaXN0IG9mIHB1YmxpY0xpc3RzKSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IEFycmF5LmlzQXJyYXkobGlzdC5wcm9maWxlcylcbiAgICAgID8gbGlzdC5wcm9maWxlc1swXVxuICAgICAgOiBsaXN0LnByb2ZpbGVzO1xuICAgIGlmICghcHJvZmlsZSkgY29udGludWU7XG5cbiAgICBjb25zdCBvdGhlckl0ZW1zID0gaXRlbXNCeUxpc3QuZ2V0KGxpc3QuaWQpID8/IFtdO1xuICAgIGlmIChvdGhlckl0ZW1zLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG5cbiAgICBjb25zdCBzaW1pbGFyaXR5ID0gY29tcHV0ZUxpc3RTaW1pbGFyaXR5KHZpZXdlckxpc3QsIG90aGVySXRlbXMpO1xuICAgIGlmIChzaW1pbGFyaXR5ID09PSAwKSBjb250aW51ZTtcblxuICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICBpZDogcHJvZmlsZS5pZCxcbiAgICAgIHVzZXJuYW1lOiBwcm9maWxlLnVzZXJuYW1lLFxuICAgICAgYXZhdGFyX3VybDogcHJvZmlsZS5hdmF0YXJfdXJsLFxuICAgICAgc2hvd19jb3VudDogb3RoZXJJdGVtcy5sZW5ndGgsXG4gICAgICBzaW1pbGFyaXR5LFxuICAgICAgaXNfZm9sbG93aW5nOiBmb2xsb3dpbmdJZHMuaGFzKHByb2ZpbGUuaWQpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU29ydCBieSBzaW1pbGFyaXR5IGRlc2NlbmRpbmcsIHJldHVybiB0b3AgM1xuICByZXR1cm4gcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBiLnNpbWlsYXJpdHkgLSBhLnNpbWlsYXJpdHkpLnNsaWNlKDAsIDMpO1xufVxuXG5leHBvcnQgdHlwZSBSZWNvbW1lbmRlZFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIHNjb3JlOiBudW1iZXI7XG4gIHJlY29tbWVuZGVkQnk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWNvbW1lbmRhdGlvbnMoKTogUHJvbWlzZTxSZWNvbW1lbmRlZFNob3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gMS4gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgKyBpdGVtc1xuICBjb25zdCB7IGRhdGE6IG15TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIW15TGlzdCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YTogbXlJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmICghbXlJdGVtcyB8fCBteUl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHZpZXdlckxpc3Q6IExpc3RFbnRyeVtdID0gbXlJdGVtcy5tYXAoKGksIGlkeCkgPT4gKHtcbiAgICBzaG93SWQ6IGkuc2hvd19pZCxcbiAgICByYXRpbmc6IGkucmF0aW5nLFxuICAgIHBvc2l0aW9uOiBpLnBvc2l0aW9uID8/IGlkeCxcbiAgfSkpO1xuXG4gIC8vIDIuIEZldGNoIGFsbCBvdGhlciBwdWJsaWMgbGlzdHMgd2l0aCB0aGVpciBpdGVtcyBpbiBvbmUgcXVlcnlcbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgbGlzdCBpdGVtcyBmb3IgdGhvc2UgbGlzdHMgaW4gb25lIGJhdGNoXG4gIGNvbnN0IHsgZGF0YTogYWxsSXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImxpc3RfaWQsIHNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIGxpc3RJZHMpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSk7XG5cbiAgaWYgKCFhbGxJdGVtcyB8fCBhbGxJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyAzLiBHcm91cCBpdGVtcyBieSB1c2VyXG4gIGNvbnN0IGxpc3RUb1VzZXIgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGwgb2YgcHVibGljTGlzdHMpIHtcbiAgICBsaXN0VG9Vc2VyLnNldChsLmlkLCBsLnVzZXJfaWQpO1xuICB9XG5cbiAgY29uc3QgdXNlckl0ZW1zTWFwID0gbmV3IE1hcDxzdHJpbmcsIExpc3RFbnRyeVtdPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgYWxsSXRlbXMpIHtcbiAgICBjb25zdCB1c2VySWQgPSBsaXN0VG9Vc2VyLmdldChpdGVtLmxpc3RfaWQpO1xuICAgIGlmICghdXNlcklkKSBjb250aW51ZTtcbiAgICBpZiAoIXVzZXJJdGVtc01hcC5oYXModXNlcklkKSkgdXNlckl0ZW1zTWFwLnNldCh1c2VySWQsIFtdKTtcbiAgICB1c2VySXRlbXNNYXAuZ2V0KHVzZXJJZCkhLnB1c2goe1xuICAgICAgc2hvd0lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBvdGhlckxpc3RzOiBVc2VyTGlzdFtdID0gW107XG4gIGZvciAoY29uc3QgW3VzZXJJZCwgaXRlbXNdIG9mIHVzZXJJdGVtc01hcCkge1xuICAgIG90aGVyTGlzdHMucHVzaCh7IHVzZXJJZCwgaXRlbXMgfSk7XG4gIH1cblxuICAvLyA0LiBSdW4gc2NvcmluZyBhbGdvcml0aG1cbiAgY29uc3Qgc2NvcmVkID0gc2NvcmVSZWNvbW1lbmRhdGlvbnModmlld2VyTGlzdCwgb3RoZXJMaXN0cyk7XG5cbiAgaWYgKHNjb3JlZC5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyA1LiBGZXRjaCBzaG93IG1ldGFkYXRhIGZvciByZWNvbW1lbmRlZCBzaG93c1xuICBjb25zdCBzaG93SWRzID0gc2NvcmVkLm1hcCgocykgPT4gcy5zaG93SWQpO1xuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHNjb3JlZFxuICAgIC5tYXAoKHMpID0+IHtcbiAgICAgIGNvbnN0IHNob3cgPSBzaG93TWFwLmdldChzLnNob3dJZCk7XG4gICAgICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHNob3cuaWQsXG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICAgIHNjb3JlOiBNYXRoLnJvdW5kKHMuc2NvcmUgKiAxMDApIC8gMTAwLFxuICAgICAgICByZWNvbW1lbmRlZEJ5OiBzLnJlY29tbWVuZGVkQnksXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUmVjb21tZW5kZWRTaG93ID0+IHIgIT09IG51bGwpO1xufVxuXG5leHBvcnQgdHlwZSBQb3B1bGFyU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgYWRkZWRDb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBvcHVsYXJTaG93cygpOiBQcm9taXNlPFBvcHVsYXJTaG93W10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICAvLyBHZXQgYWxsIHB1YmxpYyBsaXN0IElEc1xuICBjb25zdCB7IGRhdGE6IHB1YmxpY0xpc3RzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpc19wdWJsaWNcIiwgdHJ1ZSk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBwdWJsaWNMaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBHZXQgYWxsIGl0ZW1zIGZyb20gcHVibGljIGxpc3RzXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWRcIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIHB1YmxpY0xpc3RJZHMpO1xuXG4gIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG5cbiAgLy8gQ291bnQgb2NjdXJyZW5jZXMgcGVyIHNob3dcbiAgY29uc3QgY291bnRNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb3VudE1hcC5zZXQoaXRlbS5zaG93X2lkLCAoY291bnRNYXAuZ2V0KGl0ZW0uc2hvd19pZCkgPz8gMCkgKyAxKTtcbiAgfVxuXG4gIC8vIFNvcnQgYnkgY291bnQsIHRha2UgdG9wIDEyXG4gIGNvbnN0IHRvcEVudHJpZXMgPSBBcnJheS5mcm9tKGNvdW50TWFwLmVudHJpZXMoKSlcbiAgICAuc29ydCgoYSwgYikgPT4gYlsxXSAtIGFbMV0pXG4gICAgLnNsaWNlKDAsIDEyKTtcblxuICBjb25zdCBzaG93SWRzID0gdG9wRW50cmllcy5tYXAoKFtpZF0pID0+IGlkKTtcblxuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHRvcEVudHJpZXNcbiAgICAubWFwKChbaWQsIGNvdW50XSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdyA9IHNob3dNYXAuZ2V0KGlkKTtcbiAgICAgIGlmICghc2hvdykgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogc2hvdy5pZCxcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgICAgYWRkZWRDb3VudDogY291bnQsXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUG9wdWxhclNob3cgPT4gciAhPT0gbnVsbCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRPckNyZWF0ZVNob3dCeVRtZGJJZChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuXG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiBleGlzdGluZy5pZDtcblxuICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuaW5zZXJ0KHtcbiAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgIG92ZXJ2aWV3OiBzaG93Lm92ZXJ2aWV3LFxuICAgIH0pXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvciB8fCAhbmV3U2hvdykgdGhyb3cgbmV3IEVycm9yKGVycm9yPy5tZXNzYWdlID8/IFwiRmFpbGVkIHRvIGNyZWF0ZSBzaG93XCIpO1xuICByZXR1cm4gbmV3U2hvdy5pZDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiMFRBZ1BzQiw0TEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/data:78a2ae [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addShowToMyList",
    ()=>$$RSC_SERVER_ACTION_9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"401cb9e19f15860a15e63380eccffb11c40f8c75a0":"addShowToMyList"},"packages/web/src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("401cb9e19f15860a15e63380eccffb11c40f8c75a0", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addShowToMyList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xuICAvLyBTZWFzb24gLyBkdXJhdGlvbiBzdGF0c1xuICBtb3N0U2Vhc29uc1Nob3c6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBtb3N0U2Vhc29uc0J5WWVhcjoge1xuICAgIHllYXI6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgfVtdO1xuICBsb25nZXN0U2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICB0b3RhbE1pbnV0ZXM6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG4gIG1vc3RTZWFzb25zU2hvdzogbnVsbCxcbiAgbW9zdFNlYXNvbnNCeVllYXI6IFtdLFxuICBsb25nZXN0U2hvdzogbnVsbCxcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbmFseXRpY3MgZm9yIGEgbGlzdC5cbiAqIC0gTm8gbGlzdElkIOKGkiB0aGUgYXV0aGVudGljYXRlZCB1c2VyJ3Mgb3duIGxpc3QuXG4gKiAtIFdpdGggbGlzdElkIOKGkiBhbnkgcHVibGljIGxpc3QgKG93bmVyJ3MgdGFncyBhcmUgc2hvd24pLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEFuYWx5dGljcyhcbiAgbGlzdElkPzogc3RyaW5nLFxuKTogUHJvbWlzZTxBbmFseXRpY3NEYXRhPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGxldCByZXNvbHZlZExpc3RJZDogc3RyaW5nO1xuICBsZXQgb3duZXJJZDogc3RyaW5nO1xuXG4gIGlmIChsaXN0SWQpIHtcbiAgICAvLyBWaWV3aW5nIHNvbWVvbmUgZWxzZSdzIChvciBvd24pIGxpc3QgYnkgZXhwbGljaXQgaWRcbiAgICBjb25zdCB7IGRhdGE6IGxpc3RSb3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgICAuc2VsZWN0KFwiaWQsIHVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgICAgLnNpbmdsZSgpO1xuICAgIGlmICghbGlzdFJvdykgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICAvLyBPbmx5IGFsbG93IGFjY2VzcyBpZiBwdWJsaWMgb3Igb3duZWQgYnkgdGhlIGxvZ2dlZC1pbiB1c2VyXG4gICAgaWYgKCFsaXN0Um93LmlzX3B1YmxpYyAmJiBsaXN0Um93LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgICAgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3RSb3cuaWQ7XG4gICAgb3duZXJJZCA9IGxpc3RSb3cudXNlcl9pZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICAgIGlmICghbGlzdCkgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3QuaWQ7XG4gICAgb3duZXJJZCA9IHVzZXIuaWQ7XG4gIH1cblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgKG5vIHBhZ2luYXRpb24pIOKAlCByYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBmaXJzdF9haXJfZGF0ZSB2aWEgam9pblxuICB0eXBlIFJhd0l0ZW0gPSB7XG4gICAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICAgIHNob3dfaWQ6IHN0cmluZztcbiAgICBhZGRlZF9hdDogc3RyaW5nIHwgbnVsbDtcbiAgICBzaG93czoge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIH0gfCBudWxsO1xuICB9O1xuICBjb25zdCB7IGRhdGE6IHJhd0l0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXG4gICAgICBcInJhdGluZywgc2hvd19pZCwgYWRkZWRfYXQsIHNob3dzKGlkLCB0aXRsZSwgcG9zdGVyX3BhdGgsIGZpcnN0X2Fpcl9kYXRlKVwiLFxuICAgIClcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHJlc29sdmVkTGlzdElkKTtcblxuICBjb25zdCBpdGVtcyA9IChyYXdJdGVtcyA/PyBbXSkgYXMgUmF3SXRlbVtdO1xuICBjb25zdCB0b3RhbENvdW50ID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCByYXRlZFJvd3MgPSBpdGVtcy5maWx0ZXIoKHIpID0+IHIucmF0aW5nICE9PSBudWxsKTtcbiAgY29uc3QgcmF0ZWRDb3VudCA9IHJhdGVkUm93cy5sZW5ndGg7XG4gIGNvbnN0IGF2Z1JhdGluZyA9XG4gICAgcmF0ZWRDb3VudCA+IDBcbiAgICAgID8gTWF0aC5yb3VuZChcbiAgICAgICAgICAocmF0ZWRSb3dzLnJlZHVjZSgocywgcikgPT4gcyArIHIucmF0aW5nISwgMCkgLyByYXRlZENvdW50KSAqIDEwLFxuICAgICAgICApIC8gMTBcbiAgICAgIDogbnVsbDtcblxuICAvLyBSYXRpbmcgZGlzdHJpYnV0aW9uXG4gIGNvbnN0IHJhdGluZ01hcDogUmVjb3JkPG51bWJlciwgbnVtYmVyPiA9IHt9O1xuICBmb3IgKGxldCByID0gMTsgciA8PSAxMDsgcisrKSByYXRpbmdNYXBbcl0gPSAwO1xuICBmb3IgKGNvbnN0IHJvdyBvZiBpdGVtcykge1xuICAgIGlmIChyb3cucmF0aW5nICE9PSBudWxsKVxuICAgICAgcmF0aW5nTWFwW3Jvdy5yYXRpbmddID0gKHJhdGluZ01hcFtyb3cucmF0aW5nXSA/PyAwKSArIDE7XG4gIH1cbiAgY29uc3QgcmF0aW5nQ291bnRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogcmF0aW5nTWFwW2kgKyAxXSxcbiAgfSkpO1xuXG4gIC8vIFRhZyBkaXN0cmlidXRpb24g4oCUIHVzZSB0aGUgbGlzdCBvd25lcidzIHRhZ3NcbiAgY29uc3Qgc2hvd0lkcyA9IGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93X2lkKTtcbiAgY29uc3QgdGFnQ291bnRzOiBBbmFseXRpY3NEYXRhW1widGFnQ291bnRzXCJdID0gW107XG4gIGNvbnN0IHRhZ0F2Z1JhdGluZ3M6IEFuYWx5dGljc0RhdGFbXCJ0YWdBdmdSYXRpbmdzXCJdID0gW107XG5cbiAgaWYgKHNob3dJZHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IFt7IGRhdGE6IHNob3dUYWdSb3dzIH0sIHsgZGF0YTogdGFnRGVmcyB9XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJ0YWdfaWQsIHNob3dfaWRcIilcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCBvd25lcklkKVxuICAgICAgICAuaW4oXCJzaG93X2lkXCIsIHNob3dJZHMpLFxuICAgICAgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgY29sb3JcIilcbiAgICAgICAgLm9yKGBpc19kZWZhdWx0LmVxLnRydWUsdXNlcl9pZC5lcS4ke293bmVySWR9YCksXG4gICAgXSk7XG5cbiAgICBjb25zdCB0YWdNYXAgPSBuZXcgTWFwKCh0YWdEZWZzID8/IFtdKS5tYXAoKHQpID0+IFt0LmlkLCB0XSkpO1xuICAgIGNvbnN0IHNob3dSYXRpbmdNYXAgPSBuZXcgTWFwKGl0ZW1zLm1hcCgoaSkgPT4gW2kuc2hvd19pZCwgaS5yYXRpbmddKSk7XG5cbiAgICBjb25zdCB0YWdDb3VudE1hcDogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAgeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcbiAgICBjb25zdCB0YWdSYXRpbmdBY2M6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9XG4gICAgPiA9IHt9O1xuXG4gICAgZm9yIChjb25zdCByb3cgb2Ygc2hvd1RhZ1Jvd3MgPz8gW10pIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRhZ01hcC5nZXQocm93LnRhZ19pZCk7XG4gICAgICBpZiAoIXRhZykgY29udGludWU7XG5cbiAgICAgIHRhZ0NvdW50TWFwW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgIG5hbWU6IHRhZy5uYW1lLFxuICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgIH07XG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXS5jb3VudCsrO1xuXG4gICAgICBjb25zdCByYXRpbmcgPSBzaG93UmF0aW5nTWFwLmdldChyb3cuc2hvd19pZCk7XG4gICAgICBpZiAocmF0aW5nICE9IG51bGwpIHtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgICAgaWQ6IHRhZy5pZCxcbiAgICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICAgIHN1bTogMCxcbiAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdLnN1bSArPSByYXRpbmc7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5jb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRhZ0NvdW50cy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdDb3VudE1hcCkuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpLFxuICAgICk7XG4gICAgdGFnQXZnUmF0aW5ncy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdSYXRpbmdBY2MpXG4gICAgICAgIC5tYXAoKHQpID0+ICh7XG4gICAgICAgICAgaWQ6IHQuaWQsXG4gICAgICAgICAgbmFtZTogdC5uYW1lLFxuICAgICAgICAgIGNvbG9yOiB0LmNvbG9yLFxuICAgICAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgodC5zdW0gLyB0LmNvdW50KSAqIDEwKSAvIDEwLFxuICAgICAgICAgIGNvdW50OiB0LmNvdW50LFxuICAgICAgICB9KSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuYXZnUmF0aW5nIC0gYS5hdmdSYXRpbmcpLFxuICAgICk7XG4gIH1cblxuICAvLyBUaW1lbGluZTogZ3JvdXAgYnkgYWRkZWRfYXQgbW9udGggKFlZWVktTU0pXG4gIGNvbnN0IG1vbnRobHlNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtLmFkZGVkX2F0KSBjb250aW51ZTtcbiAgICBjb25zdCBtb250aCA9IGl0ZW0uYWRkZWRfYXQuc2xpY2UoMCwgNyk7XG4gICAgbW9udGhseU1hcFttb250aF0gPSAobW9udGhseU1hcFttb250aF0gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IG1vbnRobHlBZGRlZCA9IE9iamVjdC5lbnRyaWVzKG1vbnRobHlNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW21vbnRoLCBjb3VudF0pID0+ICh7IG1vbnRoLCBjb3VudCB9KSk7XG5cbiAgLy8gRGVjYWRlIGRpc3RyaWJ1dGlvbjogZ3JvdXAgYnkgZGVjYWRlIG9mIGZpcnN0X2Fpcl9kYXRlXG4gIGNvbnN0IGRlY2FkZU1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICBjb25zdCB5ZWFyQ291bnRNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgZGVjYWRlUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG4gIGNvbnN0IHllYXJSYXRpbmdBY2M6IFJlY29yZDxzdHJpbmcsIHsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfT4gPSB7fTtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBmaXJzdEFpckRhdGUgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoIWZpcnN0QWlyRGF0ZSkgY29udGludWU7XG4gICAgY29uc3QgeWVhciA9IHBhcnNlSW50KGZpcnN0QWlyRGF0ZS5zbGljZSgwLCA0KSwgMTApO1xuICAgIGlmIChpc05hTih5ZWFyKSB8fCB5ZWFyIDwgMTkwMCkgY29udGludWU7XG4gICAgY29uc3QgZGVjYWRlID0gYCR7TWF0aC5mbG9vcih5ZWFyIC8gMTApICogMTB9c2A7XG4gICAgY29uc3QgeWVhclN0ciA9IFN0cmluZyh5ZWFyKTtcblxuICAgIGRlY2FkZU1hcFtkZWNhZGVdID0gKGRlY2FkZU1hcFtkZWNhZGVdID8/IDApICsgMTtcbiAgICB5ZWFyQ291bnRNYXBbeWVhclN0cl0gPSAoeWVhckNvdW50TWFwW3llYXJTdHJdID8/IDApICsgMTtcblxuICAgIGlmIChpdGVtLnJhdGluZyAhPT0gbnVsbCkge1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uc3VtICs9IGl0ZW0ucmF0aW5nO1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uY291bnQrKztcblxuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXSA/Pz0geyBzdW06IDAsIGNvdW50OiAwIH07XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0uY291bnQrKztcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWNhZGVDb3VudHMgPSBPYmplY3QuZW50cmllcyhkZWNhZGVNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW2RlY2FkZSwgY291bnRdKSA9PiAoeyBkZWNhZGUsIGNvdW50IH0pKTtcblxuICBjb25zdCB5ZWFyQ291bnRzID0gT2JqZWN0LmVudHJpZXMoeWVhckNvdW50TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFt5ZWFyLCBjb3VudF0pID0+ICh7IHllYXIsIGNvdW50IH0pKTtcblxuICBjb25zdCBkZWNhZGVBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlUmF0aW5nQWNjKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIGRlY2FkZSxcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIGNvbnN0IHllYXJBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoeWVhclJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgeyBzdW0sIGNvdW50IH1dKSA9PiAoe1xuICAgICAgeWVhcixcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIC8vIEJ1aWxkIHNob3cgbG9va3VwIG1hcHMgZm9yIG1vZGFsIGRyaWxsLXRocm91Z2hcbiAgY29uc3Qgc2hvd3NCeVJhdGluZzogUmVjb3JkPG51bWJlciwgU2hvd1N1bW1hcnlbXT4gPSB7fTtcbiAgY29uc3Qgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IHN1bW1hcnk6IFNob3dTdW1tYXJ5ID0ge1xuICAgICAgaWQ6IGl0ZW0uc2hvd3M/LmlkID8/IGl0ZW0uc2hvd19pZCxcbiAgICAgIHRpdGxlOiBpdGVtLnNob3dzPy50aXRsZSA/PyBcIlwiLFxuICAgICAgcG9zdGVyX3BhdGg6IGl0ZW0uc2hvd3M/LnBvc3Rlcl9wYXRoID8/IG51bGwsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgZmlyc3RfYWlyX2RhdGU6IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlID8/IG51bGwsXG4gICAgfTtcbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddID8/PSBbXTtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddLnB1c2goc3VtbWFyeSk7XG4gICAgfVxuICAgIGNvbnN0IGZhZCA9IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlO1xuICAgIGlmIChmYWQpIHtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChmYWQuc2xpY2UoMCwgNCksIDEwKTtcbiAgICAgIGlmICghaXNOYU4oeSkgJiYgeSA+PSAxOTAwKSB7XG4gICAgICAgIGNvbnN0IHlyID0gU3RyaW5nKHkpO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0gPz89IFtdO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0ucHVzaChzdW1tYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsQ291bnQsXG4gICAgcmF0ZWRDb3VudCxcbiAgICBhdmdSYXRpbmcsXG4gICAgcmF0aW5nQ291bnRzLFxuICAgIHRhZ0NvdW50cyxcbiAgICB0YWdBdmdSYXRpbmdzLFxuICAgIG1vbnRobHlBZGRlZCxcbiAgICBkZWNhZGVDb3VudHMsXG4gICAgeWVhckNvdW50cyxcbiAgICBkZWNhZGVBdmdSYXRpbmdzLFxuICAgIHllYXJBdmdSYXRpbmdzLFxuICAgIHNob3dzQnlSYXRpbmcsXG4gICAgc2hvd3NCeVllYXIsXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3RJdGVtV2l0aFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxpc3RfaWQ6IHN0cmluZztcbiAgc2hvd19pZDogc3RyaW5nO1xuICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIGFkZGVkX2F0OiBzdHJpbmc7XG4gIG5vdGVzOiBzdHJpbmcgfCBudWxsO1xuICBzaG93czoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gICAgdG1kYl9mZXRjaGVkOiBib29sZWFuO1xuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RJdGVtc1BhZ2UoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplID0gNTAsXG4pOiBQcm9taXNlPHtcbiAgaXRlbXM6IExpc3RJdGVtV2l0aFNob3dbXTtcbiAgaGFzTW9yZTogYm9vbGVhbjtcbiAgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPjtcbn0+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG5cbiAgY29uc3QgeyBkYXRhOiBsaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwidXNlcl9pZCwgaXNfcHVibGljXCIpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuICBpZiAoIWxpc3QuaXNfcHVibGljICYmIGxpc3QudXNlcl9pZCAhPT0gdXNlcj8uaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IGZyb20gPSBwYWdlICogcGFnZVNpemU7XG4gIGNvbnN0IHRvID0gZnJvbSArIHBhZ2VTaXplIC0gMTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCIqLCBzaG93cygqKVwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInJhdGluZ1wiLCB7IGFzY2VuZGluZzogZmFsc2UsIG51bGxzRmlyc3Q6IGZhbHNlIH0pXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSlcbiAgICAucmFuZ2UoZnJvbSwgdG8pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIGNvbnN0IGl0ZW1zID0gKGRhdGEgPz8gW10pIGFzIHVua25vd24gYXMgTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBjb25zdCBoYXNNb3JlID0gaXRlbXMubGVuZ3RoID09PSBwYWdlU2l6ZTtcblxuICBjb25zdCBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XG4gIGlmICh1c2VyICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB7IGRhdGE6IHNob3dUYWdzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93X3RhZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJzaG93X2lkLCB0YWdfaWRcIilcbiAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAgIC5pbihcbiAgICAgICAgXCJzaG93X2lkXCIsXG4gICAgICAgIGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93cy5pZCksXG4gICAgICApO1xuXG4gICAgZm9yIChjb25zdCBzdCBvZiBzaG93VGFncyA/PyBbXSkge1xuICAgICAgaWYgKCFzaG93VGFnc01hcFtzdC5zaG93X2lkXSkgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0gPSBbXTtcbiAgICAgIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdLnB1c2goc3QudGFnX2lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpdGVtcywgaGFzTW9yZSwgc2hvd1RhZ3NNYXAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb015TGlzdChzaG93OiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBFbnN1cmUgdGhlIHNob3cgZXhpc3RzIGluIG91ciBEQiAocmV1c2UgZXhpc3Rpbmcgb3IgY3JlYXRlKVxuICBsZXQgc2hvd0lkID0gc2hvdy5pZDtcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlkXCIsIHNob3cuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb25cbiAgY29uc3QgeyBkYXRhOiBpdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgY29uc3QgbmV4dFBvc2l0aW9uID0gKGl0ZW1zPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcImxpc3RfaXRlbXNcIikuaW5zZXJ0KHtcbiAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgc2hvd19pZDogc2hvd0lkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG1kYlNob3dUb015TGlzdChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuXG4gIC8vIEZpbmQgb3IgY3JlYXRlIHRoZSBzaG93IGJ5IHRtZGJfaWRcbiAgbGV0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ0bWRiX2lkXCIsIHNob3cudG1kYl9pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yOiBzaG93RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIGV4aXN0aW5nU2hvdyA9IG5ld1Nob3c7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbHJlYWR5IGluIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIGV4aXN0aW5nU2hvdyEuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IGV4aXN0aW5nU2hvdyEuaWQsXG4gICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgfSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb3B5TGlzdFRvTWluZShzb3VyY2VMaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVmVyaWZ5IHNvdXJjZSBsaXN0IGlzIHB1YmxpYyAob3Igb3duZWQgYnkgdXNlcilcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VMaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWQsIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIk93biBsaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBWZXJpZnkgb3duIGxpc3QgaXMgZW1wdHlcbiAgY29uc3QgeyBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiBcImV4YWN0XCIsIGhlYWQ6IHRydWUgfSlcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZCk7XG5cbiAgaWYgKChjb3VudCA/PyAwKSA+IDApIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IGNvcHkgdG8gYW4gZW1wdHkgbGlzdFwiKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZnJvbSBzb3VyY2UgbGlzdFxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uLCBub3Rlc1wiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgc291cmNlTGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmIChzb3VyY2VJdGVtcyAmJiBzb3VyY2VJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaW5zZXJ0cyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICAgIHNob3dfaWQ6IGl0ZW0uc2hvd19pZCxcbiAgICAgIHJhdGluZzogaXRlbS5yYXRpbmcsXG4gICAgICBwb3NpdGlvbjogaXRlbS5wb3NpdGlvbixcbiAgICAgIG5vdGVzOiBpdGVtLm5vdGVzLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHsgZXJyb3I6IGluc2VydEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAuaW5zZXJ0KGluc2VydHMpO1xuXG4gICAgaWYgKGluc2VydEVycm9yKSB0aHJvdyBuZXcgRXJyb3IoaW5zZXJ0RXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoid1RBc3NCc0IsNExBQUEifQ==
}),
"[project]/packages/web/src/components/OnboardingEmptyState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnboardingEmptyState",
    ()=>OnboardingEmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/i18n/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/tmdb/client.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tmdb/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$rankings$2f$data$3a$35933d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/rankings/data:35933d [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$c03a3a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/explore/data:c03a3a [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$78a2ae__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:78a2ae [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Plus.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Check$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Check.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileArrowUp$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/FileArrowUp.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Television.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/SpinnerGap.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ArrowRight$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/ArrowRight.es.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
function OnboardingEmptyState({ onAddShow, onImport }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("onboarding");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [shows, setShows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [addedIds, setAddedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [addingId, setAddingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeShowId, setActiveShowId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnboardingEmptyState.useEffect": ()=>{
            if (!activeShowId) return;
            const dismiss = {
                "OnboardingEmptyState.useEffect.dismiss": ()=>setActiveShowId(null)
            }["OnboardingEmptyState.useEffect.dismiss"];
            document.addEventListener("click", dismiss);
            return ({
                "OnboardingEmptyState.useEffect": ()=>document.removeEventListener("click", dismiss)
            })["OnboardingEmptyState.useEffect"];
        }
    }["OnboardingEmptyState.useEffect"], [
        activeShowId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnboardingEmptyState.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$rankings$2f$data$3a$35933d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getTopRatedShows"])().then({
                "OnboardingEmptyState.useEffect": (topRated)=>{
                    if (topRated.length >= 6) {
                        // Map TopRatedShow → OnboardingShow
                        setShows(topRated.slice(0, 12).map({
                            "OnboardingEmptyState.useEffect": (s)=>({
                                    id: s.id,
                                    tmdb_id: s.tmdb_id,
                                    title: s.title,
                                    poster_path: s.poster_path,
                                    first_air_date: s.first_air_date,
                                    overview: s.overview,
                                    avg_rating: s.avg_rating
                                })
                        }["OnboardingEmptyState.useEffect"]));
                    } else {
                        // Fall back to most-added shows when ratings data is sparse
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$c03a3a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getPopularShows"])().then({
                            "OnboardingEmptyState.useEffect": (popular)=>{
                                setShows(popular.slice(0, 12));
                            }
                        }["OnboardingEmptyState.useEffect"]);
                    }
                }
            }["OnboardingEmptyState.useEffect"]).catch({
                "OnboardingEmptyState.useEffect": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$c03a3a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getPopularShows"])().then({
                        "OnboardingEmptyState.useEffect": (popular)=>setShows(popular.slice(0, 12))
                    }["OnboardingEmptyState.useEffect"]).catch({
                        "OnboardingEmptyState.useEffect": ()=>{}
                    }["OnboardingEmptyState.useEffect"]);
                }
            }["OnboardingEmptyState.useEffect"]).finally({
                "OnboardingEmptyState.useEffect": ()=>setLoading(false)
            }["OnboardingEmptyState.useEffect"]);
        }
    }["OnboardingEmptyState.useEffect"], []);
    const handleQuickAdd = (show)=>{
        if (addedIds.has(show.id) || addingId === show.id) return;
        setAddingId(show.id);
        startTransition(async ()=>{
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$78a2ae__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addShowToMyList"])({
                    id: show.id,
                    tmdb_id: show.tmdb_id,
                    imdb_id: null,
                    title: show.title,
                    poster_path: show.poster_path,
                    first_air_date: show.first_air_date,
                    overview: show.overview
                });
                setAddedIds((prev)=>new Set(prev).add(show.id));
                router.refresh();
            } catch  {
            // silently fail
            } finally{
                setAddingId(null);
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-14 w-14 items-center justify-center rounded-lg bg-accent-muted mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                    size: 28,
                    className: "text-accent"
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-base font-semibold text-text-primary",
                children: t("title")
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 max-w-sm text-center text-sm text-text-secondary",
                children: t("subtitle")
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onAddShow,
                        className: "flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-bg-primary transition-colors hover:bg-accent-hover",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                                size: 16,
                                weight: "bold"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            t("addFirst")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onImport,
                        className: "flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileArrowUp$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileArrowUp"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            t("importExternal")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-10 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px flex-1 bg-border"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-semibold uppercase tracking-widest text-text-faint",
                                children: t("communityFavorites")
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px flex-1 bg-border"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6",
                        children: Array.from({
                            length: 12
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "aspect-2/3 animate-pulse rounded-md bg-bg-surface"
                            }, i, false, {
                                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this) : shows.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6",
                        children: shows.map((show)=>{
                            const isAdded = addedIds.has(show.id);
                            const isAdding = addingId === show.id;
                            const posterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPosterUrl"])(show.poster_path, "w185");
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group relative overflow-hidden rounded-md border border-border bg-bg-surface",
                                onPointerEnter: (e)=>{
                                    if (e.pointerType === "mouse") setActiveShowId(show.id);
                                },
                                onPointerLeave: (e)=>{
                                    if (e.pointerType === "mouse") setActiveShowId(null);
                                },
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    setActiveShowId(show.id);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative aspect-2/3 bg-bg-elevated",
                                        children: [
                                            posterUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: posterUrl,
                                                alt: show.title,
                                                fill: true,
                                                className: "object-cover",
                                                sizes: "150px"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                                lineNumber: 187,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex h-full items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                                                    size: 24,
                                                    className: "text-text-faint"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                                lineNumber: 195,
                                                columnNumber: 23
                                            }, this),
                                            show.avg_rating !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-1.5 right-1.5 rounded px-1 py-0.5 bg-black/70 font-mono text-[10px] font-bold tabular-nums text-accent leading-none",
                                                children: show.avg_rating.toFixed(1)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                                lineNumber: 202,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeShowId === show.id || isAdded ? "opacity-100" : "opacity-0 pointer-events-none"}`,
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    setActiveShowId(null);
                                                },
                                                children: isAdded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Check$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Check"], {
                                                    size: 24,
                                                    weight: "bold",
                                                    className: "text-accent"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                handleQuickAdd(show);
                                                            },
                                                            disabled: isAdding,
                                                            className: "flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition-colors disabled:opacity-50",
                                                            children: [
                                                                isAdding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpinnerGap"], {
                                                                    size: 13,
                                                                    className: "animate-spin"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                                                    lineNumber: 232,
                                                                    columnNumber: 31
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                                                                    size: 13,
                                                                    weight: "bold"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                                                    lineNumber: 234,
                                                                    columnNumber: 31
                                                                }, this),
                                                                t("addToList")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                                            href: `/shows/${show.id}`,
                                                            className: "flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-black/60 transition-colors",
                                                            onClick: (e)=>e.stopPropagation(),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ArrowRight$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowRight"], {
                                                                    size: 13,
                                                                    weight: "bold"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                                                    lineNumber: 243,
                                                                    columnNumber: 29
                                                                }, this),
                                                                t("details")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                                lineNumber: 208,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                        lineNumber: 185,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate px-2 py-1.5 text-xs text-text-secondary",
                                        children: show.title
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                        lineNumber: 250,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, show.id, true, {
                                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 171,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/components/OnboardingEmptyState.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(OnboardingEmptyState, "w/Z2/xiglcKaz6dUDTxarwcWvv0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = OnboardingEmptyState;
var _c;
__turbopack_context__.k.register(_c, "OnboardingEmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/data:f4cff5 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateList",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"604f55753ca5e8115e6cccefdb137079597abee97d":"updateList"},"packages/web/src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("604f55753ca5e8115e6cccefdb137079597abee97d", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xuICAvLyBTZWFzb24gLyBkdXJhdGlvbiBzdGF0c1xuICBtb3N0U2Vhc29uc1Nob3c6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBtb3N0U2Vhc29uc0J5WWVhcjoge1xuICAgIHllYXI6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgfVtdO1xuICBsb25nZXN0U2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICB0b3RhbE1pbnV0ZXM6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG4gIG1vc3RTZWFzb25zU2hvdzogbnVsbCxcbiAgbW9zdFNlYXNvbnNCeVllYXI6IFtdLFxuICBsb25nZXN0U2hvdzogbnVsbCxcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbmFseXRpY3MgZm9yIGEgbGlzdC5cbiAqIC0gTm8gbGlzdElkIOKGkiB0aGUgYXV0aGVudGljYXRlZCB1c2VyJ3Mgb3duIGxpc3QuXG4gKiAtIFdpdGggbGlzdElkIOKGkiBhbnkgcHVibGljIGxpc3QgKG93bmVyJ3MgdGFncyBhcmUgc2hvd24pLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEFuYWx5dGljcyhcbiAgbGlzdElkPzogc3RyaW5nLFxuKTogUHJvbWlzZTxBbmFseXRpY3NEYXRhPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGxldCByZXNvbHZlZExpc3RJZDogc3RyaW5nO1xuICBsZXQgb3duZXJJZDogc3RyaW5nO1xuXG4gIGlmIChsaXN0SWQpIHtcbiAgICAvLyBWaWV3aW5nIHNvbWVvbmUgZWxzZSdzIChvciBvd24pIGxpc3QgYnkgZXhwbGljaXQgaWRcbiAgICBjb25zdCB7IGRhdGE6IGxpc3RSb3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgICAuc2VsZWN0KFwiaWQsIHVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgICAgLnNpbmdsZSgpO1xuICAgIGlmICghbGlzdFJvdykgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICAvLyBPbmx5IGFsbG93IGFjY2VzcyBpZiBwdWJsaWMgb3Igb3duZWQgYnkgdGhlIGxvZ2dlZC1pbiB1c2VyXG4gICAgaWYgKCFsaXN0Um93LmlzX3B1YmxpYyAmJiBsaXN0Um93LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgICAgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3RSb3cuaWQ7XG4gICAgb3duZXJJZCA9IGxpc3RSb3cudXNlcl9pZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICAgIGlmICghbGlzdCkgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3QuaWQ7XG4gICAgb3duZXJJZCA9IHVzZXIuaWQ7XG4gIH1cblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgKG5vIHBhZ2luYXRpb24pIOKAlCByYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBmaXJzdF9haXJfZGF0ZSB2aWEgam9pblxuICB0eXBlIFJhd0l0ZW0gPSB7XG4gICAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICAgIHNob3dfaWQ6IHN0cmluZztcbiAgICBhZGRlZF9hdDogc3RyaW5nIHwgbnVsbDtcbiAgICBzaG93czoge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIH0gfCBudWxsO1xuICB9O1xuICBjb25zdCB7IGRhdGE6IHJhd0l0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXG4gICAgICBcInJhdGluZywgc2hvd19pZCwgYWRkZWRfYXQsIHNob3dzKGlkLCB0aXRsZSwgcG9zdGVyX3BhdGgsIGZpcnN0X2Fpcl9kYXRlKVwiLFxuICAgIClcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHJlc29sdmVkTGlzdElkKTtcblxuICBjb25zdCBpdGVtcyA9IChyYXdJdGVtcyA/PyBbXSkgYXMgUmF3SXRlbVtdO1xuICBjb25zdCB0b3RhbENvdW50ID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCByYXRlZFJvd3MgPSBpdGVtcy5maWx0ZXIoKHIpID0+IHIucmF0aW5nICE9PSBudWxsKTtcbiAgY29uc3QgcmF0ZWRDb3VudCA9IHJhdGVkUm93cy5sZW5ndGg7XG4gIGNvbnN0IGF2Z1JhdGluZyA9XG4gICAgcmF0ZWRDb3VudCA+IDBcbiAgICAgID8gTWF0aC5yb3VuZChcbiAgICAgICAgICAocmF0ZWRSb3dzLnJlZHVjZSgocywgcikgPT4gcyArIHIucmF0aW5nISwgMCkgLyByYXRlZENvdW50KSAqIDEwLFxuICAgICAgICApIC8gMTBcbiAgICAgIDogbnVsbDtcblxuICAvLyBSYXRpbmcgZGlzdHJpYnV0aW9uXG4gIGNvbnN0IHJhdGluZ01hcDogUmVjb3JkPG51bWJlciwgbnVtYmVyPiA9IHt9O1xuICBmb3IgKGxldCByID0gMTsgciA8PSAxMDsgcisrKSByYXRpbmdNYXBbcl0gPSAwO1xuICBmb3IgKGNvbnN0IHJvdyBvZiBpdGVtcykge1xuICAgIGlmIChyb3cucmF0aW5nICE9PSBudWxsKVxuICAgICAgcmF0aW5nTWFwW3Jvdy5yYXRpbmddID0gKHJhdGluZ01hcFtyb3cucmF0aW5nXSA/PyAwKSArIDE7XG4gIH1cbiAgY29uc3QgcmF0aW5nQ291bnRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogcmF0aW5nTWFwW2kgKyAxXSxcbiAgfSkpO1xuXG4gIC8vIFRhZyBkaXN0cmlidXRpb24g4oCUIHVzZSB0aGUgbGlzdCBvd25lcidzIHRhZ3NcbiAgY29uc3Qgc2hvd0lkcyA9IGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93X2lkKTtcbiAgY29uc3QgdGFnQ291bnRzOiBBbmFseXRpY3NEYXRhW1widGFnQ291bnRzXCJdID0gW107XG4gIGNvbnN0IHRhZ0F2Z1JhdGluZ3M6IEFuYWx5dGljc0RhdGFbXCJ0YWdBdmdSYXRpbmdzXCJdID0gW107XG5cbiAgaWYgKHNob3dJZHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IFt7IGRhdGE6IHNob3dUYWdSb3dzIH0sIHsgZGF0YTogdGFnRGVmcyB9XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJ0YWdfaWQsIHNob3dfaWRcIilcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCBvd25lcklkKVxuICAgICAgICAuaW4oXCJzaG93X2lkXCIsIHNob3dJZHMpLFxuICAgICAgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgY29sb3JcIilcbiAgICAgICAgLm9yKGBpc19kZWZhdWx0LmVxLnRydWUsdXNlcl9pZC5lcS4ke293bmVySWR9YCksXG4gICAgXSk7XG5cbiAgICBjb25zdCB0YWdNYXAgPSBuZXcgTWFwKCh0YWdEZWZzID8/IFtdKS5tYXAoKHQpID0+IFt0LmlkLCB0XSkpO1xuICAgIGNvbnN0IHNob3dSYXRpbmdNYXAgPSBuZXcgTWFwKGl0ZW1zLm1hcCgoaSkgPT4gW2kuc2hvd19pZCwgaS5yYXRpbmddKSk7XG5cbiAgICBjb25zdCB0YWdDb3VudE1hcDogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAgeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcbiAgICBjb25zdCB0YWdSYXRpbmdBY2M6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9XG4gICAgPiA9IHt9O1xuXG4gICAgZm9yIChjb25zdCByb3cgb2Ygc2hvd1RhZ1Jvd3MgPz8gW10pIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRhZ01hcC5nZXQocm93LnRhZ19pZCk7XG4gICAgICBpZiAoIXRhZykgY29udGludWU7XG5cbiAgICAgIHRhZ0NvdW50TWFwW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgIG5hbWU6IHRhZy5uYW1lLFxuICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgIH07XG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXS5jb3VudCsrO1xuXG4gICAgICBjb25zdCByYXRpbmcgPSBzaG93UmF0aW5nTWFwLmdldChyb3cuc2hvd19pZCk7XG4gICAgICBpZiAocmF0aW5nICE9IG51bGwpIHtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgICAgaWQ6IHRhZy5pZCxcbiAgICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICAgIHN1bTogMCxcbiAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdLnN1bSArPSByYXRpbmc7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5jb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRhZ0NvdW50cy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdDb3VudE1hcCkuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpLFxuICAgICk7XG4gICAgdGFnQXZnUmF0aW5ncy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdSYXRpbmdBY2MpXG4gICAgICAgIC5tYXAoKHQpID0+ICh7XG4gICAgICAgICAgaWQ6IHQuaWQsXG4gICAgICAgICAgbmFtZTogdC5uYW1lLFxuICAgICAgICAgIGNvbG9yOiB0LmNvbG9yLFxuICAgICAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgodC5zdW0gLyB0LmNvdW50KSAqIDEwKSAvIDEwLFxuICAgICAgICAgIGNvdW50OiB0LmNvdW50LFxuICAgICAgICB9KSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuYXZnUmF0aW5nIC0gYS5hdmdSYXRpbmcpLFxuICAgICk7XG4gIH1cblxuICAvLyBUaW1lbGluZTogZ3JvdXAgYnkgYWRkZWRfYXQgbW9udGggKFlZWVktTU0pXG4gIGNvbnN0IG1vbnRobHlNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtLmFkZGVkX2F0KSBjb250aW51ZTtcbiAgICBjb25zdCBtb250aCA9IGl0ZW0uYWRkZWRfYXQuc2xpY2UoMCwgNyk7XG4gICAgbW9udGhseU1hcFttb250aF0gPSAobW9udGhseU1hcFttb250aF0gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IG1vbnRobHlBZGRlZCA9IE9iamVjdC5lbnRyaWVzKG1vbnRobHlNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW21vbnRoLCBjb3VudF0pID0+ICh7IG1vbnRoLCBjb3VudCB9KSk7XG5cbiAgLy8gRGVjYWRlIGRpc3RyaWJ1dGlvbjogZ3JvdXAgYnkgZGVjYWRlIG9mIGZpcnN0X2Fpcl9kYXRlXG4gIGNvbnN0IGRlY2FkZU1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICBjb25zdCB5ZWFyQ291bnRNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgZGVjYWRlUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG4gIGNvbnN0IHllYXJSYXRpbmdBY2M6IFJlY29yZDxzdHJpbmcsIHsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfT4gPSB7fTtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBmaXJzdEFpckRhdGUgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoIWZpcnN0QWlyRGF0ZSkgY29udGludWU7XG4gICAgY29uc3QgeWVhciA9IHBhcnNlSW50KGZpcnN0QWlyRGF0ZS5zbGljZSgwLCA0KSwgMTApO1xuICAgIGlmIChpc05hTih5ZWFyKSB8fCB5ZWFyIDwgMTkwMCkgY29udGludWU7XG4gICAgY29uc3QgZGVjYWRlID0gYCR7TWF0aC5mbG9vcih5ZWFyIC8gMTApICogMTB9c2A7XG4gICAgY29uc3QgeWVhclN0ciA9IFN0cmluZyh5ZWFyKTtcblxuICAgIGRlY2FkZU1hcFtkZWNhZGVdID0gKGRlY2FkZU1hcFtkZWNhZGVdID8/IDApICsgMTtcbiAgICB5ZWFyQ291bnRNYXBbeWVhclN0cl0gPSAoeWVhckNvdW50TWFwW3llYXJTdHJdID8/IDApICsgMTtcblxuICAgIGlmIChpdGVtLnJhdGluZyAhPT0gbnVsbCkge1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uc3VtICs9IGl0ZW0ucmF0aW5nO1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uY291bnQrKztcblxuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXSA/Pz0geyBzdW06IDAsIGNvdW50OiAwIH07XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0uY291bnQrKztcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWNhZGVDb3VudHMgPSBPYmplY3QuZW50cmllcyhkZWNhZGVNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW2RlY2FkZSwgY291bnRdKSA9PiAoeyBkZWNhZGUsIGNvdW50IH0pKTtcblxuICBjb25zdCB5ZWFyQ291bnRzID0gT2JqZWN0LmVudHJpZXMoeWVhckNvdW50TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFt5ZWFyLCBjb3VudF0pID0+ICh7IHllYXIsIGNvdW50IH0pKTtcblxuICBjb25zdCBkZWNhZGVBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlUmF0aW5nQWNjKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIGRlY2FkZSxcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIGNvbnN0IHllYXJBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoeWVhclJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgeyBzdW0sIGNvdW50IH1dKSA9PiAoe1xuICAgICAgeWVhcixcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIC8vIEJ1aWxkIHNob3cgbG9va3VwIG1hcHMgZm9yIG1vZGFsIGRyaWxsLXRocm91Z2hcbiAgY29uc3Qgc2hvd3NCeVJhdGluZzogUmVjb3JkPG51bWJlciwgU2hvd1N1bW1hcnlbXT4gPSB7fTtcbiAgY29uc3Qgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IHN1bW1hcnk6IFNob3dTdW1tYXJ5ID0ge1xuICAgICAgaWQ6IGl0ZW0uc2hvd3M/LmlkID8/IGl0ZW0uc2hvd19pZCxcbiAgICAgIHRpdGxlOiBpdGVtLnNob3dzPy50aXRsZSA/PyBcIlwiLFxuICAgICAgcG9zdGVyX3BhdGg6IGl0ZW0uc2hvd3M/LnBvc3Rlcl9wYXRoID8/IG51bGwsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgZmlyc3RfYWlyX2RhdGU6IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlID8/IG51bGwsXG4gICAgfTtcbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddID8/PSBbXTtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddLnB1c2goc3VtbWFyeSk7XG4gICAgfVxuICAgIGNvbnN0IGZhZCA9IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlO1xuICAgIGlmIChmYWQpIHtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChmYWQuc2xpY2UoMCwgNCksIDEwKTtcbiAgICAgIGlmICghaXNOYU4oeSkgJiYgeSA+PSAxOTAwKSB7XG4gICAgICAgIGNvbnN0IHlyID0gU3RyaW5nKHkpO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0gPz89IFtdO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0ucHVzaChzdW1tYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsQ291bnQsXG4gICAgcmF0ZWRDb3VudCxcbiAgICBhdmdSYXRpbmcsXG4gICAgcmF0aW5nQ291bnRzLFxuICAgIHRhZ0NvdW50cyxcbiAgICB0YWdBdmdSYXRpbmdzLFxuICAgIG1vbnRobHlBZGRlZCxcbiAgICBkZWNhZGVDb3VudHMsXG4gICAgeWVhckNvdW50cyxcbiAgICBkZWNhZGVBdmdSYXRpbmdzLFxuICAgIHllYXJBdmdSYXRpbmdzLFxuICAgIHNob3dzQnlSYXRpbmcsXG4gICAgc2hvd3NCeVllYXIsXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3RJdGVtV2l0aFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxpc3RfaWQ6IHN0cmluZztcbiAgc2hvd19pZDogc3RyaW5nO1xuICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIGFkZGVkX2F0OiBzdHJpbmc7XG4gIG5vdGVzOiBzdHJpbmcgfCBudWxsO1xuICBzaG93czoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gICAgdG1kYl9mZXRjaGVkOiBib29sZWFuO1xuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RJdGVtc1BhZ2UoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplID0gNTAsXG4pOiBQcm9taXNlPHtcbiAgaXRlbXM6IExpc3RJdGVtV2l0aFNob3dbXTtcbiAgaGFzTW9yZTogYm9vbGVhbjtcbiAgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPjtcbn0+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG5cbiAgY29uc3QgeyBkYXRhOiBsaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwidXNlcl9pZCwgaXNfcHVibGljXCIpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuICBpZiAoIWxpc3QuaXNfcHVibGljICYmIGxpc3QudXNlcl9pZCAhPT0gdXNlcj8uaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IGZyb20gPSBwYWdlICogcGFnZVNpemU7XG4gIGNvbnN0IHRvID0gZnJvbSArIHBhZ2VTaXplIC0gMTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCIqLCBzaG93cygqKVwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInJhdGluZ1wiLCB7IGFzY2VuZGluZzogZmFsc2UsIG51bGxzRmlyc3Q6IGZhbHNlIH0pXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSlcbiAgICAucmFuZ2UoZnJvbSwgdG8pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIGNvbnN0IGl0ZW1zID0gKGRhdGEgPz8gW10pIGFzIHVua25vd24gYXMgTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBjb25zdCBoYXNNb3JlID0gaXRlbXMubGVuZ3RoID09PSBwYWdlU2l6ZTtcblxuICBjb25zdCBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XG4gIGlmICh1c2VyICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB7IGRhdGE6IHNob3dUYWdzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93X3RhZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJzaG93X2lkLCB0YWdfaWRcIilcbiAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAgIC5pbihcbiAgICAgICAgXCJzaG93X2lkXCIsXG4gICAgICAgIGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93cy5pZCksXG4gICAgICApO1xuXG4gICAgZm9yIChjb25zdCBzdCBvZiBzaG93VGFncyA/PyBbXSkge1xuICAgICAgaWYgKCFzaG93VGFnc01hcFtzdC5zaG93X2lkXSkgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0gPSBbXTtcbiAgICAgIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdLnB1c2goc3QudGFnX2lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpdGVtcywgaGFzTW9yZSwgc2hvd1RhZ3NNYXAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb015TGlzdChzaG93OiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBFbnN1cmUgdGhlIHNob3cgZXhpc3RzIGluIG91ciBEQiAocmV1c2UgZXhpc3Rpbmcgb3IgY3JlYXRlKVxuICBsZXQgc2hvd0lkID0gc2hvdy5pZDtcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlkXCIsIHNob3cuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb25cbiAgY29uc3QgeyBkYXRhOiBpdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgY29uc3QgbmV4dFBvc2l0aW9uID0gKGl0ZW1zPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcImxpc3RfaXRlbXNcIikuaW5zZXJ0KHtcbiAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgc2hvd19pZDogc2hvd0lkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG1kYlNob3dUb015TGlzdChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuXG4gIC8vIEZpbmQgb3IgY3JlYXRlIHRoZSBzaG93IGJ5IHRtZGJfaWRcbiAgbGV0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ0bWRiX2lkXCIsIHNob3cudG1kYl9pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yOiBzaG93RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIGV4aXN0aW5nU2hvdyA9IG5ld1Nob3c7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbHJlYWR5IGluIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIGV4aXN0aW5nU2hvdyEuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IGV4aXN0aW5nU2hvdyEuaWQsXG4gICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgfSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb3B5TGlzdFRvTWluZShzb3VyY2VMaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVmVyaWZ5IHNvdXJjZSBsaXN0IGlzIHB1YmxpYyAob3Igb3duZWQgYnkgdXNlcilcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VMaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWQsIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIk93biBsaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBWZXJpZnkgb3duIGxpc3QgaXMgZW1wdHlcbiAgY29uc3QgeyBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiBcImV4YWN0XCIsIGhlYWQ6IHRydWUgfSlcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZCk7XG5cbiAgaWYgKChjb3VudCA/PyAwKSA+IDApIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IGNvcHkgdG8gYW4gZW1wdHkgbGlzdFwiKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZnJvbSBzb3VyY2UgbGlzdFxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uLCBub3Rlc1wiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgc291cmNlTGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmIChzb3VyY2VJdGVtcyAmJiBzb3VyY2VJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaW5zZXJ0cyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICAgIHNob3dfaWQ6IGl0ZW0uc2hvd19pZCxcbiAgICAgIHJhdGluZzogaXRlbS5yYXRpbmcsXG4gICAgICBwb3NpdGlvbjogaXRlbS5wb3NpdGlvbixcbiAgICAgIG5vdGVzOiBpdGVtLm5vdGVzLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHsgZXJyb3I6IGluc2VydEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAuaW5zZXJ0KGluc2VydHMpO1xuXG4gICAgaWYgKGluc2VydEVycm9yKSB0aHJvdyBuZXcgRXJyb3IoaW5zZXJ0RXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoibVRBa0JzQix1TEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/data:da44cf [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addShowToList",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60e0c2656cc2bb318e9a7e139766786fbbcea34582":"addShowToList"},"packages/web/src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60e0c2656cc2bb318e9a7e139766786fbbcea34582", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addShowToList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xuICAvLyBTZWFzb24gLyBkdXJhdGlvbiBzdGF0c1xuICBtb3N0U2Vhc29uc1Nob3c6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBtb3N0U2Vhc29uc0J5WWVhcjoge1xuICAgIHllYXI6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgfVtdO1xuICBsb25nZXN0U2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICB0b3RhbE1pbnV0ZXM6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG4gIG1vc3RTZWFzb25zU2hvdzogbnVsbCxcbiAgbW9zdFNlYXNvbnNCeVllYXI6IFtdLFxuICBsb25nZXN0U2hvdzogbnVsbCxcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbmFseXRpY3MgZm9yIGEgbGlzdC5cbiAqIC0gTm8gbGlzdElkIOKGkiB0aGUgYXV0aGVudGljYXRlZCB1c2VyJ3Mgb3duIGxpc3QuXG4gKiAtIFdpdGggbGlzdElkIOKGkiBhbnkgcHVibGljIGxpc3QgKG93bmVyJ3MgdGFncyBhcmUgc2hvd24pLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEFuYWx5dGljcyhcbiAgbGlzdElkPzogc3RyaW5nLFxuKTogUHJvbWlzZTxBbmFseXRpY3NEYXRhPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGxldCByZXNvbHZlZExpc3RJZDogc3RyaW5nO1xuICBsZXQgb3duZXJJZDogc3RyaW5nO1xuXG4gIGlmIChsaXN0SWQpIHtcbiAgICAvLyBWaWV3aW5nIHNvbWVvbmUgZWxzZSdzIChvciBvd24pIGxpc3QgYnkgZXhwbGljaXQgaWRcbiAgICBjb25zdCB7IGRhdGE6IGxpc3RSb3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgICAuc2VsZWN0KFwiaWQsIHVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgICAgLnNpbmdsZSgpO1xuICAgIGlmICghbGlzdFJvdykgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICAvLyBPbmx5IGFsbG93IGFjY2VzcyBpZiBwdWJsaWMgb3Igb3duZWQgYnkgdGhlIGxvZ2dlZC1pbiB1c2VyXG4gICAgaWYgKCFsaXN0Um93LmlzX3B1YmxpYyAmJiBsaXN0Um93LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgICAgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3RSb3cuaWQ7XG4gICAgb3duZXJJZCA9IGxpc3RSb3cudXNlcl9pZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICAgIGlmICghbGlzdCkgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3QuaWQ7XG4gICAgb3duZXJJZCA9IHVzZXIuaWQ7XG4gIH1cblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgKG5vIHBhZ2luYXRpb24pIOKAlCByYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBmaXJzdF9haXJfZGF0ZSB2aWEgam9pblxuICB0eXBlIFJhd0l0ZW0gPSB7XG4gICAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICAgIHNob3dfaWQ6IHN0cmluZztcbiAgICBhZGRlZF9hdDogc3RyaW5nIHwgbnVsbDtcbiAgICBzaG93czoge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIH0gfCBudWxsO1xuICB9O1xuICBjb25zdCB7IGRhdGE6IHJhd0l0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXG4gICAgICBcInJhdGluZywgc2hvd19pZCwgYWRkZWRfYXQsIHNob3dzKGlkLCB0aXRsZSwgcG9zdGVyX3BhdGgsIGZpcnN0X2Fpcl9kYXRlKVwiLFxuICAgIClcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHJlc29sdmVkTGlzdElkKTtcblxuICBjb25zdCBpdGVtcyA9IChyYXdJdGVtcyA/PyBbXSkgYXMgUmF3SXRlbVtdO1xuICBjb25zdCB0b3RhbENvdW50ID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCByYXRlZFJvd3MgPSBpdGVtcy5maWx0ZXIoKHIpID0+IHIucmF0aW5nICE9PSBudWxsKTtcbiAgY29uc3QgcmF0ZWRDb3VudCA9IHJhdGVkUm93cy5sZW5ndGg7XG4gIGNvbnN0IGF2Z1JhdGluZyA9XG4gICAgcmF0ZWRDb3VudCA+IDBcbiAgICAgID8gTWF0aC5yb3VuZChcbiAgICAgICAgICAocmF0ZWRSb3dzLnJlZHVjZSgocywgcikgPT4gcyArIHIucmF0aW5nISwgMCkgLyByYXRlZENvdW50KSAqIDEwLFxuICAgICAgICApIC8gMTBcbiAgICAgIDogbnVsbDtcblxuICAvLyBSYXRpbmcgZGlzdHJpYnV0aW9uXG4gIGNvbnN0IHJhdGluZ01hcDogUmVjb3JkPG51bWJlciwgbnVtYmVyPiA9IHt9O1xuICBmb3IgKGxldCByID0gMTsgciA8PSAxMDsgcisrKSByYXRpbmdNYXBbcl0gPSAwO1xuICBmb3IgKGNvbnN0IHJvdyBvZiBpdGVtcykge1xuICAgIGlmIChyb3cucmF0aW5nICE9PSBudWxsKVxuICAgICAgcmF0aW5nTWFwW3Jvdy5yYXRpbmddID0gKHJhdGluZ01hcFtyb3cucmF0aW5nXSA/PyAwKSArIDE7XG4gIH1cbiAgY29uc3QgcmF0aW5nQ291bnRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogcmF0aW5nTWFwW2kgKyAxXSxcbiAgfSkpO1xuXG4gIC8vIFRhZyBkaXN0cmlidXRpb24g4oCUIHVzZSB0aGUgbGlzdCBvd25lcidzIHRhZ3NcbiAgY29uc3Qgc2hvd0lkcyA9IGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93X2lkKTtcbiAgY29uc3QgdGFnQ291bnRzOiBBbmFseXRpY3NEYXRhW1widGFnQ291bnRzXCJdID0gW107XG4gIGNvbnN0IHRhZ0F2Z1JhdGluZ3M6IEFuYWx5dGljc0RhdGFbXCJ0YWdBdmdSYXRpbmdzXCJdID0gW107XG5cbiAgaWYgKHNob3dJZHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IFt7IGRhdGE6IHNob3dUYWdSb3dzIH0sIHsgZGF0YTogdGFnRGVmcyB9XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJ0YWdfaWQsIHNob3dfaWRcIilcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCBvd25lcklkKVxuICAgICAgICAuaW4oXCJzaG93X2lkXCIsIHNob3dJZHMpLFxuICAgICAgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgY29sb3JcIilcbiAgICAgICAgLm9yKGBpc19kZWZhdWx0LmVxLnRydWUsdXNlcl9pZC5lcS4ke293bmVySWR9YCksXG4gICAgXSk7XG5cbiAgICBjb25zdCB0YWdNYXAgPSBuZXcgTWFwKCh0YWdEZWZzID8/IFtdKS5tYXAoKHQpID0+IFt0LmlkLCB0XSkpO1xuICAgIGNvbnN0IHNob3dSYXRpbmdNYXAgPSBuZXcgTWFwKGl0ZW1zLm1hcCgoaSkgPT4gW2kuc2hvd19pZCwgaS5yYXRpbmddKSk7XG5cbiAgICBjb25zdCB0YWdDb3VudE1hcDogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAgeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcbiAgICBjb25zdCB0YWdSYXRpbmdBY2M6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9XG4gICAgPiA9IHt9O1xuXG4gICAgZm9yIChjb25zdCByb3cgb2Ygc2hvd1RhZ1Jvd3MgPz8gW10pIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRhZ01hcC5nZXQocm93LnRhZ19pZCk7XG4gICAgICBpZiAoIXRhZykgY29udGludWU7XG5cbiAgICAgIHRhZ0NvdW50TWFwW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgIG5hbWU6IHRhZy5uYW1lLFxuICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgIH07XG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXS5jb3VudCsrO1xuXG4gICAgICBjb25zdCByYXRpbmcgPSBzaG93UmF0aW5nTWFwLmdldChyb3cuc2hvd19pZCk7XG4gICAgICBpZiAocmF0aW5nICE9IG51bGwpIHtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgICAgaWQ6IHRhZy5pZCxcbiAgICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICAgIHN1bTogMCxcbiAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdLnN1bSArPSByYXRpbmc7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5jb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRhZ0NvdW50cy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdDb3VudE1hcCkuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpLFxuICAgICk7XG4gICAgdGFnQXZnUmF0aW5ncy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdSYXRpbmdBY2MpXG4gICAgICAgIC5tYXAoKHQpID0+ICh7XG4gICAgICAgICAgaWQ6IHQuaWQsXG4gICAgICAgICAgbmFtZTogdC5uYW1lLFxuICAgICAgICAgIGNvbG9yOiB0LmNvbG9yLFxuICAgICAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgodC5zdW0gLyB0LmNvdW50KSAqIDEwKSAvIDEwLFxuICAgICAgICAgIGNvdW50OiB0LmNvdW50LFxuICAgICAgICB9KSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuYXZnUmF0aW5nIC0gYS5hdmdSYXRpbmcpLFxuICAgICk7XG4gIH1cblxuICAvLyBUaW1lbGluZTogZ3JvdXAgYnkgYWRkZWRfYXQgbW9udGggKFlZWVktTU0pXG4gIGNvbnN0IG1vbnRobHlNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtLmFkZGVkX2F0KSBjb250aW51ZTtcbiAgICBjb25zdCBtb250aCA9IGl0ZW0uYWRkZWRfYXQuc2xpY2UoMCwgNyk7XG4gICAgbW9udGhseU1hcFttb250aF0gPSAobW9udGhseU1hcFttb250aF0gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IG1vbnRobHlBZGRlZCA9IE9iamVjdC5lbnRyaWVzKG1vbnRobHlNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW21vbnRoLCBjb3VudF0pID0+ICh7IG1vbnRoLCBjb3VudCB9KSk7XG5cbiAgLy8gRGVjYWRlIGRpc3RyaWJ1dGlvbjogZ3JvdXAgYnkgZGVjYWRlIG9mIGZpcnN0X2Fpcl9kYXRlXG4gIGNvbnN0IGRlY2FkZU1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICBjb25zdCB5ZWFyQ291bnRNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgZGVjYWRlUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG4gIGNvbnN0IHllYXJSYXRpbmdBY2M6IFJlY29yZDxzdHJpbmcsIHsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfT4gPSB7fTtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBmaXJzdEFpckRhdGUgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoIWZpcnN0QWlyRGF0ZSkgY29udGludWU7XG4gICAgY29uc3QgeWVhciA9IHBhcnNlSW50KGZpcnN0QWlyRGF0ZS5zbGljZSgwLCA0KSwgMTApO1xuICAgIGlmIChpc05hTih5ZWFyKSB8fCB5ZWFyIDwgMTkwMCkgY29udGludWU7XG4gICAgY29uc3QgZGVjYWRlID0gYCR7TWF0aC5mbG9vcih5ZWFyIC8gMTApICogMTB9c2A7XG4gICAgY29uc3QgeWVhclN0ciA9IFN0cmluZyh5ZWFyKTtcblxuICAgIGRlY2FkZU1hcFtkZWNhZGVdID0gKGRlY2FkZU1hcFtkZWNhZGVdID8/IDApICsgMTtcbiAgICB5ZWFyQ291bnRNYXBbeWVhclN0cl0gPSAoeWVhckNvdW50TWFwW3llYXJTdHJdID8/IDApICsgMTtcblxuICAgIGlmIChpdGVtLnJhdGluZyAhPT0gbnVsbCkge1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uc3VtICs9IGl0ZW0ucmF0aW5nO1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uY291bnQrKztcblxuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXSA/Pz0geyBzdW06IDAsIGNvdW50OiAwIH07XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0uY291bnQrKztcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWNhZGVDb3VudHMgPSBPYmplY3QuZW50cmllcyhkZWNhZGVNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW2RlY2FkZSwgY291bnRdKSA9PiAoeyBkZWNhZGUsIGNvdW50IH0pKTtcblxuICBjb25zdCB5ZWFyQ291bnRzID0gT2JqZWN0LmVudHJpZXMoeWVhckNvdW50TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFt5ZWFyLCBjb3VudF0pID0+ICh7IHllYXIsIGNvdW50IH0pKTtcblxuICBjb25zdCBkZWNhZGVBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlUmF0aW5nQWNjKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIGRlY2FkZSxcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIGNvbnN0IHllYXJBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoeWVhclJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgeyBzdW0sIGNvdW50IH1dKSA9PiAoe1xuICAgICAgeWVhcixcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIC8vIEJ1aWxkIHNob3cgbG9va3VwIG1hcHMgZm9yIG1vZGFsIGRyaWxsLXRocm91Z2hcbiAgY29uc3Qgc2hvd3NCeVJhdGluZzogUmVjb3JkPG51bWJlciwgU2hvd1N1bW1hcnlbXT4gPSB7fTtcbiAgY29uc3Qgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IHN1bW1hcnk6IFNob3dTdW1tYXJ5ID0ge1xuICAgICAgaWQ6IGl0ZW0uc2hvd3M/LmlkID8/IGl0ZW0uc2hvd19pZCxcbiAgICAgIHRpdGxlOiBpdGVtLnNob3dzPy50aXRsZSA/PyBcIlwiLFxuICAgICAgcG9zdGVyX3BhdGg6IGl0ZW0uc2hvd3M/LnBvc3Rlcl9wYXRoID8/IG51bGwsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgZmlyc3RfYWlyX2RhdGU6IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlID8/IG51bGwsXG4gICAgfTtcbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddID8/PSBbXTtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddLnB1c2goc3VtbWFyeSk7XG4gICAgfVxuICAgIGNvbnN0IGZhZCA9IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlO1xuICAgIGlmIChmYWQpIHtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChmYWQuc2xpY2UoMCwgNCksIDEwKTtcbiAgICAgIGlmICghaXNOYU4oeSkgJiYgeSA+PSAxOTAwKSB7XG4gICAgICAgIGNvbnN0IHlyID0gU3RyaW5nKHkpO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0gPz89IFtdO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0ucHVzaChzdW1tYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsQ291bnQsXG4gICAgcmF0ZWRDb3VudCxcbiAgICBhdmdSYXRpbmcsXG4gICAgcmF0aW5nQ291bnRzLFxuICAgIHRhZ0NvdW50cyxcbiAgICB0YWdBdmdSYXRpbmdzLFxuICAgIG1vbnRobHlBZGRlZCxcbiAgICBkZWNhZGVDb3VudHMsXG4gICAgeWVhckNvdW50cyxcbiAgICBkZWNhZGVBdmdSYXRpbmdzLFxuICAgIHllYXJBdmdSYXRpbmdzLFxuICAgIHNob3dzQnlSYXRpbmcsXG4gICAgc2hvd3NCeVllYXIsXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3RJdGVtV2l0aFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxpc3RfaWQ6IHN0cmluZztcbiAgc2hvd19pZDogc3RyaW5nO1xuICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIGFkZGVkX2F0OiBzdHJpbmc7XG4gIG5vdGVzOiBzdHJpbmcgfCBudWxsO1xuICBzaG93czoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gICAgdG1kYl9mZXRjaGVkOiBib29sZWFuO1xuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RJdGVtc1BhZ2UoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplID0gNTAsXG4pOiBQcm9taXNlPHtcbiAgaXRlbXM6IExpc3RJdGVtV2l0aFNob3dbXTtcbiAgaGFzTW9yZTogYm9vbGVhbjtcbiAgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPjtcbn0+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG5cbiAgY29uc3QgeyBkYXRhOiBsaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwidXNlcl9pZCwgaXNfcHVibGljXCIpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuICBpZiAoIWxpc3QuaXNfcHVibGljICYmIGxpc3QudXNlcl9pZCAhPT0gdXNlcj8uaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IGZyb20gPSBwYWdlICogcGFnZVNpemU7XG4gIGNvbnN0IHRvID0gZnJvbSArIHBhZ2VTaXplIC0gMTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCIqLCBzaG93cygqKVwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInJhdGluZ1wiLCB7IGFzY2VuZGluZzogZmFsc2UsIG51bGxzRmlyc3Q6IGZhbHNlIH0pXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSlcbiAgICAucmFuZ2UoZnJvbSwgdG8pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIGNvbnN0IGl0ZW1zID0gKGRhdGEgPz8gW10pIGFzIHVua25vd24gYXMgTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBjb25zdCBoYXNNb3JlID0gaXRlbXMubGVuZ3RoID09PSBwYWdlU2l6ZTtcblxuICBjb25zdCBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XG4gIGlmICh1c2VyICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB7IGRhdGE6IHNob3dUYWdzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93X3RhZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJzaG93X2lkLCB0YWdfaWRcIilcbiAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAgIC5pbihcbiAgICAgICAgXCJzaG93X2lkXCIsXG4gICAgICAgIGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93cy5pZCksXG4gICAgICApO1xuXG4gICAgZm9yIChjb25zdCBzdCBvZiBzaG93VGFncyA/PyBbXSkge1xuICAgICAgaWYgKCFzaG93VGFnc01hcFtzdC5zaG93X2lkXSkgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0gPSBbXTtcbiAgICAgIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdLnB1c2goc3QudGFnX2lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpdGVtcywgaGFzTW9yZSwgc2hvd1RhZ3NNYXAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb015TGlzdChzaG93OiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBFbnN1cmUgdGhlIHNob3cgZXhpc3RzIGluIG91ciBEQiAocmV1c2UgZXhpc3Rpbmcgb3IgY3JlYXRlKVxuICBsZXQgc2hvd0lkID0gc2hvdy5pZDtcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlkXCIsIHNob3cuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb25cbiAgY29uc3QgeyBkYXRhOiBpdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgY29uc3QgbmV4dFBvc2l0aW9uID0gKGl0ZW1zPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcImxpc3RfaXRlbXNcIikuaW5zZXJ0KHtcbiAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgc2hvd19pZDogc2hvd0lkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG1kYlNob3dUb015TGlzdChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuXG4gIC8vIEZpbmQgb3IgY3JlYXRlIHRoZSBzaG93IGJ5IHRtZGJfaWRcbiAgbGV0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ0bWRiX2lkXCIsIHNob3cudG1kYl9pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yOiBzaG93RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIGV4aXN0aW5nU2hvdyA9IG5ld1Nob3c7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbHJlYWR5IGluIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIGV4aXN0aW5nU2hvdyEuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IGV4aXN0aW5nU2hvdyEuaWQsXG4gICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgfSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb3B5TGlzdFRvTWluZShzb3VyY2VMaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVmVyaWZ5IHNvdXJjZSBsaXN0IGlzIHB1YmxpYyAob3Igb3duZWQgYnkgdXNlcilcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VMaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWQsIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIk93biBsaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBWZXJpZnkgb3duIGxpc3QgaXMgZW1wdHlcbiAgY29uc3QgeyBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiBcImV4YWN0XCIsIGhlYWQ6IHRydWUgfSlcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZCk7XG5cbiAgaWYgKChjb3VudCA/PyAwKSA+IDApIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IGNvcHkgdG8gYW4gZW1wdHkgbGlzdFwiKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZnJvbSBzb3VyY2UgbGlzdFxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uLCBub3Rlc1wiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgc291cmNlTGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmIChzb3VyY2VJdGVtcyAmJiBzb3VyY2VJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaW5zZXJ0cyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICAgIHNob3dfaWQ6IGl0ZW0uc2hvd19pZCxcbiAgICAgIHJhdGluZzogaXRlbS5yYXRpbmcsXG4gICAgICBwb3NpdGlvbjogaXRlbS5wb3NpdGlvbixcbiAgICAgIG5vdGVzOiBpdGVtLm5vdGVzLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHsgZXJyb3I6IGluc2VydEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAuaW5zZXJ0KGluc2VydHMpO1xuXG4gICAgaWYgKGluc2VydEVycm9yKSB0aHJvdyBuZXcgRXJyb3IoaW5zZXJ0RXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoic1RBdUNzQiwwTEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/data:d91a32 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "removeShowFromList",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"605feabbe451922a81bc560a82cc2571d393467c5e":"removeShowFromList"},"packages/web/src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("605feabbe451922a81bc560a82cc2571d393467c5e", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "removeShowFromList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xuICAvLyBTZWFzb24gLyBkdXJhdGlvbiBzdGF0c1xuICBtb3N0U2Vhc29uc1Nob3c6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBtb3N0U2Vhc29uc0J5WWVhcjoge1xuICAgIHllYXI6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgfVtdO1xuICBsb25nZXN0U2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICB0b3RhbE1pbnV0ZXM6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG4gIG1vc3RTZWFzb25zU2hvdzogbnVsbCxcbiAgbW9zdFNlYXNvbnNCeVllYXI6IFtdLFxuICBsb25nZXN0U2hvdzogbnVsbCxcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbmFseXRpY3MgZm9yIGEgbGlzdC5cbiAqIC0gTm8gbGlzdElkIOKGkiB0aGUgYXV0aGVudGljYXRlZCB1c2VyJ3Mgb3duIGxpc3QuXG4gKiAtIFdpdGggbGlzdElkIOKGkiBhbnkgcHVibGljIGxpc3QgKG93bmVyJ3MgdGFncyBhcmUgc2hvd24pLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEFuYWx5dGljcyhcbiAgbGlzdElkPzogc3RyaW5nLFxuKTogUHJvbWlzZTxBbmFseXRpY3NEYXRhPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGxldCByZXNvbHZlZExpc3RJZDogc3RyaW5nO1xuICBsZXQgb3duZXJJZDogc3RyaW5nO1xuXG4gIGlmIChsaXN0SWQpIHtcbiAgICAvLyBWaWV3aW5nIHNvbWVvbmUgZWxzZSdzIChvciBvd24pIGxpc3QgYnkgZXhwbGljaXQgaWRcbiAgICBjb25zdCB7IGRhdGE6IGxpc3RSb3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgICAuc2VsZWN0KFwiaWQsIHVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgICAgLnNpbmdsZSgpO1xuICAgIGlmICghbGlzdFJvdykgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICAvLyBPbmx5IGFsbG93IGFjY2VzcyBpZiBwdWJsaWMgb3Igb3duZWQgYnkgdGhlIGxvZ2dlZC1pbiB1c2VyXG4gICAgaWYgKCFsaXN0Um93LmlzX3B1YmxpYyAmJiBsaXN0Um93LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgICAgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3RSb3cuaWQ7XG4gICAgb3duZXJJZCA9IGxpc3RSb3cudXNlcl9pZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICAgIGlmICghbGlzdCkgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3QuaWQ7XG4gICAgb3duZXJJZCA9IHVzZXIuaWQ7XG4gIH1cblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgKG5vIHBhZ2luYXRpb24pIOKAlCByYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBmaXJzdF9haXJfZGF0ZSB2aWEgam9pblxuICB0eXBlIFJhd0l0ZW0gPSB7XG4gICAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICAgIHNob3dfaWQ6IHN0cmluZztcbiAgICBhZGRlZF9hdDogc3RyaW5nIHwgbnVsbDtcbiAgICBzaG93czoge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIH0gfCBudWxsO1xuICB9O1xuICBjb25zdCB7IGRhdGE6IHJhd0l0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXG4gICAgICBcInJhdGluZywgc2hvd19pZCwgYWRkZWRfYXQsIHNob3dzKGlkLCB0aXRsZSwgcG9zdGVyX3BhdGgsIGZpcnN0X2Fpcl9kYXRlKVwiLFxuICAgIClcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHJlc29sdmVkTGlzdElkKTtcblxuICBjb25zdCBpdGVtcyA9IChyYXdJdGVtcyA/PyBbXSkgYXMgUmF3SXRlbVtdO1xuICBjb25zdCB0b3RhbENvdW50ID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCByYXRlZFJvd3MgPSBpdGVtcy5maWx0ZXIoKHIpID0+IHIucmF0aW5nICE9PSBudWxsKTtcbiAgY29uc3QgcmF0ZWRDb3VudCA9IHJhdGVkUm93cy5sZW5ndGg7XG4gIGNvbnN0IGF2Z1JhdGluZyA9XG4gICAgcmF0ZWRDb3VudCA+IDBcbiAgICAgID8gTWF0aC5yb3VuZChcbiAgICAgICAgICAocmF0ZWRSb3dzLnJlZHVjZSgocywgcikgPT4gcyArIHIucmF0aW5nISwgMCkgLyByYXRlZENvdW50KSAqIDEwLFxuICAgICAgICApIC8gMTBcbiAgICAgIDogbnVsbDtcblxuICAvLyBSYXRpbmcgZGlzdHJpYnV0aW9uXG4gIGNvbnN0IHJhdGluZ01hcDogUmVjb3JkPG51bWJlciwgbnVtYmVyPiA9IHt9O1xuICBmb3IgKGxldCByID0gMTsgciA8PSAxMDsgcisrKSByYXRpbmdNYXBbcl0gPSAwO1xuICBmb3IgKGNvbnN0IHJvdyBvZiBpdGVtcykge1xuICAgIGlmIChyb3cucmF0aW5nICE9PSBudWxsKVxuICAgICAgcmF0aW5nTWFwW3Jvdy5yYXRpbmddID0gKHJhdGluZ01hcFtyb3cucmF0aW5nXSA/PyAwKSArIDE7XG4gIH1cbiAgY29uc3QgcmF0aW5nQ291bnRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogcmF0aW5nTWFwW2kgKyAxXSxcbiAgfSkpO1xuXG4gIC8vIFRhZyBkaXN0cmlidXRpb24g4oCUIHVzZSB0aGUgbGlzdCBvd25lcidzIHRhZ3NcbiAgY29uc3Qgc2hvd0lkcyA9IGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93X2lkKTtcbiAgY29uc3QgdGFnQ291bnRzOiBBbmFseXRpY3NEYXRhW1widGFnQ291bnRzXCJdID0gW107XG4gIGNvbnN0IHRhZ0F2Z1JhdGluZ3M6IEFuYWx5dGljc0RhdGFbXCJ0YWdBdmdSYXRpbmdzXCJdID0gW107XG5cbiAgaWYgKHNob3dJZHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IFt7IGRhdGE6IHNob3dUYWdSb3dzIH0sIHsgZGF0YTogdGFnRGVmcyB9XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJ0YWdfaWQsIHNob3dfaWRcIilcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCBvd25lcklkKVxuICAgICAgICAuaW4oXCJzaG93X2lkXCIsIHNob3dJZHMpLFxuICAgICAgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgY29sb3JcIilcbiAgICAgICAgLm9yKGBpc19kZWZhdWx0LmVxLnRydWUsdXNlcl9pZC5lcS4ke293bmVySWR9YCksXG4gICAgXSk7XG5cbiAgICBjb25zdCB0YWdNYXAgPSBuZXcgTWFwKCh0YWdEZWZzID8/IFtdKS5tYXAoKHQpID0+IFt0LmlkLCB0XSkpO1xuICAgIGNvbnN0IHNob3dSYXRpbmdNYXAgPSBuZXcgTWFwKGl0ZW1zLm1hcCgoaSkgPT4gW2kuc2hvd19pZCwgaS5yYXRpbmddKSk7XG5cbiAgICBjb25zdCB0YWdDb3VudE1hcDogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAgeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcbiAgICBjb25zdCB0YWdSYXRpbmdBY2M6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9XG4gICAgPiA9IHt9O1xuXG4gICAgZm9yIChjb25zdCByb3cgb2Ygc2hvd1RhZ1Jvd3MgPz8gW10pIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRhZ01hcC5nZXQocm93LnRhZ19pZCk7XG4gICAgICBpZiAoIXRhZykgY29udGludWU7XG5cbiAgICAgIHRhZ0NvdW50TWFwW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgIG5hbWU6IHRhZy5uYW1lLFxuICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgIH07XG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXS5jb3VudCsrO1xuXG4gICAgICBjb25zdCByYXRpbmcgPSBzaG93UmF0aW5nTWFwLmdldChyb3cuc2hvd19pZCk7XG4gICAgICBpZiAocmF0aW5nICE9IG51bGwpIHtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgICAgaWQ6IHRhZy5pZCxcbiAgICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICAgIHN1bTogMCxcbiAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdLnN1bSArPSByYXRpbmc7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5jb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRhZ0NvdW50cy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdDb3VudE1hcCkuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpLFxuICAgICk7XG4gICAgdGFnQXZnUmF0aW5ncy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdSYXRpbmdBY2MpXG4gICAgICAgIC5tYXAoKHQpID0+ICh7XG4gICAgICAgICAgaWQ6IHQuaWQsXG4gICAgICAgICAgbmFtZTogdC5uYW1lLFxuICAgICAgICAgIGNvbG9yOiB0LmNvbG9yLFxuICAgICAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgodC5zdW0gLyB0LmNvdW50KSAqIDEwKSAvIDEwLFxuICAgICAgICAgIGNvdW50OiB0LmNvdW50LFxuICAgICAgICB9KSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuYXZnUmF0aW5nIC0gYS5hdmdSYXRpbmcpLFxuICAgICk7XG4gIH1cblxuICAvLyBUaW1lbGluZTogZ3JvdXAgYnkgYWRkZWRfYXQgbW9udGggKFlZWVktTU0pXG4gIGNvbnN0IG1vbnRobHlNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtLmFkZGVkX2F0KSBjb250aW51ZTtcbiAgICBjb25zdCBtb250aCA9IGl0ZW0uYWRkZWRfYXQuc2xpY2UoMCwgNyk7XG4gICAgbW9udGhseU1hcFttb250aF0gPSAobW9udGhseU1hcFttb250aF0gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IG1vbnRobHlBZGRlZCA9IE9iamVjdC5lbnRyaWVzKG1vbnRobHlNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW21vbnRoLCBjb3VudF0pID0+ICh7IG1vbnRoLCBjb3VudCB9KSk7XG5cbiAgLy8gRGVjYWRlIGRpc3RyaWJ1dGlvbjogZ3JvdXAgYnkgZGVjYWRlIG9mIGZpcnN0X2Fpcl9kYXRlXG4gIGNvbnN0IGRlY2FkZU1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICBjb25zdCB5ZWFyQ291bnRNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgZGVjYWRlUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG4gIGNvbnN0IHllYXJSYXRpbmdBY2M6IFJlY29yZDxzdHJpbmcsIHsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfT4gPSB7fTtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBmaXJzdEFpckRhdGUgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoIWZpcnN0QWlyRGF0ZSkgY29udGludWU7XG4gICAgY29uc3QgeWVhciA9IHBhcnNlSW50KGZpcnN0QWlyRGF0ZS5zbGljZSgwLCA0KSwgMTApO1xuICAgIGlmIChpc05hTih5ZWFyKSB8fCB5ZWFyIDwgMTkwMCkgY29udGludWU7XG4gICAgY29uc3QgZGVjYWRlID0gYCR7TWF0aC5mbG9vcih5ZWFyIC8gMTApICogMTB9c2A7XG4gICAgY29uc3QgeWVhclN0ciA9IFN0cmluZyh5ZWFyKTtcblxuICAgIGRlY2FkZU1hcFtkZWNhZGVdID0gKGRlY2FkZU1hcFtkZWNhZGVdID8/IDApICsgMTtcbiAgICB5ZWFyQ291bnRNYXBbeWVhclN0cl0gPSAoeWVhckNvdW50TWFwW3llYXJTdHJdID8/IDApICsgMTtcblxuICAgIGlmIChpdGVtLnJhdGluZyAhPT0gbnVsbCkge1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uc3VtICs9IGl0ZW0ucmF0aW5nO1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uY291bnQrKztcblxuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXSA/Pz0geyBzdW06IDAsIGNvdW50OiAwIH07XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0uY291bnQrKztcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWNhZGVDb3VudHMgPSBPYmplY3QuZW50cmllcyhkZWNhZGVNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW2RlY2FkZSwgY291bnRdKSA9PiAoeyBkZWNhZGUsIGNvdW50IH0pKTtcblxuICBjb25zdCB5ZWFyQ291bnRzID0gT2JqZWN0LmVudHJpZXMoeWVhckNvdW50TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFt5ZWFyLCBjb3VudF0pID0+ICh7IHllYXIsIGNvdW50IH0pKTtcblxuICBjb25zdCBkZWNhZGVBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlUmF0aW5nQWNjKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIGRlY2FkZSxcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIGNvbnN0IHllYXJBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoeWVhclJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgeyBzdW0sIGNvdW50IH1dKSA9PiAoe1xuICAgICAgeWVhcixcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIC8vIEJ1aWxkIHNob3cgbG9va3VwIG1hcHMgZm9yIG1vZGFsIGRyaWxsLXRocm91Z2hcbiAgY29uc3Qgc2hvd3NCeVJhdGluZzogUmVjb3JkPG51bWJlciwgU2hvd1N1bW1hcnlbXT4gPSB7fTtcbiAgY29uc3Qgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IHN1bW1hcnk6IFNob3dTdW1tYXJ5ID0ge1xuICAgICAgaWQ6IGl0ZW0uc2hvd3M/LmlkID8/IGl0ZW0uc2hvd19pZCxcbiAgICAgIHRpdGxlOiBpdGVtLnNob3dzPy50aXRsZSA/PyBcIlwiLFxuICAgICAgcG9zdGVyX3BhdGg6IGl0ZW0uc2hvd3M/LnBvc3Rlcl9wYXRoID8/IG51bGwsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgZmlyc3RfYWlyX2RhdGU6IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlID8/IG51bGwsXG4gICAgfTtcbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddID8/PSBbXTtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddLnB1c2goc3VtbWFyeSk7XG4gICAgfVxuICAgIGNvbnN0IGZhZCA9IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlO1xuICAgIGlmIChmYWQpIHtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChmYWQuc2xpY2UoMCwgNCksIDEwKTtcbiAgICAgIGlmICghaXNOYU4oeSkgJiYgeSA+PSAxOTAwKSB7XG4gICAgICAgIGNvbnN0IHlyID0gU3RyaW5nKHkpO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0gPz89IFtdO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0ucHVzaChzdW1tYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsQ291bnQsXG4gICAgcmF0ZWRDb3VudCxcbiAgICBhdmdSYXRpbmcsXG4gICAgcmF0aW5nQ291bnRzLFxuICAgIHRhZ0NvdW50cyxcbiAgICB0YWdBdmdSYXRpbmdzLFxuICAgIG1vbnRobHlBZGRlZCxcbiAgICBkZWNhZGVDb3VudHMsXG4gICAgeWVhckNvdW50cyxcbiAgICBkZWNhZGVBdmdSYXRpbmdzLFxuICAgIHllYXJBdmdSYXRpbmdzLFxuICAgIHNob3dzQnlSYXRpbmcsXG4gICAgc2hvd3NCeVllYXIsXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3RJdGVtV2l0aFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxpc3RfaWQ6IHN0cmluZztcbiAgc2hvd19pZDogc3RyaW5nO1xuICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIGFkZGVkX2F0OiBzdHJpbmc7XG4gIG5vdGVzOiBzdHJpbmcgfCBudWxsO1xuICBzaG93czoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gICAgdG1kYl9mZXRjaGVkOiBib29sZWFuO1xuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RJdGVtc1BhZ2UoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplID0gNTAsXG4pOiBQcm9taXNlPHtcbiAgaXRlbXM6IExpc3RJdGVtV2l0aFNob3dbXTtcbiAgaGFzTW9yZTogYm9vbGVhbjtcbiAgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPjtcbn0+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG5cbiAgY29uc3QgeyBkYXRhOiBsaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwidXNlcl9pZCwgaXNfcHVibGljXCIpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuICBpZiAoIWxpc3QuaXNfcHVibGljICYmIGxpc3QudXNlcl9pZCAhPT0gdXNlcj8uaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IGZyb20gPSBwYWdlICogcGFnZVNpemU7XG4gIGNvbnN0IHRvID0gZnJvbSArIHBhZ2VTaXplIC0gMTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCIqLCBzaG93cygqKVwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInJhdGluZ1wiLCB7IGFzY2VuZGluZzogZmFsc2UsIG51bGxzRmlyc3Q6IGZhbHNlIH0pXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSlcbiAgICAucmFuZ2UoZnJvbSwgdG8pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIGNvbnN0IGl0ZW1zID0gKGRhdGEgPz8gW10pIGFzIHVua25vd24gYXMgTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBjb25zdCBoYXNNb3JlID0gaXRlbXMubGVuZ3RoID09PSBwYWdlU2l6ZTtcblxuICBjb25zdCBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XG4gIGlmICh1c2VyICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB7IGRhdGE6IHNob3dUYWdzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93X3RhZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJzaG93X2lkLCB0YWdfaWRcIilcbiAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAgIC5pbihcbiAgICAgICAgXCJzaG93X2lkXCIsXG4gICAgICAgIGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93cy5pZCksXG4gICAgICApO1xuXG4gICAgZm9yIChjb25zdCBzdCBvZiBzaG93VGFncyA/PyBbXSkge1xuICAgICAgaWYgKCFzaG93VGFnc01hcFtzdC5zaG93X2lkXSkgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0gPSBbXTtcbiAgICAgIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdLnB1c2goc3QudGFnX2lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpdGVtcywgaGFzTW9yZSwgc2hvd1RhZ3NNYXAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb015TGlzdChzaG93OiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBFbnN1cmUgdGhlIHNob3cgZXhpc3RzIGluIG91ciBEQiAocmV1c2UgZXhpc3Rpbmcgb3IgY3JlYXRlKVxuICBsZXQgc2hvd0lkID0gc2hvdy5pZDtcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlkXCIsIHNob3cuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb25cbiAgY29uc3QgeyBkYXRhOiBpdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgY29uc3QgbmV4dFBvc2l0aW9uID0gKGl0ZW1zPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcImxpc3RfaXRlbXNcIikuaW5zZXJ0KHtcbiAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgc2hvd19pZDogc2hvd0lkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG1kYlNob3dUb015TGlzdChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuXG4gIC8vIEZpbmQgb3IgY3JlYXRlIHRoZSBzaG93IGJ5IHRtZGJfaWRcbiAgbGV0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ0bWRiX2lkXCIsIHNob3cudG1kYl9pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yOiBzaG93RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIGV4aXN0aW5nU2hvdyA9IG5ld1Nob3c7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbHJlYWR5IGluIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIGV4aXN0aW5nU2hvdyEuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IGV4aXN0aW5nU2hvdyEuaWQsXG4gICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgfSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb3B5TGlzdFRvTWluZShzb3VyY2VMaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVmVyaWZ5IHNvdXJjZSBsaXN0IGlzIHB1YmxpYyAob3Igb3duZWQgYnkgdXNlcilcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VMaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWQsIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIk93biBsaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBWZXJpZnkgb3duIGxpc3QgaXMgZW1wdHlcbiAgY29uc3QgeyBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiBcImV4YWN0XCIsIGhlYWQ6IHRydWUgfSlcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZCk7XG5cbiAgaWYgKChjb3VudCA/PyAwKSA+IDApIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IGNvcHkgdG8gYW4gZW1wdHkgbGlzdFwiKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZnJvbSBzb3VyY2UgbGlzdFxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uLCBub3Rlc1wiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgc291cmNlTGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmIChzb3VyY2VJdGVtcyAmJiBzb3VyY2VJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaW5zZXJ0cyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICAgIHNob3dfaWQ6IGl0ZW0uc2hvd19pZCxcbiAgICAgIHJhdGluZzogaXRlbS5yYXRpbmcsXG4gICAgICBwb3NpdGlvbjogaXRlbS5wb3NpdGlvbixcbiAgICAgIG5vdGVzOiBpdGVtLm5vdGVzLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHsgZXJyb3I6IGluc2VydEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAuaW5zZXJ0KGluc2VydHMpO1xuXG4gICAgaWYgKGluc2VydEVycm9yKSB0aHJvdyBuZXcgRXJyb3IoaW5zZXJ0RXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiMlRBOEdzQiwrTEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/data:be9101 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateShowRating",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"70f013807d01f785d2640b0cc5f4f0a37b2ea06ff2":"updateShowRating"},"packages/web/src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("70f013807d01f785d2640b0cc5f4f0a37b2ea06ff2", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateShowRating");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xuICAvLyBTZWFzb24gLyBkdXJhdGlvbiBzdGF0c1xuICBtb3N0U2Vhc29uc1Nob3c6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBtb3N0U2Vhc29uc0J5WWVhcjoge1xuICAgIHllYXI6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgfVtdO1xuICBsb25nZXN0U2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICB0b3RhbE1pbnV0ZXM6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG4gIG1vc3RTZWFzb25zU2hvdzogbnVsbCxcbiAgbW9zdFNlYXNvbnNCeVllYXI6IFtdLFxuICBsb25nZXN0U2hvdzogbnVsbCxcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbmFseXRpY3MgZm9yIGEgbGlzdC5cbiAqIC0gTm8gbGlzdElkIOKGkiB0aGUgYXV0aGVudGljYXRlZCB1c2VyJ3Mgb3duIGxpc3QuXG4gKiAtIFdpdGggbGlzdElkIOKGkiBhbnkgcHVibGljIGxpc3QgKG93bmVyJ3MgdGFncyBhcmUgc2hvd24pLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEFuYWx5dGljcyhcbiAgbGlzdElkPzogc3RyaW5nLFxuKTogUHJvbWlzZTxBbmFseXRpY3NEYXRhPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGxldCByZXNvbHZlZExpc3RJZDogc3RyaW5nO1xuICBsZXQgb3duZXJJZDogc3RyaW5nO1xuXG4gIGlmIChsaXN0SWQpIHtcbiAgICAvLyBWaWV3aW5nIHNvbWVvbmUgZWxzZSdzIChvciBvd24pIGxpc3QgYnkgZXhwbGljaXQgaWRcbiAgICBjb25zdCB7IGRhdGE6IGxpc3RSb3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgICAuc2VsZWN0KFwiaWQsIHVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgICAgLnNpbmdsZSgpO1xuICAgIGlmICghbGlzdFJvdykgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICAvLyBPbmx5IGFsbG93IGFjY2VzcyBpZiBwdWJsaWMgb3Igb3duZWQgYnkgdGhlIGxvZ2dlZC1pbiB1c2VyXG4gICAgaWYgKCFsaXN0Um93LmlzX3B1YmxpYyAmJiBsaXN0Um93LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgICAgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3RSb3cuaWQ7XG4gICAgb3duZXJJZCA9IGxpc3RSb3cudXNlcl9pZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICAgIGlmICghbGlzdCkgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3QuaWQ7XG4gICAgb3duZXJJZCA9IHVzZXIuaWQ7XG4gIH1cblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgKG5vIHBhZ2luYXRpb24pIOKAlCByYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBmaXJzdF9haXJfZGF0ZSB2aWEgam9pblxuICB0eXBlIFJhd0l0ZW0gPSB7XG4gICAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICAgIHNob3dfaWQ6IHN0cmluZztcbiAgICBhZGRlZF9hdDogc3RyaW5nIHwgbnVsbDtcbiAgICBzaG93czoge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIH0gfCBudWxsO1xuICB9O1xuICBjb25zdCB7IGRhdGE6IHJhd0l0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXG4gICAgICBcInJhdGluZywgc2hvd19pZCwgYWRkZWRfYXQsIHNob3dzKGlkLCB0aXRsZSwgcG9zdGVyX3BhdGgsIGZpcnN0X2Fpcl9kYXRlKVwiLFxuICAgIClcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHJlc29sdmVkTGlzdElkKTtcblxuICBjb25zdCBpdGVtcyA9IChyYXdJdGVtcyA/PyBbXSkgYXMgUmF3SXRlbVtdO1xuICBjb25zdCB0b3RhbENvdW50ID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCByYXRlZFJvd3MgPSBpdGVtcy5maWx0ZXIoKHIpID0+IHIucmF0aW5nICE9PSBudWxsKTtcbiAgY29uc3QgcmF0ZWRDb3VudCA9IHJhdGVkUm93cy5sZW5ndGg7XG4gIGNvbnN0IGF2Z1JhdGluZyA9XG4gICAgcmF0ZWRDb3VudCA+IDBcbiAgICAgID8gTWF0aC5yb3VuZChcbiAgICAgICAgICAocmF0ZWRSb3dzLnJlZHVjZSgocywgcikgPT4gcyArIHIucmF0aW5nISwgMCkgLyByYXRlZENvdW50KSAqIDEwLFxuICAgICAgICApIC8gMTBcbiAgICAgIDogbnVsbDtcblxuICAvLyBSYXRpbmcgZGlzdHJpYnV0aW9uXG4gIGNvbnN0IHJhdGluZ01hcDogUmVjb3JkPG51bWJlciwgbnVtYmVyPiA9IHt9O1xuICBmb3IgKGxldCByID0gMTsgciA8PSAxMDsgcisrKSByYXRpbmdNYXBbcl0gPSAwO1xuICBmb3IgKGNvbnN0IHJvdyBvZiBpdGVtcykge1xuICAgIGlmIChyb3cucmF0aW5nICE9PSBudWxsKVxuICAgICAgcmF0aW5nTWFwW3Jvdy5yYXRpbmddID0gKHJhdGluZ01hcFtyb3cucmF0aW5nXSA/PyAwKSArIDE7XG4gIH1cbiAgY29uc3QgcmF0aW5nQ291bnRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogcmF0aW5nTWFwW2kgKyAxXSxcbiAgfSkpO1xuXG4gIC8vIFRhZyBkaXN0cmlidXRpb24g4oCUIHVzZSB0aGUgbGlzdCBvd25lcidzIHRhZ3NcbiAgY29uc3Qgc2hvd0lkcyA9IGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93X2lkKTtcbiAgY29uc3QgdGFnQ291bnRzOiBBbmFseXRpY3NEYXRhW1widGFnQ291bnRzXCJdID0gW107XG4gIGNvbnN0IHRhZ0F2Z1JhdGluZ3M6IEFuYWx5dGljc0RhdGFbXCJ0YWdBdmdSYXRpbmdzXCJdID0gW107XG5cbiAgaWYgKHNob3dJZHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IFt7IGRhdGE6IHNob3dUYWdSb3dzIH0sIHsgZGF0YTogdGFnRGVmcyB9XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJ0YWdfaWQsIHNob3dfaWRcIilcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCBvd25lcklkKVxuICAgICAgICAuaW4oXCJzaG93X2lkXCIsIHNob3dJZHMpLFxuICAgICAgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgY29sb3JcIilcbiAgICAgICAgLm9yKGBpc19kZWZhdWx0LmVxLnRydWUsdXNlcl9pZC5lcS4ke293bmVySWR9YCksXG4gICAgXSk7XG5cbiAgICBjb25zdCB0YWdNYXAgPSBuZXcgTWFwKCh0YWdEZWZzID8/IFtdKS5tYXAoKHQpID0+IFt0LmlkLCB0XSkpO1xuICAgIGNvbnN0IHNob3dSYXRpbmdNYXAgPSBuZXcgTWFwKGl0ZW1zLm1hcCgoaSkgPT4gW2kuc2hvd19pZCwgaS5yYXRpbmddKSk7XG5cbiAgICBjb25zdCB0YWdDb3VudE1hcDogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAgeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcbiAgICBjb25zdCB0YWdSYXRpbmdBY2M6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9XG4gICAgPiA9IHt9O1xuXG4gICAgZm9yIChjb25zdCByb3cgb2Ygc2hvd1RhZ1Jvd3MgPz8gW10pIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRhZ01hcC5nZXQocm93LnRhZ19pZCk7XG4gICAgICBpZiAoIXRhZykgY29udGludWU7XG5cbiAgICAgIHRhZ0NvdW50TWFwW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgIG5hbWU6IHRhZy5uYW1lLFxuICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgIH07XG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXS5jb3VudCsrO1xuXG4gICAgICBjb25zdCByYXRpbmcgPSBzaG93UmF0aW5nTWFwLmdldChyb3cuc2hvd19pZCk7XG4gICAgICBpZiAocmF0aW5nICE9IG51bGwpIHtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgICAgaWQ6IHRhZy5pZCxcbiAgICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICAgIHN1bTogMCxcbiAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdLnN1bSArPSByYXRpbmc7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5jb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRhZ0NvdW50cy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdDb3VudE1hcCkuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpLFxuICAgICk7XG4gICAgdGFnQXZnUmF0aW5ncy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdSYXRpbmdBY2MpXG4gICAgICAgIC5tYXAoKHQpID0+ICh7XG4gICAgICAgICAgaWQ6IHQuaWQsXG4gICAgICAgICAgbmFtZTogdC5uYW1lLFxuICAgICAgICAgIGNvbG9yOiB0LmNvbG9yLFxuICAgICAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgodC5zdW0gLyB0LmNvdW50KSAqIDEwKSAvIDEwLFxuICAgICAgICAgIGNvdW50OiB0LmNvdW50LFxuICAgICAgICB9KSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuYXZnUmF0aW5nIC0gYS5hdmdSYXRpbmcpLFxuICAgICk7XG4gIH1cblxuICAvLyBUaW1lbGluZTogZ3JvdXAgYnkgYWRkZWRfYXQgbW9udGggKFlZWVktTU0pXG4gIGNvbnN0IG1vbnRobHlNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtLmFkZGVkX2F0KSBjb250aW51ZTtcbiAgICBjb25zdCBtb250aCA9IGl0ZW0uYWRkZWRfYXQuc2xpY2UoMCwgNyk7XG4gICAgbW9udGhseU1hcFttb250aF0gPSAobW9udGhseU1hcFttb250aF0gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IG1vbnRobHlBZGRlZCA9IE9iamVjdC5lbnRyaWVzKG1vbnRobHlNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW21vbnRoLCBjb3VudF0pID0+ICh7IG1vbnRoLCBjb3VudCB9KSk7XG5cbiAgLy8gRGVjYWRlIGRpc3RyaWJ1dGlvbjogZ3JvdXAgYnkgZGVjYWRlIG9mIGZpcnN0X2Fpcl9kYXRlXG4gIGNvbnN0IGRlY2FkZU1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICBjb25zdCB5ZWFyQ291bnRNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgZGVjYWRlUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG4gIGNvbnN0IHllYXJSYXRpbmdBY2M6IFJlY29yZDxzdHJpbmcsIHsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfT4gPSB7fTtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBmaXJzdEFpckRhdGUgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoIWZpcnN0QWlyRGF0ZSkgY29udGludWU7XG4gICAgY29uc3QgeWVhciA9IHBhcnNlSW50KGZpcnN0QWlyRGF0ZS5zbGljZSgwLCA0KSwgMTApO1xuICAgIGlmIChpc05hTih5ZWFyKSB8fCB5ZWFyIDwgMTkwMCkgY29udGludWU7XG4gICAgY29uc3QgZGVjYWRlID0gYCR7TWF0aC5mbG9vcih5ZWFyIC8gMTApICogMTB9c2A7XG4gICAgY29uc3QgeWVhclN0ciA9IFN0cmluZyh5ZWFyKTtcblxuICAgIGRlY2FkZU1hcFtkZWNhZGVdID0gKGRlY2FkZU1hcFtkZWNhZGVdID8/IDApICsgMTtcbiAgICB5ZWFyQ291bnRNYXBbeWVhclN0cl0gPSAoeWVhckNvdW50TWFwW3llYXJTdHJdID8/IDApICsgMTtcblxuICAgIGlmIChpdGVtLnJhdGluZyAhPT0gbnVsbCkge1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uc3VtICs9IGl0ZW0ucmF0aW5nO1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uY291bnQrKztcblxuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXSA/Pz0geyBzdW06IDAsIGNvdW50OiAwIH07XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0uY291bnQrKztcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWNhZGVDb3VudHMgPSBPYmplY3QuZW50cmllcyhkZWNhZGVNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW2RlY2FkZSwgY291bnRdKSA9PiAoeyBkZWNhZGUsIGNvdW50IH0pKTtcblxuICBjb25zdCB5ZWFyQ291bnRzID0gT2JqZWN0LmVudHJpZXMoeWVhckNvdW50TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFt5ZWFyLCBjb3VudF0pID0+ICh7IHllYXIsIGNvdW50IH0pKTtcblxuICBjb25zdCBkZWNhZGVBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlUmF0aW5nQWNjKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIGRlY2FkZSxcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIGNvbnN0IHllYXJBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoeWVhclJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgeyBzdW0sIGNvdW50IH1dKSA9PiAoe1xuICAgICAgeWVhcixcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIC8vIEJ1aWxkIHNob3cgbG9va3VwIG1hcHMgZm9yIG1vZGFsIGRyaWxsLXRocm91Z2hcbiAgY29uc3Qgc2hvd3NCeVJhdGluZzogUmVjb3JkPG51bWJlciwgU2hvd1N1bW1hcnlbXT4gPSB7fTtcbiAgY29uc3Qgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IHN1bW1hcnk6IFNob3dTdW1tYXJ5ID0ge1xuICAgICAgaWQ6IGl0ZW0uc2hvd3M/LmlkID8/IGl0ZW0uc2hvd19pZCxcbiAgICAgIHRpdGxlOiBpdGVtLnNob3dzPy50aXRsZSA/PyBcIlwiLFxuICAgICAgcG9zdGVyX3BhdGg6IGl0ZW0uc2hvd3M/LnBvc3Rlcl9wYXRoID8/IG51bGwsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgZmlyc3RfYWlyX2RhdGU6IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlID8/IG51bGwsXG4gICAgfTtcbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddID8/PSBbXTtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddLnB1c2goc3VtbWFyeSk7XG4gICAgfVxuICAgIGNvbnN0IGZhZCA9IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlO1xuICAgIGlmIChmYWQpIHtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChmYWQuc2xpY2UoMCwgNCksIDEwKTtcbiAgICAgIGlmICghaXNOYU4oeSkgJiYgeSA+PSAxOTAwKSB7XG4gICAgICAgIGNvbnN0IHlyID0gU3RyaW5nKHkpO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0gPz89IFtdO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0ucHVzaChzdW1tYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsQ291bnQsXG4gICAgcmF0ZWRDb3VudCxcbiAgICBhdmdSYXRpbmcsXG4gICAgcmF0aW5nQ291bnRzLFxuICAgIHRhZ0NvdW50cyxcbiAgICB0YWdBdmdSYXRpbmdzLFxuICAgIG1vbnRobHlBZGRlZCxcbiAgICBkZWNhZGVDb3VudHMsXG4gICAgeWVhckNvdW50cyxcbiAgICBkZWNhZGVBdmdSYXRpbmdzLFxuICAgIHllYXJBdmdSYXRpbmdzLFxuICAgIHNob3dzQnlSYXRpbmcsXG4gICAgc2hvd3NCeVllYXIsXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3RJdGVtV2l0aFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxpc3RfaWQ6IHN0cmluZztcbiAgc2hvd19pZDogc3RyaW5nO1xuICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIGFkZGVkX2F0OiBzdHJpbmc7XG4gIG5vdGVzOiBzdHJpbmcgfCBudWxsO1xuICBzaG93czoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gICAgdG1kYl9mZXRjaGVkOiBib29sZWFuO1xuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RJdGVtc1BhZ2UoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplID0gNTAsXG4pOiBQcm9taXNlPHtcbiAgaXRlbXM6IExpc3RJdGVtV2l0aFNob3dbXTtcbiAgaGFzTW9yZTogYm9vbGVhbjtcbiAgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPjtcbn0+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG5cbiAgY29uc3QgeyBkYXRhOiBsaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwidXNlcl9pZCwgaXNfcHVibGljXCIpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuICBpZiAoIWxpc3QuaXNfcHVibGljICYmIGxpc3QudXNlcl9pZCAhPT0gdXNlcj8uaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IGZyb20gPSBwYWdlICogcGFnZVNpemU7XG4gIGNvbnN0IHRvID0gZnJvbSArIHBhZ2VTaXplIC0gMTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCIqLCBzaG93cygqKVwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInJhdGluZ1wiLCB7IGFzY2VuZGluZzogZmFsc2UsIG51bGxzRmlyc3Q6IGZhbHNlIH0pXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSlcbiAgICAucmFuZ2UoZnJvbSwgdG8pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIGNvbnN0IGl0ZW1zID0gKGRhdGEgPz8gW10pIGFzIHVua25vd24gYXMgTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBjb25zdCBoYXNNb3JlID0gaXRlbXMubGVuZ3RoID09PSBwYWdlU2l6ZTtcblxuICBjb25zdCBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XG4gIGlmICh1c2VyICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB7IGRhdGE6IHNob3dUYWdzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93X3RhZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJzaG93X2lkLCB0YWdfaWRcIilcbiAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAgIC5pbihcbiAgICAgICAgXCJzaG93X2lkXCIsXG4gICAgICAgIGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93cy5pZCksXG4gICAgICApO1xuXG4gICAgZm9yIChjb25zdCBzdCBvZiBzaG93VGFncyA/PyBbXSkge1xuICAgICAgaWYgKCFzaG93VGFnc01hcFtzdC5zaG93X2lkXSkgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0gPSBbXTtcbiAgICAgIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdLnB1c2goc3QudGFnX2lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpdGVtcywgaGFzTW9yZSwgc2hvd1RhZ3NNYXAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb015TGlzdChzaG93OiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBFbnN1cmUgdGhlIHNob3cgZXhpc3RzIGluIG91ciBEQiAocmV1c2UgZXhpc3Rpbmcgb3IgY3JlYXRlKVxuICBsZXQgc2hvd0lkID0gc2hvdy5pZDtcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlkXCIsIHNob3cuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb25cbiAgY29uc3QgeyBkYXRhOiBpdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgY29uc3QgbmV4dFBvc2l0aW9uID0gKGl0ZW1zPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcImxpc3RfaXRlbXNcIikuaW5zZXJ0KHtcbiAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgc2hvd19pZDogc2hvd0lkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG1kYlNob3dUb015TGlzdChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuXG4gIC8vIEZpbmQgb3IgY3JlYXRlIHRoZSBzaG93IGJ5IHRtZGJfaWRcbiAgbGV0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ0bWRiX2lkXCIsIHNob3cudG1kYl9pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yOiBzaG93RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIGV4aXN0aW5nU2hvdyA9IG5ld1Nob3c7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbHJlYWR5IGluIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIGV4aXN0aW5nU2hvdyEuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IGV4aXN0aW5nU2hvdyEuaWQsXG4gICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgfSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb3B5TGlzdFRvTWluZShzb3VyY2VMaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVmVyaWZ5IHNvdXJjZSBsaXN0IGlzIHB1YmxpYyAob3Igb3duZWQgYnkgdXNlcilcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VMaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWQsIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIk93biBsaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBWZXJpZnkgb3duIGxpc3QgaXMgZW1wdHlcbiAgY29uc3QgeyBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiBcImV4YWN0XCIsIGhlYWQ6IHRydWUgfSlcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZCk7XG5cbiAgaWYgKChjb3VudCA/PyAwKSA+IDApIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IGNvcHkgdG8gYW4gZW1wdHkgbGlzdFwiKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZnJvbSBzb3VyY2UgbGlzdFxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uLCBub3Rlc1wiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgc291cmNlTGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmIChzb3VyY2VJdGVtcyAmJiBzb3VyY2VJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaW5zZXJ0cyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICAgIHNob3dfaWQ6IGl0ZW0uc2hvd19pZCxcbiAgICAgIHJhdGluZzogaXRlbS5yYXRpbmcsXG4gICAgICBwb3NpdGlvbjogaXRlbS5wb3NpdGlvbixcbiAgICAgIG5vdGVzOiBpdGVtLm5vdGVzLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHsgZXJyb3I6IGluc2VydEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAuaW5zZXJ0KGluc2VydHMpO1xuXG4gICAgaWYgKGluc2VydEVycm9yKSB0aHJvdyBuZXcgRXJyb3IoaW5zZXJ0RXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoieVRBNEhzQiw2TEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/data:c58d8a [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateShowNotes",
    ()=>$$RSC_SERVER_ACTION_4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"70816a23f7c82d36f97f7366127cb907c61cf73044":"updateShowNotes"},"packages/web/src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("70816a23f7c82d36f97f7366127cb907c61cf73044", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateShowNotes");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xuICAvLyBTZWFzb24gLyBkdXJhdGlvbiBzdGF0c1xuICBtb3N0U2Vhc29uc1Nob3c6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBtb3N0U2Vhc29uc0J5WWVhcjoge1xuICAgIHllYXI6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgfVtdO1xuICBsb25nZXN0U2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICB0b3RhbE1pbnV0ZXM6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG4gIG1vc3RTZWFzb25zU2hvdzogbnVsbCxcbiAgbW9zdFNlYXNvbnNCeVllYXI6IFtdLFxuICBsb25nZXN0U2hvdzogbnVsbCxcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbmFseXRpY3MgZm9yIGEgbGlzdC5cbiAqIC0gTm8gbGlzdElkIOKGkiB0aGUgYXV0aGVudGljYXRlZCB1c2VyJ3Mgb3duIGxpc3QuXG4gKiAtIFdpdGggbGlzdElkIOKGkiBhbnkgcHVibGljIGxpc3QgKG93bmVyJ3MgdGFncyBhcmUgc2hvd24pLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEFuYWx5dGljcyhcbiAgbGlzdElkPzogc3RyaW5nLFxuKTogUHJvbWlzZTxBbmFseXRpY3NEYXRhPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGxldCByZXNvbHZlZExpc3RJZDogc3RyaW5nO1xuICBsZXQgb3duZXJJZDogc3RyaW5nO1xuXG4gIGlmIChsaXN0SWQpIHtcbiAgICAvLyBWaWV3aW5nIHNvbWVvbmUgZWxzZSdzIChvciBvd24pIGxpc3QgYnkgZXhwbGljaXQgaWRcbiAgICBjb25zdCB7IGRhdGE6IGxpc3RSb3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgICAuc2VsZWN0KFwiaWQsIHVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgICAgLnNpbmdsZSgpO1xuICAgIGlmICghbGlzdFJvdykgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICAvLyBPbmx5IGFsbG93IGFjY2VzcyBpZiBwdWJsaWMgb3Igb3duZWQgYnkgdGhlIGxvZ2dlZC1pbiB1c2VyXG4gICAgaWYgKCFsaXN0Um93LmlzX3B1YmxpYyAmJiBsaXN0Um93LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgICAgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3RSb3cuaWQ7XG4gICAgb3duZXJJZCA9IGxpc3RSb3cudXNlcl9pZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICAgIGlmICghbGlzdCkgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3QuaWQ7XG4gICAgb3duZXJJZCA9IHVzZXIuaWQ7XG4gIH1cblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgKG5vIHBhZ2luYXRpb24pIOKAlCByYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBmaXJzdF9haXJfZGF0ZSB2aWEgam9pblxuICB0eXBlIFJhd0l0ZW0gPSB7XG4gICAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICAgIHNob3dfaWQ6IHN0cmluZztcbiAgICBhZGRlZF9hdDogc3RyaW5nIHwgbnVsbDtcbiAgICBzaG93czoge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIH0gfCBudWxsO1xuICB9O1xuICBjb25zdCB7IGRhdGE6IHJhd0l0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXG4gICAgICBcInJhdGluZywgc2hvd19pZCwgYWRkZWRfYXQsIHNob3dzKGlkLCB0aXRsZSwgcG9zdGVyX3BhdGgsIGZpcnN0X2Fpcl9kYXRlKVwiLFxuICAgIClcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHJlc29sdmVkTGlzdElkKTtcblxuICBjb25zdCBpdGVtcyA9IChyYXdJdGVtcyA/PyBbXSkgYXMgUmF3SXRlbVtdO1xuICBjb25zdCB0b3RhbENvdW50ID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCByYXRlZFJvd3MgPSBpdGVtcy5maWx0ZXIoKHIpID0+IHIucmF0aW5nICE9PSBudWxsKTtcbiAgY29uc3QgcmF0ZWRDb3VudCA9IHJhdGVkUm93cy5sZW5ndGg7XG4gIGNvbnN0IGF2Z1JhdGluZyA9XG4gICAgcmF0ZWRDb3VudCA+IDBcbiAgICAgID8gTWF0aC5yb3VuZChcbiAgICAgICAgICAocmF0ZWRSb3dzLnJlZHVjZSgocywgcikgPT4gcyArIHIucmF0aW5nISwgMCkgLyByYXRlZENvdW50KSAqIDEwLFxuICAgICAgICApIC8gMTBcbiAgICAgIDogbnVsbDtcblxuICAvLyBSYXRpbmcgZGlzdHJpYnV0aW9uXG4gIGNvbnN0IHJhdGluZ01hcDogUmVjb3JkPG51bWJlciwgbnVtYmVyPiA9IHt9O1xuICBmb3IgKGxldCByID0gMTsgciA8PSAxMDsgcisrKSByYXRpbmdNYXBbcl0gPSAwO1xuICBmb3IgKGNvbnN0IHJvdyBvZiBpdGVtcykge1xuICAgIGlmIChyb3cucmF0aW5nICE9PSBudWxsKVxuICAgICAgcmF0aW5nTWFwW3Jvdy5yYXRpbmddID0gKHJhdGluZ01hcFtyb3cucmF0aW5nXSA/PyAwKSArIDE7XG4gIH1cbiAgY29uc3QgcmF0aW5nQ291bnRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogcmF0aW5nTWFwW2kgKyAxXSxcbiAgfSkpO1xuXG4gIC8vIFRhZyBkaXN0cmlidXRpb24g4oCUIHVzZSB0aGUgbGlzdCBvd25lcidzIHRhZ3NcbiAgY29uc3Qgc2hvd0lkcyA9IGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93X2lkKTtcbiAgY29uc3QgdGFnQ291bnRzOiBBbmFseXRpY3NEYXRhW1widGFnQ291bnRzXCJdID0gW107XG4gIGNvbnN0IHRhZ0F2Z1JhdGluZ3M6IEFuYWx5dGljc0RhdGFbXCJ0YWdBdmdSYXRpbmdzXCJdID0gW107XG5cbiAgaWYgKHNob3dJZHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IFt7IGRhdGE6IHNob3dUYWdSb3dzIH0sIHsgZGF0YTogdGFnRGVmcyB9XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJ0YWdfaWQsIHNob3dfaWRcIilcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCBvd25lcklkKVxuICAgICAgICAuaW4oXCJzaG93X2lkXCIsIHNob3dJZHMpLFxuICAgICAgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgY29sb3JcIilcbiAgICAgICAgLm9yKGBpc19kZWZhdWx0LmVxLnRydWUsdXNlcl9pZC5lcS4ke293bmVySWR9YCksXG4gICAgXSk7XG5cbiAgICBjb25zdCB0YWdNYXAgPSBuZXcgTWFwKCh0YWdEZWZzID8/IFtdKS5tYXAoKHQpID0+IFt0LmlkLCB0XSkpO1xuICAgIGNvbnN0IHNob3dSYXRpbmdNYXAgPSBuZXcgTWFwKGl0ZW1zLm1hcCgoaSkgPT4gW2kuc2hvd19pZCwgaS5yYXRpbmddKSk7XG5cbiAgICBjb25zdCB0YWdDb3VudE1hcDogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAgeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcbiAgICBjb25zdCB0YWdSYXRpbmdBY2M6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9XG4gICAgPiA9IHt9O1xuXG4gICAgZm9yIChjb25zdCByb3cgb2Ygc2hvd1RhZ1Jvd3MgPz8gW10pIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRhZ01hcC5nZXQocm93LnRhZ19pZCk7XG4gICAgICBpZiAoIXRhZykgY29udGludWU7XG5cbiAgICAgIHRhZ0NvdW50TWFwW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgIG5hbWU6IHRhZy5uYW1lLFxuICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgIH07XG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXS5jb3VudCsrO1xuXG4gICAgICBjb25zdCByYXRpbmcgPSBzaG93UmF0aW5nTWFwLmdldChyb3cuc2hvd19pZCk7XG4gICAgICBpZiAocmF0aW5nICE9IG51bGwpIHtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgICAgaWQ6IHRhZy5pZCxcbiAgICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICAgIHN1bTogMCxcbiAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdLnN1bSArPSByYXRpbmc7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5jb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRhZ0NvdW50cy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdDb3VudE1hcCkuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpLFxuICAgICk7XG4gICAgdGFnQXZnUmF0aW5ncy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdSYXRpbmdBY2MpXG4gICAgICAgIC5tYXAoKHQpID0+ICh7XG4gICAgICAgICAgaWQ6IHQuaWQsXG4gICAgICAgICAgbmFtZTogdC5uYW1lLFxuICAgICAgICAgIGNvbG9yOiB0LmNvbG9yLFxuICAgICAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgodC5zdW0gLyB0LmNvdW50KSAqIDEwKSAvIDEwLFxuICAgICAgICAgIGNvdW50OiB0LmNvdW50LFxuICAgICAgICB9KSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuYXZnUmF0aW5nIC0gYS5hdmdSYXRpbmcpLFxuICAgICk7XG4gIH1cblxuICAvLyBUaW1lbGluZTogZ3JvdXAgYnkgYWRkZWRfYXQgbW9udGggKFlZWVktTU0pXG4gIGNvbnN0IG1vbnRobHlNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtLmFkZGVkX2F0KSBjb250aW51ZTtcbiAgICBjb25zdCBtb250aCA9IGl0ZW0uYWRkZWRfYXQuc2xpY2UoMCwgNyk7XG4gICAgbW9udGhseU1hcFttb250aF0gPSAobW9udGhseU1hcFttb250aF0gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IG1vbnRobHlBZGRlZCA9IE9iamVjdC5lbnRyaWVzKG1vbnRobHlNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW21vbnRoLCBjb3VudF0pID0+ICh7IG1vbnRoLCBjb3VudCB9KSk7XG5cbiAgLy8gRGVjYWRlIGRpc3RyaWJ1dGlvbjogZ3JvdXAgYnkgZGVjYWRlIG9mIGZpcnN0X2Fpcl9kYXRlXG4gIGNvbnN0IGRlY2FkZU1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICBjb25zdCB5ZWFyQ291bnRNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgZGVjYWRlUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG4gIGNvbnN0IHllYXJSYXRpbmdBY2M6IFJlY29yZDxzdHJpbmcsIHsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfT4gPSB7fTtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBmaXJzdEFpckRhdGUgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoIWZpcnN0QWlyRGF0ZSkgY29udGludWU7XG4gICAgY29uc3QgeWVhciA9IHBhcnNlSW50KGZpcnN0QWlyRGF0ZS5zbGljZSgwLCA0KSwgMTApO1xuICAgIGlmIChpc05hTih5ZWFyKSB8fCB5ZWFyIDwgMTkwMCkgY29udGludWU7XG4gICAgY29uc3QgZGVjYWRlID0gYCR7TWF0aC5mbG9vcih5ZWFyIC8gMTApICogMTB9c2A7XG4gICAgY29uc3QgeWVhclN0ciA9IFN0cmluZyh5ZWFyKTtcblxuICAgIGRlY2FkZU1hcFtkZWNhZGVdID0gKGRlY2FkZU1hcFtkZWNhZGVdID8/IDApICsgMTtcbiAgICB5ZWFyQ291bnRNYXBbeWVhclN0cl0gPSAoeWVhckNvdW50TWFwW3llYXJTdHJdID8/IDApICsgMTtcblxuICAgIGlmIChpdGVtLnJhdGluZyAhPT0gbnVsbCkge1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uc3VtICs9IGl0ZW0ucmF0aW5nO1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uY291bnQrKztcblxuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXSA/Pz0geyBzdW06IDAsIGNvdW50OiAwIH07XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0uY291bnQrKztcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWNhZGVDb3VudHMgPSBPYmplY3QuZW50cmllcyhkZWNhZGVNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW2RlY2FkZSwgY291bnRdKSA9PiAoeyBkZWNhZGUsIGNvdW50IH0pKTtcblxuICBjb25zdCB5ZWFyQ291bnRzID0gT2JqZWN0LmVudHJpZXMoeWVhckNvdW50TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFt5ZWFyLCBjb3VudF0pID0+ICh7IHllYXIsIGNvdW50IH0pKTtcblxuICBjb25zdCBkZWNhZGVBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlUmF0aW5nQWNjKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIGRlY2FkZSxcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIGNvbnN0IHllYXJBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoeWVhclJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgeyBzdW0sIGNvdW50IH1dKSA9PiAoe1xuICAgICAgeWVhcixcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIC8vIEJ1aWxkIHNob3cgbG9va3VwIG1hcHMgZm9yIG1vZGFsIGRyaWxsLXRocm91Z2hcbiAgY29uc3Qgc2hvd3NCeVJhdGluZzogUmVjb3JkPG51bWJlciwgU2hvd1N1bW1hcnlbXT4gPSB7fTtcbiAgY29uc3Qgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IHN1bW1hcnk6IFNob3dTdW1tYXJ5ID0ge1xuICAgICAgaWQ6IGl0ZW0uc2hvd3M/LmlkID8/IGl0ZW0uc2hvd19pZCxcbiAgICAgIHRpdGxlOiBpdGVtLnNob3dzPy50aXRsZSA/PyBcIlwiLFxuICAgICAgcG9zdGVyX3BhdGg6IGl0ZW0uc2hvd3M/LnBvc3Rlcl9wYXRoID8/IG51bGwsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgZmlyc3RfYWlyX2RhdGU6IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlID8/IG51bGwsXG4gICAgfTtcbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddID8/PSBbXTtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddLnB1c2goc3VtbWFyeSk7XG4gICAgfVxuICAgIGNvbnN0IGZhZCA9IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlO1xuICAgIGlmIChmYWQpIHtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChmYWQuc2xpY2UoMCwgNCksIDEwKTtcbiAgICAgIGlmICghaXNOYU4oeSkgJiYgeSA+PSAxOTAwKSB7XG4gICAgICAgIGNvbnN0IHlyID0gU3RyaW5nKHkpO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0gPz89IFtdO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0ucHVzaChzdW1tYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsQ291bnQsXG4gICAgcmF0ZWRDb3VudCxcbiAgICBhdmdSYXRpbmcsXG4gICAgcmF0aW5nQ291bnRzLFxuICAgIHRhZ0NvdW50cyxcbiAgICB0YWdBdmdSYXRpbmdzLFxuICAgIG1vbnRobHlBZGRlZCxcbiAgICBkZWNhZGVDb3VudHMsXG4gICAgeWVhckNvdW50cyxcbiAgICBkZWNhZGVBdmdSYXRpbmdzLFxuICAgIHllYXJBdmdSYXRpbmdzLFxuICAgIHNob3dzQnlSYXRpbmcsXG4gICAgc2hvd3NCeVllYXIsXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3RJdGVtV2l0aFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxpc3RfaWQ6IHN0cmluZztcbiAgc2hvd19pZDogc3RyaW5nO1xuICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIGFkZGVkX2F0OiBzdHJpbmc7XG4gIG5vdGVzOiBzdHJpbmcgfCBudWxsO1xuICBzaG93czoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gICAgdG1kYl9mZXRjaGVkOiBib29sZWFuO1xuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RJdGVtc1BhZ2UoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplID0gNTAsXG4pOiBQcm9taXNlPHtcbiAgaXRlbXM6IExpc3RJdGVtV2l0aFNob3dbXTtcbiAgaGFzTW9yZTogYm9vbGVhbjtcbiAgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPjtcbn0+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG5cbiAgY29uc3QgeyBkYXRhOiBsaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwidXNlcl9pZCwgaXNfcHVibGljXCIpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuICBpZiAoIWxpc3QuaXNfcHVibGljICYmIGxpc3QudXNlcl9pZCAhPT0gdXNlcj8uaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IGZyb20gPSBwYWdlICogcGFnZVNpemU7XG4gIGNvbnN0IHRvID0gZnJvbSArIHBhZ2VTaXplIC0gMTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCIqLCBzaG93cygqKVwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInJhdGluZ1wiLCB7IGFzY2VuZGluZzogZmFsc2UsIG51bGxzRmlyc3Q6IGZhbHNlIH0pXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSlcbiAgICAucmFuZ2UoZnJvbSwgdG8pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIGNvbnN0IGl0ZW1zID0gKGRhdGEgPz8gW10pIGFzIHVua25vd24gYXMgTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBjb25zdCBoYXNNb3JlID0gaXRlbXMubGVuZ3RoID09PSBwYWdlU2l6ZTtcblxuICBjb25zdCBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XG4gIGlmICh1c2VyICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB7IGRhdGE6IHNob3dUYWdzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93X3RhZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJzaG93X2lkLCB0YWdfaWRcIilcbiAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAgIC5pbihcbiAgICAgICAgXCJzaG93X2lkXCIsXG4gICAgICAgIGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93cy5pZCksXG4gICAgICApO1xuXG4gICAgZm9yIChjb25zdCBzdCBvZiBzaG93VGFncyA/PyBbXSkge1xuICAgICAgaWYgKCFzaG93VGFnc01hcFtzdC5zaG93X2lkXSkgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0gPSBbXTtcbiAgICAgIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdLnB1c2goc3QudGFnX2lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpdGVtcywgaGFzTW9yZSwgc2hvd1RhZ3NNYXAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb015TGlzdChzaG93OiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBFbnN1cmUgdGhlIHNob3cgZXhpc3RzIGluIG91ciBEQiAocmV1c2UgZXhpc3Rpbmcgb3IgY3JlYXRlKVxuICBsZXQgc2hvd0lkID0gc2hvdy5pZDtcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlkXCIsIHNob3cuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb25cbiAgY29uc3QgeyBkYXRhOiBpdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgY29uc3QgbmV4dFBvc2l0aW9uID0gKGl0ZW1zPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcImxpc3RfaXRlbXNcIikuaW5zZXJ0KHtcbiAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgc2hvd19pZDogc2hvd0lkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG1kYlNob3dUb015TGlzdChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuXG4gIC8vIEZpbmQgb3IgY3JlYXRlIHRoZSBzaG93IGJ5IHRtZGJfaWRcbiAgbGV0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ0bWRiX2lkXCIsIHNob3cudG1kYl9pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yOiBzaG93RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIGV4aXN0aW5nU2hvdyA9IG5ld1Nob3c7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbHJlYWR5IGluIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIGV4aXN0aW5nU2hvdyEuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IGV4aXN0aW5nU2hvdyEuaWQsXG4gICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgfSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb3B5TGlzdFRvTWluZShzb3VyY2VMaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVmVyaWZ5IHNvdXJjZSBsaXN0IGlzIHB1YmxpYyAob3Igb3duZWQgYnkgdXNlcilcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VMaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWQsIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIk93biBsaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBWZXJpZnkgb3duIGxpc3QgaXMgZW1wdHlcbiAgY29uc3QgeyBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiBcImV4YWN0XCIsIGhlYWQ6IHRydWUgfSlcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZCk7XG5cbiAgaWYgKChjb3VudCA/PyAwKSA+IDApIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IGNvcHkgdG8gYW4gZW1wdHkgbGlzdFwiKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZnJvbSBzb3VyY2UgbGlzdFxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uLCBub3Rlc1wiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgc291cmNlTGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmIChzb3VyY2VJdGVtcyAmJiBzb3VyY2VJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaW5zZXJ0cyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICAgIHNob3dfaWQ6IGl0ZW0uc2hvd19pZCxcbiAgICAgIHJhdGluZzogaXRlbS5yYXRpbmcsXG4gICAgICBwb3NpdGlvbjogaXRlbS5wb3NpdGlvbixcbiAgICAgIG5vdGVzOiBpdGVtLm5vdGVzLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHsgZXJyb3I6IGluc2VydEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAuaW5zZXJ0KGluc2VydHMpO1xuXG4gICAgaWYgKGluc2VydEVycm9yKSB0aHJvdyBuZXcgRXJyb3IoaW5zZXJ0RXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoid1RBbUpzQiw0TEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/data:e9cb7c [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reorderListItems",
    ()=>$$RSC_SERVER_ACTION_5
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"606f806e5adccbf0d63647ccf6da05daa7b62c2fbd":"reorderListItems"},"packages/web/src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("606f806e5adccbf0d63647ccf6da05daa7b62c2fbd", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "reorderListItems");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xuICAvLyBTZWFzb24gLyBkdXJhdGlvbiBzdGF0c1xuICBtb3N0U2Vhc29uc1Nob3c6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBtb3N0U2Vhc29uc0J5WWVhcjoge1xuICAgIHllYXI6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgfVtdO1xuICBsb25nZXN0U2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICB0b3RhbE1pbnV0ZXM6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG4gIG1vc3RTZWFzb25zU2hvdzogbnVsbCxcbiAgbW9zdFNlYXNvbnNCeVllYXI6IFtdLFxuICBsb25nZXN0U2hvdzogbnVsbCxcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbmFseXRpY3MgZm9yIGEgbGlzdC5cbiAqIC0gTm8gbGlzdElkIOKGkiB0aGUgYXV0aGVudGljYXRlZCB1c2VyJ3Mgb3duIGxpc3QuXG4gKiAtIFdpdGggbGlzdElkIOKGkiBhbnkgcHVibGljIGxpc3QgKG93bmVyJ3MgdGFncyBhcmUgc2hvd24pLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEFuYWx5dGljcyhcbiAgbGlzdElkPzogc3RyaW5nLFxuKTogUHJvbWlzZTxBbmFseXRpY3NEYXRhPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGxldCByZXNvbHZlZExpc3RJZDogc3RyaW5nO1xuICBsZXQgb3duZXJJZDogc3RyaW5nO1xuXG4gIGlmIChsaXN0SWQpIHtcbiAgICAvLyBWaWV3aW5nIHNvbWVvbmUgZWxzZSdzIChvciBvd24pIGxpc3QgYnkgZXhwbGljaXQgaWRcbiAgICBjb25zdCB7IGRhdGE6IGxpc3RSb3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgICAuc2VsZWN0KFwiaWQsIHVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgICAgLnNpbmdsZSgpO1xuICAgIGlmICghbGlzdFJvdykgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICAvLyBPbmx5IGFsbG93IGFjY2VzcyBpZiBwdWJsaWMgb3Igb3duZWQgYnkgdGhlIGxvZ2dlZC1pbiB1c2VyXG4gICAgaWYgKCFsaXN0Um93LmlzX3B1YmxpYyAmJiBsaXN0Um93LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgICAgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3RSb3cuaWQ7XG4gICAgb3duZXJJZCA9IGxpc3RSb3cudXNlcl9pZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICAgIGlmICghbGlzdCkgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3QuaWQ7XG4gICAgb3duZXJJZCA9IHVzZXIuaWQ7XG4gIH1cblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgKG5vIHBhZ2luYXRpb24pIOKAlCByYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBmaXJzdF9haXJfZGF0ZSB2aWEgam9pblxuICB0eXBlIFJhd0l0ZW0gPSB7XG4gICAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICAgIHNob3dfaWQ6IHN0cmluZztcbiAgICBhZGRlZF9hdDogc3RyaW5nIHwgbnVsbDtcbiAgICBzaG93czoge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIH0gfCBudWxsO1xuICB9O1xuICBjb25zdCB7IGRhdGE6IHJhd0l0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXG4gICAgICBcInJhdGluZywgc2hvd19pZCwgYWRkZWRfYXQsIHNob3dzKGlkLCB0aXRsZSwgcG9zdGVyX3BhdGgsIGZpcnN0X2Fpcl9kYXRlKVwiLFxuICAgIClcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHJlc29sdmVkTGlzdElkKTtcblxuICBjb25zdCBpdGVtcyA9IChyYXdJdGVtcyA/PyBbXSkgYXMgUmF3SXRlbVtdO1xuICBjb25zdCB0b3RhbENvdW50ID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCByYXRlZFJvd3MgPSBpdGVtcy5maWx0ZXIoKHIpID0+IHIucmF0aW5nICE9PSBudWxsKTtcbiAgY29uc3QgcmF0ZWRDb3VudCA9IHJhdGVkUm93cy5sZW5ndGg7XG4gIGNvbnN0IGF2Z1JhdGluZyA9XG4gICAgcmF0ZWRDb3VudCA+IDBcbiAgICAgID8gTWF0aC5yb3VuZChcbiAgICAgICAgICAocmF0ZWRSb3dzLnJlZHVjZSgocywgcikgPT4gcyArIHIucmF0aW5nISwgMCkgLyByYXRlZENvdW50KSAqIDEwLFxuICAgICAgICApIC8gMTBcbiAgICAgIDogbnVsbDtcblxuICAvLyBSYXRpbmcgZGlzdHJpYnV0aW9uXG4gIGNvbnN0IHJhdGluZ01hcDogUmVjb3JkPG51bWJlciwgbnVtYmVyPiA9IHt9O1xuICBmb3IgKGxldCByID0gMTsgciA8PSAxMDsgcisrKSByYXRpbmdNYXBbcl0gPSAwO1xuICBmb3IgKGNvbnN0IHJvdyBvZiBpdGVtcykge1xuICAgIGlmIChyb3cucmF0aW5nICE9PSBudWxsKVxuICAgICAgcmF0aW5nTWFwW3Jvdy5yYXRpbmddID0gKHJhdGluZ01hcFtyb3cucmF0aW5nXSA/PyAwKSArIDE7XG4gIH1cbiAgY29uc3QgcmF0aW5nQ291bnRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogcmF0aW5nTWFwW2kgKyAxXSxcbiAgfSkpO1xuXG4gIC8vIFRhZyBkaXN0cmlidXRpb24g4oCUIHVzZSB0aGUgbGlzdCBvd25lcidzIHRhZ3NcbiAgY29uc3Qgc2hvd0lkcyA9IGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93X2lkKTtcbiAgY29uc3QgdGFnQ291bnRzOiBBbmFseXRpY3NEYXRhW1widGFnQ291bnRzXCJdID0gW107XG4gIGNvbnN0IHRhZ0F2Z1JhdGluZ3M6IEFuYWx5dGljc0RhdGFbXCJ0YWdBdmdSYXRpbmdzXCJdID0gW107XG5cbiAgaWYgKHNob3dJZHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IFt7IGRhdGE6IHNob3dUYWdSb3dzIH0sIHsgZGF0YTogdGFnRGVmcyB9XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJ0YWdfaWQsIHNob3dfaWRcIilcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCBvd25lcklkKVxuICAgICAgICAuaW4oXCJzaG93X2lkXCIsIHNob3dJZHMpLFxuICAgICAgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgY29sb3JcIilcbiAgICAgICAgLm9yKGBpc19kZWZhdWx0LmVxLnRydWUsdXNlcl9pZC5lcS4ke293bmVySWR9YCksXG4gICAgXSk7XG5cbiAgICBjb25zdCB0YWdNYXAgPSBuZXcgTWFwKCh0YWdEZWZzID8/IFtdKS5tYXAoKHQpID0+IFt0LmlkLCB0XSkpO1xuICAgIGNvbnN0IHNob3dSYXRpbmdNYXAgPSBuZXcgTWFwKGl0ZW1zLm1hcCgoaSkgPT4gW2kuc2hvd19pZCwgaS5yYXRpbmddKSk7XG5cbiAgICBjb25zdCB0YWdDb3VudE1hcDogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAgeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcbiAgICBjb25zdCB0YWdSYXRpbmdBY2M6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9XG4gICAgPiA9IHt9O1xuXG4gICAgZm9yIChjb25zdCByb3cgb2Ygc2hvd1RhZ1Jvd3MgPz8gW10pIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRhZ01hcC5nZXQocm93LnRhZ19pZCk7XG4gICAgICBpZiAoIXRhZykgY29udGludWU7XG5cbiAgICAgIHRhZ0NvdW50TWFwW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgIG5hbWU6IHRhZy5uYW1lLFxuICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgIH07XG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXS5jb3VudCsrO1xuXG4gICAgICBjb25zdCByYXRpbmcgPSBzaG93UmF0aW5nTWFwLmdldChyb3cuc2hvd19pZCk7XG4gICAgICBpZiAocmF0aW5nICE9IG51bGwpIHtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgICAgaWQ6IHRhZy5pZCxcbiAgICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICAgIHN1bTogMCxcbiAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdLnN1bSArPSByYXRpbmc7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5jb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRhZ0NvdW50cy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdDb3VudE1hcCkuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpLFxuICAgICk7XG4gICAgdGFnQXZnUmF0aW5ncy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdSYXRpbmdBY2MpXG4gICAgICAgIC5tYXAoKHQpID0+ICh7XG4gICAgICAgICAgaWQ6IHQuaWQsXG4gICAgICAgICAgbmFtZTogdC5uYW1lLFxuICAgICAgICAgIGNvbG9yOiB0LmNvbG9yLFxuICAgICAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgodC5zdW0gLyB0LmNvdW50KSAqIDEwKSAvIDEwLFxuICAgICAgICAgIGNvdW50OiB0LmNvdW50LFxuICAgICAgICB9KSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuYXZnUmF0aW5nIC0gYS5hdmdSYXRpbmcpLFxuICAgICk7XG4gIH1cblxuICAvLyBUaW1lbGluZTogZ3JvdXAgYnkgYWRkZWRfYXQgbW9udGggKFlZWVktTU0pXG4gIGNvbnN0IG1vbnRobHlNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtLmFkZGVkX2F0KSBjb250aW51ZTtcbiAgICBjb25zdCBtb250aCA9IGl0ZW0uYWRkZWRfYXQuc2xpY2UoMCwgNyk7XG4gICAgbW9udGhseU1hcFttb250aF0gPSAobW9udGhseU1hcFttb250aF0gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IG1vbnRobHlBZGRlZCA9IE9iamVjdC5lbnRyaWVzKG1vbnRobHlNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW21vbnRoLCBjb3VudF0pID0+ICh7IG1vbnRoLCBjb3VudCB9KSk7XG5cbiAgLy8gRGVjYWRlIGRpc3RyaWJ1dGlvbjogZ3JvdXAgYnkgZGVjYWRlIG9mIGZpcnN0X2Fpcl9kYXRlXG4gIGNvbnN0IGRlY2FkZU1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICBjb25zdCB5ZWFyQ291bnRNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgZGVjYWRlUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG4gIGNvbnN0IHllYXJSYXRpbmdBY2M6IFJlY29yZDxzdHJpbmcsIHsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfT4gPSB7fTtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBmaXJzdEFpckRhdGUgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoIWZpcnN0QWlyRGF0ZSkgY29udGludWU7XG4gICAgY29uc3QgeWVhciA9IHBhcnNlSW50KGZpcnN0QWlyRGF0ZS5zbGljZSgwLCA0KSwgMTApO1xuICAgIGlmIChpc05hTih5ZWFyKSB8fCB5ZWFyIDwgMTkwMCkgY29udGludWU7XG4gICAgY29uc3QgZGVjYWRlID0gYCR7TWF0aC5mbG9vcih5ZWFyIC8gMTApICogMTB9c2A7XG4gICAgY29uc3QgeWVhclN0ciA9IFN0cmluZyh5ZWFyKTtcblxuICAgIGRlY2FkZU1hcFtkZWNhZGVdID0gKGRlY2FkZU1hcFtkZWNhZGVdID8/IDApICsgMTtcbiAgICB5ZWFyQ291bnRNYXBbeWVhclN0cl0gPSAoeWVhckNvdW50TWFwW3llYXJTdHJdID8/IDApICsgMTtcblxuICAgIGlmIChpdGVtLnJhdGluZyAhPT0gbnVsbCkge1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uc3VtICs9IGl0ZW0ucmF0aW5nO1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uY291bnQrKztcblxuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXSA/Pz0geyBzdW06IDAsIGNvdW50OiAwIH07XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0uY291bnQrKztcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWNhZGVDb3VudHMgPSBPYmplY3QuZW50cmllcyhkZWNhZGVNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW2RlY2FkZSwgY291bnRdKSA9PiAoeyBkZWNhZGUsIGNvdW50IH0pKTtcblxuICBjb25zdCB5ZWFyQ291bnRzID0gT2JqZWN0LmVudHJpZXMoeWVhckNvdW50TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFt5ZWFyLCBjb3VudF0pID0+ICh7IHllYXIsIGNvdW50IH0pKTtcblxuICBjb25zdCBkZWNhZGVBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlUmF0aW5nQWNjKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIGRlY2FkZSxcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIGNvbnN0IHllYXJBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoeWVhclJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgeyBzdW0sIGNvdW50IH1dKSA9PiAoe1xuICAgICAgeWVhcixcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIC8vIEJ1aWxkIHNob3cgbG9va3VwIG1hcHMgZm9yIG1vZGFsIGRyaWxsLXRocm91Z2hcbiAgY29uc3Qgc2hvd3NCeVJhdGluZzogUmVjb3JkPG51bWJlciwgU2hvd1N1bW1hcnlbXT4gPSB7fTtcbiAgY29uc3Qgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IHN1bW1hcnk6IFNob3dTdW1tYXJ5ID0ge1xuICAgICAgaWQ6IGl0ZW0uc2hvd3M/LmlkID8/IGl0ZW0uc2hvd19pZCxcbiAgICAgIHRpdGxlOiBpdGVtLnNob3dzPy50aXRsZSA/PyBcIlwiLFxuICAgICAgcG9zdGVyX3BhdGg6IGl0ZW0uc2hvd3M/LnBvc3Rlcl9wYXRoID8/IG51bGwsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgZmlyc3RfYWlyX2RhdGU6IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlID8/IG51bGwsXG4gICAgfTtcbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddID8/PSBbXTtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddLnB1c2goc3VtbWFyeSk7XG4gICAgfVxuICAgIGNvbnN0IGZhZCA9IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlO1xuICAgIGlmIChmYWQpIHtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChmYWQuc2xpY2UoMCwgNCksIDEwKTtcbiAgICAgIGlmICghaXNOYU4oeSkgJiYgeSA+PSAxOTAwKSB7XG4gICAgICAgIGNvbnN0IHlyID0gU3RyaW5nKHkpO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0gPz89IFtdO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0ucHVzaChzdW1tYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsQ291bnQsXG4gICAgcmF0ZWRDb3VudCxcbiAgICBhdmdSYXRpbmcsXG4gICAgcmF0aW5nQ291bnRzLFxuICAgIHRhZ0NvdW50cyxcbiAgICB0YWdBdmdSYXRpbmdzLFxuICAgIG1vbnRobHlBZGRlZCxcbiAgICBkZWNhZGVDb3VudHMsXG4gICAgeWVhckNvdW50cyxcbiAgICBkZWNhZGVBdmdSYXRpbmdzLFxuICAgIHllYXJBdmdSYXRpbmdzLFxuICAgIHNob3dzQnlSYXRpbmcsXG4gICAgc2hvd3NCeVllYXIsXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3RJdGVtV2l0aFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxpc3RfaWQ6IHN0cmluZztcbiAgc2hvd19pZDogc3RyaW5nO1xuICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIGFkZGVkX2F0OiBzdHJpbmc7XG4gIG5vdGVzOiBzdHJpbmcgfCBudWxsO1xuICBzaG93czoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gICAgdG1kYl9mZXRjaGVkOiBib29sZWFuO1xuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RJdGVtc1BhZ2UoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplID0gNTAsXG4pOiBQcm9taXNlPHtcbiAgaXRlbXM6IExpc3RJdGVtV2l0aFNob3dbXTtcbiAgaGFzTW9yZTogYm9vbGVhbjtcbiAgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPjtcbn0+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG5cbiAgY29uc3QgeyBkYXRhOiBsaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwidXNlcl9pZCwgaXNfcHVibGljXCIpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuICBpZiAoIWxpc3QuaXNfcHVibGljICYmIGxpc3QudXNlcl9pZCAhPT0gdXNlcj8uaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IGZyb20gPSBwYWdlICogcGFnZVNpemU7XG4gIGNvbnN0IHRvID0gZnJvbSArIHBhZ2VTaXplIC0gMTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCIqLCBzaG93cygqKVwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInJhdGluZ1wiLCB7IGFzY2VuZGluZzogZmFsc2UsIG51bGxzRmlyc3Q6IGZhbHNlIH0pXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSlcbiAgICAucmFuZ2UoZnJvbSwgdG8pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIGNvbnN0IGl0ZW1zID0gKGRhdGEgPz8gW10pIGFzIHVua25vd24gYXMgTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBjb25zdCBoYXNNb3JlID0gaXRlbXMubGVuZ3RoID09PSBwYWdlU2l6ZTtcblxuICBjb25zdCBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XG4gIGlmICh1c2VyICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB7IGRhdGE6IHNob3dUYWdzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93X3RhZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJzaG93X2lkLCB0YWdfaWRcIilcbiAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAgIC5pbihcbiAgICAgICAgXCJzaG93X2lkXCIsXG4gICAgICAgIGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93cy5pZCksXG4gICAgICApO1xuXG4gICAgZm9yIChjb25zdCBzdCBvZiBzaG93VGFncyA/PyBbXSkge1xuICAgICAgaWYgKCFzaG93VGFnc01hcFtzdC5zaG93X2lkXSkgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0gPSBbXTtcbiAgICAgIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdLnB1c2goc3QudGFnX2lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpdGVtcywgaGFzTW9yZSwgc2hvd1RhZ3NNYXAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb015TGlzdChzaG93OiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBFbnN1cmUgdGhlIHNob3cgZXhpc3RzIGluIG91ciBEQiAocmV1c2UgZXhpc3Rpbmcgb3IgY3JlYXRlKVxuICBsZXQgc2hvd0lkID0gc2hvdy5pZDtcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlkXCIsIHNob3cuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb25cbiAgY29uc3QgeyBkYXRhOiBpdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgY29uc3QgbmV4dFBvc2l0aW9uID0gKGl0ZW1zPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcImxpc3RfaXRlbXNcIikuaW5zZXJ0KHtcbiAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgc2hvd19pZDogc2hvd0lkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG1kYlNob3dUb015TGlzdChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuXG4gIC8vIEZpbmQgb3IgY3JlYXRlIHRoZSBzaG93IGJ5IHRtZGJfaWRcbiAgbGV0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ0bWRiX2lkXCIsIHNob3cudG1kYl9pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yOiBzaG93RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIGV4aXN0aW5nU2hvdyA9IG5ld1Nob3c7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbHJlYWR5IGluIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIGV4aXN0aW5nU2hvdyEuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IGV4aXN0aW5nU2hvdyEuaWQsXG4gICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgfSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb3B5TGlzdFRvTWluZShzb3VyY2VMaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVmVyaWZ5IHNvdXJjZSBsaXN0IGlzIHB1YmxpYyAob3Igb3duZWQgYnkgdXNlcilcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VMaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWQsIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIk93biBsaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBWZXJpZnkgb3duIGxpc3QgaXMgZW1wdHlcbiAgY29uc3QgeyBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiBcImV4YWN0XCIsIGhlYWQ6IHRydWUgfSlcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZCk7XG5cbiAgaWYgKChjb3VudCA/PyAwKSA+IDApIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IGNvcHkgdG8gYW4gZW1wdHkgbGlzdFwiKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZnJvbSBzb3VyY2UgbGlzdFxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uLCBub3Rlc1wiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgc291cmNlTGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmIChzb3VyY2VJdGVtcyAmJiBzb3VyY2VJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaW5zZXJ0cyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICAgIHNob3dfaWQ6IGl0ZW0uc2hvd19pZCxcbiAgICAgIHJhdGluZzogaXRlbS5yYXRpbmcsXG4gICAgICBwb3NpdGlvbjogaXRlbS5wb3NpdGlvbixcbiAgICAgIG5vdGVzOiBpdGVtLm5vdGVzLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHsgZXJyb3I6IGluc2VydEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAuaW5zZXJ0KGluc2VydHMpO1xuXG4gICAgaWYgKGluc2VydEVycm9yKSB0aHJvdyBuZXcgRXJyb3IoaW5zZXJ0RXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoieVRBd0tzQiw2TEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/data:b53304 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getListItemsPage",
    ()=>$$RSC_SERVER_ACTION_8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"7069107f9589fee67eb99e3abf54c5c59a5857e72f":"getListItemsPage"},"packages/web/src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("7069107f9589fee67eb99e3abf54c5c59a5857e72f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getListItemsPage");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xuICAvLyBTZWFzb24gLyBkdXJhdGlvbiBzdGF0c1xuICBtb3N0U2Vhc29uc1Nob3c6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBtb3N0U2Vhc29uc0J5WWVhcjoge1xuICAgIHllYXI6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgfVtdO1xuICBsb25nZXN0U2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICB0b3RhbE1pbnV0ZXM6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG4gIG1vc3RTZWFzb25zU2hvdzogbnVsbCxcbiAgbW9zdFNlYXNvbnNCeVllYXI6IFtdLFxuICBsb25nZXN0U2hvdzogbnVsbCxcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbmFseXRpY3MgZm9yIGEgbGlzdC5cbiAqIC0gTm8gbGlzdElkIOKGkiB0aGUgYXV0aGVudGljYXRlZCB1c2VyJ3Mgb3duIGxpc3QuXG4gKiAtIFdpdGggbGlzdElkIOKGkiBhbnkgcHVibGljIGxpc3QgKG93bmVyJ3MgdGFncyBhcmUgc2hvd24pLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEFuYWx5dGljcyhcbiAgbGlzdElkPzogc3RyaW5nLFxuKTogUHJvbWlzZTxBbmFseXRpY3NEYXRhPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGxldCByZXNvbHZlZExpc3RJZDogc3RyaW5nO1xuICBsZXQgb3duZXJJZDogc3RyaW5nO1xuXG4gIGlmIChsaXN0SWQpIHtcbiAgICAvLyBWaWV3aW5nIHNvbWVvbmUgZWxzZSdzIChvciBvd24pIGxpc3QgYnkgZXhwbGljaXQgaWRcbiAgICBjb25zdCB7IGRhdGE6IGxpc3RSb3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgICAuc2VsZWN0KFwiaWQsIHVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgICAgLnNpbmdsZSgpO1xuICAgIGlmICghbGlzdFJvdykgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICAvLyBPbmx5IGFsbG93IGFjY2VzcyBpZiBwdWJsaWMgb3Igb3duZWQgYnkgdGhlIGxvZ2dlZC1pbiB1c2VyXG4gICAgaWYgKCFsaXN0Um93LmlzX3B1YmxpYyAmJiBsaXN0Um93LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgICAgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3RSb3cuaWQ7XG4gICAgb3duZXJJZCA9IGxpc3RSb3cudXNlcl9pZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICAgIGlmICghbGlzdCkgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3QuaWQ7XG4gICAgb3duZXJJZCA9IHVzZXIuaWQ7XG4gIH1cblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgKG5vIHBhZ2luYXRpb24pIOKAlCByYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBmaXJzdF9haXJfZGF0ZSB2aWEgam9pblxuICB0eXBlIFJhd0l0ZW0gPSB7XG4gICAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICAgIHNob3dfaWQ6IHN0cmluZztcbiAgICBhZGRlZF9hdDogc3RyaW5nIHwgbnVsbDtcbiAgICBzaG93czoge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIH0gfCBudWxsO1xuICB9O1xuICBjb25zdCB7IGRhdGE6IHJhd0l0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXG4gICAgICBcInJhdGluZywgc2hvd19pZCwgYWRkZWRfYXQsIHNob3dzKGlkLCB0aXRsZSwgcG9zdGVyX3BhdGgsIGZpcnN0X2Fpcl9kYXRlKVwiLFxuICAgIClcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHJlc29sdmVkTGlzdElkKTtcblxuICBjb25zdCBpdGVtcyA9IChyYXdJdGVtcyA/PyBbXSkgYXMgUmF3SXRlbVtdO1xuICBjb25zdCB0b3RhbENvdW50ID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCByYXRlZFJvd3MgPSBpdGVtcy5maWx0ZXIoKHIpID0+IHIucmF0aW5nICE9PSBudWxsKTtcbiAgY29uc3QgcmF0ZWRDb3VudCA9IHJhdGVkUm93cy5sZW5ndGg7XG4gIGNvbnN0IGF2Z1JhdGluZyA9XG4gICAgcmF0ZWRDb3VudCA+IDBcbiAgICAgID8gTWF0aC5yb3VuZChcbiAgICAgICAgICAocmF0ZWRSb3dzLnJlZHVjZSgocywgcikgPT4gcyArIHIucmF0aW5nISwgMCkgLyByYXRlZENvdW50KSAqIDEwLFxuICAgICAgICApIC8gMTBcbiAgICAgIDogbnVsbDtcblxuICAvLyBSYXRpbmcgZGlzdHJpYnV0aW9uXG4gIGNvbnN0IHJhdGluZ01hcDogUmVjb3JkPG51bWJlciwgbnVtYmVyPiA9IHt9O1xuICBmb3IgKGxldCByID0gMTsgciA8PSAxMDsgcisrKSByYXRpbmdNYXBbcl0gPSAwO1xuICBmb3IgKGNvbnN0IHJvdyBvZiBpdGVtcykge1xuICAgIGlmIChyb3cucmF0aW5nICE9PSBudWxsKVxuICAgICAgcmF0aW5nTWFwW3Jvdy5yYXRpbmddID0gKHJhdGluZ01hcFtyb3cucmF0aW5nXSA/PyAwKSArIDE7XG4gIH1cbiAgY29uc3QgcmF0aW5nQ291bnRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogcmF0aW5nTWFwW2kgKyAxXSxcbiAgfSkpO1xuXG4gIC8vIFRhZyBkaXN0cmlidXRpb24g4oCUIHVzZSB0aGUgbGlzdCBvd25lcidzIHRhZ3NcbiAgY29uc3Qgc2hvd0lkcyA9IGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93X2lkKTtcbiAgY29uc3QgdGFnQ291bnRzOiBBbmFseXRpY3NEYXRhW1widGFnQ291bnRzXCJdID0gW107XG4gIGNvbnN0IHRhZ0F2Z1JhdGluZ3M6IEFuYWx5dGljc0RhdGFbXCJ0YWdBdmdSYXRpbmdzXCJdID0gW107XG5cbiAgaWYgKHNob3dJZHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IFt7IGRhdGE6IHNob3dUYWdSb3dzIH0sIHsgZGF0YTogdGFnRGVmcyB9XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJ0YWdfaWQsIHNob3dfaWRcIilcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCBvd25lcklkKVxuICAgICAgICAuaW4oXCJzaG93X2lkXCIsIHNob3dJZHMpLFxuICAgICAgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgY29sb3JcIilcbiAgICAgICAgLm9yKGBpc19kZWZhdWx0LmVxLnRydWUsdXNlcl9pZC5lcS4ke293bmVySWR9YCksXG4gICAgXSk7XG5cbiAgICBjb25zdCB0YWdNYXAgPSBuZXcgTWFwKCh0YWdEZWZzID8/IFtdKS5tYXAoKHQpID0+IFt0LmlkLCB0XSkpO1xuICAgIGNvbnN0IHNob3dSYXRpbmdNYXAgPSBuZXcgTWFwKGl0ZW1zLm1hcCgoaSkgPT4gW2kuc2hvd19pZCwgaS5yYXRpbmddKSk7XG5cbiAgICBjb25zdCB0YWdDb3VudE1hcDogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAgeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcbiAgICBjb25zdCB0YWdSYXRpbmdBY2M6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9XG4gICAgPiA9IHt9O1xuXG4gICAgZm9yIChjb25zdCByb3cgb2Ygc2hvd1RhZ1Jvd3MgPz8gW10pIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRhZ01hcC5nZXQocm93LnRhZ19pZCk7XG4gICAgICBpZiAoIXRhZykgY29udGludWU7XG5cbiAgICAgIHRhZ0NvdW50TWFwW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgIG5hbWU6IHRhZy5uYW1lLFxuICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgIH07XG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXS5jb3VudCsrO1xuXG4gICAgICBjb25zdCByYXRpbmcgPSBzaG93UmF0aW5nTWFwLmdldChyb3cuc2hvd19pZCk7XG4gICAgICBpZiAocmF0aW5nICE9IG51bGwpIHtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgICAgaWQ6IHRhZy5pZCxcbiAgICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICAgIHN1bTogMCxcbiAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdLnN1bSArPSByYXRpbmc7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5jb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRhZ0NvdW50cy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdDb3VudE1hcCkuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpLFxuICAgICk7XG4gICAgdGFnQXZnUmF0aW5ncy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdSYXRpbmdBY2MpXG4gICAgICAgIC5tYXAoKHQpID0+ICh7XG4gICAgICAgICAgaWQ6IHQuaWQsXG4gICAgICAgICAgbmFtZTogdC5uYW1lLFxuICAgICAgICAgIGNvbG9yOiB0LmNvbG9yLFxuICAgICAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgodC5zdW0gLyB0LmNvdW50KSAqIDEwKSAvIDEwLFxuICAgICAgICAgIGNvdW50OiB0LmNvdW50LFxuICAgICAgICB9KSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuYXZnUmF0aW5nIC0gYS5hdmdSYXRpbmcpLFxuICAgICk7XG4gIH1cblxuICAvLyBUaW1lbGluZTogZ3JvdXAgYnkgYWRkZWRfYXQgbW9udGggKFlZWVktTU0pXG4gIGNvbnN0IG1vbnRobHlNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtLmFkZGVkX2F0KSBjb250aW51ZTtcbiAgICBjb25zdCBtb250aCA9IGl0ZW0uYWRkZWRfYXQuc2xpY2UoMCwgNyk7XG4gICAgbW9udGhseU1hcFttb250aF0gPSAobW9udGhseU1hcFttb250aF0gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IG1vbnRobHlBZGRlZCA9IE9iamVjdC5lbnRyaWVzKG1vbnRobHlNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW21vbnRoLCBjb3VudF0pID0+ICh7IG1vbnRoLCBjb3VudCB9KSk7XG5cbiAgLy8gRGVjYWRlIGRpc3RyaWJ1dGlvbjogZ3JvdXAgYnkgZGVjYWRlIG9mIGZpcnN0X2Fpcl9kYXRlXG4gIGNvbnN0IGRlY2FkZU1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICBjb25zdCB5ZWFyQ291bnRNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgZGVjYWRlUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG4gIGNvbnN0IHllYXJSYXRpbmdBY2M6IFJlY29yZDxzdHJpbmcsIHsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfT4gPSB7fTtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBmaXJzdEFpckRhdGUgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoIWZpcnN0QWlyRGF0ZSkgY29udGludWU7XG4gICAgY29uc3QgeWVhciA9IHBhcnNlSW50KGZpcnN0QWlyRGF0ZS5zbGljZSgwLCA0KSwgMTApO1xuICAgIGlmIChpc05hTih5ZWFyKSB8fCB5ZWFyIDwgMTkwMCkgY29udGludWU7XG4gICAgY29uc3QgZGVjYWRlID0gYCR7TWF0aC5mbG9vcih5ZWFyIC8gMTApICogMTB9c2A7XG4gICAgY29uc3QgeWVhclN0ciA9IFN0cmluZyh5ZWFyKTtcblxuICAgIGRlY2FkZU1hcFtkZWNhZGVdID0gKGRlY2FkZU1hcFtkZWNhZGVdID8/IDApICsgMTtcbiAgICB5ZWFyQ291bnRNYXBbeWVhclN0cl0gPSAoeWVhckNvdW50TWFwW3llYXJTdHJdID8/IDApICsgMTtcblxuICAgIGlmIChpdGVtLnJhdGluZyAhPT0gbnVsbCkge1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uc3VtICs9IGl0ZW0ucmF0aW5nO1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uY291bnQrKztcblxuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXSA/Pz0geyBzdW06IDAsIGNvdW50OiAwIH07XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0uY291bnQrKztcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWNhZGVDb3VudHMgPSBPYmplY3QuZW50cmllcyhkZWNhZGVNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW2RlY2FkZSwgY291bnRdKSA9PiAoeyBkZWNhZGUsIGNvdW50IH0pKTtcblxuICBjb25zdCB5ZWFyQ291bnRzID0gT2JqZWN0LmVudHJpZXMoeWVhckNvdW50TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFt5ZWFyLCBjb3VudF0pID0+ICh7IHllYXIsIGNvdW50IH0pKTtcblxuICBjb25zdCBkZWNhZGVBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlUmF0aW5nQWNjKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIGRlY2FkZSxcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIGNvbnN0IHllYXJBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoeWVhclJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgeyBzdW0sIGNvdW50IH1dKSA9PiAoe1xuICAgICAgeWVhcixcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIC8vIEJ1aWxkIHNob3cgbG9va3VwIG1hcHMgZm9yIG1vZGFsIGRyaWxsLXRocm91Z2hcbiAgY29uc3Qgc2hvd3NCeVJhdGluZzogUmVjb3JkPG51bWJlciwgU2hvd1N1bW1hcnlbXT4gPSB7fTtcbiAgY29uc3Qgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IHN1bW1hcnk6IFNob3dTdW1tYXJ5ID0ge1xuICAgICAgaWQ6IGl0ZW0uc2hvd3M/LmlkID8/IGl0ZW0uc2hvd19pZCxcbiAgICAgIHRpdGxlOiBpdGVtLnNob3dzPy50aXRsZSA/PyBcIlwiLFxuICAgICAgcG9zdGVyX3BhdGg6IGl0ZW0uc2hvd3M/LnBvc3Rlcl9wYXRoID8/IG51bGwsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgZmlyc3RfYWlyX2RhdGU6IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlID8/IG51bGwsXG4gICAgfTtcbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddID8/PSBbXTtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddLnB1c2goc3VtbWFyeSk7XG4gICAgfVxuICAgIGNvbnN0IGZhZCA9IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlO1xuICAgIGlmIChmYWQpIHtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChmYWQuc2xpY2UoMCwgNCksIDEwKTtcbiAgICAgIGlmICghaXNOYU4oeSkgJiYgeSA+PSAxOTAwKSB7XG4gICAgICAgIGNvbnN0IHlyID0gU3RyaW5nKHkpO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0gPz89IFtdO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0ucHVzaChzdW1tYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsQ291bnQsXG4gICAgcmF0ZWRDb3VudCxcbiAgICBhdmdSYXRpbmcsXG4gICAgcmF0aW5nQ291bnRzLFxuICAgIHRhZ0NvdW50cyxcbiAgICB0YWdBdmdSYXRpbmdzLFxuICAgIG1vbnRobHlBZGRlZCxcbiAgICBkZWNhZGVDb3VudHMsXG4gICAgeWVhckNvdW50cyxcbiAgICBkZWNhZGVBdmdSYXRpbmdzLFxuICAgIHllYXJBdmdSYXRpbmdzLFxuICAgIHNob3dzQnlSYXRpbmcsXG4gICAgc2hvd3NCeVllYXIsXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3RJdGVtV2l0aFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxpc3RfaWQ6IHN0cmluZztcbiAgc2hvd19pZDogc3RyaW5nO1xuICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIGFkZGVkX2F0OiBzdHJpbmc7XG4gIG5vdGVzOiBzdHJpbmcgfCBudWxsO1xuICBzaG93czoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gICAgdG1kYl9mZXRjaGVkOiBib29sZWFuO1xuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RJdGVtc1BhZ2UoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplID0gNTAsXG4pOiBQcm9taXNlPHtcbiAgaXRlbXM6IExpc3RJdGVtV2l0aFNob3dbXTtcbiAgaGFzTW9yZTogYm9vbGVhbjtcbiAgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPjtcbn0+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG5cbiAgY29uc3QgeyBkYXRhOiBsaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwidXNlcl9pZCwgaXNfcHVibGljXCIpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuICBpZiAoIWxpc3QuaXNfcHVibGljICYmIGxpc3QudXNlcl9pZCAhPT0gdXNlcj8uaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IGZyb20gPSBwYWdlICogcGFnZVNpemU7XG4gIGNvbnN0IHRvID0gZnJvbSArIHBhZ2VTaXplIC0gMTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCIqLCBzaG93cygqKVwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInJhdGluZ1wiLCB7IGFzY2VuZGluZzogZmFsc2UsIG51bGxzRmlyc3Q6IGZhbHNlIH0pXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSlcbiAgICAucmFuZ2UoZnJvbSwgdG8pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIGNvbnN0IGl0ZW1zID0gKGRhdGEgPz8gW10pIGFzIHVua25vd24gYXMgTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBjb25zdCBoYXNNb3JlID0gaXRlbXMubGVuZ3RoID09PSBwYWdlU2l6ZTtcblxuICBjb25zdCBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XG4gIGlmICh1c2VyICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB7IGRhdGE6IHNob3dUYWdzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93X3RhZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJzaG93X2lkLCB0YWdfaWRcIilcbiAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAgIC5pbihcbiAgICAgICAgXCJzaG93X2lkXCIsXG4gICAgICAgIGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93cy5pZCksXG4gICAgICApO1xuXG4gICAgZm9yIChjb25zdCBzdCBvZiBzaG93VGFncyA/PyBbXSkge1xuICAgICAgaWYgKCFzaG93VGFnc01hcFtzdC5zaG93X2lkXSkgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0gPSBbXTtcbiAgICAgIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdLnB1c2goc3QudGFnX2lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpdGVtcywgaGFzTW9yZSwgc2hvd1RhZ3NNYXAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb015TGlzdChzaG93OiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBFbnN1cmUgdGhlIHNob3cgZXhpc3RzIGluIG91ciBEQiAocmV1c2UgZXhpc3Rpbmcgb3IgY3JlYXRlKVxuICBsZXQgc2hvd0lkID0gc2hvdy5pZDtcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlkXCIsIHNob3cuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb25cbiAgY29uc3QgeyBkYXRhOiBpdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgY29uc3QgbmV4dFBvc2l0aW9uID0gKGl0ZW1zPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcImxpc3RfaXRlbXNcIikuaW5zZXJ0KHtcbiAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgc2hvd19pZDogc2hvd0lkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG1kYlNob3dUb015TGlzdChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuXG4gIC8vIEZpbmQgb3IgY3JlYXRlIHRoZSBzaG93IGJ5IHRtZGJfaWRcbiAgbGV0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ0bWRiX2lkXCIsIHNob3cudG1kYl9pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yOiBzaG93RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIGV4aXN0aW5nU2hvdyA9IG5ld1Nob3c7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbHJlYWR5IGluIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIGV4aXN0aW5nU2hvdyEuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IGV4aXN0aW5nU2hvdyEuaWQsXG4gICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgfSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb3B5TGlzdFRvTWluZShzb3VyY2VMaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVmVyaWZ5IHNvdXJjZSBsaXN0IGlzIHB1YmxpYyAob3Igb3duZWQgYnkgdXNlcilcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VMaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWQsIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIk93biBsaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBWZXJpZnkgb3duIGxpc3QgaXMgZW1wdHlcbiAgY29uc3QgeyBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiBcImV4YWN0XCIsIGhlYWQ6IHRydWUgfSlcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZCk7XG5cbiAgaWYgKChjb3VudCA/PyAwKSA+IDApIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IGNvcHkgdG8gYW4gZW1wdHkgbGlzdFwiKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZnJvbSBzb3VyY2UgbGlzdFxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uLCBub3Rlc1wiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgc291cmNlTGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmIChzb3VyY2VJdGVtcyAmJiBzb3VyY2VJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaW5zZXJ0cyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICAgIHNob3dfaWQ6IGl0ZW0uc2hvd19pZCxcbiAgICAgIHJhdGluZzogaXRlbS5yYXRpbmcsXG4gICAgICBwb3NpdGlvbjogaXRlbS5wb3NpdGlvbixcbiAgICAgIG5vdGVzOiBpdGVtLm5vdGVzLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHsgZXJyb3I6IGluc2VydEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAuaW5zZXJ0KGluc2VydHMpO1xuXG4gICAgaWYgKGluc2VydEVycm9yKSB0aHJvdyBuZXcgRXJyb3IoaW5zZXJ0RXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoieVRBMG9Cc0IsNkxBQUEifQ==
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/data:1653ce [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "copyListToMine",
    ()=>$$RSC_SERVER_ACTION_11
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40d4944a60783ffec258c5854d574614e2eeb74a3d":"copyListToMine"},"packages/web/src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40d4944a60783ffec258c5854d574614e2eeb74a3d", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "copyListToMine");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xuICAvLyBTZWFzb24gLyBkdXJhdGlvbiBzdGF0c1xuICBtb3N0U2Vhc29uc1Nob3c6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBtb3N0U2Vhc29uc0J5WWVhcjoge1xuICAgIHllYXI6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgfVtdO1xuICBsb25nZXN0U2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICB0b3RhbE1pbnV0ZXM6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG4gIG1vc3RTZWFzb25zU2hvdzogbnVsbCxcbiAgbW9zdFNlYXNvbnNCeVllYXI6IFtdLFxuICBsb25nZXN0U2hvdzogbnVsbCxcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbmFseXRpY3MgZm9yIGEgbGlzdC5cbiAqIC0gTm8gbGlzdElkIOKGkiB0aGUgYXV0aGVudGljYXRlZCB1c2VyJ3Mgb3duIGxpc3QuXG4gKiAtIFdpdGggbGlzdElkIOKGkiBhbnkgcHVibGljIGxpc3QgKG93bmVyJ3MgdGFncyBhcmUgc2hvd24pLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEFuYWx5dGljcyhcbiAgbGlzdElkPzogc3RyaW5nLFxuKTogUHJvbWlzZTxBbmFseXRpY3NEYXRhPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGxldCByZXNvbHZlZExpc3RJZDogc3RyaW5nO1xuICBsZXQgb3duZXJJZDogc3RyaW5nO1xuXG4gIGlmIChsaXN0SWQpIHtcbiAgICAvLyBWaWV3aW5nIHNvbWVvbmUgZWxzZSdzIChvciBvd24pIGxpc3QgYnkgZXhwbGljaXQgaWRcbiAgICBjb25zdCB7IGRhdGE6IGxpc3RSb3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgICAuc2VsZWN0KFwiaWQsIHVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgICAgLnNpbmdsZSgpO1xuICAgIGlmICghbGlzdFJvdykgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICAvLyBPbmx5IGFsbG93IGFjY2VzcyBpZiBwdWJsaWMgb3Igb3duZWQgYnkgdGhlIGxvZ2dlZC1pbiB1c2VyXG4gICAgaWYgKCFsaXN0Um93LmlzX3B1YmxpYyAmJiBsaXN0Um93LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgICAgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3RSb3cuaWQ7XG4gICAgb3duZXJJZCA9IGxpc3RSb3cudXNlcl9pZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcbiAgICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICAgIGlmICghbGlzdCkgcmV0dXJuIEVNUFRZX0FOQUxZVElDUztcbiAgICByZXNvbHZlZExpc3RJZCA9IGxpc3QuaWQ7XG4gICAgb3duZXJJZCA9IHVzZXIuaWQ7XG4gIH1cblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgKG5vIHBhZ2luYXRpb24pIOKAlCByYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBmaXJzdF9haXJfZGF0ZSB2aWEgam9pblxuICB0eXBlIFJhd0l0ZW0gPSB7XG4gICAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICAgIHNob3dfaWQ6IHN0cmluZztcbiAgICBhZGRlZF9hdDogc3RyaW5nIHwgbnVsbDtcbiAgICBzaG93czoge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIH0gfCBudWxsO1xuICB9O1xuICBjb25zdCB7IGRhdGE6IHJhd0l0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXG4gICAgICBcInJhdGluZywgc2hvd19pZCwgYWRkZWRfYXQsIHNob3dzKGlkLCB0aXRsZSwgcG9zdGVyX3BhdGgsIGZpcnN0X2Fpcl9kYXRlKVwiLFxuICAgIClcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHJlc29sdmVkTGlzdElkKTtcblxuICBjb25zdCBpdGVtcyA9IChyYXdJdGVtcyA/PyBbXSkgYXMgUmF3SXRlbVtdO1xuICBjb25zdCB0b3RhbENvdW50ID0gaXRlbXMubGVuZ3RoO1xuICBjb25zdCByYXRlZFJvd3MgPSBpdGVtcy5maWx0ZXIoKHIpID0+IHIucmF0aW5nICE9PSBudWxsKTtcbiAgY29uc3QgcmF0ZWRDb3VudCA9IHJhdGVkUm93cy5sZW5ndGg7XG4gIGNvbnN0IGF2Z1JhdGluZyA9XG4gICAgcmF0ZWRDb3VudCA+IDBcbiAgICAgID8gTWF0aC5yb3VuZChcbiAgICAgICAgICAocmF0ZWRSb3dzLnJlZHVjZSgocywgcikgPT4gcyArIHIucmF0aW5nISwgMCkgLyByYXRlZENvdW50KSAqIDEwLFxuICAgICAgICApIC8gMTBcbiAgICAgIDogbnVsbDtcblxuICAvLyBSYXRpbmcgZGlzdHJpYnV0aW9uXG4gIGNvbnN0IHJhdGluZ01hcDogUmVjb3JkPG51bWJlciwgbnVtYmVyPiA9IHt9O1xuICBmb3IgKGxldCByID0gMTsgciA8PSAxMDsgcisrKSByYXRpbmdNYXBbcl0gPSAwO1xuICBmb3IgKGNvbnN0IHJvdyBvZiBpdGVtcykge1xuICAgIGlmIChyb3cucmF0aW5nICE9PSBudWxsKVxuICAgICAgcmF0aW5nTWFwW3Jvdy5yYXRpbmddID0gKHJhdGluZ01hcFtyb3cucmF0aW5nXSA/PyAwKSArIDE7XG4gIH1cbiAgY29uc3QgcmF0aW5nQ291bnRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogcmF0aW5nTWFwW2kgKyAxXSxcbiAgfSkpO1xuXG4gIC8vIFRhZyBkaXN0cmlidXRpb24g4oCUIHVzZSB0aGUgbGlzdCBvd25lcidzIHRhZ3NcbiAgY29uc3Qgc2hvd0lkcyA9IGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93X2lkKTtcbiAgY29uc3QgdGFnQ291bnRzOiBBbmFseXRpY3NEYXRhW1widGFnQ291bnRzXCJdID0gW107XG4gIGNvbnN0IHRhZ0F2Z1JhdGluZ3M6IEFuYWx5dGljc0RhdGFbXCJ0YWdBdmdSYXRpbmdzXCJdID0gW107XG5cbiAgaWYgKHNob3dJZHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IFt7IGRhdGE6IHNob3dUYWdSb3dzIH0sIHsgZGF0YTogdGFnRGVmcyB9XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJ0YWdfaWQsIHNob3dfaWRcIilcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCBvd25lcklkKVxuICAgICAgICAuaW4oXCJzaG93X2lkXCIsIHNob3dJZHMpLFxuICAgICAgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgY29sb3JcIilcbiAgICAgICAgLm9yKGBpc19kZWZhdWx0LmVxLnRydWUsdXNlcl9pZC5lcS4ke293bmVySWR9YCksXG4gICAgXSk7XG5cbiAgICBjb25zdCB0YWdNYXAgPSBuZXcgTWFwKCh0YWdEZWZzID8/IFtdKS5tYXAoKHQpID0+IFt0LmlkLCB0XSkpO1xuICAgIGNvbnN0IHNob3dSYXRpbmdNYXAgPSBuZXcgTWFwKGl0ZW1zLm1hcCgoaSkgPT4gW2kuc2hvd19pZCwgaS5yYXRpbmddKSk7XG5cbiAgICBjb25zdCB0YWdDb3VudE1hcDogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAgeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcbiAgICBjb25zdCB0YWdSYXRpbmdBY2M6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9XG4gICAgPiA9IHt9O1xuXG4gICAgZm9yIChjb25zdCByb3cgb2Ygc2hvd1RhZ1Jvd3MgPz8gW10pIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRhZ01hcC5nZXQocm93LnRhZ19pZCk7XG4gICAgICBpZiAoIXRhZykgY29udGludWU7XG5cbiAgICAgIHRhZ0NvdW50TWFwW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgIG5hbWU6IHRhZy5uYW1lLFxuICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgIH07XG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXS5jb3VudCsrO1xuXG4gICAgICBjb25zdCByYXRpbmcgPSBzaG93UmF0aW5nTWFwLmdldChyb3cuc2hvd19pZCk7XG4gICAgICBpZiAocmF0aW5nICE9IG51bGwpIHtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdID8/PSB7XG4gICAgICAgICAgaWQ6IHRhZy5pZCxcbiAgICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgICBjb2xvcjogdGFnLmNvbG9yLFxuICAgICAgICAgIHN1bTogMCxcbiAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGFnUmF0aW5nQWNjW3Jvdy50YWdfaWRdLnN1bSArPSByYXRpbmc7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5jb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRhZ0NvdW50cy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdDb3VudE1hcCkuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpLFxuICAgICk7XG4gICAgdGFnQXZnUmF0aW5ncy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LnZhbHVlcyh0YWdSYXRpbmdBY2MpXG4gICAgICAgIC5tYXAoKHQpID0+ICh7XG4gICAgICAgICAgaWQ6IHQuaWQsXG4gICAgICAgICAgbmFtZTogdC5uYW1lLFxuICAgICAgICAgIGNvbG9yOiB0LmNvbG9yLFxuICAgICAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgodC5zdW0gLyB0LmNvdW50KSAqIDEwKSAvIDEwLFxuICAgICAgICAgIGNvdW50OiB0LmNvdW50LFxuICAgICAgICB9KSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuYXZnUmF0aW5nIC0gYS5hdmdSYXRpbmcpLFxuICAgICk7XG4gIH1cblxuICAvLyBUaW1lbGluZTogZ3JvdXAgYnkgYWRkZWRfYXQgbW9udGggKFlZWVktTU0pXG4gIGNvbnN0IG1vbnRobHlNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtLmFkZGVkX2F0KSBjb250aW51ZTtcbiAgICBjb25zdCBtb250aCA9IGl0ZW0uYWRkZWRfYXQuc2xpY2UoMCwgNyk7XG4gICAgbW9udGhseU1hcFttb250aF0gPSAobW9udGhseU1hcFttb250aF0gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IG1vbnRobHlBZGRlZCA9IE9iamVjdC5lbnRyaWVzKG1vbnRobHlNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW21vbnRoLCBjb3VudF0pID0+ICh7IG1vbnRoLCBjb3VudCB9KSk7XG5cbiAgLy8gRGVjYWRlIGRpc3RyaWJ1dGlvbjogZ3JvdXAgYnkgZGVjYWRlIG9mIGZpcnN0X2Fpcl9kYXRlXG4gIGNvbnN0IGRlY2FkZU1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICBjb25zdCB5ZWFyQ291bnRNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgZGVjYWRlUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG4gIGNvbnN0IHllYXJSYXRpbmdBY2M6IFJlY29yZDxzdHJpbmcsIHsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfT4gPSB7fTtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBmaXJzdEFpckRhdGUgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoIWZpcnN0QWlyRGF0ZSkgY29udGludWU7XG4gICAgY29uc3QgeWVhciA9IHBhcnNlSW50KGZpcnN0QWlyRGF0ZS5zbGljZSgwLCA0KSwgMTApO1xuICAgIGlmIChpc05hTih5ZWFyKSB8fCB5ZWFyIDwgMTkwMCkgY29udGludWU7XG4gICAgY29uc3QgZGVjYWRlID0gYCR7TWF0aC5mbG9vcih5ZWFyIC8gMTApICogMTB9c2A7XG4gICAgY29uc3QgeWVhclN0ciA9IFN0cmluZyh5ZWFyKTtcblxuICAgIGRlY2FkZU1hcFtkZWNhZGVdID0gKGRlY2FkZU1hcFtkZWNhZGVdID8/IDApICsgMTtcbiAgICB5ZWFyQ291bnRNYXBbeWVhclN0cl0gPSAoeWVhckNvdW50TWFwW3llYXJTdHJdID8/IDApICsgMTtcblxuICAgIGlmIChpdGVtLnJhdGluZyAhPT0gbnVsbCkge1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uc3VtICs9IGl0ZW0ucmF0aW5nO1xuICAgICAgZGVjYWRlUmF0aW5nQWNjW2RlY2FkZV0uY291bnQrKztcblxuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXSA/Pz0geyBzdW06IDAsIGNvdW50OiAwIH07XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0uY291bnQrKztcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWNhZGVDb3VudHMgPSBPYmplY3QuZW50cmllcyhkZWNhZGVNYXApXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW2RlY2FkZSwgY291bnRdKSA9PiAoeyBkZWNhZGUsIGNvdW50IH0pKTtcblxuICBjb25zdCB5ZWFyQ291bnRzID0gT2JqZWN0LmVudHJpZXMoeWVhckNvdW50TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFt5ZWFyLCBjb3VudF0pID0+ICh7IHllYXIsIGNvdW50IH0pKTtcblxuICBjb25zdCBkZWNhZGVBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlUmF0aW5nQWNjKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIGRlY2FkZSxcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIGNvbnN0IHllYXJBdmdSYXRpbmdzID0gT2JqZWN0LmVudHJpZXMoeWVhclJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgeyBzdW0sIGNvdW50IH1dKSA9PiAoe1xuICAgICAgeWVhcixcbiAgICAgIGF2Z1JhdGluZzogTWF0aC5yb3VuZCgoc3VtIC8gY291bnQpICogMTApIC8gMTAsXG4gICAgfSkpO1xuXG4gIC8vIEJ1aWxkIHNob3cgbG9va3VwIG1hcHMgZm9yIG1vZGFsIGRyaWxsLXRocm91Z2hcbiAgY29uc3Qgc2hvd3NCeVJhdGluZzogUmVjb3JkPG51bWJlciwgU2hvd1N1bW1hcnlbXT4gPSB7fTtcbiAgY29uc3Qgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IHN1bW1hcnk6IFNob3dTdW1tYXJ5ID0ge1xuICAgICAgaWQ6IGl0ZW0uc2hvd3M/LmlkID8/IGl0ZW0uc2hvd19pZCxcbiAgICAgIHRpdGxlOiBpdGVtLnNob3dzPy50aXRsZSA/PyBcIlwiLFxuICAgICAgcG9zdGVyX3BhdGg6IGl0ZW0uc2hvd3M/LnBvc3Rlcl9wYXRoID8/IG51bGwsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgZmlyc3RfYWlyX2RhdGU6IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlID8/IG51bGwsXG4gICAgfTtcbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddID8/PSBbXTtcbiAgICAgIHNob3dzQnlSYXRpbmdbaXRlbS5yYXRpbmddLnB1c2goc3VtbWFyeSk7XG4gICAgfVxuICAgIGNvbnN0IGZhZCA9IGl0ZW0uc2hvd3M/LmZpcnN0X2Fpcl9kYXRlO1xuICAgIGlmIChmYWQpIHtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChmYWQuc2xpY2UoMCwgNCksIDEwKTtcbiAgICAgIGlmICghaXNOYU4oeSkgJiYgeSA+PSAxOTAwKSB7XG4gICAgICAgIGNvbnN0IHlyID0gU3RyaW5nKHkpO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0gPz89IFtdO1xuICAgICAgICBzaG93c0J5WWVhclt5cl0ucHVzaChzdW1tYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsQ291bnQsXG4gICAgcmF0ZWRDb3VudCxcbiAgICBhdmdSYXRpbmcsXG4gICAgcmF0aW5nQ291bnRzLFxuICAgIHRhZ0NvdW50cyxcbiAgICB0YWdBdmdSYXRpbmdzLFxuICAgIG1vbnRobHlBZGRlZCxcbiAgICBkZWNhZGVDb3VudHMsXG4gICAgeWVhckNvdW50cyxcbiAgICBkZWNhZGVBdmdSYXRpbmdzLFxuICAgIHllYXJBdmdSYXRpbmdzLFxuICAgIHNob3dzQnlSYXRpbmcsXG4gICAgc2hvd3NCeVllYXIsXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3RJdGVtV2l0aFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxpc3RfaWQ6IHN0cmluZztcbiAgc2hvd19pZDogc3RyaW5nO1xuICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIGFkZGVkX2F0OiBzdHJpbmc7XG4gIG5vdGVzOiBzdHJpbmcgfCBudWxsO1xuICBzaG93czoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gICAgdG1kYl9mZXRjaGVkOiBib29sZWFuO1xuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RJdGVtc1BhZ2UoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplID0gNTAsXG4pOiBQcm9taXNlPHtcbiAgaXRlbXM6IExpc3RJdGVtV2l0aFNob3dbXTtcbiAgaGFzTW9yZTogYm9vbGVhbjtcbiAgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPjtcbn0+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG5cbiAgY29uc3QgeyBkYXRhOiBsaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwidXNlcl9pZCwgaXNfcHVibGljXCIpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuICBpZiAoIWxpc3QuaXNfcHVibGljICYmIGxpc3QudXNlcl9pZCAhPT0gdXNlcj8uaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IGZyb20gPSBwYWdlICogcGFnZVNpemU7XG4gIGNvbnN0IHRvID0gZnJvbSArIHBhZ2VTaXplIC0gMTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCIqLCBzaG93cygqKVwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInJhdGluZ1wiLCB7IGFzY2VuZGluZzogZmFsc2UsIG51bGxzRmlyc3Q6IGZhbHNlIH0pXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSlcbiAgICAucmFuZ2UoZnJvbSwgdG8pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIGNvbnN0IGl0ZW1zID0gKGRhdGEgPz8gW10pIGFzIHVua25vd24gYXMgTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBjb25zdCBoYXNNb3JlID0gaXRlbXMubGVuZ3RoID09PSBwYWdlU2l6ZTtcblxuICBjb25zdCBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XG4gIGlmICh1c2VyICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB7IGRhdGE6IHNob3dUYWdzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93X3RhZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJzaG93X2lkLCB0YWdfaWRcIilcbiAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAgIC5pbihcbiAgICAgICAgXCJzaG93X2lkXCIsXG4gICAgICAgIGl0ZW1zLm1hcCgoaSkgPT4gaS5zaG93cy5pZCksXG4gICAgICApO1xuXG4gICAgZm9yIChjb25zdCBzdCBvZiBzaG93VGFncyA/PyBbXSkge1xuICAgICAgaWYgKCFzaG93VGFnc01hcFtzdC5zaG93X2lkXSkgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0gPSBbXTtcbiAgICAgIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdLnB1c2goc3QudGFnX2lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpdGVtcywgaGFzTW9yZSwgc2hvd1RhZ3NNYXAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb015TGlzdChzaG93OiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBFbnN1cmUgdGhlIHNob3cgZXhpc3RzIGluIG91ciBEQiAocmV1c2UgZXhpc3Rpbmcgb3IgY3JlYXRlKVxuICBsZXQgc2hvd0lkID0gc2hvdy5pZDtcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlkXCIsIHNob3cuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb25cbiAgY29uc3QgeyBkYXRhOiBpdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgY29uc3QgbmV4dFBvc2l0aW9uID0gKGl0ZW1zPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcImxpc3RfaXRlbXNcIikuaW5zZXJ0KHtcbiAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgc2hvd19pZDogc2hvd0lkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG1kYlNob3dUb015TGlzdChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIkxpc3Qgbm90IGZvdW5kXCIpO1xuXG4gIC8vIEZpbmQgb3IgY3JlYXRlIHRoZSBzaG93IGJ5IHRtZGJfaWRcbiAgbGV0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ0bWRiX2lkXCIsIHNob3cudG1kYl9pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yOiBzaG93RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIGV4aXN0aW5nU2hvdyA9IG5ld1Nob3c7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbHJlYWR5IGluIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIGV4aXN0aW5nU2hvdyEuaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChleGlzdGluZykgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogdHJ1ZSB9O1xuXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IGV4aXN0aW5nU2hvdyEuaWQsXG4gICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgfSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb3B5TGlzdFRvTWluZShzb3VyY2VMaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVmVyaWZ5IHNvdXJjZSBsaXN0IGlzIHB1YmxpYyAob3Igb3duZWQgYnkgdXNlcilcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VMaXN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWQsIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IG15TGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgaWYgKCFteUxpc3QpIHRocm93IG5ldyBFcnJvcihcIk93biBsaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBWZXJpZnkgb3duIGxpc3QgaXMgZW1wdHlcbiAgY29uc3QgeyBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiBcImV4YWN0XCIsIGhlYWQ6IHRydWUgfSlcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZCk7XG5cbiAgaWYgKChjb3VudCA/PyAwKSA+IDApIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IGNvcHkgdG8gYW4gZW1wdHkgbGlzdFwiKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZnJvbSBzb3VyY2UgbGlzdFxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uLCBub3Rlc1wiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgc291cmNlTGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmIChzb3VyY2VJdGVtcyAmJiBzb3VyY2VJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaW5zZXJ0cyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICAgIHNob3dfaWQ6IGl0ZW0uc2hvd19pZCxcbiAgICAgIHJhdGluZzogaXRlbS5yYXRpbmcsXG4gICAgICBwb3NpdGlvbjogaXRlbS5wb3NpdGlvbixcbiAgICAgIG5vdGVzOiBpdGVtLm5vdGVzLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHsgZXJyb3I6IGluc2VydEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAuaW5zZXJ0KGluc2VydHMpO1xuXG4gICAgaWYgKGluc2VydEVycm9yKSB0aHJvdyBuZXcgRXJyb3IoaW5zZXJ0RXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoidVRBKzFCc0IsNkxBQUEifQ==
}),
"[project]/packages/web/src/app/[locale]/(app)/explore/data:e62915 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRecommendations",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"00ee312aa591ad510b9799fe4b8dccd9043bbef937":"getRecommendations"},"packages/web/src/app/[locale]/(app)/explore/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("00ee312aa591ad510b9799fe4b8dccd9043bbef937", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getRecommendations");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgc2NvcmVSZWNvbW1lbmRhdGlvbnMsIHR5cGUgVXNlckxpc3QgfSBmcm9tIFwiQC9saWIvcmVjb21tZW5kYXRpb25zXCI7XG5pbXBvcnQgeyBjb21wdXRlTGlzdFNpbWlsYXJpdHksIHR5cGUgTGlzdEVudHJ5IH0gZnJvbSBcIkAvbGliL3NpbWlsYXJpdHlcIjtcblxuZXhwb3J0IHR5cGUgU2ltaWxhclVzZXIgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGF2YXRhcl91cmw6IHN0cmluZyB8IG51bGw7XG4gIHNob3dfY291bnQ6IG51bWJlcjtcbiAgc2ltaWxhcml0eTogbnVtYmVyO1xuICBpc19mb2xsb3dpbmc6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2ltaWxhclVzZXJzKCk6IFByb21pc2U8U2ltaWxhclVzZXJbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgaXRlbXNcbiAgY29uc3QgeyBkYXRhOiBteUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFteUxpc3QpIHJldHVybiBbXTtcblxuICBjb25zdCB7IGRhdGE6IG15SXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoIW15SXRlbXMgfHwgbXlJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCB2aWV3ZXJMaXN0OiBMaXN0RW50cnlbXSA9IG15SXRlbXMubWFwKChpLCBpZHgpID0+ICh7XG4gICAgc2hvd0lkOiBpLnNob3dfaWQsXG4gICAgcmF0aW5nOiBpLnJhdGluZyxcbiAgICBwb3NpdGlvbjogaS5wb3NpdGlvbiA/PyBpZHgsXG4gIH0pKTtcblxuICAvLyBGZXRjaCBhbGwgcHVibGljIGxpc3RzIChleGNsdWRpbmcgc2VsZikgd2l0aCBwcm9maWxlIGluZm9cbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBwcm9maWxlcyhpZCwgdXNlcm5hbWUsIGF2YXRhcl91cmwpXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZm9yIHRob3NlIGxpc3RzIGluIG9uZSBiYXRjaFxuICBjb25zdCB7IGRhdGE6IGFsbEl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJsaXN0X2lkLCBzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uXCIpXG4gICAgLmluKFwibGlzdF9pZFwiLCBsaXN0SWRzKTtcblxuICBpZiAoIWFsbEl0ZW1zKSByZXR1cm4gW107XG5cbiAgLy8gR3JvdXAgaXRlbXMgYnkgbGlzdF9pZFxuICBjb25zdCBpdGVtc0J5TGlzdCA9IG5ldyBNYXA8c3RyaW5nLCBMaXN0RW50cnlbXT4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGFsbEl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtc0J5TGlzdC5oYXMoaXRlbS5saXN0X2lkKSkgaXRlbXNCeUxpc3Quc2V0KGl0ZW0ubGlzdF9pZCwgW10pO1xuICAgIGl0ZW1zQnlMaXN0LmdldChpdGVtLmxpc3RfaWQpIS5wdXNoKHtcbiAgICAgIHNob3dJZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ2hlY2sgd2hvIHRoZSBjdXJyZW50IHVzZXIgaXMgYWxyZWFkeSBmb2xsb3dpbmdcbiAgY29uc3QgeyBkYXRhOiBmb2xsb3dzRGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuc2VsZWN0KFwiZm9sbG93aW5nX2lkXCIpXG4gICAgLmVxKFwiZm9sbG93ZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgY29uc3QgZm9sbG93aW5nSWRzID0gbmV3IFNldCgoZm9sbG93c0RhdGEgPz8gW10pLm1hcCgoZikgPT4gZi5mb2xsb3dpbmdfaWQpKTtcblxuICAvLyBDb21wdXRlIHNpbWlsYXJpdHkgZm9yIGVhY2ggdXNlclxuICBjb25zdCByZXN1bHRzOiBTaW1pbGFyVXNlcltdID0gW107XG5cbiAgZm9yIChjb25zdCBsaXN0IG9mIHB1YmxpY0xpc3RzKSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IEFycmF5LmlzQXJyYXkobGlzdC5wcm9maWxlcylcbiAgICAgID8gbGlzdC5wcm9maWxlc1swXVxuICAgICAgOiBsaXN0LnByb2ZpbGVzO1xuICAgIGlmICghcHJvZmlsZSkgY29udGludWU7XG5cbiAgICBjb25zdCBvdGhlckl0ZW1zID0gaXRlbXNCeUxpc3QuZ2V0KGxpc3QuaWQpID8/IFtdO1xuICAgIGlmIChvdGhlckl0ZW1zLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG5cbiAgICBjb25zdCBzaW1pbGFyaXR5ID0gY29tcHV0ZUxpc3RTaW1pbGFyaXR5KHZpZXdlckxpc3QsIG90aGVySXRlbXMpO1xuICAgIGlmIChzaW1pbGFyaXR5ID09PSAwKSBjb250aW51ZTtcblxuICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICBpZDogcHJvZmlsZS5pZCxcbiAgICAgIHVzZXJuYW1lOiBwcm9maWxlLnVzZXJuYW1lLFxuICAgICAgYXZhdGFyX3VybDogcHJvZmlsZS5hdmF0YXJfdXJsLFxuICAgICAgc2hvd19jb3VudDogb3RoZXJJdGVtcy5sZW5ndGgsXG4gICAgICBzaW1pbGFyaXR5LFxuICAgICAgaXNfZm9sbG93aW5nOiBmb2xsb3dpbmdJZHMuaGFzKHByb2ZpbGUuaWQpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU29ydCBieSBzaW1pbGFyaXR5IGRlc2NlbmRpbmcsIHJldHVybiB0b3AgM1xuICByZXR1cm4gcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBiLnNpbWlsYXJpdHkgLSBhLnNpbWlsYXJpdHkpLnNsaWNlKDAsIDMpO1xufVxuXG5leHBvcnQgdHlwZSBSZWNvbW1lbmRlZFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIHNjb3JlOiBudW1iZXI7XG4gIHJlY29tbWVuZGVkQnk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWNvbW1lbmRhdGlvbnMoKTogUHJvbWlzZTxSZWNvbW1lbmRlZFNob3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gMS4gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgKyBpdGVtc1xuICBjb25zdCB7IGRhdGE6IG15TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIW15TGlzdCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YTogbXlJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmICghbXlJdGVtcyB8fCBteUl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHZpZXdlckxpc3Q6IExpc3RFbnRyeVtdID0gbXlJdGVtcy5tYXAoKGksIGlkeCkgPT4gKHtcbiAgICBzaG93SWQ6IGkuc2hvd19pZCxcbiAgICByYXRpbmc6IGkucmF0aW5nLFxuICAgIHBvc2l0aW9uOiBpLnBvc2l0aW9uID8/IGlkeCxcbiAgfSkpO1xuXG4gIC8vIDIuIEZldGNoIGFsbCBvdGhlciBwdWJsaWMgbGlzdHMgd2l0aCB0aGVpciBpdGVtcyBpbiBvbmUgcXVlcnlcbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgbGlzdCBpdGVtcyBmb3IgdGhvc2UgbGlzdHMgaW4gb25lIGJhdGNoXG4gIGNvbnN0IHsgZGF0YTogYWxsSXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImxpc3RfaWQsIHNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIGxpc3RJZHMpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSk7XG5cbiAgaWYgKCFhbGxJdGVtcyB8fCBhbGxJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyAzLiBHcm91cCBpdGVtcyBieSB1c2VyXG4gIGNvbnN0IGxpc3RUb1VzZXIgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGwgb2YgcHVibGljTGlzdHMpIHtcbiAgICBsaXN0VG9Vc2VyLnNldChsLmlkLCBsLnVzZXJfaWQpO1xuICB9XG5cbiAgY29uc3QgdXNlckl0ZW1zTWFwID0gbmV3IE1hcDxzdHJpbmcsIExpc3RFbnRyeVtdPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgYWxsSXRlbXMpIHtcbiAgICBjb25zdCB1c2VySWQgPSBsaXN0VG9Vc2VyLmdldChpdGVtLmxpc3RfaWQpO1xuICAgIGlmICghdXNlcklkKSBjb250aW51ZTtcbiAgICBpZiAoIXVzZXJJdGVtc01hcC5oYXModXNlcklkKSkgdXNlckl0ZW1zTWFwLnNldCh1c2VySWQsIFtdKTtcbiAgICB1c2VySXRlbXNNYXAuZ2V0KHVzZXJJZCkhLnB1c2goe1xuICAgICAgc2hvd0lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBvdGhlckxpc3RzOiBVc2VyTGlzdFtdID0gW107XG4gIGZvciAoY29uc3QgW3VzZXJJZCwgaXRlbXNdIG9mIHVzZXJJdGVtc01hcCkge1xuICAgIG90aGVyTGlzdHMucHVzaCh7IHVzZXJJZCwgaXRlbXMgfSk7XG4gIH1cblxuICAvLyA0LiBSdW4gc2NvcmluZyBhbGdvcml0aG1cbiAgY29uc3Qgc2NvcmVkID0gc2NvcmVSZWNvbW1lbmRhdGlvbnModmlld2VyTGlzdCwgb3RoZXJMaXN0cyk7XG5cbiAgaWYgKHNjb3JlZC5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyA1LiBGZXRjaCBzaG93IG1ldGFkYXRhIGZvciByZWNvbW1lbmRlZCBzaG93c1xuICBjb25zdCBzaG93SWRzID0gc2NvcmVkLm1hcCgocykgPT4gcy5zaG93SWQpO1xuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHNjb3JlZFxuICAgIC5tYXAoKHMpID0+IHtcbiAgICAgIGNvbnN0IHNob3cgPSBzaG93TWFwLmdldChzLnNob3dJZCk7XG4gICAgICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHNob3cuaWQsXG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICAgIHNjb3JlOiBNYXRoLnJvdW5kKHMuc2NvcmUgKiAxMDApIC8gMTAwLFxuICAgICAgICByZWNvbW1lbmRlZEJ5OiBzLnJlY29tbWVuZGVkQnksXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUmVjb21tZW5kZWRTaG93ID0+IHIgIT09IG51bGwpO1xufVxuXG5leHBvcnQgdHlwZSBQb3B1bGFyU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgYWRkZWRDb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBvcHVsYXJTaG93cygpOiBQcm9taXNlPFBvcHVsYXJTaG93W10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICAvLyBHZXQgYWxsIHB1YmxpYyBsaXN0IElEc1xuICBjb25zdCB7IGRhdGE6IHB1YmxpY0xpc3RzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpc19wdWJsaWNcIiwgdHJ1ZSk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBwdWJsaWNMaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBHZXQgYWxsIGl0ZW1zIGZyb20gcHVibGljIGxpc3RzXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWRcIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIHB1YmxpY0xpc3RJZHMpO1xuXG4gIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG5cbiAgLy8gQ291bnQgb2NjdXJyZW5jZXMgcGVyIHNob3dcbiAgY29uc3QgY291bnRNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb3VudE1hcC5zZXQoaXRlbS5zaG93X2lkLCAoY291bnRNYXAuZ2V0KGl0ZW0uc2hvd19pZCkgPz8gMCkgKyAxKTtcbiAgfVxuXG4gIC8vIFNvcnQgYnkgY291bnQsIHRha2UgdG9wIDEyXG4gIGNvbnN0IHRvcEVudHJpZXMgPSBBcnJheS5mcm9tKGNvdW50TWFwLmVudHJpZXMoKSlcbiAgICAuc29ydCgoYSwgYikgPT4gYlsxXSAtIGFbMV0pXG4gICAgLnNsaWNlKDAsIDEyKTtcblxuICBjb25zdCBzaG93SWRzID0gdG9wRW50cmllcy5tYXAoKFtpZF0pID0+IGlkKTtcblxuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHRvcEVudHJpZXNcbiAgICAubWFwKChbaWQsIGNvdW50XSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdyA9IHNob3dNYXAuZ2V0KGlkKTtcbiAgICAgIGlmICghc2hvdykgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogc2hvdy5pZCxcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgICAgYWRkZWRDb3VudDogY291bnQsXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUG9wdWxhclNob3cgPT4gciAhPT0gbnVsbCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRPckNyZWF0ZVNob3dCeVRtZGJJZChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuXG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiBleGlzdGluZy5pZDtcblxuICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuaW5zZXJ0KHtcbiAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgIG92ZXJ2aWV3OiBzaG93Lm92ZXJ2aWV3LFxuICAgIH0pXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvciB8fCAhbmV3U2hvdykgdGhyb3cgbmV3IEVycm9yKGVycm9yPy5tZXNzYWdlID8/IFwiRmFpbGVkIHRvIGNyZWF0ZSBzaG93XCIpO1xuICByZXR1cm4gbmV3U2hvdy5pZDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNlRBMkhzQiwrTEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/tags/data:982a09 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addTagToShow",
    ()=>$$RSC_SERVER_ACTION_4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60284a1ab5ea19fbab9cf5063455a83f97f947407e":"addTagToShow"},"packages/web/src/app/[locale]/(app)/tags/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60284a1ab5ea19fbab9cf5063455a83f97f947407e", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addTagToShow");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG5leHBvcnQgdHlwZSBUYWdSb3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIG5hbWU6IHN0cmluZztcbiAgY29sb3I6IHN0cmluZztcbiAgaXNfZGVmYXVsdDogYm9vbGVhbjtcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xufTtcblxuLyoqIFJldHVybnMgYWxsIHRhZ3MgdmlzaWJsZSB0byB0aGUgY3VycmVudCB1c2VyOiBkZWZhdWx0ICsgdGhlaXIgb3duIGN1c3RvbSB0YWdzICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlclRhZ3MoKTogUHJvbWlzZTxUYWdSb3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgLm9yZGVyKFwiaXNfZGVmYXVsdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJuYW1lXCIpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEZpbHRlciB0byBvbmx5IGRlZmF1bHQgKyBvd24gKFJMUyBhbHNvIGVuZm9yY2VzIHRoaXMsIGJ1dCBiZSBleHBsaWNpdClcbiAgcmV0dXJuIChkYXRhID8/IFtdKS5maWx0ZXIoXG4gICAgKHQpID0+IHQuaXNfZGVmYXVsdCB8fCB0LnVzZXJfaWQgPT09IHVzZXI/LmlkLFxuICApIGFzIFRhZ1Jvd1tdO1xufVxuXG4vKiogQ3JlYXRlcyBhIG5ldyBjdXN0b20gdGFnIGZvciB0aGUgYXV0aGVudGljYXRlZCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGFnKFxuICBuYW1lOiBzdHJpbmcsXG4gIGNvbG9yID0gXCJzbGF0ZVwiLFxuKTogUHJvbWlzZTxUYWdSb3c+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHRyaW1tZWQgPSBuYW1lLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkIHx8IHRyaW1tZWQubGVuZ3RoID4gNTApIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdGFnIG5hbWVcIik7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuaW5zZXJ0KHsgdXNlcl9pZDogdXNlci5pZCwgbmFtZTogdHJpbW1lZCwgY29sb3IsIGlzX2RlZmF1bHQ6IGZhbHNlIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICByZXZhbGlkYXRlUGF0aChcIi9wcm9maWxlXCIpO1xuICByZXR1cm4gZGF0YSBhcyBUYWdSb3c7XG59XG5cbi8qKiBVcGRhdGVzIHRoZSBjb2xvciBvZiBhIGN1c3RvbSB0YWcgb3duZWQgYnkgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRhZ0NvbG9yKFxuICB0YWdJZDogc3RyaW5nLFxuICBjb2xvcjogc3RyaW5nLFxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC51cGRhdGUoeyBjb2xvciB9KVxuICAgIC5lcShcImlkXCIsIHRhZ0lkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJpc19kZWZhdWx0XCIsIGZhbHNlKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbn1cblxuLyoqIERlbGV0ZXMgYSBjdXN0b20gdGFnIG93bmVkIGJ5IHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgKGRlZmF1bHQgdGFncyBjYW5ub3QgYmUgZGVsZXRlZCkgKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVUYWcodGFnSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuZGVsZXRlKClcbiAgICAuZXEoXCJpZFwiLCB0YWdJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwiaXNfZGVmYXVsdFwiLCBmYWxzZSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIHJldmFsaWRhdGVQYXRoKFwiL3Byb2ZpbGVcIik7XG59XG5cbi8qKiBBc3NpZ25zIGEgdGFnIHRvIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRhZ1RvU2hvdyhcbiAgc2hvd0lkOiBzdHJpbmcsXG4gIHRhZ0lkOiBzdHJpbmcsXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICB1c2VyX2lkOiB1c2VyLmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICB0YWdfaWQ6IHRhZ0lkLFxuICB9KTtcblxuICAvLyBJZ25vcmUgZHVwbGljYXRlIChhbHJlYWR5IHRhZ2dlZClcbiAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgIT09IFwiMjM1MDVcIikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmVtb3ZlcyBhIHRhZyBmcm9tIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVRhZ0Zyb21TaG93KFxuICBzaG93SWQ6IHN0cmluZyxcbiAgdGFnSWQ6IHN0cmluZyxcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5kZWxldGUoKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIHNob3dJZClcbiAgICAuZXEoXCJ0YWdfaWRcIiwgdGFnSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmV0dXJucyB0YWcgSURzIGFzc2lnbmVkIHRvIGEgc3BlY2lmaWMgc2hvdyBieSB0aGUgY3VycmVudCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2hvd1RhZ0lkcyhzaG93SWQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5zZWxlY3QoXCJ0YWdfaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpO1xuXG4gIHJldHVybiAoZGF0YSA/PyBbXSkubWFwKChyKSA9PiByLnRhZ19pZCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Im9UQXFHc0IseUxBQUEifQ==
}),
"[project]/packages/web/src/app/[locale]/(app)/tags/data:38aa00 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "removeTagFromShow",
    ()=>$$RSC_SERVER_ACTION_5
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60b2c2e67b25731c92502a0c0599b499b44b514caf":"removeTagFromShow"},"packages/web/src/app/[locale]/(app)/tags/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60b2c2e67b25731c92502a0c0599b499b44b514caf", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "removeTagFromShow");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG5leHBvcnQgdHlwZSBUYWdSb3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIG5hbWU6IHN0cmluZztcbiAgY29sb3I6IHN0cmluZztcbiAgaXNfZGVmYXVsdDogYm9vbGVhbjtcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xufTtcblxuLyoqIFJldHVybnMgYWxsIHRhZ3MgdmlzaWJsZSB0byB0aGUgY3VycmVudCB1c2VyOiBkZWZhdWx0ICsgdGhlaXIgb3duIGN1c3RvbSB0YWdzICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlclRhZ3MoKTogUHJvbWlzZTxUYWdSb3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgLm9yZGVyKFwiaXNfZGVmYXVsdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJuYW1lXCIpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEZpbHRlciB0byBvbmx5IGRlZmF1bHQgKyBvd24gKFJMUyBhbHNvIGVuZm9yY2VzIHRoaXMsIGJ1dCBiZSBleHBsaWNpdClcbiAgcmV0dXJuIChkYXRhID8/IFtdKS5maWx0ZXIoXG4gICAgKHQpID0+IHQuaXNfZGVmYXVsdCB8fCB0LnVzZXJfaWQgPT09IHVzZXI/LmlkLFxuICApIGFzIFRhZ1Jvd1tdO1xufVxuXG4vKiogQ3JlYXRlcyBhIG5ldyBjdXN0b20gdGFnIGZvciB0aGUgYXV0aGVudGljYXRlZCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGFnKFxuICBuYW1lOiBzdHJpbmcsXG4gIGNvbG9yID0gXCJzbGF0ZVwiLFxuKTogUHJvbWlzZTxUYWdSb3c+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHRyaW1tZWQgPSBuYW1lLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkIHx8IHRyaW1tZWQubGVuZ3RoID4gNTApIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdGFnIG5hbWVcIik7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuaW5zZXJ0KHsgdXNlcl9pZDogdXNlci5pZCwgbmFtZTogdHJpbW1lZCwgY29sb3IsIGlzX2RlZmF1bHQ6IGZhbHNlIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICByZXZhbGlkYXRlUGF0aChcIi9wcm9maWxlXCIpO1xuICByZXR1cm4gZGF0YSBhcyBUYWdSb3c7XG59XG5cbi8qKiBVcGRhdGVzIHRoZSBjb2xvciBvZiBhIGN1c3RvbSB0YWcgb3duZWQgYnkgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRhZ0NvbG9yKFxuICB0YWdJZDogc3RyaW5nLFxuICBjb2xvcjogc3RyaW5nLFxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC51cGRhdGUoeyBjb2xvciB9KVxuICAgIC5lcShcImlkXCIsIHRhZ0lkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJpc19kZWZhdWx0XCIsIGZhbHNlKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbn1cblxuLyoqIERlbGV0ZXMgYSBjdXN0b20gdGFnIG93bmVkIGJ5IHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgKGRlZmF1bHQgdGFncyBjYW5ub3QgYmUgZGVsZXRlZCkgKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVUYWcodGFnSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuZGVsZXRlKClcbiAgICAuZXEoXCJpZFwiLCB0YWdJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwiaXNfZGVmYXVsdFwiLCBmYWxzZSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIHJldmFsaWRhdGVQYXRoKFwiL3Byb2ZpbGVcIik7XG59XG5cbi8qKiBBc3NpZ25zIGEgdGFnIHRvIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRhZ1RvU2hvdyhcbiAgc2hvd0lkOiBzdHJpbmcsXG4gIHRhZ0lkOiBzdHJpbmcsXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICB1c2VyX2lkOiB1c2VyLmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICB0YWdfaWQ6IHRhZ0lkLFxuICB9KTtcblxuICAvLyBJZ25vcmUgZHVwbGljYXRlIChhbHJlYWR5IHRhZ2dlZClcbiAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgIT09IFwiMjM1MDVcIikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmVtb3ZlcyBhIHRhZyBmcm9tIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVRhZ0Zyb21TaG93KFxuICBzaG93SWQ6IHN0cmluZyxcbiAgdGFnSWQ6IHN0cmluZyxcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5kZWxldGUoKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIHNob3dJZClcbiAgICAuZXEoXCJ0YWdfaWRcIiwgdGFnSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmV0dXJucyB0YWcgSURzIGFzc2lnbmVkIHRvIGEgc3BlY2lmaWMgc2hvdyBieSB0aGUgY3VycmVudCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2hvd1RhZ0lkcyhzaG93SWQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5zZWxlY3QoXCJ0YWdfaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpO1xuXG4gIHJldHVybiAoZGF0YSA/PyBbXSkubWFwKChyKSA9PiByLnRhZ19pZCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlUQTBIc0IsOExBQUEifQ==
}),
"[project]/packages/web/src/app/[locale]/(app)/tags/data:037f87 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTag",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60ae6b65df1639e757552ec317448df0fa8719df9a":"createTag"},"packages/web/src/app/[locale]/(app)/tags/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60ae6b65df1639e757552ec317448df0fa8719df9a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "createTag");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG5leHBvcnQgdHlwZSBUYWdSb3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIG5hbWU6IHN0cmluZztcbiAgY29sb3I6IHN0cmluZztcbiAgaXNfZGVmYXVsdDogYm9vbGVhbjtcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xufTtcblxuLyoqIFJldHVybnMgYWxsIHRhZ3MgdmlzaWJsZSB0byB0aGUgY3VycmVudCB1c2VyOiBkZWZhdWx0ICsgdGhlaXIgb3duIGN1c3RvbSB0YWdzICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlclRhZ3MoKTogUHJvbWlzZTxUYWdSb3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgLm9yZGVyKFwiaXNfZGVmYXVsdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJuYW1lXCIpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEZpbHRlciB0byBvbmx5IGRlZmF1bHQgKyBvd24gKFJMUyBhbHNvIGVuZm9yY2VzIHRoaXMsIGJ1dCBiZSBleHBsaWNpdClcbiAgcmV0dXJuIChkYXRhID8/IFtdKS5maWx0ZXIoXG4gICAgKHQpID0+IHQuaXNfZGVmYXVsdCB8fCB0LnVzZXJfaWQgPT09IHVzZXI/LmlkLFxuICApIGFzIFRhZ1Jvd1tdO1xufVxuXG4vKiogQ3JlYXRlcyBhIG5ldyBjdXN0b20gdGFnIGZvciB0aGUgYXV0aGVudGljYXRlZCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGFnKFxuICBuYW1lOiBzdHJpbmcsXG4gIGNvbG9yID0gXCJzbGF0ZVwiLFxuKTogUHJvbWlzZTxUYWdSb3c+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHRyaW1tZWQgPSBuYW1lLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkIHx8IHRyaW1tZWQubGVuZ3RoID4gNTApIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdGFnIG5hbWVcIik7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuaW5zZXJ0KHsgdXNlcl9pZDogdXNlci5pZCwgbmFtZTogdHJpbW1lZCwgY29sb3IsIGlzX2RlZmF1bHQ6IGZhbHNlIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICByZXZhbGlkYXRlUGF0aChcIi9wcm9maWxlXCIpO1xuICByZXR1cm4gZGF0YSBhcyBUYWdSb3c7XG59XG5cbi8qKiBVcGRhdGVzIHRoZSBjb2xvciBvZiBhIGN1c3RvbSB0YWcgb3duZWQgYnkgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRhZ0NvbG9yKFxuICB0YWdJZDogc3RyaW5nLFxuICBjb2xvcjogc3RyaW5nLFxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC51cGRhdGUoeyBjb2xvciB9KVxuICAgIC5lcShcImlkXCIsIHRhZ0lkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJpc19kZWZhdWx0XCIsIGZhbHNlKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbn1cblxuLyoqIERlbGV0ZXMgYSBjdXN0b20gdGFnIG93bmVkIGJ5IHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgKGRlZmF1bHQgdGFncyBjYW5ub3QgYmUgZGVsZXRlZCkgKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVUYWcodGFnSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuZGVsZXRlKClcbiAgICAuZXEoXCJpZFwiLCB0YWdJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwiaXNfZGVmYXVsdFwiLCBmYWxzZSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIHJldmFsaWRhdGVQYXRoKFwiL3Byb2ZpbGVcIik7XG59XG5cbi8qKiBBc3NpZ25zIGEgdGFnIHRvIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRhZ1RvU2hvdyhcbiAgc2hvd0lkOiBzdHJpbmcsXG4gIHRhZ0lkOiBzdHJpbmcsXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICB1c2VyX2lkOiB1c2VyLmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICB0YWdfaWQ6IHRhZ0lkLFxuICB9KTtcblxuICAvLyBJZ25vcmUgZHVwbGljYXRlIChhbHJlYWR5IHRhZ2dlZClcbiAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgIT09IFwiMjM1MDVcIikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmVtb3ZlcyBhIHRhZyBmcm9tIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVRhZ0Zyb21TaG93KFxuICBzaG93SWQ6IHN0cmluZyxcbiAgdGFnSWQ6IHN0cmluZyxcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5kZWxldGUoKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIHNob3dJZClcbiAgICAuZXEoXCJ0YWdfaWRcIiwgdGFnSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmV0dXJucyB0YWcgSURzIGFzc2lnbmVkIHRvIGEgc3BlY2lmaWMgc2hvdyBieSB0aGUgY3VycmVudCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2hvd1RhZ0lkcyhzaG93SWQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5zZWxlY3QoXCJ0YWdfaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpO1xuXG4gIHJldHVybiAoZGF0YSA/PyBbXSkubWFwKChyKSA9PiByLnRhZ19pZCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImlUQW9Dc0Isc0xBQUEifQ==
}),
"[project]/packages/web/src/app/[locale]/(app)/shows/data:9fc0eb [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchTmdbData",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40960a8ed4e9e9afad4bb4b4bf6850e4539ad8f991":"fetchTmdbData"},"packages/web/src/app/[locale]/(app)/shows/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40960a8ed4e9e9afad4bb4b4bf6850e4539ad8f991", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "fetchTmdbData");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHtcbiAgZmluZEJ5SW1kYklkLFxuICBzZWFyY2hTaG93cyxcbiAgc2VhcmNoTW92aWVzLFxuICBnZXRTaG93RGV0YWlscyxcbiAgZ2V0TW92aWVEZXRhaWxzLFxuICBnZXRTZWFzb25EZXRhaWxzLFxuICBub3JtYWxpemVNb3ZpZUFzU2hvdyxcbiAgZXh0cmFjdFRyYWlsZXJVcmwsXG59IGZyb20gXCJAL2xpYi90bWRiL2NsaWVudFwiO1xuaW1wb3J0IHR5cGUgeyBUTURCU2hvd0V4dGVuZGVkIH0gZnJvbSBcIkAvbGliL3RtZGIvY2xpZW50XCI7XG5cbi8qKlxuICogTGF6aWx5IGZldGNoZXMgVE1EQiBkYXRhIGZvciBhIHNob3cgYW5kIHBlcnNpc3RzIGl0IHRvIHRoZSBkYXRhYmFzZS5cbiAqIENhbGxlZCBvbmNlIHdoZW4gYSB1c2VyIGZpcnN0IHZpc2l0cyBhIHNob3cgZGV0YWlsIHBhZ2UgdGhhdCBoYXNuJ3QgYmVlbiBlbnJpY2hlZCB5ZXQuXG4gKlxuICogQSBzaG93IG5lZWRzIGVucmljaG1lbnQgaWY6XG4gKiAgLSB0bWRiX2ZldGNoZWQgPT09IGZhbHNlICAoYWZ0ZXIgbWlncmF0aW9uKVxuICogIC0gT1IgdG1kYl9pZCBpcyBuZWdhdGl2ZSAgKHBsYWNlaG9sZGVyIHNldCBkdXJpbmcgaW1wb3J0IGJlZm9yZSBtaWdyYXRpb24pXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFRtZGJEYXRhKHNob3dJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG5cbiAgY29uc3QgeyBkYXRhOiBzaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiKlwiKVxuICAgIC5lcShcImlkXCIsIHNob3dJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzaG93KSByZXR1cm4gbnVsbDtcblxuICAvLyBBbHJlYWR5IGVucmljaGVkXG4gIGNvbnN0IG5lZWRzRmV0Y2ggPVxuICAgIChzaG93IGFzIHVua25vd24gYXMgeyB0bWRiX2ZldGNoZWQ/OiBib29sZWFuIH0pLnRtZGJfZmV0Y2hlZCA9PT0gZmFsc2UgfHxcbiAgICAoc2hvdy50bWRiX2lkICE9PSBudWxsICYmIHNob3cudG1kYl9pZCA8IDApIHx8XG4gICAgc2hvdy50bWRiX2lkID09PSBudWxsIHx8XG4gICAgLy8gUmV0cnkgaWYgcHJldmlvdXNseSBmZXRjaGVkIGJ1dCBub3RoaW5nIHdhcyBmb3VuZCAoZS5nLiB3YXMgYSBtb3ZpZSwgb25seSBUViB3YXMgc2VhcmNoZWQpXG4gICAgKCFzaG93LnBvc3Rlcl9wYXRoICYmICFzaG93Lm92ZXJ2aWV3KTtcblxuICBpZiAoIW5lZWRzRmV0Y2gpIHJldHVybiBzaG93O1xuXG4gIGxldCBmb3VuZDogVE1EQlNob3dFeHRlbmRlZCB8IG51bGwgPSBudWxsO1xuICBsZXQgaXNNb3ZpZU1hdGNoID0gZmFsc2U7XG5cbiAgLy8gU3RyYXRlZ3kgMTogbG9va3VwIGJ5IGV4aXN0aW5nIHBvc2l0aXZlIHRtZGJfaWQgYXMgYSBUViBzaG93XG4gIGlmIChzaG93LnRtZGJfaWQgIT09IG51bGwgJiYgc2hvdy50bWRiX2lkID4gMCkge1xuICAgIHRyeSB7XG4gICAgICBmb3VuZCA9IGF3YWl0IGdldFNob3dEZXRhaWxzKHNob3cudG1kYl9pZCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBUaGUgdG1kYl9pZCBtaWdodCBiZWxvbmcgdG8gYSBtb3ZpZSDigJQgY2hlY2sgYW5kIGZsYWcgZm9yIHJlbW92YWxcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG1vdmllID0gYXdhaXQgZ2V0TW92aWVEZXRhaWxzKHNob3cudG1kYl9pZCk7XG4gICAgICAgIGZvdW5kID0gbm9ybWFsaXplTW92aWVBc1Nob3cobW92aWUpO1xuICAgICAgICBpc01vdmllTWF0Y2ggPSB0cnVlO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8qIGZhbGwgdGhyb3VnaCAqL1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFN0cmF0ZWd5IDI6IGxvb2t1cCBieSBJTURiIElEXG4gIGlmICghZm91bmQgJiYgc2hvdy5pbWRiX2lkKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc2hvdzogdHZNYXRjaCwgbW92aWU6IG1vdmllTWF0Y2ggfSA9IGF3YWl0IGZpbmRCeUltZGJJZChcbiAgICAgICAgc2hvdy5pbWRiX2lkLFxuICAgICAgKTtcbiAgICAgIGlmICh0dk1hdGNoKSB7XG4gICAgICAgIGZvdW5kID0gYXdhaXQgZ2V0U2hvd0RldGFpbHModHZNYXRjaC5pZCk7XG4gICAgICB9IGVsc2UgaWYgKG1vdmllTWF0Y2gpIHtcbiAgICAgICAgLy8gSU1EYiBJRCByZXNvbHZlcyB0byBhIG1vdmllIOKAlCBmbGFnIGZvciByZW1vdmFsXG4gICAgICAgIGNvbnN0IG1vdmllRGV0YWlscyA9IGF3YWl0IGdldE1vdmllRGV0YWlscyhtb3ZpZU1hdGNoLmlkKTtcbiAgICAgICAgZm91bmQgPSBub3JtYWxpemVNb3ZpZUFzU2hvdyhtb3ZpZURldGFpbHMpO1xuICAgICAgICBpc01vdmllTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLyogZmFsbCB0aHJvdWdoICovXG4gICAgfVxuICB9XG5cbiAgLy8gU3RyYXRlZ3kgMzogc2VhcmNoIGJ5IHRpdGxlIGFzIFRWIHNob3dcbiAgaWYgKCFmb3VuZCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgc2VhcmNoU2hvd3Moc2hvdy50aXRsZSk7XG4gICAgICBjb25zdCBmaXJzdCA9IGRhdGEucmVzdWx0cz8uWzBdO1xuICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgIGZvdW5kID0gYXdhaXQgZ2V0U2hvd0RldGFpbHMoZmlyc3QuaWQpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaWdub3JlICovXG4gICAgfVxuICB9XG5cbiAgLy8gU3RyYXRlZ3kgNDogc2VhcmNoIGJ5IHRpdGxlIGFzIG1vdmllIOKAlCB0aGlzIGlzIGEgVFYgcmFua2VyLCBzbyBmbGFnIGZvciByZW1vdmFsXG4gIGlmICghZm91bmQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHNlYXJjaE1vdmllcyhzaG93LnRpdGxlKTtcbiAgICAgIGNvbnN0IGZpcnN0ID0gZGF0YS5yZXN1bHRzPy5bMF07XG4gICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgZm91bmQgPSBub3JtYWxpemVNb3ZpZUFzU2hvdyhhd2FpdCBnZXRNb3ZpZURldGFpbHMoZmlyc3QuaWQpKTtcbiAgICAgICAgaXNNb3ZpZU1hdGNoID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8qIGlnbm9yZSAqL1xuICAgIH1cbiAgfVxuXG4gIGlmICghZm91bmQpIHtcbiAgICAvLyBNYXJrIGFzIGZldGNoZWQgZXZlbiBpZiBUTURCIGhhcyBubyBtYXRjaCwgdG8gYXZvaWQgcmVwZWF0ZWQgbG9va3Vwcy5cbiAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLnVwZGF0ZSh7IHRtZGJfZmV0Y2hlZDogdHJ1ZSB9IGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxuICAgICAgLmVxKFwiaWRcIiwgc2hvd0lkKVxuICAgICAgLnRoZW4oXG4gICAgICAgICgpID0+IG51bGwsXG4gICAgICAgICgpID0+IG51bGwsXG4gICAgICApO1xuICAgIHJldHVybiBzaG93O1xuICB9XG5cbiAgLy8gVGhpcyBpcyBhIFRWIHJhbmtlciDigJQgaWYgVE1EQiBvbmx5IHJlY29nbmlzZXMgdGhlIGVudHJ5IGFzIGEgbW92aWUsIHJlbW92ZSBpdC5cbiAgaWYgKGlzTW92aWVNYXRjaCkge1xuICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93c1wiKS5kZWxldGUoKS5lcShcImlkXCIsIHNob3dJZCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbm90aGVyIHNob3cgcm93IGFscmVhZHkgaG9sZHMgdGhpcyByZWFsIHRtZGJfaWRcbiAgY29uc3QgeyBkYXRhOiBjb25mbGljdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBmb3VuZC5pZClcbiAgICAubmVxKFwiaWRcIiwgc2hvd0lkKVxuICAgIC5saW1pdCgxKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoY29uZmxpY3QpIHtcbiAgICAvLyBNZXJnZTogcG9pbnQgYWxsIGxpc3RfaXRlbXMgZnJvbSB0aGlzIHBsYWNlaG9sZGVyIHRvIHRoZSBleGlzdGluZyBjYW5vbmljYWwgc2hvd1xuICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAgIC51cGRhdGUoeyBzaG93X2lkOiBjb25mbGljdC5pZCB9IGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXG4gICAgICAuZXEoXCJzaG93X2lkXCIsIHNob3dJZCk7XG4gICAgLy8gRGVsZXRlIHRoZSBwbGFjZWhvbGRlciBzaG93XG4gICAgYXdhaXQgc3VwYWJhc2UuZnJvbShcInNob3dzXCIpLmRlbGV0ZSgpLmVxKFwiaWRcIiwgc2hvd0lkKTtcbiAgICAvLyBSZXR1cm4gdGhlIGNhbm9uaWNhbCBzaG93XG4gICAgY29uc3QgeyBkYXRhOiBjYW5vbmljYWwgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAuc2VsZWN0KFwiKlwiKVxuICAgICAgLmVxKFwiaWRcIiwgY29uZmxpY3QuaWQpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgcmV0dXJuIGNhbm9uaWNhbDtcbiAgfVxuXG4gIC8vIEJ1aWxkIGV4dHJhIGZpZWxkcyBmcm9tIGV4dGVuZGVkIFRNREIgcmVzcG9uc2VcbiAgY29uc3Qgc2Vhc29uc0RhdGEgPSBmb3VuZC5zZWFzb25zXG4gICAgPyBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgZm91bmQuc2Vhc29uc1xuICAgICAgICAgIC5maWx0ZXIoKHMpID0+IHMuc2Vhc29uX251bWJlciA+IDApIC8vIGV4Y2x1ZGUgXCJTcGVjaWFsc1wiIChzZWFzb24gMClcbiAgICAgICAgICAubWFwKGFzeW5jIChzKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXBpc29kZXM6IHsgZXBpc29kZV9udW1iZXI6IG51bWJlcjsgbmFtZTogc3RyaW5nOyBydW50aW1lOiBudW1iZXIgfCBudWxsIH1bXSA9IFtdO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IGF3YWl0IGdldFNlYXNvbkRldGFpbHMoZm91bmQhLmlkLCBzLnNlYXNvbl9udW1iZXIpO1xuICAgICAgICAgICAgICBlcGlzb2RlcyA9IGRldGFpbHMuZXBpc29kZXMubWFwKChlKSA9PiAoe1xuICAgICAgICAgICAgICAgIGVwaXNvZGVfbnVtYmVyOiBlLmVwaXNvZGVfbnVtYmVyLFxuICAgICAgICAgICAgICAgIG5hbWU6IGUubmFtZSxcbiAgICAgICAgICAgICAgICBydW50aW1lOiBlLnJ1bnRpbWUgPz8gbnVsbCxcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgIC8qIGVwaXNvZGkgbm9uIGRpc3BvbmliaWxpIOKAlCBwcm9jZWRpIHNlbnphICovXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzZWFzb25fbnVtYmVyOiBzLnNlYXNvbl9udW1iZXIsXG4gICAgICAgICAgICAgIG5hbWU6IHMubmFtZSxcbiAgICAgICAgICAgICAgZXBpc29kZV9jb3VudDogcy5lcGlzb2RlX2NvdW50LFxuICAgICAgICAgICAgICBhaXJfZGF0ZTogcy5haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICAgICAgICBlcGlzb2RlcyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICApXG4gICAgOiBudWxsO1xuXG4gIGNvbnN0IHRyYWlsZXJVcmwgPSBleHRyYWN0VHJhaWxlclVybChmb3VuZC52aWRlb3MpO1xuXG4gIGNvbnN0IHdhdGNoUHJvdmlkZXJzID0gZm91bmRbXCJ3YXRjaC9wcm92aWRlcnNcIl0/LnJlc3VsdHMgPz8gbnVsbDtcblxuICAvLyBVcGRhdGUgdGhlIHNob3cgd2l0aCByZWFsIFRNREIgZGF0YS5cbiAgLy8gdG1kYl9mZXRjaGVkIGlzIG9ubHkgaW4gdXBkYXRlcyBhZnRlciBtaWdyYXRpb24g4oCUIFBvc3RnUkVTVCBpZ25vcmVzIHVua25vd24gY29sdW1ucyBncmFjZWZ1bGx5LlxuICBjb25zdCB1cGRhdGVzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHtcbiAgICB0bWRiX2lkOiBmb3VuZC5pZCxcbiAgICB0aXRsZTogZm91bmQubmFtZSxcbiAgICBwb3N0ZXJfcGF0aDogZm91bmQucG9zdGVyX3BhdGgsXG4gICAgZmlyc3RfYWlyX2RhdGU6IGZvdW5kLmZpcnN0X2Fpcl9kYXRlIHx8IG51bGwsXG4gICAgb3ZlcnZpZXc6IGZvdW5kLm92ZXJ2aWV3IHx8IG51bGwsXG4gICAgdG1kYl9mZXRjaGVkOiB0cnVlLFxuICAgIGVwaXNvZGVzX2ZldGNoZWQ6IHRydWUsXG4gICAgc2Vhc29uc19kYXRhOiBzZWFzb25zRGF0YSxcbiAgICB0cmFpbGVyX3VybDogdHJhaWxlclVybCxcbiAgICB3YXRjaF9wcm92aWRlcnM6IHdhdGNoUHJvdmlkZXJzLFxuICB9O1xuXG4gIGNvbnN0IHsgZGF0YTogdXBkYXRlZCwgZXJyb3I6IHVwZGF0ZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAudXBkYXRlKHVwZGF0ZXMpXG4gICAgLmVxKFwiaWRcIiwgc2hvd0lkKVxuICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICh1cGRhdGVFcnJvcikge1xuICAgIC8vIFJldHJ5IHdpdGhvdXQgdG1kYl9mZXRjaGVkIGlmIGNvbHVtbiBkb2Vzbid0IGV4aXN0IHlldCAocHJlLW1pZ3JhdGlvbilcbiAgICBjb25zdCB7IGRhdGE6IHVwZGF0ZWQyIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLnVwZGF0ZSh7XG4gICAgICAgIHRtZGJfaWQ6IGZvdW5kLmlkLFxuICAgICAgICB0aXRsZTogZm91bmQubmFtZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IGZvdW5kLnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogZm91bmQuZmlyc3RfYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgb3ZlcnZpZXc6IGZvdW5kLm92ZXJ2aWV3IHx8IG51bGwsXG4gICAgICB9KVxuICAgICAgLmVxKFwiaWRcIiwgc2hvd0lkKVxuICAgICAgLnNlbGVjdChcIipcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICByZXR1cm4gdXBkYXRlZDI7XG4gIH1cblxuICByZXR1cm4gdXBkYXRlZDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoic1RBdUJzQiwwTEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ListDetailClient",
    ()=>ListDetailClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Plus.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ArrowLeft$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/ArrowLeft.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/X.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FunnelSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/FunnelSimple.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$CopySimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/CopySimple.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileArrowUp$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/FileArrowUp.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ChartPie$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/ChartPie.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/i18n/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/tag-colors.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$ListHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/ListHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$ShowRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/ShowRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$AddShowDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/AddShowDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/EmptyState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$ImportDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/ImportDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$OnboardingEmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/OnboardingEmptyState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/rating-labels.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/rating-labels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$f4cff5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:f4cff5 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$da44cf__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:da44cf [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$d91a32__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:d91a32 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$be9101__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:be9101 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$c58d8a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:c58d8a [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$e9cb7c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:e9cb7c [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$b53304__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:b53304 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$78a2ae__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:78a2ae [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$1653ce__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:1653ce [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$e62915__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/explore/data:e62915 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$982a09__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/tags/data:982a09 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$38aa00__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/tags/data:38aa00 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$037f87__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/tags/data:037f87 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$data$3a$9fc0eb__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/shows/data:9fc0eb [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
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
;
// Thin wrapper that fires a callback once when the element enters the viewport.
// Only attaches the observer when the show has not yet been enriched from TMDB.
function ShowRowObserver({ tmdbFetched, onVisible, children }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const triggered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const onVisibleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onVisible);
    onVisibleRef.current = onVisible;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShowRowObserver.useEffect": ()=>{
            if (tmdbFetched || triggered.current) return;
            const el = ref.current;
            if (!el) return;
            const observer = new IntersectionObserver({
                "ShowRowObserver.useEffect": ([entry])=>{
                    if (entry.isIntersecting && !triggered.current) {
                        triggered.current = true;
                        onVisibleRef.current();
                        observer.disconnect();
                    }
                }
            }["ShowRowObserver.useEffect"], {
                rootMargin: "150px"
            });
            observer.observe(el);
            return ({
                "ShowRowObserver.useEffect": ()=>observer.disconnect()
            })["ShowRowObserver.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ShowRowObserver.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
        lineNumber: 126,
        columnNumber: 10
    }, this);
}
_s(ShowRowObserver, "GY4PakM7GHToIOMeifgtIFzmjXo=");
_c = ShowRowObserver;
function ListDetailClient({ list, isOwner, isLoggedIn, existingTmdbIds, ratingLabels, allTags = [], showTagsMap: initialShowTagsMap = {}, hasMore: initialHasMore, listId, userLists = [], viewerListEmpty = false }) {
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const i18nRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("lists");
    const tCommon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("common");
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [showAddDialog, setShowAddDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [recScoreMap, setRecScoreMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(list.list_items);
    // Local state for debounced description edits
    const [listDescription, setListDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(list.description ?? "");
    const [saveStatus, setSaveStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const descDebounceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const savedTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showTagsMap, setShowTagsMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialShowTagsMap);
    const [filterTagIds, setFilterTagIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filterRatings, setFilterRatings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [showFilters, setShowFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Quick-add feedback
    const [quickAddFeedback, setQuickAddFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Import dialog
    const [showImport, setShowImport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Copy list (only available when viewer's list is empty)
    const [isCopying, setIsCopying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Track which ShowRow has its mobile rating bar open (only one at a time)
    const [openRatingItemId, setOpenRatingItemId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Pagination state
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialHasMore);
    const [loadingMore, setLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const nextPageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1); // page 0 was server-rendered
    const sentinelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Track in-flight TMDB fetches to avoid duplicates
    const fetchingTmdb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    // All possible rating tiers (1-10 + null for Unrated)
    const allRatings = [
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        null
    ];
    // Items filtered by search query + selected tag + rating filters
    const filteredItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ListDetailClient.useMemo[filteredItems]": ()=>{
            const q = searchQuery.trim().toLowerCase();
            return items.filter({
                "ListDetailClient.useMemo[filteredItems]": (item)=>{
                    if (q && !item.shows.title.toLowerCase().includes(q)) return false;
                    if (filterTagIds.length > 0) {
                        const itemTagIds = showTagsMap[item.shows.id] ?? [];
                        if (!filterTagIds.every({
                            "ListDetailClient.useMemo[filteredItems]": (id)=>itemTagIds.includes(id)
                        }["ListDetailClient.useMemo[filteredItems]"])) return false;
                    }
                    if (filterRatings.size > 0 && !filterRatings.has(item.rating)) return false;
                    return true;
                }
            }["ListDetailClient.useMemo[filteredItems]"]);
        }
    }["ListDetailClient.useMemo[filteredItems]"], [
        items,
        showTagsMap,
        filterTagIds,
        filterRatings,
        searchQuery
    ]);
    const activeFilterCount = filterTagIds.length + filterRatings.size;
    // Group items by rating tier (desc), unrated last
    const ratingGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ListDetailClient.useMemo[ratingGroups]": ()=>{
            const sorted = [
                ...filteredItems
            ].sort({
                "ListDetailClient.useMemo[ratingGroups].sorted": (a, b)=>{
                    if (a.rating === b.rating) return a.position - b.position;
                    if (a.rating === null) return 1;
                    if (b.rating === null) return -1;
                    return b.rating - a.rating;
                }
            }["ListDetailClient.useMemo[ratingGroups].sorted"]);
            const groups = [];
            for (const item of sorted){
                const last = groups[groups.length - 1];
                if (!last || last.rating !== item.rating) {
                    groups.push({
                        rating: item.rating,
                        items: [
                            item
                        ]
                    });
                } else {
                    last.items.push(item);
                }
            }
            return groups;
        }
    }["ListDetailClient.useMemo[ratingGroups]"], [
        filteredItems
    ]);
    const sortedIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ListDetailClient.useMemo[sortedIds]": ()=>ratingGroups.flatMap({
                "ListDetailClient.useMemo[sortedIds]": (g)=>g.items.map({
                        "ListDetailClient.useMemo[sortedIds]": (i)=>i.id
                    }["ListDetailClient.useMemo[sortedIds]"])
            }["ListDetailClient.useMemo[sortedIds]"])
    }["ListDetailClient.useMemo[sortedIds]"], [
        ratingGroups
    ]);
    // Infinite scroll: load next page when sentinel enters view
    const loadNextPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[loadNextPage]": async ()=>{
            if (loadingMore || !hasMore) return;
            setLoadingMore(true);
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$b53304__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getListItemsPage"])(listId, nextPageRef.current);
                nextPageRef.current++;
                setItems({
                    "ListDetailClient.useCallback[loadNextPage]": (prev)=>[
                            ...prev,
                            ...result.items
                        ]
                }["ListDetailClient.useCallback[loadNextPage]"]);
                setShowTagsMap({
                    "ListDetailClient.useCallback[loadNextPage]": (prev)=>({
                            ...prev,
                            ...result.showTagsMap
                        })
                }["ListDetailClient.useCallback[loadNextPage]"]);
                setHasMore(result.hasMore);
            } finally{
                setLoadingMore(false);
            }
        }
    }["ListDetailClient.useCallback[loadNextPage]"], [
        loadingMore,
        hasMore,
        listId
    ]);
    // Fetch recommendations once when the add-show dialog opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ListDetailClient.useEffect": ()=>{
            if (!showAddDialog) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$e62915__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRecommendations"])().then({
                "ListDetailClient.useEffect": (recs)=>{
                    const map = new Map();
                    for (const r of recs){
                        if (r.tmdb_id !== null) map.set(r.tmdb_id, r.score);
                    }
                    setRecScoreMap(map);
                }
            }["ListDetailClient.useEffect"]);
        }
    }["ListDetailClient.useEffect"], [
        showAddDialog
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ListDetailClient.useEffect": ()=>{
            if (!hasMore) return;
            const sentinel = sentinelRef.current;
            if (!sentinel) return;
            const observer = new IntersectionObserver({
                "ListDetailClient.useEffect": ([entry])=>{
                    if (entry.isIntersecting) loadNextPage();
                }
            }["ListDetailClient.useEffect"], {
                rootMargin: "300px"
            });
            observer.observe(sentinel);
            return ({
                "ListDetailClient.useEffect": ()=>observer.disconnect()
            })["ListDetailClient.useEffect"];
        }
    }["ListDetailClient.useEffect"], [
        hasMore,
        loadNextPage
    ]);
    // Lazy TMDB fetch: called when an un-enriched row enters view
    const handleShowInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleShowInView]": async (showId)=>{
            if (fetchingTmdb.current.has(showId)) return;
            fetchingTmdb.current.add(showId);
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$data$3a$9fc0eb__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["fetchTmdbData"])(showId);
                if (result) {
                    setItems({
                        "ListDetailClient.useCallback[handleShowInView]": (prev)=>prev.map({
                                "ListDetailClient.useCallback[handleShowInView]": (item)=>item.shows.id === showId ? {
                                        ...item,
                                        shows: {
                                            ...item.shows,
                                            title: result.title ?? item.shows.title,
                                            poster_path: result.poster_path ?? item.shows.poster_path,
                                            first_air_date: result.first_air_date ?? item.shows.first_air_date,
                                            overview: result.overview ?? item.shows.overview,
                                            tmdb_id: result.tmdb_id ?? item.shows.tmdb_id,
                                            tmdb_fetched: true
                                        }
                                    } : item
                            }["ListDetailClient.useCallback[handleShowInView]"])
                    }["ListDetailClient.useCallback[handleShowInView]"]);
                }
            } catch  {
            // Silently ignore fetch errors — data will stay stale
            }
        }
    }["ListDetailClient.useCallback[handleShowInView]"], []);
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointerSensor"]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyboardSensor"], {
        coordinateGetter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortableKeyboardCoordinates"]
    }));
    const handleDragEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleDragEnd]": (event)=>{
            const { active, over } = event;
            if (!over || active.id === over.id) return;
            const oldIndex = sortedIds.indexOf(active.id);
            const newIndex = sortedIds.indexOf(over.id);
            const newSorted = [
                ...sortedIds
            ];
            newSorted.splice(oldIndex, 1);
            newSorted.splice(newIndex, 0, active.id);
            setItems({
                "ListDetailClient.useCallback[handleDragEnd]": (prev)=>{
                    const reordered = newSorted.map({
                        "ListDetailClient.useCallback[handleDragEnd].reordered": (id)=>prev.find({
                                "ListDetailClient.useCallback[handleDragEnd].reordered": (item)=>item.id === id
                            }["ListDetailClient.useCallback[handleDragEnd].reordered"])
                    }["ListDetailClient.useCallback[handleDragEnd].reordered"]);
                    return reordered.map({
                        "ListDetailClient.useCallback[handleDragEnd]": (item, index)=>({
                                ...item,
                                position: index
                            })
                    }["ListDetailClient.useCallback[handleDragEnd]"]);
                }
            }["ListDetailClient.useCallback[handleDragEnd]"]);
            startTransition({
                "ListDetailClient.useCallback[handleDragEnd]": async ()=>{
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$e9cb7c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["reorderListItems"])(list.id, newSorted);
                }
            }["ListDetailClient.useCallback[handleDragEnd]"]);
        }
    }["ListDetailClient.useCallback[handleDragEnd]"], [
        sortedIds,
        list.id,
        startTransition
    ]);
    const handleDescriptionChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleDescriptionChange]": (description)=>{
            setListDescription(description);
            if (descDebounceRef.current) clearTimeout(descDebounceRef.current);
            if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
            setSaveStatus("saving");
            descDebounceRef.current = setTimeout({
                "ListDetailClient.useCallback[handleDescriptionChange]": ()=>{
                    startTransition({
                        "ListDetailClient.useCallback[handleDescriptionChange]": async ()=>{
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$f4cff5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateList"])(list.id, {
                                description
                            });
                            setSaveStatus("saved");
                            savedTimerRef.current = setTimeout({
                                "ListDetailClient.useCallback[handleDescriptionChange]": ()=>setSaveStatus("idle")
                            }["ListDetailClient.useCallback[handleDescriptionChange]"], 2000);
                        }
                    }["ListDetailClient.useCallback[handleDescriptionChange]"]);
                }
            }["ListDetailClient.useCallback[handleDescriptionChange]"], 800);
        }
    }["ListDetailClient.useCallback[handleDescriptionChange]"], [
        list.id,
        startTransition
    ]);
    const handleTogglePublic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleTogglePublic]": ()=>{
            startTransition({
                "ListDetailClient.useCallback[handleTogglePublic]": async ()=>{
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$f4cff5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateList"])(list.id, {
                        is_public: !list.is_public
                    });
                    router.refresh();
                }
            }["ListDetailClient.useCallback[handleTogglePublic]"]);
        }
    }["ListDetailClient.useCallback[handleTogglePublic]"], [
        list.id,
        list.is_public,
        router,
        startTransition
    ]);
    const handleAddShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleAddShow]": async (show)=>{
            startTransition({
                "ListDetailClient.useCallback[handleAddShow]": async ()=>{
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$da44cf__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addShowToList"])(list.id, show);
                    router.refresh();
                }
            }["ListDetailClient.useCallback[handleAddShow]"]);
        }
    }["ListDetailClient.useCallback[handleAddShow]"], [
        list.id,
        router,
        startTransition
    ]);
    const handleRemove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleRemove]": (itemId)=>{
            setItems({
                "ListDetailClient.useCallback[handleRemove]": (prev)=>prev.filter({
                        "ListDetailClient.useCallback[handleRemove]": (item)=>item.id !== itemId
                    }["ListDetailClient.useCallback[handleRemove]"])
            }["ListDetailClient.useCallback[handleRemove]"]);
            startTransition({
                "ListDetailClient.useCallback[handleRemove]": async ()=>{
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$d91a32__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["removeShowFromList"])(list.id, itemId);
                }
            }["ListDetailClient.useCallback[handleRemove]"]);
        }
    }["ListDetailClient.useCallback[handleRemove]"], [
        list.id,
        startTransition
    ]);
    const handleRatingChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleRatingChange]": (itemId, rating)=>{
            setItems({
                "ListDetailClient.useCallback[handleRatingChange]": (prev)=>prev.map({
                        "ListDetailClient.useCallback[handleRatingChange]": (item)=>item.id === itemId ? {
                                ...item,
                                rating
                            } : item
                    }["ListDetailClient.useCallback[handleRatingChange]"])
            }["ListDetailClient.useCallback[handleRatingChange]"]);
            startTransition({
                "ListDetailClient.useCallback[handleRatingChange]": async ()=>{
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$be9101__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateShowRating"])(list.id, itemId, rating);
                }
            }["ListDetailClient.useCallback[handleRatingChange]"]);
        }
    }["ListDetailClient.useCallback[handleRatingChange]"], [
        list.id,
        startTransition
    ]);
    const handleTagAdd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleTagAdd]": (showId, tagId)=>{
            setShowTagsMap({
                "ListDetailClient.useCallback[handleTagAdd]": (prev)=>({
                        ...prev,
                        [showId]: [
                            ...prev[showId] ?? [],
                            tagId
                        ]
                    })
            }["ListDetailClient.useCallback[handleTagAdd]"]);
            startTransition({
                "ListDetailClient.useCallback[handleTagAdd]": async ()=>{
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$982a09__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addTagToShow"])(showId, tagId);
                }
            }["ListDetailClient.useCallback[handleTagAdd]"]);
        }
    }["ListDetailClient.useCallback[handleTagAdd]"], [
        startTransition
    ]);
    const handleTagRemove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleTagRemove]": (showId, tagId)=>{
            setShowTagsMap({
                "ListDetailClient.useCallback[handleTagRemove]": (prev)=>({
                        ...prev,
                        [showId]: (prev[showId] ?? []).filter({
                            "ListDetailClient.useCallback[handleTagRemove]": (id)=>id !== tagId
                        }["ListDetailClient.useCallback[handleTagRemove]"])
                    })
            }["ListDetailClient.useCallback[handleTagRemove]"]);
            startTransition({
                "ListDetailClient.useCallback[handleTagRemove]": async ()=>{
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$38aa00__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["removeTagFromShow"])(showId, tagId);
                }
            }["ListDetailClient.useCallback[handleTagRemove]"]);
        }
    }["ListDetailClient.useCallback[handleTagRemove]"], [
        startTransition
    ]);
    const handleTagCreate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleTagCreate]": async (name, color)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$037f87__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["createTag"])(name, color);
        }
    }["ListDetailClient.useCallback[handleTagCreate]"], []);
    const handleNotesChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleNotesChange]": (itemId, notes)=>{
            setItems({
                "ListDetailClient.useCallback[handleNotesChange]": (prev)=>prev.map({
                        "ListDetailClient.useCallback[handleNotesChange]": (item)=>item.id === itemId ? {
                                ...item,
                                notes: notes.trim() || null
                            } : item
                    }["ListDetailClient.useCallback[handleNotesChange]"])
            }["ListDetailClient.useCallback[handleNotesChange]"]);
            startTransition({
                "ListDetailClient.useCallback[handleNotesChange]": async ()=>{
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$c58d8a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateShowNotes"])(list.id, itemId, notes);
                }
            }["ListDetailClient.useCallback[handleNotesChange]"]);
        }
    }["ListDetailClient.useCallback[handleNotesChange]"], [
        list.id,
        startTransition
    ]);
    // Quick-add a show to the viewer's own list
    const handleQuickAdd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleQuickAdd]": async (show)=>{
            const showKey = show.id;
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$78a2ae__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addShowToMyList"])({
                    id: show.id,
                    tmdb_id: show.tmdb_id,
                    imdb_id: show.imdb_id,
                    title: show.title,
                    poster_path: show.poster_path,
                    first_air_date: show.first_air_date,
                    overview: show.overview
                });
                if (result.alreadyExists) {
                    setQuickAddFeedback({
                        "ListDetailClient.useCallback[handleQuickAdd]": (prev)=>({
                                ...prev,
                                [showKey]: t("alreadyInList")
                            })
                    }["ListDetailClient.useCallback[handleQuickAdd]"]);
                } else {
                    setQuickAddFeedback({
                        "ListDetailClient.useCallback[handleQuickAdd]": (prev)=>({
                                ...prev,
                                [showKey]: t("addedToMyList")
                            })
                    }["ListDetailClient.useCallback[handleQuickAdd]"]);
                }
            } catch  {
                setQuickAddFeedback({
                    "ListDetailClient.useCallback[handleQuickAdd]": (prev)=>({
                            ...prev,
                            [showKey]: "Error"
                        })
                }["ListDetailClient.useCallback[handleQuickAdd]"]);
            }
            setTimeout({
                "ListDetailClient.useCallback[handleQuickAdd]": ()=>{
                    setQuickAddFeedback({
                        "ListDetailClient.useCallback[handleQuickAdd]": (prev)=>{
                            const next = {
                                ...prev
                            };
                            delete next[showKey];
                            return next;
                        }
                    }["ListDetailClient.useCallback[handleQuickAdd]"]);
                }
            }["ListDetailClient.useCallback[handleQuickAdd]"], 2000);
        }
    }["ListDetailClient.useCallback[handleQuickAdd]"], [
        t
    ]);
    // Copy entire list into viewer's own (empty) list
    const handleCopyList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleCopyList]": async ()=>{
            setIsCopying(true);
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$1653ce__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["copyListToMine"])(list.id);
                i18nRouter.push("/lists");
            } catch  {
                setIsCopying(false);
            }
        }
    }["ListDetailClient.useCallback[handleCopyList]"], [
        list.id,
        i18nRouter
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            !isOwner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>window.history.back(),
                className: "mb-4 inline-flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-text-secondary",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ArrowLeft$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowLeft"], {
                        size: 12
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 514,
                        columnNumber: 11
                    }, this),
                    tCommon("back")
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 510,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$ListHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListHeader"], {
                                description: listDescription,
                                isPublic: list.is_public,
                                onDescriptionChange: isOwner ? handleDescriptionChange : undefined,
                                onTogglePublic: isOwner ? handleTogglePublic : undefined,
                                readOnly: !isOwner,
                                saveStatus: isOwner ? saveStatus : undefined
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 523,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex shrink-0 items-center gap-2 mt-0.5",
                                children: [
                                    isOwner && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                        href: "/lists/analytics",
                                        className: "flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ChartPie$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartPie"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 538,
                                                columnNumber: 17
                                            }, this),
                                            t("analytics")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 534,
                                        columnNumber: 15
                                    }, this),
                                    isOwner && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAddDialog(true),
                                        className: "hidden items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-accent-hover sm:flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 548,
                                                columnNumber: 17
                                            }, this),
                                            "Add show"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 544,
                                        columnNumber: 15
                                    }, this),
                                    isOwner && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowImport(true),
                                        className: "hidden items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary sm:flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileArrowUp$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileArrowUp"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 557,
                                                columnNumber: 17
                                            }, this),
                                            t("importExternal")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 553,
                                        columnNumber: 15
                                    }, this),
                                    !isOwner && isLoggedIn && viewerListEmpty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCopyList,
                                        disabled: isCopying,
                                        className: "flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary disabled:opacity-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$CopySimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopySimple"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 567,
                                                columnNumber: 17
                                            }, this),
                                            isCopying ? t("copying") : t("copyList")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 562,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 531,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 522,
                        columnNumber: 9
                    }, this),
                    isOwner && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex items-center gap-2 sm:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowAddDialog(true),
                                className: "flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-accent-hover",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 581,
                                        columnNumber: 15
                                    }, this),
                                    "Add show"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 577,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowImport(true),
                                className: "flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileArrowUp$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileArrowUp"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 588,
                                        columnNumber: 15
                                    }, this),
                                    t("importExternal")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 584,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 576,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 520,
                columnNumber: 7
            }, this),
            items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                placeholder: t("searchPlaceholder"),
                                className: "w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-text-faint focus:border-border-hover focus:outline-none transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 599,
                                columnNumber: 13
                            }, this),
                            searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSearchQuery(""),
                                className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-secondary transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                    lineNumber: 611,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 607,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 598,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowFilters((v)=>!v),
                        className: `flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-2 text-xs transition-colors ${showFilters || activeFilterCount > 0 ? "border-border-hover text-text-primary" : "border-border text-text-muted hover:border-border-hover hover:text-text-secondary"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FunnelSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelSimple"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 623,
                                columnNumber: 13
                            }, this),
                            "Filters",
                            activeFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-4 w-4 items-center justify-center rounded-full bg-surface-hover font-mono text-[10px] font-semibold text-text-primary",
                                children: activeFilterCount
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 626,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 615,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 597,
                columnNumber: 9
            }, this),
            showFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 rounded-md border border-border bg-surface-subtle p-3 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint",
                                children: "Rating"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 639,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1.5",
                                children: [
                                    allRatings.map((rating)=>{
                                        const active = filterRatings.has(rating);
                                        const label = rating !== null ? `${rating} · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(rating, ratingLabels)}` : "Unrated";
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setFilterRatings((prev)=>{
                                                    const next = new Set(prev);
                                                    if (active) next.delete(rating);
                                                    else next.add(rating);
                                                    return next;
                                                }),
                                            className: `flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-xs font-medium transition-colors ${active ? "border-border-hover bg-surface-hover text-text-primary" : "border-border text-text-muted hover:border-border-hover hover:text-text-secondary"}`,
                                            children: [
                                                label,
                                                active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                                                    size: 10,
                                                    weight: "bold"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                    lineNumber: 667,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, rating ?? "unrated", true, {
                                            fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                            lineNumber: 650,
                                            columnNumber: 19
                                        }, this);
                                    }),
                                    filterRatings.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilterRatings(new Set()),
                                        className: "text-xs text-text-muted transition-colors hover:text-text-secondary",
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 672,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 642,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 638,
                        columnNumber: 11
                    }, this),
                    allTags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint",
                                children: "Tags"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 685,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1.5",
                                children: [
                                    allTags.map((tag)=>{
                                        const active = filterTagIds.includes(tag.id);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setFilterTagIds((prev)=>active ? prev.filter((id)=>id !== tag.id) : [
                                                        ...prev,
                                                        tag.id
                                                    ]),
                                            className: "flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition-opacity",
                                            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tagBadgeStyle"])(tag.color),
                                            children: [
                                                tag.name,
                                                active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                                                    size: 10,
                                                    weight: "bold"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                    lineNumber: 705,
                                                    columnNumber: 34
                                                }, this)
                                            ]
                                        }, tag.id, true, {
                                            fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                            lineNumber: 692,
                                            columnNumber: 21
                                        }, this);
                                    }),
                                    filterTagIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilterTagIds([]),
                                        className: "text-xs text-text-muted transition-colors hover:text-text-secondary",
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 710,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 688,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 684,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 636,
                columnNumber: 9
            }, this),
            items.length === 0 ? isOwner ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$OnboardingEmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnboardingEmptyState"], {
                onAddShow: ()=>setShowAddDialog(true),
                onImport: ()=>setShowImport(true)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 726,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                title: "No shows in this list yet"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 731,
                columnNumber: 11
            }, this) : filteredItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                title: searchQuery ? t("noSearchResults") : t("noFilterResults"),
                description: searchQuery ? t("noSearchResultsHint") : t("noFilterResultsHint")
            }, void 0, false, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 734,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
                id: "list-dnd-context",
                sensors: sensors,
                collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closestCenter"],
                onDragEnd: handleDragEnd,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableContext"], {
                    items: sortedIds,
                    strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `space-y-6 ${isPending ? "opacity-70" : ""}`,
                        children: ratingGroups.map((group)=>{
                            const tierLabel = group.rating !== null ? `${group.rating} · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(group.rating, ratingLabels)}` : "Unrated";
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "whitespace-nowrap font-mono text-xs font-semibold tracking-widest text-text-faint uppercase",
                                                children: tierLabel
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 761,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-px flex-1 bg-border"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 764,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 760,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: group.items.map((item)=>{
                                            const globalIndex = sortedIds.indexOf(item.id);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShowRowObserver, {
                                                tmdbFetched: item.shows.tmdb_fetched,
                                                onVisible: ()=>handleShowInView(item.shows.id),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$ShowRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShowRow"], {
                                                        id: item.id,
                                                        title: item.shows.title,
                                                        posterPath: item.shows.poster_path,
                                                        rating: item.rating,
                                                        position: globalIndex + 1,
                                                        showId: item.shows.id,
                                                        ratingLabels: ratingLabels,
                                                        onRatingChange: isOwner ? (rating)=>handleRatingChange(item.id, rating) : undefined,
                                                        onRemove: isOwner ? ()=>handleRemove(item.id) : undefined,
                                                        readOnly: !isOwner,
                                                        allTags: allTags.length > 0 ? allTags : undefined,
                                                        selectedTagIds: showTagsMap[item.shows.id] ?? [],
                                                        onTagAdd: isOwner ? (tagId)=>handleTagAdd(item.shows.id, tagId) : undefined,
                                                        onTagRemove: isOwner ? (tagId)=>handleTagRemove(item.shows.id, tagId) : undefined,
                                                        onTagCreate: isOwner ? handleTagCreate : undefined,
                                                        onQuickAdd: !isOwner && isLoggedIn ? ()=>handleQuickAdd(item.shows) : undefined,
                                                        quickAddLabel: t("addToMyList"),
                                                        notes: item.notes,
                                                        onNotesChange: isOwner ? (notes)=>handleNotesChange(item.id, notes) : undefined,
                                                        openMobileRating: isOwner ? openRatingItemId === item.id : undefined,
                                                        onMobileRatingChange: isOwner ? (open)=>setOpenRatingItemId(open ? item.id : null) : undefined
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                        lineNumber: 776,
                                                        columnNumber: 29
                                                    }, this),
                                                    quickAddFeedback[item.shows.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 text-xs text-accent animate-in fade-in",
                                                        children: quickAddFeedback[item.shows.id]
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                        lineNumber: 841,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 771,
                                                columnNumber: 27
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 767,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, group.rating ?? "unrated", true, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 758,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 751,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                    lineNumber: 747,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 741,
                columnNumber: 9
            }, this),
            items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: sentinelRef,
                className: "mt-4 flex justify-center py-4",
                children: loadingMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs text-text-faint",
                    children: "Loading more…"
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                    lineNumber: 861,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 859,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$AddShowDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddShowDialog"], {
                open: showAddDialog,
                onClose: ()=>setShowAddDialog(false),
                onAdd: handleAddShow,
                existingTmdbIds: existingTmdbIds,
                scoreMap: recScoreMap
            }, void 0, false, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 867,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$ImportDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImportDialog"], {
                open: showImport,
                onClose: ()=>setShowImport(false),
                onImport: async (data)=>{
                    const { importToMyList } = await __turbopack_context__.A("[project]/packages/web/src/app/[locale]/(app)/lists/actions.ts [app-client] (ecmascript, async loader)");
                    await importToMyList(data);
                    router.refresh();
                }
            }, void 0, false, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 876,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
        lineNumber: 507,
        columnNumber: 5
    }, this);
}
_s1(ListDetailClient, "AvAjRxzfylbIf2RTbzayDyvQdDY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"]
    ];
});
_c1 = ListDetailClient;
var _c, _c1;
__turbopack_context__.k.register(_c, "ShowRowObserver");
__turbopack_context__.k.register(_c1, "ListDetailClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=packages_3cf7e6a6._.js.map