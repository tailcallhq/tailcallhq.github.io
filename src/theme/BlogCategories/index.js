"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategories = BlogCategories;
var clsx_1 = require("clsx");
var react_1 = require("react");
function BlogCategories(_a) {
    var items = _a.items, onCategoryClick = _a.onCategoryClick, activeCategory = _a.activeCategory;
    var categories = (0, react_1.useMemo)(function () {
        var categoryCounts = { All: items.length };
        items.map(function (item) {
            var category = item.content.metadata.frontMatter.category;
            if (typeof category === "string") {
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            }
        });
        return categoryCounts;
    }, [items]);
    return (react_1.default.createElement("div", { className: "mb-4 md:mb-5 flex items-center space-x-4 border-b border-gray-200" }, Object.entries(categories).map(function (_a) {
        var name = _a[0], count = _a[1];
        return (react_1.default.createElement("div", { "aria-role": "button", "aria-label": "".concat(name, " (").concat(count, ")"), key: name, onClick: function () { return onCategoryClick(name === activeCategory ? "All" : name); }, className: (0, clsx_1.default)("text-content-small md:text-title-tiny cursor-pointer appearance-none border-none bg-transparent px-1", activeCategory === name
                ? "!font-medium text-black border-b-solid border-b-2 border-black"
                : "!font-normal text-tailCall-dark-200 hover:text-gray-700") }, name));
    })));
}
