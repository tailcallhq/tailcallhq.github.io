"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogAuthor = void 0;
var react_1 = require("react");
var clsx_1 = require("clsx");
var BlogAuthor = function (_a) {
    var author = _a.author, containerClassName = _a.containerClassName, textClassName = _a.textClassName;
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center", containerClassName) },
        react_1.default.createElement("img", { src: author.imageURL, alt: author.name, className: "mr-2 size-6 rounded-full" }),
        react_1.default.createElement("span", { className: (0, clsx_1.default)("font-medium text-black", textClassName) }, author.name)));
};
exports.BlogAuthor = BlogAuthor;
