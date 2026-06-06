"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogPostItemCategory;
var react_1 = require("react");
var client_1 = require("@docusaurus/plugin-content-blog/client");
function BlogPostItemCategory() {
    var frontMatter = (0, client_1.useBlogPost)().frontMatter;
    var category = frontMatter.category;
    return category ? (react_1.default.createElement("div", { className: "bg-tailCall-yellow/40 border border-tailCall-yellow border-solid text-black text-[12px] font-medium p-1 rounded-[4px] inline-block" }, category.toUpperCase())) : (react_1.default.createElement(react_1.default.Fragment, null));
}
