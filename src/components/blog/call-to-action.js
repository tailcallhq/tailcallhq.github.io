"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var LinkButton_1 = require("../shared/LinkButton");
var routes_1 = require("@site/src/constants/routes");
var constants_1 = require("@site/src/constants");
var utils_1 = require("@site/src/utils");
var bg_dark_tailcall_svg_1 = require("@site/static/icons/basic/bg-dark-tailcall.svg");
var CallToAction = function (_a) {
    var title = _a.title, subtitle = _a.subtitle, buttonText = _a.buttonText, href = _a.href;
    return (react_1.default.createElement("section", { className: "flex flex-col justify-center px-4 py-4 max-w-3xl mx-auto" },
        react_1.default.createElement("div", { className: "relative flex flex-col max-md:space-y-6 md:flex-row md:items-center p-8 bg-neutral-900 rounded-2xl overflow-hidden max-md:p-6" },
            react_1.default.createElement(bg_dark_tailcall_svg_1.default, { className: "absolute inset-0 w-full h-full object-cover opacity-5 z-0 max-w-none max-h-none" }),
            react_1.default.createElement("div", { className: "relative z-10 flex flex-col flex-1 space-y-2.5 text-center max-md:text-left md:text-left" },
                react_1.default.createElement("h2", { className: "text-3xl font-bold leading-tight text-white sm:text-4xl" }, title),
                react_1.default.createElement("p", { className: "text-base leading-relaxed text-zinc-400 sm:text-lg" }, subtitle)),
            react_1.default.createElement("div", { className: "relative z-10 mt-6 max-md:w-full max-md:flex max-md:justify-center md:mt-0 md:ml-6 md:flex-shrink-0" },
                react_1.default.createElement(LinkButton_1.default, { title: buttonText, href: href ? href : routes_1.pageLinks.docs, theme: constants_1.Theme.Tailcall, width: "auto", onClick: function () { return (0, utils_1.analyticsHandler)("Blog", "Click", "Get Started"); } })))));
};
exports.default = CallToAction;
