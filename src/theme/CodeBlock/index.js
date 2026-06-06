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
exports.default = CodeBlockWrapper;
var react_1 = require("react");
var CodeBlock_1 = require("@theme-original/CodeBlock");
function CodeBlockWrapper(props) {
    var _a = (0, react_1.useState)(false), copied = _a[0], setCopied = _a[1];
    var handleCopy = function () {
        var _a;
        navigator.clipboard.writeText(((_a = props.children) === null || _a === void 0 ? void 0 : _a.toString()) || "");
        setCopied(true);
        setTimeout(function () { return setCopied(false); }, 2000);
    };
    var parseMetastring = function (metastring) {
        if (!metastring)
            return {};
        var result = {};
        var regex = /(\w+)(?:="([^"]*)"|\s*)/g;
        var match;
        while ((match = regex.exec(metastring)) !== null) {
            var key = match[1], value = match[2];
            result[key] = (value || "true");
        }
        return result;
    };
    var metastringData = parseMetastring(props.metastring);
    return (react_1.default.createElement("div", { className: "rounded-3xl overflow-hidden" },
        react_1.default.createElement("div", { className: "bg-[#35353A] p-4 flex justify-between items-center" },
            react_1.default.createElement("span", { className: "text-white text-xs font-space-mono" }, metastringData.title),
            react_1.default.createElement("div", { className: "relative" },
                react_1.default.createElement("button", { onClick: handleCopy, "aria-label": "Copy code", className: "flex flex-row items-center bg-transparent appearance-none border-none" },
                    copied && (react_1.default.createElement("span", { className: "text-xs text-white mr-2 opacity-70 font-space-mono p-0", style: { lineHeight: "0" } }, "Copied!")),
                    react_1.default.createElement("img", { src: "/icons/basic/copy-icon.svg", alt: "Copy Icon", className: "w-4 h-4 cursor-pointer hover:opacity-80 transition-opacity duration-150" })))),
        react_1.default.createElement(CodeBlock_1.default, __assign({}, props))));
}
