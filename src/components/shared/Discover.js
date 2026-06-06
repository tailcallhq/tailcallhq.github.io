"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var bg_tailcall_svg_1 = require("@site/static/icons/basic/bg-tailcall.svg");
var LinkButton_1 = require("./LinkButton");
var utils_1 = require("@site/src/utils");
var constants_1 = require("@site/src/constants");
var routes_1 = require("@site/src/constants/routes");
var Discover = function () {
    return (react_1.default.createElement("section", null,
        react_1.default.createElement("div", { className: "bg-tailCall-yellow relative flex items-center justify-center h-[208px] sm:h-[452px]" },
            react_1.default.createElement(bg_tailcall_svg_1.default, null),
            react_1.default.createElement("div", { className: "flex flex-col items-center absolute max-w-3xl space-y-SPACE_04 sm:space-y-SPACE_06" },
                react_1.default.createElement(Heading_1.default, { as: "h5", className: "text-title-semi-large sm:text-display-medium text-center mb-0" }, "Discover the power of enterprise solution."),
                react_1.default.createElement("div", { className: "flex space-x-SPACE_03 sm:space-x-SPACE_06" },
                    react_1.default.createElement(LinkButton_1.default, { theme: constants_1.Theme.Dark, title: "Get in touch", href: routes_1.pageLinks.contact, onClick: function () { return (0, utils_1.analyticsHandler)("Discover", "Click", "Get in touch"); } }),
                    react_1.default.createElement(LinkButton_1.default, { theme: constants_1.Theme.Light, title: "Know More", href: routes_1.pageLinks.introduction, onClick: function () { return (0, utils_1.analyticsHandler)("Discover", "Click", "Know More"); } }))))));
};
exports.default = Discover;
