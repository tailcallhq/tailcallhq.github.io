"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var constants_1 = require("@site/src/constants");
var gt_underscore_svg_1 = require("@site/static/icons/basic/gt-underscore.svg");
var Feature = function (_a) {
    var feature = _a.feature;
    return (react_1.default.createElement("div", { className: "text-tailCall-dark-500 sm:max-w-6xl sm:m-SPACE_10 lg:mx-auto lg:px-SPACE_016 my-0 lg:my-SPACE_20" },
        react_1.default.createElement("div", { className: "flex items-center -ml-SPACE_02 sm:space-x-SPACE_02 sm:-ml-SPACE_05 lg:-ml-SPACE_10 mb-SPACE_06" },
            react_1.default.createElement(gt_underscore_svg_1.default, { className: "h-5 sm:h-7" }),
            react_1.default.createElement(Heading_1.default, { as: "h5", className: "text-title-semi-large sm:text-display-tiny lg:text-display-small mb-0" }, feature.title)),
        react_1.default.createElement("div", { className: "flex flex-col sm:flex-row p-SPACE_04 sm:p-SPACE_16  shadow-xl rounded-[20px] relative  sm:ml-0", style: {
                backgroundImage: "url(".concat(require("@site/static/images/home/grid.jpg").default, ")"),
                boxShadow: "0px 0px 0px 3px var(--ifm-color-brand-light-100)",
            } },
            react_1.default.createElement("div", { className: "bg-gradient-to-b from-tailCall-light-100 from-3% via-[#E4E5E9] via-67% to-tailCall-light-100 absolute -left-SPACE_04 sm:-left-SPACE_06 w-[2px] h-full" }),
            react_1.default.createElement("p", { className: "text-content-tiny sm:text-content-small lg:text-content-medium max-w-md" },
                react_1.default.createElement("span", null, feature.content)),
            react_1.default.createElement("div", { className: "sm:mt-SPACE_20" },
                react_1.default.createElement("img", { src: feature.logo, alt: feature.alt })))));
};
var Features = function () {
    return (react_1.default.createElement("section", { className: "space-y-SPACE_12 mx-SPACE_04 sm:space-y-SPACE_16 lg:space-y-24 mb-24" }, constants_1.features.map(function (feature, id) { return (react_1.default.createElement(Feature, { feature: feature, key: id })); })));
};
exports.default = Features;
