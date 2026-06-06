"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Heading_1 = require("@theme/Heading");
var SectionTitle_1 = require("../shared/SectionTitle");
var Hero = function () {
    return (react_1.default.createElement("section", { className: "flex flex-col sm:flex-row items-end sm:items-center justify-center bg-tailCall-dark-500 w-full h-full" },
        react_1.default.createElement("div", { className: "mx-SPACE_04 my-SPACE_06 sm:m-SPACE_10 lg:m-SPACE_20" },
            react_1.default.createElement(SectionTitle_1.default, { title: "Our Mission" }),
            react_1.default.createElement(Heading_1.default, { as: "h2", className: "text-title-small sm:text-title-large lg:text-display-small text-tailCall-light-100 max-w-3xl" }, "Demystify the complexity of API composition, with unparalleled ease and efficiency.")),
        react_1.default.createElement("img", { src: require("@site/static/animations/about-us-visual.gif").default, alt: "about us visual", className: "h-52 w-60 sm:h-72 sm:w-80 lg:h-fit lg:w-fit" })));
};
exports.default = Hero;
