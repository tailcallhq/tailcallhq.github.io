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
exports.default = BlogListPage;
var react_1 = require("react");
var clsx_1 = require("clsx");
var useDocusaurusContext_1 = require("@docusaurus/useDocusaurusContext");
var theme_common_1 = require("@docusaurus/theme-common");
var BlogLayout_1 = require("@theme/BlogLayout");
var BlogListPaginator_1 = require("@theme/BlogListPaginator");
var SearchMetadata_1 = require("@theme/SearchMetadata");
var StructuredData_1 = require("@theme/BlogListPage/StructuredData");
var BlogFeaturedPosts_1 = require("../BlogFeaturedPosts");
var BlogPostList_1 = require("../BlogPostList");
var BlogCategories_1 = require("../BlogCategories");
var useBlogPosts_1 = require("@site/src/utils/hooks/useBlogPosts");
function BlogListPageMetadata(props) {
    var metadata = props.metadata;
    var siteTitle = (0, useDocusaurusContext_1.default)().siteConfig.title;
    var blogDescription = metadata.blogDescription, blogTitle = metadata.blogTitle, permalink = metadata.permalink;
    var isBlogOnlyMode = permalink === "/";
    var title = isBlogOnlyMode ? siteTitle : blogTitle;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(theme_common_1.PageMetadata, { title: title, description: blogDescription }),
        react_1.default.createElement(SearchMetadata_1.default, { tag: "blog_posts_list" })));
}
function LoadMoreButton(_a) {
    var handleLoadMore = _a.handleLoadMore;
    return (react_1.default.createElement("div", { className: "flex justify-center" },
        react_1.default.createElement("button", { onClick: handleLoadMore, className: "mt-4 h-12 cursor-pointer rounded-lg border-2 border-solid border-tailCall-border-dark-100 bg-transparent px-4 py-2 font-space-grotesk text-title-tiny font-bold text-black" }, "Load more blogs")));
}
function BlogListPageContent(_a) {
    var metadata = _a.metadata, items = _a.items, sidebar = _a.sidebar;
    var _b = (0, useBlogPosts_1.useBlogPosts)(items), activeCategory = _b.activeCategory, visibleItems = _b.visibleItems, filteredItems = _b.filteredItems, handleCategoryClick = _b.handleCategoryClick, handleLoadMore = _b.handleLoadMore;
    var featuredItems = items.filter(function (post) { return post.content.frontMatter.featured; });
    return (react_1.default.createElement(BlogLayout_1.default, { sidebar: sidebar },
        react_1.default.createElement("div", { className: "flex flex-col md:flex-row items-start w-full" },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("w-full md:w-9/12 md:pr-5", featuredItems.length == 0 ? "md:w-full" : "border-right") },
                react_1.default.createElement(BlogCategories_1.BlogCategories, { items: items, onCategoryClick: handleCategoryClick, activeCategory: activeCategory }),
                react_1.default.createElement(BlogPostList_1.default, { items: filteredItems.slice(0, visibleItems) }),
                visibleItems < filteredItems.length && react_1.default.createElement(LoadMoreButton, { handleLoadMore: handleLoadMore }),
                react_1.default.createElement(BlogListPaginator_1.default, { metadata: metadata })),
            featuredItems.length > 0 ? (react_1.default.createElement("div", { className: "w-full md:w-3/12 hidden md:block md:pl-5 featured-posts-container" },
                react_1.default.createElement(BlogFeaturedPosts_1.default, { items: featuredItems }))) : null)));
}
function BlogListPage(props) {
    return (react_1.default.createElement(theme_common_1.HtmlClassNameProvider, { className: (0, clsx_1.default)(theme_common_1.ThemeClassNames.wrapper.blogPages, theme_common_1.ThemeClassNames.page.blogListPage) },
        react_1.default.createElement(BlogListPageMetadata, __assign({}, props)),
        react_1.default.createElement(StructuredData_1.default, __assign({}, props)),
        react_1.default.createElement(BlogListPageContent, __assign({}, props))));
}
