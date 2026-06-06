"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SectionTitle_1 = require("../shared/SectionTitle");
var WhoWeAre = function () {
    return (react_1.default.createElement("section", { className: "mt-SPACE_08 sm:mt-SPACE_10 lg:mt-SPACE_20 flex flex-col sm:flex-row items-start justify-center sm:space-x-SPACE_10 lg:space-x-SPACE_20 px-SPACE_04 sm:px-SPACE_10 lg:px-40 2xl:max-w-[90rem] mx-auto" },
        react_1.default.createElement("div", { className: "min-w-fit" },
            react_1.default.createElement(SectionTitle_1.default, { title: "About Us" }),
            react_1.default.createElement("p", { className: "text-title-semi-large sm:text-display-tiny lg:text-display-small bg-tailCall-yellow rounded-lg mt-SPACE_02 px-SPACE_02" }, "Who we are?")),
        react_1.default.createElement("p", { className: "text-content-tiny sm:text-content-small lg:text-content-medium" }, "We are change agents in the world of API development, focusing our expertise on enhancing GraphQL technologies. Our team is composed of seasoned engineers, innovators, and strategists committed to reshaping the API landscape. We believe in breaking barriers, pushing boundaries, and creating solutions that empower developers to build APIs that are not just functional but revolutionary.")));
};
exports.default = WhoWeAre;
