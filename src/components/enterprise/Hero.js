"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var LinkButton_1 = require("../shared/LinkButton");
var utils_1 = require("@site/src/utils");
var constants_1 = require("@site/src/constants");
var routes_1 = require("@site/src/constants/routes");
var Hero = function () {
    return (react_1.default.createElement("section", { className: "h-full w-full flex flex-col items-center justify-center py-SPACE_10 sm:py-SPACE_14 lg:py-SPACE_20 relative grid-bg-section" },
        react_1.default.createElement(Heading_1.default, { as: "h2", className: "text-title-large sm:text-display-small lg:text-display-large text-center mb-SPACE_10 max-w-[370px] sm:max-w-7xl" },
            react_1.default.createElement("div", null, "Extend the power"),
            react_1.default.createElement("div", null,
                "of ",
                react_1.default.createElement("span", { className: "bg-tailCall-yellow rounded-md sm:rounded-2xl px-SPACE_02" }, "GraphQL")),
            react_1.default.createElement("div", null, "to your organization.")),
        react_1.default.createElement(LinkButton_1.default, { title: "Get in touch", theme: constants_1.Theme.Dark, href: routes_1.pageLinks.contact, onClick: function () { return (0, utils_1.analyticsHandler)("Pricing", "Click", "Get in touch"); } })));
};
exports.default = Hero;
