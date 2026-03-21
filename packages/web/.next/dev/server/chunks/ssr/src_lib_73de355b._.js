module.exports = [
"[project]/src/lib/import/trakt-parser.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_zod_v4_e95b415a._.js",
  "server/chunks/ssr/src_lib_import_trakt-parser_ts_1eaad38e._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/import/trakt-parser.ts [app-rsc] (ecmascript)");
    });
});
}),
"[project]/src/lib/similarity.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/src/lib/similarity.ts [app-rsc] (ecmascript)");
    });
});
}),
];