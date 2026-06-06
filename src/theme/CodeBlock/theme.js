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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var prism_react_renderer_1 = require("prism-react-renderer");
var baseTheme = prism_react_renderer_1.themes.github;
var prismTheme = __assign(__assign({}, baseTheme), { plain: __assign(__assign({}, baseTheme.plain), { color: "#fff", backgroundColor: "#303037" }), styles: __spreadArray(__spreadArray([], baseTheme.styles, true), [
        {
            types: ["line-number"],
            style: {
                color: "#5B5B60",
            },
        },
        {
            types: ["title"],
            style: {
                color: "#0550AE",
                fontWeight: "bold",
            },
        },
        {
            types: ["parameter"],
            style: {
                color: "#953800",
            },
        },
        {
            types: ["punctuation"],
            style: {
                color: "#fff",
            },
        },
        {
            types: ["boolean", "rule", "color", "number", "constant", "property"],
            style: {
                color: "#C586C0",
            },
        },
        {
            types: ["scalar"],
            style: {
                color: "#8DFFF8",
            },
        },
        {
            types: ["atrule", "tag"],
            style: {
                color: "#b76b01",
            },
        },
        {
            types: ["script"],
            style: {
                color: "#fff",
            },
        },
        {
            types: ["operator", "unit", "rule"],
            style: {
                color: "#8DFFF8",
            },
        },
        {
            types: ["font-matter", "string", "attr-value"],
            style: {
                color: "#FDB869",
            },
        },
        {
            types: ["class-name"],
            style: {
                color: "#C586C0",
            },
        },
        {
            types: ["attr-name"],
            style: {
                color: "#8DFFF8",
            },
        },
        {
            types: ["keyword"],
            style: {
                color: "#C586C0",
            },
        },
        {
            types: ["function"],
            style: {
                color: "#FDEA2F",
            },
        },
        {
            types: ["selector"],
            style: {
                color: "#6F42C1",
            },
        },
        {
            types: ["variable"],
            style: {
                color: "#E36209",
            },
        },
        {
            types: ["comment"],
            style: {
                color: "#30C26D",
            },
        },
    ], false) });
exports.default = prismTheme;
