"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var solution_graphic_json_1 = require("@site/static/animations/solution-graphic.json");
var SectionTitle_1 = require("../shared/SectionTitle");
var LottieContainer_1 = require("./LottieContainer.tsxsrc/components/home/LottieContainer");
var LegacyGateway = function () {
    return (react_1.default.createElement("section", { className: "w-full my-SPACE_12 lg:px-SPACE_16" },
        react_1.default.createElement("div", { className: "max-w-7xl mx-SPACE_04 sm:m-SPACE_10 lg:mx-auto lg:my-SPACE_20" },
            react_1.default.createElement(SectionTitle_1.default, { title: "The Problem" }),
            react_1.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:space-x-SPACE_10 lg:space-x-SPACE_20" },
                react_1.default.createElement(Heading_1.default, { as: "h3", className: "text-title-large sm:text-display-tiny lg:text-display-small text-tailCall-dark-500 min-w-fit" },
                    "REST APIs are ",
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("span", { className: "bg-tailCall-yellow px-SPACE_02 rounded-md sm:rounded-2xl" }, "not composable"),
                    " ",
                    react_1.default.createElement("br", null)),
                react_1.default.createElement("p", { className: "text-content-tiny font-normal sm:text-content-small lg:text-content-medium text-tailCall-dark-500" }, "API composition is pivotal for building rich user experiences, but REST APIs are not inherently composable, often leading to awkward, unmaintainable hand-written Backend for Frontends. On the other hand, GraphQL is a highly composable protocol, giving clients the power to express exactly what they need, and Tailcall makes GraphQL easy, secure, and fast."))),
        react_1.default.createElement("div", { className: "w-full flex items-center justify-center px-0 mt-SPACE_07" },
            react_1.default.createElement(LottieContainer_1.default, { animationData: solution_graphic_json_1.default, loop: true, className: "bg-tailCall-dark-500 sm:bg-transparent" }))));
};
exports.default = LegacyGateway;
