module.exports = [
"[project]/packages/web/src/components/SearchInput.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchInput",
    ()=>SearchInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$MagnifyingGlass$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/MagnifyingGlass.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function SearchInput({ placeholder, onSearch, debounceMs = 300, className = "" }) {
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(()=>{
            onSearch(value);
        }, debounceMs);
        return ()=>{
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [
        value,
        debounceMs,
        onSearch
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$MagnifyingGlass$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MagnifyingGlass"], {
                size: 16,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/SearchInput.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
}),
"[project]/packages/web/src/components/EmptyState.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyState",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$ssr$2f$Television$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/ssr/Television.es.js [app-ssr] (ecmascript)");
;
;
function EmptyState({ title, description, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center py-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-bg-surface",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$ssr$2f$Television$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Television"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-medium text-text-secondary",
                children: title
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/EmptyState.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-xs text-text-muted",
                children: description
            }, void 0, false, {
                fileName: "[project]/packages/web/src/components/EmptyState.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/packages/web/src/app/[locale]/(app)/follows/data:5c5b4a [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "followUser",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40ed3c806216f68c6815da405ef9973cbb9d521785":"followUser"},"packages/web/src/app/[locale]/(app)/follows/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40ed3c806216f68c6815da405ef9973cbb9d521785", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "followUser");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZm9sbG93VXNlcihmb2xsb3dpbmdJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIk5vdCBhdXRoZW50aWNhdGVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJmb2xsb3dzXCIpLmluc2VydCh7XG4gICAgZm9sbG93ZXJfaWQ6IHVzZXIuaWQsXG4gICAgZm9sbG93aW5nX2lkOiBmb2xsb3dpbmdJZCxcbiAgfSk7XG4gIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgLy8gTm90aWZ5IHRoZSBmb2xsb3dlZCB1c2VyIChiZXN0LWVmZm9ydCwgZG9uJ3QgYmxvY2sgb24gZmFpbHVyZSlcbiAgYXdhaXQgc3VwYWJhc2UuZnJvbShcIm5vdGlmaWNhdGlvbnNcIikuaW5zZXJ0KHtcbiAgICB1c2VyX2lkOiBmb2xsb3dpbmdJZCxcbiAgICBhY3Rvcl9pZDogdXNlci5pZCxcbiAgICB0eXBlOiBcIm5ld19mb2xsb3dlclwiLFxuICB9KTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9zZWd1aXRpXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdW5mb2xsb3dVc2VyKGZvbGxvd2luZ0lkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiTm90IGF1dGhlbnRpY2F0ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuZGVsZXRlKClcbiAgICAuZXEoXCJmb2xsb3dlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5lcShcImZvbGxvd2luZ19pZFwiLCBmb2xsb3dpbmdJZCk7XG4gIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvc2VndWl0aVwiKTtcbn1cblxuZXhwb3J0IHR5cGUgRm9sbG93ZWRVc2VyID0ge1xuICBpZDogc3RyaW5nO1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBhdmF0YXJfdXJsOiBzdHJpbmcgfCBudWxsO1xuICBzaG93X2NvdW50OiBudW1iZXI7XG4gIHNpbWlsYXJpdHk6IG51bWJlciB8IG51bGw7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Rm9sbG93aW5nKCk6IFByb21pc2U8Rm9sbG93ZWRVc2VyW10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YTogZm9sbG93cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuc2VsZWN0KFwiZm9sbG93aW5nX2lkXCIpXG4gICAgLmVxKFwiZm9sbG93ZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFmb2xsb3dzIHx8IGZvbGxvd3MubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG5cbiAgY29uc3QgZm9sbG93aW5nSWRzID0gZm9sbG93cy5tYXAoKGYpID0+IGYuZm9sbG93aW5nX2lkKTtcblxuICBjb25zdCB7IGRhdGE6IHByb2ZpbGVzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAuc2VsZWN0KFwiaWQsIHVzZXJuYW1lLCBhdmF0YXJfdXJsXCIpXG4gICAgLmluKFwiaWRcIiwgZm9sbG93aW5nSWRzKTtcblxuICBpZiAoIXByb2ZpbGVzIHx8IHByb2ZpbGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIC8vIEdldCB2aWV3ZXIncyBsaXN0IGZvciBzaW1pbGFyaXR5IGNvbXB1dGF0aW9uXG4gIGNvbnN0IHsgZGF0YTogdmlld2VyTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBsZXQgdmlld2VySXRlbXM6IHtcbiAgICBzaG93SWQ6IHN0cmluZztcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gICAgcG9zaXRpb246IG51bWJlcjtcbiAgfVtdID0gW107XG4gIGlmICh2aWV3ZXJMaXN0KSB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvblwiKVxuICAgICAgLmVxKFwibGlzdF9pZFwiLCB2aWV3ZXJMaXN0LmlkKVxuICAgICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSk7XG4gICAgdmlld2VySXRlbXMgPSAoZGF0YSA/PyBbXSkubWFwKChpLCBpZHgpID0+ICh7XG4gICAgICBzaG93SWQ6IGkuc2hvd19pZCxcbiAgICAgIHJhdGluZzogaS5yYXRpbmcsXG4gICAgICBwb3NpdGlvbjogaS5wb3NpdGlvbiA/PyBpZHgsXG4gICAgfSkpO1xuICB9XG5cbiAgY29uc3QgeyBjb21wdXRlTGlzdFNpbWlsYXJpdHkgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL3NpbWlsYXJpdHlcIik7XG5cbiAgY29uc3QgcmVzdWx0czogRm9sbG93ZWRVc2VyW10gPSBbXTtcbiAgZm9yIChjb25zdCBwcm9maWxlIG9mIHByb2ZpbGVzKSB7XG4gICAgY29uc3QgeyBkYXRhOiBwTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAgIC5zZWxlY3QoXCJpZCwgaXNfcHVibGljXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHByb2ZpbGUuaWQpXG4gICAgICAuc2luZ2xlKCk7XG5cbiAgICBsZXQgc2hvd19jb3VudCA9IDA7XG4gICAgbGV0IHNpbWlsYXJpdHk6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgaWYgKHBMaXN0Py5pc19wdWJsaWMpIHtcbiAgICAgIGNvbnN0IHsgZGF0YTogbGlzdEl0ZW1zLCBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgIC5zZWxlY3QoXCJzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uXCIsIHsgY291bnQ6IFwiZXhhY3RcIiB9KVxuICAgICAgICAuZXEoXCJsaXN0X2lkXCIsIHBMaXN0LmlkKVxuICAgICAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICAgICAgc2hvd19jb3VudCA9IGNvdW50ID8/IDA7XG5cbiAgICAgIGlmICh2aWV3ZXJJdGVtcy5sZW5ndGggPiAwICYmIGxpc3RJdGVtcyAmJiBsaXN0SXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBvdGhlckl0ZW1zID0gbGlzdEl0ZW1zLm1hcCgoaSwgaWR4KSA9PiAoe1xuICAgICAgICAgIHNob3dJZDogaS5zaG93X2lkLFxuICAgICAgICAgIHJhdGluZzogaS5yYXRpbmcsXG4gICAgICAgICAgcG9zaXRpb246IGkucG9zaXRpb24gPz8gaWR4LFxuICAgICAgICB9KSk7XG4gICAgICAgIHNpbWlsYXJpdHkgPSBjb21wdXRlTGlzdFNpbWlsYXJpdHkodmlld2VySXRlbXMsIG90aGVySXRlbXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VsdHMucHVzaCh7IC4uLnByb2ZpbGUsIHNob3dfY291bnQsIHNpbWlsYXJpdHkgfSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0cztcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoicVRBS3NCLHVMQUFBIn0=
}),
"[project]/packages/web/src/app/[locale]/(app)/follows/data:67d3a4 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "unfollowUser",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"400bd16a58a58e16e8e184740c50ca3cbcc7d9fa04":"unfollowUser"},"packages/web/src/app/[locale]/(app)/follows/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("400bd16a58a58e16e8e184740c50ca3cbcc7d9fa04", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "unfollowUser");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZm9sbG93VXNlcihmb2xsb3dpbmdJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIk5vdCBhdXRoZW50aWNhdGVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJmb2xsb3dzXCIpLmluc2VydCh7XG4gICAgZm9sbG93ZXJfaWQ6IHVzZXIuaWQsXG4gICAgZm9sbG93aW5nX2lkOiBmb2xsb3dpbmdJZCxcbiAgfSk7XG4gIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgLy8gTm90aWZ5IHRoZSBmb2xsb3dlZCB1c2VyIChiZXN0LWVmZm9ydCwgZG9uJ3QgYmxvY2sgb24gZmFpbHVyZSlcbiAgYXdhaXQgc3VwYWJhc2UuZnJvbShcIm5vdGlmaWNhdGlvbnNcIikuaW5zZXJ0KHtcbiAgICB1c2VyX2lkOiBmb2xsb3dpbmdJZCxcbiAgICBhY3Rvcl9pZDogdXNlci5pZCxcbiAgICB0eXBlOiBcIm5ld19mb2xsb3dlclwiLFxuICB9KTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9zZWd1aXRpXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdW5mb2xsb3dVc2VyKGZvbGxvd2luZ0lkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiTm90IGF1dGhlbnRpY2F0ZWRcIik7XG5cbiAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuZGVsZXRlKClcbiAgICAuZXEoXCJmb2xsb3dlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5lcShcImZvbGxvd2luZ19pZFwiLCBmb2xsb3dpbmdJZCk7XG4gIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvc2VndWl0aVwiKTtcbn1cblxuZXhwb3J0IHR5cGUgRm9sbG93ZWRVc2VyID0ge1xuICBpZDogc3RyaW5nO1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBhdmF0YXJfdXJsOiBzdHJpbmcgfCBudWxsO1xuICBzaG93X2NvdW50OiBudW1iZXI7XG4gIHNpbWlsYXJpdHk6IG51bWJlciB8IG51bGw7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Rm9sbG93aW5nKCk6IFByb21pc2U8Rm9sbG93ZWRVc2VyW10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YTogZm9sbG93cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuc2VsZWN0KFwiZm9sbG93aW5nX2lkXCIpXG4gICAgLmVxKFwiZm9sbG93ZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFmb2xsb3dzIHx8IGZvbGxvd3MubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG5cbiAgY29uc3QgZm9sbG93aW5nSWRzID0gZm9sbG93cy5tYXAoKGYpID0+IGYuZm9sbG93aW5nX2lkKTtcblxuICBjb25zdCB7IGRhdGE6IHByb2ZpbGVzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAuc2VsZWN0KFwiaWQsIHVzZXJuYW1lLCBhdmF0YXJfdXJsXCIpXG4gICAgLmluKFwiaWRcIiwgZm9sbG93aW5nSWRzKTtcblxuICBpZiAoIXByb2ZpbGVzIHx8IHByb2ZpbGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIC8vIEdldCB2aWV3ZXIncyBsaXN0IGZvciBzaW1pbGFyaXR5IGNvbXB1dGF0aW9uXG4gIGNvbnN0IHsgZGF0YTogdmlld2VyTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBsZXQgdmlld2VySXRlbXM6IHtcbiAgICBzaG93SWQ6IHN0cmluZztcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gICAgcG9zaXRpb246IG51bWJlcjtcbiAgfVtdID0gW107XG4gIGlmICh2aWV3ZXJMaXN0KSB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvblwiKVxuICAgICAgLmVxKFwibGlzdF9pZFwiLCB2aWV3ZXJMaXN0LmlkKVxuICAgICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSk7XG4gICAgdmlld2VySXRlbXMgPSAoZGF0YSA/PyBbXSkubWFwKChpLCBpZHgpID0+ICh7XG4gICAgICBzaG93SWQ6IGkuc2hvd19pZCxcbiAgICAgIHJhdGluZzogaS5yYXRpbmcsXG4gICAgICBwb3NpdGlvbjogaS5wb3NpdGlvbiA/PyBpZHgsXG4gICAgfSkpO1xuICB9XG5cbiAgY29uc3QgeyBjb21wdXRlTGlzdFNpbWlsYXJpdHkgfSA9IGF3YWl0IGltcG9ydChcIkAvbGliL3NpbWlsYXJpdHlcIik7XG5cbiAgY29uc3QgcmVzdWx0czogRm9sbG93ZWRVc2VyW10gPSBbXTtcbiAgZm9yIChjb25zdCBwcm9maWxlIG9mIHByb2ZpbGVzKSB7XG4gICAgY29uc3QgeyBkYXRhOiBwTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAgIC5zZWxlY3QoXCJpZCwgaXNfcHVibGljXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHByb2ZpbGUuaWQpXG4gICAgICAuc2luZ2xlKCk7XG5cbiAgICBsZXQgc2hvd19jb3VudCA9IDA7XG4gICAgbGV0IHNpbWlsYXJpdHk6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgaWYgKHBMaXN0Py5pc19wdWJsaWMpIHtcbiAgICAgIGNvbnN0IHsgZGF0YTogbGlzdEl0ZW1zLCBjb3VudCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgICAgIC5zZWxlY3QoXCJzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uXCIsIHsgY291bnQ6IFwiZXhhY3RcIiB9KVxuICAgICAgICAuZXEoXCJsaXN0X2lkXCIsIHBMaXN0LmlkKVxuICAgICAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICAgICAgc2hvd19jb3VudCA9IGNvdW50ID8/IDA7XG5cbiAgICAgIGlmICh2aWV3ZXJJdGVtcy5sZW5ndGggPiAwICYmIGxpc3RJdGVtcyAmJiBsaXN0SXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBvdGhlckl0ZW1zID0gbGlzdEl0ZW1zLm1hcCgoaSwgaWR4KSA9PiAoe1xuICAgICAgICAgIHNob3dJZDogaS5zaG93X2lkLFxuICAgICAgICAgIHJhdGluZzogaS5yYXRpbmcsXG4gICAgICAgICAgcG9zaXRpb246IGkucG9zaXRpb24gPz8gaWR4LFxuICAgICAgICB9KSk7XG4gICAgICAgIHNpbWlsYXJpdHkgPSBjb21wdXRlTGlzdFNpbWlsYXJpdHkodmlld2VySXRlbXMsIG90aGVySXRlbXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VsdHMucHVzaCh7IC4uLnByb2ZpbGUsIHNob3dfY291bnQsIHNpbWlsYXJpdHkgfSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0cztcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoidVRBNEJzQix5TEFBQSJ9
}),
"[project]/packages/web/src/components/FollowButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FollowButton",
    ()=>FollowButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$UserPlus$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/UserPlus.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$UserMinus$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/UserMinus.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$data$3a$5c5b4a__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/follows/data:5c5b4a [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$data$3a$67d3a4__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/follows/data:67d3a4 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function FollowButton({ profileId, initialFollowing }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])("follows");
    const [following, setFollowing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialFollowing);
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    function handleToggle() {
        startTransition(async ()=>{
            try {
                if (following) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$data$3a$67d3a4__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["unfollowUser"])(profileId);
                    setFollowing(false);
                } else {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$follows$2f$data$3a$5c5b4a__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["followUser"])(profileId);
                    setFollowing(true);
                }
            } catch  {
            // silently fail
            }
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleToggle,
        disabled: isPending,
        className: `flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${following ? "border-border bg-bg-surface text-text-secondary hover:border-error/40 hover:text-error" : "border-accent/30 bg-accent-muted text-accent hover:bg-accent/20"}`,
        children: following ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$UserMinus$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserMinus"], {
                    size: 14,
                    weight: "bold"
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/FollowButton.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, this),
                t("unfollow")
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$UserPlus$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserPlus"], {
                    size: 14,
                    weight: "bold"
                }, void 0, false, {
                    fileName: "[project]/packages/web/src/components/FollowButton.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this),
                t("follow")
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/packages/web/src/components/FollowButton.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/shared/src/lib/similarity.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/packages/shared/src/lib/recommendations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scoreRecommendations",
    ()=>scoreRecommendations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/similarity.ts [app-ssr] (ecmascript)");
;
function scoreRecommendations(viewerList, otherLists, topK = 20, limit = 10) {
    if (viewerList.length === 0 || otherLists.length === 0) return [];
    const similarities = [];
    for (const other of otherLists){
        if (other.items.length === 0) continue;
        const sim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeListSimilarity"])(viewerList, other.items);
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
"[project]/packages/shared/src/lib/rating-labels.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/packages/shared/src/lib/tag-colors.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/packages/shared/src/lib/tmdb/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/packages/shared/src/lib/import/trakt-parser.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseTraktJson",
    ()=>parseTraktJson,
    "validateTraktJson",
    ()=>validateTraktJson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/index.js [app-ssr] (ecmascript)");
;
// Format A: Trakt.tv list export { name, shows: [...] }
const TraktShowSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].object({
        imdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].string().optional(),
        tvdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].number().optional()
    }).optional(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].string(),
    uuid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].string().optional(),
    added_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].string().optional(),
    score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].number().optional()
});
const TraktListSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].string(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].string().optional().default(""),
    is_public: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].boolean().optional().default(false),
    movies: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].unknown()).optional().default([]),
    shows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].array(TraktShowSchema)
});
// Format B: raw array of show objects (e.g. Serializd export)
// [ { uuid, id: { tvdb, imdb }, title, seasons, created_at, status } ]
const SerializdShowSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].object({
    uuid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].string().optional(),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].object({
        tvdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].number().optional(),
        imdb: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].string().optional()
    }).optional(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].string(),
    seasons: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].unknown()).optional(),
    created_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].string().optional(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].string().optional(),
    score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].number().optional()
});
const SerializdArraySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].array(SerializdShowSchema);
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
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].prettifyError(result.error)
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
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["z"].prettifyError(result.error)
    };
}
}),
"[project]/packages/shared/src/lib/import/mal-parser.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/packages/shared/src/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Similarity & recommendations
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/similarity.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$recommendations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/recommendations.ts [app-ssr] (ecmascript)");
// Rating labels
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$rating$2d$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/rating-labels.ts [app-ssr] (ecmascript)");
// Tag colors
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tag$2d$colors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tag-colors.ts [app-ssr] (ecmascript)");
// TMDB types & utilities
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tmdb/types.ts [app-ssr] (ecmascript)");
// Import parsers
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$import$2f$trakt$2d$parser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/import/trakt-parser.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$import$2f$mal$2d$parser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/import/mal-parser.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/packages/web/src/lib/similarity.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Re-export from shared package
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-ssr] (ecmascript) <locals>");
;
}),
"[project]/packages/web/src/lib/tmdb/client.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-ssr] (ecmascript) <locals>");
;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
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
}),
"[project]/packages/web/src/app/[locale]/(app)/explore/data:e62915 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRecommendations",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"00ee312aa591ad510b9799fe4b8dccd9043bbef937":"getRecommendations"},"packages/web/src/app/[locale]/(app)/explore/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("00ee312aa591ad510b9799fe4b8dccd9043bbef937", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getRecommendations");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgc2NvcmVSZWNvbW1lbmRhdGlvbnMsIHR5cGUgVXNlckxpc3QgfSBmcm9tIFwiQC9saWIvcmVjb21tZW5kYXRpb25zXCI7XG5pbXBvcnQgeyBjb21wdXRlTGlzdFNpbWlsYXJpdHksIHR5cGUgTGlzdEVudHJ5IH0gZnJvbSBcIkAvbGliL3NpbWlsYXJpdHlcIjtcblxuZXhwb3J0IHR5cGUgU2ltaWxhclVzZXIgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGF2YXRhcl91cmw6IHN0cmluZyB8IG51bGw7XG4gIHNob3dfY291bnQ6IG51bWJlcjtcbiAgc2ltaWxhcml0eTogbnVtYmVyO1xuICBpc19mb2xsb3dpbmc6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2ltaWxhclVzZXJzKCk6IFByb21pc2U8U2ltaWxhclVzZXJbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgaXRlbXNcbiAgY29uc3QgeyBkYXRhOiBteUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFteUxpc3QpIHJldHVybiBbXTtcblxuICBjb25zdCB7IGRhdGE6IG15SXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoIW15SXRlbXMgfHwgbXlJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCB2aWV3ZXJMaXN0OiBMaXN0RW50cnlbXSA9IG15SXRlbXMubWFwKChpLCBpZHgpID0+ICh7XG4gICAgc2hvd0lkOiBpLnNob3dfaWQsXG4gICAgcmF0aW5nOiBpLnJhdGluZyxcbiAgICBwb3NpdGlvbjogaS5wb3NpdGlvbiA/PyBpZHgsXG4gIH0pKTtcblxuICAvLyBGZXRjaCBhbGwgcHVibGljIGxpc3RzIChleGNsdWRpbmcgc2VsZikgd2l0aCBwcm9maWxlIGluZm9cbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBwcm9maWxlcyhpZCwgdXNlcm5hbWUsIGF2YXRhcl91cmwpXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZm9yIHRob3NlIGxpc3RzIGluIG9uZSBiYXRjaFxuICBjb25zdCB7IGRhdGE6IGFsbEl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJsaXN0X2lkLCBzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uXCIpXG4gICAgLmluKFwibGlzdF9pZFwiLCBsaXN0SWRzKTtcblxuICBpZiAoIWFsbEl0ZW1zKSByZXR1cm4gW107XG5cbiAgLy8gR3JvdXAgaXRlbXMgYnkgbGlzdF9pZFxuICBjb25zdCBpdGVtc0J5TGlzdCA9IG5ldyBNYXA8c3RyaW5nLCBMaXN0RW50cnlbXT4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGFsbEl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtc0J5TGlzdC5oYXMoaXRlbS5saXN0X2lkKSkgaXRlbXNCeUxpc3Quc2V0KGl0ZW0ubGlzdF9pZCwgW10pO1xuICAgIGl0ZW1zQnlMaXN0LmdldChpdGVtLmxpc3RfaWQpIS5wdXNoKHtcbiAgICAgIHNob3dJZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ2hlY2sgd2hvIHRoZSBjdXJyZW50IHVzZXIgaXMgYWxyZWFkeSBmb2xsb3dpbmdcbiAgY29uc3QgeyBkYXRhOiBmb2xsb3dzRGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuc2VsZWN0KFwiZm9sbG93aW5nX2lkXCIpXG4gICAgLmVxKFwiZm9sbG93ZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgY29uc3QgZm9sbG93aW5nSWRzID0gbmV3IFNldCgoZm9sbG93c0RhdGEgPz8gW10pLm1hcCgoZikgPT4gZi5mb2xsb3dpbmdfaWQpKTtcblxuICAvLyBDb21wdXRlIHNpbWlsYXJpdHkgZm9yIGVhY2ggdXNlclxuICBjb25zdCByZXN1bHRzOiBTaW1pbGFyVXNlcltdID0gW107XG5cbiAgZm9yIChjb25zdCBsaXN0IG9mIHB1YmxpY0xpc3RzKSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IEFycmF5LmlzQXJyYXkobGlzdC5wcm9maWxlcylcbiAgICAgID8gbGlzdC5wcm9maWxlc1swXVxuICAgICAgOiBsaXN0LnByb2ZpbGVzO1xuICAgIGlmICghcHJvZmlsZSkgY29udGludWU7XG5cbiAgICBjb25zdCBvdGhlckl0ZW1zID0gaXRlbXNCeUxpc3QuZ2V0KGxpc3QuaWQpID8/IFtdO1xuICAgIGlmIChvdGhlckl0ZW1zLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG5cbiAgICBjb25zdCBzaW1pbGFyaXR5ID0gY29tcHV0ZUxpc3RTaW1pbGFyaXR5KHZpZXdlckxpc3QsIG90aGVySXRlbXMpO1xuICAgIGlmIChzaW1pbGFyaXR5ID09PSAwKSBjb250aW51ZTtcblxuICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICBpZDogcHJvZmlsZS5pZCxcbiAgICAgIHVzZXJuYW1lOiBwcm9maWxlLnVzZXJuYW1lLFxuICAgICAgYXZhdGFyX3VybDogcHJvZmlsZS5hdmF0YXJfdXJsLFxuICAgICAgc2hvd19jb3VudDogb3RoZXJJdGVtcy5sZW5ndGgsXG4gICAgICBzaW1pbGFyaXR5LFxuICAgICAgaXNfZm9sbG93aW5nOiBmb2xsb3dpbmdJZHMuaGFzKHByb2ZpbGUuaWQpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU29ydCBieSBzaW1pbGFyaXR5IGRlc2NlbmRpbmcsIHJldHVybiB0b3AgM1xuICByZXR1cm4gcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBiLnNpbWlsYXJpdHkgLSBhLnNpbWlsYXJpdHkpLnNsaWNlKDAsIDMpO1xufVxuXG5leHBvcnQgdHlwZSBSZWNvbW1lbmRlZFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIHNjb3JlOiBudW1iZXI7XG4gIHJlY29tbWVuZGVkQnk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWNvbW1lbmRhdGlvbnMoKTogUHJvbWlzZTxSZWNvbW1lbmRlZFNob3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gMS4gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgKyBpdGVtc1xuICBjb25zdCB7IGRhdGE6IG15TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIW15TGlzdCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YTogbXlJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmICghbXlJdGVtcyB8fCBteUl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHZpZXdlckxpc3Q6IExpc3RFbnRyeVtdID0gbXlJdGVtcy5tYXAoKGksIGlkeCkgPT4gKHtcbiAgICBzaG93SWQ6IGkuc2hvd19pZCxcbiAgICByYXRpbmc6IGkucmF0aW5nLFxuICAgIHBvc2l0aW9uOiBpLnBvc2l0aW9uID8/IGlkeCxcbiAgfSkpO1xuXG4gIC8vIDIuIEZldGNoIGFsbCBvdGhlciBwdWJsaWMgbGlzdHMgd2l0aCB0aGVpciBpdGVtcyBpbiBvbmUgcXVlcnlcbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgbGlzdCBpdGVtcyBmb3IgdGhvc2UgbGlzdHMgaW4gb25lIGJhdGNoXG4gIGNvbnN0IHsgZGF0YTogYWxsSXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImxpc3RfaWQsIHNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIGxpc3RJZHMpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSk7XG5cbiAgaWYgKCFhbGxJdGVtcyB8fCBhbGxJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyAzLiBHcm91cCBpdGVtcyBieSB1c2VyXG4gIGNvbnN0IGxpc3RUb1VzZXIgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGwgb2YgcHVibGljTGlzdHMpIHtcbiAgICBsaXN0VG9Vc2VyLnNldChsLmlkLCBsLnVzZXJfaWQpO1xuICB9XG5cbiAgY29uc3QgdXNlckl0ZW1zTWFwID0gbmV3IE1hcDxzdHJpbmcsIExpc3RFbnRyeVtdPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgYWxsSXRlbXMpIHtcbiAgICBjb25zdCB1c2VySWQgPSBsaXN0VG9Vc2VyLmdldChpdGVtLmxpc3RfaWQpO1xuICAgIGlmICghdXNlcklkKSBjb250aW51ZTtcbiAgICBpZiAoIXVzZXJJdGVtc01hcC5oYXModXNlcklkKSkgdXNlckl0ZW1zTWFwLnNldCh1c2VySWQsIFtdKTtcbiAgICB1c2VySXRlbXNNYXAuZ2V0KHVzZXJJZCkhLnB1c2goe1xuICAgICAgc2hvd0lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBvdGhlckxpc3RzOiBVc2VyTGlzdFtdID0gW107XG4gIGZvciAoY29uc3QgW3VzZXJJZCwgaXRlbXNdIG9mIHVzZXJJdGVtc01hcCkge1xuICAgIG90aGVyTGlzdHMucHVzaCh7IHVzZXJJZCwgaXRlbXMgfSk7XG4gIH1cblxuICAvLyA0LiBSdW4gc2NvcmluZyBhbGdvcml0aG1cbiAgY29uc3Qgc2NvcmVkID0gc2NvcmVSZWNvbW1lbmRhdGlvbnModmlld2VyTGlzdCwgb3RoZXJMaXN0cyk7XG5cbiAgaWYgKHNjb3JlZC5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyA1LiBGZXRjaCBzaG93IG1ldGFkYXRhIGZvciByZWNvbW1lbmRlZCBzaG93c1xuICBjb25zdCBzaG93SWRzID0gc2NvcmVkLm1hcCgocykgPT4gcy5zaG93SWQpO1xuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHNjb3JlZFxuICAgIC5tYXAoKHMpID0+IHtcbiAgICAgIGNvbnN0IHNob3cgPSBzaG93TWFwLmdldChzLnNob3dJZCk7XG4gICAgICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHNob3cuaWQsXG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICAgIHNjb3JlOiBNYXRoLnJvdW5kKHMuc2NvcmUgKiAxMDApIC8gMTAwLFxuICAgICAgICByZWNvbW1lbmRlZEJ5OiBzLnJlY29tbWVuZGVkQnksXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUmVjb21tZW5kZWRTaG93ID0+IHIgIT09IG51bGwpO1xufVxuXG5leHBvcnQgdHlwZSBQb3B1bGFyU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgYWRkZWRDb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBvcHVsYXJTaG93cygpOiBQcm9taXNlPFBvcHVsYXJTaG93W10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICAvLyBHZXQgYWxsIHB1YmxpYyBsaXN0IElEc1xuICBjb25zdCB7IGRhdGE6IHB1YmxpY0xpc3RzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpc19wdWJsaWNcIiwgdHJ1ZSk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBwdWJsaWNMaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBHZXQgYWxsIGl0ZW1zIGZyb20gcHVibGljIGxpc3RzXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWRcIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIHB1YmxpY0xpc3RJZHMpO1xuXG4gIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG5cbiAgLy8gQ291bnQgb2NjdXJyZW5jZXMgcGVyIHNob3dcbiAgY29uc3QgY291bnRNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb3VudE1hcC5zZXQoaXRlbS5zaG93X2lkLCAoY291bnRNYXAuZ2V0KGl0ZW0uc2hvd19pZCkgPz8gMCkgKyAxKTtcbiAgfVxuXG4gIC8vIFNvcnQgYnkgY291bnQsIHRha2UgdG9wIDEyXG4gIGNvbnN0IHRvcEVudHJpZXMgPSBBcnJheS5mcm9tKGNvdW50TWFwLmVudHJpZXMoKSlcbiAgICAuc29ydCgoYSwgYikgPT4gYlsxXSAtIGFbMV0pXG4gICAgLnNsaWNlKDAsIDEyKTtcblxuICBjb25zdCBzaG93SWRzID0gdG9wRW50cmllcy5tYXAoKFtpZF0pID0+IGlkKTtcblxuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHRvcEVudHJpZXNcbiAgICAubWFwKChbaWQsIGNvdW50XSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdyA9IHNob3dNYXAuZ2V0KGlkKTtcbiAgICAgIGlmICghc2hvdykgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogc2hvdy5pZCxcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgICAgYWRkZWRDb3VudDogY291bnQsXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUG9wdWxhclNob3cgPT4gciAhPT0gbnVsbCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRPckNyZWF0ZVNob3dCeVRtZGJJZChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuXG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiBleGlzdGluZy5pZDtcblxuICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuaW5zZXJ0KHtcbiAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgIG92ZXJ2aWV3OiBzaG93Lm92ZXJ2aWV3LFxuICAgIH0pXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvciB8fCAhbmV3U2hvdykgdGhyb3cgbmV3IEVycm9yKGVycm9yPy5tZXNzYWdlID8/IFwiRmFpbGVkIHRvIGNyZWF0ZSBzaG93XCIpO1xuICByZXR1cm4gbmV3U2hvdy5pZDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNlRBMkhzQiwrTEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/explore/data:bb268b [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSimilarUsers",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"003a99768e3bd3da8b89cf7eeaac78a68557a6e86a":"getSimilarUsers"},"packages/web/src/app/[locale]/(app)/explore/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("003a99768e3bd3da8b89cf7eeaac78a68557a6e86a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getSimilarUsers");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgc2NvcmVSZWNvbW1lbmRhdGlvbnMsIHR5cGUgVXNlckxpc3QgfSBmcm9tIFwiQC9saWIvcmVjb21tZW5kYXRpb25zXCI7XG5pbXBvcnQgeyBjb21wdXRlTGlzdFNpbWlsYXJpdHksIHR5cGUgTGlzdEVudHJ5IH0gZnJvbSBcIkAvbGliL3NpbWlsYXJpdHlcIjtcblxuZXhwb3J0IHR5cGUgU2ltaWxhclVzZXIgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGF2YXRhcl91cmw6IHN0cmluZyB8IG51bGw7XG4gIHNob3dfY291bnQ6IG51bWJlcjtcbiAgc2ltaWxhcml0eTogbnVtYmVyO1xuICBpc19mb2xsb3dpbmc6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2ltaWxhclVzZXJzKCk6IFByb21pc2U8U2ltaWxhclVzZXJbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgaXRlbXNcbiAgY29uc3QgeyBkYXRhOiBteUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFteUxpc3QpIHJldHVybiBbXTtcblxuICBjb25zdCB7IGRhdGE6IG15SXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoIW15SXRlbXMgfHwgbXlJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCB2aWV3ZXJMaXN0OiBMaXN0RW50cnlbXSA9IG15SXRlbXMubWFwKChpLCBpZHgpID0+ICh7XG4gICAgc2hvd0lkOiBpLnNob3dfaWQsXG4gICAgcmF0aW5nOiBpLnJhdGluZyxcbiAgICBwb3NpdGlvbjogaS5wb3NpdGlvbiA/PyBpZHgsXG4gIH0pKTtcblxuICAvLyBGZXRjaCBhbGwgcHVibGljIGxpc3RzIChleGNsdWRpbmcgc2VsZikgd2l0aCBwcm9maWxlIGluZm9cbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBwcm9maWxlcyhpZCwgdXNlcm5hbWUsIGF2YXRhcl91cmwpXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZm9yIHRob3NlIGxpc3RzIGluIG9uZSBiYXRjaFxuICBjb25zdCB7IGRhdGE6IGFsbEl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJsaXN0X2lkLCBzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uXCIpXG4gICAgLmluKFwibGlzdF9pZFwiLCBsaXN0SWRzKTtcblxuICBpZiAoIWFsbEl0ZW1zKSByZXR1cm4gW107XG5cbiAgLy8gR3JvdXAgaXRlbXMgYnkgbGlzdF9pZFxuICBjb25zdCBpdGVtc0J5TGlzdCA9IG5ldyBNYXA8c3RyaW5nLCBMaXN0RW50cnlbXT4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGFsbEl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtc0J5TGlzdC5oYXMoaXRlbS5saXN0X2lkKSkgaXRlbXNCeUxpc3Quc2V0KGl0ZW0ubGlzdF9pZCwgW10pO1xuICAgIGl0ZW1zQnlMaXN0LmdldChpdGVtLmxpc3RfaWQpIS5wdXNoKHtcbiAgICAgIHNob3dJZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ2hlY2sgd2hvIHRoZSBjdXJyZW50IHVzZXIgaXMgYWxyZWFkeSBmb2xsb3dpbmdcbiAgY29uc3QgeyBkYXRhOiBmb2xsb3dzRGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuc2VsZWN0KFwiZm9sbG93aW5nX2lkXCIpXG4gICAgLmVxKFwiZm9sbG93ZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgY29uc3QgZm9sbG93aW5nSWRzID0gbmV3IFNldCgoZm9sbG93c0RhdGEgPz8gW10pLm1hcCgoZikgPT4gZi5mb2xsb3dpbmdfaWQpKTtcblxuICAvLyBDb21wdXRlIHNpbWlsYXJpdHkgZm9yIGVhY2ggdXNlclxuICBjb25zdCByZXN1bHRzOiBTaW1pbGFyVXNlcltdID0gW107XG5cbiAgZm9yIChjb25zdCBsaXN0IG9mIHB1YmxpY0xpc3RzKSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IEFycmF5LmlzQXJyYXkobGlzdC5wcm9maWxlcylcbiAgICAgID8gbGlzdC5wcm9maWxlc1swXVxuICAgICAgOiBsaXN0LnByb2ZpbGVzO1xuICAgIGlmICghcHJvZmlsZSkgY29udGludWU7XG5cbiAgICBjb25zdCBvdGhlckl0ZW1zID0gaXRlbXNCeUxpc3QuZ2V0KGxpc3QuaWQpID8/IFtdO1xuICAgIGlmIChvdGhlckl0ZW1zLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG5cbiAgICBjb25zdCBzaW1pbGFyaXR5ID0gY29tcHV0ZUxpc3RTaW1pbGFyaXR5KHZpZXdlckxpc3QsIG90aGVySXRlbXMpO1xuICAgIGlmIChzaW1pbGFyaXR5ID09PSAwKSBjb250aW51ZTtcblxuICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICBpZDogcHJvZmlsZS5pZCxcbiAgICAgIHVzZXJuYW1lOiBwcm9maWxlLnVzZXJuYW1lLFxuICAgICAgYXZhdGFyX3VybDogcHJvZmlsZS5hdmF0YXJfdXJsLFxuICAgICAgc2hvd19jb3VudDogb3RoZXJJdGVtcy5sZW5ndGgsXG4gICAgICBzaW1pbGFyaXR5LFxuICAgICAgaXNfZm9sbG93aW5nOiBmb2xsb3dpbmdJZHMuaGFzKHByb2ZpbGUuaWQpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU29ydCBieSBzaW1pbGFyaXR5IGRlc2NlbmRpbmcsIHJldHVybiB0b3AgM1xuICByZXR1cm4gcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBiLnNpbWlsYXJpdHkgLSBhLnNpbWlsYXJpdHkpLnNsaWNlKDAsIDMpO1xufVxuXG5leHBvcnQgdHlwZSBSZWNvbW1lbmRlZFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIHNjb3JlOiBudW1iZXI7XG4gIHJlY29tbWVuZGVkQnk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWNvbW1lbmRhdGlvbnMoKTogUHJvbWlzZTxSZWNvbW1lbmRlZFNob3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gMS4gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgKyBpdGVtc1xuICBjb25zdCB7IGRhdGE6IG15TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIW15TGlzdCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YTogbXlJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmICghbXlJdGVtcyB8fCBteUl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHZpZXdlckxpc3Q6IExpc3RFbnRyeVtdID0gbXlJdGVtcy5tYXAoKGksIGlkeCkgPT4gKHtcbiAgICBzaG93SWQ6IGkuc2hvd19pZCxcbiAgICByYXRpbmc6IGkucmF0aW5nLFxuICAgIHBvc2l0aW9uOiBpLnBvc2l0aW9uID8/IGlkeCxcbiAgfSkpO1xuXG4gIC8vIDIuIEZldGNoIGFsbCBvdGhlciBwdWJsaWMgbGlzdHMgd2l0aCB0aGVpciBpdGVtcyBpbiBvbmUgcXVlcnlcbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgbGlzdCBpdGVtcyBmb3IgdGhvc2UgbGlzdHMgaW4gb25lIGJhdGNoXG4gIGNvbnN0IHsgZGF0YTogYWxsSXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImxpc3RfaWQsIHNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIGxpc3RJZHMpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSk7XG5cbiAgaWYgKCFhbGxJdGVtcyB8fCBhbGxJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyAzLiBHcm91cCBpdGVtcyBieSB1c2VyXG4gIGNvbnN0IGxpc3RUb1VzZXIgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGwgb2YgcHVibGljTGlzdHMpIHtcbiAgICBsaXN0VG9Vc2VyLnNldChsLmlkLCBsLnVzZXJfaWQpO1xuICB9XG5cbiAgY29uc3QgdXNlckl0ZW1zTWFwID0gbmV3IE1hcDxzdHJpbmcsIExpc3RFbnRyeVtdPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgYWxsSXRlbXMpIHtcbiAgICBjb25zdCB1c2VySWQgPSBsaXN0VG9Vc2VyLmdldChpdGVtLmxpc3RfaWQpO1xuICAgIGlmICghdXNlcklkKSBjb250aW51ZTtcbiAgICBpZiAoIXVzZXJJdGVtc01hcC5oYXModXNlcklkKSkgdXNlckl0ZW1zTWFwLnNldCh1c2VySWQsIFtdKTtcbiAgICB1c2VySXRlbXNNYXAuZ2V0KHVzZXJJZCkhLnB1c2goe1xuICAgICAgc2hvd0lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBvdGhlckxpc3RzOiBVc2VyTGlzdFtdID0gW107XG4gIGZvciAoY29uc3QgW3VzZXJJZCwgaXRlbXNdIG9mIHVzZXJJdGVtc01hcCkge1xuICAgIG90aGVyTGlzdHMucHVzaCh7IHVzZXJJZCwgaXRlbXMgfSk7XG4gIH1cblxuICAvLyA0LiBSdW4gc2NvcmluZyBhbGdvcml0aG1cbiAgY29uc3Qgc2NvcmVkID0gc2NvcmVSZWNvbW1lbmRhdGlvbnModmlld2VyTGlzdCwgb3RoZXJMaXN0cyk7XG5cbiAgaWYgKHNjb3JlZC5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyA1LiBGZXRjaCBzaG93IG1ldGFkYXRhIGZvciByZWNvbW1lbmRlZCBzaG93c1xuICBjb25zdCBzaG93SWRzID0gc2NvcmVkLm1hcCgocykgPT4gcy5zaG93SWQpO1xuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHNjb3JlZFxuICAgIC5tYXAoKHMpID0+IHtcbiAgICAgIGNvbnN0IHNob3cgPSBzaG93TWFwLmdldChzLnNob3dJZCk7XG4gICAgICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHNob3cuaWQsXG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICAgIHNjb3JlOiBNYXRoLnJvdW5kKHMuc2NvcmUgKiAxMDApIC8gMTAwLFxuICAgICAgICByZWNvbW1lbmRlZEJ5OiBzLnJlY29tbWVuZGVkQnksXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUmVjb21tZW5kZWRTaG93ID0+IHIgIT09IG51bGwpO1xufVxuXG5leHBvcnQgdHlwZSBQb3B1bGFyU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgYWRkZWRDb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBvcHVsYXJTaG93cygpOiBQcm9taXNlPFBvcHVsYXJTaG93W10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICAvLyBHZXQgYWxsIHB1YmxpYyBsaXN0IElEc1xuICBjb25zdCB7IGRhdGE6IHB1YmxpY0xpc3RzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpc19wdWJsaWNcIiwgdHJ1ZSk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBwdWJsaWNMaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBHZXQgYWxsIGl0ZW1zIGZyb20gcHVibGljIGxpc3RzXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWRcIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIHB1YmxpY0xpc3RJZHMpO1xuXG4gIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG5cbiAgLy8gQ291bnQgb2NjdXJyZW5jZXMgcGVyIHNob3dcbiAgY29uc3QgY291bnRNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb3VudE1hcC5zZXQoaXRlbS5zaG93X2lkLCAoY291bnRNYXAuZ2V0KGl0ZW0uc2hvd19pZCkgPz8gMCkgKyAxKTtcbiAgfVxuXG4gIC8vIFNvcnQgYnkgY291bnQsIHRha2UgdG9wIDEyXG4gIGNvbnN0IHRvcEVudHJpZXMgPSBBcnJheS5mcm9tKGNvdW50TWFwLmVudHJpZXMoKSlcbiAgICAuc29ydCgoYSwgYikgPT4gYlsxXSAtIGFbMV0pXG4gICAgLnNsaWNlKDAsIDEyKTtcblxuICBjb25zdCBzaG93SWRzID0gdG9wRW50cmllcy5tYXAoKFtpZF0pID0+IGlkKTtcblxuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHRvcEVudHJpZXNcbiAgICAubWFwKChbaWQsIGNvdW50XSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdyA9IHNob3dNYXAuZ2V0KGlkKTtcbiAgICAgIGlmICghc2hvdykgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogc2hvdy5pZCxcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgICAgYWRkZWRDb3VudDogY291bnQsXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUG9wdWxhclNob3cgPT4gciAhPT0gbnVsbCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRPckNyZWF0ZVNob3dCeVRtZGJJZChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuXG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiBleGlzdGluZy5pZDtcblxuICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuaW5zZXJ0KHtcbiAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgIG92ZXJ2aWV3OiBzaG93Lm92ZXJ2aWV3LFxuICAgIH0pXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvciB8fCAhbmV3U2hvdykgdGhyb3cgbmV3IEVycm9yKGVycm9yPy5tZXNzYWdlID8/IFwiRmFpbGVkIHRvIGNyZWF0ZSBzaG93XCIpO1xuICByZXR1cm4gbmV3U2hvdy5pZDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiMFRBZXNCLDRMQUFBIn0=
}),
"[project]/packages/web/src/app/[locale]/(app)/explore/data:c03a3a [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPopularShows",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"002a8f726f568507c58a270619d7a92c63dbe4a5c5":"getPopularShows"},"packages/web/src/app/[locale]/(app)/explore/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("002a8f726f568507c58a270619d7a92c63dbe4a5c5", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getPopularShows");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgc2NvcmVSZWNvbW1lbmRhdGlvbnMsIHR5cGUgVXNlckxpc3QgfSBmcm9tIFwiQC9saWIvcmVjb21tZW5kYXRpb25zXCI7XG5pbXBvcnQgeyBjb21wdXRlTGlzdFNpbWlsYXJpdHksIHR5cGUgTGlzdEVudHJ5IH0gZnJvbSBcIkAvbGliL3NpbWlsYXJpdHlcIjtcblxuZXhwb3J0IHR5cGUgU2ltaWxhclVzZXIgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGF2YXRhcl91cmw6IHN0cmluZyB8IG51bGw7XG4gIHNob3dfY291bnQ6IG51bWJlcjtcbiAgc2ltaWxhcml0eTogbnVtYmVyO1xuICBpc19mb2xsb3dpbmc6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2ltaWxhclVzZXJzKCk6IFByb21pc2U8U2ltaWxhclVzZXJbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgaXRlbXNcbiAgY29uc3QgeyBkYXRhOiBteUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFteUxpc3QpIHJldHVybiBbXTtcblxuICBjb25zdCB7IGRhdGE6IG15SXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoIW15SXRlbXMgfHwgbXlJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCB2aWV3ZXJMaXN0OiBMaXN0RW50cnlbXSA9IG15SXRlbXMubWFwKChpLCBpZHgpID0+ICh7XG4gICAgc2hvd0lkOiBpLnNob3dfaWQsXG4gICAgcmF0aW5nOiBpLnJhdGluZyxcbiAgICBwb3NpdGlvbjogaS5wb3NpdGlvbiA/PyBpZHgsXG4gIH0pKTtcblxuICAvLyBGZXRjaCBhbGwgcHVibGljIGxpc3RzIChleGNsdWRpbmcgc2VsZikgd2l0aCBwcm9maWxlIGluZm9cbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBwcm9maWxlcyhpZCwgdXNlcm5hbWUsIGF2YXRhcl91cmwpXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZm9yIHRob3NlIGxpc3RzIGluIG9uZSBiYXRjaFxuICBjb25zdCB7IGRhdGE6IGFsbEl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJsaXN0X2lkLCBzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uXCIpXG4gICAgLmluKFwibGlzdF9pZFwiLCBsaXN0SWRzKTtcblxuICBpZiAoIWFsbEl0ZW1zKSByZXR1cm4gW107XG5cbiAgLy8gR3JvdXAgaXRlbXMgYnkgbGlzdF9pZFxuICBjb25zdCBpdGVtc0J5TGlzdCA9IG5ldyBNYXA8c3RyaW5nLCBMaXN0RW50cnlbXT4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGFsbEl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtc0J5TGlzdC5oYXMoaXRlbS5saXN0X2lkKSkgaXRlbXNCeUxpc3Quc2V0KGl0ZW0ubGlzdF9pZCwgW10pO1xuICAgIGl0ZW1zQnlMaXN0LmdldChpdGVtLmxpc3RfaWQpIS5wdXNoKHtcbiAgICAgIHNob3dJZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ2hlY2sgd2hvIHRoZSBjdXJyZW50IHVzZXIgaXMgYWxyZWFkeSBmb2xsb3dpbmdcbiAgY29uc3QgeyBkYXRhOiBmb2xsb3dzRGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuc2VsZWN0KFwiZm9sbG93aW5nX2lkXCIpXG4gICAgLmVxKFwiZm9sbG93ZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgY29uc3QgZm9sbG93aW5nSWRzID0gbmV3IFNldCgoZm9sbG93c0RhdGEgPz8gW10pLm1hcCgoZikgPT4gZi5mb2xsb3dpbmdfaWQpKTtcblxuICAvLyBDb21wdXRlIHNpbWlsYXJpdHkgZm9yIGVhY2ggdXNlclxuICBjb25zdCByZXN1bHRzOiBTaW1pbGFyVXNlcltdID0gW107XG5cbiAgZm9yIChjb25zdCBsaXN0IG9mIHB1YmxpY0xpc3RzKSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IEFycmF5LmlzQXJyYXkobGlzdC5wcm9maWxlcylcbiAgICAgID8gbGlzdC5wcm9maWxlc1swXVxuICAgICAgOiBsaXN0LnByb2ZpbGVzO1xuICAgIGlmICghcHJvZmlsZSkgY29udGludWU7XG5cbiAgICBjb25zdCBvdGhlckl0ZW1zID0gaXRlbXNCeUxpc3QuZ2V0KGxpc3QuaWQpID8/IFtdO1xuICAgIGlmIChvdGhlckl0ZW1zLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG5cbiAgICBjb25zdCBzaW1pbGFyaXR5ID0gY29tcHV0ZUxpc3RTaW1pbGFyaXR5KHZpZXdlckxpc3QsIG90aGVySXRlbXMpO1xuICAgIGlmIChzaW1pbGFyaXR5ID09PSAwKSBjb250aW51ZTtcblxuICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICBpZDogcHJvZmlsZS5pZCxcbiAgICAgIHVzZXJuYW1lOiBwcm9maWxlLnVzZXJuYW1lLFxuICAgICAgYXZhdGFyX3VybDogcHJvZmlsZS5hdmF0YXJfdXJsLFxuICAgICAgc2hvd19jb3VudDogb3RoZXJJdGVtcy5sZW5ndGgsXG4gICAgICBzaW1pbGFyaXR5LFxuICAgICAgaXNfZm9sbG93aW5nOiBmb2xsb3dpbmdJZHMuaGFzKHByb2ZpbGUuaWQpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU29ydCBieSBzaW1pbGFyaXR5IGRlc2NlbmRpbmcsIHJldHVybiB0b3AgM1xuICByZXR1cm4gcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBiLnNpbWlsYXJpdHkgLSBhLnNpbWlsYXJpdHkpLnNsaWNlKDAsIDMpO1xufVxuXG5leHBvcnQgdHlwZSBSZWNvbW1lbmRlZFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIHNjb3JlOiBudW1iZXI7XG4gIHJlY29tbWVuZGVkQnk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWNvbW1lbmRhdGlvbnMoKTogUHJvbWlzZTxSZWNvbW1lbmRlZFNob3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gMS4gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgKyBpdGVtc1xuICBjb25zdCB7IGRhdGE6IG15TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIW15TGlzdCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YTogbXlJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmICghbXlJdGVtcyB8fCBteUl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHZpZXdlckxpc3Q6IExpc3RFbnRyeVtdID0gbXlJdGVtcy5tYXAoKGksIGlkeCkgPT4gKHtcbiAgICBzaG93SWQ6IGkuc2hvd19pZCxcbiAgICByYXRpbmc6IGkucmF0aW5nLFxuICAgIHBvc2l0aW9uOiBpLnBvc2l0aW9uID8/IGlkeCxcbiAgfSkpO1xuXG4gIC8vIDIuIEZldGNoIGFsbCBvdGhlciBwdWJsaWMgbGlzdHMgd2l0aCB0aGVpciBpdGVtcyBpbiBvbmUgcXVlcnlcbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgbGlzdCBpdGVtcyBmb3IgdGhvc2UgbGlzdHMgaW4gb25lIGJhdGNoXG4gIGNvbnN0IHsgZGF0YTogYWxsSXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImxpc3RfaWQsIHNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIGxpc3RJZHMpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSk7XG5cbiAgaWYgKCFhbGxJdGVtcyB8fCBhbGxJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyAzLiBHcm91cCBpdGVtcyBieSB1c2VyXG4gIGNvbnN0IGxpc3RUb1VzZXIgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGwgb2YgcHVibGljTGlzdHMpIHtcbiAgICBsaXN0VG9Vc2VyLnNldChsLmlkLCBsLnVzZXJfaWQpO1xuICB9XG5cbiAgY29uc3QgdXNlckl0ZW1zTWFwID0gbmV3IE1hcDxzdHJpbmcsIExpc3RFbnRyeVtdPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgYWxsSXRlbXMpIHtcbiAgICBjb25zdCB1c2VySWQgPSBsaXN0VG9Vc2VyLmdldChpdGVtLmxpc3RfaWQpO1xuICAgIGlmICghdXNlcklkKSBjb250aW51ZTtcbiAgICBpZiAoIXVzZXJJdGVtc01hcC5oYXModXNlcklkKSkgdXNlckl0ZW1zTWFwLnNldCh1c2VySWQsIFtdKTtcbiAgICB1c2VySXRlbXNNYXAuZ2V0KHVzZXJJZCkhLnB1c2goe1xuICAgICAgc2hvd0lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBvdGhlckxpc3RzOiBVc2VyTGlzdFtdID0gW107XG4gIGZvciAoY29uc3QgW3VzZXJJZCwgaXRlbXNdIG9mIHVzZXJJdGVtc01hcCkge1xuICAgIG90aGVyTGlzdHMucHVzaCh7IHVzZXJJZCwgaXRlbXMgfSk7XG4gIH1cblxuICAvLyA0LiBSdW4gc2NvcmluZyBhbGdvcml0aG1cbiAgY29uc3Qgc2NvcmVkID0gc2NvcmVSZWNvbW1lbmRhdGlvbnModmlld2VyTGlzdCwgb3RoZXJMaXN0cyk7XG5cbiAgaWYgKHNjb3JlZC5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyA1LiBGZXRjaCBzaG93IG1ldGFkYXRhIGZvciByZWNvbW1lbmRlZCBzaG93c1xuICBjb25zdCBzaG93SWRzID0gc2NvcmVkLm1hcCgocykgPT4gcy5zaG93SWQpO1xuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHNjb3JlZFxuICAgIC5tYXAoKHMpID0+IHtcbiAgICAgIGNvbnN0IHNob3cgPSBzaG93TWFwLmdldChzLnNob3dJZCk7XG4gICAgICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHNob3cuaWQsXG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICAgIHNjb3JlOiBNYXRoLnJvdW5kKHMuc2NvcmUgKiAxMDApIC8gMTAwLFxuICAgICAgICByZWNvbW1lbmRlZEJ5OiBzLnJlY29tbWVuZGVkQnksXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUmVjb21tZW5kZWRTaG93ID0+IHIgIT09IG51bGwpO1xufVxuXG5leHBvcnQgdHlwZSBQb3B1bGFyU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgYWRkZWRDb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBvcHVsYXJTaG93cygpOiBQcm9taXNlPFBvcHVsYXJTaG93W10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICAvLyBHZXQgYWxsIHB1YmxpYyBsaXN0IElEc1xuICBjb25zdCB7IGRhdGE6IHB1YmxpY0xpc3RzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpc19wdWJsaWNcIiwgdHJ1ZSk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBwdWJsaWNMaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBHZXQgYWxsIGl0ZW1zIGZyb20gcHVibGljIGxpc3RzXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWRcIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIHB1YmxpY0xpc3RJZHMpO1xuXG4gIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG5cbiAgLy8gQ291bnQgb2NjdXJyZW5jZXMgcGVyIHNob3dcbiAgY29uc3QgY291bnRNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb3VudE1hcC5zZXQoaXRlbS5zaG93X2lkLCAoY291bnRNYXAuZ2V0KGl0ZW0uc2hvd19pZCkgPz8gMCkgKyAxKTtcbiAgfVxuXG4gIC8vIFNvcnQgYnkgY291bnQsIHRha2UgdG9wIDEyXG4gIGNvbnN0IHRvcEVudHJpZXMgPSBBcnJheS5mcm9tKGNvdW50TWFwLmVudHJpZXMoKSlcbiAgICAuc29ydCgoYSwgYikgPT4gYlsxXSAtIGFbMV0pXG4gICAgLnNsaWNlKDAsIDEyKTtcblxuICBjb25zdCBzaG93SWRzID0gdG9wRW50cmllcy5tYXAoKFtpZF0pID0+IGlkKTtcblxuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHRvcEVudHJpZXNcbiAgICAubWFwKChbaWQsIGNvdW50XSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdyA9IHNob3dNYXAuZ2V0KGlkKTtcbiAgICAgIGlmICghc2hvdykgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogc2hvdy5pZCxcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgICAgYWRkZWRDb3VudDogY291bnQsXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUG9wdWxhclNob3cgPT4gciAhPT0gbnVsbCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRPckNyZWF0ZVNob3dCeVRtZGJJZChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuXG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiBleGlzdGluZy5pZDtcblxuICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuaW5zZXJ0KHtcbiAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgIG92ZXJ2aWV3OiBzaG93Lm92ZXJ2aWV3LFxuICAgIH0pXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvciB8fCAhbmV3U2hvdykgdGhyb3cgbmV3IEVycm9yKGVycm9yPy5tZXNzYWdlID8/IFwiRmFpbGVkIHRvIGNyZWF0ZSBzaG93XCIpO1xuICByZXR1cm4gbmV3U2hvdy5pZDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiMFRBZ1BzQiw0TEFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/explore/data:28c992 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOrCreateShowByTmdbId",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40824b2d040eb40fae737765c4ada202a63988e257":"getOrCreateShowByTmdbId"},"packages/web/src/app/[locale]/(app)/explore/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40824b2d040eb40fae737765c4ada202a63988e257", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getOrCreateShowByTmdbId");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgc2NvcmVSZWNvbW1lbmRhdGlvbnMsIHR5cGUgVXNlckxpc3QgfSBmcm9tIFwiQC9saWIvcmVjb21tZW5kYXRpb25zXCI7XG5pbXBvcnQgeyBjb21wdXRlTGlzdFNpbWlsYXJpdHksIHR5cGUgTGlzdEVudHJ5IH0gZnJvbSBcIkAvbGliL3NpbWlsYXJpdHlcIjtcblxuZXhwb3J0IHR5cGUgU2ltaWxhclVzZXIgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGF2YXRhcl91cmw6IHN0cmluZyB8IG51bGw7XG4gIHNob3dfY291bnQ6IG51bWJlcjtcbiAgc2ltaWxhcml0eTogbnVtYmVyO1xuICBpc19mb2xsb3dpbmc6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2ltaWxhclVzZXJzKCk6IFByb21pc2U8U2ltaWxhclVzZXJbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgaXRlbXNcbiAgY29uc3QgeyBkYXRhOiBteUxpc3QgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInVzZXJfaWRcIiwgdXNlci5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFteUxpc3QpIHJldHVybiBbXTtcblxuICBjb25zdCB7IGRhdGE6IG15SXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoIW15SXRlbXMgfHwgbXlJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCB2aWV3ZXJMaXN0OiBMaXN0RW50cnlbXSA9IG15SXRlbXMubWFwKChpLCBpZHgpID0+ICh7XG4gICAgc2hvd0lkOiBpLnNob3dfaWQsXG4gICAgcmF0aW5nOiBpLnJhdGluZyxcbiAgICBwb3NpdGlvbjogaS5wb3NpdGlvbiA/PyBpZHgsXG4gIH0pKTtcblxuICAvLyBGZXRjaCBhbGwgcHVibGljIGxpc3RzIChleGNsdWRpbmcgc2VsZikgd2l0aCBwcm9maWxlIGluZm9cbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBwcm9maWxlcyhpZCwgdXNlcm5hbWUsIGF2YXRhcl91cmwpXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgaXRlbXMgZm9yIHRob3NlIGxpc3RzIGluIG9uZSBiYXRjaFxuICBjb25zdCB7IGRhdGE6IGFsbEl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJsaXN0X2lkLCBzaG93X2lkLCByYXRpbmcsIHBvc2l0aW9uXCIpXG4gICAgLmluKFwibGlzdF9pZFwiLCBsaXN0SWRzKTtcblxuICBpZiAoIWFsbEl0ZW1zKSByZXR1cm4gW107XG5cbiAgLy8gR3JvdXAgaXRlbXMgYnkgbGlzdF9pZFxuICBjb25zdCBpdGVtc0J5TGlzdCA9IG5ldyBNYXA8c3RyaW5nLCBMaXN0RW50cnlbXT4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGFsbEl0ZW1zKSB7XG4gICAgaWYgKCFpdGVtc0J5TGlzdC5oYXMoaXRlbS5saXN0X2lkKSkgaXRlbXNCeUxpc3Quc2V0KGl0ZW0ubGlzdF9pZCwgW10pO1xuICAgIGl0ZW1zQnlMaXN0LmdldChpdGVtLmxpc3RfaWQpIS5wdXNoKHtcbiAgICAgIHNob3dJZDogaXRlbS5zaG93X2lkLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIHBvc2l0aW9uOiBpdGVtLnBvc2l0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ2hlY2sgd2hvIHRoZSBjdXJyZW50IHVzZXIgaXMgYWxyZWFkeSBmb2xsb3dpbmdcbiAgY29uc3QgeyBkYXRhOiBmb2xsb3dzRGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZvbGxvd3NcIilcbiAgICAuc2VsZWN0KFwiZm9sbG93aW5nX2lkXCIpXG4gICAgLmVxKFwiZm9sbG93ZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgY29uc3QgZm9sbG93aW5nSWRzID0gbmV3IFNldCgoZm9sbG93c0RhdGEgPz8gW10pLm1hcCgoZikgPT4gZi5mb2xsb3dpbmdfaWQpKTtcblxuICAvLyBDb21wdXRlIHNpbWlsYXJpdHkgZm9yIGVhY2ggdXNlclxuICBjb25zdCByZXN1bHRzOiBTaW1pbGFyVXNlcltdID0gW107XG5cbiAgZm9yIChjb25zdCBsaXN0IG9mIHB1YmxpY0xpc3RzKSB7XG4gICAgY29uc3QgcHJvZmlsZSA9IEFycmF5LmlzQXJyYXkobGlzdC5wcm9maWxlcylcbiAgICAgID8gbGlzdC5wcm9maWxlc1swXVxuICAgICAgOiBsaXN0LnByb2ZpbGVzO1xuICAgIGlmICghcHJvZmlsZSkgY29udGludWU7XG5cbiAgICBjb25zdCBvdGhlckl0ZW1zID0gaXRlbXNCeUxpc3QuZ2V0KGxpc3QuaWQpID8/IFtdO1xuICAgIGlmIChvdGhlckl0ZW1zLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG5cbiAgICBjb25zdCBzaW1pbGFyaXR5ID0gY29tcHV0ZUxpc3RTaW1pbGFyaXR5KHZpZXdlckxpc3QsIG90aGVySXRlbXMpO1xuICAgIGlmIChzaW1pbGFyaXR5ID09PSAwKSBjb250aW51ZTtcblxuICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICBpZDogcHJvZmlsZS5pZCxcbiAgICAgIHVzZXJuYW1lOiBwcm9maWxlLnVzZXJuYW1lLFxuICAgICAgYXZhdGFyX3VybDogcHJvZmlsZS5hdmF0YXJfdXJsLFxuICAgICAgc2hvd19jb3VudDogb3RoZXJJdGVtcy5sZW5ndGgsXG4gICAgICBzaW1pbGFyaXR5LFxuICAgICAgaXNfZm9sbG93aW5nOiBmb2xsb3dpbmdJZHMuaGFzKHByb2ZpbGUuaWQpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU29ydCBieSBzaW1pbGFyaXR5IGRlc2NlbmRpbmcsIHJldHVybiB0b3AgM1xuICByZXR1cm4gcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBiLnNpbWlsYXJpdHkgLSBhLnNpbWlsYXJpdHkpLnNsaWNlKDAsIDMpO1xufVxuXG5leHBvcnQgdHlwZSBSZWNvbW1lbmRlZFNob3cgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG4gIHNjb3JlOiBudW1iZXI7XG4gIHJlY29tbWVuZGVkQnk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWNvbW1lbmRhdGlvbnMoKTogUHJvbWlzZTxSZWNvbW1lbmRlZFNob3dbXT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm4gW107XG5cbiAgLy8gMS4gR2V0IGN1cnJlbnQgdXNlcidzIGxpc3QgKyBpdGVtc1xuICBjb25zdCB7IGRhdGE6IG15TGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIW15TGlzdCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHsgZGF0YTogbXlJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuXG4gIGlmICghbXlJdGVtcyB8fCBteUl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHZpZXdlckxpc3Q6IExpc3RFbnRyeVtdID0gbXlJdGVtcy5tYXAoKGksIGlkeCkgPT4gKHtcbiAgICBzaG93SWQ6IGkuc2hvd19pZCxcbiAgICByYXRpbmc6IGkucmF0aW5nLFxuICAgIHBvc2l0aW9uOiBpLnBvc2l0aW9uID8/IGlkeCxcbiAgfSkpO1xuXG4gIC8vIDIuIEZldGNoIGFsbCBvdGhlciBwdWJsaWMgbGlzdHMgd2l0aCB0aGVpciBpdGVtcyBpbiBvbmUgcXVlcnlcbiAgY29uc3QgeyBkYXRhOiBwdWJsaWNMaXN0cyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCB1c2VyX2lkXCIpXG4gICAgLmVxKFwiaXNfcHVibGljXCIsIHRydWUpXG4gICAgLm5lcShcInVzZXJfaWRcIiwgdXNlci5pZCk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBsaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBGZXRjaCBhbGwgbGlzdCBpdGVtcyBmb3IgdGhvc2UgbGlzdHMgaW4gb25lIGJhdGNoXG4gIGNvbnN0IHsgZGF0YTogYWxsSXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImxpc3RfaWQsIHNob3dfaWQsIHJhdGluZywgcG9zaXRpb25cIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIGxpc3RJZHMpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IHRydWUgfSk7XG5cbiAgaWYgKCFhbGxJdGVtcyB8fCBhbGxJdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyAzLiBHcm91cCBpdGVtcyBieSB1c2VyXG4gIGNvbnN0IGxpc3RUb1VzZXIgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGwgb2YgcHVibGljTGlzdHMpIHtcbiAgICBsaXN0VG9Vc2VyLnNldChsLmlkLCBsLnVzZXJfaWQpO1xuICB9XG5cbiAgY29uc3QgdXNlckl0ZW1zTWFwID0gbmV3IE1hcDxzdHJpbmcsIExpc3RFbnRyeVtdPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgYWxsSXRlbXMpIHtcbiAgICBjb25zdCB1c2VySWQgPSBsaXN0VG9Vc2VyLmdldChpdGVtLmxpc3RfaWQpO1xuICAgIGlmICghdXNlcklkKSBjb250aW51ZTtcbiAgICBpZiAoIXVzZXJJdGVtc01hcC5oYXModXNlcklkKSkgdXNlckl0ZW1zTWFwLnNldCh1c2VySWQsIFtdKTtcbiAgICB1c2VySXRlbXNNYXAuZ2V0KHVzZXJJZCkhLnB1c2goe1xuICAgICAgc2hvd0lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBvdGhlckxpc3RzOiBVc2VyTGlzdFtdID0gW107XG4gIGZvciAoY29uc3QgW3VzZXJJZCwgaXRlbXNdIG9mIHVzZXJJdGVtc01hcCkge1xuICAgIG90aGVyTGlzdHMucHVzaCh7IHVzZXJJZCwgaXRlbXMgfSk7XG4gIH1cblxuICAvLyA0LiBSdW4gc2NvcmluZyBhbGdvcml0aG1cbiAgY29uc3Qgc2NvcmVkID0gc2NvcmVSZWNvbW1lbmRhdGlvbnModmlld2VyTGlzdCwgb3RoZXJMaXN0cyk7XG5cbiAgaWYgKHNjb3JlZC5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAvLyA1LiBGZXRjaCBzaG93IG1ldGFkYXRhIGZvciByZWNvbW1lbmRlZCBzaG93c1xuICBjb25zdCBzaG93SWRzID0gc2NvcmVkLm1hcCgocykgPT4gcy5zaG93SWQpO1xuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHNjb3JlZFxuICAgIC5tYXAoKHMpID0+IHtcbiAgICAgIGNvbnN0IHNob3cgPSBzaG93TWFwLmdldChzLnNob3dJZCk7XG4gICAgICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHNob3cuaWQsXG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICAgIHNjb3JlOiBNYXRoLnJvdW5kKHMuc2NvcmUgKiAxMDApIC8gMTAwLFxuICAgICAgICByZWNvbW1lbmRlZEJ5OiBzLnJlY29tbWVuZGVkQnksXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUmVjb21tZW5kZWRTaG93ID0+IHIgIT09IG51bGwpO1xufVxuXG5leHBvcnQgdHlwZSBQb3B1bGFyU2hvdyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgdG1kYl9pZDogbnVtYmVyIHwgbnVsbDtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbiAgYWRkZWRDb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBvcHVsYXJTaG93cygpOiBQcm9taXNlPFBvcHVsYXJTaG93W10+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICAvLyBHZXQgYWxsIHB1YmxpYyBsaXN0IElEc1xuICBjb25zdCB7IGRhdGE6IHB1YmxpY0xpc3RzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdHNcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpc19wdWJsaWNcIiwgdHJ1ZSk7XG5cbiAgaWYgKCFwdWJsaWNMaXN0cyB8fCBwdWJsaWNMaXN0cy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICBjb25zdCBwdWJsaWNMaXN0SWRzID0gcHVibGljTGlzdHMubWFwKChsKSA9PiBsLmlkKTtcblxuICAvLyBHZXQgYWxsIGl0ZW1zIGZyb20gcHVibGljIGxpc3RzXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInNob3dfaWRcIilcbiAgICAuaW4oXCJsaXN0X2lkXCIsIHB1YmxpY0xpc3RJZHMpO1xuXG4gIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG5cbiAgLy8gQ291bnQgb2NjdXJyZW5jZXMgcGVyIHNob3dcbiAgY29uc3QgY291bnRNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb3VudE1hcC5zZXQoaXRlbS5zaG93X2lkLCAoY291bnRNYXAuZ2V0KGl0ZW0uc2hvd19pZCkgPz8gMCkgKyAxKTtcbiAgfVxuXG4gIC8vIFNvcnQgYnkgY291bnQsIHRha2UgdG9wIDEyXG4gIGNvbnN0IHRvcEVudHJpZXMgPSBBcnJheS5mcm9tKGNvdW50TWFwLmVudHJpZXMoKSlcbiAgICAuc29ydCgoYSwgYikgPT4gYlsxXSAtIGFbMV0pXG4gICAgLnNsaWNlKDAsIDEyKTtcblxuICBjb25zdCBzaG93SWRzID0gdG9wRW50cmllcy5tYXAoKFtpZF0pID0+IGlkKTtcblxuICBjb25zdCB7IGRhdGE6IHNob3dzIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWQsIHRtZGJfaWQsIHRpdGxlLCBwb3N0ZXJfcGF0aCwgZmlyc3RfYWlyX2RhdGUsIG92ZXJ2aWV3XCIpXG4gICAgLmluKFwiaWRcIiwgc2hvd0lkcyk7XG5cbiAgaWYgKCFzaG93cykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IHNob3dNYXAgPSBuZXcgTWFwKHNob3dzLm1hcCgocykgPT4gW3MuaWQsIHNdKSk7XG5cbiAgcmV0dXJuIHRvcEVudHJpZXNcbiAgICAubWFwKChbaWQsIGNvdW50XSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdyA9IHNob3dNYXAuZ2V0KGlkKTtcbiAgICAgIGlmICghc2hvdykgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogc2hvdy5pZCxcbiAgICAgICAgdG1kYl9pZDogc2hvdy50bWRiX2lkLFxuICAgICAgICB0aXRsZTogc2hvdy50aXRsZSxcbiAgICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICAgIGZpcnN0X2Fpcl9kYXRlOiBzaG93LmZpcnN0X2Fpcl9kYXRlLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyxcbiAgICAgICAgYWRkZWRDb3VudDogY291bnQsXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigocik6IHIgaXMgUG9wdWxhclNob3cgPT4gciAhPT0gbnVsbCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRPckNyZWF0ZVNob3dCeVRtZGJJZChzaG93OiB7XG4gIHRtZGJfaWQ6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICBvdmVydmlldzogc3RyaW5nIHwgbnVsbDtcbn0pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuXG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJzaG93c1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcInRtZGJfaWRcIiwgc2hvdy50bWRiX2lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiBleGlzdGluZy5pZDtcblxuICBjb25zdCB7IGRhdGE6IG5ld1Nob3csIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuaW5zZXJ0KHtcbiAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgIHRpdGxlOiBzaG93LnRpdGxlLFxuICAgICAgcG9zdGVyX3BhdGg6IHNob3cucG9zdGVyX3BhdGgsXG4gICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgIG92ZXJ2aWV3OiBzaG93Lm92ZXJ2aWV3LFxuICAgIH0pXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmIChlcnJvciB8fCAhbmV3U2hvdykgdGhyb3cgbmV3IEVycm9yKGVycm9yPy5tZXNzYWdlID8/IFwiRmFpbGVkIHRvIGNyZWF0ZSBzaG93XCIpO1xuICByZXR1cm4gbmV3U2hvdy5pZDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoia1VBNFNzQixvTUFBQSJ9
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/data:2a5a87 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addShowToMyList",
    ()=>$$RSC_SERVER_ACTION_9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"401cb9e19f15860a15e63380eccffb11c40f8c75a0":"addShowToMyList"},"packages/web/src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("401cb9e19f15860a15e63380eccffb11c40f8c75a0", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addShowToMyList");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xuICAvLyBTZWFzb24gLyBkdXJhdGlvbiBzdGF0c1xuICBtb3N0U2Vhc29uc1Nob3c6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBtb3N0U2Vhc29uc0J5WWVhcjoge1xuICAgIHllYXI6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgfVtdO1xuICBsb25nZXN0U2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICB0b3RhbE1pbnV0ZXM6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG59O1xuXG4vKipcbiAqIFJldHVybnMgYW5hbHl0aWNzIGZvciBhIGxpc3QuXG4gKiAtIE5vIGxpc3RJZCDihpIgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIG93biBsaXN0LlxuICogLSBXaXRoIGxpc3RJZCDihpIgYW55IHB1YmxpYyBsaXN0IChvd25lcidzIHRhZ3MgYXJlIHNob3duKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RBbmFseXRpY3MoXG4gIGxpc3RJZD86IHN0cmluZyxcbik6IFByb21pc2U8QW5hbHl0aWNzRGF0YT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBsZXQgcmVzb2x2ZWRMaXN0SWQ6IHN0cmluZztcbiAgbGV0IG93bmVySWQ6IHN0cmluZztcblxuICBpZiAobGlzdElkKSB7XG4gICAgLy8gVmlld2luZyBzb21lb25lIGVsc2UncyAob3Igb3duKSBsaXN0IGJ5IGV4cGxpY2l0IGlkXG4gICAgY29uc3QgeyBkYXRhOiBsaXN0Um93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0c1wiKVxuICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWxpc3RSb3cpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgLy8gT25seSBhbGxvdyBhY2Nlc3MgaWYgcHVibGljIG9yIG93bmVkIGJ5IHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGlmICghbGlzdFJvdy5pc19wdWJsaWMgJiYgbGlzdFJvdy51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICAgIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0Um93LmlkO1xuICAgIG93bmVySWQgPSBsaXN0Um93LnVzZXJfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0LmlkO1xuICAgIG93bmVySWQgPSB1c2VyLmlkO1xuICB9XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIChubyBwYWdpbmF0aW9uKSDigJQgcmF0aW5nLCBzaG93X2lkLCBhZGRlZF9hdCwgZmlyc3RfYWlyX2RhdGUgdmlhIGpvaW5cbiAgdHlwZSBSYXdJdGVtID0ge1xuICAgIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgICBzaG93X2lkOiBzdHJpbmc7XG4gICAgYWRkZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gICAgc2hvd3M6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICB9IHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgeyBkYXRhOiByYXdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFxuICAgICAgXCJyYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBzaG93cyhpZCwgdGl0bGUsIHBvc3Rlcl9wYXRoLCBmaXJzdF9haXJfZGF0ZSlcIixcbiAgICApXG4gICAgLmVxKFwibGlzdF9pZFwiLCByZXNvbHZlZExpc3RJZCk7XG5cbiAgY29uc3QgaXRlbXMgPSAocmF3SXRlbXMgPz8gW10pIGFzIFJhd0l0ZW1bXTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcmF0ZWRSb3dzID0gaXRlbXMuZmlsdGVyKChyKSA9PiByLnJhdGluZyAhPT0gbnVsbCk7XG4gIGNvbnN0IHJhdGVkQ291bnQgPSByYXRlZFJvd3MubGVuZ3RoO1xuICBjb25zdCBhdmdSYXRpbmcgPVxuICAgIHJhdGVkQ291bnQgPiAwXG4gICAgICA/IE1hdGgucm91bmQoXG4gICAgICAgICAgKHJhdGVkUm93cy5yZWR1Y2UoKHMsIHIpID0+IHMgKyByLnJhdGluZyEsIDApIC8gcmF0ZWRDb3VudCkgKiAxMCxcbiAgICAgICAgKSAvIDEwXG4gICAgICA6IG51bGw7XG5cbiAgLy8gUmF0aW5nIGRpc3RyaWJ1dGlvblxuICBjb25zdCByYXRpbmdNYXA6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChsZXQgciA9IDE7IHIgPD0gMTA7IHIrKykgcmF0aW5nTWFwW3JdID0gMDtcbiAgZm9yIChjb25zdCByb3cgb2YgaXRlbXMpIHtcbiAgICBpZiAocm93LnJhdGluZyAhPT0gbnVsbClcbiAgICAgIHJhdGluZ01hcFtyb3cucmF0aW5nXSA9IChyYXRpbmdNYXBbcm93LnJhdGluZ10gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IHJhdGluZ0NvdW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICAgIHJhdGluZzogaSArIDEsXG4gICAgY291bnQ6IHJhdGluZ01hcFtpICsgMV0sXG4gIH0pKTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uIOKAlCB1c2UgdGhlIGxpc3Qgb3duZXIncyB0YWdzXG4gIGNvbnN0IHNob3dJZHMgPSBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd19pZCk7XG4gIGNvbnN0IHRhZ0NvdW50czogQW5hbHl0aWNzRGF0YVtcInRhZ0NvdW50c1wiXSA9IFtdO1xuICBjb25zdCB0YWdBdmdSYXRpbmdzOiBBbmFseXRpY3NEYXRhW1widGFnQXZnUmF0aW5nc1wiXSA9IFtdO1xuXG4gIGlmIChzaG93SWRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBbeyBkYXRhOiBzaG93VGFnUm93cyB9LCB7IGRhdGE6IHRhZ0RlZnMgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwidGFnX2lkLCBzaG93X2lkXCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgb3duZXJJZClcbiAgICAgICAgLmluKFwic2hvd19pZFwiLCBzaG93SWRzKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwiaWQsIG5hbWUsIGNvbG9yXCIpXG4gICAgICAgIC5vcihgaXNfZGVmYXVsdC5lcS50cnVlLHVzZXJfaWQuZXEuJHtvd25lcklkfWApLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGFnTWFwID0gbmV3IE1hcCgodGFnRGVmcyA/PyBbXSkubWFwKCh0KSA9PiBbdC5pZCwgdF0pKTtcbiAgICBjb25zdCBzaG93UmF0aW5nTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoKGkpID0+IFtpLnNob3dfaWQsIGkucmF0aW5nXSkpO1xuXG4gICAgY29uc3QgdGFnQ291bnRNYXA6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1cbiAgICA+ID0ge307XG4gICAgY29uc3QgdGFnUmF0aW5nQWNjOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY29sb3I6IHN0cmluZzsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHNob3dUYWdSb3dzID8/IFtdKSB7XG4gICAgICBjb25zdCB0YWcgPSB0YWdNYXAuZ2V0KHJvdy50YWdfaWQpO1xuICAgICAgaWYgKCF0YWcpIGNvbnRpbnVlO1xuXG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICBpZDogdGFnLmlkLFxuICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgICAgdGFnQ291bnRNYXBbcm93LnRhZ19pZF0uY291bnQrKztcblxuICAgICAgY29uc3QgcmF0aW5nID0gc2hvd1JhdGluZ01hcC5nZXQocm93LnNob3dfaWQpO1xuICAgICAgaWYgKHJhdGluZyAhPSBudWxsKSB7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgICAgbmFtZTogdGFnLm5hbWUsXG4gICAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5zdW0gKz0gcmF0aW5nO1xuICAgICAgICB0YWdSYXRpbmdBY2Nbcm93LnRhZ19pZF0uY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWdDb3VudHMucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnQ291bnRNYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KSxcbiAgICApO1xuICAgIHRhZ0F2Z1JhdGluZ3MucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnUmF0aW5nQWNjKVxuICAgICAgICAubWFwKCh0KSA9PiAoe1xuICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgIG5hbWU6IHQubmFtZSxcbiAgICAgICAgICBjb2xvcjogdC5jb2xvcixcbiAgICAgICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHQuc3VtIC8gdC5jb3VudCkgKiAxMCkgLyAxMCxcbiAgICAgICAgICBjb3VudDogdC5jb3VudCxcbiAgICAgICAgfSkpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2Z1JhdGluZyAtIGEuYXZnUmF0aW5nKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVGltZWxpbmU6IGdyb3VwIGJ5IGFkZGVkX2F0IG1vbnRoIChZWVlZLU1NKVxuICBjb25zdCBtb250aGx5TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5hZGRlZF9hdCkgY29udGludWU7XG4gICAgY29uc3QgbW9udGggPSBpdGVtLmFkZGVkX2F0LnNsaWNlKDAsIDcpO1xuICAgIG1vbnRobHlNYXBbbW9udGhdID0gKG1vbnRobHlNYXBbbW9udGhdID8/IDApICsgMTtcbiAgfVxuICBjb25zdCBtb250aGx5QWRkZWQgPSBPYmplY3QuZW50cmllcyhtb250aGx5TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFttb250aCwgY291bnRdKSA9PiAoeyBtb250aCwgY291bnQgfSkpO1xuXG4gIC8vIERlY2FkZSBkaXN0cmlidXRpb246IGdyb3VwIGJ5IGRlY2FkZSBvZiBmaXJzdF9haXJfZGF0ZVxuICBjb25zdCBkZWNhZGVNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgeWVhckNvdW50TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGNvbnN0IGRlY2FkZVJhdGluZ0FjYzogUmVjb3JkPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PiA9IHt9O1xuICBjb25zdCB5ZWFyUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlyc3RBaXJEYXRlID0gaXRlbS5zaG93cz8uZmlyc3RfYWlyX2RhdGU7XG4gICAgaWYgKCFmaXJzdEFpckRhdGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHllYXIgPSBwYXJzZUludChmaXJzdEFpckRhdGUuc2xpY2UoMCwgNCksIDEwKTtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgeWVhciA8IDE5MDApIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlY2FkZSA9IGAke01hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwfXNgO1xuICAgIGNvbnN0IHllYXJTdHIgPSBTdHJpbmcoeWVhcik7XG5cbiAgICBkZWNhZGVNYXBbZGVjYWRlXSA9IChkZWNhZGVNYXBbZGVjYWRlXSA/PyAwKSArIDE7XG4gICAgeWVhckNvdW50TWFwW3llYXJTdHJdID0gKHllYXJDb3VudE1hcFt5ZWFyU3RyXSA/PyAwKSArIDE7XG5cbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdID8/PSB7IHN1bTogMCwgY291bnQ6IDAgfTtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLmNvdW50Kys7XG5cbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXS5zdW0gKz0gaXRlbS5yYXRpbmc7XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjYWRlQ291bnRzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlTWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIGNvdW50XSkgPT4gKHsgZGVjYWRlLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgeWVhckNvdW50cyA9IE9iamVjdC5lbnRyaWVzKHllYXJDb3VudE1hcClcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgY291bnRdKSA9PiAoeyB5ZWFyLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgZGVjYWRlQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKGRlY2FkZVJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbZGVjYWRlLCB7IHN1bSwgY291bnQgfV0pID0+ICh7XG4gICAgICBkZWNhZGUsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICBjb25zdCB5ZWFyQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKHllYXJSYXRpbmdBY2MpXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW3llYXIsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIHllYXIsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICAvLyBCdWlsZCBzaG93IGxvb2t1cCBtYXBzIGZvciBtb2RhbCBkcmlsbC10aHJvdWdoXG4gIGNvbnN0IHNob3dzQnlSYXRpbmc6IFJlY29yZDxudW1iZXIsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGNvbnN0IHNob3dzQnlZZWFyOiBSZWNvcmQ8c3RyaW5nLCBTaG93U3VtbWFyeVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBzdW1tYXJ5OiBTaG93U3VtbWFyeSA9IHtcbiAgICAgIGlkOiBpdGVtLnNob3dzPy5pZCA/PyBpdGVtLnNob3dfaWQsXG4gICAgICB0aXRsZTogaXRlbS5zaG93cz8udGl0bGUgPz8gXCJcIixcbiAgICAgIHBvc3Rlcl9wYXRoOiBpdGVtLnNob3dzPy5wb3N0ZXJfcGF0aCA/PyBudWxsLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZSA/PyBudWxsLFxuICAgIH07XG4gICAgaWYgKGl0ZW0ucmF0aW5nICE9PSBudWxsKSB7XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXSA/Pz0gW107XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXS5wdXNoKHN1bW1hcnkpO1xuICAgIH1cbiAgICBjb25zdCBmYWQgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoZmFkKSB7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZmFkLnNsaWNlKDAsIDQpLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKHkpICYmIHkgPj0gMTkwMCkge1xuICAgICAgICBjb25zdCB5ciA9IFN0cmluZyh5KTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdID8/PSBbXTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdLnB1c2goc3VtbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbENvdW50LFxuICAgIHJhdGVkQ291bnQsXG4gICAgYXZnUmF0aW5nLFxuICAgIHJhdGluZ0NvdW50cyxcbiAgICB0YWdDb3VudHMsXG4gICAgdGFnQXZnUmF0aW5ncyxcbiAgICBtb250aGx5QWRkZWQsXG4gICAgZGVjYWRlQ291bnRzLFxuICAgIHllYXJDb3VudHMsXG4gICAgZGVjYWRlQXZnUmF0aW5ncyxcbiAgICB5ZWFyQXZnUmF0aW5ncyxcbiAgICBzaG93c0J5UmF0aW5nLFxuICAgIHNob3dzQnlZZWFyLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0SXRlbVdpdGhTaG93ID0ge1xuICBpZDogc3RyaW5nO1xuICBsaXN0X2lkOiBzdHJpbmc7XG4gIHNob3dfaWQ6IHN0cmluZztcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBhZGRlZF9hdDogc3RyaW5nO1xuICBub3Rlczogc3RyaW5nIHwgbnVsbDtcbiAgc2hvd3M6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gICAgaW1kYl9pZDogc3RyaW5nIHwgbnVsbDtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xuICAgIHRtZGJfZmV0Y2hlZDogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0SXRlbXNQYWdlKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZSA9IDUwLFxuKTogUHJvbWlzZTx7XG4gIGl0ZW1zOiBMaXN0SXRlbVdpdGhTaG93W107XG4gIGhhc01vcmU6IGJvb2xlYW47XG4gIHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG59PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGNvbnN0IHsgZGF0YTogbGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFsaXN0LmlzX3B1YmxpYyAmJiBsaXN0LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBmcm9tID0gcGFnZSAqIHBhZ2VTaXplO1xuICBjb25zdCB0byA9IGZyb20gKyBwYWdlU2l6ZSAtIDE7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKiwgc2hvd3MoKilcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIGxpc3RJZClcbiAgICAub3JkZXIoXCJyYXRpbmdcIiwgeyBhc2NlbmRpbmc6IGZhbHNlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICBjb25zdCBpdGVtcyA9IChkYXRhID8/IFtdKSBhcyB1bmtub3duIGFzIExpc3RJdGVtV2l0aFNob3dbXTtcbiAgY29uc3QgaGFzTW9yZSA9IGl0ZW1zLmxlbmd0aCA9PT0gcGFnZVNpemU7XG5cbiAgY29uc3Qgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICBpZiAodXNlciAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeyBkYXRhOiBzaG93VGFncyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgdGFnX2lkXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgICAuaW4oXG4gICAgICAgIFwic2hvd19pZFwiLFxuICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd3MuaWQpLFxuICAgICAgKTtcblxuICAgIGZvciAoY29uc3Qgc3Qgb2Ygc2hvd1RhZ3MgPz8gW10pIHtcbiAgICAgIGlmICghc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0pIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdID0gW107XG4gICAgICBzaG93VGFnc01hcFtzdC5zaG93X2lkXS5wdXNoKHN0LnRhZ19pZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXRlbXMsIGhhc01vcmUsIHNob3dUYWdzTWFwIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9NeUxpc3Qoc2hvdzoge1xuICBpZDogc3RyaW5nO1xuICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xufSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgbXlMaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICBpZiAoIW15TGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaG93IGV4aXN0cyBpbiBvdXIgREIgKHJldXNlIGV4aXN0aW5nIG9yIGNyZWF0ZSlcbiAgbGV0IHNob3dJZCA9IHNob3cuaWQ7XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzaG93LmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOlxuICAgICAgICAgIHNob3cudG1kYl9pZCA/P1xuICAgICAgICAgIC0oXG4gICAgICAgICAgICBNYXRoLmFicyhcbiAgICAgICAgICAgICAgc2hvdy50aXRsZVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICAgICksXG4gICAgICAgIGltZGJfaWQ6IHNob3cuaW1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBzaG93SWQgPSBuZXdTaG93IS5pZDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbiAgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRtZGJTaG93VG9NeUxpc3Qoc2hvdzoge1xuICB0bWRiX2lkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBGaW5kIG9yIGNyZWF0ZSB0aGUgc2hvdyBieSB0bWRiX2lkXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBleGlzdGluZ1Nob3chLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUxpc3RUb01pbmUoc291cmNlTGlzdElkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSBzb3VyY2UgbGlzdCBpcyBwdWJsaWMgKG9yIG93bmVkIGJ5IHVzZXIpXG4gIGNvbnN0IHsgZGF0YTogc291cmNlTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCBpc19wdWJsaWMsIHVzZXJfaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzb3VyY2VMaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghc291cmNlTGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghc291cmNlTGlzdC5pc19wdWJsaWMgJiYgc291cmNlTGlzdC51c2VyX2lkICE9PSB1c2VyLmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJPd24gbGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gVmVyaWZ5IG93biBsaXN0IGlzIGVtcHR5XG4gIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpO1xuXG4gIGlmICgoY291bnQgPz8gMCkgPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjb3B5IHRvIGFuIGVtcHR5IGxpc3RcIik7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgICBzaG93X2lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgICBub3RlczogaXRlbS5ub3RlcyxcbiAgICB9KSk7XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLmluc2VydChpbnNlcnRzKTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikgdGhyb3cgbmV3IEVycm9yKGluc2VydEVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IndUQW1zQnNCLDRMQUFBIn0=
}),
"[project]/packages/web/src/app/[locale]/(app)/lists/data:d4f1e1 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addTmdbShowToMyList",
    ()=>$$RSC_SERVER_ACTION_10
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40cfadb10f9d88eaf6eeac96885eeb3564c8662dbc":"addTmdbShowToMyList"},"packages/web/src/app/[locale]/(app)/lists/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40cfadb10f9d88eaf6eeac96885eeb3564c8662dbc", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addTmdbShowToMyList");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBIZWxwZXI6IGdldCB0aGUgdXNlcidzIHNpbmdsZSBsaXN0XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyTGlzdChcbiAgc3VwYWJhc2U6IEF3YWl0ZWQ8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50Pj4sXG4gIHVzZXJJZDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXG4gICAgLnNpbmdsZSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICB1cGRhdGVzOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyBpc19wdWJsaWM/OiBib29sZWFuIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0c1wiKVxuICAgIC51cGRhdGUodXBkYXRlcylcbiAgICAuZXEoXCJpZFwiLCBsaXN0SWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VyLmlkKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNob3dUb0xpc3QoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBzaG93OiB7XG4gICAgdG1kYl9pZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgZmlyc3RfYWlyX2RhdGU/OiBzdHJpbmc7XG4gICAgb3ZlcnZpZXc/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFVwc2VydCBzaG93IGluIHNob3dzIHRhYmxlXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSB8fCBudWxsLFxuICAgICAgICBvdmVydmlldzogc2hvdy5vdmVydmlldyB8fCBudWxsLFxuICAgICAgfSlcbiAgICAgIC5zZWxlY3QoKVxuICAgICAgLnNpbmdsZSgpO1xuXG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZHVwbGljYXRlIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5lcShcInNob3dfaWRcIiwgZXhpc3RpbmdTaG93IS5pZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGR1cGxpY2F0ZSkgcmV0dXJuO1xuXG4gIC8vIEdldCBtYXggcG9zaXRpb24gaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbGlzdElkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IGxpc3RJZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmVTaG93RnJvbUxpc3QobGlzdElkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5kZWxldGUoKS5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dSYXRpbmcoXG4gIGxpc3RJZDogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgcmF0aW5nOiBudW1iZXIsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIGlmIChyYXRpbmcgPCAxIHx8IHJhdGluZyA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoXCJSYXRpbmcgbXVzdCBiZSAxLTEwXCIpO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnVwZGF0ZSh7IHJhdGluZyB9KVxuICAgIC5lcShcImlkXCIsIGl0ZW1JZCk7XG5cbiAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNob3dOb3RlcyhcbiAgbGlzdElkOiBzdHJpbmcsXG4gIGl0ZW1JZDogc3RyaW5nLFxuICBub3Rlczogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC51cGRhdGUoeyBub3Rlczogbm90ZXMudHJpbSgpIHx8IG51bGwgfSlcbiAgICAuZXEoXCJpZFwiLCBpdGVtSWQpO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKGAvbGlzdHMvJHtsaXN0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW9yZGVyTGlzdEl0ZW1zKGxpc3RJZDogc3RyaW5nLCBpdGVtSWRzOiBzdHJpbmdbXSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgLy8gVXBkYXRlIHBvc2l0aW9uc1xuICBjb25zdCB1cGRhdGVzID0gaXRlbUlkcy5tYXAoKGlkLCBpbmRleCkgPT5cbiAgICBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS51cGRhdGUoeyBwb3NpdGlvbjogaW5kZXggfSkuZXEoXCJpZFwiLCBpZCksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwodXBkYXRlcyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoYC9saXN0cy8ke2xpc3RJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFRvTXlMaXN0KGpzb25EYXRhOiB1bmtub3duKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCB7IHBhcnNlVHJha3RKc29uIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9pbXBvcnQvdHJha3QtcGFyc2VyXCIpO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVRyYWt0SnNvbihqc29uRGF0YSk7XG4gIGNvbnN0IGlzTWFsSW1wb3J0ID0gcGFyc2VkLm5hbWUgPT09IFwiTXlBbmltZUxpc3QgSW1wb3J0XCI7XG5cbiAgbGV0IGFuaW1lVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoaXNNYWxJbXBvcnQpIHtcbiAgICBjb25zdCB7IGRhdGE6IGFuaW1lVGFnIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJ0YWdzXCIpXG4gICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgIC5lcShcImlzX2RlZmF1bHRcIiwgdHJ1ZSlcbiAgICAgIC5pbGlrZShcIm5hbWVcIiwgXCJhbmltZVwiKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBhbmltZVRhZ0lkID0gYW5pbWVUYWc/LmlkID8/IG51bGw7XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBtYXggcG9zaXRpb24gaW4gdGhlIHVzZXIncyBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwicG9zaXRpb25cIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIG15TGlzdC5pZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAubGltaXQoMSk7XG5cbiAgbGV0IHBvc2l0aW9uID0gKGV4aXN0aW5nSXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcbiAgbGV0IGltcG9ydGVkQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3Qgc2hvdyBvZiBwYXJzZWQuc2hvd3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRiU2hvd0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgZXhpc3Rpbmcgc2hvdyBieSBpbWRiX2lkIGZpcnN0LCB0aGVuIGJ5IGV4YWN0IHRpdGxlXG4gICAgICBpZiAoc2hvdy5pbWRiX2lkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5lcShcImltZGJfaWRcIiwgc2hvdy5pbWRiX2lkKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAgICAgICAuaWxpa2UoXCJ0aXRsZVwiLCBzaG93LnRpdGxlKVxuICAgICAgICAgIC5saW1pdCgxKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBleGlzdGluZz8uaWQgPz8gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSW5zZXJ0IG5ldyBzaG93IGlmIG5vdCBmb3VuZFxuICAgICAgaWYgKCFkYlNob3dJZCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRtZGJJZCA9IC0oXG4gICAgICAgICAgTWF0aC5hYnMoXG4gICAgICAgICAgICBzaG93LnRpdGxlLnNwbGl0KFwiXCIpLnJlZHVjZSgoYSwgYykgPT4gYSArIGMuY2hhckNvZGVBdCgwKSAqIDMxLCAwKSxcbiAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG5ld1Nob3cgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgICAgICBpbWRiX2lkOiBzaG93LmltZGJfaWQsXG4gICAgICAgICAgICB0bWRiX2lkOiBwbGFjZWhvbGRlclRtZGJJZCxcbiAgICAgICAgICAgIHBvc3Rlcl9wYXRoOiBudWxsLFxuICAgICAgICAgICAgZmlyc3RfYWlyX2RhdGU6IG51bGwsXG4gICAgICAgICAgICBvdmVydmlldzogbnVsbCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgICAgIC5zaW5nbGUoKTtcbiAgICAgICAgZGJTaG93SWQgPSBuZXdTaG93Py5pZCA/PyBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGJTaG93SWQpIHtcbiAgICAgICAgLy8gU2tpcCBpZiBzaG93IGFscmVhZHkgaW4gbGlzdCAodW5pcXVlIGNvbnN0cmFpbnQpXG4gICAgICAgIGNvbnN0IHJhdGluZyA9XG4gICAgICAgICAgdHlwZW9mIHNob3cuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgc2hvdy5zY29yZSA+PSAxICYmIHNob3cuc2NvcmUgPD0gMTBcbiAgICAgICAgICAgID8gc2hvdy5zY29yZVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgICAgIC5pbnNlcnQoeyBsaXN0X2lkOiBteUxpc3QuaWQsIHNob3dfaWQ6IGRiU2hvd0lkLCBwb3NpdGlvbiwgcmF0aW5nIH0pO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgaWYgKGFuaW1lVGFnSWQpIHtcbiAgICAgICAgICAgIC8vIEJlc3QtZWZmb3J0OiBrZWVwIGltcG9ydCByZXNpbGllbnQgZXZlbiBpZiB0YWcgYXNzaWdubWVudCBmYWlscy5cbiAgICAgICAgICAgIGF3YWl0IHN1cGFiYXNlLmZyb20oXCJzaG93X3RhZ3NcIikuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgc2hvd19pZDogZGJTaG93SWQsXG4gICAgICAgICAgICAgIHRhZ19pZDogYW5pbWVUYWdJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgaW1wb3J0ZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2hvdzogJHtzaG93LnRpdGxlfWAsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBpbXBvcnRlZENvdW50IH07XG59XG5cbmV4cG9ydCB0eXBlIFNob3dTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIEFuYWx5dGljc0RhdGEgPSB7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgcmF0ZWRDb3VudDogbnVtYmVyO1xuICBhdmdSYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIHJhdGluZ0NvdW50czogeyByYXRpbmc6IG51bWJlcjsgY291bnQ6IG51bWJlciB9W107XG4gIHRhZ0NvdW50czogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICB0YWdBdmdSYXRpbmdzOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBhdmdSYXRpbmc6IG51bWJlcjtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9W107XG4gIG1vbnRobHlBZGRlZDogeyBtb250aDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgZGVjYWRlQ291bnRzOiB7IGRlY2FkZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXTtcbiAgeWVhckNvdW50czogeyB5ZWFyOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfVtdO1xuICBkZWNhZGVBdmdSYXRpbmdzOiB7IGRlY2FkZTogc3RyaW5nOyBhdmdSYXRpbmc6IG51bWJlciB9W107XG4gIHllYXJBdmdSYXRpbmdzOiB7IHllYXI6IHN0cmluZzsgYXZnUmF0aW5nOiBudW1iZXIgfVtdO1xuICBzaG93c0J5UmF0aW5nOiBSZWNvcmQ8bnVtYmVyLCBTaG93U3VtbWFyeVtdPjtcbiAgc2hvd3NCeVllYXI6IFJlY29yZDxzdHJpbmcsIFNob3dTdW1tYXJ5W10+O1xuICAvLyBTZWFzb24gLyBkdXJhdGlvbiBzdGF0c1xuICBtb3N0U2Vhc29uc1Nob3c6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xuICBtb3N0U2Vhc29uc0J5WWVhcjoge1xuICAgIHllYXI6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgc2Vhc29uQ291bnQ6IG51bWJlcjtcbiAgfVtdO1xuICBsb25nZXN0U2hvdzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgICB0b3RhbE1pbnV0ZXM6IG51bWJlcjtcbiAgICByYXRpbmc6IG51bWJlciB8IG51bGw7XG4gIH0gfCBudWxsO1xufTtcblxuY29uc3QgRU1QVFlfQU5BTFlUSUNTOiBBbmFseXRpY3NEYXRhID0ge1xuICB0b3RhbENvdW50OiAwLFxuICByYXRlZENvdW50OiAwLFxuICBhdmdSYXRpbmc6IG51bGwsXG4gIHJhdGluZ0NvdW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+ICh7XG4gICAgcmF0aW5nOiBpICsgMSxcbiAgICBjb3VudDogMCxcbiAgfSkpLFxuICB0YWdDb3VudHM6IFtdLFxuICB0YWdBdmdSYXRpbmdzOiBbXSxcbiAgbW9udGhseUFkZGVkOiBbXSxcbiAgZGVjYWRlQ291bnRzOiBbXSxcbiAgeWVhckNvdW50czogW10sXG4gIGRlY2FkZUF2Z1JhdGluZ3M6IFtdLFxuICB5ZWFyQXZnUmF0aW5nczogW10sXG4gIHNob3dzQnlSYXRpbmc6IHt9LFxuICBzaG93c0J5WWVhcjoge30sXG59O1xuXG4vKipcbiAqIFJldHVybnMgYW5hbHl0aWNzIGZvciBhIGxpc3QuXG4gKiAtIE5vIGxpc3RJZCDihpIgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIG93biBsaXN0LlxuICogLSBXaXRoIGxpc3RJZCDihpIgYW55IHB1YmxpYyBsaXN0IChvd25lcidzIHRhZ3MgYXJlIHNob3duKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpc3RBbmFseXRpY3MoXG4gIGxpc3RJZD86IHN0cmluZyxcbik6IFByb21pc2U8QW5hbHl0aWNzRGF0YT4ge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcblxuICBsZXQgcmVzb2x2ZWRMaXN0SWQ6IHN0cmluZztcbiAgbGV0IG93bmVySWQ6IHN0cmluZztcblxuICBpZiAobGlzdElkKSB7XG4gICAgLy8gVmlld2luZyBzb21lb25lIGVsc2UncyAob3Igb3duKSBsaXN0IGJ5IGV4cGxpY2l0IGlkXG4gICAgY29uc3QgeyBkYXRhOiBsaXN0Um93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJsaXN0c1wiKVxuICAgICAgLnNlbGVjdChcImlkLCB1c2VyX2lkLCBpc19wdWJsaWNcIilcbiAgICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoIWxpc3RSb3cpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgLy8gT25seSBhbGxvdyBhY2Nlc3MgaWYgcHVibGljIG9yIG93bmVkIGJ5IHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGlmICghbGlzdFJvdy5pc19wdWJsaWMgJiYgbGlzdFJvdy51c2VyX2lkICE9PSB1c2VyPy5pZClcbiAgICAgIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0Um93LmlkO1xuICAgIG93bmVySWQgPSBsaXN0Um93LnVzZXJfaWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG4gICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFVzZXJMaXN0KHN1cGFiYXNlLCB1c2VyLmlkKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybiBFTVBUWV9BTkFMWVRJQ1M7XG4gICAgcmVzb2x2ZWRMaXN0SWQgPSBsaXN0LmlkO1xuICAgIG93bmVySWQgPSB1c2VyLmlkO1xuICB9XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIChubyBwYWdpbmF0aW9uKSDigJQgcmF0aW5nLCBzaG93X2lkLCBhZGRlZF9hdCwgZmlyc3RfYWlyX2RhdGUgdmlhIGpvaW5cbiAgdHlwZSBSYXdJdGVtID0ge1xuICAgIHJhdGluZzogbnVtYmVyIHwgbnVsbDtcbiAgICBzaG93X2lkOiBzdHJpbmc7XG4gICAgYWRkZWRfYXQ6IHN0cmluZyB8IG51bGw7XG4gICAgc2hvd3M6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgcG9zdGVyX3BhdGg6IHN0cmluZyB8IG51bGw7XG4gICAgICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgICB9IHwgbnVsbDtcbiAgfTtcbiAgY29uc3QgeyBkYXRhOiByYXdJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFxuICAgICAgXCJyYXRpbmcsIHNob3dfaWQsIGFkZGVkX2F0LCBzaG93cyhpZCwgdGl0bGUsIHBvc3Rlcl9wYXRoLCBmaXJzdF9haXJfZGF0ZSlcIixcbiAgICApXG4gICAgLmVxKFwibGlzdF9pZFwiLCByZXNvbHZlZExpc3RJZCk7XG5cbiAgY29uc3QgaXRlbXMgPSAocmF3SXRlbXMgPz8gW10pIGFzIFJhd0l0ZW1bXTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcmF0ZWRSb3dzID0gaXRlbXMuZmlsdGVyKChyKSA9PiByLnJhdGluZyAhPT0gbnVsbCk7XG4gIGNvbnN0IHJhdGVkQ291bnQgPSByYXRlZFJvd3MubGVuZ3RoO1xuICBjb25zdCBhdmdSYXRpbmcgPVxuICAgIHJhdGVkQ291bnQgPiAwXG4gICAgICA/IE1hdGgucm91bmQoXG4gICAgICAgICAgKHJhdGVkUm93cy5yZWR1Y2UoKHMsIHIpID0+IHMgKyByLnJhdGluZyEsIDApIC8gcmF0ZWRDb3VudCkgKiAxMCxcbiAgICAgICAgKSAvIDEwXG4gICAgICA6IG51bGw7XG5cbiAgLy8gUmF0aW5nIGRpc3RyaWJ1dGlvblxuICBjb25zdCByYXRpbmdNYXA6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcbiAgZm9yIChsZXQgciA9IDE7IHIgPD0gMTA7IHIrKykgcmF0aW5nTWFwW3JdID0gMDtcbiAgZm9yIChjb25zdCByb3cgb2YgaXRlbXMpIHtcbiAgICBpZiAocm93LnJhdGluZyAhPT0gbnVsbClcbiAgICAgIHJhdGluZ01hcFtyb3cucmF0aW5nXSA9IChyYXRpbmdNYXBbcm93LnJhdGluZ10gPz8gMCkgKyAxO1xuICB9XG4gIGNvbnN0IHJhdGluZ0NvdW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICAgIHJhdGluZzogaSArIDEsXG4gICAgY291bnQ6IHJhdGluZ01hcFtpICsgMV0sXG4gIH0pKTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uIOKAlCB1c2UgdGhlIGxpc3Qgb3duZXIncyB0YWdzXG4gIGNvbnN0IHNob3dJZHMgPSBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd19pZCk7XG4gIGNvbnN0IHRhZ0NvdW50czogQW5hbHl0aWNzRGF0YVtcInRhZ0NvdW50c1wiXSA9IFtdO1xuICBjb25zdCB0YWdBdmdSYXRpbmdzOiBBbmFseXRpY3NEYXRhW1widGFnQXZnUmF0aW5nc1wiXSA9IFtdO1xuXG4gIGlmIChzaG93SWRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBbeyBkYXRhOiBzaG93VGFnUm93cyB9LCB7IGRhdGE6IHRhZ0RlZnMgfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdXBhYmFzZVxuICAgICAgICAuZnJvbShcInNob3dfdGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwidGFnX2lkLCBzaG93X2lkXCIpXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgb3duZXJJZClcbiAgICAgICAgLmluKFwic2hvd19pZFwiLCBzaG93SWRzKSxcbiAgICAgIHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKFwidGFnc1wiKVxuICAgICAgICAuc2VsZWN0KFwiaWQsIG5hbWUsIGNvbG9yXCIpXG4gICAgICAgIC5vcihgaXNfZGVmYXVsdC5lcS50cnVlLHVzZXJfaWQuZXEuJHtvd25lcklkfWApLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGFnTWFwID0gbmV3IE1hcCgodGFnRGVmcyA/PyBbXSkubWFwKCh0KSA9PiBbdC5pZCwgdF0pKTtcbiAgICBjb25zdCBzaG93UmF0aW5nTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoKGkpID0+IFtpLnNob3dfaWQsIGkucmF0aW5nXSkpO1xuXG4gICAgY29uc3QgdGFnQ291bnRNYXA6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1cbiAgICA+ID0ge307XG4gICAgY29uc3QgdGFnUmF0aW5nQWNjOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY29sb3I6IHN0cmluZzsgc3VtOiBudW1iZXI7IGNvdW50OiBudW1iZXIgfVxuICAgID4gPSB7fTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHNob3dUYWdSb3dzID8/IFtdKSB7XG4gICAgICBjb25zdCB0YWcgPSB0YWdNYXAuZ2V0KHJvdy50YWdfaWQpO1xuICAgICAgaWYgKCF0YWcpIGNvbnRpbnVlO1xuXG4gICAgICB0YWdDb3VudE1hcFtyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICBpZDogdGFnLmlkLFxuICAgICAgICBuYW1lOiB0YWcubmFtZSxcbiAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgY291bnQ6IDAsXG4gICAgICB9O1xuICAgICAgdGFnQ291bnRNYXBbcm93LnRhZ19pZF0uY291bnQrKztcblxuICAgICAgY29uc3QgcmF0aW5nID0gc2hvd1JhdGluZ01hcC5nZXQocm93LnNob3dfaWQpO1xuICAgICAgaWYgKHJhdGluZyAhPSBudWxsKSB7XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXSA/Pz0ge1xuICAgICAgICAgIGlkOiB0YWcuaWQsXG4gICAgICAgICAgbmFtZTogdGFnLm5hbWUsXG4gICAgICAgICAgY29sb3I6IHRhZy5jb2xvcixcbiAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRhZ1JhdGluZ0FjY1tyb3cudGFnX2lkXS5zdW0gKz0gcmF0aW5nO1xuICAgICAgICB0YWdSYXRpbmdBY2Nbcm93LnRhZ19pZF0uY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YWdDb3VudHMucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnQ291bnRNYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KSxcbiAgICApO1xuICAgIHRhZ0F2Z1JhdGluZ3MucHVzaChcbiAgICAgIC4uLk9iamVjdC52YWx1ZXModGFnUmF0aW5nQWNjKVxuICAgICAgICAubWFwKCh0KSA9PiAoe1xuICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgIG5hbWU6IHQubmFtZSxcbiAgICAgICAgICBjb2xvcjogdC5jb2xvcixcbiAgICAgICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHQuc3VtIC8gdC5jb3VudCkgKiAxMCkgLyAxMCxcbiAgICAgICAgICBjb3VudDogdC5jb3VudCxcbiAgICAgICAgfSkpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmF2Z1JhdGluZyAtIGEuYXZnUmF0aW5nKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVGltZWxpbmU6IGdyb3VwIGJ5IGFkZGVkX2F0IG1vbnRoIChZWVlZLU1NKVxuICBjb25zdCBtb250aGx5TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5hZGRlZF9hdCkgY29udGludWU7XG4gICAgY29uc3QgbW9udGggPSBpdGVtLmFkZGVkX2F0LnNsaWNlKDAsIDcpO1xuICAgIG1vbnRobHlNYXBbbW9udGhdID0gKG1vbnRobHlNYXBbbW9udGhdID8/IDApICsgMTtcbiAgfVxuICBjb25zdCBtb250aGx5QWRkZWQgPSBPYmplY3QuZW50cmllcyhtb250aGx5TWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFttb250aCwgY291bnRdKSA9PiAoeyBtb250aCwgY291bnQgfSkpO1xuXG4gIC8vIERlY2FkZSBkaXN0cmlidXRpb246IGdyb3VwIGJ5IGRlY2FkZSBvZiBmaXJzdF9haXJfZGF0ZVxuICBjb25zdCBkZWNhZGVNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgY29uc3QgeWVhckNvdW50TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGNvbnN0IGRlY2FkZVJhdGluZ0FjYzogUmVjb3JkPHN0cmluZywgeyBzdW06IG51bWJlcjsgY291bnQ6IG51bWJlciB9PiA9IHt9O1xuICBjb25zdCB5ZWFyUmF0aW5nQWNjOiBSZWNvcmQ8c3RyaW5nLCB7IHN1bTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+ID0ge307XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlyc3RBaXJEYXRlID0gaXRlbS5zaG93cz8uZmlyc3RfYWlyX2RhdGU7XG4gICAgaWYgKCFmaXJzdEFpckRhdGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHllYXIgPSBwYXJzZUludChmaXJzdEFpckRhdGUuc2xpY2UoMCwgNCksIDEwKTtcbiAgICBpZiAoaXNOYU4oeWVhcikgfHwgeWVhciA8IDE5MDApIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlY2FkZSA9IGAke01hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwfXNgO1xuICAgIGNvbnN0IHllYXJTdHIgPSBTdHJpbmcoeWVhcik7XG5cbiAgICBkZWNhZGVNYXBbZGVjYWRlXSA9IChkZWNhZGVNYXBbZGVjYWRlXSA/PyAwKSArIDE7XG4gICAgeWVhckNvdW50TWFwW3llYXJTdHJdID0gKHllYXJDb3VudE1hcFt5ZWFyU3RyXSA/PyAwKSArIDE7XG5cbiAgICBpZiAoaXRlbS5yYXRpbmcgIT09IG51bGwpIHtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdID8/PSB7IHN1bTogMCwgY291bnQ6IDAgfTtcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLnN1bSArPSBpdGVtLnJhdGluZztcbiAgICAgIGRlY2FkZVJhdGluZ0FjY1tkZWNhZGVdLmNvdW50Kys7XG5cbiAgICAgIHllYXJSYXRpbmdBY2NbeWVhclN0cl0gPz89IHsgc3VtOiAwLCBjb3VudDogMCB9O1xuICAgICAgeWVhclJhdGluZ0FjY1t5ZWFyU3RyXS5zdW0gKz0gaXRlbS5yYXRpbmc7XG4gICAgICB5ZWFyUmF0aW5nQWNjW3llYXJTdHJdLmNvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjYWRlQ291bnRzID0gT2JqZWN0LmVudHJpZXMoZGVjYWRlTWFwKVxuICAgIC5zb3J0KChbYV0sIFtiXSkgPT4gYS5sb2NhbGVDb21wYXJlKGIpKVxuICAgIC5tYXAoKFtkZWNhZGUsIGNvdW50XSkgPT4gKHsgZGVjYWRlLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgeWVhckNvdW50cyA9IE9iamVjdC5lbnRyaWVzKHllYXJDb3VudE1hcClcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbeWVhciwgY291bnRdKSA9PiAoeyB5ZWFyLCBjb3VudCB9KSk7XG5cbiAgY29uc3QgZGVjYWRlQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKGRlY2FkZVJhdGluZ0FjYylcbiAgICAuc29ydCgoW2FdLCBbYl0pID0+IGEubG9jYWxlQ29tcGFyZShiKSlcbiAgICAubWFwKChbZGVjYWRlLCB7IHN1bSwgY291bnQgfV0pID0+ICh7XG4gICAgICBkZWNhZGUsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICBjb25zdCB5ZWFyQXZnUmF0aW5ncyA9IE9iamVjdC5lbnRyaWVzKHllYXJSYXRpbmdBY2MpXG4gICAgLnNvcnQoKFthXSwgW2JdKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgLm1hcCgoW3llYXIsIHsgc3VtLCBjb3VudCB9XSkgPT4gKHtcbiAgICAgIHllYXIsXG4gICAgICBhdmdSYXRpbmc6IE1hdGgucm91bmQoKHN1bSAvIGNvdW50KSAqIDEwKSAvIDEwLFxuICAgIH0pKTtcblxuICAvLyBCdWlsZCBzaG93IGxvb2t1cCBtYXBzIGZvciBtb2RhbCBkcmlsbC10aHJvdWdoXG4gIGNvbnN0IHNob3dzQnlSYXRpbmc6IFJlY29yZDxudW1iZXIsIFNob3dTdW1tYXJ5W10+ID0ge307XG4gIGNvbnN0IHNob3dzQnlZZWFyOiBSZWNvcmQ8c3RyaW5nLCBTaG93U3VtbWFyeVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBzdW1tYXJ5OiBTaG93U3VtbWFyeSA9IHtcbiAgICAgIGlkOiBpdGVtLnNob3dzPy5pZCA/PyBpdGVtLnNob3dfaWQsXG4gICAgICB0aXRsZTogaXRlbS5zaG93cz8udGl0bGUgPz8gXCJcIixcbiAgICAgIHBvc3Rlcl9wYXRoOiBpdGVtLnNob3dzPy5wb3N0ZXJfcGF0aCA/PyBudWxsLFxuICAgICAgcmF0aW5nOiBpdGVtLnJhdGluZyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZSA/PyBudWxsLFxuICAgIH07XG4gICAgaWYgKGl0ZW0ucmF0aW5nICE9PSBudWxsKSB7XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXSA/Pz0gW107XG4gICAgICBzaG93c0J5UmF0aW5nW2l0ZW0ucmF0aW5nXS5wdXNoKHN1bW1hcnkpO1xuICAgIH1cbiAgICBjb25zdCBmYWQgPSBpdGVtLnNob3dzPy5maXJzdF9haXJfZGF0ZTtcbiAgICBpZiAoZmFkKSB7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZmFkLnNsaWNlKDAsIDQpLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKHkpICYmIHkgPj0gMTkwMCkge1xuICAgICAgICBjb25zdCB5ciA9IFN0cmluZyh5KTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdID8/PSBbXTtcbiAgICAgICAgc2hvd3NCeVllYXJbeXJdLnB1c2goc3VtbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbENvdW50LFxuICAgIHJhdGVkQ291bnQsXG4gICAgYXZnUmF0aW5nLFxuICAgIHJhdGluZ0NvdW50cyxcbiAgICB0YWdDb3VudHMsXG4gICAgdGFnQXZnUmF0aW5ncyxcbiAgICBtb250aGx5QWRkZWQsXG4gICAgZGVjYWRlQ291bnRzLFxuICAgIHllYXJDb3VudHMsXG4gICAgZGVjYWRlQXZnUmF0aW5ncyxcbiAgICB5ZWFyQXZnUmF0aW5ncyxcbiAgICBzaG93c0J5UmF0aW5nLFxuICAgIHNob3dzQnlZZWFyLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0SXRlbVdpdGhTaG93ID0ge1xuICBpZDogc3RyaW5nO1xuICBsaXN0X2lkOiBzdHJpbmc7XG4gIHNob3dfaWQ6IHN0cmluZztcbiAgcmF0aW5nOiBudW1iZXIgfCBudWxsO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBhZGRlZF9hdDogc3RyaW5nO1xuICBub3Rlczogc3RyaW5nIHwgbnVsbDtcbiAgc2hvd3M6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRtZGJfaWQ6IG51bWJlciB8IG51bGw7XG4gICAgaW1kYl9pZDogc3RyaW5nIHwgbnVsbDtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICAgIGZpcnN0X2Fpcl9kYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xuICAgIHRtZGJfZmV0Y2hlZDogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaXN0SXRlbXNQYWdlKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZSA9IDUwLFxuKTogUHJvbWlzZTx7XG4gIGl0ZW1zOiBMaXN0SXRlbVdpdGhTaG93W107XG4gIGhhc01vcmU6IGJvb2xlYW47XG4gIHNob3dUYWdzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG59PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuXG4gIGNvbnN0IHsgZGF0YTogbGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcInVzZXJfaWQsIGlzX3B1YmxpY1wiKVxuICAgIC5lcShcImlkXCIsIGxpc3RJZClcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcbiAgaWYgKCFsaXN0LmlzX3B1YmxpYyAmJiBsaXN0LnVzZXJfaWQgIT09IHVzZXI/LmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBmcm9tID0gcGFnZSAqIHBhZ2VTaXplO1xuICBjb25zdCB0byA9IGZyb20gKyBwYWdlU2l6ZSAtIDE7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKiwgc2hvd3MoKilcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIGxpc3RJZClcbiAgICAub3JkZXIoXCJyYXRpbmdcIiwgeyBhc2NlbmRpbmc6IGZhbHNlLCBudWxsc0ZpcnN0OiBmYWxzZSB9KVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiB0cnVlIH0pXG4gICAgLnJhbmdlKGZyb20sIHRvKTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICBjb25zdCBpdGVtcyA9IChkYXRhID8/IFtdKSBhcyB1bmtub3duIGFzIExpc3RJdGVtV2l0aFNob3dbXTtcbiAgY29uc3QgaGFzTW9yZSA9IGl0ZW1zLmxlbmd0aCA9PT0gcGFnZVNpemU7XG5cbiAgY29uc3Qgc2hvd1RhZ3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICBpZiAodXNlciAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeyBkYXRhOiBzaG93VGFncyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd190YWdzXCIpXG4gICAgICAuc2VsZWN0KFwic2hvd19pZCwgdGFnX2lkXCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXIuaWQpXG4gICAgICAuaW4oXG4gICAgICAgIFwic2hvd19pZFwiLFxuICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkuc2hvd3MuaWQpLFxuICAgICAgKTtcblxuICAgIGZvciAoY29uc3Qgc3Qgb2Ygc2hvd1RhZ3MgPz8gW10pIHtcbiAgICAgIGlmICghc2hvd1RhZ3NNYXBbc3Quc2hvd19pZF0pIHNob3dUYWdzTWFwW3N0LnNob3dfaWRdID0gW107XG4gICAgICBzaG93VGFnc01hcFtzdC5zaG93X2lkXS5wdXNoKHN0LnRhZ19pZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXRlbXMsIGhhc01vcmUsIHNob3dUYWdzTWFwIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaG93VG9NeUxpc3Qoc2hvdzoge1xuICBpZDogc3RyaW5nO1xuICB0bWRiX2lkOiBudW1iZXIgfCBudWxsO1xuICBpbWRiX2lkOiBzdHJpbmcgfCBudWxsO1xuICB0aXRsZTogc3RyaW5nO1xuICBwb3N0ZXJfcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgZmlyc3RfYWlyX2RhdGU6IHN0cmluZyB8IG51bGw7XG4gIG92ZXJ2aWV3OiBzdHJpbmcgfCBudWxsO1xufSkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWRcIik7XG5cbiAgY29uc3QgbXlMaXN0ID0gYXdhaXQgZ2V0VXNlckxpc3Qoc3VwYWJhc2UsIHVzZXIuaWQpO1xuICBpZiAoIW15TGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaG93IGV4aXN0cyBpbiBvdXIgREIgKHJldXNlIGV4aXN0aW5nIG9yIGNyZWF0ZSlcbiAgbGV0IHNob3dJZCA9IHNob3cuaWQ7XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdTaG93IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAuc2VsZWN0KFwiaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzaG93LmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoIWV4aXN0aW5nU2hvdykge1xuICAgIGNvbnN0IHsgZGF0YTogbmV3U2hvdywgZXJyb3I6IHNob3dFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic2hvd3NcIilcbiAgICAgIC5pbnNlcnQoe1xuICAgICAgICB0bWRiX2lkOlxuICAgICAgICAgIHNob3cudG1kYl9pZCA/P1xuICAgICAgICAgIC0oXG4gICAgICAgICAgICBNYXRoLmFicyhcbiAgICAgICAgICAgICAgc2hvdy50aXRsZVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGMpID0+IGEgKyBjLmNoYXJDb2RlQXQoMCkgKiAzMSwgMCksXG4gICAgICAgICAgICApICUgMjAwMDAwMDAwMFxuICAgICAgICAgICksXG4gICAgICAgIGltZGJfaWQ6IHNob3cuaW1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBzaG93SWQgPSBuZXdTaG93IS5pZDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxuICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5lcShcInNob3dfaWRcIiwgc2hvd0lkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICAvLyBHZXQgbWF4IHBvc2l0aW9uXG4gIGNvbnN0IHsgZGF0YTogaXRlbXMgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcInBvc2l0aW9uXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLm9yZGVyKFwicG9zaXRpb25cIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgLmxpbWl0KDEpO1xuXG4gIGNvbnN0IG5leHRQb3NpdGlvbiA9IChpdGVtcz8uWzBdPy5wb3NpdGlvbiA/PyAtMSkgKyAxO1xuXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsaXN0X2l0ZW1zXCIpLmluc2VydCh7XG4gICAgbGlzdF9pZDogbXlMaXN0LmlkLFxuICAgIHNob3dfaWQ6IHNob3dJZCxcbiAgICBwb3NpdGlvbjogbmV4dFBvc2l0aW9uLFxuICB9KTtcblxuICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9saXN0c1wiKTtcbiAgcmV0dXJuIHsgYWxyZWFkeUV4aXN0czogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRtZGJTaG93VG9NeUxpc3Qoc2hvdzoge1xuICB0bWRiX2lkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHBvc3Rlcl9wYXRoOiBzdHJpbmcgfCBudWxsO1xuICBmaXJzdF9haXJfZGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnZpZXc6IHN0cmluZyB8IG51bGw7XG59KSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB7IHVzZXIgfSxcbiAgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG5vdCBmb3VuZFwiKTtcblxuICAvLyBGaW5kIG9yIGNyZWF0ZSB0aGUgc2hvdyBieSB0bWRiX2lkXG4gIGxldCB7IGRhdGE6IGV4aXN0aW5nU2hvdyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcInNob3dzXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwidG1kYl9pZFwiLCBzaG93LnRtZGJfaWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghZXhpc3RpbmdTaG93KSB7XG4gICAgY29uc3QgeyBkYXRhOiBuZXdTaG93LCBlcnJvcjogc2hvd0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJzaG93c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIHRtZGJfaWQ6IHNob3cudG1kYl9pZCxcbiAgICAgICAgdGl0bGU6IHNob3cudGl0bGUsXG4gICAgICAgIHBvc3Rlcl9wYXRoOiBzaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgICBmaXJzdF9haXJfZGF0ZTogc2hvdy5maXJzdF9haXJfZGF0ZSxcbiAgICAgICAgb3ZlcnZpZXc6IHNob3cub3ZlcnZpZXcsXG4gICAgICB9KVxuICAgICAgLnNlbGVjdChcImlkXCIpXG4gICAgICAuc2luZ2xlKCk7XG4gICAgaWYgKHNob3dFcnJvcikgdGhyb3cgbmV3IEVycm9yKHNob3dFcnJvci5tZXNzYWdlKTtcbiAgICBleGlzdGluZ1Nob3cgPSBuZXdTaG93O1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcImlkXCIpXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpXG4gICAgLmVxKFwic2hvd19pZFwiLCBleGlzdGluZ1Nob3chLmlkKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXhpc3RpbmcpIHJldHVybiB7IGFscmVhZHlFeGlzdHM6IHRydWUgfTtcblxuICBjb25zdCB7IGRhdGE6IGl0ZW1zIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgIC5zZWxlY3QoXCJwb3NpdGlvblwiKVxuICAgIC5lcShcImxpc3RfaWRcIiwgbXlMaXN0LmlkKVxuICAgIC5vcmRlcihcInBvc2l0aW9uXCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgIC5saW1pdCgxKTtcblxuICBjb25zdCBuZXh0UG9zaXRpb24gPSAoaXRlbXM/LlswXT8ucG9zaXRpb24gPz8gLTEpICsgMTtcblxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwibGlzdF9pdGVtc1wiKS5pbnNlcnQoe1xuICAgIGxpc3RfaWQ6IG15TGlzdC5pZCxcbiAgICBzaG93X2lkOiBleGlzdGluZ1Nob3chLmlkLFxuICAgIHBvc2l0aW9uOiBuZXh0UG9zaXRpb24sXG4gIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2xpc3RzXCIpO1xuICByZXR1cm4geyBhbHJlYWR5RXhpc3RzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weUxpc3RUb01pbmUoc291cmNlTGlzdElkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHsgdXNlciB9LFxuICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuXG4gIC8vIFZlcmlmeSBzb3VyY2UgbGlzdCBpcyBwdWJsaWMgKG9yIG93bmVkIGJ5IHVzZXIpXG4gIGNvbnN0IHsgZGF0YTogc291cmNlTGlzdCB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RzXCIpXG4gICAgLnNlbGVjdChcImlkLCBpc19wdWJsaWMsIHVzZXJfaWRcIilcbiAgICAuZXEoXCJpZFwiLCBzb3VyY2VMaXN0SWQpXG4gICAgLnNpbmdsZSgpO1xuXG4gIGlmICghc291cmNlTGlzdCkgdGhyb3cgbmV3IEVycm9yKFwiTGlzdCBub3QgZm91bmRcIik7XG4gIGlmICghc291cmNlTGlzdC5pc19wdWJsaWMgJiYgc291cmNlTGlzdC51c2VyX2lkICE9PSB1c2VyLmlkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcblxuICBjb25zdCBteUxpc3QgPSBhd2FpdCBnZXRVc2VyTGlzdChzdXBhYmFzZSwgdXNlci5pZCk7XG4gIGlmICghbXlMaXN0KSB0aHJvdyBuZXcgRXJyb3IoXCJPd24gbGlzdCBub3QgZm91bmRcIik7XG5cbiAgLy8gVmVyaWZ5IG93biBsaXN0IGlzIGVtcHR5XG4gIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJsaXN0X2l0ZW1zXCIpXG4gICAgLnNlbGVjdChcIipcIiwgeyBjb3VudDogXCJleGFjdFwiLCBoZWFkOiB0cnVlIH0pXG4gICAgLmVxKFwibGlzdF9pZFwiLCBteUxpc3QuaWQpO1xuXG4gIGlmICgoY291bnQgPz8gMCkgPiAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBjb3B5IHRvIGFuIGVtcHR5IGxpc3RcIik7XG5cbiAgLy8gRmV0Y2ggYWxsIGl0ZW1zIGZyb20gc291cmNlIGxpc3RcbiAgY29uc3QgeyBkYXRhOiBzb3VyY2VJdGVtcyB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImxpc3RfaXRlbXNcIilcbiAgICAuc2VsZWN0KFwic2hvd19pZCwgcmF0aW5nLCBwb3NpdGlvbiwgbm90ZXNcIilcbiAgICAuZXEoXCJsaXN0X2lkXCIsIHNvdXJjZUxpc3RJZClcbiAgICAub3JkZXIoXCJwb3NpdGlvblwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoc291cmNlSXRlbXMgJiYgc291cmNlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGluc2VydHMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBsaXN0X2lkOiBteUxpc3QuaWQsXG4gICAgICBzaG93X2lkOiBpdGVtLnNob3dfaWQsXG4gICAgICByYXRpbmc6IGl0ZW0ucmF0aW5nLFxuICAgICAgcG9zaXRpb246IGl0ZW0ucG9zaXRpb24sXG4gICAgICBub3RlczogaXRlbS5ub3RlcyxcbiAgICB9KSk7XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwibGlzdF9pdGVtc1wiKVxuICAgICAgLmluc2VydChpbnNlcnRzKTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikgdGhyb3cgbmV3IEVycm9yKGluc2VydEVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvbGlzdHNcIik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRUQXN4QnNCLGtNQUFBIn0=
}),
"[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExplorePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/i18n/navigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SearchInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/SearchInput.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$UserAvatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/UserAvatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/EmptyState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$FollowButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/components/FollowButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/src/lib/supabase/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/similarity.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/similarity.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$tmdb$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/src/lib/tmdb/client.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/lib/tmdb/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Television.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Plus.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Check$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/Check.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/SpinnerGap.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ArrowRight$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@phosphor-icons/react/dist/csr/ArrowRight.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$e62915__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/explore/data:e62915 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$bb268b__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/explore/data:bb268b [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$c03a3a__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/explore/data:c03a3a [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$28c992__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/explore/data:28c992 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$2a5a87__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:2a5a87 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$d4f1e1__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/packages/web/src/app/[locale]/(app)/lists/data:d4f1e1 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
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
function ExplorePage() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])("explore");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [userResults, setUserResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showResults, setShowResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searched, setSearched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [recommendations, setRecommendations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [recsLoading, setRecsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [popularShows, setPopularShows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [popularLoading, setPopularLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [similarUsers, setSimilarUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [similarUsersLoading, setSimilarUsersLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [addedShowIds, setAddedShowIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [addingShowId, setAddingShowId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [addedTmdbIds, setAddedTmdbIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [addingTmdbId, setAddingTmdbId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [navigatingTmdbId, setNavigatingTmdbId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeShowId, setActiveShowId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    // Dismiss tapped card overlay when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!activeShowId) return;
        const dismiss = ()=>setActiveShowId(null);
        document.addEventListener("click", dismiss);
        return ()=>document.removeEventListener("click", dismiss);
    }, [
        activeShowId
    ]);
    // Load recommendations and similar users on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$e62915__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRecommendations"])().then((recs)=>{
            if (!cancelled) {
                setRecommendations(recs);
                if (recs.length === 0) {
                    setPopularLoading(true);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$c03a3a__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getPopularShows"])().then((shows)=>{
                        if (!cancelled) setPopularShows(shows);
                    }).catch(()=>{}).finally(()=>{
                        if (!cancelled) setPopularLoading(false);
                    });
                }
            }
        }).catch(()=>{}).finally(()=>{
            if (!cancelled) setRecsLoading(false);
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$bb268b__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getSimilarUsers"])().then((users)=>{
            if (!cancelled) setSimilarUsers(users);
        }).catch(()=>{}).finally(()=>{
            if (!cancelled) setSimilarUsersLoading(false);
        });
        return ()=>{
            cancelled = true;
        };
    }, []);
    const handleAddToList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((show)=>{
        setAddingShowId(show.id);
        startTransition(async ()=>{
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$2a5a87__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addShowToMyList"])({
                    id: show.id,
                    tmdb_id: show.tmdb_id,
                    imdb_id: null,
                    title: show.title,
                    poster_path: show.poster_path,
                    first_air_date: show.first_air_date,
                    overview: show.overview
                });
                if (!result.alreadyExists) {
                    setAddedShowIds((prev)=>new Set(prev).add(show.id));
                }
            } catch  {
            // silently fail
            } finally{
                setAddingShowId(null);
            }
        });
    }, []);
    const handleAddSearchShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((show)=>{
        setAddingTmdbId(show.tmdb_id);
        startTransition(async ()=>{
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$lists$2f$data$3a$d4f1e1__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addTmdbShowToMyList"])({
                    tmdb_id: show.tmdb_id,
                    title: show.title,
                    poster_path: show.poster_path,
                    first_air_date: show.first_air_date,
                    overview: show.overview
                });
                setAddedTmdbIds((prev)=>new Set(prev).add(show.tmdb_id));
            } catch  {
            // silently fail
            } finally{
                setAddingTmdbId(null);
            }
        });
    }, []);
    const handleShowClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (show)=>{
        setNavigatingTmdbId(show.tmdb_id);
        try {
            const id = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$app$2f5b$locale$5d2f28$app$292f$explore$2f$data$3a$28c992__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getOrCreateShowByTmdbId"])({
                tmdb_id: show.tmdb_id,
                title: show.title,
                poster_path: show.poster_path,
                first_air_date: show.first_air_date,
                overview: show.overview
            });
            router.push(`/shows/${id}`);
        } catch  {
            setNavigatingTmdbId(null);
        }
    }, [
        router
    ]);
    const handleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (query)=>{
        if (query.length < 2) {
            setUserResults([]);
            setShowResults([]);
            setSearched(false);
            return;
        }
        setSearched(true);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        // Search users and shows in parallel
        const profilesPromise = supabase.from("profiles").select("id, username, avatar_url").ilike("username", `%${query}%`).limit(10);
        const showsPromise = fetch(`/api/tmdb/search?q=${encodeURIComponent(query)}`).then((res)=>res.json());
        const [profilesResult, showsData] = await Promise.all([
            profilesPromise,
            showsPromise
        ]);
        const profiles = profilesResult.data ?? [];
        // Show results from TMDB
        setShowResults((showsData.results ?? []).slice(0, 6).map((s)=>({
                tmdb_id: s.tmdb_id,
                title: s.title,
                poster_path: s.poster_path,
                first_air_date: s.first_air_date,
                overview: s.overview
            })));
        if (!profiles.length) {
            setUserResults([]);
            return;
        }
        // Get viewer's list items for similarity computation
        let viewerItems = [];
        if (user) {
            const { data: viewerList } = await supabase.from("lists").select("id").eq("user_id", user.id).single();
            if (viewerList) {
                const { data } = await supabase.from("list_items").select("show_id, rating, position").eq("list_id", viewerList.id).order("position", {
                    ascending: true
                });
                viewerItems = data ?? [];
            }
        }
        const viewerListData = viewerItems.map((i, idx)=>({
                showId: i.show_id,
                rating: i.rating,
                position: i.position ?? idx
            }));
        // Get each user's list info + similarity
        const userResultsList = [];
        for (const p of profiles){
            if (user && p.id === user.id) continue;
            const { data: userList } = await supabase.from("lists").select("id, is_public").eq("user_id", p.id).single();
            if (!userList?.is_public) {
                userResultsList.push({
                    ...p,
                    show_count: 0,
                    similarity: null
                });
                continue;
            }
            const { data: listItems, count } = await supabase.from("list_items").select("show_id, rating, position", {
                count: "exact"
            }).eq("list_id", userList.id).order("position", {
                ascending: true
            });
            let similarity = null;
            if (user && viewerListData.length > 0 && listItems && listItems.length > 0) {
                const otherListData = listItems.map((i, idx)=>({
                        showId: i.show_id,
                        rating: i.rating,
                        position: i.position ?? idx
                    }));
                similarity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeListSimilarity"])(viewerListData, otherListData);
            }
            userResultsList.push({
                ...p,
                show_count: count ?? 0,
                similarity
            });
        }
        setUserResults(userResultsList);
    }, []);
    const hasSearchResults = userResults.length > 0 || showResults.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "mb-6 text-xl font-semibold tracking-tight text-text-primary",
                children: t("title")
            }, void 0, false, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$SearchInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchInput"], {
                placeholder: t("searchPlaceholder"),
                onSearch: handleSearch,
                className: "mb-6"
            }, void 0, false, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                lineNumber: 305,
                columnNumber: 7
            }, this),
            searched && !hasSearchResults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                title: t("noResults")
            }, void 0, false, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                lineNumber: 312,
                columnNumber: 41
            }, this),
            searched && hasSearchResults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 space-y-6",
                children: [
                    userResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted",
                                children: t("usersSection")
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 319,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2",
                                children: userResults.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Link"], {
                                        href: `/users/${user.username}`,
                                        className: "flex items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$UserAvatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserAvatar"], {
                                                url: user.avatar_url,
                                                username: user.username,
                                                size: 40
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 329,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium text-text-primary",
                                                        children: [
                                                            "@",
                                                            user.username
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-text-muted",
                                                        children: t("showsInList", {
                                                            count: user.show_count
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 334,
                                                columnNumber: 21
                                            }, this),
                                            user.similarity !== null && user.similarity > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full border border-accent/30 bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent",
                                                children: [
                                                    user.similarity,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, user.id, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                        lineNumber: 324,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 322,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                        lineNumber: 318,
                        columnNumber: 13
                    }, this),
                    showResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted",
                                children: t("showsSection")
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 356,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2",
                                children: showResults.map((show)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-surface p-3 transition-colors hover:border-border-hover",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleShowClick(show),
                                                disabled: navigatingTmdbId === show.tmdb_id,
                                                className: "flex items-center gap-3 min-w-0 flex-1 text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative h-12 w-8 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-bg-elevated",
                                                        children: show.poster_path ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPosterUrl"])(show.poster_path, "w92"),
                                                            alt: show.title,
                                                            fill: true,
                                                            className: "object-cover",
                                                            sizes: "32px"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                            lineNumber: 372,
                                                            columnNumber: 27
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex h-full items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Television"], {
                                                                size: 14,
                                                                className: "text-text-faint"
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                                lineNumber: 381,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                            lineNumber: 380,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `truncate text-sm font-medium transition-colors ${navigatingTmdbId === show.tmdb_id ? "text-text-muted" : "text-text-primary"}`,
                                                                children: show.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                                lineNumber: 386,
                                                                columnNumber: 25
                                                            }, this),
                                                            show.first_air_date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-text-muted",
                                                                children: show.first_air_date.slice(0, 4)
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                                lineNumber: 390,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 23
                                                    }, this),
                                                    navigatingTmdbId === show.tmdb_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpinnerGap"], {
                                                        size: 14,
                                                        className: "animate-spin text-text-muted shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 365,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>!addedTmdbIds.has(show.tmdb_id) && handleAddSearchShow(show),
                                                disabled: addingTmdbId === show.tmdb_id || addedTmdbIds.has(show.tmdb_id),
                                                className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${addedTmdbIds.has(show.tmdb_id) ? "border-accent/50 bg-accent/20 text-accent" : "border-border text-text-muted hover:border-border-hover hover:text-text-primary"}`,
                                                children: addingTmdbId === show.tmdb_id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpinnerGap"], {
                                                    size: 14,
                                                    className: "animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 25
                                                }, this) : addedTmdbIds.has(show.tmdb_id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Check$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Check"], {
                                                    size: 14,
                                                    weight: "bold"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                    lineNumber: 417,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plus"], {
                                                    size: 14,
                                                    weight: "bold"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                    lineNumber: 419,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 399,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, show.tmdb_id, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                        lineNumber: 361,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 359,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                        lineNumber: 355,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                lineNumber: 315,
                columnNumber: 9
            }, this),
            !searched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-4 text-sm font-semibold text-text-secondary",
                        children: t("similarUsersTitle")
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                        lineNumber: 433,
                        columnNumber: 11
                    }, this),
                    similarUsersLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 py-4 justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpinnerGap"], {
                                size: 16,
                                className: "animate-spin text-text-muted"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 439,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-text-muted",
                                children: t("similarUsersLoading")
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 440,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                        lineNumber: 438,
                        columnNumber: 13
                    }, this),
                    !similarUsersLoading && similarUsers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                        title: t("similarUsersEmpty")
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                        lineNumber: 447,
                        columnNumber: 13
                    }, this),
                    !similarUsersLoading && similarUsers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-2",
                        children: similarUsers.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Link"], {
                                        href: `/users/${u.username}`,
                                        className: "flex items-center gap-3 min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$UserAvatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserAvatar"], {
                                                url: u.avatar_url,
                                                username: u.username,
                                                size: 40
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 461,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium text-text-primary",
                                                        children: [
                                                            "@",
                                                            u.username
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 467,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-text-muted",
                                                        children: t("showsInList", {
                                                            count: u.show_count
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 466,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                        lineNumber: 457,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full border border-accent/30 bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent",
                                                children: [
                                                    u.similarity,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 476,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$FollowButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FollowButton"], {
                                                profileId: u.id,
                                                initialFollowing: u.is_following
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 479,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                        lineNumber: 475,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, u.id, true, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 453,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                        lineNumber: 451,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                lineNumber: 432,
                columnNumber: 9
            }, this),
            !searched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-4 text-sm font-semibold text-text-secondary",
                        children: t("suggestedTitle")
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                        lineNumber: 494,
                        columnNumber: 11
                    }, this),
                    !recsLoading && recommendations.length === 0 && popularShows.length === 0 && !popularLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                        title: t("suggestedEmpty")
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                        lineNumber: 501,
                        columnNumber: 32
                    }, this),
                    (recsLoading || popularLoading) && recommendations.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 py-8 justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpinnerGap"], {
                                size: 16,
                                className: "animate-spin text-text-muted"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 505,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-text-muted",
                                children: t("suggestedLoading")
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 506,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                        lineNumber: 504,
                        columnNumber: 13
                    }, this),
                    !recsLoading && recommendations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
                        children: recommendations.map((show)=>{
                            const posterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPosterUrl"])(show.poster_path, "w342");
                            const isAdded = addedShowIds.has(show.id);
                            const isAdding = addingShowId === show.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-surface transition-colors hover:border-border-hover",
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-2 right-2 z-10 flex items-center justify-center rounded-[var(--radius-sm)] bg-bg-primary/80 px-1.5 py-0.5 text-xs font-mono font-bold text-accent tabular-nums backdrop-blur-sm",
                                        children: [
                                            show.score,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                        lineNumber: 533,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative aspect-[2/3] w-full bg-bg-elevated",
                                        children: [
                                            posterUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: posterUrl,
                                                alt: show.title,
                                                fill: true,
                                                className: "object-cover",
                                                sizes: "(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 540,
                                                columnNumber: 25
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex h-full items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Television"], {
                                                    size: 32,
                                                    className: "text-text-faint"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 548,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeShowId === show.id || isAdded ? "opacity-100" : "opacity-0 pointer-events-none"}`,
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    setActiveShowId(null);
                                                },
                                                children: isAdded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Check$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Check"], {
                                                    size: 24,
                                                    weight: "bold",
                                                    className: "text-accent"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                    lineNumber: 566,
                                                    columnNumber: 27
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                handleAddToList(show);
                                                            },
                                                            disabled: isAdding,
                                                            className: "flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition-colors disabled:opacity-50",
                                                            children: [
                                                                isAdding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpinnerGap"], {
                                                                    size: 13,
                                                                    className: "animate-spin"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                                    lineNumber: 578,
                                                                    columnNumber: 33
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plus"], {
                                                                    size: 13,
                                                                    weight: "bold"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                                    lineNumber: 580,
                                                                    columnNumber: 33
                                                                }, this),
                                                                t("addToList")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                            lineNumber: 569,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Link"], {
                                                            href: `/shows/${show.id}`,
                                                            className: "flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-black/60 transition-colors",
                                                            onClick: (e)=>e.stopPropagation(),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ArrowRight$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArrowRight"], {
                                                                    size: 13,
                                                                    weight: "bold"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                                    lineNumber: 589,
                                                                    columnNumber: 31
                                                                }, this),
                                                                t("details")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                            lineNumber: 584,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 554,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                        lineNumber: 538,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Link"], {
                                                href: `/shows/${show.id}`,
                                                className: "block truncate text-sm font-medium text-text-primary hover:text-accent transition-colors",
                                                onClick: (e)=>e.stopPropagation(),
                                                children: show.title
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 599,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-0.5 text-xs text-text-muted",
                                                children: t("recommendedBy", {
                                                    count: show.recommendedBy
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 606,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                        lineNumber: 598,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, show.id, true, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 518,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                        lineNumber: 511,
                        columnNumber: 13
                    }, this),
                    !recsLoading && !popularLoading && recommendations.length === 0 && popularShows.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-3 text-xs text-text-muted",
                                children: t("popularFallback")
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 621,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
                                children: popularShows.map((show)=>{
                                    const posterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$lib$2f$tmdb$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPosterUrl"])(show.poster_path, "w185");
                                    const isAdded = addedShowIds.has(show.id);
                                    const isAdding = addingShowId === show.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "group relative overflow-hidden rounded-lg border border-border bg-bg-surface transition-colors hover:border-border-hover",
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative aspect-2/3 w-full bg-bg-elevated",
                                                children: [
                                                    posterUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: posterUrl,
                                                        alt: show.title,
                                                        fill: true,
                                                        className: "object-cover",
                                                        sizes: "(max-width: 640px) 50vw, (max-width: 768px) 33vw, 17vw"
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 647,
                                                        columnNumber: 29
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-full items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Television$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Television"], {
                                                            size: 28,
                                                            className: "text-text-faint"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                            lineNumber: 656,
                                                            columnNumber: 31
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 655,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeShowId === show.id || isAdded ? "opacity-100" : "opacity-0 pointer-events-none"}`,
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            setActiveShowId(null);
                                                        },
                                                        children: isAdded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Check$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Check"], {
                                                            size: 24,
                                                            weight: "bold",
                                                            className: "text-accent"
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                            lineNumber: 676,
                                                            columnNumber: 31
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        handleAddToList(show);
                                                                    },
                                                                    disabled: isAdding,
                                                                    className: "flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition-colors disabled:opacity-50",
                                                                    children: [
                                                                        isAdding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$SpinnerGap$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpinnerGap"], {
                                                                            size: 13,
                                                                            className: "animate-spin"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                                            lineNumber: 688,
                                                                            columnNumber: 37
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$Plus$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plus"], {
                                                                            size: 13,
                                                                            weight: "bold"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                                            lineNumber: 693,
                                                                            columnNumber: 37
                                                                        }, this),
                                                                        t("addToList")
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                                    lineNumber: 679,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Link"], {
                                                                    href: `/shows/${show.id}`,
                                                                    className: "flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-black/60 transition-colors",
                                                                    onClick: (e)=>e.stopPropagation(),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$phosphor$2d$icons$2f$react$2f$dist$2f$csr$2f$ArrowRight$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArrowRight"], {
                                                                            size: 13,
                                                                            weight: "bold"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                                            lineNumber: 702,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        t("details")
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                                    lineNumber: 697,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 645,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$src$2f$i18n$2f$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Link"], {
                                                        href: `/shows/${show.id}`,
                                                        className: "block truncate text-xs font-medium text-text-primary hover:text-accent transition-colors",
                                                        onClick: (e)=>e.stopPropagation(),
                                                        children: show.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 711,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-0.5 text-[10px] text-text-faint",
                                                        children: t("addedByCount", {
                                                            count: show.addedCount
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                        lineNumber: 718,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                                lineNumber: 710,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, show.id, true, {
                                        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                        lineNumber: 631,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                                lineNumber: 624,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
                lineNumber: 493,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/src/app/[locale]/(app)/explore/page.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=packages_c3455ab0._.js.map