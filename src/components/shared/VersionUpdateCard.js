"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var LinkButton_1 = require("./LinkButton");
var routes_1 = require("@site/src/constants/routes");
var constants_1 = require("@site/src/constants");
var VersionUpdateCard = function () {
    return (react_1.default.createElement("div", { className: "flex flex-col sm:flex-row py-8 px-6 sm:px-11 rounded-2xl bg-tailCall-dark-600 justify-between items-start sm:items-center gap-4 version-update-card" },
        react_1.default.createElement("div", { className: "flex flex-col gap-1" },
            react_1.default.createElement("span", { className: "text-title-medium sm:text-title-large text-white" }, "Update to latest version !!"),
            react_1.default.createElement("span", { className: "text-content-small text-tailCall-light-500" }, "Get the instructions from the docs")),
        react_1.default.createElement(LinkButton_1.default, { title: "Get Started", titleClassName: "text-center", href: routes_1.pageLinks.docs, theme: constants_1.Theme.Tailcall })));
};
exports.default = VersionUpdateCard;
