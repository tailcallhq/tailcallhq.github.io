"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var gt_undescore_gray_svg_1 = require("@site/static/icons/basic/gt-undescore-gray.svg");
var SectionTitle = function (_a) {
    var title = _a.title;
    return (react_1.default.createElement("div", { className: "text-content-tiny sm:text-title-tiny text-tailCall-light-600 space-x-SPACE_01 font-space-mono" },
        react_1.default.createElement(gt_undescore_gray_svg_1.default, { className: "h-3 sm:h-4 w-6" }),
        react_1.default.createElement("span", null, title)));
};
exports.default = SectionTitle;
