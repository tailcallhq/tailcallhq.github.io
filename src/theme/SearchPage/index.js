"use strict";
/* eslint-disable jsx-a11y/no-autofocus */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchPage;
var react_1 = require("react");
var clsx_1 = require("clsx");
var algoliasearch_helper_1 = require("algoliasearch-helper");
var lite_1 = require("algoliasearch/lite");
var ExecutionEnvironment_1 = require("@docusaurus/ExecutionEnvironment");
var Head_1 = require("@docusaurus/Head");
var Link_1 = require("@docusaurus/Link");
var client_1 = require("@docusaurus/plugin-content-docs/client");
var theme_common_1 = require("@docusaurus/theme-common");
var internal_1 = require("@docusaurus/theme-common/internal");
var Translate_1 = require("@docusaurus/Translate");
var useDocusaurusContext_1 = require("@docusaurus/useDocusaurusContext");
var client_2 = require("@docusaurus/theme-search-algolia/client");
var Layout_1 = require("@theme/Layout");
var styles_module_css_1 = require("./styles.module.css");
var constants_1 = require("@site/src/constants");
// Very simple pluralization: probably good enough for now
function useDocumentsFoundPlural() {
    var selectMessage = (0, theme_common_1.usePluralForm)().selectMessage;
    return function (count) {
        return selectMessage(count, (0, Translate_1.translate)({
            id: "theme.SearchPage.documentsFound.plurals",
            description: 'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
            message: "One result found|{count} results found",
        }, { count: count }));
    };
}
function useDocsSearchVersionsHelpers() {
    var allDocsData = (0, client_1.useAllDocsData)();
    // State of the version select menus / algolia facet filters
    // docsPluginId -> versionName map
    var _a = (0, react_1.useState)(function () {
        return Object.entries(allDocsData).reduce(function (acc, _a) {
            var _b;
            var pluginId = _a[0], pluginData = _a[1];
            return (__assign(__assign({}, acc), (_b = {}, _b[pluginId] = pluginData.versions[0].name, _b)));
        }, {});
    }), searchVersions = _a[0], setSearchVersions = _a[1];
    // Set the value of a single select menu
    var setSearchVersion = function (pluginId, searchVersion) {
        return setSearchVersions(function (s) {
            var _a;
            return (__assign(__assign({}, s), (_a = {}, _a[pluginId] = searchVersion, _a)));
        });
    };
    var versioningEnabled = Object.values(allDocsData).some(function (docsData) { return docsData.versions.length > 1; });
    return {
        allDocsData: allDocsData,
        versioningEnabled: versioningEnabled,
        searchVersions: searchVersions,
        setSearchVersion: setSearchVersion,
    };
}
// We want to display one select per versioned docs plugin instance
function SearchVersionSelectList(_a) {
    var docsSearchVersionsHelpers = _a.docsSearchVersionsHelpers;
    var versionedPluginEntries = Object.entries(docsSearchVersionsHelpers.allDocsData)
        // Do not show a version select for unversioned docs plugin instances
        .filter(function (_a) {
        var docsData = _a[1];
        return docsData.versions.length > 1;
    });
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("col", "col--3", "padding-left--none", styles_module_css_1.default.searchVersionColumn) }, versionedPluginEntries.map(function (_a) {
        var pluginId = _a[0], docsData = _a[1];
        var labelPrefix = versionedPluginEntries.length > 1 ? "".concat(pluginId, ": ") : "";
        return (react_1.default.createElement("select", { key: pluginId, onChange: function (e) { return docsSearchVersionsHelpers.setSearchVersion(pluginId, e.target.value); }, defaultValue: docsSearchVersionsHelpers.searchVersions[pluginId], className: styles_module_css_1.default.searchVersionInput }, docsData.versions.map(function (version, i) { return (react_1.default.createElement("option", { key: i, label: "".concat(labelPrefix).concat(version.label), value: version.name })); })));
    })));
}
var resultsCategory;
(function (resultsCategory) {
    resultsCategory["All"] = "All";
    resultsCategory["Docs"] = "Docs";
    resultsCategory["Blogs"] = "Blogs";
})(resultsCategory || (resultsCategory = {}));
function SearchPageContent() {
    var currentLocale = (0, useDocusaurusContext_1.default)().i18n.currentLocale;
    var _a = (0, client_2.useAlgoliaThemeConfig)().algolia, appId = _a.appId, apiKey = _a.apiKey, indexName = _a.indexName, contextualSearch = _a.contextualSearch;
    var processSearchResultUrl = (0, client_2.useSearchResultUrlProcessor)();
    var documentsFoundPlural = useDocumentsFoundPlural();
    var docsSearchVersionsHelpers = useDocsSearchVersionsHelpers();
    var _b = (0, theme_common_1.useSearchQueryString)(), searchQuery = _b[0], setSearchQuery = _b[1];
    var _c = (0, react_1.useState)({
        All: 0,
        Blogs: 0,
        Docs: 0,
    }), categoryCount = _c[0], setCategoryCount = _c[1];
    var _d = (0, react_1.useState)(resultsCategory.All), selectedCategory = _d[0], setSelectedCategory = _d[1];
    var initialSearchResultState = {
        items: [],
        query: null,
        totalResults: null,
        totalPages: null,
        lastPage: null,
        hasMore: null,
        loading: null,
    };
    var _e = (0, react_1.useReducer)(function (prevState, data) {
        switch (data.type) {
            case "reset": {
                return initialSearchResultState;
            }
            case "loading": {
                return __assign(__assign({}, prevState), { loading: true });
            }
            case "update": {
                if (searchQuery !== data.value.query) {
                    return prevState;
                }
                return __assign(__assign({}, data.value), { items: data.value.lastPage === 0 ? data.value.items : prevState.items.concat(data.value.items) });
            }
            case "advance": {
                var hasMore = prevState.totalPages > prevState.lastPage + 1;
                return __assign(__assign({}, prevState), { lastPage: hasMore ? prevState.lastPage + 1 : prevState.lastPage, hasMore: hasMore });
            }
            default:
                return prevState;
        }
    }, initialSearchResultState), searchResultState = _e[0], searchResultStateDispatcher = _e[1];
    // respect settings from the theme config for facets
    var disjunctiveFacets = contextualSearch ? ["language", "docusaurus_tag"] : [];
    var algoliaClient = (0, lite_1.default)(appId, apiKey);
    var algoliaHelper = (0, algoliasearch_helper_1.default)(algoliaClient, indexName, {
        hitsPerPage: 15,
        advancedSyntax: true,
        disjunctiveFacets: disjunctiveFacets,
        facets: [constants_1.algoliaConstants.categoryFacet],
        facetingAfterDistinct: true,
    });
    algoliaHelper.on("result", function (event) {
        var _a;
        var _b;
        var _c = event.results, query = _c.query, hits = _c.hits, page = _c.page, nbHits = _c.nbHits, nbPages = _c.nbPages, facets = _c.facets;
        if (query === "" || !Array.isArray(hits)) {
            searchResultStateDispatcher({ type: "reset" });
            return;
        }
        var sanitizeValue = function (value) {
            return value.replace(/algolia-docsearch-suggestion--highlight/g, "font-medium text-tailCall-dark-700 bg-tailCall-yellow");
        };
        var items = hits.map(function (_a) {
            var url = _a.url, _b = _a._highlightResult, hierarchy = _b.hierarchy, content = _b.content, _c = _a._snippetResult, snippet = _c === void 0 ? {} : _c;
            var titles = Object.keys(hierarchy).map(function (key) { return sanitizeValue(hierarchy[key].value); });
            return {
                title: titles.pop(),
                url: processSearchResultUrl(url),
                summary: (content === null || content === void 0 ? void 0 : content.value)
                    ? "".concat(sanitizeValue(content === null || content === void 0 ? void 0 : content.value))
                    : snippet.content
                        ? "".concat(sanitizeValue(snippet.content.value))
                        : "",
                breadcrumbs: titles,
            };
        });
        if (selectedCategory === resultsCategory.All) {
            var facetsCountData = (_b = facets[0]) === null || _b === void 0 ? void 0 : _b["data"];
            setCategoryCount((_a = {},
                _a[resultsCategory.All] = nbHits,
                _a[resultsCategory.Docs] = (facetsCountData === null || facetsCountData === void 0 ? void 0 : facetsCountData[resultsCategory.Docs]) || 0,
                _a[resultsCategory.Blogs] = (facetsCountData === null || facetsCountData === void 0 ? void 0 : facetsCountData[resultsCategory.Blogs]) || 0,
                _a));
        }
        searchResultStateDispatcher({
            type: "update",
            value: {
                items: items,
                query: query,
                totalResults: nbHits,
                totalPages: nbPages,
                lastPage: page,
                hasMore: nbPages > page + 1,
                loading: false,
            },
        });
    });
    var _f = (0, react_1.useState)(null), loaderRef = _f[0], setLoaderRef = _f[1];
    var prevY = (0, react_1.useRef)(0);
    var observer = (0, react_1.useRef)(ExecutionEnvironment_1.default.canUseIntersectionObserver &&
        new IntersectionObserver(function (entries) {
            var _a = entries[0], isIntersecting = _a.isIntersecting, currentY = _a.boundingClientRect.y;
            if (isIntersecting && prevY.current > currentY) {
                searchResultStateDispatcher({ type: "advance" });
            }
            prevY.current = currentY;
        }, { threshold: 1 }));
    var getTitle = function () {
        return searchQuery
            ? (0, Translate_1.translate)({
                id: "theme.SearchPage.existingResultsTitle",
                message: 'Search Results for "{query}"',
                description: "The search page title for non-empty query",
            }, {
                query: searchQuery,
            })
            : (0, Translate_1.translate)({
                id: "theme.SearchPage.emptyResultsTitle",
                message: "Search the documentation",
                description: "The search page title for empty query",
            });
    };
    var makeSearch = (0, theme_common_1.useEvent)(function (page) {
        if (page === void 0) { page = 0; }
        if (contextualSearch) {
            algoliaHelper.addDisjunctiveFacetRefinement("docusaurus_tag", "default");
            algoliaHelper.addDisjunctiveFacetRefinement("language", currentLocale);
            Object.entries(docsSearchVersionsHelpers.searchVersions).forEach(function (_a) {
                var pluginId = _a[0], searchVersion = _a[1];
                algoliaHelper.addDisjunctiveFacetRefinement("docusaurus_tag", "docs-".concat(pluginId, "-").concat(searchVersion));
            });
        }
        if (selectedCategory !== resultsCategory.All) {
            algoliaHelper.addFacetRefinement(constants_1.algoliaConstants.categoryFacet, selectedCategory);
        }
        algoliaHelper.setQuery(searchQuery).setPage(page).search();
    });
    (0, react_1.useEffect)(function () {
        if (!loaderRef) {
            return undefined;
        }
        var currentObserver = observer.current;
        if (currentObserver) {
            currentObserver.observe(loaderRef);
            return function () { return currentObserver.unobserve(loaderRef); };
        }
        return function () { return true; };
    }, [loaderRef]);
    (0, react_1.useEffect)(function () {
        var _a;
        searchResultStateDispatcher({ type: "reset" });
        if (searchQuery) {
            searchResultStateDispatcher({ type: "loading" });
            setTimeout(function () {
                makeSearch();
            }, 300);
        }
        else {
            setCategoryCount((_a = {},
                _a[resultsCategory.All] = 0,
                _a[resultsCategory.Docs] = 0,
                _a[resultsCategory.Blogs] = 0,
                _a));
        }
    }, [searchQuery, docsSearchVersionsHelpers.searchVersions, makeSearch, selectedCategory]);
    (0, react_1.useEffect)(function () {
        if (!searchResultState.lastPage || searchResultState.lastPage === 0) {
            return;
        }
        makeSearch(searchResultState.lastPage);
    }, [makeSearch, searchResultState.lastPage, selectedCategory]);
    var handleCategoryClick = function (category) {
        setSelectedCategory(category);
    };
    var getSidebar = function (containerClassName) {
        return (react_1.default.createElement("div", { className: "flex mt-SPACE_05 mb-SPACE_01 gap-3 overflow-x-scroll cursor-pointer sm:overflow-visible sm:gap-0 sm:my-SPACE_14 sm:flex-col ".concat(containerClassName) }, Object.values(resultsCategory).map(function (category) {
            return (react_1.default.createElement("div", { className: "flex justify-between items-center rounded-md p-1 pl-3 gap-2 sm:gap-0 sm:px-3 sm:py-2 sm:w-[180px] ".concat(selectedCategory === category ? "border border-solid border-tailCall-border-light-400 sm:bg-tailCall-yellow sm:border-none" : ""), onClick: function () { return handleCategoryClick(category); } },
                react_1.default.createElement("span", { className: "text-tailCall-dark-500 font-space-grotesk text-title-tiny font-bold ".concat(selectedCategory === category ? "" : "text-tailCall-light-600 sm:text-tailCall-dark-500") }, category),
                react_1.default.createElement("span", { className: "flex justify-center items-center py-[2px] px-[6px] md:py-0 font-space-grotesk !font-medium text-content-tiny sm:text-content-small ".concat(selectedCategory === category ? "text-tailCall-dark-700 bg-tailCall-yellow sm:bg-transparent rounded-md" : "text-tailCall-dark-100 rounded-[6px] bg-tailCall-light-200") }, categoryCount[category] || 0)));
        })));
    };
    return (react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement(Head_1.default, null,
            react_1.default.createElement("title", null, (0, internal_1.useTitleFormatter)(getTitle())),
            react_1.default.createElement("meta", { property: "robots", content: "noindex, follow" })),
        react_1.default.createElement("div", { className: "container mt-4 flex flex-col sm:flex-row sm:mt-8" },
            getSidebar("hidden sm:flex"),
            react_1.default.createElement("div", { className: "flex flex-col w-full px-0 sm:px-24 md:px-24 lg:px-36 sm:pl-16 md:pl-16 lg:pl-24" },
                react_1.default.createElement("span", { className: "text-tailCall-dark-700 font-space-grotesk text-title-medium font-bold" }, getTitle()),
                react_1.default.createElement("form", { className: "row", onSubmit: function (e) { return e.preventDefault(); } },
                    react_1.default.createElement("div", { className: (0, clsx_1.default)("col", styles_module_css_1.default.searchQueryColumn, {
                            "col--9": docsSearchVersionsHelpers.versioningEnabled,
                            "col--12": !docsSearchVersionsHelpers.versioningEnabled,
                        }) },
                        react_1.default.createElement("input", { type: "search", name: "q", className: "".concat(styles_module_css_1.default.searchQueryInput, " mt-4 mb-3 text-tailCall-dark-200 font-space-grotesk text-content-small font-normal"), placeholder: (0, Translate_1.translate)({
                                id: "theme.SearchPage.inputPlaceholder",
                                message: "Type your search here",
                                description: "The placeholder for search page input",
                            }), "aria-label": (0, Translate_1.translate)({
                                id: "theme.SearchPage.inputLabel",
                                message: "Search",
                                description: "The ARIA label for search page input",
                            }), onChange: function (e) { return setSearchQuery(e.target.value); }, value: searchQuery, autoComplete: "off", autoFocus: true })),
                    contextualSearch && docsSearchVersionsHelpers.versioningEnabled && (react_1.default.createElement(SearchVersionSelectList, { docsSearchVersionsHelpers: docsSearchVersionsHelpers }))),
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: (0, clsx_1.default)("col", "col--8", styles_module_css_1.default.searchResultsColumn) }, !!searchResultState.totalResults
                        ? documentsFoundPlural(searchResultState.totalResults)
                        : "".concat(categoryCount[selectedCategory], " results found"))),
                searchQuery && getSidebar("sm:hidden"),
                searchResultState.items.length > 0 ? (react_1.default.createElement("main", null, searchResultState.items.map(function (_a, i) {
                    var title = _a.title, url = _a.url, summary = _a.summary, breadcrumbs = _a.breadcrumbs;
                    return (react_1.default.createElement("article", { key: i, className: styles_module_css_1.default.searchResultItem },
                        react_1.default.createElement("span", { className: "".concat(styles_module_css_1.default.searchResultItemHeading, " text-content-medium font-medium text-tailCall-dark-700") },
                            react_1.default.createElement(Link_1.default, { to: url, dangerouslySetInnerHTML: { __html: title } })),
                        summary && (react_1.default.createElement("span", { className: "text-tailCall-dark-200 font-space-grotesk text-content-small font-normal line-clamp-2", 
                            // Developer provided the HTML, so assume it's safe.
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML: { __html: summary } }))));
                }))) : ([
                    searchQuery && !searchResultState.loading && (react_1.default.createElement("p", { key: "no-results" },
                        react_1.default.createElement(Translate_1.default, { id: "theme.SearchPage.noResultsText", description: "The paragraph for empty search result" }, "No results were found"))),
                    !!searchResultState.loading && (react_1.default.createElement("div", { className: styles_module_css_1.default.loaderContainer },
                        react_1.default.createElement("div", { key: "spinner", className: styles_module_css_1.default.loadingSpinner }))),
                ]),
                searchResultState.hasMore && (react_1.default.createElement("div", { className: styles_module_css_1.default.loader, ref: setLoaderRef },
                    react_1.default.createElement(Translate_1.default, { id: "theme.SearchPage.fetchingNewResults", description: "The paragraph for fetching new search results" }, "Fetching new results...")))))));
}
function SearchPage() {
    return (react_1.default.createElement(theme_common_1.HtmlClassNameProvider, { className: "search-page-wrapper" },
        react_1.default.createElement(SearchPageContent, null)));
}
