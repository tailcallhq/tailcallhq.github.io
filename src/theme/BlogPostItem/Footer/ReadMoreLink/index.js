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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogPostItemFooterReadMoreLink;
var react_1 = require("react");
var Translate_1 = require("@docusaurus/Translate");
var Link_1 = require("@docusaurus/Link");
function ReadMoreLabel() {
    return (react_1.default.createElement("b", null,
        react_1.default.createElement(Translate_1.default, { id: "theme.blog.post.readMore", description: "The label used in blog post item excerpts to link to full blog posts" }, "Read More")));
}
function BlogPostItemFooterReadMoreLink(props) {
    var blogPostTitle = props.blogPostTitle, linkProps = __rest(props, ["blogPostTitle"]);
    return (react_1.default.createElement(Link_1.default, __assign({ "aria-label": (0, Translate_1.translate)({
            message: "Read more about {title}",
            id: "theme.blog.post.readMoreLabel",
            description: "The ARIA label for the link to full blog posts from excerpts",
        }, { title: blogPostTitle }) }, linkProps),
        react_1.default.createElement(ReadMoreLabel, null)));
}
