"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBlogPosts = useBlogPosts;
var react_1 = require("react");
var DEFAULT_CATEGORY = "All";
var INITIAL_BLOG_COUNT = 12;
function useBlogPosts(items) {
    var _a = (0, react_1.useState)(DEFAULT_CATEGORY), activeCategory = _a[0], setActiveCategory = _a[1];
    var _b = (0, react_1.useState)(INITIAL_BLOG_COUNT), visibleItems = _b[0], setVisibleItems = _b[1];
    var filteredItems = (0, react_1.useMemo)(function () {
        return activeCategory === DEFAULT_CATEGORY
            ? items
            : items.filter(function (item) { return item.content.metadata.frontMatter.category === activeCategory; });
    }, [items, activeCategory]);
    var handleCategoryClick = function (category) {
        setActiveCategory(category);
        setVisibleItems(INITIAL_BLOG_COUNT);
    };
    var handleLoadMore = function () {
        setVisibleItems(function (prev) { return Math.min(prev + 6, filteredItems.length); });
    };
    return {
        activeCategory: activeCategory,
        visibleItems: visibleItems,
        filteredItems: filteredItems,
        handleCategoryClick: handleCategoryClick,
        handleLoadMore: handleLoadMore,
    };
}
