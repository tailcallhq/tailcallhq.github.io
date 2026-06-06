"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Link_1 = require("@docusaurus/Link");
var clsx_1 = require("clsx");
var BlogAuthor_1 = require("@site/src/theme/BlogAuthor");
var BlogListItem = function (_a) {
    var date = _a.date, title = _a.title, description = _a.description, authors = _a.authors, permalink = _a.permalink;
    return (react_1.default.createElement(Link_1.default, { to: permalink, className: "flex flex-col overflow-hidden !text-black !no-underline" },
        react_1.default.createElement("div", { className: "flex flex-col flex-1 p-3 md:py-12 md:px-6 gap-2 md:gap-3 border border-solid border-tailCall-border-light-400 hover:border-tailCall-border-dark-100 rounded-lg md:rounded-md" },
            react_1.default.createElement("span", { className: "hidden md:flex text-content-mini text-black" }, new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            })),
            react_1.default.createElement("div", { className: "flex flex-col flex-1 gap-1 md:gap-2" },
                react_1.default.createElement("span", { className: (0, clsx_1.default)("text-title-small line-clamp-2") }, title),
                react_1.default.createElement("span", { className: "flex-1 text-content-tiny md:text-content-small line-clamp-1 md:line-clamp-3 text-tailCall-light-600 blog-post-content-desc" }, description)),
            authors[0] && react_1.default.createElement(BlogAuthor_1.BlogAuthor, { author: authors[0], containerClassName: "mt-auto" }))));
};
exports.default = BlogListItem;
