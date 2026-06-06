"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var constants_1 = require("@site/src/constants");
var check_circle_broken_svg_1 = require("@site/static/icons/basic/check-circle-broken.svg");
var MoreEnterpriseFeatures = function () {
    return (react_1.default.createElement("section", { className: "border border-solid border-tailCall-border-light-300 flex flex-col sm:flex-row items-center justify-center sm:px-SPACE_10 lg:px-40 relative overflow-hidden" },
        react_1.default.createElement("div", { className: "w-full h-full p-SPACE_04 sm:py-0 sm:pr-SPACE_10" },
            react_1.default.createElement("img", { src: require("@site/static/icons/basic/more-feat-grid.png").default, alt: "More Features", className: "absolute inset-0 h-full w-full sm:w-[47vw] -z-10" }),
            react_1.default.createElement(Heading_1.default, { as: "h4", className: "text-title-semi-large sm:text-title-large text-center h-full w-full mb-0" }, "Additional enterprise features")),
        react_1.default.createElement("div", { className: "border-l border-tailCall-border-light-300 flex items-start justify-start gap-SPACE_04 flex-wrap p-SPACE_04 overflow-x-auto h-full max-w-screen-md sm:pl-SPACE_10 sm:py-SPACE_10" }, constants_1.additionalEnterpriseFeatures.map(function (feature) { return (react_1.default.createElement("div", { className: "min-w-[150px] border border-solid border-tailCall-border-light-300 flex items-center p-SPACE_02 sm:px-SPACE_04 sm:py-SPACE_03 rounded w-fit space-x-SPACE_02 sm:space-x-SPACE_04", key: feature.id },
            react_1.default.createElement(check_circle_broken_svg_1.default, { className: "h-4 w-4 sm:h-6 sm:w-6" }),
            react_1.default.createElement("span", { className: "text-content-small font-bold sm:text-title-tiny" }, feature.title))); }))));
};
exports.default = MoreEnterpriseFeatures;
