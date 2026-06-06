"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var LinkButton_1 = require("../shared/LinkButton");
var hero_svg_1 = require("@site/static/images/home/hero.svg");
var utils_1 = require("@site/src/utils");
var constants_1 = require("@site/src/constants");
var routes_1 = require("@site/src/constants/routes");
var Section_1 = require("../shared/Section");
var Banner = function () {
    return (react_1.default.createElement("main", { className: "grid justify-center" },
        react_1.default.createElement(Section_1.default, { className: "flex flex-col sm:items-center sm:text-center w-full !pb-0" },
            react_1.default.createElement("div", { className: "h-full 2xl:min-h-0" },
                react_1.default.createElement(Heading_1.default, { as: "h1", className: "hero-banner-title text-title-large max-w-xs sm:text-display-small lg:text-display-large sm:max-w-5xl" },
                    "The modern ",
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("span", { className: "bg-tailCall-yellow rounded-md sm:rounded-2xl px-SPACE_02" }, "GraphQL"),
                    " platform"),
                react_1.default.createElement("p", { className: "hero-banner-sub-title sm:max-w-2xl sm:m-auto text-content-small sm:text-content-medium lg:text-content-large font-normal max-w-md sm:mt-SPACE_04 mb-0" }, "Leverage AI to design and ship best-practice GraphQL backends atop existing data sources and APIs."),
                react_1.default.createElement("div", { className: "hidden sm:flex justify-center mt-SPACE_06 sm:mt-SPACE_10 space-x-SPACE_04 sm:space-x-SPACE_06" },
                    react_1.default.createElement(LinkButton_1.default, { title: "Learn More", href: routes_1.pageLinks.introduction, theme: constants_1.Theme.Dark, width: "small", onClick: function () { return (0, utils_1.analyticsHandler)("Home Page", "Click", "Playground"); } }),
                    react_1.default.createElement(LinkButton_1.default, { title: "Get Started", href: routes_1.pageLinks.docs, theme: constants_1.Theme.Light, width: "small", onClick: function () { return (0, utils_1.analyticsHandler)("Home Page", "Click", "Get Started"); } })),
                react_1.default.createElement("div", { className: "sm:hidden flex justify-between md:justify-center mt-SPACE_06 sm:mt-SPACE_10 space-x-SPACE_04 sm:space-x-SPACE_06" },
                    react_1.default.createElement(LinkButton_1.default, { title: "Learn More", href: routes_1.pageLinks.introduction, theme: constants_1.Theme.Dark, onClick: function () { return (0, utils_1.analyticsHandler)("Home Page", "Click", "Playground"); }, width: "full" }),
                    react_1.default.createElement(LinkButton_1.default, { title: "Get Started", href: routes_1.pageLinks.docs, theme: constants_1.Theme.Light, onClick: function () { return (0, utils_1.analyticsHandler)("Home Page", "Click", "Get Started"); }, width: "full" })))),
        react_1.default.createElement(hero_svg_1.default, { className: "object-contain h-full sm:h-full w-full mt-8 max-w-7xl" })));
};
exports.default = Banner;
