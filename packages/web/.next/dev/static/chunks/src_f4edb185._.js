(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/tag-colors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TAG_COLORS",
    ()=>TAG_COLORS,
    "TAG_COLOR_HEX",
    ()=>TAG_COLOR_HEX,
    "TAG_COLOR_LABEL",
    ()=>TAG_COLOR_LABEL,
    "tagBadgeStyle",
    ()=>tagBadgeStyle,
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
function tagBadgeStyle(color) {
    const hex = TAG_COLOR_HEX[color] ?? TAG_COLOR_HEX.slate;
    return {
        backgroundColor: `${hex}18`,
        borderColor: `${hex}50`,
        color: hex
    };
}
function tagDotColor(color) {
    return TAG_COLOR_HEX[color] ?? TAG_COLOR_HEX.slate;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ListHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
                        fileName: "[project]/src/components/ListHeader.tsx",
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
                                    fileName: "[project]/src/components/ListHeader.tsx",
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
                                    fileName: "[project]/src/components/ListHeader.tsx",
                                    lineNumber: 49,
                                    columnNumber: 17
                                }, this),
                                " ",
                                t("private")
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ListHeader.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `flex items-center gap-1.5 text-xs ${isPublic ? "text-accent" : "text-text-muted"}`,
                        children: [
                            isPublic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Globe$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Globe"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/src/components/ListHeader.tsx",
                                lineNumber: 59,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$LockSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LockSimple"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/src/components/ListHeader.tsx",
                                lineNumber: 59,
                                columnNumber: 47
                            }, this),
                            isPublic ? t("public") : t("private")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ListHeader.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    saveStatus && saveStatus !== "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `ml-1 text-xs transition-opacity ${saveStatus === "saving" ? "text-text-faint" : "text-text-muted"}`,
                        children: saveStatus === "saving" ? "Saving…" : "Saved"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ListHeader.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ListHeader.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            readOnly ? description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-text-secondary",
                children: description
            }, void 0, false, {
                fileName: "[project]/src/components/ListHeader.tsx",
                lineNumber: 78,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: description || "",
                onChange: (e)=>onDescriptionChange?.(e.target.value),
                className: "w-full bg-transparent text-sm text-text-secondary outline-none placeholder:text-text-faint",
                placeholder: "Add a description..."
            }, void 0, false, {
                fileName: "[project]/src/components/ListHeader.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ListHeader.tsx",
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
"[project]/src/lib/tmdb/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractTrailerUrl",
    ()=>extractTrailerUrl,
    "findByImdbId",
    ()=>findByImdbId,
    "getMovieDetails",
    ()=>getMovieDetails,
    "getPosterUrl",
    ()=>getPosterUrl,
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
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
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
function extractTrailerUrl(videos) {
    if (!videos?.results?.length) return null;
    // Prefer official YouTube trailers, then teasers
    const yt = videos.results.filter((v)=>v.site === "YouTube");
    const trailer = yt.find((v)=>v.type === "Trailer" && v.official) ?? yt.find((v)=>v.type === "Trailer") ?? yt.find((v)=>v.type === "Teaser");
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
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
function getPosterUrl(posterPath, size = "w342") {
    if (!posterPath) return null;
    return `${TMDB_IMAGE_BASE}/${size}${posterPath}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/rating-labels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/components/ShowCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tmdb/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Television.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rating-labels.ts [app-client] (ecmascript)");
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
    const posterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPosterUrl"])(posterPath, compact ? "w185" : "w342");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-surface transition-colors hover:border-border-hover",
        children: [
            position !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] bg-bg-primary/80 text-xs font-mono font-bold text-text-primary tabular-nums backdrop-blur-sm",
                children: position
            }, void 0, false, {
                fileName: "[project]/src/components/ShowCard.tsx",
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
                        fileName: "[project]/src/components/ShowCard.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                            size: 32,
                            className: "text-text-faint"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ShowCard.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowCard.tsx",
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
                            fileName: "[project]/src/components/ShowCard.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowCard.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ShowCard.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3",
                children: [
                    showId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                        href: `/shows/${showId}`,
                        className: "truncate text-sm font-medium text-text-primary hover:text-accent transition-colors block",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowCard.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "truncate text-sm font-medium text-text-primary",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowCard.tsx",
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
                        fileName: "[project]/src/components/ShowCard.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ShowCard.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ShowCard.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = ShowCard;
function RatingBar({ value, onChange, className = "", labels, fullWidth = false }) {
    _s();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const active = hovered ?? value;
    const label = active ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(active, labels) : null;
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
                fileName: "[project]/src/components/ShowCard.tsx",
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
                        fileName: "[project]/src/components/ShowCard.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ShowCard.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ShowCard.tsx",
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
"[project]/src/components/TagPicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tag-colors.ts [app-client] (ecmascript)");
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
                    style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagBadgeStyle"])(tag.color),
                    className: "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                            style: {
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagDotColor"])(tag.color)
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/TagPicker.tsx",
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
                                fileName: "[project]/src/components/TagPicker.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/TagPicker.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    ]
                }, tag.id, true, {
                    fileName: "[project]/src/components/TagPicker.tsx",
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
                        fileName: "[project]/src/components/TagPicker.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                        size: 8,
                        weight: "bold"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TagPicker.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TagPicker.tsx",
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
                                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagDotColor"])(tag.color)
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TagPicker.tsx",
                                        lineNumber: 132,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1 truncate text-text-secondary",
                                        children: tag.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TagPicker.tsx",
                                        lineNumber: 136,
                                        columnNumber: 19
                                    }, this),
                                    selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Check$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Check"], {
                                        size: 12,
                                        weight: "bold",
                                        style: {
                                            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagDotColor"])(tag.color)
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TagPicker.tsx",
                                        lineNumber: 140,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, tag.id, true, {
                                fileName: "[project]/src/components/TagPicker.tsx",
                                lineNumber: 127,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/TagPicker.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 border-t border-border p-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1.5",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAG_COLORS"].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAG_COLOR_LABEL"][c],
                                        onClick: ()=>setNewTagColor(c),
                                        className: "h-4 w-4 rounded-full transition-transform hover:scale-110",
                                        style: {
                                            backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAG_COLOR_HEX"][c],
                                            outline: newTagColor === c ? `2px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAG_COLOR_HEX"][c]}` : "none",
                                            outlineOffset: "2px"
                                        }
                                    }, c, false, {
                                        fileName: "[project]/src/components/TagPicker.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/TagPicker.tsx",
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
                                        fileName: "[project]/src/components/TagPicker.tsx",
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
                                            fileName: "[project]/src/components/TagPicker.tsx",
                                            lineNumber: 187,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TagPicker.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TagPicker.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TagPicker.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TagPicker.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TagPicker.tsx",
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
"[project]/src/components/ShowRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShowRow",
    ()=>ShowRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tmdb/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$DotsSixVertical$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/DotsSixVertical.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Trash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Trash.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Television.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$PlusCircle$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/PlusCircle.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$NotePencil$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/NotePencil.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ShowCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ShowCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rating-labels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TagPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TagPicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tag-colors.ts [app-client] (ecmascript)");
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
function ShowRow({ id, title, posterPath, rating, position, onRatingChange, onRemove, readOnly = false, showId, ratingLabels, allTags, selectedTagIds, onTagAdd, onTagRemove, onTagCreate, onQuickAdd, quickAddLabel, notes, onNotesChange }) {
    _s();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])({
        id,
        disabled: readOnly
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition
    };
    const [mobileRatingOpen, setMobileRatingOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
    const posterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPosterUrl"])(posterPath, "w92");
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
                            fileName: "[project]/src/components/ShowRow.tsx",
                            lineNumber: 121,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-5 md:w-6 text-center font-mono text-xs font-bold text-text-muted tabular-nums",
                        children: position
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 126,
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
                            fileName: "[project]/src/components/ShowRow.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-full items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                                size: 14,
                                className: "text-text-faint"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ShowRow.tsx",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ShowRow.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            showId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                href: `/shows/${showId}`,
                                className: "block truncate text-sm font-medium text-text-primary hover:text-accent transition-colors",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ShowRow.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block truncate text-sm font-medium text-text-primary",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ShowRow.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this),
                            selectedTagIds && selectedTagIds.length > 0 && allTags && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:hidden mt-1 flex items-center gap-1",
                                children: allTags.filter((t)=>selectedTagIds.includes(t.id)).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block h-2 w-2 shrink-0 rounded-full",
                                        style: {
                                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagDotColor"])(tag.color)
                                        },
                                        title: tag.name
                                    }, tag.id, false, {
                                        fileName: "[project]/src/components/ShowRow.tsx",
                                        lineNumber: 168,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ShowRow.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:block",
                                children: allTags && onTagAdd && onTagRemove && onTagCreate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TagPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TagPicker"], {
                                        showId: showId ?? id,
                                        allTags: allTags,
                                        selectedTagIds: selectedTagIds ?? [],
                                        onAdd: onTagAdd,
                                        onRemove: onTagRemove,
                                        onCreateTag: onTagCreate
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ShowRow.tsx",
                                        lineNumber: 182,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ShowRow.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this) : selectedTagIds && selectedTagIds.length > 0 && allTags ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 flex flex-wrap gap-1",
                                    children: allTags.filter((t)=>selectedTagIds.includes(t.id)).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagBadgeStyle"])(tag.color),
                                            className: "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                                                    style: {
                                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagDotColor"])(tag.color)
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ShowRow.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 23
                                                }, this),
                                                tag.name
                                            ]
                                        }, tag.id, true, {
                                            fileName: "[project]/src/components/ShowRow.tsx",
                                            lineNumber: 196,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ShowRow.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this) : null
                            }, void 0, false, {
                                fileName: "[project]/src/components/ShowRow.tsx",
                                lineNumber: 179,
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
                                    fileName: "[project]/src/components/ShowRow.tsx",
                                    lineNumber: 216,
                                    columnNumber: 17
                                }, this) : localNote.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onNotesChange ? ()=>setEditingNote(true) : undefined,
                                    className: `flex items-start gap-1 text-left text-xs text-text-muted leading-relaxed line-clamp-2 ${onNotesChange ? "hover:text-text-secondary cursor-text transition-colors" : "cursor-default"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$NotePencil$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotePencil"], {
                                            size: 11,
                                            className: "mt-0.5 shrink-0 text-text-faint"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ShowRow.tsx",
                                            lineNumber: 239,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: localNote
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ShowRow.tsx",
                                            lineNumber: 243,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ShowRow.tsx",
                                    lineNumber: 229,
                                    columnNumber: 17
                                }, this) : onNotesChange ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setEditingNote(true),
                                    className: "flex items-center gap-1 text-xs text-text-faint transition-opacity hover:text-text-muted sm:opacity-0 sm:group-hover:opacity-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$NotePencil$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotePencil"], {
                                            size: 11
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ShowRow.tsx",
                                            lineNumber: 250,
                                            columnNumber: 19
                                        }, this),
                                        "Aggiungi una nota..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ShowRow.tsx",
                                    lineNumber: 246,
                                    columnNumber: 17
                                }, this) : null
                            }, void 0, false, {
                                fileName: "[project]/src/components/ShowRow.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center gap-2 shrink-0",
                        children: onRatingChange ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ShowCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RatingBar"], {
                            value: rating,
                            onChange: onRatingChange,
                            labels: ratingLabels
                        }, void 0, false, {
                            fileName: "[project]/src/components/ShowRow.tsx",
                            lineNumber: 261,
                            columnNumber: 13
                        }, this) : rating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "whitespace-nowrap font-mono text-xs tabular-nums text-accent",
                            children: [
                                rating,
                                " · ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(rating, ratingLabels)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ShowRow.tsx",
                            lineNumber: 267,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-text-faint",
                            children: "—"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ShowRow.tsx",
                            lineNumber: 271,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 259,
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
                            fileName: "[project]/src/components/ShowRow.tsx",
                            lineNumber: 283,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, this),
                    onRemove && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onRemove,
                        className: "rounded-[var(--radius-sm)] p-1.5 text-text-faint transition-colors hover:bg-error/10 hover:text-error",
                        "aria-label": "Remove from list",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Trash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trash"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/ShowRow.tsx",
                            lineNumber: 294,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 289,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ShowRow.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden mt-2 pl-7",
                children: onRatingChange ? mobileRatingOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ShowCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RatingBar"], {
                    value: rating,
                    onChange: (n)=>{
                        onRatingChange(n);
                        setMobileRatingOpen(false);
                    },
                    labels: ratingLabels,
                    fullWidth: true
                }, void 0, false, {
                    fileName: "[project]/src/components/ShowRow.tsx",
                    lineNumber: 303,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setMobileRatingOpen(true),
                    className: "font-mono text-xs tabular-nums",
                    children: rating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-accent",
                        children: [
                            rating,
                            " · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(rating, ratingLabels)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 318,
                        columnNumber: 17
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-text-faint",
                        children: "—"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 322,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ShowRow.tsx",
                    lineNumber: 313,
                    columnNumber: 13
                }, this) : rating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono text-xs tabular-nums text-accent",
                    children: [
                        rating,
                        "/10 · ",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(rating, ratingLabels)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ShowRow.tsx",
                    lineNumber: 327,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs text-text-faint",
                    children: "—"
                }, void 0, false, {
                    fileName: "[project]/src/components/ShowRow.tsx",
                    lineNumber: 331,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ShowRow.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ShowRow.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(ShowRow, "75Ghz4PCtz1Co9eTQxvozHhmIZY=", false, function() {
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
"[project]/src/components/SearchInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
                fileName: "[project]/src/components/SearchInput.tsx",
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
                fileName: "[project]/src/components/SearchInput.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SearchInput.tsx",
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
"[project]/src/components/AddShowDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddShowDialog",
    ()=>AddShowDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tmdb/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SearchInput.tsx [app-client] (ecmascript)");
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
            className: "relative w-full sm:mx-4 sm:max-w-lg rounded-t-[16px] sm:rounded-[var(--radius-lg)] border border-border bg-bg-surface max-h-[85vh] sm:max-h-none flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-border p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-sm font-semibold text-text-primary",
                            children: t("addShow")
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddShowDialog.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-text-muted hover:text-text-primary",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/components/AddShowDialog.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddShowDialog.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddShowDialog.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchInput"], {
                        placeholder: t("searchShows"),
                        onSearch: handleSearch,
                        debounceMs: 400
                    }, void 0, false, {
                        fileName: "[project]/src/components/AddShowDialog.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/AddShowDialog.tsx",
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
                                fileName: "[project]/src/components/AddShowDialog.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddShowDialog.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this),
                        !loading && results.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-8 text-center text-sm text-text-muted",
                            children: t("searchShows")
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddShowDialog.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        !loading && results.map((show)=>{
                            const isAdded = existingTmdbIds.includes(show.tmdb_id);
                            const posterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPosterUrl"])(show.poster_path, "w92");
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
                                            fileName: "[project]/src/components/AddShowDialog.tsx",
                                            lineNumber: 109,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                                                size: 14,
                                                className: "text-text-faint"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AddShowDialog.tsx",
                                                lineNumber: 118,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddShowDialog.tsx",
                                            lineNumber: 117,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddShowDialog.tsx",
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
                                                fileName: "[project]/src/components/AddShowDialog.tsx",
                                                lineNumber: 124,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-text-muted",
                                                children: show.first_air_date?.slice(0, 4) || "Unknown"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AddShowDialog.tsx",
                                                lineNumber: 127,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AddShowDialog.tsx",
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
                                        fileName: "[project]/src/components/AddShowDialog.tsx",
                                        lineNumber: 133,
                                        columnNumber: 21
                                    }, this),
                                    isAdded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-text-muted",
                                        children: "Added"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddShowDialog.tsx",
                                        lineNumber: 139,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                                        size: 16,
                                        className: "shrink-0 text-accent"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddShowDialog.tsx",
                                        lineNumber: 141,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, show.tmdb_id, true, {
                                fileName: "[project]/src/components/AddShowDialog.tsx",
                                lineNumber: 101,
                                columnNumber: 17
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddShowDialog.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AddShowDialog.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AddShowDialog.tsx",
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
"[project]/src/components/EmptyState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
                    fileName: "[project]/src/components/EmptyState.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/EmptyState.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-medium text-text-secondary",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/EmptyState.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-xs text-text-muted",
                children: description
            }, void 0, false, {
                fileName: "[project]/src/components/EmptyState.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: action
            }, void 0, false, {
                fileName: "[project]/src/components/EmptyState.tsx",
                lineNumber: 19,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/EmptyState.tsx",
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
"[project]/src/components/ImportDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
                setPreview({
                    name: isFormatA ? json.name || selectedFile.name : selectedFile.name,
                    showCount: isFormatA ? json.shows.length : json.length
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
                const { parseMalXml } = await __turbopack_context__.A("[project]/src/lib/import/mal-parser.ts [app-client] (ecmascript, async loader)");
                const parsed = parseMalXml(text);
                setFile(selectedFile);
                setPreview({
                    name: selectedFile.name,
                    showCount: parsed.shows.length
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
                const { parseMalXml } = await __turbopack_context__.A("[project]/src/lib/import/mal-parser.ts [app-client] (ecmascript, async loader)");
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
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ImportDialog.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-1 text-lg font-semibold text-text-primary",
                        children: t("title")
                    }, void 0, false, {
                        fileName: "[project]/src/components/ImportDialog.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-6 text-sm text-text-secondary",
                        children: t("chooseService")
                    }, void 0, false, {
                        fileName: "[project]/src/components/ImportDialog.tsx",
                        lineNumber: 155,
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
                                            fileName: "[project]/src/components/ImportDialog.tsx",
                                            lineNumber: 165,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ImportDialog.tsx",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-text-primary",
                                                children: "TV Time"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ImportDialog.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-text-secondary",
                                                children: t("tvtimeDesc")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ImportDialog.tsx",
                                                lineNumber: 169,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ImportDialog.tsx",
                                        lineNumber: 167,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ImportDialog.tsx",
                                lineNumber: 160,
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
                                            fileName: "[project]/src/components/ImportDialog.tsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ImportDialog.tsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-text-primary",
                                                children: "MyAnimeList"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ImportDialog.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-text-secondary",
                                                children: t("malDesc")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ImportDialog.tsx",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ImportDialog.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ImportDialog.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ImportDialog.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ImportDialog.tsx",
                lineNumber: 144,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ImportDialog.tsx",
            lineNumber: 143,
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
                        fileName: "[project]/src/components/ImportDialog.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleClose,
                    className: "absolute right-4 top-4 text-text-muted hover:text-text-primary",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/src/components/ImportDialog.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "mb-1 text-lg font-semibold text-text-primary",
                    children: isMal ? t("malTitle") : t("tvtimeTitle")
                }, void 0, false, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-6 text-sm text-text-secondary",
                    children: isMal ? t("malDescription") : t("tvtimeDescription")
                }, void 0, false, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 220,
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
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-text-secondary",
                            children: isMal ? t("selectFileXml") : t("selectFileJson")
                        }, void 0, false, {
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 230,
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
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 225,
                    columnNumber: 9
                }, this),
                preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex items-center gap-3 rounded-md border border-border bg-bg-elevated p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileText$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileText"], {
                            size: 20,
                            className: "text-accent"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 248,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-text-primary",
                                    children: preview.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ImportDialog.tsx",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-text-secondary",
                                    children: [
                                        preview.showCount,
                                        " shows"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ImportDialog.tsx",
                                    lineNumber: 253,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 249,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 247,
                    columnNumber: 11
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-3 text-xs text-error",
                    role: "alert",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 262,
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
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 269,
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
                                    fileName: "[project]/src/components/ImportDialog.tsx",
                                    lineNumber: 280,
                                    columnNumber: 25
                                }, this),
                                loading ? t("importing") : `Import ${preview?.showCount ?? 0} shows`
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 275,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ImportDialog.tsx",
            lineNumber: 200,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ImportDialog.tsx",
        lineNumber: 199,
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
"[project]/src/app/[locale]/(app)/rankings/data:49f7c5 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTopRatedShows",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"009a2c5c52cffcc121bfd71aec94ea2dda7ec16106":"getTopRatedShows"},"src/app/[locale]/(app)/rankings/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("009a2c5c52cffcc121bfd71aec94ea2dda7ec16106", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getTopRatedShows");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuXG5leHBvcnQgdHlwZSBUb3BSYXRlZFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIGF2Z19yYXRpbmc6IG51bWJlcjtcbiAgdm90ZV9jb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRvcFJhdGVkU2hvd3MoKTogUHJvbWlzZTxUb3BSYXRlZFNob3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuXG4gIC8vIEdldCBhbGwgcHVibGljIGxpc3QgSURzXG4gIGNvbnN0IHsgZGF0YTogcHVibGljTGlzdHMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlzX3B1YmxpY1wiLCB0cnVlKTtcblxuICBpZiAoIXB1YmxpY0xpc3RzIHx8IHB1YmxpY0xpc3RzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHB1YmxpY0xpc3RJZHMgPSBwdWJsaWNMaXN0cy5tYXAoKGwpID0+IGwuaWQpO1xuXG4gIC8vIEdldCBhbGwgcmF0ZWQgaXRlbXMgZnJvbSBwdWJsaWMgbGlzdHNcbiAgY29uc3QgeyBkYXRhOiBpdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nXCIpXG4gICAgLmluKFwibGlzdF9pZFwiLCBwdWJsaWNMaXN0SWRzKVxuICAgIC5ub3QoXCJyYXRpbmdcIiwgXCJpc1wiLCBudWxsKTtcblxuICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIC8vIEFnZ3JlZ2F0ZTogc3VtIHJhdGluZ3MgYW5kIGNvdW50IHBlciBzaG93XG4gIGNvbnN0IGFnZ3JlZ2F0ZXMgPSBuZXcgTWFwPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBpZiAoaXRlbS5yYXRpbmcgPT0gbnVsbCkgY29udGludWU7XG4gICAgY29uc3QgZXhpc3RpbmcgPSBhZ2dyZWdhdGVzLmdldChpdGVtLnNob3dfaWQpID8/IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgIGFnZ3JlZ2F0ZXMuc2V0KGl0ZW0uc2hvd19pZCwge1xuICAgICAgc3VtOiBleGlzdGluZy5zdW0gKyBpdGVtLnJhdGluZyxcbiAgICAgIGNvdW50OiBleGlzdGluZy5jb3VudCArIDEsXG4gICAgfSk7XG4gIH1cblxuICAvLyBSZXF1aXJlIGF0IGxlYXN0IDIgdm90ZXMgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIHJhbmtpbmdcbiAgY29uc3QgTUlOX1ZPVEVTID0gMjtcbiAgY29uc3QgcmFua2VkID0gQXJyYXkuZnJvbShhZ2dyZWdhdGVzLmVudHJpZXMoKSlcbiAgICAuZmlsdGVyKChbLCBhZ2ddKSA9PiBhZ2cuY291bnQgPj0gTUlOX1ZPVEVTKVxuICAgIC5tYXAoKFtzaG93SWQsIGFnZ10pID0+ICh7XG4gICAgICBzaG93SWQsXG4gICAgICBhdmc6IGFnZy5zdW0gLyBhZ2cuY291bnQsXG4gICAgICBjb3VudDogYWdnLmNvdW50LFxuICAgIH0pKVxuICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2ZyAtIGEuYXZnIHx8IGIuY291bnQgLSBhLmNvdW50KVxuICAgIC5zbGljZSgwLCA1MCk7XG5cbiAgaWYgKHJhbmtlZC5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBzaG93SWRzID0gcmFua2VkLm1hcCgocikgPT4gci5zaG93SWQpO1xuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHJhbmtlZFxuICAgIC5tYXAoKHIpID0+IHtcbiAgICAgIGNvbnN0IHNob3cgPSBzaG93TWFwLmdldChyLnNob3dJZCk7XG4gICAgICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHNob3cuaWQsXG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICAgIGF2Z19yYXRpbmc6IE1hdGgucm91bmQoci5hdmcgKiAxMCkgLyAxMCxcbiAgICAgICAgdm90ZV9jb3VudDogci5jb3VudCxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZmlsdGVyKChyKTogciBpcyBUb3BSYXRlZFNob3cgPT4gciAhPT0gbnVsbCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IitTQWVzQiw2TEFBQSJ9
}),
"[project]/src/app/[locale]/(app)/explore/data:bf4330 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPopularShows",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"008f333da7a28ce9ead97137e25b61f15f0d1e1602":"getPopularShows"},"src/app/[locale]/(app)/explore/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("008f333da7a28ce9ead97137e25b61f15f0d1e1602", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getPopularShows");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgc2NvcmVSZWNvbW1lbmRhdGlvbnMsIHR5cGUgVXNlckxpc3QgfSBmcm9tIFwiQC9saWIvcmVjb21tZW5kYXRpb25zXCI7XG5pbXBvcnQgeyBjb21wdXRlTGlzdFNpbWlsYXJpdHksIHR5cGUgTGlzdEVudHJ5IH0gZnJvbSBcIkAvbGliL3NpbWlsYXJpdHlcIjtcblxuZXhwb3J0IHR5cGUgU2ltaWxhclVzZXIgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGF2YXRhcl91cmw6IHN0cmluZyB8IG51bGw7XG4gIHNob3dfY291bnQ6IG51bWJlcjtcbiAgc2ltaWxhcml0eTogbnVtYmVyO1xuICBpc19mb2xsb3dpbmc6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2ltaWxhclVzZXJzKCk6IFByb21pc2U8U2ltaWxhclVzZXJbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgaXRlbXNcbiAgY29uc3QgeyBkYXRhOiBteUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFteUxpc3QpIHJldHVybiBbXTtcblxuICBjb25zdCB7IGRhdGE6IG15SXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoIW15SXRlbXMgfHwgbXlJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCB2aWV3ZXJMaXN0OiBMaXN0RW50cnlbXSA9IG15SXRlbXMubWFwKChpLCBpZHgpID0+ICh7XG4gICAgc2hvd0lkOiBpLnNob3dfaWQsXG4gICAgcmF0aW5nOiBpLnJhdGluZyxcbiAgICBwb3NpdGlvbjogaS5wb3NpdGlvbiA/PyBpZHgsXG4gIH0pKTtcblxuICAvLyBGZXRjaCBhbGwgcHVibGljIGxpc3RzIChleGNsdWRpbmcgc2VsZikgd2l0aCBwcm9maWxlIGluZm9cbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBwcm9maWxlcyhpZCwgdXNlcm5hbWUsIGF2YXRhcl91cmwpXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZm9yIHRob3NlIGxpc3RzIGluIG9uZSBiYXRjaFxuICBjb25zdCB7IGRhdGE6IGFsbEl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJsaXN0X2lkLCBzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uXCIpXG4gICAgLmluKFwibGlzdF9pZFwiLCBsaXN0SWRzKTtcblxuICBpZiAoIWFsbEl0ZW1zKSByZXR1cm4gW107XG5cbiAgLy8gR3JvdXAgaXRlbXMgYnkgbGlzdF9pZFxuICBjb25zdCBpdGVtc0J5TGlzdCA9IG5ldyBNYXA8c3RyaW5nLCBMaXN0RW50cnlbXT4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGFsbEl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtc0J5TGlzdC5oYXMoaXRlbS5saXN0X2lkKSkgaXRlbXNCeUxpc3Quc2V0KGl0ZW0ubGlzdF9pZCwgW10pO1xuICAgIGl0ZW1zQnlMaXN0LmdldChpdGVtLmxpc3RfaWQpIS5wdXNoKHtcbiAgICAgIHNob3dJZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ2hlY2sgd2hvIHRoZSBjdXJyZW50IHVzZXIgaXMgYWxyZWFkeSBmb2xsb3dpbmdcbiAgY29uc3QgeyBkYXRhOiBmb2xsb3dzRGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuc2VsZWN0KFwiZm9sbG93aW5nX2lkXCIpXG4gICAgLmVxKFwiZm9sbG93ZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgY29uc3QgZm9sbG93aW5nSWRzID0gbmV3IFNldCgoZm9sbG93c0RhdGEgPz8gW10pLm1hcCgoZikgPT4gZi5mb2xsb3dpbmdfaWQpKTtcblxuICAvLyBDb21wdXRlIHNpbWlsYXJpdHkgZm9yIGVhY2ggdXNlclxuICBjb25zdCByZXN1bHRzOiBTaW1pbGFyVXNlcltdID0gW107XG5cbiAgZm9yIChjb25zdCBsaXN0IG9mIHB1YmxpY0xpc3RzKSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IEFycmF5LmlzQXJyYXkobGlzdC5wcm9maWxlcylcbiAgICAgID8gbGlzdC5wcm9maWxlc1swXVxuICAgICAgOiBsaXN0LnByb2ZpbGVzO1xuICAgIGlmICghcHJvZmlsZSkgY29udGludWU7XG5cbiAgICBjb25zdCBvdGhlckl0ZW1zID0gaXRlbXNCeUxpc3QuZ2V0KGxpc3QuaWQpID8/IFtdO1xuICAgIGlmIChvdGhlckl0ZW1zLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG5cbiAgICBjb25zdCBzaW1pbGFyaXR5ID0gY29tcHV0ZUxpc3RTaW1pbGFyaXR5KHZpZXdlckxpc3QsIG90aGVySXRlbXMpO1xuICAgIGlmIChzaW1pbGFyaXR5ID09PSAwKSBjb250aW51ZTtcblxuICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICBpZDogcHJvZmlsZS5pZCxcbiAgICAgIHVzZXJuYW1lOiBwcm9maWxlLnVzZXJuYW1lLFxuICAgICAgYXZhdGFyX3VybDogcHJvZmlsZS5hdmF0YXJfdXJsLFxuICAgICAgc2hvd19jb3VudDogb3RoZXJJdGVtcy5sZW5ndGgsXG4gICAgICBzaW1pbGFyaXR5LFxuICAgICAgaXNfZm9sbG93aW5nOiBmb2xsb3dpbmdJZHMuaGFzKHByb2ZpbGUuaWQpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU29ydCBieSBzaW1pbGFyaXR5IGRlc2NlbmRpbmcsIHJldHVybiB0b3AgM1xuICByZXR1cm4gcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBiLnNpbWlsYXJpdHkgLSBhLnNpbWlsYXJpdHkpLnNsaWNlKDAsIDMpO1xufVxuXG5leHBvcnQgdHlwZSBSZWNvbW1lbmRlZFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIHNjb3JlOiBudW1iZXI7XG4gIHJlY29tbWVuZGVkQnk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWNvbW1lbmRhdGlvbnMoKTogUHJvbWlzZTxSZWNvbW1lbmRlZFNob3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gMS4gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgKyBpdGVtc1xuICBjb25zdCB7IGRhdGE6IG15TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIW15TGlzdCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YTogbXlJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmICghbXlJdGVtcyB8fCBteUl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHZpZXdlckxpc3Q6IExpc3RFbnRyeVtdID0gbXlJdGVtcy5tYXAoKGksIGlkeCkgPT4gKHtcbiAgICBzaG93SWQ6IGkuc2hvd19pZCxcbiAgICByYXRpbmc6IGkucmF0aW5nLFxuICAgIHBvc2l0aW9uOiBpLnBvc2l0aW9uID8/IGlkeCxcbiAgfSkpO1xuXG4gIC8vIDIuIEZldGNoIGFsbCBvdGhlciBwdWJsaWMgbGlzdHMgd2l0aCB0aGVpciBpdGVtcyBpbiBvbmUgcXVlcnlcbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgbGlzdCBpdGVtcyBmb3IgdGhvc2UgbGlzdHMgaW4gb25lIGJhdGNoXG4gIGNvbnN0IHsgZGF0YTogYWxsSXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImxpc3RfaWQsIHNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIGxpc3RJZHMpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSk7XG5cbiAgaWYgKCFhbGxJdGVtcyB8fCBhbGxJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyAzLiBHcm91cCBpdGVtcyBieSB1c2VyXG4gIGNvbnN0IGxpc3RUb1VzZXIgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGwgb2YgcHVibGljTGlzdHMpIHtcbiAgICBsaXN0VG9Vc2VyLnNldChsLmlkLCBsLnVzZXJfaWQpO1xuICB9XG5cbiAgY29uc3QgdXNlckl0ZW1zTWFwID0gbmV3IE1hcDxzdHJpbmcsIExpc3RFbnRyeVtdPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgYWxsSXRlbXMpIHtcbiAgICBjb25zdCB1c2VySWQgPSBsaXN0VG9Vc2VyLmdldChpdGVtLmxpc3RfaWQpO1xuICAgIGlmICghdXNlcklkKSBjb250aW51ZTtcbiAgICBpZiAoIXVzZXJJdGVtc01hcC5oYXModXNlcklkKSkgdXNlckl0ZW1zTWFwLnNldCh1c2VySWQsIFtdKTtcbiAgICB1c2VySXRlbXNNYXAuZ2V0KHVzZXJJZCkhLnB1c2goe1xuICAgICAgc2hvd0lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBvdGhlckxpc3RzOiBVc2VyTGlzdFtdID0gW107XG4gIGZvciAoY29uc3QgW3VzZXJJZCwgaXRlbXNdIG9mIHVzZXJJdGVtc01hcCkge1xuICAgIG90aGVyTGlzdHMucHVzaCh7IHVzZXJJZCwgaXRlbXMgfSk7XG4gIH1cblxuICAvLyA0LiBSdW4gc2NvcmluZyBhbGdvcml0aG1cbiAgY29uc3Qgc2NvcmVkID0gc2NvcmVSZWNvbW1lbmRhdGlvbnModmlld2VyTGlzdCwgb3RoZXJMaXN0cyk7XG5cbiAgaWYgKHNjb3JlZC5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyA1LiBGZXRjaCBzaG93IG1ldGFkYXRhIGZvciByZWNvbW1lbmRlZCBzaG93c1xuICBjb25zdCBzaG93SWRzID0gc2NvcmVkLm1hcCgocykgPT4gcy5zaG93SWQpO1xuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHNjb3JlZFxuICAgIC5tYXAoKHMpID0+IHtcbiAgICAgIGNvbnN0IHNob3cgPSBzaG93TWFwLmdldChzLnNob3dJZCk7XG4gICAgICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHNob3cuaWQsXG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICAgIHNjb3JlOiBNYXRoLnJvdW5kKHMuc2NvcmUgKiAxMDApIC8gMTAwLFxuICAgICAgICByZWNvbW1lbmRlZEJ5OiBzLnJlY29tbWVuZGVkQnksXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUmVjb21tZW5kZWRTaG93ID0+IHIgIT09IG51bGwpO1xufVxuXG5leHBvcnQgdHlwZSBQb3B1bGFyU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgYWRkZWRDb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBvcHVsYXJTaG93cygpOiBQcm9taXNlPFBvcHVsYXJTaG93W10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICAvLyBHZXQgYWxsIHB1YmxpYyBsaXN0IElEc1xuICBjb25zdCB7IGRhdGE6IHB1YmxpY0xpc3RzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpc19wdWJsaWNcIiwgdHJ1ZSk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBwdWJsaWNMaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBHZXQgYWxsIGl0ZW1zIGZyb20gcHVibGljIGxpc3RzXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWRcIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIHB1YmxpY0xpc3RJZHMpO1xuXG4gIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG5cbiAgLy8gQ291bnQgb2NjdXJyZW5jZXMgcGVyIHNob3dcbiAgY29uc3QgY291bnRNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb3VudE1hcC5zZXQoaXRlbS5zaG93X2lkLCAoY291bnRNYXAuZ2V0KGl0ZW0uc2hvd19pZCkgPz8gMCkgKyAxKTtcbiAgfVxuXG4gIC8vIFNvcnQgYnkgY291bnQsIHRha2UgdG9wIDEyXG4gIGNvbnN0IHRvcEVudHJpZXMgPSBBcnJheS5mcm9tKGNvdW50TWFwLmVudHJpZXMoKSlcbiAgICAuc29ydCgoYSwgYikgPT4gYlsxXSAtIGFbMV0pXG4gICAgLnNsaWNlKDAsIDEyKTtcblxuICBjb25zdCBzaG93SWRzID0gdG9wRW50cmllcy5tYXAoKFtpZF0pID0+IGlkKTtcblxuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHRvcEVudHJpZXNcbiAgICAubWFwKChbaWQsIGNvdW50XSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdyA9IHNob3dNYXAuZ2V0KGlkKTtcbiAgICAgIGlmICghc2hvdykgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogc2hvdy5pZCxcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgICAgYWRkZWRDb3VudDogY291bnQsXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUG9wdWxhclNob3cgPT4gciAhPT0gbnVsbCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjZTQWdQc0IsNExBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:6ba9ee [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addShowToMyList",
    ()=>$$RSC_SERVER_ACTION_9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40a28c13a97e482f99f75f5981eded4d9dfadb2404":"addShowToMyList"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40a28c13a97e482f99f75f5981eded4d9dfadb2404", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addShowToMyList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG59O1xuXG4vKipcbiAqIFJldHVybnMgYW5hbHl0aWNzIGZvciBhIGxpc3QuXG4gKiAtIE5vIGxpc3RJZCDihpIgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIG93biBsaXN0LlxuICogLSBXaXRoIGxpc3RJZCDihpIgYW55IHB1YmxpYyBsaXN0IChvd25lcidzIHRhZ3MgYXJlIHNob3duKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RBbmFseXRpY3MoXG4gIGxpc3RJZD86IHN0cmluZyxcbik6IFByb21pc2U8QW5hbHl0aWNzRGF0YT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBsZXQgcmVzb2x2ZWRMaXN0SWQ6IHN0cmluZztcbiAgbGV0IG93bmVySWQ6IHN0cmluZztcblxuICBpZiAobGlzdElkKSB7XG4gICAgLy8gVmlld2luZyBzb21lb25lIGVsc2UncyAob3Igb3duKSBsaXN0IGJ5IGV4cGxpY2l0IGlkXG4gICAgY29uc3QgeyBkYXRhOiBsaXN0Um93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0c1wiKVxuICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWxpc3RSb3cpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgLy8gT25seSBhbGxvdyBhY2Nlc3MgaWYgcHVibGljIG9yIG93bmVkIGJ5IHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGlmICghbGlzdFJvdy5pc19wdWJsaWMgJiYgbGlzdFJvdy51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICAgIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0Um93LmlkO1xuICAgIG93bmVySWQgPSBsaXN0Um93LnVzZXJfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0LmlkO1xuICAgIG93bmVySWQgPSB1c2VyLmlkO1xuICB9XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIChubyBwYWdpbmF0aW9uKSDigJQgcmF0aW5nLCBzaG93X2lkLCBhZGRlZF9hdCwgZmlyc3RfYWlyX2RhdGUgdmlhIGpvaW5cbiAgdHlwZSBSYXdJdGVtID0ge1xuICAgIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgICBzaG93X2lkOiBzdHJpbmc7XG4gICAgYWRkZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gICAgc2hvd3M6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICB9IHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgeyBkYXRhOiByYXdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFxuICAgICAgXCJyYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBzaG93cyhpZCwgdGl0bGUsIHBvc3Rlcl9wYXRoLCBmaXJzdF9haXJfZGF0ZSlcIixcbiAgICApXG4gICAgLmVxKFwibGlzdF9pZFwiLCByZXNvbHZlZExpc3RJZCk7XG5cbiAgY29uc3QgaXRlbXMgPSAocmF3SXRlbXMgPz8gW10pIGFzIFJhd0l0ZW1bXTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcmF0ZWRSb3dzID0gaXRlbXMuZmlsdGVyKChyKSA9PiByLnJhdGluZyAhPT0gbnVsbCk7XG4gIGNvbnN0IHJhdGVkQ291bnQgPSByYXRlZFJvd3MubGVuZ3RoO1xuICBjb25zdCBhdmdSYXRpbmcgPVxuICAgIHJhdGVkQ291bnQgPiAwXG4gICAgICA/IE1hdGgucm91bmQoXG4gICAgICAgICAgKHJhdGVkUm93cy5yZWR1Y2UoKHMsIHIpID0+IHMgKyByLnJhdGluZyEsIDApIC8gcmF0ZWRDb3VudCkgKiAxMCxcbiAgICAgICAgKSAvIDEwXG4gICAgICA6IG51bGw7XG5cbiAgLy8gUmF0aW5nIGRpc3RyaWJ1dGlvblxuICBjb25zdCByYXRpbmdNYXA6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChsZXQgciA9IDE7IHIgPD0gMTA7IHIrKykgcmF0aW5nTWFwW3JdID0gMDtcbiAgZm9yIChjb25zdCByb3cgb2YgaXRlbXMpIHtcbiAgICBpZiAocm93LnJhdGluZyAhPT0gbnVsbClcbiAgICAgIHJhdGluZ01hcFtyb3cucmF0aW5nXSA9IChyYXRpbmdNYXBbcm93LnJhdGluZ10gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IHJhdGluZ0NvdW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICAgIHJhdGluZzogaSArIDEsXG4gICAgY291bnQ6IHJhdGluZ01hcFtpICsgMV0sXG4gIH0pKTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uIOKAlCB1c2UgdGhlIGxpc3Qgb3duZXIncyB0YWdzXG4gIGNvbnN0IHNob3dJZHMgPSBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd19pZCk7XG4gIGNvbnN0IHRhZ0NvdW50czogQW5hbHl0aWNzRGF0YVtcInRhZ0NvdW50c1wiXSA9IFtdO1xuICBjb25zdCB0YWdBdmdSYXRpbmdzOiBBbmFseXRpY3NEYXRhW1widGFnQXZnUmF0aW5nc1wiXSA9IFtdO1xuXG4gIGlmIChzaG93SWRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBbeyBkYXRhOiBzaG93VGFnUm93cyB9LCB7IGRhdGE6IHRhZ0RlZnMgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwidGFnX2lkLCBzaG93X2lkXCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgb3duZXJJZClcbiAgICAgICAgLmluKFwic2hvd19pZFwiLCBzaG93SWRzKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwiaWQsIG5hbWUsIGNvbG9yXCIpXG4gICAgICAgIC5vcihgaXNfZGVmYXVsdC5lcS50cnVlLHVzZXJfaWQuZXEuJHtvd25lcklkfWApLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGFnTWFwID0gbmV3IE1hcCgodGFnRGVmcyA/PyBbXSkubWFwKCh0KSA9PiBbdC5pZCwgdF0pKTtcbiAgICBjb25zdCBzaG93UmF0aW5nTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoKGkpID0+IFtpLnNob3dfaWQsIGkucmF0aW5nXSkpO1xuXG4gICAgY29uc3QgdGFnQ291bnRNYXA6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1cbiAgICA+ID0ge307XG4gICAgY29uc3QgdGFnUmF0aW5nQWNjOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY29sb3I6IHN0cmluZzsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHNob3dUYWdSb3dzID8/IFtdKSB7XG4gICAgICBjb25zdCB0YWcgPSB0YWdNYXAuZ2V0KHJvdy50YWdfaWQpO1xuICAgICAgaWYgKCF0YWcpIGNvbnRpbnVlO1xuXG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICBpZDogdGFnLmlkLFxuICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgICAgdGFnQ291bnRNYXBbcm93LnRhZ19pZF0uY291bnQrKztcblxuICAgICAgY29uc3QgcmF0aW5nID0gc2hvd1JhdGluZ01hcC5nZXQocm93LnNob3dfaWQpO1xuICAgICAgaWYgKHJhdGluZyAhPSBudWxsKSB7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgICAgbmFtZTogdGFnLm5hbWUsXG4gICAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5zdW0gKz0gcmF0aW5nO1xuICAgICAgICB0YWdSYXRpbmdBY2Nbcm93LnRhZ19pZF0uY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWdDb3VudHMucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnQ291bnRNYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KSxcbiAgICApO1xuICAgIHRhZ0F2Z1JhdGluZ3MucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnUmF0aW5nQWNjKVxuICAgICAgICAubWFwKCh0KSA9PiAoe1xuICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgIG5hbWU6IHQubmFtZSxcbiAgICAgICAgICBjb2xvcjogdC5jb2xvcixcbiAgICAgICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHQuc3VtIC8gdC5jb3VudCkgKiAxMCkgLyAxMCxcbiAgICAgICAgICBjb3VudDogdC5jb3VudCxcbiAgICAgICAgfSkpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2Z1JhdGluZyAtIGEuYXZnUmF0aW5nKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVGltZWxpbmU6IGdyb3VwIGJ5IGFkZGVkX2F0IG1vbnRoIChZWVlZLU1NKVxuICBjb25zdCBtb250aGx5TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5hZGRlZF9hdCkgY29udGludWU7XG4gICAgY29uc3QgbW9udGggPSBpdGVtLmFkZGVkX2F0LnNsaWNlKDAsIDcpO1xuICAgIG1vbnRobHlNYXBbbW9udGhdID0gKG1vbnRobHlNYXBbbW9udGhdID8/IDApICsgMTtcbiAgfVxuICBjb25zdCBtb250aGx5QWRkZWQgPSBPYmplY3QuZW50cmllcyhtb250aGx5TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFttb250aCwgY291bnRdKSA9PiAoeyBtb250aCwgY291bnQgfSkpO1xuXG4gIC8vIERlY2FkZSBkaXN0cmlidXRpb246IGdyb3VwIGJ5IGRlY2FkZSBvZiBmaXJzdF9haXJfZGF0ZVxuICBjb25zdCBkZWNhZGVNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgeWVhckNvdW50TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGNvbnN0IGRlY2FkZVJhdGluZ0FjYzogUmVjb3JkPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PiA9IHt9O1xuICBjb25zdCB5ZWFyUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlyc3RBaXJEYXRlID0gaXRlbS5zaG93cz8uZmlyc3RfYWlyX2RhdGU7XG4gICAgaWYgKCFmaXJzdEFpckRhdGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHllYXIgPSBwYXJzZUludChmaXJzdEFpckRhdGUuc2xpY2UoMCwgNCksIDEwKTtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgeWVhciA8IDE5MDApIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlY2FkZSA9IGAke01hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwfXNgO1xuICAgIGNvbnN0IHllYXJTdHIgPSBTdHJpbmcoeWVhcik7XG5cbiAgICBkZWNhZGVNYXBbZGVjYWRlXSA9IChkZWNhZGVNYXBbZGVjYWRlXSA/PyAwKSArIDE7XG4gICAgeWVhckNvdW50TWFwW3llYXJTdHJdID0gKHllYXJDb3VudE1hcFt5ZWFyU3RyXSA/PyAwKSArIDE7XG5cbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdID8/PSB7IHN1bTogMCwgY291bnQ6IDAgfTtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLmNvdW50Kys7XG5cbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXS5zdW0gKz0gaXRlbS5yYXRpbmc7XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjYWRlQ291bnRzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlTWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIGNvdW50XSkgPT4gKHsgZGVjYWRlLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgeWVhckNvdW50cyA9IE9iamVjdC5lbnRyaWVzKHllYXJDb3VudE1hcClcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgY291bnRdKSA9PiAoeyB5ZWFyLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgZGVjYWRlQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKGRlY2FkZVJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbZGVjYWRlLCB7IHN1bSwgY291bnQgfV0pID0+ICh7XG4gICAgICBkZWNhZGUsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICBjb25zdCB5ZWFyQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKHllYXJSYXRpbmdBY2MpXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW3llYXIsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIHllYXIsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICAvLyBCdWlsZCBzaG93IGxvb2t1cCBtYXBzIGZvciBtb2RhbCBkcmlsbC10aHJvdWdoXG4gIGNvbnN0IHNob3dzQnlSYXRpbmc6IFJlY29yZDxudW1iZXIsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGNvbnN0IHNob3dzQnlZZWFyOiBSZWNvcmQ8c3RyaW5nLCBTaG93U3VtbWFyeVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBzdW1tYXJ5OiBTaG93U3VtbWFyeSA9IHtcbiAgICAgIGlkOiBpdGVtLnNob3dzPy5pZCA/PyBpdGVtLnNob3dfaWQsXG4gICAgICB0aXRsZTogaXRlbS5zaG93cz8udGl0bGUgPz8gXCJcIixcbiAgICAgIHBvc3Rlcl9wYXRoOiBpdGVtLnNob3dzPy5wb3N0ZXJfcGF0aCA/PyBudWxsLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZSA/PyBudWxsLFxuICAgIH07XG4gICAgaWYgKGl0ZW0ucmF0aW5nICE9PSBudWxsKSB7XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXSA/Pz0gW107XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXS5wdXNoKHN1bW1hcnkpO1xuICAgIH1cbiAgICBjb25zdCBmYWQgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoZmFkKSB7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZmFkLnNsaWNlKDAsIDQpLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKHkpICYmIHkgPj0gMTkwMCkge1xuICAgICAgICBjb25zdCB5ciA9IFN0cmluZyh5KTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdID8/PSBbXTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdLnB1c2goc3VtbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbENvdW50LFxuICAgIHJhdGVkQ291bnQsXG4gICAgYXZnUmF0aW5nLFxuICAgIHJhdGluZ0NvdW50cyxcbiAgICB0YWdDb3VudHMsXG4gICAgdGFnQXZnUmF0aW5ncyxcbiAgICBtb250aGx5QWRkZWQsXG4gICAgZGVjYWRlQ291bnRzLFxuICAgIHllYXJDb3VudHMsXG4gICAgZGVjYWRlQXZnUmF0aW5ncyxcbiAgICB5ZWFyQXZnUmF0aW5ncyxcbiAgICBzaG93c0J5UmF0aW5nLFxuICAgIHNob3dzQnlZZWFyLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0SXRlbVdpdGhTaG93ID0ge1xuICBpZDogc3RyaW5nO1xuICBsaXN0X2lkOiBzdHJpbmc7XG4gIHNob3dfaWQ6IHN0cmluZztcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBhZGRlZF9hdDogc3RyaW5nO1xuICBub3Rlczogc3RyaW5nIHwgbnVsbDtcbiAgc2hvd3M6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gICAgaW1kYl9pZDogc3RyaW5nIHwgbnVsbDtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xuICAgIHRtZGJfZmV0Y2hlZDogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0SXRlbXNQYWdlKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZSA9IDUwLFxuKTogUHJvbWlzZTx7XG4gIGl0ZW1zOiBMaXN0SXRlbVdpdGhTaG93W107XG4gIGhhc01vcmU6IGJvb2xlYW47XG4gIHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG59PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGNvbnN0IHsgZGF0YTogbGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFsaXN0LmlzX3B1YmxpYyAmJiBsaXN0LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBmcm9tID0gcGFnZSAqIHBhZ2VTaXplO1xuICBjb25zdCB0byA9IGZyb20gKyBwYWdlU2l6ZSAtIDE7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKiwgc2hvd3MoKilcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIGxpc3RJZClcbiAgICAub3JkZXIoXCJyYXRpbmdcIiwgeyBhc2NlbmRpbmc6IGZhbHNlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICBjb25zdCBpdGVtcyA9IChkYXRhID8/IFtdKSBhcyB1bmtub3duIGFzIExpc3RJdGVtV2l0aFNob3dbXTtcbiAgY29uc3QgaGFzTW9yZSA9IGl0ZW1zLmxlbmd0aCA9PT0gcGFnZVNpemU7XG5cbiAgY29uc3Qgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICBpZiAodXNlciAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeyBkYXRhOiBzaG93VGFncyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgdGFnX2lkXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgICAuaW4oXG4gICAgICAgIFwic2hvd19pZFwiLFxuICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd3MuaWQpLFxuICAgICAgKTtcblxuICAgIGZvciAoY29uc3Qgc3Qgb2Ygc2hvd1RhZ3MgPz8gW10pIHtcbiAgICAgIGlmICghc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0pIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdID0gW107XG4gICAgICBzaG93VGFnc01hcFtzdC5zaG93X2lkXS5wdXNoKHN0LnRhZ19pZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXRlbXMsIGhhc01vcmUsIHNob3dUYWdzTWFwIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9NeUxpc3Qoc2hvdzoge1xuICBpZDogc3RyaW5nO1xuICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xufSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgbXlMaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICBpZiAoIW15TGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaG93IGV4aXN0cyBpbiBvdXIgREIgKHJldXNlIGV4aXN0aW5nIG9yIGNyZWF0ZSlcbiAgbGV0IHNob3dJZCA9IHNob3cuaWQ7XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzaG93LmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOlxuICAgICAgICAgIHNob3cudG1kYl9pZCA/P1xuICAgICAgICAgIC0oXG4gICAgICAgICAgICBNYXRoLmFicyhcbiAgICAgICAgICAgICAgc2hvdy50aXRsZVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICAgICksXG4gICAgICAgIGltZGJfaWQ6IHNob3cuaW1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBzaG93SWQgPSBuZXdTaG93IS5pZDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbiAgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRtZGJTaG93VG9NeUxpc3Qoc2hvdzoge1xuICB0bWRiX2lkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBGaW5kIG9yIGNyZWF0ZSB0aGUgc2hvdyBieSB0bWRiX2lkXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBleGlzdGluZ1Nob3chLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUxpc3RUb01pbmUoc291cmNlTGlzdElkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSBzb3VyY2UgbGlzdCBpcyBwdWJsaWMgKG9yIG93bmVkIGJ5IHVzZXIpXG4gIGNvbnN0IHsgZGF0YTogc291cmNlTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCBpc19wdWJsaWMsIHVzZXJfaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzb3VyY2VMaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghc291cmNlTGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghc291cmNlTGlzdC5pc19wdWJsaWMgJiYgc291cmNlTGlzdC51c2VyX2lkICE9PSB1c2VyLmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJPd24gbGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gVmVyaWZ5IG93biBsaXN0IGlzIGVtcHR5XG4gIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpO1xuXG4gIGlmICgoY291bnQgPz8gMCkgPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjb3B5IHRvIGFuIGVtcHR5IGxpc3RcIik7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgICBzaG93X2lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgICBub3RlczogaXRlbS5ub3RlcyxcbiAgICB9KSk7XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLmluc2VydChpbnNlcnRzKTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikgdGhyb3cgbmV3IEVycm9yKGluc2VydEVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjJTQTZxQnNCLDRMQUFBIn0=
}),
"[project]/src/components/OnboardingEmptyState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tmdb/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$rankings$2f$data$3a$49f7c5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/rankings/data:49f7c5 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$bf4330__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/explore/data:bf4330 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$6ba9ee__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:6ba9ee [app-client] (ecmascript) <text/javascript>");
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$rankings$2f$data$3a$49f7c5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getTopRatedShows"])().then({
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
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$bf4330__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getPopularShows"])().then({
                            "OnboardingEmptyState.useEffect": (popular)=>{
                                setShows(popular.slice(0, 12));
                            }
                        }["OnboardingEmptyState.useEffect"]);
                    }
                }
            }["OnboardingEmptyState.useEffect"]).catch({
                "OnboardingEmptyState.useEffect": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$bf4330__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getPopularShows"])().then({
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
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$6ba9ee__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addShowToMyList"])({
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
                    fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-base font-semibold text-text-primary",
                children: t("title")
            }, void 0, false, {
                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 max-w-sm text-center text-sm text-text-secondary",
                children: t("subtitle")
            }, void 0, false, {
                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
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
                                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            t("addFirst")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/OnboardingEmptyState.tsx",
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
                                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            t("importExternal")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
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
                                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-semibold uppercase tracking-widest text-text-faint",
                                children: t("communityFavorites")
                            }, void 0, false, {
                                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px flex-1 bg-border"
                            }, void 0, false, {
                                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/OnboardingEmptyState.tsx",
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
                                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this) : shows.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6",
                        children: shows.map((show)=>{
                            const isAdded = addedIds.has(show.id);
                            const isAdding = addingId === show.id;
                            const posterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPosterUrl"])(show.poster_path, "w185");
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
                                                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                                lineNumber: 187,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex h-full items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                                                    size: 24,
                                                    className: "text-text-faint"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                                lineNumber: 195,
                                                columnNumber: 23
                                            }, this),
                                            show.avg_rating !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-1.5 right-1.5 rounded px-1 py-0.5 bg-black/70 font-mono text-[10px] font-bold tabular-nums text-accent leading-none",
                                                children: show.avg_rating.toFixed(1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
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
                                                    fileName: "[project]/src/components/OnboardingEmptyState.tsx",
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
                                                                    fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                                                    lineNumber: 232,
                                                                    columnNumber: 31
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                                                                    size: 13,
                                                                    weight: "bold"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                                                    lineNumber: 234,
                                                                    columnNumber: 31
                                                                }, this),
                                                                t("addToList")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                                            href: `/shows/${show.id}`,
                                                            className: "flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-black/60 transition-colors",
                                                            onClick: (e)=>e.stopPropagation(),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ArrowRight$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowRight"], {
                                                                    size: 13,
                                                                    weight: "bold"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                                                    lineNumber: 243,
                                                                    columnNumber: 29
                                                                }, this),
                                                                t("details")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                                lineNumber: 208,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                        lineNumber: 185,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate px-2 py-1.5 text-xs text-text-secondary",
                                        children: show.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                        lineNumber: 250,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, show.id, true, {
                                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                                lineNumber: 171,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/OnboardingEmptyState.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/OnboardingEmptyState.tsx",
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
"[project]/src/app/[locale]/(app)/lists/data:ecc912 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateList",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60d17600e3a1151ee7dff4cd2451a4528d05d2f90c":"updateList"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60d17600e3a1151ee7dff4cd2451a4528d05d2f90c", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG59O1xuXG4vKipcbiAqIFJldHVybnMgYW5hbHl0aWNzIGZvciBhIGxpc3QuXG4gKiAtIE5vIGxpc3RJZCDihpIgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIG93biBsaXN0LlxuICogLSBXaXRoIGxpc3RJZCDihpIgYW55IHB1YmxpYyBsaXN0IChvd25lcidzIHRhZ3MgYXJlIHNob3duKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RBbmFseXRpY3MoXG4gIGxpc3RJZD86IHN0cmluZyxcbik6IFByb21pc2U8QW5hbHl0aWNzRGF0YT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBsZXQgcmVzb2x2ZWRMaXN0SWQ6IHN0cmluZztcbiAgbGV0IG93bmVySWQ6IHN0cmluZztcblxuICBpZiAobGlzdElkKSB7XG4gICAgLy8gVmlld2luZyBzb21lb25lIGVsc2UncyAob3Igb3duKSBsaXN0IGJ5IGV4cGxpY2l0IGlkXG4gICAgY29uc3QgeyBkYXRhOiBsaXN0Um93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0c1wiKVxuICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWxpc3RSb3cpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgLy8gT25seSBhbGxvdyBhY2Nlc3MgaWYgcHVibGljIG9yIG93bmVkIGJ5IHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGlmICghbGlzdFJvdy5pc19wdWJsaWMgJiYgbGlzdFJvdy51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICAgIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0Um93LmlkO1xuICAgIG93bmVySWQgPSBsaXN0Um93LnVzZXJfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0LmlkO1xuICAgIG93bmVySWQgPSB1c2VyLmlkO1xuICB9XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIChubyBwYWdpbmF0aW9uKSDigJQgcmF0aW5nLCBzaG93X2lkLCBhZGRlZF9hdCwgZmlyc3RfYWlyX2RhdGUgdmlhIGpvaW5cbiAgdHlwZSBSYXdJdGVtID0ge1xuICAgIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgICBzaG93X2lkOiBzdHJpbmc7XG4gICAgYWRkZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gICAgc2hvd3M6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICB9IHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgeyBkYXRhOiByYXdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFxuICAgICAgXCJyYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBzaG93cyhpZCwgdGl0bGUsIHBvc3Rlcl9wYXRoLCBmaXJzdF9haXJfZGF0ZSlcIixcbiAgICApXG4gICAgLmVxKFwibGlzdF9pZFwiLCByZXNvbHZlZExpc3RJZCk7XG5cbiAgY29uc3QgaXRlbXMgPSAocmF3SXRlbXMgPz8gW10pIGFzIFJhd0l0ZW1bXTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcmF0ZWRSb3dzID0gaXRlbXMuZmlsdGVyKChyKSA9PiByLnJhdGluZyAhPT0gbnVsbCk7XG4gIGNvbnN0IHJhdGVkQ291bnQgPSByYXRlZFJvd3MubGVuZ3RoO1xuICBjb25zdCBhdmdSYXRpbmcgPVxuICAgIHJhdGVkQ291bnQgPiAwXG4gICAgICA/IE1hdGgucm91bmQoXG4gICAgICAgICAgKHJhdGVkUm93cy5yZWR1Y2UoKHMsIHIpID0+IHMgKyByLnJhdGluZyEsIDApIC8gcmF0ZWRDb3VudCkgKiAxMCxcbiAgICAgICAgKSAvIDEwXG4gICAgICA6IG51bGw7XG5cbiAgLy8gUmF0aW5nIGRpc3RyaWJ1dGlvblxuICBjb25zdCByYXRpbmdNYXA6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChsZXQgciA9IDE7IHIgPD0gMTA7IHIrKykgcmF0aW5nTWFwW3JdID0gMDtcbiAgZm9yIChjb25zdCByb3cgb2YgaXRlbXMpIHtcbiAgICBpZiAocm93LnJhdGluZyAhPT0gbnVsbClcbiAgICAgIHJhdGluZ01hcFtyb3cucmF0aW5nXSA9IChyYXRpbmdNYXBbcm93LnJhdGluZ10gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IHJhdGluZ0NvdW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICAgIHJhdGluZzogaSArIDEsXG4gICAgY291bnQ6IHJhdGluZ01hcFtpICsgMV0sXG4gIH0pKTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uIOKAlCB1c2UgdGhlIGxpc3Qgb3duZXIncyB0YWdzXG4gIGNvbnN0IHNob3dJZHMgPSBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd19pZCk7XG4gIGNvbnN0IHRhZ0NvdW50czogQW5hbHl0aWNzRGF0YVtcInRhZ0NvdW50c1wiXSA9IFtdO1xuICBjb25zdCB0YWdBdmdSYXRpbmdzOiBBbmFseXRpY3NEYXRhW1widGFnQXZnUmF0aW5nc1wiXSA9IFtdO1xuXG4gIGlmIChzaG93SWRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBbeyBkYXRhOiBzaG93VGFnUm93cyB9LCB7IGRhdGE6IHRhZ0RlZnMgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwidGFnX2lkLCBzaG93X2lkXCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgb3duZXJJZClcbiAgICAgICAgLmluKFwic2hvd19pZFwiLCBzaG93SWRzKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwiaWQsIG5hbWUsIGNvbG9yXCIpXG4gICAgICAgIC5vcihgaXNfZGVmYXVsdC5lcS50cnVlLHVzZXJfaWQuZXEuJHtvd25lcklkfWApLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGFnTWFwID0gbmV3IE1hcCgodGFnRGVmcyA/PyBbXSkubWFwKCh0KSA9PiBbdC5pZCwgdF0pKTtcbiAgICBjb25zdCBzaG93UmF0aW5nTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoKGkpID0+IFtpLnNob3dfaWQsIGkucmF0aW5nXSkpO1xuXG4gICAgY29uc3QgdGFnQ291bnRNYXA6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1cbiAgICA+ID0ge307XG4gICAgY29uc3QgdGFnUmF0aW5nQWNjOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY29sb3I6IHN0cmluZzsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHNob3dUYWdSb3dzID8/IFtdKSB7XG4gICAgICBjb25zdCB0YWcgPSB0YWdNYXAuZ2V0KHJvdy50YWdfaWQpO1xuICAgICAgaWYgKCF0YWcpIGNvbnRpbnVlO1xuXG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICBpZDogdGFnLmlkLFxuICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgICAgdGFnQ291bnRNYXBbcm93LnRhZ19pZF0uY291bnQrKztcblxuICAgICAgY29uc3QgcmF0aW5nID0gc2hvd1JhdGluZ01hcC5nZXQocm93LnNob3dfaWQpO1xuICAgICAgaWYgKHJhdGluZyAhPSBudWxsKSB7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgICAgbmFtZTogdGFnLm5hbWUsXG4gICAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5zdW0gKz0gcmF0aW5nO1xuICAgICAgICB0YWdSYXRpbmdBY2Nbcm93LnRhZ19pZF0uY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWdDb3VudHMucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnQ291bnRNYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KSxcbiAgICApO1xuICAgIHRhZ0F2Z1JhdGluZ3MucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnUmF0aW5nQWNjKVxuICAgICAgICAubWFwKCh0KSA9PiAoe1xuICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgIG5hbWU6IHQubmFtZSxcbiAgICAgICAgICBjb2xvcjogdC5jb2xvcixcbiAgICAgICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHQuc3VtIC8gdC5jb3VudCkgKiAxMCkgLyAxMCxcbiAgICAgICAgICBjb3VudDogdC5jb3VudCxcbiAgICAgICAgfSkpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2Z1JhdGluZyAtIGEuYXZnUmF0aW5nKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVGltZWxpbmU6IGdyb3VwIGJ5IGFkZGVkX2F0IG1vbnRoIChZWVlZLU1NKVxuICBjb25zdCBtb250aGx5TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5hZGRlZF9hdCkgY29udGludWU7XG4gICAgY29uc3QgbW9udGggPSBpdGVtLmFkZGVkX2F0LnNsaWNlKDAsIDcpO1xuICAgIG1vbnRobHlNYXBbbW9udGhdID0gKG1vbnRobHlNYXBbbW9udGhdID8/IDApICsgMTtcbiAgfVxuICBjb25zdCBtb250aGx5QWRkZWQgPSBPYmplY3QuZW50cmllcyhtb250aGx5TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFttb250aCwgY291bnRdKSA9PiAoeyBtb250aCwgY291bnQgfSkpO1xuXG4gIC8vIERlY2FkZSBkaXN0cmlidXRpb246IGdyb3VwIGJ5IGRlY2FkZSBvZiBmaXJzdF9haXJfZGF0ZVxuICBjb25zdCBkZWNhZGVNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgeWVhckNvdW50TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGNvbnN0IGRlY2FkZVJhdGluZ0FjYzogUmVjb3JkPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PiA9IHt9O1xuICBjb25zdCB5ZWFyUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlyc3RBaXJEYXRlID0gaXRlbS5zaG93cz8uZmlyc3RfYWlyX2RhdGU7XG4gICAgaWYgKCFmaXJzdEFpckRhdGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHllYXIgPSBwYXJzZUludChmaXJzdEFpckRhdGUuc2xpY2UoMCwgNCksIDEwKTtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgeWVhciA8IDE5MDApIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlY2FkZSA9IGAke01hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwfXNgO1xuICAgIGNvbnN0IHllYXJTdHIgPSBTdHJpbmcoeWVhcik7XG5cbiAgICBkZWNhZGVNYXBbZGVjYWRlXSA9IChkZWNhZGVNYXBbZGVjYWRlXSA/PyAwKSArIDE7XG4gICAgeWVhckNvdW50TWFwW3llYXJTdHJdID0gKHllYXJDb3VudE1hcFt5ZWFyU3RyXSA/PyAwKSArIDE7XG5cbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdID8/PSB7IHN1bTogMCwgY291bnQ6IDAgfTtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLmNvdW50Kys7XG5cbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXS5zdW0gKz0gaXRlbS5yYXRpbmc7XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjYWRlQ291bnRzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlTWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIGNvdW50XSkgPT4gKHsgZGVjYWRlLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgeWVhckNvdW50cyA9IE9iamVjdC5lbnRyaWVzKHllYXJDb3VudE1hcClcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgY291bnRdKSA9PiAoeyB5ZWFyLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgZGVjYWRlQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKGRlY2FkZVJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbZGVjYWRlLCB7IHN1bSwgY291bnQgfV0pID0+ICh7XG4gICAgICBkZWNhZGUsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICBjb25zdCB5ZWFyQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKHllYXJSYXRpbmdBY2MpXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW3llYXIsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIHllYXIsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICAvLyBCdWlsZCBzaG93IGxvb2t1cCBtYXBzIGZvciBtb2RhbCBkcmlsbC10aHJvdWdoXG4gIGNvbnN0IHNob3dzQnlSYXRpbmc6IFJlY29yZDxudW1iZXIsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGNvbnN0IHNob3dzQnlZZWFyOiBSZWNvcmQ8c3RyaW5nLCBTaG93U3VtbWFyeVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBzdW1tYXJ5OiBTaG93U3VtbWFyeSA9IHtcbiAgICAgIGlkOiBpdGVtLnNob3dzPy5pZCA/PyBpdGVtLnNob3dfaWQsXG4gICAgICB0aXRsZTogaXRlbS5zaG93cz8udGl0bGUgPz8gXCJcIixcbiAgICAgIHBvc3Rlcl9wYXRoOiBpdGVtLnNob3dzPy5wb3N0ZXJfcGF0aCA/PyBudWxsLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZSA/PyBudWxsLFxuICAgIH07XG4gICAgaWYgKGl0ZW0ucmF0aW5nICE9PSBudWxsKSB7XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXSA/Pz0gW107XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXS5wdXNoKHN1bW1hcnkpO1xuICAgIH1cbiAgICBjb25zdCBmYWQgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoZmFkKSB7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZmFkLnNsaWNlKDAsIDQpLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKHkpICYmIHkgPj0gMTkwMCkge1xuICAgICAgICBjb25zdCB5ciA9IFN0cmluZyh5KTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdID8/PSBbXTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdLnB1c2goc3VtbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbENvdW50LFxuICAgIHJhdGVkQ291bnQsXG4gICAgYXZnUmF0aW5nLFxuICAgIHJhdGluZ0NvdW50cyxcbiAgICB0YWdDb3VudHMsXG4gICAgdGFnQXZnUmF0aW5ncyxcbiAgICBtb250aGx5QWRkZWQsXG4gICAgZGVjYWRlQ291bnRzLFxuICAgIHllYXJDb3VudHMsXG4gICAgZGVjYWRlQXZnUmF0aW5ncyxcbiAgICB5ZWFyQXZnUmF0aW5ncyxcbiAgICBzaG93c0J5UmF0aW5nLFxuICAgIHNob3dzQnlZZWFyLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0SXRlbVdpdGhTaG93ID0ge1xuICBpZDogc3RyaW5nO1xuICBsaXN0X2lkOiBzdHJpbmc7XG4gIHNob3dfaWQ6IHN0cmluZztcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBhZGRlZF9hdDogc3RyaW5nO1xuICBub3Rlczogc3RyaW5nIHwgbnVsbDtcbiAgc2hvd3M6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gICAgaW1kYl9pZDogc3RyaW5nIHwgbnVsbDtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xuICAgIHRtZGJfZmV0Y2hlZDogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0SXRlbXNQYWdlKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZSA9IDUwLFxuKTogUHJvbWlzZTx7XG4gIGl0ZW1zOiBMaXN0SXRlbVdpdGhTaG93W107XG4gIGhhc01vcmU6IGJvb2xlYW47XG4gIHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG59PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGNvbnN0IHsgZGF0YTogbGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFsaXN0LmlzX3B1YmxpYyAmJiBsaXN0LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBmcm9tID0gcGFnZSAqIHBhZ2VTaXplO1xuICBjb25zdCB0byA9IGZyb20gKyBwYWdlU2l6ZSAtIDE7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKiwgc2hvd3MoKilcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIGxpc3RJZClcbiAgICAub3JkZXIoXCJyYXRpbmdcIiwgeyBhc2NlbmRpbmc6IGZhbHNlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICBjb25zdCBpdGVtcyA9IChkYXRhID8/IFtdKSBhcyB1bmtub3duIGFzIExpc3RJdGVtV2l0aFNob3dbXTtcbiAgY29uc3QgaGFzTW9yZSA9IGl0ZW1zLmxlbmd0aCA9PT0gcGFnZVNpemU7XG5cbiAgY29uc3Qgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICBpZiAodXNlciAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeyBkYXRhOiBzaG93VGFncyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgdGFnX2lkXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgICAuaW4oXG4gICAgICAgIFwic2hvd19pZFwiLFxuICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd3MuaWQpLFxuICAgICAgKTtcblxuICAgIGZvciAoY29uc3Qgc3Qgb2Ygc2hvd1RhZ3MgPz8gW10pIHtcbiAgICAgIGlmICghc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0pIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdID0gW107XG4gICAgICBzaG93VGFnc01hcFtzdC5zaG93X2lkXS5wdXNoKHN0LnRhZ19pZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXRlbXMsIGhhc01vcmUsIHNob3dUYWdzTWFwIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9NeUxpc3Qoc2hvdzoge1xuICBpZDogc3RyaW5nO1xuICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xufSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgbXlMaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICBpZiAoIW15TGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaG93IGV4aXN0cyBpbiBvdXIgREIgKHJldXNlIGV4aXN0aW5nIG9yIGNyZWF0ZSlcbiAgbGV0IHNob3dJZCA9IHNob3cuaWQ7XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzaG93LmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOlxuICAgICAgICAgIHNob3cudG1kYl9pZCA/P1xuICAgICAgICAgIC0oXG4gICAgICAgICAgICBNYXRoLmFicyhcbiAgICAgICAgICAgICAgc2hvdy50aXRsZVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICAgICksXG4gICAgICAgIGltZGJfaWQ6IHNob3cuaW1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBzaG93SWQgPSBuZXdTaG93IS5pZDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbiAgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRtZGJTaG93VG9NeUxpc3Qoc2hvdzoge1xuICB0bWRiX2lkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBGaW5kIG9yIGNyZWF0ZSB0aGUgc2hvdyBieSB0bWRiX2lkXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBleGlzdGluZ1Nob3chLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUxpc3RUb01pbmUoc291cmNlTGlzdElkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSBzb3VyY2UgbGlzdCBpcyBwdWJsaWMgKG9yIG93bmVkIGJ5IHVzZXIpXG4gIGNvbnN0IHsgZGF0YTogc291cmNlTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCBpc19wdWJsaWMsIHVzZXJfaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzb3VyY2VMaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghc291cmNlTGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghc291cmNlTGlzdC5pc19wdWJsaWMgJiYgc291cmNlTGlzdC51c2VyX2lkICE9PSB1c2VyLmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJPd24gbGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gVmVyaWZ5IG93biBsaXN0IGlzIGVtcHR5XG4gIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpO1xuXG4gIGlmICgoY291bnQgPz8gMCkgPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjb3B5IHRvIGFuIGVtcHR5IGxpc3RcIik7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgICBzaG93X2lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgICBub3RlczogaXRlbS5ub3RlcyxcbiAgICB9KSk7XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLmluc2VydChpbnNlcnRzKTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikgdGhyb3cgbmV3IEVycm9yKGluc2VydEVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InNTQWtCc0IsdUxBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:be9c24 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addShowToList",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"605f2435efda81dd08e525867f8dd51303d334564d":"addShowToList"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("605f2435efda81dd08e525867f8dd51303d334564d", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addShowToList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG59O1xuXG4vKipcbiAqIFJldHVybnMgYW5hbHl0aWNzIGZvciBhIGxpc3QuXG4gKiAtIE5vIGxpc3RJZCDihpIgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIG93biBsaXN0LlxuICogLSBXaXRoIGxpc3RJZCDihpIgYW55IHB1YmxpYyBsaXN0IChvd25lcidzIHRhZ3MgYXJlIHNob3duKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RBbmFseXRpY3MoXG4gIGxpc3RJZD86IHN0cmluZyxcbik6IFByb21pc2U8QW5hbHl0aWNzRGF0YT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBsZXQgcmVzb2x2ZWRMaXN0SWQ6IHN0cmluZztcbiAgbGV0IG93bmVySWQ6IHN0cmluZztcblxuICBpZiAobGlzdElkKSB7XG4gICAgLy8gVmlld2luZyBzb21lb25lIGVsc2UncyAob3Igb3duKSBsaXN0IGJ5IGV4cGxpY2l0IGlkXG4gICAgY29uc3QgeyBkYXRhOiBsaXN0Um93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0c1wiKVxuICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWxpc3RSb3cpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgLy8gT25seSBhbGxvdyBhY2Nlc3MgaWYgcHVibGljIG9yIG93bmVkIGJ5IHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGlmICghbGlzdFJvdy5pc19wdWJsaWMgJiYgbGlzdFJvdy51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICAgIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0Um93LmlkO1xuICAgIG93bmVySWQgPSBsaXN0Um93LnVzZXJfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0LmlkO1xuICAgIG93bmVySWQgPSB1c2VyLmlkO1xuICB9XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIChubyBwYWdpbmF0aW9uKSDigJQgcmF0aW5nLCBzaG93X2lkLCBhZGRlZF9hdCwgZmlyc3RfYWlyX2RhdGUgdmlhIGpvaW5cbiAgdHlwZSBSYXdJdGVtID0ge1xuICAgIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgICBzaG93X2lkOiBzdHJpbmc7XG4gICAgYWRkZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gICAgc2hvd3M6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICB9IHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgeyBkYXRhOiByYXdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFxuICAgICAgXCJyYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBzaG93cyhpZCwgdGl0bGUsIHBvc3Rlcl9wYXRoLCBmaXJzdF9haXJfZGF0ZSlcIixcbiAgICApXG4gICAgLmVxKFwibGlzdF9pZFwiLCByZXNvbHZlZExpc3RJZCk7XG5cbiAgY29uc3QgaXRlbXMgPSAocmF3SXRlbXMgPz8gW10pIGFzIFJhd0l0ZW1bXTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcmF0ZWRSb3dzID0gaXRlbXMuZmlsdGVyKChyKSA9PiByLnJhdGluZyAhPT0gbnVsbCk7XG4gIGNvbnN0IHJhdGVkQ291bnQgPSByYXRlZFJvd3MubGVuZ3RoO1xuICBjb25zdCBhdmdSYXRpbmcgPVxuICAgIHJhdGVkQ291bnQgPiAwXG4gICAgICA/IE1hdGgucm91bmQoXG4gICAgICAgICAgKHJhdGVkUm93cy5yZWR1Y2UoKHMsIHIpID0+IHMgKyByLnJhdGluZyEsIDApIC8gcmF0ZWRDb3VudCkgKiAxMCxcbiAgICAgICAgKSAvIDEwXG4gICAgICA6IG51bGw7XG5cbiAgLy8gUmF0aW5nIGRpc3RyaWJ1dGlvblxuICBjb25zdCByYXRpbmdNYXA6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChsZXQgciA9IDE7IHIgPD0gMTA7IHIrKykgcmF0aW5nTWFwW3JdID0gMDtcbiAgZm9yIChjb25zdCByb3cgb2YgaXRlbXMpIHtcbiAgICBpZiAocm93LnJhdGluZyAhPT0gbnVsbClcbiAgICAgIHJhdGluZ01hcFtyb3cucmF0aW5nXSA9IChyYXRpbmdNYXBbcm93LnJhdGluZ10gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IHJhdGluZ0NvdW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICAgIHJhdGluZzogaSArIDEsXG4gICAgY291bnQ6IHJhdGluZ01hcFtpICsgMV0sXG4gIH0pKTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uIOKAlCB1c2UgdGhlIGxpc3Qgb3duZXIncyB0YWdzXG4gIGNvbnN0IHNob3dJZHMgPSBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd19pZCk7XG4gIGNvbnN0IHRhZ0NvdW50czogQW5hbHl0aWNzRGF0YVtcInRhZ0NvdW50c1wiXSA9IFtdO1xuICBjb25zdCB0YWdBdmdSYXRpbmdzOiBBbmFseXRpY3NEYXRhW1widGFnQXZnUmF0aW5nc1wiXSA9IFtdO1xuXG4gIGlmIChzaG93SWRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBbeyBkYXRhOiBzaG93VGFnUm93cyB9LCB7IGRhdGE6IHRhZ0RlZnMgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwidGFnX2lkLCBzaG93X2lkXCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgb3duZXJJZClcbiAgICAgICAgLmluKFwic2hvd19pZFwiLCBzaG93SWRzKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwiaWQsIG5hbWUsIGNvbG9yXCIpXG4gICAgICAgIC5vcihgaXNfZGVmYXVsdC5lcS50cnVlLHVzZXJfaWQuZXEuJHtvd25lcklkfWApLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGFnTWFwID0gbmV3IE1hcCgodGFnRGVmcyA/PyBbXSkubWFwKCh0KSA9PiBbdC5pZCwgdF0pKTtcbiAgICBjb25zdCBzaG93UmF0aW5nTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoKGkpID0+IFtpLnNob3dfaWQsIGkucmF0aW5nXSkpO1xuXG4gICAgY29uc3QgdGFnQ291bnRNYXA6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1cbiAgICA+ID0ge307XG4gICAgY29uc3QgdGFnUmF0aW5nQWNjOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY29sb3I6IHN0cmluZzsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHNob3dUYWdSb3dzID8/IFtdKSB7XG4gICAgICBjb25zdCB0YWcgPSB0YWdNYXAuZ2V0KHJvdy50YWdfaWQpO1xuICAgICAgaWYgKCF0YWcpIGNvbnRpbnVlO1xuXG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICBpZDogdGFnLmlkLFxuICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgICAgdGFnQ291bnRNYXBbcm93LnRhZ19pZF0uY291bnQrKztcblxuICAgICAgY29uc3QgcmF0aW5nID0gc2hvd1JhdGluZ01hcC5nZXQocm93LnNob3dfaWQpO1xuICAgICAgaWYgKHJhdGluZyAhPSBudWxsKSB7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgICAgbmFtZTogdGFnLm5hbWUsXG4gICAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5zdW0gKz0gcmF0aW5nO1xuICAgICAgICB0YWdSYXRpbmdBY2Nbcm93LnRhZ19pZF0uY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWdDb3VudHMucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnQ291bnRNYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KSxcbiAgICApO1xuICAgIHRhZ0F2Z1JhdGluZ3MucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnUmF0aW5nQWNjKVxuICAgICAgICAubWFwKCh0KSA9PiAoe1xuICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgIG5hbWU6IHQubmFtZSxcbiAgICAgICAgICBjb2xvcjogdC5jb2xvcixcbiAgICAgICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHQuc3VtIC8gdC5jb3VudCkgKiAxMCkgLyAxMCxcbiAgICAgICAgICBjb3VudDogdC5jb3VudCxcbiAgICAgICAgfSkpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2Z1JhdGluZyAtIGEuYXZnUmF0aW5nKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVGltZWxpbmU6IGdyb3VwIGJ5IGFkZGVkX2F0IG1vbnRoIChZWVlZLU1NKVxuICBjb25zdCBtb250aGx5TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5hZGRlZF9hdCkgY29udGludWU7XG4gICAgY29uc3QgbW9udGggPSBpdGVtLmFkZGVkX2F0LnNsaWNlKDAsIDcpO1xuICAgIG1vbnRobHlNYXBbbW9udGhdID0gKG1vbnRobHlNYXBbbW9udGhdID8/IDApICsgMTtcbiAgfVxuICBjb25zdCBtb250aGx5QWRkZWQgPSBPYmplY3QuZW50cmllcyhtb250aGx5TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFttb250aCwgY291bnRdKSA9PiAoeyBtb250aCwgY291bnQgfSkpO1xuXG4gIC8vIERlY2FkZSBkaXN0cmlidXRpb246IGdyb3VwIGJ5IGRlY2FkZSBvZiBmaXJzdF9haXJfZGF0ZVxuICBjb25zdCBkZWNhZGVNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgeWVhckNvdW50TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGNvbnN0IGRlY2FkZVJhdGluZ0FjYzogUmVjb3JkPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PiA9IHt9O1xuICBjb25zdCB5ZWFyUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlyc3RBaXJEYXRlID0gaXRlbS5zaG93cz8uZmlyc3RfYWlyX2RhdGU7XG4gICAgaWYgKCFmaXJzdEFpckRhdGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHllYXIgPSBwYXJzZUludChmaXJzdEFpckRhdGUuc2xpY2UoMCwgNCksIDEwKTtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgeWVhciA8IDE5MDApIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlY2FkZSA9IGAke01hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwfXNgO1xuICAgIGNvbnN0IHllYXJTdHIgPSBTdHJpbmcoeWVhcik7XG5cbiAgICBkZWNhZGVNYXBbZGVjYWRlXSA9IChkZWNhZGVNYXBbZGVjYWRlXSA/PyAwKSArIDE7XG4gICAgeWVhckNvdW50TWFwW3llYXJTdHJdID0gKHllYXJDb3VudE1hcFt5ZWFyU3RyXSA/PyAwKSArIDE7XG5cbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdID8/PSB7IHN1bTogMCwgY291bnQ6IDAgfTtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLmNvdW50Kys7XG5cbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXS5zdW0gKz0gaXRlbS5yYXRpbmc7XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjYWRlQ291bnRzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlTWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIGNvdW50XSkgPT4gKHsgZGVjYWRlLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgeWVhckNvdW50cyA9IE9iamVjdC5lbnRyaWVzKHllYXJDb3VudE1hcClcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgY291bnRdKSA9PiAoeyB5ZWFyLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgZGVjYWRlQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKGRlY2FkZVJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbZGVjYWRlLCB7IHN1bSwgY291bnQgfV0pID0+ICh7XG4gICAgICBkZWNhZGUsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICBjb25zdCB5ZWFyQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKHllYXJSYXRpbmdBY2MpXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW3llYXIsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIHllYXIsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICAvLyBCdWlsZCBzaG93IGxvb2t1cCBtYXBzIGZvciBtb2RhbCBkcmlsbC10aHJvdWdoXG4gIGNvbnN0IHNob3dzQnlSYXRpbmc6IFJlY29yZDxudW1iZXIsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGNvbnN0IHNob3dzQnlZZWFyOiBSZWNvcmQ8c3RyaW5nLCBTaG93U3VtbWFyeVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBzdW1tYXJ5OiBTaG93U3VtbWFyeSA9IHtcbiAgICAgIGlkOiBpdGVtLnNob3dzPy5pZCA/PyBpdGVtLnNob3dfaWQsXG4gICAgICB0aXRsZTogaXRlbS5zaG93cz8udGl0bGUgPz8gXCJcIixcbiAgICAgIHBvc3Rlcl9wYXRoOiBpdGVtLnNob3dzPy5wb3N0ZXJfcGF0aCA/PyBudWxsLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZSA/PyBudWxsLFxuICAgIH07XG4gICAgaWYgKGl0ZW0ucmF0aW5nICE9PSBudWxsKSB7XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXSA/Pz0gW107XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXS5wdXNoKHN1bW1hcnkpO1xuICAgIH1cbiAgICBjb25zdCBmYWQgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoZmFkKSB7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZmFkLnNsaWNlKDAsIDQpLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKHkpICYmIHkgPj0gMTkwMCkge1xuICAgICAgICBjb25zdCB5ciA9IFN0cmluZyh5KTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdID8/PSBbXTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdLnB1c2goc3VtbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbENvdW50LFxuICAgIHJhdGVkQ291bnQsXG4gICAgYXZnUmF0aW5nLFxuICAgIHJhdGluZ0NvdW50cyxcbiAgICB0YWdDb3VudHMsXG4gICAgdGFnQXZnUmF0aW5ncyxcbiAgICBtb250aGx5QWRkZWQsXG4gICAgZGVjYWRlQ291bnRzLFxuICAgIHllYXJDb3VudHMsXG4gICAgZGVjYWRlQXZnUmF0aW5ncyxcbiAgICB5ZWFyQXZnUmF0aW5ncyxcbiAgICBzaG93c0J5UmF0aW5nLFxuICAgIHNob3dzQnlZZWFyLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0SXRlbVdpdGhTaG93ID0ge1xuICBpZDogc3RyaW5nO1xuICBsaXN0X2lkOiBzdHJpbmc7XG4gIHNob3dfaWQ6IHN0cmluZztcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBhZGRlZF9hdDogc3RyaW5nO1xuICBub3Rlczogc3RyaW5nIHwgbnVsbDtcbiAgc2hvd3M6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gICAgaW1kYl9pZDogc3RyaW5nIHwgbnVsbDtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xuICAgIHRtZGJfZmV0Y2hlZDogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0SXRlbXNQYWdlKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZSA9IDUwLFxuKTogUHJvbWlzZTx7XG4gIGl0ZW1zOiBMaXN0SXRlbVdpdGhTaG93W107XG4gIGhhc01vcmU6IGJvb2xlYW47XG4gIHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG59PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGNvbnN0IHsgZGF0YTogbGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFsaXN0LmlzX3B1YmxpYyAmJiBsaXN0LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBmcm9tID0gcGFnZSAqIHBhZ2VTaXplO1xuICBjb25zdCB0byA9IGZyb20gKyBwYWdlU2l6ZSAtIDE7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKiwgc2hvd3MoKilcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIGxpc3RJZClcbiAgICAub3JkZXIoXCJyYXRpbmdcIiwgeyBhc2NlbmRpbmc6IGZhbHNlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICBjb25zdCBpdGVtcyA9IChkYXRhID8/IFtdKSBhcyB1bmtub3duIGFzIExpc3RJdGVtV2l0aFNob3dbXTtcbiAgY29uc3QgaGFzTW9yZSA9IGl0ZW1zLmxlbmd0aCA9PT0gcGFnZVNpemU7XG5cbiAgY29uc3Qgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICBpZiAodXNlciAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeyBkYXRhOiBzaG93VGFncyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgdGFnX2lkXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgICAuaW4oXG4gICAgICAgIFwic2hvd19pZFwiLFxuICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd3MuaWQpLFxuICAgICAgKTtcblxuICAgIGZvciAoY29uc3Qgc3Qgb2Ygc2hvd1RhZ3MgPz8gW10pIHtcbiAgICAgIGlmICghc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0pIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdID0gW107XG4gICAgICBzaG93VGFnc01hcFtzdC5zaG93X2lkXS5wdXNoKHN0LnRhZ19pZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXRlbXMsIGhhc01vcmUsIHNob3dUYWdzTWFwIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9NeUxpc3Qoc2hvdzoge1xuICBpZDogc3RyaW5nO1xuICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xufSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgbXlMaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICBpZiAoIW15TGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaG93IGV4aXN0cyBpbiBvdXIgREIgKHJldXNlIGV4aXN0aW5nIG9yIGNyZWF0ZSlcbiAgbGV0IHNob3dJZCA9IHNob3cuaWQ7XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzaG93LmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOlxuICAgICAgICAgIHNob3cudG1kYl9pZCA/P1xuICAgICAgICAgIC0oXG4gICAgICAgICAgICBNYXRoLmFicyhcbiAgICAgICAgICAgICAgc2hvdy50aXRsZVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICAgICksXG4gICAgICAgIGltZGJfaWQ6IHNob3cuaW1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBzaG93SWQgPSBuZXdTaG93IS5pZDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbiAgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRtZGJTaG93VG9NeUxpc3Qoc2hvdzoge1xuICB0bWRiX2lkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBGaW5kIG9yIGNyZWF0ZSB0aGUgc2hvdyBieSB0bWRiX2lkXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBleGlzdGluZ1Nob3chLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUxpc3RUb01pbmUoc291cmNlTGlzdElkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSBzb3VyY2UgbGlzdCBpcyBwdWJsaWMgKG9yIG93bmVkIGJ5IHVzZXIpXG4gIGNvbnN0IHsgZGF0YTogc291cmNlTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCBpc19wdWJsaWMsIHVzZXJfaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzb3VyY2VMaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghc291cmNlTGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghc291cmNlTGlzdC5pc19wdWJsaWMgJiYgc291cmNlTGlzdC51c2VyX2lkICE9PSB1c2VyLmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJPd24gbGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gVmVyaWZ5IG93biBsaXN0IGlzIGVtcHR5XG4gIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpO1xuXG4gIGlmICgoY291bnQgPz8gMCkgPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjb3B5IHRvIGFuIGVtcHR5IGxpc3RcIik7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgICBzaG93X2lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgICBub3RlczogaXRlbS5ub3RlcyxcbiAgICB9KSk7XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLmluc2VydChpbnNlcnRzKTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikgdGhyb3cgbmV3IEVycm9yKGluc2VydEVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlTQXVDc0IsMExBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:e12b52 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "removeShowFromList",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60500296d69c841163099142e2c7aa605ff7742051":"removeShowFromList"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60500296d69c841163099142e2c7aa605ff7742051", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "removeShowFromList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG59O1xuXG4vKipcbiAqIFJldHVybnMgYW5hbHl0aWNzIGZvciBhIGxpc3QuXG4gKiAtIE5vIGxpc3RJZCDihpIgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIG93biBsaXN0LlxuICogLSBXaXRoIGxpc3RJZCDihpIgYW55IHB1YmxpYyBsaXN0IChvd25lcidzIHRhZ3MgYXJlIHNob3duKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RBbmFseXRpY3MoXG4gIGxpc3RJZD86IHN0cmluZyxcbik6IFByb21pc2U8QW5hbHl0aWNzRGF0YT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBsZXQgcmVzb2x2ZWRMaXN0SWQ6IHN0cmluZztcbiAgbGV0IG93bmVySWQ6IHN0cmluZztcblxuICBpZiAobGlzdElkKSB7XG4gICAgLy8gVmlld2luZyBzb21lb25lIGVsc2UncyAob3Igb3duKSBsaXN0IGJ5IGV4cGxpY2l0IGlkXG4gICAgY29uc3QgeyBkYXRhOiBsaXN0Um93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0c1wiKVxuICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWxpc3RSb3cpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgLy8gT25seSBhbGxvdyBhY2Nlc3MgaWYgcHVibGljIG9yIG93bmVkIGJ5IHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGlmICghbGlzdFJvdy5pc19wdWJsaWMgJiYgbGlzdFJvdy51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICAgIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0Um93LmlkO1xuICAgIG93bmVySWQgPSBsaXN0Um93LnVzZXJfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0LmlkO1xuICAgIG93bmVySWQgPSB1c2VyLmlkO1xuICB9XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIChubyBwYWdpbmF0aW9uKSDigJQgcmF0aW5nLCBzaG93X2lkLCBhZGRlZF9hdCwgZmlyc3RfYWlyX2RhdGUgdmlhIGpvaW5cbiAgdHlwZSBSYXdJdGVtID0ge1xuICAgIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgICBzaG93X2lkOiBzdHJpbmc7XG4gICAgYWRkZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gICAgc2hvd3M6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICB9IHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgeyBkYXRhOiByYXdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFxuICAgICAgXCJyYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBzaG93cyhpZCwgdGl0bGUsIHBvc3Rlcl9wYXRoLCBmaXJzdF9haXJfZGF0ZSlcIixcbiAgICApXG4gICAgLmVxKFwibGlzdF9pZFwiLCByZXNvbHZlZExpc3RJZCk7XG5cbiAgY29uc3QgaXRlbXMgPSAocmF3SXRlbXMgPz8gW10pIGFzIFJhd0l0ZW1bXTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcmF0ZWRSb3dzID0gaXRlbXMuZmlsdGVyKChyKSA9PiByLnJhdGluZyAhPT0gbnVsbCk7XG4gIGNvbnN0IHJhdGVkQ291bnQgPSByYXRlZFJvd3MubGVuZ3RoO1xuICBjb25zdCBhdmdSYXRpbmcgPVxuICAgIHJhdGVkQ291bnQgPiAwXG4gICAgICA/IE1hdGgucm91bmQoXG4gICAgICAgICAgKHJhdGVkUm93cy5yZWR1Y2UoKHMsIHIpID0+IHMgKyByLnJhdGluZyEsIDApIC8gcmF0ZWRDb3VudCkgKiAxMCxcbiAgICAgICAgKSAvIDEwXG4gICAgICA6IG51bGw7XG5cbiAgLy8gUmF0aW5nIGRpc3RyaWJ1dGlvblxuICBjb25zdCByYXRpbmdNYXA6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChsZXQgciA9IDE7IHIgPD0gMTA7IHIrKykgcmF0aW5nTWFwW3JdID0gMDtcbiAgZm9yIChjb25zdCByb3cgb2YgaXRlbXMpIHtcbiAgICBpZiAocm93LnJhdGluZyAhPT0gbnVsbClcbiAgICAgIHJhdGluZ01hcFtyb3cucmF0aW5nXSA9IChyYXRpbmdNYXBbcm93LnJhdGluZ10gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IHJhdGluZ0NvdW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICAgIHJhdGluZzogaSArIDEsXG4gICAgY291bnQ6IHJhdGluZ01hcFtpICsgMV0sXG4gIH0pKTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uIOKAlCB1c2UgdGhlIGxpc3Qgb3duZXIncyB0YWdzXG4gIGNvbnN0IHNob3dJZHMgPSBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd19pZCk7XG4gIGNvbnN0IHRhZ0NvdW50czogQW5hbHl0aWNzRGF0YVtcInRhZ0NvdW50c1wiXSA9IFtdO1xuICBjb25zdCB0YWdBdmdSYXRpbmdzOiBBbmFseXRpY3NEYXRhW1widGFnQXZnUmF0aW5nc1wiXSA9IFtdO1xuXG4gIGlmIChzaG93SWRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBbeyBkYXRhOiBzaG93VGFnUm93cyB9LCB7IGRhdGE6IHRhZ0RlZnMgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwidGFnX2lkLCBzaG93X2lkXCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgb3duZXJJZClcbiAgICAgICAgLmluKFwic2hvd19pZFwiLCBzaG93SWRzKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwiaWQsIG5hbWUsIGNvbG9yXCIpXG4gICAgICAgIC5vcihgaXNfZGVmYXVsdC5lcS50cnVlLHVzZXJfaWQuZXEuJHtvd25lcklkfWApLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGFnTWFwID0gbmV3IE1hcCgodGFnRGVmcyA/PyBbXSkubWFwKCh0KSA9PiBbdC5pZCwgdF0pKTtcbiAgICBjb25zdCBzaG93UmF0aW5nTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoKGkpID0+IFtpLnNob3dfaWQsIGkucmF0aW5nXSkpO1xuXG4gICAgY29uc3QgdGFnQ291bnRNYXA6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1cbiAgICA+ID0ge307XG4gICAgY29uc3QgdGFnUmF0aW5nQWNjOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY29sb3I6IHN0cmluZzsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHNob3dUYWdSb3dzID8/IFtdKSB7XG4gICAgICBjb25zdCB0YWcgPSB0YWdNYXAuZ2V0KHJvdy50YWdfaWQpO1xuICAgICAgaWYgKCF0YWcpIGNvbnRpbnVlO1xuXG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICBpZDogdGFnLmlkLFxuICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgICAgdGFnQ291bnRNYXBbcm93LnRhZ19pZF0uY291bnQrKztcblxuICAgICAgY29uc3QgcmF0aW5nID0gc2hvd1JhdGluZ01hcC5nZXQocm93LnNob3dfaWQpO1xuICAgICAgaWYgKHJhdGluZyAhPSBudWxsKSB7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgICAgbmFtZTogdGFnLm5hbWUsXG4gICAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5zdW0gKz0gcmF0aW5nO1xuICAgICAgICB0YWdSYXRpbmdBY2Nbcm93LnRhZ19pZF0uY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWdDb3VudHMucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnQ291bnRNYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KSxcbiAgICApO1xuICAgIHRhZ0F2Z1JhdGluZ3MucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnUmF0aW5nQWNjKVxuICAgICAgICAubWFwKCh0KSA9PiAoe1xuICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgIG5hbWU6IHQubmFtZSxcbiAgICAgICAgICBjb2xvcjogdC5jb2xvcixcbiAgICAgICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHQuc3VtIC8gdC5jb3VudCkgKiAxMCkgLyAxMCxcbiAgICAgICAgICBjb3VudDogdC5jb3VudCxcbiAgICAgICAgfSkpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2Z1JhdGluZyAtIGEuYXZnUmF0aW5nKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVGltZWxpbmU6IGdyb3VwIGJ5IGFkZGVkX2F0IG1vbnRoIChZWVlZLU1NKVxuICBjb25zdCBtb250aGx5TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5hZGRlZF9hdCkgY29udGludWU7XG4gICAgY29uc3QgbW9udGggPSBpdGVtLmFkZGVkX2F0LnNsaWNlKDAsIDcpO1xuICAgIG1vbnRobHlNYXBbbW9udGhdID0gKG1vbnRobHlNYXBbbW9udGhdID8/IDApICsgMTtcbiAgfVxuICBjb25zdCBtb250aGx5QWRkZWQgPSBPYmplY3QuZW50cmllcyhtb250aGx5TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFttb250aCwgY291bnRdKSA9PiAoeyBtb250aCwgY291bnQgfSkpO1xuXG4gIC8vIERlY2FkZSBkaXN0cmlidXRpb246IGdyb3VwIGJ5IGRlY2FkZSBvZiBmaXJzdF9haXJfZGF0ZVxuICBjb25zdCBkZWNhZGVNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgeWVhckNvdW50TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGNvbnN0IGRlY2FkZVJhdGluZ0FjYzogUmVjb3JkPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PiA9IHt9O1xuICBjb25zdCB5ZWFyUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlyc3RBaXJEYXRlID0gaXRlbS5zaG93cz8uZmlyc3RfYWlyX2RhdGU7XG4gICAgaWYgKCFmaXJzdEFpckRhdGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHllYXIgPSBwYXJzZUludChmaXJzdEFpckRhdGUuc2xpY2UoMCwgNCksIDEwKTtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgeWVhciA8IDE5MDApIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlY2FkZSA9IGAke01hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwfXNgO1xuICAgIGNvbnN0IHllYXJTdHIgPSBTdHJpbmcoeWVhcik7XG5cbiAgICBkZWNhZGVNYXBbZGVjYWRlXSA9IChkZWNhZGVNYXBbZGVjYWRlXSA/PyAwKSArIDE7XG4gICAgeWVhckNvdW50TWFwW3llYXJTdHJdID0gKHllYXJDb3VudE1hcFt5ZWFyU3RyXSA/PyAwKSArIDE7XG5cbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdID8/PSB7IHN1bTogMCwgY291bnQ6IDAgfTtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLmNvdW50Kys7XG5cbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXS5zdW0gKz0gaXRlbS5yYXRpbmc7XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjYWRlQ291bnRzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlTWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIGNvdW50XSkgPT4gKHsgZGVjYWRlLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgeWVhckNvdW50cyA9IE9iamVjdC5lbnRyaWVzKHllYXJDb3VudE1hcClcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgY291bnRdKSA9PiAoeyB5ZWFyLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgZGVjYWRlQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKGRlY2FkZVJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbZGVjYWRlLCB7IHN1bSwgY291bnQgfV0pID0+ICh7XG4gICAgICBkZWNhZGUsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICBjb25zdCB5ZWFyQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKHllYXJSYXRpbmdBY2MpXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW3llYXIsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIHllYXIsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICAvLyBCdWlsZCBzaG93IGxvb2t1cCBtYXBzIGZvciBtb2RhbCBkcmlsbC10aHJvdWdoXG4gIGNvbnN0IHNob3dzQnlSYXRpbmc6IFJlY29yZDxudW1iZXIsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGNvbnN0IHNob3dzQnlZZWFyOiBSZWNvcmQ8c3RyaW5nLCBTaG93U3VtbWFyeVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBzdW1tYXJ5OiBTaG93U3VtbWFyeSA9IHtcbiAgICAgIGlkOiBpdGVtLnNob3dzPy5pZCA/PyBpdGVtLnNob3dfaWQsXG4gICAgICB0aXRsZTogaXRlbS5zaG93cz8udGl0bGUgPz8gXCJcIixcbiAgICAgIHBvc3Rlcl9wYXRoOiBpdGVtLnNob3dzPy5wb3N0ZXJfcGF0aCA/PyBudWxsLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZSA/PyBudWxsLFxuICAgIH07XG4gICAgaWYgKGl0ZW0ucmF0aW5nICE9PSBudWxsKSB7XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXSA/Pz0gW107XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXS5wdXNoKHN1bW1hcnkpO1xuICAgIH1cbiAgICBjb25zdCBmYWQgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoZmFkKSB7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZmFkLnNsaWNlKDAsIDQpLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKHkpICYmIHkgPj0gMTkwMCkge1xuICAgICAgICBjb25zdCB5ciA9IFN0cmluZyh5KTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdID8/PSBbXTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdLnB1c2goc3VtbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbENvdW50LFxuICAgIHJhdGVkQ291bnQsXG4gICAgYXZnUmF0aW5nLFxuICAgIHJhdGluZ0NvdW50cyxcbiAgICB0YWdDb3VudHMsXG4gICAgdGFnQXZnUmF0aW5ncyxcbiAgICBtb250aGx5QWRkZWQsXG4gICAgZGVjYWRlQ291bnRzLFxuICAgIHllYXJDb3VudHMsXG4gICAgZGVjYWRlQXZnUmF0aW5ncyxcbiAgICB5ZWFyQXZnUmF0aW5ncyxcbiAgICBzaG93c0J5UmF0aW5nLFxuICAgIHNob3dzQnlZZWFyLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0SXRlbVdpdGhTaG93ID0ge1xuICBpZDogc3RyaW5nO1xuICBsaXN0X2lkOiBzdHJpbmc7XG4gIHNob3dfaWQ6IHN0cmluZztcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBhZGRlZF9hdDogc3RyaW5nO1xuICBub3Rlczogc3RyaW5nIHwgbnVsbDtcbiAgc2hvd3M6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gICAgaW1kYl9pZDogc3RyaW5nIHwgbnVsbDtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xuICAgIHRtZGJfZmV0Y2hlZDogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0SXRlbXNQYWdlKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZSA9IDUwLFxuKTogUHJvbWlzZTx7XG4gIGl0ZW1zOiBMaXN0SXRlbVdpdGhTaG93W107XG4gIGhhc01vcmU6IGJvb2xlYW47XG4gIHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG59PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGNvbnN0IHsgZGF0YTogbGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFsaXN0LmlzX3B1YmxpYyAmJiBsaXN0LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBmcm9tID0gcGFnZSAqIHBhZ2VTaXplO1xuICBjb25zdCB0byA9IGZyb20gKyBwYWdlU2l6ZSAtIDE7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKiwgc2hvd3MoKilcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIGxpc3RJZClcbiAgICAub3JkZXIoXCJyYXRpbmdcIiwgeyBhc2NlbmRpbmc6IGZhbHNlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICBjb25zdCBpdGVtcyA9IChkYXRhID8/IFtdKSBhcyB1bmtub3duIGFzIExpc3RJdGVtV2l0aFNob3dbXTtcbiAgY29uc3QgaGFzTW9yZSA9IGl0ZW1zLmxlbmd0aCA9PT0gcGFnZVNpemU7XG5cbiAgY29uc3Qgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICBpZiAodXNlciAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeyBkYXRhOiBzaG93VGFncyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgdGFnX2lkXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgICAuaW4oXG4gICAgICAgIFwic2hvd19pZFwiLFxuICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd3MuaWQpLFxuICAgICAgKTtcblxuICAgIGZvciAoY29uc3Qgc3Qgb2Ygc2hvd1RhZ3MgPz8gW10pIHtcbiAgICAgIGlmICghc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0pIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdID0gW107XG4gICAgICBzaG93VGFnc01hcFtzdC5zaG93X2lkXS5wdXNoKHN0LnRhZ19pZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXRlbXMsIGhhc01vcmUsIHNob3dUYWdzTWFwIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9NeUxpc3Qoc2hvdzoge1xuICBpZDogc3RyaW5nO1xuICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xufSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgbXlMaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICBpZiAoIW15TGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaG93IGV4aXN0cyBpbiBvdXIgREIgKHJldXNlIGV4aXN0aW5nIG9yIGNyZWF0ZSlcbiAgbGV0IHNob3dJZCA9IHNob3cuaWQ7XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzaG93LmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOlxuICAgICAgICAgIHNob3cudG1kYl9pZCA/P1xuICAgICAgICAgIC0oXG4gICAgICAgICAgICBNYXRoLmFicyhcbiAgICAgICAgICAgICAgc2hvdy50aXRsZVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICAgICksXG4gICAgICAgIGltZGJfaWQ6IHNob3cuaW1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBzaG93SWQgPSBuZXdTaG93IS5pZDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbiAgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRtZGJTaG93VG9NeUxpc3Qoc2hvdzoge1xuICB0bWRiX2lkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBGaW5kIG9yIGNyZWF0ZSB0aGUgc2hvdyBieSB0bWRiX2lkXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBleGlzdGluZ1Nob3chLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUxpc3RUb01pbmUoc291cmNlTGlzdElkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSBzb3VyY2UgbGlzdCBpcyBwdWJsaWMgKG9yIG93bmVkIGJ5IHVzZXIpXG4gIGNvbnN0IHsgZGF0YTogc291cmNlTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCBpc19wdWJsaWMsIHVzZXJfaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzb3VyY2VMaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghc291cmNlTGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghc291cmNlTGlzdC5pc19wdWJsaWMgJiYgc291cmNlTGlzdC51c2VyX2lkICE9PSB1c2VyLmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJPd24gbGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gVmVyaWZ5IG93biBsaXN0IGlzIGVtcHR5XG4gIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpO1xuXG4gIGlmICgoY291bnQgPz8gMCkgPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjb3B5IHRvIGFuIGVtcHR5IGxpc3RcIik7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgICBzaG93X2lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgICBub3RlczogaXRlbS5ub3RlcyxcbiAgICB9KSk7XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLmluc2VydChpbnNlcnRzKTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikgdGhyb3cgbmV3IEVycm9yKGluc2VydEVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjhTQThHc0IsK0xBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:8ed39d [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateShowRating",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"70799100106412fb8a8f21e3ba730afee8596a92a7":"updateShowRating"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("70799100106412fb8a8f21e3ba730afee8596a92a7", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateShowRating");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG59O1xuXG4vKipcbiAqIFJldHVybnMgYW5hbHl0aWNzIGZvciBhIGxpc3QuXG4gKiAtIE5vIGxpc3RJZCDihpIgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIG93biBsaXN0LlxuICogLSBXaXRoIGxpc3RJZCDihpIgYW55IHB1YmxpYyBsaXN0IChvd25lcidzIHRhZ3MgYXJlIHNob3duKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RBbmFseXRpY3MoXG4gIGxpc3RJZD86IHN0cmluZyxcbik6IFByb21pc2U8QW5hbHl0aWNzRGF0YT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBsZXQgcmVzb2x2ZWRMaXN0SWQ6IHN0cmluZztcbiAgbGV0IG93bmVySWQ6IHN0cmluZztcblxuICBpZiAobGlzdElkKSB7XG4gICAgLy8gVmlld2luZyBzb21lb25lIGVsc2UncyAob3Igb3duKSBsaXN0IGJ5IGV4cGxpY2l0IGlkXG4gICAgY29uc3QgeyBkYXRhOiBsaXN0Um93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0c1wiKVxuICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWxpc3RSb3cpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgLy8gT25seSBhbGxvdyBhY2Nlc3MgaWYgcHVibGljIG9yIG93bmVkIGJ5IHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGlmICghbGlzdFJvdy5pc19wdWJsaWMgJiYgbGlzdFJvdy51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICAgIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0Um93LmlkO1xuICAgIG93bmVySWQgPSBsaXN0Um93LnVzZXJfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0LmlkO1xuICAgIG93bmVySWQgPSB1c2VyLmlkO1xuICB9XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIChubyBwYWdpbmF0aW9uKSDigJQgcmF0aW5nLCBzaG93X2lkLCBhZGRlZF9hdCwgZmlyc3RfYWlyX2RhdGUgdmlhIGpvaW5cbiAgdHlwZSBSYXdJdGVtID0ge1xuICAgIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgICBzaG93X2lkOiBzdHJpbmc7XG4gICAgYWRkZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gICAgc2hvd3M6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICB9IHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgeyBkYXRhOiByYXdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFxuICAgICAgXCJyYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBzaG93cyhpZCwgdGl0bGUsIHBvc3Rlcl9wYXRoLCBmaXJzdF9haXJfZGF0ZSlcIixcbiAgICApXG4gICAgLmVxKFwibGlzdF9pZFwiLCByZXNvbHZlZExpc3RJZCk7XG5cbiAgY29uc3QgaXRlbXMgPSAocmF3SXRlbXMgPz8gW10pIGFzIFJhd0l0ZW1bXTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcmF0ZWRSb3dzID0gaXRlbXMuZmlsdGVyKChyKSA9PiByLnJhdGluZyAhPT0gbnVsbCk7XG4gIGNvbnN0IHJhdGVkQ291bnQgPSByYXRlZFJvd3MubGVuZ3RoO1xuICBjb25zdCBhdmdSYXRpbmcgPVxuICAgIHJhdGVkQ291bnQgPiAwXG4gICAgICA/IE1hdGgucm91bmQoXG4gICAgICAgICAgKHJhdGVkUm93cy5yZWR1Y2UoKHMsIHIpID0+IHMgKyByLnJhdGluZyEsIDApIC8gcmF0ZWRDb3VudCkgKiAxMCxcbiAgICAgICAgKSAvIDEwXG4gICAgICA6IG51bGw7XG5cbiAgLy8gUmF0aW5nIGRpc3RyaWJ1dGlvblxuICBjb25zdCByYXRpbmdNYXA6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChsZXQgciA9IDE7IHIgPD0gMTA7IHIrKykgcmF0aW5nTWFwW3JdID0gMDtcbiAgZm9yIChjb25zdCByb3cgb2YgaXRlbXMpIHtcbiAgICBpZiAocm93LnJhdGluZyAhPT0gbnVsbClcbiAgICAgIHJhdGluZ01hcFtyb3cucmF0aW5nXSA9IChyYXRpbmdNYXBbcm93LnJhdGluZ10gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IHJhdGluZ0NvdW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICAgIHJhdGluZzogaSArIDEsXG4gICAgY291bnQ6IHJhdGluZ01hcFtpICsgMV0sXG4gIH0pKTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uIOKAlCB1c2UgdGhlIGxpc3Qgb3duZXIncyB0YWdzXG4gIGNvbnN0IHNob3dJZHMgPSBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd19pZCk7XG4gIGNvbnN0IHRhZ0NvdW50czogQW5hbHl0aWNzRGF0YVtcInRhZ0NvdW50c1wiXSA9IFtdO1xuICBjb25zdCB0YWdBdmdSYXRpbmdzOiBBbmFseXRpY3NEYXRhW1widGFnQXZnUmF0aW5nc1wiXSA9IFtdO1xuXG4gIGlmIChzaG93SWRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBbeyBkYXRhOiBzaG93VGFnUm93cyB9LCB7IGRhdGE6IHRhZ0RlZnMgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwidGFnX2lkLCBzaG93X2lkXCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgb3duZXJJZClcbiAgICAgICAgLmluKFwic2hvd19pZFwiLCBzaG93SWRzKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwiaWQsIG5hbWUsIGNvbG9yXCIpXG4gICAgICAgIC5vcihgaXNfZGVmYXVsdC5lcS50cnVlLHVzZXJfaWQuZXEuJHtvd25lcklkfWApLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGFnTWFwID0gbmV3IE1hcCgodGFnRGVmcyA/PyBbXSkubWFwKCh0KSA9PiBbdC5pZCwgdF0pKTtcbiAgICBjb25zdCBzaG93UmF0aW5nTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoKGkpID0+IFtpLnNob3dfaWQsIGkucmF0aW5nXSkpO1xuXG4gICAgY29uc3QgdGFnQ291bnRNYXA6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1cbiAgICA+ID0ge307XG4gICAgY29uc3QgdGFnUmF0aW5nQWNjOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY29sb3I6IHN0cmluZzsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHNob3dUYWdSb3dzID8/IFtdKSB7XG4gICAgICBjb25zdCB0YWcgPSB0YWdNYXAuZ2V0KHJvdy50YWdfaWQpO1xuICAgICAgaWYgKCF0YWcpIGNvbnRpbnVlO1xuXG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICBpZDogdGFnLmlkLFxuICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgICAgdGFnQ291bnRNYXBbcm93LnRhZ19pZF0uY291bnQrKztcblxuICAgICAgY29uc3QgcmF0aW5nID0gc2hvd1JhdGluZ01hcC5nZXQocm93LnNob3dfaWQpO1xuICAgICAgaWYgKHJhdGluZyAhPSBudWxsKSB7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgICAgbmFtZTogdGFnLm5hbWUsXG4gICAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5zdW0gKz0gcmF0aW5nO1xuICAgICAgICB0YWdSYXRpbmdBY2Nbcm93LnRhZ19pZF0uY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWdDb3VudHMucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnQ291bnRNYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KSxcbiAgICApO1xuICAgIHRhZ0F2Z1JhdGluZ3MucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnUmF0aW5nQWNjKVxuICAgICAgICAubWFwKCh0KSA9PiAoe1xuICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgIG5hbWU6IHQubmFtZSxcbiAgICAgICAgICBjb2xvcjogdC5jb2xvcixcbiAgICAgICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHQuc3VtIC8gdC5jb3VudCkgKiAxMCkgLyAxMCxcbiAgICAgICAgICBjb3VudDogdC5jb3VudCxcbiAgICAgICAgfSkpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2Z1JhdGluZyAtIGEuYXZnUmF0aW5nKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVGltZWxpbmU6IGdyb3VwIGJ5IGFkZGVkX2F0IG1vbnRoIChZWVlZLU1NKVxuICBjb25zdCBtb250aGx5TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5hZGRlZF9hdCkgY29udGludWU7XG4gICAgY29uc3QgbW9udGggPSBpdGVtLmFkZGVkX2F0LnNsaWNlKDAsIDcpO1xuICAgIG1vbnRobHlNYXBbbW9udGhdID0gKG1vbnRobHlNYXBbbW9udGhdID8/IDApICsgMTtcbiAgfVxuICBjb25zdCBtb250aGx5QWRkZWQgPSBPYmplY3QuZW50cmllcyhtb250aGx5TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFttb250aCwgY291bnRdKSA9PiAoeyBtb250aCwgY291bnQgfSkpO1xuXG4gIC8vIERlY2FkZSBkaXN0cmlidXRpb246IGdyb3VwIGJ5IGRlY2FkZSBvZiBmaXJzdF9haXJfZGF0ZVxuICBjb25zdCBkZWNhZGVNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgeWVhckNvdW50TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGNvbnN0IGRlY2FkZVJhdGluZ0FjYzogUmVjb3JkPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PiA9IHt9O1xuICBjb25zdCB5ZWFyUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlyc3RBaXJEYXRlID0gaXRlbS5zaG93cz8uZmlyc3RfYWlyX2RhdGU7XG4gICAgaWYgKCFmaXJzdEFpckRhdGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHllYXIgPSBwYXJzZUludChmaXJzdEFpckRhdGUuc2xpY2UoMCwgNCksIDEwKTtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgeWVhciA8IDE5MDApIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlY2FkZSA9IGAke01hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwfXNgO1xuICAgIGNvbnN0IHllYXJTdHIgPSBTdHJpbmcoeWVhcik7XG5cbiAgICBkZWNhZGVNYXBbZGVjYWRlXSA9IChkZWNhZGVNYXBbZGVjYWRlXSA/PyAwKSArIDE7XG4gICAgeWVhckNvdW50TWFwW3llYXJTdHJdID0gKHllYXJDb3VudE1hcFt5ZWFyU3RyXSA/PyAwKSArIDE7XG5cbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdID8/PSB7IHN1bTogMCwgY291bnQ6IDAgfTtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLmNvdW50Kys7XG5cbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXS5zdW0gKz0gaXRlbS5yYXRpbmc7XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjYWRlQ291bnRzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlTWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIGNvdW50XSkgPT4gKHsgZGVjYWRlLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgeWVhckNvdW50cyA9IE9iamVjdC5lbnRyaWVzKHllYXJDb3VudE1hcClcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgY291bnRdKSA9PiAoeyB5ZWFyLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgZGVjYWRlQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKGRlY2FkZVJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbZGVjYWRlLCB7IHN1bSwgY291bnQgfV0pID0+ICh7XG4gICAgICBkZWNhZGUsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICBjb25zdCB5ZWFyQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKHllYXJSYXRpbmdBY2MpXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW3llYXIsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIHllYXIsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICAvLyBCdWlsZCBzaG93IGxvb2t1cCBtYXBzIGZvciBtb2RhbCBkcmlsbC10aHJvdWdoXG4gIGNvbnN0IHNob3dzQnlSYXRpbmc6IFJlY29yZDxudW1iZXIsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGNvbnN0IHNob3dzQnlZZWFyOiBSZWNvcmQ8c3RyaW5nLCBTaG93U3VtbWFyeVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBzdW1tYXJ5OiBTaG93U3VtbWFyeSA9IHtcbiAgICAgIGlkOiBpdGVtLnNob3dzPy5pZCA/PyBpdGVtLnNob3dfaWQsXG4gICAgICB0aXRsZTogaXRlbS5zaG93cz8udGl0bGUgPz8gXCJcIixcbiAgICAgIHBvc3Rlcl9wYXRoOiBpdGVtLnNob3dzPy5wb3N0ZXJfcGF0aCA/PyBudWxsLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZSA/PyBudWxsLFxuICAgIH07XG4gICAgaWYgKGl0ZW0ucmF0aW5nICE9PSBudWxsKSB7XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXSA/Pz0gW107XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXS5wdXNoKHN1bW1hcnkpO1xuICAgIH1cbiAgICBjb25zdCBmYWQgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoZmFkKSB7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZmFkLnNsaWNlKDAsIDQpLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKHkpICYmIHkgPj0gMTkwMCkge1xuICAgICAgICBjb25zdCB5ciA9IFN0cmluZyh5KTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdID8/PSBbXTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdLnB1c2goc3VtbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbENvdW50LFxuICAgIHJhdGVkQ291bnQsXG4gICAgYXZnUmF0aW5nLFxuICAgIHJhdGluZ0NvdW50cyxcbiAgICB0YWdDb3VudHMsXG4gICAgdGFnQXZnUmF0aW5ncyxcbiAgICBtb250aGx5QWRkZWQsXG4gICAgZGVjYWRlQ291bnRzLFxuICAgIHllYXJDb3VudHMsXG4gICAgZGVjYWRlQXZnUmF0aW5ncyxcbiAgICB5ZWFyQXZnUmF0aW5ncyxcbiAgICBzaG93c0J5UmF0aW5nLFxuICAgIHNob3dzQnlZZWFyLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0SXRlbVdpdGhTaG93ID0ge1xuICBpZDogc3RyaW5nO1xuICBsaXN0X2lkOiBzdHJpbmc7XG4gIHNob3dfaWQ6IHN0cmluZztcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBhZGRlZF9hdDogc3RyaW5nO1xuICBub3Rlczogc3RyaW5nIHwgbnVsbDtcbiAgc2hvd3M6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gICAgaW1kYl9pZDogc3RyaW5nIHwgbnVsbDtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xuICAgIHRtZGJfZmV0Y2hlZDogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0SXRlbXNQYWdlKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZSA9IDUwLFxuKTogUHJvbWlzZTx7XG4gIGl0ZW1zOiBMaXN0SXRlbVdpdGhTaG93W107XG4gIGhhc01vcmU6IGJvb2xlYW47XG4gIHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG59PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGNvbnN0IHsgZGF0YTogbGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFsaXN0LmlzX3B1YmxpYyAmJiBsaXN0LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBmcm9tID0gcGFnZSAqIHBhZ2VTaXplO1xuICBjb25zdCB0byA9IGZyb20gKyBwYWdlU2l6ZSAtIDE7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKiwgc2hvd3MoKilcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIGxpc3RJZClcbiAgICAub3JkZXIoXCJyYXRpbmdcIiwgeyBhc2NlbmRpbmc6IGZhbHNlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICBjb25zdCBpdGVtcyA9IChkYXRhID8/IFtdKSBhcyB1bmtub3duIGFzIExpc3RJdGVtV2l0aFNob3dbXTtcbiAgY29uc3QgaGFzTW9yZSA9IGl0ZW1zLmxlbmd0aCA9PT0gcGFnZVNpemU7XG5cbiAgY29uc3Qgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICBpZiAodXNlciAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeyBkYXRhOiBzaG93VGFncyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgdGFnX2lkXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgICAuaW4oXG4gICAgICAgIFwic2hvd19pZFwiLFxuICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd3MuaWQpLFxuICAgICAgKTtcblxuICAgIGZvciAoY29uc3Qgc3Qgb2Ygc2hvd1RhZ3MgPz8gW10pIHtcbiAgICAgIGlmICghc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0pIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdID0gW107XG4gICAgICBzaG93VGFnc01hcFtzdC5zaG93X2lkXS5wdXNoKHN0LnRhZ19pZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXRlbXMsIGhhc01vcmUsIHNob3dUYWdzTWFwIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9NeUxpc3Qoc2hvdzoge1xuICBpZDogc3RyaW5nO1xuICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xufSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgbXlMaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICBpZiAoIW15TGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaG93IGV4aXN0cyBpbiBvdXIgREIgKHJldXNlIGV4aXN0aW5nIG9yIGNyZWF0ZSlcbiAgbGV0IHNob3dJZCA9IHNob3cuaWQ7XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzaG93LmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOlxuICAgICAgICAgIHNob3cudG1kYl9pZCA/P1xuICAgICAgICAgIC0oXG4gICAgICAgICAgICBNYXRoLmFicyhcbiAgICAgICAgICAgICAgc2hvdy50aXRsZVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICAgICksXG4gICAgICAgIGltZGJfaWQ6IHNob3cuaW1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBzaG93SWQgPSBuZXdTaG93IS5pZDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbiAgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRtZGJTaG93VG9NeUxpc3Qoc2hvdzoge1xuICB0bWRiX2lkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBGaW5kIG9yIGNyZWF0ZSB0aGUgc2hvdyBieSB0bWRiX2lkXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBleGlzdGluZ1Nob3chLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUxpc3RUb01pbmUoc291cmNlTGlzdElkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSBzb3VyY2UgbGlzdCBpcyBwdWJsaWMgKG9yIG93bmVkIGJ5IHVzZXIpXG4gIGNvbnN0IHsgZGF0YTogc291cmNlTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCBpc19wdWJsaWMsIHVzZXJfaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzb3VyY2VMaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghc291cmNlTGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghc291cmNlTGlzdC5pc19wdWJsaWMgJiYgc291cmNlTGlzdC51c2VyX2lkICE9PSB1c2VyLmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJPd24gbGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gVmVyaWZ5IG93biBsaXN0IGlzIGVtcHR5XG4gIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpO1xuXG4gIGlmICgoY291bnQgPz8gMCkgPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjb3B5IHRvIGFuIGVtcHR5IGxpc3RcIik7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgICBzaG93X2lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgICBub3RlczogaXRlbS5ub3RlcyxcbiAgICB9KSk7XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLmluc2VydChpbnNlcnRzKTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikgdGhyb3cgbmV3IEVycm9yKGluc2VydEVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRTQTRIc0IsNkxBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:2325e0 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateShowNotes",
    ()=>$$RSC_SERVER_ACTION_4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"701f91fa768c121e8e2aaa5337dc327d75aa3bc291":"updateShowNotes"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("701f91fa768c121e8e2aaa5337dc327d75aa3bc291", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateShowNotes");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG59O1xuXG4vKipcbiAqIFJldHVybnMgYW5hbHl0aWNzIGZvciBhIGxpc3QuXG4gKiAtIE5vIGxpc3RJZCDihpIgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIG93biBsaXN0LlxuICogLSBXaXRoIGxpc3RJZCDihpIgYW55IHB1YmxpYyBsaXN0IChvd25lcidzIHRhZ3MgYXJlIHNob3duKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RBbmFseXRpY3MoXG4gIGxpc3RJZD86IHN0cmluZyxcbik6IFByb21pc2U8QW5hbHl0aWNzRGF0YT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBsZXQgcmVzb2x2ZWRMaXN0SWQ6IHN0cmluZztcbiAgbGV0IG93bmVySWQ6IHN0cmluZztcblxuICBpZiAobGlzdElkKSB7XG4gICAgLy8gVmlld2luZyBzb21lb25lIGVsc2UncyAob3Igb3duKSBsaXN0IGJ5IGV4cGxpY2l0IGlkXG4gICAgY29uc3QgeyBkYXRhOiBsaXN0Um93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0c1wiKVxuICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWxpc3RSb3cpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgLy8gT25seSBhbGxvdyBhY2Nlc3MgaWYgcHVibGljIG9yIG93bmVkIGJ5IHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGlmICghbGlzdFJvdy5pc19wdWJsaWMgJiYgbGlzdFJvdy51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICAgIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0Um93LmlkO1xuICAgIG93bmVySWQgPSBsaXN0Um93LnVzZXJfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0LmlkO1xuICAgIG93bmVySWQgPSB1c2VyLmlkO1xuICB9XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIChubyBwYWdpbmF0aW9uKSDigJQgcmF0aW5nLCBzaG93X2lkLCBhZGRlZF9hdCwgZmlyc3RfYWlyX2RhdGUgdmlhIGpvaW5cbiAgdHlwZSBSYXdJdGVtID0ge1xuICAgIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgICBzaG93X2lkOiBzdHJpbmc7XG4gICAgYWRkZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gICAgc2hvd3M6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICB9IHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgeyBkYXRhOiByYXdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFxuICAgICAgXCJyYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBzaG93cyhpZCwgdGl0bGUsIHBvc3Rlcl9wYXRoLCBmaXJzdF9haXJfZGF0ZSlcIixcbiAgICApXG4gICAgLmVxKFwibGlzdF9pZFwiLCByZXNvbHZlZExpc3RJZCk7XG5cbiAgY29uc3QgaXRlbXMgPSAocmF3SXRlbXMgPz8gW10pIGFzIFJhd0l0ZW1bXTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcmF0ZWRSb3dzID0gaXRlbXMuZmlsdGVyKChyKSA9PiByLnJhdGluZyAhPT0gbnVsbCk7XG4gIGNvbnN0IHJhdGVkQ291bnQgPSByYXRlZFJvd3MubGVuZ3RoO1xuICBjb25zdCBhdmdSYXRpbmcgPVxuICAgIHJhdGVkQ291bnQgPiAwXG4gICAgICA/IE1hdGgucm91bmQoXG4gICAgICAgICAgKHJhdGVkUm93cy5yZWR1Y2UoKHMsIHIpID0+IHMgKyByLnJhdGluZyEsIDApIC8gcmF0ZWRDb3VudCkgKiAxMCxcbiAgICAgICAgKSAvIDEwXG4gICAgICA6IG51bGw7XG5cbiAgLy8gUmF0aW5nIGRpc3RyaWJ1dGlvblxuICBjb25zdCByYXRpbmdNYXA6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChsZXQgciA9IDE7IHIgPD0gMTA7IHIrKykgcmF0aW5nTWFwW3JdID0gMDtcbiAgZm9yIChjb25zdCByb3cgb2YgaXRlbXMpIHtcbiAgICBpZiAocm93LnJhdGluZyAhPT0gbnVsbClcbiAgICAgIHJhdGluZ01hcFtyb3cucmF0aW5nXSA9IChyYXRpbmdNYXBbcm93LnJhdGluZ10gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IHJhdGluZ0NvdW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICAgIHJhdGluZzogaSArIDEsXG4gICAgY291bnQ6IHJhdGluZ01hcFtpICsgMV0sXG4gIH0pKTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uIOKAlCB1c2UgdGhlIGxpc3Qgb3duZXIncyB0YWdzXG4gIGNvbnN0IHNob3dJZHMgPSBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd19pZCk7XG4gIGNvbnN0IHRhZ0NvdW50czogQW5hbHl0aWNzRGF0YVtcInRhZ0NvdW50c1wiXSA9IFtdO1xuICBjb25zdCB0YWdBdmdSYXRpbmdzOiBBbmFseXRpY3NEYXRhW1widGFnQXZnUmF0aW5nc1wiXSA9IFtdO1xuXG4gIGlmIChzaG93SWRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBbeyBkYXRhOiBzaG93VGFnUm93cyB9LCB7IGRhdGE6IHRhZ0RlZnMgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwidGFnX2lkLCBzaG93X2lkXCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgb3duZXJJZClcbiAgICAgICAgLmluKFwic2hvd19pZFwiLCBzaG93SWRzKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwiaWQsIG5hbWUsIGNvbG9yXCIpXG4gICAgICAgIC5vcihgaXNfZGVmYXVsdC5lcS50cnVlLHVzZXJfaWQuZXEuJHtvd25lcklkfWApLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGFnTWFwID0gbmV3IE1hcCgodGFnRGVmcyA/PyBbXSkubWFwKCh0KSA9PiBbdC5pZCwgdF0pKTtcbiAgICBjb25zdCBzaG93UmF0aW5nTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoKGkpID0+IFtpLnNob3dfaWQsIGkucmF0aW5nXSkpO1xuXG4gICAgY29uc3QgdGFnQ291bnRNYXA6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1cbiAgICA+ID0ge307XG4gICAgY29uc3QgdGFnUmF0aW5nQWNjOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY29sb3I6IHN0cmluZzsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHNob3dUYWdSb3dzID8/IFtdKSB7XG4gICAgICBjb25zdCB0YWcgPSB0YWdNYXAuZ2V0KHJvdy50YWdfaWQpO1xuICAgICAgaWYgKCF0YWcpIGNvbnRpbnVlO1xuXG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICBpZDogdGFnLmlkLFxuICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgICAgdGFnQ291bnRNYXBbcm93LnRhZ19pZF0uY291bnQrKztcblxuICAgICAgY29uc3QgcmF0aW5nID0gc2hvd1JhdGluZ01hcC5nZXQocm93LnNob3dfaWQpO1xuICAgICAgaWYgKHJhdGluZyAhPSBudWxsKSB7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgICAgbmFtZTogdGFnLm5hbWUsXG4gICAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5zdW0gKz0gcmF0aW5nO1xuICAgICAgICB0YWdSYXRpbmdBY2Nbcm93LnRhZ19pZF0uY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWdDb3VudHMucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnQ291bnRNYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KSxcbiAgICApO1xuICAgIHRhZ0F2Z1JhdGluZ3MucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnUmF0aW5nQWNjKVxuICAgICAgICAubWFwKCh0KSA9PiAoe1xuICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgIG5hbWU6IHQubmFtZSxcbiAgICAgICAgICBjb2xvcjogdC5jb2xvcixcbiAgICAgICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHQuc3VtIC8gdC5jb3VudCkgKiAxMCkgLyAxMCxcbiAgICAgICAgICBjb3VudDogdC5jb3VudCxcbiAgICAgICAgfSkpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2Z1JhdGluZyAtIGEuYXZnUmF0aW5nKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVGltZWxpbmU6IGdyb3VwIGJ5IGFkZGVkX2F0IG1vbnRoIChZWVlZLU1NKVxuICBjb25zdCBtb250aGx5TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5hZGRlZF9hdCkgY29udGludWU7XG4gICAgY29uc3QgbW9udGggPSBpdGVtLmFkZGVkX2F0LnNsaWNlKDAsIDcpO1xuICAgIG1vbnRobHlNYXBbbW9udGhdID0gKG1vbnRobHlNYXBbbW9udGhdID8/IDApICsgMTtcbiAgfVxuICBjb25zdCBtb250aGx5QWRkZWQgPSBPYmplY3QuZW50cmllcyhtb250aGx5TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFttb250aCwgY291bnRdKSA9PiAoeyBtb250aCwgY291bnQgfSkpO1xuXG4gIC8vIERlY2FkZSBkaXN0cmlidXRpb246IGdyb3VwIGJ5IGRlY2FkZSBvZiBmaXJzdF9haXJfZGF0ZVxuICBjb25zdCBkZWNhZGVNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgeWVhckNvdW50TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGNvbnN0IGRlY2FkZVJhdGluZ0FjYzogUmVjb3JkPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PiA9IHt9O1xuICBjb25zdCB5ZWFyUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlyc3RBaXJEYXRlID0gaXRlbS5zaG93cz8uZmlyc3RfYWlyX2RhdGU7XG4gICAgaWYgKCFmaXJzdEFpckRhdGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHllYXIgPSBwYXJzZUludChmaXJzdEFpckRhdGUuc2xpY2UoMCwgNCksIDEwKTtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgeWVhciA8IDE5MDApIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlY2FkZSA9IGAke01hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwfXNgO1xuICAgIGNvbnN0IHllYXJTdHIgPSBTdHJpbmcoeWVhcik7XG5cbiAgICBkZWNhZGVNYXBbZGVjYWRlXSA9IChkZWNhZGVNYXBbZGVjYWRlXSA/PyAwKSArIDE7XG4gICAgeWVhckNvdW50TWFwW3llYXJTdHJdID0gKHllYXJDb3VudE1hcFt5ZWFyU3RyXSA/PyAwKSArIDE7XG5cbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdID8/PSB7IHN1bTogMCwgY291bnQ6IDAgfTtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLmNvdW50Kys7XG5cbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXS5zdW0gKz0gaXRlbS5yYXRpbmc7XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjYWRlQ291bnRzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlTWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIGNvdW50XSkgPT4gKHsgZGVjYWRlLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgeWVhckNvdW50cyA9IE9iamVjdC5lbnRyaWVzKHllYXJDb3VudE1hcClcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgY291bnRdKSA9PiAoeyB5ZWFyLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgZGVjYWRlQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKGRlY2FkZVJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbZGVjYWRlLCB7IHN1bSwgY291bnQgfV0pID0+ICh7XG4gICAgICBkZWNhZGUsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICBjb25zdCB5ZWFyQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKHllYXJSYXRpbmdBY2MpXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW3llYXIsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIHllYXIsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICAvLyBCdWlsZCBzaG93IGxvb2t1cCBtYXBzIGZvciBtb2RhbCBkcmlsbC10aHJvdWdoXG4gIGNvbnN0IHNob3dzQnlSYXRpbmc6IFJlY29yZDxudW1iZXIsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGNvbnN0IHNob3dzQnlZZWFyOiBSZWNvcmQ8c3RyaW5nLCBTaG93U3VtbWFyeVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBzdW1tYXJ5OiBTaG93U3VtbWFyeSA9IHtcbiAgICAgIGlkOiBpdGVtLnNob3dzPy5pZCA/PyBpdGVtLnNob3dfaWQsXG4gICAgICB0aXRsZTogaXRlbS5zaG93cz8udGl0bGUgPz8gXCJcIixcbiAgICAgIHBvc3Rlcl9wYXRoOiBpdGVtLnNob3dzPy5wb3N0ZXJfcGF0aCA/PyBudWxsLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZSA/PyBudWxsLFxuICAgIH07XG4gICAgaWYgKGl0ZW0ucmF0aW5nICE9PSBudWxsKSB7XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXSA/Pz0gW107XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXS5wdXNoKHN1bW1hcnkpO1xuICAgIH1cbiAgICBjb25zdCBmYWQgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoZmFkKSB7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZmFkLnNsaWNlKDAsIDQpLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKHkpICYmIHkgPj0gMTkwMCkge1xuICAgICAgICBjb25zdCB5ciA9IFN0cmluZyh5KTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdID8/PSBbXTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdLnB1c2goc3VtbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbENvdW50LFxuICAgIHJhdGVkQ291bnQsXG4gICAgYXZnUmF0aW5nLFxuICAgIHJhdGluZ0NvdW50cyxcbiAgICB0YWdDb3VudHMsXG4gICAgdGFnQXZnUmF0aW5ncyxcbiAgICBtb250aGx5QWRkZWQsXG4gICAgZGVjYWRlQ291bnRzLFxuICAgIHllYXJDb3VudHMsXG4gICAgZGVjYWRlQXZnUmF0aW5ncyxcbiAgICB5ZWFyQXZnUmF0aW5ncyxcbiAgICBzaG93c0J5UmF0aW5nLFxuICAgIHNob3dzQnlZZWFyLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0SXRlbVdpdGhTaG93ID0ge1xuICBpZDogc3RyaW5nO1xuICBsaXN0X2lkOiBzdHJpbmc7XG4gIHNob3dfaWQ6IHN0cmluZztcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBhZGRlZF9hdDogc3RyaW5nO1xuICBub3Rlczogc3RyaW5nIHwgbnVsbDtcbiAgc2hvd3M6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gICAgaW1kYl9pZDogc3RyaW5nIHwgbnVsbDtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xuICAgIHRtZGJfZmV0Y2hlZDogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0SXRlbXNQYWdlKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZSA9IDUwLFxuKTogUHJvbWlzZTx7XG4gIGl0ZW1zOiBMaXN0SXRlbVdpdGhTaG93W107XG4gIGhhc01vcmU6IGJvb2xlYW47XG4gIHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG59PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGNvbnN0IHsgZGF0YTogbGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFsaXN0LmlzX3B1YmxpYyAmJiBsaXN0LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBmcm9tID0gcGFnZSAqIHBhZ2VTaXplO1xuICBjb25zdCB0byA9IGZyb20gKyBwYWdlU2l6ZSAtIDE7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKiwgc2hvd3MoKilcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIGxpc3RJZClcbiAgICAub3JkZXIoXCJyYXRpbmdcIiwgeyBhc2NlbmRpbmc6IGZhbHNlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICBjb25zdCBpdGVtcyA9IChkYXRhID8/IFtdKSBhcyB1bmtub3duIGFzIExpc3RJdGVtV2l0aFNob3dbXTtcbiAgY29uc3QgaGFzTW9yZSA9IGl0ZW1zLmxlbmd0aCA9PT0gcGFnZVNpemU7XG5cbiAgY29uc3Qgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICBpZiAodXNlciAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeyBkYXRhOiBzaG93VGFncyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgdGFnX2lkXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgICAuaW4oXG4gICAgICAgIFwic2hvd19pZFwiLFxuICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd3MuaWQpLFxuICAgICAgKTtcblxuICAgIGZvciAoY29uc3Qgc3Qgb2Ygc2hvd1RhZ3MgPz8gW10pIHtcbiAgICAgIGlmICghc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0pIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdID0gW107XG4gICAgICBzaG93VGFnc01hcFtzdC5zaG93X2lkXS5wdXNoKHN0LnRhZ19pZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXRlbXMsIGhhc01vcmUsIHNob3dUYWdzTWFwIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9NeUxpc3Qoc2hvdzoge1xuICBpZDogc3RyaW5nO1xuICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xufSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgbXlMaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICBpZiAoIW15TGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaG93IGV4aXN0cyBpbiBvdXIgREIgKHJldXNlIGV4aXN0aW5nIG9yIGNyZWF0ZSlcbiAgbGV0IHNob3dJZCA9IHNob3cuaWQ7XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzaG93LmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOlxuICAgICAgICAgIHNob3cudG1kYl9pZCA/P1xuICAgICAgICAgIC0oXG4gICAgICAgICAgICBNYXRoLmFicyhcbiAgICAgICAgICAgICAgc2hvdy50aXRsZVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICAgICksXG4gICAgICAgIGltZGJfaWQ6IHNob3cuaW1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBzaG93SWQgPSBuZXdTaG93IS5pZDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbiAgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRtZGJTaG93VG9NeUxpc3Qoc2hvdzoge1xuICB0bWRiX2lkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBGaW5kIG9yIGNyZWF0ZSB0aGUgc2hvdyBieSB0bWRiX2lkXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBleGlzdGluZ1Nob3chLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUxpc3RUb01pbmUoc291cmNlTGlzdElkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSBzb3VyY2UgbGlzdCBpcyBwdWJsaWMgKG9yIG93bmVkIGJ5IHVzZXIpXG4gIGNvbnN0IHsgZGF0YTogc291cmNlTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCBpc19wdWJsaWMsIHVzZXJfaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzb3VyY2VMaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghc291cmNlTGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghc291cmNlTGlzdC5pc19wdWJsaWMgJiYgc291cmNlTGlzdC51c2VyX2lkICE9PSB1c2VyLmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJPd24gbGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gVmVyaWZ5IG93biBsaXN0IGlzIGVtcHR5XG4gIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpO1xuXG4gIGlmICgoY291bnQgPz8gMCkgPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjb3B5IHRvIGFuIGVtcHR5IGxpc3RcIik7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgICBzaG93X2lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgICBub3RlczogaXRlbS5ub3RlcyxcbiAgICB9KSk7XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLmluc2VydChpbnNlcnRzKTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikgdGhyb3cgbmV3IEVycm9yKGluc2VydEVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjJTQW1Kc0IsNExBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:3ed202 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reorderListItems",
    ()=>$$RSC_SERVER_ACTION_5
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"605c419b56fd315dcb68cfeb7a892d9b3822c401cd":"reorderListItems"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("605c419b56fd315dcb68cfeb7a892d9b3822c401cd", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "reorderListItems");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG59O1xuXG4vKipcbiAqIFJldHVybnMgYW5hbHl0aWNzIGZvciBhIGxpc3QuXG4gKiAtIE5vIGxpc3RJZCDihpIgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIG93biBsaXN0LlxuICogLSBXaXRoIGxpc3RJZCDihpIgYW55IHB1YmxpYyBsaXN0IChvd25lcidzIHRhZ3MgYXJlIHNob3duKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RBbmFseXRpY3MoXG4gIGxpc3RJZD86IHN0cmluZyxcbik6IFByb21pc2U8QW5hbHl0aWNzRGF0YT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBsZXQgcmVzb2x2ZWRMaXN0SWQ6IHN0cmluZztcbiAgbGV0IG93bmVySWQ6IHN0cmluZztcblxuICBpZiAobGlzdElkKSB7XG4gICAgLy8gVmlld2luZyBzb21lb25lIGVsc2UncyAob3Igb3duKSBsaXN0IGJ5IGV4cGxpY2l0IGlkXG4gICAgY29uc3QgeyBkYXRhOiBsaXN0Um93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0c1wiKVxuICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWxpc3RSb3cpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgLy8gT25seSBhbGxvdyBhY2Nlc3MgaWYgcHVibGljIG9yIG93bmVkIGJ5IHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGlmICghbGlzdFJvdy5pc19wdWJsaWMgJiYgbGlzdFJvdy51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICAgIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0Um93LmlkO1xuICAgIG93bmVySWQgPSBsaXN0Um93LnVzZXJfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0LmlkO1xuICAgIG93bmVySWQgPSB1c2VyLmlkO1xuICB9XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIChubyBwYWdpbmF0aW9uKSDigJQgcmF0aW5nLCBzaG93X2lkLCBhZGRlZF9hdCwgZmlyc3RfYWlyX2RhdGUgdmlhIGpvaW5cbiAgdHlwZSBSYXdJdGVtID0ge1xuICAgIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgICBzaG93X2lkOiBzdHJpbmc7XG4gICAgYWRkZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gICAgc2hvd3M6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICB9IHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgeyBkYXRhOiByYXdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFxuICAgICAgXCJyYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBzaG93cyhpZCwgdGl0bGUsIHBvc3Rlcl9wYXRoLCBmaXJzdF9haXJfZGF0ZSlcIixcbiAgICApXG4gICAgLmVxKFwibGlzdF9pZFwiLCByZXNvbHZlZExpc3RJZCk7XG5cbiAgY29uc3QgaXRlbXMgPSAocmF3SXRlbXMgPz8gW10pIGFzIFJhd0l0ZW1bXTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcmF0ZWRSb3dzID0gaXRlbXMuZmlsdGVyKChyKSA9PiByLnJhdGluZyAhPT0gbnVsbCk7XG4gIGNvbnN0IHJhdGVkQ291bnQgPSByYXRlZFJvd3MubGVuZ3RoO1xuICBjb25zdCBhdmdSYXRpbmcgPVxuICAgIHJhdGVkQ291bnQgPiAwXG4gICAgICA/IE1hdGgucm91bmQoXG4gICAgICAgICAgKHJhdGVkUm93cy5yZWR1Y2UoKHMsIHIpID0+IHMgKyByLnJhdGluZyEsIDApIC8gcmF0ZWRDb3VudCkgKiAxMCxcbiAgICAgICAgKSAvIDEwXG4gICAgICA6IG51bGw7XG5cbiAgLy8gUmF0aW5nIGRpc3RyaWJ1dGlvblxuICBjb25zdCByYXRpbmdNYXA6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChsZXQgciA9IDE7IHIgPD0gMTA7IHIrKykgcmF0aW5nTWFwW3JdID0gMDtcbiAgZm9yIChjb25zdCByb3cgb2YgaXRlbXMpIHtcbiAgICBpZiAocm93LnJhdGluZyAhPT0gbnVsbClcbiAgICAgIHJhdGluZ01hcFtyb3cucmF0aW5nXSA9IChyYXRpbmdNYXBbcm93LnJhdGluZ10gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IHJhdGluZ0NvdW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICAgIHJhdGluZzogaSArIDEsXG4gICAgY291bnQ6IHJhdGluZ01hcFtpICsgMV0sXG4gIH0pKTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uIOKAlCB1c2UgdGhlIGxpc3Qgb3duZXIncyB0YWdzXG4gIGNvbnN0IHNob3dJZHMgPSBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd19pZCk7XG4gIGNvbnN0IHRhZ0NvdW50czogQW5hbHl0aWNzRGF0YVtcInRhZ0NvdW50c1wiXSA9IFtdO1xuICBjb25zdCB0YWdBdmdSYXRpbmdzOiBBbmFseXRpY3NEYXRhW1widGFnQXZnUmF0aW5nc1wiXSA9IFtdO1xuXG4gIGlmIChzaG93SWRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBbeyBkYXRhOiBzaG93VGFnUm93cyB9LCB7IGRhdGE6IHRhZ0RlZnMgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwidGFnX2lkLCBzaG93X2lkXCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgb3duZXJJZClcbiAgICAgICAgLmluKFwic2hvd19pZFwiLCBzaG93SWRzKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwiaWQsIG5hbWUsIGNvbG9yXCIpXG4gICAgICAgIC5vcihgaXNfZGVmYXVsdC5lcS50cnVlLHVzZXJfaWQuZXEuJHtvd25lcklkfWApLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGFnTWFwID0gbmV3IE1hcCgodGFnRGVmcyA/PyBbXSkubWFwKCh0KSA9PiBbdC5pZCwgdF0pKTtcbiAgICBjb25zdCBzaG93UmF0aW5nTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoKGkpID0+IFtpLnNob3dfaWQsIGkucmF0aW5nXSkpO1xuXG4gICAgY29uc3QgdGFnQ291bnRNYXA6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1cbiAgICA+ID0ge307XG4gICAgY29uc3QgdGFnUmF0aW5nQWNjOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY29sb3I6IHN0cmluZzsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHNob3dUYWdSb3dzID8/IFtdKSB7XG4gICAgICBjb25zdCB0YWcgPSB0YWdNYXAuZ2V0KHJvdy50YWdfaWQpO1xuICAgICAgaWYgKCF0YWcpIGNvbnRpbnVlO1xuXG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICBpZDogdGFnLmlkLFxuICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgICAgdGFnQ291bnRNYXBbcm93LnRhZ19pZF0uY291bnQrKztcblxuICAgICAgY29uc3QgcmF0aW5nID0gc2hvd1JhdGluZ01hcC5nZXQocm93LnNob3dfaWQpO1xuICAgICAgaWYgKHJhdGluZyAhPSBudWxsKSB7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgICAgbmFtZTogdGFnLm5hbWUsXG4gICAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5zdW0gKz0gcmF0aW5nO1xuICAgICAgICB0YWdSYXRpbmdBY2Nbcm93LnRhZ19pZF0uY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWdDb3VudHMucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnQ291bnRNYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KSxcbiAgICApO1xuICAgIHRhZ0F2Z1JhdGluZ3MucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnUmF0aW5nQWNjKVxuICAgICAgICAubWFwKCh0KSA9PiAoe1xuICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgIG5hbWU6IHQubmFtZSxcbiAgICAgICAgICBjb2xvcjogdC5jb2xvcixcbiAgICAgICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHQuc3VtIC8gdC5jb3VudCkgKiAxMCkgLyAxMCxcbiAgICAgICAgICBjb3VudDogdC5jb3VudCxcbiAgICAgICAgfSkpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2Z1JhdGluZyAtIGEuYXZnUmF0aW5nKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVGltZWxpbmU6IGdyb3VwIGJ5IGFkZGVkX2F0IG1vbnRoIChZWVlZLU1NKVxuICBjb25zdCBtb250aGx5TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5hZGRlZF9hdCkgY29udGludWU7XG4gICAgY29uc3QgbW9udGggPSBpdGVtLmFkZGVkX2F0LnNsaWNlKDAsIDcpO1xuICAgIG1vbnRobHlNYXBbbW9udGhdID0gKG1vbnRobHlNYXBbbW9udGhdID8/IDApICsgMTtcbiAgfVxuICBjb25zdCBtb250aGx5QWRkZWQgPSBPYmplY3QuZW50cmllcyhtb250aGx5TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFttb250aCwgY291bnRdKSA9PiAoeyBtb250aCwgY291bnQgfSkpO1xuXG4gIC8vIERlY2FkZSBkaXN0cmlidXRpb246IGdyb3VwIGJ5IGRlY2FkZSBvZiBmaXJzdF9haXJfZGF0ZVxuICBjb25zdCBkZWNhZGVNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgeWVhckNvdW50TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGNvbnN0IGRlY2FkZVJhdGluZ0FjYzogUmVjb3JkPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PiA9IHt9O1xuICBjb25zdCB5ZWFyUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlyc3RBaXJEYXRlID0gaXRlbS5zaG93cz8uZmlyc3RfYWlyX2RhdGU7XG4gICAgaWYgKCFmaXJzdEFpckRhdGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHllYXIgPSBwYXJzZUludChmaXJzdEFpckRhdGUuc2xpY2UoMCwgNCksIDEwKTtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgeWVhciA8IDE5MDApIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlY2FkZSA9IGAke01hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwfXNgO1xuICAgIGNvbnN0IHllYXJTdHIgPSBTdHJpbmcoeWVhcik7XG5cbiAgICBkZWNhZGVNYXBbZGVjYWRlXSA9IChkZWNhZGVNYXBbZGVjYWRlXSA/PyAwKSArIDE7XG4gICAgeWVhckNvdW50TWFwW3llYXJTdHJdID0gKHllYXJDb3VudE1hcFt5ZWFyU3RyXSA/PyAwKSArIDE7XG5cbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdID8/PSB7IHN1bTogMCwgY291bnQ6IDAgfTtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLmNvdW50Kys7XG5cbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXS5zdW0gKz0gaXRlbS5yYXRpbmc7XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjYWRlQ291bnRzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlTWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIGNvdW50XSkgPT4gKHsgZGVjYWRlLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgeWVhckNvdW50cyA9IE9iamVjdC5lbnRyaWVzKHllYXJDb3VudE1hcClcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgY291bnRdKSA9PiAoeyB5ZWFyLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgZGVjYWRlQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKGRlY2FkZVJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbZGVjYWRlLCB7IHN1bSwgY291bnQgfV0pID0+ICh7XG4gICAgICBkZWNhZGUsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICBjb25zdCB5ZWFyQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKHllYXJSYXRpbmdBY2MpXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW3llYXIsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIHllYXIsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICAvLyBCdWlsZCBzaG93IGxvb2t1cCBtYXBzIGZvciBtb2RhbCBkcmlsbC10aHJvdWdoXG4gIGNvbnN0IHNob3dzQnlSYXRpbmc6IFJlY29yZDxudW1iZXIsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGNvbnN0IHNob3dzQnlZZWFyOiBSZWNvcmQ8c3RyaW5nLCBTaG93U3VtbWFyeVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBzdW1tYXJ5OiBTaG93U3VtbWFyeSA9IHtcbiAgICAgIGlkOiBpdGVtLnNob3dzPy5pZCA/PyBpdGVtLnNob3dfaWQsXG4gICAgICB0aXRsZTogaXRlbS5zaG93cz8udGl0bGUgPz8gXCJcIixcbiAgICAgIHBvc3Rlcl9wYXRoOiBpdGVtLnNob3dzPy5wb3N0ZXJfcGF0aCA/PyBudWxsLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZSA/PyBudWxsLFxuICAgIH07XG4gICAgaWYgKGl0ZW0ucmF0aW5nICE9PSBudWxsKSB7XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXSA/Pz0gW107XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXS5wdXNoKHN1bW1hcnkpO1xuICAgIH1cbiAgICBjb25zdCBmYWQgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoZmFkKSB7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZmFkLnNsaWNlKDAsIDQpLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKHkpICYmIHkgPj0gMTkwMCkge1xuICAgICAgICBjb25zdCB5ciA9IFN0cmluZyh5KTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdID8/PSBbXTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdLnB1c2goc3VtbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbENvdW50LFxuICAgIHJhdGVkQ291bnQsXG4gICAgYXZnUmF0aW5nLFxuICAgIHJhdGluZ0NvdW50cyxcbiAgICB0YWdDb3VudHMsXG4gICAgdGFnQXZnUmF0aW5ncyxcbiAgICBtb250aGx5QWRkZWQsXG4gICAgZGVjYWRlQ291bnRzLFxuICAgIHllYXJDb3VudHMsXG4gICAgZGVjYWRlQXZnUmF0aW5ncyxcbiAgICB5ZWFyQXZnUmF0aW5ncyxcbiAgICBzaG93c0J5UmF0aW5nLFxuICAgIHNob3dzQnlZZWFyLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0SXRlbVdpdGhTaG93ID0ge1xuICBpZDogc3RyaW5nO1xuICBsaXN0X2lkOiBzdHJpbmc7XG4gIHNob3dfaWQ6IHN0cmluZztcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBhZGRlZF9hdDogc3RyaW5nO1xuICBub3Rlczogc3RyaW5nIHwgbnVsbDtcbiAgc2hvd3M6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gICAgaW1kYl9pZDogc3RyaW5nIHwgbnVsbDtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xuICAgIHRtZGJfZmV0Y2hlZDogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0SXRlbXNQYWdlKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZSA9IDUwLFxuKTogUHJvbWlzZTx7XG4gIGl0ZW1zOiBMaXN0SXRlbVdpdGhTaG93W107XG4gIGhhc01vcmU6IGJvb2xlYW47XG4gIHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG59PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGNvbnN0IHsgZGF0YTogbGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFsaXN0LmlzX3B1YmxpYyAmJiBsaXN0LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBmcm9tID0gcGFnZSAqIHBhZ2VTaXplO1xuICBjb25zdCB0byA9IGZyb20gKyBwYWdlU2l6ZSAtIDE7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKiwgc2hvd3MoKilcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIGxpc3RJZClcbiAgICAub3JkZXIoXCJyYXRpbmdcIiwgeyBhc2NlbmRpbmc6IGZhbHNlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICBjb25zdCBpdGVtcyA9IChkYXRhID8/IFtdKSBhcyB1bmtub3duIGFzIExpc3RJdGVtV2l0aFNob3dbXTtcbiAgY29uc3QgaGFzTW9yZSA9IGl0ZW1zLmxlbmd0aCA9PT0gcGFnZVNpemU7XG5cbiAgY29uc3Qgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICBpZiAodXNlciAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeyBkYXRhOiBzaG93VGFncyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgdGFnX2lkXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgICAuaW4oXG4gICAgICAgIFwic2hvd19pZFwiLFxuICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd3MuaWQpLFxuICAgICAgKTtcblxuICAgIGZvciAoY29uc3Qgc3Qgb2Ygc2hvd1RhZ3MgPz8gW10pIHtcbiAgICAgIGlmICghc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0pIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdID0gW107XG4gICAgICBzaG93VGFnc01hcFtzdC5zaG93X2lkXS5wdXNoKHN0LnRhZ19pZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXRlbXMsIGhhc01vcmUsIHNob3dUYWdzTWFwIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9NeUxpc3Qoc2hvdzoge1xuICBpZDogc3RyaW5nO1xuICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xufSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgbXlMaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICBpZiAoIW15TGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaG93IGV4aXN0cyBpbiBvdXIgREIgKHJldXNlIGV4aXN0aW5nIG9yIGNyZWF0ZSlcbiAgbGV0IHNob3dJZCA9IHNob3cuaWQ7XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzaG93LmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOlxuICAgICAgICAgIHNob3cudG1kYl9pZCA/P1xuICAgICAgICAgIC0oXG4gICAgICAgICAgICBNYXRoLmFicyhcbiAgICAgICAgICAgICAgc2hvdy50aXRsZVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICAgICksXG4gICAgICAgIGltZGJfaWQ6IHNob3cuaW1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBzaG93SWQgPSBuZXdTaG93IS5pZDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbiAgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRtZGJTaG93VG9NeUxpc3Qoc2hvdzoge1xuICB0bWRiX2lkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBGaW5kIG9yIGNyZWF0ZSB0aGUgc2hvdyBieSB0bWRiX2lkXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBleGlzdGluZ1Nob3chLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUxpc3RUb01pbmUoc291cmNlTGlzdElkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSBzb3VyY2UgbGlzdCBpcyBwdWJsaWMgKG9yIG93bmVkIGJ5IHVzZXIpXG4gIGNvbnN0IHsgZGF0YTogc291cmNlTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCBpc19wdWJsaWMsIHVzZXJfaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzb3VyY2VMaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghc291cmNlTGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghc291cmNlTGlzdC5pc19wdWJsaWMgJiYgc291cmNlTGlzdC51c2VyX2lkICE9PSB1c2VyLmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJPd24gbGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gVmVyaWZ5IG93biBsaXN0IGlzIGVtcHR5XG4gIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpO1xuXG4gIGlmICgoY291bnQgPz8gMCkgPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjb3B5IHRvIGFuIGVtcHR5IGxpc3RcIik7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgICBzaG93X2lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgICBub3RlczogaXRlbS5ub3RlcyxcbiAgICB9KSk7XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLmluc2VydChpbnNlcnRzKTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikgdGhyb3cgbmV3IEVycm9yKGluc2VydEVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRTQXdLc0IsNkxBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:f23226 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getListItemsPage",
    ()=>$$RSC_SERVER_ACTION_8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"70d9b1319a732a2917cbfba85bbc0d424270f62b48":"getListItemsPage"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("70d9b1319a732a2917cbfba85bbc0d424270f62b48", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getListItemsPage");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG59O1xuXG4vKipcbiAqIFJldHVybnMgYW5hbHl0aWNzIGZvciBhIGxpc3QuXG4gKiAtIE5vIGxpc3RJZCDihpIgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIG93biBsaXN0LlxuICogLSBXaXRoIGxpc3RJZCDihpIgYW55IHB1YmxpYyBsaXN0IChvd25lcidzIHRhZ3MgYXJlIHNob3duKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RBbmFseXRpY3MoXG4gIGxpc3RJZD86IHN0cmluZyxcbik6IFByb21pc2U8QW5hbHl0aWNzRGF0YT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBsZXQgcmVzb2x2ZWRMaXN0SWQ6IHN0cmluZztcbiAgbGV0IG93bmVySWQ6IHN0cmluZztcblxuICBpZiAobGlzdElkKSB7XG4gICAgLy8gVmlld2luZyBzb21lb25lIGVsc2UncyAob3Igb3duKSBsaXN0IGJ5IGV4cGxpY2l0IGlkXG4gICAgY29uc3QgeyBkYXRhOiBsaXN0Um93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0c1wiKVxuICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWxpc3RSb3cpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgLy8gT25seSBhbGxvdyBhY2Nlc3MgaWYgcHVibGljIG9yIG93bmVkIGJ5IHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGlmICghbGlzdFJvdy5pc19wdWJsaWMgJiYgbGlzdFJvdy51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICAgIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0Um93LmlkO1xuICAgIG93bmVySWQgPSBsaXN0Um93LnVzZXJfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0LmlkO1xuICAgIG93bmVySWQgPSB1c2VyLmlkO1xuICB9XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIChubyBwYWdpbmF0aW9uKSDigJQgcmF0aW5nLCBzaG93X2lkLCBhZGRlZF9hdCwgZmlyc3RfYWlyX2RhdGUgdmlhIGpvaW5cbiAgdHlwZSBSYXdJdGVtID0ge1xuICAgIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgICBzaG93X2lkOiBzdHJpbmc7XG4gICAgYWRkZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gICAgc2hvd3M6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICB9IHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgeyBkYXRhOiByYXdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFxuICAgICAgXCJyYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBzaG93cyhpZCwgdGl0bGUsIHBvc3Rlcl9wYXRoLCBmaXJzdF9haXJfZGF0ZSlcIixcbiAgICApXG4gICAgLmVxKFwibGlzdF9pZFwiLCByZXNvbHZlZExpc3RJZCk7XG5cbiAgY29uc3QgaXRlbXMgPSAocmF3SXRlbXMgPz8gW10pIGFzIFJhd0l0ZW1bXTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcmF0ZWRSb3dzID0gaXRlbXMuZmlsdGVyKChyKSA9PiByLnJhdGluZyAhPT0gbnVsbCk7XG4gIGNvbnN0IHJhdGVkQ291bnQgPSByYXRlZFJvd3MubGVuZ3RoO1xuICBjb25zdCBhdmdSYXRpbmcgPVxuICAgIHJhdGVkQ291bnQgPiAwXG4gICAgICA/IE1hdGgucm91bmQoXG4gICAgICAgICAgKHJhdGVkUm93cy5yZWR1Y2UoKHMsIHIpID0+IHMgKyByLnJhdGluZyEsIDApIC8gcmF0ZWRDb3VudCkgKiAxMCxcbiAgICAgICAgKSAvIDEwXG4gICAgICA6IG51bGw7XG5cbiAgLy8gUmF0aW5nIGRpc3RyaWJ1dGlvblxuICBjb25zdCByYXRpbmdNYXA6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChsZXQgciA9IDE7IHIgPD0gMTA7IHIrKykgcmF0aW5nTWFwW3JdID0gMDtcbiAgZm9yIChjb25zdCByb3cgb2YgaXRlbXMpIHtcbiAgICBpZiAocm93LnJhdGluZyAhPT0gbnVsbClcbiAgICAgIHJhdGluZ01hcFtyb3cucmF0aW5nXSA9IChyYXRpbmdNYXBbcm93LnJhdGluZ10gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IHJhdGluZ0NvdW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICAgIHJhdGluZzogaSArIDEsXG4gICAgY291bnQ6IHJhdGluZ01hcFtpICsgMV0sXG4gIH0pKTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uIOKAlCB1c2UgdGhlIGxpc3Qgb3duZXIncyB0YWdzXG4gIGNvbnN0IHNob3dJZHMgPSBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd19pZCk7XG4gIGNvbnN0IHRhZ0NvdW50czogQW5hbHl0aWNzRGF0YVtcInRhZ0NvdW50c1wiXSA9IFtdO1xuICBjb25zdCB0YWdBdmdSYXRpbmdzOiBBbmFseXRpY3NEYXRhW1widGFnQXZnUmF0aW5nc1wiXSA9IFtdO1xuXG4gIGlmIChzaG93SWRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBbeyBkYXRhOiBzaG93VGFnUm93cyB9LCB7IGRhdGE6IHRhZ0RlZnMgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwidGFnX2lkLCBzaG93X2lkXCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgb3duZXJJZClcbiAgICAgICAgLmluKFwic2hvd19pZFwiLCBzaG93SWRzKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwiaWQsIG5hbWUsIGNvbG9yXCIpXG4gICAgICAgIC5vcihgaXNfZGVmYXVsdC5lcS50cnVlLHVzZXJfaWQuZXEuJHtvd25lcklkfWApLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGFnTWFwID0gbmV3IE1hcCgodGFnRGVmcyA/PyBbXSkubWFwKCh0KSA9PiBbdC5pZCwgdF0pKTtcbiAgICBjb25zdCBzaG93UmF0aW5nTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoKGkpID0+IFtpLnNob3dfaWQsIGkucmF0aW5nXSkpO1xuXG4gICAgY29uc3QgdGFnQ291bnRNYXA6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1cbiAgICA+ID0ge307XG4gICAgY29uc3QgdGFnUmF0aW5nQWNjOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY29sb3I6IHN0cmluZzsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHNob3dUYWdSb3dzID8/IFtdKSB7XG4gICAgICBjb25zdCB0YWcgPSB0YWdNYXAuZ2V0KHJvdy50YWdfaWQpO1xuICAgICAgaWYgKCF0YWcpIGNvbnRpbnVlO1xuXG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICBpZDogdGFnLmlkLFxuICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgICAgdGFnQ291bnRNYXBbcm93LnRhZ19pZF0uY291bnQrKztcblxuICAgICAgY29uc3QgcmF0aW5nID0gc2hvd1JhdGluZ01hcC5nZXQocm93LnNob3dfaWQpO1xuICAgICAgaWYgKHJhdGluZyAhPSBudWxsKSB7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgICAgbmFtZTogdGFnLm5hbWUsXG4gICAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5zdW0gKz0gcmF0aW5nO1xuICAgICAgICB0YWdSYXRpbmdBY2Nbcm93LnRhZ19pZF0uY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWdDb3VudHMucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnQ291bnRNYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KSxcbiAgICApO1xuICAgIHRhZ0F2Z1JhdGluZ3MucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnUmF0aW5nQWNjKVxuICAgICAgICAubWFwKCh0KSA9PiAoe1xuICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgIG5hbWU6IHQubmFtZSxcbiAgICAgICAgICBjb2xvcjogdC5jb2xvcixcbiAgICAgICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHQuc3VtIC8gdC5jb3VudCkgKiAxMCkgLyAxMCxcbiAgICAgICAgICBjb3VudDogdC5jb3VudCxcbiAgICAgICAgfSkpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2Z1JhdGluZyAtIGEuYXZnUmF0aW5nKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVGltZWxpbmU6IGdyb3VwIGJ5IGFkZGVkX2F0IG1vbnRoIChZWVlZLU1NKVxuICBjb25zdCBtb250aGx5TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5hZGRlZF9hdCkgY29udGludWU7XG4gICAgY29uc3QgbW9udGggPSBpdGVtLmFkZGVkX2F0LnNsaWNlKDAsIDcpO1xuICAgIG1vbnRobHlNYXBbbW9udGhdID0gKG1vbnRobHlNYXBbbW9udGhdID8/IDApICsgMTtcbiAgfVxuICBjb25zdCBtb250aGx5QWRkZWQgPSBPYmplY3QuZW50cmllcyhtb250aGx5TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFttb250aCwgY291bnRdKSA9PiAoeyBtb250aCwgY291bnQgfSkpO1xuXG4gIC8vIERlY2FkZSBkaXN0cmlidXRpb246IGdyb3VwIGJ5IGRlY2FkZSBvZiBmaXJzdF9haXJfZGF0ZVxuICBjb25zdCBkZWNhZGVNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgeWVhckNvdW50TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGNvbnN0IGRlY2FkZVJhdGluZ0FjYzogUmVjb3JkPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PiA9IHt9O1xuICBjb25zdCB5ZWFyUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlyc3RBaXJEYXRlID0gaXRlbS5zaG93cz8uZmlyc3RfYWlyX2RhdGU7XG4gICAgaWYgKCFmaXJzdEFpckRhdGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHllYXIgPSBwYXJzZUludChmaXJzdEFpckRhdGUuc2xpY2UoMCwgNCksIDEwKTtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgeWVhciA8IDE5MDApIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlY2FkZSA9IGAke01hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwfXNgO1xuICAgIGNvbnN0IHllYXJTdHIgPSBTdHJpbmcoeWVhcik7XG5cbiAgICBkZWNhZGVNYXBbZGVjYWRlXSA9IChkZWNhZGVNYXBbZGVjYWRlXSA/PyAwKSArIDE7XG4gICAgeWVhckNvdW50TWFwW3llYXJTdHJdID0gKHllYXJDb3VudE1hcFt5ZWFyU3RyXSA/PyAwKSArIDE7XG5cbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdID8/PSB7IHN1bTogMCwgY291bnQ6IDAgfTtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLmNvdW50Kys7XG5cbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXS5zdW0gKz0gaXRlbS5yYXRpbmc7XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjYWRlQ291bnRzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlTWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIGNvdW50XSkgPT4gKHsgZGVjYWRlLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgeWVhckNvdW50cyA9IE9iamVjdC5lbnRyaWVzKHllYXJDb3VudE1hcClcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgY291bnRdKSA9PiAoeyB5ZWFyLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgZGVjYWRlQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKGRlY2FkZVJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbZGVjYWRlLCB7IHN1bSwgY291bnQgfV0pID0+ICh7XG4gICAgICBkZWNhZGUsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICBjb25zdCB5ZWFyQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKHllYXJSYXRpbmdBY2MpXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW3llYXIsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIHllYXIsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICAvLyBCdWlsZCBzaG93IGxvb2t1cCBtYXBzIGZvciBtb2RhbCBkcmlsbC10aHJvdWdoXG4gIGNvbnN0IHNob3dzQnlSYXRpbmc6IFJlY29yZDxudW1iZXIsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGNvbnN0IHNob3dzQnlZZWFyOiBSZWNvcmQ8c3RyaW5nLCBTaG93U3VtbWFyeVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBzdW1tYXJ5OiBTaG93U3VtbWFyeSA9IHtcbiAgICAgIGlkOiBpdGVtLnNob3dzPy5pZCA/PyBpdGVtLnNob3dfaWQsXG4gICAgICB0aXRsZTogaXRlbS5zaG93cz8udGl0bGUgPz8gXCJcIixcbiAgICAgIHBvc3Rlcl9wYXRoOiBpdGVtLnNob3dzPy5wb3N0ZXJfcGF0aCA/PyBudWxsLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZSA/PyBudWxsLFxuICAgIH07XG4gICAgaWYgKGl0ZW0ucmF0aW5nICE9PSBudWxsKSB7XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXSA/Pz0gW107XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXS5wdXNoKHN1bW1hcnkpO1xuICAgIH1cbiAgICBjb25zdCBmYWQgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoZmFkKSB7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZmFkLnNsaWNlKDAsIDQpLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKHkpICYmIHkgPj0gMTkwMCkge1xuICAgICAgICBjb25zdCB5ciA9IFN0cmluZyh5KTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdID8/PSBbXTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdLnB1c2goc3VtbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbENvdW50LFxuICAgIHJhdGVkQ291bnQsXG4gICAgYXZnUmF0aW5nLFxuICAgIHJhdGluZ0NvdW50cyxcbiAgICB0YWdDb3VudHMsXG4gICAgdGFnQXZnUmF0aW5ncyxcbiAgICBtb250aGx5QWRkZWQsXG4gICAgZGVjYWRlQ291bnRzLFxuICAgIHllYXJDb3VudHMsXG4gICAgZGVjYWRlQXZnUmF0aW5ncyxcbiAgICB5ZWFyQXZnUmF0aW5ncyxcbiAgICBzaG93c0J5UmF0aW5nLFxuICAgIHNob3dzQnlZZWFyLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0SXRlbVdpdGhTaG93ID0ge1xuICBpZDogc3RyaW5nO1xuICBsaXN0X2lkOiBzdHJpbmc7XG4gIHNob3dfaWQ6IHN0cmluZztcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBhZGRlZF9hdDogc3RyaW5nO1xuICBub3Rlczogc3RyaW5nIHwgbnVsbDtcbiAgc2hvd3M6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gICAgaW1kYl9pZDogc3RyaW5nIHwgbnVsbDtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xuICAgIHRtZGJfZmV0Y2hlZDogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0SXRlbXNQYWdlKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZSA9IDUwLFxuKTogUHJvbWlzZTx7XG4gIGl0ZW1zOiBMaXN0SXRlbVdpdGhTaG93W107XG4gIGhhc01vcmU6IGJvb2xlYW47XG4gIHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG59PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGNvbnN0IHsgZGF0YTogbGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFsaXN0LmlzX3B1YmxpYyAmJiBsaXN0LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBmcm9tID0gcGFnZSAqIHBhZ2VTaXplO1xuICBjb25zdCB0byA9IGZyb20gKyBwYWdlU2l6ZSAtIDE7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKiwgc2hvd3MoKilcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIGxpc3RJZClcbiAgICAub3JkZXIoXCJyYXRpbmdcIiwgeyBhc2NlbmRpbmc6IGZhbHNlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICBjb25zdCBpdGVtcyA9IChkYXRhID8/IFtdKSBhcyB1bmtub3duIGFzIExpc3RJdGVtV2l0aFNob3dbXTtcbiAgY29uc3QgaGFzTW9yZSA9IGl0ZW1zLmxlbmd0aCA9PT0gcGFnZVNpemU7XG5cbiAgY29uc3Qgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICBpZiAodXNlciAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeyBkYXRhOiBzaG93VGFncyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgdGFnX2lkXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgICAuaW4oXG4gICAgICAgIFwic2hvd19pZFwiLFxuICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd3MuaWQpLFxuICAgICAgKTtcblxuICAgIGZvciAoY29uc3Qgc3Qgb2Ygc2hvd1RhZ3MgPz8gW10pIHtcbiAgICAgIGlmICghc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0pIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdID0gW107XG4gICAgICBzaG93VGFnc01hcFtzdC5zaG93X2lkXS5wdXNoKHN0LnRhZ19pZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXRlbXMsIGhhc01vcmUsIHNob3dUYWdzTWFwIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9NeUxpc3Qoc2hvdzoge1xuICBpZDogc3RyaW5nO1xuICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xufSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgbXlMaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICBpZiAoIW15TGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaG93IGV4aXN0cyBpbiBvdXIgREIgKHJldXNlIGV4aXN0aW5nIG9yIGNyZWF0ZSlcbiAgbGV0IHNob3dJZCA9IHNob3cuaWQ7XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzaG93LmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOlxuICAgICAgICAgIHNob3cudG1kYl9pZCA/P1xuICAgICAgICAgIC0oXG4gICAgICAgICAgICBNYXRoLmFicyhcbiAgICAgICAgICAgICAgc2hvdy50aXRsZVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICAgICksXG4gICAgICAgIGltZGJfaWQ6IHNob3cuaW1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBzaG93SWQgPSBuZXdTaG93IS5pZDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbiAgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRtZGJTaG93VG9NeUxpc3Qoc2hvdzoge1xuICB0bWRiX2lkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBGaW5kIG9yIGNyZWF0ZSB0aGUgc2hvdyBieSB0bWRiX2lkXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBleGlzdGluZ1Nob3chLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUxpc3RUb01pbmUoc291cmNlTGlzdElkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSBzb3VyY2UgbGlzdCBpcyBwdWJsaWMgKG9yIG93bmVkIGJ5IHVzZXIpXG4gIGNvbnN0IHsgZGF0YTogc291cmNlTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCBpc19wdWJsaWMsIHVzZXJfaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzb3VyY2VMaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghc291cmNlTGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghc291cmNlTGlzdC5pc19wdWJsaWMgJiYgc291cmNlTGlzdC51c2VyX2lkICE9PSB1c2VyLmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJPd24gbGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gVmVyaWZ5IG93biBsaXN0IGlzIGVtcHR5XG4gIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpO1xuXG4gIGlmICgoY291bnQgPz8gMCkgPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjb3B5IHRvIGFuIGVtcHR5IGxpc3RcIik7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgICBzaG93X2lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgICBub3RlczogaXRlbS5ub3RlcyxcbiAgICB9KSk7XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLmluc2VydChpbnNlcnRzKTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikgdGhyb3cgbmV3IEVycm9yKGluc2VydEVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRTQWluQnNCLDZMQUFBIn0=
}),
"[project]/src/app/[locale]/(app)/lists/data:fb7b5b [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "copyListToMine",
    ()=>$$RSC_SERVER_ACTION_11
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40fa8dcd5e3cf47ba1e824c96175aa20d3e0a8eb15":"copyListToMine"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40fa8dcd5e3cf47ba1e824c96175aa20d3e0a8eb15", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "copyListToMine");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG59O1xuXG4vKipcbiAqIFJldHVybnMgYW5hbHl0aWNzIGZvciBhIGxpc3QuXG4gKiAtIE5vIGxpc3RJZCDihpIgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIG93biBsaXN0LlxuICogLSBXaXRoIGxpc3RJZCDihpIgYW55IHB1YmxpYyBsaXN0IChvd25lcidzIHRhZ3MgYXJlIHNob3duKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RBbmFseXRpY3MoXG4gIGxpc3RJZD86IHN0cmluZyxcbik6IFByb21pc2U8QW5hbHl0aWNzRGF0YT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBsZXQgcmVzb2x2ZWRMaXN0SWQ6IHN0cmluZztcbiAgbGV0IG93bmVySWQ6IHN0cmluZztcblxuICBpZiAobGlzdElkKSB7XG4gICAgLy8gVmlld2luZyBzb21lb25lIGVsc2UncyAob3Igb3duKSBsaXN0IGJ5IGV4cGxpY2l0IGlkXG4gICAgY29uc3QgeyBkYXRhOiBsaXN0Um93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0c1wiKVxuICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWxpc3RSb3cpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgLy8gT25seSBhbGxvdyBhY2Nlc3MgaWYgcHVibGljIG9yIG93bmVkIGJ5IHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGlmICghbGlzdFJvdy5pc19wdWJsaWMgJiYgbGlzdFJvdy51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICAgIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0Um93LmlkO1xuICAgIG93bmVySWQgPSBsaXN0Um93LnVzZXJfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0LmlkO1xuICAgIG93bmVySWQgPSB1c2VyLmlkO1xuICB9XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIChubyBwYWdpbmF0aW9uKSDigJQgcmF0aW5nLCBzaG93X2lkLCBhZGRlZF9hdCwgZmlyc3RfYWlyX2RhdGUgdmlhIGpvaW5cbiAgdHlwZSBSYXdJdGVtID0ge1xuICAgIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgICBzaG93X2lkOiBzdHJpbmc7XG4gICAgYWRkZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gICAgc2hvd3M6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICB9IHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgeyBkYXRhOiByYXdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFxuICAgICAgXCJyYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBzaG93cyhpZCwgdGl0bGUsIHBvc3Rlcl9wYXRoLCBmaXJzdF9haXJfZGF0ZSlcIixcbiAgICApXG4gICAgLmVxKFwibGlzdF9pZFwiLCByZXNvbHZlZExpc3RJZCk7XG5cbiAgY29uc3QgaXRlbXMgPSAocmF3SXRlbXMgPz8gW10pIGFzIFJhd0l0ZW1bXTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcmF0ZWRSb3dzID0gaXRlbXMuZmlsdGVyKChyKSA9PiByLnJhdGluZyAhPT0gbnVsbCk7XG4gIGNvbnN0IHJhdGVkQ291bnQgPSByYXRlZFJvd3MubGVuZ3RoO1xuICBjb25zdCBhdmdSYXRpbmcgPVxuICAgIHJhdGVkQ291bnQgPiAwXG4gICAgICA/IE1hdGgucm91bmQoXG4gICAgICAgICAgKHJhdGVkUm93cy5yZWR1Y2UoKHMsIHIpID0+IHMgKyByLnJhdGluZyEsIDApIC8gcmF0ZWRDb3VudCkgKiAxMCxcbiAgICAgICAgKSAvIDEwXG4gICAgICA6IG51bGw7XG5cbiAgLy8gUmF0aW5nIGRpc3RyaWJ1dGlvblxuICBjb25zdCByYXRpbmdNYXA6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChsZXQgciA9IDE7IHIgPD0gMTA7IHIrKykgcmF0aW5nTWFwW3JdID0gMDtcbiAgZm9yIChjb25zdCByb3cgb2YgaXRlbXMpIHtcbiAgICBpZiAocm93LnJhdGluZyAhPT0gbnVsbClcbiAgICAgIHJhdGluZ01hcFtyb3cucmF0aW5nXSA9IChyYXRpbmdNYXBbcm93LnJhdGluZ10gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IHJhdGluZ0NvdW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICAgIHJhdGluZzogaSArIDEsXG4gICAgY291bnQ6IHJhdGluZ01hcFtpICsgMV0sXG4gIH0pKTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uIOKAlCB1c2UgdGhlIGxpc3Qgb3duZXIncyB0YWdzXG4gIGNvbnN0IHNob3dJZHMgPSBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd19pZCk7XG4gIGNvbnN0IHRhZ0NvdW50czogQW5hbHl0aWNzRGF0YVtcInRhZ0NvdW50c1wiXSA9IFtdO1xuICBjb25zdCB0YWdBdmdSYXRpbmdzOiBBbmFseXRpY3NEYXRhW1widGFnQXZnUmF0aW5nc1wiXSA9IFtdO1xuXG4gIGlmIChzaG93SWRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBbeyBkYXRhOiBzaG93VGFnUm93cyB9LCB7IGRhdGE6IHRhZ0RlZnMgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwidGFnX2lkLCBzaG93X2lkXCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgb3duZXJJZClcbiAgICAgICAgLmluKFwic2hvd19pZFwiLCBzaG93SWRzKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwiaWQsIG5hbWUsIGNvbG9yXCIpXG4gICAgICAgIC5vcihgaXNfZGVmYXVsdC5lcS50cnVlLHVzZXJfaWQuZXEuJHtvd25lcklkfWApLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGFnTWFwID0gbmV3IE1hcCgodGFnRGVmcyA/PyBbXSkubWFwKCh0KSA9PiBbdC5pZCwgdF0pKTtcbiAgICBjb25zdCBzaG93UmF0aW5nTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoKGkpID0+IFtpLnNob3dfaWQsIGkucmF0aW5nXSkpO1xuXG4gICAgY29uc3QgdGFnQ291bnRNYXA6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1cbiAgICA+ID0ge307XG4gICAgY29uc3QgdGFnUmF0aW5nQWNjOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY29sb3I6IHN0cmluZzsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHNob3dUYWdSb3dzID8/IFtdKSB7XG4gICAgICBjb25zdCB0YWcgPSB0YWdNYXAuZ2V0KHJvdy50YWdfaWQpO1xuICAgICAgaWYgKCF0YWcpIGNvbnRpbnVlO1xuXG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICBpZDogdGFnLmlkLFxuICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgICAgdGFnQ291bnRNYXBbcm93LnRhZ19pZF0uY291bnQrKztcblxuICAgICAgY29uc3QgcmF0aW5nID0gc2hvd1JhdGluZ01hcC5nZXQocm93LnNob3dfaWQpO1xuICAgICAgaWYgKHJhdGluZyAhPSBudWxsKSB7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgICAgbmFtZTogdGFnLm5hbWUsXG4gICAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5zdW0gKz0gcmF0aW5nO1xuICAgICAgICB0YWdSYXRpbmdBY2Nbcm93LnRhZ19pZF0uY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWdDb3VudHMucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnQ291bnRNYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KSxcbiAgICApO1xuICAgIHRhZ0F2Z1JhdGluZ3MucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnUmF0aW5nQWNjKVxuICAgICAgICAubWFwKCh0KSA9PiAoe1xuICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgIG5hbWU6IHQubmFtZSxcbiAgICAgICAgICBjb2xvcjogdC5jb2xvcixcbiAgICAgICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHQuc3VtIC8gdC5jb3VudCkgKiAxMCkgLyAxMCxcbiAgICAgICAgICBjb3VudDogdC5jb3VudCxcbiAgICAgICAgfSkpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2Z1JhdGluZyAtIGEuYXZnUmF0aW5nKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVGltZWxpbmU6IGdyb3VwIGJ5IGFkZGVkX2F0IG1vbnRoIChZWVlZLU1NKVxuICBjb25zdCBtb250aGx5TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5hZGRlZF9hdCkgY29udGludWU7XG4gICAgY29uc3QgbW9udGggPSBpdGVtLmFkZGVkX2F0LnNsaWNlKDAsIDcpO1xuICAgIG1vbnRobHlNYXBbbW9udGhdID0gKG1vbnRobHlNYXBbbW9udGhdID8/IDApICsgMTtcbiAgfVxuICBjb25zdCBtb250aGx5QWRkZWQgPSBPYmplY3QuZW50cmllcyhtb250aGx5TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFttb250aCwgY291bnRdKSA9PiAoeyBtb250aCwgY291bnQgfSkpO1xuXG4gIC8vIERlY2FkZSBkaXN0cmlidXRpb246IGdyb3VwIGJ5IGRlY2FkZSBvZiBmaXJzdF9haXJfZGF0ZVxuICBjb25zdCBkZWNhZGVNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgeWVhckNvdW50TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGNvbnN0IGRlY2FkZVJhdGluZ0FjYzogUmVjb3JkPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PiA9IHt9O1xuICBjb25zdCB5ZWFyUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlyc3RBaXJEYXRlID0gaXRlbS5zaG93cz8uZmlyc3RfYWlyX2RhdGU7XG4gICAgaWYgKCFmaXJzdEFpckRhdGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHllYXIgPSBwYXJzZUludChmaXJzdEFpckRhdGUuc2xpY2UoMCwgNCksIDEwKTtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgeWVhciA8IDE5MDApIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlY2FkZSA9IGAke01hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwfXNgO1xuICAgIGNvbnN0IHllYXJTdHIgPSBTdHJpbmcoeWVhcik7XG5cbiAgICBkZWNhZGVNYXBbZGVjYWRlXSA9IChkZWNhZGVNYXBbZGVjYWRlXSA/PyAwKSArIDE7XG4gICAgeWVhckNvdW50TWFwW3llYXJTdHJdID0gKHllYXJDb3VudE1hcFt5ZWFyU3RyXSA/PyAwKSArIDE7XG5cbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdID8/PSB7IHN1bTogMCwgY291bnQ6IDAgfTtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLmNvdW50Kys7XG5cbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXS5zdW0gKz0gaXRlbS5yYXRpbmc7XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjYWRlQ291bnRzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlTWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIGNvdW50XSkgPT4gKHsgZGVjYWRlLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgeWVhckNvdW50cyA9IE9iamVjdC5lbnRyaWVzKHllYXJDb3VudE1hcClcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgY291bnRdKSA9PiAoeyB5ZWFyLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgZGVjYWRlQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKGRlY2FkZVJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbZGVjYWRlLCB7IHN1bSwgY291bnQgfV0pID0+ICh7XG4gICAgICBkZWNhZGUsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICBjb25zdCB5ZWFyQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKHllYXJSYXRpbmdBY2MpXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW3llYXIsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIHllYXIsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICAvLyBCdWlsZCBzaG93IGxvb2t1cCBtYXBzIGZvciBtb2RhbCBkcmlsbC10aHJvdWdoXG4gIGNvbnN0IHNob3dzQnlSYXRpbmc6IFJlY29yZDxudW1iZXIsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGNvbnN0IHNob3dzQnlZZWFyOiBSZWNvcmQ8c3RyaW5nLCBTaG93U3VtbWFyeVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBzdW1tYXJ5OiBTaG93U3VtbWFyeSA9IHtcbiAgICAgIGlkOiBpdGVtLnNob3dzPy5pZCA/PyBpdGVtLnNob3dfaWQsXG4gICAgICB0aXRsZTogaXRlbS5zaG93cz8udGl0bGUgPz8gXCJcIixcbiAgICAgIHBvc3Rlcl9wYXRoOiBpdGVtLnNob3dzPy5wb3N0ZXJfcGF0aCA/PyBudWxsLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZSA/PyBudWxsLFxuICAgIH07XG4gICAgaWYgKGl0ZW0ucmF0aW5nICE9PSBudWxsKSB7XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXSA/Pz0gW107XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXS5wdXNoKHN1bW1hcnkpO1xuICAgIH1cbiAgICBjb25zdCBmYWQgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoZmFkKSB7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZmFkLnNsaWNlKDAsIDQpLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKHkpICYmIHkgPj0gMTkwMCkge1xuICAgICAgICBjb25zdCB5ciA9IFN0cmluZyh5KTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdID8/PSBbXTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdLnB1c2goc3VtbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbENvdW50LFxuICAgIHJhdGVkQ291bnQsXG4gICAgYXZnUmF0aW5nLFxuICAgIHJhdGluZ0NvdW50cyxcbiAgICB0YWdDb3VudHMsXG4gICAgdGFnQXZnUmF0aW5ncyxcbiAgICBtb250aGx5QWRkZWQsXG4gICAgZGVjYWRlQ291bnRzLFxuICAgIHllYXJDb3VudHMsXG4gICAgZGVjYWRlQXZnUmF0aW5ncyxcbiAgICB5ZWFyQXZnUmF0aW5ncyxcbiAgICBzaG93c0J5UmF0aW5nLFxuICAgIHNob3dzQnlZZWFyLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0SXRlbVdpdGhTaG93ID0ge1xuICBpZDogc3RyaW5nO1xuICBsaXN0X2lkOiBzdHJpbmc7XG4gIHNob3dfaWQ6IHN0cmluZztcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBhZGRlZF9hdDogc3RyaW5nO1xuICBub3Rlczogc3RyaW5nIHwgbnVsbDtcbiAgc2hvd3M6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gICAgaW1kYl9pZDogc3RyaW5nIHwgbnVsbDtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xuICAgIHRtZGJfZmV0Y2hlZDogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0SXRlbXNQYWdlKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZSA9IDUwLFxuKTogUHJvbWlzZTx7XG4gIGl0ZW1zOiBMaXN0SXRlbVdpdGhTaG93W107XG4gIGhhc01vcmU6IGJvb2xlYW47XG4gIHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG59PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGNvbnN0IHsgZGF0YTogbGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFsaXN0LmlzX3B1YmxpYyAmJiBsaXN0LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBmcm9tID0gcGFnZSAqIHBhZ2VTaXplO1xuICBjb25zdCB0byA9IGZyb20gKyBwYWdlU2l6ZSAtIDE7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKiwgc2hvd3MoKilcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIGxpc3RJZClcbiAgICAub3JkZXIoXCJyYXRpbmdcIiwgeyBhc2NlbmRpbmc6IGZhbHNlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICBjb25zdCBpdGVtcyA9IChkYXRhID8/IFtdKSBhcyB1bmtub3duIGFzIExpc3RJdGVtV2l0aFNob3dbXTtcbiAgY29uc3QgaGFzTW9yZSA9IGl0ZW1zLmxlbmd0aCA9PT0gcGFnZVNpemU7XG5cbiAgY29uc3Qgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICBpZiAodXNlciAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeyBkYXRhOiBzaG93VGFncyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgdGFnX2lkXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgICAuaW4oXG4gICAgICAgIFwic2hvd19pZFwiLFxuICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd3MuaWQpLFxuICAgICAgKTtcblxuICAgIGZvciAoY29uc3Qgc3Qgb2Ygc2hvd1RhZ3MgPz8gW10pIHtcbiAgICAgIGlmICghc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0pIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdID0gW107XG4gICAgICBzaG93VGFnc01hcFtzdC5zaG93X2lkXS5wdXNoKHN0LnRhZ19pZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXRlbXMsIGhhc01vcmUsIHNob3dUYWdzTWFwIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9NeUxpc3Qoc2hvdzoge1xuICBpZDogc3RyaW5nO1xuICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xufSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgbXlMaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICBpZiAoIW15TGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaG93IGV4aXN0cyBpbiBvdXIgREIgKHJldXNlIGV4aXN0aW5nIG9yIGNyZWF0ZSlcbiAgbGV0IHNob3dJZCA9IHNob3cuaWQ7XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzaG93LmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOlxuICAgICAgICAgIHNob3cudG1kYl9pZCA/P1xuICAgICAgICAgIC0oXG4gICAgICAgICAgICBNYXRoLmFicyhcbiAgICAgICAgICAgICAgc2hvdy50aXRsZVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICAgICksXG4gICAgICAgIGltZGJfaWQ6IHNob3cuaW1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBzaG93SWQgPSBuZXdTaG93IS5pZDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbiAgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRtZGJTaG93VG9NeUxpc3Qoc2hvdzoge1xuICB0bWRiX2lkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBGaW5kIG9yIGNyZWF0ZSB0aGUgc2hvdyBieSB0bWRiX2lkXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBleGlzdGluZ1Nob3chLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUxpc3RUb01pbmUoc291cmNlTGlzdElkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSBzb3VyY2UgbGlzdCBpcyBwdWJsaWMgKG9yIG93bmVkIGJ5IHVzZXIpXG4gIGNvbnN0IHsgZGF0YTogc291cmNlTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCBpc19wdWJsaWMsIHVzZXJfaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzb3VyY2VMaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghc291cmNlTGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghc291cmNlTGlzdC5pc19wdWJsaWMgJiYgc291cmNlTGlzdC51c2VyX2lkICE9PSB1c2VyLmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJPd24gbGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gVmVyaWZ5IG93biBsaXN0IGlzIGVtcHR5XG4gIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpO1xuXG4gIGlmICgoY291bnQgPz8gMCkgPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjb3B5IHRvIGFuIGVtcHR5IGxpc3RcIik7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgICBzaG93X2lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgICBub3RlczogaXRlbS5ub3RlcyxcbiAgICB9KSk7XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLmluc2VydChpbnNlcnRzKTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikgdGhyb3cgbmV3IEVycm9yKGluc2VydEVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjBTQXMwQnNCLDZMQUFBIn0=
}),
"[project]/src/app/[locale]/(app)/explore/data:7b27e2 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRecommendations",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"00013d22198e0917732ef4ee0783138d454c3f3c79":"getRecommendations"},"src/app/[locale]/(app)/explore/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("00013d22198e0917732ef4ee0783138d454c3f3c79", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getRecommendations");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgc2NvcmVSZWNvbW1lbmRhdGlvbnMsIHR5cGUgVXNlckxpc3QgfSBmcm9tIFwiQC9saWIvcmVjb21tZW5kYXRpb25zXCI7XG5pbXBvcnQgeyBjb21wdXRlTGlzdFNpbWlsYXJpdHksIHR5cGUgTGlzdEVudHJ5IH0gZnJvbSBcIkAvbGliL3NpbWlsYXJpdHlcIjtcblxuZXhwb3J0IHR5cGUgU2ltaWxhclVzZXIgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGF2YXRhcl91cmw6IHN0cmluZyB8IG51bGw7XG4gIHNob3dfY291bnQ6IG51bWJlcjtcbiAgc2ltaWxhcml0eTogbnVtYmVyO1xuICBpc19mb2xsb3dpbmc6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2ltaWxhclVzZXJzKCk6IFByb21pc2U8U2ltaWxhclVzZXJbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgaXRlbXNcbiAgY29uc3QgeyBkYXRhOiBteUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFteUxpc3QpIHJldHVybiBbXTtcblxuICBjb25zdCB7IGRhdGE6IG15SXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoIW15SXRlbXMgfHwgbXlJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCB2aWV3ZXJMaXN0OiBMaXN0RW50cnlbXSA9IG15SXRlbXMubWFwKChpLCBpZHgpID0+ICh7XG4gICAgc2hvd0lkOiBpLnNob3dfaWQsXG4gICAgcmF0aW5nOiBpLnJhdGluZyxcbiAgICBwb3NpdGlvbjogaS5wb3NpdGlvbiA/PyBpZHgsXG4gIH0pKTtcblxuICAvLyBGZXRjaCBhbGwgcHVibGljIGxpc3RzIChleGNsdWRpbmcgc2VsZikgd2l0aCBwcm9maWxlIGluZm9cbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBwcm9maWxlcyhpZCwgdXNlcm5hbWUsIGF2YXRhcl91cmwpXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZm9yIHRob3NlIGxpc3RzIGluIG9uZSBiYXRjaFxuICBjb25zdCB7IGRhdGE6IGFsbEl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJsaXN0X2lkLCBzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uXCIpXG4gICAgLmluKFwibGlzdF9pZFwiLCBsaXN0SWRzKTtcblxuICBpZiAoIWFsbEl0ZW1zKSByZXR1cm4gW107XG5cbiAgLy8gR3JvdXAgaXRlbXMgYnkgbGlzdF9pZFxuICBjb25zdCBpdGVtc0J5TGlzdCA9IG5ldyBNYXA8c3RyaW5nLCBMaXN0RW50cnlbXT4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGFsbEl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtc0J5TGlzdC5oYXMoaXRlbS5saXN0X2lkKSkgaXRlbXNCeUxpc3Quc2V0KGl0ZW0ubGlzdF9pZCwgW10pO1xuICAgIGl0ZW1zQnlMaXN0LmdldChpdGVtLmxpc3RfaWQpIS5wdXNoKHtcbiAgICAgIHNob3dJZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ2hlY2sgd2hvIHRoZSBjdXJyZW50IHVzZXIgaXMgYWxyZWFkeSBmb2xsb3dpbmdcbiAgY29uc3QgeyBkYXRhOiBmb2xsb3dzRGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuc2VsZWN0KFwiZm9sbG93aW5nX2lkXCIpXG4gICAgLmVxKFwiZm9sbG93ZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgY29uc3QgZm9sbG93aW5nSWRzID0gbmV3IFNldCgoZm9sbG93c0RhdGEgPz8gW10pLm1hcCgoZikgPT4gZi5mb2xsb3dpbmdfaWQpKTtcblxuICAvLyBDb21wdXRlIHNpbWlsYXJpdHkgZm9yIGVhY2ggdXNlclxuICBjb25zdCByZXN1bHRzOiBTaW1pbGFyVXNlcltdID0gW107XG5cbiAgZm9yIChjb25zdCBsaXN0IG9mIHB1YmxpY0xpc3RzKSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IEFycmF5LmlzQXJyYXkobGlzdC5wcm9maWxlcylcbiAgICAgID8gbGlzdC5wcm9maWxlc1swXVxuICAgICAgOiBsaXN0LnByb2ZpbGVzO1xuICAgIGlmICghcHJvZmlsZSkgY29udGludWU7XG5cbiAgICBjb25zdCBvdGhlckl0ZW1zID0gaXRlbXNCeUxpc3QuZ2V0KGxpc3QuaWQpID8/IFtdO1xuICAgIGlmIChvdGhlckl0ZW1zLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG5cbiAgICBjb25zdCBzaW1pbGFyaXR5ID0gY29tcHV0ZUxpc3RTaW1pbGFyaXR5KHZpZXdlckxpc3QsIG90aGVySXRlbXMpO1xuICAgIGlmIChzaW1pbGFyaXR5ID09PSAwKSBjb250aW51ZTtcblxuICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICBpZDogcHJvZmlsZS5pZCxcbiAgICAgIHVzZXJuYW1lOiBwcm9maWxlLnVzZXJuYW1lLFxuICAgICAgYXZhdGFyX3VybDogcHJvZmlsZS5hdmF0YXJfdXJsLFxuICAgICAgc2hvd19jb3VudDogb3RoZXJJdGVtcy5sZW5ndGgsXG4gICAgICBzaW1pbGFyaXR5LFxuICAgICAgaXNfZm9sbG93aW5nOiBmb2xsb3dpbmdJZHMuaGFzKHByb2ZpbGUuaWQpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU29ydCBieSBzaW1pbGFyaXR5IGRlc2NlbmRpbmcsIHJldHVybiB0b3AgM1xuICByZXR1cm4gcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBiLnNpbWlsYXJpdHkgLSBhLnNpbWlsYXJpdHkpLnNsaWNlKDAsIDMpO1xufVxuXG5leHBvcnQgdHlwZSBSZWNvbW1lbmRlZFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIHNjb3JlOiBudW1iZXI7XG4gIHJlY29tbWVuZGVkQnk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWNvbW1lbmRhdGlvbnMoKTogUHJvbWlzZTxSZWNvbW1lbmRlZFNob3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gMS4gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgKyBpdGVtc1xuICBjb25zdCB7IGRhdGE6IG15TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIW15TGlzdCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YTogbXlJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmICghbXlJdGVtcyB8fCBteUl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHZpZXdlckxpc3Q6IExpc3RFbnRyeVtdID0gbXlJdGVtcy5tYXAoKGksIGlkeCkgPT4gKHtcbiAgICBzaG93SWQ6IGkuc2hvd19pZCxcbiAgICByYXRpbmc6IGkucmF0aW5nLFxuICAgIHBvc2l0aW9uOiBpLnBvc2l0aW9uID8/IGlkeCxcbiAgfSkpO1xuXG4gIC8vIDIuIEZldGNoIGFsbCBvdGhlciBwdWJsaWMgbGlzdHMgd2l0aCB0aGVpciBpdGVtcyBpbiBvbmUgcXVlcnlcbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgbGlzdCBpdGVtcyBmb3IgdGhvc2UgbGlzdHMgaW4gb25lIGJhdGNoXG4gIGNvbnN0IHsgZGF0YTogYWxsSXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImxpc3RfaWQsIHNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIGxpc3RJZHMpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSk7XG5cbiAgaWYgKCFhbGxJdGVtcyB8fCBhbGxJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyAzLiBHcm91cCBpdGVtcyBieSB1c2VyXG4gIGNvbnN0IGxpc3RUb1VzZXIgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGwgb2YgcHVibGljTGlzdHMpIHtcbiAgICBsaXN0VG9Vc2VyLnNldChsLmlkLCBsLnVzZXJfaWQpO1xuICB9XG5cbiAgY29uc3QgdXNlckl0ZW1zTWFwID0gbmV3IE1hcDxzdHJpbmcsIExpc3RFbnRyeVtdPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgYWxsSXRlbXMpIHtcbiAgICBjb25zdCB1c2VySWQgPSBsaXN0VG9Vc2VyLmdldChpdGVtLmxpc3RfaWQpO1xuICAgIGlmICghdXNlcklkKSBjb250aW51ZTtcbiAgICBpZiAoIXVzZXJJdGVtc01hcC5oYXModXNlcklkKSkgdXNlckl0ZW1zTWFwLnNldCh1c2VySWQsIFtdKTtcbiAgICB1c2VySXRlbXNNYXAuZ2V0KHVzZXJJZCkhLnB1c2goe1xuICAgICAgc2hvd0lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBvdGhlckxpc3RzOiBVc2VyTGlzdFtdID0gW107XG4gIGZvciAoY29uc3QgW3VzZXJJZCwgaXRlbXNdIG9mIHVzZXJJdGVtc01hcCkge1xuICAgIG90aGVyTGlzdHMucHVzaCh7IHVzZXJJZCwgaXRlbXMgfSk7XG4gIH1cblxuICAvLyA0LiBSdW4gc2NvcmluZyBhbGdvcml0aG1cbiAgY29uc3Qgc2NvcmVkID0gc2NvcmVSZWNvbW1lbmRhdGlvbnModmlld2VyTGlzdCwgb3RoZXJMaXN0cyk7XG5cbiAgaWYgKHNjb3JlZC5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyA1LiBGZXRjaCBzaG93IG1ldGFkYXRhIGZvciByZWNvbW1lbmRlZCBzaG93c1xuICBjb25zdCBzaG93SWRzID0gc2NvcmVkLm1hcCgocykgPT4gcy5zaG93SWQpO1xuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHNjb3JlZFxuICAgIC5tYXAoKHMpID0+IHtcbiAgICAgIGNvbnN0IHNob3cgPSBzaG93TWFwLmdldChzLnNob3dJZCk7XG4gICAgICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHNob3cuaWQsXG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICAgIHNjb3JlOiBNYXRoLnJvdW5kKHMuc2NvcmUgKiAxMDApIC8gMTAwLFxuICAgICAgICByZWNvbW1lbmRlZEJ5OiBzLnJlY29tbWVuZGVkQnksXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUmVjb21tZW5kZWRTaG93ID0+IHIgIT09IG51bGwpO1xufVxuXG5leHBvcnQgdHlwZSBQb3B1bGFyU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgYWRkZWRDb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBvcHVsYXJTaG93cygpOiBQcm9taXNlPFBvcHVsYXJTaG93W10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICAvLyBHZXQgYWxsIHB1YmxpYyBsaXN0IElEc1xuICBjb25zdCB7IGRhdGE6IHB1YmxpY0xpc3RzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpc19wdWJsaWNcIiwgdHJ1ZSk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBwdWJsaWNMaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBHZXQgYWxsIGl0ZW1zIGZyb20gcHVibGljIGxpc3RzXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWRcIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIHB1YmxpY0xpc3RJZHMpO1xuXG4gIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG5cbiAgLy8gQ291bnQgb2NjdXJyZW5jZXMgcGVyIHNob3dcbiAgY29uc3QgY291bnRNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb3VudE1hcC5zZXQoaXRlbS5zaG93X2lkLCAoY291bnRNYXAuZ2V0KGl0ZW0uc2hvd19pZCkgPz8gMCkgKyAxKTtcbiAgfVxuXG4gIC8vIFNvcnQgYnkgY291bnQsIHRha2UgdG9wIDEyXG4gIGNvbnN0IHRvcEVudHJpZXMgPSBBcnJheS5mcm9tKGNvdW50TWFwLmVudHJpZXMoKSlcbiAgICAuc29ydCgoYSwgYikgPT4gYlsxXSAtIGFbMV0pXG4gICAgLnNsaWNlKDAsIDEyKTtcblxuICBjb25zdCBzaG93SWRzID0gdG9wRW50cmllcy5tYXAoKFtpZF0pID0+IGlkKTtcblxuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHRvcEVudHJpZXNcbiAgICAubWFwKChbaWQsIGNvdW50XSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdyA9IHNob3dNYXAuZ2V0KGlkKTtcbiAgICAgIGlmICghc2hvdykgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogc2hvdy5pZCxcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgICAgYWRkZWRDb3VudDogY291bnQsXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUG9wdWxhclNob3cgPT4gciAhPT0gbnVsbCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImdUQTJIc0IsK0xBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/tags/data:bc3a77 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addTagToShow",
    ()=>$$RSC_SERVER_ACTION_4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"6047a68e29f9813fbbe64f95450ec562613b4d4092":"addTagToShow"},"src/app/[locale]/(app)/tags/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("6047a68e29f9813fbbe64f95450ec562613b4d4092", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addTagToShow");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG5leHBvcnQgdHlwZSBUYWdSb3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIG5hbWU6IHN0cmluZztcbiAgY29sb3I6IHN0cmluZztcbiAgaXNfZGVmYXVsdDogYm9vbGVhbjtcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xufTtcblxuLyoqIFJldHVybnMgYWxsIHRhZ3MgdmlzaWJsZSB0byB0aGUgY3VycmVudCB1c2VyOiBkZWZhdWx0ICsgdGhlaXIgb3duIGN1c3RvbSB0YWdzICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlclRhZ3MoKTogUHJvbWlzZTxUYWdSb3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgLm9yZGVyKFwiaXNfZGVmYXVsdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJuYW1lXCIpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEZpbHRlciB0byBvbmx5IGRlZmF1bHQgKyBvd24gKFJMUyBhbHNvIGVuZm9yY2VzIHRoaXMsIGJ1dCBiZSBleHBsaWNpdClcbiAgcmV0dXJuIChkYXRhID8/IFtdKS5maWx0ZXIoXG4gICAgKHQpID0+IHQuaXNfZGVmYXVsdCB8fCB0LnVzZXJfaWQgPT09IHVzZXI/LmlkLFxuICApIGFzIFRhZ1Jvd1tdO1xufVxuXG4vKiogQ3JlYXRlcyBhIG5ldyBjdXN0b20gdGFnIGZvciB0aGUgYXV0aGVudGljYXRlZCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGFnKFxuICBuYW1lOiBzdHJpbmcsXG4gIGNvbG9yID0gXCJzbGF0ZVwiLFxuKTogUHJvbWlzZTxUYWdSb3c+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHRyaW1tZWQgPSBuYW1lLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkIHx8IHRyaW1tZWQubGVuZ3RoID4gNTApIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdGFnIG5hbWVcIik7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuaW5zZXJ0KHsgdXNlcl9pZDogdXNlci5pZCwgbmFtZTogdHJpbW1lZCwgY29sb3IsIGlzX2RlZmF1bHQ6IGZhbHNlIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICByZXZhbGlkYXRlUGF0aChcIi9wcm9maWxlXCIpO1xuICByZXR1cm4gZGF0YSBhcyBUYWdSb3c7XG59XG5cbi8qKiBVcGRhdGVzIHRoZSBjb2xvciBvZiBhIGN1c3RvbSB0YWcgb3duZWQgYnkgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRhZ0NvbG9yKFxuICB0YWdJZDogc3RyaW5nLFxuICBjb2xvcjogc3RyaW5nLFxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC51cGRhdGUoeyBjb2xvciB9KVxuICAgIC5lcShcImlkXCIsIHRhZ0lkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJpc19kZWZhdWx0XCIsIGZhbHNlKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbn1cblxuLyoqIERlbGV0ZXMgYSBjdXN0b20gdGFnIG93bmVkIGJ5IHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgKGRlZmF1bHQgdGFncyBjYW5ub3QgYmUgZGVsZXRlZCkgKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVUYWcodGFnSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuZGVsZXRlKClcbiAgICAuZXEoXCJpZFwiLCB0YWdJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwiaXNfZGVmYXVsdFwiLCBmYWxzZSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIHJldmFsaWRhdGVQYXRoKFwiL3Byb2ZpbGVcIik7XG59XG5cbi8qKiBBc3NpZ25zIGEgdGFnIHRvIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRhZ1RvU2hvdyhcbiAgc2hvd0lkOiBzdHJpbmcsXG4gIHRhZ0lkOiBzdHJpbmcsXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICB1c2VyX2lkOiB1c2VyLmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICB0YWdfaWQ6IHRhZ0lkLFxuICB9KTtcblxuICAvLyBJZ25vcmUgZHVwbGljYXRlIChhbHJlYWR5IHRhZ2dlZClcbiAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgIT09IFwiMjM1MDVcIikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmVtb3ZlcyBhIHRhZyBmcm9tIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVRhZ0Zyb21TaG93KFxuICBzaG93SWQ6IHN0cmluZyxcbiAgdGFnSWQ6IHN0cmluZyxcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5kZWxldGUoKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIHNob3dJZClcbiAgICAuZXEoXCJ0YWdfaWRcIiwgdGFnSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmV0dXJucyB0YWcgSURzIGFzc2lnbmVkIHRvIGEgc3BlY2lmaWMgc2hvdyBieSB0aGUgY3VycmVudCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2hvd1RhZ0lkcyhzaG93SWQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5zZWxlY3QoXCJ0YWdfaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpO1xuXG4gIHJldHVybiAoZGF0YSA/PyBbXSkubWFwKChyKSA9PiByLnRhZ19pZCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InVTQXFHc0IseUxBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/tags/data:323def [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "removeTagFromShow",
    ()=>$$RSC_SERVER_ACTION_5
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"608e9ea41197d7d7ace02c93d35d89052daba0afbf":"removeTagFromShow"},"src/app/[locale]/(app)/tags/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("608e9ea41197d7d7ace02c93d35d89052daba0afbf", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "removeTagFromShow");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG5leHBvcnQgdHlwZSBUYWdSb3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIG5hbWU6IHN0cmluZztcbiAgY29sb3I6IHN0cmluZztcbiAgaXNfZGVmYXVsdDogYm9vbGVhbjtcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xufTtcblxuLyoqIFJldHVybnMgYWxsIHRhZ3MgdmlzaWJsZSB0byB0aGUgY3VycmVudCB1c2VyOiBkZWZhdWx0ICsgdGhlaXIgb3duIGN1c3RvbSB0YWdzICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlclRhZ3MoKTogUHJvbWlzZTxUYWdSb3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgLm9yZGVyKFwiaXNfZGVmYXVsdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJuYW1lXCIpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEZpbHRlciB0byBvbmx5IGRlZmF1bHQgKyBvd24gKFJMUyBhbHNvIGVuZm9yY2VzIHRoaXMsIGJ1dCBiZSBleHBsaWNpdClcbiAgcmV0dXJuIChkYXRhID8/IFtdKS5maWx0ZXIoXG4gICAgKHQpID0+IHQuaXNfZGVmYXVsdCB8fCB0LnVzZXJfaWQgPT09IHVzZXI/LmlkLFxuICApIGFzIFRhZ1Jvd1tdO1xufVxuXG4vKiogQ3JlYXRlcyBhIG5ldyBjdXN0b20gdGFnIGZvciB0aGUgYXV0aGVudGljYXRlZCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGFnKFxuICBuYW1lOiBzdHJpbmcsXG4gIGNvbG9yID0gXCJzbGF0ZVwiLFxuKTogUHJvbWlzZTxUYWdSb3c+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHRyaW1tZWQgPSBuYW1lLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkIHx8IHRyaW1tZWQubGVuZ3RoID4gNTApIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdGFnIG5hbWVcIik7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuaW5zZXJ0KHsgdXNlcl9pZDogdXNlci5pZCwgbmFtZTogdHJpbW1lZCwgY29sb3IsIGlzX2RlZmF1bHQ6IGZhbHNlIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICByZXZhbGlkYXRlUGF0aChcIi9wcm9maWxlXCIpO1xuICByZXR1cm4gZGF0YSBhcyBUYWdSb3c7XG59XG5cbi8qKiBVcGRhdGVzIHRoZSBjb2xvciBvZiBhIGN1c3RvbSB0YWcgb3duZWQgYnkgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRhZ0NvbG9yKFxuICB0YWdJZDogc3RyaW5nLFxuICBjb2xvcjogc3RyaW5nLFxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC51cGRhdGUoeyBjb2xvciB9KVxuICAgIC5lcShcImlkXCIsIHRhZ0lkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJpc19kZWZhdWx0XCIsIGZhbHNlKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbn1cblxuLyoqIERlbGV0ZXMgYSBjdXN0b20gdGFnIG93bmVkIGJ5IHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgKGRlZmF1bHQgdGFncyBjYW5ub3QgYmUgZGVsZXRlZCkgKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVUYWcodGFnSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuZGVsZXRlKClcbiAgICAuZXEoXCJpZFwiLCB0YWdJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwiaXNfZGVmYXVsdFwiLCBmYWxzZSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIHJldmFsaWRhdGVQYXRoKFwiL3Byb2ZpbGVcIik7XG59XG5cbi8qKiBBc3NpZ25zIGEgdGFnIHRvIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRhZ1RvU2hvdyhcbiAgc2hvd0lkOiBzdHJpbmcsXG4gIHRhZ0lkOiBzdHJpbmcsXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICB1c2VyX2lkOiB1c2VyLmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICB0YWdfaWQ6IHRhZ0lkLFxuICB9KTtcblxuICAvLyBJZ25vcmUgZHVwbGljYXRlIChhbHJlYWR5IHRhZ2dlZClcbiAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgIT09IFwiMjM1MDVcIikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmVtb3ZlcyBhIHRhZyBmcm9tIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVRhZ0Zyb21TaG93KFxuICBzaG93SWQ6IHN0cmluZyxcbiAgdGFnSWQ6IHN0cmluZyxcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5kZWxldGUoKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIHNob3dJZClcbiAgICAuZXEoXCJ0YWdfaWRcIiwgdGFnSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmV0dXJucyB0YWcgSURzIGFzc2lnbmVkIHRvIGEgc3BlY2lmaWMgc2hvdyBieSB0aGUgY3VycmVudCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2hvd1RhZ0lkcyhzaG93SWQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5zZWxlY3QoXCJ0YWdfaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpO1xuXG4gIHJldHVybiAoZGF0YSA/PyBbXSkubWFwKChyKSA9PiByLnRhZ19pZCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRTQTBIc0IsOExBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/tags/data:d158f5 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTag",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60d8731241f7f02ef758fdd95e3f779b4382a6368e":"createTag"},"src/app/[locale]/(app)/tags/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60d8731241f7f02ef758fdd95e3f779b4382a6368e", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "createTag");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG5leHBvcnQgdHlwZSBUYWdSb3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJfaWQ6IHN0cmluZyB8IG51bGw7XG4gIG5hbWU6IHN0cmluZztcbiAgY29sb3I6IHN0cmluZztcbiAgaXNfZGVmYXVsdDogYm9vbGVhbjtcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xufTtcblxuLyoqIFJldHVybnMgYWxsIHRhZ3MgdmlzaWJsZSB0byB0aGUgY3VycmVudCB1c2VyOiBkZWZhdWx0ICsgdGhlaXIgb3duIGN1c3RvbSB0YWdzICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlclRhZ3MoKTogUHJvbWlzZTxUYWdSb3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgLm9yZGVyKFwiaXNfZGVmYXVsdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJuYW1lXCIpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEZpbHRlciB0byBvbmx5IGRlZmF1bHQgKyBvd24gKFJMUyBhbHNvIGVuZm9yY2VzIHRoaXMsIGJ1dCBiZSBleHBsaWNpdClcbiAgcmV0dXJuIChkYXRhID8/IFtdKS5maWx0ZXIoXG4gICAgKHQpID0+IHQuaXNfZGVmYXVsdCB8fCB0LnVzZXJfaWQgPT09IHVzZXI/LmlkLFxuICApIGFzIFRhZ1Jvd1tdO1xufVxuXG4vKiogQ3JlYXRlcyBhIG5ldyBjdXN0b20gdGFnIGZvciB0aGUgYXV0aGVudGljYXRlZCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGFnKFxuICBuYW1lOiBzdHJpbmcsXG4gIGNvbG9yID0gXCJzbGF0ZVwiLFxuKTogUHJvbWlzZTxUYWdSb3c+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHRyaW1tZWQgPSBuYW1lLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkIHx8IHRyaW1tZWQubGVuZ3RoID4gNTApIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdGFnIG5hbWVcIik7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuaW5zZXJ0KHsgdXNlcl9pZDogdXNlci5pZCwgbmFtZTogdHJpbW1lZCwgY29sb3IsIGlzX2RlZmF1bHQ6IGZhbHNlIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICByZXZhbGlkYXRlUGF0aChcIi9wcm9maWxlXCIpO1xuICByZXR1cm4gZGF0YSBhcyBUYWdSb3c7XG59XG5cbi8qKiBVcGRhdGVzIHRoZSBjb2xvciBvZiBhIGN1c3RvbSB0YWcgb3duZWQgYnkgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRhZ0NvbG9yKFxuICB0YWdJZDogc3RyaW5nLFxuICBjb2xvcjogc3RyaW5nLFxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwidGFnc1wiKVxuICAgIC51cGRhdGUoeyBjb2xvciB9KVxuICAgIC5lcShcImlkXCIsIHRhZ0lkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJpc19kZWZhdWx0XCIsIGZhbHNlKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbn1cblxuLyoqIERlbGV0ZXMgYSBjdXN0b20gdGFnIG93bmVkIGJ5IHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgKGRlZmF1bHQgdGFncyBjYW5ub3QgYmUgZGVsZXRlZCkgKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVUYWcodGFnSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInRhZ3NcIilcbiAgICAuZGVsZXRlKClcbiAgICAuZXEoXCJpZFwiLCB0YWdJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwiaXNfZGVmYXVsdFwiLCBmYWxzZSk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIHJldmFsaWRhdGVQYXRoKFwiL3Byb2ZpbGVcIik7XG59XG5cbi8qKiBBc3NpZ25zIGEgdGFnIHRvIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRhZ1RvU2hvdyhcbiAgc2hvd0lkOiBzdHJpbmcsXG4gIHRhZ0lkOiBzdHJpbmcsXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICB1c2VyX2lkOiB1c2VyLmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICB0YWdfaWQ6IHRhZ0lkLFxuICB9KTtcblxuICAvLyBJZ25vcmUgZHVwbGljYXRlIChhbHJlYWR5IHRhZ2dlZClcbiAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgIT09IFwiMjM1MDVcIikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmVtb3ZlcyBhIHRhZyBmcm9tIGEgc2hvdyBmb3IgdGhlIGN1cnJlbnQgdXNlciAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVRhZ0Zyb21TaG93KFxuICBzaG93SWQ6IHN0cmluZyxcbiAgdGFnSWQ6IHN0cmluZyxcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5kZWxldGUoKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuZXEoXCJzaG93X2lkXCIsIHNob3dJZClcbiAgICAuZXEoXCJ0YWdfaWRcIiwgdGFnSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xufVxuXG4vKiogUmV0dXJucyB0YWcgSURzIGFzc2lnbmVkIHRvIGEgc3BlY2lmaWMgc2hvdyBieSB0aGUgY3VycmVudCB1c2VyICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2hvd1RhZ0lkcyhzaG93SWQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgIC5zZWxlY3QoXCJ0YWdfaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpO1xuXG4gIHJldHVybiAoZGF0YSA/PyBbXSkubWFwKChyKSA9PiByLnRhZ19pZCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Im9TQW9Dc0Isc0xBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/shows/data:e3ef0c [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchTmdbData",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"409722b1e6e2facdc7051447d11177a4e821d718a5":"fetchTmdbData"},"src/app/[locale]/(app)/shows/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("409722b1e6e2facdc7051447d11177a4e821d718a5", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "fetchTmdbData");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHtcbiAgZmluZEJ5SW1kYklkLFxuICBzZWFyY2hTaG93cyxcbiAgc2VhcmNoTW92aWVzLFxuICBnZXRTaG93RGV0YWlscyxcbiAgZ2V0TW92aWVEZXRhaWxzLFxuICBub3JtYWxpemVNb3ZpZUFzU2hvdyxcbiAgZXh0cmFjdFRyYWlsZXJVcmwsXG59IGZyb20gXCJAL2xpYi90bWRiL2NsaWVudFwiO1xuaW1wb3J0IHR5cGUgeyBUTURCU2hvd0V4dGVuZGVkIH0gZnJvbSBcIkAvbGliL3RtZGIvY2xpZW50XCI7XG5cbi8qKlxuICogTGF6aWx5IGZldGNoZXMgVE1EQiBkYXRhIGZvciBhIHNob3cgYW5kIHBlcnNpc3RzIGl0IHRvIHRoZSBkYXRhYmFzZS5cbiAqIENhbGxlZCBvbmNlIHdoZW4gYSB1c2VyIGZpcnN0IHZpc2l0cyBhIHNob3cgZGV0YWlsIHBhZ2UgdGhhdCBoYXNuJ3QgYmVlbiBlbnJpY2hlZCB5ZXQuXG4gKlxuICogQSBzaG93IG5lZWRzIGVucmljaG1lbnQgaWY6XG4gKiAgLSB0bWRiX2ZldGNoZWQgPT09IGZhbHNlICAoYWZ0ZXIgbWlncmF0aW9uKVxuICogIC0gT1IgdG1kYl9pZCBpcyBuZWdhdGl2ZSAgKHBsYWNlaG9sZGVyIHNldCBkdXJpbmcgaW1wb3J0IGJlZm9yZSBtaWdyYXRpb24pXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFRtZGJEYXRhKHNob3dJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG5cbiAgY29uc3QgeyBkYXRhOiBzaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiKlwiKVxuICAgIC5lcShcImlkXCIsIHNob3dJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzaG93KSByZXR1cm4gbnVsbDtcblxuICAvLyBBbHJlYWR5IGVucmljaGVkXG4gIGNvbnN0IG5lZWRzRmV0Y2ggPVxuICAgIChzaG93IGFzIHVua25vd24gYXMgeyB0bWRiX2ZldGNoZWQ/OiBib29sZWFuIH0pLnRtZGJfZmV0Y2hlZCA9PT0gZmFsc2UgfHxcbiAgICAoc2hvdy50bWRiX2lkICE9PSBudWxsICYmIHNob3cudG1kYl9pZCA8IDApIHx8XG4gICAgc2hvdy50bWRiX2lkID09PSBudWxsIHx8XG4gICAgLy8gUmV0cnkgaWYgcHJldmlvdXNseSBmZXRjaGVkIGJ1dCBub3RoaW5nIHdhcyBmb3VuZCAoZS5nLiB3YXMgYSBtb3ZpZSwgb25seSBUViB3YXMgc2VhcmNoZWQpXG4gICAgKCFzaG93LnBvc3Rlcl9wYXRoICYmICFzaG93Lm92ZXJ2aWV3KTtcblxuICBpZiAoIW5lZWRzRmV0Y2gpIHJldHVybiBzaG93O1xuXG4gIGxldCBmb3VuZDogVE1EQlNob3dFeHRlbmRlZCB8IG51bGwgPSBudWxsO1xuICBsZXQgaXNNb3ZpZU1hdGNoID0gZmFsc2U7XG5cbiAgLy8gU3RyYXRlZ3kgMTogbG9va3VwIGJ5IGV4aXN0aW5nIHBvc2l0aXZlIHRtZGJfaWQgYXMgYSBUViBzaG93XG4gIGlmIChzaG93LnRtZGJfaWQgIT09IG51bGwgJiYgc2hvdy50bWRiX2lkID4gMCkge1xuICAgIHRyeSB7XG4gICAgICBmb3VuZCA9IGF3YWl0IGdldFNob3dEZXRhaWxzKHNob3cudG1kYl9pZCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBUaGUgdG1kYl9pZCBtaWdodCBiZWxvbmcgdG8gYSBtb3ZpZSDigJQgY2hlY2sgYW5kIGZsYWcgZm9yIHJlbW92YWxcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG1vdmllID0gYXdhaXQgZ2V0TW92aWVEZXRhaWxzKHNob3cudG1kYl9pZCk7XG4gICAgICAgIGZvdW5kID0gbm9ybWFsaXplTW92aWVBc1Nob3cobW92aWUpO1xuICAgICAgICBpc01vdmllTWF0Y2ggPSB0cnVlO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8qIGZhbGwgdGhyb3VnaCAqL1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFN0cmF0ZWd5IDI6IGxvb2t1cCBieSBJTURiIElEXG4gIGlmICghZm91bmQgJiYgc2hvdy5pbWRiX2lkKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc2hvdzogdHZNYXRjaCwgbW92aWU6IG1vdmllTWF0Y2ggfSA9IGF3YWl0IGZpbmRCeUltZGJJZChzaG93LmltZGJfaWQpO1xuICAgICAgaWYgKHR2TWF0Y2gpIHtcbiAgICAgICAgZm91bmQgPSBhd2FpdCBnZXRTaG93RGV0YWlscyh0dk1hdGNoLmlkKTtcbiAgICAgIH0gZWxzZSBpZiAobW92aWVNYXRjaCkge1xuICAgICAgICAvLyBJTURiIElEIHJlc29sdmVzIHRvIGEgbW92aWUg4oCUIGZsYWcgZm9yIHJlbW92YWxcbiAgICAgICAgY29uc3QgbW92aWVEZXRhaWxzID0gYXdhaXQgZ2V0TW92aWVEZXRhaWxzKG1vdmllTWF0Y2guaWQpO1xuICAgICAgICBmb3VuZCA9IG5vcm1hbGl6ZU1vdmllQXNTaG93KG1vdmllRGV0YWlscyk7XG4gICAgICAgIGlzTW92aWVNYXRjaCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBmYWxsIHRocm91Z2ggKi9cbiAgICB9XG4gIH1cblxuICAvLyBTdHJhdGVneSAzOiBzZWFyY2ggYnkgdGl0bGUgYXMgVFYgc2hvd1xuICBpZiAoIWZvdW5kKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBzZWFyY2hTaG93cyhzaG93LnRpdGxlKTtcbiAgICAgIGNvbnN0IGZpcnN0ID0gZGF0YS5yZXN1bHRzPy5bMF07XG4gICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgZm91bmQgPSBhd2FpdCBnZXRTaG93RGV0YWlscyhmaXJzdC5pZCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBpZ25vcmUgKi9cbiAgICB9XG4gIH1cblxuICAvLyBTdHJhdGVneSA0OiBzZWFyY2ggYnkgdGl0bGUgYXMgbW92aWUg4oCUIHRoaXMgaXMgYSBUViByYW5rZXIsIHNvIGZsYWcgZm9yIHJlbW92YWxcbiAgaWYgKCFmb3VuZCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgc2VhcmNoTW92aWVzKHNob3cudGl0bGUpO1xuICAgICAgY29uc3QgZmlyc3QgPSBkYXRhLnJlc3VsdHM/LlswXTtcbiAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICBmb3VuZCA9IG5vcm1hbGl6ZU1vdmllQXNTaG93KGF3YWl0IGdldE1vdmllRGV0YWlscyhmaXJzdC5pZCkpO1xuICAgICAgICBpc01vdmllTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaWdub3JlICovXG4gICAgfVxuICB9XG5cbiAgaWYgKCFmb3VuZCkge1xuICAgIC8vIE1hcmsgYXMgZmV0Y2hlZCBldmVuIGlmIFRNREIgaGFzIG5vIG1hdGNoLCB0byBhdm9pZCByZXBlYXRlZCBsb29rdXBzLlxuICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAudXBkYXRlKHsgdG1kYl9mZXRjaGVkOiB0cnVlIH0gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXG4gICAgICAuZXEoXCJpZFwiLCBzaG93SWQpXG4gICAgICAudGhlbigoKSA9PiBudWxsLCAoKSA9PiBudWxsKTtcbiAgICByZXR1cm4gc2hvdztcbiAgfVxuXG4gIC8vIFRoaXMgaXMgYSBUViByYW5rZXIg4oCUIGlmIFRNREIgb25seSByZWNvZ25pc2VzIHRoZSBlbnRyeSBhcyBhIG1vdmllLCByZW1vdmUgaXQuXG4gIGlmIChpc01vdmllTWF0Y2gpIHtcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwic2hvd3NcIikuZGVsZXRlKCkuZXEoXCJpZFwiLCBzaG93SWQpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYW5vdGhlciBzaG93IHJvdyBhbHJlYWR5IGhvbGRzIHRoaXMgcmVhbCB0bWRiX2lkXG4gIGNvbnN0IHsgZGF0YTogY29uZmxpY3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgZm91bmQuaWQpXG4gICAgLm5lcShcImlkXCIsIHNob3dJZClcbiAgICAubGltaXQoMSlcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGNvbmZsaWN0KSB7XG4gICAgLy8gTWVyZ2U6IHBvaW50IGFsbCBsaXN0X2l0ZW1zIGZyb20gdGhpcyBwbGFjZWhvbGRlciB0byB0aGUgZXhpc3RpbmcgY2Fub25pY2FsIHNob3dcbiAgICBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAudXBkYXRlKHsgc2hvd19pZDogY29uZmxpY3QuaWQgfSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxuICAgICAgLmVxKFwic2hvd19pZFwiLCBzaG93SWQpO1xuICAgIC8vIERlbGV0ZSB0aGUgcGxhY2Vob2xkZXIgc2hvd1xuICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93c1wiKS5kZWxldGUoKS5lcShcImlkXCIsIHNob3dJZCk7XG4gICAgLy8gUmV0dXJuIHRoZSBjYW5vbmljYWwgc2hvd1xuICAgIGNvbnN0IHsgZGF0YTogY2Fub25pY2FsIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLnNlbGVjdChcIipcIilcbiAgICAgIC5lcShcImlkXCIsIGNvbmZsaWN0LmlkKVxuICAgICAgLnNpbmdsZSgpO1xuICAgIHJldHVybiBjYW5vbmljYWw7XG4gIH1cblxuICAvLyBCdWlsZCBleHRyYSBmaWVsZHMgZnJvbSBleHRlbmRlZCBUTURCIHJlc3BvbnNlXG4gIGNvbnN0IHNlYXNvbnNEYXRhID0gZm91bmQuc2Vhc29uc1xuICAgID8gZm91bmQuc2Vhc29uc1xuICAgICAgICAuZmlsdGVyKChzKSA9PiBzLnNlYXNvbl9udW1iZXIgPiAwKSAvLyBleGNsdWRlIFwiU3BlY2lhbHNcIiAoc2Vhc29uIDApXG4gICAgICAgIC5tYXAoKHMpID0+ICh7XG4gICAgICAgICAgc2Vhc29uX251bWJlcjogcy5zZWFzb25fbnVtYmVyLFxuICAgICAgICAgIG5hbWU6IHMubmFtZSxcbiAgICAgICAgICBlcGlzb2RlX2NvdW50OiBzLmVwaXNvZGVfY291bnQsXG4gICAgICAgICAgYWlyX2RhdGU6IHMuYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgfSkpXG4gICAgOiBudWxsO1xuXG4gIGNvbnN0IHRyYWlsZXJVcmwgPSBleHRyYWN0VHJhaWxlclVybChmb3VuZC52aWRlb3MpO1xuXG4gIGNvbnN0IHdhdGNoUHJvdmlkZXJzID0gZm91bmRbXCJ3YXRjaC9wcm92aWRlcnNcIl0/LnJlc3VsdHMgPz8gbnVsbDtcblxuICAvLyBVcGRhdGUgdGhlIHNob3cgd2l0aCByZWFsIFRNREIgZGF0YS5cbiAgLy8gdG1kYl9mZXRjaGVkIGlzIG9ubHkgaW4gdXBkYXRlcyBhZnRlciBtaWdyYXRpb24g4oCUIFBvc3RnUkVTVCBpZ25vcmVzIHVua25vd24gY29sdW1ucyBncmFjZWZ1bGx5LlxuICBjb25zdCB1cGRhdGVzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHtcbiAgICB0bWRiX2lkOiBmb3VuZC5pZCxcbiAgICB0aXRsZTogZm91bmQubmFtZSxcbiAgICBwb3N0ZXJfcGF0aDogZm91bmQucG9zdGVyX3BhdGgsXG4gICAgZmlyc3RfYWlyX2RhdGU6IGZvdW5kLmZpcnN0X2Fpcl9kYXRlIHx8IG51bGwsXG4gICAgb3ZlcnZpZXc6IGZvdW5kLm92ZXJ2aWV3IHx8IG51bGwsXG4gICAgdG1kYl9mZXRjaGVkOiB0cnVlLFxuICAgIHNlYXNvbnNfZGF0YTogc2Vhc29uc0RhdGEsXG4gICAgdHJhaWxlcl91cmw6IHRyYWlsZXJVcmwsXG4gICAgd2F0Y2hfcHJvdmlkZXJzOiB3YXRjaFByb3ZpZGVycyxcbiAgfTtcblxuICBjb25zdCB7IGRhdGE6IHVwZGF0ZWQsIGVycm9yOiB1cGRhdGVFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIHNob3dJZClcbiAgICAuc2VsZWN0KFwiKlwiKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAodXBkYXRlRXJyb3IpIHtcbiAgICAvLyBSZXRyeSB3aXRob3V0IHRtZGJfZmV0Y2hlZCBpZiBjb2x1bW4gZG9lc24ndCBleGlzdCB5ZXQgKHByZS1taWdyYXRpb24pXG4gICAgY29uc3QgeyBkYXRhOiB1cGRhdGVkMiB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC51cGRhdGUoe1xuICAgICAgICB0bWRiX2lkOiBmb3VuZC5pZCxcbiAgICAgICAgdGl0bGU6IGZvdW5kLm5hbWUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBmb3VuZC5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IGZvdW5kLmZpcnN0X2Fpcl9kYXRlIHx8IG51bGwsXG4gICAgICAgIG92ZXJ2aWV3OiBmb3VuZC5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5lcShcImlkXCIsIHNob3dJZClcbiAgICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgcmV0dXJuIHVwZGF0ZWQyO1xuICB9XG5cbiAgcmV0dXJuIHVwZGF0ZWQ7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlTQXNCc0IsMExBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tag-colors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ListHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ListHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ShowRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ShowRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddShowDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AddShowDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/EmptyState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ImportDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ImportDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OnboardingEmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/OnboardingEmptyState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rating-labels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$ecc912__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:ecc912 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$be9c24__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:be9c24 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$e12b52__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:e12b52 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$8ed39d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:8ed39d [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$2325e0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:2325e0 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$3ed202__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:3ed202 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$f23226__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:f23226 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$6ba9ee__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:6ba9ee [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$fb7b5b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:fb7b5b [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$7b27e2__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/explore/data:7b27e2 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$bc3a77__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/tags/data:bc3a77 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$323def__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/tags/data:323def [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$d158f5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/tags/data:d158f5 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$data$3a$e3ef0c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/shows/data:e3ef0c [app-client] (ecmascript) <text/javascript>");
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
        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
        lineNumber: 126,
        columnNumber: 10
    }, this);
}
_s(ShowRowObserver, "GY4PakM7GHToIOMeifgtIFzmjXo=");
_c = ShowRowObserver;
function ListDetailClient({ list, isOwner, isLoggedIn, existingTmdbIds, ratingLabels, allTags = [], showTagsMap: initialShowTagsMap = {}, hasMore: initialHasMore, listId, userLists = [], viewerListEmpty = false }) {
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const i18nRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
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
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$f23226__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getListItemsPage"])(listId, nextPageRef.current);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$7b27e2__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRecommendations"])().then({
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
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$data$3a$e3ef0c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["fetchTmdbData"])(showId);
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$3ed202__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["reorderListItems"])(list.id, newSorted);
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
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$ecc912__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateList"])(list.id, {
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$ecc912__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateList"])(list.id, {
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$be9c24__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addShowToList"])(list.id, show);
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$e12b52__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["removeShowFromList"])(list.id, itemId);
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$8ed39d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateShowRating"])(list.id, itemId, rating);
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$bc3a77__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addTagToShow"])(showId, tagId);
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$323def__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["removeTagFromShow"])(showId, tagId);
                }
            }["ListDetailClient.useCallback[handleTagRemove]"]);
        }
    }["ListDetailClient.useCallback[handleTagRemove]"], [
        startTransition
    ]);
    const handleTagCreate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleTagCreate]": async (name, color)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$d158f5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["createTag"])(name, color);
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$2325e0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateShowNotes"])(list.id, itemId, notes);
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
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$6ba9ee__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addShowToMyList"])({
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
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$fb7b5b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["copyListToMine"])(list.id);
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
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 510,
                        columnNumber: 11
                    }, this),
                    tCommon("back")
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 506,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ListHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListHeader"], {
                                description: listDescription,
                                isPublic: list.is_public,
                                onDescriptionChange: isOwner ? handleDescriptionChange : undefined,
                                onTogglePublic: isOwner ? handleTogglePublic : undefined,
                                readOnly: !isOwner,
                                saveStatus: isOwner ? saveStatus : undefined
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 519,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex shrink-0 items-center gap-2 mt-0.5",
                                children: [
                                    isOwner && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                        href: "/lists/analytics",
                                        className: "flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ChartPie$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartPie"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 534,
                                                columnNumber: 17
                                            }, this),
                                            t("analytics")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 530,
                                        columnNumber: 15
                                    }, this),
                                    isOwner && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAddDialog(true),
                                        className: "hidden items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-accent-hover sm:flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 544,
                                                columnNumber: 17
                                            }, this),
                                            "Add show"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 540,
                                        columnNumber: 15
                                    }, this),
                                    isOwner && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowImport(true),
                                        className: "hidden items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary sm:flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileArrowUp$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileArrowUp"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 553,
                                                columnNumber: 17
                                            }, this),
                                            t("importExternal")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 549,
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
                                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 563,
                                                columnNumber: 17
                                            }, this),
                                            isCopying ? t("copying") : t("copyList")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 558,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 527,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 518,
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
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 577,
                                        columnNumber: 15
                                    }, this),
                                    "Add show"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 573,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowImport(true),
                                className: "flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileArrowUp$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileArrowUp"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 584,
                                        columnNumber: 15
                                    }, this),
                                    t("importExternal")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 580,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 572,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 516,
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
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 595,
                                columnNumber: 13
                            }, this),
                            searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSearchQuery(""),
                                className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-secondary transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                    lineNumber: 607,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 603,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 594,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowFilters((v)=>!v),
                        className: `flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-2 text-xs transition-colors ${showFilters || activeFilterCount > 0 ? "border-border-hover text-text-primary" : "border-border text-text-muted hover:border-border-hover hover:text-text-secondary"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FunnelSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelSimple"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 619,
                                columnNumber: 13
                            }, this),
                            "Filters",
                            activeFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-4 w-4 items-center justify-center rounded-full bg-surface-hover font-mono text-[10px] font-semibold text-text-primary",
                                children: activeFilterCount
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 622,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 611,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 593,
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
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 635,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1.5",
                                children: [
                                    allRatings.map((rating)=>{
                                        const active = filterRatings.has(rating);
                                        const label = rating !== null ? `${rating} · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(rating, ratingLabels)}` : "Unrated";
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
                                                    fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                    lineNumber: 663,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, rating ?? "unrated", true, {
                                            fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                            lineNumber: 646,
                                            columnNumber: 19
                                        }, this);
                                    }),
                                    filterRatings.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilterRatings(new Set()),
                                        className: "text-xs text-text-muted transition-colors hover:text-text-secondary",
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 668,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 638,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 634,
                        columnNumber: 11
                    }, this),
                    allTags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint",
                                children: "Tags"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 681,
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
                                            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagBadgeStyle"])(tag.color),
                                            children: [
                                                tag.name,
                                                active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                                                    size: 10,
                                                    weight: "bold"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                    lineNumber: 701,
                                                    columnNumber: 34
                                                }, this)
                                            ]
                                        }, tag.id, true, {
                                            fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                            lineNumber: 688,
                                            columnNumber: 21
                                        }, this);
                                    }),
                                    filterTagIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilterTagIds([]),
                                        className: "text-xs text-text-muted transition-colors hover:text-text-secondary",
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 706,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 684,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 680,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 632,
                columnNumber: 9
            }, this),
            items.length === 0 ? isOwner ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OnboardingEmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnboardingEmptyState"], {
                onAddShow: ()=>setShowAddDialog(true),
                onImport: ()=>setShowImport(true)
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 722,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                title: "No shows in this list yet"
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 727,
                columnNumber: 11
            }, this) : filteredItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                title: searchQuery ? t("noSearchResults") : t("noFilterResults"),
                description: searchQuery ? t("noSearchResultsHint") : t("noFilterResultsHint")
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 730,
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
                            const tierLabel = group.rating !== null ? `${group.rating} · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(group.rating, ratingLabels)}` : "Unrated";
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "whitespace-nowrap font-mono text-xs font-semibold tracking-widest text-text-faint uppercase",
                                                children: tierLabel
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 757,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-px flex-1 bg-border"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 760,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 756,
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ShowRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShowRow"], {
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
                                                        onNotesChange: isOwner ? (notes)=>handleNotesChange(item.id, notes) : undefined
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                        lineNumber: 772,
                                                        columnNumber: 29
                                                    }, this),
                                                    quickAddFeedback[item.shows.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 text-xs text-accent animate-in fade-in",
                                                        children: quickAddFeedback[item.shows.id]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                        lineNumber: 824,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 767,
                                                columnNumber: 27
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 763,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, group.rating ?? "unrated", true, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 754,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 747,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                    lineNumber: 743,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 737,
                columnNumber: 9
            }, this),
            items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: sentinelRef,
                className: "mt-4 flex justify-center py-4",
                children: loadingMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs text-text-faint",
                    children: "Loading more…"
                }, void 0, false, {
                    fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                    lineNumber: 844,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 842,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddShowDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddShowDialog"], {
                open: showAddDialog,
                onClose: ()=>setShowAddDialog(false),
                onAdd: handleAddShow,
                existingTmdbIds: existingTmdbIds,
                scoreMap: recScoreMap
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 850,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ImportDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImportDialog"], {
                open: showImport,
                onClose: ()=>setShowImport(false),
                onImport: async (data)=>{
                    const { importToMyList } = await __turbopack_context__.A("[project]/src/app/[locale]/(app)/lists/actions.ts [app-client] (ecmascript, async loader)");
                    await importToMyList(data);
                    router.refresh();
                }
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 859,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
        lineNumber: 503,
        columnNumber: 5
    }, this);
}
_s1(ListDetailClient, "qZiyTlIX4DWpQAp3q7AUav0cwRo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
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

//# sourceMappingURL=src_f4edb185._.js.map