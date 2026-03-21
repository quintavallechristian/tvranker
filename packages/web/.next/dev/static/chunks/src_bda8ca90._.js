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
function ListHeader({ name, description, isPublic, onNameChange, onDescriptionChange, onTogglePublic, readOnly = false, saveStatus }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("common");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    readOnly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold tracking-tight text-text-primary",
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/src/components/ListHeader.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: name,
                        onChange: (e)=>onNameChange?.(e.target.value),
                        className: "flex-1 bg-transparent text-xl font-semibold tracking-tight text-text-primary outline-none placeholder:text-text-faint",
                        placeholder: "List name"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ListHeader.tsx",
                        lineNumber: 37,
                        columnNumber: 11
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
                                    lineNumber: 58,
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
                                    lineNumber: 62,
                                    columnNumber: 17
                                }, this),
                                " ",
                                t("private")
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ListHeader.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `flex items-center gap-1.5 text-xs ${isPublic ? "text-accent" : "text-text-muted"}`,
                        children: [
                            isPublic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Globe$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Globe"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/src/components/ListHeader.tsx",
                                lineNumber: 72,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$LockSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LockSimple"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/src/components/ListHeader.tsx",
                                lineNumber: 72,
                                columnNumber: 47
                            }, this),
                            isPublic ? t("public") : t("private")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ListHeader.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    saveStatus && saveStatus !== "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `ml-1 text-xs transition-opacity ${saveStatus === "saving" ? "text-text-faint" : "text-text-muted"}`,
                        children: saveStatus === "saving" ? "Saving…" : "Saved"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ListHeader.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ListHeader.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            readOnly ? description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-text-secondary",
                children: description
            }, void 0, false, {
                fileName: "[project]/src/components/ListHeader.tsx",
                lineNumber: 91,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: description || "",
                onChange: (e)=>onDescriptionChange?.(e.target.value),
                className: "w-full bg-transparent text-sm text-text-secondary outline-none placeholder:text-text-faint",
                placeholder: "Add a description..."
            }, void 0, false, {
                fileName: "[project]/src/components/ListHeader.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ListHeader.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(ListHeader, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
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
    "findByImdbId",
    ()=>findByImdbId,
    "getPosterUrl",
    ()=>getPosterUrl,
    "getShowDetails",
    ()=>getShowDetails,
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
function RatingBar({ value, onChange, className = "", labels }) {
    _s();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const active = hovered ?? value;
    const label = active ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(active, labels) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center gap-2 ${className}`,
        children: [
            active && label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "whitespace-nowrap font-mono text-xs tabular-nums text-text-muted",
                children: [
                    active,
                    " · ",
                    label
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ShowCard.tsx",
                lineNumber: 117,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1",
                children: Array.from({
                    length: 10
                }, (_, i)=>i + 1).map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            onChange(n);
                        },
                        onMouseEnter: ()=>setHovered(n),
                        onMouseLeave: ()=>setHovered(null),
                        className: `size-3.5 rounded-full transition-colors ${active && n <= active ? "bg-accent" : "bg-text-faint/30 hover:bg-accent/50"}`,
                        "aria-label": `Rate ${n}`
                    }, n, false, {
                        fileName: "[project]/src/components/ShowCard.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ShowCard.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ShowCard.tsx",
        lineNumber: 115,
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
                className: "absolute left-0 top-full z-50 mt-1 w-56 rounded-[var(--radius-md)] border border-border bg-bg-surface shadow-lg",
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tmdb/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$DotsSixVertical$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/DotsSixVertical.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Trash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Trash.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Television.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$PlusCircle$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/PlusCircle.es.js [app-client] (ecmascript)");
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
function ShowRow({ id, title, posterPath, rating, position, onRatingChange, onRemove, readOnly = false, showId, ratingLabels, allTags, selectedTagIds, onTagAdd, onTagRemove, onTagCreate, onQuickAdd, quickAddLabel }) {
    _s();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])({
        id,
        disabled: readOnly
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition
    };
    const posterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPosterUrl"])(posterPath, "w92");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        className: `flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-bg-surface p-3 transition-colors hover:border-border-hover ${isDragging ? "opacity-50 shadow-lg" : ""}`,
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
                    lineNumber: 93,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ShowRow.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-6 text-center font-mono text-xs font-bold text-text-muted tabular-nums",
                children: position
            }, void 0, false, {
                fileName: "[project]/src/components/ShowRow.tsx",
                lineNumber: 98,
                columnNumber: 7
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
                    lineNumber: 105,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-full items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                        size: 14,
                        className: "text-text-faint"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 114,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ShowRow.tsx",
                    lineNumber: 113,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ShowRow.tsx",
                lineNumber: 103,
                columnNumber: 7
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
                        lineNumber: 122,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block truncate text-sm font-medium text-text-primary",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    allTags && onTagAdd && onTagRemove && onTagCreate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            lineNumber: 136,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this) : selectedTagIds && selectedTagIds.length > 0 && allTags ? /* Read-only tag badges */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 156,
                                        columnNumber: 19
                                    }, this),
                                    tag.name
                                ]
                            }, tag.id, true, {
                                fileName: "[project]/src/components/ShowRow.tsx",
                                lineNumber: 151,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ShowRow.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ShowRow.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: onRatingChange ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ShowCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RatingBar"], {
                    value: rating,
                    onChange: onRatingChange,
                    labels: ratingLabels
                }, void 0, false, {
                    fileName: "[project]/src/components/ShowRow.tsx",
                    lineNumber: 170,
                    columnNumber: 11
                }, this) : rating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "whitespace-nowrap font-mono text-xs tabular-nums text-accent",
                    children: [
                        rating,
                        " · ",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRatingLabel"])(rating, ratingLabels)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ShowRow.tsx",
                    lineNumber: 176,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs text-text-faint",
                    children: "—"
                }, void 0, false, {
                    fileName: "[project]/src/components/ShowRow.tsx",
                    lineNumber: 180,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ShowRow.tsx",
                lineNumber: 168,
                columnNumber: 7
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
                    lineNumber: 192,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ShowRow.tsx",
                lineNumber: 186,
                columnNumber: 9
            }, this),
            onRemove && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onRemove,
                className: "rounded-[var(--radius-sm)] p-1.5 text-text-faint transition-colors hover:bg-error/10 hover:text-error",
                "aria-label": "Remove from list",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Trash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trash"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/src/components/ShowRow.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ShowRow.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ShowRow.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(ShowRow, "iTIyvp0X9kMGpdHRsWsr2+tGbVI=", false, function() {
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
                className: "w-full rounded-[var(--radius-md)] border border-border bg-bg-surface py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-faint transition-colors focus:border-accent focus:outline-none"
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
function AddShowDialog({ open, onClose, onAdd, existingTmdbIds = [] }) {
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
        className: "fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[10vh] backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-lg rounded-[var(--radius-lg)] border border-border bg-bg-surface",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-border p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-sm font-semibold text-text-primary",
                            children: t("addShow")
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddShowDialog.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-text-muted hover:text-text-primary",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/components/AddShowDialog.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddShowDialog.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddShowDialog.tsx",
                    lineNumber: 60,
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
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/AddShowDialog.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-[50vh] overflow-y-auto",
                    children: [
                        loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center py-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpinnerGap"], {
                                size: 24,
                                className: "animate-spin text-text-muted"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AddShowDialog.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddShowDialog.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this),
                        !loading && results.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-8 text-center text-sm text-text-muted",
                            children: t("searchShows")
                        }, void 0, false, {
                            fileName: "[project]/src/components/AddShowDialog.tsx",
                            lineNumber: 88,
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
                                            lineNumber: 107,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Television"], {
                                                size: 14,
                                                className: "text-text-faint"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AddShowDialog.tsx",
                                                lineNumber: 116,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddShowDialog.tsx",
                                            lineNumber: 115,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddShowDialog.tsx",
                                        lineNumber: 105,
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
                                                lineNumber: 122,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-text-muted",
                                                children: show.first_air_date?.slice(0, 4) || "Unknown"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AddShowDialog.tsx",
                                                lineNumber: 125,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AddShowDialog.tsx",
                                        lineNumber: 121,
                                        columnNumber: 19
                                    }, this),
                                    isAdded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-text-muted",
                                        children: "Added"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddShowDialog.tsx",
                                        lineNumber: 131,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                                        size: 16,
                                        className: "shrink-0 text-accent"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddShowDialog.tsx",
                                        lineNumber: 133,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, show.tmdb_id, true, {
                                fileName: "[project]/src/components/AddShowDialog.tsx",
                                lineNumber: 99,
                                columnNumber: 17
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AddShowDialog.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AddShowDialog.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AddShowDialog.tsx",
        lineNumber: 58,
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
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ImportDialog({ open, onClose, onImport }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("import");
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleFileSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImportDialog.useCallback[handleFileSelect]": async (selectedFile)=>{
            setError(null);
            try {
                const text = await selectedFile.text();
                const json = JSON.parse(text);
                // Accept Format A: { name, shows: [...] }  or  Format B: [ {...}, ... ]
                const isFormatA = json && !Array.isArray(json) && Array.isArray(json.shows);
                const isFormatB = Array.isArray(json) && json.length > 0 && json[0]?.title;
                if (!isFormatA && !isFormatB) {
                    setError(t("invalidFormat"));
                    return;
                }
                setFile(selectedFile);
                setPreview({
                    name: isFormatA ? json.name || selectedFile.name : selectedFile.name,
                    showCount: isFormatA ? json.shows.length : json.length
                });
            } catch  {
                setError(t("invalidFormat"));
            }
        }
    }["ImportDialog.useCallback[handleFileSelect]"], [
        t
    ]);
    const handleImport = async ()=>{
        if (!file) return;
        setLoading(true);
        setError(null);
        try {
            const text = await file.text();
            const json = JSON.parse(text);
            await onImport(json);
            onClose();
        } catch  {
            setError(t("error"));
        } finally{
            setLoading(false);
        }
    };
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-md rounded-[var(--radius-lg)] border border-border bg-bg-surface p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute right-4 top-4 text-text-muted hover:text-text-primary",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$X$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["X"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/src/components/ImportDialog.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "mb-1 text-lg font-semibold text-text-primary",
                    children: t("title")
                }, void 0, false, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-6 text-sm text-text-secondary",
                    children: t("description")
                }, void 0, false, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: ()=>fileInputRef.current?.click(),
                    className: "flex cursor-pointer flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed border-border p-8 transition-colors hover:border-border-hover hover:bg-bg-surface-hover",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$UploadSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadSimple"], {
                            size: 28,
                            className: "text-text-muted"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-text-secondary",
                            children: t("selectFile")
                        }, void 0, false, {
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: fileInputRef,
                            type: "file",
                            accept: ".json",
                            className: "hidden",
                            onChange: (e)=>{
                                const f = e.target.files?.[0];
                                if (f) handleFileSelect(f);
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this),
                preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-bg-elevated p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileText$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileText"], {
                            size: 20,
                            className: "text-accent"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 111,
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
                                    lineNumber: 113,
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
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 112,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 110,
                    columnNumber: 11
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-3 text-xs text-error",
                    role: "alert",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 125,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex justify-end gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "rounded-[var(--radius-md)] px-4 py-2 text-sm text-text-secondary hover:text-text-primary",
                            children: t("cancel") || "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleImport,
                            disabled: !file || loading,
                            className: "flex items-center gap-2 rounded-[var(--radius-md)] bg-accent px-4 py-2 text-sm font-medium text-bg-primary transition-colors hover:bg-accent-hover disabled:opacity-50",
                            children: [
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpinnerGap"], {
                                    size: 14,
                                    className: "animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ImportDialog.tsx",
                                    lineNumber: 143,
                                    columnNumber: 25
                                }, this),
                                loading ? t("importing") : `Import ${preview?.showCount ?? 0} shows`
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ImportDialog.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ImportDialog.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ImportDialog.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ImportDialog.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(ImportDialog, "l3h2K7IArEj33juvEPYS3EF0vJo=", false, function() {
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
"[project]/src/app/[locale]/(app)/lists/data:240ec5 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChzdXBhYmFzZTogQXdhaXRlZDxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+PiwgdXNlcklkOiBzdHJpbmcpIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZClcbiAgICAuc2luZ2xlKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlzdChcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHVwZGF0ZXM6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IGlzX3B1YmxpYz86IGJvb2xlYW4gfSxcbikge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTGlzdChsaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLmRlbGV0ZSgpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9MaXN0KFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIHRtZGJfaWQ6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlPzogc3RyaW5nO1xuICAgIG92ZXJ2aWV3Pzogc3RyaW5nO1xuICB9LFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcHNlcnQgc2hvdyBpbiBzaG93cyB0YWJsZVxuICBsZXQgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOiBzaG93LnRtZGJfaWQsXG4gICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICBwb3N0ZXJfcGF0aDogc2hvdy5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IHNob3cuZmlyc3RfYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcgfHwgbnVsbCxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChzaG93RXJyb3IpIHRocm93IG5ldyBFcnJvcihzaG93RXJyb3IubWVzc2FnZSk7XG4gICAgZXhpc3RpbmdTaG93ID0gbmV3U2hvdztcbiAgfVxuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlb3JkZXJMaXN0SXRlbXMobGlzdElkOiBzdHJpbmcsIGl0ZW1JZHM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcGRhdGUgcG9zaXRpb25zXG4gIGNvbnN0IHVwZGF0ZXMgPSBpdGVtSWRzLm1hcCgoaWQsIGluZGV4KSA9PlxuICAgIHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLnVwZGF0ZSh7IHBvc2l0aW9uOiBpbmRleCB9KS5lcShcImlkXCIsIGlkKSxcbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbCh1cGRhdGVzKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7bGlzdElkfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0RnJvbUpzb24oanNvbkRhdGE6IHVua25vd24pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgcGFyc2VUcmFrdEpzb24gfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2ltcG9ydC90cmFrdC1wYXJzZXJcIik7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlVHJha3RKc29uKGpzb25EYXRhKTtcblxuICAvLyBDcmVhdGUgdGhlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBsaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAobGlzdHM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHBhcnNlZC5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhcnNlZC5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgaXNfcHVibGljOiBwYXJzZWQuaXNfcHVibGljLFxuICAgICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgICB9KVxuICAgIC5zZWxlY3QoKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAobGlzdEVycm9yKSB0aHJvdyBuZXcgRXJyb3IobGlzdEVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEluc2VydCBzaG93cyBkaXJlY3RseSB3aXRob3V0IFRNREIgcmVzb2x1dGlvbi5cbiAgLy8gVE1EQiBkYXRhIHdpbGwgYmUgZmV0Y2hlZCBsYXppbHkgd2hlbiB2aXNpdGluZyB0aGUgc2hvdyBkZXRhaWwgcGFnZS5cbiAgbGV0IHBvc2l0aW9uID0gMDtcbiAgZm9yIChjb25zdCBzaG93IG9mIHBhcnNlZC5zaG93cykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGJTaG93SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCBleGlzdGluZyBzaG93IGJ5IGltZGJfaWQgZmlyc3QsIHRoZW4gYnkgZXhhY3QgdGl0bGVcbiAgICAgIGlmIChzaG93LmltZGJfaWQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAgICAgLmVxKFwiaW1kYl9pZFwiLCBzaG93LmltZGJfaWQpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5pbGlrZShcInRpdGxlXCIsIHNob3cudGl0bGUpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnNlcnQgbmV3IHNob3cgaWYgbm90IGZvdW5kXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIC8vIFVzZSBhIG5lZ2F0aXZlIHRpdGxlIGhhc2ggYXMgcGxhY2Vob2xkZXIgdG1kYl9pZCB1bnRpbCBUTURCIGRhdGEgaXMgZmV0Y2hlZC5cbiAgICAgICAgLy8gVE1EQiBvbmx5IHVzZXMgcG9zaXRpdmUgSURzLCBzbyBuZWdhdGl2ZXMgYXJlIHNhZmUgYXMgcGxhY2Vob2xkZXJzLlxuICAgICAgICAvLyBJZiB0bWRiX2lkIGNvbHVtbiBpcyBudWxsYWJsZSAoYWZ0ZXIgbWlncmF0aW9uKSwgbnVsbCB3b3VsZCBiZSB1c2VkIGhlcmUgaW5zdGVhZC5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUbWRiSWQgPSAtKFxuICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgc2hvdy50aXRsZS5zcGxpdChcIlwiKS5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgKSAlIDIwMDAwMDAwMDBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBuZXdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICAgICAgdG1kYl9pZDogcGxhY2Vob2xkZXJUbWRiSWQsXG4gICAgICAgICAgICBwb3N0ZXJfcGF0aDogbnVsbCxcbiAgICAgICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcnZpZXc6IG51bGwsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuc2luZ2xlKCk7XG4gICAgICAgIGRiU2hvd0lkID0gbmV3U2hvdz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRiU2hvd0lkKSB7XG4gICAgICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgICAgLmluc2VydCh7IGxpc3RfaWQ6IGxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBzaG93OiAke3Nob3cudGl0bGV9YCwgZSk7XG4gICAgfVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGxpc3RJZDogbGlzdC5pZCwgaW1wb3J0ZWRDb3VudDogcG9zaXRpb24gfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdEl0ZW1XaXRoU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlzdF9pZDogc3RyaW5nO1xuICBzaG93X2lkOiBzdHJpbmc7XG4gIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgYWRkZWRfYXQ6IHN0cmluZztcbiAgbm90ZXM6IHN0cmluZyB8IG51bGw7XG4gIHNob3dzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICAgIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgICB0bWRiX2ZldGNoZWQ6IGJvb2xlYW47XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEl0ZW1zUGFnZShcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemUgPSA1MCxcbik6IFByb21pc2U8e1xuICBpdGVtczogTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBoYXNNb3JlOiBib29sZWFuO1xuICBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xufT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJ1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghbGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghbGlzdC5pc19wdWJsaWMgJiYgbGlzdC51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgZnJvbSA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgY29uc3QgdG8gPSBmcm9tICsgcGFnZVNpemUgLSAxO1xuXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIiosIHNob3dzKCopXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBsaXN0SWQpXG4gICAgLm9yZGVyKFwicmF0aW5nXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSwgbnVsbHNGaXJzdDogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KVxuICAgIC5yYW5nZShmcm9tLCB0byk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgY29uc3QgaXRlbXMgPSAoZGF0YSA/PyBbXSkgYXMgdW5rbm93biBhcyBMaXN0SXRlbVdpdGhTaG93W107XG4gIGNvbnN0IGhhc01vcmUgPSBpdGVtcy5sZW5ndGggPT09IHBhZ2VTaXplO1xuXG4gIGNvbnN0IHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgaWYgKHVzZXIgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHsgZGF0YTogc2hvd1RhZ3MgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgLnNlbGVjdChcInNob3dfaWQsIHRhZ19pZFwiKVxuICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgICAgLmluKFxuICAgICAgICBcInNob3dfaWRcIixcbiAgICAgICAgaXRlbXMubWFwKChpKSA9PiBpLnNob3dzLmlkKSxcbiAgICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHN0IG9mIHNob3dUYWdzID8/IFtdKSB7XG4gICAgICBpZiAoIXNob3dUYWdzTWFwW3N0LnNob3dfaWRdKSBzaG93VGFnc01hcFtzdC5zaG93X2lkXSA9IFtdO1xuICAgICAgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0ucHVzaChzdC50YWdfaWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGl0ZW1zLCBoYXNNb3JlLCBzaG93VGFnc01hcCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2hvd1RvTXlMaXN0KFxuICB0YXJnZXRMaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSB0aGUgdGFyZ2V0IGxpc3QgYmVsb25ncyB0byB0aGUgY3VycmVudCB1c2VyXG4gIGNvbnN0IHsgZGF0YTogdGFyZ2V0TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCF0YXJnZXRMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZCBvciBub3Qgb3duZWQgYnkgeW91XCIpO1xuXG4gIC8vIEVuc3VyZSB0aGUgc2hvdyBleGlzdHMgaW4gb3VyIERCIChyZXVzZSBleGlzdGluZyBvciBjcmVhdGUpXG4gIGxldCBzaG93SWQgPSBzaG93LmlkO1xuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwiaWRcIiwgc2hvdy5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICAvLyBTaG93IG1pZ2h0IG5vdCBleGlzdCBpZiB0aGUgREIgaXMgaW4gYSB3ZWlyZCBzdGF0ZSDigJQgY3JlYXRlIGl0XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiB0YXJnZXQgbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCB0YXJnZXRMaXN0SWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogdGFyZ2V0TGlzdElkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7dGFyZ2V0TGlzdElkfWApO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZHVwbGljYXRlTGlzdChzb3VyY2VMaXN0SWQ6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBWZXJpZnkgc291cmNlIGxpc3QgaXMgcHVibGljIChvciBvd25lZCBieSB1c2VyKVxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gZm9yIHVzZXIncyBsaXN0c1xuICBjb25zdCB7IGRhdGE6IHVzZXJMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAodXNlckxpc3RzPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgLy8gQ3JlYXRlIHRoZSBuZXcgbGlzdFxuICBjb25zdCB7IGRhdGE6IG5ld0xpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlTGlzdC5kZXNjcmlwdGlvbixcbiAgICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gICAgICBpc19wdWJsaWM6IGZhbHNlLFxuICAgIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChsaXN0RXJyb3IpIHRocm93IG5ldyBFcnJvcihsaXN0RXJyb3IubWVzc2FnZSk7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBuZXdMaXN0LmlkLFxuICAgICAgc2hvd19pZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgICAgbm90ZXM6IGl0ZW0ubm90ZXMsXG4gICAgfSkpO1xuXG4gICAgY29uc3QgeyBlcnJvcjogaW5zZXJ0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAgIC5pbnNlcnQoaW5zZXJ0cyk7XG5cbiAgICBpZiAoaW5zZXJ0RXJyb3IpIHRocm93IG5ldyBFcnJvcihpbnNlcnRFcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBsaXN0SWQ6IG5ld0xpc3QuaWQsIGl0ZW1Db3VudDogc291cmNlSXRlbXM/Lmxlbmd0aCA/PyAwIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InNTQWVzQix1TEFBQSJ9
}),
"[project]/src/app/[locale]/(app)/lists/data:f6469a [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addShowToList",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"605f2435efda81dd08e525867f8dd51303d334564d":"addShowToList"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("605f2435efda81dd08e525867f8dd51303d334564d", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addShowToList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChzdXBhYmFzZTogQXdhaXRlZDxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+PiwgdXNlcklkOiBzdHJpbmcpIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZClcbiAgICAuc2luZ2xlKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlzdChcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHVwZGF0ZXM6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IGlzX3B1YmxpYz86IGJvb2xlYW4gfSxcbikge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTGlzdChsaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLmRlbGV0ZSgpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9MaXN0KFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIHRtZGJfaWQ6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlPzogc3RyaW5nO1xuICAgIG92ZXJ2aWV3Pzogc3RyaW5nO1xuICB9LFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcHNlcnQgc2hvdyBpbiBzaG93cyB0YWJsZVxuICBsZXQgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOiBzaG93LnRtZGJfaWQsXG4gICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICBwb3N0ZXJfcGF0aDogc2hvdy5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IHNob3cuZmlyc3RfYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcgfHwgbnVsbCxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChzaG93RXJyb3IpIHRocm93IG5ldyBFcnJvcihzaG93RXJyb3IubWVzc2FnZSk7XG4gICAgZXhpc3RpbmdTaG93ID0gbmV3U2hvdztcbiAgfVxuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlb3JkZXJMaXN0SXRlbXMobGlzdElkOiBzdHJpbmcsIGl0ZW1JZHM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcGRhdGUgcG9zaXRpb25zXG4gIGNvbnN0IHVwZGF0ZXMgPSBpdGVtSWRzLm1hcCgoaWQsIGluZGV4KSA9PlxuICAgIHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLnVwZGF0ZSh7IHBvc2l0aW9uOiBpbmRleCB9KS5lcShcImlkXCIsIGlkKSxcbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbCh1cGRhdGVzKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7bGlzdElkfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0RnJvbUpzb24oanNvbkRhdGE6IHVua25vd24pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgcGFyc2VUcmFrdEpzb24gfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2ltcG9ydC90cmFrdC1wYXJzZXJcIik7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlVHJha3RKc29uKGpzb25EYXRhKTtcblxuICAvLyBDcmVhdGUgdGhlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBsaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAobGlzdHM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHBhcnNlZC5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhcnNlZC5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgaXNfcHVibGljOiBwYXJzZWQuaXNfcHVibGljLFxuICAgICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgICB9KVxuICAgIC5zZWxlY3QoKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAobGlzdEVycm9yKSB0aHJvdyBuZXcgRXJyb3IobGlzdEVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEluc2VydCBzaG93cyBkaXJlY3RseSB3aXRob3V0IFRNREIgcmVzb2x1dGlvbi5cbiAgLy8gVE1EQiBkYXRhIHdpbGwgYmUgZmV0Y2hlZCBsYXppbHkgd2hlbiB2aXNpdGluZyB0aGUgc2hvdyBkZXRhaWwgcGFnZS5cbiAgbGV0IHBvc2l0aW9uID0gMDtcbiAgZm9yIChjb25zdCBzaG93IG9mIHBhcnNlZC5zaG93cykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGJTaG93SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCBleGlzdGluZyBzaG93IGJ5IGltZGJfaWQgZmlyc3QsIHRoZW4gYnkgZXhhY3QgdGl0bGVcbiAgICAgIGlmIChzaG93LmltZGJfaWQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAgICAgLmVxKFwiaW1kYl9pZFwiLCBzaG93LmltZGJfaWQpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5pbGlrZShcInRpdGxlXCIsIHNob3cudGl0bGUpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnNlcnQgbmV3IHNob3cgaWYgbm90IGZvdW5kXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIC8vIFVzZSBhIG5lZ2F0aXZlIHRpdGxlIGhhc2ggYXMgcGxhY2Vob2xkZXIgdG1kYl9pZCB1bnRpbCBUTURCIGRhdGEgaXMgZmV0Y2hlZC5cbiAgICAgICAgLy8gVE1EQiBvbmx5IHVzZXMgcG9zaXRpdmUgSURzLCBzbyBuZWdhdGl2ZXMgYXJlIHNhZmUgYXMgcGxhY2Vob2xkZXJzLlxuICAgICAgICAvLyBJZiB0bWRiX2lkIGNvbHVtbiBpcyBudWxsYWJsZSAoYWZ0ZXIgbWlncmF0aW9uKSwgbnVsbCB3b3VsZCBiZSB1c2VkIGhlcmUgaW5zdGVhZC5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUbWRiSWQgPSAtKFxuICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgc2hvdy50aXRsZS5zcGxpdChcIlwiKS5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgKSAlIDIwMDAwMDAwMDBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBuZXdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICAgICAgdG1kYl9pZDogcGxhY2Vob2xkZXJUbWRiSWQsXG4gICAgICAgICAgICBwb3N0ZXJfcGF0aDogbnVsbCxcbiAgICAgICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcnZpZXc6IG51bGwsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuc2luZ2xlKCk7XG4gICAgICAgIGRiU2hvd0lkID0gbmV3U2hvdz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRiU2hvd0lkKSB7XG4gICAgICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgICAgLmluc2VydCh7IGxpc3RfaWQ6IGxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBzaG93OiAke3Nob3cudGl0bGV9YCwgZSk7XG4gICAgfVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGxpc3RJZDogbGlzdC5pZCwgaW1wb3J0ZWRDb3VudDogcG9zaXRpb24gfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdEl0ZW1XaXRoU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlzdF9pZDogc3RyaW5nO1xuICBzaG93X2lkOiBzdHJpbmc7XG4gIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgYWRkZWRfYXQ6IHN0cmluZztcbiAgbm90ZXM6IHN0cmluZyB8IG51bGw7XG4gIHNob3dzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICAgIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgICB0bWRiX2ZldGNoZWQ6IGJvb2xlYW47XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEl0ZW1zUGFnZShcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemUgPSA1MCxcbik6IFByb21pc2U8e1xuICBpdGVtczogTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBoYXNNb3JlOiBib29sZWFuO1xuICBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xufT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJ1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghbGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghbGlzdC5pc19wdWJsaWMgJiYgbGlzdC51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgZnJvbSA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgY29uc3QgdG8gPSBmcm9tICsgcGFnZVNpemUgLSAxO1xuXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIiosIHNob3dzKCopXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBsaXN0SWQpXG4gICAgLm9yZGVyKFwicmF0aW5nXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSwgbnVsbHNGaXJzdDogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KVxuICAgIC5yYW5nZShmcm9tLCB0byk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgY29uc3QgaXRlbXMgPSAoZGF0YSA/PyBbXSkgYXMgdW5rbm93biBhcyBMaXN0SXRlbVdpdGhTaG93W107XG4gIGNvbnN0IGhhc01vcmUgPSBpdGVtcy5sZW5ndGggPT09IHBhZ2VTaXplO1xuXG4gIGNvbnN0IHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgaWYgKHVzZXIgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHsgZGF0YTogc2hvd1RhZ3MgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgLnNlbGVjdChcInNob3dfaWQsIHRhZ19pZFwiKVxuICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgICAgLmluKFxuICAgICAgICBcInNob3dfaWRcIixcbiAgICAgICAgaXRlbXMubWFwKChpKSA9PiBpLnNob3dzLmlkKSxcbiAgICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHN0IG9mIHNob3dUYWdzID8/IFtdKSB7XG4gICAgICBpZiAoIXNob3dUYWdzTWFwW3N0LnNob3dfaWRdKSBzaG93VGFnc01hcFtzdC5zaG93X2lkXSA9IFtdO1xuICAgICAgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0ucHVzaChzdC50YWdfaWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGl0ZW1zLCBoYXNNb3JlLCBzaG93VGFnc01hcCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2hvd1RvTXlMaXN0KFxuICB0YXJnZXRMaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSB0aGUgdGFyZ2V0IGxpc3QgYmVsb25ncyB0byB0aGUgY3VycmVudCB1c2VyXG4gIGNvbnN0IHsgZGF0YTogdGFyZ2V0TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCF0YXJnZXRMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZCBvciBub3Qgb3duZWQgYnkgeW91XCIpO1xuXG4gIC8vIEVuc3VyZSB0aGUgc2hvdyBleGlzdHMgaW4gb3VyIERCIChyZXVzZSBleGlzdGluZyBvciBjcmVhdGUpXG4gIGxldCBzaG93SWQgPSBzaG93LmlkO1xuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwiaWRcIiwgc2hvdy5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICAvLyBTaG93IG1pZ2h0IG5vdCBleGlzdCBpZiB0aGUgREIgaXMgaW4gYSB3ZWlyZCBzdGF0ZSDigJQgY3JlYXRlIGl0XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiB0YXJnZXQgbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCB0YXJnZXRMaXN0SWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogdGFyZ2V0TGlzdElkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7dGFyZ2V0TGlzdElkfWApO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZHVwbGljYXRlTGlzdChzb3VyY2VMaXN0SWQ6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBWZXJpZnkgc291cmNlIGxpc3QgaXMgcHVibGljIChvciBvd25lZCBieSB1c2VyKVxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gZm9yIHVzZXIncyBsaXN0c1xuICBjb25zdCB7IGRhdGE6IHVzZXJMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAodXNlckxpc3RzPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgLy8gQ3JlYXRlIHRoZSBuZXcgbGlzdFxuICBjb25zdCB7IGRhdGE6IG5ld0xpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlTGlzdC5kZXNjcmlwdGlvbixcbiAgICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gICAgICBpc19wdWJsaWM6IGZhbHNlLFxuICAgIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChsaXN0RXJyb3IpIHRocm93IG5ldyBFcnJvcihsaXN0RXJyb3IubWVzc2FnZSk7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBuZXdMaXN0LmlkLFxuICAgICAgc2hvd19pZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgICAgbm90ZXM6IGl0ZW0ubm90ZXMsXG4gICAgfSkpO1xuXG4gICAgY29uc3QgeyBlcnJvcjogaW5zZXJ0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAgIC5pbnNlcnQoaW5zZXJ0cyk7XG5cbiAgICBpZiAoaW5zZXJ0RXJyb3IpIHRocm93IG5ldyBFcnJvcihpbnNlcnRFcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBsaXN0SWQ6IG5ld0xpc3QuaWQsIGl0ZW1Db3VudDogc291cmNlSXRlbXM/Lmxlbmd0aCA/PyAwIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlTQXNEc0IsMExBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:cff8c3 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "removeShowFromList",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60500296d69c841163099142e2c7aa605ff7742051":"removeShowFromList"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60500296d69c841163099142e2c7aa605ff7742051", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "removeShowFromList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChzdXBhYmFzZTogQXdhaXRlZDxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+PiwgdXNlcklkOiBzdHJpbmcpIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZClcbiAgICAuc2luZ2xlKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlzdChcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHVwZGF0ZXM6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IGlzX3B1YmxpYz86IGJvb2xlYW4gfSxcbikge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTGlzdChsaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLmRlbGV0ZSgpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9MaXN0KFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIHRtZGJfaWQ6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlPzogc3RyaW5nO1xuICAgIG92ZXJ2aWV3Pzogc3RyaW5nO1xuICB9LFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcHNlcnQgc2hvdyBpbiBzaG93cyB0YWJsZVxuICBsZXQgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOiBzaG93LnRtZGJfaWQsXG4gICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICBwb3N0ZXJfcGF0aDogc2hvdy5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IHNob3cuZmlyc3RfYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcgfHwgbnVsbCxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChzaG93RXJyb3IpIHRocm93IG5ldyBFcnJvcihzaG93RXJyb3IubWVzc2FnZSk7XG4gICAgZXhpc3RpbmdTaG93ID0gbmV3U2hvdztcbiAgfVxuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlb3JkZXJMaXN0SXRlbXMobGlzdElkOiBzdHJpbmcsIGl0ZW1JZHM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcGRhdGUgcG9zaXRpb25zXG4gIGNvbnN0IHVwZGF0ZXMgPSBpdGVtSWRzLm1hcCgoaWQsIGluZGV4KSA9PlxuICAgIHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLnVwZGF0ZSh7IHBvc2l0aW9uOiBpbmRleCB9KS5lcShcImlkXCIsIGlkKSxcbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbCh1cGRhdGVzKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7bGlzdElkfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0RnJvbUpzb24oanNvbkRhdGE6IHVua25vd24pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgcGFyc2VUcmFrdEpzb24gfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2ltcG9ydC90cmFrdC1wYXJzZXJcIik7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlVHJha3RKc29uKGpzb25EYXRhKTtcblxuICAvLyBDcmVhdGUgdGhlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBsaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAobGlzdHM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHBhcnNlZC5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhcnNlZC5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgaXNfcHVibGljOiBwYXJzZWQuaXNfcHVibGljLFxuICAgICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgICB9KVxuICAgIC5zZWxlY3QoKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAobGlzdEVycm9yKSB0aHJvdyBuZXcgRXJyb3IobGlzdEVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEluc2VydCBzaG93cyBkaXJlY3RseSB3aXRob3V0IFRNREIgcmVzb2x1dGlvbi5cbiAgLy8gVE1EQiBkYXRhIHdpbGwgYmUgZmV0Y2hlZCBsYXppbHkgd2hlbiB2aXNpdGluZyB0aGUgc2hvdyBkZXRhaWwgcGFnZS5cbiAgbGV0IHBvc2l0aW9uID0gMDtcbiAgZm9yIChjb25zdCBzaG93IG9mIHBhcnNlZC5zaG93cykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGJTaG93SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCBleGlzdGluZyBzaG93IGJ5IGltZGJfaWQgZmlyc3QsIHRoZW4gYnkgZXhhY3QgdGl0bGVcbiAgICAgIGlmIChzaG93LmltZGJfaWQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAgICAgLmVxKFwiaW1kYl9pZFwiLCBzaG93LmltZGJfaWQpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5pbGlrZShcInRpdGxlXCIsIHNob3cudGl0bGUpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnNlcnQgbmV3IHNob3cgaWYgbm90IGZvdW5kXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIC8vIFVzZSBhIG5lZ2F0aXZlIHRpdGxlIGhhc2ggYXMgcGxhY2Vob2xkZXIgdG1kYl9pZCB1bnRpbCBUTURCIGRhdGEgaXMgZmV0Y2hlZC5cbiAgICAgICAgLy8gVE1EQiBvbmx5IHVzZXMgcG9zaXRpdmUgSURzLCBzbyBuZWdhdGl2ZXMgYXJlIHNhZmUgYXMgcGxhY2Vob2xkZXJzLlxuICAgICAgICAvLyBJZiB0bWRiX2lkIGNvbHVtbiBpcyBudWxsYWJsZSAoYWZ0ZXIgbWlncmF0aW9uKSwgbnVsbCB3b3VsZCBiZSB1c2VkIGhlcmUgaW5zdGVhZC5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUbWRiSWQgPSAtKFxuICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgc2hvdy50aXRsZS5zcGxpdChcIlwiKS5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgKSAlIDIwMDAwMDAwMDBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBuZXdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICAgICAgdG1kYl9pZDogcGxhY2Vob2xkZXJUbWRiSWQsXG4gICAgICAgICAgICBwb3N0ZXJfcGF0aDogbnVsbCxcbiAgICAgICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcnZpZXc6IG51bGwsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuc2luZ2xlKCk7XG4gICAgICAgIGRiU2hvd0lkID0gbmV3U2hvdz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRiU2hvd0lkKSB7XG4gICAgICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgICAgLmluc2VydCh7IGxpc3RfaWQ6IGxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBzaG93OiAke3Nob3cudGl0bGV9YCwgZSk7XG4gICAgfVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGxpc3RJZDogbGlzdC5pZCwgaW1wb3J0ZWRDb3VudDogcG9zaXRpb24gfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdEl0ZW1XaXRoU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlzdF9pZDogc3RyaW5nO1xuICBzaG93X2lkOiBzdHJpbmc7XG4gIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgYWRkZWRfYXQ6IHN0cmluZztcbiAgbm90ZXM6IHN0cmluZyB8IG51bGw7XG4gIHNob3dzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICAgIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgICB0bWRiX2ZldGNoZWQ6IGJvb2xlYW47XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEl0ZW1zUGFnZShcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemUgPSA1MCxcbik6IFByb21pc2U8e1xuICBpdGVtczogTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBoYXNNb3JlOiBib29sZWFuO1xuICBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xufT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJ1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghbGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghbGlzdC5pc19wdWJsaWMgJiYgbGlzdC51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgZnJvbSA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgY29uc3QgdG8gPSBmcm9tICsgcGFnZVNpemUgLSAxO1xuXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIiosIHNob3dzKCopXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBsaXN0SWQpXG4gICAgLm9yZGVyKFwicmF0aW5nXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSwgbnVsbHNGaXJzdDogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KVxuICAgIC5yYW5nZShmcm9tLCB0byk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgY29uc3QgaXRlbXMgPSAoZGF0YSA/PyBbXSkgYXMgdW5rbm93biBhcyBMaXN0SXRlbVdpdGhTaG93W107XG4gIGNvbnN0IGhhc01vcmUgPSBpdGVtcy5sZW5ndGggPT09IHBhZ2VTaXplO1xuXG4gIGNvbnN0IHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgaWYgKHVzZXIgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHsgZGF0YTogc2hvd1RhZ3MgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgLnNlbGVjdChcInNob3dfaWQsIHRhZ19pZFwiKVxuICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgICAgLmluKFxuICAgICAgICBcInNob3dfaWRcIixcbiAgICAgICAgaXRlbXMubWFwKChpKSA9PiBpLnNob3dzLmlkKSxcbiAgICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHN0IG9mIHNob3dUYWdzID8/IFtdKSB7XG4gICAgICBpZiAoIXNob3dUYWdzTWFwW3N0LnNob3dfaWRdKSBzaG93VGFnc01hcFtzdC5zaG93X2lkXSA9IFtdO1xuICAgICAgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0ucHVzaChzdC50YWdfaWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGl0ZW1zLCBoYXNNb3JlLCBzaG93VGFnc01hcCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2hvd1RvTXlMaXN0KFxuICB0YXJnZXRMaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSB0aGUgdGFyZ2V0IGxpc3QgYmVsb25ncyB0byB0aGUgY3VycmVudCB1c2VyXG4gIGNvbnN0IHsgZGF0YTogdGFyZ2V0TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCF0YXJnZXRMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZCBvciBub3Qgb3duZWQgYnkgeW91XCIpO1xuXG4gIC8vIEVuc3VyZSB0aGUgc2hvdyBleGlzdHMgaW4gb3VyIERCIChyZXVzZSBleGlzdGluZyBvciBjcmVhdGUpXG4gIGxldCBzaG93SWQgPSBzaG93LmlkO1xuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwiaWRcIiwgc2hvdy5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICAvLyBTaG93IG1pZ2h0IG5vdCBleGlzdCBpZiB0aGUgREIgaXMgaW4gYSB3ZWlyZCBzdGF0ZSDigJQgY3JlYXRlIGl0XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiB0YXJnZXQgbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCB0YXJnZXRMaXN0SWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogdGFyZ2V0TGlzdElkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7dGFyZ2V0TGlzdElkfWApO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZHVwbGljYXRlTGlzdChzb3VyY2VMaXN0SWQ6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBWZXJpZnkgc291cmNlIGxpc3QgaXMgcHVibGljIChvciBvd25lZCBieSB1c2VyKVxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gZm9yIHVzZXIncyBsaXN0c1xuICBjb25zdCB7IGRhdGE6IHVzZXJMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAodXNlckxpc3RzPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgLy8gQ3JlYXRlIHRoZSBuZXcgbGlzdFxuICBjb25zdCB7IGRhdGE6IG5ld0xpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlTGlzdC5kZXNjcmlwdGlvbixcbiAgICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gICAgICBpc19wdWJsaWM6IGZhbHNlLFxuICAgIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChsaXN0RXJyb3IpIHRocm93IG5ldyBFcnJvcihsaXN0RXJyb3IubWVzc2FnZSk7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBuZXdMaXN0LmlkLFxuICAgICAgc2hvd19pZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgICAgbm90ZXM6IGl0ZW0ubm90ZXMsXG4gICAgfSkpO1xuXG4gICAgY29uc3QgeyBlcnJvcjogaW5zZXJ0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAgIC5pbnNlcnQoaW5zZXJ0cyk7XG5cbiAgICBpZiAoaW5zZXJ0RXJyb3IpIHRocm93IG5ldyBFcnJvcihpbnNlcnRFcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBsaXN0SWQ6IG5ld0xpc3QuaWQsIGl0ZW1Db3VudDogc291cmNlSXRlbXM/Lmxlbmd0aCA/PyAwIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjhTQW1Ic0IsK0xBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:7eee2f [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateShowRating",
    ()=>$$RSC_SERVER_ACTION_4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"70799100106412fb8a8f21e3ba730afee8596a92a7":"updateShowRating"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("70799100106412fb8a8f21e3ba730afee8596a92a7", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateShowRating");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChzdXBhYmFzZTogQXdhaXRlZDxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+PiwgdXNlcklkOiBzdHJpbmcpIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZClcbiAgICAuc2luZ2xlKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlzdChcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHVwZGF0ZXM6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IGlzX3B1YmxpYz86IGJvb2xlYW4gfSxcbikge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTGlzdChsaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLmRlbGV0ZSgpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9MaXN0KFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIHRtZGJfaWQ6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlPzogc3RyaW5nO1xuICAgIG92ZXJ2aWV3Pzogc3RyaW5nO1xuICB9LFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcHNlcnQgc2hvdyBpbiBzaG93cyB0YWJsZVxuICBsZXQgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOiBzaG93LnRtZGJfaWQsXG4gICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICBwb3N0ZXJfcGF0aDogc2hvdy5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IHNob3cuZmlyc3RfYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcgfHwgbnVsbCxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChzaG93RXJyb3IpIHRocm93IG5ldyBFcnJvcihzaG93RXJyb3IubWVzc2FnZSk7XG4gICAgZXhpc3RpbmdTaG93ID0gbmV3U2hvdztcbiAgfVxuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlb3JkZXJMaXN0SXRlbXMobGlzdElkOiBzdHJpbmcsIGl0ZW1JZHM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcGRhdGUgcG9zaXRpb25zXG4gIGNvbnN0IHVwZGF0ZXMgPSBpdGVtSWRzLm1hcCgoaWQsIGluZGV4KSA9PlxuICAgIHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLnVwZGF0ZSh7IHBvc2l0aW9uOiBpbmRleCB9KS5lcShcImlkXCIsIGlkKSxcbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbCh1cGRhdGVzKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7bGlzdElkfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0RnJvbUpzb24oanNvbkRhdGE6IHVua25vd24pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgcGFyc2VUcmFrdEpzb24gfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2ltcG9ydC90cmFrdC1wYXJzZXJcIik7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlVHJha3RKc29uKGpzb25EYXRhKTtcblxuICAvLyBDcmVhdGUgdGhlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBsaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAobGlzdHM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHBhcnNlZC5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhcnNlZC5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgaXNfcHVibGljOiBwYXJzZWQuaXNfcHVibGljLFxuICAgICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgICB9KVxuICAgIC5zZWxlY3QoKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAobGlzdEVycm9yKSB0aHJvdyBuZXcgRXJyb3IobGlzdEVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEluc2VydCBzaG93cyBkaXJlY3RseSB3aXRob3V0IFRNREIgcmVzb2x1dGlvbi5cbiAgLy8gVE1EQiBkYXRhIHdpbGwgYmUgZmV0Y2hlZCBsYXppbHkgd2hlbiB2aXNpdGluZyB0aGUgc2hvdyBkZXRhaWwgcGFnZS5cbiAgbGV0IHBvc2l0aW9uID0gMDtcbiAgZm9yIChjb25zdCBzaG93IG9mIHBhcnNlZC5zaG93cykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGJTaG93SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCBleGlzdGluZyBzaG93IGJ5IGltZGJfaWQgZmlyc3QsIHRoZW4gYnkgZXhhY3QgdGl0bGVcbiAgICAgIGlmIChzaG93LmltZGJfaWQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAgICAgLmVxKFwiaW1kYl9pZFwiLCBzaG93LmltZGJfaWQpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5pbGlrZShcInRpdGxlXCIsIHNob3cudGl0bGUpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnNlcnQgbmV3IHNob3cgaWYgbm90IGZvdW5kXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIC8vIFVzZSBhIG5lZ2F0aXZlIHRpdGxlIGhhc2ggYXMgcGxhY2Vob2xkZXIgdG1kYl9pZCB1bnRpbCBUTURCIGRhdGEgaXMgZmV0Y2hlZC5cbiAgICAgICAgLy8gVE1EQiBvbmx5IHVzZXMgcG9zaXRpdmUgSURzLCBzbyBuZWdhdGl2ZXMgYXJlIHNhZmUgYXMgcGxhY2Vob2xkZXJzLlxuICAgICAgICAvLyBJZiB0bWRiX2lkIGNvbHVtbiBpcyBudWxsYWJsZSAoYWZ0ZXIgbWlncmF0aW9uKSwgbnVsbCB3b3VsZCBiZSB1c2VkIGhlcmUgaW5zdGVhZC5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUbWRiSWQgPSAtKFxuICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgc2hvdy50aXRsZS5zcGxpdChcIlwiKS5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgKSAlIDIwMDAwMDAwMDBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBuZXdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICAgICAgdG1kYl9pZDogcGxhY2Vob2xkZXJUbWRiSWQsXG4gICAgICAgICAgICBwb3N0ZXJfcGF0aDogbnVsbCxcbiAgICAgICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcnZpZXc6IG51bGwsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuc2luZ2xlKCk7XG4gICAgICAgIGRiU2hvd0lkID0gbmV3U2hvdz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRiU2hvd0lkKSB7XG4gICAgICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgICAgLmluc2VydCh7IGxpc3RfaWQ6IGxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBzaG93OiAke3Nob3cudGl0bGV9YCwgZSk7XG4gICAgfVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGxpc3RJZDogbGlzdC5pZCwgaW1wb3J0ZWRDb3VudDogcG9zaXRpb24gfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdEl0ZW1XaXRoU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlzdF9pZDogc3RyaW5nO1xuICBzaG93X2lkOiBzdHJpbmc7XG4gIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgYWRkZWRfYXQ6IHN0cmluZztcbiAgbm90ZXM6IHN0cmluZyB8IG51bGw7XG4gIHNob3dzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICAgIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgICB0bWRiX2ZldGNoZWQ6IGJvb2xlYW47XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEl0ZW1zUGFnZShcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemUgPSA1MCxcbik6IFByb21pc2U8e1xuICBpdGVtczogTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBoYXNNb3JlOiBib29sZWFuO1xuICBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xufT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJ1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghbGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghbGlzdC5pc19wdWJsaWMgJiYgbGlzdC51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgZnJvbSA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgY29uc3QgdG8gPSBmcm9tICsgcGFnZVNpemUgLSAxO1xuXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIiosIHNob3dzKCopXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBsaXN0SWQpXG4gICAgLm9yZGVyKFwicmF0aW5nXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSwgbnVsbHNGaXJzdDogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KVxuICAgIC5yYW5nZShmcm9tLCB0byk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgY29uc3QgaXRlbXMgPSAoZGF0YSA/PyBbXSkgYXMgdW5rbm93biBhcyBMaXN0SXRlbVdpdGhTaG93W107XG4gIGNvbnN0IGhhc01vcmUgPSBpdGVtcy5sZW5ndGggPT09IHBhZ2VTaXplO1xuXG4gIGNvbnN0IHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgaWYgKHVzZXIgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHsgZGF0YTogc2hvd1RhZ3MgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgLnNlbGVjdChcInNob3dfaWQsIHRhZ19pZFwiKVxuICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgICAgLmluKFxuICAgICAgICBcInNob3dfaWRcIixcbiAgICAgICAgaXRlbXMubWFwKChpKSA9PiBpLnNob3dzLmlkKSxcbiAgICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHN0IG9mIHNob3dUYWdzID8/IFtdKSB7XG4gICAgICBpZiAoIXNob3dUYWdzTWFwW3N0LnNob3dfaWRdKSBzaG93VGFnc01hcFtzdC5zaG93X2lkXSA9IFtdO1xuICAgICAgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0ucHVzaChzdC50YWdfaWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGl0ZW1zLCBoYXNNb3JlLCBzaG93VGFnc01hcCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2hvd1RvTXlMaXN0KFxuICB0YXJnZXRMaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSB0aGUgdGFyZ2V0IGxpc3QgYmVsb25ncyB0byB0aGUgY3VycmVudCB1c2VyXG4gIGNvbnN0IHsgZGF0YTogdGFyZ2V0TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCF0YXJnZXRMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZCBvciBub3Qgb3duZWQgYnkgeW91XCIpO1xuXG4gIC8vIEVuc3VyZSB0aGUgc2hvdyBleGlzdHMgaW4gb3VyIERCIChyZXVzZSBleGlzdGluZyBvciBjcmVhdGUpXG4gIGxldCBzaG93SWQgPSBzaG93LmlkO1xuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwiaWRcIiwgc2hvdy5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICAvLyBTaG93IG1pZ2h0IG5vdCBleGlzdCBpZiB0aGUgREIgaXMgaW4gYSB3ZWlyZCBzdGF0ZSDigJQgY3JlYXRlIGl0XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiB0YXJnZXQgbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCB0YXJnZXRMaXN0SWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogdGFyZ2V0TGlzdElkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7dGFyZ2V0TGlzdElkfWApO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZHVwbGljYXRlTGlzdChzb3VyY2VMaXN0SWQ6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBWZXJpZnkgc291cmNlIGxpc3QgaXMgcHVibGljIChvciBvd25lZCBieSB1c2VyKVxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gZm9yIHVzZXIncyBsaXN0c1xuICBjb25zdCB7IGRhdGE6IHVzZXJMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAodXNlckxpc3RzPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgLy8gQ3JlYXRlIHRoZSBuZXcgbGlzdFxuICBjb25zdCB7IGRhdGE6IG5ld0xpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlTGlzdC5kZXNjcmlwdGlvbixcbiAgICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gICAgICBpc19wdWJsaWM6IGZhbHNlLFxuICAgIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChsaXN0RXJyb3IpIHRocm93IG5ldyBFcnJvcihsaXN0RXJyb3IubWVzc2FnZSk7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBuZXdMaXN0LmlkLFxuICAgICAgc2hvd19pZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgICAgbm90ZXM6IGl0ZW0ubm90ZXMsXG4gICAgfSkpO1xuXG4gICAgY29uc3QgeyBlcnJvcjogaW5zZXJ0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAgIC5pbnNlcnQoaW5zZXJ0cyk7XG5cbiAgICBpZiAoaW5zZXJ0RXJyb3IpIHRocm93IG5ldyBFcnJvcihpbnNlcnRFcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBsaXN0SWQ6IG5ld0xpc3QuaWQsIGl0ZW1Db3VudDogc291cmNlSXRlbXM/Lmxlbmd0aCA/PyAwIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRTQWlJc0IsNkxBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:7d850f [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChzdXBhYmFzZTogQXdhaXRlZDxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+PiwgdXNlcklkOiBzdHJpbmcpIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZClcbiAgICAuc2luZ2xlKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlzdChcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHVwZGF0ZXM6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IGlzX3B1YmxpYz86IGJvb2xlYW4gfSxcbikge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTGlzdChsaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLmRlbGV0ZSgpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9MaXN0KFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIHRtZGJfaWQ6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlPzogc3RyaW5nO1xuICAgIG92ZXJ2aWV3Pzogc3RyaW5nO1xuICB9LFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcHNlcnQgc2hvdyBpbiBzaG93cyB0YWJsZVxuICBsZXQgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOiBzaG93LnRtZGJfaWQsXG4gICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICBwb3N0ZXJfcGF0aDogc2hvdy5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IHNob3cuZmlyc3RfYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcgfHwgbnVsbCxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChzaG93RXJyb3IpIHRocm93IG5ldyBFcnJvcihzaG93RXJyb3IubWVzc2FnZSk7XG4gICAgZXhpc3RpbmdTaG93ID0gbmV3U2hvdztcbiAgfVxuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlb3JkZXJMaXN0SXRlbXMobGlzdElkOiBzdHJpbmcsIGl0ZW1JZHM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcGRhdGUgcG9zaXRpb25zXG4gIGNvbnN0IHVwZGF0ZXMgPSBpdGVtSWRzLm1hcCgoaWQsIGluZGV4KSA9PlxuICAgIHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLnVwZGF0ZSh7IHBvc2l0aW9uOiBpbmRleCB9KS5lcShcImlkXCIsIGlkKSxcbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbCh1cGRhdGVzKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7bGlzdElkfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0RnJvbUpzb24oanNvbkRhdGE6IHVua25vd24pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgcGFyc2VUcmFrdEpzb24gfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2ltcG9ydC90cmFrdC1wYXJzZXJcIik7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlVHJha3RKc29uKGpzb25EYXRhKTtcblxuICAvLyBDcmVhdGUgdGhlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBsaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAobGlzdHM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHBhcnNlZC5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhcnNlZC5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgaXNfcHVibGljOiBwYXJzZWQuaXNfcHVibGljLFxuICAgICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgICB9KVxuICAgIC5zZWxlY3QoKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAobGlzdEVycm9yKSB0aHJvdyBuZXcgRXJyb3IobGlzdEVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEluc2VydCBzaG93cyBkaXJlY3RseSB3aXRob3V0IFRNREIgcmVzb2x1dGlvbi5cbiAgLy8gVE1EQiBkYXRhIHdpbGwgYmUgZmV0Y2hlZCBsYXppbHkgd2hlbiB2aXNpdGluZyB0aGUgc2hvdyBkZXRhaWwgcGFnZS5cbiAgbGV0IHBvc2l0aW9uID0gMDtcbiAgZm9yIChjb25zdCBzaG93IG9mIHBhcnNlZC5zaG93cykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGJTaG93SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCBleGlzdGluZyBzaG93IGJ5IGltZGJfaWQgZmlyc3QsIHRoZW4gYnkgZXhhY3QgdGl0bGVcbiAgICAgIGlmIChzaG93LmltZGJfaWQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAgICAgLmVxKFwiaW1kYl9pZFwiLCBzaG93LmltZGJfaWQpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5pbGlrZShcInRpdGxlXCIsIHNob3cudGl0bGUpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnNlcnQgbmV3IHNob3cgaWYgbm90IGZvdW5kXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIC8vIFVzZSBhIG5lZ2F0aXZlIHRpdGxlIGhhc2ggYXMgcGxhY2Vob2xkZXIgdG1kYl9pZCB1bnRpbCBUTURCIGRhdGEgaXMgZmV0Y2hlZC5cbiAgICAgICAgLy8gVE1EQiBvbmx5IHVzZXMgcG9zaXRpdmUgSURzLCBzbyBuZWdhdGl2ZXMgYXJlIHNhZmUgYXMgcGxhY2Vob2xkZXJzLlxuICAgICAgICAvLyBJZiB0bWRiX2lkIGNvbHVtbiBpcyBudWxsYWJsZSAoYWZ0ZXIgbWlncmF0aW9uKSwgbnVsbCB3b3VsZCBiZSB1c2VkIGhlcmUgaW5zdGVhZC5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUbWRiSWQgPSAtKFxuICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgc2hvdy50aXRsZS5zcGxpdChcIlwiKS5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgKSAlIDIwMDAwMDAwMDBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBuZXdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICAgICAgdG1kYl9pZDogcGxhY2Vob2xkZXJUbWRiSWQsXG4gICAgICAgICAgICBwb3N0ZXJfcGF0aDogbnVsbCxcbiAgICAgICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcnZpZXc6IG51bGwsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuc2luZ2xlKCk7XG4gICAgICAgIGRiU2hvd0lkID0gbmV3U2hvdz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRiU2hvd0lkKSB7XG4gICAgICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgICAgLmluc2VydCh7IGxpc3RfaWQ6IGxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBzaG93OiAke3Nob3cudGl0bGV9YCwgZSk7XG4gICAgfVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGxpc3RJZDogbGlzdC5pZCwgaW1wb3J0ZWRDb3VudDogcG9zaXRpb24gfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdEl0ZW1XaXRoU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlzdF9pZDogc3RyaW5nO1xuICBzaG93X2lkOiBzdHJpbmc7XG4gIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgYWRkZWRfYXQ6IHN0cmluZztcbiAgbm90ZXM6IHN0cmluZyB8IG51bGw7XG4gIHNob3dzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICAgIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgICB0bWRiX2ZldGNoZWQ6IGJvb2xlYW47XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEl0ZW1zUGFnZShcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemUgPSA1MCxcbik6IFByb21pc2U8e1xuICBpdGVtczogTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBoYXNNb3JlOiBib29sZWFuO1xuICBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xufT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJ1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghbGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghbGlzdC5pc19wdWJsaWMgJiYgbGlzdC51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgZnJvbSA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgY29uc3QgdG8gPSBmcm9tICsgcGFnZVNpemUgLSAxO1xuXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIiosIHNob3dzKCopXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBsaXN0SWQpXG4gICAgLm9yZGVyKFwicmF0aW5nXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSwgbnVsbHNGaXJzdDogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KVxuICAgIC5yYW5nZShmcm9tLCB0byk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgY29uc3QgaXRlbXMgPSAoZGF0YSA/PyBbXSkgYXMgdW5rbm93biBhcyBMaXN0SXRlbVdpdGhTaG93W107XG4gIGNvbnN0IGhhc01vcmUgPSBpdGVtcy5sZW5ndGggPT09IHBhZ2VTaXplO1xuXG4gIGNvbnN0IHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgaWYgKHVzZXIgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHsgZGF0YTogc2hvd1RhZ3MgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgLnNlbGVjdChcInNob3dfaWQsIHRhZ19pZFwiKVxuICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgICAgLmluKFxuICAgICAgICBcInNob3dfaWRcIixcbiAgICAgICAgaXRlbXMubWFwKChpKSA9PiBpLnNob3dzLmlkKSxcbiAgICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHN0IG9mIHNob3dUYWdzID8/IFtdKSB7XG4gICAgICBpZiAoIXNob3dUYWdzTWFwW3N0LnNob3dfaWRdKSBzaG93VGFnc01hcFtzdC5zaG93X2lkXSA9IFtdO1xuICAgICAgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0ucHVzaChzdC50YWdfaWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGl0ZW1zLCBoYXNNb3JlLCBzaG93VGFnc01hcCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2hvd1RvTXlMaXN0KFxuICB0YXJnZXRMaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSB0aGUgdGFyZ2V0IGxpc3QgYmVsb25ncyB0byB0aGUgY3VycmVudCB1c2VyXG4gIGNvbnN0IHsgZGF0YTogdGFyZ2V0TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCF0YXJnZXRMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZCBvciBub3Qgb3duZWQgYnkgeW91XCIpO1xuXG4gIC8vIEVuc3VyZSB0aGUgc2hvdyBleGlzdHMgaW4gb3VyIERCIChyZXVzZSBleGlzdGluZyBvciBjcmVhdGUpXG4gIGxldCBzaG93SWQgPSBzaG93LmlkO1xuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwiaWRcIiwgc2hvdy5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICAvLyBTaG93IG1pZ2h0IG5vdCBleGlzdCBpZiB0aGUgREIgaXMgaW4gYSB3ZWlyZCBzdGF0ZSDigJQgY3JlYXRlIGl0XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiB0YXJnZXQgbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCB0YXJnZXRMaXN0SWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogdGFyZ2V0TGlzdElkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7dGFyZ2V0TGlzdElkfWApO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZHVwbGljYXRlTGlzdChzb3VyY2VMaXN0SWQ6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBWZXJpZnkgc291cmNlIGxpc3QgaXMgcHVibGljIChvciBvd25lZCBieSB1c2VyKVxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gZm9yIHVzZXIncyBsaXN0c1xuICBjb25zdCB7IGRhdGE6IHVzZXJMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAodXNlckxpc3RzPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgLy8gQ3JlYXRlIHRoZSBuZXcgbGlzdFxuICBjb25zdCB7IGRhdGE6IG5ld0xpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlTGlzdC5kZXNjcmlwdGlvbixcbiAgICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gICAgICBpc19wdWJsaWM6IGZhbHNlLFxuICAgIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChsaXN0RXJyb3IpIHRocm93IG5ldyBFcnJvcihsaXN0RXJyb3IubWVzc2FnZSk7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBuZXdMaXN0LmlkLFxuICAgICAgc2hvd19pZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgICAgbm90ZXM6IGl0ZW0ubm90ZXMsXG4gICAgfSkpO1xuXG4gICAgY29uc3QgeyBlcnJvcjogaW5zZXJ0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAgIC5pbnNlcnQoaW5zZXJ0cyk7XG5cbiAgICBpZiAoaW5zZXJ0RXJyb3IpIHRocm93IG5ldyBFcnJvcihpbnNlcnRFcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBsaXN0SWQ6IG5ld0xpc3QuaWQsIGl0ZW1Db3VudDogc291cmNlSXRlbXM/Lmxlbmd0aCA/PyAwIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRTQXdKc0IsNkxBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:46c341 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getListItemsPage",
    ()=>$$RSC_SERVER_ACTION_7
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"70d9b1319a732a2917cbfba85bbc0d424270f62b48":"getListItemsPage"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("70d9b1319a732a2917cbfba85bbc0d424270f62b48", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getListItemsPage");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChzdXBhYmFzZTogQXdhaXRlZDxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+PiwgdXNlcklkOiBzdHJpbmcpIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZClcbiAgICAuc2luZ2xlKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlzdChcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHVwZGF0ZXM6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IGlzX3B1YmxpYz86IGJvb2xlYW4gfSxcbikge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTGlzdChsaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLmRlbGV0ZSgpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9MaXN0KFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIHRtZGJfaWQ6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlPzogc3RyaW5nO1xuICAgIG92ZXJ2aWV3Pzogc3RyaW5nO1xuICB9LFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcHNlcnQgc2hvdyBpbiBzaG93cyB0YWJsZVxuICBsZXQgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOiBzaG93LnRtZGJfaWQsXG4gICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICBwb3N0ZXJfcGF0aDogc2hvdy5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IHNob3cuZmlyc3RfYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcgfHwgbnVsbCxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChzaG93RXJyb3IpIHRocm93IG5ldyBFcnJvcihzaG93RXJyb3IubWVzc2FnZSk7XG4gICAgZXhpc3RpbmdTaG93ID0gbmV3U2hvdztcbiAgfVxuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlb3JkZXJMaXN0SXRlbXMobGlzdElkOiBzdHJpbmcsIGl0ZW1JZHM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcGRhdGUgcG9zaXRpb25zXG4gIGNvbnN0IHVwZGF0ZXMgPSBpdGVtSWRzLm1hcCgoaWQsIGluZGV4KSA9PlxuICAgIHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLnVwZGF0ZSh7IHBvc2l0aW9uOiBpbmRleCB9KS5lcShcImlkXCIsIGlkKSxcbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbCh1cGRhdGVzKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7bGlzdElkfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0RnJvbUpzb24oanNvbkRhdGE6IHVua25vd24pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgcGFyc2VUcmFrdEpzb24gfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2ltcG9ydC90cmFrdC1wYXJzZXJcIik7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlVHJha3RKc29uKGpzb25EYXRhKTtcblxuICAvLyBDcmVhdGUgdGhlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBsaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAobGlzdHM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHBhcnNlZC5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhcnNlZC5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgaXNfcHVibGljOiBwYXJzZWQuaXNfcHVibGljLFxuICAgICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgICB9KVxuICAgIC5zZWxlY3QoKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAobGlzdEVycm9yKSB0aHJvdyBuZXcgRXJyb3IobGlzdEVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEluc2VydCBzaG93cyBkaXJlY3RseSB3aXRob3V0IFRNREIgcmVzb2x1dGlvbi5cbiAgLy8gVE1EQiBkYXRhIHdpbGwgYmUgZmV0Y2hlZCBsYXppbHkgd2hlbiB2aXNpdGluZyB0aGUgc2hvdyBkZXRhaWwgcGFnZS5cbiAgbGV0IHBvc2l0aW9uID0gMDtcbiAgZm9yIChjb25zdCBzaG93IG9mIHBhcnNlZC5zaG93cykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGJTaG93SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCBleGlzdGluZyBzaG93IGJ5IGltZGJfaWQgZmlyc3QsIHRoZW4gYnkgZXhhY3QgdGl0bGVcbiAgICAgIGlmIChzaG93LmltZGJfaWQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAgICAgLmVxKFwiaW1kYl9pZFwiLCBzaG93LmltZGJfaWQpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5pbGlrZShcInRpdGxlXCIsIHNob3cudGl0bGUpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnNlcnQgbmV3IHNob3cgaWYgbm90IGZvdW5kXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIC8vIFVzZSBhIG5lZ2F0aXZlIHRpdGxlIGhhc2ggYXMgcGxhY2Vob2xkZXIgdG1kYl9pZCB1bnRpbCBUTURCIGRhdGEgaXMgZmV0Y2hlZC5cbiAgICAgICAgLy8gVE1EQiBvbmx5IHVzZXMgcG9zaXRpdmUgSURzLCBzbyBuZWdhdGl2ZXMgYXJlIHNhZmUgYXMgcGxhY2Vob2xkZXJzLlxuICAgICAgICAvLyBJZiB0bWRiX2lkIGNvbHVtbiBpcyBudWxsYWJsZSAoYWZ0ZXIgbWlncmF0aW9uKSwgbnVsbCB3b3VsZCBiZSB1c2VkIGhlcmUgaW5zdGVhZC5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUbWRiSWQgPSAtKFxuICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgc2hvdy50aXRsZS5zcGxpdChcIlwiKS5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgKSAlIDIwMDAwMDAwMDBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBuZXdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICAgICAgdG1kYl9pZDogcGxhY2Vob2xkZXJUbWRiSWQsXG4gICAgICAgICAgICBwb3N0ZXJfcGF0aDogbnVsbCxcbiAgICAgICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcnZpZXc6IG51bGwsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuc2luZ2xlKCk7XG4gICAgICAgIGRiU2hvd0lkID0gbmV3U2hvdz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRiU2hvd0lkKSB7XG4gICAgICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgICAgLmluc2VydCh7IGxpc3RfaWQ6IGxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBzaG93OiAke3Nob3cudGl0bGV9YCwgZSk7XG4gICAgfVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGxpc3RJZDogbGlzdC5pZCwgaW1wb3J0ZWRDb3VudDogcG9zaXRpb24gfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdEl0ZW1XaXRoU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlzdF9pZDogc3RyaW5nO1xuICBzaG93X2lkOiBzdHJpbmc7XG4gIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgYWRkZWRfYXQ6IHN0cmluZztcbiAgbm90ZXM6IHN0cmluZyB8IG51bGw7XG4gIHNob3dzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICAgIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgICB0bWRiX2ZldGNoZWQ6IGJvb2xlYW47XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEl0ZW1zUGFnZShcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemUgPSA1MCxcbik6IFByb21pc2U8e1xuICBpdGVtczogTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBoYXNNb3JlOiBib29sZWFuO1xuICBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xufT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJ1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghbGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghbGlzdC5pc19wdWJsaWMgJiYgbGlzdC51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgZnJvbSA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgY29uc3QgdG8gPSBmcm9tICsgcGFnZVNpemUgLSAxO1xuXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIiosIHNob3dzKCopXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBsaXN0SWQpXG4gICAgLm9yZGVyKFwicmF0aW5nXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSwgbnVsbHNGaXJzdDogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KVxuICAgIC5yYW5nZShmcm9tLCB0byk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgY29uc3QgaXRlbXMgPSAoZGF0YSA/PyBbXSkgYXMgdW5rbm93biBhcyBMaXN0SXRlbVdpdGhTaG93W107XG4gIGNvbnN0IGhhc01vcmUgPSBpdGVtcy5sZW5ndGggPT09IHBhZ2VTaXplO1xuXG4gIGNvbnN0IHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgaWYgKHVzZXIgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHsgZGF0YTogc2hvd1RhZ3MgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgLnNlbGVjdChcInNob3dfaWQsIHRhZ19pZFwiKVxuICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgICAgLmluKFxuICAgICAgICBcInNob3dfaWRcIixcbiAgICAgICAgaXRlbXMubWFwKChpKSA9PiBpLnNob3dzLmlkKSxcbiAgICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHN0IG9mIHNob3dUYWdzID8/IFtdKSB7XG4gICAgICBpZiAoIXNob3dUYWdzTWFwW3N0LnNob3dfaWRdKSBzaG93VGFnc01hcFtzdC5zaG93X2lkXSA9IFtdO1xuICAgICAgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0ucHVzaChzdC50YWdfaWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGl0ZW1zLCBoYXNNb3JlLCBzaG93VGFnc01hcCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2hvd1RvTXlMaXN0KFxuICB0YXJnZXRMaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSB0aGUgdGFyZ2V0IGxpc3QgYmVsb25ncyB0byB0aGUgY3VycmVudCB1c2VyXG4gIGNvbnN0IHsgZGF0YTogdGFyZ2V0TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCF0YXJnZXRMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZCBvciBub3Qgb3duZWQgYnkgeW91XCIpO1xuXG4gIC8vIEVuc3VyZSB0aGUgc2hvdyBleGlzdHMgaW4gb3VyIERCIChyZXVzZSBleGlzdGluZyBvciBjcmVhdGUpXG4gIGxldCBzaG93SWQgPSBzaG93LmlkO1xuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwiaWRcIiwgc2hvdy5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICAvLyBTaG93IG1pZ2h0IG5vdCBleGlzdCBpZiB0aGUgREIgaXMgaW4gYSB3ZWlyZCBzdGF0ZSDigJQgY3JlYXRlIGl0XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiB0YXJnZXQgbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCB0YXJnZXRMaXN0SWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogdGFyZ2V0TGlzdElkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7dGFyZ2V0TGlzdElkfWApO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZHVwbGljYXRlTGlzdChzb3VyY2VMaXN0SWQ6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBWZXJpZnkgc291cmNlIGxpc3QgaXMgcHVibGljIChvciBvd25lZCBieSB1c2VyKVxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gZm9yIHVzZXIncyBsaXN0c1xuICBjb25zdCB7IGRhdGE6IHVzZXJMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAodXNlckxpc3RzPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgLy8gQ3JlYXRlIHRoZSBuZXcgbGlzdFxuICBjb25zdCB7IGRhdGE6IG5ld0xpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlTGlzdC5kZXNjcmlwdGlvbixcbiAgICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gICAgICBpc19wdWJsaWM6IGZhbHNlLFxuICAgIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChsaXN0RXJyb3IpIHRocm93IG5ldyBFcnJvcihsaXN0RXJyb3IubWVzc2FnZSk7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBuZXdMaXN0LmlkLFxuICAgICAgc2hvd19pZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgICAgbm90ZXM6IGl0ZW0ubm90ZXMsXG4gICAgfSkpO1xuXG4gICAgY29uc3QgeyBlcnJvcjogaW5zZXJ0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAgIC5pbnNlcnQoaW5zZXJ0cyk7XG5cbiAgICBpZiAoaW5zZXJ0RXJyb3IpIHRocm93IG5ldyBFcnJvcihpbnNlcnRFcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBsaXN0SWQ6IG5ld0xpc3QuaWQsIGl0ZW1Db3VudDogc291cmNlSXRlbXM/Lmxlbmd0aCA/PyAwIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRTQW1Tc0IsNkxBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:8e01c5 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addShowToMyList",
    ()=>$$RSC_SERVER_ACTION_8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60a28c13a97e482f99f75f5981eded4d9dfadb2404":"addShowToMyList"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60a28c13a97e482f99f75f5981eded4d9dfadb2404", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addShowToMyList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChzdXBhYmFzZTogQXdhaXRlZDxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+PiwgdXNlcklkOiBzdHJpbmcpIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZClcbiAgICAuc2luZ2xlKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlzdChcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHVwZGF0ZXM6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IGlzX3B1YmxpYz86IGJvb2xlYW4gfSxcbikge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTGlzdChsaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLmRlbGV0ZSgpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9MaXN0KFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIHRtZGJfaWQ6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlPzogc3RyaW5nO1xuICAgIG92ZXJ2aWV3Pzogc3RyaW5nO1xuICB9LFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcHNlcnQgc2hvdyBpbiBzaG93cyB0YWJsZVxuICBsZXQgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOiBzaG93LnRtZGJfaWQsXG4gICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICBwb3N0ZXJfcGF0aDogc2hvdy5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IHNob3cuZmlyc3RfYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcgfHwgbnVsbCxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChzaG93RXJyb3IpIHRocm93IG5ldyBFcnJvcihzaG93RXJyb3IubWVzc2FnZSk7XG4gICAgZXhpc3RpbmdTaG93ID0gbmV3U2hvdztcbiAgfVxuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlb3JkZXJMaXN0SXRlbXMobGlzdElkOiBzdHJpbmcsIGl0ZW1JZHM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcGRhdGUgcG9zaXRpb25zXG4gIGNvbnN0IHVwZGF0ZXMgPSBpdGVtSWRzLm1hcCgoaWQsIGluZGV4KSA9PlxuICAgIHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLnVwZGF0ZSh7IHBvc2l0aW9uOiBpbmRleCB9KS5lcShcImlkXCIsIGlkKSxcbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbCh1cGRhdGVzKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7bGlzdElkfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0RnJvbUpzb24oanNvbkRhdGE6IHVua25vd24pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgcGFyc2VUcmFrdEpzb24gfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2ltcG9ydC90cmFrdC1wYXJzZXJcIik7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlVHJha3RKc29uKGpzb25EYXRhKTtcblxuICAvLyBDcmVhdGUgdGhlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBsaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAobGlzdHM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHBhcnNlZC5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhcnNlZC5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgaXNfcHVibGljOiBwYXJzZWQuaXNfcHVibGljLFxuICAgICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgICB9KVxuICAgIC5zZWxlY3QoKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAobGlzdEVycm9yKSB0aHJvdyBuZXcgRXJyb3IobGlzdEVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEluc2VydCBzaG93cyBkaXJlY3RseSB3aXRob3V0IFRNREIgcmVzb2x1dGlvbi5cbiAgLy8gVE1EQiBkYXRhIHdpbGwgYmUgZmV0Y2hlZCBsYXppbHkgd2hlbiB2aXNpdGluZyB0aGUgc2hvdyBkZXRhaWwgcGFnZS5cbiAgbGV0IHBvc2l0aW9uID0gMDtcbiAgZm9yIChjb25zdCBzaG93IG9mIHBhcnNlZC5zaG93cykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGJTaG93SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCBleGlzdGluZyBzaG93IGJ5IGltZGJfaWQgZmlyc3QsIHRoZW4gYnkgZXhhY3QgdGl0bGVcbiAgICAgIGlmIChzaG93LmltZGJfaWQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAgICAgLmVxKFwiaW1kYl9pZFwiLCBzaG93LmltZGJfaWQpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5pbGlrZShcInRpdGxlXCIsIHNob3cudGl0bGUpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnNlcnQgbmV3IHNob3cgaWYgbm90IGZvdW5kXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIC8vIFVzZSBhIG5lZ2F0aXZlIHRpdGxlIGhhc2ggYXMgcGxhY2Vob2xkZXIgdG1kYl9pZCB1bnRpbCBUTURCIGRhdGEgaXMgZmV0Y2hlZC5cbiAgICAgICAgLy8gVE1EQiBvbmx5IHVzZXMgcG9zaXRpdmUgSURzLCBzbyBuZWdhdGl2ZXMgYXJlIHNhZmUgYXMgcGxhY2Vob2xkZXJzLlxuICAgICAgICAvLyBJZiB0bWRiX2lkIGNvbHVtbiBpcyBudWxsYWJsZSAoYWZ0ZXIgbWlncmF0aW9uKSwgbnVsbCB3b3VsZCBiZSB1c2VkIGhlcmUgaW5zdGVhZC5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUbWRiSWQgPSAtKFxuICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgc2hvdy50aXRsZS5zcGxpdChcIlwiKS5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgKSAlIDIwMDAwMDAwMDBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBuZXdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICAgICAgdG1kYl9pZDogcGxhY2Vob2xkZXJUbWRiSWQsXG4gICAgICAgICAgICBwb3N0ZXJfcGF0aDogbnVsbCxcbiAgICAgICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcnZpZXc6IG51bGwsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuc2luZ2xlKCk7XG4gICAgICAgIGRiU2hvd0lkID0gbmV3U2hvdz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRiU2hvd0lkKSB7XG4gICAgICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgICAgLmluc2VydCh7IGxpc3RfaWQ6IGxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBzaG93OiAke3Nob3cudGl0bGV9YCwgZSk7XG4gICAgfVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGxpc3RJZDogbGlzdC5pZCwgaW1wb3J0ZWRDb3VudDogcG9zaXRpb24gfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdEl0ZW1XaXRoU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlzdF9pZDogc3RyaW5nO1xuICBzaG93X2lkOiBzdHJpbmc7XG4gIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgYWRkZWRfYXQ6IHN0cmluZztcbiAgbm90ZXM6IHN0cmluZyB8IG51bGw7XG4gIHNob3dzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICAgIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgICB0bWRiX2ZldGNoZWQ6IGJvb2xlYW47XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEl0ZW1zUGFnZShcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemUgPSA1MCxcbik6IFByb21pc2U8e1xuICBpdGVtczogTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBoYXNNb3JlOiBib29sZWFuO1xuICBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xufT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJ1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghbGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghbGlzdC5pc19wdWJsaWMgJiYgbGlzdC51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgZnJvbSA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgY29uc3QgdG8gPSBmcm9tICsgcGFnZVNpemUgLSAxO1xuXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIiosIHNob3dzKCopXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBsaXN0SWQpXG4gICAgLm9yZGVyKFwicmF0aW5nXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSwgbnVsbHNGaXJzdDogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KVxuICAgIC5yYW5nZShmcm9tLCB0byk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgY29uc3QgaXRlbXMgPSAoZGF0YSA/PyBbXSkgYXMgdW5rbm93biBhcyBMaXN0SXRlbVdpdGhTaG93W107XG4gIGNvbnN0IGhhc01vcmUgPSBpdGVtcy5sZW5ndGggPT09IHBhZ2VTaXplO1xuXG4gIGNvbnN0IHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgaWYgKHVzZXIgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHsgZGF0YTogc2hvd1RhZ3MgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgLnNlbGVjdChcInNob3dfaWQsIHRhZ19pZFwiKVxuICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgICAgLmluKFxuICAgICAgICBcInNob3dfaWRcIixcbiAgICAgICAgaXRlbXMubWFwKChpKSA9PiBpLnNob3dzLmlkKSxcbiAgICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHN0IG9mIHNob3dUYWdzID8/IFtdKSB7XG4gICAgICBpZiAoIXNob3dUYWdzTWFwW3N0LnNob3dfaWRdKSBzaG93VGFnc01hcFtzdC5zaG93X2lkXSA9IFtdO1xuICAgICAgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0ucHVzaChzdC50YWdfaWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGl0ZW1zLCBoYXNNb3JlLCBzaG93VGFnc01hcCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2hvd1RvTXlMaXN0KFxuICB0YXJnZXRMaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSB0aGUgdGFyZ2V0IGxpc3QgYmVsb25ncyB0byB0aGUgY3VycmVudCB1c2VyXG4gIGNvbnN0IHsgZGF0YTogdGFyZ2V0TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCF0YXJnZXRMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZCBvciBub3Qgb3duZWQgYnkgeW91XCIpO1xuXG4gIC8vIEVuc3VyZSB0aGUgc2hvdyBleGlzdHMgaW4gb3VyIERCIChyZXVzZSBleGlzdGluZyBvciBjcmVhdGUpXG4gIGxldCBzaG93SWQgPSBzaG93LmlkO1xuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwiaWRcIiwgc2hvdy5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICAvLyBTaG93IG1pZ2h0IG5vdCBleGlzdCBpZiB0aGUgREIgaXMgaW4gYSB3ZWlyZCBzdGF0ZSDigJQgY3JlYXRlIGl0XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiB0YXJnZXQgbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCB0YXJnZXRMaXN0SWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogdGFyZ2V0TGlzdElkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7dGFyZ2V0TGlzdElkfWApO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZHVwbGljYXRlTGlzdChzb3VyY2VMaXN0SWQ6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBWZXJpZnkgc291cmNlIGxpc3QgaXMgcHVibGljIChvciBvd25lZCBieSB1c2VyKVxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gZm9yIHVzZXIncyBsaXN0c1xuICBjb25zdCB7IGRhdGE6IHVzZXJMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAodXNlckxpc3RzPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgLy8gQ3JlYXRlIHRoZSBuZXcgbGlzdFxuICBjb25zdCB7IGRhdGE6IG5ld0xpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlTGlzdC5kZXNjcmlwdGlvbixcbiAgICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gICAgICBpc19wdWJsaWM6IGZhbHNlLFxuICAgIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChsaXN0RXJyb3IpIHRocm93IG5ldyBFcnJvcihsaXN0RXJyb3IubWVzc2FnZSk7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBuZXdMaXN0LmlkLFxuICAgICAgc2hvd19pZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgICAgbm90ZXM6IGl0ZW0ubm90ZXMsXG4gICAgfSkpO1xuXG4gICAgY29uc3QgeyBlcnJvcjogaW5zZXJ0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAgIC5pbnNlcnQoaW5zZXJ0cyk7XG5cbiAgICBpZiAoaW5zZXJ0RXJyb3IpIHRocm93IG5ldyBFcnJvcihpbnNlcnRFcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBsaXN0SWQ6IG5ld0xpc3QuaWQsIGl0ZW1Db3VudDogc291cmNlSXRlbXM/Lmxlbmd0aCA/PyAwIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjJTQStWc0IsNExBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/actions.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use turbopack no side effects";
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/[locale]/(app)/lists/data:c35ce7 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteList",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40b3b70915d422f898dc384efe43a41ba5197bb91f":"deleteList"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40b3b70915d422f898dc384efe43a41ba5197bb91f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "deleteList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChzdXBhYmFzZTogQXdhaXRlZDxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+PiwgdXNlcklkOiBzdHJpbmcpIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZClcbiAgICAuc2luZ2xlKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlzdChcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHVwZGF0ZXM6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IGlzX3B1YmxpYz86IGJvb2xlYW4gfSxcbikge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTGlzdChsaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLmRlbGV0ZSgpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9MaXN0KFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIHRtZGJfaWQ6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlPzogc3RyaW5nO1xuICAgIG92ZXJ2aWV3Pzogc3RyaW5nO1xuICB9LFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcHNlcnQgc2hvdyBpbiBzaG93cyB0YWJsZVxuICBsZXQgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOiBzaG93LnRtZGJfaWQsXG4gICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICBwb3N0ZXJfcGF0aDogc2hvdy5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IHNob3cuZmlyc3RfYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcgfHwgbnVsbCxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChzaG93RXJyb3IpIHRocm93IG5ldyBFcnJvcihzaG93RXJyb3IubWVzc2FnZSk7XG4gICAgZXhpc3RpbmdTaG93ID0gbmV3U2hvdztcbiAgfVxuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlb3JkZXJMaXN0SXRlbXMobGlzdElkOiBzdHJpbmcsIGl0ZW1JZHM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcGRhdGUgcG9zaXRpb25zXG4gIGNvbnN0IHVwZGF0ZXMgPSBpdGVtSWRzLm1hcCgoaWQsIGluZGV4KSA9PlxuICAgIHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLnVwZGF0ZSh7IHBvc2l0aW9uOiBpbmRleCB9KS5lcShcImlkXCIsIGlkKSxcbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbCh1cGRhdGVzKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7bGlzdElkfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0RnJvbUpzb24oanNvbkRhdGE6IHVua25vd24pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgcGFyc2VUcmFrdEpzb24gfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2ltcG9ydC90cmFrdC1wYXJzZXJcIik7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlVHJha3RKc29uKGpzb25EYXRhKTtcblxuICAvLyBDcmVhdGUgdGhlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBsaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAobGlzdHM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHBhcnNlZC5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhcnNlZC5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgaXNfcHVibGljOiBwYXJzZWQuaXNfcHVibGljLFxuICAgICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgICB9KVxuICAgIC5zZWxlY3QoKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAobGlzdEVycm9yKSB0aHJvdyBuZXcgRXJyb3IobGlzdEVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEluc2VydCBzaG93cyBkaXJlY3RseSB3aXRob3V0IFRNREIgcmVzb2x1dGlvbi5cbiAgLy8gVE1EQiBkYXRhIHdpbGwgYmUgZmV0Y2hlZCBsYXppbHkgd2hlbiB2aXNpdGluZyB0aGUgc2hvdyBkZXRhaWwgcGFnZS5cbiAgbGV0IHBvc2l0aW9uID0gMDtcbiAgZm9yIChjb25zdCBzaG93IG9mIHBhcnNlZC5zaG93cykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGJTaG93SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCBleGlzdGluZyBzaG93IGJ5IGltZGJfaWQgZmlyc3QsIHRoZW4gYnkgZXhhY3QgdGl0bGVcbiAgICAgIGlmIChzaG93LmltZGJfaWQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAgICAgLmVxKFwiaW1kYl9pZFwiLCBzaG93LmltZGJfaWQpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5pbGlrZShcInRpdGxlXCIsIHNob3cudGl0bGUpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnNlcnQgbmV3IHNob3cgaWYgbm90IGZvdW5kXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIC8vIFVzZSBhIG5lZ2F0aXZlIHRpdGxlIGhhc2ggYXMgcGxhY2Vob2xkZXIgdG1kYl9pZCB1bnRpbCBUTURCIGRhdGEgaXMgZmV0Y2hlZC5cbiAgICAgICAgLy8gVE1EQiBvbmx5IHVzZXMgcG9zaXRpdmUgSURzLCBzbyBuZWdhdGl2ZXMgYXJlIHNhZmUgYXMgcGxhY2Vob2xkZXJzLlxuICAgICAgICAvLyBJZiB0bWRiX2lkIGNvbHVtbiBpcyBudWxsYWJsZSAoYWZ0ZXIgbWlncmF0aW9uKSwgbnVsbCB3b3VsZCBiZSB1c2VkIGhlcmUgaW5zdGVhZC5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUbWRiSWQgPSAtKFxuICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgc2hvdy50aXRsZS5zcGxpdChcIlwiKS5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgKSAlIDIwMDAwMDAwMDBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBuZXdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICAgICAgdG1kYl9pZDogcGxhY2Vob2xkZXJUbWRiSWQsXG4gICAgICAgICAgICBwb3N0ZXJfcGF0aDogbnVsbCxcbiAgICAgICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcnZpZXc6IG51bGwsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuc2luZ2xlKCk7XG4gICAgICAgIGRiU2hvd0lkID0gbmV3U2hvdz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRiU2hvd0lkKSB7XG4gICAgICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgICAgLmluc2VydCh7IGxpc3RfaWQ6IGxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBzaG93OiAke3Nob3cudGl0bGV9YCwgZSk7XG4gICAgfVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGxpc3RJZDogbGlzdC5pZCwgaW1wb3J0ZWRDb3VudDogcG9zaXRpb24gfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdEl0ZW1XaXRoU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlzdF9pZDogc3RyaW5nO1xuICBzaG93X2lkOiBzdHJpbmc7XG4gIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgYWRkZWRfYXQ6IHN0cmluZztcbiAgbm90ZXM6IHN0cmluZyB8IG51bGw7XG4gIHNob3dzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICAgIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgICB0bWRiX2ZldGNoZWQ6IGJvb2xlYW47XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEl0ZW1zUGFnZShcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemUgPSA1MCxcbik6IFByb21pc2U8e1xuICBpdGVtczogTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBoYXNNb3JlOiBib29sZWFuO1xuICBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xufT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJ1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghbGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghbGlzdC5pc19wdWJsaWMgJiYgbGlzdC51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgZnJvbSA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgY29uc3QgdG8gPSBmcm9tICsgcGFnZVNpemUgLSAxO1xuXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIiosIHNob3dzKCopXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBsaXN0SWQpXG4gICAgLm9yZGVyKFwicmF0aW5nXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSwgbnVsbHNGaXJzdDogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KVxuICAgIC5yYW5nZShmcm9tLCB0byk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgY29uc3QgaXRlbXMgPSAoZGF0YSA/PyBbXSkgYXMgdW5rbm93biBhcyBMaXN0SXRlbVdpdGhTaG93W107XG4gIGNvbnN0IGhhc01vcmUgPSBpdGVtcy5sZW5ndGggPT09IHBhZ2VTaXplO1xuXG4gIGNvbnN0IHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgaWYgKHVzZXIgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHsgZGF0YTogc2hvd1RhZ3MgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgLnNlbGVjdChcInNob3dfaWQsIHRhZ19pZFwiKVxuICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgICAgLmluKFxuICAgICAgICBcInNob3dfaWRcIixcbiAgICAgICAgaXRlbXMubWFwKChpKSA9PiBpLnNob3dzLmlkKSxcbiAgICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHN0IG9mIHNob3dUYWdzID8/IFtdKSB7XG4gICAgICBpZiAoIXNob3dUYWdzTWFwW3N0LnNob3dfaWRdKSBzaG93VGFnc01hcFtzdC5zaG93X2lkXSA9IFtdO1xuICAgICAgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0ucHVzaChzdC50YWdfaWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGl0ZW1zLCBoYXNNb3JlLCBzaG93VGFnc01hcCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2hvd1RvTXlMaXN0KFxuICB0YXJnZXRMaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSB0aGUgdGFyZ2V0IGxpc3QgYmVsb25ncyB0byB0aGUgY3VycmVudCB1c2VyXG4gIGNvbnN0IHsgZGF0YTogdGFyZ2V0TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCF0YXJnZXRMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZCBvciBub3Qgb3duZWQgYnkgeW91XCIpO1xuXG4gIC8vIEVuc3VyZSB0aGUgc2hvdyBleGlzdHMgaW4gb3VyIERCIChyZXVzZSBleGlzdGluZyBvciBjcmVhdGUpXG4gIGxldCBzaG93SWQgPSBzaG93LmlkO1xuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwiaWRcIiwgc2hvdy5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICAvLyBTaG93IG1pZ2h0IG5vdCBleGlzdCBpZiB0aGUgREIgaXMgaW4gYSB3ZWlyZCBzdGF0ZSDigJQgY3JlYXRlIGl0XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiB0YXJnZXQgbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCB0YXJnZXRMaXN0SWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogdGFyZ2V0TGlzdElkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7dGFyZ2V0TGlzdElkfWApO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZHVwbGljYXRlTGlzdChzb3VyY2VMaXN0SWQ6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBWZXJpZnkgc291cmNlIGxpc3QgaXMgcHVibGljIChvciBvd25lZCBieSB1c2VyKVxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gZm9yIHVzZXIncyBsaXN0c1xuICBjb25zdCB7IGRhdGE6IHVzZXJMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAodXNlckxpc3RzPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgLy8gQ3JlYXRlIHRoZSBuZXcgbGlzdFxuICBjb25zdCB7IGRhdGE6IG5ld0xpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlTGlzdC5kZXNjcmlwdGlvbixcbiAgICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gICAgICBpc19wdWJsaWM6IGZhbHNlLFxuICAgIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChsaXN0RXJyb3IpIHRocm93IG5ldyBFcnJvcihsaXN0RXJyb3IubWVzc2FnZSk7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBuZXdMaXN0LmlkLFxuICAgICAgc2hvd19pZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgICAgbm90ZXM6IGl0ZW0ubm90ZXMsXG4gICAgfSkpO1xuXG4gICAgY29uc3QgeyBlcnJvcjogaW5zZXJ0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAgIC5pbnNlcnQoaW5zZXJ0cyk7XG5cbiAgICBpZiAoaW5zZXJ0RXJyb3IpIHRocm93IG5ldyBFcnJvcihpbnNlcnRFcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBsaXN0SWQ6IG5ld0xpc3QuaWQsIGl0ZW1Db3VudDogc291cmNlSXRlbXM/Lmxlbmd0aCA/PyAwIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InNTQW9Dc0IsdUxBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:adad62 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "importFromJson",
    ()=>$$RSC_SERVER_ACTION_6
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40135b4f04efdd27899e4e5ea2914c4c77e68be858":"importFromJson"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40135b4f04efdd27899e4e5ea2914c4c77e68be858", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "importFromJson");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChzdXBhYmFzZTogQXdhaXRlZDxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+PiwgdXNlcklkOiBzdHJpbmcpIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZClcbiAgICAuc2luZ2xlKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlzdChcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHVwZGF0ZXM6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IGlzX3B1YmxpYz86IGJvb2xlYW4gfSxcbikge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTGlzdChsaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLmRlbGV0ZSgpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9MaXN0KFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIHRtZGJfaWQ6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlPzogc3RyaW5nO1xuICAgIG92ZXJ2aWV3Pzogc3RyaW5nO1xuICB9LFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcHNlcnQgc2hvdyBpbiBzaG93cyB0YWJsZVxuICBsZXQgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOiBzaG93LnRtZGJfaWQsXG4gICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICBwb3N0ZXJfcGF0aDogc2hvdy5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IHNob3cuZmlyc3RfYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcgfHwgbnVsbCxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChzaG93RXJyb3IpIHRocm93IG5ldyBFcnJvcihzaG93RXJyb3IubWVzc2FnZSk7XG4gICAgZXhpc3RpbmdTaG93ID0gbmV3U2hvdztcbiAgfVxuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlb3JkZXJMaXN0SXRlbXMobGlzdElkOiBzdHJpbmcsIGl0ZW1JZHM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcGRhdGUgcG9zaXRpb25zXG4gIGNvbnN0IHVwZGF0ZXMgPSBpdGVtSWRzLm1hcCgoaWQsIGluZGV4KSA9PlxuICAgIHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLnVwZGF0ZSh7IHBvc2l0aW9uOiBpbmRleCB9KS5lcShcImlkXCIsIGlkKSxcbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbCh1cGRhdGVzKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7bGlzdElkfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0RnJvbUpzb24oanNvbkRhdGE6IHVua25vd24pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgcGFyc2VUcmFrdEpzb24gfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2ltcG9ydC90cmFrdC1wYXJzZXJcIik7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlVHJha3RKc29uKGpzb25EYXRhKTtcblxuICAvLyBDcmVhdGUgdGhlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBsaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAobGlzdHM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHBhcnNlZC5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhcnNlZC5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgaXNfcHVibGljOiBwYXJzZWQuaXNfcHVibGljLFxuICAgICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgICB9KVxuICAgIC5zZWxlY3QoKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAobGlzdEVycm9yKSB0aHJvdyBuZXcgRXJyb3IobGlzdEVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEluc2VydCBzaG93cyBkaXJlY3RseSB3aXRob3V0IFRNREIgcmVzb2x1dGlvbi5cbiAgLy8gVE1EQiBkYXRhIHdpbGwgYmUgZmV0Y2hlZCBsYXppbHkgd2hlbiB2aXNpdGluZyB0aGUgc2hvdyBkZXRhaWwgcGFnZS5cbiAgbGV0IHBvc2l0aW9uID0gMDtcbiAgZm9yIChjb25zdCBzaG93IG9mIHBhcnNlZC5zaG93cykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGJTaG93SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCBleGlzdGluZyBzaG93IGJ5IGltZGJfaWQgZmlyc3QsIHRoZW4gYnkgZXhhY3QgdGl0bGVcbiAgICAgIGlmIChzaG93LmltZGJfaWQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAgICAgLmVxKFwiaW1kYl9pZFwiLCBzaG93LmltZGJfaWQpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5pbGlrZShcInRpdGxlXCIsIHNob3cudGl0bGUpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnNlcnQgbmV3IHNob3cgaWYgbm90IGZvdW5kXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIC8vIFVzZSBhIG5lZ2F0aXZlIHRpdGxlIGhhc2ggYXMgcGxhY2Vob2xkZXIgdG1kYl9pZCB1bnRpbCBUTURCIGRhdGEgaXMgZmV0Y2hlZC5cbiAgICAgICAgLy8gVE1EQiBvbmx5IHVzZXMgcG9zaXRpdmUgSURzLCBzbyBuZWdhdGl2ZXMgYXJlIHNhZmUgYXMgcGxhY2Vob2xkZXJzLlxuICAgICAgICAvLyBJZiB0bWRiX2lkIGNvbHVtbiBpcyBudWxsYWJsZSAoYWZ0ZXIgbWlncmF0aW9uKSwgbnVsbCB3b3VsZCBiZSB1c2VkIGhlcmUgaW5zdGVhZC5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUbWRiSWQgPSAtKFxuICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgc2hvdy50aXRsZS5zcGxpdChcIlwiKS5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgKSAlIDIwMDAwMDAwMDBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBuZXdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICAgICAgdG1kYl9pZDogcGxhY2Vob2xkZXJUbWRiSWQsXG4gICAgICAgICAgICBwb3N0ZXJfcGF0aDogbnVsbCxcbiAgICAgICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcnZpZXc6IG51bGwsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuc2luZ2xlKCk7XG4gICAgICAgIGRiU2hvd0lkID0gbmV3U2hvdz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRiU2hvd0lkKSB7XG4gICAgICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgICAgLmluc2VydCh7IGxpc3RfaWQ6IGxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBzaG93OiAke3Nob3cudGl0bGV9YCwgZSk7XG4gICAgfVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGxpc3RJZDogbGlzdC5pZCwgaW1wb3J0ZWRDb3VudDogcG9zaXRpb24gfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdEl0ZW1XaXRoU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlzdF9pZDogc3RyaW5nO1xuICBzaG93X2lkOiBzdHJpbmc7XG4gIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgYWRkZWRfYXQ6IHN0cmluZztcbiAgbm90ZXM6IHN0cmluZyB8IG51bGw7XG4gIHNob3dzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICAgIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgICB0bWRiX2ZldGNoZWQ6IGJvb2xlYW47XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEl0ZW1zUGFnZShcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemUgPSA1MCxcbik6IFByb21pc2U8e1xuICBpdGVtczogTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBoYXNNb3JlOiBib29sZWFuO1xuICBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xufT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJ1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghbGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghbGlzdC5pc19wdWJsaWMgJiYgbGlzdC51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgZnJvbSA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgY29uc3QgdG8gPSBmcm9tICsgcGFnZVNpemUgLSAxO1xuXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIiosIHNob3dzKCopXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBsaXN0SWQpXG4gICAgLm9yZGVyKFwicmF0aW5nXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSwgbnVsbHNGaXJzdDogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KVxuICAgIC5yYW5nZShmcm9tLCB0byk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgY29uc3QgaXRlbXMgPSAoZGF0YSA/PyBbXSkgYXMgdW5rbm93biBhcyBMaXN0SXRlbVdpdGhTaG93W107XG4gIGNvbnN0IGhhc01vcmUgPSBpdGVtcy5sZW5ndGggPT09IHBhZ2VTaXplO1xuXG4gIGNvbnN0IHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgaWYgKHVzZXIgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHsgZGF0YTogc2hvd1RhZ3MgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgLnNlbGVjdChcInNob3dfaWQsIHRhZ19pZFwiKVxuICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgICAgLmluKFxuICAgICAgICBcInNob3dfaWRcIixcbiAgICAgICAgaXRlbXMubWFwKChpKSA9PiBpLnNob3dzLmlkKSxcbiAgICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHN0IG9mIHNob3dUYWdzID8/IFtdKSB7XG4gICAgICBpZiAoIXNob3dUYWdzTWFwW3N0LnNob3dfaWRdKSBzaG93VGFnc01hcFtzdC5zaG93X2lkXSA9IFtdO1xuICAgICAgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0ucHVzaChzdC50YWdfaWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGl0ZW1zLCBoYXNNb3JlLCBzaG93VGFnc01hcCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2hvd1RvTXlMaXN0KFxuICB0YXJnZXRMaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSB0aGUgdGFyZ2V0IGxpc3QgYmVsb25ncyB0byB0aGUgY3VycmVudCB1c2VyXG4gIGNvbnN0IHsgZGF0YTogdGFyZ2V0TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCF0YXJnZXRMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZCBvciBub3Qgb3duZWQgYnkgeW91XCIpO1xuXG4gIC8vIEVuc3VyZSB0aGUgc2hvdyBleGlzdHMgaW4gb3VyIERCIChyZXVzZSBleGlzdGluZyBvciBjcmVhdGUpXG4gIGxldCBzaG93SWQgPSBzaG93LmlkO1xuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwiaWRcIiwgc2hvdy5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICAvLyBTaG93IG1pZ2h0IG5vdCBleGlzdCBpZiB0aGUgREIgaXMgaW4gYSB3ZWlyZCBzdGF0ZSDigJQgY3JlYXRlIGl0XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiB0YXJnZXQgbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCB0YXJnZXRMaXN0SWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogdGFyZ2V0TGlzdElkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7dGFyZ2V0TGlzdElkfWApO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZHVwbGljYXRlTGlzdChzb3VyY2VMaXN0SWQ6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBWZXJpZnkgc291cmNlIGxpc3QgaXMgcHVibGljIChvciBvd25lZCBieSB1c2VyKVxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gZm9yIHVzZXIncyBsaXN0c1xuICBjb25zdCB7IGRhdGE6IHVzZXJMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAodXNlckxpc3RzPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgLy8gQ3JlYXRlIHRoZSBuZXcgbGlzdFxuICBjb25zdCB7IGRhdGE6IG5ld0xpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlTGlzdC5kZXNjcmlwdGlvbixcbiAgICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gICAgICBpc19wdWJsaWM6IGZhbHNlLFxuICAgIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChsaXN0RXJyb3IpIHRocm93IG5ldyBFcnJvcihsaXN0RXJyb3IubWVzc2FnZSk7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBuZXdMaXN0LmlkLFxuICAgICAgc2hvd19pZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgICAgbm90ZXM6IGl0ZW0ubm90ZXMsXG4gICAgfSkpO1xuXG4gICAgY29uc3QgeyBlcnJvcjogaW5zZXJ0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAgIC5pbnNlcnQoaW5zZXJ0cyk7XG5cbiAgICBpZiAoaW5zZXJ0RXJyb3IpIHRocm93IG5ldyBFcnJvcihpbnNlcnRFcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBsaXN0SWQ6IG5ld0xpc3QuaWQsIGl0ZW1Db3VudDogc291cmNlSXRlbXM/Lmxlbmd0aCA/PyAwIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjBTQXlLc0IsMkxBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/data:e3f0bf [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "duplicateList",
    ()=>$$RSC_SERVER_ACTION_9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60f447d779987ddd8e70352f5596ae3955e32ce4ed":"duplicateList"},"src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60f447d779987ddd8e70352f5596ae3955e32ce4ed", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "duplicateList");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChzdXBhYmFzZTogQXdhaXRlZDxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDbGllbnQ+PiwgdXNlcklkOiBzdHJpbmcpIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZClcbiAgICAuc2luZ2xlKCk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlzdChcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHVwZGF0ZXM6IHsgbmFtZT86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IGlzX3B1YmxpYz86IGJvb2xlYW4gfSxcbikge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTGlzdChsaXN0SWQ6IHN0cmluZykge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLmRlbGV0ZSgpXG4gICAgLmVxKFwiaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9MaXN0KFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIHRtZGJfaWQ6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlPzogc3RyaW5nO1xuICAgIG92ZXJ2aWV3Pzogc3RyaW5nO1xuICB9LFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcHNlcnQgc2hvdyBpbiBzaG93cyB0YWJsZVxuICBsZXQgeyBkYXRhOiBleGlzdGluZ1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOiBzaG93LnRtZGJfaWQsXG4gICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICBwb3N0ZXJfcGF0aDogc2hvdy5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IHNob3cuZmlyc3RfYWlyX2RhdGUgfHwgbnVsbCxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcgfHwgbnVsbCxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKTtcblxuICAgIGlmIChzaG93RXJyb3IpIHRocm93IG5ldyBFcnJvcihzaG93RXJyb3IubWVzc2FnZSk7XG4gICAgZXhpc3RpbmdTaG93ID0gbmV3U2hvdztcbiAgfVxuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlb3JkZXJMaXN0SXRlbXMobGlzdElkOiBzdHJpbmcsIGl0ZW1JZHM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBVcGRhdGUgcG9zaXRpb25zXG4gIGNvbnN0IHVwZGF0ZXMgPSBpdGVtSWRzLm1hcCgoaWQsIGluZGV4KSA9PlxuICAgIHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLnVwZGF0ZSh7IHBvc2l0aW9uOiBpbmRleCB9KS5lcShcImlkXCIsIGlkKSxcbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbCh1cGRhdGVzKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7bGlzdElkfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0RnJvbUpzb24oanNvbkRhdGE6IHVua25vd24pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgcGFyc2VUcmFrdEpzb24gfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL2ltcG9ydC90cmFrdC1wYXJzZXJcIik7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlVHJha3RKc29uKGpzb25EYXRhKTtcblxuICAvLyBDcmVhdGUgdGhlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBsaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAobGlzdHM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHBhcnNlZC5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhcnNlZC5kZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgaXNfcHVibGljOiBwYXJzZWQuaXNfcHVibGljLFxuICAgICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgICB9KVxuICAgIC5zZWxlY3QoKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAobGlzdEVycm9yKSB0aHJvdyBuZXcgRXJyb3IobGlzdEVycm9yLm1lc3NhZ2UpO1xuXG4gIC8vIEluc2VydCBzaG93cyBkaXJlY3RseSB3aXRob3V0IFRNREIgcmVzb2x1dGlvbi5cbiAgLy8gVE1EQiBkYXRhIHdpbGwgYmUgZmV0Y2hlZCBsYXppbHkgd2hlbiB2aXNpdGluZyB0aGUgc2hvdyBkZXRhaWwgcGFnZS5cbiAgbGV0IHBvc2l0aW9uID0gMDtcbiAgZm9yIChjb25zdCBzaG93IG9mIHBhcnNlZC5zaG93cykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGJTaG93SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCBleGlzdGluZyBzaG93IGJ5IGltZGJfaWQgZmlyc3QsIHRoZW4gYnkgZXhhY3QgdGl0bGVcbiAgICAgIGlmIChzaG93LmltZGJfaWQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBleGlzdGluZyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAgICAgLmVxKFwiaW1kYl9pZFwiLCBzaG93LmltZGJfaWQpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5pbGlrZShcInRpdGxlXCIsIHNob3cudGl0bGUpXG4gICAgICAgICAgLmxpbWl0KDEpXG4gICAgICAgICAgLnNpbmdsZSgpO1xuICAgICAgICBkYlNob3dJZCA9IGV4aXN0aW5nPy5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnNlcnQgbmV3IHNob3cgaWYgbm90IGZvdW5kXG4gICAgICBpZiAoIWRiU2hvd0lkKSB7XG4gICAgICAgIC8vIFVzZSBhIG5lZ2F0aXZlIHRpdGxlIGhhc2ggYXMgcGxhY2Vob2xkZXIgdG1kYl9pZCB1bnRpbCBUTURCIGRhdGEgaXMgZmV0Y2hlZC5cbiAgICAgICAgLy8gVE1EQiBvbmx5IHVzZXMgcG9zaXRpdmUgSURzLCBzbyBuZWdhdGl2ZXMgYXJlIHNhZmUgYXMgcGxhY2Vob2xkZXJzLlxuICAgICAgICAvLyBJZiB0bWRiX2lkIGNvbHVtbiBpcyBudWxsYWJsZSAoYWZ0ZXIgbWlncmF0aW9uKSwgbnVsbCB3b3VsZCBiZSB1c2VkIGhlcmUgaW5zdGVhZC5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUbWRiSWQgPSAtKFxuICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgc2hvdy50aXRsZS5zcGxpdChcIlwiKS5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgKSAlIDIwMDAwMDAwMDBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiBuZXdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICAgICAgdG1kYl9pZDogcGxhY2Vob2xkZXJUbWRiSWQsXG4gICAgICAgICAgICBwb3N0ZXJfcGF0aDogbnVsbCxcbiAgICAgICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBudWxsLFxuICAgICAgICAgICAgb3ZlcnZpZXc6IG51bGwsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuc2luZ2xlKCk7XG4gICAgICAgIGRiU2hvd0lkID0gbmV3U2hvdz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRiU2hvd0lkKSB7XG4gICAgICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgICAgLmluc2VydCh7IGxpc3RfaWQ6IGxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBzaG93OiAke3Nob3cudGl0bGV9YCwgZSk7XG4gICAgfVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG4gIHJldHVybiB7IGxpc3RJZDogbGlzdC5pZCwgaW1wb3J0ZWRDb3VudDogcG9zaXRpb24gfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdEl0ZW1XaXRoU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlzdF9pZDogc3RyaW5nO1xuICBzaG93X2lkOiBzdHJpbmc7XG4gIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgYWRkZWRfYXQ6IHN0cmluZztcbiAgbm90ZXM6IHN0cmluZyB8IG51bGw7XG4gIHNob3dzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICAgIGltZGJfaWQ6IHN0cmluZyB8IG51bGw7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgICB0bWRiX2ZldGNoZWQ6IGJvb2xlYW47XG4gIH07XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdEl0ZW1zUGFnZShcbiAgbGlzdElkOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemUgPSA1MCxcbik6IFByb21pc2U8e1xuICBpdGVtczogTGlzdEl0ZW1XaXRoU2hvd1tdO1xuICBoYXNNb3JlOiBib29sZWFuO1xuICBzaG93VGFnc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xufT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBjb25zdCB7IGRhdGE6IGxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJ1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghbGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghbGlzdC5pc19wdWJsaWMgJiYgbGlzdC51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgZnJvbSA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgY29uc3QgdG8gPSBmcm9tICsgcGFnZVNpemUgLSAxO1xuXG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIiosIHNob3dzKCopXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBsaXN0SWQpXG4gICAgLm9yZGVyKFwicmF0aW5nXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSwgbnVsbHNGaXJzdDogZmFsc2UgfSlcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KVxuICAgIC5yYW5nZShmcm9tLCB0byk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgY29uc3QgaXRlbXMgPSAoZGF0YSA/PyBbXSkgYXMgdW5rbm93biBhcyBMaXN0SXRlbVdpdGhTaG93W107XG4gIGNvbnN0IGhhc01vcmUgPSBpdGVtcy5sZW5ndGggPT09IHBhZ2VTaXplO1xuXG4gIGNvbnN0IHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgaWYgKHVzZXIgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHsgZGF0YTogc2hvd1RhZ3MgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgLnNlbGVjdChcInNob3dfaWQsIHRhZ19pZFwiKVxuICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgICAgLmluKFxuICAgICAgICBcInNob3dfaWRcIixcbiAgICAgICAgaXRlbXMubWFwKChpKSA9PiBpLnNob3dzLmlkKSxcbiAgICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHN0IG9mIHNob3dUYWdzID8/IFtdKSB7XG4gICAgICBpZiAoIXNob3dUYWdzTWFwW3N0LnNob3dfaWRdKSBzaG93VGFnc01hcFtzdC5zaG93X2lkXSA9IFtdO1xuICAgICAgc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0ucHVzaChzdC50YWdfaWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGl0ZW1zLCBoYXNNb3JlLCBzaG93VGFnc01hcCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2hvd1RvTXlMaXN0KFxuICB0YXJnZXRMaXN0SWQ6IHN0cmluZyxcbiAgc2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSB0aGUgdGFyZ2V0IGxpc3QgYmVsb25ncyB0byB0aGUgY3VycmVudCB1c2VyXG4gIGNvbnN0IHsgZGF0YTogdGFyZ2V0TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCF0YXJnZXRMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZCBvciBub3Qgb3duZWQgYnkgeW91XCIpO1xuXG4gIC8vIEVuc3VyZSB0aGUgc2hvdyBleGlzdHMgaW4gb3VyIERCIChyZXVzZSBleGlzdGluZyBvciBjcmVhdGUpXG4gIGxldCBzaG93SWQgPSBzaG93LmlkO1xuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwiaWRcIiwgc2hvdy5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFleGlzdGluZ1Nob3cpIHtcbiAgICAvLyBTaG93IG1pZ2h0IG5vdCBleGlzdCBpZiB0aGUgREIgaXMgaW4gYSB3ZWlyZCBzdGF0ZSDigJQgY3JlYXRlIGl0XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6XG4gICAgICAgICAgc2hvdy50bWRiX2lkID8/XG4gICAgICAgICAgLShcbiAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICBzaG93LnRpdGxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICAgICkgJSAyMDAwMDAwMDAwXG4gICAgICAgICAgKSxcbiAgICAgICAgaW1kYl9pZDogc2hvdy5pbWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoc2hvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3Ioc2hvd0Vycm9yLm1lc3NhZ2UpO1xuICAgIHNob3dJZCA9IG5ld1Nob3chLmlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiB0YXJnZXQgbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgdGFyZ2V0TGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCB0YXJnZXRMaXN0SWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogdGFyZ2V0TGlzdElkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChgL2xpc3RzLyR7dGFyZ2V0TGlzdElkfWApO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZHVwbGljYXRlTGlzdChzb3VyY2VMaXN0SWQ6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICAvLyBWZXJpZnkgc291cmNlIGxpc3QgaXMgcHVibGljIChvciBvd25lZCBieSB1c2VyKVxuICBjb25zdCB7IGRhdGE6IHNvdXJjZUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGlzX3B1YmxpYywgdXNlcl9pZFwiKVxuICAgIC5lcShcImlkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFzb3VyY2VMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFzb3VyY2VMaXN0LmlzX3B1YmxpYyAmJiBzb3VyY2VMaXN0LnVzZXJfaWQgIT09IHVzZXIuaWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gZm9yIHVzZXIncyBsaXN0c1xuICBjb25zdCB7IGRhdGE6IHVzZXJMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAodXNlckxpc3RzPy5bMF0/LnBvc2l0aW9uID8/IC0xKSArIDE7XG5cbiAgLy8gQ3JlYXRlIHRoZSBuZXcgbGlzdFxuICBjb25zdCB7IGRhdGE6IG5ld0xpc3QsIGVycm9yOiBsaXN0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5pbnNlcnQoe1xuICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlTGlzdC5kZXNjcmlwdGlvbixcbiAgICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gICAgICBpc19wdWJsaWM6IGZhbHNlLFxuICAgIH0pXG4gICAgLnNlbGVjdCgpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChsaXN0RXJyb3IpIHRocm93IG5ldyBFcnJvcihsaXN0RXJyb3IubWVzc2FnZSk7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBuZXdMaXN0LmlkLFxuICAgICAgc2hvd19pZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgICAgbm90ZXM6IGl0ZW0ubm90ZXMsXG4gICAgfSkpO1xuXG4gICAgY29uc3QgeyBlcnJvcjogaW5zZXJ0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAgIC5pbnNlcnQoaW5zZXJ0cyk7XG5cbiAgICBpZiAoaW5zZXJ0RXJyb3IpIHRocm93IG5ldyBFcnJvcihpbnNlcnRFcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBsaXN0SWQ6IG5ld0xpc3QuaWQsIGl0ZW1Db3VudDogc291cmNlSXRlbXM/Lmxlbmd0aCA/PyAwIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlTQTZic0IsMExBQUEifQ==
}),
"[project]/src/app/[locale]/(app)/lists/actions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addShowToList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$f6469a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addShowToList"],
    "addShowToMyList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$8e01c5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addShowToMyList"],
    "deleteList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$c35ce7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["deleteList"],
    "duplicateList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$e3f0bf__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["duplicateList"],
    "getListItemsPage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$46c341__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getListItemsPage"],
    "importFromJson",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$adad62__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["importFromJson"],
    "removeShowFromList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$cff8c3__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["removeShowFromList"],
    "reorderListItems",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$7d850f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["reorderListItems"],
    "updateList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$240ec5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateList"],
    "updateShowRating",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$7eee2f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateShowRating"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/actions.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$240ec5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:240ec5 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$c35ce7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:c35ce7 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$f6469a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:f6469a [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$cff8c3__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:cff8c3 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$7eee2f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:7eee2f [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$7d850f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:7d850f [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$adad62__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:adad62 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$46c341__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:46c341 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$8e01c5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:8e01c5 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$e3f0bf__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:e3f0bf [app-client] (ecmascript) <text/javascript>");
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
"[project]/src/app/[locale]/(app)/shows/data:ecebbd [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgZmluZEJ5SW1kYklkLCBzZWFyY2hTaG93cywgZ2V0U2hvd0RldGFpbHMgfSBmcm9tIFwiQC9saWIvdG1kYi9jbGllbnRcIjtcblxuLyoqXG4gKiBMYXppbHkgZmV0Y2hlcyBUTURCIGRhdGEgZm9yIGEgc2hvdyBhbmQgcGVyc2lzdHMgaXQgdG8gdGhlIGRhdGFiYXNlLlxuICogQ2FsbGVkIG9uY2Ugd2hlbiBhIHVzZXIgZmlyc3QgdmlzaXRzIGEgc2hvdyBkZXRhaWwgcGFnZSB0aGF0IGhhc24ndCBiZWVuIGVucmljaGVkIHlldC5cbiAqXG4gKiBBIHNob3cgbmVlZHMgZW5yaWNobWVudCBpZjpcbiAqICAtIHRtZGJfZmV0Y2hlZCA9PT0gZmFsc2UgIChhZnRlciBtaWdyYXRpb24pXG4gKiAgLSBPUiB0bWRiX2lkIGlzIG5lZ2F0aXZlICAocGxhY2Vob2xkZXIgc2V0IGR1cmluZyBpbXBvcnQgYmVmb3JlIG1pZ3JhdGlvbilcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoVG1kYkRhdGEoc2hvd0lkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICBjb25zdCB7IGRhdGE6IHNob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgLmVxKFwiaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuXG4gIC8vIEFscmVhZHkgZW5yaWNoZWRcbiAgY29uc3QgbmVlZHNGZXRjaCA9XG4gICAgKHNob3cgYXMgdW5rbm93biBhcyB7IHRtZGJfZmV0Y2hlZD86IGJvb2xlYW4gfSkudG1kYl9mZXRjaGVkID09PSBmYWxzZSB8fFxuICAgIChzaG93LnRtZGJfaWQgIT09IG51bGwgJiYgc2hvdy50bWRiX2lkIDwgMCkgfHxcbiAgICBzaG93LnRtZGJfaWQgPT09IG51bGw7XG5cbiAgaWYgKCFuZWVkc0ZldGNoKSByZXR1cm4gc2hvdztcblxuICB0eXBlIFRtZGJSZXN1bHQgPSB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZztcbiAgICBvdmVydmlldzogc3RyaW5nO1xuICAgIHZvdGVfYXZlcmFnZTogbnVtYmVyO1xuICB9O1xuXG4gIGxldCBmb3VuZDogVG1kYlJlc3VsdCB8IG51bGwgPSBudWxsO1xuXG4gIC8vIFN0cmF0ZWd5IDE6IGxvb2t1cCBieSBleGlzdGluZyBwb3NpdGl2ZSB0bWRiX2lkXG4gIGlmIChzaG93LnRtZGJfaWQgIT09IG51bGwgJiYgc2hvdy50bWRiX2lkID4gMCkge1xuICAgIHRyeSB7XG4gICAgICBmb3VuZCA9IGF3YWl0IGdldFNob3dEZXRhaWxzKHNob3cudG1kYl9pZCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBmYWxsIHRocm91Z2ggKi9cbiAgICB9XG4gIH1cblxuICAvLyBTdHJhdGVneSAyOiBsb29rdXAgYnkgSU1EYiBJRFxuICBpZiAoIWZvdW5kICYmIHNob3cuaW1kYl9pZCkge1xuICAgIHRyeSB7XG4gICAgICBmb3VuZCA9IGF3YWl0IGZpbmRCeUltZGJJZChzaG93LmltZGJfaWQpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLyogZmFsbCB0aHJvdWdoICovXG4gICAgfVxuICB9XG5cbiAgLy8gU3RyYXRlZ3kgMzogc2VhcmNoIGJ5IHRpdGxlXG4gIGlmICghZm91bmQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHNlYXJjaFNob3dzKHNob3cudGl0bGUpO1xuICAgICAgZm91bmQgPSBkYXRhLnJlc3VsdHM/LlswXSA/PyBudWxsO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaWdub3JlICovXG4gICAgfVxuICB9XG5cbiAgaWYgKCFmb3VuZCkge1xuICAgIC8vIE1hcmsgYXMgZmV0Y2hlZCBldmVuIGlmIFRNREIgaGFzIG5vIG1hdGNoLCB0byBhdm9pZCByZXBlYXRlZCBsb29rdXBzLlxuICAgIC8vIHRtZGJfZmV0Y2hlZCBjb2x1bW4gaXMgb25seSBwcmVzZW50IGFmdGVyIG1pZ3JhdGlvbiDigJQgaWdub3JlIGVycm9ycyBpZiBtaXNzaW5nLlxuICAgIGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbShcInNob3dzXCIpXG4gICAgICAudXBkYXRlKHsgdG1kYl9mZXRjaGVkOiB0cnVlIH0gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXG4gICAgICAuZXEoXCJpZFwiLCBzaG93SWQpXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4gbnVsbCxcbiAgICAgICAgKCkgPT4gbnVsbCxcbiAgICAgICk7IC8vIGlnbm9yZSBlcnJvcnNcbiAgICByZXR1cm4gc2hvdztcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFub3RoZXIgc2hvdyByb3cgYWxyZWFkeSBob2xkcyB0aGlzIHJlYWwgdG1kYl9pZFxuICBjb25zdCB7IGRhdGE6IGNvbmZsaWN0IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJ0bWRiX2lkXCIsIGZvdW5kLmlkKVxuICAgIC5uZXEoXCJpZFwiLCBzaG93SWQpXG4gICAgLmxpbWl0KDEpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChjb25mbGljdCkge1xuICAgIC8vIE1lcmdlOiBwb2ludCBhbGwgbGlzdF9pdGVtcyBmcm9tIHRoaXMgcGxhY2Vob2xkZXIgdG8gdGhlIGV4aXN0aW5nIGNhbm9uaWNhbCBzaG93XG4gICAgYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLnVwZGF0ZSh7IHNob3dfaWQ6IGNvbmZsaWN0LmlkIH0gYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcbiAgICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKTtcbiAgICAvLyBEZWxldGUgdGhlIHBsYWNlaG9sZGVyIHNob3dcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwic2hvd3NcIikuZGVsZXRlKCkuZXEoXCJpZFwiLCBzaG93SWQpO1xuICAgIC8vIFJldHVybiB0aGUgY2Fub25pY2FsIHNob3dcbiAgICBjb25zdCB7IGRhdGE6IGNhbm9uaWNhbCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgICAuZXEoXCJpZFwiLCBjb25mbGljdC5pZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICByZXR1cm4gY2Fub25pY2FsO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSBzaG93IHdpdGggcmVhbCBUTURCIGRhdGEuXG4gIC8vIHRtZGJfZmV0Y2hlZCBpcyBvbmx5IGluIHVwZGF0ZXMgYWZ0ZXIgbWlncmF0aW9uIOKAlCBQb3N0Z1JFU1QgaWdub3JlcyB1bmtub3duIGNvbHVtbnMgZ3JhY2VmdWxseS5cbiAgY29uc3QgdXBkYXRlczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7XG4gICAgdG1kYl9pZDogZm91bmQuaWQsXG4gICAgdGl0bGU6IGZvdW5kLm5hbWUsXG4gICAgcG9zdGVyX3BhdGg6IGZvdW5kLnBvc3Rlcl9wYXRoLFxuICAgIGZpcnN0X2Fpcl9kYXRlOiBmb3VuZC5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgIG92ZXJ2aWV3OiBmb3VuZC5vdmVydmlldyB8fCBudWxsLFxuICAgIHRtZGJfZmV0Y2hlZDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdCB7IGRhdGE6IHVwZGF0ZWQsIGVycm9yOiB1cGRhdGVFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnVwZGF0ZSh1cGRhdGVzKVxuICAgIC5lcShcImlkXCIsIHNob3dJZClcbiAgICAuc2VsZWN0KFwiKlwiKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAodXBkYXRlRXJyb3IpIHtcbiAgICAvLyBSZXRyeSB3aXRob3V0IHRtZGJfZmV0Y2hlZCBpZiBjb2x1bW4gZG9lc24ndCBleGlzdCB5ZXQgKHByZS1taWdyYXRpb24pXG4gICAgY29uc3QgeyBkYXRhOiB1cGRhdGVkMiB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC51cGRhdGUoe1xuICAgICAgICB0bWRiX2lkOiBmb3VuZC5pZCxcbiAgICAgICAgdGl0bGU6IGZvdW5kLm5hbWUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBmb3VuZC5wb3N0ZXJfcGF0aCxcbiAgICAgICAgZmlyc3RfYWlyX2RhdGU6IGZvdW5kLmZpcnN0X2Fpcl9kYXRlIHx8IG51bGwsXG4gICAgICAgIG92ZXJ2aWV3OiBmb3VuZC5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5lcShcImlkXCIsIHNob3dJZClcbiAgICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgcmV0dXJuIHVwZGF0ZWQyO1xuICB9XG5cbiAgcmV0dXJuIHVwZGF0ZWQ7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlTQWFzQiwwTEFBQSJ9
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tag-colors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ListHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ListHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ShowRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ShowRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddShowDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AddShowDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/EmptyState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ImportDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ImportDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rating-labels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$240ec5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:240ec5 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$f6469a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:f6469a [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$cff8c3__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:cff8c3 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$7eee2f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:7eee2f [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$7d850f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:7d850f [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$46c341__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:46c341 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$8e01c5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/data:8e01c5 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/lists/actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$bc3a77__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/tags/data:bc3a77 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$323def__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/tags/data:323def [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$tags$2f$data$3a$d158f5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/tags/data:d158f5 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$data$3a$ecebbd__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/[locale]/(app)/shows/data:ecebbd [app-client] (ecmascript) <text/javascript>");
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
        lineNumber: 122,
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
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(list.list_items);
    // Local state for debounced name/description edits
    const [listName, setListName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(list.name);
    const [listDescription, setListDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(list.description ?? "");
    const [saveStatus, setSaveStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const nameDebounceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const descDebounceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const savedTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showTagsMap, setShowTagsMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialShowTagsMap);
    const [filterTagIds, setFilterTagIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filterRatings, setFilterRatings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [showFilters, setShowFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
    // Items filtered by selected tag + rating filters
    const filteredItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ListDetailClient.useMemo[filteredItems]": ()=>{
            return items.filter({
                "ListDetailClient.useMemo[filteredItems]": (item)=>{
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
        filterRatings
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
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$46c341__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getListItemsPage"])(listId, nextPageRef.current);
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
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$shows$2f$data$3a$ecebbd__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["fetchTmdbData"])(showId);
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$7d850f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["reorderListItems"])(list.id, newSorted);
                }
            }["ListDetailClient.useCallback[handleDragEnd]"]);
        }
    }["ListDetailClient.useCallback[handleDragEnd]"], [
        sortedIds,
        list.id,
        startTransition
    ]);
    const handleNameChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleNameChange]": (name)=>{
            setListName(name);
            if (nameDebounceRef.current) clearTimeout(nameDebounceRef.current);
            if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
            setSaveStatus("saving");
            nameDebounceRef.current = setTimeout({
                "ListDetailClient.useCallback[handleNameChange]": ()=>{
                    startTransition({
                        "ListDetailClient.useCallback[handleNameChange]": async ()=>{
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$240ec5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateList"])(list.id, {
                                name
                            });
                            setSaveStatus("saved");
                            savedTimerRef.current = setTimeout({
                                "ListDetailClient.useCallback[handleNameChange]": ()=>setSaveStatus("idle")
                            }["ListDetailClient.useCallback[handleNameChange]"], 2000);
                        }
                    }["ListDetailClient.useCallback[handleNameChange]"]);
                }
            }["ListDetailClient.useCallback[handleNameChange]"], 800);
        }
    }["ListDetailClient.useCallback[handleNameChange]"], [
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
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$240ec5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateList"])(list.id, {
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$240ec5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateList"])(list.id, {
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$f6469a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addShowToList"])(list.id, show);
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$cff8c3__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["removeShowFromList"])(list.id, itemId);
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
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$7eee2f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateShowRating"])(list.id, itemId, rating);
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
    // Quick-add a show to the viewer's own list
    const handleQuickAdd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ListDetailClient.useCallback[handleQuickAdd]": async (show)=>{
            const showKey = show.id;
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$8e01c5__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addShowToMyList"])({
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
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["copyListToMine"])(list.id);
                i18nRouter.push('/lists');
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
                        lineNumber: 493,
                        columnNumber: 11
                    }, this),
                    tCommon("back")
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 489,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ListHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListHeader"], {
                    name: listName,
                    description: listDescription,
                    isPublic: list.is_public,
                    onNameChange: isOwner ? handleNameChange : undefined,
                    onDescriptionChange: isOwner ? handleDescriptionChange : undefined,
                    onTogglePublic: isOwner ? handleTogglePublic : undefined,
                    readOnly: !isOwner,
                    saveStatus: isOwner ? saveStatus : undefined
                }, void 0, false, {
                    fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                    lineNumber: 500,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 499,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex items-center gap-2",
                children: [
                    isOwner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAddDialog(true),
                        className: "flex items-center gap-1.5 rounded-[var(--radius-md)] border border-dashed border-border px-3 py-2 text-xs text-text-muted transition-colors hover:border-border-hover hover:text-text-secondary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plus"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 519,
                                columnNumber: 13
                            }, this),
                            "Add show"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 515,
                        columnNumber: 11
                    }, this),
                    isOwner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowImport(true),
                        className: "flex items-center gap-1.5 rounded-[var(--radius-md)] border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FileArrowUp$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileArrowUp"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 528,
                                columnNumber: 13
                            }, this),
                            t("importJson")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 524,
                        columnNumber: 11
                    }, this),
                    !isOwner && isLoggedIn && viewerListEmpty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCopyList,
                        disabled: isCopying,
                        className: "flex items-center gap-1.5 rounded-[var(--radius-md)] border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary disabled:opacity-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$CopySimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopySimple"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 538,
                                columnNumber: 13
                            }, this),
                            isCopying ? t("copying") : t("copyList")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 533,
                        columnNumber: 11
                    }, this),
                    (allTags.length > 0 || items.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowFilters((v)=>!v),
                        className: `flex items-center gap-1.5 rounded-[var(--radius-md)] border px-3 py-2 text-xs transition-colors ${showFilters || activeFilterCount > 0 ? "border-border-hover text-text-primary" : "border-border text-text-muted hover:border-border-hover hover:text-text-secondary"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$FunnelSimple$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelSimple"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 551,
                                columnNumber: 13
                            }, this),
                            "Filters",
                            activeFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-4 w-4 items-center justify-center rounded-full bg-surface-hover font-mono text-[10px] font-semibold text-text-primary",
                                children: activeFilterCount
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 554,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 543,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 513,
                columnNumber: 7
            }, this),
            showFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 rounded-[var(--radius-md)] border border-border bg-surface-subtle p-3 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint",
                                children: "Rating"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 567,
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
                                                    lineNumber: 595,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, rating ?? "unrated", true, {
                                            fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                            lineNumber: 578,
                                            columnNumber: 19
                                        }, this);
                                    }),
                                    filterRatings.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilterRatings(new Set()),
                                        className: "text-xs text-text-muted transition-colors hover:text-text-secondary",
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 600,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 570,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 566,
                        columnNumber: 11
                    }, this),
                    allTags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint",
                                children: "Tags"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 613,
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
                                                    lineNumber: 633,
                                                    columnNumber: 34
                                                }, this)
                                            ]
                                        }, tag.id, true, {
                                            fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                            lineNumber: 620,
                                            columnNumber: 21
                                        }, this);
                                    }),
                                    filterTagIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilterTagIds([]),
                                        className: "text-xs text-text-muted transition-colors hover:text-text-secondary",
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 638,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 616,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 612,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 564,
                columnNumber: 9
            }, this),
            items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                title: "No shows in this list yet",
                description: isOwner ? "Add a show to get started" : undefined
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 653,
                columnNumber: 9
            }, this) : filteredItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                title: "No shows match the selected filters",
                description: "Try removing some filters"
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 658,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
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
                                                lineNumber: 682,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-px flex-1 bg-border"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 685,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 681,
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
                                                        quickAddLabel: t("addToMyList")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                        lineNumber: 697,
                                                        columnNumber: 29
                                                    }, this),
                                                    quickAddFeedback[item.shows.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 text-xs text-accent animate-in fade-in",
                                                        children: quickAddFeedback[item.shows.id]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                        lineNumber: 743,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                                lineNumber: 692,
                                                columnNumber: 27
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                        lineNumber: 688,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, group.rating ?? "unrated", true, {
                                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                                lineNumber: 679,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                        lineNumber: 672,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                    lineNumber: 668,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 663,
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
                    lineNumber: 763,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 761,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddShowDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddShowDialog"], {
                open: showAddDialog,
                onClose: ()=>setShowAddDialog(false),
                onAdd: handleAddShow,
                existingTmdbIds: existingTmdbIds
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
                lineNumber: 769,
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
                lineNumber: 777,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[locale]/(app)/lists/[id]/page-client.tsx",
        lineNumber: 486,
        columnNumber: 5
    }, this);
}
_s1(ListDetailClient, "uL6Q3WK4FpF0QrAFTlpi3aq2Re8=", false, function() {
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

//# sourceMappingURL=src_bda8ca90._.js.map