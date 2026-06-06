"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var constants_1 = require("@site/src/constants");
var EnterpriseFeaturesCard = function (_a) {
    var feature = _a.feature;
    return (react_1.default.createElement("div", { className: "border border-solid border-tailCall-border-light-400 rounded-3xl w-full sm:w-[450px] sm:h-60 p-SPACE_08 flex flex-col items-start space-y-SPACE_04" },
        react_1.default.createElement(feature.logo, { className: "h-5 w-5 sm:h-8 sm:w-8" }),
        react_1.default.createElement("p", { className: "text-title-tiny sm:text-title-medium" }, feature.title),
        react_1.default.createElement("p", { className: "text-content-tiny sm:text-content-small font-normal" }, feature.description)));
};
var EnterpriseFeatures = function () {
    return (react_1.default.createElement("section", { className: "my-SPACE_16 sm:my-SPACE_20 lg:my-24" },
        react_1.default.createElement(Heading_1.default, { as: "h4", className: "text-title-semi-large sm:text-display-tiny lg:text-display-small text-center" }, "Some of our enterprise features."),
        react_1.default.createElement("div", { className: "flex items-center flex-wrap justify-center gap-SPACE_06 mt-SPACE_08 mx-SPACE_04 sm:mx-0" }, constants_1.enterpriseFeatures.map(function (feature) { return (react_1.default.createElement(EnterpriseFeaturesCard, { feature: feature, key: feature.id })); }))));
};
exports.default = EnterpriseFeatures;
