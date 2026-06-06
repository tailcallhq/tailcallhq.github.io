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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Sidebar_1 = require("@theme-original/DocRoot/Layout/Sidebar");
var index_1 = require("../../../SearchBar/index");
var useIsBrowser_1 = require("@docusaurus/useIsBrowser");
var react_platform_js_1 = require("react-platform-js");
var page_search_svg_1 = require("@site/static/icons/basic/page-search.svg");
var enter_key_svg_1 = require("@site/static/icons/basic/enter-key.svg");
var up_down_key_svg_1 = require("@site/static/icons/basic/up-down-key.svg");
var escape_key_svg_1 = require("@site/static/icons/basic/escape-key.svg");
var styles_module_css_1 = require("./styles.module.css");
var utils_1 = require("@site/src/utils");
var CustomSearch = function () {
    var _a = (0, react_1.useState)(false), isSearchModalVisible = _a[0], setIsSearchModalVisible = _a[1];
    var focusRef = (0, react_1.useRef)();
    var history = (0, react_router_dom_1.useHistory)();
    var isBrowser = (0, useIsBrowser_1.default)();
    var placeholder = isBrowser ? (react_platform_js_1.default.OS.startsWith("Mac") ? "Search ⌘+K" : "Search Ctrl+K") : "Search";
    // Function to handle opening the search modal
    var handleSearchClick = function () {
        setIsSearchModalVisible(true);
    };
    // Function to handle closing the search modal
    var handleSearchModalClose = function () {
        setIsSearchModalVisible(false);
    };
    // Function to control body scroll based on modal visibility
    var setBodyScroll = function () {
        if (isSearchModalVisible) {
            (0, utils_1.setBodyOverflow)("hidden");
        }
        else {
            (0, utils_1.setBodyOverflow)("initial");
        }
    };
    // Function to handle key press events
    var handleKeyPress = function (event) {
        if (event.key === "Escape") {
            handleSearchModalClose();
        }
        if ((event.metaKey && event.key === "k" && react_platform_js_1.default.UA.includes("Mac")) ||
            (event.ctrlKey && event.key === "k" && react_platform_js_1.default.UA.includes("Win"))) {
            handleSearchClick();
        }
    };
    (0, react_1.useEffect)(function () {
        // handle body scroll based on modal visibility changes
        setBodyScroll();
        // handle keydown events for search functionality
        document.addEventListener("keydown", handleKeyPress);
        // close the search modal when route changes
        var unlisten = history.listen(function (location, action) {
            if (action === "PUSH" || action === "POP") {
                setIsSearchModalVisible(false);
            }
        });
        var focusSearchBar = function () {
            var searchInput = (0, utils_1.getSearchInputRef)();
            if (searchInput && focusRef.current !== "Loading...") {
                setTimeout(function () {
                    searchInput.focus();
                }, 20);
            }
        };
        var searchContainer = document.getElementById("search-container");
        if (searchContainer) {
            searchContainer.addEventListener("DOMSubtreeModified", focusSearchBar);
        }
        // Cleanup (when component unmounts or dependencies change)
        return function () {
            (0, utils_1.setBodyOverflow)("initial");
            document.removeEventListener("keydown", handleKeyPress);
            unlisten();
            if (searchContainer) {
                searchContainer.removeEventListener("DOMSubtreeModified", focusSearchBar);
            }
        };
    }, [history, isSearchModalVisible]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: styles_module_css_1.default.inputContainer, onClick: handleSearchClick },
            react_1.default.createElement("span", { "aria-label": "expand searchbar", role: "button", className: "search-icon", tabIndex: 0 }),
            react_1.default.createElement("input", { readOnly: true, placeholder: placeholder, className: styles_module_css_1.default.input })),
        react_1.default.createElement("div", { id: "search-container" }, isSearchModalVisible ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { onClick: handleSearchModalClose, className: styles_module_css_1.default.overlay }),
            react_1.default.createElement("div", { className: styles_module_css_1.default.modal },
                react_1.default.createElement("div", { className: styles_module_css_1.default.modalContent },
                    react_1.default.createElement(index_1.default, null),
                    react_1.default.createElement("div", { className: styles_module_css_1.default.initialCase },
                        react_1.default.createElement(page_search_svg_1.default, null),
                        react_1.default.createElement("div", { className: styles_module_css_1.default.searchDocsTitle }, "Search Docs"),
                        react_1.default.createElement("div", { className: styles_module_css_1.default.searchDocsDesc }, "Search anything within the docs"))),
                react_1.default.createElement("div", { className: styles_module_css_1.default.footer },
                    react_1.default.createElement("div", { className: styles_module_css_1.default.navigationInfoItem },
                        react_1.default.createElement(enter_key_svg_1.default, null),
                        react_1.default.createElement("span", null, "to select")),
                    react_1.default.createElement("div", { className: styles_module_css_1.default.navigationInfoItem },
                        react_1.default.createElement(up_down_key_svg_1.default, null),
                        react_1.default.createElement("span", null, "to navigate")),
                    react_1.default.createElement("div", { className: styles_module_css_1.default.navigationInfoItem },
                        react_1.default.createElement(escape_key_svg_1.default, null),
                        react_1.default.createElement("span", null, "to close")))))) : null)));
};
// Wrapper component combining Sidebar with CustomSearch
var SidebarWrapper = function (props) {
    return (react_1.default.createElement("div", { className: "sidebar-search-container place-items-center flex flex-col lg:mb-[100px]" },
        react_1.default.createElement(Sidebar_1.default, __assign({}, props))));
};
exports.default = SidebarWrapper;
