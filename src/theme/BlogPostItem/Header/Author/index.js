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
exports.default = BlogPostItemHeaderAuthor;
var react_1 = require("react");
var clsx_1 = require("clsx");
var Link_1 = require("@docusaurus/Link");
function MaybeLink(props) {
    if (props.href) {
        return react_1.default.createElement(Link_1.default, __assign({}, props, { className: "text-black" }));
    }
    return react_1.default.createElement(react_1.default.Fragment, null, props.children);
}
function BlogPostItemHeaderAuthor(_a) {
    var author = _a.author, className = _a.className;
    var name = author.name, title = author.title, url = author.url, imageURL = author.imageURL, email = author.email;
    var link = url || (email && "mailto:".concat(email)) || undefined;
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("avatar margin-bottom--sm", className) },
        imageURL && (react_1.default.createElement(MaybeLink, { href: link, className: "avatar__photo-link" },
            react_1.default.createElement("img", { className: "avatar__photo", src: imageURL, alt: name }))),
        name && (react_1.default.createElement("div", { className: "avatar__intro" },
            react_1.default.createElement("div", { className: "avatar__name" },
                react_1.default.createElement(MaybeLink, { href: link },
                    react_1.default.createElement("span", null, name))),
            title && react_1.default.createElement("small", { className: "avatar__subtitle" }, title)))));
}
