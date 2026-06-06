"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogPostItemHeaderTitle;
var react_1 = require("react");
var clsx_1 = require("clsx");
var Link_1 = require("@docusaurus/Link");
var client_1 = require("@docusaurus/plugin-content-blog/client");
var styles_module_css_1 = require("./styles.module.css");
function BlogPostItemHeaderTitle(_a) {
    var className = _a.className;
    var _b = (0, client_1.useBlogPost)(), metadata = _b.metadata, isBlogPostPage = _b.isBlogPostPage;
    var permalink = metadata.permalink, title = metadata.title;
    var TitleHeading = isBlogPostPage ? "h1" : "h2";
    return (react_1.default.createElement(TitleHeading, { className: (0, clsx_1.default)(styles_module_css_1.default.title, className) }, isBlogPostPage ? title : react_1.default.createElement(Link_1.default, { to: permalink }, title)));
}
