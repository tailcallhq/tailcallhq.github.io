"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Announcement = function (_a) {
    var text = _a.text, refLink = _a.refLink, refText = _a.refText;
    return (react_1.default.createElement("div", { className: "w-full h-auto bg-black text-white flex items-center justify-center p-2 sm:p-3" },
        react_1.default.createElement("div", { className: "text-center" },
            react_1.default.createElement("span", { className: "text-sm sm:text-base md:text-lg font-bold" },
                text,
                refLink && refText && (react_1.default.createElement("a", { className: "text-tailCall-yellow font-bold ml-2", href: refLink }, refText))))));
};
exports.default = Announcement;
