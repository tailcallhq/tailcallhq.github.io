"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var BlogListItem_1 = require("@site/src/components/blog/BlogListItem");
function BlogPostList(_a) {
    var items = _a.items;
    return (react_1.default.createElement("div", { className: "grid grid-cols-1 gap-4 md:gap-3 md:grid-cols-2 lg:grid-cols-3" }, items.map(function (item) {
        var _a = item.content.metadata, permalink = _a.permalink, date = _a.date, title = _a.title, description = _a.description, authors = _a.authors;
        return (react_1.default.createElement(BlogListItem_1.default, { key: permalink, date: date, title: title, description: description, authors: authors, permalink: permalink }));
    })));
}
exports.default = BlogPostList;
