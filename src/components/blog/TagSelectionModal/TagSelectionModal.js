"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var constants_1 = require("@site/src/constants");
var clsx_1 = require("clsx");
var lucide_react_1 = require("lucide-react");
var Link_1 = require("@docusaurus/Link");
var styles_module_css_1 = require("./styles.module.css");
var TagSelectionModal = function (_a) {
    var open = _a.open, onClose = _a.onClose;
    var _b = (0, react_1.useState)(""), query = _b[0], setQuery = _b[1];
    (0, react_1.useEffect)(function () {
        if (typeof window === "undefined")
            return;
        if (open) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "visible";
        }
    }, [open]);
    var getSearchResults = function () {
        var results = {};
        var lowerCaseQuery = query.toLowerCase();
        for (var _i = 0, _a = Object.entries(constants_1.blogTagsMapping); _i < _a.length; _i++) {
            var _b = _a[_i], category = _b[0], tags = _b[1];
            var matches = tags.filter(function (tag) { return tag.label.toLowerCase().startsWith(lowerCaseQuery); });
            if (matches.length) {
                results[category] = matches;
            }
        }
        return results;
    };
    var handleModalClose = function () {
        setQuery("");
        if (onClose) {
            onClose();
        }
    };
    var handleQueryChange = function (e) {
        setQuery(e.target.value);
    };
    var searchResults = (0, react_1.useMemo)(function () {
        return getSearchResults();
    }, [query]);
    return (react_1.default.createElement(react_1.default.Fragment, null, open ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, clsx_1.default)("block lg:hidden fixed inset-0 bg-black bg-opacity-50", styles_module_css_1.default.modalOverlay), onClick: handleModalClose }),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("absolute w-full lg:w-4/12 h-full overflow-scroll right-0 bg-white rounded-xl lg:rounded-none lg:border lg:border-solid lg:border-tailCall-border-light-500 px-4 py-8 lg:px-10 lg:py-8 flex flex-col gap-8", styles_module_css_1.default.modalContainer) },
            react_1.default.createElement("div", { className: "flex items-center justify-between" },
                react_1.default.createElement("span", { className: "text-title-medium lg:text-title-large text-black" }, "Explore All Tags"),
                react_1.default.createElement(lucide_react_1.X, { width: 24, height: 24, className: "cursor-pointer", onClick: handleModalClose })),
            react_1.default.createElement("div", { className: "flex flex-col gap-5 pb-36" },
                react_1.default.createElement("div", { className: "flex items-center gap-3 border border-solid border-tailCall-border-light-500 rounded-lg py-3 px-6" },
                    react_1.default.createElement(lucide_react_1.Search, { width: 20, height: 20, className: "text-tailCall-light-500" }),
                    react_1.default.createElement("input", { name: "tag", type: "text", value: query, onChange: handleQueryChange, placeholder: "Search Tags", className: "text-black placeholder:text-tailCall-light-500 border-none outline-none text-content-small" })),
                react_1.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 lg:gap-y-10" }, Object.keys(searchResults).map(function (category) {
                    var _a;
                    return (react_1.default.createElement("div", { className: "flex flex-col gap-3 lg:gap-4", key: category },
                        react_1.default.createElement("span", { className: "text-title-tiny lg:text-title-small text-black" }, category), (_a = searchResults === null || searchResults === void 0 ? void 0 : searchResults[category]) === null || _a === void 0 ? void 0 :
                        _a.map(function (tag) { return (react_1.default.createElement(Link_1.default, { key: tag.label, to: tag.permalink, onClick: handleModalClose, className: "text-content-small text-black px-3 py-1 border border-solid border-tailCall-border-light-500 rounded-3xl w-fit cursor-pointer hover:no-underline" }, tag.label)); })));
                })))))) : null));
};
exports.default = TagSelectionModal;
