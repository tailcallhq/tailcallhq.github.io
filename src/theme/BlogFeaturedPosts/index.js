"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Link_1 = require("@docusaurus/Link");
var BlogAuthor_1 = require("../BlogAuthor");
function BlogFeaturedPosts(_a) {
    var items = _a.items;
    return (react_1.default.createElement("div", { className: "space-y-4" },
        react_1.default.createElement("h2", { className: "text-2xl mb-5 font-bold" }, "Featured Posts"),
        react_1.default.createElement("div", { className: "flex flex-col gap-8" }, items.map(function (post, index) { return (react_1.default.createElement(Link_1.default, { to: post.content.metadata.permalink, key: index, className: "flex flex-col gap-3 text-black !no-underline hover:text-black" },
            react_1.default.createElement("div", { className: "flex items-center gap-2" }, post.content.metadata.authors[0] && (react_1.default.createElement(BlogAuthor_1.BlogAuthor, { author: post.content.metadata.authors[0], textClassName: "text-content-tiny" }))),
            react_1.default.createElement("div", { className: "flex flex-col" },
                react_1.default.createElement("span", { className: "text-title-tiny text-black" }, post.content.metadata.title),
                react_1.default.createElement("span", { className: "text-content-small text-tailCall-light-600 line-clamp-1" }, post.content.metadata.description)))); }))));
}
exports.default = BlogFeaturedPosts;
