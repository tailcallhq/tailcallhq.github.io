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
var theme_common_1 = require("@docusaurus/theme-common");
var internal_1 = require("@docusaurus/theme-common/internal");
var react_router_dom_1 = require("react-router-dom");
var router_1 = require("@docusaurus/router");
var NavbarItem_1 = require("@theme/NavbarItem");
var index_1 = require("../../SearchBar/index");
var ColorModeToggle_1 = require("@theme/Navbar/ColorModeToggle");
var Toggle_1 = require("@theme/Navbar/MobileSidebar/Toggle");
var Logo_1 = require("@theme/Navbar/Logo");
var search_svg_1 = require("@site/static/icons/basic/search.svg");
var page_search_svg_1 = require("@site/static/icons/basic/page-search.svg");
var styles_module_css_1 = require("./styles.module.css");
var utils_1 = require("@site/src/utils");
var useNavbarItems = function () {
    // TODO temporary casting until ThemeConfig type is improved (added by docusaurus)
    return (0, theme_common_1.useThemeConfig)().navbar.items;
};
var NavbarItems = function (_a) {
    var items = _a.items;
    return (react_1.default.createElement(react_1.default.Fragment, null, items.map(function (item, i) { return (react_1.default.createElement(theme_common_1.ErrorCauseBoundary, { key: i, onError: function (error) {
            return new Error("A theme navbar item failed to render.\nPlease double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:\n".concat(JSON.stringify(item, null, 2)));
        } },
        react_1.default.createElement(NavbarItem_1.default, __assign({}, item)))); })));
};
var NavbarContentLayout = function (_a) {
    var left = _a.left, right = _a.right;
    return (react_1.default.createElement("div", { className: "navbar__inner" },
        react_1.default.createElement("div", { className: "navbar__items" }, left),
        react_1.default.createElement("div", { className: "navbar__items navbar__items--right" }, right)));
};
// Custom search component
// safe to remove in the future
var CustomSearch = function () {
    var _a = (0, react_1.useState)(false), showSearchIcon = _a[0], setShowSearchIcon = _a[1];
    var _b = (0, react_1.useState)(false), isSearchModalVisible = _b[0], setIsSearchModalVisible = _b[1];
    var focusRef = (0, react_1.useRef)();
    var history = (0, react_router_dom_1.useHistory)();
    var location = (0, router_1.useLocation)();
    // Handlers to control search visibility
    var handleSearchClick = function () {
        setIsSearchModalVisible(true);
    };
    var handleSearchModalClose = function () {
        setIsSearchModalVisible(false);
    };
    // Function to handle zoom behavior based on input focus
    var handleZoomBehavior = function () {
        /* TODO: Figure out a better way to do this */
        var viewportMetaTag = document.querySelector('meta[name="viewport"]');
        if (viewportMetaTag) {
            // Enable user zooming when no input is in focus
            viewportMetaTag.content = "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes";
            // Add an event listener to detect when an input is in focus
            document.addEventListener("focusin", handleInputFocus);
            // Remove the event listener when the component unmounts or the modal closes
            return function () {
                document.removeEventListener("focusin", handleInputFocus);
            };
        }
    };
    // Function to handle input focus
    var handleInputFocus = function (event) {
        var isInput = event.target.tagName.toLowerCase() === "input";
        // Disable user zooming when an input is in focus
        var viewportMetaTag = document.querySelector('meta[name="viewport"]');
        if (viewportMetaTag && isInput) {
            viewportMetaTag.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
        }
    };
    (0, react_1.useEffect)(function () {
        // Check if the current page is within the "/docs/" path to show or hide the search icon
        location.pathname.includes("/docs/") ? setShowSearchIcon(true) : setShowSearchIcon(false);
        // Set up a listener to handle changes in the browser history (navigation)
        var unlisten = history.listen(function (location, action) {
            if (action === "PUSH" || action === "POP") {
                // If navigating, hide the search modal and reset the zoom when the modal is closed
                setIsSearchModalVisible(false);
            }
        });
        // Handle modal visibility and behavior
        if (isSearchModalVisible) {
            // If the search modal is visible, prevent body scrolling and handle modal animations
            (0, utils_1.setBodyOverflow)("hidden");
        }
        else {
            // If the search modal is not visible, allow body scrolling
            (0, utils_1.setBodyOverflow)("initial");
        }
        var focusSearchBar = function () {
            var searchInput = (0, utils_1.getSearchInputRef)();
            if (searchInput && focusRef.current != "Loading...") {
                setTimeout(function () {
                    searchInput.focus();
                    handleZoomBehavior();
                }, 20);
            }
        };
        var searchContainer = document.getElementById("search-container-mobile");
        if (searchContainer)
            searchContainer.addEventListener("DOMSubtreeModified", focusSearchBar);
        // Clean up history listener when the component unmounts or when dependencies change
        return function () {
            unlisten();
            if (searchContainer)
                searchContainer.removeEventListener("DOMSubtreeModified", focusSearchBar);
        };
    }, [isSearchModalVisible, history]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        showSearchIcon && react_1.default.createElement(search_svg_1.default, { onClick: handleSearchClick, className: "lg:hidden mr-SPACE_03 h-6 w-6" }),
        react_1.default.createElement("div", { id: "search-container-mobile" }, isSearchModalVisible ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { onClick: handleSearchModalClose, className: styles_module_css_1.default.overlay }),
            react_1.default.createElement("div", { className: styles_module_css_1.default.modal },
                react_1.default.createElement("div", { className: styles_module_css_1.default.modalContent },
                    react_1.default.createElement("div", { className: styles_module_css_1.default.search },
                        react_1.default.createElement("div", { className: styles_module_css_1.default.searchInput },
                            react_1.default.createElement(index_1.default, null)),
                        react_1.default.createElement("span", { className: "".concat(styles_module_css_1.default.searchDocsClose, " ").concat(styles_module_css_1.default.searchDocsCommon), onClick: handleSearchModalClose }, "Close")),
                    react_1.default.createElement("div", { className: styles_module_css_1.default.initialCase },
                        react_1.default.createElement(page_search_svg_1.default, null),
                        react_1.default.createElement("div", { className: styles_module_css_1.default.searchDocsTitle }, "Search Docs"),
                        react_1.default.createElement("div", { className: "".concat(styles_module_css_1.default.searchDocsDesc, " ").concat(styles_module_css_1.default.searchDocsCommon) }, "Search anything within the docs")))))) : null)));
};
var NavbarContent = function () {
    var mobileSidebar = (0, internal_1.useNavbarMobileSidebar)();
    var items = useNavbarItems();
    var _a = (0, internal_1.splitNavbarItems)(items), leftItems = _a[0], rightItems = _a[1];
    return (react_1.default.createElement(NavbarContentLayout, { left: 
        // TODO stop hardcoding items? (added by docusaurus)
        // Render left navbar items
        react_1.default.createElement(react_1.default.Fragment, null,
            mobileSidebar.shouldRender && react_1.default.createElement(index_1.default, null),
            !mobileSidebar.disabled && react_1.default.createElement(Toggle_1.default, null),
            react_1.default.createElement(Logo_1.default, null),
            react_1.default.createElement(NavbarItems, { items: leftItems })), right: 
        // TODO stop hardcoding items? (added by docusaurus)
        // Render right navbar items
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(NavbarItems, { items: rightItems }),
            react_1.default.createElement(ColorModeToggle_1.default, { className: styles_module_css_1.default.colorModeToggle })) }));
};
exports.default = NavbarContent;
