"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogPostItemHeader;
var react_1 = require("react");
var Title_1 = require("@theme/BlogPostItem/Header/Title");
var Info_1 = require("@theme/BlogPostItem/Header/Info");
var Back_1 = require("./Back");
var client_1 = require("@docusaurus/plugin-content-blog/client");
var Category_1 = require("../Category");
function BlogPostItemHeader() {
    var isBlogPostPage = (0, client_1.useBlogPost)().isBlogPostPage;
    return (react_1.default.createElement("header", null,
        isBlogPostPage && react_1.default.createElement(Back_1.default, null),
        react_1.default.createElement(Category_1.default, null),
        react_1.default.createElement(Title_1.default, null),
        react_1.default.createElement(Info_1.default, null)));
}
