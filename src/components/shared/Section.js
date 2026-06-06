"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var clsx_1 = require("clsx");
var Section = function (_a) {
    var children = _a.children, className = _a.className, innerClassName = _a.innerClassName;
    return (react_1.default.createElement("section", { className: (0, clsx_1.default)("w-full px-8 py-6 md:px-24 lg:px-36 lg:py-20", className) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("w-full max-w-7xl mx-auto", innerClassName) }, children)));
};
exports.default = Section;
