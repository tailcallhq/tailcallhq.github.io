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
exports.default = BlogPostItemHeaderAuthors;
var react_1 = require("react");
var clsx_1 = require("clsx");
var client_1 = require("@docusaurus/plugin-content-blog/client");
var Author_1 = require("@theme/Blog/Components/Author");
var styles_module_css_1 = require("./styles.module.css");
// Component responsible for the authors layout
function BlogPostItemHeaderAuthors(_a) {
    var className = _a.className;
    var _b = (0, client_1.useBlogPost)(), authors = _b.metadata.authors, assets = _b.assets;
    var authorsCount = authors.length;
    if (authorsCount === 0) {
        return null;
    }
    var imageOnly = authors.every(function (_a) {
        var name = _a.name;
        return !name;
    });
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("margin-top--md margin-bottom--sm", imageOnly ? styles_module_css_1.default.imageOnlyAuthorRow : "row", className) }, authors.map(function (author, idx) {
        var _a;
        return (react_1.default.createElement("div", { className: (0, clsx_1.default)(!imageOnly && "col col--6", imageOnly ? styles_module_css_1.default.imageOnlyAuthorCol : styles_module_css_1.default.authorCol), key: idx },
            react_1.default.createElement(Author_1.default, { author: __assign(__assign({}, author), { 
                    // Handle author images using relative paths
                    imageURL: (_a = assets.authorsImageUrls[idx]) !== null && _a !== void 0 ? _a : author.imageURL }) })));
    })));
}
