"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var LinkButton_1 = require("../shared/LinkButton");
var ChooseTailcall_1 = require("./ChooseTailcall");
var GraphContainer_1 = require("./GraphContainer");
var github_light_svg_1 = require("@site/static/icons/companies/github-light.svg");
var request_visual_json_1 = require("@site/static/animations/request-visual.json");
var latency_visual_json_1 = require("@site/static/animations/latency-visual.json");
var utils_1 = require("@site/src/utils");
var constants_1 = require("@site/src/constants");
var Section_1 = require("../shared/Section");
var Graph = function () {
    return (react_1.default.createElement(Section_1.default, { className: "bg-tailCall-dark-600 h-full w-full text-tailCall-light-100 lg:pt-48 lg:pb-36" },
        react_1.default.createElement("div", { className: "flex items-center justify-between lg:mb-12" },
            react_1.default.createElement(Heading_1.default, { as: "h5", className: "text-title-large sm:text-display-tiny lg:text-display-medium sm:max-w-sm lg:max-w-xl" }, "Platform made for performance."),
            react_1.default.createElement("div", { className: "hidden sm:block" },
                react_1.default.createElement(LinkButton_1.default, { title: "View on Github", href: constants_1.tailCallBenchmarkUrl, theme: constants_1.Theme.Gray, Icon: github_light_svg_1.default, onClick: function () { return (0, utils_1.analyticsHandler)("Home Page", "Click", "View on Github"); } }))),
        react_1.default.createElement("div", { className: "flex flex-col sm:flex-row gap-10 items-center w-full" },
            react_1.default.createElement(GraphContainer_1.default, { visual: request_visual_json_1.default, metricData: 7442.01, start: 5000, metricTitle: "Requests/sec", metricDesc: "(Higher is better)", duration: 1.6, delay: 0 }),
            react_1.default.createElement(GraphContainer_1.default, { visual: latency_visual_json_1.default, metricData: 13.39, start: 1000, metricTitle: "Latency (ms)", metricDesc: "(Lower is better)", duration: 1.6, delay: 0 }),
            react_1.default.createElement("div", { className: "sm:hidden" },
                react_1.default.createElement(LinkButton_1.default, { title: "View on Github", href: constants_1.tailCallBenchmarkUrl, theme: constants_1.Theme.Gray, Icon: github_light_svg_1.default, onClick: function () { return (0, utils_1.analyticsHandler)("Home Page", "Click", "View on Github"); } }))),
        react_1.default.createElement(ChooseTailcall_1.default, null)));
};
exports.default = Graph;
