"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogPostItemContent;
var react_1 = require("react");
var clsx_1 = require("clsx");
var utils_common_1 = require("@docusaurus/utils-common");
var client_1 = require("@docusaurus/plugin-content-blog/client");
var MDXContent_1 = require("@theme/MDXContent");
function BlogPostItemContent(_a) {
    var children = _a.children, className = _a.className;
    var isBlogPostPage = (0, client_1.useBlogPost)().isBlogPostPage;
    return (react_1.default.createElement("div", { 
        // This ID is used for the feed generation to locate the main content
        id: isBlogPostPage ? utils_common_1.blogPostContainerID : undefined, className: (0, clsx_1.default)("markdown", className) },
        react_1.default.createElement(MDXContent_1.default, null, children)));
}
