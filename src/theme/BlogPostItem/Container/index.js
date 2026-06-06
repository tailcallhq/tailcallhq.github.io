"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogPostItemContainer;
var react_1 = require("react");
function BlogPostItemContainer(_a) {
    var children = _a.children, className = _a.className;
    return react_1.default.createElement("article", { className: className }, children);
}
