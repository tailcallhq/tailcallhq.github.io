"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var constants_1 = require("@site/src/constants");
var FeatureBox = function (_a) {
    var feature = _a.feature;
    return (react_1.default.createElement("div", { className: "border-b border-0  border-solid border-tailCall-border-light-200 flex flex-col sm:flex-row items-start justify-start sm:items-center text-start space-y-SPACE_02 sm:space-y-0 py-SPACE_04 sm:py-SPACE_08 lg:py-SPACE_12 sm:space-x-SPACE_04 text-content-tiny font-bold sm:text-title-small lg:text-title-medium text-tailCall-dark-500  sm:h-32 w-full" },
        react_1.default.createElement(feature.logo, { className: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" }),
        react_1.default.createElement("span", { className: "mt-0" }, feature.title)));
};
var MoreFeatures = function () {
    return (react_1.default.createElement("section", { className: "w-full mb-SPACE_08 sm:mb-SPACE_20" },
        react_1.default.createElement("div", { className: "max-w-7xl mx-SPACE_04 sm:mx-SPACE_10 lg:mx-auto text-center flex flex-col items-center" },
            react_1.default.createElement(Heading_1.default, { as: "h5", className: "text-title-semi-large sm:text-display-tiny lg:text-display-small text-tailCall-dark-500" }, "There\u2019s so much more."),
            react_1.default.createElement("div", { className: "grid grid-cols-2 my-SPACE_04 sm:my-SPACE_10 lg:my-SPACE_16 gap-x-SPACE_06 sm:gap-x-SPACE_10" }, constants_1.moreFeatures.map(function (feature) { return (react_1.default.createElement(FeatureBox, { feature: feature, key: feature.id })); })))));
};
exports.default = MoreFeatures;
