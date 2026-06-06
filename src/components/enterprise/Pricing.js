"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var check_circle_svg_1 = require("@site/static/icons/basic/check-circle.svg");
var constants_1 = require("@site/src/constants");
var LinkButton_1 = require("../shared/LinkButton");
var utils_1 = require("@site/src/utils");
var Pricing = function () {
    return (react_1.default.createElement("section", { className: "my-SPACE_14 sm:my-24 sm:mx-SPACE_04 lg:mx-0" },
        react_1.default.createElement(Heading_1.default, { as: "h4", className: "text-title-large sm:text-display-tiny lg:text-display-small mx-SPACE_02 text-center mb-SPACE_06 sm:mb-SPACE_10" },
            react_1.default.createElement("span", { className: "rounded sm:rounded-lg bg-tailCall-yellow px-SPACE_01" }, "Plans"),
            " that fit your scale."),
        react_1.default.createElement("div", { className: "flex flex-col mx-SPACE_04 sm:mx-0 lg:flex-row items-center justify-center gap-SPACE_06 md:px-SPACE_16" }, constants_1.pricingPlans.map(function (plan) { return (react_1.default.createElement("div", { key: plan.id, className: "".concat(plan.mostPopular ? "border-tailCall-border-dark-700" : "border-tailCall-border-light-400", " border border-solid rounded-2xl flex flex-col items-center justify-between gap-y-SPACE_07 sm:gap-y-0 py-SPACE_04 sm:py-SPACE_06 relative w-full h-auto sm:w-[384px] md:h-[520px] lg:h-[584px]") },
            plan.mostPopular && (react_1.default.createElement("p", { className: "absolute -top-3.5 left-[50%] transform -translate-x-[50%] bg-tailCall-dark-600 text-tailCall-light-100 p-SPACE_01 rounded text-content-tiny font-bold" }, "Most popular")),
            react_1.default.createElement("div", { className: "flex flex-col" },
                react_1.default.createElement("span", { className: "text-content-small lg:text-content-medium text-center" }, plan.name),
                react_1.default.createElement("span", { className: "text-title-large  lg:text-display-tiny text-center" }, plan.price),
                react_1.default.createElement("span", { className: "text-content-small text-center" }, plan.for),
                react_1.default.createElement("span", { className: "text-content-small text-center" }, plan.billing ? plan.billing : react_1.default.createElement("br", null)),
                react_1.default.createElement("span", { className: "text-content-small text-center" }, plan.volumeDiscounts ? plan.volumeDiscounts : react_1.default.createElement("br", null))),
            react_1.default.createElement("div", { className: "flex-[0.8] flex flex-col items-center justify-between" },
                react_1.default.createElement("div", { className: "flex flex-col items-start justify-start gap-SPACE_04 px-SPACE_08" }, plan.features.map(function (feature) { return (react_1.default.createElement("div", { key: feature.id, className: "flex items-center space-x-SPACE_03 m-0 p-0" },
                    react_1.default.createElement(check_circle_svg_1.default, { className: "h-5 w-5" }),
                    react_1.default.createElement("span", { className: "text-content-small sm:text-content-tiny lg:text-content-small" }, feature.name))); })),
                react_1.default.createElement("div", { className: "hidden sm:block text-center mx-SPACE_04" },
                    react_1.default.createElement(LinkButton_1.default, { title: plan.buttonText, onClick: function () { return (0, utils_1.analyticsHandler)("Pricing", "Click", "".concat(plan.buttonText)); }, href: plan.href, theme: plan.mostPopular ? constants_1.Theme.Dark : constants_1.Theme.Light, width: "medium" })),
                react_1.default.createElement("div", { className: "sm:hidden mt-SPACE_10 text-center mx-SPACE_04" },
                    react_1.default.createElement(LinkButton_1.default, { title: plan.buttonText, onClick: function () { return (0, utils_1.analyticsHandler)("Pricing", "Click", "".concat(plan.buttonText)); }, href: plan.href, theme: plan.mostPopular ? constants_1.Theme.Dark : constants_1.Theme.Light, width: "medium" }))))); }))));
};
exports.default = Pricing;
