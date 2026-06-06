"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogPostItem;
var react_1 = require("react");
var clsx_1 = require("clsx");
var client_1 = require("@docusaurus/plugin-content-blog/client");
var Container_1 = require("@theme/BlogPostItem/Container");
var Header_1 = require("@theme/BlogPostItem/Header");
var Content_1 = require("@theme/BlogPostItem/Content");
var Footer_1 = require("@theme/BlogPostItem/Footer");
function useContainerClassName() {
    var isBlogPostPage = (0, client_1.useBlogPost)().isBlogPostPage;
    return !isBlogPostPage ? "margin-bottom--xl" : undefined;
}
function BlogPostItem(_a) {
    var children = _a.children, className = _a.className;
    var containerClassName = useContainerClassName();
    var frontMatter = (0, client_1.useBlogPost)().frontMatter;
    return (react_1.default.createElement(Container_1.default, { className: (0, clsx_1.default)(containerClassName, className) },
        react_1.default.createElement(Header_1.default, null),
        frontMatter.image && react_1.default.createElement("img", { src: frontMatter.image, alt: "Cover Image for ".concat(frontMatter.title) }),
        react_1.default.createElement(Content_1.default, null, children),
        react_1.default.createElement(Footer_1.default, null)));
}
