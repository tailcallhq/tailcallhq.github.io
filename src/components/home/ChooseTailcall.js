"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var constants_1 = require("@site/src/constants");
var LinkButton_1 = require("../shared/LinkButton");
var Link_1 = require("@docusaurus/Link");
var ChooseTailcall = function () {
    return (react_1.default.createElement("div", { className: "flex flex-col items-center justify-center" },
        react_1.default.createElement("p", { className: "text-title-large max-w-lg mx-auto sm:text-display-tiny lg:text-display-medium text-center my-SPACE_14 sm:mb-SPACE_16 sm:my-32 lg:mt-44" }, "More reasons to choose Tailcall."),
        react_1.default.createElement("div", { className: "flex flex-col lg:flex-row space-y-SPACE_06 items-center justify-between lg:space-x-SPACE_06 lg:space-y-0" }, constants_1.chooseTailcall.map(function (item) { return (react_1.default.createElement("div", { className: "border-2 border-solid border-tailCall-border-dark-300 w-full lg:min-h-[358px] lg:max-w-md rounded-3xl p-SPACE_04 flex flex-col items-start justify-between", key: item.id },
            react_1.default.createElement("div", { className: "h-16 w-16 sm:w-full sm:h-full" },
                react_1.default.createElement("img", { src: item.image, alt: "Image Describing Why Tailcall", className: "max-w-[72px] sm:max-w-[110px]" })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", { className: "text-title-small sm:text-title-large mt-SPACE_10 mb-SPACE_03" }, item.title),
                react_1.default.createElement("p", { className: "text-content-tiny sm:text-content-small text-tailCall-light-600" }, item.description)))); })),
        react_1.default.createElement("div", { className: "flex py-10 gap-y-SPACE_04 gap-x-SPACE_04 md:gap-y-SPACE_06 md:gap-x-SPACE_06 flex-wrap md:items-center md:justify-center lg:pb-16" }, constants_1.tailcallFeatures.map(function (item) { return (react_1.default.createElement(Link_1.default, { to: item.redirection_url, className: "flex w-fit p-6 border-2 border-solid border-tailCall-border-dark-300 rounded-xl md:items-center md:justify-center cursor-pointer hover:no-underline text-tailCall-light-300 hover:text-tailCall-light-300 hover:border-[#FDEA2E] benefits-drop-shadow", key: item.id },
            react_1.default.createElement("img", { src: item.image, alt: "".concat(item.title, " Image"), height: 24, width: 24 }),
            react_1.default.createElement("span", { className: "text-content-small lg:text-title-tiny ml-2" }, item.title))); })),
        react_1.default.createElement(LinkButton_1.default, { width: "medium", theme: constants_1.Theme.Gray, href: "/docs/graphql-configuration-generation-with-tailcall/", title: "View More" })));
};
exports.default = ChooseTailcall;
