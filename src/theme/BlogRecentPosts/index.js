"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogRecentPosts;
var react_1 = require("react");
var router_1 = require("@docusaurus/router");
var utils_1 = require("@site/src/utils");
var useGlobalData_1 = require("@docusaurus/useGlobalData");
var BlogListItem_1 = require("@site/src/components/blog/BlogListItem");
function BlogRecentPosts(_a) {
    var sidebar = _a.sidebar;
    var _b = react_1.default.useState(false), isBlogPostPage = _b[0], setIsBlogPostPage = _b[1];
    var location = (0, router_1.useLocation)();
    var recentBlogPostsMetadata = (0, useGlobalData_1.usePluginData)("docusaurus-plugin-content-blog").recentBlogPostsMetadata;
    (0, react_1.useEffect)(function () {
        setIsBlogPostPage((0, utils_1.isBlogPost)());
    }, [location.pathname]);
    return isBlogPostPage ? (react_1.default.createElement("div", { className: "container" },
        react_1.default.createElement("div", { className: "row justify-center" },
            react_1.default.createElement("div", { className: "col col--7" },
                react_1.default.createElement("hr", { className: "h-[1px] !bg-tailCall-light-300" }),
                react_1.default.createElement("h1", { className: " text-title-medium" }, "Recent Blog Posts"),
                react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3 mb-10 md:mb-20" }, recentBlogPostsMetadata === null || recentBlogPostsMetadata === void 0 ? void 0 : recentBlogPostsMetadata.map(function (item) {
                    var permalink = item.permalink, date = item.date, title = item.title, description = item.description, authors = item.authors;
                    return (react_1.default.createElement(BlogListItem_1.default, { key: permalink, date: date, title: title, description: description, authors: authors, permalink: permalink }));
                })))))) : (react_1.default.createElement(react_1.default.Fragment, null));
}
