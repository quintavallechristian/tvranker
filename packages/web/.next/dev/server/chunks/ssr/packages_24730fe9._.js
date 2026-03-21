module.exports = [
"[project]/packages/shared/src/lib/similarity.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/packages/shared/src/lib/recommendations.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scoreRecommendations",
    ()=>scoreRecommendations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/similarity.ts [app-rsc] (ecmascript)");
;
function scoreRecommendations(viewerList, otherLists, topK = 20, limit = 10) {
    if (viewerList.length === 0 || otherLists.length === 0) return [];
    const similarities = [];
    for (const other of otherLists){
        if (other.items.length === 0) continue;
        const sim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["computeListSimilarity"])(viewerList, other.items);
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
}),
"[project]/packages/shared/src/lib/rating-labels.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/packages/shared/src/lib/tag-colors.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/packages/shared/src/lib/tmdb/types.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/packages/shared/src/lib/import/trakt-parser.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseTraktJson",
    ()=>parseTraktJson,
    "validateTraktJson",
    ()=>validateTraktJson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/index.js [app-rsc] (ecmascript)");
;
// Format A: Trakt.tv list export { name, shows: [...] }
const TraktShowSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
        imdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional(),
        tvdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].number().optional()
    }).optional(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string(),
    uuid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional(),
    added_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional(),
    score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].number().optional()
});
const TraktListSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().default(""),
    is_public: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].boolean().optional().default(false),
    movies: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].unknown()).optional().default([]),
    shows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(TraktShowSchema)
});
// Format B: raw array of show objects (e.g. Serializd export)
// [ { uuid, id: { tvdb, imdb }, title, seasons, created_at, status } ]
const SerializdShowSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    uuid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional(),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
        tvdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].number().optional(),
        imdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional()
    }).optional(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string(),
    seasons: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].unknown()).optional(),
    created_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional(),
    score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].number().optional()
});
const SerializdArraySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(SerializdShowSchema);
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
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].prettifyError(result.error)
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
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].prettifyError(result.error)
    };
}
}),
"[project]/packages/shared/src/lib/import/mal-parser.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/packages/shared/src/index.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Similarity & recommendations
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/similarity.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/recommendations.ts [app-rsc] (ecmascript)");
// Rating labels
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/rating-labels.ts [app-rsc] (ecmascript)");
// Tag colors
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tag-colors.ts [app-rsc] (ecmascript)");
// TMDB types & utilities
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tmdb/types.ts [app-rsc] (ecmascript)");
// Import parsers
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$import$2f$trakt$2d$parser$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/import/trakt-parser.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$import$2f$mal$2d$parser$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/import/mal-parser.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/packages/web/src/lib/recommendations.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Re-export from shared package
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-rsc] (ecmascript) <locals>");
;
}),
"[project]/packages/web/src/lib/similarity.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Re-export from shared package
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-rsc] (ecmascript) <locals>");
;
}),
"[project]/packages/web/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002a8f726f568507c58a270619d7a92c63dbe4a5c5":"getPopularShows","003a99768e3bd3da8b89cf7eeaac78a68557a6e86a":"getSimilarUsers","00ee312aa591ad510b9799fe4b8dccd9043bbef937":"getRecommendations"},"",""] */ __turbopack_context__.s([
    "getPopularShows",
    ()=>getPopularShows,
    "getRecommendations",
    ()=>getRecommendations,
    "getSimilarUsers",
    ()=>getSimilarUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/recommendations.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/recommendations.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/similarity.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/similarity.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getSimilarUsers() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
        const similarity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["computeListSimilarity"])(viewerList, otherItems);
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const scored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["scoreRecommendations"])(viewerList, otherLists);
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSimilarUsers, "003a99768e3bd3da8b89cf7eeaac78a68557a6e86a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecommendations, "00ee312aa591ad510b9799fe4b8dccd9043bbef937", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPopularShows, "002a8f726f568507c58a270619d7a92c63dbe4a5c5", null);
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"401cb9e19f15860a15e63380eccffb11c40f8c75a0":"addShowToMyList","403cc78e43a405d9fa042d811cb811803a0831973b":"importToMyList","40cfadb10f9d88eaf6eeac96885eeb3564c8662dbc":"addTmdbShowToMyList","40d4944a60783ffec258c5854d574614e2eeb74a3d":"copyListToMine","40e68ea9272a180d82ad0af004ca9814c7a0ed6cd5":"getListAnalytics","604f55753ca5e8115e6cccefdb137079597abee97d":"updateList","605feabbe451922a81bc560a82cc2571d393467c5e":"removeShowFromList","606f806e5adccbf0d63647ccf6da05daa7b62c2fbd":"reorderListItems","60e0c2656cc2bb318e9a7e139766786fbbcea34582":"addShowToList","7069107f9589fee67eb99e3abf54c5c59a5857e72f":"getListItemsPage","70816a23f7c82d36f97f7366127cb907c61cf73044":"updateShowNotes","70f013807d01f785d2640b0cc5f4f0a37b2ea06ff2":"updateShowRating"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("lists").update(updates).eq("id", listId).eq("user_id", user.id);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/lists");
}
async function addShowToList(listId, show) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("list_items").delete().eq("id", itemId);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/lists/${listId}`);
}
async function updateShowRating(listId, itemId, rating) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("list_items").update({
        notes: notes.trim() || null
    }).eq("id", itemId);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/lists/${listId}`);
}
async function reorderListItems(listId, itemIds) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const myList = await getUserList(supabase, user.id);
    if (!myList) throw new Error("List not found");
    const { parseTraktJson } = await __turbopack_context__.A("[project]/packages/web/src/lib/import/trakt-parser.ts [app-rsc] (ecmascript, async loader)");
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateList, "604f55753ca5e8115e6cccefdb137079597abee97d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addShowToList, "60e0c2656cc2bb318e9a7e139766786fbbcea34582", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeShowFromList, "605feabbe451922a81bc560a82cc2571d393467c5e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateShowRating, "70f013807d01f785d2640b0cc5f4f0a37b2ea06ff2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateShowNotes, "70816a23f7c82d36f97f7366127cb907c61cf73044", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(reorderListItems, "606f806e5adccbf0d63647ccf6da05daa7b62c2fbd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(importToMyList, "403cc78e43a405d9fa042d811cb811803a0831973b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getListAnalytics, "40e68ea9272a180d82ad0af004ca9814c7a0ed6cd5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getListItemsPage, "7069107f9589fee67eb99e3abf54c5c59a5857e72f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addShowToMyList, "401cb9e19f15860a15e63380eccffb11c40f8c75a0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addTmdbShowToMyList, "40cfadb10f9d88eaf6eeac96885eeb3564c8662dbc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(copyListToMine, "40d4944a60783ffec258c5854d574614e2eeb74a3d", null);
}),
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
"[project]/packages/web/.next-internal/server/app/[locale]/(app)/explore/page/actions.js { ACTIONS_MODULE0 => \"[project]/packages/web/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/packages/web/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/packages/web/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/packages/web/.next-internal/server/app/[locale]/(app)/explore/page/actions.js { ACTIONS_MODULE0 => \"[project]/packages/web/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/packages/web/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/packages/web/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "002a8f726f568507c58a270619d7a92c63dbe4a5c5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPopularShows"],
    "003a99768e3bd3da8b89cf7eeaac78a68557a6e86a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSimilarUsers"],
    "00ee312aa591ad510b9799fe4b8dccd9043bbef937",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecommendations"],
    "400bd16a58a58e16e8e184740c50ca3cbcc7d9fa04",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unfollowUser"],
    "401cb9e19f15860a15e63380eccffb11c40f8c75a0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addShowToMyList"],
    "40cfadb10f9d88eaf6eeac96885eeb3564c8662dbc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addTmdbShowToMyList"],
    "40ed3c806216f68c6815da405ef9973cbb9d521785",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["followUser"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/packages/web/.next-internal/server/app/[locale]/(app)/explore/page/actions.js { ACTIONS_MODULE0 => "[project]/packages/web/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/packages/web/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/packages/web/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/explore/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/follows/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=packages_24730fe9._.js.map