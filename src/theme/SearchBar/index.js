"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchBar;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_2 = require("@docsearch/react");
var Head_1 = require("@docusaurus/Head");
var Link_1 = require("@docusaurus/Link");
var router_1 = require("@docusaurus/router");
var theme_common_1 = require("@docusaurus/theme-common");
var client_1 = require("@docusaurus/theme-search-algolia/client");
var Translate_1 = require("@docusaurus/Translate");
var useDocusaurusContext_1 = require("@docusaurus/useDocusaurusContext");
var SearchTranslations_1 = require("@theme/SearchTranslations");
var constants_1 = require("@site/src/constants");
var DocSearchModal = null;
function Hit(_a) {
    var hit = _a.hit, children = _a.children;
    return react_1.default.createElement(Link_1.default, { to: hit.url }, children);
}
function ResultsFooter(_a) {
    var state = _a.state, onClose = _a.onClose;
    var createSearchLink = (0, theme_common_1.useSearchLinkCreator)();
    return (react_1.default.createElement("div", { className: "flex justify-between w-full" },
        react_1.default.createElement("span", null, "".concat(state.context.nbHits, " results found")),
        react_1.default.createElement(Link_1.default, { to: createSearchLink(state.query), onClick: onClose },
            react_1.default.createElement(Translate_1.default, { id: "theme.SearchBar.seeAll" }, "See all results"))));
}
function mergeFacetFilters(f1, f2) {
    var normalize = function (f) {
        return typeof f === "string" ? [f] : f;
    };
    return __spreadArray(__spreadArray([], normalize(f1), true), normalize(f2), true);
}
function DocSearch(_a) {
    var _b, _c;
    var contextualSearch = _a.contextualSearch, externalUrlRegex = _a.externalUrlRegex, props = __rest(_a, ["contextualSearch", "externalUrlRegex"]);
    var siteMetadata = (0, useDocusaurusContext_1.default)().siteMetadata;
    var processSearchResultUrl = (0, client_1.useSearchResultUrlProcessor)();
    var contextualSearchFacetFilters = (0, client_1.useAlgoliaContextualFacetFilters)();
    var configFacetFilters = (_c = (_b = props.searchParameters) === null || _b === void 0 ? void 0 : _b.facetFilters) !== null && _c !== void 0 ? _c : [];
    var facetFilters = contextualSearch
        ? // Merge contextual search filters with config filters
            mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
        : // ... or use config facetFilters
            configFacetFilters;
    // We let user override default searchParameters if she wants to
    var searchParameters = __assign(__assign({}, props.searchParameters), { facetFilters: facetFilters });
    var history = (0, router_1.useHistory)();
    var searchContainer = (0, react_1.useRef)(null);
    var searchButtonRef = (0, react_1.useRef)(null);
    var _d = (0, react_1.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    var _e = (0, react_1.useState)(undefined), initialQuery = _e[0], setInitialQuery = _e[1];
    var importDocSearchModalIfNeeded = (0, react_1.useCallback)(function () {
        if (DocSearchModal) {
            return Promise.resolve();
        }
        return Promise.all([
            Promise.resolve().then(function () { return require("@docsearch/react/modal"); }),
            Promise.resolve().then(function () { return require("@docsearch/react/style"); }),
            Promise.resolve().then(function () { return require("./styles.css"); }),
        ]).then(function (_a) {
            var Modal = _a[0].DocSearchModal;
            DocSearchModal = Modal;
        });
    }, []);
    var prepareSearchContainer = (0, react_1.useCallback)(function () {
        if (!searchContainer.current) {
            var divElement = document.createElement("div");
            searchContainer.current = divElement;
            document.body.insertBefore(divElement, document.body.firstChild);
        }
    }, []);
    var openModal = (0, react_1.useCallback)(function () {
        prepareSearchContainer();
        importDocSearchModalIfNeeded().then(function () { return setIsOpen(true); });
    }, [importDocSearchModalIfNeeded, prepareSearchContainer]);
    var closeModal = (0, react_1.useCallback)(function () {
        var _a;
        setIsOpen(false);
        (_a = searchButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    var handleInput = (0, react_1.useCallback)(function (event) {
        // prevents duplicate key insertion in the modal input
        event.preventDefault();
        setInitialQuery(event.key);
        openModal();
    }, [openModal]);
    var navigator = (0, react_1.useRef)({
        navigate: function (_a) {
            var itemUrl = _a.itemUrl;
            // Algolia results could contain URL's from other domains which cannot
            // be served through history and should navigate with window.location
            if ((0, theme_common_1.isRegexpStringMatch)(externalUrlRegex, itemUrl)) {
                window.location.href = itemUrl;
            }
            else {
                history.push(itemUrl);
            }
        },
    }).current;
    var transformItems = (0, react_1.useRef)(function (items) {
        return props.transformItems
            ? // Custom transformItems
                props.transformItems(items)
            : // Default transformItems
                items.map(function (item) { return (__assign(__assign({}, item), { url: processSearchResultUrl(item.url) })); });
    }).current;
    var resultsFooterComponent = (0, react_1.useMemo)(function () {
        // eslint-disable-next-line react/no-unstable-nested-components
        return function (footerProps) { return (react_1.default.createElement(ResultsFooter, __assign({}, footerProps, { onClose: closeModal }))); };
    }, [closeModal]);
    var transformSearchClient = (0, react_1.useCallback)(function (searchClient) {
        searchClient.addAlgoliaAgent("docusaurus", siteMetadata.docusaurusVersion);
        return searchClient;
    }, [siteMetadata.docusaurusVersion]);
    (0, react_2.useDocSearchKeyboardEvents)({
        isOpen: isOpen,
        onOpen: openModal,
        onClose: closeModal,
        onInput: handleInput,
        searchButtonRef: searchButtonRef,
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Head_1.default, null,
            react_1.default.createElement("link", { rel: "preconnect", href: "https://".concat(props.appId, "-dsn.algolia.net"), crossOrigin: "anonymous" })),
        react_1.default.createElement(react_2.DocSearchButton, { onTouchStart: importDocSearchModalIfNeeded, onFocus: importDocSearchModalIfNeeded, onMouseOver: importDocSearchModalIfNeeded, onClick: openModal, ref: searchButtonRef, translations: SearchTranslations_1.default.button }),
        isOpen &&
            DocSearchModal &&
            searchContainer.current &&
            (0, react_dom_1.createPortal)(react_1.default.createElement(DocSearchModal, __assign({ onClose: closeModal, initialScrollY: window.scrollY, initialQuery: initialQuery, navigator: navigator, transformItems: transformItems, hitComponent: Hit, transformSearchClient: transformSearchClient }, (props.searchPagePath && {
                resultsFooterComponent: resultsFooterComponent,
            }), props, { searchParameters: searchParameters, placeholder: constants_1.algoliaConstants.searchModalPlaceholder, translations: SearchTranslations_1.default.modal })), searchContainer.current)));
}
function SearchBar() {
    var siteConfig = (0, useDocusaurusContext_1.default)().siteConfig;
    return react_1.default.createElement(DocSearch, __assign({}, siteConfig.themeConfig.algolia));
}
